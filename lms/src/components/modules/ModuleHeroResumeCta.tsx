"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getStoredProgress } from "@/components/LessonProgress";
import { findResumeInModule } from "@/lib/formation-journey";
import {
  FORMATION_PROGRESS_CHANGED_EVENT,
  FORMATION_PROGRESS_STORAGE_KEY,
} from "@/constants/formation-storage";

type Props = {
  moduleSlug: string;
  firstLessonHref: string;
  examenHref: string;
};

export function ModuleHeroResumeCta({ moduleSlug, firstLessonHref, examenHref }: Props) {
  const [resume, setResume] = useState<{ href: string; lessonTitle: string; lessonSlug: string } | null | undefined>(undefined);

  const refresh = useCallback(async () => {
    const supabase = createClient();
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
      data?.forEach((row) => { progress[row.lesson_key] = row.completed; });
    }
    setResume(findResumeInModule(moduleSlug, progress));
  }, [moduleSlug]);

  useEffect(() => {
    refresh();
  }, [refresh]);

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

  if (resume === undefined) {
    return (
      <div className="inline-flex h-[46px] min-w-[200px] animate-pulse rounded-xl bg-white/20" aria-hidden />
    );
  }

  if (resume === null) {
    return (
      <div className="flex flex-wrap gap-3">
        <Link
          href={examenHref}
          className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#0f172a] shadow-lg transition hover:bg-white/95 hover:shadow-xl"
        >
          Module terminé — QCM
        </Link>
        <Link
          href={firstLessonHref}
          className="inline-flex items-center justify-center rounded-xl border border-white/35 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
        >
          Revoir la 1ʳᵉ leçon
        </Link>
        <Link
          href="/formation/supports-visuels"
          className="inline-flex items-center justify-center rounded-xl border border-white/35 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
        >
          Fiches & infographies
        </Link>
      </div>
    );
  }

  const isFirst = resume.href === firstLessonHref;

  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href={resume.href}
        className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#0f172a] shadow-lg transition hover:bg-white/95 hover:shadow-xl"
      >
        {isFirst ? "Commencer ce module" : "Continuer la leçon"}
      </Link>
      {!isFirst ? (
        <p className="w-full text-xs font-medium text-white/80 sm:w-auto sm:self-center">
          Prochaine : <span className="text-white">{resume.lessonTitle}</span>
        </p>
      ) : null}
      <Link
        href="/formation/supports-visuels"
        className="inline-flex items-center justify-center rounded-xl border border-white/35 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
      >
        Fiches & infographies
      </Link>
    </div>
  );
}
