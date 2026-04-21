"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, PartyPopper, Sparkles, Play, Award } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { getStoredProgress } from "@/components/LessonProgress";
import { findNextLesson, type NextLessonInfo } from "@/lib/formation-journey";
import {
  FORMATION_PROGRESS_CHANGED_EVENT,
  FORMATION_PROGRESS_STORAGE_KEY,
} from "@/constants/formation-storage";
import { motion } from "framer-motion";

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
      <div className="mt-8 h-24 animate-pulse rounded-[2rem] bg-white/5 border border-white/10" aria-hidden />
    );
  }

  if (!next) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 rounded-[2rem] border border-emerald-500/20 bg-emerald-500/5 p-6 md:p-8 shadow-2xl backdrop-blur-xl md:flex md:items-center md:justify-between md:gap-8"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-xl">
            <PartyPopper className="h-7 w-7" aria-hidden />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-1">PARCOURS THÉORIQUE BOUCLÉ</p>
            <h3 className="text-xl font-black text-white uppercase tracking-tight">Félicitations, Expert !</h3>
            <p className="mt-2 text-base text-white/50 font-medium italic leading-relaxed">
              Vous avez visionné l&apos;intégralité du cursus. Il est temps de valider vos acquis avec les examens certifiants.
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3 md:mt-0 md:shrink-0">
          <Link
            href="/formation/examen/juridique"
            className="group inline-flex items-center gap-3 rounded-xl bg-emerald-500 px-8 py-4 text-xs font-black uppercase tracking-widest text-brand-navy shadow-xl shadow-emerald-500/20 transition hover:bg-white hover:scale-105"
          >
            EXAMEN FINAL
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/formation/profil"
            className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-xs font-black uppercase tracking-widest text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            PROFIL & CERTIFICAT
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 rounded-[2rem] border border-brand-gold/30 bg-[#030712]/50 p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl md:flex md:items-center md:justify-between md:gap-8"
    >
      <div className="flex items-start gap-4">
        <div className="relative group">
            <div className="absolute inset-0 rounded-2xl bg-brand-gold/20 blur-xl animate-pulse" />
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-gold/10 border border-brand-gold/20 text-brand-gold shadow-2xl transition-transform group-hover:scale-110">
                <Play className="h-7 w-7 fill-brand-gold/20 ml-1" aria-hidden />
            </div>
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold mb-1 flex items-center gap-2">
            <Sparkles size={10} className="animate-pulse" /> REPRENDRE LE PARCOURS
          </p>
          <h3 className="text-xl font-black text-white uppercase tracking-tight leading-tight">{next.lessonTitle}</h3>
          <p className="mt-2 text-sm font-bold text-white/40 uppercase tracking-widest">
            Étape {next.stepNumber} sur {next.totalSteps} · <span className="text-brand-gold/60">{next.moduleTitle.replace(/^Module (\d+) — /, "M$1 ")}</span>
          </p>
        </div>
      </div>
      <Link
        href={next.href}
        className="group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-brand-gold px-10 py-5 text-sm font-black uppercase tracking-[0.2em] text-brand-navy shadow-[0_15px_40px_rgba(212,175,55,0.25)] transition hover:bg-white hover:scale-105 active:scale-95 md:mt-0 md:w-auto md:shrink-0"
      >
        REPRENDRE
        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      </Link>
    </motion.div>
  );
}
