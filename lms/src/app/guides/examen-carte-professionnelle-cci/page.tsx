import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  ExternalLink,
  FileCheck2,
  Scale,
  Users,
  type LucideIcon,
} from "lucide-react";

const SITE_URL = "https://monpassformation.com";
const PAGE_PATH = "/guides/examen-carte-professionnelle-cci";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const COVER_URL = `${SITE_URL}/generated/fal/transaction/cover-immobilier.jpg`;
const LEGIFRANCE_DECREE_URL =
  "https://www.legifrance.gouv.fr/loda/id/LEGITEXT000006061974/";
const CCI_CONDITIONS_URL =
  "https://www.entreprises.cci-paris-idf.fr/fiches-pratiques/les-conditions-dobtention-dune-carte-professionnelle-loi-hoguet";
const SERVICE_PUBLIC_URL =
  "https://entreprendre.service-public.fr/vosdroits/F32994";
const CCI_FORMALITIES_URL =
  "https://www.cci.fr/ressources/formalites-en-ligne/fichier-des-professionnels-de-limmobilier";

const title = "Examen de la carte professionnelle immobilier : la réalité en 2026";
const description =
  "L'examen de capacité a disparu en 2006. Aptitude professionnelle, BTS professions immobilières, VAE et préparation : les vraies voies vers la carte délivrée par la CCI.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    absolute: title,
  },
  description,
  keywords: [
    "examen carte professionnelle immobilier",
    "examen carte T CCI",
    "aptitude professionnelle agent immobilier",
    "BTS professions immobilières examen",
    "préparer carte professionnelle immobilier",
    "examen capacité immobilier abrogé",
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
        alt: "Examen et aptitude professionnelle pour la carte immobilier",
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
    question: "Existe-t-il un examen pour obtenir la carte professionnelle immobilier ?",
    answer:
      "Non, plus depuis 2006. L'article 17 du décret n° 72-678, qui prévoyait un examen d'aptitude professionnelle, est abrogé depuis le 1er janvier 2006. L'aptitude se justifie désormais par un diplôme ou par l'expérience professionnelle : la CCI instruit votre dossier, elle n'organise aucune épreuve de capacité.",
  },
  {
    question: "Pourquoi entend-on encore parler d'un « examen » de la carte ?",
    answer:
      "La confusion vient de trois sources : l'ancien examen de capacité supprimé en 2006, le BTS professions immobilières — un véritable examen, mais qui délivre un diplôme d'État et non la carte — et les diagnostics d'aptitude en ligne proposés par certaines CCI, qui ont une simple valeur indicative.",
  },
  {
    question: "Quel diplôme passer pour obtenir la carte « Transactions » ?",
    answer:
      "Le BTS professions immobilières (bac+2) est la voie la plus directe. Sont également recevables un diplôme d'au moins trois années d'études supérieures juridiques, économiques ou commerciales, un titre RNCP de niveau équivalent dans ces filières, ou le diplôme de l'ICH (institut du CNAM).",
  },
  {
    question: "Quel est le taux de réussite à l'examen de la carte ?",
    answer:
      "Il n'y a pas de taux de réussite à proprement parler, puisqu'il n'existe plus d'épreuve pour la carte : la demande est instruite sur pièces. Pour le BTS professions immobilières, les taux de réussite sont publiés session par session par le ministère de l'enseignement supérieur.",
  },
  {
    question: "Le BTS professions immobilières peut-il se préparer en alternance ?",
    answer:
      "Oui. Le BTS PI se prépare en formation initiale, en alternance (contrat d'apprentissage ou de professionnalisation, le coût pédagogique étant alors pris en charge via l'OPCO de l'entreprise) ou en candidat libre. Son référentiel a été rénové par l'arrêté du 22 novembre 2023, avec une première session du nouveau diplôme en 2026.",
  },
  {
    question: "La VAE est-elle un examen ?",
    answer:
      "Non. La validation des acquis de l'expérience est une procédure devant jury, ouverte dès un an d'expérience en lien avec la certification visée. Elle permet d'obtenir tout ou partie d'un diplôme ou titre ouvrant droit à la carte, sans repasser par une scolarité complète.",
  },
  {
    question: "Combien coûte l'obtention de la carte par la voie diplôme ?",
    answer:
      "Le coût dépend de la voie : formation BTS (gratuite pour l'alternant), dossier VAE (tarif variable selon le certificateur), puis frais de dossier CCI pour la carte elle-même, fixés par arrêté — consultez le tarif en vigueur auprès de votre CCI.",
  },
  {
    question: "Un ressortissant européen doit-il passer une épreuve ?",
    answer:
      "La reconnaissance des qualifications acquises dans l'Union européenne ou l'Espace économique européen suit la directive 2005/36/CE. Selon les cas, une épreuve d'aptitude ou un stage d'adaptation peut être proposé. Rapprochez-vous du centre de formalités des professions immobilières de la CCI compétente.",
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
          name: "Aptitude professionnelle immobilier",
        },
        {
          "@type": "Thing",
          name: "Carte professionnelle immobilier",
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
          name: "Examen de la carte professionnelle",
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
    icon: FileCheck2,
    value: "2006",
    label: "fin de l'examen de capacité",
    detail: "L'article 17 du décret de 1972 est abrogé depuis le 1er janvier 2006.",
  },
  {
    icon: GraduationCap,
    value: "BTS PI",
    label: "diplôme de référence",
    detail: "Rénové par l'arrêté du 22 novembre 2023, première session en 2026.",
  },
  {
    icon: Users,
    value: "3 voies",
    label: "pour justifier l'aptitude",
    detail: "Diplôme, expérience professionnelle salariée ou VAE.",
  },
];

