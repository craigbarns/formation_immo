import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Building2,
  ExternalLink,
  FileCheck2,
  Landmark,
  Leaf,
  Scale,
  ShieldCheck,
  TrendingUp,
  XCircle,
  type LucideIcon,
} from "lucide-react";

const SITE_URL = "https://monpassformation.com";
const PAGE_PATH = "/guides/contenus-obligatoires-formation-alur";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const COVER_URL = `${SITE_URL}/generated/fal/transaction/cover-immobilier.jpg`;
const LEGIFRANCE_DECREE_URL =
  "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000032080616/";
const LEGIFRANCE_ETHICS_URL =
  "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000042427805";
const CCI_RENEWAL_URL =
  "https://www.cci.fr/ressources/formalites-en-ligne/fichier-des-professionnels-de-limmobilier/renouvellement-de-carte-professionnelle";

const title =
  "Contenu de la formation loi ALUR : les 6 domaines admis et les heures obligatoires";
const description =
  "Contenu de la formation loi ALUR : les 6 domaines admis, les 4 h de déontologie obligatoires et ce qui ne compte pas dans les 42 heures.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    absolute: title,
  },
  description,
  keywords: [
    "contenu formation loi alur",
    "domaines formation continue immobilier",
    "formation déontologie immobilier 2 heures",
    "non-discrimination accès au logement formation",
    "formation transition énergétique immobilier",
    "programme formation 42 heures immobilier",
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
        alt: "Contenus obligatoires de la formation loi ALUR",
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
    question:
      "Les 4 heures de déontologie sont-elles en plus des 42 heures ?",
    answer:
      "Non. Les 2 heures consacrées à la non-discrimination à l’accès au logement et les 2 heures portant sur les autres règles déontologiques sont comprises dans le volume global de 42 heures. Il s’agit d’un contenu obligatoire à intégrer dans le parcours, pas d’heures supplémentaires.",
  },
  {
    question:
      "Une formation sur la transition énergétique ou le DPE compte-t-elle ?",
    answer:
      "Oui. La transition énergétique fait partie des six domaines expressément admis par le décret. Les formations sur le diagnostic de performance énergétique, les passoires thermiques ou la rénovation énergétique sont recevables, à condition d’être en lien avec l’activité exercée.",
  },
  {
    question:
      "Une formation commerciale générique aux techniques de vente est-elle recevable ?",
    answer:
      "Seulement si elle est directement liée au métier immobilier exercé. Le décret vise les pratiques commerciales liées au métier : une formation à la vente déconnectée de la transaction ou de la gestion immobilière ne satisfait pas l’exigence de lien direct avec l’activité.",
  },
  {
    question:
      "La participation à un salon ou à une conférence immobilière compte-t-elle ?",
    answer:
      "En principe non. L’obligation porte sur des activités de formation, attestées avec objectifs, contenu, durée et date de réalisation. Un salon professionnel, une soirée de réseautage ou une simple conférence sans dispositif pédagogique ne produit pas une attestation conforme.",
  },
  {
    question: "Une formation TRACFIN peut-elle compter dans les 42 heures ?",
    answer:
      "La lutte contre le blanchiment relève d’une obligation distincte, issue du code monétaire et financier. Une formation TRACFIN peut néanmoins être admise dans les 42 heures si elle s’inscrit dans un domaine prévu par le décret — droit applicable à l’activité ou déontologie — et présente un lien direct avec l’activité exercée.",
  },
  {
    question:
      "L’organisme de formation doit-il obligatoirement être certifié Qualiopi ?",
    answer:
      "Le décret n’impose pas la certification Qualiopi : il exige surtout une attestation mentionnant objectifs, contenu, durée et date de réalisation. La certification reste un gage de sérieux et conditionne l’accès aux financements publics et mutualisés.",
  },
  {
    question: "Peut-on concentrer les 42 heures sur une seule année ?",
    answer:
      "Oui, si vous optez pour la modalité « 42 heures sur trois années consécutives d’exercice », la répartition dans le temps est libre. Avec la modalité « 14 heures par an », chaque année d’exercice doit comporter ses 14 heures.",
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
          name: "Formation continue des professionnels de l’immobilier",
        },
        {
          "@type": "Thing",
          name: "Déontologie immobilière",
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
          item: "https://monpassformation.com/guides",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Contenus obligatoires de la formation ALUR",
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
    icon: BookOpen,
    value: "6",
    label: "domaines admis",
    detail: "Du droit immobilier à la transition énergétique, fixés par le décret.",
  },
  {
    icon: ShieldCheck,
    value: "4 h",
    label: "de déontologie par cycle",
    detail: "Dont 2 h obligatoires sur la non-discrimination à l’accès au logement.",
  },
  {
    icon: FileCheck2,
    value: "Lien direct",
    label: "avec l’activité exercée",
    detail: "La condition de recevabilité de chaque heure de formation.",
  },
];

