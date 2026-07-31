import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Scale,
  ShieldAlert,
  Users,
  type LucideIcon,
} from "lucide-react";

const SITE_URL = "https://monpassformation.com";
const PAGE_PATH = "/guides/formation-loi-alur-obligatoire";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const COVER_URL = `${SITE_URL}/generated/fal/transaction/cover-immobilier.jpg`;
const LEGIFRANCE_ALUR_URL =
  "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000028772256/";
const LEGIFRANCE_DECREE_URL =
  "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000032080616/";
const LEGIFRANCE_ETHICS_URL =
  "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000042427805";
const CCI_RENEWAL_URL =
  "https://www.cci.fr/ressources/formalites-en-ligne/fichier-des-professionnels-de-limmobilier/renouvellement-de-carte-professionnelle";

const title = "Formation loi ALUR obligatoire : qui, quand, sanctions";
const description =
  "La formation loi ALUR est obligatoire pour les professionnels de l’immobilier : 42 h sur 3 ans. Qui est concerné, quand la suivre, sanctions encourues.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    absolute: title,
  },
  description,
  keywords: [
    "formation loi ALUR obligatoire",
    "obligation formation continue immobilier",
    "formation 42 heures immobilier",
    "sanction formation loi ALUR",
    "décret 2016-173 formation continue",
    "renouvellement carte professionnelle immobilier",
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
        alt: "Formation loi ALUR obligatoire pour les professionnels de l’immobilier",
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
    question: "La formation loi ALUR est-elle vraiment obligatoire ?",
    answer:
      "Oui. Instaurée par la loi n° 2014-366 du 24 mars 2014 et précisée par le décret n° 2016-173 du 18 février 2016, la formation continue est une obligation professionnelle pour les titulaires de la carte, les dirigeants ainsi que les salariés et indépendants habilités. Le justificatif de formation est exigé lors du renouvellement de la carte professionnelle.",
  },
  {
    question:
      "Combien d’heures de formation sont obligatoires et sur quelle période ?",
    answer:
      "Le décret fixe deux rythmes possibles : 14 heures par an ou 42 heures au cours de trois années consécutives d’exercice. Par cycle de trois ans, au moins 2 heures doivent porter sur la non-discrimination à l’accès au logement et 2 heures sur les autres règles déontologiques.",
  },
  {
    question:
      "Que risque un professionnel qui ne suit pas la formation obligatoire ?",
    answer:
      "Le risque principal est le refus de renouvellement de la carte professionnelle par la CCI, faute de justificatif de formation continue. Exercer sans carte valide constitue un exercice illégal de la profession, passible selon l’article 14 de la loi Hoguet de peines pouvant atteindre six mois d’emprisonnement et 7 500 € d’amende, sans préjudice de sanctions civiles comme le remboursement des honoraires.",
  },
  {
    question: "N’importe quelle formation peut-elle compter pour les 42 heures ?",
    answer:
      "Non. La formation doit avoir un lien direct avec l’activité réellement exercée et relever de l’un des six domaines admis : droit applicable à l’activité immobilière, économie et environnement du marché, pratiques commerciales, déontologie, construction-habitation-urbanisme et transition énergétique.",
  },
  {
    question: "Un salarié non habilité doit-il suivre la formation ?",
    answer:
      "Non. Seuls les salariés habilités à négocier, s’entremettre ou s’engager pour le compte du titulaire sont soumis à l’obligation. Les fonctions purement administratives ou de support ne sont pas concernées.",
  },
  {
    question: "La formation peut-elle être suivie entièrement à distance ?",
    answer:
      "Les textes n’imposent pas de modalité présentielle. Une formation à distance est recevable dès lors que son contenu respecte les domaines admis et que l’attestation délivrée mentionne les objectifs, le contenu, la durée et la date de réalisation.",
  },
  {
    question: "Quand faut-il justifier de la formation auprès de la CCI ?",
    answer:
      "Au moment du renouvellement de la carte professionnelle, dont la demande se présente dans les deux mois précédant son expiration. La carte étant valable trois ans, conservez chaque attestation au fil de l’eau pour constituer votre dossier sans stress à chaque échéance.",
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
          name: "Loi ALUR",
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
          name: "Formation loi ALUR obligatoire",
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
    value: "2014",
    label: "loi ALUR",
    detail: "Loi n° 2014-366 du 24 mars 2014, décret d’application de 2016.",
  },
  {
    icon: Clock3,
    value: "42 h",
    label: "sur trois ans",
    detail: "Ou 14 heures par année d’exercice, au choix du professionnel.",
  },
  {
    icon: ShieldAlert,
    value: "Carte pro",
    label: "non renouvelée",
    detail: "Sans justificatif de formation, la CCI peut refuser le renouvellement.",
  },
];

