"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";
import {
  FORMATION_PROGRESS_CHANGED_EVENT,
  FORMATION_PROGRESS_STORAGE_KEY,
} from "@/constants/formation-storage";
import { addXP, XP_REWARDS } from "@/lib/gamification";
import { sounds } from "@/lib/sounds";

export function getStoredProgress(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(FORMATION_PROGRESS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

function notifyProgressChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(FORMATION_PROGRESS_CHANGED_EVENT));
}

export function LessonProgress({ lessonKey }: { lessonKey: string }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const p = getStoredProgress();
    setDone(!!p[lessonKey]);
  }, [lessonKey]);

  function toggle() {
    const p = getStoredProgress();
    if (p[lessonKey]) {
      delete p[lessonKey];
    } else {
      p[lessonKey] = true;
      // Award XP and play completion sound on first completion
      addXP(XP_REWARDS.LESSON_COMPLETE, `Leçon terminée: ${lessonKey}`);
      sounds.lessonComplete();
      // Confetti burst
      import("canvas-confetti").then((mod) => {
        mod.default({ particleCount: 100, spread: 60, origin: { y: 0.7 }, colors: ["#d4af37", "#1a3a5c", "#22c55e"] });
      });
    }
    localStorage.setItem(FORMATION_PROGRESS_STORAGE_KEY, JSON.stringify(p));
    setDone(!done);
    notifyProgressChanged();
  }

  return (
    <motion.button
      type="button"
      onClick={toggle}
      aria-pressed={done}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.01 }}
      className={`link-focus mt-6 inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold shadow-sm transition ${
        done
          ? "border-emerald-400/80 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-900 ring-1 ring-emerald-200/60"
          : "border-zinc-200 bg-white text-zinc-800 hover:border-brand-navy/25 hover:bg-brand-gold-soft/30"
      }`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.span
            key="done"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
          </motion.span>
        ) : (
          <motion.span key="undone" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
            <Circle className="h-5 w-5 shrink-0 text-zinc-400" aria-hidden />
          </motion.span>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={done ? "done-text" : "undone-text"}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
        >
          {done ? "Leçon vue — bravo, passez à la suite" : "J’ai terminé cette leçon"}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
