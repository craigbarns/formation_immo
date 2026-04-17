import Link from "next/link";
import { ArrowRight, CheckCircle2, BookOpen, Scale, TrendingUp, Megaphone, MapPin, GraduationCap } from "lucide-react";

const MODULES = [
  {
    num: "01",
    title: "Juridique & Conformité",
    desc: "Loi ALUR, mandats, diagnostics, TRACFIN, non-discrimination, baux d'habitation.",
    color: "#1a3a5c",
    icon: Scale,
    lessons: 9,
  },
  {
    num: "02",
    title: "Transaction & Négociation",
    desc: "Estimation, prospection, closing, offre d'achat, compromis, acte authentique.",
    color: "#2563eb",
    icon: TrendingUp,
    lessons: 7,
  },
  {
    num: "03",
    title: "Financement & Fiscalité",
    desc: "Crédit immobilier, capacité d'emprunt, défiscalisation, Malraux, Denormandie.",
    color: "#7c3aed",
    icon: BookOpen,
    lessons: 6,
  },
  {
    num: "04",
    title: "Marketing Digital",
    desc: "Photos, annonces, portails, vidéo 360°, SEO local, personal branding.",
    color: "#0891b2",
    icon: Megaphone,
    lessons: 7,
  },
  {
    num: "05",
    title: "Terrain & Closing",
    desc: "R0/R1/R2, découverte client, visite, argumentaire, closing, fidélisation.",
    color: "#059669",
    icon: MapPin,
    lessons: 7,
  },
];

