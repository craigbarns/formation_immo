#!/usr/bin/env node
/**
 * Génère des sous-titres .srt à partir des alignment.json WhisperX
 *
 * Usage :
 *   node scripts/generate-srt.mjs              # tous
 *   node scripts/generate-srt.mjs --only 07-decouverte-client-suivi
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lmsRoot = path.join(__dirname, "..");
const alignDir = path.join(lmsRoot, "public", "audio-align");
const srtDir = path.join(lmsRoot, "public", "audio-align");

const onlyArg = (() => {
  const i = process.argv.indexOf("--only");
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : null;
})();

function formatSrtTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")},${ms.toString().padStart(3, "0")}`;
}

function alignmentToSrt(alignment) {
  const segments = alignment.segments || [];
  let srt = "";
  let index = 1;

  for (const seg of segments) {
    // Ignore les segments vides ou trop courts (< 0.3s)
    if (!seg.text?.trim() || seg.end - seg.start < 0.3) continue;

    // Limite la longueur des lignes (~42 caractères max par ligne)
    const text = seg.text.trim();
    const lines = [];
    let current = "";
    const words = text.split(/\s+/);

    for (const w of words) {
      if ((current + " " + w).length > 42) {
        lines.push(current.trim());
        current = w;
      } else {
        current = current ? current + " " + w : w;
      }
    }
    if (current) lines.push(current.trim());

    srt += `${index}\n`;
    srt += `${formatSrtTime(seg.start)} --> ${formatSrtTime(seg.end)}\n`;
    srt += `${lines.join("\n")}\n\n`;
    index++;
  }

  return srt.trim();
}

const files = fs
  .readdirSync(alignDir)
  .filter((f) => f.endsWith(".alignment.json"))
  .filter((f) => !onlyArg || f.includes(onlyArg));

let done = 0;
let errors = 0;

for (const f of files) {
  const base = path.basename(f, ".alignment.json");
  const alignPath = path.join(alignDir, f);
  const srtPath = path.join(srtDir, `${base}.srt`);

  try {
    const alignment = JSON.parse(fs.readFileSync(alignPath, "utf8"));
    const srt = alignmentToSrt(alignment);
    fs.writeFileSync(srtPath, srt, "utf8");
    console.log(`✓ ${base}.srt (${(srt.match(/\n\n/g) || []).length + 1} segments)`);
    done++;
  } catch (e) {
    console.error(`✗ ${base} : ${e.message}`);
    errors++;
  }
}

console.log(`\n✅ ${done} SRT généré(s)  |  ✗ ${errors} erreur(s)`);
