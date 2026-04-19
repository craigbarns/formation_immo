/**
 * Types et utilitaires pour les cues de leçon (timestamps de slides)
 * Générés par scripts/detect-cues.mjs à partir de l'alignment WhisperX
 */

export interface SlideCue {
  /** Index ou identifiant de la slide */
  index?: number;
  id?: string;
  /** Timestamp de début (secondes) */
  start: number;
  /** Timestamp de fin — calculé au runtime (start de la slide suivante ou duration) */
  end?: number;
  /** Source de détection : 'marker' | 'auto' */
  source?: string;
}

export interface KeyTermCue {
  term: string;
  start: number;
  end: number;
}

export interface LessonCues {
  version: number;
  duration: number;
  slides: SlideCue[];
  keyTerms: KeyTermCue[];
}

/** Charge le cues.json d'une leçon */
export async function loadLessonCues(url: string | null): Promise<LessonCues | null> {
  if (!url) return null;
  try {
    const r = await fetch(url);
    if (!r.ok) return null;
    return (await r.json()) as LessonCues;
  } catch {
    return null;
  }
}

/** Trouve l'index de slide actif à un temps donné via les cues */
export function findActiveSlideFromCues(cues: LessonCues, time: number): number {
  if (!cues.slides.length) return 0;

  // Ajoute les `end` si manquants
  const slides = cues.slides.map((s, i) => ({
    ...s,
    end: s.end ?? cues.slides[i + 1]?.start ?? cues.duration,
  }));

  for (let i = slides.length - 1; i >= 0; i--) {
    if (time >= slides[i].start) return i;
  }
  return 0;
}

/** Trouve les key terms actifs à un temps donné */
export function findActiveKeyTerms(cues: LessonCues, time: number): KeyTermCue[] {
  return cues.keyTerms.filter((k) => time >= k.start && time <= k.end);
}

/** Construit l'URL cues.json à partir de l'URL audio */
export function deriveCuesUrl(audioUrl: string | null): string | null {
  if (!audioUrl) return null;
  return audioUrl.replace(/\.mp3$/, ".cues.json").replace("/audio/", "/audio-align/");
}
