import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle2,
  ExternalLink,
  Scale,
  ShieldCheck,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

const SITE_URL = "https://monpassformation.com";
const PAGE_PATH = "/guides/financement-formation-immobilier-opco-cpf";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const COVER_URL = `${SITE_URL}/generated/fal/transaction/cover-immobilier.jpg`;
const OPCO_COMMERCE_URL = "https://www.opcocommerce.fr";
const MON_COMPTE_FORMATION_URL = "https://www.moncompteformation.gouv.fr";
const QUALIOPI_URL =
  "https://travail-emploi.gouv.fr/formation-professionnelle/acteurs-cadre-et-qualite-de-la-formation-professionnelle/qualiopi";

const title = "Financement formation immobilier : OPCO, CPF et plan de développement";
const description =
  "OPCO Commerce, CPF des salariés, plan de développement des compétences : les dispositifs pour financer votre formation immobilier, et pourquoi Qualiopi est indispensable.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    absolute: title,
  },
  description,
  keywords: [
    "financement formation immobilier",
    "OPCO immobilier",
    "OPCO Commerce formation",
    "CPF formation immobilier",
    "plan de développement des compétences",
    "Qualiopi formation immobilier",
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
        alt: "Financement de la formation immobilier : OPCO, CPF et Qualiopi",
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
    question: "Quel est l’OPCO compétent pour les professionnels de l’immobilier ?",
    answer:
      "Pour la branche immobilier (agences, administrateurs de biens, foncières), l’opérateur de compétences de rattachement est l’OPCO Commerce. C’est lui qui collecte les contributions formation des entreprises de la branche et qui peut financer leurs projets de formation selon ses critères et son calendrier.",
  },
  {
    question: "Puis-je financer la formation loi ALUR avec mon CPF ?",
    answer:
      "Le CPF ne finance que les formations éligibles inscrites sur la plateforme Mon Compte Formation — en pratique, les formations certifiantes ou qualifiantes enregistrées aux répertoires RNCP ou RS. Une formation continue réglementaire de 42 heures n’est pas automatiquement éligible : vérifiez toujours la fiche de la formation sur moncompteformation.gouv.fr.",
  },
  {
    question: "Pourquoi la certification Qualiopi est-elle décisive pour le financement ?",
    answer:
      "Depuis la loi du 5 septembre 2018, un organisme de formation ne peut bénéficier de fonds publics ou mutualisés — OPCO, CPF, État, régions — que s’il est certifié Qualiopi. Sans certification, l’OPCO ou la Caisse des dépôts refusera la prise en charge, même si le contenu de la formation est excellent.",
  },
  {
    question: "Comment vérifier qu’un organisme est bien certifié Qualiopi ?",
    answer:
      "Demandez le certificat Qualiopi en cours de validité, délivré par un organisme certificateur accrédité, et vérifiez la présence de l’organisme sur la liste publique des organismes de formation certifiés. La certification est délivrée par catégorie d’actions : pour une formation, la catégorie « actions de formation » doit figurer sur le certificat.",
  },
  {
    question: "Je suis agent indépendant ou collaborateur non salarié : quels dispositifs pour moi ?",
    answer:
      "Les dispositifs OPCO et CPF visent principalement les entreprises et leurs salariés. En tant qu’indépendant ou collaborateur non salarié, le financement passe le plus souvent par un paiement direct — d’où l’importance de comparer les prix et le contenu réel des formations avant de vous engager.",
  },
  {
    question: "Quelle différence entre plan de développement des compétences et CPF ?",
    answer:
      "Le plan de développement des compétences (ex-plan de formation) est piloté par l’employeur : c’est lui qui choisit et finance les formations de ses salariés. Le CPF est un droit individuel attaché à la personne, mobilisable à son initiative pour des formations éligibles. Les deux peuvent financer de la formation professionnelle, mais la logique de décision est différente.",
  },
  {
    question: "Mon employeur peut-il refuser ma demande de formation ALUR ?",
    answer:
      "La formation continue de 42 heures sur trois ans est une obligation professionnelle liée à l’exercice du métier. Un employeur a tout intérêt à l’intégrer au plan de développement des compétences de l’agence, car ses collaborateurs habilités sont eux-mêmes soumis à cette obligation.",
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
          name: "Financement de la formation professionnelle",
        },
        {
          "@type": "Thing",
          name: "Formation continue des professionnels de l’immobilier",
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
          name: "Financement formation immobilier (OPCO, CPF)",
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
    value: "OPCO",
    label: "Commerce",
    detail: "L’opérateur de compétences de la branche immobilier.",
  },
  {
    icon: Wallet,
    value: "CPF",
    label: "pour les salariés",
    detail: "Le compte personnel de formation, mobilisable selon l’éligibilité.",
  },
  {
    icon: ShieldCheck,
    value: "Qualiopi",
    label: "obligatoire",
    detail: "Indispensable pour tout financement public ou mutualisé.",
  },
];

