#!/usr/bin/env node
/**
 * Génère, pour chaque script .md sous moduleX/scripts/, un fichier .narration.txt
 * (texte prêt pour Mistral Voxtral / autre TTS).
 *
 * Usage (depuis la racine formation-immobiliere/) :
 *   node lms/scripts/extract-narration-for-audio.mjs
 *
 * Fichiers créés à côté du script : ex. module1-juridique/scripts/01-loi-alur-2026.narration.txt
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { extractNarrationAudio } from "./lib/extract-narration-audio.mjs";
import { lessonScriptDirectories, walkMarkdownScripts } from "./lib/script-discovery.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lmsRoot = path.join(__dirname, "..");
const repoRoot = path.join(lmsRoot, "..");

// Liste unique des dossiers de scripts : voir scripts/lib/script-discovery.mjs
const roots = lessonScriptDirectories(repoRoot);

let total = 0;
let empty = 0;

for (const root of roots) {
  const files = walkMarkdownScripts(root);
  for (const mdPath of files) {
    const raw = fs.readFileSync(mdPath, "utf8");
    const text = extractNarrationAudio(raw);
    const base = path.basename(mdPath, ".md");
    const outPath = path.join(path.dirname(mdPath), `${base}.narration.txt`);

    if (!text.trim()) {
      console.warn(`⚠ Vide ou sans section SCRIPT: ${path.relative(repoRoot, mdPath)}`);
      empty++;
      continue;
    }

    fs.writeFileSync(outPath, text + "\n", "utf8");
    console.log(`✓ ${path.relative(repoRoot, outPath)} (${text.length} car.)`);
    total++;
  }
}

console.log(`\n${total} fichier(s) .narration.txt créés, ${empty} ignoré(s) ou vides.`);
