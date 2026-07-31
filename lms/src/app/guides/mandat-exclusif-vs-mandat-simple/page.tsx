import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Euro,
  ExternalLink,
  PenLine,
  Scale,
  Users,
  type LucideIcon,
} from "lucide-react";

const SITE_URL = "https://monpassformation.com";
const PAGE_PATH = "/guides/mandat-exclusif-vs-mandat-simple";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const COVER_URL = `${SITE_URL}/generated/fal/transaction/cover-immobilier.jpg`;
const LEGIFRANCE_HOGUET_URL =
  "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000512228/";
const LEGIFRANCE_DECRET_URL =
  "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000855024";
const BPI_AGENT_URL =
  "https://bpifrance-creation.fr/activites-reglementees/agent-immobilier";

const title = "Mandat exclusif ou simple : le comparatif complet 2026";
const description =
  "Mandat simple ou exclusif : nombre d'agences, vente entre particuliers, durée, résiliation après 3 mois, pénalités et commission. Le guide pour vendeurs et agents immobiliers.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    absolute: title,
  },
  description,
  keywords: [
    "mandat exclusif ou simple",
    "mandat de vente exclusif",
    "mandat simple immobilier",
    "résiliation mandat exclusif",
    "loi Hoguet mandat",
    "commission agent immobilier",
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
        alt: "Comparatif mandat exclusif et mandat simple",
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
    question: "Puis-je vendre mon bien moi-même avec un mandat exclusif ?",
    answer:
      "En principe non : l’exclusivité interdit au vendeur de conclure sans l’agence, sauf si le mandat prévoit une clause de semi-exclusivité l’autorisant à chercher son propre acquéreur. Vendre en violation de l’exclusivité expose le mandant à une clause pénale, limitée par le décret au montant des honoraires prévus au mandat.",
  },
  {
    question: "Quelle durée maximale pour un mandat de vente ?",
    answer:
      "La loi Hoguet exige que toute convention soit limitée dans le temps : le mandat est toujours conclu pour une durée déterminée. Une clause de tacite reconduction indéfinie prive le mandat de limitation et a été sanctionnée par la nullité. En pratique, les mandats courent souvent sur trois à six mois, renouvelables par avenant.",
  },
  {
    question: "Comment résilier un mandat exclusif avant son terme ?",
    answer:
      "Selon l’article 78 du décret n° 72-678, passé un délai de trois mois à compter de sa signature, le mandat comportant une clause d’exclusivité peut être dénoncé à tout moment par chacune des parties, en respectant un préavis d’au moins quinze jours notifié par lettre recommandée avec accusé de réception.",
  },
  {
    question: "La commission est-elle due si la vente n’aboutit pas ?",
    answer:
      "Non. L’article 6 de la loi Hoguet subordonne toute rémunération à l’issue effective de l’opération conclue par l’intermédiaire de l’agent : pas de vente effectivement conclue, pas de commission. Aucune somme ne peut être exigée avant cette issue, à quelque titre que ce soit.",
  },
  {
    question: "Mandat simple : qui touche la commission si plusieurs agences travaillent ?",
    answer:
      "L’agence qui a effectivement fait aboutir l’opération. C’est ce qui pousse chaque professionnel à aller vite — et ce qui explique, côté vendeur, des niveaux d’investissement variables d’une agence à l’autre sur un même bien.",
  },
  {
    question: "Qu’est-ce qu’un mandat semi-exclusif ?",
    answer:
      "Une variante du mandat exclusif dans laquelle le vendeur conserve le droit de trouver lui-même un acquéreur — par exemple dans son entourage — sans devoir d’honoraires à l’agence, qui garde l’exclusivité sur le marché. La clause doit être écrite clairement dans le mandat.",
  },
  {
    question: "Le mandat écrit est-il vraiment obligatoire ?",
    answer:
      "Oui. La loi Hoguet interdit à l’agent de recevoir aucune rémunération sans mandat écrit préalable délivré par l’une des parties, précisant les conditions de la rémunération et qui en a la charge. Sans mandat écrit régulier, l’agent ne peut prétendre à aucune commission, même s’il a travaillé.",
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
          name: "Mandat de vente immobilière",
        },
        {
          "@type": "Thing",
          name: "Loi Hoguet",
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
          name: "Mandat exclusif ou simple",
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
    icon: PenLine,
    value: "Écrit",
    label: "préalable obligatoire",
    detail: "Sans mandat écrit, aucune commission n’est due (loi Hoguet).",
  },
  {
    icon: CalendarDays,
    value: "3 mois",
    label: "+ 15 jours de préavis",
    detail: "Résiliation possible du mandat exclusif passé ce délai.",
  },
  {
    icon: Euro,
    value: "0 €",
    label: "avant l’issue effective",
    detail: "La commission n’est due que si l’opération est conclue.",
  },
];

