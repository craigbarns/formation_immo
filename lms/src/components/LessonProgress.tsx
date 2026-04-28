"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, Sparkles, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { completeLesson } from "@/lib/gamification";
import { sounds } from "@/lib/sounds";

interface ModuleInfo {
  slug: string;
  title: string;
  number: number;
  lessonKeys: string[];
  isLast: boolean;
}

const FORMATION_PROGRESS_CHANGED_EVENT = "formation-progress-changed";

function notifyProgressChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(FORMATION_PROGRESS_CHANGED_EVENT));
}

export function getStoredProgress(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem("formation-immobilier-progress");
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

export function LessonProgress({ lessonKey, moduleInfo }: { lessonKey: string; moduleInfo?: ModuleInfo }) {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // Fallback localStorage pour visiteurs non connectés
        const p = getStoredProgress();
        setDone(!!p[lessonKey]);
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from("lesson_progress")
        .select("completed")
        .eq("user_id", user.id)
        .eq("lesson_key", lessonKey)
        .single();
      setDone(!!data?.completed);
      setLoading(false);
    }
    load();
  }, [lessonKey, supabase]);

  const toggle = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const next = !done;

    if (user) {
      if (next) {
        await supabase.from("lesson_progress").upsert({
          user_id: user.id,
          lesson_key: lessonKey,
          completed: true,
          completed_at: new Date().toISOString(),
        }, { onConflict: "user_id,lesson_key" });
        completeLesson(lessonKey);
        sounds.lessonComplete();
        import("canvas-confetti").then((mod) => {
          mod.default({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.7 },
            colors: ["#d4af37", "#ffffff", "#1e3a8a", "#10b981"]
          });
        });

        // Vérifier si le module est complété → envoyer email
        if (moduleInfo) {
          const { data: rows } = await supabase
            .from("lesson_progress")
            .select("lesson_key")
            .eq("user_id", user.id)
            .eq("completed", true)
            .in("lesson_key", moduleInfo.lessonKeys);
          const completedKeys = new Set(rows?.map((r) => r.lesson_key) ?? []);
          completedKeys.add(lessonKey); // inclure la leçon qu'on vient de valider
          const moduleComplete = moduleInfo.lessonKeys.every((k) => completedKeys.has(k));
          if (moduleComplete) {
            const xp = moduleInfo.isLast ? 2500 : 500;
            fetch("/api/email/module-complete", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                moduleTitle: moduleInfo.title,
                moduleNumber: moduleInfo.number,
                xp,
                isCertification: moduleInfo.isLast,
              }),
            }).catch(() => {}); // fire-and-forget, non bloquant
          }
        }
      } else {
        await supabase
          .from("lesson_progress")
          .delete()
          .eq("user_id", user.id)
          .eq("lesson_key", lessonKey);
      }
      // Sync to localStorage for hybrid fallback
      const p = getStoredProgress();
      if (next) p[lessonKey] = true;
      else delete p[lessonKey];
      localStorage.setItem("formation-immobilier-progress", JSON.stringify(p));
    } else {
      // Fallback localStorage
      const p = getStoredProgress();
      if (next) {
        p[lessonKey] = true;
        completeLesson(lessonKey);
        sounds.lessonComplete();
        import("canvas-confetti").then((mod) => {
          mod.default({ 
            particleCount: 150, 
            spread: 70, 
            origin: { y: 0.7 }, 
            colors: ["#d4af37", "#ffffff", "#1e3a8a", "#10b981"] 
          });
        });
      } else {
        delete p[lessonKey];
      }
      localStorage.setItem("formation-immobilier-progress", JSON.stringify(p));
    }

    setDone(next);
    notifyProgressChanged();
  }, [done, lessonKey, moduleInfo, supabase]);

  if (loading) {
    return (
      <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/20">
        <Loader2 className="h-4 w-4 animate-spin" />
        Vérification...
      </div>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-pressed={done}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className={`relative group mt-8 flex w-full sm:w-auto items-center justify-center gap-3 rounded-2xl border-2 px-8 py-5 text-sm font-black uppercase tracking-widest transition-all duration-500 shadow-2xl ${
        done
          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400 shadow-emerald-500/10"
          : "border-white/10 bg-[#070d18] text-white/80 hover:border-brand-gold hover:text-white"
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.div
            key="done"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            className="relative"
          >
            <CheckCircle2 className="h-6 w-6 text-emerald-400" aria-hidden />
            <motion.div 
                animate={{ opacity: [0, 1, 0], scale: [1, 1.5, 2] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-emerald-400/20"
            />
          </motion.div>
        ) : (
          <motion.div key="undone" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            <Circle className="h-6 w-6 text-white/10 group-hover:text-brand-gold transition-colors" aria-hidden />
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="flex flex-col items-start leading-none">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
            key={done ? "done-text" : "undone-text"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            >
            {done ? "MAÎTRISE ACQUISE" : "TERMINER LA LEÇON"}
            </motion.span>
          </AnimatePresence>
          <span className={`text-[9px] mt-1 font-bold opacity-30 group-hover:opacity-60 transition-opacity`}>
              {done ? "Étape validée avec succès" : "Enregistre votre progression"}
          </span>
      </div>

      {done && (
          <Sparkles size={16} className="text-brand-gold animate-pulse" />
      )}
    </motion.button>
  );
}
