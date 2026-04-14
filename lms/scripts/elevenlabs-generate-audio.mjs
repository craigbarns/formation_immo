#!/usr/bin/env node
/**
 * Génère les MP3 via ElevenLabs TTS pour toutes les leçons.
 *
 * Voix gratuites disponibles :
 *   Antoine (pNInz6obpgDQGcFmaJgB) — masculin, français
 *   Alice   (Xb7hH8MSUJpSbSDYk0k2) — féminin, français
 *
 * Usage:
 *   node scripts/elevenlabs-generate-audio.mjs
 *   node scripts/elevenlabs-generate-audio.mjs --module juridique
 *   node scripts/elevenlabs-generate-audio.mjs --dry-run
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadDotEnvLocal } from "./lib/env-local.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lmsRoot = path.join(__dirname, "..");
const repoRoot = path.join(lmsRoot, "..");

loadDotEnvLocal(lmsRoot);

const API_KEY = process.env.ELEVENLABS_API_KEY;
if (!API_KEY) {
  console.error("❌ ELEVENLABS_API_KEY manquante dans lms/.env.local");
  process.exit(1);
}

// ─── Configuration voix par module ──────────────────────────────────────────
// Antoine (H) pour juridique, financement, terrain
// Alice (F) pour transaction, marketing
const MODULE_VOICES = {
  juridique:   { voiceId: "pNInz6obpgDQGcFmaJgB", name: "Antoine", accentColor: "#1a3a5c" },
  transaction: { voiceId: "Xb7hH8MSUJpSbSDYk0k2", name: "Alice",   accentColor: "#2d5a87" },
  financement: { voiceId: "pNInz6obpgDQGcFmaJgB", name: "Antoine", accentColor: "#142d45" },
  marketing:   { voiceId: "Xb7hH8MSUJpSbSDYk0k2", name: "Alice",   accentColor: "#d4af37" },
  terrain:     { voiceId: "pNInz6obpgDQGcFmaJgB", name: "Antoine", accentColor: "#3b6e8f" },
};

const MODEL_ID = "eleven_multilingual_v2";
const API = "https://api.elevenlabs.io/v1";

const dryRun = process.argv.includes("--dry-run");
const onlyModule = (() => {
  const i = process.argv.indexOf("--module");
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : null;
})();

// ─── Lessons mapping ─────────────────────────────────────────────────────────

const LESSONS = [
  { module: "juridique",   lesson: "loi-alur",            narr: "module1-juridique/scripts/01-loi-alur-2026.narration.txt" },
  { module: "juridique",   lesson: "compromis",           narr: "module1-juridique/scripts/02-compromis-vente.narration.txt" },
  { module: "juridique",   lesson: "diagnostics",         narr: "module1-juridique/scripts/03-diagnostics-immobiliers.narration.txt" },
  { module: "juridique",   lesson: "mandats",             narr: "module1-juridique/scripts/04-mandats-strategie.narration.txt" },
  { module: "juridique",   lesson: "copropriete",         narr: "module1-juridique/scripts/05-copropriete-location.narration.txt" },
  { module: "juridique",   lesson: "parcours-interactif", narr: "module1-juridique/scripts/06-parcours-interactif-transparence.narration.txt" },
  { module: "transaction", lesson: "estimation",          narr: "module2-transaction/scripts/01-estimation-immobiliere.narration.txt" },
  { module: "transaction", lesson: "prospection",         narr: "module2-transaction/scripts/02-prospection-scripts.narration.txt" },
  { module: "transaction", lesson: "negociation-mandat",  narr: "module2-transaction/scripts/03-negociation-mandat.narration.txt" },
  { module: "transaction", lesson: "negociation-avancee", narr: "module2-transaction/scripts/04-techniques-negociation-avancees.narration.txt" },
  { module: "transaction", lesson: "crm",                 narr: "module2-transaction/scripts/05-crm-fidelisation.narration.txt" },
  { module: "financement", lesson: "credit",              narr: "module3-financement/scripts/script01-credit-immobilier-2026.narration.txt" },
  { module: "financement", lesson: "fiscalite",           narr: "module3-financement/scripts/script02-fiscalite-immobiliere.narration.txt" },
  { module: "financement", lesson: "rentabilite",         narr: "module3-financement/scripts/script03-calcul-rentabilite.narration.txt" },
  { module: "financement", lesson: "dispositifs",         narr: "module3-financement/scripts/script04-dispositifs-fiscaux.narration.txt" },
  { module: "financement", lesson: "assurances",          narr: "module3-financement/scripts/script05-assurances-immobilieres.narration.txt" },
  { module: "marketing",   lesson: "photos",              narr: "module4-marketing/scripts/01-photos-immobilieres-secrets-pros.narration.txt" },
  { module: "marketing",   lesson: "annonces",            narr: "module4-marketing/scripts/02-rediger-annonces-qui-vendent.narration.txt" },
  { module: "marketing",   lesson: "portails",            narr: "module4-marketing/scripts/03-maitriser-seloger-leboncoin.narration.txt" },
  { module: "marketing",   lesson: "reseaux",             narr: "module4-marketing/scripts/04-reseaux-sociaux-strategie-2026.narration.txt" },
  { module: "marketing",   lesson: "seo",                 narr: "module4-marketing/scripts/05-seo-immobilier-google.narration.txt" },
  { module: "terrain",     lesson: "visite",              narr: "module5-terrain/scripts/01-conduire-visite-pro.narration.txt" },
  { module: "terrain",     lesson: "argumentaire",        narr: "module5-terrain/scripts/02-argumentaire-convertit.narration.txt" },
  { module: "terrain",     lesson: "closing",             narr: "module5-terrain/scripts/03-techniques-closing-avancees.narration.txt" },
  { module: "terrain",     lesson: "promesse",            narr: "module5-terrain/scripts/04-promesse-acte-authentique.narration.txt" },
  { module: "terrain",     lesson: "fidelisation",        narr: "module5-terrain/scripts/05-fidelisation-recommandation.narration.txt" },
];

const lessons = onlyModule ? LESSONS.filter(l => l.module === onlyModule) : LESSONS;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function loadText(narrPath) {
  const full = path.join(repoRoot, narrPath);
  if (!fs.existsSync(full)) return null;
  return fs.readFileSync(full, "utf8")
    .split("\n")
    .filter(l => !l.trimStart().startsWith("#"))
    .join(" ")
    .replace(/\s+/g, " ")
    .replace(/"/g, "")
    .trim();
}

/** Découpe en chunks de max 2500 chars (limite ElevenLabs) */
function chunkText(text, maxChars = 2500) {
  if (text.length <= maxChars) return [text];
  const chunks = [];
  let remaining = text;
  while (remaining.length > 0) {
    if (remaining.length <= maxChars) { chunks.push(remaining); break; }
    let cut = maxChars;
    for (let i = maxChars; i >= maxChars * 0.6; i--) {
      if (".?!;".includes(remaining[i]) && remaining[i + 1] === " ") { cut = i + 1; break; }
    }
    chunks.push(remaining.slice(0, cut).trim());
    remaining = remaining.slice(cut).trim();
  }
  return chunks;
}

