import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock3,
  Euro,
  ExternalLink,
  Scale,
  Video,
  type LucideIcon,
} from "lucide-react";

const SITE_URL = "https://monpassformation.com";
const PAGE_PATH = "/guides/formation-loi-alur-prix-comparatif";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const COVER_URL = `${SITE_URL}/generated/fal/transaction/cover-immobilier.jpg`;
const LEGIFRANCE_DECREE_URL =
  "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000032080616/";
const QUALIOPI_URL =
  "https://travail-emploi.gouv.fr/formation-professionnelle/acteurs-cadre-et-qualite-de-la-formation-professionnelle/qualiopi";
const CCI_RENEWAL_URL =
  "https://www.cci.fr/ressources/formalites-en-ligne/fichier-des-professionnels-de-limmobilier/renouvellement-de-carte-professionnelle";

const title = "Formation loi ALUR : prix, comparatif et critères de choix 2026";
const description =
  "De 119 € à plus de 600 € : panorama des prix des formations loi ALUR, ce qui justifie les écarts (durée, Qualiopi, suivi, TRACFIN) et comment choisir sans se tromper.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    absolute: title,
  },
  description,
  keywords: [
    "formation loi ALUR prix",
    "prix formation ALUR immobilier",
    "comparatif formation loi ALUR",
    "formation 42 heures immobilier tarif",
    "formation ALUR pas chère",
    "coût formation continue agent immobilier",
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
        alt: "Comparatif des prix des formations loi ALUR",
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
    question: "Pourquoi les prix des formations loi ALUR varient-ils autant ?",
    answer:
      "Parce que les prestations ne sont pas identiques : durée réellement délivrée, présence ou non de visioconférences avec un formateur, suivi pédagogique, supports pratiques, certification Qualiopi, inclusion de modules complémentaires comme TRACFIN. Le prix affiché ne dit rien, seul, de ce qui est réellement fourni.",
  },
  {
    question: "Une formation à 119 € suffit-elle pour renouveler ma carte ?",
    answer:
      "Elle le peut si elle respecte le cadre du décret : 42 heures réelles, contenus en lien direct avec votre activité, 4 heures de déontologie dont 2 heures de non-discrimination, et attestation complète. Le risque des offres très low-cost : des durées annoncées supérieures à la réalité ou un contenu générique. Vérifiez le programme détaillé avant d’acheter.",
  },
  {
    question: "La certification Qualiopi fait-elle monter le prix ?",
    answer:
      "Obtenir et conserver Qualiopi représente un coût réel pour l’organisme (audits, processus qualité), ce qui peut se répercuter sur le tarif. En contrepartie, elle est indispensable si vous visez un financement OPCO, CPF ou employeur via des fonds mutualisés — et c’est un signal de sérieux global.",
  },
  {
    question: "TRACFIN est-elle une formation séparée à payer en plus ?",
    answer:
      "Cela dépend des organismes : certains vendent le module anti-blanchiment séparément, d’autres l’intègrent. Chez MonPassFormation, les 3 heures TRACFIN sont incluses dans le parcours à 299 €, ce qui porte le total à 45 heures de formation sans surcoût.",
  },
  {
    question: "Le présentiel est-il toujours plus cher que l’e-learning ?",
    answer:
      "En général oui, car il implique salle, formateur dédié et logistique. Les présentiels constatés se situent souvent au-dessus de 400 €, quand l’e-learning démarre autour de 119 €. Un format en ligne enrichi de visioconférences se situe entre les deux.",
  },
  {
    question: "Comment comparer deux offres au même prix ?",
    answer:
      "Demandez à chacun : le programme heure par heure, le nombre de visioconférences, les modalités de suivi, la preuve Qualiopi, un exemple d’attestation et les mentions exactes qui y figureront. L’organisme qui répond précisément est presque toujours le plus fiable.",
  },
  {
    question: "Puis-je me faire rembourser si la formation ne convient pas ?",
    answer:
      "Les conditions dépendent du contrat de formation et de la nature de l’acheteur (professionnel ou consommateur). Lisez les conditions générales avant l’achat, notamment les clauses d’annulation et les délais éventuels de rétractation applicables à votre situation.",
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
          name: "Prix de la formation continue immobilière",
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
          item: `${SITE_URL}/guides`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Formation loi ALUR : prix et comparatif",
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
    icon: Euro,
    value: "119–600 €+",
    label: "sur le marché",
    detail: "Fourchette observée selon le format et le niveau de prestation.",
  },
  {
    icon: Clock3,
    value: "42 h",
    label: "minimum réglementaire",
    detail: "Sur trois ans, quelle que soit l’offre choisie.",
  },
  {
    icon: Video,
    value: "299 €",
    label: "chez MonPassFormation",
    detail: "Socle 42 h + TRACFIN 3 h, soit 45 h avec visioconférences incluses.",
  },
];

