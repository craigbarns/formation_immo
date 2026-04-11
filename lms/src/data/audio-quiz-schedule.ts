/**
 * Pauses audio dans le CinematicPlayer : ratio sur la durée totale (0–1)
 * pour rester cohérent quelle que soit la longueur du fichier MP3.
 * Chaque entrée référence un `QuizCheckpoint` existant par son id.
 */

import type { QuizCheckpoint } from "./quiz-checkpoints";
import { getQuizCheckpointById } from "./quiz-checkpoints";

export type AudioQuizScheduleItem = {
  /** Position dans la piste audio (0 = début, 1 = fin) */
  pauseAtRatio: number;
  quizCheckpointId: string;
};

const SCHEDULE_KEY = (m: string, l: string) => `${m}:${l}`;

/** Leçons avec quiz « cinématique » intégré au lecteur audio */
const AUDIO_QUIZ_SCHEDULES: Record<string, AudioQuizScheduleItem[]> = {
  [SCHEDULE_KEY("juridique", "compromis")]: [
    { pauseAtRatio: 0.2, quizCheckpointId: "qc-jur-comp-01" },
    { pauseAtRatio: 0.45, quizCheckpointId: "qc-jur-comp-02" },
  ],
  [SCHEDULE_KEY("financement", "rentabilite")]: [
    { pauseAtRatio: 0.25, quizCheckpointId: "qc-fin-rent-01" },
    { pauseAtRatio: 0.55, quizCheckpointId: "qc-fin-rent-02" },
  ],
};

export type ResolvedAudioQuizItem = {
  pauseAtRatio: number;
  checkpoint: QuizCheckpoint;
};

export function getResolvedAudioQuizSchedule(
  moduleSlug: string,
  lessonSlug: string,
): ResolvedAudioQuizItem[] {
  const raw = AUDIO_QUIZ_SCHEDULES[SCHEDULE_KEY(moduleSlug, lessonSlug)] ?? [];
  const out: ResolvedAudioQuizItem[] = [];
  for (const item of raw) {
    const checkpoint = getQuizCheckpointById(item.quizCheckpointId);
    if (checkpoint) {
      out.push({ pauseAtRatio: item.pauseAtRatio, checkpoint });
    }
  }
  return out.sort((a, b) => a.pauseAtRatio - b.pauseAtRatio);
}
