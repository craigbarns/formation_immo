"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import type { ModuleAvatar } from "@/data/module-avatars";
import type { LessonVisuals, KeyConcept, StatCard, ComparisonRow } from "@/data/lesson-keyconcepts";
import type { QuizCheckpoint } from "@/data/quiz-checkpoints";
import type { ResolvedAudioQuizItem } from "@/data/audio-quiz-schedule";
import confetti from "canvas-confetti";
import { EmojiIcon } from "@/components/ui/EmojiIcon";
import { KaraokeOverlay } from "./KaraokeOverlay";
import { KineticFlash } from "./KineticFlash";
import { SubtitleOverlay } from "./SubtitleOverlay";
import { ProgressPreview } from "./ProgressPreview";
import { WaveformBars } from "./WaveformBars";
import { compactAlignment, type LessonAlignment } from "@/lib/audio-alignment";
import { loadLessonCues, findActiveSlideFromCues, type LessonCues } from "@/lib/lesson-cues";
import { getModuleTheme } from "@/data/module-themes";
import { saveProgress, loadProgress, clearProgress } from "@/lib/playback-progress";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { addBookmark, loadBookmarks, removeBookmark, type AudioBookmark } from "@/lib/audio-bookmarks";
import { createAudioStats, updateStatsOnPlay, updateStatsOnPause, updateStatsOnSeek, finalizeStats, type AudioStats } from "@/lib/audio-stats";
import { generateClipLink, copyToClipboard, parseClipTimeFromUrl } from "@/lib/shareable-clip";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

type Slide =
  | { kind: "title"; title: string; subtitle: string }
  | { kind: "concept"; concept: KeyConcept; index: number; total: number }
  | { kind: "stats"; stats: StatCard[] }
  | { kind: "comparison"; title: string; colA: string; colB: string; rows: ComparisonRow[] }
  | { kind: "takeaways"; items: string[] }
  | { kind: "process"; steps: string[] }
  | { kind: "highlight"; statement: string }
  | { kind: "term"; term: string; context: string }
  | { kind: "focus"; title: string; body: string; icon?: string }
  | { kind: "checkpoint"; title: string; bullets: string[] }
  | { kind: "trainer-tip"; concept: KeyConcept }
  | { kind: "chart"; stats: StatCard[] }
  | { kind: "end"; title: string };

type Props = {
  audioUrl: string;
  title: string;
  avatar?: ModuleAvatar;
  visuals: LessonVisuals | null;
  moduleTitle?: string;
  moduleSlug?: string;
  lessonSlug?: string;
  audioQuizSchedule?: ResolvedAudioQuizItem[];
  alignmentUrl?: string | null;
};

/* ------------------------------------------------------------------ */
/*  Chapter grouping                                                    */
/* ------------------------------------------------------------------ */

type ChapterLabel = {
  name: string;
  startSlide: number;
  endSlide: number;
};

const SLIDE_KIND_TO_CHAPTER: Record<string, string> = {
  title: "Introduction",
  concept: "Concepts clés",
  stats: "Données",
  chart: "Données",
  comparison: "Comparatif",
  takeaways: "À retenir",
  process: "À retenir",
  highlight: "Concepts clés",
  term: "Concepts clés",
  focus: "Concepts clés",
  checkpoint: "À retenir",
  "trainer-tip": "Concepts clés",
  end: "Fin",
};

const CHAPTER_INFO: Record<string, { icon: string; color: string; bg: string; gradient: string }> = {
  "Introduction":   { icon: "📖", color: "#60a5fa", bg: "rgba(37,99,235,0.85)",   gradient: "from-blue-950/95 via-[var(--surface-dark)]/98 to-[var(--surface-dark)]/98" },
  "Concepts clés":  { icon: "🧠", color: "#a78bfa", bg: "rgba(109,40,217,0.85)",  gradient: "from-violet-950/95 via-[var(--surface-dark)]/98 to-[var(--surface-dark)]/98" },
  "Données":        { icon: "📊", color: "#22d3ee", bg: "rgba(8,145,178,0.85)",   gradient: "from-cyan-950/95 via-[var(--surface-dark)]/98 to-[var(--surface-dark)]/98" },
  "Comparatif":     { icon: "⚖️", color: "#fbbf24", bg: "rgba(180,83,9,0.85)",    gradient: "from-amber-950/95 via-[var(--surface-dark)]/98 to-[var(--surface-dark)]/98" },
  "À retenir":      { icon: "✅", color: "#34d399", bg: "rgba(4,120,87,0.85)",    gradient: "from-emerald-950/95 via-[var(--surface-dark)]/98 to-[var(--surface-dark)]/98" },
  "Fin":            { icon: "🎯", color: "#d4af37", bg: "rgba(120,90,10,0.85)",   gradient: "from-yellow-950/95 via-[var(--surface-dark)]/98 to-[var(--surface-dark)]/98" },
};

const CHAPTER_ORDER = ["Introduction", "Concepts clés", "Données", "Comparatif", "À retenir", "Fin"];

const CHAPTER_TOPBAR_LABELS: Record<string, string> = {
  "Introduction": "INTRO",
  "Concepts clés": "CONCEPTS",
  "Données": "DATA",
  "Comparatif": "COMPARATIF",
  "À retenir": "CHECKPOINT",
  "Fin": "FIN",
};

function buildChapterLabels(slides: Slide[]): ChapterLabel[] {
  const chapters: ChapterLabel[] = [];
  let lastChapter = "";
  // startSlide intentionally unused (reserved for future chapter logic)

  slides.forEach((s, i) => {
    const ch = SLIDE_KIND_TO_CHAPTER[s.kind] ?? "Concepts clés";
    if (ch !== lastChapter) {
      if (lastChapter) {
        chapters[chapters.length - 1].endSlide = i - 1;
      }
      chapters.push({ name: ch, startSlide: i, endSlide: slides.length - 1 });
      lastChapter = ch;
    }
    if (i === slides.length - 1 && chapters.length > 0) {
      chapters[chapters.length - 1].endSlide = i;
    }
  });

  return chapters;
}

function getChapterForSlide(chapters: ChapterLabel[], slideIndex: number): ChapterLabel | null {
  return chapters.find((c) => slideIndex >= c.startSlide && slideIndex <= c.endSlide) ?? null;
}

/**
 * Barre de chapitres "executive": un seul onglet par chapitre, sans répétitions,
 * même si les types de slides reviennent plus tard dans la timeline.
 */