const comparisonRows = [
  {
    criterion: "Nombre d’agences mandatées",
    simple: "Plusieurs agences peuvent commercialiser le bien en même temps.",
    exclusif: "Une seule agence détient le droit de vendre le bien.",
  },
  {
    criterion: "Vente entre particuliers",
    simple:
      "Possible : le vendeur garde la liberté de trouver lui-même un acquéreur.",
    exclusif:
      "Interdite en principe, sauf clause de semi-exclusivité écrite au mandat.",
  },
  {
    criterion: "Durée",
    simple:
      "Durée déterminée obligatoire ; jamais de reconduction indéfinie.",
    exclusif:
      "Durée déterminée également ; la durée courte est l’usage du marché.",
  },
  {
    criterion: "Résiliation",
    simple:
      "À l’échéance du mandat ou selon les modalités prévues au contrat.",
    exclusif:
      "Dénonçable passé 3 mois, avec préavis d’au moins 15 jours par LRAR (art. 78 du décret).",
  },
  {
    criterion: "Commission",
    simple:
      "Due à l’agence qui a effectivement conclu l’opération.",
    exclusif:
      "Due à l’agence exclusive si l’opération aboutit ; clause pénale possible en cas de contournement, plafonnée aux honoraires.",
  },
  {
    criterion: "Implication de l’agence",
    simple:
      "Investissement variable : l’agence arbitre entre ses mandats en concurrence.",
    exclusif:
      "Investissement maximal : visibilité, publicité, visites et reporting renforcés.",
  },
  {
    criterion: "Profil de vendeur adapté",
    simple:
      "Vendeur qui veut tester le marché ou qui dispose déjà de son propre réseau d’acquéreurs.",
    exclusif:
      "Vendeur qui veut un interlocuteur unique, une stratégie de prix tenue et un suivi rapproché.",
  },
];

const sellerPoints = [
  {
    title: "Avec un mandat simple",
    items: [
      "Vous multipliez les canaux de diffusion et gardez la main sur une vente directe",
      "Les annonces dupliquées peuvent brouiller votre prix affiché",
      "Chaque agence investit a minima, faute de garantie de commission",
    ],
  },
  {
    title: "Avec un mandat exclusif",
    items: [
      "Un seul interlocuteur pilote prix, annonces, visites et offres",
      "L’agence consacre ses meilleurs moyens à un bien qu’elle est sûre de vendre",
      "Vous vous engagez : le contournement de l’exclusivité peut coûter des pénalités",
    ],
  },
];

const planningSteps = [
  {
    title: "Exigez un mandat écrit avant toute action",
    text: "Pas de démarchage, pas de visite, pas de publicité sans mandat signé : c’est la condition de votre rémunération et la protection du mandant.",
  },
  {
    title: "Rédigez les clauses essentielles en clair",
    text: "Durée déterminée, honoraires et partie qui les supporte, exclusivité éventuelle en caractères très apparents, modalités de dénonciation.",
  },
  {
    title: "Justifiez l’exclusivité par les moyens engagés",
    text: "Argumentez avec du concret : plan de diffusion, estimation documentée, calendrier de reporting. L’exclusivité se mérite, elle ne se réclame pas.",
  },
  {
    title: "Sécurisez la clause pénale",
    text: "Elle doit résulter d’une stipulation expresse, figurer en caractères très apparents et ne pas excéder le montant des honoraires prévus au mandat.",
  },
  {
    title: "Suivez les délais de résiliation",
    text: "Après 3 mois, le mandant comme l’agence peuvent dénoncer le mandat exclusif avec 15 jours de préavis par LRAR : tenez votre mandant pour ne jamais subir ce délai.",
  },
];

