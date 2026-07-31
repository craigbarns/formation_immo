import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calculator,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Scale,
  Search,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

const SITE_URL = "https://monpassformation.com";
const PAGE_PATH = "/guides/estimation-immobiliere-methodes";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const COVER_URL = `${SITE_URL}/generated/fal/transaction/cover-immobilier.jpg`;
const DVF_DATA_URL =
  "https://www.data.gouv.fr/fr/datasets/demandes-de-valeurs-foncieres/";
const DVF_APP_URL = "https://app.dvf.etalab.gouv.fr/";
const LEGIFRANCE_HOGUET_URL =
  "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000512228/";

const title = "Méthodes d'estimation immobilière : comparatif et guide pratique 2026";
const description =
  "Comparaison, cohérence, capitalisation, DCF : les méthodes d'estimation immobilière expliquées, les outils DVF et en ligne, et le rôle légal de l'agent face à l'expert immobilier.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    absolute: title,
  },
  description,
  keywords: [
    "méthodes estimation immobilière",
    "estimation immobilière par comparaison",
    "estimation par capitalisation",
    "DCF immobilier",
    "DVF estimation",
    "avis de valeur agent immobilier",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  category: "Transaction immobilière",
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
        alt: "Les méthodes d'estimation immobilière comparées",
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
    question: "Quelle différence entre estimation, évaluation et expertise immobilière ?",
    answer:
      "L’estimation — souvent appelée avis de valeur — est l’appréciation délivrée par un agent immobilier dans le cadre de sa mission commerciale. L’évaluation ou expertise, au sens de la Charte de l’expertise en évaluation immobilière, est un travail méthodique et documenté réalisé par un expert immobilier, avec des conséquences juridiques et une responsabilité engagée. Un agent immobilier n’est pas un expert immobilier.",
  },
  {
    question: "Les données DVF sont-elles fiables pour estimer un bien ?",
    answer:
      "DVF recense les prix réellement payés, constatés par acte authentique : c’est la meilleure base publique disponible, gratuite sur data.gouv.fr et via l’application DVF Etalab. Ses limites : un décalage de publication de plusieurs mois et l’absence de l’Alsace-Moselle. En marché retourné, il faut actualiser les références avec l’offre en cours.",
  },
  {
    question: "Pour quels biens utiliser la méthode par capitalisation ?",
    answer:
      "La capitalisation du revenu — valeur égale au revenu net divisé par un taux de rendement — convient aux biens achetés pour leur rentabilité : immeubles de rapport, locaux commerciaux, actifs tertiaires. Pour un logement occupé par son propriétaire, la comparaison reste la méthode de référence.",
  },
  {
    question: "Qu’est-ce que la méthode DCF exactement ?",
    answer:
      "La méthode d’actualisation des flux futurs (discounted cash flow) projette les revenus futurs de l’actif — loyers, charges, revente — puis les actualise à une date donnée à l’aide d’un taux reflétant le risque. Puissante pour les actifs complexes, elle repose sur de nombreuses hypothèses et s’emploie surtout en investissement professionnel.",
  },
  {
    question: "Un agent immobilier peut-il facturer une estimation ?",
    answer:
      "L’avis de valeur est en pratique le plus souvent réalisé dans la perspective d’un mandat. Ce qui est encadré, c’est la rémunération de l’agent : la loi Hoguet subordonne toute commission à un mandat écrit et à l’issue effective de l’opération. Une expertise facturée en tant que telle relève, elle, de l’expert immobilier.",
  },
  {
    question: "Comment ajuster une estimation après comparaison ?",
    answer:
      "Partez du prix médian au m² des ventes comparables, puis appliquez des correctifs explicites et limités : étage, état général, extérieur, DPE, nuisances, travaux à prévoir. Chaque ajustement doit pouvoir être justifié devant le mandant — c’est ce qui distingue un avis documenté d’un chiffre annoncé pour plaire.",
  },
  {
    question: "Pourquoi deux agences donnent-elles des estimations différentes ?",
    answer:
      "Parce que la méthode importe autant que le marché : périmètre des comparables, ancienneté des ventes retenues, pondération des spécificités du bien et positionnement commercial de l’agence. Exigez la méthode et les références utilisées : une estimation argumentée se discute, une estimation orpheline non.",
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
          name: "Estimation immobilière",
        },
        {
          "@type": "Thing",
          name: "Demandes de valeurs foncières (DVF)",
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
          name: "Méthodes d’estimation immobilière",
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
    icon: Calculator,
    value: "Comparaison",
    label: "méthode de référence",
    detail: "La méthode principale pour estimer un bien résidentiel.",
  },
  {
    icon: MapPin,
    value: "DVF",
    label: "gratuit et officiel",
    detail: "Les prix réellement payés, en open data sur data.gouv.fr.",
  },
  {
    icon: Scale,
    value: "Estimation",
    label: "≠ expertise",
    detail: "L’agent donne un avis de valeur ; l’expertise appartient à l’expert.",
  },
];

