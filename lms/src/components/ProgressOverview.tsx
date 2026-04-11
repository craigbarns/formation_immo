"use client";

import { useEffect, useState } from "react";
import { COURSE, lessonId } from "@/data/course";
import { getStoredProgress } from "./LessonProgress";

export function ProgressOverview() {
  const [stats, setStats] = useState<{ done: number; total: number } | null>(null);

  useEffect(() => {
    const total = COURSE.reduce((acc, m) => acc + m.lessons.length, 0);
    const p = getStoredProgress();
    let done = 0;
    for (const mod of COURSE) {
      for (const l of mod.lessons) {
        if (p[lessonId(mod.slug, l.slug)]) done++;
      }
    }
    setStats({ done, total });
  }, []);

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
                Plus que {remaining} leçon{remaining > 1 ? "s" : ""} pour le tour complet — vous y
                êtes presque.
              </>
            ) : (
              <>Parcours terminé — félicitations.</>
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
        Utilisez « J&apos;ai terminé » en bas de chaque leçon pour mettre à jour cette progression
        (enregistré dans votre navigateur).
      </p>
    </div>
  );
}
