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
const PAGE_PATH = "/guides/loi-hoguet-guide-complet";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const COVER_URL = `${SITE_URL}/generated/fal/transaction/cover-immobilier.jpg`;
const LOI_HOGUET_URL =
  "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000512228/";
const DECRET_72_678_URL =
  "https://www.legifrance.gouv.fr/loda/id/LEGITEXT000006061974/";
const CCI_RENEWAL_URL =
  "https://www.cci.fr/ressources/formalites-en-ligne/fichier-des-professionnels-de-limmobilier/renouvellement-de-carte-professionnelle";

const title = "Loi Hoguet : le guide complet des règles du métier d’agent immobilier";
const description =
  "Mandat écrit préalable, carte professionnelle, capacité financière, rémunération à l’issue effective, mentions obligatoires : le guide de référence de la loi Hoguet.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    absolute: title,
  },
  description,
  keywords: [
    "loi hoguet",
    "loi n°70-9 du 2 janvier 1970",
    "décret 72-678",
    "mandat écrit agent immobilier",
    "carte professionnelle immobilier",
    "rémunération agent immobilier",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  category: "Droit des professions immobilières",
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
        alt: "Guide complet de la loi Hoguet pour les professionnels de l’immobilier",
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
    question: "Quelles activités sont réglementées par la loi Hoguet ?",
    answer:
      "L’article 1er de la loi n° 70-9 du 2 janvier 1970 vise les personnes qui, à titre habituel et rémunéré, se livrent à l’entremise ou à la négociation pour l’achat, la vente, l’échange, la location ou la sous-location d’immeubles ou de fonds de commerce, la gestion immobilière, ainsi que la vente de listes ou fichiers de biens.",
  },
  {
    question: "Le mandat écrit est-il vraiment obligatoire avant toute action ?",
    answer:
      "Oui. L’article 6 de la loi exige une convention écrite — le mandat — conclue préalablement, qui précise notamment les conditions de rémunération et la partie qui en aura la charge. Un mandat verbal ne permet ni d’agir légalement ni d’exiger des honoraires.",
  },
  {
    question: "Quand l’agent immobilier peut-il exiger sa rémunération ?",
    answer:
      "Uniquement lorsque l’opération a été effectivement conclue et constatée dans un seul acte écrit contenant l’engagement des parties. Aucune somme — honoraires, frais de recherche ou de publicité — n’est due avant ce moment, sauf exceptions prévues par les textes pour certains mandats professionnels.",
  },
  {
    question: "Quelle est la durée de validité de la carte professionnelle ?",
    answer:
      "La carte professionnelle est valable trois ans, depuis le décret n° 2015-702 du 19 juin 2015 qui a modifié l’article 8 du décret n° 72-678. Auparavant — c’est la règle d’avant la loi ALUR de 2014 — elle était valable dix ans. La demande de renouvellement se présente dans les deux mois précédant l’expiration.",
  },
  {
    question: "Peut-on obtenir la carte sans diplôme ?",
    answer:
      "Oui, par l’expérience professionnelle : dix ans d’expérience en qualité de salarié (quatre ans en position de cadre ou catégorie A), ou, pour les titulaires du baccalauréat, trois ans d’emploi subordonné auprès d’un titulaire de la carte professionnelle.",
  },
  {
    question: "Un agent immobilier peut-il détenir les fonds de ses clients ?",
    answer:
      "Seulement s’il dispose d’une garantie financière — au minimum 110 000 euros, ramenés à 30 000 euros pendant les deux premières années d’exercice — et d’un compte spécial affecté à ces sommes (compte séquestre). À défaut, sa carte porte la mention « Non-détention de fonds » et il ne peut recevoir aucun versement.",
  },
  {
    question: "Quelles sanctions en cas d’exercice illégal du métier ?",
    answer:
      "L’article 14 de la loi Hoguet punit l’exercice sans carte professionnelle ou le non-respect de ses dispositions d’une peine pouvant aller jusqu’à six mois d’emprisonnement et 7 500 euros d’amende, sans préjudice des sanctions civiles : nullité du mandat, impossibilité de percevoir des honoraires.",
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
          name: "Loi Hoguet",
        },
        {
          "@type": "Thing",
          name: "Carte professionnelle immobilier",
        },
        {
          "@type": "Thing",
          name: "Mandat immobilier",
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
          name: "Loi Hoguet : guide complet",
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
    icon: Scale,
    value: "1970",
    label: "loi n° 70-9",
    detail: "Le socle du métier, signé le 2 janvier 1970, complété par le décret n° 72-678 du 20 juillet 1972.",
  },
  {
    icon: FileCheck2,
    value: "Mandat",
    label: "écrit et préalable",
    detail: "Aucune opération ne peut être engagée sans une convention écrite signée au préalable.",
  },
  {
    icon: Clock3,
    value: "3 ans",
    label: "de validité de la carte",
    detail: "La carte professionnelle est valable trois ans — et non dix : la durée de dix ans date d’avant 2014.",
  },
];

