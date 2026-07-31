import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

const SITE_URL = "https://monpassformation.com";
const PAGE_PATH = "/guides/immobilier-intelligence-artificielle";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const COVER_URL = `${SITE_URL}/generated/fal/transaction/cover-immobilier.jpg`;
const CNIL_IA_URL = "https://www.cnil.fr/fr/intelligence-artificielle";
const STRATEGIE_IA_URL =
  "https://www.economie.gouv.fr/actualites/strategie-nationale-intelligence-artificielle";
const AI_ACT_URL = "https://eur-lex.europa.eu/eli/reg/2024/1689/oj";

const title = "Intelligence artificielle et immobilier : usages, limites, formation";
const description =
  "Estimation, rédaction d’annonces, prospection, visites virtuelles : ce que l’intelligence artificielle change pour les agents immobiliers, ses limites et comment se former.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    absolute: title,
  },
  description,
  keywords: [
    "intelligence artificielle immobilier",
    "IA agent immobilier",
    "estimation immobilière IA",
    "rédaction annonce immobilière IA",
    "visite virtuelle intelligence artificielle",
    "formation IA immobilier",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  category: "Innovation et pratiques professionnelles immobilières",
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
        alt: "Usages de l’intelligence artificielle pour les agents immobiliers",
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
    question: "L’IA peut-elle estimer un bien à la place de l’agent immobilier ?",
    answer:
      "Non. Les outils d’estimation automatisée croisent des données de transactions comparables et des tendances de marché, mais ils ne remplacent ni la visite du bien ni la connaissance locale. L’avis de valeur reste une prestation professionnelle que l’agent assume et signe ; l’IA sert d’aide, pas de décideur.",
  },
  {
    question: "Peut-on rédiger ses annonces immobilières avec une IA générative ?",
    answer:
      "Oui, à condition de garder le contrôle : vérifiez chaque fait (surface, prestations, diagnostics), conservez les mentions obligatoires comme la classe énergétique du DPE et écartez toute formulation discriminatoire ou trompeuse. La responsabilité du contenu publié reste celle de l’agence.",
  },
  {
    question: "Peut-on saisir des données clients dans un outil d’IA ?",
    answer:
      "Avec la plus grande prudence. Les coordonnées, situations familiales ou financières de vos clients sont des données personnelles protégées par le RGPD. Évitez de les saisir dans des outils grand public non maîtrisés et suivez les recommandations de la CNIL sur l’usage des systèmes d’IA.",
  },
  {
    question: "L’intelligence artificielle est-elle encadrée par la loi ?",
    answer:
      "Oui. Le règlement européen sur l’intelligence artificielle (règlement (UE) 2024/1689, dit « AI Act ») instaure un cadre progressif fondé sur le niveau de risque des systèmes, avec notamment des exigences de transparence. En France, la CNIL publie des recommandations pour concilier IA et protection des données.",
  },
  {
    question: "Visites virtuelles et home staging par IA : quelles précautions ?",
    answer:
      "Ces outils améliorent la mise en valeur d’un bien, mais les visuels retouchés ou générés doivent être présentés comme tels. Une photo modifiée sans information claire peut être qualifiée de pratique commerciale trompeuse : indiquez toujours qu’il s’agit d’une visualisation virtuelle.",
  },
  {
    question: "Faut-il une formation pour utiliser l’IA dans une agence ?",
    answer:
      "C’est fortement recommandé. Une formation structurée couvre le choix des outils, la qualité des consignes (prompts), la protection des données et les limites juridiques. Elle peut s’intégrer à votre cycle de formation continue des professionnels de l’immobilier, en lien direct avec votre activité.",
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
          name: "Intelligence artificielle",
        },
        {
          "@type": "Thing",
          name: "Agent immobilier",
        },
        {
          "@type": "Thing",
          name: "Transformation numérique",
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
          name: "Intelligence artificielle et immobilier",
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
    icon: Sparkles,
    value: "4 usages",
    label: "concrets en agence",
    detail: "Estimation assistée, annonces, prospection et visites virtuelles : les cas d’usage les plus matures.",
  },
  {
    icon: ShieldCheck,
    value: "RGPD",
    label: "et recommandations CNIL",
    detail: "Les données personnelles de vos clients restent protégées, y compris dans les outils d’IA.",
  },
  {
    icon: Users,
    value: "L’humain",
    label: "garde la décision",
    detail: "L’agent valide chaque production de l’outil et engage sa responsabilité professionnelle.",
  },
];

const useCases = [
  {
    title: "Estimation assistée",
    text: "Analyse de transactions comparables et de tendances locales pour préparer un pré-avis de valeur, à confronter ensuite à la visite du bien et à votre connaissance du secteur.",
  },
  {
    title: "Rédaction d’annonces",
    text: "Génération de trames adaptées à chaque portail et à chaque audience. La relecture reste obligatoire : faits exacts, mentions légales, aucune formulation discriminatoire.",
  },
  {
    title: "Prospection et qualification",
    text: "Segmentation des contacts, priorisation des appels et scénarios de relance pour concentrer votre temps sur les prospects les plus engagés.",
  },
  {
    title: "Visites virtuelles et home staging",
    text: "Mise en valeur 3D, dépersonnalisation des photos et projections d’aménagement, en informant clairement que les visuels sont retouchés ou générés.",
  },
];