const fundingRows = [
  {
    device: "OPCO Commerce",
    audience:
      "Entreprises de la branche immobilier et leurs salariés.",
    principle:
      "Prise en charge de tout ou partie du coût pédagogique, selon les critères, enveloppes et calendrier de l’opérateur.",
    caution:
      "Déposez le dossier avant le démarrage de la formation et exigez un organisme certifié Qualiopi.",
  },
  {
    device: "CPF (compte personnel de formation)",
    audience:
      "Salariés, à leur initiative, via moncompteformation.gouv.fr.",
    principle:
      "Utilisation des droits acquis sur le compte personnel, abondé chaque année selon la situation.",
    caution:
      "Réservé aux formations éligibles figurant sur la plateforme ; méfiez-vous des démarcheurs qui promettent l’éligibilité.",
  },
  {
    device: "Plan de développement des compétences",
    audience:
      "Salariés d’agence, à l’initiative de l’employeur.",
    principle:
      "L’employeur finance directement les actions de formation utiles au poste — dont la formation continue réglementaire.",
    caution:
      "L’employeur peut solliciter l’OPCO Commerce en complément pour mutualiser le coût.",
  },
  {
    device: "Financement personnel",
    audience:
      "Agents indépendants, collaborateurs non salariés, titulaires à leur compte.",
    principle:
      "Paiement direct de la formation, souvent étalé possible selon l’organisme.",
    caution:
      "Comparez le contenu réel et la durée : à budget équivalent, le contenu varie fortement d’un organisme à l’autre.",
  },
];

const planningSteps = [
  {
    title: "Identifiez votre situation exacte",
    text: "Salarié d’agence, titulaire de carte à votre compte, collaborateur non salarié : le dispositif mobilisable dépend d’abord de votre statut.",
  },
  {
    title: "Vérifiez votre OPCO de branche",
    text: "Pour l’immobilier, l’opérateur de compétences de rattachement est l’OPCO Commerce. Consultez ses critères de prise en charge et son calendrier.",
  },
  {
    title: "Exigez un devis et un programme détaillé",
    text: "Tout dossier de financement repose sur un programme précis : objectifs, contenu, durée, modalités et prix. Refusez les devis vagues.",
  },
  {
    title: "Contrôlez la certification Qualiopi",
    text: "Sans certification Qualiopi en cours de validité, aucun financement public ou mutualisé n’est possible. Demandez le certificat avant de déposer votre demande.",
  },
  {
    title: "Déposez avant de commencer",
    text: "Les financeurs n’acceptent pas les demandes rétroactives : obtenez l’accord de prise en charge avant le premier module, puis conservez vos attestations.",
  },
];

