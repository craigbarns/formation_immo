#!/usr/bin/env node
/**
 * Régénère TOUS les MP3 de leçons avec voix françaises distinctes par module.
 *
 * Voix par module (depuis formateur-voices.json) :
 *   juridique   → Maître Alexandre Vidal (Marie — Neutral, grave, légal)
 *   transaction → Sarah Benali         (Marie — Excited, dynamique)
 *   financement → Thomas Mercier       (Marie — Curious, pédagogique)
 *   marketing   → Léa Fontaine         (Marie — Happy, chaleureuse)
 *   terrain     → Nicolas Arnaud       (Marie — Excited, énergie)
 *
 * Usage:
 *   node scripts/regen-all-audio.mjs
 *   node scripts/regen-all-audio.mjs --only juridique
 *   node scripts/regen-all-audio.mjs --dry-run
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadDotEnvLocal } from "./lib/env-local.mjs";
import {
  getMistralVoiceIdForModuleSlug,
  getModuleSlugFromScriptMdPath,
  describeVoiceChoiceForScriptMd,
} from "./lib/lesson-mistral-voice.mjs";
import { writeMistralTtsMp3File } from "./lib/mistral-tts.mjs";
import { allLessonMarkdownPaths } from "./lib/script-discovery.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lmsRoot = path.join(__dirname, "..");
const repoRoot = path.join(lmsRoot, "..");

loadDotEnvLocal(lmsRoot);

// ─── Config ──────────────────────────────────────────────────────────────────

if (!process.env.MISTRAL_API_KEY) {
  console.error("❌ MISTRAL_API_KEY manquante dans lms/.env.local");
  process.exit(1);
}

const dryRun = process.argv.includes("--dry-run");
const onlyArg = (() => {
  const i = process.argv.indexOf("--only");
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : null;
})();

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const FILE_GAP_MS = 800;

// ─── Module info ─────────────────────────────────────────────────────────────

const MODULE_INFO = {
  juridique:   { name: "Maître Alexandre Vidal", emoji: "⚖️", color: "#1a3a5c" },
  transaction: { name: "Sarah Benali",           emoji: "🤝", color: "#2d5a87" },
  financement: { name: "Thomas Mercier",         emoji: "🏦", color: "#142d45" },
  marketing:   { name: "Léa Fontaine",           emoji: "📣", color: "#d4af37" },
  terrain:     { name: "Nicolas Arnaud",         emoji: "🗺️", color: "#3b6e8f" },
};

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  let mdPaths = allLessonMarkdownPaths(repoRoot);

  // Filter by module if --only
  if (onlyArg) {
    mdPaths = mdPaths.filter((p) => {
      const slug = getModuleSlugFromScriptMdPath(p);
      return slug === onlyArg;
    });
    if (mdPaths.length === 0) {
      console.error(`Aucun script trouvé pour module "${onlyArg}"`);
      process.exit(1);
    }
  }

  console.log(`\n🎙  Régénération audio — ${mdPaths.length} leçons${dryRun ? " [DRY RUN]" : ""}\n`);

  // Summary by module
  const byModule = {};
  for (const p of mdPaths) {
    const slug = getModuleSlugFromScriptMdPath(p);
    if (!slug) continue;
    if (!byModule[slug]) byModule[slug] = 0;
    byModule[slug]++;
  }
  for (const [slug, count] of Object.entries(byModule)) {
    const info = MODULE_INFO[slug];
    const voiceId = getMistralVoiceIdForModuleSlug(lmsRoot, slug);
    console.log(`  ${info?.emoji || "📚"} ${slug} (${count} leçons) → voix: ${voiceId?.slice(0, 8)}… (${info?.name || slug})`);
  }
  console.log();

  let ok = 0;
  let skipped = 0;
  let failed = 0;

  for (let idx = 0; idx < mdPaths.length; idx++) {
    const mdPath = mdPaths[idx];
    const base = path.basename(mdPath, ".md");
    const slug = getModuleSlugFromScriptMdPath(mdPath);
    const info = MODULE_INFO[slug] || { name: slug, emoji: "📚" };

    // Load narration text
    const narrPath = path.join(path.dirname(mdPath), `${base}.narration.txt`);
    let text = null;
    if (fs.existsSync(narrPath)) {
      text = fs.readFileSync(narrPath, "utf8")
        .split("\n")
        .filter(l => !l.trimStart().startsWith("#"))
        .join(" ")
        .replace(/\s+/g, " ")
        .replace(/"/g, "")
        .trim();
    }

    if (!text || text.length < 50) {
      console.log(`⚠  SKIP ${base} — texte narration vide ou trop court`);
      skipped++;
      continue;
    }

    const outAbs = path.join(lmsRoot, "public", "audio", `${base}.mp3`);
    const voiceId = getMistralVoiceIdForModuleSlug(lmsRoot, slug);

    console.log(`\n[${idx + 1}/${mdPaths.length}] ${info.emoji} ${base}`);
    console.log(`    Module: ${slug} (${info.name})`);
    console.log(`    Voix:   ${voiceId?.slice(0, 8)}…`);
    console.log(`    Texte:  ${text.length} caractères`);
    if (fs.existsSync(outAbs)) {
      const stat = fs.statSync(outAbs);
      console.log(`    Existant: ${(stat.size / 1024).toFixed(1)} Ko — sera écrasé`);
    }

    if (dryRun) {
      console.log(`    [DRY RUN] Générerait ${base}.mp3`);
      ok++;
      continue;
    }

    try {
      await writeMistralTtsMp3File(text, outAbs, (msg) => console.log(`    ${msg}`), voiceId);
      const stat = fs.statSync(outAbs);
      console.log(`    ✓ ${base}.mp3 — ${(stat.size / 1024).toFixed(1)} Ko`);
      ok++;

      if (idx < mdPaths.length - 1) await sleep(FILE_GAP_MS);
    } catch (e) {
      console.error(`    ✗ Échec: ${e.message || e}`);
      failed++;
    }
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(`✅ Terminé : ${ok} généré(s), ${skipped} ignoré(s), ${failed} échoué(s)`);
  console.log(`\n📂 Fichiers dans: lms/public/audio/`);
  console.log(`\n🎬 Les fichiers audio sont prêts dans public/audio/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