const methodRows = [
  {
    method: "Comparaison",
    principle:
      "Déduire la valeur du bien des prix constatés sur des ventes récentes de biens similaires, ajustés des différences.",
    usage:
      "Le réflexe pour le résidentiel : appartements, maisons, terrains.",
    limits:
      "Dépend de la quantité de comparables récents ; les ajustements demandent de la rigueur pour rester objectifs.",
  },
  {
    method: "Cohérence",
    principle:
      "Vérifier que le prix envisagé reste cohérent avec les prix au m² du secteur et les caractéristiques du bien.",
    usage:
      "Méthode de contrôle, croisée avec la comparaison pour valider une fourchette.",
    limits:
      "Insuffisante seule : c’est une méthode d’appoint, pas une estimation autonome.",
  },
  {
    method: "Capitalisation du revenu",
    principle:
      "Valoriser le bien en divisant son revenu net (loyers après charges) par un taux de rendement de marché.",
    usage:
      "Immeubles de rapport, locaux commerciaux, actifs achetés pour la rentabilité.",
    limits:
      "Très sensible au taux retenu et à la fiabilité des revenus déclarés.",
  },
  {
    method: "DCF (flux actualisés)",
    principle:
      "Projeter les flux futurs — loyers, charges, revente — et les actualiser au taux reflétant le risque de l’actif.",
    usage:
      "Actifs complexes : tertiaire, portefeuilles, opérations d’investissement.",
    limits:
      "Hypothèses nombreuses ; peu adaptée à l’estimation d’un logement simple.",
  },
];

const planningSteps = [
  {
    title: "Décrire le bien avec précision",
    text: "Surface, plan, étage, état, extérieur, DPE, charges : la qualité de l’estimation dépend d’abord de la fiche descriptive.",
  },
  {
    title: "Extraire les ventes comparables dans DVF",
    text: "Même commune voire même quartier, même type de bien, surface proche, ventes des 12 à 24 derniers mois : constituez un échantillon de 5 à 10 références.",
  },
  {
    title: "Calculer la médiane, pas la moyenne",
    text: "La médiane des prix au m² limite l’effet des ventes atypiques — très hautes ou très basses — sur votre référence de départ.",
  },
  {
    title: "Ajuster avec des correctifs explicites",
    text: "Étage, état, terrasse, travaux, nuisances : chaque correctif est limité, chiffré et justifiable devant le mandant.",
  },
  {
    title: "Confronter au marché actuel",
    text: "DVF reflète des ventes signées il y a plusieurs mois : croisez avec l’offre actuellement en vente et le délai moyen de transaction local.",
  },
];

const toolCards = [
  {
    title: "DVF sur data.gouv.fr",
    text: "Le fichier national des demandes de valeurs foncières, publié par la DGFiP en open data : téléchargeable gratuitement, par année et par département, pour des analyses documentées.",
  },
  {
    title: "L’application DVF Etalab",
    text: "Une carte interactive officielle pour repérer en quelques clics les ventes autour d’une adresse : idéale en rendez-vous d’estimation.",
  },
  {
    title: "Les estimateurs grand public",
    text: "Des outils en ligne comme MeilleursAgents croisent DVF et annonces pour donner une fourchette instantanée : utile pour cadrer, insuffisant pour un avis de valeur argumenté.",
  },
];

