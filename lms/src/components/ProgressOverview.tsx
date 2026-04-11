"use client";

import { useCallback, useEffect, useState } from "react";
import { COURSE, lessonId } from "@/data/course";
import { getStoredProgress } from "./LessonProgress";
import {
  FORMATION_PROGRESS_CHANGED_EVENT,
  FORMATION_PROGRESS_STORAGE_KEY,
} from "@/constants/formation-storage";

function computeStats() {
  const total = COURSE.reduce((acc, m) => acc + m.lessons.length, 0);
  const p = getStoredProgress();
  let done = 0;
  for (const mod of COURSE) {
    for (const l of mod.lessons) {
      if (p[lessonId(mod.slug, l.slug)]) done++;
    }
  }
  return { done, total };
}

export function ProgressOverview() {
  const [stats, setStats] = useState<{ done: number; total: number } | null>(null);

  const refresh = useCallback(() => {
    setStats(computeStats());
  }, []);

  useEffect(() => {
    refresh();
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
      <div className="mt-6 h-14 animate-pulse rounded-xl bg-zinc-100/80" aria-hidden />
    );
  }

  const pct = Math.round((stats.done / stats.total) * 100);
  const remaining = stats.total - stats.done;

  return (
    <div className="mt-8 rounded-2xl border border-brand-gold/25 bg-gradient-to-br from-white via-brand-gold-soft/50 to-white p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-brand-navy/75">
            Où vous en êtes
          </p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-brand-navy">
            {stats.done}{" "}
            <span className="text-lg font-semibold text-zinc-400">/ {stats.total}</span>
            <span className="ml-2 text-base font-medium text-zinc-600">leçons vues</span>
          </p>
        </div>
        <div className="text-right">
          <span className="text-3xl font-black tabular-nums text-brand-gold">{pct}%</span>
          <p className="text-xs text-zinc-600">
            {remaining > 0 ? (
              <>
                Encore {remaining} leçon{remaining > 1 ? "s" : ""} pour boucler les {stats.total}{" "}
                étapes — chaque clic sur « J’ai terminé » met à jour ce compteur.
              </>
            ) : (
              <>Parcours complet — temps de consolider avec les QCM et le profil.</>
            )}
          </p>
        </div>
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-zinc-200/90 shadow-inner ring-1 ring-white/60">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-navy via-brand-navy-soft to-brand-gold transition-all duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-3 text-xs leading-relaxed text-zinc-500">
        La progression est enregistrée dans votre navigateur (bouton « J&apos;ai terminé cette leçon »
        en bas de page). Changez d’ordinateur ? Reprenez manuellement là où vous étiez.
      </p>
    </div>
  );
}