const voies = [
  {
    title: "La voie du diplôme",
    text: "Article 11 du décret : diplôme d'au moins trois années d'études supérieures juridiques, économiques ou commerciales, titre RNCP équivalent, BTS professions immobilières ou diplôme de l'ICH.",
  },
  {
    title: "La voie mixte",
    text: "Article 12 : le baccalauréat (ou un titre équivalent dans les filières juridique, économique ou commerciale) complété par trois ans d'emploi salarié rattaché à l'activité visée.",
  },
  {
    title: "La voie de l'expérience",
    text: "Article 14 : dix ans d'emploi salarié dans l'activité, durée réduite à quatre ans pour un emploi de cadre ou un emploi public de catégorie A (ou équivalent).",
  },
];

const btsPoints = [
  "Diplôme d'État de niveau bac+2, voie directe vers la carte « Transactions »",
  "Référentiel rénové par l'arrêté du 22 novembre 2023, première session 2026",
  "Accessible en formation initiale, en alternance ou en candidat libre",
  "Programme : droit immobilier, transaction, gestion locative, négociation",
  "Obtenu, il dispense de justifier une expérience professionnelle",
  "Préparé à distance, il reste compatible avec une activité professionnelle",
];

const preparationSteps = [
  {
    title: "Faire le point sur votre profil",
    text: "Listez vos diplômes et vos périodes d'emploi salarié, puis confrontez-les aux conditions des articles 11 à 14 du décret. Certaines CCI proposent un diagnostic d'aptitude en ligne, à valeur indicative.",
  },
  {
    title: "Choisir la voie la plus courte",
    text: "Diplôme déjà en poche ? Vous êtes peut-être déjà apte. Expérience solide sans diplôme ? Comparez la voie « expérience » et la VAE avant de vous engager dans une formation longue.",
  },
  {
    title: "Travailler le socle juridique du métier",
    text: "Loi Hoguet, mandats, honoraires, déontologie, diagnostics : ces fondamentaux servent à la fois pour le diplôme et pour l'exercice quotidien ensuite.",
  },
  {
    title: "Valider le diplôme ou l'attestation visé",
    text: "Épreuves du BTS, jury de VAE ou validation de votre expérience : sécurisez le justificatif qui prouvera votre aptitude devant la CCI.",
  },
  {
    title: "Constituer le dossier de carte",
    text: "Garantie financière si détention de fonds, assurance RC professionnelle, pièces d'aptitude : la demande se dépose ensuite auprès de la CCI territorialement compétente.",
  },
];

