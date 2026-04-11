#!/usr/bin/env node
/**
 * Vérifie que chaque script référencé dans lms/src/data/course.ts existe.
 * Optionnel : avertit si un fichier est très court (possible coquille ou brouillon).
 *
 * Usage (depuis la racine formation-immobiliere/) :
 *   node scripts/validate-course-content.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const coursePath = path.join(root, "lms/src/data/course.ts");

if (!fs.existsSync(coursePath)) {
  console.error(`Fichier introuvable : ${coursePath}`);
  process.exit(1);
}

const ts = fs.readFileSync(coursePath, "utf8");
const re = /scriptFile:\s*"([^"]+)"/g;
const files = [];
let m;
while ((m = re.exec(ts)) !== null) {
  files.push(m[1]);
}

if (files.length === 0) {
  console.error("Aucun scriptFile trouvé dans course.ts.");
  process.exit(1);
}

/** Avertissement si le script semble encore vide ou très court */
const WARN_LINES = 45;
let errors = 0;
let warnings = 0;

for (const rel of files) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) {
    console.error(`❌ Manquant : ${rel}`);
    errors++;
    continue;
  }
  const content = fs.readFileSync(full, "utf8");
  const lines = content.split("\n").length;
  if (lines < WARN_LINES) {
    console.warn(`⚠️  Très court (${lines} lignes) : ${rel}`);
    warnings++;
  } else {
    console.log(`✓ ${rel} (${lines} lignes)`);
  }
}

console.log(`\n${files.length} leçon(s) dans course.ts — ${errors} erreur(s), ${warnings} avertissement(s) court(s).`);
process.exit(errors > 0 ? 1 : 0);
