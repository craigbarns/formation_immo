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
const PAGE_PATH = "/guides/carte-professionnelle-immobilier-prix-delais";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const COVER_URL = `${SITE_URL}/generated/fal/transaction/cover-immobilier.jpg`;
const LEGIFRANCE_LAW_URL =
  "https://www.legifrance.gouv.fr/loda/id/LEGITEXT000006068387/";
const LEGIFRANCE_DECREE_URL =
  "https://www.legifrance.gouv.fr/loda/id/LEGITEXT000006061974/";
const LEGIFRANCE_FEES_URL =
  "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000041573475/";
const SERVICE_PUBLIC_URL =
  "https://entreprendre.service-public.fr/vosdroits/F32994";
const CCI_RENEWAL_URL =
  "https://www.cci.fr/ressources/formalites-en-ligne/fichier-des-professionnels-de-limmobilier/renouvellement-de-carte-professionnelle";

const title = "Carte professionnelle immobilier : prix, délais et validité (2026)";
const description =
  "Frais de dossier CCI, pièces justificatives, délais d'instruction et durée de validité : comprendre le coût et le calendrier de la carte professionnelle immobilier.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    absolute: title,
  },
  description,
  keywords: [
    "carte professionnelle immobilier prix",
    "carte professionnelle immobilier délai",
    "prix carte T immobilier CCI",
    "coût carte agent immobilier",
    "validité carte professionnelle immobilier",
    "renouvellement carte professionnelle CCI",
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
        alt: "Prix, délais et validité de la carte professionnelle immobilier",
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
    question: "Quel est le prix de la carte professionnelle immobilier ?",
    answer:
      "La demande donne lieu à des frais de dossier dont le montant est fixé par arrêté du ministre chargé de l'économie (arrêté du 10 février 2020). Ce tarif pouvant évoluer, consultez le tarif en vigueur auprès de votre CCI avant de déposer. Prévoyez aussi les coûts annexes : garantie financière, assurance RC professionnelle et formation continue.",
  },
  {
    question: "Quel est le délai pour obtenir la carte professionnelle ?",
    answer:
      "Le délai dépend de la complétude du dossier et du traitement par la CCI compétente. Un dossier complet limite les demandes de pièces complémentaires et les allers-retours. Comptez en pratique plusieurs semaines et anticipez : pour un renouvellement, la demande doit être présentée deux mois avant la date d'expiration de la carte.",
  },
  {
    question: "Quelle est la durée de validité de la carte ?",
    answer:
      "La carte professionnelle est valable trois ans et renouvelable. Avant la loi ALUR de 2014, sa durée de validité était de dix ans : la référence à une « carte valable dix ans » que l'on croise encore correspond à l'ancienne règle.",
  },
  {
    question: "La garantie financière est-elle toujours obligatoire ?",
    answer:
      "Elle est obligatoire dès lors que vous détenez des fonds pour le compte de vos clients, avec un minimum de 110 000 € (30 000 € pendant les deux premières années d'exercice). Le professionnel qui s'engage à ne recevoir d'autres sommes que sa rémunération peut être dispensé de garantie et obtenir une carte portant la mention « Non-détention de fonds ».",
  },
  {
    question: "Peut-on cumuler plusieurs mentions sur la carte ?",
    answer:
      "Oui. La carte mentionne la ou les activités exercées : « Transactions sur immeubles et fonds de commerce », « Gestion immobilière », « Syndic de copropriété » ou « Marchand de listes ». Vous devez justifier de l'aptitude professionnelle correspondant à chaque mention demandée.",
  },
  {
    question: "Que risque-t-on à exercer sans carte professionnelle ?",
    answer:
      "L'article 14 de la loi n° 70-9 du 2 janvier 1970 punit l'exercice sans carte de six mois d'emprisonnement et de 7 500 € d'amende. S'y ajoutent des conséquences civiles : les actes conclus peuvent être contestés et le droit à rémunération remis en cause.",
  },
  {
    question: "Qui délivre la carte professionnelle immobilier ?",
    answer:
      "La carte est délivrée par le président de la chambre de commerce et d'industrie territoriale (ou de la chambre départementale d'Île-de-France) du ressort de votre établissement principal. CCI France tient le fichier national des titulaires, consultable en ligne.",
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
          name: "Carte professionnelle immobilier",
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
          name: "Carte professionnelle immobilier : prix et délais",
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
    value: "3 ans",
    label: "de validité",
    detail: "Depuis la loi ALUR de 2014 — la durée était de 10 ans auparavant.",
  },
  {
    icon: CalendarDays,
    value: "2 mois",
    label: "avant l'expiration",
    detail: "La demande de renouvellement se présente dans ce délai.",
  },
  {
    icon: ShieldCheck,
    value: "110 000 €",
    label: "de garantie minimale",
    detail: "Si détention de fonds. 30 000 € les deux premières années d'exercice.",
  },
];

