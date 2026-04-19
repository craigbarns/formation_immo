/**
 * Types et utilitaires pour l'alignement WhisperX
 * Build-time only — les .alignment.json sont générés par scripts/whisperx-align.mjs
 */

export interface WhisperWord {
  word: string;
  start: number; // secondes
  end: number;
  score: number; // 0-1, confiance du modèle d'alignement
}

export interface WhisperSegment {
  start: number;
  end: number;
  text: string;
  words: WhisperWord[];
}

/** Format brut sorti par WhisperX */
export interface WhisperXAlignment {
  segments: WhisperSegment[];
  word_segments: WhisperWord[];
  language: string;
}

/** Format compact qu'on expose au client — ~50% plus petit que le JSON brut */
export interface LessonAlignment {
  version: 1;
  /** Mots avec timestamps — le seul champ nécessaire pour le karaoké */
  words: Array<{
    w: string; // mot
    s: number; // start
    e: number; // end
  }>;
  /** Segments (phrases) — utile pour les transitions de slide */
  segments: Array<{
    s: number;
    e: number;
    t: string; // texte complet
  }>;
  duration: number;
}

/** Convertit le JSON brut WhisperX en format compact LessonAlignment */
export function compactAlignment(raw: WhisperXAlignment): LessonAlignment {
  const lastWord = raw.word_segments[raw.word_segments.length - 1];
  return {
    version: 1,
    words: raw.word_segments.map((w) => ({
      w: w.word.trim(),
      s: w.start,
      e: w.end,
    })),
    segments: raw.segments.map((s) => ({
      s: s.start,
      e: s.end,
      t: s.text.trim(),
    })),
    duration: lastWord ? lastWord.end : 0,
  };
}

/** Trouve le mot actif à un temps donné (binary search) */
export function findActiveWord(
  words: LessonAlignment["words"],
  time: number
): { index: number; word: LessonAlignment["words"][0] } | null {
  let lo = 0;
  let hi = words.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const w = words[mid];
    if (time < w.s) {
      hi = mid - 1;
    } else if (time > w.e) {
      lo = mid + 1;
    } else {
      return { index: mid, word: w };
    }
  }
  // Entre deux mots — retourne le prochain
  if (lo < words.length && time < words[lo].s) {
    return { index: lo, word: words[lo] };
  }
  return null;
}

/** Trouve le segment (phrase) actif à un temps donné */
export function findActiveSegment(
  segments: LessonAlignment["segments"],
  time: number
): LessonAlignment["segments"][0] | null {
  for (const seg of segments) {
    if (time >= seg.s && time <= seg.e) return seg;
  }
  return null;
}
