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
    <div className="absolute top-20 right-8 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {active.map((cue, i) => {
        const isNew = currentTime <= cue.end;
        return (
          <div
            key={`${cue.term}-${cue.start}`}
            className="rounded-2xl px-6 py-3 text-lg font-black shadow-2xl transition-all duration-300 uppercase tracking-wider"
            style={{
              background: isNew
                ? "linear-gradient(135deg, #d4af37, #fde68a)"
                : "rgba(212,175,55,0.25)",
              color: "#030712",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow: isNew 
                ? "0 15px 40px rgba(212,175,55,0.4), 0 0 20px rgba(212,175,55,0.2)" 
                : "0 5px 15px rgba(0,0,0,0.3)",
              transform: isNew ? "scale(1.1) rotate(-1deg)" : "scale(0.95) rotate(0deg)",
              animation: isNew ? "flashIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)" : "flashOut 0.6s ease forwards",
              animationDelay: `${i * 0.08}s`,
              opacity: isNew ? 1 : 0,
            }}
          >
            {cue.term}
          </div>
        );
      })}
      <style>{`
        @keyframes flashIn {
          from { opacity: 0; transform: scale(0.5) rotate(5deg) translateX(40px); filter: blur(10px); }
          to   { opacity: 1; transform: scale(1.1) rotate(-1deg) translateX(0); filter: blur(0); }
        }
        @keyframes flashOut {
          from { opacity: 0.6; transform: scale(0.95); }
          to   { opacity: 0; transform: scale(0.8); }
        }
      `}</style>
    </div>
  );
}