const relatedGuides = [
  {
    href: "/guides/loi-hoguet-guide-complet",
    label: "Loi Hoguet : le guide complet",
  },
  {
    href: "/guides/estimation-immobiliere-methodes",
    label: "Méthodes d’estimation immobilière",
  },
  {
    href: "/guides/formation-loi-alur-42-heures",
    label: "Formation loi ALUR 42 heures",
  },
  {
    href: "/guides/formation-loi-alur-obligatoire",
    label: "La formation loi ALUR est-elle obligatoire ?",
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

export default function MandatExclusifVsMandatSimplePage() {
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
                    Mandat exclusif ou simple
                  </li>
                </ol>
              </nav>

              <div className="mt-9 max-w-4xl">
                <p className="inline-flex rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-brand-gold-pale">
                  Comparatif juridique 2026
                </p>
                <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                  Mandat exclusif ou mandat simple&nbsp;: le vrai comparatif
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl">
                  Pour le vendeur comme pour l’agent, le choix du mandat change
                  tout&nbsp;: durée, résiliation, pénalités, commission. Le cadre
                  de la loi Hoguet, expliqué sans jargon.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#comparatif"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gold px-5 py-3.5 text-sm font-black text-brand-navy transition hover:bg-brand-gold-hover"
                  >
                    Voir le tableau comparatif
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <a
                    href={LEGIFRANCE_HOGUET_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    Lire la loi Hoguet sur Légifrance
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
                    ["#cadre", "Le cadre loi Hoguet"],
                    ["#comparatif", "Tableau comparatif"],
                    ["#vendeur", "Côté vendeur"],
                    ["#agent", "Côté agent"],
                    ["#resiliation", "Durée et résiliation"],
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
              <section id="cadre" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Le cadre légal
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy sm:text-4xl">
                  La loi Hoguet, colonne vertébrale du mandat
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
                  <p>
                    La{" "}
                    <SourceLink href={LEGIFRANCE_HOGUET_URL}>
                      loi n°&nbsp;70-9 du 2 janvier 1970
                    </SourceLink>
                    , dite loi Hoguet, pose trois principes qui gouvernent tous
                    les mandats&nbsp;: un <strong>mandat écrit préalable</strong>{" "}
                    avant toute intervention, une <strong>durée limitée dans le
                    temps</strong>, et une rémunération due{" "}
                    <strong>uniquement lorsque l’opération est effectivement
                    conclue</strong> par l’intermédiaire de l’agent.
                  </p>
                  <p>
                    Son décret d’application, le{" "}
                    <SourceLink href={LEGIFRANCE_DECRET_URL}>
                      décret n°&nbsp;72-678 du 20 juillet 1972
                    </SourceLink>
                    , précise le contenu des mandats, le régime des clauses
                    d’exclusivité et des clauses pénales, ainsi que les modalités
                    de dénonciation.
                  </p>
                </div>

                <div className="mt-7 rounded-2xl border-l-4 border-brand-gold bg-white p-6 shadow-sm">
                  <div className="flex gap-4">
                    <Scale className="mt-1 h-6 w-6 shrink-0 text-brand-gold-dark" aria-hidden />
                    <div>
                      <h3 className="font-black text-brand-navy">
                        Simple ou exclusif : même socle, effets différents
                      </h3>
                      <p className="mt-2 leading-7 text-slate-700">
                        Les deux types de mandat respectent le même socle
                        juridique. Ce qui change, c’est le périmètre de la
                        confiance&nbsp;: diffusion libre entre plusieurs agences
                        d’un côté, engagement réciproque avec une seule agence de
                        l’autre.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="comparatif" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Comparatif détaillé
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Mandat simple vs mandat exclusif&nbsp;: 7 points de différence
                </h2>
                <div className="mt-7 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-brand-navy text-white">
                        <th scope="col" className="px-5 py-4 font-black">
                          Critère
                        </th>
                        <th scope="col" className="px-5 py-4 font-black">
                          Mandat simple
                        </th>
                        <th scope="col" className="px-5 py-4 font-black">
                          Mandat exclusif
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {comparisonRows.map((row) => (
                        <tr key={row.criterion} className="align-top">
                          <th
                            scope="row"
                            className="bg-slate-50 px-5 py-4 font-black text-brand-navy"
                          >
                            {row.criterion}
                          </th>
                          <td className="px-5 py-4 leading-6 text-slate-600">
                            {row.simple}
                          </td>
                          <td className="px-5 py-4 leading-6 text-slate-600">
                            {row.exclusif}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="vendeur" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Côté vendeur
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Ce que votre choix change concrètement
                </h2>
                <div className="mt-7 grid gap-4 md:grid-cols-2">
                  {sellerPoints.map((block) => (
                    <div
                      key={block.title}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      <h3 className="text-lg font-black text-brand-navy">
                        {block.title}
                      </h3>
                      <ul className="mt-4 space-y-3">
                        {block.items.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-sm leading-6 text-slate-600"
                          >
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold-dark" aria-hidden />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <p className="mt-5 flex gap-3 rounded-xl bg-brand-navy/5 p-4 text-sm leading-6 text-slate-700">
                  <Users className="mt-0.5 h-5 w-5 shrink-0 text-brand-navy" aria-hidden />
                  Bon réflexe&nbsp;: avant de signer, demandez à l’agence son plan
                  de commercialisation écrit. C’est sur ce document que se juge
                  l’intérêt d’une exclusivité.
                </p>
              </section>

              <section id="agent" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Côté agent
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Obtenir et sécuriser le mandat&nbsp;: la méthode en 5 points
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
                      Envie de maîtriser toute la loi Hoguet&nbsp;?
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      Carte professionnelle, garantie financière, sanctions&nbsp;:
                      notre guide complet fait le tour du texte fondateur de la
                      profession.
                    </p>
                  </div>
                  <Link
                    href="/guides/loi-hoguet-guide-complet"
                    className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-navy px-4 py-3 text-sm font-black text-white transition hover:bg-brand-navy-mid"
                  >
                    Guide loi Hoguet
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </section>

              <section id="resiliation" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Durée et sortie
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Durée, résiliation et pénalités&nbsp;: les règles du jeu
                </h2>
                <div className="mt-6 grid gap-6 md:grid-cols-[1.3fr_1fr]">
                  <div className="space-y-5 text-base leading-8 text-slate-700">
                    <p>
                      Tout mandat est conclu pour une <strong>durée déterminée</strong>&nbsp;:
                      la loi Hoguet prohibe, à peine de nullité, les conventions
                      sans limitation dans le temps — y compris les tacites
                      reconductions indéfinies.
                    </p>
                    <p>
                      Pour les mandats assortis d’une <strong>clause d’exclusivité</strong>,
                      l’article 78 du décret ajoute une protection&nbsp;: passé{" "}
                      <strong>trois mois</strong> à compter de la signature, le
                      mandat peut être dénoncé à tout moment par chacune des
                      parties, avec un <strong>préavis d’au moins quinze jours</strong>{" "}
                  notifié par lettre recommandée avec accusé de réception.
                    </p>
                    <p>
                      La <strong>clause pénale</strong>, qui sanctionne le
                      contournement de l’exclusivité, n’est valable que si elle
                      résulte d’une stipulation expresse, mentionnée en caractères
                      très apparents, et elle ne peut excéder le montant des
                      honoraires prévus au mandat.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <CalendarDays className="h-8 w-8 text-brand-gold-dark" aria-hidden />
                    <h3 className="mt-5 font-black text-brand-navy">
                      Le calendrier type d’un exclusif
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm text-slate-700">
                      {[
                        "Jour J : signature du mandat à durée déterminée",
                        "J + 3 mois : dénonciation possible des deux côtés",
                        "Préavis : 15 jours minimum, par LRAR",
                        "Échéance : fin du mandat ou renouvellement écrit",
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
                  Mandat exclusif ou simple&nbsp;: FAQ
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
                      <SourceLink href={LEGIFRANCE_HOGUET_URL}>
                        Loi n°&nbsp;70-9 du 2 janvier 1970 (loi Hoguet) — Légifrance
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Mandat écrit préalable, limitation dans le temps, commission due à l’issue effective.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={LEGIFRANCE_DECRET_URL}>
                        Décret n°&nbsp;72-678 du 20 juillet 1972 — Légifrance
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Contenu des mandats, clauses d’exclusivité et pénales, dénonciation après 3 mois avec préavis de 15 jours.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={BPI_AGENT_URL}>
                        Agent immobilier&nbsp;: réglementation de l’activité — Bpifrance Création
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Synthèse des obligations applicables aux professionnels de la transaction.
                      </p>
                    </li>
                  </ul>
                  <p className="mt-6 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500">
                    Informations vérifiées le 31 juillet 2026. Ce guide présente
                    le cadre général et ne remplace ni les textes officiels ni
                    l’analyse de votre mandat par un professionnel du droit.
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
                      Le juridique immobilier, au cœur de la formation
                    </h2>
                    <p className="mt-3 leading-7 text-white/75">
                      Mandats, honoraires, obligations du professionnel&nbsp;: le
                      parcours loi ALUR de MonPassFormation consacre des modules
                      entiers au cadre légal de la transaction, avec cas pratiques
                      et supports exploitables.
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