const BADGES = [
  "Loi ALUR 2026",
  "Formation certifiante",
  "Financement OPCO",
  "TRACFIN conforme",
  "Non-discrimination",
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-brand-navy text-white">
      {/* Skip link */}
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-brand-navy"
      >
        Aller au contenu principal
      </a>

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_-10%,rgba(212,175,55,0.22),transparent)]"
        aria-hidden
      />

      {/* Header */}
      <header className="relative z-20 border-b border-white/10 bg-brand-navy/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gold text-brand-navy text-sm font-black">42</span>
            <span className="text-sm font-bold tracking-tight text-white">Formation Agent Immobilier</span>
          </div>
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/8 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/15"
          >
            Accéder →
          </Link>
        </div>
      </header>

      <main id="contenu" className="relative flex-1">
        {/* Hero */}
        <section className="relative mx-auto max-w-6xl px-6 py-16 md:py-24 text-center">
          <p className="inline-block rounded-full border border-brand-gold/40 bg-brand-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-gold">
            Formation professionnelle certifiante
          </p>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl lg:text-[3.5rem]">
            Le guide complet de{" "}
            <span className="bg-gradient-to-r from-brand-gold via-yellow-300 to-brand-gold bg-clip-text text-transparent">
              l&apos;agent immobilier
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
            42 heures structurées en 5 modules : juridique, transaction, financement, marketing et terrain.
            Scripts vidéo, QCM, simulateurs et fiches pratiques — tout ce qu&apos;il vous faut pour performer.
          </p>

          {/* Stats row */}
          <div className="mx-auto mt-10 flex flex-wrap justify-center gap-3">
            {[
              ["42h", "de formation"],
              ["5", "modules"],
              ["36+", "leçons"],
              ["75+", "questions QCM"],
            ].map(([val, label]) => (
              <div
                key={label}
                className="flex flex-col items-center rounded-2xl border border-white/12 bg-white/6 px-6 py-3 backdrop-blur-sm"
              >
                <span className="text-2xl font-black text-brand-gold">{val}</span>
                <span className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-white/80">{label}</span>
              </div>
            ))}
          </div>

          {/* Badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {BADGES.map((b) => (
              <span
                key={b}
                className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-semibold text-white/80"
              >
                <CheckCircle2 className="h-3 w-3 text-brand-gold" />
                {b}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/login"
              className="group inline-flex items-center gap-2 rounded-full bg-brand-gold px-8 py-3.5 text-base font-bold text-brand-navy shadow-xl shadow-black/20 transition hover:bg-yellow-300 active:scale-[0.98]"
            >
              Démarrer la formation
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <a
              href="#programme"
              className="rounded-full border border-white/25 px-8 py-3.5 text-sm font-semibold text-white/90 transition hover:border-white/45 hover:bg-white/8"
            >
              Voir le programme
            </a>
          </div>
        </section>

        {/* Programme */}
        <section
          id="programme"
          className="border-t border-white/10 bg-white/[0.03] px-6 py-16"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-gold">5 modules complets</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">Le programme</h2>
              <p className="mt-3 text-white/65 text-sm max-w-xl mx-auto">
                Chaque module couvre une dimension clé du métier — du cadre légal au terrain, en passant par le financement.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {MODULES.map((mod) => {
                const Icon = mod.icon;
                return (
                  <div
                    key={mod.num}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-white/20 hover:bg-white/8"
                  >
                    <div
                      className="absolute top-0 left-0 h-0.5 w-full"
                      style={{ background: `linear-gradient(90deg, ${mod.color}, transparent)` }}
                      aria-hidden
                    />
                    <div className="flex items-start gap-4">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white text-sm font-black"
                        style={{ backgroundColor: mod.color + "33", color: mod.color === "#1a3a5c" ? "#93c5fd" : mod.color }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">Module {mod.num}</p>
                        <h3 className="mt-0.5 text-base font-bold text-white leading-snug">{mod.title}</h3>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-white/65">{mod.desc}</p>
                    <p className="mt-3 text-[11px] font-semibold text-white/60">{mod.lessons} leçons</p>
                  </div>
                );
              })}

              {/* CTA card */}
              <div className="flex flex-col items-center justify-center rounded-2xl border border-brand-gold/30 bg-gradient-to-br from-brand-gold/15 to-yellow-500/5 p-6 text-center">
                <GraduationCap className="h-10 w-10 text-brand-gold" />
                <h3 className="mt-4 text-lg font-bold text-white">Certification incluse</h3>
                <p className="mt-2 text-sm text-white/65">
                  Financement OPCO, AGEFIP et FIF-PL. Attestation de formation délivrée à l&apos;issue du parcours.
                </p>
                <Link
                  href="/login"
                  className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-brand-gold px-5 py-2.5 text-sm font-bold text-brand-navy transition hover:bg-yellow-300"
                >
                  Démarrer <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Atouts */}
        <section className="border-t border-white/10 px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-gold">Méthode pédagogique</p>
              <h2 className="mt-3 text-3xl font-bold">Concret, actionnable, complet</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: "🎧",
                  title: "Audio & vidéo",
                  desc: "Chaque leçon disponible en lecture audio pour apprendre en mobilité.",
                },
                {
                  icon: "✅",
                  title: "QCM progressifs",
                  desc: "75+ questions avec explications détaillées et références juridiques.",
                },
                {
                  icon: "🧮",
                  title: "Simulateurs",
                  desc: "Crédit, rentabilité, négociation — exercez-vous sur des cas réels.",
                },
                {
                  icon: "📋",
                  title: "Fiches pratiques",
                  desc: "Templates, grilles de conformité et fiches récap téléchargeables.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="text-3xl">{item.icon}</div>
                  <h3 className="mt-4 font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-white/10 px-6 py-16 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold">Prêt à démarrer ?</h2>
            <p className="mt-4 text-white/65 text-base">
              Accédez immédiatement à l&apos;intégralité du contenu — leçons, QCM, simulateurs et fiches.
            </p>
            <Link
              href="/login"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-gold px-10 py-4 text-base font-bold text-brand-navy shadow-2xl shadow-black/30 transition hover:bg-yellow-300 active:scale-[0.98]"
            >
              Accéder à la formation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8 text-center text-xs text-white/60">
        <p>Formation agent immobilier — 42 h · ATC Education · NDA 75331582333</p>
      </footer>
    </div>
  );
}
