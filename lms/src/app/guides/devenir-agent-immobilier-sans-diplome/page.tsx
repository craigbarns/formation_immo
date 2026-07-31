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
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";

const SITE_URL = "https://monpassformation.com";
const PAGE_PATH = "/guides/devenir-agent-immobilier-sans-diplome";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const COVER_URL = `${SITE_URL}/generated/fal/transaction/cover-immobilier.jpg`;
const LEGIFRANCE_LAW_URL =
  "https://www.legifrance.gouv.fr/loda/id/LEGITEXT000006068387/";
const LEGIFRANCE_DECREE_URL =
  "https://www.legifrance.gouv.fr/loda/id/LEGITEXT000006061974/";
const CCI_CONDITIONS_URL =
  "https://www.entreprises.cci-paris-idf.fr/fiches-pratiques/les-conditions-dobtention-dune-carte-professionnelle-loi-hoguet";
const SERVICE_PUBLIC_URL =
  "https://entreprendre.service-public.fr/vosdroits/F32994";
const DGCCRF_URL =
  "https://www.economie.gouv.fr/dgccrf/les-fiches-pratiques-et-les-faq/lagent-immobilier-les-regles-qui-encadrent-la-profession";

const title = "Devenir agent immobilier sans diplôme : les voies réelles (2026)";
const description =
  "Sans diplôme, l'accès à la carte professionnelle reste possible : expérience salariée, VAE, métier de négociateur. Parcours réaliste, conditions légales et pièges à éviter.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    absolute: title,
  },
  description,
  keywords: [
    "devenir agent immobilier sans diplôme",
    "agent immobilier sans diplôme",
    "carte T sans diplôme",
    "VAE immobilier agent",
    "négociateur immobilier sans diplôme",
    "aptitude professionnelle expérience immobilier",
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
        alt: "Devenir agent immobilier sans diplôme : les voies possibles",
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
    question: "Peut-on vraiment devenir agent immobilier sans diplôme ?",
    answer:
      "Oui, par étapes. Vous pouvez entrer dans le métier comme négociateur habilité (salarié ou agent commercial) sans détenir la carte. Et pour obtenir la carte en propre, la voie « expérience » de l'article 14 du décret de 1972 n'exige aucun diplôme : dix ans d'emploi salarié dans l'activité, ou quatre ans en poste de cadre ou de catégorie A. La VAE offre un raccourci en transformant votre expérience en diplôme.",
  },
  {
    question: "Quelle différence entre agent immobilier et négociateur ?",
    answer:
      "L'agent immobilier est titulaire de la carte professionnelle délivrée par la CCI et engage sa responsabilité. Le négociateur travaille pour le compte d'un titulaire, sous couvert d'une habilitation écrite : il prospecte, fait visiter et négocie, sans pouvoir détenir de fonds ni diriger une agence s'il est agent commercial.",
  },
  {
    question: "Faut-il le baccalauréat pour la voie « trois ans d'expérience » ?",
    answer:
      "Oui. L'article 12 du décret exige le baccalauréat (ou un titre équivalent dans les filières juridique, économique ou commerciale) en plus de trois ans d'emploi salarié. Sans bac, il reste la voie des dix ans (quatre ans en poste cadre) ou la VAE vers un diplôme recevable.",
  },
  {
    question: "Combien de temps faut-il pour obtenir la carte sans diplôme ?",
    answer:
      "Tout dépend de votre expérience déjà acquise. Si vous totalisez les durées requises, la demande peut être déposée dès que garantie et assurance sont en place. Sinon, la VAE prend généralement plusieurs mois (livret, accompagnement éventuel, jury). Comptez ensuite le délai d'instruction de la CCI.",
  },
  {
    question: "Peut-on exercer en auto-entrepreneur ?",
    answer:
      "L'activité d'agent immobilier titulaire de la carte ne peut pas s'exercer sous le statut de la micro-entreprise. En revanche, le négociateur indépendant exerce sous le statut d'agent commercial, fréquemment en entreprise individuelle, immatriculé au registre spécial des agents commerciaux.",
  },
  {
    question: "La VAE est-elle payante ?",
    answer:
      "Oui, son coût varie selon le certificateur et l'accompagnement choisi. Des financements existent selon votre situation (employeur, OPCO, dispositifs publics) : rapprochez-vous de France VAE et du certificateur du diplôme visé avant de vous engager.",
  },
  {
    question: "Peut-on se reconvertir dans l'immobilier à 40 ou 50 ans ?",
    answer:
      "C'est un parcours fréquent : entrée comme négociateur (souvent agent commercial en réseau), capitalisation d'une expérience documentée, puis carte professionnelle par la VAE ou la voie « expérience ». La formation continue, obligatoire dès l'exercice, structure la montée en compétence juridique.",
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
          name: "Agent immobilier",
        },
        {
          "@type": "Thing",
          name: "Validation des acquis de l'expérience",
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
          name: "Devenir agent immobilier sans diplôme",
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
    icon: Clock3,
    value: "10 ans",
    label: "d'expérience salariée",
    detail: "La voie sans aucun diplôme (art. 14 du décret), dans l'activité visée.",
  },
  {
    icon: FileCheck2,
    value: "4 ans",
    label: "en poste cadre",
    detail: "Durée réduite pour un emploi de cadre ou un emploi public de catégorie A.",
  },
  {
    icon: CalendarDays,
    value: "1 an",
    label: "d'expérience pour la VAE",
    detail: "Seuil d'accès à la validation des acquis de l'expérience.",
  },
];

