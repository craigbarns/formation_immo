"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FORMATION_MODULES, lessonId } from "@/data/course";
import { getStoredProgress } from "./LessonProgress";
import { AnimatedCounter } from "@/components/animations";
import {
  FORMATION_PROGRESS_CHANGED_EVENT,
  FORMATION_PROGRESS_STORAGE_KEY,
} from "@/constants/formation-storage";
import { createClient } from "@/lib/supabase/client";

function computeStatsFromProgress(progress: Record<string, boolean>) {
  const total = FORMATION_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
  let done = 0;
  for (const mod of FORMATION_MODULES) {
    for (const l of mod.lessons) {
      if (progress[lessonId(mod.slug, l.slug)]) done++;
    }
  }
  return { done, total };
}

export function ProgressOverview() {
  const [stats, setStats] = useState<{ done: number; total: number } | null>(null);

  const refresh = useCallback(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from("lesson_progress")
          .select("lesson_key, completed")
          .eq("user_id", user.id);

        const progress: Record<string, boolean> = {};
        data?.forEach((row) => { progress[row.lesson_key] = row.completed; });
        setStats(computeStatsFromProgress(progress));
      } else {
        setStats(computeStatsFromProgress(getStoredProgress()));
      }
    }
    load();
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === null || e.key === FORMATION_PROGRESS_STORAGE_KEY) refresh();
    };
    const onCustom = () => refresh();
    window.addEventListener("storage", onStorage);
    window.addEventListener(FORMATION_PROGRESS_CHANGED_EVENT, onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(FORMATION_PROGRESS_CHANGED_EVENT, onCustom);
    };
  }, [refresh]);

  if (!stats) {
    return (
      <div className="mt-8 h-24 animate-pulse rounded-3xl bg-white/5 border border-white/10" aria-hidden />
    );
  }

  const pct = Math.round((stats.done / stats.total) * 100);
  const remaining = stats.total - stats.done;

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-brand-gold/20 group">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/[0.03] to-transparent pointer-events-none" />
      <div className="relative z-10 flex flex-wrap items-end justify-between gap-6">
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/75 group-hover:text-brand-gold/60 transition-colors">
            VOTRE AVANCEMENT
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black tabular-nums text-white tracking-tighter">
              <AnimatedCounter value={stats.done} duration={1.5} />
            </span>
            <span className="text-xl font-bold text-white/75">/ {stats.total}</span>
            <span className="ml-2 text-xs font-black uppercase tracking-widest text-white/75">leçons maîtrisées</span>
          </div>
        </div>
        <div className="text-right space-y-1">
          <div className="flex items-center justify-end gap-3">
            <span className="text-xs font-black uppercase tracking-widest text-white/75">COMPLÉTÉ</span>
            <AnimatedCounter value={pct} suffix="%" duration={2} className="text-5xl font-black tabular-nums text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-brand-gold drop-shadow-lg" />
          </div>
        </div>
      </div>
      
      <div className="relative mt-8 h-3.5 overflow-hidden rounded-full bg-white/5 shadow-inner ring-1 ring-white/10">
        <motion.div
          className="relative h-full rounded-full bg-gradient-to-r from-brand-gold via-white to-brand-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] animate-shimmer" />
        </motion.div>
      </div>

      <div className="mt-6 flex items-start gap-3">
        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-gold/40 animate-pulse" />
        <p className="text-xs leading-relaxed text-white/75 font-medium italic">
          {remaining > 0 ? (
            <>
              Encore {remaining} étape{remaining > 1 ? "s" : ""} stratégique{remaining > 1 ? "s" : ""} pour valider l&apos;intégralité du cursus. Chaque validation renforce votre expertise terrain.
            </>
          ) : (
            <>Parcours complet — Excellence atteinte. Passez maintenant à la certification finale pour sceller votre statut d&apos;Expert.</>
          )}
        </p>
      </div>
    </div>
  );
}
