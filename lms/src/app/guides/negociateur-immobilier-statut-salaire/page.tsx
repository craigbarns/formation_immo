import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
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
const PAGE_PATH = "/guides/negociateur-immobilier-statut-salaire";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const COVER_URL = `${SITE_URL}/generated/fal/transaction/cover-immobilier.jpg`;
const LEGIFRANCE_LAW_URL =
  "https://www.legifrance.gouv.fr/loda/id/LEGITEXT000006068387/";
const LEGIFRANCE_DECREE_URL =
  "https://www.legifrance.gouv.fr/loda/id/LEGITEXT000006061974/";
const LEGIFRANCE_COMMERCE_URL =
  "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000005634379/LEGISCTA000006146035/";
const DGCCRF_URL =
  "https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques-et-les-faq/lagent-immobilier-les-regles-qui-encadrent-la-profession";

const title = "Négociateur immobilier : statut, salaire et habilitation (2026)";
const description =
  "Salarié ou agent commercial : statut, rémunération à la commission, habilitation carte T, avantages et inconvénients. Le guide pour choisir et démarrer.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    absolute: title,
  },
  description,
  keywords: [
    "négociateur immobilier statut",
    "négociateur immobilier salaire",
    "agent commercial immobilier rémunération",
    "négociateur salarié ou agent commercial",
    "habilitation carte T négociateur",
    "commission négociateur immobilier",
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
    publishedTime: "2026-07-31",
    modifiedTime: "2026-07-31",
    images: [
      {
        url: COVER_URL,
        width: 1024,
        height: 576,
        alt: "Statut et salaire du négociateur immobilier",
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
    question: "Faut-il choisir entre salarié et agent commercial ?",
    answer:
      "Les deux statuts coexistent et répondent à des profils différents. Le salariat apporte un cadre sécurisant (contrat de travail, protection sociale, souvent un fixe complété de commissions). L'agence commerciale offre plus d'autonomie et une part d'honoraires généralement plus élevée, sans salaire garanti ni congés payés.",
  },
  {
    question: "Combien gagne un négociateur immobilier ?",
    answer:
      "Il n'existe ni grille légale ni statistique officielle : la rémunération est librement négociée avec le titulaire de la carte et repose sur une part des honoraires effectivement encaissés. Les pratiques varient fortement selon l'agence, le réseau, le secteur géographique et les résultats. Prenez les moyennes publiées en ligne avec prudence.",
  },
  {
    question: "L'agent commercial peut-il recevoir des fonds de clients ?",
    answer:
      "Non. L'agent commercial habilité ne peut ni recevoir ni détenir des sommes d'argent, biens, effets ou valeurs, ni donner de consultations juridiques, ni rédiger d'actes sous seing privé (hors mandats conclus pour le compte du titulaire), ni diriger un établissement, une succursale, une agence ou un bureau.",
  },
  {
    question: "Faut-il une carte T pour devenir négociateur ?",
    answer:
      "Non. Le négociateur exerce sous l'habilitation écrite d'un titulaire de la carte professionnelle : une attestation précisant sa qualité et l'étendue de ses pouvoirs, visée par le président de la CCI. La carte « Transactions » n'est requise que pour exercer à son propre compte.",
  },
  {
    question: "La commission est-elle due dès la signature du compromis ?",
    answer:
      "En principe non : l'article 6 de la loi n° 70-9 dispose qu'aucune rémunération n'est due avant que l'opération soit effectivement conclue et constatée dans un acte écrit contenant l'engagement des parties. Des clauses particulières (exclusivité, clause pénale) obéissent à un régime spécifique encadré par décret.",
  },
  {
    question: "Le négociateur est-il soumis à la formation continue ?",
    answer:
      "Oui. L'obligation de 14 heures par an (ou 42 heures sur trois ans) vise les salariés et indépendants habilités à négocier, s'entremettre ou s'engager pour le compte du titulaire, avec les mêmes heures dédiées à la déontologie et à la non-discrimination.",
  },
  {
    question: "Peut-on passer du salariat au statut d'agent commercial ?",
    answer:
      "Oui, c'est une évolution fréquente. Elle implique la fin du contrat de travail, l'immatriculation au registre spécial des agents commerciaux, un contrat d'agence avec le titulaire et une nouvelle attestation d'habilitation visée par la CCI. Anticipez la période sans revenu fixe.",
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
          name: "Négociateur immobilier",
        },
        {
          "@type": "Thing",
          name: "Agent commercial",
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
          name: "Négociateur immobilier : statut et salaire",
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
    icon: Users,
    value: "2 statuts",
    label: "au choix",
    detail: "Salarié habilité ou agent commercial indépendant (« agent co »).",
  },
  {
    icon: FileCheck2,
    value: "1 attestation",
    label: "visée par la CCI",
    detail: "L'habilitation écrite du titulaire, obligatoire avant toute négociation.",
  },
  {
    icon: Clock3,
    value: "42 h",
    label: "de formation sur 3 ans",
    detail: "L'obligation de formation continue vise aussi les collaborateurs habilités.",
  },
];

const statuts = [
  {
    title: "Le négociateur salarié",
    intro:
      "Lié à l'agence par un contrat de travail (CDI ou CDD), il exerce dans un cadre fixé par l'employeur, titulaire de la carte.",
    avantages: [
      "Sécurité du contrat de travail et de la protection sociale",
      "Salaire fixe fréquent, complété de commissions sur les ventes",
      "Congés payés et cadre de travail structuré",
      "Montée en compétence accompagnée par l'agence",
    ],
    limites: [
      "Part d'honoraires généralement plus faible que l'indépendant",
      "Objectifs et organisation fixés par l'employeur",
      "Variable soumis aux résultats, comme tout commercial",
    ],
  },
  {
    title: "Le négociateur agent commercial",
    intro:
      "Indépendant lié par un contrat d'agence, il relève du statut des agents commerciaux du code de commerce et s'immatricule au registre spécial (RSAC).",
    avantages: [
      "Part d'honoraires négociée, souvent plus élevée qu'en salariat",
      "Autonomie dans l'organisation et la prospection",
      "Possibilité de développer une activité à son rythme, souvent en réseau",
    ],
    limites: [
      "Aucun revenu fixe : rémunération 100 % liée aux opérations conclues",
      "Charges sociales et fiscalité d'indépendant à sa charge",
      "Interdictions légales : pas de détention de fonds, pas de direction d'agence",
    ],
  },
];

const remunerationPoints = [
  "Rémunération librement fixée entre le négociateur et le titulaire de la carte",
  "Commission calculée sur les honoraires effectivement encaissés par l'agence",
  "Droit à rémunération né à l'issue effective de l'opération (art. 6 de la loi)",
  "Fixe + variable fréquent en salariat ; 100 % variable en agence commerciale",
  "Aucune grille officielle : les pratiques varient selon agences et réseaux",
  "Le statut d'agent commercial doit figurer sur la publicité et les documents",
];

const demarrerSteps = [
  {
    title: "Choisir son statut en connaissance de cause",
    text: "Comparez sécurité du salariat et autonomie de l'agence commerciale au regard de votre épargne, de votre expérience commerciale et de votre réseau local.",
  },
  {
    title: "Rejoindre un titulaire de carte",
    text: "Agence locale ou réseau national de mandataires : vérifiez la carte professionnelle du titulaire (fichier CCI consultable en ligne) et les conditions de rémunération proposées.",
  },
  {
    title: "Signer le contrat et faire viser l'habilitation",
    text: "Contrat de travail ou contrat d'agence, puis attestation d'habilitation visée par le président de la CCI : aucun acte de négociation avant cette formalité.",
  },
  {
    title: "Justifier sa compétence professionnelle",
    text: "Depuis la loi ALUR, le négociateur doit justifier de sa compétence : diplôme, expérience ou formation. Renseignez-vous sur les modalités auprès de la CCI.",
  },
  {
    title: "Suivre la formation continue et viser plus loin",
    text: "Les 42 heures sur trois ans s'imposent aussi aux habilités. L'expérience salariée capitalisée ouvre ensuite la voie à votre propre carte professionnelle.",
  },
];

const relatedGuides = [
  {
    href: "/guides/devenir-agent-immobilier-sans-diplome",
    title: "Devenir agent immobilier sans diplôme",
    text: "Le négociateur comme tremplin vers la carte professionnelle.",
  },
  {
    href: "/guides/carte-professionnelle-immobilier-prix-delais",
    title: "Carte professionnelle : prix et délais",
    text: "Quand l'expérience acquise permet de demander sa propre carte.",
  },
  {
    href: "/guides/qui-doit-suivre-formation-42-heures",
    title: "Qui doit suivre la formation 42 heures ?",
    text: "Titulaires, directions d'agence et collaborateurs habilités.",
  },
  {
    href: "/formation-deontologie-immobilier",
    title: "Formation déontologie immobilier",
    text: "Les heures de déontologie et de non-discrimination du cycle.",
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

export default function NegociateurImmobilierStatutSalairePage() {
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
                    Négociateur immobilier : statut et salaire
                  </li>
                </ol>
              </nav>

              <div className="mt-9 max-w-4xl">
                <p className="inline-flex rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-brand-gold-pale">
                  Guide carrière 2026
                </p>
                <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                  Négociateur immobilier&nbsp;: statut, salaire et habilitation
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl">
                  Salarié d’agence ou agent commercial indépendant&nbsp;? Statut,
                  rémunération à la commission, habilitation visée par la CCI et
                  avantages de chaque voie&nbsp;: le comparatif complet pour
                  choisir.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#statuts"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gold px-5 py-3.5 text-sm font-black text-brand-navy transition hover:bg-brand-gold-hover"
                  >
                    Comparer les deux statuts
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <a
                    href={DGCCRF_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    Le cadre vu par la DGCCRF
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
                    ["#role", "Le métier de négociateur"],
                    ["#statuts", "Salarié ou agent commercial"],
                    ["#remuneration", "Rémunération et commission"],
                    ["#habilitation", "Habilitation carte T"],
                    ["#demarrer", "Démarrer en cinq étapes"],
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
              <section id="role" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Le métier
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy sm:text-4xl">
                  Qu’est-ce qu’un négociateur immobilier, juridiquement&nbsp;?
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
                  <p>
                    Le négociateur est une personne{" "}
                    <strong>habilitée par le titulaire de la carte
                    professionnelle</strong> à « négocier, s’entremettre ou
                    s’engager pour son compte », selon l’article 4 de la{" "}
                    <SourceLink href={LEGIFRANCE_LAW_URL}>
                      loi n°&nbsp;70-9 du 2 janvier 1970
                    </SourceLink>
                    . Il prospecte les mandats, organise les visites et mène la
                    négociation — sous la responsabilité du titulaire.
                  </p>
                  <p>
                    Deux statuts coexistent&nbsp;: le <strong>salarié</strong> de
                    l’agence et l’<strong>agent commercial</strong> indépendant
                    (le fameux « agent co » des réseaux de mandataires). Dans
                    les deux cas, l’habilitation est écrite et la compétence
                    professionnelle doit être justifiée depuis la loi ALUR.
                  </p>
                </div>

                <div className="mt-7 rounded-2xl border-l-4 border-brand-gold bg-white p-6 shadow-sm">
                  <div className="flex gap-4">
                    <Scale className="mt-1 h-6 w-6 shrink-0 text-brand-gold-dark" aria-hidden />
                    <div>
                      <h3 className="font-black text-brand-navy">
                        Sans habilitation, c’est un délit
                      </h3>
                      <p className="mt-2 leading-7 text-slate-700">
                        Négocier, s’entremettre ou prendre des engagements pour
                        le compte d’un titulaire sans y avoir été habilité dans
                        les formes est puni des peines de l’article 14 de la
                        loi&nbsp;: jusqu’à six mois d’emprisonnement et 7&nbsp;500&nbsp;€
                        d’amende.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="statuts" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Le choix du statut
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Salarié ou agent commercial&nbsp;: avantages et limites
                </h2>
                <div className="mt-7 grid gap-5 lg:grid-cols-2">
                  {statuts.map((statut) => (
                    <div
                      key={statut.title}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"
                    >
                      <h3 className="text-xl font-black text-brand-navy">{statut.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{statut.intro}</p>
                      <p className="mt-5 text-xs font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                        Avantages
                      </p>
                      <ul className="mt-3 space-y-2.5 text-sm leading-6 text-slate-700">
                        {statut.avantages.map((item) => (
                          <li key={item} className="flex gap-2.5">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold-dark" aria-hidden />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-5 text-xs font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                        Limites
                      </p>
                      <ul className="mt-3 space-y-2.5 text-sm leading-6 text-slate-700">
                        {statut.limites.map((item) => (
                          <li key={item} className="flex gap-2.5">
                            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-navy" aria-hidden />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <p className="mt-5 flex gap-3 rounded-xl bg-brand-navy/5 p-4 text-sm leading-6 text-slate-700">
                  <Users className="mt-0.5 h-5 w-5 shrink-0 text-brand-navy" aria-hidden />
                  Le statut d’agent commercial relève des{" "}
                  <SourceLink href={LEGIFRANCE_COMMERCE_URL}>
                    articles L.&nbsp;134-1 et suivants du code de commerce
                  </SourceLink>
                  &nbsp;: indépendance, contrat d’agence écrit et immatriculation
                  au registre spécial des agents commerciaux.
                </p>
              </section>

              <section id="remuneration" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Le salaire du négociateur
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Une rémunération à la commission, librement négociée
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-700">
                  Contrairement aux idées reçues, il n’existe <strong>ni barème
                  légal ni statistique officielle</strong> du salaire du
                  négociateur. Les règles qui structurent la rémunération sont
                  les suivantes&nbsp;:
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {remunerationPoints.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold leading-6 text-slate-700"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold-dark" aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 overflow-hidden rounded-2xl bg-brand-navy text-white">
                  <div className="grid gap-0 md:grid-cols-[1fr_1.35fr]">
                    <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-8">
                      <p className="text-4xl font-black text-brand-gold">Art. 6</p>
                      <p className="mt-2 font-bold">de la loi Hoguet</p>
                    </div>
                    <div className="p-6 md:p-8">
                      <p className="leading-7 text-white/80">
                        Aucune rémunération n’est due avant que l’opération soit{" "}
                        <strong className="text-white">effectivement conclue et
                        constatée dans un acte écrit</strong> contenant
                        l’engagement des parties. En pratique, la commission du
                        négociateur suit l’encaissement des honoraires par
                        l’agence — souvent à l’acte authentique.
                      </p>
                      <p className="mt-4 text-sm text-white/70">
                        Conséquence&nbsp;: prévoyez une trésorerie tampon, surtout
                        en agence commerciale où le revenu est entièrement
                        variable.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="habilitation" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Le sésame du négociateur
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  L’habilitation carte T&nbsp;: attestation, visa et compétence
                </h2>
                <div className="mt-6 grid gap-6 md:grid-cols-[1.3fr_1fr]">
                  <div className="space-y-5 text-base leading-8 text-slate-700">
                    <p>
                      L’habilitation se matérialise par une{" "}
                      <strong>attestation</strong> délivrée par le titulaire de la
                      carte et <strong>visée par le président de la CCI</strong>.
                      Elle précise votre qualité (salarié ou agent commercial) et
                      l’étendue de vos pouvoirs&nbsp;: c’est elle que vous devez
                      pouvoir présenter en cas de contrôle.
                    </p>
                    <p>
                      Depuis la loi ALUR, le négociateur doit en outre{" "}
                      <strong>justifier de sa compétence professionnelle</strong>{" "}
                      (diplôme, expérience ou formation selon les modalités
                      prévues par le{" "}
                      <SourceLink href={LEGIFRANCE_DECREE_URL}>
                        décret du 20 juillet 1972
                      </SourceLink>
                      ). Pour l’agent commercial, la qualité doit figurer dans la
                      publicité, le mandat et les documents de la transaction.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <FileCheck2 className="h-8 w-8 text-brand-gold-dark" aria-hidden />
                    <h3 className="mt-5 font-black text-brand-navy">
                      Contrôle rapide de votre attestation
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm text-slate-700">
                      {[
                        "Identité et qualité du détenteur",
                        "Étendue des pouvoirs conférés",
                        "Numéro de carte du titulaire",
                        "Visa du président de la CCI",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-brand-navy" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section id="demarrer" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Feuille de route
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Démarrer comme négociateur en cinq étapes
                </h2>
                <ol className="mt-7 space-y-4">
                  {demarrerSteps.map((step, index) => (
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
                      Et après quelques années de négociation&nbsp;?
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      L’expérience salariée capitalisée peut ouvrir droit à votre
                      propre carte professionnelle. Notre guide fait le point.
                    </p>
                  </div>
                  <Link
                    href="/guides/devenir-agent-immobilier-sans-diplome"
                    className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-navy px-4 py-3 text-sm font-black text-white transition hover:bg-brand-navy-mid"
                  >
                    Viser la carte professionnelle
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </section>

              <section id="faq" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Questions fréquentes
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Négociateur immobilier&nbsp;: FAQ
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

              <section id="guides-lies" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Pour aller plus loin
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Guides liés
                </h2>
                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {relatedGuides.map((guide) => (
                    <Link
                      key={guide.href}
                      href={guide.href}
                      className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-gold/50 hover:shadow-md"
                    >
                      <h3 className="flex items-center justify-between gap-3 font-black text-brand-navy">
                        {guide.title}
                        <ArrowRight className="h-4 w-4 shrink-0 text-brand-gold-dark transition group-hover:translate-x-1" aria-hidden />
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{guide.text}</p>
                    </Link>
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
                      <SourceLink href={LEGIFRANCE_LAW_URL}>
                        Loi n°&nbsp;70-9 du 2 janvier 1970 — Légifrance
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Habilitation des négociateurs (art. 4), droit à rémunération (art. 6) et sanctions (art. 14).
                      </p>
                    </li>
                    <li>
                      <SourceLink href={LEGIFRANCE_DECREE_URL}>
                        Décret n°&nbsp;72-678 du 20 juillet 1972 — Légifrance
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Attestation d’habilitation, visa de la CCI et compétence professionnelle.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={LEGIFRANCE_COMMERCE_URL}>
                        Code de commerce, art. L.&nbsp;134-1 et suivants — Légifrance
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Statut des agents commerciaux : contrat d’agence et registre spécial.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={DGCCRF_URL}>
                        L’agent immobilier : les règles qui encadrent la profession — DGCCRF
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Habilitation des négociateurs salariés et agents commerciaux, interdictions applicables.
                      </p>
                    </li>
                  </ul>
                  <p className="mt-6 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500">
                    Informations vérifiées le 31 juillet 2026. Ce guide présente
                    le cadre général et ne remplace ni les textes officiels ni
                    l’examen de votre situation par la CCI compétente.
                  </p>
                </div>
              </section>

              <section className="overflow-hidden rounded-3xl bg-brand-navy p-7 text-white sm:p-10">
                <div className="flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
                  <div className="max-w-2xl">
                    <BookOpen className="h-8 w-8 text-brand-gold" aria-hidden />
                    <h2 className="mt-5 text-2xl font-black sm:text-3xl">
                      Habilité&nbsp;? Vous êtes soumis à la formation continue
                    </h2>
                    <p className="mt-3 leading-7 text-white/75">
                      Le parcours MonPassFormation (42 h loi ALUR + 3 h TRACFIN,
                      certifié Qualiopi, avec visioconférences) couvre
                      l’obligation d’un cycle complet pour les collaborateurs
                      habilités comme pour les titulaires.
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
