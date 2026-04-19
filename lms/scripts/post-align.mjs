#!/usr/bin/env node
/**
 * Post-traitement automatique — génère cues.json + SRT dès qu'un alignment.json arrive
 * À lancer en parallèle du batch whisperx-align.mjs
 *
 * Usage :
 *   node scripts/post-align.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lmsRoot = path.join(__dirname, "..");
const alignDir = path.join(lmsRoot, "public", "audio-align");

function getAlignedFiles() {
  return fs
    .readdirSync(alignDir)
    .filter((f) => f.endsWith(".alignment.json"))
    .map((f) => path.basename(f, ".alignment.json"));
}

function needsCues(base) {
  return !fs.existsSync(path.join(alignDir, `${base}.cues.json`));
}

function needsSrt(base) {
  return !fs.existsSync(path.join(alignDir, `${base}.srt`));
}

console.log("🔁 Post-alignment watcher démarré");
console.log(`   Surveillance : ${alignDir}\n`);

let lastCount = 0;

function tick() {
  const files = getAlignedFiles();

  if (files.length !== lastCount) {
    console.log(`📦 ${files.length} alignment.json détecté(s)`);
    lastCount = files.length;
  }

  let cuesDone = 0;
  let srtDone = 0;

  for (const base of files) {
    if (needsCues(base)) {
      try {
        execSync(`node "${path.join(__dirname, "detect-cues.mjs")}" --only ${base}`, {
          stdio: "pipe",
          cwd: lmsRoot,
        });
        cuesDone++;
      } catch (e) {
        console.error(`   ✗ cues ${base} : ${e.message}`);
      }
    }

    if (needsSrt(base)) {
      try {
        execSync(`node "${path.join(__dirname, "generate-srt.mjs")}" --only ${base}`, {
          stdio: "pipe",
          cwd: lmsRoot,
        });
        srtDone++;
      } catch (e) {
        console.error(`   ✗ srt ${base} : ${e.message}`);
      }
    }
  }

  if (cuesDone || srtDone) {
    console.log(`   ✓ ${cuesDone} cue(s), ${srtDone} SRT généré(s)`);
  }
}

// Premier tick immédiat
tick();

// Puis toutes les 30 secondes
const interval = setInterval(tick, 30000);

// Arrêt propre
process.on("SIGINT", () => {
  console.log("\n👋 Arrêt du watcher");
  clearInterval(interval);
  process.exit(0);
});