const relatedGuides = [
  {
    href: "/guides/devenir-agent-immobilier-sans-diplome",
    title: "Devenir agent immobilier sans diplôme",
    text: "Expérience professionnelle et VAE : les voies réelles sans diplôme.",
  },
  {
    href: "/guides/carte-professionnelle-immobilier-prix-delais",
    title: "Carte professionnelle : prix et délais",
    text: "Frais de dossier CCI, pièces et calendrier d'obtention.",
  },
  {
    href: "/guides/negociateur-immobilier-statut-salaire",
    title: "Négociateur immobilier : statut et salaire",
    text: "Entrer dans le métier comme salarié habilité ou agent commercial.",
  },
  {
    href: "/formation-juridique-immobilier",
    title: "Formation juridique immobilier",
    text: "Consolider les fondamentaux du droit applicable à la transaction.",
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

export default function ExamenCarteProfessionnelleCciPage() {
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
                    Examen de la carte professionnelle
                  </li>
                </ol>
              </nav>

              <div className="mt-9 max-w-4xl">
                <p className="inline-flex rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-brand-gold-pale">
                  Guide carrière 2026
                </p>
                <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                  Examen de la carte professionnelle immobilier&nbsp;: ce qu’il faut vraiment savoir
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl">
                  Contrairement à une idée répandue, il n’existe plus d’examen de
                  capacité pour obtenir la carte. Voici ce qui l’a remplacé, les
                  vrais diplômes qui ouvrent droit à la carte, et comment vous
                  préparer efficacement.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#examen"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gold px-5 py-3.5 text-sm font-black text-brand-navy transition hover:bg-brand-gold-hover"
                  >
                    Comprendre le dispositif actuel
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <a
                    href={CCI_CONDITIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    Conditions d’obtention (CCI)
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
                    ["#examen", "L'examen existe-t-il ?"],
                    ["#voies", "Les voies d'aptitude"],
                    ["#bts", "Le BTS professions immobilières"],
                    ["#preparer", "Se préparer concrètement"],
                    ["#taux", "Taux de réussite"],
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
              <section id="examen" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Le point de départ
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy sm:text-4xl">
                  L’examen de la carte professionnelle existe-t-il encore&nbsp;?
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
                  <p>
                    <strong>Non.</strong> Jusqu’en 2005, les personnes dépourvues
                    des diplômes requis pouvaient passer un examen d’aptitude
                    professionnelle organisé sous l’autorité administrative. Le{" "}
                    <SourceLink href={LEGIFRANCE_DECREE_URL}>
                      décret n°&nbsp;72-678 du 20 juillet 1972
                    </SourceLink>{" "}
                    le prévoyait à son article 17&nbsp;: cet article est{" "}
                    <strong>abrogé depuis le 1<sup>er</sup> janvier 2006</strong>{" "}
                    (décret n°&nbsp;2005-1315).
                  </p>
                  <p>
                    Aujourd’hui, la CCI qui délivre la carte{" "}
                    <strong>instruit un dossier sur pièces</strong>&nbsp;: elle
                    vérifie votre aptitude professionnelle, votre honorabilité,
                    votre garantie financière et votre assurance. Aucune épreuve
                    écrite ou orale n’est organisée pour la carte elle-même.
                  </p>
                </div>

                <div className="mt-7 rounded-2xl border-l-4 border-brand-gold bg-white p-6 shadow-sm">
                  <div className="flex gap-4">
                    <Scale className="mt-1 h-6 w-6 shrink-0 text-brand-gold-dark" aria-hidden />
                    <div>
                      <h3 className="font-black text-brand-navy">
                        Ce qui remplace l’examen
                      </h3>
                      <p className="mt-2 leading-7 text-slate-700">
                        L’aptitude professionnelle se prouve désormais par des{" "}
                        <strong>titres ou par le temps</strong>&nbsp;: un diplôme
                        visé par le décret, ou une expérience salariée suffisante
                        dans l’activité. La VAE permet, elle, de transformer
                        l’expérience en diplôme.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="voies" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Aptitude professionnelle
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Les trois voies reconnues par le décret
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700">
                  Les conditions détaillées figurent sur la fiche officielle des{" "}
                  <SourceLink href={CCI_CONDITIONS_URL}>
                    conditions d’obtention publiée par la CCI
                  </SourceLink>
                  . Elles s’organisent en trois voies principales.
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
                  <Users className="mt-0.5 h-5 w-5 shrink-0 text-brand-navy" aria-hidden />
                  Les durées d’expérience s’apprécient en temps complet ou
                  équivalent temps partiel, et l’emploi doit se rattacher à la
                  mention demandée sur la carte.
                </p>
              </section>

              <section id="bts" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Le vrai « examen » du métier
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Le BTS professions immobilières, voie royale vers la carte
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-700">
                  Si vous cherchez un « examen de la carte professionnelle », le
                  diplôme qui s’en rapproche le plus est le{" "}
                  <strong>BTS professions immobilières (BTS PI)</strong>&nbsp;: un
                  diplôme d’État de niveau bac+2 qui ouvre directement droit à la
                  carte, sans condition d’expérience.
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {btsPoints.map((point) => (
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
                      <p className="text-4xl font-black text-brand-gold">Bac+2</p>
                      <p className="mt-2 font-bold">et la carte devient accessible</p>
                    </div>
                    <div className="p-6 md:p-8">
                      <p className="leading-7 text-white/80">
                        Le BTS PI peut se préparer{" "}
                        <strong className="text-white">en alternance</strong> —
                        le coût pédagogique est alors pris en charge via l’OPCO
                        de l’entreprise — ou <strong className="text-white">en
                        candidat libre</strong>, à son rythme. Son référentiel a
                        été rénové par l’arrêté du 22 novembre 2023&nbsp;: la
                        première session du nouveau diplôme se tient en 2026.
                      </p>
                      <p className="mt-4 text-sm text-white/70">
                        La VAE offre une alternative&nbsp;: un an d’expérience en
                        lien avec le diplôme visé suffit pour engager la
                        procédure devant jury.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="preparer" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Méthode pratique
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Comment préparer votre accès à la carte, étape par étape
                </h2>
                <ol className="mt-7 space-y-4">
                  {preparationSteps.map((step, index) => (
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
                      Pas de diplôme, mais de l’expérience&nbsp;?
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      Notre guide dédié détaille les voies « expérience
                      professionnelle » et VAE, et le parcours réaliste par le
                      métier de négociateur.
                    </p>
                  </div>
                  <Link
                    href="/guides/devenir-agent-immobilier-sans-diplome"
                    className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-navy px-4 py-3 text-sm font-black text-white transition hover:bg-brand-navy-mid"
                  >
                    Agent immobilier sans diplôme
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </section>

              <section id="taux" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Transparence
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Taux de réussite&nbsp;: ce qui est publié — et ce qui ne l’est pas
                </h2>
                <div className="mt-6 grid gap-6 md:grid-cols-[1.3fr_1fr]">
                  <div className="space-y-5 text-base leading-8 text-slate-700">
                    <p>
                      Puisqu’il n’existe plus d’épreuve pour la carte, il n’existe{" "}
                      <strong>aucune statistique officielle de réussite</strong>{" "}
                      à un « examen de la carte professionnelle ». La demande est
                      administrative&nbsp;: elle aboutit si les conditions légales
                      sont remplies et le dossier complet.
                    </p>
                    <p>
                      En revanche, les résultats du{" "}
                      <strong>BTS professions immobilières</strong> relèvent des
                      statistiques ministérielles publiées à chaque session, et
                      les certificateurs de VAE communiquent leurs propres taux
                      de validation. Méfiez-vous des chiffres non sourcés qui
                      circulent sur ces sujets.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <CalendarDays className="h-8 w-8 text-brand-gold-dark" aria-hidden />
                    <h3 className="mt-5 font-black text-brand-navy">
                      Les vrais jalons à anticiper
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm text-slate-700">
                      {[
                        "Sessions du BTS PI (calendrier ministériel)",
                        "Délais d’instruction du dossier VAE",
                        "Instruction de la demande par la CCI",
                        "Validité de 3 ans de la carte obtenue",
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

              <section id="faq" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Questions fréquentes
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Examen de la carte professionnelle&nbsp;: FAQ
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
                      <SourceLink href={LEGIFRANCE_DECREE_URL}>
                        Décret n°&nbsp;72-678 du 20 juillet 1972 — Légifrance
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Conditions d’aptitude professionnelle (art. 11 à 16) et abrogation de l’examen (art. 17).
                      </p>
                    </li>
                    <li>
                      <SourceLink href={CCI_CONDITIONS_URL}>
                        Conditions d’obtention de la carte professionnelle — CCI Paris Île-de-France
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Détail des diplômes et des durées d’expérience exigés par mention.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={SERVICE_PUBLIC_URL}>
                        Devenir agent immobilier — service-public.fr
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Démarche officielle, mentions de la carte et justificatifs.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={CCI_FORMALITIES_URL}>
                        Fichier des professionnels de l’immobilier — CCI France
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Accès aux formalités : première demande, mise à jour, renouvellement.
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
                      Carte obtenue&nbsp;? Pensez à la formation continue
                    </h2>
                    <p className="mt-3 leading-7 text-white/75">
                      Dès l’exercice, la loi impose 42 heures de formation sur
                      trois ans, exigées au renouvellement. Découvrez le parcours
                      MonPassFormation, certifié Qualiopi et animé en
                      visioconférences.
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
