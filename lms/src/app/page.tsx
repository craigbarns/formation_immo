import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import {
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Scale,
  TrendingUp,
  Megaphone,
  MapPin,
  GraduationCap,
  Sparkles,
  Layers,
  Target,
  ShieldCheck,
  Headphones,
  CheckCircle,
  Calculator,
  ClipboardList,
  Briefcase,
  Trophy,
  Star,
} from "lucide-react";
import { AnimatedCounter } from "@/components/AnimatedCounter";

export const metadata: Metadata = {
  title: "Formation Agent Immobilier — Certification 42h | Loi ALUR 2026",
  description:
    "Formation complète 42h pour agents immobiliers : juridique, transaction, financement, marketing, closing. 36 leçons, 180 QCM certifiants, simulateurs pros. Certification professionnelle.",
  keywords: [
    "formation agent immobilier",
    "certification agent immobilier",
    "loi ALUR 2026",
    "formation immobilière",
    "carte professionnelle",
    "compromis de vente",
    "mandat exclusif",
  ],
  openGraph: {
    title: "Formation Agent Immobilier — Certification 42h",
    description: "36 leçons · 180 QCM · 5 modules · Certification professionnelle",
    type: "website",
    locale: "fr_FR",
  },
};

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
  "42 h de contenu",
  "TRACFIN conforme",
  "Non-discrimination",
];

/** Compétences acquises — affichées en section "Outcomes" */
const OUTCOMES = [
  {
    icon: Scale,
    title: "Maîtriser le cadre légal 2026",
    desc: "Loi Hoguet, ALUR, Climat, Lemoine — tous les textes à jour avec sanctions et cas pratiques.",
  },
  {
    icon: TrendingUp,
    title: "Closer 30 % de mandats en plus",
    desc: "Méthode BANT, technique CRAC, Ben Franklin Close — scripts terrain testés sur 1 000+ visites.",
  },
  {
    icon: BookOpen,
    title: "Optimiser le financement client",
    desc: "Calcul HCSF, défiscalisation 2026 (Denormandie, LMNP, déficit foncier 21 400 €), démembrement.",
  },
  {
    icon: Megaphone,
    title: "Construire un personal branding fort",
    desc: "LinkedIn algorithmé, Matterport ROI, photo pro, SEO local — feuille de route 30 / 60 / 90 jours.",
  },
];