function buildUniqueChapterLabels(slides: Slide[]): ChapterLabel[] {
  const raw = buildChapterLabels(slides);
  const seen = new Set<string>();
  const unique: ChapterLabel[] = [];

  for (const name of CHAPTER_ORDER) {
    const first = raw.find((c) => c.name === name);
    if (first && !seen.has(name)) {
      seen.add(name);
      unique.push({ ...first });
    }
  }

  return unique;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getSlideWeight(slide: Slide): number {
  switch (slide.kind) {
    case "title": return 10;
    case "end": return 5;
    case "highlight": return 12;
    case "trainer-tip": return 20;
    case "concept": return 25 + (slide.concept.description.length > 50 ? 15 : 0);
    case "stats": return 20;
    case "chart": return 20;
    case "comparison": return 30;
    case "takeaways": return 25;
    case "process": return 20;
    default: return 15;
  }
}

function getWeightedFallbackSlide(slides: Slide[], current: number, duration: number): number {
  if (duration === 0 || slides.length === 0) return 0;
  
  const weights = slides.map(getSlideWeight);
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  
  const targetWeight = (current / duration) * totalWeight;
  let accumulated = 0;
  
  for (let i = 0; i < slides.length; i++) {
    accumulated += weights[i];
    if (targetWeight <= accumulated) {
      return i;
    }
  }
  return slides.length - 1;
}

function fmt(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function getSlideDisplayTitle(slide: Slide): string {
  switch (slide.kind) {
    case "title":
      return "Introduction";
    case "concept":
      return slide.concept.title;
    case "stats":
      return "Chiffres clés";
    case "chart":
      return "Visualisation";
    case "comparison":
      return slide.title;
    case "takeaways":
      return "À retenir";
    case "process":
      return "Processus";
    case "highlight":
      return "Point clé";
    case "term":
      return slide.term;
    case "focus":
      return slide.title;
    case "checkpoint":
      return slide.title;
    case "trainer-tip":
      return "Conseil formateur";
    case "end":
      return "Synthèse";
  }
}

const SPEEDS = [0.75, 1, 1.25, 1.5, 2] as const;

const CONCEPT_ICONS: Record<string, string> = {
  "balance-scale": "\u2696\uFE0F",
  "id-card": "\uD83E\uDEAA",
  "graduation-cap": "\uD83C\uDF93",
  "eye": "\uD83D\uDC41\uFE0F",
  "file-signature": "\u270D\uFE0F",
  "clock": "\u23F0",
  "shield": "\uD83D\uDEE1\uFE0F",
  "thermometer": "\uD83C\uDF21\uFE0F",
  "alert-triangle": "\u26A0\uFE0F",
  "zap": "\u26A1",
  "file-text": "\uD83D\uDCC4",
  "users": "\uD83D\uDC65",
  "search": "\uD83D\uDD0D",
  "trending-up": "\uD83D\uDCC8",
  "sliders": "\uD83C\uDFA8",
  "target": "\uD83C\uDFAF",
  "anchor": "\u2693",
  "database": "\uD83D\uDDC4\uFE0F",
  "repeat": "\uD83D\uDD01",
  "percent": "\uD83D\uDCCA",
  "calendar": "\uD83D\uDCC5",
  "gift": "\uD83C\uDF81",
  "bar-chart": "\uD83D\uDCCA",
  "bar-chart-2": "\uD83D\uDCC9",
  "dollar-sign": "\uD83D\uDCB0",
  "camera": "\uD83D\uDCF7",
  "sun": "\u2600\uFE0F",
  "layout": "\uD83C\uDFE0",
  "edit": "\u270F\uFE0F",
  "align-left": "\uD83D\uDCDD",
  "alert-circle": "\u26A0\uFE0F",
  "map-pin": "\uD83D\uDCCD",
  "compass": "\uD83E\uDDED",
  "check-circle": "\u2705",
  "check-square": "\u2611\uFE0F",
  "thumbs-up": "\uD83D\uDC4D",
  "heart": "\u2764\uFE0F",
  "star": "\u2B50",
  "home": "\uD83C\uDFE0",
  "trending-down": "\uD83D\uDCC9",
};

const TYPE_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  definition: { bg: "bg-blue-500/20", border: "border-blue-400/50", text: "text-blue-200" },
  rule: { bg: "bg-white/10", border: "border-white/20", text: "text-white/90" },
  tip: { bg: "bg-emerald-500/20", border: "border-emerald-400/50", text: "text-emerald-200" },
  warning: { bg: "bg-amber-500/20", border: "border-amber-400/50", text: "text-amber-200" },
  stat: { bg: "bg-brand-gold/20", border: "border-brand-gold/40", text: "text-brand-gold" },
};

const TYPE_LABELS: Record<string, string> = {
  definition: "Definition",
  rule: "Regle",
  tip: "Conseil pro",
  warning: "Attention",
  stat: "Chiffre cle",
};

const STAT_COLORS: Record<string, string> = {
  navy: "text-white",
  gold: "text-brand-gold",
  green: "text-emerald-400",
  red: "text-red-400",
  blue: "text-blue-400",
};

const STAT_BAR_COLORS: Record<string, string> = {
  navy: "bg-white",
  gold: "bg-brand-gold",
  green: "bg-emerald-400",
  red: "bg-red-400",
  blue: "bg-blue-400",
};

const MODULE_EXTRA_VISUALS: Record<string, { terms: string[]; focus: string[]; checkpoints: string[] }> = {
  juridique: {
    terms: ["Conformite", "Transparence", "Mandat", "SRU", "TRACFIN", "Diagnostics"],
    focus: [
      "Verifier les obligations legales avant chaque mise en commercialisation.",
      "Documenter les preuves de conformite dans votre process agence.",
      "Prioriser la securisation juridique pour limiter les risques de contentieux.",
    ],
    checkpoints: [
      "Valider les mentions obligatoires avant diffusion.",
      "Controler les pieces juridiques critiques du dossier.",
      "Tracer les decisions sensibles dans le CRM.",
    ],
  },
  transaction: {
    terms: ["Prospection", "Mandat", "Estimation", "Objection", "Closing", "Relance"],
    focus: [
      "Transformer chaque interaction en etape concrete vers le mandat.",
      "Defendre vos recommandations avec donnees marche + scenario client.",
      "Utiliser un script vivant et personnalise selon le profil vendeur.",
    ],
    checkpoints: [
      "Qualifier le lead avant proposition de valeur.",
      "Structurer la relance en sequence claire.",
      "Conclure avec une prochaine action datee.",
    ],
  },
  financement: {
    terms: ["Capacite", "Fiscalite", "Cashflow", "Rentabilite", "Denormandie", "Assurance"],
    focus: [
      "Relier chaque recommandation a l'objectif patrimonial du client.",
      "Comparer les scenarios avec hypotheses explicites.",
      "Securiser la viabilite financiere avant la projection fiscale.",
    ],
    checkpoints: [
      "Verifier capacite et taux d'effort.",
      "Comparer brut, net et net-net.",
      "Valider le cadre fiscal adapte au profil.",
    ],
  },
  marketing: {
    terms: ["Annonce", "Visibilite", "CTR", "SEO", "Reels", "Portails"],
    focus: [
      "Optimiser la premiere impression: visuel, titre et promesse claire.",
      "Piloter le contenu avec des indicateurs simples et actionnables.",
      "Adapter le message selon le canal et l'intention utilisateur.",
    ],
    checkpoints: [
      "Aligner photo, titre et argument central.",
      "Publier aux bons horaires selon canal.",
      "Mesurer puis iterer chaque semaine.",
    ],
  },
  terrain: {
    terms: ["Visite", "Argumentaire", "Promesse", "Objection", "Fidelisation", "Recommandation"],
    focus: [
      "Faire vivre l'experience visite avec un fil conducteur clair.",
      "Convertir les objections en clarifications decisives.",
      "Consolider la relation apres signature pour declencher les recommandations.",
    ],
    checkpoints: [
      "Preparer la visite avec priorites client.",
      "Formaliser la suite immediatement apres rendez-vous.",
      "Activer le suivi post-vente de maniere systematique.",
    ],
  },
};

type ModulePremiumDirection = {
  tagline: string;
  vibe: string;
  emblem: string;
  scene: string;
  texture: string;
  markers: string[];
};

type ModuleVisualSkin = {
  primary: string;
  secondary: string;
  accent: string;
  tertiary: string;
  surface: string;
  glow: string;
};

const MODULE_PREMIUM_DIRECTION: Record<string, ModulePremiumDirection> = {
  juridique: {
    tagline: "Rigueur légale & maîtrise terrain",
    vibe: "Edition Signature",
    emblem: "⚖️",
    scene: "Office notarial",
    texture: "Documents, clauses, conformité",
    markers: ["ALUR", "Mandats", "Diagnostics"],
  },
  transaction: {
    tagline: "Négociation, cadence, conversion",
    vibe: "Performance Playbook",
    emblem: "🤝",
    scene: "War room commerciale",
    texture: "Pipeline, relances, objections",
    markers: ["Mandat", "Prix", "Closing"],
  },
  financement: {
    tagline: "Vision chiffres & stratégie patrimoniale",
    vibe: "Analyst Mode",
    emblem: "📈",
    scene: "Bureau d'analyse",
    texture: "Taux, cashflow, fiscalité",
    markers: ["Crédit", "ROI", "Fiscalité"],
  },
  marketing: {
    tagline: "Visibilité, désir, passage à l'action",
    vibe: "Growth Studio",
    emblem: "📱",
    scene: "Studio acquisition",
    texture: "Photos, annonces, SEO",
    markers: ["Photo", "CTR", "Réseaux"],
  },
  terrain: {
    tagline: "Visite, closing, fidélisation durable",
    vibe: "Field Mastery",
    emblem: "🏠",
    scene: "Parcours visite",
    texture: "Terrain, preuve, relation",
    markers: ["Visite", "Objection", "Suivi"],
  },
};

const MODULE_VISUAL_SKINS: Record<string, ModuleVisualSkin> = {
  juridique: {
    primary: "#102a43",
    secondary: "#3b82f6",
    accent: "#d4af37",
    tertiary: "#f8fafc",
    surface: "#07111f",
    glow: "rgba(96,165,250,0.32)",
  },
  transaction: {
    primary: "#172554",
    secondary: "#8b5cf6",
    accent: "#38bdf8",
    tertiary: "#fbbf24",
    surface: "#070b1d",
    glow: "rgba(139,92,246,0.34)",
  },
  financement: {
    primary: "#064e3b",
    secondary: "#22c55e",
    accent: "#67e8f9",
    tertiary: "#facc15",
    surface: "#031711",
    glow: "rgba(34,197,94,0.32)",
  },
  marketing: {
    primary: "#4c1d95",
    secondary: "#f59e0b",
    accent: "#f472b6",
    tertiary: "#2dd4bf",
    surface: "#160b2e",
    glow: "rgba(244,114,182,0.3)",
  },
  terrain: {
    primary: "#7f1d1d",
    secondary: "#f97316",
    accent: "#fde68a",
    tertiary: "#86efac",
    surface: "#1a0909",
    glow: "rgba(249,115,22,0.32)",
  },
};

/* ------------------------------------------------------------------ */
/*  Build slides from lesson visuals                                   */
/* ------------------------------------------------------------------ */

function buildSlides(title: string, visuals: LessonVisuals | null): Slide[] {
  const slides: Slide[] = [];

  // 1. Title slide
  slides.push({ kind: "title", title, subtitle: "Formation agent immobilier — 42h" });

  if (!visuals) {
    slides.push({ kind: "end", title });
    return slides;
  }

  const concepts = visuals.keyConcepts;

  // 2. If there's a first tip concept, add a trainer-tip slide early
  const firstTip = concepts.find((c) => c.type === "tip");
  if (firstTip && concepts.length >= 2) {
    slides.push({ kind: "trainer-tip", concept: firstTip });
  }

  // 3. One slide per concept
  concepts.forEach((c, i) => {
    slides.push({ kind: "concept", concept: c, index: i, total: concepts.length });
  });

  // 4. Highlight slide using first takeaway
  if (visuals.takeaways && visuals.takeaways.length > 0) {
    slides.push({ kind: "highlight", statement: visuals.takeaways[0] });
  } else if (concepts.length > 0) {
    slides.push({ kind: "highlight", statement: concepts[0].title });
  }

  // 5. Stats slide
  if (visuals.stats && visuals.stats.length > 0) {
    slides.push({ kind: "stats", stats: visuals.stats });
    // Also add chart slide if >= 3 stats
    if (visuals.stats.length >= 3) {
      slides.push({ kind: "chart", stats: visuals.stats });
    }
  }

  // 6. Comparison slide
  if (visuals.comparison) {
    slides.push({
      kind: "comparison",
      title: visuals.comparison.title,
      colA: visuals.comparison.colAHeader,
      colB: visuals.comparison.colBHeader,
      rows: visuals.comparison.rows,
    });
  }

  // 7. Takeaways / Process slides
  if (visuals.takeaways && visuals.takeaways.length > 0) {
    slides.push({ kind: "takeaways", items: visuals.takeaways });
    // Process slide using takeaways as steps (max 5)
    if (visuals.takeaways.length >= 3) {
      slides.push({ kind: "process", steps: visuals.takeaways.slice(0, 5) });
    }
  }

  // 8. End slide
  slides.push({ kind: "end", title });

  return slides;
}

/**
 * Étend les slides avec des "highlights" synchronisés quand l'audio contient
 * davantage de points de passage (cues.slides) que de slides éditoriales.
 * Cela évite de figer la dernière slide alors que la narration continue.
 */
function extendSlidesToMatchCues(
  baseSlides: Slide[],
  cues: LessonCues | null,
  visuals: LessonVisuals | null,
  moduleSlug?: string
): Slide[] {
  if (!cues || cues.slides.length <= baseSlides.length) return baseSlides;

  const extraCount = cues.slides.length - baseSlides.length;
  if (extraCount <= 0) return baseSlides;

  const moduleExtra = moduleSlug ? MODULE_EXTRA_VISUALS[moduleSlug] : undefined;

  const keyTermPool = Array.from(
    new Set(
      cues.keyTerms
        .map((k) => k.term?.trim())
        .filter((t): t is string => Boolean(t) && t.length >= 5)
    )
  );
  const takeawayPool = [...(visuals?.takeaways ?? []), ...(moduleExtra?.checkpoints ?? [])];
  const conceptPool = visuals?.keyConcepts.map((c) => c.title) ?? [];
  const focusPool = moduleExtra?.focus ?? [];
  const termPool = [...keyTermPool, ...(moduleExtra?.terms ?? [])];
  const textPool = [...termPool, ...takeawayPool, ...conceptPool, ...focusPool];

  const endSlide = baseSlides.at(-1)?.kind === "end" ? baseSlides.at(-1) : null;
  const bodySlides = endSlide ? baseSlides.slice(0, -1) : [...baseSlides];

  const generated: Slide[] = Array.from({ length: extraCount }, (_, i) => {
    const fallbackLabel = `Point clé ${i + 1}`;
    const term = termPool[i % Math.max(1, termPool.length)] ?? fallbackLabel;
    const concept = visuals?.keyConcepts[i % Math.max(1, visuals?.keyConcepts.length ?? 1)];
    const takeawayChunk = takeawayPool.slice((i * 2) % Math.max(1, takeawayPool.length), ((i * 2) % Math.max(1, takeawayPool.length)) + 2);
    const mode = i % 3;

    if (mode === 0) {
      return {
        kind: "term",
        term,
        context: concept?.title ?? "Repère clé de la narration",
      };
    }

    if (mode === 1) {
      return {
        kind: "focus",
        title: concept?.title ?? term,
        body: concept?.description ?? focusPool[i % Math.max(1, focusPool.length)] ?? textPool[i % Math.max(1, textPool.length)] ?? fallbackLabel,
        icon: concept?.icon,
      };
    }

    return {
      kind: "checkpoint",
      title: "Checkpoint",
      bullets:
        takeawayChunk.length > 0
          ? takeawayChunk
          : [textPool[i % Math.max(1, textPool.length)] ?? fallbackLabel, "Continuez la narration pour consolider."],
    };
  });

  return endSlide ? [...bodySlides, ...generated, endSlide] : [...bodySlides, ...generated];
}

/* ------------------------------------------------------------------ */
/*  Quiz helper                                                        */
/* ------------------------------------------------------------------ */

function shuffleOptions(q: QuizCheckpoint): { label: string; isCorrect: boolean }[] {
  const opts = [...q.options];
  for (let i = opts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [opts[i], opts[j]] = [opts[j], opts[i]];
  }
  return opts;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function CinematicPlayer({
  audioUrl,
  alignmentUrl,
  title,
  avatar,
  visuals,
  moduleTitle,
  moduleSlug,
  lessonSlug,
  audioQuizSchedule = [],
}: Props) {
  const theme = getModuleTheme(moduleSlug ?? "");
  const visualSkin = getModuleVisualSkin(moduleSlug);
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playingRef = useRef(false);
  const clearedQuizRef = useRef(0);

  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(() => {
    if (typeof window === "undefined") return 1;
    const saved = localStorage.getItem("cinematic-player-speed");
    return saved ? parseFloat(saved) : 1;
  });
  const [showShortcuts, setShowShortcuts] = useState(false);
  const wasPlayingBeforeBlur = useRef(false);
  const [loaded, setLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [clearedQuizCount, setClearedQuizCount] = useState(0);
  const [quizOverlay, setQuizOverlay] = useState<QuizCheckpoint | null>(null);
  const [shuffledQuizOptions, setShuffledQuizOptions] = useState<{ label: string; isCorrect: boolean }[]>([]);
  const [quizFeedback, setQuizFeedback] = useState<"idle" | "wrong">("idle");
  const [manualSlide, setManualSlide] = useState<number | null>(null);
  const [chapterFlash, setChapterFlash] = useState<{ name: string; icon: string; color: string; gradient: string } | null>(null);
  const lastChapterRef = useRef<string>("");

  const [karaokeEnabled, setKaraokeEnabled] = useState(false);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(false);
  const [alignment, setAlignment] = useState<LessonAlignment | null>(null);
  const [cues, setCues] = useState<LessonCues | null>(null);
  const [srtContent, setSrtContent] = useState<string | null>(null);
  const [resumeTime, setResumeTime] = useState<number | null>(null);
  const [bookmarks, setBookmarks] = useState<AudioBookmark[]>([]);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [audioStats, setAudioStats] = useState<AudioStats>(createAudioStats);
  const reducedMotion = useReducedMotion();

  const baseSlides = useMemo(() => buildSlides(title, visuals), [title, visuals]);
  const slides = useMemo(
    () => extendSlidesToMatchCues(baseSlides, cues, visuals, moduleSlug),
    [baseSlides, cues, visuals, moduleSlug]
  );
  const chapters = useMemo(() => buildChapterLabels(slides), [slides]);
  const topBarChapters = useMemo(() => buildUniqueChapterLabels(slides), [slides]);

  clearedQuizRef.current = clearedQuizCount;
  playingRef.current = playing;

  /* ---------- Audio logic ---------- */

  const maxSeekTime = useCallback(() => {
    if (!audioQuizSchedule.length || !duration) return duration;
    const idx = clearedQuizCount;
    if (idx >= audioQuizSchedule.length) return duration;
    return audioQuizSchedule[idx].pauseAtRatio * duration;
  }, [audioQuizSchedule, duration, clearedQuizCount]);

  const activeSlide = useMemo(() => {
    if (manualSlide !== null) return manualSlide;
    if (!loaded || duration === 0) return 0;
    if (cues && cues.slides.length > 0) {
      return Math.min(slides.length - 1, findActiveSlideFromCues(cues, current));
    }
    // Fallback sémantique pondéré selon la densité du contenu de la slide au lieu d'une découpe linéaire stricte
    return Math.min(slides.length - 1, getWeightedFallbackSlide(slides, current, duration));
  }, [current, duration, slides, loaded, manualSlide, cues]);

  const slide = slides[activeSlide];
  const currentChapter = getChapterForSlide(chapters, activeSlide);

  /* ---------- Chapter transition flash ---------- */
  useEffect(() => {
    if (!currentChapter) return;
    const name = currentChapter.name;
    if (name === lastChapterRef.current) return;
    lastChapterRef.current = name;
    const info = CHAPTER_INFO[name];
    if (!info) return;
    setChapterFlash({ name, icon: info.icon, color: info.color, gradient: info.gradient });
    const timer = setTimeout(() => setChapterFlash(null), 1800);
    return () => clearTimeout(timer);
  }, [currentChapter]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onMeta = () => { setDuration(el.duration); setLoaded(true); };
    const onTime = () => {
      const t = el.currentTime;
      setCurrent(t);
      // Clear manual slide une fois l'audio passé à la slide suivante (respect du clic utilisateur)
      setManualSlide((prev) => {
        if (prev === null || !el.duration) return prev;
        const perSlide = el.duration / slides.length;
        const boundary = cues?.slides[prev + 1]?.start ?? (prev + 1) * perSlide;
        if (t >= boundary - 0.05) return null;
        return prev;
      });
      if (!audioQuizSchedule.length || !el.duration) return;
      const idx = clearedQuizRef.current;
      if (idx >= audioQuizSchedule.length) return;
      if (!playingRef.current) return;
      const threshold = audioQuizSchedule[idx].pauseAtRatio * el.duration;
      if (t >= threshold - 0.08) {
        el.pause();
        setPlaying(false);
        el.currentTime = threshold;
        setCurrent(threshold);
        const cp = audioQuizSchedule[idx].checkpoint;
        setQuizOverlay(cp);
        setShuffledQuizOptions(shuffleOptions(cp));
        setQuizFeedback("idle");
      }
    };
    const onEnd = () => {
      setPlaying(false);
      setAudioStats((s) => finalizeStats(s));
    };
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("ended", onEnd);
    return () => {
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("ended", onEnd);
    };
  }, [audioQuizSchedule, slides.length, cues]);

  useEffect(() => {
    setClearedQuizCount(0);
    setQuizOverlay(null);
    setQuizFeedback("idle");
    setManualSlide(null);
    setKaraokeEnabled(false);
    setSubtitlesEnabled(false);
    setAlignment(null);
    setCues(null);
    setSrtContent(null);

    // Charge la progression sauvegardée
    const saved = loadProgress(audioUrl);
    setResumeTime(saved);

    // Charge les bookmarks
    setBookmarks(loadBookmarks(audioUrl));
  }, [audioUrl]);

  /* ---------- Load alignment + cues JSON ---------- */
  useEffect(() => {
    if (!alignmentUrl) return;
    fetch(alignmentUrl)
      .then((r) => (r.ok ? r.json() : null))
      .then((raw) => {
        if (raw && raw.segments && raw.word_segments) {
          setAlignment(compactAlignment(raw));
        }
      })
      .catch(() => setAlignment(null));

    const cuesUrl = alignmentUrl.replace(".alignment.json", ".cues.json");
    loadLessonCues(cuesUrl).then(setCues).catch(() => setCues(null));

    // Charge le SRT si disponible
    const srtUrl = alignmentUrl.replace(".alignment.json", ".srt");
    fetch(srtUrl)
      .then((r) => (r.ok ? r.text() : null))
      .then((text) => setSrtContent(text))
      .catch(() => setSrtContent(null));
  }, [alignmentUrl]);

  /* ---------- Parse ?t= timestamp from URL ---------- */
  useEffect(() => {
    const clipTime = parseClipTimeFromUrl();
    if (clipTime !== null && clipTime > 0) {
      const el = audioRef.current;
      if (el && loaded) {
        el.currentTime = clipTime;
        setCurrent(clipTime);
      } else {
        // Attendre que l'audio soit chargé
        const checkLoaded = setInterval(() => {
          const audioEl = audioRef.current;
          if (audioEl && audioEl.duration > 0) {
            audioEl.currentTime = clipTime;
            setCurrent(clipTime);
            clearInterval(checkLoaded);
          }
        }, 200);
        setTimeout(() => clearInterval(checkLoaded), 5000);
      }
    }
  }, [loaded]);

  /* ---------- Controls ---------- */

  const toggle = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
      setAudioStats((s) => updateStatsOnPause(s));
    } else {
      el.play();
      setPlaying(true);
      setAudioStats((s) => updateStatsOnPlay(s, speed));
    }
  }, [playing, speed]);

  const skip = useCallback((delta: number) => {
    const el = audioRef.current;
    if (!el) return;
    const cap = maxSeekTime();
    const from = el.currentTime;
    const to = Math.max(0, Math.min(cap, el.currentTime + delta));
    el.currentTime = to;
    setAudioStats((s) => updateStatsOnSeek(s, from, to));
  }, [maxSeekTime]);

  const seekBar = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = audioRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const cap = maxSeekTime();
    const from = el.currentTime;
    const to = Math.min(ratio * el.duration, cap);
    el.currentTime = to;
    setAudioStats((s) => updateStatsOnSeek(s, from, to));
  }, [maxSeekTime]);

  const goToSlide = useCallback((i: number) => {
    const el = audioRef.current;
    if (!el || !loaded) return;
    const cueStart = cues?.slides[i]?.start;
    const perSlide = duration / slides.length;
    const cap = maxSeekTime();
    const targetTime = Math.min(cueStart ?? i * perSlide, cap);
    el.currentTime = targetTime;
    setManualSlide(i);
    setCurrent(targetTime);
  }, [loaded, duration, slides.length, cues, maxSeekTime]);

  const navigateSlide = useCallback((dir: -1 | 1) => {
    const currentSlide = manualSlide ?? activeSlide;
    const next = Math.max(0, Math.min(slides.length - 1, currentSlide + dir));
    goToSlide(next);
  }, [manualSlide, activeSlide, slides.length, goToSlide]);

  const handleQuizAnswer = useCallback((isCorrect: boolean) => {
    if (!isCorrect) { setQuizFeedback("wrong"); return; }
    setQuizOverlay(null);
    setQuizFeedback("idle");
    setClearedQuizCount((c) => c + 1);
    // Avance visuellement d'une slide après un bon quiz pour récompenser
    setManualSlide((prev) => {
      const current = prev ?? 0;
      return Math.min(slides.length - 1, current + 1);
    });
    const el = audioRef.current;
    if (el) { el.play(); setPlaying(true); }
  }, [slides.length]);

  const dismissQuizWrong = useCallback(() => setQuizFeedback("idle"), []);

  const cycleSpeed = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    const idx = SPEEDS.indexOf(speed as typeof SPEEDS[number]);
    const next = SPEEDS[(idx + 1) % SPEEDS.length];
    el.playbackRate = next;
    setSpeed(next);
  }, [speed]);

  /* ---------- Confetti on lesson end ---------- */
  const hasTriggeredConfetti = useRef(false);
  useEffect(() => {
    if (slide.kind === "end" && !hasTriggeredConfetti.current) {
      hasTriggeredConfetti.current = true;
      const end = Date.now() + 1500;
      const colors = [theme.primary, theme.secondary, "#d4af37", "#ffffff"];
      
      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
          ticks: 200,
          gravity: 0.8,
          scalar: 1.2,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
          ticks: 200,
          gravity: 0.8,
          scalar: 1.2,
        });
        confetti({
          particleCount: 3,
          angle: 90,
          spread: 100,
          origin: { y: 0.6 },
          colors: colors,
          ticks: 200,
          gravity: 0.6,
          scalar: 1.5,
          shapes: ["circle", "square"],
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
  }, [slide.kind, theme]);

  /* ---------- Fullscreen ---------- */

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((v) => !v);
  }, []);

  /* ---------- Keyboard ---------- */

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      
      // Show shortcuts help
      if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setShowShortcuts(true);
        return;
      }
      
      if (tag === "BUTTON") return;
      
      if (e.code === "Space") { e.preventDefault(); toggle(); }
      if (e.code === "ArrowRight") { e.preventDefault(); navigateSlide(1); }
      if (e.code === "ArrowLeft") { e.preventDefault(); navigateSlide(-1); }
      if (e.code === "ArrowUp") { e.preventDefault(); cycleSpeed(); }
      if (e.code === "ArrowDown") { e.preventDefault(); toggleFullscreen(); }
      if (e.key === "f" || e.key === "F") { e.preventDefault(); toggleFullscreen(); }
      if (e.key === "m" || e.key === "M") { 
        e.preventDefault(); 
        const el = audioRef.current;
        if (el) el.muted = !el.muted;
      }
      if (e.key === "j" || e.key === "J") { e.preventDefault(); skip(-10); }
      if (e.key === "l" || e.key === "L") { e.preventDefault(); skip(10); }
      if (e.key === "0" || e.key === "Home") { 
        e.preventDefault(); 
        const el = audioRef.current;
        if (el) el.currentTime = 0;
      }
      if (e.key === "k" || e.key === "K") {
        e.preventDefault();
        setKaraokeEnabled((v) => !v);
      }
      if (e.key === "c" || e.key === "C") {
        e.preventDefault();
        setSubtitlesEnabled((v) => !v);
      }
      if (e.key === "b" || e.key === "B") {
        e.preventDefault();
        const el = audioRef.current;
        if (!el) return;
        const bm = addBookmark(audioUrl, el.currentTime);
        setBookmarks((prev) => [...prev, bm]);
        // Flash visuel temporaire
        const flash = document.createElement("div");
        flash.className = "fixed inset-0 z-[9999] pointer-events-none";
        flash.style.background = "rgba(212,175,55,0.15)";
        flash.style.transition = "opacity 0.3s ease";
        document.body.appendChild(flash);
        requestAnimationFrame(() => { flash.style.opacity = "0"; });
        setTimeout(() => flash.remove(), 300);
      }
      if (e.key === "s" || e.key === "S") {
        e.preventDefault();
        const el = audioRef.current;
        if (!el || !moduleSlug || !lessonSlug) return;
        const clip = generateClipLink(window.location.origin, moduleSlug, lessonSlug, el.currentTime);
        copyToClipboard(clip.url);
        // Flash visuel temporaire
        const flash = document.createElement("div");
        flash.className = "fixed inset-0 z-[9999] pointer-events-none";
        flash.style.background = "rgba(96,165,250,0.15)";
        flash.style.transition = "opacity 0.3s ease";
        document.body.appendChild(flash);
        requestAnimationFrame(() => { flash.style.opacity = "0"; });
        setTimeout(() => flash.remove(), 300);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toggle, navigateSlide, cycleSpeed, toggleFullscreen, skip, audioUrl, moduleSlug, lessonSlug]);

  /* ---------- Pause on blur (auto-pause when switching tabs) ---------- */
  useEffect(() => {
    const handleVisibilityChange = () => {
      const el = audioRef.current;
      if (!el) return;
      
      if (document.hidden && playing) {
        wasPlayingBeforeBlur.current = true;
        el.pause();
        setPlaying(false);
      } else if (!document.hidden && wasPlayingBeforeBlur.current) {
        wasPlayingBeforeBlur.current = false;
        // Optional: auto-resume when coming back
        // el.play(); setPlaying(true);
      }
    };
    
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [playing]);

  /* ---------- Save playback speed ---------- */
  useEffect(() => {
    localStorage.setItem("cinematic-player-speed", String(speed));
  }, [speed]);

  /* ---------- Save playback progress ---------- */
  useEffect(() => {
    if (!loaded || !audioUrl) return;
    const interval = setInterval(() => {
      if (playingRef.current && audioRef.current) {
        saveProgress(audioUrl, audioRef.current.currentTime, duration);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [audioUrl, loaded, duration]);

  /* ---------- Fullscreen Escape Handler ---------- */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === "Escape" && isFullscreen) setIsFullscreen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isFullscreen]);

  const pct = duration > 0 ? (current / duration) * 100 : 0;

  /* ------------------------------------------------------------------ */
  /*  Render                                                             */
  /* ------------------------------------------------------------------ */

  const playerContent = (
    <>
    {/* Keyboard Shortcuts Modal */}
    {showShortcuts && (
      <div 
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={() => setShowShortcuts(false)}
      >
        <div 
          className="w-full max-w-md rounded-2xl border border-brand-gold/30 bg-[var(--surface-dark)] p-6 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Raccourcis clavier</h3>
            <button 
              onClick={() => setShowShortcuts(false)}
              className="rounded-full p-1 text-white/80 hover:bg-white/10 hover:text-white"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-white/80">Lecture / Pause</span>
              <kbd className="rounded bg-white/10 px-2 py-1 font-mono text-brand-gold">Espace</kbd>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-white/80">Slide suivant / précédent</span>
              <kbd className="rounded bg-white/10 px-2 py-1 font-mono text-brand-gold">→ ←</kbd>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-white/80">Vitesse de lecture</span>
              <kbd className="rounded bg-white/10 px-2 py-1 font-mono text-brand-gold">↑</kbd>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-white/80">Plein écran</span>
              <kbd className="rounded bg-white/10 px-2 py-1 font-mono text-brand-gold">↓ ou F</kbd>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-white/80">-10 sec / +10 sec</span>
              <kbd className="rounded bg-white/10 px-2 py-1 font-mono text-brand-gold">J L</kbd>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-white/80">Mute / Unmute</span>
              <kbd className="rounded bg-white/10 px-2 py-1 font-mono text-brand-gold">M</kbd>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-white/80">Karaoké on / off</span>
              <kbd className="rounded bg-white/10 px-2 py-1 font-mono text-brand-gold">K</kbd>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-white/80">Sous-titres on / off</span>
              <kbd className="rounded bg-white/10 px-2 py-1 font-mono text-brand-gold">C</kbd>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-white/80">Ajouter un bookmark</span>
              <kbd className="rounded bg-white/10 px-2 py-1 font-mono text-brand-gold">B</kbd>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-white/80">Revenir au début</span>
              <kbd className="rounded bg-white/10 px-2 py-1 font-mono text-brand-gold">0 ou Home</kbd>
            </div>
          </div>
          <p className="mt-4 text-xs text-center text-on-dark-muted">Appuyez sur ? pour afficher cette aide</p>
        </div>
      </div>
    )}
    
    <div
      ref={containerRef}
      className={`overflow-hidden rounded-2xl border border-white/10 bg-[#05070b] shadow-[0_28px_80px_rgba(2,6,23,0.28)] ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none border-0 flex flex-col" : ""
      }`}
    >
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {/* ── CHAPTER PROGRESS BAR ───────────────────────── */}
      <div className="flex gap-px border-b border-white/[0.08] bg-[#060b13] p-1">
        {topBarChapters.map((ch) => {
          const info = CHAPTER_INFO[ch.name];
          const isActive = currentChapter?.name === ch.name;
          const isPast = currentChapter
            ? CHAPTER_ORDER.indexOf(ch.name) < CHAPTER_ORDER.indexOf(currentChapter.name)
            : false;
          return (
            <button
              key={ch.name}
              type="button"
              onClick={() => goToSlide(ch.startSlide)}
              className="group relative flex h-10 flex-1 flex-col items-center justify-center gap-0.5 overflow-hidden rounded-lg transition-all duration-300 hover:bg-white/[0.08]"
              title={ch.name}
              style={{
                background: isActive
                  ? `linear-gradient(135deg, ${info?.color ?? "var(--brand-gold)"}24, rgba(255,255,255,0.055))`
                  : isPast
                  ? "rgba(255,255,255,0.035)"
                  : "transparent",
                boxShadow: isActive ? `inset 0 0 0 1px ${info?.color ?? "var(--brand-gold)"}33` : "none",
              }}
            >
              <span
                className="flex h-4 w-4 items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ filter: isActive || isPast ? "none" : "grayscale(1) opacity(0.35)" }}
              >
                <EmojiIcon emoji={info?.icon ?? "●"} className="h-3.5 w-3.5" />
              </span>
              <span
                className="hidden text-3xs font-bold uppercase leading-none tracking-wide transition-colors duration-300 sm:block"
                style={{ color: isActive ? (info?.color ?? "var(--brand-gold)") : isPast ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.25)" }}
              >
                {CHAPTER_TOPBAR_LABELS[ch.name] ?? ch.name}
              </span>
              <div
                className="absolute inset-x-2 bottom-1 h-0.5 rounded-full transition-all duration-500"
                style={{ background: isActive ? (info?.color ?? "var(--brand-gold)") : isPast ? "rgba(255,255,255,0.18)" : "transparent" }}
              />
            </button>
          );
        })}
      </div>

      {/* ── VIDEO AREA ─────────────────────────────────── */}
      <div
        className={`relative overflow-hidden ${
          isFullscreen ? "flex-1" : "aspect-video"
        }`}
        style={{
          background: `linear-gradient(140deg, color-mix(in srgb, ${visualSkin.primary} 86%, #030712) 0%, ${visualSkin.surface} 48%, color-mix(in srgb, ${visualSkin.secondary} 64%, #030712) 100%)`,
        }}
      >
        {/* Module watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ opacity: theme.watermarkOpacity }}
        >
          <span className="text-[20rem] leading-none">{theme.watermark}</span>
        </div>

        <ModuleStageTexture moduleSlug={moduleSlug} />

        {/* Slide-specific background patterns */}
        <SlideBackground kind={slide.kind} moduleSlug={moduleSlug} />

        {/* Cinematic vignette + subtle film grain */}
        <div className="pointer-events-none absolute inset-0 z-[1]">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 18%, transparent 78%, rgba(0,0,0,0.34) 100%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.055]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(180deg, rgba(255,255,255,0.45) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
              maskImage: "linear-gradient(to bottom, transparent, black 16%, black 84%, transparent)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 70% at 50% 45%, transparent 35%, rgba(0,0,0,0.22) 100%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.035] mix-blend-soft-light"
            style={{
              backgroundImage:
                "radial-gradient(circle at 15% 20%, rgba(255,255,255,0.8) 0.4px, transparent 0.8px), radial-gradient(circle at 75% 70%, rgba(255,255,255,0.7) 0.4px, transparent 0.8px)",
              backgroundSize: "3px 3px, 4px 4px",
            }}
          />
        </div>

        {/* Slide content avec transition */}
        <div className="relative flex h-full w-full items-center justify-center p-5 sm:p-8 lg:p-10">
          <div
            key={activeSlide}
            className="relative z-[2] h-full w-full"
            style={{
              animation: reducedMotion ? undefined : "slideEnter 0.5s cubic-bezier(0.16,1,0.3,1) both",
            }}
          >
            <SlideRenderer
              slide={slide}
              avatar={avatar}
              isActive={true}
              reducedMotion={reducedMotion}
              audioStats={audioStats}
              moduleSlug={moduleSlug}
            />
          </div>
          {!reducedMotion && (
            <style>{`
              @keyframes slideEnter {
                from { opacity: 0; transform: translateY(12px) scale(0.98); }
                to   { opacity: 1; transform: translateY(0) scale(1); }
              }
            `}</style>
          )}
        </div>

        {/* Chapter flash overlay */}
        {chapterFlash && (
          <div
            className={`absolute inset-0 z-30 flex flex-col items-center justify-center bg-gradient-to-br ${chapterFlash.gradient} pointer-events-none`}
            style={{ animation: reducedMotion ? undefined : "chapterFlashIn 0.35s cubic-bezier(0.16,1,0.3,1) both" }}
          >
            {!reducedMotion && (
              <style>{`
                @keyframes chapterFlashIn {
                  from { opacity: 0; transform: scale(1.04); }
                  to   { opacity: 1; transform: scale(1); }
                }
                @keyframes chapterFlashOut {
                  from { opacity: 1; }
                  to   { opacity: 0; }
                }
              `}</style>
            )}
            {/* Animated ring */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${chapterFlash.color}18 0%, transparent 70%)`,
              }}
              aria-hidden
            />
            {/* Number indicator */}
            <p className="text-2xs font-bold uppercase tracking-[0.4em] mb-4" style={{ color: chapterFlash.color + "99" }}>
              {CHAPTER_ORDER.indexOf(chapterFlash.name) + 1} / {CHAPTER_ORDER.filter(n => chapters.some(c => c.name === n)).length}
            </p>
            {/* Icon */}
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full text-4xl mb-4 shadow-2xl"
              style={{
                background: `${chapterFlash.color}22`,
                border: `2px solid ${chapterFlash.color}44`,
                animation: "titleEntrance 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s both",
              }}
            >
              <EmojiIcon emoji={chapterFlash.icon} className="h-10 w-10" />
            </div>
            {/* Chapter name */}
            <h3
              className="text-3xl font-black tracking-tight sm:text-4xl"
              style={{
                color: "white",
                animation: "titleEntrance 0.5s cubic-bezier(0.16,1,0.3,1) 0.15s both",
                textShadow: `0 0 40px ${chapterFlash.color}66`,
              }}
            >
              {chapterFlash.name}
            </h3>
            {/* Decorative line */}
            <div
              className="mt-4 h-0.5 rounded-full"
              style={{
                width: "60px",
                background: `linear-gradient(90deg, transparent, ${chapterFlash.color}, transparent)`,
                animation: "titleEntrance 0.5s cubic-bezier(0.16,1,0.3,1) 0.2s both",
              }}
            />
          </div>
        )}

        {/* Bookmarks panel */}
        {showBookmarks && (
          <div className="absolute top-16 left-4 z-30 max-h-[60%] overflow-y-auto rounded-xl border border-white/10 bg-black/70 p-3 backdrop-blur-md shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-brand-gold">Bookmarks</span>
              <button
                onClick={() => setShowBookmarks(false)}
                className="text-white/60 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>
            {bookmarks.length === 0 ? (
              <p className="text-2xs text-white/50">Appuyez sur B pendant la lecture</p>
            ) : (
              <ul className="space-y-1">
                {bookmarks.map((bm) => (
                  <li key={bm.id} className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const el = audioRef.current;
                        if (!el) return;
                        el.currentTime = bm.time;
                        setCurrent(bm.time);
                        setShowBookmarks(false);
                      }}
                      className="flex-1 text-left rounded px-2 py-1 text-2xs text-white/80 hover:bg-white/10 transition"
                    >
                      {fmt(bm.time)} — {bm.label}
                    </button>
                    <button
                      onClick={() => {
                        removeBookmark(audioUrl, bm.id);
                        setBookmarks((prev) => prev.filter((b) => b.id !== bm.id));
                      }}
                      className="text-white/40 hover:text-red-400 text-xs px-1"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Karaoke overlay */}
        <KaraokeOverlay
          alignment={alignment}
          currentTime={current}
          visible={karaokeEnabled && playing && !quizOverlay && !showBookmarks}
        />

        {/* Subtitles overlay */}
        <SubtitleOverlay
          srtContent={srtContent}
          currentTime={current}
          visible={subtitlesEnabled && !quizOverlay && !karaokeEnabled}
        />

        {/* Kinetic typography — key terms flash */}
        <KineticFlash
          alignment={alignment}
          visuals={visuals}
          currentTime={current}
          visible={playing && !quizOverlay && !karaokeEnabled && !subtitlesEnabled}
        />

        {/* Quiz overlay */}
        {quizOverlay && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-[var(--surface-dark)]/92 p-4 backdrop-blur-sm">
            <div className="max-h-[min(480px,85vh)] w-full max-w-lg overflow-y-auto rounded-2xl border border-brand-gold/40 bg-[var(--surface-dark)] p-5 shadow-2xl sm:p-7">
              {/* Gold bar at top */}
              <div className="mb-4 h-1 w-16 rounded-full bg-gradient-to-r from-brand-gold to-[var(--brand-gold-light)]" />
              <p className="text-3xs font-bold uppercase tracking-[0.2em] text-brand-gold">
                Question de verification
              </p>
              <p className="mt-3 text-base font-semibold leading-snug text-white sm:text-lg">
                {quizOverlay.question}
              </p>
              <ul className="mt-5 space-y-2">
                {shuffledQuizOptions.map((opt, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      onClick={() => handleQuizAnswer(opt.isCorrect)}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-left text-sm text-white/90 transition hover:border-brand-gold/50 hover:bg-white/10 active:scale-[0.99]"
                    >
                      <span className="mr-3 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/25 text-2xs font-bold text-white/80">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt.label}
                    </button>
                  </li>
                ))}
              </ul>
              {quizFeedback === "wrong" && (
                <div className="mt-4 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                  <p className="font-medium">Ce n&apos;est pas la bonne reponse.</p>
                  <p className="mt-2 text-xs text-amber-200/90">{quizOverlay.explanation}</p>
                  <button
                    type="button"
                    onClick={dismissQuizWrong}
                    className="mt-3 text-xs font-semibold text-brand-gold underline-offset-2 hover:underline"
                  >
                    Reessayer
                  </button>
                </div>
              )}
              {audioQuizSchedule.length > 0 && (
                <p className="mt-4 text-3xs text-on-dark-muted">
                  La reprise de l&apos;audio se fait automatiquement apres la bonne reponse.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Chapter label + slide counter */}
        <div className="absolute top-3 right-3 z-20 flex max-w-[62%] items-center gap-2">
          <span className="hidden truncate rounded-full border border-white/10 bg-black/45 px-2.5 py-1 text-2xs font-semibold text-white/80 shadow-lg backdrop-blur-md md:inline">
            {getSlideDisplayTitle(slide)}
          </span>
          {currentChapter && (
            <span className="rounded-full border border-brand-gold/20 bg-black/45 px-2.5 py-1 text-2xs font-bold uppercase tracking-wider text-brand-gold/85 shadow-lg backdrop-blur-md">
              {currentChapter.name}
            </span>
          )}
          <span className="rounded-full border border-white/10 bg-black/45 px-2.5 py-1 text-2xs font-bold text-white/80 shadow-lg backdrop-blur-md tabular-nums">
            {activeSlide + 1} / {slides.length}
          </span>
        </div>

        {/* Avatar badge */}
        {avatar && (
          <div className="absolute top-3 left-3 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 shadow-lg backdrop-blur-md">
            <div
              className="flex h-6 w-6 items-center justify-center rounded-full text-2xs font-bold text-white shadow-md"
              style={{ backgroundColor: avatar.accentColor }}
            >
              {avatar.initials}
            </div>
            <span className="text-3xs font-medium text-white/80">{avatar.name}</span>
          </div>
        )}

        {/* Fullscreen button */}
        <button
          type="button"
          onClick={toggleFullscreen}
          className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-white/80 backdrop-blur-sm transition hover:bg-black/60 hover:text-white"
          title={isFullscreen ? "Quitter plein ecran (Esc)" : "Plein ecran"}
        >
          {isFullscreen ? (
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 9L4 4m0 0h5m-5 0v5M15 9l5-5m0 0h-5m5 0v5M9 15l-5 5m0 0h5m-5 0v-5M15 15l5 5m0 0h-5m5 0v-5" />
            </svg>
          ) : (
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          )}
        </button>

        {/* Slide navigation arrows */}
        {!quizOverlay && (
          <>
            <button
              type="button"
              onClick={() => navigateSlide(-1)}
              disabled={activeSlide === 0}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white/80 backdrop-blur-sm transition hover:bg-black/50 hover:text-white disabled:opacity-0"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => navigateSlide(1)}
              disabled={activeSlide === slides.length - 1}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white/80 backdrop-blur-sm transition hover:bg-black/50 hover:text-white disabled:opacity-0"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Big play overlay if paused */}
        {!playing && !quizOverlay && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            {resumeTime !== null && resumeTime > 5 ? (
              <div className="flex flex-col items-center gap-4">
                <button
                  onClick={() => {
                    const el = audioRef.current;
                    if (!el) return;
                    el.currentTime = resumeTime;
                    setCurrent(resumeTime);
                    setResumeTime(null);
                    el.play();
                    setPlaying(true);
                  }}
                  className="flex items-center gap-3 rounded-full bg-brand-gold px-6 py-3 text-brand-navy shadow-xl shadow-brand-gold/30 transition hover:scale-105 active:scale-100"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span className="font-bold text-sm">Reprendre à {fmt(resumeTime)}</span>
                </button>
                <button
                  onClick={() => {
                    clearProgress(audioUrl);
                    setResumeTime(null);
                    toggle();
                  }}
                  className="text-xs text-white/60 hover:text-white/90 transition underline underline-offset-2"
                >
                  Recommencer depuis le début
                </button>
              </div>
            ) : (
              <button
                onClick={toggle}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-gold text-brand-navy shadow-xl shadow-brand-gold/30 transition hover:scale-110 active:scale-100"
                aria-label="Lancer la lecture"
              >
                <svg className="h-7 w-7 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── CONTROLS BAR ───────────────────────────────── */}
      <div className="space-y-2 border-t border-white/[0.08] bg-[linear-gradient(180deg,#0b1220_0%,#070d18_100%)] px-4 py-3">
        {/* Progress bar with preview */}
        <ProgressPreview
          slides={slides}
          chapters={chapters}
          duration={duration}
          quizLocked={!!quizOverlay}
          onSeek={(ratio) => {
            const el = audioRef.current;
            if (!el) return;
            const cap = maxSeekTime();
            el.currentTime = Math.min(ratio * el.duration, cap);
          }}
        />
        <div
          onClick={quizOverlay ? undefined : seekBar}
          className={`group relative h-2 rounded-full bg-white/[0.09] shadow-inner ${
            quizOverlay ? "cursor-not-allowed opacity-70" : "cursor-pointer"
          }`}
        >
          {slides.map((_, i) => (
            <div
              key={i}
              className="absolute top-0 h-full w-px bg-white/15"
              style={{ left: `${(i / slides.length) * 100}%` }}
            />
          ))}
          {audioQuizSchedule.map((q, i) => (
            <div
              key={`q-${q.checkpoint.id}`}
              className="absolute top-0 h-full w-0.5 bg-brand-gold/90"
              style={{ left: `${q.pauseAtRatio * 100}%` }}
              title={`Quiz ${i + 1}`}
            />
          ))}
          {bookmarks.map((bm) => (
            <button
              key={bm.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                const el = audioRef.current;
                if (!el) return;
                el.currentTime = bm.time;
                setCurrent(bm.time);
              }}
              className="absolute -top-0.5 h-3 w-3 -translate-x-1/2 rounded-full bg-brand-gold shadow-sm hover:scale-125 transition"
              style={{ left: `${duration > 0 ? (bm.time / duration) * 100 : 0}%` }}
              title={bm.label}
            />
          ))}
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-gold to-[var(--brand-gold-pale)] transition-[width] duration-150"
            style={{ width: `${pct}%` }}
          />
          <div
            className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brand-gold bg-white opacity-0 shadow-md transition group-hover:opacity-100"
            style={{ left: `${pct}%` }}
          />
        </div>

        {/* Waveform visualization */}
        {loaded && (
          <WaveformBars isPlaying={playing} currentTime={current} duration={duration} />
        )}

        {/* Controls row */}
        <div className="flex items-center justify-between gap-3">
          {/* Time */}
          <span className="w-24 text-xs text-white/80 tabular-nums">
            {fmt(current)} / {loaded ? fmt(duration) : "--:--"}
          </span>

          {/* Playback controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={!!quizOverlay}
              onClick={() => skip(-15)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 hover:bg-white/10 hover:text-white transition disabled:opacity-40"
              title="-15s"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.334 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
              </svg>
            </button>
            <button
              type="button"
              disabled={!!quizOverlay}
              onClick={toggle}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gold text-brand-navy shadow-lg hover:bg-[var(--brand-gold-hover)] transition disabled:opacity-40 active:scale-95"
            >
              {playing ? (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="h-5 w-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <button
              type="button"
              disabled={!!quizOverlay}
              onClick={() => skip(15)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 hover:bg-white/10 hover:text-white transition disabled:opacity-40"
              title="+15s"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
              </svg>
            </button>
          </div>

          {/* Karaoke toggle + speed */}
          <div className="flex items-center gap-2 w-24 justify-end">
            {alignment && (
              <button
                onClick={() => setKaraokeEnabled((v) => !v)}
                className={`rounded-full border px-2 py-0.5 text-2xs font-bold transition tabular-nums ${
                  karaokeEnabled
                    ? "border-brand-gold bg-brand-gold/20 text-brand-gold"
                    : "border-white/20 text-white/80 hover:bg-white/10"
                }`}
                title="Karaoké (K)"
              >
                K
              </button>
            )}
            {srtContent && (
              <button
                onClick={() => setSubtitlesEnabled((v) => !v)}
                className={`rounded-full border px-2 py-0.5 text-2xs font-bold transition tabular-nums ${
                  subtitlesEnabled
                    ? "border-brand-gold bg-brand-gold/20 text-brand-gold"
                    : "border-white/20 text-white/80 hover:bg-white/10"
                }`}
                title="Sous-titres (C)"
              >
                CC
              </button>
            )}
            <button
              onClick={() => setShowBookmarks((v) => !v)}
              className={`rounded-full border px-2 py-0.5 text-2xs font-bold transition tabular-nums ${
                showBookmarks || bookmarks.length > 0
                  ? bookmarks.length > 0
                    ? "border-brand-gold bg-brand-gold/20 text-brand-gold"
                    : "border-white/20 text-white/80 hover:bg-white/10"
                  : "border-white/20 text-white/80 hover:bg-white/10"
              }`}
              title={`Bookmarks (${bookmarks.length}) — B`}
            >
              🔖 {bookmarks.length > 0 ? bookmarks.length : ""}
            </button>
            {moduleSlug && lessonSlug && (
              <button
                onClick={async () => {
                  const el = audioRef.current;
                  if (!el) return;
                  const clip = generateClipLink(window.location.origin, moduleSlug, lessonSlug, el.currentTime);
                  const ok = await copyToClipboard(clip.url);
                  if (ok) {
                    const flash = document.createElement("div");
                    flash.className = "fixed inset-0 z-[9999] pointer-events-none";
                    flash.style.background = "rgba(96,165,250,0.15)";
                    flash.style.transition = "opacity 0.3s ease";
                    document.body.appendChild(flash);
                    requestAnimationFrame(() => { flash.style.opacity = "0"; });
                    setTimeout(() => flash.remove(), 300);
                  }
                }}
                className="rounded-full border border-white/20 px-2 py-0.5 text-2xs font-bold text-white/80 hover:bg-white/10 transition"
                title="Partager le moment (S)"
              >
                🔗
              </button>
            )}
            <button
              onClick={cycleSpeed}
              className="rounded-full border border-white/20 px-2 py-0.5 text-2xs font-bold text-white/80 hover:bg-white/10 transition tabular-nums"
            >
              {speed}x
            </button>
          </div>
        </div>

        {/* Chapter-grouped slide thumbnails */}
        <ChapterThumbnails
          slides={slides}
          chapters={chapters}
          activeSlide={activeSlide}
          quizLocked={!!quizOverlay}
          onGoTo={goToSlide}
        />
      </div>
    </div>
    
    {/* Keyboard shortcut hint */}
    <button
      onClick={() => setShowShortcuts(true)}
      className="mt-2 flex items-center justify-center gap-1 text-2xs text-white/80 hover:text-white/80 transition"
      title="Voir les raccourcis clavier"
    >
      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Appuyez sur ? pour les raccourcis
    </button>
    </>
  );

  return playerContent;
}

/* ------------------------------------------------------------------ */
/*  Chapter Thumbnails                                                  */
/* ------------------------------------------------------------------ */

function ChapterThumbnails({
  slides,
  chapters,
  activeSlide,
  quizLocked,
  onGoTo,
}: {
  slides: Slide[];
  chapters: ChapterLabel[];
  activeSlide: number;
  quizLocked: boolean;
  onGoTo: (i: number) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5 pt-1">
      {chapters.map((ch) => {
        const info = CHAPTER_INFO[ch.name];
        const isActive = activeSlide >= ch.startSlide && activeSlide <= ch.endSlide;
        const isPast = activeSlide > ch.endSlide;
        const accentColor = info?.color ?? "#d4af37";
        return (
          <div key={ch.name} className="flex items-center gap-2">
            {/* Chapter icon + label */}
            <button
              type="button"
              disabled={quizLocked}
              onClick={() => onGoTo(ch.startSlide)}
              className="flex items-center gap-1 shrink-0 w-28 transition-opacity hover:opacity-80 disabled:opacity-40"
              title={ch.name}
            >
              <span className="flex h-4 w-4 items-center justify-center" style={{ filter: isActive || isPast ? "none" : "grayscale(1) opacity(0.3)" }}>
                <EmojiIcon emoji={info?.icon ?? "●"} className="h-3.5 w-3.5" />
              </span>
              <span
                className="text-5xs font-bold uppercase tracking-wide truncate"
                style={{ color: isActive ? accentColor : isPast ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.18)" }}
              >
                {ch.name}
              </span>
            </button>
            {/* Slide dots */}
            <div className="flex gap-0.5 flex-1">
              {slides.slice(ch.startSlide, ch.endSlide + 1).map((_, offset) => {
                const i = ch.startSlide + offset;
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={quizLocked}
                    onClick={() => onGoTo(i)}
                    className="flex-1 h-1.5 rounded-full transition-all duration-200 disabled:opacity-40"
                    style={{
                      background: i === activeSlide
                        ? accentColor
                        : i < activeSlide
                        ? accentColor + "44"
                        : "rgba(255,255,255,0.08)",
                      boxShadow: i === activeSlide ? `0 0 6px ${accentColor}80` : "none",
                    }}
                    title={`Slide ${i + 1}`}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Slide Background Patterns                                          */
/* ------------------------------------------------------------------ */

function ModuleStageTexture({ moduleSlug }: { moduleSlug?: string }) {
  const skin = getModuleVisualSkin(moduleSlug);
  const sharedOverlay = (
    <>
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          background: `radial-gradient(ellipse 70% 48% at 50% 35%, ${skin.glow}, transparent 68%)`,
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${skin.accent}99, transparent)` }}
      />
    </>
  );

  if (moduleSlug === "transaction") {
    return (
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        {sharedOverlay}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              `linear-gradient(125deg, transparent 0 44%, ${skin.accent} 44.2%, transparent 44.8% 100%), linear-gradient(125deg, transparent 0 58%, ${skin.secondary} 58.2%, transparent 58.7% 100%)`,
            backgroundSize: "260px 100%, 340px 100%",
          }}
        />
        <div className="absolute bottom-8 left-8 right-8 flex items-center gap-3 opacity-25">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-1 items-center gap-3">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: i < 3 ? skin.accent : "rgba(255,255,255,0.45)" }}
              />
              {i < 4 && <span className="h-px flex-1 bg-white/50" />}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (moduleSlug === "financement") {
    return (
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        {sharedOverlay}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.95) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.95) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="absolute bottom-10 right-10 flex h-32 items-end gap-2 opacity-25">
          {[42, 68, 54, 86, 72, 94].map((height, i) => (
            <span
              key={i}
              className="w-5 rounded-t-md"
              style={{
                height: `${height}%`,
                background: `linear-gradient(180deg, ${i % 2 ? skin.accent : skin.secondary}, transparent)`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (moduleSlug === "marketing") {
    return (
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        {sharedOverlay}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              `linear-gradient(90deg, ${skin.accent} 1px, transparent 1px), linear-gradient(${skin.tertiary} 1px, transparent 1px)`,
            backgroundSize: "96px 54px",
          }}
        />
        <div className="absolute left-8 top-8 grid w-36 grid-cols-2 gap-2 opacity-20">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="aspect-video rounded-lg border"
              style={{ borderColor: i % 2 ? skin.tertiary : skin.accent }}
            />
          ))}
        </div>
        <div
          className="absolute bottom-8 right-10 h-28 w-28 rounded-full border opacity-20"
          style={{ borderColor: skin.accent, boxShadow: `inset 0 0 0 18px color-mix(in srgb, ${skin.accent} 12%, transparent)` }}
        />
      </div>
    );
  }

  if (moduleSlug === "terrain") {
    return (
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        {sharedOverlay}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              `linear-gradient(90deg, ${skin.accent} 1px, transparent 1px), linear-gradient(${skin.accent} 1px, transparent 1px)`,
            backgroundSize: "120px 80px",
          }}
        />
        <div className="absolute left-10 top-10 h-36 w-48 opacity-20">
          <div className="absolute inset-0 rounded-sm border" style={{ borderColor: skin.accent }} />
          <div className="absolute left-1/2 top-0 h-full w-px" style={{ background: skin.accent }} />
          <div className="absolute left-0 top-1/2 h-px w-full" style={{ background: skin.accent }} />
          <div className="absolute bottom-0 right-8 h-10 w-14 border-l border-t" style={{ borderColor: skin.tertiary }} />
        </div>
        <div
          className="absolute bottom-12 right-16 h-20 w-20 rounded-full border opacity-25"
          style={{ borderColor: skin.tertiary }}
        />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {sharedOverlay}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            `linear-gradient(90deg, ${skin.secondary} 1px, transparent 1px), linear-gradient(${skin.secondary} 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />
      <div className="absolute right-12 top-10 h-44 w-32 rotate-3 rounded-sm border opacity-20" style={{ borderColor: skin.accent }}>
        <span className="absolute left-4 right-4 top-6 h-px" style={{ background: skin.accent }} />
        <span className="absolute left-4 right-10 top-12 h-px bg-white/70" />
        <span className="absolute left-4 right-7 h-px bg-white/50" style={{ top: "4.5rem" }} />
        <span className="absolute bottom-6 right-5 h-9 w-9 rounded-full border" style={{ borderColor: skin.accent }} />
      </div>
      <div className="absolute left-10 bottom-10 h-28 w-28 rounded-full border opacity-20" style={{ borderColor: skin.secondary }} />
    </div>
  );
}

function SlideBackground({ kind, moduleSlug }: { kind: Slide["kind"]; moduleSlug?: string }) {
  const skin = getModuleVisualSkin(moduleSlug);
  switch (kind) {
    case "title":
      return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Deep radial gradient */}
          <div className="absolute inset-0" style={{
            background: `radial-gradient(ellipse 70% 60% at 50% 50%, color-mix(in srgb, ${skin.primary} 62%, transparent) 0%, transparent 70%)`,
          }} />
          {/* Geometric cross pattern */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
          {/* Gold accent rings */}
          <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border" style={{ borderColor: `color-mix(in srgb, ${skin.accent} 10%, transparent)` }} />
          <div className="absolute top-1/2 left-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full border" style={{ borderColor: `color-mix(in srgb, ${skin.tertiary} 9%, transparent)` }} />
        </div>
      );

    case "concept":
    case "highlight":
      return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(115deg, transparent 0 18%, rgba(255,255,255,0.85) 18.2%, transparent 18.6% 100%), linear-gradient(65deg, transparent 0 70%, rgba(255,255,255,0.55) 70.2%, transparent 70.6% 100%)",
              backgroundSize: "220px 100%, 280px 100%",
            }}
          />
          <div
            className="absolute inset-y-0 right-0 w-1/3"
            style={{ background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${skin.secondary} 16%, transparent))` }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-28"
            style={{ background: `linear-gradient(0deg, color-mix(in srgb, ${skin.primary} 30%, transparent), transparent)` }}
          />
        </div>
      );

    case "stats":
      return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.035]" style={{
            backgroundImage: `linear-gradient(${skin.accent} 1px, transparent 1px), linear-gradient(90deg, ${skin.secondary} 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }} />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--surface-dark)]/60 to-transparent" />
        </div>
      );

    case "chart":
      return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(${skin.accent} 1px, transparent 1px)`,
            backgroundSize: "100% 25%",
          }} />
          <div className="absolute top-0 right-0 h-full w-1/3" style={{ background: `linear-gradient(270deg, color-mix(in srgb, ${skin.accent} 10%, transparent), transparent)` }} />
        </div>
      );

    case "comparison":
      return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Diagonal stripes */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `repeating-linear-gradient(45deg, ${skin.tertiary} 0px, ${skin.tertiary} 1px, transparent 1px, transparent 20px)`,
          }} />
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/5" />
        </div>
      );

    case "takeaways":
    case "process":
      return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Radial light beams from center */}
          <div className="absolute inset-0" style={{
            background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, color-mix(in srgb, ${skin.accent} 6%, transparent) 30deg, transparent 60deg, transparent 90deg, color-mix(in srgb, ${skin.tertiary} 4%, transparent) 120deg, transparent 150deg, transparent 180deg, color-mix(in srgb, ${skin.accent} 6%, transparent) 210deg, transparent 240deg, transparent 270deg, color-mix(in srgb, ${skin.tertiary} 4%, transparent) 300deg, transparent 330deg, transparent 360deg)`,
          }} />
          <div className="absolute inset-0" style={{
            background: `radial-gradient(ellipse 50% 40% at 50% 50%, color-mix(in srgb, ${skin.accent} 10%, transparent) 0%, transparent 60%)`,
          }} />
        </div>
      );

    case "trainer-tip":
      return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0" style={{
            background: `radial-gradient(ellipse 80% 60% at 30% 50%, color-mix(in srgb, ${skin.accent} 12%, transparent) 0%, transparent 60%)`,
          }} />
          <div className="absolute top-0 left-0 h-full w-2" style={{ background: `linear-gradient(180deg, color-mix(in srgb, ${skin.accent} 22%, transparent), color-mix(in srgb, ${skin.accent} 42%, transparent), color-mix(in srgb, ${skin.accent} 22%, transparent))` }} />
        </div>
      );

    case "term":
    case "focus":
    case "checkpoint":
      return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05]" style={{
            backgroundImage:
              "radial-gradient(circle at 20% 25%, rgba(255,255,255,0.45) 0px, transparent 3px), radial-gradient(circle at 80% 65%, rgba(212,175,55,0.5) 0px, transparent 4px), radial-gradient(circle at 55% 35%, rgba(255,255,255,0.35) 0px, transparent 2px)",
            backgroundSize: "220px 220px, 260px 260px, 180px 180px",
          }} />
          <div
            className="absolute inset-y-0 left-0 w-px"
            style={{ background: `linear-gradient(180deg, transparent, ${skin.accent}, transparent)` }}
          />
          <div
            className="absolute inset-y-0 right-0 w-1/4"
            style={{ background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${skin.secondary} 18%, transparent))` }}
          />
        </div>
      );

    case "end":
      return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-emerald-500/8 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full border border-emerald-400/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full border border-emerald-400/5" />
        </div>
      );

    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/*  Slide Renderer                                                      */
