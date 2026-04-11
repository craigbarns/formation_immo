#!/usr/bin/env node
/**
 * Génère `lms/public/audio/<nom-du-script>.mp3` pour chaque leçon.
 *
 * - **Mistral Voxtral** si `MISTRAL_API_KEY` + voix dans `src/data/formateur-voices.json`
 *   (par module) ou `MISTRAL_VOICE_ID` / `MISTRAL_VOICE_ID_MALE` + `FEMALE` (fallback .env).
 * - Sinon **macOS** : `say` + ffmpeg (non disponible sur Linux sans Mistral).
 *
 * Prérequis texte (racine `formation-immobiliere/`) :
 *   node lms/scripts/extract-narration-for-audio.mjs
 *
 * Usage :
 *   node lms/scripts/generate-all-lesson-audio.mjs
 *   node lms/scripts/generate-all-lesson-audio.mjs --only 01-loi-alur-2026
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadDotEnvLocal } from "./lib/env-local.mjs";
import { loadNarrationTextForScriptMd } from "./lib/narration-from-md.mjs";
import {
  describeVoiceChoiceForScriptMd,
  resolveMistralVoiceIdForScriptMd,
} from "./lib/lesson-mistral-voice.mjs";
import { writeMistralTtsMp3File } from "./lib/mistral-tts.mjs";
import { writeMacOsSayToMp3 } from "./lib/say-macos.mjs";
import { allLessonMarkdownPaths } from "./lib/script-discovery.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lmsRoot = path.join(__dirname, "..");
const repoRoot = path.join(lmsRoot, "..");

loadDotEnvLocal(lmsRoot);

const FILE_GAP_MS = 600;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function parseOnlyArg() {
  const i = process.argv.indexOf("--only");
  if (i >= 0 && process.argv[i + 1]) return process.argv[i + 1];
  return null;
}

function hasMistralVoiceEnv() {
  const v = process.env.MISTRAL_VOICE_ID?.trim();
  const m = process.env.MISTRAL_VOICE_ID_MALE?.trim();
  const f = process.env.MISTRAL_VOICE_ID_FEMALE?.trim();
  return Boolean(v || m || f);
}

function hasFormateurMistralVoices() {
  try {
    const p = path.join(lmsRoot, "src/data/formateur-voices.json");
    const data = JSON.parse(fs.readFileSync(p, "utf8"));
    return Object.values(data).some((row) => row?.mistralVoiceId?.trim());
  } catch {
    return false;
  }
}

const useMistral = Boolean(
  process.env.MISTRAL_API_KEY?.trim() &&
    (hasMistralVoiceEnv() || hasFormateurMistralVoices()),
);
const only = parseOnlyArg();

async function main() {
  if (!useMistral) {
    if (process.platform !== "darwin") {
      console.error(
        "Sans Mistral : macOS (`say`) ou MISTRAL_API_KEY + voix (formateur-voices.json ou MISTRAL_VOICE_ID / MALE+FEMME dans lms/.env.local).",
      );
      process.exit(1);
    }
    console.log(`Mode local : say + ffmpeg (voix ${process.env.LESSON_TTS_VOICE || "Jacques"})\n`);
  } else {
    console.log("Mode Mistral Voxtral (découpe + concat)\n");
  }

  let paths = allLessonMarkdownPaths(repoRoot);
  if (only) {
    paths = paths.filter((p) => path.basename(p, ".md") === only);
    if (paths.length === 0) {
      console.error(`Aucun script pour --only ${only}`);
      process.exit(1);
    }
  }

  let ok = 0;
  let skipped = 0;

  for (let idx = 0; idx < paths.length; idx++) {
    const mdPath = paths[idx];
    const base = path.basename(mdPath, ".md");
    const text = loadNarrationTextForScriptMd(mdPath);
    const outAbs = path.join(lmsRoot, "public", "audio", `${base}.mp3`);

    if (!text?.trim()) {
      console.warn(`⚠ Ignoré (texte vide) : ${path.relative(repoRoot, mdPath)}`);
      skipped++;
      continue;
    }

    const voiceId = useMistral ? resolveMistralVoiceIdForScriptMd(mdPath, lmsRoot) : null;
    if (useMistral && !voiceId) {
      console.error(`  ✗ Aucune voix résolue pour ce script. Définissez MISTRAL_VOICE_ID ou MALE+FEMME.`);
      process.exitCode = 1;
      continue;
    }

    console.log(`→ ${base}.mp3 (${text.length} car.) — ${describeVoiceChoiceForScriptMd(mdPath, lmsRoot)}`);
    try {
      if (useMistral) {
        await writeMistralTtsMp3File(text, outAbs, console.log, voiceId);
      } else {
        writeMacOsSayToMp3(text, outAbs);
      }
      console.log(`  ✓ ${outAbs}\n`);
      ok++;
      if (useMistral && idx < paths.length - 1) await sleep(FILE_GAP_MS);
    } catch (e) {
      console.error(`  ✗ ${e.message || e}`);
      process.exitCode = 1;
    }
  }

  console.log(`Terminé : ${ok} fichier(s) MP3, ${skipped} ignoré(s).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
