/**
 * Statistiques de lecture audio pour une leçon
 * Calculées en temps réel pendant l'écoute
 */

export interface AudioStats {
  /** Temps total écouté (en secondes) — compte les segments réécoutés */
  totalListened: number;
  /** Temps effectif passé en lecture (sans les pauses) */
  activeListeningTime: number;
  /** Vitesse moyenne de lecture */
  avgSpeed: number;
  /** Nombre de pauses */
  pauseCount: number;
  /** Nombre de seeks (sauts) */
  seekCount: number;
  /** Segments réécoutés (où l'utilisateur est revenu en arrière) */
  rewindCount: number;
  /** Heure de début */
  startedAt: number | null;
  /** Heure de fin */
  endedAt: number | null;
}

export function createAudioStats(): AudioStats {
  return {
    totalListened: 0,
    activeListeningTime: 0,
    avgSpeed: 1,
    pauseCount: 0,
    seekCount: 0,
    rewindCount: 0,
    startedAt: null,
    endedAt: null,
  };
}

export function updateStatsOnPlay(stats: AudioStats, speed: number): AudioStats {
  return {
    ...stats,
    startedAt: stats.startedAt ?? Date.now(),
    avgSpeed: speed,
  };
}

export function updateStatsOnPause(stats: AudioStats): AudioStats {
  return {
    ...stats,
    pauseCount: stats.pauseCount + 1,
  };
}

export function updateStatsOnSeek(stats: AudioStats, from: number, to: number): AudioStats {
  return {
    ...stats,
    seekCount: stats.seekCount + 1,
    rewindCount: to < from ? stats.rewindCount + 1 : stats.rewindCount,
  };
}

export function finalizeStats(stats: AudioStats): AudioStats {
  return {
    ...stats,
    endedAt: Date.now(),
  };
}
