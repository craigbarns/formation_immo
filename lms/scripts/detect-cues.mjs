#!/usr/bin/env node
/**
 * Detect-Cues — génère les .cues.json à partir de l'alignment WhisperX
 *
 * Stratégie hybride :
 *   1. Si le markdown contient des marqueurs [[slide:...]], on les utilise
 *   2. Sinon, on détecte automatiquement les timestamps des slides via
 *      fuzzy-matching des titres de concepts sur les mots alignés
 *
 * Usage :
 *   node scripts/detect-cues.mjs              # tous
 *   node scripts/detect-cues.mjs --only 01-loi-alur-2026
 *   node scripts/detect-cues.mjs --dry-run
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lmsRoot = path.join(__dirname, "..");
const alignDir = path.join(lmsRoot, "public", "audio-align");
const cuesDir = path.join(lmsRoot, "public", "audio-align");
const repoRoot = path.join(lmsRoot, "..");

const dryRun = process.argv.includes("--dry-run");
const onlyArg = (() => {
  const i = process.argv.indexOf("--only");
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : null;
})();

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function normalizeWord(w) {
  return w
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

function tokenize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/\s+/)
    .map((w) => w.replace(/[^a-z0-9]/g, ""))
    .filter(Boolean);
}

/** Trouve la première occurrence d'une séquence de mots dans l'alignment */
function findSequenceTimestamp(words, queryTokens) {
  if (!queryTokens.length) return null;
  for (let i = 0; i <= words.length - queryTokens.length; i++) {
    let match = true;
    for (let j = 0; j < queryTokens.length; j++) {
      if (normalizeWord(words[i + j].w) !== queryTokens[j]) {
        match = false;
        break;
      }
    }
    if (match) return words[i].s;
  }
  return null;
}

/** Trouve le timestamp du premier mot d'une phrase (matching partiel) */
function findPhraseTimestamp(words, phrase) {
  const tokens = tokenize(phrase);
  if (!tokens.length) return null;
  // Essaie avec tous les mots, puis descend
  for (let n = tokens.length; n >= Math.min(2, tokens.length); n--) {
    const ts = findSequenceTimestamp(words, tokens.slice(0, n));
    if (ts !== null) return ts;
  }
  // Dernier recours : chercher le premier mot seul
  const first = tokens[0];
  for (const w of words) {
    if (normalizeWord(w.w) === first) return w.s;
  }
  return null;
}

/** Extrait les marqueurs [[slide:...]] d'un texte markdown */
function extractSlideMarkers(mdText) {
  const re = /\[\[slide:([^\]]+)\]\]/g;
  const markers = [];
  let m;
  while ((m = re.exec(mdText)) !== null) {
    // Trouve le début de la ligne pour le contexte
    const lineStart = mdText.lastIndexOf("\n", m.index) + 1;
    const context = mdText.slice(lineStart, m.index).trim();
    markers.push({
      marker: m[0],
      id: m[1].trim(),
      context,
      index: m.index,
    });
  }
  return markers;
}

/* ------------------------------------------------------------------ */
/*  Mapping leçon → alignment + markdown                              */
/* ------------------------------------------------------------------ */

// Charge course.ts pour le mapping (parsing minimal)
const coursePath = path.join(lmsRoot, "src", "data", "course.ts");
const courseRaw = fs.readFileSync(coursePath, "utf8");

