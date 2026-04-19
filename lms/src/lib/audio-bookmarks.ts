/**
 * Bookmarks time-codés pour le CinematicPlayer
 * Permet de marquer des moments importants pendant l'écoute
 */

const STORAGE_KEY = "cinematic-player-bookmarks";

export interface AudioBookmark {
  id: string;
  audioUrl: string;
  time: number;
  label: string;
  createdAt: number;
}

function getKey(audioUrl: string): string {
  return `${STORAGE_KEY}:${audioUrl}`;
}

export function addBookmark(audioUrl: string, time: number, label?: string): AudioBookmark {
  if (typeof window === "undefined") {
    return { id: "", audioUrl, time, label: label ?? "", createdAt: 0 };
  }

  const bookmark: AudioBookmark = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    audioUrl,
    time: Math.floor(time),
    label: label ?? `Bookmark à ${formatTime(time)}`,
    createdAt: Date.now(),
  };

  const existing = loadBookmarks(audioUrl);
  existing.push(bookmark);

  try {
    localStorage.setItem(getKey(audioUrl), JSON.stringify(existing));
  } catch {
    // localStorage plein
  }

  return bookmark;
}

export function loadBookmarks(audioUrl: string): AudioBookmark[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(getKey(audioUrl));
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function removeBookmark(audioUrl: string, id: string): void {
  if (typeof window === "undefined") return;
  const existing = loadBookmarks(audioUrl);
  const filtered = existing.filter((b) => b.id !== id);
  try {
    localStorage.setItem(getKey(audioUrl), JSON.stringify(filtered));
  } catch {
    // ignore
  }
}

export function clearBookmarks(audioUrl: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(getKey(audioUrl));
}

function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}
