import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  content: string;
};

/**
 * Transforme le Markdown « auteur / studio » en contenu lisible par l'élève :
 * masque métadonnées techniques, prompts, repères B-roll, timings, notes de prod, etc.
 */
function toLearnerFriendlyContent(raw: string): string {
  const hiddenSectionStarts = [
    "## 📊 INFORMATIONS TECHNIQUES",
    "## 🎨 PROMPT MIDJOURNEY - VISUEL PRINCIPAL",
    "### PROMPT MIDJOURNEY - VISUEL PRINCIPAL",
    "## 📋 FICHE RÉCAPITULATIVE DES B-ROLLS",
    "### MÉTADONNÉES TECHNIQUES",
    "## MÉTADONNÉES TECHNIQUES",
  ];

  const lines = raw.split(/\r?\n/);
  const out: string[] = [];

  const scriptCompletRe = /^#{1,6}\s*SCRIPT\s+COMPLET\b/i;
  const hasScriptComplet = lines.some((l) => scriptCompletRe.test(l.trim()));

  let mode: "seek_script" | "body" = hasScriptComplet ? "seek_script" : "body";
  let inHiddenSection = false;
  let skipCodeBlock = false;
  let afterProductionNotes = false;

  for (const rawLine of lines) {
    const line = rawLine;
    const trimmed = line.trim();

    if (afterProductionNotes) continue;

    if (/^#{1,6}\s*NOTES?\s+DE\s+PRODUCTION/i.test(trimmed)) {
      afterProductionNotes = true;
      continue;
    }

    if (mode === "seek_script") {
      if (scriptCompletRe.test(trimmed)) {
        mode = "body";
      }
      continue;
    }

    if (hiddenSectionStarts.some((h) => trimmed.startsWith(h))) {
      inHiddenSection = true;
      continue;
    }
    if (inHiddenSection) {
      if (scriptCompletRe.test(trimmed)) {
        inHiddenSection = false;
        continue;
      }
      if (/^#{1,6}\s+/.test(trimmed)) {
        inHiddenSection = false;
      } else {
        continue;
      }
    }

    if (trimmed.startsWith("```")) {
      skipCodeBlock = !skipCodeBlock;
      continue;
    }
    if (skipCodeBlock) continue;

    if (/^#\s*SCRIPT\s+VIDÉO/i.test(trimmed)) continue;
    if (/^>\s*\*?\*?Narration audio/i.test(trimmed)) continue;
    if (/^Script rédigé pour formation immobilière/i.test(trimmed)) continue;
    if (/^\*Script prêt pour/i.test(trimmed)) continue;
    if (/^\*Version\s+/i.test(trimmed)) continue;

    if (/^\[B-ROLL\s*:?/i.test(trimmed)) continue;
    if (/^\[[Bb]-roll\s*:/i.test(trimmed)) continue;

    if (/^NARRATION\s*:$/i.test(trimmed)) continue;

    let cleaned = line.replace(/^\[\d{1,2}:\d{2}-\d{1,2}:\d{2}\]\s*/, "");
    cleaned = cleaned.replace(/\[PAUSE[^\]]*\]/gi, "");
    cleaned = cleaned.replace(/\s{2,}/g, " ").trimEnd();

    if (!cleaned.trim()) {
      out.push("");
      continue;
    }
    out.push(cleaned);
  }

  let text = out.join("\n");
  text = text.replace(/\n{3,}/g, "\n\n");
  return text.trim();
}

export function MarkdownLesson({ content }: Props) {
  const learnerContent = toLearnerFriendlyContent(content);

  return (
    <article
      className="prose prose-zinc prose-lg max-w-none prose-headings:scroll-mt-28 prose-headings:font-bold prose-headings:text-brand-navy prose-h2:text-xl prose-h2:border-b prose-h2:border-zinc-100/90 prose-h2:pb-2 prose-p:leading-relaxed prose-a:font-medium prose-a:text-brand-navy prose-a:underline prose-a:decoration-brand-navy/25 prose-a:underline-offset-2 hover:prose-a:text-brand-navy-deep prose-strong:text-zinc-900 prose-li:marker:text-brand-gold"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{learnerContent}</ReactMarkdown>
    </article>
  );
}
