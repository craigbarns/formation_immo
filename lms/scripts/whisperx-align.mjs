#!/usr/bin/env node
/**
 * WhisperX Alignment Batch — génère les .alignment.json pour tous les MP3
 *
 * Prérequis :
 *   python3 -m venv .venv-whisperx
 *   source .venv-whisperx/bin/activate
 *   pip install whisperx
 *
 * Usage :
 *   node scripts/whisperx-align.mjs              # tous les MP3
 *   node scripts/whisperx-align.mjs --only 01-loi-alur-2026
 *   node scripts/whisperx-align.mjs --dry-run
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lmsRoot = path.join(__dirname, "..");
const audioDir = path.join(lmsRoot, "public", "audio");
const alignDir = path.join(lmsRoot, "public", "audio-align");

const dryRun = process.argv.includes("--dry-run");
const onlyArg = (() => {
  const i = process.argv.indexOf("--only");
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : null;
})();

// Trouve le binaire whisperx dans le venv du projet
const whisperxBin = (() => {
  const candidates = [
    path.join(lmsRoot, ".venv-whisperx", "bin", "whisperx"),
    path.join(lmsRoot, ".venv-whisperx", "Scripts", "whisperx.exe"),
  ];
  for (const c of candidates) if (fs.existsSync(c)) return c;
  try {
    return execSync("which whisperx", { encoding: "utf8" }).trim();
  } catch {
    return null;
  }
})();

if (!whisperxBin) {
  console.error("❌ whisperx introuvable. Installe-le :");
  console.error("  python3 -m venv .venv-whisperx");
  console.error("  source .venv-whisperx/bin/activate");
  console.error("  pip install whisperx");
  process.exit(1);
}

if (!fs.existsSync(alignDir)) {
  if (!dryRun) fs.mkdirSync(alignDir, { recursive: true });
}

const mp3Files = fs
  .readdirSync(audioDir)
  .filter((f) => f.endsWith(".mp3"))
  .filter((f) => !onlyArg || f.includes(onlyArg))
  .map((f) => ({
    mp3: path.join(audioDir, f),
    base: path.basename(f, ".mp3"),
    alignPath: path.join(alignDir, `${path.basename(f, ".mp3")}.alignment.json`),
  }));

console.log(`🔍 ${mp3Files.length} fichier(s) à aligner`);
console.log(`   Venv : ${whisperxBin}`);
console.log(`   Sortie : ${alignDir}\n`);

if (dryRun) {
  for (const f of mp3Files) {
    const exists = fs.existsSync(f.alignPath);
    console.log(`${exists ? "✓" : "○"} ${f.base} → ${path.relative(lmsRoot, f.alignPath)}`);
  }
  process.exit(0);
}

let done = 0;
let skipped = 0;
let errors = 0;

for (const f of mp3Files) {
  if (fs.existsSync(f.alignPath)) {
    console.log(`⏭  [${done + skipped + errors + 1}/${mp3Files.length}] ${f.base} — déjà aligné`);
    skipped++;
    continue;
  }

  const tmpJson = path.join(alignDir, `${f.base}.tmp.json`);
  const cmd = `"${whisperxBin}" "${f.mp3}" \
    --model large-v2 \
    --language fr \
    --align_model VOXPOPULI \
    --output_format json \
    --output_dir "${alignDir}"`;

  console.log(`\n[${done + skipped + errors + 1}/${mp3Files.length}] 🎙 ${f.base}`);
  const start = Date.now();

  try {
    execSync(cmd, { stdio: "inherit", cwd: lmsRoot, env: { ...process.env, PYTHONIOENCING: "utf8" } });

    // WhisperX nomme la sortie <base>.json, on la renomme en .alignment.json
    const whisperOut = path.join(alignDir, `${f.base}.json`);
    if (fs.existsSync(whisperOut)) {
      fs.renameSync(whisperOut, f.alignPath);
    }

    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`   ✓ alignment.json en ${elapsed}s`);
    done++;
  } catch (e) {
    console.error(`   ✗ Erreur : ${e.message}`);
    errors++;
  }
}

console.log(`\n────────────────────────────────────────`);
console.log(`✅ ${done} aligné(s)  |  ⏭ ${skipped} déjà fait(s)  |  ✗ ${errors} erreur(s)`);
console.log(`📁 Fichiers dans : ${alignDir}`);
