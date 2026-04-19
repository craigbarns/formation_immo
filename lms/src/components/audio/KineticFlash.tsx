"use client";

import { useMemo } from "react";
import { type LessonAlignment } from "@/lib/audio-alignment";
import type { LessonVisuals } from "@/data/lesson-keyconcepts";

interface KineticFlashProps {
  alignment: LessonAlignment | null;
  visuals: LessonVisuals | null;
  currentTime: number;
  visible: boolean;
}

/** Extraire les termes clés d'une chaîne */
function extractTerms(text: string): string[] {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/\s+/)
    .map((w) => w.replace(/[^a-z0-9]/g, ""))
    .filter((w) => w.length >= 3);
}

/** Cherche les occurrences d'un terme dans l'alignment */
function findTermOccurrences(
  words: LessonAlignment["words"],
  term: string
): Array<{ start: number; end: number }> {
  const termWords = extractTerms(term);
  if (!termWords.length) return [];

  const results: Array<{ start: number; end: number }> = [];
  for (let i = 0; i <= words.length - termWords.length; i++) {
    let match = true;
    for (let j = 0; j < termWords.length; j++) {
      const w = words[i + j].w
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, "");
      if (w !== termWords[j]) {
        match = false;
        break;
      }
    }
    if (match) {
      results.push({
        start: words[i].s,
        end: words[i + termWords.length - 1].e,
      });
    }
  }
  return results;
}

/** Génère les flash cues à partir des keyConcepts et de l'alignment */
export function buildFlashCues(
  alignment: LessonAlignment | null,
  visuals: LessonVisuals | null
): Array<{ term: string; start: number; end: number }> {
  if (!alignment || !visuals) return [];

  const cues: Array<{ term: string; start: number; end: number }> = [];
  const seen = new Set<string>();

  for (const concept of visuals.keyConcepts) {
    const searchTerms = [concept.title, concept.description];
    for (const t of searchTerms) {
      const occs = findTermOccurrences(alignment.words, t);
      for (const occ of occs) {
        const key = `${concept.title}|${occ.start}`;
        if (!seen.has(key)) {
          seen.add(key);
          cues.push({ term: concept.title, start: occ.start, end: occ.end });
        }
      }
    }
  }

  return cues.sort((a, b) => a.start - b.start);
}

/**
 * Kinetic Typography — les key concepts flashent quand prononcés
 * Apparaît en haut à droite de l'écran, disparaît après 1.5s
 */
export function KineticFlash({ alignment, visuals, currentTime, visible }: KineticFlashProps) {
  const flashCues = useMemo(
    () => buildFlashCues(alignment, visuals),
    [alignment, visuals]
  );

  const active = useMemo(() => {
    if (!visible || !flashCues.length) return [];
    return flashCues.filter((c) => currentTime >= c.start && currentTime <= c.end + 1.5);
  }, [flashCues, currentTime, visible]);

  if (!active.length) return null;

  return (
    <div className="absolute top-16 right-4 z-30 flex flex-col items-end gap-2 pointer-events-none">
      {active.map((cue, i) => {
        const isNew = currentTime <= cue.end;
        return (
          <div
            key={`${cue.term}-${cue.start}`}
            className="rounded-xl px-4 py-2 text-sm font-bold shadow-lg transition-all duration-300"
            style={{
              background: isNew
                ? "linear-gradient(135deg, rgba(212,175,55,0.9), rgba(212,175,55,0.7))"
                : "rgba(212,175,55,0.4)",
              color: "#0a1628",
              backdropFilter: "blur(8px)",
              transform: isNew ? "scale(1.05) translateX(0)" : "scale(1) translateX(0)",
              animation: isNew ? "flashIn 0.3s cubic-bezier(0.16,1,0.3,1)" : "flashOut 0.5s ease forwards",
              animationDelay: `${i * 0.05}s`,
              opacity: isNew ? 1 : 0.6,
            }}
          >
            {cue.term}
          </div>
        );
      })}
      <style>{`
        @keyframes flashIn {
          from { opacity: 0; transform: scale(0.8) translateX(20px); }
          to   { opacity: 1; transform: scale(1.05) translateX(0); }
        }
        @keyframes flashOut {
          from { opacity: 0.6; }
          to   { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
