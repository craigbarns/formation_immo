import fs from "fs";
import path from "path";
import type { LessonVisuals, KeyConcept, StatCard, ComparisonRow } from "@/data/lesson-keyconcepts";

const PROJECT_ROOT = path.resolve(/*turbopackIgnore: true*/ process.cwd(), "..");

function findScriptFile(relPath: string): string | null {
  const candidates = [
    path.join(PROJECT_ROOT, relPath),
    path.join(process.cwd(), relPath),
    path.join(process.cwd(), "public", relPath),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function extractNarrationBlocks(md: string): string[] {
  const blocks: string[] = [];
  const regex = /\*\*NARRATION\s*:\*\*\s*\n+([\s\S]*?)(?=\n---|\n#{1,6}\s|\*\*NARRATION\s*:\*\*|\n\[B-ROLL|$)/gi;
  let m;
  while ((m = regex.exec(md)) !== null) {
    blocks.push(m[1].trim());
  }
  return blocks;
}

function cleanHeadingTitle(title: string): string {
  // Retire les durées entre parenthèses: "(30 secondes)", "(1 minute 30)", "(3 minutes)"
  return title
    .replace(/\s*\(\d+\s*(?:minute|second|min|sec)[^)]*\)\s*/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanNarrationText(text: string): string {
  // Retire les [PAUSE Xs] et les balises B-ROLL
  return text
    .replace(/\[PAUSE\s*\d+s?\]/gi, "")
    .replace(/\[B-ROLL[^\]]*\]/gi, "")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const TECHNICAL_TERMS = /narration|tts|elevenlabs|midjourney|prompt|durée|nombre de mots|rythme|voix|recommandée|alternative|script vidéo|b-roll|informations techniques/i;

const GENERIC_SECTIONS = /introduction|accroche|problématique|contenu structuré|script complet|conclusion|appel à l'action/i;

function extractBoldPhrases(text: string): string[] {
  const phrases: string[] = [];
  const regex = /\*\*([^*]+)\*\*/g;
  let m;
  while ((m = regex.exec(text)) !== null) {
    const p = m[1].trim();
    if (p.length > 10 && p.length < 200) phrases.push(p);
  }
  return [...new Set(phrases)].slice(0, 8);
}

function extractStats(text: string): StatCard[] {
  const stats: StatCard[] = [];

  // Pourcentages
  const pctRegex = /(\d+(?:[\s\u202f\u00a0]?\d*)?)\s*%/g;
  let m;
  while ((m = pctRegex.exec(text)) !== null) {
    const value = m[1].replace(/\s/g, "");
    const before = text.slice(Math.max(0, m.index - 80), m.index).toLowerCase();
    const label = before.split(/[.!?;]\s+/).pop()?.trim() || "Indicateur";
    stats.push({ value: `${value}%`, label: label.slice(0, 40), color: "blue" as const });
  }

  // Montants en euros
  const euroRegex = /(\d+(?:[\s\u202f\u00a0]?\d*){0,3})\s*€/g;
  while ((m = euroRegex.exec(text)) !== null) {
    const value = m[1].replace(/\s/g, "");
    const before = text.slice(Math.max(0, m.index - 80), m.index).toLowerCase();
    const label = before.split(/[.!?;]\s+/).pop()?.trim() || "Montant";
    stats.push({ value, unit: "€", label: label.slice(0, 40), color: "green" as const });
  }

  // Années / dates
  const yearRegex = /\b(20\d{2})\b/g;
  while ((m = yearRegex.exec(text)) !== null) {
    const year = m[1];
    const before = text.slice(Math.max(0, m.index - 60), m.index).toLowerCase();
    const label = before.split(/[.!?;]\s+/).pop()?.trim() || "Date clé";
    stats.push({ value: year, label: label.slice(0, 40), color: "gold" as const });
  }

  // Nombres importants (3+ chiffres hors pourcentages/euros)
  const numRegex = /\b(\d{3,}(?:[\s\u202f\u00a0]?\d*)*)\b/g;
  while ((m = numRegex.exec(text)) !== null) {
    const num = m[1].replace(/\s/g, "");
    if (stats.some((s) => s.value.includes(num))) continue;
    const before = text.slice(Math.max(0, m.index - 80), m.index).toLowerCase();
    const label = before.split(/[.!?;]\s+/).pop()?.trim() || "Chiffre clé";
    stats.push({ value: num, label: label.slice(0, 40), color: "navy" as const });
  }

  return stats.slice(0, 6);
}

function extractHeadings(md: string): { level: number; title: string }[] {
  const headings: { level: number; title: string }[] = [];
  const regex = /^(#{2,4})\s+(.+)$/gm;
  let m;
  while ((m = regex.exec(md)) !== null) {
    headings.push({ level: m[1].length, title: m[2].trim().replace(/[#*_]/g, "") });
  }
  return headings;
}

function extractBulletLists(text: string): string[] {
  const items: string[] = [];
  const regex = /^[-*]\s+(.+)$/gm;
  let m;
  while ((m = regex.exec(text)) !== null) {
    const item = m[1].trim().replace(/[*_]/g, "");
    if (item.length > 10 && item.length < 150) items.push(item);
  }
  return items.slice(0, 6);
}

function extractTakeaways(text: string): string[] {
  const lines = text.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  const takeaways: string[] = [];

  for (const line of lines) {
    const clean = line.replace(/[*_\[\]]/g, "").trim();
    if (clean.length > 20 && clean.length < 200 && !clean.startsWith("NARRATION") && !clean.startsWith("B-ROLL")) {
      takeaways.push(clean);
    }
  }
  return takeaways.slice(0, 6);
}

function extractComparisonTable(md: string): { title: string; colAHeader: string; colBHeader: string; rows: ComparisonRow[] } | null {
  const tableRegex = /\|(.+)\|\n\|[-\s:|]+\|\n((?:\|.+\|\n?)+)/;
  const m = md.match(tableRegex);
  if (!m) return null;

  const headers = m[1].split("|").map((h) => h.trim()).filter(Boolean);
  if (headers.length < 3) return null;

  const rows: ComparisonRow[] = [];
  const rowLines = m[2].trim().split("\n");
  for (const line of rowLines) {
    const cells = line.split("|").map((c) => c.trim()).filter(Boolean);
    if (cells.length >= 3) {
      rows.push({
        label: cells[0],
        colA: cells[1],
        colB: cells[2],
        highlight: cells[1].length > cells[2].length ? "a" : "b",
      });
    }
  }
  if (rows.length === 0) return null;

  return {
    title: "Comparatif",
    colAHeader: headers[1] || "Option A",
    colBHeader: headers[2] || "Option B",
    rows: rows.slice(0, 5),
  };
}

function pickIconForTitle(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("loi") || t.includes("juridique") || t.includes("réglement")) return "shield";
  if (t.includes("prix") || t.includes("euro") || t.includes("€") || t.includes("finance")) return "trending-up";
  if (t.includes("vente") || t.includes("mandat") || t.includes("transaction")) return "handshake";
  if (t.includes("marketing") || t.includes("annonce") || t.includes("photo")) return "megaphone";
  if (t.includes("visite") || t.includes("client") || t.includes("négociation")) return "users";
  if (t.includes("diagnostic") || t.includes("dpe") || t.includes("technique")) return "clipboard";
  if (t.includes("crédit") || t.includes("prêt") || t.includes("banque")) return "banknote";
  if (t.includes("fiscal") || t.includes("impôt") || t.includes("taxe")) return "calculator";
  if (t.includes("seo") || t.includes("google") || t.includes("réseau")) return "globe";
  if (t.includes("copropriété") || t.includes("syndic")) return "building";
  if (t.includes("compromis") || t.includes("notaire") || t.includes("acte")) return "file-text";
  return "target";
}

function pickConceptType(title: string, description: string): "rule" | "warning" | "tip" | "definition" | "stat" {
  const t = (title + " " + description).toLowerCase();
  if (t.includes("interdit") || t.includes("sanction") || t.includes("amende") || t.includes("obligation")) return "rule";
  if (t.includes("attention") || t.includes("erreur") || t.includes("risque") || t.includes("danger")) return "warning";
  if (t.includes("conseil") || t.includes("astuce") || t.includes("tip") || t.includes("secret")) return "tip";
  if (t.includes("%") || t.includes("chiffre") || t.includes("statistique") || /\d{3,}/.test(t)) return "stat";
  return "definition";
}

export function buildVisualsFromScript(scriptFile: string): LessonVisuals | null {
  const filePath = findScriptFile(scriptFile);
  if (!filePath) return null;

  let md: string;
  try {
    md = fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }

  const narrationBlocks = extractNarrationBlocks(md);
  const allNarration = narrationBlocks.join("\n\n");

  if (!allNarration.trim()) {
    // Fallback: extraire tout le texte du markdown
    const cleanMd = md
      .replace(/\[B-ROLL[^\]]*\]/gi, "")
      .replace(/\*\*NARRATION\s*:\*\*/gi, "")
      .replace(/#{1,6}\s+/g, "")
      .replace(/```[\s\S]*?```/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[*_]/g, "");
    return buildFromText(cleanMd, extractHeadings(md), md);
  }

  return buildFromText(allNarration, extractHeadings(md), md);
}

/* ------------------------------------------------------------------ */
/*  Données pour PrintableRecap                                        */
/* ------------------------------------------------------------------ */

export type RecapData = {
  introduction?: string;
  sections?: { icon: string; title: string; duration: string }[];
  keyTerms?: { term: string; definition: string }[];
};

export function buildRecapFromScript(scriptFile: string): RecapData | null {
  const filePath = findScriptFile(scriptFile);
  if (!filePath) return null;

  let md: string;
  try {
    md = fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }

  const narrationBlocks = extractNarrationBlocks(md);

  // Introduction = premier paragraphe de narration (hors questions)
  let introduction = "";
  for (const block of narrationBlocks) {
    const sentences = block.split(/[.!?]+/).map((s) => s.trim()).filter((s) => s.length > 30);
    const firstReal = sentences.find((s) => !s.includes("?") && !s.toLowerCase().includes("pause"));
    if (firstReal) {
      introduction = cleanNarrationText(firstReal).slice(0, 300);
      break;
    }
  }

  // Sections = headings niveau 3-4 nettoyés, sans les sections génériques de template
  const headings = extractHeadings(md).filter((h) => h.level >= 3 && !GENERIC_SECTIONS.test(h.title));
  const sections = headings.slice(0, 8).map((h) => ({
    icon: "📌",
    title: cleanHeadingTitle(h.title),
    duration: "",
  }));

  // Key terms = phrases en gras qui contiennent un deux-points ou une parenthèse explicative
  const keyTerms: { term: string; definition: string }[] = [];
  const boldDefs = md.match(/\*\*([^*]+)\*\*\s*[:\-–]\s*([^\n]+)/g) || [];
  for (const bd of boldDefs.slice(0, 10)) {
    const m = bd.match(/\*\*([^*]+)\*\*\s*[:\-–]\s*(.+)/);
    if (m) {
      const term = m[1].trim().slice(0, 50);
      const def = cleanNarrationText(m[2].trim()).replace(/[*_]/g, "").slice(0, 200);
      if (term && def && !TECHNICAL_TERMS.test(term + " " + def) && !keyTerms.some((k) => k.term === term)) {
        keyTerms.push({ term, definition: def });
      }
    }
  }

  // Fallback key terms: bold phrases followed by explanation in parentheses
  if (keyTerms.length === 0) {
    const parens = md.match(/\*\*([^*]+)\*\*\s*\(([^)]+)\)/g) || [];
    for (const p of parens.slice(0, 10)) {
      const m = p.match(/\*\*([^*]+)\*\*\s*\(([^)]+)\)/);
      if (m) {
        const term = m[1].trim().slice(0, 50);
        const def = m[2].trim().slice(0, 200);
        if (term && def && !TECHNICAL_TERMS.test(term + " " + def) && !keyTerms.some((k) => k.term === term)) {
          keyTerms.push({ term, definition: def });
        }
      }
    }
  }

  return {
    ...(introduction ? { introduction } : {}),
    ...(sections.length > 0 ? { sections } : {}),
    ...(keyTerms.length > 0 ? { keyTerms } : {}),
  };
}

function buildFromText(text: string, headings: { level: number; title: string }[], rawMd: string): LessonVisuals {
  const concepts: KeyConcept[] = [];
  const usedTitles = new Set<string>();

  // 1. Créer un concept par heading de niveau 3-4
  const subHeadings = headings.filter((h) => h.level >= 3).slice(0, 6);
  for (const h of subHeadings) {
    const cleanTitle = cleanHeadingTitle(h.title);
    const icon = pickIconForTitle(cleanTitle);
    // Cherche un paragraphe sous ce heading dans le markdown brut
    const escapedTitle = h.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const headingRegex = new RegExp(
      `#{${h.level}}\\s+${escapedTitle}[\\s\\S]*?(?:\\n#{1,${h.level}}\\s|\\n#{${h.level + 1},}\\s|$)`,
      "i"
    );
    const sectionMatch = rawMd.match(headingRegex);
    let description = "";
    if (sectionMatch) {
      const sectionText = sectionMatch[0];
      // Extrait les blocs narration de cette section
      const narrations = extractNarrationBlocks(sectionText);
      if (narrations.length > 0) {
        const firstNarr = narrations[0];
        const sentences = firstNarr.split(/[.!?]+/).map((s) => s.trim()).filter((s) => s.length > 15);
        description = cleanNarrationText(sentences[1] || sentences[0] || "").slice(0, 200);
      }
    }
    concepts.push({
      icon,
      title: cleanTitle,
      description,
      type: pickConceptType(cleanTitle, description),
    });
    usedTitles.add(cleanTitle);
  }

  // 2. Ajouter les phrases en gras comme concepts si on en a pas assez
  const boldPhrases = extractBoldPhrases(text);
  for (const phrase of boldPhrases) {
    if (concepts.length >= 8) break;
    const shortTitle = phrase.split(/[:.!?]/, 1)[0].trim().slice(0, 60);
    if (usedTitles.has(shortTitle)) continue;
    concepts.push({
      icon: pickIconForTitle(phrase),
      title: shortTitle,
      description: phrase.slice(shortTitle.length + 1).trim().slice(0, 200),
      type: pickConceptType(shortTitle, phrase),
    });
    usedTitles.add(shortTitle);
  }

  // 3. Si toujours pas assez, extraire des paragraphes clés
  const paragraphs = text.split(/\n{2,}/).filter((p) => p.length > 40 && p.length < 400);
  for (const para of paragraphs) {
    if (concepts.length >= 6) break;
    const firstSentence = para.split(/[.!?]/, 1)[0].trim().slice(0, 60);
    if (usedTitles.has(firstSentence)) continue;
    concepts.push({
      icon: pickIconForTitle(para),
      title: firstSentence,
      description: para.slice(firstSentence.length + 1).trim().slice(0, 200),
      type: pickConceptType(firstSentence, para),
    });
    usedTitles.add(firstSentence);
  }

  // 4. Stats
  const stats = extractStats(text);

  // 5. Comparatif (tableau markdown)
  const comparison = extractComparisonTable(text);

  // 6. Takeaways
  const bulletTakeaways = extractBulletLists(text).map(cleanNarrationText);
  const narrativeTakeaways = extractTakeaways(text).map(cleanNarrationText);
  const takeaways = bulletTakeaways.length > 0 ? bulletTakeaways : narrativeTakeaways.slice(0, 5);

  // 7. Process steps (si on trouve des listes numérotées)
  const processSteps: string[] = [];
  const numberedRegex = /^\d+[.\)]\s+(.+)$/gm;
  let nm;
  while ((nm = numberedRegex.exec(text)) !== null) {
    processSteps.push(nm[1].trim().replace(/[*_]/g, "").slice(0, 120));
  }

  return {
    keyConcepts: concepts.slice(0, 8),
    stats: stats.length > 0 ? stats : undefined,
    comparison: comparison ?? undefined,
    takeaways: takeaways.length > 0 ? takeaways : undefined,
  };
}
