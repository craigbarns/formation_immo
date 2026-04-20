import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Parcours de formation",
  description: "Accédez aux 5 modules de formation immobilière : juridique, transaction, financement, marketing et terrain.",
};
import { BookOpen, Clock, Layers, Sparkles, Target, Brain, Award, Trophy, CheckCircle2 } from "lucide-react";
import { COURSE, getTotalCourseDurationMin, formatDuration } from "@/data/course";
import { getAvatarForModule } from "@/data/module-avatars";
import { getModuleShowcase } from "@/data/module-showcase";
import { ProgressOverview } from "@/components/ProgressOverview";
import { ContinueFormationCta } from "@/components/ContinueFormationCta";
import { ModuleRowProgress } from "@/components/ModuleRowProgress";
import { DashboardGamification } from "./DashboardGamification";
import { DashboardAnalytics } from "./DashboardAnalytics";
import { StaggerContainer, StaggerItem, ScrollReveal } from "@/components/animations";
import { DailyGoalTracker } from "@/components/retention";
import { AdaptiveLearningPath } from "@/components/learning-path";
import { Greeting } from "@/components/Greeting";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

export default function FormationHomePage() {
  const totalLessons = COURSE.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalModules = COURSE.length;
  const totalDuration = formatDuration(getTotalCourseDurationMin());

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="card-elevated relative overflow-hidden rounded-3xl border-brand-navy/10">
        <div
          className="absolute inset-0 bg-gradient-to-br from-white via-brand-gold-soft/40 to-white"
          aria-hidden
        />
        <div
          className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-navy/[0.06] blur-3xl"
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231a3a5c' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />
        <div className="relative px-6 py-9 md:px-10 md:py-11">
          <p className="flex items-center gap-2 text-sm font-medium text-brand-navy/80">
            <Sparkles className="h-4 w-4 text-brand-gold" aria-hidden />
            <Greeting /> — tout est inclus, avancez leçon par leçon.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="trust-badge border-brand-navy/10 bg-brand-navy text-white">
              Parcours certifiant
            </span>
            <span className="trust-badge border-brand-gold/40 bg-brand-gold-soft text-brand-navy">
              Contenu pro · {totalDuration}
            </span>
            <span className="trust-badge border-emerald-300/50 bg-emerald-50 text-emerald-800">
              Loi ALUR 2026
            </span>
            <span className="trust-badge border-blue-300/50 bg-blue-50 text-blue-800">
              RGPD conforme
            </span>
          </div>
          <h1 className="mt-5 max-w-3xl text-3xl font-bold leading-[1.15] tracking-tight text-brand-navy md:text-[2.35rem]">
            Une formation claire, concrète,{" "}
            <span className="text-gradient-brand">prête pour le terrain</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 md:text-lg">
            {totalModules} modules et {totalLessons} leçons : juridique, transaction, financement,
            marketing et closing. Scripts détaillés, QCM, fiches et outils — tout ce qui vous sert au
            quotidien avec vos clients.
          </p>

          <dl className="mt-9 grid gap-3 sm:grid-cols-4">
            <div className="flex items-center gap-3 rounded-2xl border border-zinc-200/80 bg-white/90 px-4 py-3 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-navy/[0.08] text-brand-navy">
                <Layers className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <dt className="text-2xs font-bold uppercase tracking-wide text-zinc-500">
                  Modules
                </dt>
                <dd className="text-xl font-bold tabular-nums text-brand-navy">{totalModules}</dd>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-zinc-200/80 bg-white/90 px-4 py-3 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-navy/[0.08] text-brand-navy">
                <BookOpen className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <dt className="text-2xs font-bold uppercase tracking-wide text-zinc-500">
                  Leçons
                </dt>
                <dd className="text-xl font-bold tabular-nums text-brand-navy">{totalLessons}</dd>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-zinc-200/80 bg-white/90 px-4 py-3 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold/[0.15] text-brand-navy">
                <Clock className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <dt className="text-2xs font-bold uppercase tracking-wide text-zinc-500">
                  Volume
                </dt>
                <dd className="text-xl font-bold tabular-nums text-brand-navy">{totalDuration}</dd>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-emerald-200/80 bg-emerald-50/80 px-4 py-3 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <Award className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <dt className="text-2xs font-bold uppercase tracking-wide text-emerald-600">
                  Certifié
                </dt>
                <dd className="text-xs font-bold text-emerald-800">ALUR conforme</dd>
              </div>
            </div>
          </dl>

          <ProgressOverview />
          <ContinueFormationCta />
        </div>
      </section>

      {/* Daily Goal & Learning Path */}
      <ScrollReveal>
      <section className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-bold text-brand-navy">
            <Target className="h-5 w-5 text-brand-gold" />
            Objectif quotidien
          </h2>
          <DailyGoalTracker />
        </div>
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-bold text-brand-navy">
            <Brain className="h-5 w-5 text-brand-gold" />
            Parcours recommandé
          </h2>
          <AdaptiveLearningPath />
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
      <DashboardAnalytics />

      <DashboardGamification />
      </ScrollReveal>

      {/* Certification Final CTA */}
      <ScrollReveal delay={0.15}>
      <section className="relative overflow-hidden rounded-3xl bg-brand-navy p-8 md:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
            <Trophy className="w-48 h-48 text-brand-gold -rotate-12 translate-x-12 -translate-y-12" />
        </div>
        <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold text-xs font-bold uppercase tracking-wider mb-6 border border-brand-gold/30">
                <Sparkles className="w-3.5 h-3.5" />
                Étape Ultime
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
                Décrochez votre <span className="text-brand-gold italic">Certification MasterClass</span>
            </h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
                Prêt pour le grand saut ? L&apos;examen final synthétise l&apos;intégralité du cursus.
                Réussissez-le avec plus de 70% pour obtenir votre diplôme d&apos;Expert Immobilier (42h - Loi ALUR).
            </p>
            <Link 
                href="/formation/certification" 
                className="inline-flex items-center gap-3 rounded-2xl bg-brand-gold px-8 py-4 text-brand-navy font-black shadow-lg shadow-brand-gold/20 transition hover:bg-[var(--brand-gold-hover)] hover:scale-105 active:scale-95"
            >
                Passer l&apos;Examen de Certification
                <Award className="w-5 h-5" />
            </Link>
        </div>
        <div className="mt-10 pt-10 border-t border-white/10 flex flex-wrap gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-brand-gold" />
                <span className="text-sm font-bold uppercase tracking-tight">ALUR Conforme 2026</span>
            </div>
            <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-brand-gold" />
                <span className="text-sm font-bold uppercase tracking-tight">Vérification Blockchain</span>
            </div>
            <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-brand-gold" />
                <span className="text-sm font-bold uppercase tracking-tight">Partageable LinkedIn</span>
            </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Raccourcis */}
      <ScrollReveal>
      <section className="scroll-mt-8">
        <h2 className="section-heading">
          <span className="shrink-0">Accès rapide</span>
        </h2>
        <p className="mt-2 text-sm text-zinc-600">
          Les outils les plus utiles — un clic pour approfondir ou vous entraîner.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
          <QuickLink
            href="/formation/outils"
            icon="🧮"
            label="Simulateurs"
            desc="Crédit & rentabilité"
            highlight
          />
          <QuickLink
            href="/formation/aide-memoire"
            icon="📑"
            label="Aide-mémoire"
            desc="Fiches imprimables"
            highlight
          />
          <QuickLink
            href="/formation/supports-visuels"
            icon="📋"
            label="Fiches visuelles"
            desc="Infographies HD"
            highlight
          />
          <QuickLink href="/formation/examen/juridique" icon="✅" label="Examens QCM" desc="Par module" />
          <QuickLink href="/formation/flashcards/juridique" icon="🃏" label="Flashcards" desc="Révision rapide" />
          <QuickLink href="/formation/profil" icon="🏅" label="Badges" desc="Progression" />
          <QuickLink href="/formation/certification" icon="🎓" label="Certification" desc="Examen final" highlight />
        </div>
      </section>
      </ScrollReveal>

      {/* Examens rapides par module */}
      <ScrollReveal delay={0.05}>
      <section className="scroll-mt-8">
        <h2 className="section-heading"><span className="shrink-0">Accès aux examens</span></h2>
        <p className="mt-2 text-sm text-zinc-600">Testez vos connaissances module par module avec les QCM d&apos;évaluation.</p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {COURSE.map((mod, i) => {
            const avatar = getAvatarForModule(mod.slug);
            const accent = avatar?.accentColor ?? "#1a3a5c";
            return (
              <Link
                key={mod.slug}
                href={`/formation/examen/${mod.slug}`}
                className="group flex flex-col gap-2 rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm transition hover:border-brand-navy/20 hover:shadow-md"
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-black text-white shadow"
                  style={{ backgroundColor: accent }}
                >
                  {i + 1}
                </span>
                <span className="text-xs font-bold leading-snug text-brand-navy line-clamp-2">{mod.title.replace("Module 1 — ", "").replace("Module 2 — ", "").replace("Module 3 — ", "").replace("Module 4 — ", "").replace("Module 5 — ", "")}</span>
                <span className="text-2xs text-zinc-500 font-medium">{mod.lessons.length} leçons</span>
              </Link>
            );
          })}
        </div>
      </section>
      </ScrollReveal>

      {/* Modules */}
      <section id="parcours" className="scroll-mt-24">
        <h2 className="section-heading">
          <span className="shrink-0">Votre parcours</span>
        </h2>
        <p className="mt-2 text-sm text-zinc-600">
          Ouvrez un module pour voir les leçons dans l&apos;ordre — idéal pour progresser sans vous
          perdre.
        </p>
        <StaggerContainer className="mt-6 space-y-5">
          {COURSE.map((mod, i) => {
            const avatar = getAvatarForModule(mod.slug);
            const showcase = getModuleShowcase(mod.slug);
            const accent = avatar?.accentColor ?? "#1a3a5c";
            return (
              <StaggerItem
                key={mod.slug}
                className="group card-elevated card-elevated-hover overflow-hidden"
              >
                <div
                  className="h-1.5 w-full"
                  style={{ background: `linear-gradient(90deg, ${accent}, ${accent}88)` }}
                  aria-hidden
                />
                <div className="p-6 md:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex gap-4">
                      <span
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg font-bold text-white shadow-md"
                        style={{ backgroundColor: accent }}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-xl font-bold text-brand-navy">{mod.title}</h3>
                          <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-3xs font-semibold text-zinc-500">
                            {formatDuration(mod.lessons.reduce((a, l) => a + l.duration, 0))}
                          </span>
                        </div>
                        {avatar && (
                          <p className="mt-1 text-xs text-zinc-500">
                            Avec <span className="font-medium text-zinc-700">{avatar.name}</span> —{" "}
                            {avatar.role}
                          </p>
                        )}
                        {showcase && (
                          <p className="mt-3 text-sm font-medium leading-snug text-zinc-700">
                            {showcase.headline}
                          </p>
                        )}
                        <ModuleRowProgress moduleSlug={mod.slug} />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/formation/flashcards/${mod.slug}`}
                        className="rounded-xl border border-brand-navy/20 bg-brand-navy/5 px-3 py-2 text-xs font-bold text-brand-navy transition hover:bg-brand-navy/10"
                      >
                        Flashcards
                      </Link>
                      <Link
                        href={`/formation/examen/${mod.slug}`}
                        className="rounded-xl border border-brand-gold/35 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-900 transition hover:bg-amber-100"
                      >
                        Examen
                      </Link>
                      <Link href={`/formation/${mod.slug}`} className="btn-primary-solid text-xs">
                        Ouvrir →
                      </Link>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-600">{mod.summary}</p>
                  <StaggerContainer className="mt-5 space-y-1 border-t border-zinc-100 pt-5" staggerDelay={0.04}>
                    {mod.lessons.map((lesson) => (
                      <StaggerItem key={lesson.slug}>
                        <Link
                          href={`/formation/${mod.slug}/${lesson.slug}`}
                          className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition hover:bg-zinc-50 hover:translate-x-1"
                        >
                          <span className="flex items-center gap-2 flex-wrap text-sm text-zinc-800">
                            {lesson.interactiveScenarioId && (
                              <span className="rounded-md bg-brand-navy/10 px-2 py-0.5 text-2xs font-bold uppercase text-brand-navy">
                                Interactif
                              </span>
                            )}
                            {lesson.difficulty === "avance" && (
                              <span className="rounded-md bg-amber-50 px-2 py-0.5 text-2xs font-bold uppercase text-amber-700">
                                Avancé
                              </span>
                            )}
                            {lesson.title}
                          </span>
                          <span className="shrink-0 text-xs tabular-nums text-zinc-400 flex items-center gap-2">
                            <Clock className="h-3 w-3" aria-hidden />
                            {formatDuration(lesson.duration)}
                          </span>
                        </Link>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>
    </div>
  );
}

function QuickLink({
  href,
  icon,
  label,
  desc,
  highlight,
}: {
  href: string;
  icon: string;
  label: string;
  desc: string;
  highlight?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`link-focus group rounded-2xl border p-4 text-center shadow-sm transition ${
        highlight
          ? "border-brand-navy/20 bg-gradient-to-b from-white to-brand-gold-soft/50 hover:border-brand-gold/45 hover:shadow-lg"
          : "border-zinc-200/90 bg-white hover:border-brand-navy/20 hover:shadow-md"
      }`}
    >
      <div className="transition duration-300 group-hover:scale-110">
        <EmojiIcon emoji={icon} className="h-7 w-7" />
      </div>
      <p className="mt-2 text-sm font-bold text-brand-navy">{label}</p>
      <p className="text-2xs leading-snug text-zinc-500">{desc}</p>
    </Link>
  );
}
