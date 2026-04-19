"use client";

import { useMemo } from "react";

interface WaveformBarsProps {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  barCount?: number;
}

/**
 * Barres d'ondes animées — style podcast/player moderne
 * S'anime quand l'audio joue, s'arrête en pause
 */
export function WaveformBars({ isPlaying, currentTime, duration, barCount = 40 }: WaveformBarsProps) {
  const bars = useMemo(() => {
    return Array.from({ length: barCount }, (_, i) => {
      // Hauteur pseudo-aléatoire basée sur la position
      const seed = Math.sin(i * 1.7 + 3) * 0.5 + 0.5;
      const height = 20 + seed * 80; // 20% à 100%
      const isPast = duration > 0 && (i / barCount) < (currentTime / duration);
      return { height, isPast };
    });
  }, [currentTime, duration, barCount]);

  return (
    <div className="flex items-end justify-center gap-[2px] h-8">
      {bars.map((bar, i) => (
        <div
          key={i}
          className="w-1 rounded-full transition-all duration-150"
          style={{
            height: `${bar.height}%`,
            background: bar.isPast
              ? "linear-gradient(to top, #d4af37, rgba(212,175,55,0.5))"
              : "rgba(255,255,255,0.15)",
            opacity: isPlaying ? 1 : 0.5,
            animation: isPlaying ? `waveformPulse ${0.8 + (i % 3) * 0.2}s ease-in-out infinite alternate` : undefined,
            animationDelay: `${i * 0.03}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes waveformPulse {
          from { transform: scaleY(0.6); }
          to   { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}