const audiences = [
  {
    title: "Transactions",
    text: "Achat, vente, échange, location ou sous-location d’immeubles et de fonds de commerce : le cœur de l’activité d’agent immobilier, sous la mention « Transactions sur immeubles et fonds de commerce ».",
  },
  {
    title: "Gestion immobilière",
    text: "Gérance de biens, administration de biens immobiliers et syndic de copropriété : des activités réglementées qui supposent des cartes et des garanties adaptées.",
  },
  {
    title: "Vente de listes",
    text: "La mise en relation par vente de listes ou fichiers de biens à louer ou à vendre est également encadrée, avec une convention écrite spécifique et des règles propres de rémunération.",
  },
];

const carteConditions = [
  "Une aptitude professionnelle justifiée par un diplôme ou par l’expérience",
  "Une garantie financière d’au moins 110 000 € (30 000 € les deux premières années) si détention de fonds",
  "Une assurance responsabilité civile professionnelle couvrant l’activité",
  "Une carte valable trois ans, renouvelée dans les deux mois précédant son expiration",
  "La mention du numéro de carte sur les documents professionnels et annonces",
  "Un compte spécial (compte séquestre) pour les sommes reçues pour le compte de tiers",
];

const planningSteps = [
  {
    title: "Vérifier la validité de la carte",
    text: "Contrôlez la date d’expiration : la carte est valable trois ans et la demande de renouvellement se présente dans les deux mois précédant l’échéance auprès de la CCI.",
  },
  {
    title: "Sécuriser chaque mandat par écrit",
    text: "Avant toute action, faites signer une convention écrite précisant la mission, la rémunération et la partie qui en a la charge. Sans mandat écrit préalable, pas d’honoraires.",
  },
  {
    title: "Encadrer la réception des fonds",
    text: "Ne recevez des sommes que si votre garantie financière le permet, sur le compte spécial dédié, et vérifiez que vos documents portent bien les mentions réglementaires.",
  },
  {
    title: "N’exiger la rémunération qu’à l’issue effective",
    text: "Attendez que l’opération soit effectivement conclue et constatée dans un seul acte écrit avant de facturer vos honoraires.",
  },
  {
    title: "Tenir les registres et justificatifs",
    text: "Registre des mandats, carnets à souche, comptes rendus : la tenue des documents réglementaires est contrôlée et doit être conservée selon les durées prévues.",
  },
];

