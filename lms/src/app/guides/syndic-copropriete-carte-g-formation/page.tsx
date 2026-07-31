import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileCheck2,
  Scale,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const SITE_URL = "https://monpassformation.com";
const PAGE_PATH = "/guides/syndic-copropriete-carte-g-formation";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const COVER_URL = `${SITE_URL}/generated/fal/transaction/cover-immobilier.jpg`;
const LEGIFRANCE_LAW_URL =
  "https://www.legifrance.gouv.fr/loda/id/LEGITEXT000006068387/";
const LEGIFRANCE_DECREE_URL =
  "https://www.legifrance.gouv.fr/loda/id/LEGITEXT000006061974/";
const LEGIFRANCE_FORMATION_URL =
  "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000032080616/";
const CCI_RENEWAL_URL =
  "https://www.cci.fr/ressources/formalites-en-ligne/fichier-des-professionnels-de-limmobilier/renouvellement-de-carte-professionnelle";

const title = "Formation syndic de copropriété et carte G : le guide complet (2026)";
const description =
  "Mention syndic de copropriété, carte gestion immobilière, garantie financière et formation continue 42 h : les obligations spécifiques des syndics professionnels de copropriété.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    absolute: title,
  },
  description,
  keywords: [
    "formation syndic copropriété",
    "carte G syndic copropriété",
    "mention syndic carte professionnelle",
    "carte gestion immobilière syndic",
    "formation continue syndic 42 heures",
    "obligations syndic professionnel loi Hoguet",
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
        alt: "Formation et carte professionnelle du syndic de copropriété",
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
    question: "Faut-il une carte spécifique pour exercer comme syndic ?",
    answer:
      "Oui. Le syndic professionnel doit être titulaire de la carte professionnelle portant la mention « Syndic de copropriété », délivrée par la CCI. Avant le décret n° 2015-702, cette activité relevait de la mention « Gestion immobilière » — la fameuse « carte G » ; elle dispose depuis d'une mention propre.",
  },
  {
    question: "La carte « Gestion immobilière » suffit-elle pour gérer des copropriétés ?",
    answer:
      "Non. La mention « Gestion immobilière » couvre l'administration de biens (gestion locative, notamment). La fonction de syndic de copropriété exige la mention dédiée ; les deux mentions sont fréquemment demandées et délivrées ensemble, car les conditions d'aptitude sont voisines.",
  },
  {
    question: "Quelle garantie financière pour un syndic de copropriété ?",
    answer:
      "Le syndic détient par nature les fonds des syndicats de copropriétaires : la garantie financière est donc incontournable, d'un minimum légal de 110 000 € (30 000 € pendant les deux premières années d'exercice), ajustée au montant maximal des fonds détenus. Elle est souscrite auprès d'une banque ou d'un organisme garant comme GALIAN ou CEGI.",
  },
  {
    question: "La formation continue de 42 heures s'applique-t-elle aux syndics ?",
    answer:
      "Oui, dans les mêmes conditions que pour les autres cartes : 14 heures par an ou 42 heures par période de trois ans, avec au minimum deux heures de déontologie et deux heures de non-discrimination par cycle. Le contenu doit être en lien direct avec l'activité déclarée — la gestion de copropriétés pour un syndic.",
  },
  {
    question: "Quelle différence entre une formation « transaction » et une formation « syndic » ?",
    answer:
      "Le volume et le régime sont identiques ; ce qui change, c'est le contenu. Pour un syndic, la formation doit porter sur la copropriété : loi de 1965 et décret de 1967, assemblées générales, budgets et appels de fonds, contrat de syndic, travaux, comptabilité séparée. Une formation purement axée transaction ne satisferait pas l'exigence de lien direct avec l'activité.",
  },
  {
    question: "Un syndic bénévole est-il concerné par la carte et la formation ?",
    answer:
      "Non. La loi Hoguet encadre les professionnels. Le syndic bénévole (copropriétaire non rémunéré) relève de la loi n° 65-557 du 10 juillet 1965 et de son décret de 1967, sans carte professionnelle ni obligation de formation continue Hoguet.",
  },
  {
    question: "Que risque un professionnel qui fait du syndic sans la mention ?",
    answer:
      "L'exercice d'une activité réglementée sans la carte mention correspondante expose aux peines de l'article 14 de la loi (six mois d'emprisonnement et 7 500 € d'amende), à la remise en cause de la rémunération, ainsi qu'à des sanctions administratives pouvant aller jusqu'au retrait de la carte.",
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
          name: "Syndic de copropriété",
        },
        {
          "@type": "Thing",
          name: "Formation continue immobilier",
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
          name: "Syndic de copropriété : carte G et formation",
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
    value: "Mention « syndic »",
    label: "depuis 2015",
    detail: "Une mention propre, distincte de la gestion immobilière, sur la carte.",
  },
  {
    icon: ShieldCheck,
    value: "Garantie",
    label: "financière incontournable",
    detail: "Le syndic détient les fonds des copropriétés : garantie obligatoire.",
  },
  {
    icon: Clock3,
    value: "42 h",
    label: "de formation sur 3 ans",
    detail: "En lien direct avec l'activité de syndic, déontologie et non-discrimination incluses.",
  },
];

