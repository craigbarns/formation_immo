"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import type { ModuleAvatar } from "@/data/module-avatars";
import type { LessonVisuals, KeyConcept, StatCard, ComparisonRow } from "@/data/lesson-keyconcepts";
import type { QuizCheckpoint } from "@/data/quiz-checkpoints";
import type { ResolvedAudioQuizItem } from "@/data/audio-quiz-schedule";
import confetti from "canvas-confetti";

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
  | { kind: "trainer-tip"; concept: KeyConcept }
  | { kind: "chart"; stats: StatCard[] }
  | { kind: "end"; title: string };

type Props = {
  audioUrl: string;
  title: string;
  avatar?: ModuleAvatar;
  visuals: LessonVisuals | null;
  moduleTitle?: string;
  audioQuizSchedule?: ResolvedAudioQuizItem[];
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
  concept: "Concepts cles",
  stats: "Donnees",
  chart: "Donnees",
  comparison: "Comparatif",
  takeaways: "A retenir",
  process: "A retenir",
  highlight: "Concepts cles",
  "trainer-tip": "Concepts cles",
  end: "Fin",
};

function buildChapterLabels(slides: Slide[]): ChapterLabel[] {
  const chapters: ChapterLabel[] = [];
  let lastChapter = "";
  let startSlide = 0;

  slides.forEach((s, i) => {
    const ch = SLIDE_KIND_TO_CHAPTER[s.kind] ?? "Concepts cles";
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

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function fmt(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
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
  stat: { bg: "bg-[#d4af37]/20", border: "border-[#d4af37]/40", text: "text-[#d4af37]" },
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
  gold: "text-[#d4af37]",
  green: "text-emerald-400",
  red: "text-red-400",
  blue: "text-blue-400",
};

const STAT_BAR_COLORS: Record<string, string> = {
  navy: "bg-white",
  gold: "bg-[#d4af37]",
  green: "bg-emerald-400",
  red: "bg-red-400",
  blue: "bg-blue-400",
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
  title,
  avatar,
  visuals,
  audioQuizSchedule = [],
}: Props) {
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

  const slides = useMemo(() => buildSlides(title, visuals), [title, visuals]);
  const chapters = useMemo(() => buildChapterLabels(slides), [slides]);

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
    const perSlide = duration / slides.length;
    return Math.min(slides.length - 1, Math.floor(current / perSlide));
  }, [current, duration, slides.length, loaded, manualSlide]);

  const slide = slides[activeSlide];
  const currentChapter = getChapterForSlide(chapters, activeSlide);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onMeta = () => { setDuration(el.duration); setLoaded(true); };
    const onTime = () => {
      const t = el.currentTime;
      setCurrent(t);
      // Clear manual slide once audio advances past the slide boundary
      setManualSlide(null);
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
    const onEnd = () => setPlaying(false);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("ended", onEnd);
    return () => {
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("ended", onEnd);
    };
  }, [audioQuizSchedule]);

  useEffect(() => {
    setClearedQuizCount(0);
    setQuizOverlay(null);
    setQuizFeedback("idle");
    setManualSlide(null);
  }, [audioUrl]);

  /* ---------- Controls ---------- */

  const toggle = useCallback(() => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) { el.pause(); setPlaying(false); }
    else { el.play(); setPlaying(true); }
  }, [playing]);

  const skip = useCallback((delta: number) => {
    const el = audioRef.current;
    if (!el) return;
    const cap = maxSeekTime();
    el.currentTime = Math.max(0, Math.min(cap, el.currentTime + delta));
  }, [maxSeekTime]);

  const seekBar = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = audioRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const cap = maxSeekTime();
    el.currentTime = Math.min(ratio * el.duration, cap);
  }, [maxSeekTime]);

  const goToSlide = useCallback((i: number) => {
    const el = audioRef.current;
    if (!el || !loaded) return;
    const perSlide = duration / slides.length;
    const cap = maxSeekTime();
    const targetTime = Math.min(i * perSlide, cap);
    el.currentTime = targetTime;
    setManualSlide(i);
  }, [loaded, duration, slides.length, maxSeekTime]);

  const navigateSlide = useCallback((dir: -1 | 1) => {
    const next = Math.max(0, Math.min(slides.length - 1, activeSlide + dir));
    goToSlide(next);
  }, [activeSlide, slides.length, goToSlide]);

  const handleQuizAnswer = useCallback((isCorrect: boolean) => {
    if (!isCorrect) { setQuizFeedback("wrong"); return; }
    setQuizOverlay(null);
    setQuizFeedback("idle");
    setClearedQuizCount((c) => c + 1);
    const el = audioRef.current;
    if (el) { el.play(); setPlaying(true); }
  }, []);

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
      const end = Date.now() + 1000;
      const colors = ["#d4af37", "#1a3a5c", "#10b981"];
      
      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
  }, [slide.kind]);

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
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toggle, navigateSlide, cycleSpeed, toggleFullscreen, skip]);

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
          className="w-full max-w-md rounded-2xl border border-[#d4af37]/30 bg-[#0f1f33] p-6 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Raccourcis clavier</h3>
            <button 
              onClick={() => setShowShortcuts(false)}
              className="rounded-full p-1 text-white/50 hover:bg-white/10 hover:text-white"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-white/70">Lecture / Pause</span>
              <kbd className="rounded bg-white/10 px-2 py-1 font-mono text-[#d4af37]">Espace</kbd>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-white/70">Slide suivant / précédent</span>
              <kbd className="rounded bg-white/10 px-2 py-1 font-mono text-[#d4af37]">→ ←</kbd>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-white/70">Vitesse de lecture</span>
              <kbd className="rounded bg-white/10 px-2 py-1 font-mono text-[#d4af37]">↑</kbd>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-white/70">Plein écran</span>
              <kbd className="rounded bg-white/10 px-2 py-1 font-mono text-[#d4af37]">↓ ou F</kbd>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-white/70">-10 sec / +10 sec</span>
              <kbd className="rounded bg-white/10 px-2 py-1 font-mono text-[#d4af37]">J L</kbd>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-white/70">Mute / Unmute</span>
              <kbd className="rounded bg-white/10 px-2 py-1 font-mono text-[#d4af37]">M</kbd>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-white/70">Revenir au début</span>
              <kbd className="rounded bg-white/10 px-2 py-1 font-mono text-[#d4af37]">0 ou Home</kbd>
            </div>
          </div>
          <p className="mt-4 text-xs text-center text-white/40">Appuyez sur ? pour afficher cette aide</p>
        </div>
      </div>
    )}
    
    <div
      ref={containerRef}
      className={`overflow-hidden rounded-2xl border-2 border-[#1a3a5c]/20 shadow-2xl ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none border-0 flex flex-col" : ""
      }`}
    >
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {/* ── VIDEO AREA ─────────────────────────────────── */}
      <div
        className={`relative bg-gradient-to-br from-[#0f1f33] via-[#1a3a5c] to-[#0a1929] overflow-hidden ${
          isFullscreen ? "flex-1" : "aspect-video"
        }`}
      >
        {/* Slide-specific background patterns */}
        <SlideBackground kind={slide.kind} />

        {/* Slide content */}
        <div className="relative flex h-full w-full items-center justify-center p-6 sm:p-10">
          <SlideRenderer slide={slide} avatar={avatar} isActive={true} />
        </div>

        {/* Quiz overlay */}
        {quizOverlay && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#0a1929]/92 p-4 backdrop-blur-sm">
            <div className="max-h-[min(480px,85vh)] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#d4af37]/40 bg-[#0f1f33] p-5 shadow-2xl sm:p-7">
              {/* Gold bar at top */}
              <div className="mb-4 h-1 w-16 rounded-full bg-gradient-to-r from-[#d4af37] to-[#f0c040]" />
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d4af37]">
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
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-left text-sm text-white/90 transition hover:border-[#d4af37]/50 hover:bg-white/10 active:scale-[0.99]"
                    >
                      <span className="mr-3 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/25 text-[10px] font-bold text-white/50">
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
                    className="mt-3 text-xs font-semibold text-[#d4af37] underline-offset-2 hover:underline"
                  >
                    Reessayer
                  </button>
                </div>
              )}
              {audioQuizSchedule.length > 0 && (
                <p className="mt-4 text-[11px] text-white/40">
                  La reprise de l&apos;audio se fait automatiquement apres la bonne reponse.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Chapter label + slide counter */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          {currentChapter && (
            <span className="rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#d4af37]/80 backdrop-blur-sm">
              {currentChapter.name}
            </span>
          )}
          <span className="rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-bold text-white/70 backdrop-blur-sm tabular-nums">
            {activeSlide + 1} / {slides.length}
          </span>
        </div>

        {/* Avatar badge */}
        {avatar && (
          <div className="absolute top-3 left-3 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-sm">
            <div
              className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-md"
              style={{ backgroundColor: avatar.accentColor }}
            >
              {avatar.initials}
            </div>
            <span className="text-[11px] font-medium text-white/80">{avatar.name}</span>
          </div>
        )}

        {/* Fullscreen button */}
        <button
          type="button"
          onClick={toggleFullscreen}
          className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-white/60 backdrop-blur-sm transition hover:bg-black/60 hover:text-white"
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
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white/60 backdrop-blur-sm transition hover:bg-black/50 hover:text-white disabled:opacity-0"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => navigateSlide(1)}
              disabled={activeSlide === slides.length - 1}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white/60 backdrop-blur-sm transition hover:bg-black/50 hover:text-white disabled:opacity-0"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Big play overlay if paused */}
        {!playing && !quizOverlay && (
          <button
            onClick={toggle}
            className="absolute inset-0 flex items-center justify-center bg-black/20 transition hover:bg-black/30"
            aria-label="Lancer la lecture"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#d4af37] text-[#1a3a5c] shadow-xl shadow-[#d4af37]/30 transition hover:scale-110 active:scale-100">
              <svg className="h-7 w-7 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        )}
      </div>

      {/* ── CONTROLS BAR ───────────────────────────────── */}
      <div className="bg-[#0f1f33] px-4 py-3 space-y-2">
        {/* Progress bar */}
        <div
          onClick={quizOverlay ? undefined : seekBar}
          className={`relative h-2 rounded-full bg-white/10 group ${
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
              className="absolute top-0 h-full w-0.5 bg-[#d4af37]/90"
              style={{ left: `${q.pauseAtRatio * 100}%` }}
              title={`Quiz ${i + 1}`}
            />
          ))}
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#d4af37] to-[#f0e6c8] transition-[width] duration-150"
            style={{ width: `${pct}%` }}
          />
          <div
            className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#d4af37] bg-white opacity-0 shadow-md transition group-hover:opacity-100"
            style={{ left: `${pct}%` }}
          />
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between gap-3">
          {/* Time */}
          <span className="w-24 text-xs text-white/50 tabular-nums">
            {fmt(current)} / {loaded ? fmt(duration) : "--:--"}
          </span>

          {/* Playback controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={!!quizOverlay}
              onClick={() => skip(-15)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white transition disabled:opacity-40"
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
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4af37] text-[#1a3a5c] shadow-lg hover:bg-[#e0bf4d] transition disabled:opacity-40 active:scale-95"
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
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white transition disabled:opacity-40"
              title="+15s"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
              </svg>
            </button>
          </div>

          {/* Speed + keyboard hint */}
          <div className="flex items-center gap-2 w-24 justify-end">
            <span className="hidden sm:inline text-[9px] text-white/25 tabular-nums select-none">
              &#x2190;&#x2192; slides
            </span>
            <button
              onClick={cycleSpeed}
              className="rounded-full border border-white/20 px-2 py-0.5 text-[10px] font-bold text-white/70 hover:bg-white/10 transition tabular-nums"
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
      className="mt-2 flex items-center justify-center gap-1 text-[10px] text-white/30 hover:text-white/50 transition"
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
    <div className="flex flex-col gap-1 pt-0.5">
      {chapters.map((ch) => (
        <div key={ch.name} className="flex items-center gap-1.5">
          <span className="text-[8px] font-bold uppercase tracking-wider text-white/30 w-16 shrink-0 truncate">
            {ch.name}
          </span>
          <div className="flex gap-0.5 flex-1">
            {slides.slice(ch.startSlide, ch.endSlide + 1).map((_, offset) => {
              const i = ch.startSlide + offset;
              return (
                <button
                  key={i}
                  type="button"
                  disabled={quizLocked}
                  onClick={() => onGoTo(i)}
                  className={`flex-1 h-1.5 rounded-full transition-all duration-200 disabled:opacity-40 ${
                    i === activeSlide
                      ? "bg-[#d4af37] shadow-[0_0_6px_rgba(212,175,55,0.6)]"
                      : i < activeSlide
                      ? "bg-[#d4af37]/35"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                  title={`Slide ${i + 1}`}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Slide Background Patterns                                          */
/* ------------------------------------------------------------------ */

function SlideBackground({ kind }: { kind: Slide["kind"] }) {
  switch (kind) {
    case "title":
      return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Deep radial gradient */}
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(26,58,92,0.6) 0%, transparent 70%)",
          }} />
          {/* Geometric cross pattern */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
          {/* Gold accent rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full border border-[#d4af37]/6" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full border border-[#d4af37]/8" />
        </div>
      );

    case "concept":
    case "highlight":
      return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Floating abstract blobs via box-shadows trick */}
          <div className="absolute top-[-40px] right-[-40px] h-48 w-48 rounded-full bg-blue-600/10 blur-2xl" />
          <div className="absolute bottom-[-60px] left-[-20px] h-56 w-56 rounded-full bg-[#1a3a5c]/40 blur-3xl" />
          <div className="absolute top-1/2 left-1/4 h-32 w-32 rounded-full bg-[#d4af37]/5 blur-2xl" />
        </div>
      );

    case "stats":
      return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.035]" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }} />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a1929]/60 to-transparent" />
        </div>
      );

    case "chart":
      return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "100% 25%",
          }} />
          <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-[#d4af37]/5 to-transparent" />
        </div>
      );

    case "comparison":
      return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Diagonal stripes */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,1) 0px, rgba(255,255,255,1) 1px, transparent 1px, transparent 20px)",
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
            background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(212,175,55,0.03) 30deg, transparent 60deg, transparent 90deg, rgba(212,175,55,0.02) 120deg, transparent 150deg, transparent 180deg, rgba(212,175,55,0.03) 210deg, transparent 240deg, transparent 270deg, rgba(212,175,55,0.02) 300deg, transparent 330deg, transparent 360deg)",
          }} />
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 60%)",
          }} />
        </div>
      );

    case "trainer-tip":
      return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse 80% 60% at 30% 50%, rgba(212,175,55,0.08) 0%, transparent 60%)",
          }} />
          <div className="absolute top-0 left-0 h-full w-2 bg-gradient-to-b from-[#d4af37]/20 via-[#d4af37]/40 to-[#d4af37]/20" />
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