const domains = [
  {
    icon: Scale,
    title: "Droit applicable à l’activité immobilière",
    text: "Loi Hoguet, mandats, compromis, baux, copropriété, réglementation locative : le socle juridique du métier, y compris ses évolutions récentes.",
  },
  {
    icon: TrendingUp,
    title: "Économie et environnement du marché",
    text: "Dynamiques de prix, financement de l’acquéreur, tendances locales, données du marché : comprendre le contexte dans lequel on conseille les clients.",
  },
  {
    icon: Building2,
    title: "Pratiques commerciales liées au métier",
    text: "Prospection, estimation, négociation, relation client, outils numériques de la transaction : les techniques directement rattachées à l’exercice quotidien.",
  },
  {
    icon: ShieldCheck,
    title: "Déontologie des professionnels de l’immobilier",
    text: "Règles éthiques de la profession, conflits d’intérêts, protection du consommateur — avec les heures obligatoires détaillées plus bas.",
  },
  {
    icon: Landmark,
    title: "Construction, habitation et urbanisme",
    text: "Techniques de construction, pathologies du bâti, règles d’urbanisme, servitudes : les connaissances techniques utiles au conseil.",
  },
  {
    icon: Leaf,
    title: "Transition énergétique",
    text: "DPE, passoires thermiques, rénovation énergétique, interdictions progressives à la location : un domaine devenu central dans la transaction et la gestion.",
  },
];

const notEligible = [
  {
    title: "Les sujets hors des six domaines",
    text: "Développement personnel, langues, bureautique générale : même utiles, ces formations ne relèvent pas des domaines admis par le décret.",
  },
  {
    title: "Les contenus sans lien direct avec l’activité",
    text: "Une formation transaction suivie par un syndic de copropriété, ou inversement, ne satisfait pas l’exigence de lien avec l’activité réellement exercée.",
  },
  {
    title: "Les événements sans dispositif pédagogique",
    text: "Salons, conférences, petits-déjeuners réseau, webinaires promotionnels : sans objectifs de formation ni attestation conforme, ces temps ne comptent pas.",
  },
  {
    title: "La veille personnelle non encadrée",
    text: "Lire la presse immobilière ou des ouvrages juridiques relève de la culture professionnelle, pas d’une activité de formation attestée.",
  },
  {
    title: "Les formations sans attestation complète",
    text: "Sans document mentionnant objectifs, contenu, durée et date de réalisation, impossible de justifier les heures auprès de la CCI.",
  },
];