/* ------------------------------------------------------------------ */

function SlideRenderer({
  slide,
  avatar,
  isActive,
  reducedMotion,
  audioStats,
  moduleSlug,
}: {
  slide: Slide;
  avatar?: ModuleAvatar;
  isActive: boolean;
  reducedMotion?: boolean;
  audioStats?: AudioStats;
  moduleSlug?: string;
}) {
  switch (slide.kind) {
    case "title":
      return <TitleSlide title={slide.title} subtitle={slide.subtitle} avatar={avatar} reducedMotion={reducedMotion} moduleSlug={moduleSlug} />;
    case "concept":
      return <ConceptSlide concept={slide.concept} index={slide.index} total={slide.total} moduleSlug={moduleSlug} />;
    case "stats":
      return <StatsSlide stats={slide.stats} isActive={isActive} />;
    case "chart":
      return <ChartSlide stats={slide.stats} isActive={isActive} />;
    case "comparison":
      return <ComparisonSlide title={slide.title} colA={slide.colA} colB={slide.colB} rows={slide.rows} />;
    case "takeaways":
      return <TakeawaysSlide items={slide.items} />;
    case "process":
      return <ProcessSlide steps={slide.steps} />;
    case "highlight":
      return <HighlightSlide statement={slide.statement} moduleSlug={moduleSlug} />;
    case "term":
      return <TermSlide term={slide.term} context={slide.context} moduleSlug={moduleSlug} />;
    case "focus":
      return <FocusSlide title={slide.title} body={slide.body} icon={slide.icon} moduleSlug={moduleSlug} />;
    case "checkpoint":
      return <CheckpointSlide title={slide.title} bullets={slide.bullets} moduleSlug={moduleSlug} />;
    case "trainer-tip":
      return <TrainerTipSlide concept={slide.concept} avatar={avatar} moduleSlug={moduleSlug} />;
    case "end":
      return <EndSlide title={slide.title} stats={audioStats} />;
  }
}

