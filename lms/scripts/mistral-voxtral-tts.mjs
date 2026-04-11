#!/usr/bin/env node
/**
 * TTS ponctuel via Mistral Voxtral — même pipeline que `generate-all-lesson-audio.mjs`.
 * @see https://docs.mistral.ai/capabilities/audio/text_to_speech/speech
 *
 * Variables : `MISTRAL_API_KEY`, `MISTRAL_VOICE_ID` (ou `--voice` UUID).
 * Liste des voix : GET https://api.mistral.ai/v1/audio/voices
 *
 * Usage (depuis `formation-immobiliere/` ou `lms/`, chemins relatifs au cwd) :
 *   node lms/scripts/mistral-voxtral-tts.mjs --out lms/public/audio/extrait.mp3 --input chemin/vers/texte.txt
 *   node lms/scripts/mistral-voxtral-tts.mjs --out lms/public/audio/extrait.mp3 --text "Bonjour" --voice <uuid>
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadDotEnvLocal } from "./lib/env-local.mjs";
import { roughStripMarkdownForTts, sanitizeForTts } from "./lib/tts-chunk.mjs";
import { writeMistralTtsMp3File } from "./lib/mistral-tts.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lmsRoot = path.join(__dirname, "..");

loadDotEnvLocal(lmsRoot);

function parseArgs() {
  const a = process.argv.slice(2);
  let input = null;
  let out = null;
  let text = null;
  let voice = null;
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--input" && a[i + 1]) {
      input = a[++i];
    } else if (a[i] === "--out" && a[i + 1]) {
      out = a[++i];
    } else if (a[i] === "--text" && a[i + 1]) {
      text = a[++i];
    } else if (a[i] === "--voice" && a[i + 1]) {
      voice = a[++i];
    }
  }
  return { input, out, text, voice };
}

async function main() {
  const { input, out, text: inlineText, voice } = parseArgs();
  if (!out) {
    console.error(
      "Usage: node lms/scripts/mistral-voxtral-tts.mjs --out lms/public/audio/fichier.mp3 (--input fichier.txt | --text \"...\")",
    );
    process.exit(1);
  }

  let raw = inlineText;
  if (input) {
    const p = path.isAbsolute(input) ? input : path.join(process.cwd(), input);
    raw = fs.readFileSync(p, "utf8");
  }
  if (!raw?.trim()) {
    console.error("Aucun texte : fournissez --input ou --text");
    process.exit(1);
  }

  const cleaned = sanitizeForTts(roughStripMarkdownForTts(raw));
  const outAbs = path.isAbsolute(out) ? out : path.join(process.cwd(), out);

  await writeMistralTtsMp3File(cleaned, outAbs, console.log, voice?.trim() || undefined);
  console.log("\n→ Fichier écrit :", outAbs);
  console.log("→ URL typique côté app : /audio/" + path.basename(outAbs));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
