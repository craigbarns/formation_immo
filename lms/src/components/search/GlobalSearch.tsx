"use client";

import { useState, useMemo, useRef, useEffect, createContext, useContext, useCallback } from "react";
import Link from "next/link";
import { Search, X, BookOpen, FileText } from "lucide-react";
import { COURSE } from "@/data/course";

type SearchItem = {
  type: "leçon" | "module";
  title: string;
  moduleTitle: string;
  moduleSlug: string;
  lessonSlug: string;
  keywords: string;
};

const ALL_ITEMS: SearchItem[] = [
  ...COURSE.flatMap((mod) =>
    mod.lessons.map((lesson) => ({
      type: "leçon" as const,
      title: lesson.title,
      moduleTitle: mod.title,
      moduleSlug: mod.slug,
      lessonSlug: lesson.slug,
      keywords: lesson.objectives.join(" ").toLowerCase(),
    }))
  ),
  ...COURSE.map((mod) => ({
    type: "module" as const,
    title: mod.title,
    moduleTitle: mod.title,
    moduleSlug: mod.slug,
    lessonSlug: "",
    keywords: mod.summary.toLowerCase() + " " + mod.description.toLowerCase(),
  })),
];

/* ------------------------------------------------------------------ */
/*  Hook global (optionnel)                                             */
/* ------------------------------------------------------------------ */

const SearchCtx = createContext<{
  open: boolean;
  setOpen: (v: boolean) => void;
}>({ open: false, setOpen: () => {} });

export function useGlobalSearch() {
  return useContext(SearchCtx);
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
}

export function GlobalSearch({ isOpen: controlledOpen, onClose }: Props) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = useCallback((v: boolean) => {
    if (controlledOpen === undefined) setInternalOpen(v);
    if (!v) onClose?.();
  }, [controlledOpen, onClose]);

  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const results = useMemo(() => {
    if (!query.trim() || query.length < 2) return [];
    const q = query.toLowerCase();
    return ALL_ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.keywords.includes(q) ||
        item.moduleTitle.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query]);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
        title="Rechercher (Cmd+K)"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Rechercher…</span>
        <kbd className="ml-1 hidden rounded border border-white/20 px-1 text-2xs font-mono text-white/40 lg:inline">
          ⌘K
        </kbd>
      </button>
    );
  }

  return (
    <SearchCtx.Provider value={{ open, setOpen }}>
      <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 p-4 pt-[15vh] backdrop-blur-sm">
        <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface-dark)] shadow-2xl">
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
            <Search className="h-4 w-4 text-white/40" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Chercher une leçon, un concept…"
              className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/30"
            />
            <button
              onClick={() => setOpen(false)}
              className="rounded p-1 text-white/40 hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-2">
            {results.length === 0 && query.length >= 2 && (
              <p className="px-4 py-6 text-center text-sm text-white/40">Aucun résultat</p>
            )}
            {results.map((item, i) => (
              <Link
                key={i}
                href={
                  item.type === "module"
                    ? `/formation/${item.moduleSlug}`
                    : `/formation/${item.moduleSlug}/${item.lessonSlug}`
                }
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition hover:bg-white/5"
              >
                {item.type === "module" ? (
                  <BookOpen className="h-4 w-4 shrink-0 text-brand-gold" />
                ) : (
                  <FileText className="h-4 w-4 shrink-0 text-white/40" />
                )}
                <div className="min-w-0">
                  <p className="truncate font-medium text-white">{item.title}</p>
                  <p className="truncate text-2xs text-white/40">{item.moduleTitle}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="border-t border-white/10 px-4 py-2 text-2xs text-white/30">
            {results.length} résultat{results.length > 1 ? "s" : ""}
          </div>
        </div>
      </div>
    </SearchCtx.Provider>
  );
}