// Extrait les leçons avec leur scriptFile et slug
const lessonRegex = /slug:\s*"([^"]+)"[\s\S]*?scriptFile:\s*"([^"]+)"/g;
const lessons = [];
let lm;
while ((lm = lessonRegex.exec(courseRaw)) !== null) {
  lessons.push({ slug: lm[1], scriptFile: lm[2] });
}

// Dédoublonne par slug (prend le premier)
const seen = new Set();
const uniqueLessons = [];
for (const l of lessons) {
  if (seen.has(l.slug)) continue;
  seen.add(l.slug);
  uniqueLessons.push(l);
}

console.log(`📚 ${uniqueLessons.length} leçons trouvées dans course.ts\n`);

/* ------------------------------------------------------------------ */
/*  Traitement                                                        */
/* ------------------------------------------------------------------ */

let done = 0;
let skipped = 0;
let errors = 0;
let autoDetected = 0;
let fromMarkers = 0;

for (const lesson of uniqueLessons) {
  const base = path.basename(lesson.scriptFile, ".md");
  if (onlyArg && !base.includes(onlyArg)) continue;

  const alignPath = path.join(alignDir, `${base}.alignment.json`);
  const cuesPath = path.join(cuesDir, `${base}.cues.json`);
  const mdPath = path.join(repoRoot, lesson.scriptFile);

  if (!fs.existsSync(alignPath)) {
    console.log(`⏭  ${base} — alignment.json manquant`);
    skipped++;
    continue;
  }

  if (fs.existsSync(cuesPath) && !onlyArg) {
    console.log(`⏭  ${base} — cues.json déjà existant`);
    skipped++;
    continue;
  }

  console.log(`[${done + skipped + errors + 1}] 🔍 ${base}`);

  try {
    const alignment = JSON.parse(fs.readFileSync(alignPath, "utf8"));
    const words = alignment.word_segments || [];

    // Compacte les mots (même format que audio-alignment.ts)
    const compactWords = words.map((w) => ({
      w: w.word.trim(),
      s: w.start,
      e: w.end,
    }));

    let cues = {
      version: 1,
      duration: compactWords.length ? compactWords[compactWords.length - 1].e : 0,
      slides: [],
      keyTerms: [],
    };

    // ── 1. Marqueurs [[slide:...]] ──
    let markers = [];
    if (fs.existsSync(mdPath)) {
      const mdRaw = fs.readFileSync(mdPath, "utf8");
      markers = extractSlideMarkers(mdRaw);
    }

    if (markers.length > 0) {
      console.log(`   ${markers.length} marqueur(s) [[slide:...]] trouvé(s)`);
      for (const m of markers) {
        const ts = findPhraseTimestamp(compactWords, m.context || m.id);
        cues.slides.push({
          id: m.id,
          start: ts ?? 0,
          source: "marker",
        });
      }
      cues.slides.sort((a, b) => a.start - b.start);
      fromMarkers++;
    } else {
      // ── 2. Détection automatique ──
      // On essaie de détecter les transitions basées sur les phrases de l'alignment
      const segments = alignment.segments || [];
      const slideCues = [];

      for (let i = 0; i < segments.length; i++) {
        const seg = segments[i];
        // Heuristique : début de phrase = potentiel début de slide
        // On prend le début de chaque phrase comme cue candidate
        slideCues.push({
          start: seg.start,
          text: seg.text.trim(),
        });
      }

      // On sous-échantillonne pour avoir ~1 cue toutes les 20-40 secondes
      const targetInterval = 30;
      const filtered = [];
      let last = -Infinity;
      for (const c of slideCues) {
        if (c.start - last >= targetInterval) {
          filtered.push(c);
          last = c.start;
        }
      }

      cues.slides = filtered.map((c, i) => ({
        index: i,
        start: c.start,
        source: "auto",
      }));

      autoDetected++;
    }

    // ── Key terms detection ──
    // Cherche les mots-clés fréquents (majuscules, termes techniques)
    const termCounts = new Map();
    for (const w of compactWords) {
      const nw = normalizeWord(w.w);
      if (nw.length >= 4 && /^[a-z]+$/.test(nw)) {
        termCounts.set(nw, (termCounts.get(nw) || 0) + 1);
      }
    }
    // Prend les termes qui apparaissent 2-8 fois (pas trop fréquents)
    const keyTerms = [];
    for (const [term, count] of termCounts) {
      if (count >= 2 && count <= 8) {
        // Trouve toutes les occurrences
        for (let i = 0; i < compactWords.length; i++) {
          if (normalizeWord(compactWords[i].w) === term) {
            keyTerms.push({
              term: compactWords[i].w,
              start: compactWords[i].s,
              end: compactWords[i].e,
            });
            break; // première occurrence seulement
          }
        }
      }
    }
    cues.keyTerms = keyTerms.slice(0, 10); // max 10

    if (!dryRun) {
      fs.writeFileSync(cuesPath, JSON.stringify(cues, null, 2), "utf8");
    }

    console.log(`   ✓ ${cues.slides.length} slide cue(s), ${cues.keyTerms.length} key term(s)`);
    done++;
  } catch (e) {
    console.error(`   ✗ Erreur : ${e.message}`);
    errors++;
  }
}

console.log(`\n────────────────────────────────────────`);
console.log(`✅ ${done} généré(s)  |  ⏭ ${skipped} ignoré(s)  |  ✗ ${errors} erreur(s)`);
console.log(`   Marqueurs : ${fromMarkers}  |  Auto-détectés : ${autoDetected}`);
console.log(`📁 Fichiers dans : ${cuesDir}`);