const conditions = [
  {
    title: "Aptitude professionnelle",
    text: "Un diplôme visé par le décret (bac+3 juridique, économique ou commercial, BTS professions immobilières, ICH) ou une expérience professionnelle salariée suffisante dans l'activité visée.",
  },
  {
    title: "Honorabilité",
    text: "Le demandeur ne doit être frappé d'aucune incapacité ni interdiction d'exercer. Le casier judiciaire est vérifié au regard des infractions visées par la loi.",
  },
  {
    title: "Garantie financière et assurance",
    text: "Une garantie financière si vous détenez des fonds de clients, et une assurance responsabilité civile professionnelle couvrant chaque établissement, dans tous les cas.",
  },
];

const pieces = [
  "Formulaire de demande complété et signé (modèle CCI)",
  "Pièce d'identité en cours de validité",
  "Justificatifs d'aptitude professionnelle (diplômes ou expérience)",
  "Attestation de garantie financière si détention de fonds",
  "Attestation d'assurance RC professionnelle en cours de validité",
  "Justificatif d'immatriculation de l'entreprise (RNE / RCS)",
  "Déclaration sur l'honneur de non-détention de fonds, le cas échéant",
  "Bulletins de salaire ou attestations d'employeur pour la voie « expérience »",
];

const planningSteps = [
  {
    title: "Vérifier votre aptitude avant tout engagement",
    text: "Confrontez vos diplômes et votre expérience aux articles 11 à 14 du décret du 20 juillet 1972, ou demandez un avis à votre CCI avant de souscrire garantie et assurance.",
  },
  {
    title: "Souscrire la garantie financière et la RC pro",
    text: "La garantie s'obtient auprès d'une banque ou d'un organisme professionnel garant (par exemple GALIAN ou CEGI). L'attestation d'assurance doit couvrir chaque établissement.",
  },
  {
    title: "Constituer un dossier complet",
    text: "Rassemblez l'ensemble des pièces listées par la CCI. Un dossier incomplet allonge mécaniquement le délai d'instruction.",
  },
  {
    title: "Déposer et suivre la demande",
    text: "La demande se fait auprès de la CCI territorialement compétente, en ligne ou par courrier selon les chambres. Répondez vite à toute demande de pièce complémentaire.",
  },
  {
    title: "Noter la date d'expiration",
    text: "La carte vaut trois ans. La demande de renouvellement doit être présentée deux mois avant l'expiration, avec les justificatifs de formation continue.",
  },
];

