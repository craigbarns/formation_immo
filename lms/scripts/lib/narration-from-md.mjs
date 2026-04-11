import fs from "fs";
import path from "path";
import { extractNarrationAudio, stripTtsInlineArtifacts } from "./extract-narration-audio.mjs";
import {
  roughStripMarkdownForTts,
  sanitizeForTts,
  stripHashCommentLines,
} from "./tts-chunk.mjs";

/**
 * Texte prêt pour TTS à partir d’un script `.md` de leçon :
 * préfère `basename.narration.txt`, sinon section SCRIPT du `.md`, sinon markdown allégé.
 */
export function loadNarrationTextForScriptMd(mdPath) {
  const base = path.basename(mdPath, ".md");
  const narrPath = path.join(path.dirname(mdPath), `${base}.narration.txt`);
  if (fs.existsSync(narrPath)) {
    const raw = fs.readFileSync(narrPath, "utf8");
    const t = stripTtsInlineArtifacts(sanitizeForTts(stripHashCommentLines(raw)));
    if (t.length > 0) return t;
  }
  const md = fs.readFileSync(mdPath, "utf8");
  const fromScript = extractNarrationAudio(md);
  if (fromScript?.trim()) return sanitizeForTts(fromScript.trim());
  return sanitizeForTts(roughStripMarkdownForTts(md));
}
