/**
 * Système de notes personnelles par leçon
 * Stockage localStorage avec export/import
 */

const NOTES_STORAGE_KEY = "formation-immobilier-notes";

export type Note = {
  id: string;
  lessonId: string;
  moduleSlug: string;
  lessonSlug: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  color?: "yellow" | "blue" | "green" | "pink" | "purple";
};

export type NotesState = {
  notes: Note[];
  version: number;
};

const CURRENT_VERSION = 1;

function getDefaultState(): NotesState {
  return { notes: [], version: CURRENT_VERSION };
}

export function getNotesState(): NotesState {
  if (typeof window === "undefined") return getDefaultState();
  try {
    const raw = localStorage.getItem(NOTES_STORAGE_KEY);
    if (!raw) return getDefaultState();
    const parsed = JSON.parse(raw) as NotesState;
    return { ...getDefaultState(), ...parsed };
  } catch {
    return getDefaultState();
  }
}

function saveState(state: NotesState) {
  localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(state));
}

export function getNotesForLesson(moduleSlug: string, lessonSlug: string): Note[] {
  const state = getNotesState();
  return state.notes
    .filter((n) => n.moduleSlug === moduleSlug && n.lessonSlug === lessonSlug)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export function getAllNotes(): Note[] {
  const state = getNotesState();
  return state.notes.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export function addNote(
  moduleSlug: string,
  lessonSlug: string,
  content: string,
  options?: { color?: Note["color"]; tags?: string[] }
): Note {
  const state = getNotesState();
  const lessonId = `${moduleSlug}/${lessonSlug}`;
  
  const newNote: Note = {
    id: crypto.randomUUID(),
    lessonId,
    moduleSlug,
    lessonSlug,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: options?.tags || [],
    color: options?.color || "yellow",
  };
  
  state.notes.push(newNote);
  saveState(state);
  return newNote;
}

export function updateNote(noteId: string, updates: Partial<Omit<Note, "id" | "createdAt">>): Note | null {
  const state = getNotesState();
  const noteIndex = state.notes.findIndex((n) => n.id === noteId);
  
  if (noteIndex === -1) return null;
  
  state.notes[noteIndex] = {
    ...state.notes[noteIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  saveState(state);
  return state.notes[noteIndex];
}

export function deleteNote(noteId: string): boolean {
  const state = getNotesState();
  const initialLength = state.notes.length;
  state.notes = state.notes.filter((n) => n.id !== noteId);
  
  if (state.notes.length !== initialLength) {
    saveState(state);
    return true;
  }
  return false;
}

export function searchNotes(query: string): Note[] {
  const state = getNotesState();
  const lowerQuery = query.toLowerCase();
  
  return state.notes.filter(
    (n) =>
      n.content.toLowerCase().includes(lowerQuery) ||
      n.tags.some((t) => t.toLowerCase().includes(lowerQuery))
  );
}

export function exportNotes(): string {
  return JSON.stringify(getNotesState(), null, 2);
}

export function importNotes(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString) as NotesState;
    if (!Array.isArray(data.notes)) return false;
    saveState(data);
    return true;
  } catch {
    return false;
  }
}

export const NOTE_COLORS = {
  yellow: { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-800" },
  blue: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-800" },
  green: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-800" },
  pink: { bg: "bg-pink-50", border: "border-pink-200", text: "text-pink-800" },
  purple: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-800" },
};
