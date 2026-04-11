"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import {
  FORMATION_PROGRESS_CHANGED_EVENT,
  FORMATION_PROGRESS_STORAGE_KEY,
} from "@/constants/formation-storage";

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
    }
    localStorage.setItem(FORMATION_PROGRESS_STORAGE_KEY, JSON.stringify(p));
    setDone(!done);
    notifyProgressChanged();
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={done}
      className={`link-focus mt-6 inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold shadow-sm transition ${
        done
          ? "border-emerald-400/80 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-900 ring-1 ring-emerald-200/60"
          : "border-zinc-200 bg-white text-zinc-800 hover:border-brand-navy/25 hover:bg-brand-gold-soft/30"
      }`}
    >
      {done ? (
        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
      ) : (
        <Circle className="h-5 w-5 shrink-0 text-zinc-400" aria-hidden />
      )}
      {done ? "Leçon vue — bravo, passez à la suite" : "J’ai terminé cette leçon"}
    </button>
  );
}
