"use client";

import { useMemo } from "react";
import { findActiveWord, findActiveSegment, type LessonAlignment } from "@/lib/audio-alignment";

interface KaraokeOverlayProps {
  alignment: LessonAlignment | null;
  currentTime: number;
  visible: boolean;
}

/**
 * Karaoké éditorial — style Apple Music
 * - Phrase courante en grand, centrée
 * - Mots déjà dits : blanc/gris clair
 * - Mot en cours : or, scale up, glow
 * - Mots à venir : gris foncé, faible opacité
 */
export function KaraokeOverlay({ alignment, currentTime, visible }: KaraokeOverlayProps) {
  const active = useMemo(() => {
    if (!alignment) return null;
    const seg = findActiveSegment(alignment.segments, currentTime);
    if (!seg) return null;
    const wordInfo = findActiveWord(alignment.words, currentTime);
    return { seg, wordInfo };
  }, [alignment, currentTime]);

  if (!visible || !active) return null;

  const { seg, wordInfo } = active;
  const activeIndex = wordInfo?.index ?? -1;

  // On découpe le texte du segment en mots pour l'affichage
  // WhisperX garde la ponctuation attachée aux mots, donc on split sur les espaces
  const words = seg.t.split(/\s+/).filter(Boolean);

  return (
    <div className="absolute bottom-24 left-0 right-0 z-30 flex justify-center pointer-events-none">
      <div
        className="max-w-[90%] px-8 py-5 rounded-2xl text-center"
        style={{
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(16px) saturate(1.4)",
          WebkitBackdropFilter: "blur(16px) saturate(1.4)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <p className="flex flex-wrap justify-center gap-x-[0.35em] gap-y-1 leading-relaxed">
          {words.map((w, i) => {
            const isPast = i < activeIndex;
            const isCurrent = i === activeIndex;
            const isFuture = i > activeIndex;

            return (
              <span
                key={`${i}-${w}`}
                className="transition-all duration-150 ease-out inline-block"
                style={{
                  fontSize: isCurrent ? "1.35em" : "1em",
                  fontWeight: isCurrent ? 700 : 500,
                  color: isCurrent
                    ? "#d4af37"
                    : isPast
                    ? "rgba(255,255,255,0.85)"
                    : "rgba(255,255,255,0.35)",
                  textShadow: isCurrent
                    ? "0 0 20px rgba(212,175,55,0.4), 0 0 40px rgba(212,175,55,0.15)"
                    : undefined,
                  transform: isCurrent ? "scale(1.05)" : "scale(1)",
                  transformOrigin: "center bottom",
                }}
              >
                {w}
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
}