const voies = [
  {
    title: "L'expérience longue",
    text: "Article 14 du décret : dix ans d'emploi salarié se rattachant à l'activité visée, réduits à quatre ans pour un emploi de cadre ou un emploi public de catégorie A. Aucun diplôme n'est exigé dans cette voie.",
  },
  {
    title: "Le bac + trois ans",
    text: "Article 12 : si vous avez le baccalauréat (ou un titre équivalent niveau 4 en droit, économie ou commerce), trois ans d'emploi salarié dans l'activité suffisent.",
  },
  {
    title: "La VAE",
    text: "La validation des acquis de l'expérience permet d'obtenir, devant jury, un diplôme ou titre visé par le décret — par exemple le BTS professions immobilières — à partir d'un an d'expérience en lien avec la certification.",
  },
];

const negociateurPoints = [
  "Exercice possible sans carte, sous l'habilitation écrite d'un titulaire",
  "Attestation délivrée par le titulaire et visée par le président de la CCI",
  "Compétence professionnelle à justifier depuis la loi ALUR de 2014",
  "Rémunération à la commission, acquise à l'issue effective de l'opération",
  "Formation continue obligatoire, comme pour le titulaire de la carte",
  "Tremplin documenté (bulletins de salaire) vers la carte professionnelle",
];

const parcoursSteps = [
  {
    title: "Entrer comme négociateur",
    text: "Rejoignez une agence ou un réseau comme salarié habilité ou agent commercial. C'est le point d'entrée le plus courant sans diplôme du secteur.",
  },
  {
    title: "Documenter chaque année d'expérience",
    text: "Conservez contrats de travail, bulletins de salaire et attestations d'employeur : ce sont eux qui prouveront vos durées d'emploi devant la CCI.",
  },
  {
    title: "Choisir le bon moment de validation",
    text: "Dès qu'une voie est ouverte (VAE dès un an, expérience à trois, quatre ou dix ans selon votre profil), lancez la validation plutôt que d'attendre.",
  },
  {
    title: "Préparer le dossier de carte",
    text: "Garantie financière si détention de fonds, assurance RC professionnelle, justificatifs d'aptitude : constituez le dossier avant de viser l'installation.",
  },
  {
    title: "Obtenir la carte et structurer l'activité",
    text: "Avec la carte, vous pouvez ouvrir votre propre structure. Beaucoup de professionnels choisissent néanmoins de rester mandataires en réseau.",
  },
];

const pieges = [
  "Croire qu'un examen de capacité existe encore : il est abrogé depuis 2006",
  "« Louer » la carte d'un tiers : pratique illégale, lourdement sanctionnée",
  "Exercer l'activité d'agent immobilier en propre en micro-entreprise : interdit",
  "Négocier sans habilitation écrite : délit puni par l'article 14 de la loi",
  "Oublier que le négociateur doit justifier d'une compétence professionnelle",
  "Perdre les justificatifs d'emploi qui prouveront l'expérience auprès de la CCI",
];

