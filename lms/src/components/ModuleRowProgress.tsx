"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { getStoredProgress } from "@/components/LessonProgress";
import { countModuleProgress } from "@/lib/formation-journey";
import {
  FORMATION_PROGRESS_CHANGED_EVENT,
  FORMATION_PROGRESS_STORAGE_KEY,
} from "@/constants/formation-storage";

export function ModuleRowProgress({ moduleSlug }: { moduleSlug: string }) {
  const supabase = createClient();
  const [pct, setPct] = useState<number | null>(null);
  const [label, setLabel] = useState("");

  const refresh = useCallback(() => {
    const { done, total, pct: p } = countModuleProgress(moduleSlug, getStoredProgress());
    setPct(p);
    setLabel(`${done}/${total} leçons`);
  }, [moduleSlug]);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      let progress: Record<string, boolean>;
      if (!user) {
        progress = getStoredProgress();
      } else {
        const { data } = await supabase
          .from("lesson_progress")
          .select("lesson_key, completed")
          .eq("user_id", user.id);
        progress = {};
        data?.forEach((row) => {
          if (row.completed) progress[row.lesson_key] = true;
        });
      }
      const { done, total, pct: p } = countModuleProgress(moduleSlug, progress);
      setPct(p);
      setLabel(`${done}/${total} leçons`);
    }
    load();
  }, [moduleSlug, supabase]);

  useEffect(() => {
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
    return <span className="inline-block h-3 w-32 animate-pulse rounded-full bg-white/5" aria-hidden />;
  }

  return (
    <div className="mt-4 max-w-xs">
      <div className="flex items-center justify-between gap-3 mb-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-white/75">MAÎTRISE MODULE</span>
        <span className="text-[10px] font-black text-brand-gold tabular-nums uppercase tracking-widest">{label}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10 shadow-inner">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand-gold via-white to-brand-gold shadow-[0_0_10px_rgba(212,175,55,0.4)]"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        />
      </div>
    </div>
  );
}