const legalPillars = [
  {
    title: "La loi ALUR du 24 mars 2014",
    text: "La loi n° 2014-366 pour l’accès au logement et un urbanisme rénové instaure l’obligation de formation continue des professionnels de l’immobilier.",
  },
  {
    title: "Le décret n° 2016-173 du 18 février 2016",
    text: "Il précise les personnes concernées, la durée de 14 h par an ou 42 h sur trois ans, les domaines recevables et les justificatifs à conserver.",
  },
  {
    title: "La loi Hoguet du 2 janvier 1970",
    text: "La loi n° 70-9 conditionne l’exercice des professions immobilières à la détention d’une carte professionnelle délivrée par la CCI, valable trois ans.",
  },
];

const sanctions = [
  {
    title: "Refus de renouvellement de la carte professionnelle",
    text: "Le justificatif de formation continue fait partie des pièces exigées par la CCI. Un dossier déposé sans attestations conformes peut être rejeté, ce qui bloque le renouvellement de la carte, valable trois ans.",
  },
  {
    title: "Interdiction d’exercer la profession",
    text: "Sans carte professionnelle valide, nul ne peut négocier, s’entremettre ou gérer des biens pour autrui. Poursuivre l’activité revient à exercer illégalement la profession.",
  },
  {
    title: "Sanctions pénales et civiles",
    text: "L’article 14 de la loi Hoguet punit l’exercice illégal de la profession de peines pouvant atteindre six mois d’emprisonnement et 7 500 € d’amende. Sur le plan civil, les commissions indûment perçues peuvent devoir être restituées.",
  },
];

