"use client";

import { useCallback, useEffect, useState } from "react";
import { getStoredProgress } from "@/components/LessonProgress";
import { countModuleProgress } from "@/lib/formation-journey";
import {
  FORMATION_PROGRESS_CHANGED_EVENT,
  FORMATION_PROGRESS_STORAGE_KEY,
} from "@/constants/formation-storage";

export function ModuleRowProgress({ moduleSlug }: { moduleSlug: string }) {
  const [pct, setPct] = useState<number | null>(null);
  const [label, setLabel] = useState("");

  const refresh = useCallback(() => {
    const { done, total, pct: p } = countModuleProgress(moduleSlug, getStoredProgress());
    setPct(p);
    setLabel(`${done}/${total} leçons`);
  }, [moduleSlug]);

  useEffect(() => {
    refresh();
    const onStorage = (e: StorageEvent) => {
      if (e.key === null || e.key === FORMATION_PROGRESS_STORAGE_KEY) refresh();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener(FORMATION_PROGRESS_CHANGED_EVENT, refresh);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(FORMATION_PROGRESS_CHANGED_EVENT, refresh);
    };
  }, [refresh]);

  if (pct === null) {
    return <span className="inline-block h-4 w-24 animate-pulse rounded bg-zinc-100" aria-hidden />;
  }

  return (
    <div className="mt-3 max-w-xs">
      <div className="flex items-center justify-between gap-2 text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
        <span>Module</span>
        <span className="tabular-nums text-brand-navy">{label}</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-zinc-100 ring-1 ring-zinc-200/80">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-navy to-brand-gold transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