const relatedGuides = [
  {
    href: "/guides/renouvellement-carte-professionnelle-immobilier",
    title: "Renouvellement de la carte professionnelle",
    text: "Calendrier, pièces et points de contrôle pour la formalité triennale.",
  },
  {
    href: "/guides/examen-carte-professionnelle-cci",
    title: "Examen de la carte professionnelle",
    text: "Aptitude professionnelle : ce qui a remplacé l'ancien examen de capacité.",
  },
  {
    href: "/guides/formation-loi-alur-42-heures",
    title: "Formation loi ALUR 42 heures",
    text: "L'obligation de formation continue exigée au renouvellement.",
  },
  {
    href: "/guides/loi-hoguet-guide-complet",
    title: "Loi Hoguet : le guide complet",
    text: "Le texte fondateur qui encadre toutes les activités immobilières.",
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

export default function CarteProfessionnellePrixDelaisPage() {
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
                    Carte professionnelle : prix et délais
                  </li>
                </ol>
              </nav>

              <div className="mt-9 max-w-4xl">
                <p className="inline-flex rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-brand-gold-pale">
                  Guide réglementaire 2026
                </p>
                <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                  Carte professionnelle immobilier&nbsp;: prix, délais et validité
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl">
                  Combien coûte la carte délivrée par la CCI, quelles pièces
                  fournir et combien de temps attendre&nbsp;? Le cadre complet,
                  fondé sur la loi Hoguet et son décret d’application.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#prix"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gold px-5 py-3.5 text-sm font-black text-brand-navy transition hover:bg-brand-gold-hover"
                  >
                    Comprendre les coûts
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
                    ["#prix", "Prix de la carte"],
                    ["#conditions", "Conditions d'obtention"],
                    ["#pieces", "Pièces du dossier"],
                    ["#delais", "Délais et calendrier"],
                    ["#validite", "Validité de la carte"],
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
              <section id="prix" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Le budget
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy sm:text-4xl">
                  Combien coûte la carte professionnelle immobilier&nbsp;?
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
                  <p>
                    La demande de carte — première demande comme renouvellement —
                    donne lieu à des <strong>frais de dossier</strong> perçus par
                    la CCI. Leur montant est fixé par arrêté du ministre chargé
                    de l’économie, actuellement l’{" "}
                    <SourceLink href={LEGIFRANCE_FEES_URL}>
                      arrêté du 10 février 2020
                    </SourceLink>
                    . Ce tarif pouvant être révisé, consultez le tarif en vigueur
                    auprès de votre CCI avant de déposer votre dossier.
                  </p>
                  <p>
                    Le prix de la carte ne résume pas le coût réel de l’accès au
                    métier. Ajoutez au budget la <strong>garantie financière</strong>{" "}
                    si vous détenez des fonds (cotisation annuelle auprès d’un
                    garant comme GALIAN ou CEGI), l’<strong>assurance responsabilité
                    civile professionnelle</strong>, obligatoire dans tous les
                    cas, et la <strong>formation continue</strong> exigée pour le
                    renouvellement.
                  </p>
                </div>

                <div className="mt-7 rounded-2xl border-l-4 border-brand-gold bg-white p-6 shadow-sm">
                  <div className="flex gap-4">
                    <Scale className="mt-1 h-6 w-6 shrink-0 text-brand-gold-dark" aria-hidden />
                    <div>
                      <h3 className="font-black text-brand-navy">
                        Pas de prix unique affiché
                      </h3>
                      <p className="mt-2 leading-7 text-slate-700">
                        Le montant exact dépend de la formalité (première
                        demande, renouvellement, mise à jour, attestation de
                        collaborateur) et du barème en vigueur. La référence
                        officielle est l’arrêté tarifaire&nbsp;; votre CCI vous
                        confirme le montant dû avant le paiement.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="conditions" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Conditions d’obtention
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Quelles conditions pour obtenir la carte&nbsp;?
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700">
                  L’article 3 de la{" "}
                  <SourceLink href={LEGIFRANCE_LAW_URL}>
                    loi n°&nbsp;70-9 du 2 janvier 1970
                  </SourceLink>{" "}
                  subordonne la délivrance à trois familles de conditions,
                  détaillées par le décret du 20 juillet 1972.
                </p>
                <div className="mt-7 grid gap-4 md:grid-cols-3">
                  {conditions.map((condition, index) => (
                    <div
                      key={condition.title}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-sm font-black text-white">
                        {index + 1}
                      </span>
                      <h3 className="mt-5 text-lg font-black text-brand-navy">
                        {condition.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {condition.text}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-5 flex gap-3 rounded-xl bg-brand-navy/5 p-4 text-sm leading-6 text-slate-700">
                  <Users className="mt-0.5 h-5 w-5 shrink-0 text-brand-navy" aria-hidden />
                  Pour une personne morale, les conditions d’aptitude et de
                  moralité s’apprécient au niveau de ses représentants légaux et
                  statutaires.
                </p>
              </section>

              <section id="pieces" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Constitution du dossier
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Quelles pièces fournir à la CCI&nbsp;?
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-700">
                  La liste exacte varie selon votre situation (personne physique
                  ou morale, mention demandée, voie « diplôme » ou « expérience
                  »). Les pièces habituellement exigées sont les suivantes&nbsp;:
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {pieces.map((piece) => (
                    <li
                      key={piece}
                      className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold leading-6 text-slate-700"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold-dark" aria-hidden />
                      {piece}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 grid gap-6 md:grid-cols-[1.3fr_1fr]">
                  <div className="space-y-5 text-base leading-8 text-slate-700">
                    <p>
                      Pour la voie « expérience professionnelle », la CCI
                      apprécie la réalité et la durée de l’emploi occupé&nbsp;:
                      bulletins de salaire, contrats de travail et attestations
                      d’employeur constituent les justificatifs de référence.
                    </p>
                    <p>
                      Contrôlez chaque attestation (garantie, assurance) au jour
                      du dépôt&nbsp;: une pièce expirée bloque l’instruction
                      autant qu’une pièce manquante.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <FileCheck2 className="h-8 w-8 text-brand-gold-dark" aria-hidden />
                    <h3 className="mt-5 font-black text-brand-navy">
                      Contrôle rapide avant envoi
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm text-slate-700">
                      {[
                        "Formulaire signé",
                        "Attestations en cours de validité",
                        "Justificatifs d’aptitude complets",
                        "Frais de dossier réglés",
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

              <section id="delais" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Calendrier
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Quels délais prévoir, du dépôt au renouvellement&nbsp;?
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
                      Votre carte arrive à échéance&nbsp;?
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      Notre guide dédié détaille le calendrier du renouvellement
                      et les justificatifs de formation à préparer.
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

              <section id="validite" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Durée de validité
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Une carte valable trois ans, pas dix
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
                  <p>
                    Le{" "}
                    <SourceLink href={LEGIFRANCE_DECREE_URL}>
                      décret n°&nbsp;72-678 du 20 juillet 1972
                    </SourceLink>
                    , dans sa rédaction issue du décret n°&nbsp;2015-702, dispose
                    que <strong>la carte professionnelle est valable trois ans</strong>{" "}
                    et qu’elle est renouvelée pour la même durée. La demande de
                    renouvellement est présentée <strong>deux mois avant la date
                    d’expiration</strong>.
                  </p>
                </div>

                <div className="mt-8 overflow-hidden rounded-2xl bg-brand-navy text-white">
                  <div className="grid gap-0 md:grid-cols-[1fr_1.35fr]">
                    <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-8">
                      <p className="text-4xl font-black text-brand-gold">3 ans</p>
                      <p className="mt-2 font-bold">de validité, renouvelable</p>
                    </div>
                    <div className="p-6 md:p-8">
                      <p className="leading-7 text-white/80">
                        Avant la loi ALUR du 24 mars 2014, la carte était
                        valable <strong className="text-white">dix ans</strong>. La durée a été
                        réduite pour garantir le suivi régulier des compétences,
                        en lien avec l’obligation de formation continue. La
                        mention « carte valable 10 ans », encore fréquente en
                        ligne, renvoie donc à l’ancien régime.
                      </p>
                      <p className="mt-4 text-sm text-white/70">
                        Source&nbsp;:{" "}
                        <a
                          href={CCI_RENEWAL_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-brand-gold-pale underline underline-offset-4"
                        >
                          formalité de renouvellement sur cci.fr
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="faq" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Questions fréquentes
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Prix et délais de la carte&nbsp;: FAQ
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
                        Conditions d’exercice, carte professionnelle, habilitations et sanctions.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={LEGIFRANCE_DECREE_URL}>
                        Décret n°&nbsp;72-678 du 20 juillet 1972 — Légifrance
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Délivrance, validité de trois ans, renouvellement, garantie financière et assurance.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={LEGIFRANCE_FEES_URL}>
                        Arrêté du 10 février 2020 fixant le paiement des procédures — Légifrance
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Montant des frais dus pour les formalités de carte professionnelle.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={SERVICE_PUBLIC_URL}>
                        Devenir agent immobilier — service-public.fr
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Démarche de demande, pièces et mentions de la carte.
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
                      Préparer sereinement votre prochain renouvellement
                    </h2>
                    <p className="mt-3 leading-7 text-white/75">
                      La formation loi ALUR de 42 heures, certifiée Qualiopi et
                      animée en visioconférences, couvre l’obligation de
                      formation continue exigée au renouvellement de la carte.
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
