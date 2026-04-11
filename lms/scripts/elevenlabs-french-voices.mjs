#!/usr/bin/env node
/**
 * ElevenLabs — voix adaptées au français + échantillons MP3.
 *
 * Prérequis : `ELEVENLABS_API_KEY` dans `lms/.env.local` (ne jamais commiter la clé).
 *
 * Usage :
 *   cd lms && node scripts/elevenlabs-french-voices.mjs
 *   cd lms && node scripts/elevenlabs-french-voices.mjs --samples-top 6
 *   cd lms && node scripts/elevenlabs-french-voices.mjs --sample VOICE_ID
 *   cd lms && node scripts/elevenlabs-french-voices.mjs --formateur
 *
 * Les MP3 d’essai sont écrits dans `public/audio/elevenlabs-fr-samples/`.
 * Avec `--formateur` : une piste par module (fichiers `formateur-juridique.mp3`, etc.).
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadDotEnvLocal } from "./lib/env-local.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lmsRoot = path.join(__dirname, "..");
const defaultsPath = path.join(lmsRoot, "src/data/elevenlabs-tts-fr-defaults.json");

loadDotEnvLocal(lmsRoot);

const API = "https://api.elevenlabs.io/v1";

function loadDefaults() {
  const raw = fs.readFileSync(defaultsPath, "utf8");
  return JSON.parse(raw);
}

function scoreFrenchRelevance(v) {
  let s = 0;
  const labels = v.labels || {};
  const blob = `${v.name || ""} ${v.description || ""} ${JSON.stringify(labels)}`.toLowerCase();
  if (blob.includes("french") || blob.includes("france") || blob.includes("français")) s += 12;
  if (blob.includes("multilingual") || blob.includes("multi")) s += 4;
  const acc = String(labels.accent || "").toLowerCase();
  const lang = String(labels.language || "").toLowerCase();
  if (acc.includes("french") || lang === "fr" || lang.startsWith("fr")) s += 20;
  if (v.category === "premade") s += 2;
  if (v.category === "professional") s += 3;
  return s;
}

async function fetchVoices(apiKey) {
  const res = await fetch(`${API}/voices`, {
    headers: { "xi-api-key": apiKey },
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`GET /voices ${res.status}: ${t}`);
  }
  const data = await res.json();
  return data.voices || [];
}

async function ttsToFile(apiKey, voiceId, outPath, text, modelId, voiceSettings) {
  const res = await fetch(`${API}/text-to-speech/${voiceId}`, {
    method: "POST",
    headers: {
      "xi-api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "audio/mpeg",
    },
    body: JSON.stringify({
      text,
      model_id: modelId,
      voice_settings: voiceSettings,
    }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`TTS ${res.status}: ${t}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, buf);
}

function parseArgs() {
  const argv = process.argv.slice(2);
  let samplesTop = 0;
  let sampleId = null;
  const formateur = argv.includes("--formateur");
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--samples-top" && argv[i + 1]) {
      samplesTop = Math.max(0, parseInt(argv[i + 1], 10) || 0);
      i++;
    }
    if (argv[i] === "--sample" && argv[i + 1]) {
      sampleId = argv[i + 1];
      i++;
    }
  }
  return { samplesTop, sampleId, formateur };
}

async function main() {
  const apiKey = process.env.ELEVENLABS_API_KEY?.trim();
  if (!apiKey) {
    console.error("Définissez ELEVENLABS_API_KEY dans lms/.env.local");
    process.exit(1);
  }

  const defaults = loadDefaults();
  const { samplesTop, sampleId, formateur } = parseArgs();
  const text = defaults.sample_text_fr;
  const outDir = path.join(lmsRoot, "public/audio/elevenlabs-fr-samples");

  if (formateur) {
    const fp = path.join(lmsRoot, "src/data/formateur-voices.json");
    const formData = JSON.parse(fs.readFileSync(fp, "utf8"));
    const modules = ["juridique", "transaction", "financement", "marketing", "terrain"];
    console.log(`Génération des 5 MP3 formateurs → ${outDir}/formateur-*.mp3\n`);
    for (const mod of modules) {
      const entry = formData[mod];
      if (!entry?.elevenLabsVoiceId) {
        console.log(`  [${mod}] ignoré (pas d'elevenLabsVoiceId)`);
        continue;
      }
      const id = entry.elevenLabsVoiceId;
      const out = path.join(outDir, `formateur-${mod}.mp3`);
      process.stdout.write(`  ${mod} (${id.slice(0, 8)}…) … `);
      try {
        await ttsToFile(apiKey, id, out, text, defaults.model_id, defaults.voice_settings);
        console.log("ok");
      } catch (e) {
        console.log(`erreur: ${e.message}`);
      }
    }
    console.log("\nÉcoutez les fichiers : open public/audio/elevenlabs-fr-samples/");
    return;
  }

  if (sampleId) {
    const safe = sampleId.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 32);
    const out = path.join(outDir, `sample-${safe}.mp3`);
    console.log(`Génération TTS → ${out}`);
    await ttsToFile(apiKey, sampleId, out, text, defaults.model_id, defaults.voice_settings);
    console.log("OK");
    return;
  }

  const voices = await fetchVoices(apiKey);
  const ranked = voices
    .map((v) => ({ v, score: scoreFrenchRelevance(v) }))
    .sort((a, b) => b.score - a.score);

  console.log(`\n${voices.length} voix sur le compte. Pertinence FR (heuristique) :\n`);
  console.log(
    "score | voice_id | name | category | labels (extrait)",
  );
  for (const { v, score } of ranked.slice(0, 40)) {
    const lab = v.labels ? JSON.stringify(v.labels).slice(0, 80) : "";
    console.log(
      `${String(score).padStart(5)} | ${v.voice_id} | ${v.name || ""} | ${v.category || ""} | ${lab}`,
    );
  }

  if (samplesTop > 0) {
    const pick = ranked.slice(0, samplesTop).map((x) => x.v);
    console.log(`\nGénération de ${pick.length} fichiers MP3 dans public/audio/elevenlabs-fr-samples/ …`);
    for (const v of pick) {
      const slug = String(v.name || "voice")
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .slice(0, 40);
      const out = path.join(outDir, `${slug}-${v.voice_id.slice(0, 8)}.mp3`);
      process.stdout.write(`  ${v.name} … `);
      try {
        await ttsToFile(apiKey, v.voice_id, out, text, defaults.model_id, defaults.voice_settings);
        console.log("ok");
      } catch (e) {
        console.log(`erreur: ${e.message}`);
      }
    }
    console.log("\nÉcoutez les fichiers et choisissez les voice_id pour src/data/formateur-voices.json");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