const priceRows = [
  {
    range: "119 € à ~189 €",
    format: "E-learning d’entrée de gamme",
    content:
      "Modules en ligne auto-rythmés, QCM, peu ou pas d’interaction humaine, suivi minimal.",
    watch:
      "Vérifiez la durée réelle des modules et l’attestation : c’est sur ce segment que les promesses de « 42 h » sont les plus optimistes.",
  },
  {
    range: "~250 € à ~400 €",
    format: "E-learning accompagné",
    content:
      "Parcours en ligne enrichi : visioconférences en direct, supports pratiques, suivi pédagogique, certification Qualiopi.",
    watch:
      "Le meilleur rapport contenu/prix pour la plupart des professionnels autonomes ; comparez le nombre d’heures de direct.",
  },
  {
    range: "~400 € à 600 € et plus",
    format: "Présentiel ou formats premium",
    content:
      "Sessions en salle, formateur dédié, échanges de groupe, parfois repas et supports papier inclus.",
    watch:
      "Pertinent si vous avez besoin d’un cadre collectif ; ajoutez les frais de déplacement et le temps d’absence au coût réel.",
  },
];

const gapFactors = [
  {
    title: "La durée réellement délivrée",
    text: "Une offre « 42 h » dont les modules totalisent 20 h de contenu ne vaut pas 42 h. Exigez le détail heure par heure : c’est la première explication des écarts de prix.",
  },
  {
    title: "La certification Qualiopi",
    text: "Audits, processus qualité, amélioration continue : la certification a un coût, mais elle conditionne l’accès aux financements publics ou mutualisés et atteste un fonctionnement sérieux.",
  },
  {
    title: "Le suivi humain",
    text: "Visioconférences avec un formateur, réponses aux questions, accompagnement au dossier : l’humain coûte plus cher qu’une plateforme 100 % automatisée, et change l’expérience.",
  },
  {
    title: "TRACFIN et modules inclus",
    text: "Certains organismes facturent l’anti-blanchiment en option. Une offre qui inclut les 3 h TRACFIN dans le prix affiché est mécaniquement plus compétitive à prestation égale.",
  },
  {
    title: "Les supports pratiques",
    text: "Modèles de documents, fiches de synthèse, cas concrets d’agence : des supports exploitables au quotidien demandent un vrai travail de conception, répercuté dans le tarif.",
  },
  {
    title: "La preuve fournie à la CCI",
    text: "Attestation complète (objectifs, contenu, durée, date) et traçabilité de la progression : une paperasse réglementaire rigoureuse évite les mauvaises surprises au renouvellement.",
  },
];

const planningSteps = [
  {
    title: "Fixez votre budget total",
    text: "Incluez déplacements éventuels et temps d’absence : un présentiel à 450 € peut coûter plus cher qu’il n’y paraît.",
  },
  {
    title: "Listez vos exigences non négociables",
    text: "Qualiopi pour un financement, visioconférences pour l’interaction, TRACFIN inclus pour éviter une seconde inscription.",
  },
  {
    title: "Demandez le programme détaillé",
    text: "Heure par heure, module par module. Comparez-le aux domaines prévus par le décret et aux 4 h de déontologie obligatoires.",
  },
  {
    title: "Vérifiez Qualiopi et l’attestation type",
    text: "Certificat en cours de validité d’un côté, mentions réglementaires de l’attestation de l’autre : les deux doivent être vérifiables avant l’achat.",
  },
  {
    title: "Lisez les conditions avant de payer",
    text: "Annulation, report, accès à la plateforme, délivrance de l’attestation : tout doit être écrit dans le contrat ou les conditions générales.",
  },
];

