"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { lessonId } from "@/data/course";
import type { ModuleShowcase } from "@/data/module-showcase";
import { getStoredProgress } from "@/components/LessonProgress";
import { ModuleLessonAudioControls } from "@/components/ModuleLessonAudioControls";
import { ModuleHeroResumeCta } from "@/components/modules/ModuleHeroResumeCta";
import { ModuleIntroPlayer } from "@/components/modules/ModuleIntroPlayer";
import { ModuleLessonStatusBadge } from "@/components/modules/ModuleLessonStatusBadge";
import { EmojiIcon } from "@/components/ui/EmojiIcon";
import { ArrowLeft, Clock, Layers, Sparkles, BookOpen, ChevronRight, UserCheck } from "lucide-react";

export type ModuleLandingProps = {
  moduleSlug: string;
  moduleTitle: string;
  moduleDescription?: string;
  moduleDurationMin?: number;
  lessons: Array<{
    slug: string;
    title: string;
    interactive: boolean;
    audioSrc: string | null;
    audioFileOk: boolean;
    duration?: number;
    difficulty?: "debutant" | "intermediaire" | "avance";
    objectives?: string[];
  }>;
  showcase: ModuleShowcase;
  avatar: {
    name: string;
    role: string;
    description: string;
    initials: string;
    accentColor: string;
  } | null;
  firstLessonHref: string;
  flashcardsHref: string;
  examenHref: string;
  prevModule: { href: string; title: string } | null;
  nextModule: { href: string; title: string } | null;
};

