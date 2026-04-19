"use client";

import { useState, useCallback, useRef } from "react";

interface ProgressPreviewProps {
  slides: Array<{ kind: string; title?: string; concept?: { title: string } }>;
  chapters: Array<{ name: string; startSlide: number; endSlide: number }>;
  duration: number;
  onSeek: (ratio: number) => void;
  quizLocked: boolean;
}

/**
 * Barre de progression avec preview au survol (style YouTube/Netflix)
 * Affiche le titre de la slide et le chapitre au survol
 */
export function ProgressPreview({ slides, chapters, duration, onSeek, quizLocked }: ProgressPreviewProps) {
  const [hoverRatio, setHoverRatio] = useState<number | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!barRef.current || quizLocked) return;
      const rect = barRef.current.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      setHoverRatio(ratio);
    },
    [quizLocked]
  );

  const handleMouseLeave = useCallback(() => {
    setHoverRatio(null);
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!barRef.current || quizLocked) return;
      const rect = barRef.current.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      onSeek(ratio);
    },
    [onSeek, quizLocked]
  );

  const previewSlide = hoverRatio !== null
    ? slides[Math.min(slides.length - 1, Math.floor(hoverRatio * slides.length))]
    : null;

  const previewChapter = hoverRatio !== null
    ? chapters.find((c) => {
        const slideIdx = Math.floor(hoverRatio * slides.length);
        return slideIdx >= c.startSlide && slideIdx <= c.endSlide;
      })
    : null;

  const previewTime = hoverRatio !== null
    ? `${Math.floor(hoverRatio * duration / 60)}:${Math.floor((hoverRatio * duration) % 60).toString().padStart(2, "0")}`
    : "";

  return (
    <div
      ref={barRef}
      className={`relative h-8 -mt-3 mb-1 flex items-end ${quizLocked ? "cursor-not-allowed" : "cursor-pointer"}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Fine progress line */}
      <div className="absolute bottom-1.5 left-0 right-0 h-1 rounded-full bg-white/10" />

      {/* Hover indicator */}
      {hoverRatio !== null && (
        <div
          className="absolute bottom-1.5 h-1 rounded-full bg-white/30 pointer-events-none"
          style={{ left: 0, width: `${hoverRatio * 100}%` }}
        />
      )}

      {/* Preview tooltip */}
      {hoverRatio !== null && previewSlide && (
        <div
          className="absolute bottom-5 z-40 pointer-events-none"
          style={{ left: `${hoverRatio * 100}%`, transform: "translateX(-50%)" }}
        >
          <div
            className="rounded-lg px-3 py-2 text-center shadow-xl"
            style={{
              background: "rgba(0,0,0,0.85)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
              minWidth: "140px",
            }}
          >
            <p className="text-3xs font-bold uppercase tracking-wider text-brand-gold/80 mb-1">
              {previewChapter?.name ?? ""}
            </p>
            <p className="text-xs font-semibold text-white leading-tight">
              {previewSlide.kind === "title"
                ? "Introduction"
                : previewSlide.kind === "concept"
                ? previewSlide.concept?.title ?? "Concept"
                : previewSlide.kind === "end"
                ? "Fin"
                : previewSlide.kind === "stats"
                ? "Données"
                : previewSlide.kind === "takeaways"
                ? "À retenir"
                : previewSlide.kind === "process"
                ? "Processus"
                : previewSlide.kind === "highlight"
                ? "Point clé"
                : previewSlide.kind === "trainer-tip"
                ? "Conseil pro"
                : previewSlide.kind === "comparison"
                ? "Comparatif"
                : previewSlide.kind === "chart"
                ? "Graphique"
                : "Slide"}
            </p>
            <p className="mt-1 text-2xs text-white/50 tabular-nums">{previewTime}</p>
          </div>
          {/* Arrow */}
          <div
            className="mx-auto h-1.5 w-1.5 rotate-45"
            style={{
              background: "rgba(0,0,0,0.85)",
              marginTop: "-3px",
              borderRight: "1px solid rgba(255,255,255,0.1)",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
          />
        </div>
      )}
    </div>
  );
}