const planningSteps = [
  {
    title: "Vérifier que vous êtes soumis à l’obligation",
    text: "Titulaire de la carte, représentant légal ou statutaire d’une personne morale, dirigeant d’établissement, salarié ou indépendant habilité : identifiez votre catégorie exacte.",
  },
  {
    title: "Choisir votre rythme : 14 h par an ou 42 h sur trois ans",
    text: "Les deux modalités sont prévues par le décret. Le rythme annuel lisse la charge ; le cycle de trois ans offre plus de souplesse de calendrier.",
  },
  {
    title: "Intégrer les 4 heures de déontologie obligatoires",
    text: "Par cycle de trois ans : au moins 2 h sur la non-discrimination à l’accès au logement et 2 h sur les autres règles déontologiques.",
  },
  {
    title: "Sélectionner des contenus en lien direct avec votre activité",
    text: "Chaque module doit relever d’un domaine admis et correspondre à l’activité réellement exercée : transaction, gestion locative, syndic ou marchand de listes.",
  },
  {
    title: "Conserver les attestations et anticiper la formalité CCI",
    text: "Chaque attestation doit mentionner objectifs, contenu, durée et date de réalisation. Préparez votre dossier avant l’ouverture de la période de dépôt, deux mois avant l’expiration de la carte.",
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

export default function FormationLoiAlurObligatoirePage() {
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
                    Formation loi ALUR obligatoire
                  </li>
                </ol>
              </nav>

              <div className="mt-9 max-w-4xl">
                <p className="inline-flex rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-brand-gold-pale">
                  Guide réglementaire 2026
                </p>
                <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                  Formation loi ALUR obligatoire&nbsp;: qui, quand et quelles sanctions
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl">
                  Depuis 2014, la formation continue n’est plus une option pour
                  les professionnels de l’immobilier. Qui est concerné, à quel
                  rythme se former, et que risque-t-on en cas de
                  manquement&nbsp;? Le point complet, fondé sur les textes
                  officiels.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#cadre-legal"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gold px-5 py-3.5 text-sm font-black text-brand-navy transition hover:bg-brand-gold-hover"
                  >
                    Comprendre l’obligation
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
                    ["#cadre-legal", "Le cadre légal"],
                    ["#qui-quand", "Qui est concerné, quand"],
                    ["#sanctions", "Sanctions encourues"],
                    ["#se-conformer", "Se mettre en conformité"],
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
              <section id="cadre-legal" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Le cadre légal
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy sm:text-4xl">
                  Pourquoi la formation loi ALUR est-elle obligatoire&nbsp;?
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
                  <p>
                    La formation continue des professionnels de l’immobilier a
                    été instaurée par la{" "}
                    <SourceLink href={LEGIFRANCE_ALUR_URL}>
                      loi n°&nbsp;2014-366 du 24 mars 2014
                    </SourceLink>
                    , dite loi ALUR. Son objectif&nbsp;: garantir que tout
                    professionnel qui conseille des consommateurs sur une
                    transaction, une location ou la gestion d’un bien maintient
                    ses connaissances à jour tout au long de sa carrière.
                  </p>
                  <p>
                    Le{" "}
                    <SourceLink href={LEGIFRANCE_DECREE_URL}>
                      décret n°&nbsp;2016-173 du 18 février 2016
                    </SourceLink>{" "}
                    a fixé le régime détaillé de cette obligation&nbsp;:
                    personnes concernées, durée, domaines recevables et
                    justificatifs. Ce socle est complété par le décret relatif
                    à la déontologie de la profession, qui a introduit les
                    heures obligatoires sur la non-discrimination.
                  </p>
                  <p>
                    Enfin, cette obligation s’articule avec la loi Hoguet&nbsp;:
                    la carte professionnelle délivrée par la CCI est le sésame
                    de l’exercice, et le justificatif de formation continue est
                    exigé lors de son renouvellement. La formation est donc
                    indissociable du droit d’exercer.
                  </p>
                </div>
                <div className="mt-7 grid gap-4 md:grid-cols-3">
                  {legalPillars.map((pillar, index) => (
                    <div
                      key={pillar.title}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-sm font-black text-white">
                        {index + 1}
                      </span>
                      <h3 className="mt-5 text-lg font-black text-brand-navy">
                        {pillar.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {pillar.text}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="qui-quand" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Champ d’application
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Qui est concerné, et à quel rythme&nbsp;?
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
                  <p>
                    L’obligation vise quatre catégories de professionnels, sans
                    distinction entre transaction, gestion locative, syndic de
                    copropriété ou marchand de listes&nbsp;:
                  </p>
                  <ul className="space-y-3">
                    {[
                      "les titulaires de la carte professionnelle et, pour une personne morale, son représentant légal et statutaire ;",
                      "les personnes qui dirigent un établissement, une succursale, une agence ou un bureau ;",
                      "les salariés habilités à négocier, s’entremettre ou s’engager pour le compte du titulaire ;",
                      "les travailleurs indépendants habilités, comme les agents commerciaux rattachés à une agence.",
                    ].map((item) => (
                      <li key={item} className="flex gap-3">
                        <CheckCircle2
                          className="mt-1 h-5 w-5 shrink-0 text-brand-gold-dark"
                          aria-hidden
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p>
                    Côté calendrier, le professionnel choisit entre{" "}
                    <strong>14 heures par an</strong> ou{" "}
                    <strong>42 heures sur trois années consécutives
                    d’exercice</strong>. Par cycle de trois ans, au moins{" "}
                    <strong>2 heures de non-discrimination</strong> à l’accès au
                    logement et <strong>2 heures d’autres règles
                    déontologiques</strong> sont exigées, comprises dans le
                    volume global.
                  </p>
                </div>
                <p className="mt-5 flex gap-3 rounded-xl bg-brand-navy/5 p-4 text-sm leading-6 text-slate-700">
                  <Users className="mt-0.5 h-5 w-5 shrink-0 text-brand-navy" aria-hidden />
                  Chaque situation est détaillée cas par cas dans notre guide{" "}
                  <Link
                    href="/guides/qui-doit-suivre-formation-42-heures"
                    className="font-bold text-brand-navy underline decoration-brand-gold/60 decoration-2 underline-offset-4 transition hover:text-brand-navy-mid"
                  >
                    qui est concerné par la formation 42 heures
                  </Link>
                  .
                </p>
              </section>

              <section id="sanctions" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  En cas de manquement
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Sanctions en cas de non-respect de l’obligation
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700">
                  Le dispositif ne prévoit pas d’amende administrative
                  spécifique pour défaut de formation. La sanction est
                  indirecte, mais redoutable&nbsp;: elle frappe le droit même
                  d’exercer la profession.
                </p>
                <div className="mt-7 space-y-4">
                  {sanctions.map((sanction) => (
                    <div
                      key={sanction.title}
                      className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      <AlertTriangle
                        className="mt-1 h-6 w-6 shrink-0 text-brand-gold-dark"
                        aria-hidden
                      />
                      <div>
                        <h3 className="font-black text-brand-navy">
                          {sanction.title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">
                          {sanction.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-7 rounded-2xl border-l-4 border-brand-gold bg-white p-6 shadow-sm">
                  <div className="flex gap-4">
                    <Scale className="mt-1 h-6 w-6 shrink-0 text-brand-gold-dark" aria-hidden />
                    <div>
                      <h3 className="font-black text-brand-navy">
                        Un risque collectif pour l’agence
                      </h3>
                      <p className="mt-2 leading-7 text-slate-700">
                        Pour un dirigeant, le sujet dépasse son cas
                        personnel&nbsp;: la conformité des salariés et
                        indépendants habilités conditionne la solidité du
                        dossier de la personne morale. La formation continue se
                        pilote donc au niveau de toute l’organisation.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="se-conformer" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Méthode pratique
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Se mettre en conformité en 5 étapes
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
                  Formation loi ALUR obligatoire&nbsp;: FAQ
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
                      <SourceLink href={LEGIFRANCE_ALUR_URL}>
                        Loi n°&nbsp;2014-366 du 24 mars 2014 (loi ALUR) — Légifrance
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Création de l’obligation de formation continue des
                        professionnels de l’immobilier.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={LEGIFRANCE_DECREE_URL}>
                        Décret n°&nbsp;2016-173 du 18 février 2016 — Légifrance
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Personnes concernées, durée, activités recevables et
                        justificatifs.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={LEGIFRANCE_ETHICS_URL}>
                        Décret relatif à la déontologie — Légifrance
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Règles déontologiques et non-discrimination à l’accès
                        au logement.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={CCI_RENEWAL_URL}>
                        Renouvellement de carte professionnelle — CCI France
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Justificatif de formation exigé, durée de validité et
                        période de dépôt de la demande.
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
                      text: "Durée, personnes concernées, contenus et justificatifs des 42 heures.",
                    },
                    {
                      href: "/guides/qui-doit-suivre-formation-42-heures",
                      title: "Qui est concerné par la formation 42 heures ?",
                      text: "Titulaire, dirigeant, salarié habilité, indépendant, syndic : votre cas précis.",
                    },
                    {
                      href: "/guides/contenus-obligatoires-formation-alur",
                      title: "Contenus obligatoires de la formation ALUR",
                      text: "Les six domaines admis et les 4 heures de déontologie expliqués.",
                    },
                    {
                      href: "/guides/renouvellement-carte-professionnelle-immobilier",
                      title: "Renouvellement de la carte professionnelle",
                      text: "Calendrier, pièces et procédure CCI pas à pas.",
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
                      Suivez votre formation obligatoire avec MonPassFormation
                    </h2>
                    <p className="mt-3 leading-7 text-white/75">
                      Formation Loi ALUR 42 h + TRACFIN 3 h à 299&nbsp;€,
                      certifiée Qualiopi, animée en visioconférences par des
                      experts de l’immobilier. Attestations conformes aux
                      exigences de la CCI pour votre renouvellement.
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