const relatedGuides = [
  {
    href: "/guides/formation-loi-alur-42-heures",
    label: "Formation loi ALUR 42 heures : le cadre complet",
  },
  {
    href: "/guides/financement-formation-immobilier-opco-cpf",
    label: "Financer sa formation immobilier (OPCO, CPF)",
  },
  {
    href: "/guides/formation-immobilier-en-ligne-vs-presentiel",
    label: "Formation en ligne ou présentiel : que choisir ?",
  },
  {
    href: "/guides/tracfin-obligations-agent-immobilier",
    label: "TRACFIN : les obligations de l’agent immobilier",
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

export default function FormationLoiAlurPrixComparatifPage() {
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
                    Prix des formations ALUR
                  </li>
                </ol>
              </nav>

              <div className="mt-9 max-w-4xl">
                <p className="inline-flex rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-brand-gold-pale">
                  Comparatif prix 2026
                </p>
                <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                  Formation loi ALUR&nbsp;: les prix du marché passés au crible
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl">
                  De 119&nbsp;€ à plus de 600&nbsp;€ pour une même obligation de
                  42 heures&nbsp;? Voici ce qui justifie — ou non — l’écart, et la
                  méthode pour choisir sans se tromper.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#panorama"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gold px-5 py-3.5 text-sm font-black text-brand-navy transition hover:bg-brand-gold-hover"
                  >
                    Voir les fourchettes de prix
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
                    ["#panorama", "Panorama des prix"],
                    ["#justifie", "Ce qui justifie l’écart"],
                    ["#monpass", "L’offre MonPassFormation"],
                    ["#choisir", "Choisir sans se tromper"],
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
                  Le marché
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy sm:text-4xl">
                  Panorama des prix constatés en 2026
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
                  <p>
                    Pour une même obligation —{" "}
                    <strong>42 heures sur trois ans</strong>, fixée par le{" "}
                    <SourceLink href={LEGIFRANCE_DECREE_URL}>
                      décret n°&nbsp;2016-173
                    </SourceLink>{" "}
                    —, les tarifs affichés s’échelonnent d’environ{" "}
                    <strong>119&nbsp;€ à plus de 600&nbsp;€</strong>. L’écart ne
                    s’explique pas par le prestige, mais par le format et le
                    niveau de prestation réellement fourni.
                  </p>
                </div>
                <div className="mt-7 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <table className="w-full min-w-[820px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-brand-navy text-white">
                        <th scope="col" className="px-5 py-4 font-black">
                          Fourchette constatée
                        </th>
                        <th scope="col" className="px-5 py-4 font-black">
                          Format typique
                        </th>
                        <th scope="col" className="px-5 py-4 font-black">
                          Ce que comprend le prix
                        </th>
                        <th scope="col" className="px-5 py-4 font-black">
                          Point de vigilance
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {priceRows.map((row) => (
                        <tr key={row.range} className="align-top">
                          <th
                            scope="row"
                            className="bg-slate-50 px-5 py-4 font-black text-brand-navy"
                          >
                            {row.range}
                          </th>
                          <td className="px-5 py-4 leading-6 text-slate-600">
                            {row.format}
                          </td>
                          <td className="px-5 py-4 leading-6 text-slate-600">
                            {row.content}
                          </td>
                          <td className="px-5 py-4 leading-6 text-slate-600">
                            {row.watch}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-xs leading-5 text-slate-500">
                  Fourchettes indicatives établies à partir des tarifs publics du
                  marché au 31 juillet 2026. Nous ne citons volontairement aucun
                  concurrent&nbsp;: comparez les prestations, pas les logos.
                </p>
              </section>

              <section id="justifie" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Analyse
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Ce qui justifie réellement l’écart de prix
                </h2>
                <div className="mt-7 grid gap-4 md:grid-cols-2">
                  {gapFactors.map((factor, index) => (
                    <div
                      key={factor.title}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-sm font-black text-white">
                        {index + 1}
                      </span>
                      <h3 className="mt-5 text-lg font-black text-brand-navy">
                        {factor.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {factor.text}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-7 rounded-2xl border-l-4 border-brand-gold bg-white p-6 shadow-sm">
                  <div className="flex gap-4">
                    <Scale className="mt-1 h-6 w-6 shrink-0 text-brand-gold-dark" aria-hidden />
                    <div>
                      <h3 className="font-black text-brand-navy">
                        La règle d’or du comparatif
                      </h3>
                      <p className="mt-2 leading-7 text-slate-700">
                        Ramenez chaque offre au <strong>prix par heure réellement
                        délivrée</strong>, en vérifiant ce qui est inclus&nbsp;:
                        TRACFIN, visioconférences, supports, suivi. C’est le seul
                        ratio qui met tout le monde sur un pied d’égalité.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="monpass" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Transparence
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Ce que comprend l’offre MonPassFormation à 299&nbsp;€
                </h2>
                <div className="mt-8 overflow-hidden rounded-2xl bg-brand-navy text-white">
                  <div className="grid gap-0 md:grid-cols-[1fr_1.35fr]">
                    <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-8">
                      <p className="text-4xl font-black text-brand-gold">45 h</p>
                      <p className="mt-2 font-bold">
                        soit 42 h loi ALUR + 3 h TRACFIN incluses
                      </p>
                    </div>
                    <div className="p-6 md:p-8">
                      <p className="leading-7 text-white/80">
                        100&nbsp;% en ligne, certifié Qualiopi, avec{" "}
                        <strong className="text-white">visioconférences en direct</strong>,{" "}
                        <strong className="text-white">QCM</strong>,{" "}
                        <strong className="text-white">supports pratiques</strong>{" "}
                        et attestation complète à la clé — le tout pour{" "}
                        <strong className="text-white">299&nbsp;€</strong>, sans
                        module à ajouter ensuite.
                      </p>
                      <p className="mt-4 text-sm text-white/70">
                        Positionnement&nbsp;: le segment «&nbsp;e-learning
                        accompagné&nbsp;», au prix le plus contenu possible pour
                        ce niveau de prestation.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="choisir" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Méthode pratique
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Choisir sans se tromper&nbsp;: la méthode en 5 étapes
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
                      Un financement est envisageable&nbsp;?
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      OPCO, CPF, plan de développement&nbsp;: notre guide détaille
                      les dispositifs et le rôle central de Qualiopi.
                    </p>
                  </div>
                  <Link
                    href="/guides/financement-formation-immobilier-opco-cpf"
                    className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-navy px-4 py-3 text-sm font-black text-white transition hover:bg-brand-navy-mid"
                  >
                    Guide du financement
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </section>

              <section id="faq" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Questions fréquentes
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Prix de la formation loi ALUR&nbsp;: FAQ
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
                        Durée obligatoire, domaines recevables et justificatifs de la formation continue.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={QUALIOPI_URL}>
                        Certification qualité Qualiopi — ministère du Travail
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Référentiel national qualité et condition d’accès aux fonds publics ou mutualisés.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={CCI_RENEWAL_URL}>
                        Renouvellement de carte professionnelle — CCI France
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Conditions et calendrier de la formalité adossée à la formation continue.
                      </p>
                    </li>
                  </ul>
                  <p className="mt-6 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500">
                    Informations vérifiées le 31 juillet 2026. Les fourchettes de
                    prix sont indicatives et évoluent&nbsp;: demandez toujours un
                    devis détaillé avant de comparer.
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
                      45 heures de formation pour 299&nbsp;€, tout inclus
                    </h2>
                    <p className="mt-3 leading-7 text-white/75">
                      Socle 42 h loi ALUR, TRACFIN 3 h, visioconférences, QCM,
                      supports pratiques et attestation&nbsp;: un seul prix, pas
                      d’option cachée.
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
