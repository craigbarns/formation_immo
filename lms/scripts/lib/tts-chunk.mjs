/**
 * Préparation du texte et découpage pour Mistral Voxtral (segments homogènes, coupures naturelles).
 */

export function roughStripMarkdownForTts(s) {
  let t = s;
  t = t.replace(/```[\s\S]*?```/g, " ");
  t = t.replace(/^#{1,6}\s+.*/gm, " ");
  t = t.replace(/^\[B-ROLL[^\]]*\]\s*$/gim, " ");
  t = t.replace(/^\*\*NARRATION\s*:\*\*\s*$/gim, " ");
  t = t.replace(/\[PAUSE[^\]]*\]/gi, " ");
  t = t.replace(/\s+/g, " ");
  return t.trim();
}

export function stripHashCommentLines(text) {
  return text
    .split("\n")
    .filter((l) => !l.trimStart().startsWith("#"))
    .join("\n")
    .trim();
}

/** Paragraphes dupliqués consécutifs et lignes méta inutiles pour la lecture. */
export function sanitizeForTts(text) {
  let t = text.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n");
  const paras = t
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const norm = (s) => s.toLowerCase().replace(/\s+/g, " ").trim();
  const meta = /^(narration|script complet|audio formation)\s*:?\s*$/i;
  const out = [];
  for (const p of paras) {
    if (meta.test(p)) continue;
    if (out.length && norm(p) === norm(out[out.length - 1])) continue;
    out.push(p);
  }
  return out.join("\n\n");
}

function chunkOversizedParagraph(rest, maxChars) {
  const parts = [];
  while (rest.length) {
    if (rest.length <= maxChars) {
      parts.push(rest);
      break;
    }
    let cut = rest.lastIndexOf(". ", maxChars);
    if (cut < maxChars * 0.5) cut = rest.lastIndexOf(" ", maxChars);
    if (cut < 100) cut = maxChars;
    parts.push(rest.slice(0, cut + 1).trim());
    rest = rest.slice(cut + 1).trim();
  }
  return parts;
}

/**
 * Regroupe par paragraphes jusqu’à `maxChars`, puis coupe les blocs trop longs par phrases.
 */
export function chunkTextForMistralTts(s, maxChars) {
  const paras = s.split(/\n\s*\n+/).map((p) => p.replace(/\s+/g, " ").trim()).filter(Boolean);
  if (paras.length === 0) {
    return s.length <= maxChars ? [s] : chunkOversizedParagraph(s, maxChars);
  }

  const chunks = [];
  let buf = "";
  const flush = () => {
    if (buf) {
      chunks.push(buf);
      buf = "";
    }
  };

  for (const p of paras) {
    const pieces = p.length > maxChars ? chunkOversizedParagraph(p, maxChars) : [p];
    for (const piece of pieces) {
      const candidate = buf ? `${buf}\n\n${piece}` : piece;
      if (candidate.length <= maxChars) {
        buf = candidate;
      } else {
        flush();
        buf = piece;
      }
    }
  }
  flush();

  return chunks.length ? chunks : [s];
}

export function resolveMistralMaxChunkChars() {
  const raw = process.env.MISTRAL_TTS_MAX_CHARS || "5200";
  const n = parseInt(raw, 10);
  const v = Number.isFinite(n) ? n : 5200;
  return Math.min(12000, Math.max(3000, v));
}