const limites = [
  "Des erreurs factuelles possibles : surfaces, diagnostics ou prix inventés si la consigne est mal cadrée",
  "Des biais hérités des données d’entraînement, à surveiller dans les estimations comme dans les textes",
  "La protection des données personnelles : le RGPD s’applique pleinement aux usages d’IA",
  "Une exigence de transparence envers les clients sur les contenus générés ou retouchés",
  "Des mentions légales qui ne se délèguent pas : DPE, surface Carrez, honoraires",
  "Une responsabilité professionnelle inchangée : l’agent répond de ce qu’il publie et conseille",
];

const planningSteps = [
  {
    title: "Définir vos cas d’usage prioritaires",
    text: "Commencez par un ou deux usages à forte valeur et faible risque — annonces, relances — avant d’étendre l’IA à l’estimation ou à la relation client.",
  },
  {
    title: "Choisir des outils maîtrisés",
    text: "Privilégiez des solutions professionnelles documentées : localisation des données, conditions d’utilisation, conformité RGPD. Évitez les outils grand public pour les données clients.",
  },
  {
    title: "Encadrer la saisie des informations",
    text: "Fixez une règle simple en agence : aucune donnée personnelle identifiable dans une consigne sans nécessité, et anonymisation systématique lorsque c’est possible.",
  },
  {
    title: "Instaurer une relecture systématique",
    text: "Aucune annonce, estimation ou réponse client générée par l’IA ne part sans validation humaine. Cette discipline protège vos clients et votre responsabilité.",
  },
  {
    title: "Former l’équipe et tracer les usages",
    text: "Organisez une montée en compétence collective et consignez les usages autorisés : c’est la meilleure façon d’industrialiser sans perdre le contrôle.",
  },
];

