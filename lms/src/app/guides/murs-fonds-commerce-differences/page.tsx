import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle2,
  ExternalLink,
  Scale,
  Store,
  Users,
  type LucideIcon,
} from "lucide-react";

const SITE_URL = "https://monpassformation.com";
const PAGE_PATH = "/guides/murs-fonds-commerce-differences";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const COVER_URL = `${SITE_URL}/generated/fal/transaction/cover-immobilier.jpg`;
const CODE_COMMERCE_BAUX_URL =
  "https://www.legifrance.gouv.fr/codes/id/LEGISCTA000006146040/";
const ENTREPRENDRE_CESSION_FONDS_URL =
  "https://entreprendre.service-public.fr/vosdroits/F37197";
const ENTREPRENDRE_CESSION_BAIL_URL =
  "https://entreprendre.service-public.fr/vosdroits/F32781";

const title = "Acheter les murs ou le fonds de commerce : le guide des différences";
const description =
  "Définitions, droit au bail, bail commercial, évaluation et rôle de l’agent immobilier : tout comprendre avant d’acheter les murs ou le fonds de commerce d’un local.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    absolute: title,
  },
  description,
  keywords: [
    "acheter murs ou fonds de commerce",
    "différence murs et fonds de commerce",
    "droit au bail",
    "bail commercial",
    "évaluation fonds de commerce",
    "cession fonds de commerce",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  category: "Immobilier d’entreprise et droit commercial",
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
    publishedTime: "2026-07-31",
    modifiedTime: "2026-07-31",
    images: [
      {
        url: COVER_URL,
        width: 1024,
        height: 576,
        alt: "Différences entre l’achat des murs et du fonds de commerce",
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

const faqs = [
  {
    question: "Peut-on acheter un fonds de commerce sans acheter les murs ?",
    answer:
      "Oui, c’est même le cas le plus fréquent. L’exploitant cède son fonds — clientèle, enseigne, droit au bail, matériel — tandis que le propriétaire des murs conserve son immeuble. Le repreneur devient locataire du local dans le cadre du bail commercial.",
  },
  {
    question: "Le droit au bail peut-il exister sans fonds de commerce ?",
    answer:
      "Non. Le droit au bail est un élément du fonds de commerce : il suppose l’exploitation d’un fonds dans les locaux. Il n’existe pas de droit au bail sur les murs seuls, indépendamment de toute exploitation commerciale.",
  },
  {
    question: "Quelle est la différence de logique entre les deux investissements ?",
    answer:
      "Acheter les murs relève d’une logique de patrimoine immobilier : revenus locatifs, emplacement, valorisation du bien. Acheter le fonds relève d’une logique d’exploitation : clientèle, chiffre d’affaires, rentabilité de l’activité. Les risques et les modes d’évaluation sont distincts.",
  },
  {
    question: "Quelle mention doit figurer sur la carte de l’agent immobilier ?",
    answer:
      "Pour intervenir dans la cession de fonds de commerce comme dans la vente d’immeubles, l’agent doit être titulaire de la carte professionnelle portant la mention « Transactions sur immeubles et fonds de commerce », délivrée dans le cadre de la loi Hoguet.",
  },
  {
    question: "Le bailleur peut-il empêcher la cession du bail avec le fonds ?",
    answer:
      "En principe non : l’article L. 145-16 du code de commerce répute non écrites les clauses qui interdiraient au locataire de céder son bail à l’acquéreur de son fonds de commerce. La cession du bail suit donc la cession du fonds, sous réserve des conditions légales.",
  },
  {
    question: "De quoi se compose un fonds de commerce ?",
    answer:
      "La clientèle en est l’élément essentiel. S’y ajoutent classiquement l’enseigne et le nom commercial, le droit au bail, le matériel et le mobilier d’exploitation, les marchandises, ainsi que certains contrats et droits attachés à l’exploitation.",
  },
  {
    question: "Peut-on acheter en même temps les murs et le fonds ?",
    answer:
      "Oui. L’acquisition globale est possible et pratiquée, notamment par les exploitants souhaitant sécuriser leur outil. Les deux composantes doivent toutefois être évaluées séparément, car elles obéissent à des logiques de prix différentes.",
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
      datePublished: "2026-07-31",
      dateModified: "2026-07-31",
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
          name: "Fonds de commerce",
        },
        {
          "@type": "Thing",
          name: "Bail commercial",
        },
        {
          "@type": "Thing",
          name: "Droit au bail",
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
          name: "Murs ou fonds de commerce",
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

type Fact = {
  icon: LucideIcon;
  value: string;
  label: string;
  detail: string;
};

const keyFacts: Fact[] = [
  {
    icon: Building2,
    value: "Les murs",
    label: "propriété immobilière",
    detail: "L’acquéreur devient propriétaire du local commercial et perçoit les loyers du bail en cours.",
  },
  {
    icon: Store,
    value: "Le fonds",
    label: "clientèle et exploitation",
    detail: "L’acquéreur reprend la clientèle, l’enseigne, le matériel et le droit au bail.",
  },
  {
    icon: Scale,
    value: "Droit au bail",
    label: "élément du fonds",
    detail: "Il n’existe pas de droit au bail sur les murs seuls, sans exploitation d’un fonds.",
  },
];

const audiences = [
  {
    title: "L’investisseur patrimonial",
    text: "Vous cherchez un rendement locatif et une valorisation à long terme : l’achat des murs vous donne la propriété du local et les loyers du bail commercial.",
  },
  {
    title: "Le repreneur exploitant",
    text: "Vous souhaitez exploiter une activité : l’achat du fonds vous donne la clientèle, l’enseigne et le droit d’occuper les lieux grâce au bail commercial.",
  },
  {
    title: "L’acquéreur global",
    text: "Vous voulez exploiter et posséder : l’achat conjoint des murs et du fonds sécurise durablement votre outil d’exploitation, moyennant deux évaluations distinctes.",
  },
];

const mursCriteria = [
  "Emplacement et visibilité du local commercial",
  "Qualité et solidité du bail commercial en cours",
  "Montant du loyer et perspectives de révision",
  "État de l’immeuble et travaux à prévoir",
];

const fondsCriteria = [
  "Clientèle : chiffre d’affaires, fidélité, saisonnalité",
  "Rentabilité réelle et régularité des résultats",
  "Durée restante du bail et conditions de renouvellement",
  "Matériel, stocks et contrats repris avec le fonds",
];

const planningSteps = [
  {
    title: "Définir votre objectif",
    text: "Investissement locatif ou reprise d’exploitation ? La réponse détermine si vous devez viser les murs, le fonds, ou les deux, et oriente toute la suite du dossier.",
  },
  {
    title: "Analyser le bail commercial",
    text: "Vérifiez la durée, la destination, les conditions de cession et de renouvellement, le loyer et les charges. Le bail est le lien juridique entre les murs et le fonds.",
  },
  {
    title: "Évaluer chaque composante séparément",
    text: "Les murs s’apprécient comme un actif immobilier (rendement, emplacement), le fonds comme une entreprise (clientèle, résultats). Ne mélangez pas les deux raisonnements.",
  },
  {
    title: "Sécuriser l’acte et les formalités",
    text: "La cession d’un fonds de commerce obéit à des règles strictes de contenu et de publicité. Faites rédiger l’acte par un professionnel et accomplissez les formalités dans les délais.",
  },
  {
    title: "Vous entourer de professionnels",
    text: "Agent immobilier détenant la mention « Transactions sur immeubles et fonds de commerce », avocat, expert-comptable : chacun sécurise un aspect de l’opération.",
  },
];

const relatedLinks = [
  {
    href: "/formation-juridique-immobilier",
    label: "Formation juridique immobilier",
    detail: "Maîtrisez le cadre légal des transactions sur fonds de commerce.",
  },
  {
    href: "/guides/loi-hoguet-guide-complet",
    label: "Loi Hoguet : le guide complet",
    detail: "Carte professionnelle, mandat et mentions obligatoires.",
  },
  {
    href: "/guides/estimation-immobiliere-methodes",
    label: "Estimation immobilière : les méthodes",
    detail: "Les grilles de lecture pour évaluer murs et fonds.",
  },
  {
    href: "/guides/mandat-exclusif-vs-mandat-simple",
    label: "Mandat exclusif ou mandat simple",
    detail: "Choisir le bon mandat pour une cession de commerce.",
  },
];

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

export default function MursFondsCommerceDifferencesPage() {
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
              href="/formation-juridique-immobilier"
              className="rounded-xl bg-brand-navy px-4 py-2.5 text-sm font-black text-white transition hover:bg-brand-navy-mid"
            >
              Voir la formation juridique
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
                    Murs ou fonds de commerce
                  </li>
                </ol>
              </nav>

              <div className="mt-9 max-w-4xl">
                <p className="inline-flex rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-brand-gold-pale">
                  Guide juridique 2026
                </p>
                <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                  Acheter les murs ou le fonds de commerce&nbsp;: les différences à maîtriser
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl">
                  Deux biens distincts, deux logiques d’investissement, un même local. Définitions, droit au bail, bail commercial, évaluation et rôle de l’agent immobilier&nbsp;: le guide pour choisir en connaissance de cause.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#definitions"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gold px-5 py-3.5 text-sm font-black text-brand-navy transition hover:bg-brand-gold-hover"
                  >
                    Comprendre les différences
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <a
                    href={ENTREPRENDRE_CESSION_FONDS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    La cession de fonds sur service-public.fr
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
                    ["#definitions", "Définitions"],
                    ["#droit-au-bail", "Droit au bail"],
                    ["#evaluation", "Évaluation"],
                    ["#role-agent", "Rôle de l’agent"],
                    ["#demarches", "Démarches"],
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
              <section id="definitions" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Les définitions
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy sm:text-4xl">
                  Deux biens juridiquement distincts
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
                  <p>
                    <strong>Les murs</strong> désignent l’immeuble ou le local
                    commercial lui-même&nbsp;: le bien immobilier, sa structure,
                    son emplacement. Celui qui achète les murs devient
                    propriétaire foncier et perçoit les loyers du bail en cours.
                  </p>
                  <p>
                    <strong>Le fonds de commerce</strong> est un bien meuble
                    incorporel&nbsp;: il réunit la <strong>clientèle</strong> —
                    son élément essentiel —, l’enseigne et le nom commercial, le{" "}
                    <strong>droit au bail</strong>, le matériel et le mobilier
                    d’exploitation, les marchandises. Celui qui achète le fonds
                    reprend l’activité, pas la pierre.
                  </p>
                  <p>
                    Confondre les deux est l’erreur classique de l’acquéreur
                    débutant&nbsp;: un même local peut donner lieu à deux
                    propriétaires différents — l’un pour les murs, l’autre pour
                    le fonds — reliés par un contrat&nbsp;: le bail commercial.
                  </p>
                </div>

                <div className="mt-7 rounded-2xl border-l-4 border-brand-gold bg-white p-6 shadow-sm">
                  <div className="flex gap-4">
                    <Scale className="mt-1 h-6 w-6 shrink-0 text-brand-gold-dark" aria-hidden />
                    <div>
                      <h3 className="font-black text-brand-navy">
                        La règle à retenir
                      </h3>
                      <p className="mt-2 leading-7 text-slate-700">
                        Le propriétaire des murs encaisse les loyers&nbsp;; le
                        propriétaire du fonds exploite l’activité et détient la
                        clientèle. On peut être l’un, l’autre, ou les deux à la
                        fois.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="droit-au-bail" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Le statut protecteur
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Droit au bail et bail commercial
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
                  <p>
                    Le <strong>droit au bail</strong> est le droit pour
                    l’exploitant d’occuper les locaux et d’obtenir le{" "}
                    <strong>renouvellement de son bail</strong>. C’est ce que
                    l’on appelle communément la <em>propriété commerciale</em>.
                    Point capital&nbsp;: il n’existe <strong>pas de droit au
                    bail sur les murs seuls</strong> — il suppose l’exploitation
                    effective d’un fonds dans les locaux.
                  </p>
                  <p>
                    Ce droit est encadré par le statut des baux commerciaux,
                    fixé par le <strong>décret n° 53-960 du 30 septembre
                    1953</strong> et aujourd’hui repris dans le{" "}
                    <SourceLink href={CODE_COMMERCE_BAUX_URL}>
                      code de commerce (articles L. 145-1 et suivants)
                    </SourceLink>
                    . Il protège l’exploitant&nbsp;: bail d’une durée minimale,
                    droit au renouvellement, indemnité d’éviction en cas de
                    refus injustifié du bailleur.
                  </p>
                </div>

                <div className="mt-8 overflow-hidden rounded-2xl bg-brand-navy text-white">
                  <div className="grid gap-0 md:grid-cols-[1fr_1.35fr]">
                    <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-8">
                      <p className="text-4xl font-black text-brand-gold">1953</p>
                      <p className="mt-2 font-bold">statut des baux commerciaux</p>
                    </div>
                    <div className="p-6 md:p-8">
                      <p className="leading-7 text-white/80">
                        Le statut s’applique aux baux des locaux dans lesquels
                        un fonds de commerce ou un fonds artisanal est exploité.
                        Il garantit au locataire-exploitant la{" "}
                        <strong className="text-white">stabilité de son outil de
                        travail</strong>, condition de la valeur de sa clientèle.
                      </p>
                      <p className="mt-4 text-sm text-white/70">
                        Source&nbsp;:{" "}
                        <a
                          href={CODE_COMMERCE_BAUX_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-brand-gold-pale underline underline-offset-4"
                        >
                          code de commerce, chapitre V, sur Légifrance
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="evaluation" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Deux logiques de prix
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Comment évaluer les murs et le fonds&nbsp;?
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-700">
                  Murs et fonds ne s’évaluent pas avec les mêmes grilles. Voici
                  les critères à examiner de chaque côté avant de formuler un
                  prix.
                </p>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <Building2 className="h-8 w-8 text-brand-gold-dark" aria-hidden />
                    <h3 className="mt-5 font-black text-brand-navy">
                      Évaluer les murs
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm text-slate-700">
                      {mursCriteria.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-navy" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <Store className="h-8 w-8 text-brand-gold-dark" aria-hidden />
                    <h3 className="mt-5 font-black text-brand-navy">
                      Évaluer le fonds
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm text-slate-700">
                      {fondsCriteria.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-navy" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section id="role-agent" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  L’intermédiaire
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Le rôle de l’agent immobilier dans la cession
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
                  <p>
                    La vente d’un fonds de commerce est une opération relevant
                    de la loi Hoguet&nbsp;: seul un professionnel titulaire de la
                    carte professionnelle portant la mention{" "}
                    <strong>«&nbsp;Transactions sur immeubles et fonds de
                    commerce&nbsp;»</strong> peut s’entremettre dans ces
                    cessions à titre habituel et rémunéré.
                  </p>
                  <p>
                    Concrètement, l’agent qualifie le bien (murs, fonds ou les
                    deux), analyse le bail commercial, aide à l’évaluation,
                    recherche les acquéreurs et sécurise la négociation jusqu’à
                    la signature. Sa responsabilité est engagée sur la qualité
                    de son information et de son conseil.
                  </p>
                </div>
                <p className="mt-5 flex gap-3 rounded-xl bg-brand-navy/5 p-4 text-sm leading-6 text-slate-700">
                  <Users className="mt-0.5 h-5 w-5 shrink-0 text-brand-navy" aria-hidden />
                  Vérifiez systématiquement la carte professionnelle de
                  l’intermédiaire et sa mention avant de signer un mandat portant
                  sur un fonds de commerce.
                </p>
              </section>

              <section id="demarches" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Méthode pratique
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Les étapes d’une acquisition sécurisée
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
                      Professionnel de l’immobilier&nbsp;?
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      Notre formation juridique détaille le régime des baux
                      commerciaux, la cession de fonds et le rôle de
                      l’intermédiaire, avec les textes à l’appui.
                    </p>
                  </div>
                  <Link
                    href="/formation-juridique-immobilier"
                    className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-navy px-4 py-3 text-sm font-black text-white transition hover:bg-brand-navy-mid"
                  >
                    Découvrir la formation juridique
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </section>

              <section id="faq" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Questions fréquentes
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Murs ou fonds de commerce&nbsp;: FAQ
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
                      <SourceLink href={CODE_COMMERCE_BAUX_URL}>
                        Code de commerce, chapitre V : du bail commercial — Légifrance
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Champ d’application du statut, droit au renouvellement,
                        cession du bail et indemnités.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={ENTREPRENDRE_CESSION_FONDS_URL}>
                        La cession d’un fonds de commerce — entreprendre.service-public.fr
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Contenu de l’acte de cession, formalités de publicité et
                        conséquences fiscales.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={ENTREPRENDRE_CESSION_BAIL_URL}>
                        La cession du bail commercial — entreprendre.service-public.fr
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Conditions de cession du bail, seul ou avec le fonds de
                        commerce.
                      </p>
                    </li>
                  </ul>
                  <p className="mt-6 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500">
                    Informations vérifiées le 31 juillet 2026. Ce guide présente
                    les distinctions générales entre murs et fonds de commerce&nbsp;;
                    il ne remplace ni les textes officiels ni les conseils d’un
                    professionnel du droit sur votre opération.
                  </p>
                </div>
              </section>

              <section aria-label="Guides liés">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Pour aller plus loin
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Guides liés
                </h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {relatedLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-gold/50 hover:shadow-md"
                      >
                        <span className="inline-flex items-center gap-2 font-black text-brand-navy group-hover:text-brand-navy-mid">
                          {link.label}
                          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
                        </span>
                        <span className="mt-2 text-sm leading-6 text-slate-600">
                          {link.detail}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="overflow-hidden rounded-3xl bg-brand-navy p-7 text-white sm:p-10">
                <div className="flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
                  <div className="max-w-2xl">
                    <BookOpen className="h-8 w-8 text-brand-gold" aria-hidden />
                    <h2 className="mt-5 text-2xl font-black sm:text-3xl">
                      Sécurisez vos transactions commerciales
                    </h2>
                    <p className="mt-3 leading-7 text-white/75">
                      Baux commerciaux, droit au bail, cession de fonds&nbsp;: la
                      formation juridique immobilier de MonPassFormation fait de
                      ces sujets des points forts de votre pratique.
                    </p>
                  </div>
                  <Link
                    href="/formation-juridique-immobilier"
                    className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-gold px-5 py-3.5 text-sm font-black text-brand-navy transition hover:bg-brand-gold-hover"
                  >
                    Voir la formation juridique
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
                  <Link href="/guides" className="transition hover:text-brand-navy">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link
                    href="/formation-juridique-immobilier"
                    className="transition hover:text-brand-navy"
                  >
                    Formation juridique
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
              </ul>
            </nav>
          </div>
        </footer>
      </div>
    </>
  );
}
