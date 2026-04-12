import Link from "next/link";
import { BookOpen, Clock, Layers, Sparkles, Target, Brain, Award } from "lucide-react";
import { COURSE, lessonId, getTotalCourseDurationMin, formatDuration } from "@/data/course";
import { AvatarIllustration } from "@/components/avatars/AvatarIllustration";
import { getAvatarForModule } from "@/data/module-avatars";
import { getModuleShowcase } from "@/data/module-showcase";
import { ProgressOverview } from "@/components/ProgressOverview";
import { ContinueFormationCta } from "@/components/ContinueFormationCta";
import { ModuleRowProgress } from "@/components/ModuleRowProgress";
import { DashboardGamification } from "./DashboardGamification";
import { DashboardAnalytics } from "./DashboardAnalytics";
import { StaggerContainer, StaggerItem } from "@/components/animations";
import { DailyGoalTracker } from "@/components/retention";
import { AdaptiveLearningPath } from "@/components/learning-path";
import { AICoachButton } from "@/components/ai-coach";
import { Greeting } from "@/components/Greeting";

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
            <span className="trust-badge text-[#7a6410]">
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
                <dt className="text-[10px] font-bold uppercase tracking-wide text-zinc-500">
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
                <dt className="text-[10px] font-bold uppercase tracking-wide text-zinc-500">
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
                <dt className="text-[10px] font-bold uppercase tracking-wide text-zinc-500">
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
                <dt className="text-[10px] font-bold uppercase tracking-wide text-emerald-600">
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

      <DashboardAnalytics />

      <DashboardGamification />

      {/* Raccourcis */}
      <section className="scroll-mt-8">
        <h2 className="section-heading">
          <span className="shrink-0">Accès rapide</span>
        </h2>
        <p className="mt-2 text-sm text-zinc-600">
          Les outils les plus utiles — un clic pour approfondir ou vous entraîner.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <QuickLink
            href="/formation/outils"
            icon="🧮"
            label="Simulateurs"
            desc="Crédit & rentabilité"
            highlight
          />
          <QuickLink
            href="/formation/supports-visuels"
            icon="📋"
            label="Fiches visuelles"
            desc="Infographies HD"
            highlight
          />
          <QuickLink href="/formation/profil" icon="🏅" label="Badges" desc="Progression" />
          <QuickLink href="/formation/profil" icon="🎓" label="Certificat" desc="Attestation" />
          <QuickLink href="/formation/production" icon="🎬" label="Production" desc="Avatars" />
          <QuickLink
            href="/formation/examen/juridique"
            icon="✅"
            label="Examens QCM"
            desc="Par module"
          />
        </div>
      </section>

      {/* Formateurs preview */}
      <section className="scroll-mt-8">
        <h2 className="section-heading"><span className="shrink-0">Vos formateurs</span></h2>
        <p className="mt-2 text-sm text-zinc-600">5 experts pour 5 modules — chacun avec son style pédagogique.</p>
        <div className="mt-4 flex flex-wrap gap-4 justify-center sm:justify-start">
          {COURSE.map((mod) => (
            <Link key={mod.slug} href={`/formation/formateurs`} className="flex flex-col items-center gap-1 group">
              <AvatarIllustration moduleSlug={mod.slug as any} size="sm" animated expression="neutral" />
              <span className="text-[10px] font-semibold text-zinc-500 group-hover:text-brand-navy transition">{mod.slug}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Modules */}
      <section id="parcours" className="scroll-mt-24">
        <h2 className="section-heading">
          <span className="shrink-0">Votre parcours</span>
        </h2>
        <p className="mt-2 text-sm text-zinc-600">
          Ouvrez un module pour voir les leçons dans l&apos;ordre — idéal pour progresser sans vous
          perdre.
        </p>
        <ol className="mt-6 space-y-5">
          {COURSE.map((mod, i) => {
            const avatar = getAvatarForModule(mod.slug);
            const showcase = getModuleShowcase(mod.slug);
            const accent = avatar?.accentColor ?? "#1a3a5c";
            return (
              <li
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
                          <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-[11px] font-semibold text-zinc-500">
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
                  <ul className="mt-5 space-y-1 border-t border-zinc-100 pt-5">
                    {mod.lessons.map((lesson) => (
                      <li key={lesson.slug}>
                        <Link
                          href={`/formation/${mod.slug}/${lesson.slug}`}
                          className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition hover:bg-zinc-50"
                        >
                          <span className="flex items-center gap-2 flex-wrap text-[15px] text-zinc-800">
                            {lesson.interactiveScenarioId && (
                              <span className="rounded-md bg-brand-navy/10 px-2 py-0.5 text-[10px] font-bold uppercase text-brand-navy">
                                Interactif
                              </span>
                            )}
                            {lesson.difficulty === "avance" && (
                              <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-700">
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
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>
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
      <div className="text-2xl transition duration-300 group-hover:scale-110">{icon}</div>
      <p className="mt-2 text-sm font-bold text-brand-navy">{label}</p>
      <p className="text-[10px] leading-snug text-zinc-500">{desc}</p>
    </Link>
  );
}