const relatedGuides = [
  {
    href: "/guides/mandat-exclusif-vs-mandat-simple",
    label: "Mandat exclusif ou simple : le comparatif",
  },
  {
    href: "/guides/loi-hoguet-guide-complet",
    label: "Loi Hoguet : le guide complet",
  },
  {
    href: "/guides/formation-loi-alur-42-heures",
    label: "Formation loi ALUR 42 heures",
  },
  {
    href: "/guides/formation-immobilier-en-ligne-vs-presentiel",
    label: "Formation en ligne ou présentiel : que choisir ?",
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

export default function EstimationImmobiliereMethodesPage() {
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
                    Méthodes d’estimation
                  </li>
                </ol>
              </nav>

              <div className="mt-9 max-w-4xl">
                <p className="inline-flex rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-brand-gold-pale">
                  Guide pratique 2026
                </p>
                <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                  Méthodes d’estimation immobilière&nbsp;: laquelle utiliser, et comment
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl">
                  Comparaison, cohérence, capitalisation, DCF&nbsp;: le tour des
                  méthodes, les bons outils — DVF en tête — et la frontière
                  juridique entre avis de valeur et expertise.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#panorama"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gold px-5 py-3.5 text-sm font-black text-brand-navy transition hover:bg-brand-gold-hover"
                  >
                    Comparer les méthodes
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <a
                    href={DVF_APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    Ouvrir l’application DVF
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
                    ["#panorama", "Les 4 méthodes comparées"],
                    ["#comparaison", "La comparaison en pratique"],
                    ["#outils", "Les outils : DVF et plus"],
                    ["#cadre-legal", "Agent ou expert ?"],
                    ["#faq", "Questions fréquentes"],
                    ["#sources", "Sources officielles"],
                    ["#guides-lies", "Guides liés"],
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
              <section id="panorama" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Le panorama
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy sm:text-4xl">
                  Quatre méthodes, quatre logiques de valeur
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
                  <p>
                    Il n’existe pas une estimation, mais des <strong>méthodes
                    d’estimation</strong> adaptées à chaque type de bien et à
                    chaque usage. Pour le résidentiel, la{" "}
                    <strong>comparaison</strong> s’impose&nbsp;; pour l’actif de
                    rendement, on raisonne en <strong>revenu</strong>. Le tableau
                    ci-dessous pose les bases.
                  </p>
                </div>
                <div className="mt-7 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <table className="w-full min-w-[820px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-brand-navy text-white">
                        <th scope="col" className="px-5 py-4 font-black">
                          Méthode
                        </th>
                        <th scope="col" className="px-5 py-4 font-black">
                          Principe
                        </th>
                        <th scope="col" className="px-5 py-4 font-black">
                          Usage idéal
                        </th>
                        <th scope="col" className="px-5 py-4 font-black">
                          Limites
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {methodRows.map((row) => (
                        <tr key={row.method} className="align-top">
                          <th
                            scope="row"
                            className="bg-slate-50 px-5 py-4 font-black text-brand-navy"
                          >
                            {row.method}
                          </th>
                          <td className="px-5 py-4 leading-6 text-slate-600">
                            {row.principle}
                          </td>
                          <td className="px-5 py-4 leading-6 text-slate-600">
                            {row.usage}
                          </td>
                          <td className="px-5 py-4 leading-6 text-slate-600">
                            {row.limits}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="comparaison" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Méthode pratique
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  L’estimation par comparaison, étape par étape
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
                <div className="mt-7 rounded-2xl border-l-4 border-brand-gold bg-white p-6 shadow-sm">
                  <div className="flex gap-4">
                    <TrendingUp className="mt-1 h-6 w-6 shrink-0 text-brand-gold-dark" aria-hidden />
                    <div>
                      <h3 className="font-black text-brand-navy">
                        L’estimation défendable vaut mieux que l’estimation haute
                      </h3>
                      <p className="mt-2 leading-7 text-slate-700">
                        Un prix de mise en vente documenté se vend&nbsp;; un prix
                        flatté pour décrocher le mandat se négocie à la baisse
                        après des semaines d’exposition. La méthode par
                        comparaison, bien menée, protège le vendeur comme
                        l’agent.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="outils" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Les outils
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  DVF et les autres sources à mobiliser
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-700">
                  La base <strong>DVF (demandes de valeurs foncières)</strong>{" "}
                  recense les prix réellement payés, issus des actes authentiques.
                  Elle est gratuite, officielle et constitue la colonne
                  vertébrale de toute estimation documentée en France — à
                  l’exception de l’Alsace-Moselle, hors périmètre.
                </p>
                <div className="mt-7 grid gap-4 md:grid-cols-3">
                  {toolCards.map((tool, index) => (
                    <div
                      key={tool.title}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-sm font-black text-white">
                        {index + 1}
                      </span>
                      <h3 className="mt-5 text-lg font-black text-brand-navy">
                        {tool.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {tool.text}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-5 flex gap-3 rounded-xl bg-brand-navy/5 p-4 text-sm leading-6 text-slate-700">
                  <Search className="mt-0.5 h-5 w-5 shrink-0 text-brand-navy" aria-hidden />
                  Gardez en tête le décalage temporel de DVF&nbsp;: les ventes y
                  apparaissent plusieurs mois après leur signature. En période de
                  marché mouvant, actualisez toujours avec l’offre en cours.
                </p>
              </section>

              <section id="cadre-legal" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Le cadre légal
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Agent immobilier ou expert&nbsp;: ne confondez plus
                </h2>
                <div className="mt-6 grid gap-6 md:grid-cols-[1.3fr_1fr]">
                  <div className="space-y-5 text-base leading-8 text-slate-700">
                    <p>
                      L’<strong>agent immobilier</strong>, régi par la{" "}
                      <SourceLink href={LEGIFRANCE_HOGUET_URL}>
                        loi Hoguet
                      </SourceLink>
                      , délivre un <strong>avis de valeur</strong> dans le cadre
                      de sa mission d’entremise&nbsp;: un outil commercial pour
                      fixer un prix de mise en vente, adossé aux méthodes vues
                      plus haut.
                    </p>
                    <p>
                      L’<strong>expert immobilier</strong> réalise une{" "}
                      <strong>évaluation</strong> au sens de la Charte de
                      l’expertise en évaluation immobilière&nbsp;: un travail
                      argumenté et écrit, qui engage sa responsabilité et sert
                      des situations à enjeu — succession, partage, contentieux,
                      fiscalité, garantie bancaire.
                    </p>
                    <p>
                      Pour le professionnel de la transaction, la règle est
                      simple&nbsp;: estimer avec méthode, documenter ses
                      références, et ne jamais laisser croire au client qu’il
                      reçoit une expertise au sens technique du terme.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <Scale className="h-8 w-8 text-brand-gold-dark" aria-hidden />
                    <h3 className="mt-5 font-black text-brand-navy">
                      Avis de valeur vs expertise
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm text-slate-700">
                      {[
                        "Avis de valeur : finalité commerciale, cadre du mandat",
                        "Expertise : finalité juridique ou fiscale, rapport écrit",
                        "Responsabilité engagée de l’expert, pas de l’agent",
                        "Vocabulaire : jamais « expertise » pour un avis d’agent",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-navy" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section id="faq" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Questions fréquentes
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Estimation immobilière&nbsp;: FAQ
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
                      <SourceLink href={DVF_DATA_URL}>
                        Demandes de valeurs foncières (DVF) — data.gouv.fr
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Fichier national des transactions publié en open data par la DGFiP.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={DVF_APP_URL}>
                        Application cartographique DVF — Etalab
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Consultation interactive des ventes autour d’une adresse.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={LEGIFRANCE_HOGUET_URL}>
                        Loi n°&nbsp;70-9 du 2 janvier 1970 (loi Hoguet) — Légifrance
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Cadre d’exercice de l’entremise immobilière et de la rémunération de l’agent.
                      </p>
                    </li>
                  </ul>
                  <p className="mt-6 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500">
                    Informations vérifiées le 31 juillet 2026. Ce guide présente
                    les méthodes usuelles d’estimation et ne vaut ni avis de
                    valeur ni expertise pour un bien particulier.
                  </p>
                </div>
              </section>

              <section id="guides-lies" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Pour aller plus loin
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Guides liés
                </h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {relatedGuides.map((guide) => (
                    <li key={guide.href}>
                      <Link
                        href={guide.href}
                        className="group flex h-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm font-bold text-brand-navy transition hover:border-brand-gold/50 hover:shadow-sm"
                      >
                        <span>{guide.label}</span>
                        <ArrowRight className="h-4 w-4 shrink-0 text-brand-gold-dark transition group-hover:translate-x-0.5" aria-hidden />
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
                      L’estimation, une compétence qui se forme
                    </h2>
                    <p className="mt-3 leading-7 text-white/75">
                      Marché, méthodes, cadre légal&nbsp;: la formation loi ALUR
                      de MonPassFormation intègre les pratiques commerciales du
                      métier, avec supports pratiques et cas concrets
                      d’estimation.
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
                    href="/guides"
                    className="transition hover:text-brand-navy"
                  >
                    Guides
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