const relatedGuides = [
  {
    href: "/guides/examen-carte-professionnelle-cci",
    title: "Examen de la carte professionnelle",
    text: "Pourquoi il n'y a plus d'examen, et ce qui le remplace.",
  },
  {
    href: "/guides/negociateur-immobilier-statut-salaire",
    title: "Négociateur immobilier : statut et salaire",
    text: "Salarié ou agent commercial : comparer les deux statuts d'entrée.",
  },
  {
    href: "/guides/carte-professionnelle-immobilier-prix-delais",
    title: "Carte professionnelle : prix et délais",
    text: "Frais CCI, pièces du dossier et calendrier d'obtention.",
  },
  {
    href: "/formation-immobiliere-loi-alur",
    title: "Formation loi ALUR 42 h + TRACFIN",
    text: "La formation continue obligatoire, certifiée Qualiopi, dès l'exercice.",
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

export default function DevenirAgentImmobilierSansDiplomePage() {
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
                    Devenir agent immobilier sans diplôme
                  </li>
                </ol>
              </nav>

              <div className="mt-9 max-w-4xl">
                <p className="inline-flex rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-brand-gold-pale">
                  Guide carrière 2026
                </p>
                <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                  Devenir agent immobilier sans diplôme&nbsp;: les voies qui marchent vraiment
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl">
                  Pas de diplôme du secteur&nbsp;? L’expérience professionnelle,
                  la VAE et le métier de négociateur ouvrent un chemin réaliste
                  vers la carte professionnelle. Le parcours, les durées légales
                  et les pièges à éviter.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#voies"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gold px-5 py-3.5 text-sm font-black text-brand-navy transition hover:bg-brand-gold-hover"
                  >
                    Voir les voies d’accès
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <a
                    href={SERVICE_PUBLIC_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    La démarche sur service-public.fr
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
                    ["#possible", "C'est possible : le cadre"],
                    ["#voies", "Les trois voies"],
                    ["#negociateur", "Entrer comme négociateur"],
                    ["#parcours", "Parcours réaliste"],
                    ["#pieges", "Pièges à éviter"],
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
              <section id="possible" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Le cadre légal
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy sm:text-4xl">
                  Sans diplôme, c’est possible — à condition de prouver l’expérience
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
                  <p>
                    La{" "}
                    <SourceLink href={LEGIFRANCE_LAW_URL}>
                      loi n°&nbsp;70-9 du 2 janvier 1970
                    </SourceLink>{" "}
                    exige une <strong>aptitude professionnelle</strong> pour
                    obtenir la carte, pas nécessairement un diplôme. Son décret
                    d’application prévoit plusieurs voies dont deux accessibles
                    sans diplôme du secteur&nbsp;: l’expérience professionnelle
                    salariée et la validation des acquis de l’expérience (VAE).
                  </p>
                  <p>
                    Autre point essentiel&nbsp;: nul besoin d’être titulaire de la
                    carte pour <strong>travailler dans la transaction</strong>.
                    Le métier de négociateur — salarié habilité ou agent
                    commercial — permet d’exercer pour le compte d’un titulaire
                    et de capitaliser l’expérience qui ouvrira ensuite droit à
                    la carte.
                  </p>
                </div>

                <div className="mt-7 rounded-2xl border-l-4 border-brand-gold bg-white p-6 shadow-sm">
                  <div className="flex gap-4">
                    <Scale className="mt-1 h-6 w-6 shrink-0 text-brand-gold-dark" aria-hidden />
                    <div>
                      <h3 className="font-black text-brand-navy">
                        Ce que « sans diplôme » veut dire ici
                      </h3>
                      <p className="mt-2 leading-7 text-slate-700">
                        La voie de l’article 14 n’exige <strong>aucun diplôme</strong>&nbsp;:
                        seules comptent les années d’emploi salarié dans
                        l’activité. La voie de l’article 12 exige, elle, le
                        baccalauréat en plus de trois ans d’expérience. La VAE,
                        elle, sert à obtenir un diplôme à partir de votre
                        pratique.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="voies" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Voies d’accès
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Les trois voies pour prouver votre aptitude
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700">
                  Les conditions exactes figurent dans les articles 11 à 14 du{" "}
                  <SourceLink href={LEGIFRANCE_DECREE_URL}>
                    décret n°&nbsp;72-678 du 20 juillet 1972
                  </SourceLink>{" "}
                  et sur la fiche officielle des{" "}
                  <SourceLink href={CCI_CONDITIONS_URL}>
                    conditions d’obtention de la CCI
                  </SourceLink>
                  .
                </p>
                <div className="mt-7 grid gap-4 md:grid-cols-3">
                  {voies.map((voie, index) => (
                    <div
                      key={voie.title}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-sm font-black text-white">
                        {index + 1}
                      </span>
                      <h3 className="mt-5 text-lg font-black text-brand-navy">
                        {voie.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {voie.text}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-5 flex gap-3 rounded-xl bg-brand-navy/5 p-4 text-sm leading-6 text-slate-700">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-navy" aria-hidden />
                  Les durées s’entendent en temps complet ou équivalent temps
                  partiel, continu ou non, et l’emploi doit correspondre à la
                  mention demandée sur la carte (transaction, gestion, syndic).
                </p>
              </section>

              <section id="negociateur" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Le point d’entrée du métier
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Commencer comme négociateur, sans carte ni diplôme du secteur
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-700">
                  Le négociateur immobilier négocie, s’entremet ou s’engage pour
                  le compte du titulaire de la carte. C’est la porte d’entrée
                  classique des profils en reconversion&nbsp;:
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {negociateurPoints.map((point) => (
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
                      <p className="text-4xl font-black text-brand-gold">Habilitation</p>
                      <p className="mt-2 font-bold">écrite, visée par la CCI</p>
                    </div>
                    <div className="p-6 md:p-8">
                      <p className="leading-7 text-white/80">
                        L’habilitation prend la forme d’une{" "}
                        <strong className="text-white">attestation</strong> délivrée
                        par le titulaire de la carte et visée par le président de
                        la CCI. Elle précise votre qualité (salarié ou agent
                        commercial) et l’étendue de vos pouvoirs. Négocier sans
                        elle est un <strong className="text-white">délit</strong>.
                      </p>
                      <p className="mt-4 text-sm text-white/70">
                        Source&nbsp;:{" "}
                        <a
                          href={DGCCRF_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-brand-gold-pale underline underline-offset-4"
                        >
                          fiche DGCCRF sur l’encadrement de la profession
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="parcours" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Feuille de route
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Un parcours réaliste en cinq étapes
                </h2>
                <ol className="mt-7 space-y-4">
                  {parcoursSteps.map((step, index) => (
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
                      Salarié ou agent commercial&nbsp;?
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      Le choix du statut de négociateur conditionne votre
                      rémunération, votre protection sociale et votre autonomie.
                    </p>
                  </div>
                  <Link
                    href="/guides/negociateur-immobilier-statut-salaire"
                    className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-navy px-4 py-3 text-sm font-black text-white transition hover:bg-brand-navy-mid"
                  >
                    Comparer les statuts
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </section>

              <section id="pieges" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Vigilance
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Six pièges fréquents quand on démarre sans diplôme
                </h2>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {pieges.map((piege) => (
                    <li
                      key={piege}
                      className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold leading-6 text-slate-700"
                    >
                      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold-dark" aria-hidden />
                      {piege}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-base leading-8 text-slate-700">
                  Le fil conducteur&nbsp;: tout doit être <strong>écrit et
                  traçable</strong> — habilitation, mandats, attestations,
                  preuves d’emploi. C’est cette traçabilité qui sécurisera à la
                  fois votre exercice quotidien et votre future demande de carte.
                </p>
              </section>

              <section id="faq" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Questions fréquentes
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Agent immobilier sans diplôme&nbsp;: FAQ
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
                        Carte professionnelle, habilitations et sanctions.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={LEGIFRANCE_DECREE_URL}>
                        Décret n°&nbsp;72-678 du 20 juillet 1972 — Légifrance
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Voies d’aptitude professionnelle : articles 11, 12 et 14.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={CCI_CONDITIONS_URL}>
                        Conditions d’obtention de la carte — CCI Paris Île-de-France
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Détail des diplômes, durées d’expérience et pièces acceptées.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={SERVICE_PUBLIC_URL}>
                        Devenir agent immobilier — service-public.fr
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Démarche officielle de demande de carte professionnelle.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={DGCCRF_URL}>
                        L’agent immobilier : les règles qui encadrent la profession — DGCCRF
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Habilitation des négociateurs, attestation et compétence professionnelle.
                      </p>
                    </li>
                  </ul>
                  <p className="mt-6 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500">
                    Informations vérifiées le 31 juillet 2026. Ce guide présente
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
                      Montez en compétence dès vos premiers mandats
                    </h2>
                    <p className="mt-3 leading-7 text-white/75">
                      La formation continue est obligatoire pour les titulaires
                      et les collaborateurs habilités. Le parcours
                      MonPassFormation (42 h loi ALUR + 3 h TRACFIN, certifié
                      Qualiopi, en visioconférences) couvre l’obligation sur un
                      cycle complet.
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
