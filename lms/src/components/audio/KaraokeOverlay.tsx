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
    <div className="absolute bottom-24 left-0 right-0 z-30 flex justify-center pointer-events-none px-6">
      <div
        className="max-w-3xl px-10 py-6 rounded-[2rem] text-center shadow-2xl"
        style={{
          background: "linear-gradient(180deg, rgba(15,23,42,0.85) 0%, rgba(2,6,23,0.92) 100%)",
          backdropFilter: "blur(24px) saturate(1.6)",
          WebkitBackdropFilter: "blur(24px) saturate(1.6)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.05)",
        }}
      >
        <p className="flex flex-wrap justify-center gap-x-[0.4em] gap-y-2 leading-tight">
          {words.map((w, i) => {
            const isPast = i < activeIndex;
            const isCurrent = i === activeIndex;

            return (
              <span
                key={`${i}-${w}`}
                className="transition-all duration-200 ease-out inline-block"
                style={{
                  fontSize: isCurrent ? "1.85rem" : "1.45rem",
                  fontWeight: isCurrent ? 900 : 700,
                  letterSpacing: isCurrent ? "-0.01em" : "0",
                  color: isCurrent
                    ? "#fff"
                    : isPast
                    ? "rgba(255,255,255,0.92)"
                    : "rgba(255,255,255,0.24)",
                  textShadow: isCurrent
                    ? "0 0 30px rgba(255,255,255,0.4), 0 0 60px rgba(212,175,55,0.2)"
                    : isPast 
                    ? "0 2px 4px rgba(0,0,0,0.3)"
                    : "none",
                  transform: isCurrent ? "scale(1.1) translateY(-2px)" : "scale(1)",
                  filter: isCurrent ? "none" : isPast ? "none" : "blur(0.5px)",
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
