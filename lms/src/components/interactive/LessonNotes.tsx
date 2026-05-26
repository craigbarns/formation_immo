"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { PenLine, ChevronDown, Trash2, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="mt-12 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#070d18] shadow-2xl transition-all duration-500 hover:border-brand-gold/20">
      {/* Header bar */}
      <button
        type="button"
        onClick={() => {
          setOpen((prev) => !prev);
          setConfirmClear(false);
        }}
        className={`flex w-full items-center justify-between px-6 py-5 text-left transition-all duration-300 ${
            open ? "bg-[#030712] border-b border-white/5" : "hover:bg-white/[0.02]"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${
              open ? "bg-brand-gold border-brand-gold text-brand-navy" : "bg-white/5 border-white/10 text-white/75"
          }`}>
            <PenLine className="h-4 w-4" />
          </div>
          <span className="text-sm font-black uppercase tracking-widest text-white">Journal d&apos;apprentissage</span>
          {!open && hasNotes && (
             <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="h-1.5 w-1.5 rounded-full bg-brand-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
          )}
        </div>
        <ChevronDown className={`w-4 h-4 text-white/75 transition-transform duration-500 ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Collapsible content */}
      <AnimatePresence>
        {open && (
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
            >
                <div className="p-6 md:p-8 space-y-6">
                    <textarea
                        value={notes}
                        onChange={handleChange}
                        placeholder="Consignez ici vos réflexions stratégiques, points d'attention ou questions pour votre coach... Sauvegarde automatique active."
                        className="w-full resize-y rounded-2xl border border-white/10 bg-black/40 px-6 py-5 text-base leading-relaxed text-white font-medium placeholder:text-white/70 focus:border-brand-gold/50 focus:outline-none focus:ring-4 focus:ring-brand-gold/10 transition-all shadow-inner"
                        style={{ minHeight: "200px" }}
                    />

                    {/* Footer row */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <AnimatePresence mode="wait">
                                {hasNotes && !confirmClear && (
                                    <motion.button
                                        key="clear"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        type="button"
                                        onClick={handleClear}
                                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/75 hover:text-red-400 transition-colors"
                                    >
                                        <Trash2 size={12} /> EFFACER
                                    </motion.button>
                                )}
                                {confirmClear && (
                                    <motion.div 
                                        key="confirm"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-center gap-4"
                                    >
                                        <button
                                            type="button"
                                            onClick={handleClear}
                                            className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-400"
                                        >
                                            CONFIRMER ?
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setConfirmClear(false)}
                                            className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-white/75 hover:text-white"
                                        >
                                            <X size={10} /> ANNULER
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="flex items-center gap-6">
                            <AnimatePresence>
                                {showSaved && (
                                    <motion.div 
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-400"
                                    >
                                        <Sparkles size={12} /> SYNCHRONISÉ
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/75 tabular-nums">
                                {notes.length} CARACTÈRES
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