const planningSteps = [
  {
    title: "Partir de votre activité réelle",
    text: "Transaction, gestion locative, syndic ou marchand de listes : listez les situations que vous traitez au quotidien pour identifier les domaines pertinents.",
  },
  {
    title: "Réserver d’abord les 4 heures obligatoires",
    text: "Programmez en priorité les 2 h de non-discrimination à l’accès au logement et les 2 h d’autres règles déontologiques, exigées par cycle de trois ans.",
  },
  {
    title: "Compléter avec les domaines admis utiles",
    text: "Droit, marché, pratiques commerciales, construction, transition énergétique : choisissez les modules qui renforcent réellement votre pratique.",
  },
  {
    title: "Vérifier le lien direct de chaque module",
    text: "Pour chaque formation envisagée, demandez-vous : « ce contenu sert-il l’activité que j’exerce ? ». En cas de doute, consultez l’organisme ou la CCI.",
  },
  {
    title: "Exiger une attestation conforme",
    text: "Objectifs, contenu, durée, date de réalisation : contrôlez ces mentions dès réception et archivez le document avec vos autres justificatifs.",
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

export default function ContenusObligatoiresFormationAlurPage() {
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
                    Contenus obligatoires de la formation ALUR
                  </li>
                </ol>
              </nav>

              <div className="mt-9 max-w-4xl">
                <p className="inline-flex rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-brand-gold-pale">
                  Guide réglementaire 2026
                </p>
                <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                  Contenu de la formation loi ALUR&nbsp;: ce qui compte et ce
                  qui ne compte pas
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl">
                  Six domaines admis, quatre heures de déontologie
                  obligatoires, et une exigence transversale&nbsp;: le lien
                  direct avec l’activité exercée. Voici comment vérifier qu’un
                  programme est recevable avant de s’y engager.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#domaines"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gold px-5 py-3.5 text-sm font-black text-brand-navy transition hover:bg-brand-gold-hover"
                  >
                    Voir les 6 domaines
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <a
                    href={LEGIFRANCE_DECREE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    Lire le décret sur Légifrance
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
                    ["#domaines", "Les 6 domaines admis"],
                    ["#deontologie", "Les 4 h de déontologie"],
                    ["#pas-recevable", "Ce qui ne compte pas"],
                    ["#programme", "Construire son programme"],
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
              <section id="domaines" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Programme recevable
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy sm:text-4xl">
                  Les 6 domaines admis par le décret
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
                  <p>
                    Le{" "}
                    <SourceLink href={LEGIFRANCE_DECREE_URL}>
                      décret n°&nbsp;2016-173 du 18 février 2016
                    </SourceLink>{" "}
                    ne laisse pas le choix des sujets au hasard&nbsp;: seules
                    comptent les activités de formation portant sur les
                    domaines qu’il liste, et présentant un{" "}
                    <strong>lien direct avec l’activité professionnelle
                    exercée</strong>. Voici les six domaines admis, tels
                    qu’appliqués aux professions immobilières.
                  </p>
                </div>
                <div className="mt-7 grid gap-4 md:grid-cols-2">
                  {domains.map((domain) => {
                    const Icon = domain.icon;

                    return (
                      <div
                        key={domain.title}
                        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                      >
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gold/15 text-brand-navy">
                          <Icon className="h-5 w-5" aria-hidden />
                        </span>
                        <h3 className="mt-5 text-lg font-black text-brand-navy">
                          {domain.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-slate-600">
                          {domain.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section id="deontologie" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Contenu imposé
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Les 4 heures de déontologie obligatoires par cycle
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-700">
                  Au sein du domaine «&nbsp;déontologie&nbsp;», le législateur
                  a verrouillé un minimum incompressible pour chaque cycle de
                  trois ans. Ces heures sont <strong>comprises dans les
                  42&nbsp;heures</strong> — elles ne s’y ajoutent pas.
                </p>
                <div className="mt-8 overflow-hidden rounded-2xl bg-brand-navy text-white">
                  <div className="grid gap-0 md:grid-cols-[1fr_1.35fr]">
                    <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-8">
                      <p className="text-4xl font-black text-brand-gold">4 heures</p>
                      <p className="mt-2 font-bold">de déontologie sur le cycle de 3 ans</p>
                    </div>
                    <div className="p-6 md:p-8">
                      <p className="leading-7 text-white/80">
                        Le cycle comprend au moins{" "}
                        <strong className="text-white">
                          2 heures sur la non-discrimination à l’accès au
                          logement
                        </strong>{" "}
                        et au moins{" "}
                        <strong className="text-white">
                          2 heures sur les autres règles déontologiques
                        </strong>{" "}
                        applicables à la profession&nbsp;: devoir de conseil,
                        conflits d’intérêts, transparence des honoraires,
                        protection du consommateur.
                      </p>
                      <p className="mt-4 text-sm text-white/70">
                        Source&nbsp;:{" "}
                        <a
                          href={LEGIFRANCE_ETHICS_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-brand-gold-pale underline underline-offset-4"
                        >
                          décret relatif à la déontologie sur Légifrance
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-7 rounded-2xl border-l-4 border-brand-gold bg-white p-6 shadow-sm">
                  <div className="flex gap-4">
                    <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-brand-gold-dark" aria-hidden />
                    <div>
                      <h3 className="font-black text-brand-navy">
                        Pourquoi la non-discrimination&nbsp;?
                      </h3>
                      <p className="mt-2 leading-7 text-slate-700">
                        Les professionnels de l’immobilier sont en première
                        ligne dans l’accès au logement. Le législateur a voulu
                        qu’ils soient régulièrement formés aux critères
                        prohibés et aux bons réflexes, afin de prévenir les
                        discriminations à la location comme à la vente.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="pas-recevable" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Attention
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Ce qui ne compte PAS dans les 42 heures
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700">
                  C’est le piège classique du renouvellement&nbsp;: accumuler
                  des heures qui ne seront pas retenues. Voici les cinq cas
                  les plus fréquents de contenus non recevables.
                </p>
                <div className="mt-7 space-y-4">
                  {notEligible.map((item) => (
                    <div
                      key={item.title}
                      className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      <XCircle
                        className="mt-1 h-6 w-6 shrink-0 text-red-500"
                        aria-hidden
                      />
                      <div>
                        <h3 className="font-black text-brand-navy">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-5 flex gap-3 rounded-xl bg-brand-navy/5 p-4 text-sm leading-6 text-slate-700">
                  <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-navy" aria-hidden />
                  Pour sécuriser vos justificatifs, consultez notre guide sur
                  l’{" "}
                  <Link
                    href="/guides/attestation-formation-alur-validite"
                    className="font-bold text-brand-navy underline decoration-brand-gold/60 decoration-2 underline-offset-4 transition hover:text-brand-navy-mid"
                  >
                    attestation de formation loi ALUR et sa validité
                  </Link>
                  .
                </p>
              </section>

              <section id="programme" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Méthode pratique
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Construire un programme recevable en 5 étapes
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
              </section>

              <section id="faq" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Questions fréquentes
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Contenu de la formation loi ALUR&nbsp;: FAQ
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
                      <SourceLink href={LEGIFRANCE_DECREE_URL}>
                        Décret n°&nbsp;2016-173 du 18 février 2016 — Légifrance
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Domaines de formation admis et exigence de lien direct
                        avec l’activité.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={LEGIFRANCE_ETHICS_URL}>
                        Décret relatif à la déontologie — Légifrance
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Heures obligatoires de non-discrimination et de règles
                        déontologiques.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={CCI_RENEWAL_URL}>
                        Renouvellement de carte professionnelle — CCI France
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Contrôle des justificatifs de formation au moment du
                        renouvellement.
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

              <section aria-labelledby="guides-lies" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Pour aller plus loin
                </p>
                <h2 id="guides-lies" className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Guides liés
                </h2>
                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      href: "/guides/formation-loi-alur-42-heures",
                      title: "Formation loi ALUR 42 heures : le guide complet",
                      text: "Durée, rythme, personnes concernées et justificatifs.",
                    },
                    {
                      href: "/guides/qui-doit-suivre-formation-42-heures",
                      title: "Qui est concerné par la formation 42 heures ?",
                      text: "Titulaire, dirigeant, salarié habilité, indépendant : votre cas.",
                    },
                    {
                      href: "/guides/attestation-formation-alur-validite",
                      title: "Attestation de formation ALUR et validité",
                      text: "Mentions obligatoires et pièges à éviter.",
                    },
                    {
                      href: "/guides/erreurs-renouvellement-carte-professionnelle",
                      title: "Erreurs au renouvellement de la carte professionnelle",
                      text: "Les 7 erreurs qui font rejeter le dossier CCI.",
                    },
                  ].map((guide) => (
                    <Link
                      key={guide.href}
                      href={guide.href}
                      className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-gold"
                    >
                      <h3 className="font-black text-brand-navy transition group-hover:text-brand-navy-mid">
                        {guide.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {guide.text}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-gold-dark">
                        Lire le guide
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="overflow-hidden rounded-3xl bg-brand-navy p-7 text-white sm:p-10">
                <div className="flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
                  <div className="max-w-2xl">
                    <BookOpen className="h-8 w-8 text-brand-gold" aria-hidden />
                    <h2 className="mt-5 text-2xl font-black sm:text-3xl">
                      Un programme 100&nbsp;% conforme avec MonPassFormation
                    </h2>
                    <p className="mt-3 leading-7 text-white/75">
                      Formation Loi ALUR 42 h + TRACFIN 3 h à 299&nbsp;€,
                      certifiée Qualiopi, en visioconférences&nbsp;: les six
                      domaines, les 4 h de déontologie et la non-discrimination
                      sont couverts, avec attestations conformes à la clé.
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
