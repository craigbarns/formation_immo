#!/usr/bin/env node
/**
 * Génère tous les MP3 des 36 leçons via ElevenLabs TTS.
 * Voix françaises natives : Antoine (H) et Alice (F) — zero accent anglais.
 *
 * Usage :
 *   node lms/scripts/generate-elevenlabs-all.mjs
 *   node lms/scripts/generate-elevenlabs-all.mjs --only juridique
 *   node lms/scripts/generate-elevenlabs-all.mjs --dry-run
 *   node lms/scripts/generate-elevenlabs-all.mjs --skip-existing
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadDotEnvLocal } from "./lib/env-local.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lmsRoot   = path.join(__dirname, "..");
const repoRoot  = path.join(lmsRoot, "..");

loadDotEnvLocal(lmsRoot);

const API_KEY = process.env.ELEVENLABS_API_KEY?.trim();
if (!API_KEY) { console.error("❌ ELEVENLABS_API_KEY manquante dans lms/.env.local"); process.exit(1); }

const MODEL_ID     = "eleven_multilingual_v2";
const API_BASE     = "https://api.elevenlabs.io/v1";
const CHUNK_CHARS  = 4800;   // ElevenLabs max ~5000 chars/request
const GAP_MS       = 700;    // délai entre appels API
const RETRY_MAX    = 3;
const RETRY_GAP_MS = 2000;

// ─── CLI args ────────────────────────────────────────────────────────────────
const dryRun       = process.argv.includes("--dry-run");
const skipExisting = process.argv.includes("--skip-existing");
const onlyMod      = (() => { const i = process.argv.indexOf("--only"); return i >= 0 ? process.argv[i+1] : null; })();

// ─── Voix par module ──────────────────────────────────────────────────────────
const VOICES_PATH = path.join(lmsRoot, "src/data/formateur-voices.json");
const VOICES      = JSON.parse(fs.readFileSync(VOICES_PATH, "utf8"));

function getVoiceForModule(mod) {
  const v = VOICES[mod];
  return {
    voiceId:  v?.elevenLabsVoiceId  ?? "pNInz6obpgDQGcFmaJgB",
    settings: v?.elevenLabsSettings ?? { stability: 0.55, similarity_boost: 0.80, use_speaker_boost: true },
    label:    v?.elevenLabsVoiceLabel ?? "",
  };
}

// ─── 36 leçons ────────────────────────────────────────────────────────────────
const LESSONS = [
  // Module 1 — Juridique
  { mod:"juridique",   out:"01-loi-alur-2026",                           narr:"module1-juridique/scripts/01-loi-alur-2026.narration.txt" },
  { mod:"juridique",   out:"02-compromis-vente",                         narr:"module1-juridique/scripts/02-compromis-vente.narration.txt" },
  { mod:"juridique",   out:"03-diagnostics-immobiliers",                 narr:"module1-juridique/scripts/03-diagnostics-immobiliers.narration.txt" },
  { mod:"juridique",   out:"04-mandats-strategie",                       narr:"module1-juridique/scripts/04-mandats-strategie.narration.txt" },
  { mod:"juridique",   out:"05-copropriete-location",                    narr:"module1-juridique/scripts/05-copropriete-location.narration.txt" },
  { mod:"juridique",   out:"06-parcours-interactif-transparence",        narr:"module1-juridique/scripts/06-parcours-interactif-transparence.narration.txt" },
  { mod:"juridique",   out:"07-tracfin-blanchiment",                     narr:"module1-juridique/scripts/07-tracfin-blanchiment.narration.txt" },
  { mod:"juridique",   out:"08-non-discrimination",                      narr:"module1-juridique/scripts/08-non-discrimination.narration.txt" },
  { mod:"juridique",   out:"09-baux-habitation",                         narr:"module1-juridique/scripts/09-baux-habitation.narration.txt" },
  // Module 2 — Transaction
  { mod:"transaction", out:"01-estimation-immobiliere",                  narr:"module2-transaction/scripts/01-estimation-immobiliere.narration.txt" },
  { mod:"transaction", out:"02-prospection-scripts",                     narr:"module2-transaction/scripts/02-prospection-scripts.narration.txt" },
  { mod:"transaction", out:"03-negociation-mandat",                      narr:"module2-transaction/scripts/03-negociation-mandat.narration.txt" },
  { mod:"transaction", out:"04-techniques-negociation-avancees",         narr:"module2-transaction/scripts/04-techniques-negociation-avancees.narration.txt" },
  { mod:"transaction", out:"05-crm-fidelisation",                        narr:"module2-transaction/scripts/05-crm-fidelisation.narration.txt" },
  { mod:"transaction", out:"06-offre-achat-avants-contrats",             narr:"module2-transaction/scripts/06-offre-achat-avants-contrats.narration.txt" },
  { mod:"transaction", out:"07-acte-authentique-notaire",                narr:"module2-transaction/scripts/07-acte-authentique-notaire.narration.txt" },
  // Module 3 — Financement
  { mod:"financement", out:"script01-credit-immobilier-2026",            narr:"module3-financement/scripts/script01-credit-immobilier-2026.narration.txt" },
  { mod:"financement", out:"script02-fiscalite-immobiliere",             narr:"module3-financement/scripts/script02-fiscalite-immobiliere.narration.txt" },
  { mod:"financement", out:"script03-calcul-rentabilite",                narr:"module3-financement/scripts/script03-calcul-rentabilite.narration.txt" },
  { mod:"financement", out:"script04-dispositifs-fiscaux",               narr:"module3-financement/scripts/script04-dispositifs-fiscaux.narration.txt" },
  { mod:"financement", out:"script05-assurances-immobilieres",           narr:"module3-financement/scripts/script05-assurances-immobilieres.narration.txt" },
  { mod:"financement", out:"06-defiscalisation-dispositifs",             narr:"module3-financement/scripts/06-defiscalisation-dispositifs.narration.txt" },
  // Module 4 — Marketing
  { mod:"marketing",   out:"01-photos-immobilieres-secrets-pros",        narr:"module4-marketing/scripts/01-photos-immobilieres-secrets-pros.narration.txt" },
  { mod:"marketing",   out:"02-rediger-annonces-qui-vendent",            narr:"module4-marketing/scripts/02-rediger-annonces-qui-vendent.narration.txt" },
  { mod:"marketing",   out:"03-maitriser-seloger-leboncoin",             narr:"module4-marketing/scripts/03-maitriser-seloger-leboncoin.narration.txt" },
  { mod:"marketing",   out:"04-reseaux-sociaux-strategie-2026",          narr:"module4-marketing/scripts/04-reseaux-sociaux-strategie-2026.narration.txt" },
  { mod:"marketing",   out:"05-seo-immobilier-google",                   narr:"module4-marketing/scripts/05-seo-immobilier-google.narration.txt" },
  { mod:"marketing",   out:"06-video-visite-virtuelle",                  narr:"module4-marketing/scripts/06-video-visite-virtuelle.narration.txt" },
  { mod:"marketing",   out:"07-personal-branding-ereputation",           narr:"module4-marketing/scripts/07-personal-branding-ereputation.narration.txt" },
  // Module 5 — Terrain
  { mod:"terrain",     out:"01-conduire-visite-pro",                     narr:"module5-terrain/scripts/01-conduire-visite-pro.narration.txt" },
  { mod:"terrain",     out:"02-argumentaire-convertit",                  narr:"module5-terrain/scripts/02-argumentaire-convertit.narration.txt" },
  { mod:"terrain",     out:"03-techniques-closing-avancees",             narr:"module5-terrain/scripts/03-techniques-closing-avancees.narration.txt" },
  { mod:"terrain",     out:"04-promesse-acte-authentique",               narr:"module5-terrain/scripts/04-promesse-acte-authentique.narration.txt" },
  { mod:"terrain",     out:"05-fidelisation-recommandation",             narr:"module5-terrain/scripts/05-fidelisation-recommandation.narration.txt" },
  { mod:"terrain",     out:"06-r0-r1-r2-prise-mandat",                   narr:"module5-terrain/scripts/06-r0-r1-r2-prise-mandat.narration.txt" },
  { mod:"terrain",     out:"07-decouverte-client-suivi",                 narr:"module5-terrain/scripts/07-decouverte-client-suivi.narration.txt" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function chunkText(text, maxChars) {
  if (text.length <= maxChars) return [text];
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    let end = start + maxChars;
    if (end >= text.length) { chunks.push(text.slice(start)); break; }
    // cut at last sentence boundary
    const cut = text.lastIndexOf(". ", end);
    if (cut > start + maxChars * 0.5) end = cut + 2;
    chunks.push(text.slice(start, end).trim());
    start = end;
  }
  return chunks.filter(Boolean);
}

async function ttsChunk(text, voiceId, settings) {
  const body = JSON.stringify({ text, model_id: MODEL_ID, voice_settings: settings });
  for (let attempt = 1; attempt <= RETRY_MAX; attempt++) {
    const res = await fetch(`${API_BASE}/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: { "xi-api-key": API_KEY, "Content-Type": "application/json", Accept: "audio/mpeg" },
      body,
    });
    if (res.ok) return Buffer.from(await res.arrayBuffer());
    const err = await res.text();
    if (attempt < RETRY_MAX) {
      console.warn(`        ⚠ tentative ${attempt}/${RETRY_MAX} échouée (${res.status}) — retry dans ${RETRY_GAP_MS}ms`);
      await sleep(RETRY_GAP_MS);
    } else {
      throw new Error(`ElevenLabs ${res.status}: ${err.slice(0, 150)}`);
    }
  }
}

async function generateMp3(text, voiceId, settings, outPath) {
  const chunks = chunkText(text, CHUNK_CHARS);
  if (chunks.length === 1) {
    const buf = await ttsChunk(chunks[0], voiceId, settings);
    fs.writeFileSync(outPath, buf);
    return buf.length;
  }
  // Multiple chunks → concat buffers (simple concatenation, works for same-rate MP3)
  const buffers = [];
  for (let i = 0; i < chunks.length; i++) {
    process.stdout.write(`        segment ${i+1}/${chunks.length}... `);
    const buf = await ttsChunk(chunks[i], voiceId, settings);
    buffers.push(buf);
    process.stdout.write(`ok (${(buf.length/1024).toFixed(0)}KB)\n`);
    if (i < chunks.length - 1) await sleep(GAP_MS);
  }
  const total = Buffer.concat(buffers);
  fs.writeFileSync(outPath, total);
  return total.length;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const audioDir = path.join(lmsRoot, "public/audio");
  fs.mkdirSync(audioDir, { recursive: true });

  const lessons = onlyMod ? LESSONS.filter(l => l.mod === onlyMod) : LESSONS;
  if (lessons.length === 0) { console.error(`❌ Module "${onlyMod}" inconnu`); process.exit(1); }

  console.log(`\n🎙️  ElevenLabs TTS — ${lessons.length} leçon(s) à générer`);
  console.log(`   Voix : Antoine (pNInz6ob…) H·FR | Alice (Xb7hH8MS…) F·FR`);
  console.log(`   Modèle : ${MODEL_ID}\n`);

  if (dryRun) console.log("🔍 MODE DRY-RUN — aucun fichier généré\n");

  let ok = 0, skipped = 0, errors = 0;

  for (let i = 0; i < lessons.length; i++) {
    const { mod, out, narr } = lessons[i];
    const outPath   = path.join(audioDir, `${out}.mp3`);
    const narrPath  = path.join(repoRoot, narr);
    const prefix    = `[${String(i+1).padStart(2,'0')}/${lessons.length}]`;
    const { voiceId, settings, label } = getVoiceForModule(mod);

    // Check narration file
    if (!fs.existsSync(narrPath)) {
      console.warn(`${prefix} ⚠  Narration introuvable : ${narr}`);
      skipped++; continue;
    }

    // Skip if exists
    if (skipExisting && fs.existsSync(outPath)) {
      console.log(`${prefix} ⏭  Ignoré (existe) : ${out}.mp3`);
      skipped++; continue;
    }

    const text = fs.readFileSync(narrPath, "utf8").trim();
    if (!text) {
      console.warn(`${prefix} ⚠  Narration vide : ${narr}`);
      skipped++; continue;
    }

    const voiceName = voiceId === "pNInz6obpgDQGcFmaJgB" ? "Antoine (H)" : "Alice (F)";
    console.log(`${prefix} 🎙  ${out}`);
    console.log(`        Module : ${mod}  |  Voix : ${voiceName}  |  Texte : ${text.length} car.`);

    if (dryRun) { console.log(`        → [DRY-RUN]\n`); ok++; continue; }

    try {
      const size = await generateMp3(text, voiceId, settings, outPath);
      console.log(`        ✓ ${out}.mp3 — ${(size/1024).toFixed(0)} KB\n`);
      ok++;
    } catch (e) {
      console.error(`        ✗ ERREUR : ${e.message}\n`);
      errors++;
    }

    if (i < lessons.length - 1) await sleep(GAP_MS);
  }

  console.log("─".repeat(60));
  console.log(`✅ ${ok} générés  |  ⚠ ${skipped} ignorés  |  ✗ ${errors} erreurs`);
  if (errors > 0) console.log("   Relancer avec --skip-existing pour regénérer uniquement les erreurs");
}

main().catch((e) => { console.error(e); process.exit(1); });
