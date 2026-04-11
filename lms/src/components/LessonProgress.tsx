"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "formation-immobilier-progress";

export function getStoredProgress(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    setDone(!done);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`mt-6 inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition ${
        done
          ? "border-emerald-500 bg-emerald-50 text-emerald-800"
          : "border-zinc-300 bg-white text-zinc-700 hover:border-[#1a3a5c]"
      }`}
    >
      {done ? "✓ Leçon marquée comme vue" : "Marquer la leçon comme vue"}
    </button>
  );
}
