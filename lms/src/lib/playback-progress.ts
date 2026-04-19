/**
 * Sauvegarde et restauration de la progression de lecture audio
 * Stockage local — pas besoin de backend
 */

const STORAGE_KEY = "cinematic-player-progress";

interface ProgressEntry {
  audioUrl: string;
  currentTime: number;
  duration: number;
  updatedAt: number;
}

function getKey(audioUrl: string): string {
  return `${STORAGE_KEY}:${audioUrl}`;
}

export function saveProgress(audioUrl: string, currentTime: number, duration: number): void {
  if (typeof window === "undefined") return;
  if (!audioUrl || duration <= 0) return;
  // Ne sauvegarde pas si on est au début (< 5s) ou à la fin (> 95%)
  if (currentTime < 5 || currentTime / duration > 0.95) return;

  const entry: ProgressEntry = {
    audioUrl,
    currentTime: Math.floor(currentTime),
    duration: Math.floor(duration),
    updatedAt: Date.now(),
  };

  try {
    localStorage.setItem(getKey(audioUrl), JSON.stringify(entry));
  } catch {
    // localStorage plein — ignore
  }
}

export function loadProgress(audioUrl: string): number | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(getKey(audioUrl));
    if (!raw) return null;
    const entry: ProgressEntry = JSON.parse(raw);
    // Vérifie que c'est pas trop vieux (> 30 jours)
    if (Date.now() - entry.updatedAt > 30 * 24 * 60 * 60 * 1000) {
      localStorage.removeItem(getKey(audioUrl));
      return null;
    }
    return entry.currentTime;
  } catch {
    return null;
  }
}

export function clearProgress(audioUrl: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(getKey(audioUrl));
}

export function getAllProgress(): ProgressEntry[] {
  if (typeof window === "undefined") return [];
  const results: ProgressEntry[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key?.startsWith(`${STORAGE_KEY}:`)) continue;
    try {
      const entry: ProgressEntry = JSON.parse(localStorage.getItem(key)!);
      results.push(entry);
    } catch {
      // ignore
    }
  }
  return results.sort((a, b) => b.updatedAt - a.updatedAt);
}
