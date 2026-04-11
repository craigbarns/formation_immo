"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { lessonId } from "@/data/course";
import type { ModuleShowcase } from "@/data/module-showcase";
import { getStoredProgress } from "@/components/LessonProgress";
import { ModuleLessonAudioControls } from "@/components/ModuleLessonAudioControls";
import { ModuleHeroResumeCta } from "@/components/modules/ModuleHeroResumeCta";
import { ModuleLessonStatusBadge } from "@/components/modules/ModuleLessonStatusBadge";

export type ModuleLandingProps = {
  moduleSlug: string;
  moduleTitle: string;
  lessons: Array<{
    slug: string;
    title: string;
    interactive: boolean;
    audioSrc: string | null;
    audioFileOk: boolean;
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

export function ModuleLanding({
  moduleSlug,
  moduleTitle,
  lessons,
  showcase,
  avatar,
  firstLessonHref,
  flashcardsHref,
  examenHref,
  prevModule,
  nextModule,
}: ModuleLandingProps) {
  const accent = avatar?.accentColor ?? "#1a3a5c";
  const interactiveCount = lessons.filter((l) => l.interactive).length;

  const [modulePct, setModulePct] = useState<number | null>(null);

  useEffect(() => {
    const p = getStoredProgress();
    let done = 0;
    for (const l of lessons) {
      if (p[lessonId(moduleSlug, l.slug)]) done++;
    }
    setModulePct(Math.round((done / lessons.length) * 100));
  }, [lessons, moduleSlug]);

  const gradientClass = useMemo(() => showcase.heroGradient, [showcase.heroGradient]);

  return (
    <div className="space-y-12 pb-8">
      <Link
        href="/formation"
        className="breadcrumb-pill link-focus inline-flex w-fit items-center gap-2"
      >
        <span aria-hidden>←</span> Tous les modules
      </Link>

      {/* Hero */}
      <section
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradientClass} px-6 py-10 text-white shadow-2xl md:px-10 md:py-12`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, white, transparent 45%), radial-gradient(circle at 80% 80%, ${accent}, transparent 40%)`,
          }}
          aria-hidden
        />
        <div className="relative grid gap-10 lg:grid-cols-[1fr_minmax(260px,320px)] lg:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-3xl drop-shadow-sm">{showcase.badge}</span>
              <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm">
                {moduleTitle.replace(/^Module \d+ — /, "")}
              </span>
            </div>
            <h1 className="mt-5 max-w-3xl text-3xl font-bold leading-[1.15] tracking-tight md:text-4xl lg:text-[2.35rem]">
              {showcase.headline}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
              {showcase.subhead}
            </p>

            <div className="mt-8">
              <ModuleHeroResumeCta
                moduleSlug={moduleSlug}
                firstLessonHref={firstLessonHref}
                examenHref={examenHref}
              />
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-white/20 pt-8 text-center sm:max-w-lg sm:text-left">
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-wider text-white/55">
                  Durée
                </dt>
                <dd className="mt-1 text-lg font-bold tabular-nums">{showcase.durationLabel}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-wider text-white/55">
                  Leçons
                </dt>
                <dd className="mt-1 text-lg font-bold tabular-nums">{lessons.length}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-wider text-white/55">
                  Interactifs
                </dt>
                <dd className="mt-1 text-lg font-bold tabular-nums">{interactiveCount}</dd>
              </div>
            </dl>
          </div>

          {avatar && (
            <aside className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
              <div className="flex items-start gap-4">
                <div
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-lg"
                  style={{ backgroundColor: accent }}
                >
                  {avatar.initials}
                </div>
                <div>
                  <p className="text-lg font-bold leading-tight">{avatar.name}</p>
                  <p className="mt-1 text-sm font-medium text-[#d4af37]">{avatar.role}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/85">{avatar.description}</p>
              {modulePct !== null && (
                <div className="mt-5 rounded-xl bg-black/20 p-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-white/80">
                    <span>Votre avancement</span>
                    <span className="tabular-nums text-white">{modulePct}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/20">
                    <div
                      className="h-full rounded-full bg-[#d4af37] transition-all duration-500"
                      style={{ width: `${modulePct}%` }}
                    />
                  </div>
                </div>
              )}
            </aside>
          )}
        </div>
      </section>

      {/* Bénéfices */}
      <section className="card-elevated rounded-3xl border border-zinc-200/80 p-6 md:p-8">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#1a3a5c]">
          Ce que vous emportez
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {showcase.outcomes.map((o) => (
            <li
              key={o}
              className="flex gap-3 rounded-2xl border border-zinc-100 bg-zinc-50/80 p-4 text-sm leading-snug text-zinc-800"
            >
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white shadow-sm"
                style={{ backgroundColor: accent }}
              >
                ✓
              </span>
              {o}
            </li>
          ))}
        </ul>
        <div className="mt-8 grid gap-3 border-t border-zinc-100 pt-8 sm:grid-cols-3">
          {showcase.proofLine.map((line) => (
            <p
              key={line}
              className="text-center text-xs font-medium leading-relaxed text-zinc-600 sm:text-left"
            >
              <span className="mr-1 text-[#d4af37]" aria-hidden>
                ★
              </span>
              {line}
            </p>
          ))}
        </div>
      </section>

      {/* Actions formation */}
      <section className="flex flex-wrap gap-3">
        <Link
          href={flashcardsHref}
          className="rounded-xl border-2 border-[#1a3a5c]/20 bg-[#1a3a5c]/5 px-5 py-3 text-sm font-bold text-[#1a3a5c] transition hover:bg-[#1a3a5c]/10"
        >
          Flashcards du module
        </Link>
        <Link
          href={examenHref}
          className="rounded-xl border-2 border-amber-300/60 bg-amber-50 px-5 py-3 text-sm font-bold text-amber-950 transition hover:bg-amber-100"
        >
          Examen QCM
        </Link>
        <Link
          href="/formation/outils"
          className="rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-zinc-300"
        >
          Simulateurs (crédit & rentabilité)
        </Link>
      </section>

      {/* Liste des leçons */}
      <section>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#1a3a5c]">Programme détaillé</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Cliquez pour ouvrir la leçon — audio disponible sur chaque fiche.
            </p>
          </div>
        </div>

        <ol className="space-y-4">
          {lessons.map((lesson, i) => {
            const teaser = showcase.lessonTeaser[lesson.slug] ?? "";
            return (
              <li key={lesson.slug}>
                <div className="group card-elevated flex flex-col gap-4 rounded-2xl border border-zinc-200/90 p-5 transition hover:border-zinc-300 md:flex-row md:items-stretch md:justify-between">
                  <Link
                    href={`/formation/${moduleSlug}/${lesson.slug}`}
                    className="flex min-w-0 flex-1 gap-4"
                  >
                    <ModuleLessonStatusBadge
                      moduleSlug={moduleSlug}
                      lessonSlug={lesson.slug}
                      index={i + 1}
                      accentColor={accent}
                    />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-zinc-900 group-hover:text-[#1a3a5c]">
                          {lesson.title}
                        </span>
                        {lesson.interactive && (
                          <span className="rounded-md bg-[#1a3a5c]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#1a3a5c]">
                            Interactif
                          </span>
                        )}
                      </div>
                      {teaser && (
                        <p className="mt-2 text-sm leading-relaxed text-zinc-600">{teaser}</p>
                      )}
                      <p className="mt-2 text-[11px] tabular-nums text-zinc-400">
                        {lessonId(moduleSlug, lesson.slug)}
                      </p>
                    </div>
                  </Link>

                  {lesson.audioSrc ? (
                    <div className="flex shrink-0 flex-col justify-center border-t border-zinc-100 pt-4 md:w-72 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                      <span className="mb-2 text-[10px] font-bold uppercase tracking-wide text-zinc-400">
                        Aperçu audio
                      </span>
                      <ModuleLessonAudioControls url={lesson.audioSrc} title={lesson.title} />
                      {!lesson.audioFileOk ? (
                        <p className="mt-2 text-[10px] leading-snug text-amber-800">
                          Fichier MP3 absent — voir la leçon pour le script complet.
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Navigation inter-modules */}
      <nav
        className="grid gap-4 border-t border-zinc-200 pt-10 sm:grid-cols-2"
        aria-label="Modules précédent et suivant"
      >
        {prevModule ? (
          <Link
            href={prevModule.href}
            className="card-elevated rounded-2xl border border-zinc-200 p-5 transition hover:border-[#1a3a5c]/25"
          >
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Module précédent
            </p>
            <p className="mt-2 font-semibold text-[#1a3a5c]">{prevModule.title}</p>
          </Link>
        ) : (
          <div />
        )}
        {nextModule ? (
          <Link
            href={nextModule.href}
            className="card-elevated rounded-2xl border border-zinc-200 bg-gradient-to-br from-[#1a3a5c]/[0.04] to-amber-50/30 p-5 transition hover:border-[#d4af37]/40"
          >
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Module suivant
            </p>
            <p className="mt-2 font-semibold text-[#1a3a5c]">{nextModule.title} →</p>
          </Link>
        ) : (
          <Link
            href="/formation/profil"
            className="card-elevated flex flex-col justify-center rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 text-center transition hover:border-emerald-300"
          >
            <p className="text-sm font-bold text-emerald-900">Parcours terminé ?</p>
            <p className="mt-1 text-xs text-emerald-800">Voir badges & certificat sur votre profil</p>
          </Link>
        )}
      </nav>
    </div>
  );
}