async function ttsToBuffer(text, voiceId) {
  const res = await fetch(`${API}/text-to-speech/${voiceId}`, {
    method: "POST",
    headers: {
      "xi-api-key": API_KEY,
      "Content-Type": "application/json",
      Accept: "audio/mpeg",
    },
    body: JSON.stringify({
      text,
      model_id: MODEL_ID,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`${res.status}: ${err.slice(0, 200)}`);
  }
  const buf = await res.arrayBuffer();
  return Buffer.from(buf);
}

/** Concatène des buffers MP3 avec un silences entre eux */
async function concatMp3Buffers(buffers, silenceMs = 300) {
  if (buffers.length === 1) return buffers[0];

  // Simple approach: concatenate raw MP3 data (works for most MP3 files)
  const result = [];
  for (let i = 0; i < buffers.length; i++) {
    result.push(buffers[i]);
    if (i < buffers.length - 1) {
      // 300ms of silence as MP3 padding (approx 4KB per 300ms at 128kbps)
      result.push(Buffer.alloc(4096, 0xff));
    }
  }
  return Buffer.concat(result);
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🎙  ElevenLabs TTS — ${lessons.length} leçons${dryRun ? " [DRY RUN]" : ""}\n`);

  // Summary
  const byModule = {};
  for (const l of lessons) {
    if (!byModule[l.module]) {
      const v = MODULE_VOICES[l.module];
      byModule[l.module] = { count: 0, voice: v.name, voiceId: v.voiceId };
    }
    byModule[l.module].count++;
  }
  for (const [slug, info] of Object.entries(byModule)) {
    console.log(`  📚 ${slug} (${info.count} leçons) → ${info.voice}`);
  }
  console.log();

  let ok = 0, skipped = 0, failed = 0;

  for (let idx = 0; idx < lessons.length; idx++) {
    const l = lessons[idx];
    const v = MODULE_VOICES[l.module];
    const outPath = path.join(lmsRoot, "public", "audio", `${l.lesson}.mp3`);

    const text = loadText(l.narr);
    if (!text || text.length < 50) {
      console.log(`⚠  SKIP ${l.lesson} — texte vide`);
      skipped++;
      continue;
    }

    const chunks = chunkText(text);
    console.log(`[${idx + 1}/${lessons.length}] ${l.module}/${l.lesson}`);
    console.log(`    Voix: ${v.name} — ${text.length} chars — ${chunks.length} chunk(s)`);

    if (fs.existsSync(outPath)) {
      const s = fs.statSync(outPath);
      console.log(`    Existant: ${(s.size / 1024).toFixed(1)} Ko`);
    }

    if (dryRun) {
      console.log(`    [DRY RUN] Générerait ${l.lesson}.mp3`);
      ok++;
      continue;
    }

    try {
      const buffers = [];
      for (let c = 0; c < chunks.length; c++) {
        console.log(`    Chunk ${c + 1}/${chunks.length}...`);
        const buf = await ttsToBuffer(chunks[c], v.voiceId);
        buffers.push(buf);
        console.log(`    → ${(buf.length / 1024).toFixed(1)} Ko`);
        // Rate limit: 1 req/sec
        if (c < chunks.length - 1) await new Promise(r => setTimeout(r, 1200));
      }

      const final = buffers.length === 1 ? buffers[0] : await concatMp3Buffers(buffers);
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, final);
      console.log(`    ✅ ${l.lesson}.mp3 — ${(final.length / 1024).toFixed(1)} Ko`);
      ok++;

      // Rate limit between lessons
      if (idx < lessons.length - 1) await new Promise(r => setTimeout(r, 1500));
    } catch (e) {
      console.error(`    ❌ ${e.message}`);
      failed++;
    }
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(`✅ Terminé : ${ok} OK, ${skipped} skip, ${failed} échoué`);
}

main().catch(e => { console.error(e); process.exit(1); });
