"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, FileText, Bookmark, StickyNote, Command, ArrowRight } from "lucide-react";
import { COURSE, Lesson, CourseModule } from "@/data/course";
import { getAllBookmarks } from "@/lib/user-content";
import { searchNotes } from "@/lib/user-content";
import { useRouter } from "next/navigation";

interface SearchResult {
  id: string;
  type: "lesson" | "bookmark" | "note";
  title: string;
  subtitle: string;
  href: string;
  icon: React.ReactNode;
  moduleSlug?: string;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  // Build search index
  const searchIndex = useMemo(() => {
    const index: SearchResult[] = [];

    // Add all lessons
    COURSE.forEach((module) => {
      module.lessons.forEach((lesson) => {
        index.push({
          id: `lesson-${lesson.slug}`,
          type: "lesson",
          title: lesson.title,
          subtitle: module.title,
          href: `/formation/${module.slug}/${lesson.slug}`,
          icon: <FileText className="w-4 h-4" />,
          moduleSlug: module.slug,
        });
      });
    });

    // Add bookmarks
    const bookmarks = getAllBookmarks();
    bookmarks.forEach((bookmark) => {
      index.push({
        id: `bookmark-${bookmark.id}`,
        type: "bookmark",
        title: bookmark.lessonTitle,
        subtitle: `${bookmark.moduleTitle} — Favori`,
        href: `/formation/${bookmark.moduleSlug}/${bookmark.lessonSlug}`,
        icon: <Bookmark className="w-4 h-4 text-brand-gold" />,
        moduleSlug: bookmark.moduleSlug,
      });
    });

    return index;
  }, []);

  // Compute results
  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim()) {
      const bookmarks = getAllBookmarks().slice(0, 3);
      return bookmarks.map((b) => ({
        id: `recent-${b.id}`,
        type: "bookmark",
        title: b.lessonTitle,
        subtitle: "Favori récent",
        href: `/formation/${b.moduleSlug}/${b.lessonSlug}`,
        icon: <Bookmark className="w-4 h-4 text-brand-gold" />,
      }));
    }

    const lowerQuery = query.toLowerCase();
    const filtered = searchIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.subtitle.toLowerCase().includes(lowerQuery)
    );

    const notes = searchNotes(query);
    const noteResults: SearchResult[] = notes.slice(0, 3).map((note) => ({
      id: `note-${note.id}`,
      type: "note",
      title: `Note: ${note.content.slice(0, 40)}...`,
      subtitle: "Ma note personnelle",
      href: `/formation/${note.moduleSlug}/${note.lessonSlug}`,
      icon: <StickyNote className="w-4 h-4 text-blue-500" />,
      moduleSlug: note.moduleSlug,
    }));

    return [...filtered.slice(0, 6), ...noteResults];
  }, [query, searchIndex]);

  const clampedSelectedIndex = results.length > 0 ? Math.max(0, Math.min(selectedIndex, results.length - 1)) : 0;

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % results.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
          break;
        case "Enter":
          e.preventDefault();
          if (results[clampedSelectedIndex]) {
            router.push(results[clampedSelectedIndex].href);
            onClose();
          }
          break;
        case "Escape":
          onClose();
          break;
      }
    },
    [isOpen, results, clampedSelectedIndex, router, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        setQuery("");
        setSelectedIndex(0);
      });
    }
  }, [isOpen]);

  // Cmd+K shortcut
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (!isOpen) {
          // Open search - parent should handle this
        }
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-[20vh]"
      >
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Search input */}
          <div className="flex items-center gap-4 px-6 py-4 border-b border-gray-100">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Rechercher une leçon, un favori, une note..."
              className="flex-1 text-lg outline-none placeholder:text-gray-400"
              autoFocus
            />
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 text-xs font-mono bg-gray-100 rounded">ESC</kbd>
              <button
                onClick={onClose}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {results.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <p>Aucun résultat pour "{query}"</p>
              </div>
            ) : (
              <div className="p-2">
                {!query && (
                  <div className="px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Favoris récents
                  </div>
                )}
                {results.map((result, index) => (
                  <motion.button
                    key={result.id}
                    onClick={() => {
                      router.push(result.href);
                      onClose();
                    }}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-colors ${
                      index === clampedSelectedIndex
                        ? "bg-brand-navy text-white"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        index === clampedSelectedIndex ? "bg-white/20" : "bg-gray-100"
                      }`}
                    >
                      {result.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{result.title}</p>
                      <p
                        className={`text-sm truncate ${
                          index === clampedSelectedIndex ? "text-white/70" : "text-gray-500"
                        }`}
                      >
                        {result.subtitle}
                      </p>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 ${
                        index === clampedSelectedIndex ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-3 bg-gray-50 text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border rounded">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-white border rounded">↓</kbd>
                <span>naviguer</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white border rounded">↵</kbd>
                <span>ouvrir</span>
              </span>
            </div>
            <span>{results.length} résultat(s)</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Hook to use global search
export function useGlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return { isOpen, setIsOpen };
}