/* ------------------------------------------------------------------ */
/*  Individual Slide Components                                        */
/* ------------------------------------------------------------------ */

/* ── TITLE SLIDE ─── */
function TitleSlide({
  title,
  subtitle,
  avatar,
  reducedMotion,
  moduleSlug,
}: {
  title: string;
  subtitle: string;
  avatar?: ModuleAvatar;
  reducedMotion?: boolean;
  moduleSlug?: string;
}) {
  const skin = getModuleVisualSkin(moduleSlug);
  const direction = moduleSlug ? MODULE_PREMIUM_DIRECTION[moduleSlug] : undefined;
  return (
    <div
      className="text-center w-full max-w-xl"
      style={{ animation: reducedMotion ? undefined : "titleEntrance 0.7s cubic-bezier(0.16,1,0.3,1) both" }}
    >
      {!reducedMotion && (
        <style>{`
          @keyframes titleEntrance {
            from { opacity: 0; transform: scale(0.95) translateY(12px); }
            to   { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>
      )}
      {/* Decorative gold line */}
      <div className="mx-auto mb-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-brand-gold/50" />
        <div className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-brand-gold/50" />
      </div>
      <p className="text-3xs font-bold uppercase tracking-[0.3em] text-brand-gold">{subtitle}</p>
      {direction && (
        <div className="mt-3 flex flex-col items-center gap-2">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span
              className="rounded-full border px-3 py-1 text-3xs font-bold uppercase tracking-[0.18em]"
              style={{
                borderColor: `color-mix(in srgb, ${skin.accent} 48%, transparent)`,
                background: `linear-gradient(135deg, color-mix(in srgb, ${skin.primary} 38%, transparent), color-mix(in srgb, ${skin.secondary} 18%, transparent))`,
                color: "rgba(255,255,255,0.9)",
              }}
            >
              {direction.vibe}
            </span>
            <span
              className="rounded-full border px-3 py-1 text-2xs font-semibold text-white/85"
              style={{
                borderColor: "rgba(255,255,255,0.1)",
                background: `color-mix(in srgb, ${skin.surface} 70%, transparent)`,
              }}
            >
              {direction.emblem} {direction.tagline}
            </span>
          </div>
          <div className="flex max-w-lg flex-wrap items-center justify-center gap-1.5">
            <span
              className="rounded-full px-2.5 py-1 text-3xs font-bold uppercase tracking-[0.16em]"
              style={{ background: `color-mix(in srgb, ${skin.accent} 18%, transparent)`, color: skin.accent }}
            >
              {direction.scene}
            </span>
            {direction.markers.map((marker) => (
              <span
                key={marker}
                className="rounded-full border px-2.5 py-1 text-3xs font-semibold text-white/70"
                style={{ borderColor: `color-mix(in srgb, ${skin.tertiary} 26%, transparent)` }}
              >
                {marker}
              </span>
            ))}
          </div>
          <p
            className="text-3xs font-medium uppercase tracking-[0.18em]"
            style={{ color: `color-mix(in srgb, ${skin.tertiary} 70%, white)` }}
          >
            {direction.texture}
          </p>
        </div>
      )}
      <h2 className="mt-4 text-2xl font-black text-white sm:text-4xl leading-tight drop-shadow-lg">
        {title}
      </h2>
      {avatar && (
        <div className="mt-7 flex items-center justify-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white ring-2 ring-brand-gold/30 shadow-xl"
            style={{ backgroundColor: avatar.accentColor }}
          >
            {avatar.initials}
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-white/90">{avatar.name}</p>
            <p className="text-xs text-white/80">{avatar.role}</p>
          </div>
        </div>
      )}
      {/* Decorative bottom line */}
      <div className="mx-auto mt-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-brand-gold/30" />
        <div className="h-1 w-1 rounded-full bg-brand-gold/50" />
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-brand-gold/30" />
      </div>
    </div>
  );
}

/* ── CONCEPT SLIDE ─── */
function ConceptSlide({ concept, index, total, moduleSlug }: { concept: KeyConcept; index: number; total: number; moduleSlug?: string }) {
  const colors = TYPE_COLORS[concept.type] ?? TYPE_COLORS.rule;
  const skin = getModuleVisualSkin(moduleSlug);
  return (
    <div className="w-full max-w-xl mx-auto">
      <p className="text-center text-2xs font-bold uppercase tracking-widest text-brand-gold mb-4"
        style={{ animation: "fadeInUp 0.4s 0.1s both cubic-bezier(0.16,1,0.3,1)" }}>
        Concept {index + 1} / {total}
      </p>

      <div
        className={`rounded-2xl border ${colors.border} p-6 sm:p-9 relative overflow-hidden`}
        style={{
          background: `linear-gradient(145deg, color-mix(in srgb, ${skin.primary} 55%, black), color-mix(in srgb, ${skin.secondary} 35%, black))`,
          backdropFilter: "blur(20px) saturate(1.3)",
          WebkitBackdropFilter: "blur(20px) saturate(1.3)",
          animation: "fadeInUp 0.5s 0.15s both cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Giant watermark icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.04]">
          <EmojiIcon emoji={CONCEPT_ICONS[concept.icon] ?? "📌"} className="h-48 w-48" />
        </div>

        {/* Floating type badge */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-2xs font-bold uppercase ${colors.text} border ${colors.border} shadow-lg`}
            style={{
              background: `color-mix(in srgb, ${skin.primary} 60%, black)`,
              backdropFilter: "blur(8px)",
              animation: "fadeInDown 0.4s 0.3s both cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: colors.text.replace("text-", "") === "text-brand-gold" ? "#d4af37" : "currentColor" }} />
            {TYPE_LABELS[concept.type] ?? concept.type}
          </span>
        </div>

        {/* Top decorative line */}
        <div className="mx-auto mb-6 flex items-center gap-2" style={{ animation: "fadeIn 0.5s 0.35s both" }}>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-brand-gold/40" />
          <div className="h-1 w-1 rounded-full bg-brand-gold/60" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-brand-gold/40" />
        </div>

        <div className="relative text-center">
          <div
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{
              animation: "scaleIn 0.5s 0.25s both cubic-bezier(0.16,1,0.3,1)",
              filter: `drop-shadow(0 0 16px color-mix(in srgb, ${skin.accent} 35%, transparent))`,
              background: `color-mix(in srgb, ${skin.secondary} 30%, transparent)`,
              border: `1px solid color-mix(in srgb, ${skin.accent} 35%, transparent)`,
            }}
          >
            <EmojiIcon emoji={CONCEPT_ICONS[concept.icon] ?? "📌"} className="h-9 w-9" />
          </div>

          <h3 className="text-2xl font-black text-white sm:text-3xl leading-tight"
            style={{ animation: "fadeInUp 0.5s 0.3s both cubic-bezier(0.16,1,0.3,1)" }}>
            {concept.title}
          </h3>

          <p className="mt-4 text-base leading-relaxed text-white/90 max-w-md mx-auto"
            style={{ animation: "fadeInUp 0.5s 0.4s both cubic-bezier(0.16,1,0.3,1)" }}>
            {concept.description}
          </p>
        </div>

        {/* Bottom decorative line */}
        <div className="mx-auto mt-6 flex items-center gap-2" style={{ animation: "fadeIn 0.5s 0.5s both" }}>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-brand-gold/20" />
          <div className="h-0.5 w-0.5 rounded-full bg-brand-gold/40" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-brand-gold/20" />
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* ── STATS SLIDE ─── */
function StatsSlide({ stats, isActive }: { stats: StatCard[]; isActive: boolean }) {
  const [counters, setCounters] = useState<string[]>(stats.map(() => "0"));

  useEffect(() => {
    if (!isActive) return;
    // Animate numeric values from 0 to target
    const targets = stats.map((s) => {
      const num = parseFloat(s.value.replace(/[^0-9.]/g, ""));
      return isNaN(num) ? null : { num, original: s.value };
    });

    const duration = 1500;
    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounters(
        targets.map((t, i) => {
          if (t === null) return stats[i].value;
          const current = Math.floor(eased * t.num);
          // Try to preserve prefix/suffix from original
          return t.original.replace(/[0-9]+(\.[0-9]+)?/, String(current));
        })
      );

      if (progress >= 1) clearInterval(interval);
    }, 16);

    return () => clearInterval(interval);
  }, [isActive, stats]);

  return (
    <div
      className="w-full max-w-xl mx-auto"
      style={{ animation: "fadeIn 0.5s ease-out both" }}
    >
      <p className="text-center text-2xs font-bold uppercase tracking-widest text-brand-gold mb-6">
        Chiffres cles
      </p>
      <div className={`grid gap-3 ${stats.length <= 2 ? "grid-cols-2" : stats.length === 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4"}`}>
        {stats.map((s, i) => (
          <div
            key={i}
            className="rounded-xl border border-white/10 bg-white/5 p-3 sm:p-5 text-center backdrop-blur-sm"
            style={{ animation: `fadeIn 0.5s ease-out ${i * 0.1}s both` }}
          >
            <p className={`text-3xl font-black tabular-nums ${STAT_COLORS[s.color] ?? "text-white"}`}>
              {counters[i]}
            </p>
            {s.unit && <p className="text-xs text-white/80 font-medium mt-1">{s.unit}</p>}
            <p className="mt-2 text-3xs text-on-dark-muted font-medium leading-tight">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── CHART SLIDE (pure CSS bar chart) ─── */
function ChartSlide({ stats, isActive }: { stats: StatCard[]; isActive: boolean }) {
  const [heights, setHeights] = useState<number[]>(stats.map(() => 0));

  // Parse a numeric value from a stat string
  function parseStatNum(val: string): number {
    const n = parseFloat(val.replace(/[^0-9.]/g, ""));
    return isNaN(n) ? 0 : n;
  }

  const values = useMemo(() => stats.map((s) => parseStatNum(s.value)), [stats]);
  const maxVal = useMemo(() => Math.max(...values, 1), [values]);

  useEffect(() => {
    if (!isActive) {
      const timeout = setTimeout(() => setHeights(stats.map(() => 0)), 0);
      return () => clearTimeout(timeout);
    }
    const timeout = setTimeout(() => {
      setHeights(values.map((v) => (v / maxVal) * 100));
    }, 100);
    return () => clearTimeout(timeout);
  }, [isActive, values, maxVal, stats]);

  return (
    <div
      className="w-full max-w-lg mx-auto"
      style={{ animation: "fadeIn 0.5s ease-out both" }}
    >
      <p className="text-center text-2xs font-bold uppercase tracking-widest text-brand-gold mb-6">
        Visualisation
      </p>
      <div className="flex items-end gap-3 h-40 px-2">
        {stats.map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-2 flex-1">
            <span className={`text-xs font-black tabular-nums ${STAT_COLORS[s.color] ?? "text-white"}`}>
              {s.value}
              {s.unit ? <span className="text-6xs font-normal text-on-dark-muted ml-0.5">{s.unit}</span> : null}
            </span>
            <div className="relative w-full flex-1 flex items-end">
              <div
                className={`w-full rounded-t-lg transition-all duration-700 ease-out ${STAT_BAR_COLORS[s.color] ?? "bg-white"}`}
                style={{
                  height: `${heights[i]}%`,
                  minHeight: heights[i] > 0 ? "4px" : "0",
                  opacity: 0.85,
                  transitionDelay: `${i * 100}ms`,
                }}
              />
            </div>
            <p className="text-6xs text-on-dark-muted font-medium text-center leading-tight max-w-[60px]">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── COMPARISON SLIDE ─── */
function ComparisonSlide({ title, colA, colB, rows }: { title: string; colA: string; colB: string; rows: ComparisonRow[] }) {
  return (
    <div
      className="w-full max-w-xl mx-auto"
      style={{ animation: "fadeIn 0.5s ease-out both" }}
    >
      <p className="text-center text-2xs font-bold uppercase tracking-widest text-brand-gold mb-3">
        Comparatif
      </p>
      <h3 className="text-center text-base font-bold text-white mb-4 sm:text-lg">{title}</h3>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-2 py-2 text-left text-2xs font-bold uppercase text-white/35 w-1/4">Critère</th>
              <th className="px-2 py-2 text-left text-2xs font-bold uppercase text-white/80 w-[37.5%]">{colA}</th>
              <th className="px-2 py-2 text-left text-2xs font-bold uppercase text-brand-gold w-[37.5%]">{colB}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={i}
                className="border-b border-white/5 last:border-0"
                style={{ animation: `fadeIn 0.4s ease-out ${i * 0.07}s both` }}
              >
                <td className="px-2 py-2 text-xs font-semibold text-white/80 truncate">{r.label}</td>
                <td className={`px-2 py-2 text-xs ${r.highlight === "a" ? "font-bold text-white bg-white/5" : "text-white/45"}`}>
                  {r.highlight === "a" && <span className="mr-1 text-emerald-400">&#x2714;</span>}{r.colA}
                </td>
                <td className={`px-2 py-2 text-xs ${r.highlight === "b" ? "font-bold text-brand-gold bg-brand-gold/5" : "text-white/45"}`}>
                  {r.highlight === "b" && <span className="mr-1 text-emerald-400">&#x2714;</span>}{r.colB}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── TAKEAWAYS SLIDE ─── */
function TakeawaysSlide({ items }: { items: string[] }) {
  return (
    <div className="w-full max-w-md mx-auto">
      <p className="text-center text-2xs font-bold uppercase tracking-widest text-brand-gold mb-5">
        A retenir
      </p>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 backdrop-blur-sm"
            style={{ animation: `fadeIn 0.4s ease-out ${i * 0.12}s both`, opacity: 0 }}
          >
            <style>{`
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(6px); }
                to   { opacity: 1; transform: translateY(0); }
              }
            `}</style>
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-2xs font-bold text-white">
              {i + 1}
            </span>
            <p className="text-sm leading-relaxed text-white/80">{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── PROCESS SLIDE ─── */
function ProcessSlide({ steps }: { steps: string[] }) {
  const isVertical = steps.length > 3;
  return (
    <div className="w-full max-w-md mx-auto">
      <p className="text-center text-2xs font-bold uppercase tracking-widest text-brand-gold mb-6">
        Processus
      </p>
      <div className={`flex ${isVertical ? "flex-col gap-3" : "flex-row items-center gap-2"}`}>
        {steps.map((step, i) => (
          <div
            key={i}
            className={`flex ${isVertical ? "flex-row items-center gap-3" : "flex-col items-center gap-2 flex-1"}`}
            style={{ animation: `fadeIn 0.4s ease-out ${i * 0.1}s both`, opacity: 0 }}
          >
            {/* Step box */}
            <div className={`rounded-xl border border-brand-gold/25 bg-brand-gold/10 ${isVertical ? "px-3 py-2.5 flex-1" : "px-3 py-3 w-full text-center"}`}>
              <div className={`flex ${isVertical ? "items-center gap-3" : "flex-col items-center gap-1.5"}`}>
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-gold text-2xs font-black text-brand-navy">
                  {i + 1}
                </span>
                <p className="text-xs font-medium text-white/80 leading-tight">{step}</p>
              </div>
            </div>
            {/* Arrow between steps */}
            {i < steps.length - 1 && (
              <div className={`text-brand-gold/50 font-bold ${isVertical ? "text-lg leading-none" : "text-base"}`}>
                {isVertical ? "↓" : "→"}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function getModuleVisualSkin(moduleSlug?: string) {
  const t = getModuleTheme(moduleSlug ?? "");
  const skin = MODULE_VISUAL_SKINS[t.slug] ?? MODULE_VISUAL_SKINS.juridique;
  return {
    ...skin,
    primary: skin.primary ?? t.primary,
    secondary: skin.secondary ?? t.secondary,
  };
}

/* ── HIGHLIGHT SLIDE ─── */
function HighlightSlide({ statement, moduleSlug }: { statement: string; moduleSlug?: string }) {
  const skin = getModuleVisualSkin(moduleSlug);
  return (
    <div className="w-full max-w-xl text-center">
      <div className="relative px-8 py-10"
        style={{
          background: `linear-gradient(135deg, color-mix(in srgb, ${skin.primary} 48%, black), color-mix(in srgb, ${skin.secondary} 38%, black))`,
          backdropFilter: "blur(16px)",
          borderRadius: "1rem",
          border: `1px solid color-mix(in srgb, ${skin.accent} 38%, transparent)`,
          animation: "fadeIn 0.6s ease-out both",
        }}>
        {/* Glow behind */}
        <div className="absolute inset-0 rounded-2xl opacity-30 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 50% 40% at 50% 50%, color-mix(in srgb, ${skin.accent} 25%, transparent), transparent 70%)` }} />

        {/* Corner ornaments */}
        <div className="absolute top-0 left-0 h-10 w-10 border-l-2 border-t-2 border-brand-gold/60 rounded-tl-xl" />
        <div className="absolute top-0 right-0 h-10 w-10 border-r-2 border-t-2 border-brand-gold/60 rounded-tr-xl" />
        <div className="absolute bottom-0 left-0 h-10 w-10 border-l-2 border-b-2 border-brand-gold/60 rounded-bl-xl" />
        <div className="absolute bottom-0 right-0 h-10 w-10 border-r-2 border-b-2 border-brand-gold/60 rounded-br-xl" />

        <p className="text-2xs font-bold uppercase tracking-[0.3em] text-brand-gold mb-6">
          Point cle
        </p>
        <blockquote className="relative text-xl font-black text-white leading-tight sm:text-3xl"
          style={{ textShadow: `0 0 30px color-mix(in srgb, ${skin.accent} 35%, transparent), 0 2px 10px rgba(0,0,0,0.5)` }}>
          &ldquo;{statement}&rdquo;
        </blockquote>

        {/* Bottom accent */}
        <div className="mx-auto mt-6 flex items-center justify-center gap-2">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-brand-gold/50" />
          <div className="h-1 w-1 rounded-full bg-brand-gold" />
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-brand-gold/50" />
        </div>
      </div>
    </div>
  );
}

/* ── TERM SLIDE ─── */
function TermSlide({ term, context, moduleSlug }: { term: string; context: string; moduleSlug?: string }) {
  const skin = getModuleVisualSkin(moduleSlug);
  return (
    <div className="w-full max-w-lg text-center">
      <p className="text-2xs font-bold uppercase tracking-[0.25em] text-brand-gold mb-4">Terme clé</p>
      <div
        className="relative overflow-hidden rounded-2xl px-6 py-8 backdrop-blur-md"
        style={{
          border: `1px solid color-mix(in srgb, ${skin.accent} 45%, transparent)`,
          background: `linear-gradient(140deg, color-mix(in srgb, ${skin.primary} 55%, black) 0%, color-mix(in srgb, ${skin.secondary} 40%, black) 100%)`,
        }}
      >
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl"
          style={{ background: `color-mix(in srgb, ${skin.accent} 30%, transparent)` }}
        />
        <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight">{term}</h3>
        <p className="mt-4 text-sm text-white/80">{context}</p>
      </div>
    </div>
  );
}

/* ── FOCUS SLIDE ─── */
function FocusSlide({ title, body, icon, moduleSlug }: { title: string; body: string; icon?: string; moduleSlug?: string }) {
  const skin = getModuleVisualSkin(moduleSlug);
  return (
    <div className="w-full max-w-xl mx-auto">
      <p className="text-center text-2xs font-bold uppercase tracking-[0.2em] text-brand-gold mb-4">Focus</p>
      <div
        className="rounded-2xl p-6 sm:p-8 backdrop-blur-md"
        style={{
          border: `1px solid color-mix(in srgb, ${skin.accent} 30%, rgba(255,255,255,0.2))`,
          background: `linear-gradient(160deg, color-mix(in srgb, ${skin.primary} 45%, black), rgba(255,255,255,0.04))`,
        }}
      >
        <div className="flex items-start gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
            style={{
              background: `color-mix(in srgb, ${skin.accent} 22%, transparent)`,
              boxShadow: `0 0 20px color-mix(in srgb, ${skin.accent} 28%, transparent)`,
              border: `1px solid color-mix(in srgb, ${skin.accent} 50%, transparent)`,
            }}
          >
            <EmojiIcon emoji={icon ? (CONCEPT_ICONS[icon] ?? "💡") : "💡"} className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white leading-tight">{title}</h3>
            <p className="mt-3 text-base leading-relaxed text-white/85">{body}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── CHECKPOINT SLIDE ─── */
function CheckpointSlide({ title, bullets, moduleSlug }: { title: string; bullets: string[]; moduleSlug?: string }) {
  const skin = getModuleVisualSkin(moduleSlug);
  return (
    <div className="w-full max-w-xl mx-auto">
      <p className="text-center text-2xs font-bold uppercase tracking-[0.2em] text-brand-gold mb-4">{title}</p>
      <div
        className="rounded-2xl p-5 sm:p-7 backdrop-blur-sm"
        style={{
          border: `1px solid color-mix(in srgb, ${skin.secondary} 40%, transparent)`,
          background: `linear-gradient(135deg, color-mix(in srgb, ${skin.secondary} 24%, transparent), color-mix(in srgb, ${skin.primary} 28%, transparent))`,
        }}
      >
        <ul className="space-y-3">
          {bullets.slice(0, 3).map((b, i) => (
            <li key={`${b}-${i}`} className="flex items-start gap-3 text-sm sm:text-base text-white/90">
              <span
                className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                style={{ background: skin.secondary }}
              >
                {i + 1}
              </span>
              <span className="leading-snug">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── TRAINER TIP SLIDE ─── */
function TrainerTipSlide({ concept, avatar, moduleSlug }: { concept: KeyConcept; avatar?: ModuleAvatar; moduleSlug?: string }) {
  const skin = getModuleVisualSkin(moduleSlug);
  return (
    <div
      className="w-full max-w-lg"
      style={{ animation: "fadeIn 0.5s ease-out both" }}
    >
      {/* Avatar badge — more prominent */}
      {avatar && (
        <div className="flex items-center gap-3 mb-5">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-black text-white ring-4 ring-brand-gold/30 shadow-xl"
            style={{ backgroundColor: avatar.accentColor }}
          >
            {avatar.initials}
          </div>
          <div>
            <p className="text-sm font-bold text-white">{avatar.name}</p>
            <p className="text-xs text-brand-gold">{avatar.role}</p>
          </div>
        </div>
      )}

      {/* Speech bubble */}
      <div
        className="relative rounded-2xl px-6 py-5 backdrop-blur-sm"
        style={{
          border: `2px solid color-mix(in srgb, ${skin.accent} 45%, transparent)`,
          background: `linear-gradient(140deg, color-mix(in srgb, ${skin.primary} 35%, transparent), color-mix(in srgb, ${skin.secondary} 28%, transparent))`,
        }}
      >
        {/* Speech bubble triangle */}
        {avatar && (
          <div
            className="absolute -top-3 left-8 h-0 w-0"
            style={{
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderBottom: "12px solid rgba(212,175,55,0.35)",
            }}
          />
        )}
        <p className="text-2xs font-bold uppercase tracking-widest text-brand-gold mb-3">
          Conseil formateur :
        </p>
        <div className="flex items-start gap-3">
          <EmojiIcon emoji={CONCEPT_ICONS[concept.icon] ?? "💡"} className="h-8 w-8 shrink-0" />
          <div>
            <h3 className="text-base font-black text-white mb-1">{concept.title}</h3>
            <p className="text-sm leading-relaxed text-white/80">{concept.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── END SLIDE ─── */
function EndSlide({ title, stats }: { title: string; stats?: AudioStats }) {
  return (
    <div
      className="text-center"
      style={{ animation: "fadeIn 0.7s ease-out both" }}
    >
      {/* Animated check ring */}
      <div className="relative mx-auto w-20 h-20">
        <div className="absolute inset-0 rounded-full bg-emerald-500/10 animate-ping" style={{ animationDuration: "2s" }} />
        <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 ring-2 ring-emerald-400/30">
          <svg className="h-9 w-9 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <h2 className="mt-5 text-xl font-black text-white sm:text-2xl">{title}</h2>
      <p className="mt-2 text-sm text-white/80">Lecon terminee — passez a la suite</p>

      {stats && stats.endedAt && (
        <div className="mt-4 grid grid-cols-2 gap-3 max-w-xs mx-auto">
          <div className="rounded-lg bg-white/5 px-3 py-2">
            <p className="text-2xs text-white/50 uppercase">Pauses</p>
            <p className="text-lg font-bold text-brand-gold">{stats.pauseCount}</p>
          </div>
          <div className="rounded-lg bg-white/5 px-3 py-2">
            <p className="text-2xs text-white/50 uppercase">Retours</p>
            <p className="text-lg font-bold text-brand-gold">{stats.rewindCount}</p>
          </div>
          <div className="rounded-lg bg-white/5 px-3 py-2">
            <p className="text-2xs text-white/50 uppercase">Vitesse moy.</p>
            <p className="text-lg font-bold text-brand-gold">{stats.avgSpeed}x</p>
          </div>
          <div className="rounded-lg bg-white/5 px-3 py-2">
            <p className="text-2xs text-white/50 uppercase">Sauts</p>
            <p className="text-lg font-bold text-brand-gold">{stats.seekCount}</p>
          </div>
        </div>
      )}

      <div className="mx-auto mt-5 flex items-center justify-center gap-2">
        <div className="h-1.5 w-1.5 rounded-full bg-brand-gold/40" />
        <div className="h-1.5 w-1.5 rounded-full bg-brand-gold/70" />
        <div className="h-1.5 w-1.5 rounded-full bg-brand-gold" />
      </div>
    </div>
  );
}