const mentions = [
  {
    title: "Carte « Transactions »",
    text: "Entremise pour l'achat, la vente, la location d'immeubles ou de fonds de commerce. Ne couvre ni la gestion locative en propre ni le syndic.",
  },
  {
    title: "Carte « Gestion immobilière » (carte G)",
    text: "Administration de biens pour le compte d'autrui : gestion locative, encaissement des loyers, suivi des baux. Ne couvre plus le syndic depuis 2015.",
  },
  {
    title: "Carte « Syndic de copropriété »",
    text: "Fonction de syndic professionnel : convocation des assemblées, exécution des décisions, tenue des comptes du syndicat. Fréquemment délivrée avec la gestion immobilière.",
  },
];

const obligations = [
  "Garantie financière obligatoire, ajustée au montant maximal des fonds détenus (minimum légal de 110 000 €)",
  "Assurance responsabilité civile professionnelle couvrant chaque établissement",
  "Comptabilité séparée pour chaque syndicat de copropriétaires, avec compte(s) dédié(s)",
  "Contrat de syndic conforme au contrat type fixé par le décret n° 2015-342 du 26 mars 2015",
  "Honoraires décomposés et affichés selon les modalités réglementaires",
  "Double corpus juridique : loi Hoguet d'un côté, loi de 1965 et décret de 1967 de l'autre",
];

const renouvellementSteps = [
  {
    title: "Vérifier la mention et la date d'expiration",
    text: "La carte vaut trois ans. Contrôlez que la mention « Syndic de copropriété » figure bien sur la carte et notez sa date d'expiration.",
  },
  {
    title: "Boucler les 42 heures de formation du cycle",
    text: "Attestations en lien direct avec l'activité de syndic, incluant les heures de déontologie et de non-discrimination : c'est le point de contrôle n° 1 du renouvellement.",
  },
  {
    title: "Renouveler garantie et assurance en amont",
    text: "La garantie financière doit couvrir le montant maximal des fonds détenus ; l'attestation de garantie et l'attestation RCP doivent être en cours de validité au dépôt.",
  },
  {
    title: "Déposer la demande deux mois avant l'expiration",
    text: "La demande de renouvellement se présente dans les deux mois précédant l'expiration, auprès de la CCI compétente, avec les justificatifs complets.",
  },
  {
    title: "Tenir l'équipe au même niveau d'exigence",
    text: "Gestionnaires et collaborateurs habilités sont également visés par la formation continue : planifiez les cycles de toute l'équipe.",
  },
];

