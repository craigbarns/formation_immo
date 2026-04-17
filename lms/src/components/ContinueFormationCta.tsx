"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, PartyPopper, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { getStoredProgress } from "@/components/LessonProgress";
import { findNextLesson, type NextLessonInfo } from "@/lib/formation-journey";
import {
  FORMATION_PROGRESS_CHANGED_EVENT,
  FORMATION_PROGRESS_STORAGE_KEY,
} from "@/constants/formation-storage";

export function ContinueFormationCta() {
  const supabase = createClient();
  /** undefined = chargement, null = tout vu, sinon prochaine leçon */
  const [next, setNext] = useState<NextLessonInfo | null | undefined>(undefined);

  const refresh = useCallback(() => {
    setNext(findNextLesson(getStoredProgress()));
  }, []);

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
      setNext(findNextLesson(progress));
    }
    load();
  }, [supabase]);

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

  if (next === undefined) {
    return (
      <div className="mt-6 h-[4.5rem] animate-pulse rounded-2xl bg-brand-navy/[0.06]" aria-hidden />
    );
  }

  if (!next) {
    return (
      <div className="mt-6 rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50 via-white to-teal-50/80 p-5 shadow-sm md:flex md:items-center md:justify-between md:gap-6">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
            <PartyPopper className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <p className="text-sm font-bold text-emerald-900">Parcours théorique bouclé</p>
            <p className="mt-1 text-sm text-emerald-800/90">
              Validez vos acquis avec les examens QCM, les flashcards et votre profil certifiant.
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 md:mt-0 md:shrink-0">
          <Link
            href="/formation/examen/juridique"
            className="btn-primary-solid inline-flex items-center gap-2 text-xs"
          >
            QCM
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
          <Link
            href="/formation/profil"
            className="rounded-xl border border-emerald-300/60 bg-white px-4 py-2.5 text-xs font-bold text-emerald-900 transition hover:bg-emerald-50"
          >
            Profil & badges
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-2xl border border-brand-navy/15 bg-gradient-to-br from-brand-navy/[0.07] via-white to-brand-gold-soft/40 p-5 shadow-md ring-1 ring-brand-navy/5 md:flex md:items-center md:justify-between md:gap-6">
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-navy text-white shadow-md">
          <Sparkles className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-brand-navy/80">
            Reprendre où vous en étiez
          </p>
          <p className="mt-1 font-semibold text-brand-navy">{next.lessonTitle}</p>
          <p className="mt-1 text-sm text-zinc-600">
            Étape {next.stepNumber} sur {next.totalSteps} · {next.moduleTitle.replace(/^Module (\d+) — /, "M$1 · ")}
          </p>
        </div>
      </div>
      <Link
        href={next.href}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-navy px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-navy/20 transition hover:bg-brand-navy-deep md:mt-0 md:w-auto md:shrink-0"
      >
        Continuer
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </div>
  );
}
