import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  ExternalLink,
  FileCheck2,
  FolderOpen,
  Landmark,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const SITE_URL = "https://monpassformation.com";
const PAGE_PATH = "/guides/renouvellement-carte-professionnelle-immobilier";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const COVER_URL = `${SITE_URL}/generated/fal/transaction/cover-immobilier.jpg`;
const CCI_RENEWAL_URL =
  "https://www.cci.fr/ressources/formalites-en-ligne/fichier-des-professionnels-de-limmobilier/renouvellement-de-carte-professionnelle";
const LEGIFRANCE_DECREE_URL =
  "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000032080616/";
const LEGIFRANCE_ETHICS_URL =
  "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000042427805";

const title = "Renouvellement carte professionnelle immobilier : guide 2026";
const description =
  "Quand et comment renouveler sa carte professionnelle immobilière : délai de deux mois, formation continue de 42 heures et préparation du dossier CCI.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    absolute: title,
  },
  description,
  keywords: [
    "renouvellement carte professionnelle immobilier",
    "renouvellement carte agent immobilier",
    "carte T renouvellement",
    "formation 42 heures carte professionnelle",
    "CCI carte professionnelle immobilier",
    "formation loi ALUR renouvellement carte",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  category: "Formalités des professionnels de l’immobilier",
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
        alt: "Guide du renouvellement de la carte professionnelle immobilière",
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


type KeyPoint = {
  icon: LucideIcon;
  value: string;
  label: string;
  detail: string;
};

const keyPoints: KeyPoint[] = [
  {
    icon: CalendarCheck2,
    value: "3 ans",
    label: "de validité",
    detail: "Durée de validité indiquée par CCI France.",
  },
  {
    icon: Clock3,
    value: "2 mois",
    label: "avant l’échéance",
    detail: "Période dans laquelle la demande doit être réalisée.",
  },
  {
    icon: FileCheck2,
    value: "42 h",
    label: "à justifier",
    detail: "Formation continue liée à l’activité exercée.",
  },
];

const timeline = [
  {
    marker: "En amont",
    title: "Identifier la date exacte d’expiration",
    text: "Relevez la date portée sur la carte et créez un rappel suffisamment tôt pour contrôler les heures de formation et rassembler les pièces.",
  },
  {
    marker: "Avant J − 2 mois",
    title: "Préparer sans attendre la fenêtre de dépôt",
    text: "Terminez les formations manquantes, contrôlez les attestations et consultez la liste de pièces actualisée de votre CCI.",
  },
  {
    marker: "Dans les 2 mois précédents",
    title: "Déposer la demande de renouvellement",
    text: "CCI France précise que la demande doit être réalisée dans les deux mois qui précèdent la date d’expiration.",
  },
  {
    marker: "Après le dépôt",
    title: "Suivre l’instruction du dossier",
    text: "Conservez une copie complète de la demande et répondez aux éventuelles demandes de pièces de la CCI compétente.",
  },
];

const trainingRequirements = [
  {
    title: "42 heures sur trois ans",
    text: "Le dossier de renouvellement doit permettre de justifier la formation continue accomplie au cours du cycle concerné.",
  },
  {
    title: "Un lien direct avec l’activité",
    text: "Les thèmes retenus doivent correspondre à l’activité immobilière effectivement exercée.",
  },
  {
    title: "2 heures de non-discrimination",
    text: "Elles portent spécifiquement sur la non-discrimination à l’accès au logement.",
  },
  {
    title: "2 heures d’autres règles déontologiques",
    text: "Elles complètent les deux heures précédentes, soit quatre heures de déontologie sur le cycle.",
  },
];

const dossierSteps = [
  {
    icon: Landmark,
    title: "Repérer la CCI compétente",
    text: "La formalité est instruite par la CCI compétente pour votre situation. Utilisez les indications officielles pour sélectionner le bon interlocuteur.",
  },
  {
    icon: ClipboardCheck,
    title: "Télécharger les documents à jour",
    text: "CCI France donne accès au formulaire, à sa notice et à la liste des pièces justificatives depuis sa page de renouvellement.",
  },
  {
    icon: FolderOpen,
    title: "Classer les justificatifs de formation",
    text: "Vérifiez que chaque attestation mentionne notamment les objectifs, le contenu, la durée et la date de réalisation.",
  },
  {
    icon: ShieldCheck,
    title: "Contrôler les autres conditions",
    text: "La formation n’est qu’une condition du renouvellement. Consultez la liste officielle applicable à votre statut, vos activités et votre situation.",
  },
];

const commonMistakes = [
  "Confondre la fin de la formation avec le renouvellement automatique de la carte.",
  "Attendre l’ouverture de la fenêtre de dépôt pour rechercher les attestations.",
  "Oublier les 2 heures de non-discrimination ou les 2 heures d’autres règles déontologiques.",
  "Présenter un contenu sans lien direct avec l’activité immobilière exercée.",
  "Utiliser une ancienne liste de pièces sans vérifier la page de la CCI.",
];

const faqs = [
  {
    question: "Quelle est la durée de validité de la carte professionnelle immobilière ?",
    answer:
      "CCI France indique une durée de validité de trois ans. La date précise à retenir est celle inscrite sur votre carte.",
  },
  {
    question: "Quand déposer la demande de renouvellement ?",
    answer:
      "La demande doit être réalisée dans les deux mois précédant la date d’expiration. Les formations et la préparation du dossier peuvent, et devraient, être anticipées avant cette période.",
  },
  {
    question: "Combien d’heures de formation faut-il justifier ?",
    answer:
      "CCI France indique 42 heures de formation continue en lien direct avec l’activité exercée. Sur trois années consécutives, le cadre prévoit aussi 2 heures sur la non-discrimination à l’accès au logement et 2 heures sur les autres règles déontologiques.",
  },
  {
    question: "Les 42 heures renouvellent-elles automatiquement la carte ?",
    answer:
      "Non. Les justificatifs de formation font partie du dossier, mais une demande de renouvellement doit être déposée et les autres conditions applicables doivent être satisfaites.",
  },
  {
    question: "Que se passe-t-il si la demande est déposée trop tard ?",
    answer:
      "CCI France avertit que, lorsque le renouvellement n’est pas présenté dans les délais, les informations du titulaire sont radiées du fichier des professionnels de l’immobilier. Contactez rapidement la CCI compétente pour connaître la procédure adaptée.",
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
          name: "Carte professionnelle immobilière",
        },
        {
          "@type": "Thing",
          name: "Formation continue loi ALUR",
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
          name: "Renouvellement de la carte professionnelle immobilière",
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

export default function RenouvellementCarteProfessionnelleImmobilierPage() {
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
                    Renouvellement de la carte professionnelle
                  </li>
                </ol>
              </nav>

              <div className="mt-9 max-w-4xl">
                <p className="inline-flex rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-brand-gold-pale">
                  Guide pratique 2026
                </p>
                <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                  Renouvellement de la carte professionnelle immobilière
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl">
                  Délai, formation continue et préparation du dossier&nbsp;:
                  les repères essentiels pour anticiper votre demande auprès
                  de la CCI.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#calendrier"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gold px-5 py-3.5 text-sm font-black text-brand-navy transition hover:bg-brand-gold-hover"
                  >
                    Voir le calendrier
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <a
                    href={CCI_RENEWAL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    Accéder à CCI France
                    <ExternalLink className="h-4 w-4" aria-hidden />
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section aria-label="Chiffres clés" className="relative z-10 mx-auto -mt-7 max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 md:grid-cols-3">
              {keyPoints.map((point) => {
                const Icon = point.icon;

                return (
                  <div
                    key={point.value}
                    className="flex gap-4 border-b border-slate-200 p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-gold/15 text-brand-navy">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <p className="text-2xl font-black text-brand-navy">
                        {point.value}{" "}
                        <span className="text-base text-slate-600">{point.label}</span>
                      </p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{point.detail}</p>
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
                    ["#essentiel", "L’essentiel"],
                    ["#calendrier", "Calendrier"],
                    ["#formation", "42 h de formation"],
                    ["#dossier", "Préparer le dossier"],
                    ["#retard", "Demande tardive"],
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
              <section id="essentiel" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  À retenir
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy sm:text-4xl">
                  Une carte valable trois ans, à renouveler auprès de la CCI
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
                  <p>
                    Selon{" "}
                    <SourceLink href={CCI_RENEWAL_URL}>CCI France</SourceLink>,
                    la carte professionnelle immobilière est valable trois ans
                    et la demande de renouvellement doit être réalisée{" "}
                    <strong>dans les deux mois précédant sa date d’expiration</strong>.
                  </p>
                  <p>
                    Le renouvellement est soumis, entre autres conditions, à la
                    justification de <strong>42 heures de formation continue</strong>{" "}
                    en lien direct avec l’activité exercée. Terminer ces heures
                    ne renouvelle pas automatiquement la carte&nbsp;: il faut
                    effectuer la formalité et présenter les pièces attendues.
                  </p>
                </div>
                <div className="mt-7 rounded-2xl border-l-4 border-brand-gold bg-white p-6 shadow-sm">
                  <div className="flex gap-4">
                    <CalendarCheck2 className="mt-1 h-6 w-6 shrink-0 text-brand-gold-dark" aria-hidden />
                    <div>
                      <h3 className="font-black text-brand-navy">
                        La bonne distinction
                      </h3>
                      <p className="mt-2 leading-7 text-slate-700">
                        Vous pouvez préparer le dossier bien avant l’échéance.
                        C’est la <strong>demande</strong> qui doit être réalisée
                        pendant les deux mois précédant l’expiration.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="calendrier" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Anticipation
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Calendrier du renouvellement
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700">
                  Le délai officiel concerne le dépôt, mais les formations et
                  la collecte des pièces gagnent à être organisées plusieurs
                  mois auparavant.
                </p>
                <ol className="relative mt-8 space-y-5 before:absolute before:bottom-6 before:left-[22px] before:top-6 before:w-px before:bg-slate-300 sm:before:left-[94px]">
                  {timeline.map((step, index) => (
                    <li
                      key={step.title}
                      className="relative grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:grid-cols-[148px_1fr] sm:p-6"
                    >
                      <div className="relative z-10 flex items-center gap-3 sm:items-start">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-navy text-xs font-black text-white">
                          {index + 1}
                        </span>
                        <span className="pt-2 text-xs font-black uppercase tracking-wide text-brand-gold-dark sm:max-w-20">
                          {step.marker}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-brand-navy">{step.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              <section id="formation" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Condition de formation
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Les 42 heures à justifier
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-700">
                  Le{" "}
                  <SourceLink href={LEGIFRANCE_DECREE_URL}>
                    décret n°&nbsp;2016-173
                  </SourceLink>{" "}
                  fixe la formation continue à 14 heures par an ou 42 heures
                  au cours de trois années consécutives d’exercice. Pour le
                  dossier de renouvellement, CCI France indique 42 heures en
                  lien direct avec l’activité exercée.
                </p>
                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {trainingRequirements.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      <CheckCircle2 className="h-6 w-6 text-brand-gold-dark" aria-hidden />
                      <h3 className="mt-4 text-lg font-black text-brand-navy">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-7 flex flex-col items-start justify-between gap-5 rounded-2xl border border-brand-gold/30 bg-brand-gold/10 p-6 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="font-black text-brand-navy">
                      Besoin de revoir toutes les règles de formation&nbsp;?
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      Public concerné, thèmes recevables, déontologie et
                      justificatifs sont détaillés dans le guide des 42 heures.
                    </p>
                  </div>
                  <Link
                    href="/guides/formation-loi-alur-42-heures"
                    className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-navy px-4 py-3 text-sm font-black text-white transition hover:bg-brand-navy-mid"
                  >
                    Guide formation 42 h
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </section>

              <section id="dossier" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Pièces et formalité
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Préparer le dossier de renouvellement
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-700">
                  Les pièces à produire dépendent notamment de la forme
                  juridique, des activités exercées et de la situation du
                  demandeur. La liste publiée par la CCI compétente reste la
                  référence au moment du dépôt.
                </p>
                <div className="mt-7 grid gap-4 md:grid-cols-2">
                  {dossierSteps.map((step) => {
                    const Icon = step.icon;

                    return (
                      <div
                        key={step.title}
                        className="rounded-2xl border border-slate-200 bg-white p-6"
                      >
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-navy/5">
                          <Icon className="h-5 w-5 text-brand-navy" aria-hidden />
                        </span>
                        <h3 className="mt-5 text-lg font-black text-brand-navy">{step.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">{step.text}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-8 rounded-2xl bg-brand-navy p-6 text-white sm:p-8">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="max-w-2xl">
                      <ClipboardCheck className="h-7 w-7 text-brand-gold" aria-hidden />
                      <h3 className="mt-4 text-xl font-black">
                        Utiliser la liste officielle au jour du dépôt
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-white/75">
                        La page CCI France centralise l’accès au formulaire, à
                        la notice, à la liste des justificatifs et à la
                        formalité en ligne.
                      </p>
                    </div>
                    <a
                      href={CCI_RENEWAL_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-gold px-5 py-3.5 text-sm font-black text-brand-navy transition hover:bg-brand-gold-hover"
                    >
                      Consulter CCI France
                      <ExternalLink className="h-4 w-4" aria-hidden />
                    </a>
                  </div>
                </div>
              </section>

              <section>
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Points de vigilance
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Cinq erreurs à éviter
                </h2>
                <ul className="mt-7 space-y-3">
                  {commonMistakes.map((mistake) => (
                    <li
                      key={mistake}
                      className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-700"
                    >
                      <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-brand-gold-dark" aria-hidden />
                      {mistake}
                    </li>
                  ))}
                </ul>
              </section>

              <section id="retard" className="scroll-mt-8">
                <div className="rounded-2xl border border-amber-300 bg-amber-50 p-6 sm:p-8">
                  <div className="flex gap-4">
                    <AlertTriangle className="mt-1 h-7 w-7 shrink-0 text-amber-700" aria-hidden />
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.14em] text-amber-800">
                        Demande hors délai
                      </p>
                      <h2 className="mt-2 text-2xl font-black text-brand-navy">
                        Ne laissez pas passer la date d’expiration
                      </h2>
                      <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                        <p>
                          CCI France avertit que, si le renouvellement n’est pas
                          présenté dans les délais, les informations du titulaire
                          sont radiées du fichier des professionnels de l’immobilier.
                        </p>
                        <p>
                          La même source indique qu’une régularisation dans
                          l’année suivant l’expiration passe par une formalité de
                          renouvellement comprenant notamment les justificatifs
                          de formation. La date de début de validité dépend alors
                          du retard et des éléments du dossier.
                        </p>
                        <p className="font-bold text-brand-navy">
                          Si votre carte est déjà expirée, contactez sans attendre
                          la CCI compétente pour obtenir une réponse adaptée à
                          votre situation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="faq" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Questions fréquentes
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Renouvellement de carte immobilière&nbsp;: FAQ
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
                      <SourceLink href={CCI_RENEWAL_URL}>
                        Renouvellement de carte professionnelle — CCI France
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Durée de validité, période de dépôt, formation et accès aux documents.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={LEGIFRANCE_DECREE_URL}>
                        Décret n°&nbsp;2016-173 du 18 février 2016 — Légifrance
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Durée, contenu et justificatifs de la formation continue.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={LEGIFRANCE_ETHICS_URL}>
                        Décret n°&nbsp;2020-1259 du 14 octobre 2020 — Légifrance
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Répartition des heures de déontologie et de non-discrimination.
                      </p>
                    </li>
                  </ul>
                  <p className="mt-6 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500">
                    Informations vérifiées le 28 juillet 2026. Ce guide présente
                    le cadre général et ne remplace ni les textes officiels ni
                    l’instruction de votre dossier par la CCI compétente.
                  </p>
                </div>
              </section>

              <section className="overflow-hidden rounded-3xl bg-brand-navy p-7 text-white sm:p-10">
                <div className="flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
                  <div className="max-w-2xl">
                    <FileCheck2 className="h-8 w-8 text-brand-gold" aria-hidden />
                    <h2 className="mt-5 text-2xl font-black sm:text-3xl">
                      Consulter le parcours de formation immobilière
                    </h2>
                    <p className="mt-3 leading-7 text-white/75">
                      Examinez le programme, les modules et les modalités pour
                      déterminer s’ils correspondent à vos besoins et aux
                      heures qu’il vous reste à accomplir.
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
                    href="/guides/formation-loi-alur-42-heures"
                    className="transition hover:text-brand-navy"
                  >
                    Guide des 42 heures
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
