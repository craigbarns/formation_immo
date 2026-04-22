import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Parcours de formation",
  description: "Accédez aux 5 modules de formation immobilière : juridique, transaction, financement, marketing et terrain.",
};
import { BookOpen, Clock, Layers, Sparkles, Target, Brain, Award, Trophy, CheckCircle2, GraduationCap, type LucideIcon } from "lucide-react";
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

async function checkPlacementTest() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;
  
  const { data: placementResult } = await supabase
    .from("placement_results")
    .select("user_id")
    .eq("user_id", user.id)
    .single();
  
  return placementResult;
}

export default async function FormationHomePage() {
  // Vérifier si l'utilisateur a passé le test de positionnement
  const hasPlacementResult = await checkPlacementTest();
  
  // Si c'est un nouvel utilisateur sans test, rediriger vers le test
  if (!hasPlacementResult) {
    redirect("/formation/test");
  }
  
  const totalLessons = COURSE.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalModules = COURSE.length;
  const totalDuration = formatDuration(getTotalCourseDurationMin());

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#070d18] shadow-2xl">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.12),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(37,99,235,0.08),transparent_50%)]"
          aria-hidden
        />
        <div
          className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-brand-gold/5 blur-[120px]"
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />
        <div className="relative px-6 py-12 md:px-12 md:py-16">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-gold/90">
            <Sparkles className="h-4 w-4 animate-pulse" aria-hidden />
            <Greeting /> — EXPÉRIENCE CERTIFIANTE
          </div>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <span className="rounded-full border border-brand-gold/30 bg-brand-gold/10 px-3.5 py-1 text-2xs font-bold uppercase tracking-wider text-brand-gold backdrop-blur-md">
              Parcours certifiant
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-2xs font-bold uppercase tracking-wider text-white/80 backdrop-blur-md">
              Contenu pro · {totalDuration}
            </span>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-2xs font-bold uppercase tracking-wider text-emerald-400 backdrop-blur-md">
              Loi ALUR 2026
            </span>
          </div>
          <h1 className="mt-7 max-w-3xl text-4xl font-black leading-[1.1] tracking-tight text-white md:text-[3.25rem]">
            Une formation claire, concrète,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-white to-brand-gold">prête pour le terrain</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl">
            {totalModules} modules et {totalLessons} leçons : juridique, transaction, financement,
            marketing et closing. Scripts détaillés, QCM, fiches et outils — tout ce qui vous sert au
            quotidien avec vos clients.
          </p>

          <dl className="mt-12 grid gap-4 sm:grid-cols-4">
            <StatCard icon={Layers} label="Modules" value={totalModules} color="gold" />
            <StatCard icon={BookOpen} label="Leçons" value={totalLessons} color="white" />
            <StatCard icon={Clock} label="Volume" value={totalDuration} color="gold" />
            <StatCard icon={Award} label="Certifié" value="ALUR conforme" color="emerald" isText />
          </dl>

          <div className="mt-12 rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-md">
            <ProgressOverview />
          </div>
          <div className="mt-6">
            <ContinueFormationCta />
          </div>
        </div>
      </section>

      {/* Daily Goal & Learning Path */}
      <ScrollReveal>
      <section className="grid gap-8 md:grid-cols-2">
        <div className="space-y-5">
          <h2 className="flex items-center gap-3 text-xl font-black uppercase tracking-wider text-white">
            <Target className="h-6 w-6 text-brand-gold" />
            Objectif quotidien
          </h2>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-1 shadow-xl">
            <DailyGoalTracker />
          </div>
        </div>
        <div className="space-y-5">
          <h2 className="flex items-center gap-3 text-xl font-black uppercase tracking-wider text-white">
            <Brain className="h-6 w-6 text-brand-gold" />
            Parcours recommandé
          </h2>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-1 shadow-xl">
            <AdaptiveLearningPath />
          </div>
        </div>
      </section>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
      <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-2">
        <DashboardAnalytics />
        <div className="mt-2 border-t border-white/5 pt-2">
          <DashboardGamification />
        </div>
      </div>
      </ScrollReveal>

      {/* Certification Final CTA */}
      <ScrollReveal delay={0.15}>
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0a1224] to-[#040813] p-10 md:p-16 text-white shadow-2xl border border-brand-gold/20">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Trophy className="w-64 h-64 text-brand-gold -rotate-12 translate-x-12 -translate-y-12" />
        </div>
        <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/15 text-brand-gold text-xs font-black uppercase tracking-[0.2em] mb-8 border border-brand-gold/30 backdrop-blur-md">
                <Sparkles className="w-4 h-4 animate-pulse" />
                Étape Ultime
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                Décrochez votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-white">Certification MasterClass</span>
            </h2>
            <p className="text-white/60 text-lg md:text-xl mb-10 leading-relaxed">
                Prêt pour le grand saut ? L&apos;examen final synthétise l&apos;intégralité du cursus.
                Réussissez-le pour obtenir votre diplôme d&apos;Expert Immobilier certifié.
            </p>
            <Link 
                href="/formation/certification" 
                className="group inline-flex items-center gap-4 rounded-2xl bg-brand-gold px-10 py-5 text-brand-navy font-black shadow-[0_20px_50px_rgba(212,175,55,0.25)] transition hover:bg-white hover:scale-105 active:scale-95"
            >
                Passer l&apos;Examen de Certification
                <Award className="w-6 h-6 transition-transform group-hover:rotate-12" />
            </Link>
        </div>
        <div className="mt-12 pt-12 border-t border-white/10 flex flex-wrap gap-10">
            <div className="flex items-center gap-3 group">
                <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-brand-gold/50 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-white/50 group-hover:text-white/80 transition-colors">ALUR 2026</span>
            </div>
            <div className="flex items-center gap-3 group">
                <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-brand-gold/50 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-white/50 group-hover:text-white/80 transition-colors">Blockchain</span>
            </div>
            <div className="flex items-center gap-3 group">
                <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-brand-gold/50 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-white/50 group-hover:text-white/80 transition-colors">LinkedIn</span>
            </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Raccourcis */}
      <ScrollReveal>
      <section className="scroll-mt-8">
        <h2 className="flex items-center gap-3 text-2xl font-black uppercase tracking-wider text-white">
          <Layers className="h-6 w-6 text-brand-gold" />
          Accès rapide
        </h2>
        <p className="mt-3 text-base text-white/50 font-medium">
          Les outils professionnels indispensables — un clic pour approfondir.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
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
        <h2 className="flex items-center gap-3 text-2xl font-black uppercase tracking-wider text-white">
          <Award className="h-6 w-6 text-brand-gold" />
          Évaluations
        </h2>
        <p className="mt-3 text-base text-white/50 font-medium">Testez vos connaissances module par module avec les QCM certifiants.</p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {COURSE.map((mod, i) => {
            const avatar = getAvatarForModule(mod.slug);
            const accent = avatar?.accentColor ?? "#d4af37";
            return (
              <Link
                key={mod.slug}
                href={`/formation/examen/${mod.slug}`}
                className="group relative flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:border-brand-gold/30 hover:bg-white/10 hover:-translate-y-1 shadow-lg"
              >
                <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
                  <GraduationCap className="h-12 w-12" style={{ color: accent }} />
                </div>
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black text-white shadow-xl ring-2 ring-white/10"
                  style={{ backgroundColor: accent }}
                >
                  {i + 1}
                </span>
                <span className="text-sm font-black leading-snug text-white group-hover:text-brand-gold transition-colors line-clamp-2 uppercase tracking-wide">{mod.title.replace(/Module \d — /, "")}</span>
                <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">{mod.lessons.length} leçons</span>
              </Link>
            );
          })}
        </div>
      </section>
      </ScrollReveal>

      {/* Modules */}
      <section id="parcours" className="scroll-mt-24">
        <h2 className="flex items-center gap-3 text-3xl font-black uppercase tracking-widest text-white">
          <BookOpen className="h-8 w-8 text-brand-gold" />
          VOTRE PARCOURS
        </h2>
        <p className="mt-4 text-lg text-white/50 font-medium">
          Maîtrisez chaque étape du métier — progressez leçon par leçon vers l&apos;excellence.
        </p>
        <StaggerContainer className="mt-10 space-y-8">
          {COURSE.map((mod, i) => {
            const avatar = getAvatarForModule(mod.slug);
            const showcase = getModuleShowcase(mod.slug);
            const accent = avatar?.accentColor ?? "#d4af37";
            return (
              <StaggerItem
                key={mod.slug}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#070d18] shadow-2xl transition-all duration-500 hover:border-brand-gold/20"
              >
                <div
                  className="h-1.5 w-full transition-opacity group-hover:opacity-80"
                  style={{ background: `linear-gradient(90deg, ${accent}, ${accent}44, transparent)` }}
                  aria-hidden
                />
                <div className="p-8 md:p-10">
                  <div className="flex flex-wrap items-start justify-between gap-6">
                    <div className="flex gap-6 max-w-3xl">
                      <div
                        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.25rem] text-2xl font-black text-white shadow-2xl ring-4 ring-white/5"
                        style={{ backgroundColor: accent }}
                      >
                        {i + 1}
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 flex-wrap">
                          <h3 className="text-2xl font-black text-white tracking-tight uppercase">{mod.title}</h3>
                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-2xs font-bold text-white/60">
                            {formatDuration(mod.lessons.reduce((a, l) => a + l.duration, 0))}
                          </span>
                        </div>
                        {avatar && (
                          <div className="flex items-center gap-3">
                            <div className="h-6 w-6 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-black" style={{ background: accent }}>{avatar.initials}</div>
                            <p className="text-xs font-bold text-white/70">
                              Expert : <span className="text-white">{avatar.name}</span> —{" "}
                              {avatar.role}
                            </p>
                          </div>
                        )}
                        {showcase && (
                          <p className="text-base font-bold leading-snug text-white/90">
                            {showcase.headline}
                          </p>
                        )}
                        <div className="pt-2">
                          <ModuleRowProgress moduleSlug={mod.slug} />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/formation/flashcards/${mod.slug}`}
                        className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white/80 transition hover:bg-white/15 hover:text-white"
                      >
                        Flashcards
                      </Link>
                      <Link
                        href={`/formation/examen/${mod.slug}`}
                        className="rounded-xl border border-brand-gold/30 bg-brand-gold/10 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-brand-gold transition hover:bg-brand-gold/20"
                      >
                        Examen
                      </Link>
                      <Link href={`/formation/${mod.slug}`} className="rounded-xl bg-white px-6 py-2.5 text-xs font-black uppercase tracking-wider text-brand-navy shadow-xl transition hover:bg-brand-gold hover:scale-105 active:scale-95">
                        Ouvrir →
                      </Link>
                    </div>
                  </div>
                  <p className="mt-8 text-base leading-relaxed text-white/60">{mod.summary}</p>
                  
                  {/* Quick Lesson List */}
                  <StaggerContainer className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-2 border-t border-white/5 pt-8" staggerDelay={0.03}>
                    {mod.lessons.map((lesson) => (
                      <StaggerItem key={lesson.slug}>
                        <Link
                          href={`/formation/${mod.slug}/${lesson.slug}`}
                          className="flex items-center justify-between gap-4 rounded-xl px-4 py-3 transition hover:bg-white/5 hover:translate-x-1 group/item border border-transparent hover:border-white/5"
                        >
                          <span className="flex items-center gap-3 text-sm font-bold text-white/70 group-hover/item:text-white transition-colors">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-gold opacity-40 group-hover/item:opacity-100 transition-opacity" />
                            {lesson.title}
                          </span>
                          <div className="flex items-center gap-3">
                            {lesson.interactiveScenarioId && (
                                <span className="rounded-md bg-brand-gold/20 px-2 py-0.5 text-[9px] font-black uppercase text-brand-gold border border-brand-gold/20">
                                  Interactif
                                </span>
                              )}
                            <span className="shrink-0 text-[10px] font-black uppercase tracking-widest text-white/30 flex items-center gap-1.5">
                              <Clock className="h-3 w-3" aria-hidden />
                              {formatDuration(lesson.duration)}
                            </span>
                          </div>
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

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  isText,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  color: "gold" | "white" | "emerald";
  isText?: boolean;
}) {
  const colorClasses = {
    gold: "bg-brand-gold/15 text-brand-gold ring-brand-gold/20 border-brand-gold/20",
    white: "bg-white/10 text-white ring-white/10 border-white/10",
    emerald: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/20 border-emerald-500/20",
  };
  
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-md shadow-lg transition hover:bg-white/10">
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${colorClasses[color]} shadow-2xl`}>
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      <div>
        <dt className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
          {label}
        </dt>
        <dd className={`font-black tracking-tight ${isText ? "text-xs uppercase" : "text-xl tabular-nums"} text-white`}>
          {value}
        </dd>
      </div>
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
      className={`group relative overflow-hidden rounded-2xl border p-5 text-center transition-all duration-300 ${
        highlight
          ? "border-brand-gold/30 bg-gradient-to-b from-brand-gold/10 to-transparent hover:border-brand-gold hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:-translate-y-1"
          : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10 hover:-translate-y-1 shadow-lg"
      }`}
    >
      <div className="relative z-10 transition duration-500 group-hover:scale-110">
        <EmojiIcon emoji={icon} className="h-9 w-9" />
      </div>
      <p className="relative z-10 mt-3 text-sm font-black uppercase tracking-wider text-white group-hover:text-brand-gold transition-colors">{label}</p>
      <p className="relative z-10 mt-1 text-[10px] font-bold uppercase tracking-tight text-white/40">{desc}</p>
      {highlight && (
        <div className="absolute inset-0 bg-gradient-to-b from-brand-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </Link>
  );
}