const relatedLinks = [
  {
    href: "/formation-immobiliere-loi-alur",
    label: "Formation immobilière loi ALUR (42 h)",
    detail: "Intégrez les nouvelles pratiques à votre cycle de formation continue.",
  },
  {
    href: "/guides/estimation-immobiliere-methodes",
    label: "Estimation immobilière : les méthodes",
    detail: "Les méthodes de référence que l’IA ne remplace pas.",
  },
  {
    href: "/guides/contenus-obligatoires-formation-alur",
    label: "Contenus obligatoires de la formation ALUR",
    detail: "Les thèmes recevables pour votre formation continue.",
  },
  {
    href: "/formation-deontologie-immobilier",
    label: "Formation déontologie immobilier",
    detail: "Transparence et non-discrimination, y compris avec l’IA.",
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

export default function ImmobilierIntelligenceArtificiellePage() {
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
                    IA et immobilier
                  </li>
                </ol>
              </nav>

              <div className="mt-9 max-w-4xl">
                <p className="inline-flex rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-brand-gold-pale">
                  Guide pratique 2026
                </p>
                <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                  Intelligence artificielle et immobilier&nbsp;: usages concrets, limites et formation
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl">
                  Estimation assistée, rédaction d’annonces, prospection, visites virtuelles&nbsp;: ce que l’IA change réellement dans le quotidien d’un agent immobilier, ce qu’elle ne doit pas faire, et comment monter en compétence.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#usages"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gold px-5 py-3.5 text-sm font-black text-brand-navy transition hover:bg-brand-gold-hover"
                  >
                    Découvrir les usages concrets
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <a
                    href={CNIL_IA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    Les recommandations de la CNIL
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
                    ["#usages", "Usages concrets"],
                    ["#limites", "Limites et risques"],
                    ["#bonnes-pratiques", "Bonnes pratiques"],
                    ["#se-former", "Se former à l’IA"],
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
              <section id="usages" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Le terrain
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy sm:text-4xl">
                  Quatre usages concrets pour les agents immobiliers
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700">
                  Loin des effets d’annonce, l’IA trouve déjà sa place dans les
                  agences. Voici les quatre cas d’usage les plus aboutis — tous
                  partagent la même règle&nbsp;: l’outil produit, le professionnel
                  valide.
                </p>
                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {useCases.map((useCase, index) => (
                    <div
                      key={useCase.title}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-sm font-black text-white">
                        {index + 1}
                      </span>
                      <h3 className="mt-5 text-lg font-black text-brand-navy">
                        {useCase.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {useCase.text}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="limites" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Vigilance
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Les limites à connaître avant de déployer l’IA
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-700">
                  Un outil d’IA mal encadré expose l’agence à des erreurs, à des
                  manquements au RGPD et à des pratiques trompeuses. Les points
                  de vigilance essentiels&nbsp;:
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {limites.map((limite) => (
                    <li
                      key={limite}
                      className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold leading-6 text-slate-700"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold-dark" aria-hidden />
                      {limite}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 overflow-hidden rounded-2xl bg-brand-navy text-white">
                  <div className="grid gap-0 md:grid-cols-[1fr_1.35fr]">
                    <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-8">
                      <p className="text-4xl font-black text-brand-gold">AI Act</p>
                      <p className="mt-2 font-bold">le cadre européen de l’IA</p>
                    </div>
                    <div className="p-6 md:p-8">
                      <p className="leading-7 text-white/80">
                        Le <strong className="text-white">règlement (UE) 2024/1689</strong>{" "}
                        établit des règles harmonisées sur l’intelligence
                        artificielle, proportionnées au niveau de risque des
                        systèmes. En France, la{" "}
                        <strong className="text-white">CNIL</strong> accompagne les
                        professionnels pour concilier IA et protection des
                        données personnelles.
                      </p>
                      <p className="mt-4 text-sm text-white/70">
                        Source&nbsp;:{" "}
                        <a
                          href={AI_ACT_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-brand-gold-pale underline underline-offset-4"
                        >
                          règlement (UE) 2024/1689 sur EUR-Lex
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="bonnes-pratiques" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Méthode pratique
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Déployer l’IA dans votre agence en cinq étapes
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
                <p className="mt-5 flex gap-3 rounded-xl bg-brand-navy/5 p-4 text-sm leading-6 text-slate-700">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-brand-navy" aria-hidden />
                  La tentation du « tout automatique » est le principal écueil&nbsp;:
                  une agence qui publie sans relire transfère son risque
                  juridique à un outil qui n’assume aucune responsabilité.
                </p>
              </section>

              <section id="se-former" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Compétences
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Pourquoi se former à l’IA quand on est agent immobilier&nbsp;?
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
                  <p>
                    La puissance publique fait de la diffusion de l’IA dans les
                    entreprises une priorité — la{" "}
                    <SourceLink href={STRATEGIE_IA_URL}>
                      stratégie nationale pour l’intelligence artificielle
                    </SourceLink>{" "}
                    met l’accent sur l’adoption par les PME et sur la formation
                    des professionnels. Le secteur immobilier n’échappe pas à ce
                    mouvement&nbsp;: les agences qui structurent leurs usages
                    gagnent en productivité sans dégrader la conformité.
                  </p>
                  <p>
                    Une formation dédiée vous apprend à choisir les outils, à
                    formuler des consignes efficaces, à sécuriser les données
                    clients et à intégrer l’IA dans vos processus existants.
                    Elle peut s’inscrire dans votre cycle de{" "}
                    <strong>formation continue</strong>, en lien direct avec
                    votre activité professionnelle.
                  </p>
                </div>
                <div className="mt-7 flex flex-col items-start justify-between gap-5 rounded-2xl border border-brand-gold/30 bg-brand-gold/10 p-6 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="font-black text-brand-navy">
                      Structurer vos usages de l’IA&nbsp;?
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      Notre parcours de formation immobilière intègre les
                      pratiques numériques et la conformité, pour une adoption
                      utile et sécurisée.
                    </p>
                  </div>
                  <Link
                    href="/formation-immobiliere-loi-alur"
                    className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-navy px-4 py-3 text-sm font-black text-white transition hover:bg-brand-navy-mid"
                  >
                    Découvrir la formation
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </section>

              <section id="faq" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Questions fréquentes
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  IA et immobilier&nbsp;: FAQ
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
                      <SourceLink href={CNIL_IA_URL}>
                        Intelligence artificielle — CNIL
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Recommandations pour développer et utiliser des systèmes
                        d’IA respectueux des données personnelles.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={AI_ACT_URL}>
                        Règlement (UE) 2024/1689 sur l’intelligence artificielle — EUR-Lex
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Le cadre européen harmonisé applicable aux systèmes
                        d’IA, selon leur niveau de risque.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={STRATEGIE_IA_URL}>
                        La stratégie nationale pour l’intelligence artificielle — economie.gouv.fr
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Les orientations publiques pour la diffusion de l’IA
                        dans l’économie et la formation des professionnels.
                      </p>
                    </li>
                  </ul>
                  <p className="mt-6 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500">
                    Informations vérifiées le 31 juillet 2026. Ce guide décrit
                    des usages et des principes de prudence généraux&nbsp;; il ne
                    remplace ni les textes officiels ni les conseils d’un
                    professionnel sur vos outils et vos traitements de données.
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
                      Formez-vous aux nouvelles pratiques du métier
                    </h2>
                    <p className="mt-3 leading-7 text-white/75">
                      Numérique, conformité, relation client&nbsp;: le parcours de
                      formation immobilière de MonPassFormation prépare votre
                      agence aux usages de demain, sans négliger le cadre légal.
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
                  <Link href="/guides" className="transition hover:text-brand-navy">
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
                    href="/formation-deontologie-immobilier"
                    className="transition hover:text-brand-navy"
                  >
                    Formation déontologie
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