const relatedGuides = [
  {
    href: "/guides/renouvellement-carte-professionnelle-immobilier",
    title: "Renouvellement de la carte professionnelle",
    text: "Calendrier triennal, pièces et points de blocage fréquents.",
  },
  {
    href: "/guides/formation-loi-alur-42-heures",
    title: "Formation loi ALUR 42 heures",
    text: "Volume, modalités et contenus de l'obligation de formation.",
  },
  {
    href: "/guides/qui-doit-suivre-formation-42-heures",
    title: "Qui doit suivre la formation 42 heures ?",
    text: "Titulaires, directions et collaborateurs habilités : le périmètre exact.",
  },
  {
    href: "/formation-tracfin-immobilier",
    title: "Formation TRACFIN immobilier",
    text: "Le volet lutte anti-blanchiment, obligatoire pour les professionnels.",
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

export default function SyndicCoproprieteCarteGFormationPage() {
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
                    Syndic de copropriété : carte G et formation
                  </li>
                </ol>
              </nav>

              <div className="mt-9 max-w-4xl">
                <p className="inline-flex rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-brand-gold-pale">
                  Guide réglementaire 2026
                </p>
                <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                  Formation syndic de copropriété et carte G&nbsp;: les obligations spécifiques
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl">
                  Mention « Syndic de copropriété », garantie financière
                  renforcée, contrat type et formation continue&nbsp;: le syndic
                  professionnel relève d’un régime plus strict que la simple
                  gestion locative. Le point complet.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#carte-g"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gold px-5 py-3.5 text-sm font-black text-brand-navy transition hover:bg-brand-gold-hover"
                  >
                    Comprendre carte G et mention syndic
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <a
                    href={CCI_RENEWAL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    La formalité sur cci.fr
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
                    ["#carte-g", "Carte G et mention syndic"],
                    ["#differences", "Transactions, gestion, syndic"],
                    ["#obligations", "Obligations du syndic"],
                    ["#formation", "Formation continue"],
                    ["#renouvellement", "Renouvellement"],
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
              <section id="carte-g" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Carte G, carte syndic
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy sm:text-4xl">
                  Quelle carte pour exercer la fonction de syndic&nbsp;?
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
                  <p>
                    La « carte G » désigne dans le langage courant la carte
                    professionnelle mention <strong>« Gestion immobilière »</strong>.
                    Jusqu’en 2015, elle couvrait aussi l’activité de syndic de
                    copropriété. Le décret n°&nbsp;2015-702 a créé une mention
                    propre, <strong>« Syndic de copropriété »</strong>, que le
                    professionnel doit désormais détenir pour exercer la fonction
                    de syndic.
                  </p>
                  <p>
                    Comme toute carte professionnelle, elle est délivrée par la
                    CCI, valable <strong>trois ans</strong> et renouvelable, sous
                    réserve des conditions d’aptitude professionnelle, de
                    moralité, de garantie financière et d’assurance prévues par
                    la{" "}
                    <SourceLink href={LEGIFRANCE_LAW_URL}>
                      loi n°&nbsp;70-9 du 2 janvier 1970
                    </SourceLink>
                    .
                  </p>
                </div>

                <div className="mt-7 rounded-2xl border-l-4 border-brand-gold bg-white p-6 shadow-sm">
                  <div className="flex gap-4">
                    <Scale className="mt-1 h-6 w-6 shrink-0 text-brand-gold-dark" aria-hidden />
                    <div>
                      <h3 className="font-black text-brand-navy">
                        Deux mentions souvent liées
                      </h3>
                      <p className="mt-2 leading-7 text-slate-700">
                        Les cabinets de syndic exercent presque toujours aussi
                        la gestion locative&nbsp;: les mentions « Syndic de
                        copropriété » et « Gestion immobilière » sont donc
                        fréquemment demandées et délivrées ensemble, chacune
                        devant être justifiée au titre de l’aptitude
                        professionnelle.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="differences" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Périmètre des mentions
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Transactions, gestion, syndic&nbsp;: trois cartes, trois métiers
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700">
                  Chaque mention couvre un périmètre d’opérations distinct.
                  Exercer hors de la mention détenue revient à exercer sans
                  carte pour cette activité.
                </p>
                <div className="mt-7 grid gap-4 md:grid-cols-3">
                  {mentions.map((mention, index) => (
                    <div
                      key={mention.title}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-sm font-black text-white">
                        {index + 1}
                      </span>
                      <h3 className="mt-5 text-lg font-black text-brand-navy">
                        {mention.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {mention.text}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-5 flex gap-3 rounded-xl bg-brand-navy/5 p-4 text-sm leading-6 text-slate-700">
                  <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-navy" aria-hidden />
                  À ces trois mentions s’ajoutent « Marchand de listes » et
                  « Prestations touristiques résiduelles ». Les documents de
                  contrôle diffèrent selon la mention&nbsp;: registre-répertoire
                  pour la transaction, livres de caisse et comptes bancaires
                  pour la gestion et le syndic.
                </p>
              </section>

              <section id="obligations" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Un régime plus strict
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Les obligations spécifiques du syndic professionnel
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-700">
                  Le syndic gère l’argent des autres — les fonds du syndicat de
                  copropriétaires. La loi Hoguet et son décret lui imposent en
                  conséquence un encadrement renforcé&nbsp;:
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {obligations.map((obligation) => (
                    <li
                      key={obligation}
                      className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold leading-6 text-slate-700"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold-dark" aria-hidden />
                      {obligation}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 overflow-hidden rounded-2xl bg-brand-navy text-white">
                  <div className="grid gap-0 md:grid-cols-[1fr_1.35fr]">
                    <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-8">
                      <p className="text-4xl font-black text-brand-gold">110 000 €</p>
                      <p className="mt-2 font-bold">de garantie financière minimale</p>
                    </div>
                    <div className="p-6 md:p-8">
                      <p className="leading-7 text-white/80">
                        Le{" "}
                        <a
                          href={LEGIFRANCE_DECREE_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-brand-gold-pale underline underline-offset-4"
                        >
                          décret du 20 juillet 1972
                        </a>{" "}
                        fixe le plancher légal à <strong className="text-white">110&nbsp;000&nbsp;€</strong>,
                        ramené à <strong className="text-white">30&nbsp;000&nbsp;€</strong>{" "}
                        pendant les deux premières années d’exercice — le montant
                        réel devant couvrir le maximum des fonds détenus. Pour un
                        syndic, la garantie suit donc la croissance du portefeuille
                        de copropriétés.
                      </p>
                      <p className="mt-4 text-sm text-white/70">
                        Contrairement à l’agent de transaction, le syndic ne peut
                        pas opter pour la « non-détention de fonds »&nbsp;: la
                        détention est consubstantielle à sa mission.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="formation" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Formation continue
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Formation du syndic&nbsp;: même obligation, contenu dédié
                </h2>
                <div className="mt-6 grid gap-6 md:grid-cols-[1.3fr_1fr]">
                  <div className="space-y-5 text-base leading-8 text-slate-700">
                    <p>
                      Le{" "}
                      <SourceLink href={LEGIFRANCE_FORMATION_URL}>
                        décret n°&nbsp;2016-173 du 18 février 2016
                      </SourceLink>{" "}
                      soumet tous les titulaires — y compris les syndics — à{" "}
                      <strong>42 heures de formation par période de trois ans</strong>{" "}
                      (ou 14 heures par an), dont deux heures de déontologie et
                      deux heures de non-discrimination par cycle.
                    </p>
                    <p>
                      L’exigence clé pour un syndic est le{" "}
                      <strong>lien direct avec l’activité déclarée</strong>&nbsp;:
                      le programme doit porter sur la copropriété — assemblées
                      générales, budgets et appels de fonds, contrat de syndic,
                      travaux, comptabilité — et non sur la seule transaction.
                      Cette obligation est vérifiée au renouvellement de la
                      carte.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <BookOpen className="h-8 w-8 text-brand-gold-dark" aria-hidden />
                    <h3 className="mt-5 font-black text-brand-navy">
                      Contenus pertinents pour un syndic
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm text-slate-700">
                      {[
                        "Loi de 1965 et décret de 1967",
                        "Assemblées générales et votes",
                        "Budgets, appels de fonds, comptes",
                        "Déontologie et non-discrimination (2 h + 2 h)",
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

              <section id="renouvellement" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Calendrier
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Renouveler la carte d’un syndic en cinq réflexes
                </h2>
                <ol className="mt-7 space-y-4">
                  {renouvellementSteps.map((step, index) => (
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
                      La formalité triennale en détail
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      Notre guide du renouvellement liste les pièces et les
                      erreurs qui font rejeter les dossiers.
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

              <section id="faq" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Questions fréquentes
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Syndic de copropriété&nbsp;: FAQ
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
                        Activités réglementées, carte professionnelle, garantie financière et formation continue (art. 3-1).
                      </p>
                    </li>
                    <li>
                      <SourceLink href={LEGIFRANCE_DECREE_URL}>
                        Décret n°&nbsp;72-678 du 20 juillet 1972 — Légifrance
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Mentions de la carte, montant de la garantie financière, validité et renouvellement.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={LEGIFRANCE_FORMATION_URL}>
                        Décret n°&nbsp;2016-173 du 18 février 2016 — Légifrance
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Formation professionnelle continue : 14 h par an ou 42 h sur trois ans, contenus obligatoires.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={CCI_RENEWAL_URL}>
                        Renouvellement de carte professionnelle — CCI France
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Durée de validité de trois ans, dépôt deux mois avant l’expiration, pièces attendues.
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
                    <CalendarDays className="h-8 w-8 text-brand-gold" aria-hidden />
                    <h2 className="mt-5 text-2xl font-black sm:text-3xl">
                      Un cycle de formation conforme pour votre cabinet
                    </h2>
                    <p className="mt-3 leading-7 text-white/75">
                      Le parcours MonPassFormation (42 h loi ALUR + 3 h TRACFIN,
                      certifié Qualiopi, avec visioconférences) permet aux
                      professionnels de la gestion et du syndic de valider leur
                      cycle complet dans les règles.
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