const relatedLinks = [
  {
    href: "/formation-juridique-immobilier",
    label: "Formation juridique immobilier",
    detail: "Approfondir la loi Hoguet et ses applications quotidiennes.",
  },
  {
    href: "/guides/carte-professionnelle-immobilier-prix-delais",
    label: "Carte professionnelle : prix et délais",
    detail: "Obtenir ou renouveler votre carte en connaissance de cause.",
  },
  {
    href: "/guides/renouvellement-carte-professionnelle-immobilier",
    label: "Renouvellement de la carte professionnelle",
    detail: "Le calendrier et les justificatifs du renouvellement.",
  },
  {
    href: "/guides/mandat-exclusif-vs-mandat-simple",
    label: "Mandat exclusif ou mandat simple",
    detail: "Choisir la forme de mandat adaptée à chaque situation.",
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

export default function LoiHoguetGuideCompletPage() {
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
                    Loi Hoguet
                  </li>
                </ol>
              </nav>

              <div className="mt-9 max-w-4xl">
                <p className="inline-flex rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-brand-gold-pale">
                  Guide de référence 2026
                </p>
                <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                  Loi Hoguet&nbsp;: le guide complet du cadre du métier d’agent immobilier
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl">
                  Mandat écrit préalable, carte professionnelle, capacité financière, rémunération due uniquement à l’issue effective de l’opération&nbsp;: tout ce que la loi n° 70-9 du 2 janvier 1970 impose aux professionnels de l’immobilier.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#socle"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gold px-5 py-3.5 text-sm font-black text-brand-navy transition hover:bg-brand-gold-hover"
                  >
                    Comprendre la loi Hoguet
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <a
                    href={LOI_HOGUET_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    Lire la loi sur Légifrance
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
                    ["#socle", "Le socle juridique"],
                    ["#carte", "Carte professionnelle"],
                    ["#mandat", "Mandat et rémunération"],
                    ["#fonds", "Détention de fonds"],
                    ["#conformite", "Conformité et sanctions"],
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
              <section id="socle" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Le pilier du métier
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy sm:text-4xl">
                  La loi du 2 janvier 1970 et son décret d’application
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
                  <p>
                    La{" "}
                    <SourceLink href={LOI_HOGUET_URL}>
                      loi n° 70-9 du 2 janvier 1970
                    </SourceLink>
                    , dite <strong>loi Hoguet</strong>, réglemente les conditions
                    d’exercice des activités relatives aux opérations portant sur
                    les immeubles et les fonds de commerce. Son décret
                    d’application, le{" "}
                    <SourceLink href={DECRET_72_678_URL}>
                      décret n° 72-678 du 20 juillet 1972
                    </SourceLink>
                    , en précise les modalités&nbsp;: carte professionnelle,
                    garantie financière, tenue des registres, rémunération.
                  </p>
                  <p>
                    Ensemble, ces textes poursuivent un objectif unique&nbsp;:
                    <strong> protéger le consommateur</strong> en réservant
                    l’intermédiation immobilière à des professionnels
                    identifiables, solvables et assurés, et en interdisant toute
                    rémunération avant la conclusion effective de l’opération.
                  </p>
                </div>

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
              </section>

              <section id="carte" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  La condition d’exercice
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Carte professionnelle&nbsp;: conditions, garanties, validité
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-700">
                  Nul ne peut exercer à titre habituel et rémunéré les activités
                  visées sans détenir la <strong>carte professionnelle</strong>,
                  délivrée par la chambre de commerce et d’industrie. Sa
                  délivrance est subordonnée à plusieurs conditions
                  cumulatives&nbsp;:
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {carteConditions.map((condition) => (
                    <li
                      key={condition}
                      className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold leading-6 text-slate-700"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold-dark" aria-hidden />
                      {condition}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 flex gap-3 rounded-xl bg-brand-navy/5 p-4 text-sm leading-6 text-slate-700">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-navy" aria-hidden />
                  Attention aux idées reçues&nbsp;: la carte professionnelle est
                  valable <strong>trois ans</strong> depuis le décret n° 2015-702
                  du 19 juin 2015. La validité de dix ans correspond à la règle
                  d’avant la loi ALUR de 2014&nbsp;; elle ne s’applique plus.
                </p>
              </section>

              <section id="mandat" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  L’acte fondateur
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Mandat écrit préalable et rémunération à l’issue effective
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
                  <p>
                    L’article 6 de la loi Hoguet impose une <strong>convention
                    écrite préalable</strong> — le mandat — entre le
                    professionnel et son client. Elle précise les conditions
                    dans lesquelles le mandataire peut recevoir des sommes, les
                    modalités de la reddition de compte, et surtout les{" "}
                    <strong>conditions de détermination de la rémunération</strong>{" "}
                    ainsi que la partie qui en aura la charge.
                  </p>
                  <p>
                    Sans mandat écrit signé avant toute action, le professionnel
                    ne peut ni agir régulièrement, ni prétendre à la moindre
                    rémunération.
                  </p>
                </div>

                <div className="mt-8 overflow-hidden rounded-2xl bg-brand-navy text-white">
                  <div className="grid gap-0 md:grid-cols-[1fr_1.35fr]">
                    <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-8">
                      <p className="text-4xl font-black text-brand-gold">Article 6</p>
                      <p className="mt-2 font-bold">la règle d’or de la rémunération</p>
                    </div>
                    <div className="p-6 md:p-8">
                      <p className="leading-7 text-white/80">
                        Aucune somme — honoraires, frais de recherche, de
                        démarche ou de publicité —{" "}
                        <strong className="text-white">n’est due avant que
                        l’opération ait été effectivement conclue et constatée
                        dans un seul acte écrit</strong> contenant l’engagement
                        des parties. En présence d’une clause de dédit ou d’une
                        condition suspensive, la conclusion est différée en
                        conséquence.
                      </p>
                      <p className="mt-4 text-sm text-white/70">
                        Source&nbsp;:{" "}
                        <a
                          href={LOI_HOGUET_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-brand-gold-pale underline underline-offset-4"
                        >
                          loi n° 70-9, article 6, sur Légifrance
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="fonds" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  La protection des sommes
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Détention de fonds, garantie financière et compte séquestre
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
                  <p>
                    Recevoir des fonds de clients — séquestres, acomptes,
                    loyers — n’est possible que si le titulaire justifie d’une{" "}
                    <strong>garantie financière</strong> d’au moins{" "}
                    <strong>110&nbsp;000&nbsp;euros</strong> (ramenée à{" "}
                    <strong>30&nbsp;000&nbsp;euros</strong> pendant les deux
                    premières années d’exercice) et d’un <strong>compte
                    spécial</strong> affecté exclusivement à ces sommes, souvent
                    appelé compte séquestre.
                  </p>
                  <p>
                    À défaut de garantie, la carte porte la mention{" "}
                    <strong>«&nbsp;Non-détention de fonds&nbsp;»</strong>&nbsp;: le
                    professionnel ne peut alors recevoir aucun versement pour le
                    compte de tiers. La <strong>responsabilité civile
                    professionnelle</strong> doit par ailleurs être assurée en
                    toutes circonstances.
                  </p>
                </div>
                <p className="mt-5 flex gap-3 rounded-xl bg-brand-navy/5 p-4 text-sm leading-6 text-slate-700">
                  <Users className="mt-0.5 h-5 w-5 shrink-0 text-brand-navy" aria-hidden />
                  Pour le client, ces mécanismes sont la garantie que ses
                  deniers ne se confondent jamais avec la trésorerie de
                  l’agence&nbsp;: vérifiez la mention de la carte avant tout
                  versement.
                </p>
              </section>

              <section id="conformite" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Méthode pratique
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Cinq réflexes de conformité au quotidien
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
                    <Scale className="mt-1 h-6 w-6 shrink-0 text-brand-gold-dark" aria-hidden />
                    <div>
                      <h3 className="font-black text-brand-navy">
                        Les sanctions de l’article 14
                      </h3>
                      <p className="mt-2 leading-7 text-slate-700">
                        L’exercice illégal du métier — absence de carte,
                        méconnaissance des règles de mandat ou de détention de
                        fonds — est puni, au titre de l’article 14 de la loi,
                        d’une peine pouvant atteindre{" "}
                        <strong>six mois d’emprisonnement et 7&nbsp;500&nbsp;euros
                        d’amende</strong>, sans préjudice de la nullité civile
                        des conventions irrégulières.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-7 flex flex-col items-start justify-between gap-5 rounded-2xl border border-brand-gold/30 bg-brand-gold/10 p-6 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="font-black text-brand-navy">
                      Maîtriser la loi Hoguet en profondeur&nbsp;?
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      Notre formation juridique immobilier détaille la loi et le
                      décret, article par article, avec leurs applications en
                      agence.
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
                  Loi Hoguet&nbsp;: FAQ
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
                      <SourceLink href={LOI_HOGUET_URL}>
                        Loi n° 70-9 du 2 janvier 1970, dite « loi Hoguet » — Légifrance
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Champ d’application, mandat écrit, rémunération à
                        l’issue effective, sanctions pénales.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={DECRET_72_678_URL}>
                        Décret n° 72-678 du 20 juillet 1972 — Légifrance
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Carte professionnelle (validité de trois ans), garantie
                        financière, compte spécial, tenue des registres.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={CCI_RENEWAL_URL}>
                        Renouvellement de carte professionnelle — CCI France
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Période de dépôt de la demande de renouvellement et
                        pièces justificatives.
                      </p>
                    </li>
                  </ul>
                  <p className="mt-6 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500">
                    Informations vérifiées le 31 juillet 2026. Ce guide présente
                    le cadre général de la loi Hoguet et de son décret
                    d’application&nbsp;; il ne remplace ni les textes officiels ni
                    les conseils d’un professionnel du droit sur votre situation.
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
                      Faites de la loi Hoguet votre meilleur réflexe
                    </h2>
                    <p className="mt-3 leading-7 text-white/75">
                      La formation juridique immobilier de MonPassFormation
                      transforme les exigences de la loi Hoguet en pratiques
                      simples et sécurisées pour votre activité quotidienne.
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
