"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Props = {
  lessonKey: string;
};

function getStorageKey(lessonKey: string) {
  return `notes-${lessonKey}`;
}

function parseLessonKey(lessonKey: string) {
  const [moduleSlug, lessonSlug] = lessonKey.split("/");
  return { moduleSlug, lessonSlug };
}

function loadLocalNotes(lessonKey: string): string {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem(getStorageKey(lessonKey)) ?? "";
  } catch {
    return "";
  }
}

function saveLocalNotes(lessonKey: string, value: string) {
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
  const noteIdRef = useRef<string | null>(null);
  const supabaseRef = useRef(createClient());

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const { moduleSlug, lessonSlug } = parseLessonKey(lessonKey);
      const supabase = supabaseRef.current;
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from("notes")
          .select("id, content")
          .eq("module_slug", moduleSlug)
          .eq("lesson_slug", lessonSlug)
          .order("created_at", { ascending: true })
          .limit(1);

        const row = data?.[0];
        const content = row?.content ?? "";
        noteIdRef.current = row?.id ?? null;

        if (!cancelled) {
          requestAnimationFrame(() => {
            setNotes(content);
            setHasNotes(content.length > 0);
          });
          saveLocalNotes(lessonKey, content);
        }
      } else {
        const stored = loadLocalNotes(lessonKey);
        if (!cancelled) {
          requestAnimationFrame(() => {
            setNotes(stored);
            setHasNotes(stored.length > 0);
          });
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
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

  const saveToSupabase = useCallback(async (value: string) => {
    const { moduleSlug, lessonSlug } = parseLessonKey(lessonKey);
    const supabase = supabaseRef.current;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    if (value) {
      if (noteIdRef.current) {
        await supabase
          .from("notes")
          .update({ content: value, updated_at: new Date().toISOString() })
          .eq("id", noteIdRef.current)
          .eq("user_id", user.id);
      } else {
        const { data } = await supabase
          .from("notes")
          .insert({
            user_id: user.id,
            module_slug: moduleSlug,
            lesson_slug: lessonSlug,
            content: value,
            color: "yellow",
          })
          .select("id")
          .single();
        if (data) {
          noteIdRef.current = data.id;
        }
      }
    } else {
      if (noteIdRef.current) {
        await supabase
          .from("notes")
          .delete()
          .eq("id", noteIdRef.current)
          .eq("user_id", user.id);
        noteIdRef.current = null;
      }
    }
  }, [lessonKey]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const value = e.target.value;
      setNotes(value);
      setHasNotes(value.length > 0);
      setConfirmClear(false);

      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        saveLocalNotes(lessonKey, value);
        saveToSupabase(value).catch(() => {});
        flashSaved();
      }, 500);
    },
    [lessonKey, flashSaved, saveToSupabase],
  );

  const handleClear = useCallback(() => {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }
    setNotes("");
    setHasNotes(false);
    setConfirmClear(false);
    saveLocalNotes(lessonKey, "");
    saveToSupabase("").catch(() => {});
    flashSaved();
  }, [confirmClear, lessonKey, flashSaved, saveToSupabase]);

  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-brand-navy/15 shadow-sm">
      {/* Header bar */}
      <button
        type="button"
        onClick={() => {
          setOpen((prev) => !prev);
          setConfirmClear(false);
        }}
        className="flex w-full items-center gap-3 bg-brand-navy px-4 py-3 text-left text-sm font-semibold text-white transition hover:bg-brand-navy-deep"
      >
        <span className="text-base" aria-hidden>
          📝
        </span>
        <span className="flex-1">Mes notes personnelles</span>
        {!open && hasNotes && (
          <span className="h-2.5 w-2.5 rounded-full bg-brand-gold shadow-sm" />
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
            className="w-full resize-y rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-3 text-sm leading-relaxed text-zinc-800 placeholder:text-zinc-400 focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/40"
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
