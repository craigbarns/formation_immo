/**
 * Système de favoris/marque-pages
 */

const BOOKMARKS_STORAGE_KEY = "formation-immobilier-bookmarks";

export type Bookmark = {
  id: string;
  moduleSlug: string;
  lessonSlug: string;
  lessonTitle: string;
  moduleTitle: string;
  createdAt: string;
  note?: string; // note personnelle optionnelle
};

export type BookmarksState = {
  bookmarks: Bookmark[];
  version: number;
};

const CURRENT_VERSION = 1;

function getDefaultState(): BookmarksState {
  return { bookmarks: [], version: CURRENT_VERSION };
}

export function getBookmarksState(): BookmarksState {
  if (typeof window === "undefined") return getDefaultState();
  try {
    const raw = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
    if (!raw) return getDefaultState();
    const parsed = JSON.parse(raw) as BookmarksState;
    return { ...getDefaultState(), ...parsed };
  } catch {
    return getDefaultState();
  }
}

function saveState(state: BookmarksState) {
  localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(state));
}

export function isBookmarked(moduleSlug: string, lessonSlug: string): boolean {
  const state = getBookmarksState();
  return state.bookmarks.some(
    (b) => b.moduleSlug === moduleSlug && b.lessonSlug === lessonSlug
  );
}

export function addBookmark(
  moduleSlug: string,
  lessonSlug: string,
  lessonTitle: string,
  moduleTitle: string,
  note?: string
): Bookmark {
  const state = getBookmarksState();
  
  // Vérifier si existe déjà
  const existingIndex = state.bookmarks.findIndex(
    (b) => b.moduleSlug === moduleSlug && b.lessonSlug === lessonSlug
  );
  
  if (existingIndex !== -1) {
    // Mettre à jour la note si fournie
    if (note !== undefined) {
      state.bookmarks[existingIndex].note = note;
      saveState(state);
    }
    return state.bookmarks[existingIndex];
  }
  
  const newBookmark: Bookmark = {
    id: crypto.randomUUID(),
    moduleSlug,
    lessonSlug,
    lessonTitle,
    moduleTitle,
    createdAt: new Date().toISOString(),
    note,
  };
  
  state.bookmarks.push(newBookmark);
  saveState(state);
  return newBookmark;
}

export function removeBookmark(moduleSlug: string, lessonSlug: string): boolean {
  const state = getBookmarksState();
  const initialLength = state.bookmarks.length;
  
  state.bookmarks = state.bookmarks.filter(
    (b) => !(b.moduleSlug === moduleSlug && b.lessonSlug === lessonSlug)
  );
  
  if (state.bookmarks.length !== initialLength) {
    saveState(state);
    return true;
  }
  return false;
}

export function toggleBookmark(
  moduleSlug: string,
  lessonSlug: string,
  lessonTitle: string,
  moduleTitle: string,
  note?: string
): { bookmarked: boolean; bookmark?: Bookmark } {
  if (isBookmarked(moduleSlug, lessonSlug)) {
    removeBookmark(moduleSlug, lessonSlug);
    return { bookmarked: false };
  } else {
    const bookmark = addBookmark(moduleSlug, lessonSlug, lessonTitle, moduleTitle, note);
    return { bookmarked: true, bookmark };
  }
}

export function getAllBookmarks(): Bookmark[] {
  const state = getBookmarksState();
  return state.bookmarks.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getBookmarksByModule(moduleSlug: string): Bookmark[] {
  const state = getBookmarksState();
  return state.bookmarks
    .filter((b) => b.moduleSlug === moduleSlug)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function updateBookmarkNote(
  moduleSlug: string,
  lessonSlug: string,
  note: string
): Bookmark | null {
  const state = getBookmarksState();
  const bookmark = state.bookmarks.find(
    (b) => b.moduleSlug === moduleSlug && b.lessonSlug === lessonSlug
  );
  
  if (bookmark) {
    bookmark.note = note;
    saveState(state);
    return bookmark;
  }
  return null;
}
