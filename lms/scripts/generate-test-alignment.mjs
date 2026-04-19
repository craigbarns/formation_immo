#!/usr/bin/env node
/**
 * Génère un alignment.json de test à partir d'un fichier narration.txt
 * Permet de tester le karaoké, kinetic flash et slide sync sans attendre WhisperX.
 *
 * Usage :
 *   node scripts/generate-test-alignment.mjs <slug>
 *   node scripts/generate-test-alignment.mjs 01-loi-alur-2026
 *
 * Le script lit le .narration.txt, calcule une durée estimée (~150 mots/min),
 * et génère un alignment.json avec des timestamps réalistes.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lmsRoot = path.join(__dirname, "..");
const repoRoot = path.join(lmsRoot, "..");

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: node scripts/generate-test-alignment.mjs <slug>");
  process.exit(1);
}

// Cherche le fichier narration.txt
function findNarration(slug) {
  const roots = [
    path.join(repoRoot, "module1-juridique", "scripts"),
    path.join(repoRoot, "module2-transaction", "scripts"),
    path.join(repoRoot, "module3-financement", "scripts"),
    path.join(repoRoot, "module4-marketing", "scripts"),
    path.join(repoRoot, "module5-terrain", "scripts"),
  ];
  for (const root of roots) {
    if (!fs.existsSync(root)) continue;
    const files = fs.readdirSync(root);
    for (const f of files) {
      if (f.startsWith(slug) && f.endsWith(".narration.txt")) {
        return path.join(root, f);
      }
    }
  }
  return null;
}

const narrationPath = findNarration(slug);
if (!narrationPath) {
  console.error(`❌ Fichier narration non trouvé pour : ${slug}`);
  process.exit(1);
}

const text = fs.readFileSync(narrationPath, "utf8");
const words = text
  .replace(/\n/g, " ")
  .split(/\s+/)
  .filter((w) => w.trim().length > 0);

console.log(`📖 ${slug}`);
console.log(`   ${words.length} mots trouvés dans ${path.relative(repoRoot, narrationPath)}`);

// Vitesse de parole : ~130 mots/min pour narration pédagogique
const wpm = 130;
const totalDuration = (words.length / wpm) * 60;
const avgWordDuration = totalDuration / words.length;

// Génère les segments (phrases) — coupe tous les 15-25 mots
const segments = [];
const wordSegments = [];
let currentTime = 0;
let phraseWords = [];

for (let i = 0; i < words.length; i++) {
  const w = words[i];
  const duration = avgWordDuration * (0.7 + Math.random() * 0.6); // variation +/- 30%
  const start = currentTime;
  const end = currentTime + duration;

  const wordObj = {
    word: w,
    start,
    end,
    score: 0.85 + Math.random() * 0.14,
  };

  wordSegments.push(wordObj);
  phraseWords.push(wordObj);

  // Coupe la phrase après ~20 mots ou si ponctuation forte
  const isEndOfPhrase =
    i === words.length - 1 ||
    (phraseWords.length >= 15 && /[.!?]$/.test(w)) ||
    phraseWords.length >= 25;

  if (isEndOfPhrase) {
    segments.push({
      start: phraseWords[0].start,
      end: phraseWords[phraseWords.length - 1].end,
      text: phraseWords.map((pw) => pw.word).join(" "),
      words: phraseWords,
    });
    phraseWords = [];
  }

  currentTime = end;
}

// Si reste des mots non segmentés
if (phraseWords.length > 0) {
  segments.push({
    start: phraseWords[0].start,
    end: phraseWords[phraseWords.length - 1].end,
    text: phraseWords.map((pw) => pw.word).join(" "),
    words: phraseWords,
  });
}

const alignment = {
  language: "fr",
  segments,
  word_segments: wordSegments,
};

const alignDir = path.join(lmsRoot, "public", "audio-align");
if (!fs.existsSync(alignDir)) {
  fs.mkdirSync(alignDir, { recursive: true });
}

const outPath = path.join(alignDir, `${slug}.alignment.json`);
fs.writeFileSync(outPath, JSON.stringify(alignment, null, 2), "utf8");

console.log(`   ✓ alignment.json généré (${totalDuration.toFixed(1)}s estimés)`);
console.log(`   📁 ${path.relative(lmsRoot, outPath)}`);

// Génère aussi un cues.json de test
const cues = {
  version: 1,
  duration: currentTime,
  slides: segments
    .filter((_, i) => i % 3 === 0) // 1 cue toutes les 3 phrases
    .map((seg, i) => ({
      index: i,
      start: seg.start,
      source: "auto",
    })),
  keyTerms: wordSegments
    .filter((w) => w.word.length >= 5 && Math.random() > 0.85)
    .slice(0, 8)
    .map((w) => ({
      term: w.word,
      start: w.start,
      end: w.end,
    })),
};

const cuesPath = path.join(alignDir, `${slug}.cues.json`);
fs.writeFileSync(cuesPath, JSON.stringify(cues, null, 2), "utf8");

console.log(`   ✓ cues.json généré (${cues.slides.length} slides, ${cues.keyTerms.length} keyTerms)`);
console.log(`   📁 ${path.relative(lmsRoot, cuesPath)}`);