function formatDur(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h${m.toString().padStart(2, "0")}`;
}

export function ModuleLanding({
  moduleSlug,
  moduleTitle,
  moduleDescription,
  moduleDurationMin,
  lessons,
  showcase,
  avatar,
  firstLessonHref,
  flashcardsHref,
  examenHref,
  prevModule,
  nextModule,
}: ModuleLandingProps) {
  const accent = avatar?.accentColor ?? "#d4af37";
  const interactiveCount = lessons.filter((l) => l.interactive).length;
  const totalMin = moduleDurationMin ?? lessons.reduce((a, l) => a + (l.duration ?? 0), 0);

  const [modulePct, setModulePct] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      let p: Record<string, boolean>;
      if (!user) {
        p = getStoredProgress();
      } else {
        const { data } = await supabase
          .from("lesson_progress")
          .select("lesson_key, completed")
          .eq("user_id", user.id);
        p = {};
        data?.forEach((row) => { p[row.lesson_key] = row.completed; });
      }
      let done = 0;
      for (const l of lessons) {
        if (p[lessonId(moduleSlug, l.slug)]) done++;
      }
      setModulePct(Math.round((done / lessons.length) * 100));
    }
    load();
  }, [moduleSlug, lessons]);

  const gradientClass = useMemo(() => showcase.heroGradient, [showcase.heroGradient]);

  return (
    <div className="space-y-12 pb-16">
      <Link
        href="/formation"
        className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-brand-gold"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> TOUS LES MODULES
      </Link>

      {/* Hero */}
      <section
        className={`relative overflow-hidden rounded-[3rem] bg-gradient-to-br ${gradientClass} px-8 py-16 text-white shadow-2xl md:px-12 md:py-20 border border-white/10`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, white, transparent 50%), radial-gradient(circle at 80% 80%, ${accent}, transparent 45%)`,
          }}
          aria-hidden
        />
        <div className="relative grid gap-12 lg:grid-cols-[1fr_minmax(300px,360px)] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-4xl drop-shadow-xl animate-float-slow">{showcase.badge}</span>
              <span className="rounded-full bg-white/10 border border-white/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                MODULE {moduleTitle.match(/\d+/) ? moduleTitle.match(/\d+/)![0] : "?"} · {moduleTitle.replace(/^Module \d+ — /, "")}
              </span>
            </div>
            <h1 className="mt-8 max-w-3xl text-4xl font-black leading-[1.05] tracking-tight md:text-5xl lg:text-[3.5rem] uppercase">
              {showcase.headline}
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl italic">
              &laquo; {moduleDescription ?? showcase.subhead} &raquo;
            </p>

            <div className="mt-10">
              <ModuleHeroResumeCta
                moduleSlug={moduleSlug}
                firstLessonHref={firstLessonHref}
                examenHref={examenHref}
              />
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-10 sm:max-w-lg">
              <div className="space-y-1">
                <dt className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                  <Clock size={12} /> DURÉE
                </dt>
                <dd className="text-xl font-black tabular-nums">
                  {totalMin > 0 ? formatDur(totalMin) : showcase.durationLabel}
                </dd>
              </div>
              <div className="space-y-1">
                <dt className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                   <BookOpen size={12} /> LEÇONS
                </dt>
                <dd className="text-xl font-black tabular-nums">{lessons.length}</dd>
              </div>
              <div className="space-y-1">
                <dt className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                   <Sparkles size={12} /> INTERACTIFS
                </dt>
                <dd className="text-xl font-black tabular-nums">{interactiveCount}</dd>
              </div>
            </dl>
          </div>

          {avatar && (
            <div className="space-y-6">
              <ModuleIntroPlayer
                moduleSlug={moduleSlug}
                moduleTitle={moduleTitle}
                avatarName={avatar.name}
                avatarInitials={avatar.initials}
                accentColor={accent}
              />
              <aside className="rounded-[2rem] border border-white/10 bg-black/20 p-8 backdrop-blur-xl shadow-2xl">
                <p className="text-base leading-relaxed text-white/70 italic">&laquo; {avatar.description} &raquo;</p>
                {modulePct !== null && (
                  <div className="mt-8 space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                      <span>VOTRE AVANCEMENT</span>
                      <span className="tabular-nums text-white">{modulePct}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/5 ring-1 ring-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-brand-gold via-white to-brand-gold shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all duration-700"
                        style={{ width: `${modulePct}%` }}
                      />
                    </div>
                  </div>
                )}
              </aside>
            </div>
          )}
        </div>
      </section>

      {/* Bénéfices */}
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#070d18] p-8 md:p-12 shadow-2xl">
        <div className="relative z-10">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold mb-8">
            CE QUE VOUS EMPORTEZ
            </h2>
            <ul className="grid gap-6 sm:grid-cols-2">
            {showcase.outcomes.map((o) => (
                <li
                key={o}
                className="flex gap-4 rounded-[1.5rem] border border-white/5 bg-white/[0.02] p-6 text-base leading-relaxed text-white/70 transition-all hover:bg-white/5 hover:border-white/10 group"
                >
                <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-black text-white shadow-xl ring-1 ring-white/10 transition-transform group-hover:scale-110"
                    style={{ backgroundColor: accent }}
                >
                    <EmojiIcon emoji="✓" className="h-5 w-5" />
                </span>
                {o}
                </li>
            ))}
            </ul>
            <div className="mt-12 grid gap-6 border-t border-white/5 pt-10 sm:grid-cols-3">
            {showcase.proofLine.map((line) => (
                <p
                key={line}
                className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-white/30"
                >
                <EmojiIcon emoji="⭐" className="h-4 w-4 text-brand-gold" />
                {line}
                </p>
            ))}
            </div>
        </div>
      </section>

      {/* Actions formation */}
      <section className="grid gap-4 sm:grid-cols-3">
        <Link
          href={flashcardsHref}
          className="group flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-xs font-black uppercase tracking-widest text-white transition hover:bg-white hover:text-brand-navy hover:border-white shadow-xl"
        >
          <Layers className="w-4 h-4 text-brand-gold transition-transform group-hover:rotate-12" />
          Flashcards du module
        </Link>
        <Link
          href={examenHref}
          className="group flex items-center justify-center gap-3 rounded-2xl border border-brand-gold/30 bg-brand-gold/10 px-6 py-5 text-xs font-black uppercase tracking-widest text-brand-gold transition hover:bg-brand-gold hover:text-brand-navy shadow-xl shadow-brand-gold/10"
        >
          <UserCheck className="w-4 h-4 transition-transform group-hover:scale-110" />
          Examen QCM certifiant
        </Link>
        <Link
          href="/formation/outils"
          className="group flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[#030712] px-6 py-5 text-xs font-black uppercase tracking-widest text-white/80 transition hover:bg-white hover:text-brand-navy shadow-xl"
        >
          <ArrowLeft className="w-4 h-4 rotate-180 transition-transform group-hover:translate-x-1" />
          Outils & Simulateurs
        </Link>
      </section>

      {/* Liste des leçons */}
      <section className="scroll-mt-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-white/40 mb-3">CURRICULUM DÉTAILLÉ</h2>
            <h3 className="text-3xl font-black text-white uppercase tracking-tight">Leçons & Ateliers</h3>
          </div>
          {modulePct !== null && (
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-black uppercase tracking-widest text-brand-gold shadow-lg backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-brand-gold animate-pulse" />
              {modulePct}% MAÎTRISÉ
            </div>
          )}
        </div>

        <ol className="space-y-6">
          {lessons.map((lesson, i) => {
            const teaser = showcase.lessonTeaser[lesson.slug] ?? "";
            const durLabel = lesson.duration ? formatDur(lesson.duration) : null;
            return (
              <li key={lesson.slug}>
                <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#070d18] shadow-2xl transition-all duration-500 hover:border-brand-gold/20">
                  <div className="flex flex-col md:flex-row md:items-stretch">
                    <Link
                        href={`/formation/${moduleSlug}/${lesson.slug}`}
                        className="flex-1 p-6 md:p-8 flex gap-6"
                    >
                        <ModuleLessonStatusBadge
                        moduleSlug={moduleSlug}
                        lessonSlug={lesson.slug}
                        index={i + 1}
                        accentColor={accent}
                        />
                        <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="text-xl font-black text-white uppercase tracking-tight group-hover:text-brand-gold transition-colors">
                            {lesson.title}
                            </span>
                            {lesson.interactive && (
                            <span className="rounded-md bg-brand-gold/20 border border-brand-gold/30 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-brand-gold">
                                Interactif
                            </span>
                            )}
                            {lesson.difficulty === "avance" && (
                            <span className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-white/40">
                                Avancé
                            </span>
                            )}
                            {durLabel && (
                            <span className="inline-flex items-center gap-2 rounded-full bg-black/20 border border-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white/40">
                                <Clock className="h-3 w-3" />
                                {durLabel}
                            </span>
                            )}
                        </div>
                        {teaser && (
                            <p className="mt-4 text-base leading-relaxed text-white/50 italic">&laquo; {teaser} &raquo;</p>
                        )}
                        {lesson.objectives && lesson.objectives.length > 0 && (
                            <ul className="mt-6 space-y-2">
                            {lesson.objectives.slice(0, 2).map((obj, j) => (
                                <li key={j} className="flex items-start gap-2.5 text-xs font-bold text-white/30">
                                <EmojiIcon emoji="✓" className="mt-0.5 h-3.5 w-3.5 text-brand-gold/40" />
                                {obj}
                                </li>
                            ))}
                            </ul>
                        )}
                        </div>
                    </Link>

                    {lesson.audioSrc ? (
                        <div className="flex shrink-0 flex-col justify-center bg-black/20 border-t border-white/5 p-6 md:w-80 md:border-l md:border-t-0 md:p-8">
                            <span className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
                                APERÇU AUDIO
                            </span>
                            <ModuleLessonAudioControls url={lesson.audioSrc} title={lesson.title} />
                            {!lesson.audioFileOk && (
                                <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-amber-500/60 flex items-center gap-2">
                                    <Sparkles className="w-3 h-3" /> Production en cours
                                </p>
                            )}
                            <Link href={`/formation/${moduleSlug}/${lesson.slug}`} className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                                Ouvrir la fiche <ChevronRight size={14} />
                            </Link>
                        </div>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Navigation inter-modules */}
      <nav
        className="grid gap-6 border-t border-white/10 pt-16 sm:grid-cols-2"
        aria-label="Modules précédent et suivant"
      >
        {prevModule ? (
          <Link
            href={prevModule.href}
            className="group rounded-[2.5rem] border border-white/10 bg-[#070d18] p-8 shadow-2xl transition-all duration-500 hover:border-brand-gold/30 hover:-translate-x-1"
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-white/20">
              Module précédent
            </p>
            <p className="mt-3 text-lg font-black text-white uppercase tracking-tight group-hover:text-brand-gold transition-colors">{prevModule.title}</p>
          </Link>
        ) : (
          <div />
        )}
        {nextModule ? (
          <Link
            href={nextModule.href}
            className="group rounded-[2.5rem] border border-white/10 bg-[#070d18] p-8 shadow-2xl transition-all duration-500 hover:border-brand-gold/30 hover:translate-x-1 text-right"
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-white/20">
              Module suivant
            </p>
            <p className="mt-3 text-lg font-black text-white uppercase tracking-tight group-hover:text-brand-gold transition-colors">{nextModule.title} <ArrowLeft className="inline-block w-4 h-4 ml-2 rotate-180 transition-transform group-hover:translate-x-1" /></p>
          </Link>
        ) : (
          <Link
            href="/formation/profil"
            className="group rounded-[2.5rem] border border-emerald-500/20 bg-emerald-500/5 p-8 shadow-2xl transition-all duration-500 hover:border-emerald-500/40 text-center"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 mx-auto mb-4 border border-emerald-500/20 shadow-xl group-hover:scale-110 transition-transform">
                <Sparkles size={24} />
            </div>
            <p className="text-sm font-black text-white uppercase tracking-widest">Parcours complété</p>
            <p className="mt-1 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Obtenez votre certificat &rarr;</p>
          </Link>
        )}
      </nav>
    </div>
  );
}
