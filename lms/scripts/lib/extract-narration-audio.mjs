/**
 * Extrait le texte de narration lisible pour TTS depuis un script vidéo Markdown.
 * Supprime B-roll, pauses, blocs techniques, tableaux, directions de plateau, etc.
 */

import { cleanMarkdownForTTS } from "./clean-markdown-tts.mjs";

const STOP_HEADINGS = [
  "📚",
  "RÉFÉRENCES",
  "REFERENCES",
  "POINTS CLÉS",
  "POINTS CLES",
  "FICHE RÉCAPITULATIVE",
  "FICHE RECAPITULATIVE",
  "📋 FICHE",
  "🎯 POINTS",
  /** Après le script : timing, musique, effets — ne doit pas être lu par le TTS */
  "NOTES DE PRODUCTION",
  "NOTE DE PRODUCTION",
];

const START_MARKERS = [
  "## 🎬 SCRIPT COMPLET",
  "### 🎬 SCRIPT COMPLET",
  "### 📜 SCRIPT COMPLET",
  "## SCRIPT COMPLET",
  "### SCRIPT COMPLET",
  "## 🎬 SCRIPT",
  /** Variante utilisée par module7-murs-fonds */
  "## SCRIPT INTÉGRAL",
  "### SCRIPT INTÉGRAL",
  "## SCRIPT INTEGRAL",
  "### SCRIPT INTEGRAL",
];

/** Ligne entière en gras Markdown `**...**` → contenu interne (pour détecter [B-ROLL] masqué). */
function unwrapBoldLine(trimmed) {
  const m = trimmed.match(/^\*\*(.+)\*\*$/s);
  if (m) return m[1].trim();
  return trimmed;
}

/** Supprime résidus [B-ROLL], timings [mm:ss-mm:ss] dans le texte final. */
export function stripTtsInlineArtifacts(text) {
  let t = text;
  t = t.replace(/\[[Bb]-\s*[Rr][Oo][Ll]{2}[^\]]*\]/gi, " ");
  t = t.replace(/\[\d{1,2}:\d{2}-\d{1,2}:\d{2}\]\s*[^\n]*/g, " ");
  t = t.replace(/\b(AVATAR|VOIX|NARRATEUR)\s*(\([^)]*\))?\s*:\s*/gi, " ");
  t = t.replace(/\s+/g, " ").trim();
  return t;
}

export function extractNarrationAudio(markdown) {
  const lines = markdown.split(/\r?\n/);
  let inScript = false;
  let inFence = false;
  const out = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    const bare = unwrapBoldLine(trimmed);

    if (!inScript) {
      if (START_MARKERS.some((m) => trimmed.startsWith(m) || trimmed === m)) {
        inScript = true;
      }
      continue;
    }

    if (shouldStopSection(trimmed)) break;

    if (trimmed.startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    if (/^\[B-ROLL[^\]]*\]\s*$/i.test(bare)) continue;
    if (/^\[B-ROLL[^\]]*$/i.test(bare)) continue;

    if (/^(AVATAR|VOIX|NARRATEUR)(\s*\([^)]*\))?\s*:\s*$/i.test(bare)) continue;

    if (/^\[\d{1,2}:\d{2}-\d{1,2}:\d{2}\]/i.test(bare)) continue;

    if (/^\[SEGMENT\s+\d+/i.test(bare)) continue;

    // Supprime les lignes entièrement entre crochets résiduelles (ex: [SOUS-PARTIE A : ...])
    if (/^\[[^\]]+\]\s*$/.test(bare)) continue;

    if (trimmed === "---" || trimmed === "***") continue;

    if (trimmed.startsWith("|") && trimmed.includes("|")) continue;

    if (/^#{1,6}\s+/.test(trimmed)) {
      const h = trimmed.replace(/^#+\s+/, "");
      if (STOP_HEADINGS.some((s) => h.includes(s))) break;
      continue;
    }

    if (/^\*\*NARRATION\s*:\*\*\s*$/i.test(trimmed)) continue;

    if (/^📊\s|^🎨\s|^📋\s|^🎯\s|^⏱/u.test(trimmed)) continue;

    if (/^Script rédigé pour formation/i.test(trimmed)) break;
    if (/^\|.*\|\s*$/u.test(trimmed) && trimmed.split("|").length > 2) continue;

    let t = bare;
    t = t.replace(/\[PAUSE[^\]]*\]/gi, " ");
    t = t.replace(/\[[Bb]-\s*[Rr][Oo][Ll]{2}[^\]]*\]/gi, " ");
    t = t.replace(/\b(AVATAR|VOIX|NARRATEUR)\s*(\([^)]*\))?\s*:\s*/gi, " ");
    // Supprime aussi les astérisques Markdown résiduels et les underscores
    t = t.replace(/\*\*([^*]+)\*\*/g, "$1");
    t = t.replace(/\*([^*]+)\*/g, "$1");
    t = t.replace(/__([^_]+)__/g, "$1");
    t = t.replace(/_([^_]+)_/g, "$1");
    t = t.replace(/^\s*[-*]\s+/, "");
    t = t.replace(/\s+/g, " ").trim();

    if (!t) continue;

    out.push(t);
  }

  const rawText = out.join("\n\n");
  const cleanedText = cleanMarkdownForTTS(stripTtsInlineArtifacts(rawText));
  return cleanedText;
}

function shouldStopSection(trimmed) {
  if (!trimmed.startsWith("#")) return false;
  const h = trimmed.replace(/^#+\s+/, "");
  return STOP_HEADINGS.some((s) => h.includes(s));
}
