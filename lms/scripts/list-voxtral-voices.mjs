#!/usr/bin/env node
/**
 * Liste toutes les voix disponibles dans Mistral Voxtral
 * et identifie les meilleures voix françaises avec accent français.
 *
 * Usage (depuis formation_immo_local/) :
 *   node lms/scripts/list-voxtral-voices.mjs
 *   node lms/scripts/list-voxtral-voices.mjs --test   # génère un MP3 de test pour chaque voix FR
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadDotEnvLocal } from "./lib/env-local.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lmsRoot = path.join(__dirname, "..");
loadDotEnvLocal(lmsRoot);

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
if (!MISTRAL_API_KEY) {
  console.error("❌ MISTRAL_API_KEY manquante dans lms/.env.local");
  process.exit(1);
}

const TEST_TEXT = "Bonjour et bienvenue dans cette formation immobilière. Nous allons parcourir ensemble les points essentiels avec clarté et professionnalisme.";
const TEST_MODE = process.argv.includes("--test");

async function listVoices() {
  const res = await fetch("https://api.mistral.ai/v1/audio/voices", {
    headers: { Authorization: `Bearer ${MISTRAL_API_KEY}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }
  return res.json();
}

async function testVoice(voiceId, voiceName, outDir) {
  const res = await fetch("https://api.mistral.ai/v1/audio/speech", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${MISTRAL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "voxtral-mini-tts-2603",
      input: TEST_TEXT,
      voice_id: voiceId,
      response_format: "mp3",
    }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.audio_data) {
    console.warn(`  ⚠ Erreur test voix ${voiceName}: ${json.message ?? res.status}`);
    return;
  }
  const safeName = voiceName.replace(/[^a-zA-Z0-9-_]/g, "_");
  const outPath = path.join(outDir, `test-${safeName}.mp3`);
  fs.writeFileSync(outPath, Buffer.from(json.audio_data, "base64"));
  console.log(`  ✓ ${outPath}`);
}

async function main() {
  console.log("🔍 Récupération des voix Mistral Voxtral...\n");

  const data = await listVoices();
  const voices = data.voices ?? data.data ?? data ?? [];

  console.log(`📢 ${voices.length} voix disponibles :\n`);

  // Filter and display French voices
  const frVoices = voices.filter((v) => {
    const lang = (v.language ?? v.locale ?? v.lang ?? "").toLowerCase();
    const name = (v.name ?? v.voice_name ?? "").toLowerCase();
    return lang.includes("fr") || name.includes("fr") || name.includes("french") || name.includes("marie") || name.includes("pierre") || name.includes("camille") || name.includes("thomas") || name.includes("alice") || name.includes("hugo") || name.includes("emma") || name.includes("gabriel");
  });

  const otherVoices = voices.filter((v) => !frVoices.includes(v));

  if (frVoices.length > 0) {
    console.log(`🇫🇷 VOIX FRANÇAISES (${frVoices.length}) :\n`);
    frVoices.forEach((v, i) => {
      const id = v.id ?? v.voice_id ?? v.uuid ?? "?";
      const name = v.name ?? v.voice_name ?? "?";
      const lang = v.language ?? v.locale ?? v.lang ?? "?";
      const gender = v.gender ?? v.characteristics?.gender ?? "?";
      const style = v.style ?? v.emotion ?? v.characteristics?.style ?? "";
      console.log(`  ${i + 1}. ${name}`);
      console.log(`     ID     : ${id}`);
      console.log(`     Langue : ${lang}  |  Genre : ${gender}  |  Style : ${style}`);
      console.log(`     Données: ${JSON.stringify(v).slice(0, 120)}`);
      console.log();
    });
  }

  if (otherVoices.length > 0) {
    console.log(`\n🌍 AUTRES VOIX (${otherVoices.length}) :\n`);
    otherVoices.forEach((v) => {
      const id = v.id ?? v.voice_id ?? "?";
      const name = v.name ?? "?";
      const lang = v.language ?? v.locale ?? "?";
      console.log(`  • ${name} (${lang}) — ${id}`);
    });
  }

  // Dump full JSON
  const dumpPath = path.join(lmsRoot, "src/data/voxtral-voices-dump.json");
  fs.writeFileSync(dumpPath, JSON.stringify(voices, null, 2), "utf8");
  console.log(`\n📄 JSON complet écrit : ${dumpPath}`);

  // Test mode — generate one MP3 per French voice
  if (TEST_MODE && frVoices.length > 0) {
    const testDir = path.join(lmsRoot, "public/audio/voice-tests");
    fs.mkdirSync(testDir, { recursive: true });
    console.log(`\n🎙️ Génération des fichiers de test dans ${testDir}...\n`);
    for (const v of frVoices) {
      const id = v.id ?? v.voice_id ?? v.uuid;
      const name = v.name ?? v.voice_name ?? id;
      if (!id) continue;
      process.stdout.write(`  Génération ${name}... `);
      await testVoice(id, name, testDir);
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  // Recommendation
  console.log("\n💡 PROCHAINES ÉTAPES :");
  console.log("  1. Écouter les fichiers de test (--test)");
  console.log("  2. Choisir les meilleures voix françaises");
  console.log("  3. Mettre à jour lms/src/data/formateur-voices.json");
  console.log("  4. Lancer : node lms/scripts/regen-all-audio-clean.mjs");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
