"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  lessonKey: string;
};

function getStorageKey(lessonKey: string) {
  return `notes-${lessonKey}`;
}

function loadNotes(lessonKey: string): string {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem(getStorageKey(lessonKey)) ?? "";
  } catch {
    return "";
  }
}

function saveNotes(lessonKey: string, value: string) {
  try {
    if (value) {
      localStorage.setItem(getStorageKey(lessonKey), value);
    } else {
      localStorage.removeItem(getStorageKey(lessonKey));
    }
  } catch {
    // localStorage may be full or unavailable
  }
}

export function LessonNotes({ lessonKey }: Props) {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [hasNotes, setHasNotes] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const stored = loadNotes(lessonKey);
    setNotes(stored);
    setHasNotes(stored.length > 0);
  }, [lessonKey]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    };
  }, []);

  const flashSaved = useCallback(() => {
    setShowSaved(true);
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    savedTimerRef.current = setTimeout(() => setShowSaved(false), 1500);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setNotes(value);
      setHasNotes(value.length > 0);
      setConfirmClear(false);

      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        saveNotes(lessonKey, value);
        flashSaved();
      }, 500);
    },
    [lessonKey, flashSaved],
  );

  const handleClear = useCallback(() => {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }
    setNotes("");
    setHasNotes(false);
    setConfirmClear(false);
    saveNotes(lessonKey, "");
    flashSaved();
  }, [confirmClear, lessonKey, flashSaved]);

  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-[#1a3a5c]/15 shadow-sm">
      {/* Header bar */}
      <button
        type="button"
        onClick={() => {
          setOpen((prev) => !prev);
          setConfirmClear(false);
        }}
        className="flex w-full items-center gap-3 bg-[#1a3a5c] px-4 py-3 text-left text-sm font-semibold text-white transition hover:bg-[#142d45]"
      >
        <span className="text-base" aria-hidden>
          📝
        </span>
        <span className="flex-1">Mes notes personnelles</span>
        {!open && hasNotes && (
          <span className="h-2.5 w-2.5 rounded-full bg-[#d4af37] shadow-sm" />
        )}
        <svg
          className={`h-4 w-4 shrink-0 text-white/70 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Collapsible content */}
      <div
        className="transition-[max-height] duration-300 ease-in-out"
        style={{ maxHeight: open ? "600px" : "0px", overflow: "hidden" }}
      >
        <div className="bg-white p-4">
          <textarea
            value={notes}
            onChange={handleChange}
            placeholder="Prenez vos notes ici... Elles sont sauvegardees automatiquement."
            className="w-full resize-y rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm leading-relaxed text-zinc-800 placeholder:text-zinc-400 focus:border-[#d4af37] focus:outline-none focus:ring-2 focus:ring-[#d4af37]/40"
            style={{ minHeight: "150px" }}
          />

          {/* Footer row */}
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {hasNotes && (
                <button
                  type="button"
                  onClick={handleClear}
                  className={`text-xs font-medium transition ${
                    confirmClear
                      ? "text-red-600 hover:text-red-700"
                      : "text-zinc-400 hover:text-zinc-600"
                  }`}
                >
                  {confirmClear
                    ? "Confirmer la suppression ?"
                    : "Effacer"}
                </button>
              )}
              {confirmClear && (
                <button
                  type="button"
                  onClick={() => setConfirmClear(false)}
                  className="text-xs font-medium text-zinc-400 hover:text-zinc-600"
                >
                  Annuler
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`text-xs font-medium text-emerald-600 transition-opacity duration-300 ${showSaved ? "opacity-100" : "opacity-0"}`}
              >
                Sauvegarde ✓
              </span>
              <span className="text-xs tabular-nums text-zinc-400">
                {notes.length} caractere{notes.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