const COURSE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Formation Agent Immobilier — Certification 42h",
  description:
    "Formation complète 42h pour agents immobiliers : juridique, transaction, financement, marketing, closing. 36 leçons, 180 QCM certifiants.",
  provider: {
    "@type": "Organization",
    name: "Formation Immo",
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
    inLanguage: "fr",
  },
  teaches: [
    "Droit immobilier ALUR 2026",
    "Transaction et négociation",
    "Financement et fiscalité",
    "Marketing digital immobilier",
    "Techniques de closing",
  ],
  timeRequired: "PT42H",
  numberOfModules: 5,
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-[#020617] text-white">
      <Script
        id="course-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(COURSE_SCHEMA) }}
      />
      {/* Skip link */}
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-brand-navy"
      >
        Aller au contenu principal
      </a>

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_-20%,rgba(212,175,55,0.18),transparent_70%)]"
        aria-hidden
      />

      {/* Header */}
      <header className="relative z-20 border-b border-white/10 bg-[#020617]/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-gold to-yellow-600 text-brand-navy shadow-lg shadow-brand-gold/20">
              <span className="text-base font-black">42</span>
            </div>
            <span className="text-sm font-black uppercase tracking-[0.2em] text-white">FORMATION IMMO</span>
          </div>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-white/10 hover:border-white/20"
          >
            Accéder →
          </Link>
        </div>
      </header>

      <main id="contenu" className="relative flex-1">
        {/* Hero */}
        <section className="relative mx-auto max-w-6xl px-6 py-20 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-5 py-2 text-xs font-black uppercase tracking-[0.3em] text-brand-gold backdrop-blur-md">
            <Sparkles className="h-4 w-4 animate-pulse" />
            ÉDITION 2026 CERTIFIANTE
          </div>
          <h1 className="mt-10 text-5xl font-black leading-[1.05] tracking-tight md:text-7xl lg:text-[5.5rem]">
            Le guide complet de{" "}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-white to-brand-gold drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              l&apos;agent immobilier
            </span>
          </h1>
          <p className="mx-auto mt-10 max-w-3xl text-xl leading-relaxed text-white/60 md:text-2xl">
            <span className="font-black text-white italic">42 heures de MasterClass</span> — du cadre légal ALUR au closing terrain. Devenez l&apos;expert que les clients s&apos;arrachent.
          </p>

          {/* Stats row */}
          <div className="mx-auto mt-16 flex flex-wrap justify-center gap-4">
            {[
              ["42h", "Contenu HD"],
              ["36", "Leçons Vidéo"],
              ["180", "QCM Certifiants"],
              ["360+", "Flashcards"],
            ].map(([val, label]) => (
              <div
                key={label}
                className="flex flex-col items-center rounded-[2rem] border border-white/10 bg-white/5 px-8 py-5 backdrop-blur-xl shadow-2xl transition hover:border-brand-gold/30"
              >
                <span className="text-3xl font-black text-brand-gold">{val}</span>
                <span className="mt-1 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">{label}</span>
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
          className="border-t border-white/10 bg-white/[0.02] px-6 py-24"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-brand-gold">CURRICULUM D&apos;EXCELLENCE</p>
              <h2 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">Le programme</h2>
              <p className="mt-6 text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
                5 modules stratégiques couvrant l&apos;intégralité du cycle de vente immobilier — de la conformité juridique au closing émotionnel.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {MODULES.map((mod) => {
                const Icon = mod.icon;
                return (
                  <div
                    key={mod.num}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:border-brand-gold/30 hover:-translate-y-1 shadow-2xl"
                  >
                    <div
                      className="absolute top-0 left-0 h-1 w-full opacity-40 group-hover:opacity-100 transition-opacity"
                      style={{ background: `linear-gradient(90deg, ${mod.color}, transparent)` }}
                      aria-hidden
                    />
                    <div className="flex items-start gap-5">
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-2xl ring-1 ring-white/10"
                        style={{ backgroundColor: mod.color + "44", color: "#fff" }}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Module {mod.num}</p>
                        <h3 className="mt-1 text-xl font-black text-white leading-tight uppercase">{mod.title}</h3>
                      </div>
                    </div>
                    <p className="mt-5 text-sm leading-relaxed text-white/60">{mod.desc}</p>
                    <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-6">
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand-gold">{mod.lessons} leçons vidéo</p>
                      <div className="h-1.5 w-1.5 rounded-full bg-brand-gold/40 animate-pulse" />
                    </div>
                  </div>
                );
              })}

              {/* CTA card */}
              <div className="flex flex-col items-center justify-center rounded-3xl border border-brand-gold/20 bg-gradient-to-br from-brand-gold/10 to-transparent p-10 text-center shadow-2xl">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-gold/20 border border-brand-gold/30 mb-6">
                  <GraduationCap className="h-8 w-8 text-brand-gold" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">Certification</h3>
                <p className="mt-4 text-sm text-white/60 leading-relaxed">
                  Attestation officielle délivrée à l&apos;issue du parcours. Validez vos compétences 2026.
                </p>
                <Link
                  href="/login"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-gold px-8 py-3 text-sm font-black text-brand-navy transition hover:bg-white hover:scale-105"
                >
                  S&apos;INSCRIRE <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Outcomes — ce que vous saurez faire */}
        <section className="border-t border-white/10 px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold mb-6">
                <Target className="h-3.5 w-3.5" /> RÉSULTATS GARANTIS
              </div>
              <h2 className="text-4xl font-black tracking-tight md:text-5xl">
                Votre nouvelle expertise
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-white/50 leading-relaxed">
                4 piliers de compétences transformatrices, mesurables et immédiatement activables sur le terrain.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {OUTCOMES.map((o) => {
                const Icon = o.icon;
                return (
                  <div
                    key={o.title}
                    className="group flex gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 transition-all duration-500 hover:border-brand-gold/30 hover:bg-white/10 shadow-2xl"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-gold/10 text-brand-gold border border-brand-gold/20 shadow-xl group-hover:scale-110 transition-transform">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-black text-white uppercase tracking-tight">{o.title}</h3>
                      <p className="mt-3 text-base leading-relaxed text-white/60">{o.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Atouts */}
        <section className="border-t border-white/10 bg-white/[0.01] px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-6">
                <Sparkles className="h-3.5 w-3.5" /> MÉTHODE PÉDAGOGIQUE
              </div>
              <h2 className="text-4xl font-black uppercase tracking-tight">L&apos;arsenal de l&apos;expert</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { Icon: Headphones, title: "Audio & Vidéo", desc: "Chaque leçon est une expérience immersive disponible en mobilité totale." },
                { Icon: CheckCircle, title: "180 QCM Certifiants", desc: "Questions chronométrées avec feedbacks détaillés et références juridiques 2026." },
                { Icon: Calculator, title: "Outils Décisifs", desc: "8 simulateurs experts (Crédit, Rentabilité, LMNP) pour convaincre vos clients." },
                { Icon: ClipboardList, title: "36 Checklists Pro", desc: "Vos grilles de conformité terrain pour sécuriser chaque mandat et chaque visite." },
                { Icon: Layers, title: "360 Flashcards", desc: "Mémorisation active SM-2 pour ancrer les connaissances sur le long terme." },
                { Icon: Briefcase, title: "Études de Cas", desc: "35+ scénarios réels débriefés pour affronter toutes les situations terrain." },
                { Icon: Target, title: "Coaching IA", desc: "Assistant intelligent disponible 24/7 pour répondre à vos questions complexes." },
                { Icon: Trophy, title: "Certification", desc: "Validation officielle partageable sur LinkedIn pour asseoir votre autorité." },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/5 bg-white/[0.03] p-8 transition-all duration-300 hover:border-white/20 hover:bg-white/5 shadow-xl group"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-brand-gold border border-white/10 mb-6 group-hover:border-brand-gold/40 transition-colors">
                    <item.Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-black text-white uppercase tracking-tight text-base mb-3">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-white/50">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Garantie qualité */}
        <section className="border-t border-white/10 px-6 py-12">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-6 rounded-3xl border border-brand-gold/20 bg-gradient-to-r from-brand-gold/5 via-brand-gold/10 to-brand-gold/5 px-8 py-6 text-center sm:gap-10">
            <div className="flex items-center gap-3 text-left">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-gold/20 text-brand-gold">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-gold">Mise à jour 2026</p>
                <p className="text-sm font-semibold text-white">Loi Climat, Lemoine, HCSF — déjà intégrés</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-left">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-gold/20 text-brand-gold">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-gold">100 % en ligne</p>
                <p className="text-sm font-semibold text-white">Apprenez à votre rythme, sur tous appareils</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-left">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-gold/20 text-brand-gold">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-gold">Formation professionnelle</p>
                <p className="text-sm font-semibold text-white">Contenu pédagogique certifié qualité</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-white/10 bg-white/[0.02] px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 text-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-3xs font-bold uppercase tracking-widest text-on-dark-muted">
                <Sparkles className="h-3 w-3" /> Questions fréquentes
              </p>
              <h2 className="mt-4 text-3xl font-bold">Vous avez des questions ?</h2>
            </div>
            <div className="space-y-4">
              {[
                {
                  q: "Quelle est la durée réelle de la formation ?",
                  a: "42 heures au total : 40 heures de contenu pédagogique réparties en 5 modules + 2 heures d'examen final certifiant. Chaque module fait 8 heures avec QCM et cas pratiques intégrés.",
                },
                {
                  q: "La certification a-t-elle une valeur officielle ?",
                  a: "L'attestation atteste de la maîtrise des compétences enseignées (5 modules, 180 QCM, cas pratiques). Elle complète la carte professionnelle délivrée par la CCI mais ne la remplace pas. Numérotation unique et vérifiable.",
                },
                {
                  q: "Puis-je utiliser cette formation pour mon équipe / mon centre ?",
                  a: "Oui — licence multi-utilisateurs disponible. Centres de formation, agences et organismes certifiants : contactez-nous pour un devis personnalisé avec suivi des progressions.",
                },
                {
                  q: "Le contenu est-il à jour avec la législation 2026 ?",
                  a: "Oui — loi Climat, Lemoine, HCSF, ALUR 2026, TRACFIN renforcé. Mises à jour trimestrielles incluses dans l'abonnement.",
                },
              ].map((faq, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <h3 className="font-bold text-white">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Social proof counter */}
        <section className="border-t border-white/10 px-6 py-10">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-8 text-center">
            <div>
              <p className="text-2xl font-black text-brand-gold">
                <AnimatedCounter target={42} suffix="h" />
              </p>
              <p className="text-2xs uppercase tracking-widest text-white/50">De formation</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <p className="text-2xl font-black text-brand-gold">
                <AnimatedCounter target={36} />
              </p>
              <p className="text-2xs uppercase tracking-widest text-white/50">Leçons</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <p className="text-2xl font-black text-brand-gold">
                <AnimatedCounter target={180} />
              </p>
              <p className="text-2xs uppercase tracking-widest text-white/50">QCM certifiants</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <p className="text-2xl font-black text-brand-gold">
                <AnimatedCounter target={5} />
              </p>
              <p className="text-2xs uppercase tracking-widest text-white/50">Modules</p>
            </div>
          </div>
        </section>

        {/* Témoignages */}
        <section className="border-t border-white/10 bg-white/[0.02] px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 text-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-3xs font-bold uppercase tracking-widest text-on-dark-muted">
                <Star className="h-3 w-3" /> Ils se sont formés
              </p>
              <h2 className="mt-4 text-3xl font-bold">Ce que disent les agents</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                {
                  name: "Thomas M.",
                  role: "Agent indépendant, Lyon",
                  text: "J'ai obtenu ma carte T en 3 semaines. Les QCM m'ont permis d'identifier mes lacunes sur la fiscalité. Le simulateur de rentabilité est devenu mon outil quotidien avec les investisseurs.",
                  rating: 5,
                },
                {
                  name: "Sophie L.",
                  role: "Conseillère chez Century 21, Paris",
                  text: "La formation ALUR 2026 m'a fait gagner un temps fou. Plus besoin de chercher les textes à jour, tout est là, clair, avec des cas pratiques que je retrouve chaque semaine.",
                  rating: 5,
                },
                {
                  name: "Karim B.",
                  role: "Créateur d'agence, Marseille",
                  text: "J'ai inscrit mes 4 collaborateurs. Le suivi de progression me permet de voir qui avance et qui bloque. L'attestation de certification rassure nos clients sur la qualité de l'équipe.",
                  rating: 5,
                },
              ].map((t, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                >
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-white/85">&ldquo;{t.text}&rdquo;</p>
                  <div className="mt-4 border-t border-white/10 pt-4">
                    <p className="text-sm font-bold text-white">{t.name}</p>
                    <p className="text-2xs text-white/50">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="border-t border-white/10 px-6 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-3 py-1 text-3xs font-bold uppercase tracking-widest text-brand-gold">
              <Sparkles className="h-3 w-3" /> Accès complet
            </p>
            <h2 className="mt-4 text-3xl font-bold">Une formation, un accès illimité</h2>
            <div className="mt-8 rounded-3xl border border-brand-gold/30 bg-gradient-to-b from-brand-gold/10 to-transparent p-8 sm:p-10">
              <p className="text-5xl font-black text-brand-gold">299 €</p>
              <p className="mt-2 text-sm text-white/60">Paiement unique — pas d&apos;abonnement</p>
              <ul className="mt-6 space-y-3 text-left text-sm text-white/85">
                {[
                  "42h de formation vidéo + audio",
                  "36 leçons avec supports téléchargeables",
                  "180 QCM certifiants + examens par module",
                  "8 simulateurs pros (crédit, rentabilité, net vendeur…)",
                  "Attestation de certification avec QR code",
                  "Mises à jour 2026 incluses à vie",
                  "Support pédagogique par email",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-gold px-10 py-4 text-base font-bold text-brand-navy shadow-2xl shadow-black/30 transition hover:bg-yellow-300 active:scale-[0.98]"
              >
                Commencer maintenant
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-3 text-2xs text-white/40">Garantie 14 jours satisfait ou remboursé</p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-white/10 px-6 py-16 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold">Prêt à former vos agents ?</h2>
            <p className="mt-4 text-white/85 text-base">
              Accédez immédiatement à l&apos;intégralité du contenu — leçons audio, QCM, simulateurs, cas pratiques et attestation de certification.
            </p>
            <Link
              href="/login"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-gold px-10 py-4 text-base font-bold text-brand-navy shadow-2xl shadow-black/30 transition hover:bg-yellow-300 active:scale-[0.98]"
            >
              Démarrer la formation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-4 text-2xs text-white/40">Accès immédiat · Mise à jour 2026 incluse · Support pédagogique</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="text-sm font-bold text-white">Formation Agent Immobilier</p>
            <p className="mt-1 text-xs text-white/50">
              42h · Certification professionnelle · Loi ALUR 2026
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-white/50">
            <Link href="/formation" className="transition hover:text-white">Parcours</Link>
            <Link href="/login" className="transition hover:text-white">Connexion</Link>
            <Link href="/register" className="transition hover:text-white">Inscription</Link>
            <Link href="/mentions-legales" className="transition hover:text-white">Mentions légales</Link>
          </div>
          <p className="text-xs text-white/30">© 2026 — Tous droits réservés</p>
        </div>
      </footer>
    </div>
  );
}
