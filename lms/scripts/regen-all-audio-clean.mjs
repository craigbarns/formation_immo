#!/usr/bin/env node
/**
 * Régénère TOUS les MP3 des 36 leçons avec les meilleures voix françaises.
 *
 * Étapes :
 *   1. Supprime tous les anciens MP3 dans lms/public/audio/ (sauf sous-dossiers)
 *   2. Relit les narrations depuis les *.narration.txt
 *   3. Appelle Mistral Voxtral avec la voix du module (formateur-voices.json)
 *   4. Écrit les MP3 dans lms/public/audio/
 *
 * Prérequis :
 *   - MISTRAL_API_KEY dans lms/.env.local
 *   - Voix à jour dans lms/src/data/formateur-voices.json
 *   - Narrations extraites : node lms/scripts/extract-narration-for-audio.mjs
 *
 * Usage :
 *   node lms/scripts/regen-all-audio-clean.mjs               # tout regénérer
 *   node lms/scripts/regen-all-audio-clean.mjs --only juridique
 *   node lms/scripts/regen-all-audio-clean.mjs --dry-run     # affiche sans générer
 *   node lms/scripts/regen-all-audio-clean.mjs --keep-old    # ne supprime pas les anciens
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadDotEnvLocal } from "./lib/env-local.mjs";
import { writeMistralTtsMp3File } from "./lib/mistral-tts.mjs";
import { allLessonMarkdownPaths } from "./lib/script-discovery.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lmsRoot = path.join(__dirname, "..");
const repoRoot = path.join(lmsRoot, "..");

loadDotEnvLocal(lmsRoot);

if (!process.env.MISTRAL_API_KEY?.trim()) {
  console.error("❌ MISTRAL_API_KEY manquante dans lms/.env.local");
  process.exit(1);
}

// ─── Args ────────────────────────────────────────────────────────────────────
const dryRun  = process.argv.includes("--dry-run");
const keepOld = process.argv.includes("--keep-old");
const onlyArg = (() => {
  const i = process.argv.indexOf("--only");
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : null;
})();

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const GAP_MS = 900;

// ─── Formateur voices ────────────────────────────────────────────────────────
const voicesPath = path.join(lmsRoot, "src/data/formateur-voices.json");
const FORMATEUR_VOICES = JSON.parse(fs.readFileSync(voicesPath, "utf8"));

const MODULE_SLUGS = {
  "module1-juridique":   "juridique",
  "module2-transaction": "transaction",
  "module3-financement": "financement",
  "module4-marketing":   "marketing",
  "module5-terrain":     "terrain",
};

function getVoiceIdForScript(mdPath) {
  for (const [dir, slug] of Object.entries(MODULE_SLUGS)) {
    if (mdPath.includes(dir)) {
      return FORMATEUR_VOICES[slug]?.mistralVoiceId ?? null;
    }
  }
  return null;
}

function getModuleNameForScript(mdPath) {
  for (const [dir, slug] of Object.entries(MODULE_SLUGS)) {
    if (mdPath.includes(dir)) return slug;
  }
  return "?";
}

// ─── Load narration text ──────────────────────────────────────────────────────
function loadNarration(mdPath) {
  const narrationPath = mdPath.replace(/\.md$/, ".narration.txt");
  if (fs.existsSync(narrationPath)) {
    const txt = fs.readFileSync(narrationPath, "utf8").trim();
    if (txt) return txt;
  }
  // Fallback : read the .md and strip markdown naively
  if (!fs.existsSync(mdPath)) return null;
  const md = fs.readFileSync(mdPath, "utf8");
  // Extract narration section between ## SCRIPT COMPLET and end
  const match = md.match(/## SCRIPT COMPLET[\s\S]*?\n([\s\S]+)/);
  const raw = match ? match[1] : md;
  // Strip markdown formatting
  return raw
    .replace(/^#+\s+.*/gm, "")          // headings
    .replace(/\*\*([^*]+)\*\*/g, "$1")  // bold
    .replace(/\*([^*]+)\*/g, "$1")      // italic
    .replace(/\[B-ROLL[^\]]*\]/gi, "")  // B-roll annotations
    .replace(/\[PAUSE \d+s\]/gi, "")    // pause annotations
    .replace(/`[^`]+`/g, "")            // code
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// ─── Delete old MP3s ──────────────────────────────────────────────────────────
function deleteOldMp3s(audioDir) {
  const files = fs.readdirSync(audioDir);
  let deleted = 0;
  for (const f of files) {
    const fullPath = path.join(audioDir, f);
    if (f.endsWith(".mp3") && fs.statSync(fullPath).isFile()) {
      fs.unlinkSync(fullPath);
      deleted++;
    }
  }
  return deleted;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const audioDir = path.join(lmsRoot, "public/audio");
  fs.mkdirSync(audioDir, { recursive: true });

  // 1. Delete old MP3s
  if (!keepOld && !dryRun) {
    const deleted = deleteOldMp3s(audioDir);
    console.log(`🗑️  ${deleted} ancien(s) MP3 supprimé(s)\n`);
  } else if (dryRun) {
    console.log("🔍 Mode DRY-RUN — aucune modification\n");
  } else {
    console.log("📌 Mode KEEP-OLD — anciens MP3 conservés\n");
  }

  // 2. Get all lesson scripts
  let mdPaths = allLessonMarkdownPaths(repoRoot);
  if (onlyArg) {
    mdPaths = mdPaths.filter((p) => {
      const mod = getModuleNameForScript(p);
      return mod === onlyArg || path.basename(p, ".md").includes(onlyArg);
    });
    if (mdPaths.length === 0) {
      console.error(`❌ Aucun script pour --only "${onlyArg}"`);
      process.exit(1);
    }
  }

  console.log(`🎙️  ${mdPaths.length} leçon(s) à générer\n`);
  console.log("Voix par module :");
  for (const [slug, info] of Object.entries(FORMATEUR_VOICES)) {
    console.log(`  ${slug.padEnd(12)} → ${info.mistralVoiceLabel ?? info.mistralVoiceId}`);
  }
  console.log();

  // 3. Generate audio for each lesson
  let ok = 0, skipped = 0, errors = 0;

  for (let idx = 0; idx < mdPaths.length; idx++) {
    const mdPath = mdPaths[idx];
    const base = path.basename(mdPath, ".md");
    const module = getModuleNameForScript(mdPath);
    const voiceId = getVoiceIdForScript(mdPath);
    const outPath = path.join(audioDir, `${base}.mp3`);
    const prefix = `[${idx + 1}/${mdPaths.length}]`;

    if (!voiceId) {
      console.warn(`${prefix} ⚠ Voix introuvable pour ${base} (module: ${module})`);
      skipped++;
      continue;
    }

    const text = loadNarration(mdPath);
    if (!text?.trim()) {
      console.warn(`${prefix} ⚠ Narration vide : ${base}`);
      skipped++;
      continue;
    }

    const label = FORMATEUR_VOICES[module]?.name ?? module;
    console.log(`${prefix} 🎙 ${base}`);
    console.log(`        Module : ${module}  |  Formateur : ${label}`);
    console.log(`        Texte  : ${text.length} car.  |  Voix : ${voiceId.slice(0, 8)}...`);

    if (dryRun) {
      console.log(`        → [DRY-RUN] ${path.relative(lmsRoot, outPath)}\n`);
      ok++;
      continue;
    }

    try {
      await writeMistralTtsMp3File(text, outPath, (msg) => process.stdout.write(`        ${msg}\n`), voiceId);
      const size = (fs.statSync(outPath).size / 1024).toFixed(0);
      console.log(`        ✓ ${path.relative(lmsRoot, outPath)} (${size} KB)\n`);
      ok++;
    } catch (e) {
      console.error(`        ✗ ERREUR : ${e.message}\n`);
      errors++;
    }

    if (idx < mdPaths.length - 1) await sleep(GAP_MS);
  }

  // 4. Summary
  console.log("─".repeat(60));
  console.log(`✅ Terminé — ${ok} générés  |  ⚠ ${skipped} ignorés  |  ✗ ${errors} erreurs`);

  if (ok > 0 && !dryRun) {
    console.log("\n📝 Prochaine étape : mettre à jour course.ts pour ajouter les audioUrl des nouvelles leçons");
    console.log("   Fichiers dans : lms/public/audio/");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