function SlideRenderer({ slide, avatar, isActive }: { slide: Slide; avatar?: ModuleAvatar; isActive: boolean }) {
  switch (slide.kind) {
    case "title":
      return <TitleSlide title={slide.title} subtitle={slide.subtitle} avatar={avatar} />;
    case "concept":
      return <ConceptSlide concept={slide.concept} index={slide.index} total={slide.total} />;
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
      return <HighlightSlide statement={slide.statement} />;
    case "trainer-tip":
      return <TrainerTipSlide concept={slide.concept} avatar={avatar} />;
    case "end":
      return <EndSlide title={slide.title} />;
  }
}

/* ------------------------------------------------------------------ */
/*  Individual Slide Components                                        */
/* ------------------------------------------------------------------ */

/* ── TITLE SLIDE ─── */
function TitleSlide({ title, subtitle, avatar }: { title: string; subtitle: string; avatar?: ModuleAvatar }) {
  return (
    <div
      className="text-center w-full max-w-xl"
      style={{ animation: "titleEntrance 0.7s cubic-bezier(0.16,1,0.3,1) both" }}
    >
      <style>{`
        @keyframes titleEntrance {
          from { opacity: 0; transform: scale(0.95) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
      {/* Decorative gold line */}
      <div className="mx-auto mb-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]/50" />
        <div className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]/50" />
      </div>
      <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d4af37]">{subtitle}</p>
      <h2 className="mt-4 text-2xl font-black text-white sm:text-4xl leading-tight drop-shadow-lg">
        {title}
      </h2>
      {avatar && (
        <div className="mt-7 flex items-center justify-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white ring-2 ring-[#d4af37]/30 shadow-xl"
            style={{ backgroundColor: avatar.accentColor }}
          >
            {avatar.initials}
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-white/90">{avatar.name}</p>
            <p className="text-xs text-white/50">{avatar.role}</p>
          </div>
        </div>
      )}
      {/* Decorative bottom line */}
      <div className="mx-auto mt-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]/30" />
        <div className="h-1 w-1 rounded-full bg-[#d4af37]/50" />
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]/30" />
      </div>
    </div>
  );
}

/* ── CONCEPT SLIDE ─── */
function ConceptSlide({ concept, index, total }: { concept: KeyConcept; index: number; total: number }) {
  const colors = TYPE_COLORS[concept.type] ?? TYPE_COLORS.rule;
  return (
    <div
      className="w-full max-w-lg"
      style={{ animation: "slideFromRight 0.5s cubic-bezier(0.16,1,0.3,1) both" }}
    >
      <style>{`
        @keyframes slideFromRight {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
      <p className="text-center text-[10px] font-bold uppercase tracking-widest text-[#d4af37] mb-5">
        Concept {index + 1} / {total}
      </p>
      <div className={`rounded-2xl border-2 ${colors.border} ${colors.bg} p-7 backdrop-blur-sm relative overflow-hidden`}>
        {/* Subtle corner accent */}
        <div className={`absolute top-0 right-0 w-16 h-16 opacity-20 rounded-bl-3xl ${colors.bg}`} />
        <div className="relative">
          <div className="flex items-center justify-center gap-3 mb-1">
            <span className="text-4xl drop-shadow-md">{CONCEPT_ICONS[concept.icon] ?? "\uD83D\uDCCC"}</span>
            <span className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase ${colors.text} bg-white/10 border ${colors.border}`}>
              {TYPE_LABELS[concept.type] ?? concept.type}
            </span>
          </div>
          <h3 className="mt-4 text-center text-xl font-black text-white sm:text-2xl leading-tight">
            {concept.title}
          </h3>
          <p className="mt-3 text-center text-sm leading-relaxed text-white/70">
            {concept.description}
          </p>
        </div>
      </div>
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
      className="w-full max-w-2xl"
      style={{ animation: "fadeIn 0.5s ease-out both" }}
    >
      <p className="text-center text-[10px] font-bold uppercase tracking-widest text-[#d4af37] mb-6">
        Chiffres cles
      </p>
      <div className={`grid gap-4 ${stats.length <= 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4"}`}>
        {stats.map((s, i) => (
          <div
            key={i}
            className="rounded-xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm"
            style={{ animation: `fadeIn 0.5s ease-out ${i * 0.1}s both` }}
          >
            <p className={`text-3xl font-black tabular-nums ${STAT_COLORS[s.color] ?? "text-white"}`}>
              {counters[i]}
            </p>
            {s.unit && <p className="text-xs text-white/50 font-medium mt-1">{s.unit}</p>}
            <p className="mt-2 text-[11px] text-white/40 font-medium leading-tight">{s.label}</p>
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
    if (!isActive) { setHeights(stats.map(() => 0)); return; }
    const timeout = setTimeout(() => {
      setHeights(values.map((v) => (v / maxVal) * 100));
    }, 100);
    return () => clearTimeout(timeout);
  }, [isActive, values, maxVal, stats]);

  return (
    <div
      className="w-full max-w-xl"
      style={{ animation: "fadeIn 0.5s ease-out both" }}
    >
      <p className="text-center text-[10px] font-bold uppercase tracking-widest text-[#d4af37] mb-6">
        Visualisation
      </p>
      <div className="flex items-end gap-3 h-40 px-2">
        {stats.map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-2 flex-1">
            <span className={`text-xs font-black tabular-nums ${STAT_COLORS[s.color] ?? "text-white"}`}>
              {s.value}
              {s.unit ? <span className="text-[9px] font-normal text-white/40 ml-0.5">{s.unit}</span> : null}
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
            <p className="text-[9px] text-white/40 font-medium text-center leading-tight max-w-[60px]">
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
      className="w-full max-w-2xl"
      style={{ animation: "fadeIn 0.5s ease-out both" }}
    >
      <p className="text-center text-[10px] font-bold uppercase tracking-widest text-[#d4af37] mb-3">
        Comparatif
      </p>
      <h3 className="text-center text-base font-bold text-white mb-4 sm:text-lg">{title}</h3>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-3 py-2.5 text-left text-[10px] font-bold uppercase text-white/35 w-1/4">Critere</th>
              <th className="px-3 py-2.5 text-left text-[10px] font-bold uppercase text-white/80 w-[37.5%]">{colA}</th>
              <th className="px-3 py-2.5 text-left text-[10px] font-bold uppercase text-[#d4af37] w-[37.5%]">{colB}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={i}
                className="border-b border-white/5 last:border-0"
                style={{ animation: `fadeIn 0.4s ease-out ${i * 0.07}s both` }}
              >
                <td className="px-3 py-2.5 text-xs font-semibold text-white/50">{r.label}</td>
                <td className={`px-3 py-2.5 text-xs ${r.highlight === "a" ? "font-bold text-white bg-white/5" : "text-white/45"}`}>
                  {r.highlight === "a" && <span className="mr-1 text-emerald-400">&#x2714;</span>}{r.colA}
                </td>
                <td className={`px-3 py-2.5 text-xs ${r.highlight === "b" ? "font-bold text-[#d4af37] bg-[#d4af37]/5" : "text-white/45"}`}>
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
    <div className="w-full max-w-lg">
      <p className="text-center text-[10px] font-bold uppercase tracking-widest text-[#d4af37] mb-5">
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
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">
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
    <div className="w-full max-w-lg">
      <p className="text-center text-[10px] font-bold uppercase tracking-widest text-[#d4af37] mb-6">
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
            <div className={`rounded-xl border border-[#d4af37]/25 bg-[#d4af37]/10 ${isVertical ? "px-3 py-2.5 flex-1" : "px-3 py-3 w-full text-center"}`}>
              <div className={`flex ${isVertical ? "items-center gap-3" : "flex-col items-center gap-1.5"}`}>
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#d4af37] text-[10px] font-black text-[#1a3a5c]">
                  {i + 1}
                </span>
                <p className="text-xs font-medium text-white/80 leading-tight">{step}</p>
              </div>
            </div>
            {/* Arrow between steps */}
            {i < steps.length - 1 && (
              <div className={`text-[#d4af37]/50 font-bold ${isVertical ? "text-lg leading-none" : "text-base"}`}>
                {isVertical ? "↓" : "→"}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── HIGHLIGHT SLIDE ─── */
function HighlightSlide({ statement }: { statement: string }) {
  return (
    <div
      className="w-full max-w-xl text-center"
      style={{ animation: "fadeIn 0.6s ease-out both" }}
    >
      {/* Decorative frame */}
      <div className="relative px-8 py-10">
        {/* Corner ornaments */}
        <div className="absolute top-0 left-0 h-8 w-8 border-l-2 border-t-2 border-[#d4af37]/50 rounded-tl-lg" />
        <div className="absolute top-0 right-0 h-8 w-8 border-r-2 border-t-2 border-[#d4af37]/50 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 h-8 w-8 border-l-2 border-b-2 border-[#d4af37]/50 rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 h-8 w-8 border-r-2 border-b-2 border-[#d4af37]/50 rounded-br-lg" />

        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37] mb-6">
          Point cle
        </p>
        <blockquote className="text-xl font-black text-white leading-tight sm:text-3xl drop-shadow-lg">
          &ldquo;{statement}&rdquo;
        </blockquote>
      </div>
    </div>
  );
}

/* ── TRAINER TIP SLIDE ─── */
function TrainerTipSlide({ concept, avatar }: { concept: KeyConcept; avatar?: ModuleAvatar }) {
  return (
    <div
      className="w-full max-w-lg"
      style={{ animation: "fadeIn 0.5s ease-out both" }}
    >
      {/* Avatar badge — more prominent */}
      {avatar && (
        <div className="flex items-center gap-3 mb-5">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-black text-white ring-4 ring-[#d4af37]/30 shadow-xl"
            style={{ backgroundColor: avatar.accentColor }}
          >
            {avatar.initials}
          </div>
          <div>
            <p className="text-sm font-bold text-white">{avatar.name}</p>
            <p className="text-xs text-[#d4af37]">{avatar.role}</p>
          </div>
        </div>
      )}

      {/* Speech bubble */}
      <div className="relative rounded-2xl border-2 border-[#d4af37]/35 bg-[#d4af37]/8 px-6 py-5 backdrop-blur-sm">
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
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#d4af37] mb-3">
          Conseil formateur :
        </p>
        <div className="flex items-start gap-3">
          <span className="text-3xl shrink-0">{CONCEPT_ICONS[concept.icon] ?? "\uD83D\uDCA1"}</span>
          <div>
            <h3 className="text-base font-black text-white mb-1">{concept.title}</h3>
            <p className="text-sm leading-relaxed text-white/70">{concept.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── END SLIDE ─── */
function EndSlide({ title }: { title: string }) {
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
      <p className="mt-2 text-sm text-white/50">Lecon terminee — passez a la suite</p>
      <div className="mx-auto mt-5 flex items-center justify-center gap-2">
        <div className="h-1.5 w-1.5 rounded-full bg-[#d4af37]/40" />
        <div className="h-1.5 w-1.5 rounded-full bg-[#d4af37]/70" />
        <div className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
      </div>
    </div>
  );
}
