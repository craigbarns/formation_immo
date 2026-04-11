#!/usr/bin/env node
/**
 * Ajoute une ligne de renvoi vers le fichier .narration.txt sous le titre principal
 * (une seule fois par fichier).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, "..", "..");

const HINT =
  "\n> **Narration audio (TTS)** : texte nettoyé dans `*.narration.txt` (même nom que ce fichier). Régénérer avec `node lms/scripts/extract-narration-for-audio.mjs`, puis MP3 via `node lms/scripts/mistral-voxtral-tts.mjs`.\n";

const roots = [
  "module1-juridique/scripts",
  "module2-transaction/scripts",
  "module3-financement/scripts",
  "module4-marketing/scripts",
  "module5-terrain/scripts",
].map((p) => path.join(repoRoot, p));

for (const root of roots) {
  if (!fs.existsSync(root)) continue;
  for (const name of fs.readdirSync(root)) {
    if (!name.endsWith(".md") || name.startsWith("README")) continue;
    const mdPath = path.join(root, name);
    const narPath = path.join(root, name.replace(/\.md$/, ".narration.txt"));
    if (!fs.existsSync(narPath)) continue;

    let raw = fs.readFileSync(mdPath, "utf8");
    if (raw.includes("Narration audio (TTS)")) continue;

    const lines = raw.split("\n");
    const firstHeading = lines.findIndex((l) => l.startsWith("# "));
    if (firstHeading < 0) continue;

    const insertAt = firstHeading + 1;
    lines.splice(insertAt, 0, HINT.trimEnd());
    fs.writeFileSync(mdPath, lines.join("\n"), "utf8");
    console.log("OK", path.relative(repoRoot, mdPath));
  }
}