const relatedGuides = [
  {
    href: "/guides/formation-loi-alur-42-heures",
    label: "Formation loi ALUR 42 heures : le cadre complet",
  },
  {
    href: "/guides/formation-loi-alur-prix-comparatif",
    label: "Formation loi ALUR : comparatif des prix",
  },
  {
    href: "/guides/formation-immobilier-en-ligne-vs-presentiel",
    label: "Formation en ligne ou présentiel : que choisir ?",
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

export default function FinancementFormationImmobilierPage() {
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
                    Financement OPCO &amp; CPF
                  </li>
                </ol>
              </nav>

              <div className="mt-9 max-w-4xl">
                <p className="inline-flex rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-brand-gold-pale">
                  Guide financement 2026
                </p>
                <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                  Financer sa formation immobilier&nbsp;: OPCO, CPF et plan de développement
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl">
                  OPCO Commerce pour la branche immobilier, CPF pour les salariés,
                  plan de développement des compétences pour l’employeur&nbsp;: tour
                  d’horizon des dispositifs — et du sésame indispensable, la
                  certification Qualiopi.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#panorama"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gold px-5 py-3.5 text-sm font-black text-brand-navy transition hover:bg-brand-gold-hover"
                  >
                    Comparer les dispositifs
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <a
                    href={OPCO_COMMERCE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    Visiter le site de l’OPCO Commerce
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
                    ["#panorama", "Les dispositifs de financement"],
                    ["#comparatif", "Tableau comparatif"],
                    ["#qualiopi", "Qualiopi, le sésame"],
                    ["#demarches", "Vos démarches en 5 étapes"],
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
              <section id="panorama" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Le paysage
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy sm:text-4xl">
                  Trois grandes portes d’entrée pour financer votre formation
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
                  <p>
                    Les <strong>opérateurs de compétences (OPCO)</strong> ont
                    remplacé les anciens OPCA : ils collectent les contributions
                    formation des entreprises et financent les projets de
                    formation de leurs branches. Pour l’immobilier, l’opérateur
                    de rattachement est{" "}
                    <SourceLink href={OPCO_COMMERCE_URL}>l’OPCO Commerce</SourceLink>.
                  </p>
                  <p>
                    Le <strong>compte personnel de formation (CPF)</strong> est le
                    droit individuel des salariés, géré sur{" "}
                    <SourceLink href={MON_COMPTE_FORMATION_URL}>
                      moncompteformation.gouv.fr
                    </SourceLink>{" "}
                    : il ne finance que les formations éligibles qui y figurent.
                    Enfin, le <strong>plan de développement des compétences</strong>{" "}
                    (ex-plan de formation) reste l’outil de l’employeur pour
                    financer directement les formations de ses équipes.
                  </p>
                </div>

                <div className="mt-7 rounded-2xl border-l-4 border-brand-gold bg-white p-6 shadow-sm">
                  <div className="flex gap-4">
                    <Scale className="mt-1 h-6 w-6 shrink-0 text-brand-gold-dark" aria-hidden />
                    <div>
                      <h3 className="font-black text-brand-navy">
                        Un point commun : Qualiopi
                      </h3>
                      <p className="mt-2 leading-7 text-slate-700">
                        Quel que soit le canal, un organisme de formation ne peut
                        toucher de fonds publics ou mutualisés sans la
                        certification qualité Qualiopi, délivrée par un
                        certificateur accrédité. C’est le premier filtre à
                        appliquer avant tout dossier.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="comparatif" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Comparatif
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  OPCO, CPF, plan de développement&nbsp;: qui fait quoi&nbsp;?
                </h2>
                <div className="mt-7 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <table className="w-full min-w-[820px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-brand-navy text-white">
                        <th scope="col" className="px-5 py-4 font-black">
                          Dispositif
                        </th>
                        <th scope="col" className="px-5 py-4 font-black">
                          Pour qui
                        </th>
                        <th scope="col" className="px-5 py-4 font-black">
                          Principe
                        </th>
                        <th scope="col" className="px-5 py-4 font-black">
                          Point de vigilance
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {fundingRows.map((row) => (
                        <tr key={row.device} className="align-top">
                          <th
                            scope="row"
                            className="bg-slate-50 px-5 py-4 font-black text-brand-navy"
                          >
                            {row.device}
                          </th>
                          <td className="px-5 py-4 leading-6 text-slate-600">
                            {row.audience}
                          </td>
                          <td className="px-5 py-4 leading-6 text-slate-600">
                            {row.principle}
                          </td>
                          <td className="px-5 py-4 leading-6 text-slate-600">
                            {row.caution}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="qualiopi" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Le sésame
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Qualiopi&nbsp;: pourquoi c’est non négociable
                </h2>
                <div className="mt-6 grid gap-6 md:grid-cols-[1.3fr_1fr]">
                  <div className="space-y-5 text-base leading-8 text-slate-700">
                    <p>
                      La <strong>certification Qualiopi</strong> atteste la
                      qualité du processus mis en œuvre par l’organisme de
                      formation. Depuis la loi pour la liberté de choisir son
                      avenir professionnel, elle est{" "}
                      <strong>obligatoire pour bénéficier des fonds publics ou
                      mutualisés</strong> de la formation&nbsp;: OPCO, CPF,
                      dispositifs de l’État ou des régions.
                    </p>
                    <p>
                      Elle est délivrée, par catégorie d’actions, par des{" "}
                      <strong>organismes certificateurs accrédités</strong>. Le
                      certificat a une durée de validité limitée et fait l’objet
                      d’audits de surveillance : exigez toujours un certificat à
                      jour, mentionnant la catégorie «&nbsp;actions de
                      formation&nbsp;».
                    </p>
                    <p className="text-sm leading-7 text-slate-600">
                      En savoir plus&nbsp;:{" "}
                      <SourceLink href={QUALIOPI_URL}>
                        la rubrique Qualiopi du ministère du Travail
                      </SourceLink>
                      .
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <ShieldCheck className="h-8 w-8 text-brand-gold-dark" aria-hidden />
                    <h3 className="mt-5 font-black text-brand-navy">
                      Vérifier un organisme en 3 points
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm text-slate-700">
                      {[
                        "Certificat Qualiopi en cours de validité",
                        "Catégorie « actions de formation » couverte",
                        "Certificateur accrédité mentionné sur le document",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-navy" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 overflow-hidden rounded-2xl bg-brand-navy text-white">
                  <div className="grid gap-0 md:grid-cols-[1fr_1.35fr]">
                    <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-8">
                      <p className="text-4xl font-black text-brand-gold">100 %</p>
                      <p className="mt-2 font-bold">
                        des financements publics ou mutualisés exigent Qualiopi
                      </p>
                    </div>
                    <div className="p-6 md:p-8">
                      <p className="leading-7 text-white/80">
                        Chez MonPassFormation, la certification Qualiopi est en
                        place&nbsp;: votre dossier OPCO ou employeur peut être
                        instruit sans obstacle de conformité, avec un programme
                        détaillé et les justificatifs attendus.
                      </p>
                      <p className="mt-4 text-sm text-white/70">
                        Un doute sur un dossier&nbsp;? Notre équipe vous aide à
                        constituer les pièces demandées par votre financeur.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="demarches" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Méthode pratique
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Vos démarches de financement en 5 étapes
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
                  <Users className="mt-0.5 h-5 w-5 shrink-0 text-brand-navy" aria-hidden />
                  Ne confiez jamais vos identifiants Mon Compte Formation à un
                  tiers&nbsp;: toutes les démarches CPF se font vous-même, sur la
                  plateforme officielle ou l’application dédiée.
                </p>
              </section>

              <section id="faq" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Questions fréquentes
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Financement de la formation immobilier&nbsp;: FAQ
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
                      <SourceLink href={OPCO_COMMERCE_URL}>
                        OPCO Commerce — site officiel
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Opérateur de compétences de la branche immobilier&nbsp;: critères et dispositifs de financement.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={MON_COMPTE_FORMATION_URL}>
                        Mon Compte Formation — plateforme officielle
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Solde de droits, formations éligibles et mobilisation du CPF par le salarié.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={QUALIOPI_URL}>
                        Certification qualité Qualiopi — ministère du Travail
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Référentiel national qualité, certificateurs accrédités et liste des organismes certifiés.
                      </p>
                    </li>
                  </ul>
                  <p className="mt-6 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500">
                    Informations vérifiées le 31 juillet 2026. Les critères de
                    prise en charge évoluent&nbsp;: consultez toujours votre
                    financeur avant d’engager une formation.
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
                      Une formation certifiée Qualiopi, prête pour votre dossier
                    </h2>
                    <p className="mt-3 leading-7 text-white/75">
                      42 h loi ALUR + 3 h TRACFIN, 100&nbsp;% en ligne, programme
                      détaillé et justificatifs complets&nbsp;: de quoi instruire
                      sereinement votre demande de prise en charge.
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
