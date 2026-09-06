import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileCheck2,
  Scale,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

const SITE_URL = "https://monpassformation.com";
const PAGE_PATH = "/guides/prix-renouvellement-carte-t";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const COVER_URL = `${SITE_URL}/generated/fal/transaction/cover-immobilier.jpg`;
const LEGIFRANCE_DECREE_URL =
  "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000032080616/";
const LEGIFRANCE_ETHICS_URL =
  "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000042427805";
const CCI_RENEWAL_URL =
  "https://www.cci.fr/ressources/formalites-en-ligne/fichier-des-professionnels-de-limmobilier/renouvellement-de-carte-professionnelle";

const title = "Formation Loi ALUR 42h (Obligatoire) : Le Guide 2026";
const description =
  "Découvrez comment valider votre formation loi ALUR 42h obligatoire. Durée, thèmes, déontologie, TRACFIN, renouvellement carte T et justificatifs CCI.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    absolute: title,
  },
  description,
  keywords: [
    "formation loi ALUR 42 heures",
    "formation ALUR immobilier",
    "formation continue agent immobilier",
    "obligation formation loi ALUR",
    "renouvellement carte professionnelle immobilier",
    "formation déontologie immobilier",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  category: "Formation professionnelle immobilière",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title,
    description,
    url: PAGE_URL,
    siteName: "MonPassFormation",
    locale: "fr_FR",
    type: "article",
    publishedTime: "2026-07-28",
    modifiedTime: "2026-07-28",
    images: [
      {
        url: COVER_URL,
        width: 1024,
        height: 576,
        alt: "Guide de la formation loi ALUR de 42 heures",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [COVER_URL],
  },
};


type Fact = {
  icon: LucideIcon;
  value: string;
  label: string;
  detail: string;
};

const keyFacts: Fact[] = [
  {
    icon: Clock3,
    value: "42 h",
    label: "sur trois ans",
    detail: "Au cours de trois années consécutives d’exercice.",
  },
  {
    icon: CalendarDays,
    value: "14 h",
    label: "par an",
    detail: "L’autre rythme prévu par le décret.",
  },
  {
    icon: ShieldCheck,
    value: "4 h",
    label: "de déontologie",
    detail: "Dont 2 h sur la non-discrimination à l’accès au logement.",
  },
];

const audiences = [
  {
    title: "Titulaires de la carte professionnelle",
    text: "Sont concernés les titulaires de la carte et, pour une personne morale, son représentant légal et statutaire.",
  },
  {
    title: "Directions d’établissement",
    text: "L’obligation vise aussi les personnes qui dirigent un établissement, une succursale, une agence ou un bureau.",
  },
  {
    title: "Collaborateurs habilités",
    text: "Les salariés et indépendants habilités par le titulaire à négocier, s’entremettre ou s’engager pour son compte sont également concernés.",
  },
];

const eligibleThemes = [
  "Droit applicable à l’activité immobilière",
  "Économie et environnement du marché",
  "Pratiques commerciales directement liées au métier",
  "Déontologie des professionnels de l’immobilier",
  "Construction, habitation et urbanisme",
  "Transition énergétique",
];

const planningSteps = [
  {
    title: "Recenser les heures déjà effectuées",
    text: "Rassemblez les attestations et vérifiez leurs dates, leur durée, leur contenu et la période de trois années concernée.",
  },
  {
    title: "Contrôler les quatre heures obligatoires",
    text: "Le cycle doit comprendre 2 h sur la non-discrimination à l’accès au logement et 2 h sur les autres règles déontologiques.",
  },
  {
    title: "Choisir des thèmes liés à l’activité",
    text: "Le contenu retenu doit avoir un lien direct avec l’activité professionnelle réellement exercée.",
  },
  {
    title: "Conserver chaque justificatif",
    text: "L’attestation doit notamment mentionner les objectifs, le contenu, la durée et la date de réalisation de l’activité.",
  },
  {
    title: "Anticiper la formalité CCI",
    text: "Pour une carte arrivant à échéance, préparez les justificatifs avant l’ouverture de la période de dépôt de la demande.",
  },
];

const faqs = [
  {
    question: "Faut-il suivre exactement 14 heures chaque année ?",
    answer:
      "Le décret fixe la durée à 14 heures par an ou 42 heures au cours de trois années consécutives d’exercice. Le rythme annuel aide à répartir la charge, mais le texte prévoit bien ces deux modalités.",
  },
  {
    question: "Les 42 heures peuvent-elles porter sur n’importe quel sujet ?",
    answer:
      "Non. Les activités doivent concerner les domaines admis par le décret et présenter un lien direct avec l’activité professionnelle exercée. Les obligations spécifiques de déontologie et de non-discrimination doivent aussi être respectées.",
  },
  {
    question: "Combien d’heures de déontologie sont obligatoires ?",
    answer:
      "Sur trois années consécutives, il faut au moins 2 heures consacrées à la non-discrimination à l’accès au logement et au moins 2 heures portant sur les autres règles déontologiques, soit 4 heures au total.",
  },
  {
    question: "Une attestation de formation suffit-elle à renouveler la carte ?",
    answer:
      "Elle sert à justifier la formation continue, mais le renouvellement reste une formalité distincte soumise à d’autres conditions et pièces. Il faut consulter la liste actualisée de la CCI compétente.",
  },
  {
    question: "Quand demander le renouvellement de la carte professionnelle ?",
    answer:
      "CCI France indique que la demande doit être réalisée dans les deux mois précédant la date d’expiration de la carte. La préparation des formations et des pièces doit donc commencer en amont.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${PAGE_URL}#article`,
      headline: title,
      description,
      image: COVER_URL,
      datePublished: "2026-07-28",
      dateModified: "2026-07-28",
      inLanguage: "fr-FR",
      isAccessibleForFree: true,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": PAGE_URL,
      },
      author: {
        "@type": "Organization",
        name: "MonPassFormation",
        url: SITE_URL,
      },
      publisher: {
        "@type": "Organization",
        name: "MonPassFormation",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/images/pass-formation-logo.svg`,
        },
      },
      about: [
        {
          "@type": "Thing",
          name: "Formation continue des professionnels de l’immobilier",
        },
        {
          "@type": "Thing",
          name: "Loi ALUR",
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Accueil",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Guides",
          item: `${SITE_URL}/guides`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Formation loi ALUR 42 heures",
          item: PAGE_URL,
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

function SourceLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 font-bold text-brand-navy underline decoration-brand-gold/60 decoration-2 underline-offset-4 transition hover:text-brand-navy-mid"
    >
      {children}
      <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
    </a>
  );
}

export default function FormationLoiAlur42HeuresPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <div className="min-h-screen bg-slate-50 text-slate-950">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-black text-brand-navy transition hover:text-brand-navy-mid"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              MonPassFormation
            </Link>
            <Link
              href="/formation-immobiliere-loi-alur"
              className="rounded-xl bg-brand-navy px-4 py-2.5 text-sm font-black text-white transition hover:bg-brand-navy-mid"
            >
              Voir la formation
            </Link>
          </div>
        </header>

        <main>
          <section className="relative overflow-hidden bg-brand-navy-hero text-white">
            <div
              className="absolute inset-0 opacity-40"
              aria-hidden
              style={{
                backgroundImage:
                  "radial-gradient(circle at 15% 10%, rgba(212,175,55,.34), transparent 28%), radial-gradient(circle at 88% 84%, rgba(45,90,135,.8), transparent 34%)",
              }}
            />
            <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
              <nav aria-label="Fil d’Ariane" className="text-sm text-white/70">
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link href="/" className="transition hover:text-white">
                      Accueil
                    </Link>
                  </li>
                  <li aria-hidden>/</li>
                  <li>
                    <Link href="/guides" className="transition hover:text-white">
                      Guides
                    </Link>
                  </li>
                  <li aria-hidden>/</li>
                  <li aria-current="page" className="font-semibold text-white">
                    Formation loi ALUR 42 heures
                  </li>
                </ol>
              </nav>

              <div className="mt-9 max-w-4xl">
                <p className="inline-flex rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-brand-gold-pale">
                  Guide réglementaire 2026
                </p>
                <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                  Formation loi ALUR 42 heures&nbsp;: les obligations à connaître
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl">
                  À qui s’adresse l’obligation, comment répartir les heures et
                  quels justificatifs conserver&nbsp;? Voici le cadre pratique,
                  fondé sur les textes officiels.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#comprendre"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gold px-5 py-3.5 text-sm font-black text-brand-navy transition hover:bg-brand-gold-hover"
                  >
                    Comprendre les 42 heures
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <a
                    href={LEGIFRANCE_DECREE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    Lire le décret sur Légifrance
                    <ExternalLink className="h-4 w-4" aria-hidden />
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section aria-label="Chiffres clés" className="relative z-10 mx-auto -mt-7 max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 md:grid-cols-3">
              {keyFacts.map((fact) => {
                const Icon = fact.icon;

                return (
                  <div
                    key={fact.value}
                    className="flex gap-4 border-b border-slate-200 p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-gold/15 text-brand-navy">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <p className="text-2xl font-black text-brand-navy">
                        {fact.value}{" "}
                        <span className="text-base text-slate-600">{fact.label}</span>
                      </p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{fact.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-[240px_minmax(0,1fr)] lg:px-8">
            <aside className="lg:sticky lg:top-6 lg:self-start">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-brand-gold-dark">
                Dans ce guide
              </p>
              <nav aria-label="Sommaire" className="mt-4">
                <ul className="space-y-1 text-sm">
                  {[
                    ["#comprendre", "Comprendre les 42 h"],
                    ["#personnes-concernees", "Personnes concernées"],
                    ["#contenu", "Contenu obligatoire"],
                    ["#organiser", "Organiser son cycle"],
                    ["#justificatifs", "Justificatifs"],
                    ["#faq", "Questions fréquentes"],
                    ["#sources", "Sources officielles"],
                  ].map(([href, label]) => (
                    <li key={href}>
                      <a
                        href={href}
                        className="block rounded-lg px-3 py-2 font-semibold text-slate-600 transition hover:bg-white hover:text-brand-navy"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            <article className="min-w-0 space-y-14">
              <section id="comprendre" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Le principe
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy sm:text-4xl">
                  14 heures par an ou 42 heures sur trois ans
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
                  <p>
                    La formation continue des professionnels de l’immobilier est
                    une obligation professionnelle. Elle vise la mise à jour et
                    le perfectionnement des connaissances et compétences utiles
                    à l’exercice du métier.
                  </p>
                  <p>
                    L’article 2 du{" "}
                    <SourceLink href={LEGIFRANCE_DECREE_URL}>
                      décret n°&nbsp;2016-173 du 18 février 2016
                    </SourceLink>{" "}
                    fixe une durée de <strong>14 heures par an</strong> ou de{" "}
                    <strong>42 heures au cours de trois années consécutives d’exercice</strong>.
                    Il ne s’agit donc pas de deux obligations à additionner,
                    mais de deux rythmes prévus par le texte.
                  </p>
                </div>

                <div className="mt-7 rounded-2xl border-l-4 border-brand-gold bg-white p-6 shadow-sm">
                  <div className="flex gap-4">
                    <Scale className="mt-1 h-6 w-6 shrink-0 text-brand-gold-dark" aria-hidden />
                    <div>
                      <h3 className="font-black text-brand-navy">
                        Pour le renouvellement de la carte
                      </h3>
                      <p className="mt-2 leading-7 text-slate-700">
                        CCI France présente le renouvellement comme soumis,
                        entre autres conditions, à 42 heures de formation
                        continue en lien direct avec l’activité exercée. La
                        formation prépare un justificatif réglementaire&nbsp;;
                        elle ne remplace pas la demande administrative.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="personnes-concernees" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Public concerné
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Qui doit suivre la formation continue&nbsp;?
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700">
                  L’obligation ne concerne pas uniquement la personne dont le
                  nom figure sur la carte. Le décret distingue trois catégories
                  de professionnels.
                </p>
                <div className="mt-7 grid gap-4 md:grid-cols-3">
                  {audiences.map((audience, index) => (
                    <div
                      key={audience.title}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-sm font-black text-white">
                        {index + 1}
                      </span>
                      <h3 className="mt-5 text-lg font-black text-brand-navy">
                        {audience.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {audience.text}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-5 flex gap-3 rounded-xl bg-brand-navy/5 p-4 text-sm leading-6 text-slate-700">
                  <Users className="mt-0.5 h-5 w-5 shrink-0 text-brand-navy" aria-hidden />
                  En cas de doute sur votre situation ou sur la période à
                  justifier, rapprochez-vous de la CCI compétente avant de
                  constituer votre programme.
                </p>
              </section>

              <section id="contenu" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Programme recevable
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Quels contenus peuvent compter dans les 42 heures&nbsp;?
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-700">
                  Les activités doivent porter sur des domaines prévus par le
                  décret et avoir un <strong>lien direct avec l’activité exercée</strong>.
                  Les thèmes admis couvrent notamment&nbsp;:
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {eligibleThemes.map((theme) => (
                    <li
                      key={theme}
                      className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold leading-6 text-slate-700"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold-dark" aria-hidden />
                      {theme}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 overflow-hidden rounded-2xl bg-brand-navy text-white">
                  <div className="grid gap-0 md:grid-cols-[1fr_1.35fr]">
                    <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-8">
                      <p className="text-4xl font-black text-brand-gold">4 heures</p>
                      <p className="mt-2 font-bold">de déontologie sur le cycle</p>
                    </div>
                    <div className="p-6 md:p-8">
                      <p className="leading-7 text-white/80">
                        Depuis la modification entrée en vigueur en 2021, le
                        cycle comprend au moins <strong className="text-white">2 heures sur
                        la non-discrimination à l’accès au logement</strong> et au
                        moins <strong className="text-white">2 heures sur les autres
                        règles déontologiques</strong>.
                      </p>
                      <p className="mt-4 text-sm text-white/70">
                        Source&nbsp;:{" "}
                        <a
                          href={LEGIFRANCE_ETHICS_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-brand-gold-pale underline underline-offset-4"
                        >
                          décret n°&nbsp;2020-1259 sur Légifrance
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="organiser" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Méthode pratique
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Comment organiser son cycle de formation&nbsp;?
                </h2>
                <ol className="mt-7 space-y-4">
                  {planningSteps.map((step, index) => (
                    <li
                      key={step.title}
                      className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-[44px_1fr] sm:p-6"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gold/15 font-black text-brand-navy">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="text-lg font-black text-brand-navy">{step.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-7 flex flex-col items-start justify-between gap-5 rounded-2xl border border-brand-gold/30 bg-brand-gold/10 p-6 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="font-black text-brand-navy">
                      Besoin de préparer votre échéance&nbsp;?
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      Le guide dédié détaille le calendrier et les points à
                      vérifier pour la formalité.
                    </p>
                  </div>
                  <Link
                    href="/guides/renouvellement-carte-professionnelle-immobilier"
                    className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-navy px-4 py-3 text-sm font-black text-white transition hover:bg-brand-navy-mid"
                  >
                    Guide du renouvellement
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </section>

              <section id="justificatifs" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Traçabilité
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Quels justificatifs conserver&nbsp;?
                </h2>
                <div className="mt-6 grid gap-6 md:grid-cols-[1.3fr_1fr]">
                  <div className="space-y-5 text-base leading-8 text-slate-700">
                    <p>
                      L’organisme de formation délivre une attestation à la
                      personne qui a accompli l’activité. Le décret prévoit que
                      ce document mentionne les <strong>objectifs</strong>, le{" "}
                      <strong>contenu</strong>, la <strong>durée</strong> et la{" "}
                      <strong>date de réalisation</strong>.
                    </p>
                    <p>
                      Vérifiez ces mentions dès réception et archivez
                      l’attestation avec les autres pièces de votre cycle. Les
                      titulaires transmettent leurs justificatifs à la CCI,
                      après chaque formation ou au plus tard au moment de la
                      demande de renouvellement.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <FileCheck2 className="h-8 w-8 text-brand-gold-dark" aria-hidden />
                    <h3 className="mt-5 font-black text-brand-navy">
                      Contrôle rapide d’une attestation
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm text-slate-700">
                      {["Objectifs", "Contenu", "Durée", "Date de réalisation"].map(
                        (item) => (
                          <li key={item} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-brand-navy" aria-hidden />
                            {item}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>
              </section>

              <section id="faq" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Questions fréquentes
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Formation loi ALUR 42 heures&nbsp;: FAQ
                </h2>
                <div className="mt-7 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  {faqs.map((faq) => (
                    <details key={faq.question} className="group p-5 sm:p-6">
                      <summary className="cursor-pointer list-none pr-7 font-black text-brand-navy marker:content-none">
                        {faq.question}
                      </summary>
                      <p className="mt-4 text-sm leading-7 text-slate-600">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </section>

              <section id="sources" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Références
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Sources officielles
                </h2>
                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                  <ul className="space-y-5 text-sm leading-7 text-slate-700">
                    <li>
                      <SourceLink href={LEGIFRANCE_DECREE_URL}>
                        Décret n°&nbsp;2016-173 du 18 février 2016 — Légifrance
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Personnes concernées, durée, activités recevables et justificatifs.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={LEGIFRANCE_ETHICS_URL}>
                        Décret n°&nbsp;2020-1259 du 14 octobre 2020 — Légifrance
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Intégration de la non-discrimination à l’accès au logement.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={CCI_RENEWAL_URL}>
                        Renouvellement de carte professionnelle — CCI France
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Durée de validité, période de dépôt et accès à la formalité.
                      </p>
                    </li>
                  </ul>
                  <p className="mt-6 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500">
                    Informations vérifiées le 28 juillet 2026. Ce guide présente
                    le cadre général et ne remplace ni les textes officiels ni
                    l’examen de votre dossier par la CCI compétente.
                  </p>
                </div>
              </section>

              <section className="overflow-hidden rounded-3xl bg-brand-navy p-7 text-white sm:p-10">
                <div className="flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
                  <div className="max-w-2xl">
                    <BookOpen className="h-8 w-8 text-brand-gold" aria-hidden />
                    <h2 className="mt-5 text-2xl font-black sm:text-3xl">
                      Consulter le parcours de formation immobilière
                    </h2>
                    <p className="mt-3 leading-7 text-white/75">
                      Découvrez le programme, ses modules et ses modalités afin
                      de vérifier s’ils correspondent à votre activité et à
                      votre calendrier.
                    </p>
                  </div>
                  <Link
                    href="/formation-immobiliere-loi-alur"
                    className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-gold px-5 py-3.5 text-sm font-black text-brand-navy transition hover:bg-brand-gold-hover"
                  >
                    Voir la formation loi ALUR
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </section>
            </article>
          </div>
        </main>

        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-slate-600 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
            <p className="font-bold text-brand-navy">MonPassFormation</p>
            <nav aria-label="Navigation de pied de page">
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                <li>
                  <Link href="/" className="transition hover:text-brand-navy">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link
                    href="/formation-immobiliere-loi-alur"
                    className="transition hover:text-brand-navy"
                  >
                    Formation loi ALUR
                  </Link>
                </li>
                <li>
                  <Link
                    href="/guides/renouvellement-carte-professionnelle-immobilier"
                    className="transition hover:text-brand-navy"
                  >
                    Renouveler sa carte
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </footer>
      </div>
    </>
  );
}
