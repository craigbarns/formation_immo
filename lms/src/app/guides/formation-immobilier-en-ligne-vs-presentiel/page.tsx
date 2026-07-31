import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Monitor,
  Scale,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

const SITE_URL = "https://monpassformation.com";
const PAGE_PATH = "/guides/formation-immobilier-en-ligne-vs-presentiel";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const COVER_URL = `${SITE_URL}/generated/fal/transaction/cover-immobilier.jpg`;
const LEGIFRANCE_DECREE_URL =
  "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000032080616/";
const LEGIFRANCE_ETHICS_URL =
  "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000042427805";
const CCI_RENEWAL_URL =
  "https://www.cci.fr/ressources/formalites-en-ligne/fichier-des-professionnels-de-limmobilier/renouvellement-de-carte-professionnelle";

const title = "Formation immobilier en ligne ou présentiel : comparatif 2026";
const description =
  "Flexibilité, coût, interaction et reconnaissance CCI : comparez honnêtement la formation immobilier en ligne et le présentiel pour choisir le format adapté à votre situation.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    absolute: title,
  },
  description,
  keywords: [
    "formation immobilier en ligne ou présentiel",
    "formation immobilier en ligne",
    "formation immobilier présentiel",
    "formation loi ALUR à distance",
    "e-learning immobilier",
    "formation agent immobilier à distance",
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
        alt: "Comparatif formation immobilier en ligne et en présentiel",
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
    question: "La formation en ligne est-elle reconnue par la CCI ?",
    answer:
      "Le décret n° 2016-173 définit les personnes concernées, la durée, les domaines recevables et les justificatifs, sans réserver la formation continue au présentiel. Ce qui compte pour la CCI : le contenu en lien direct avec l’activité, la durée réellement accomplie et une attestation mentionnant objectifs, contenu, durée et date de réalisation.",
  },
  {
    question: "Puis-je suivre mes 42 heures entièrement à distance ?",
    answer:
      "Oui, à condition que les activités choisies respectent le cadre du décret : thèmes admis, lien direct avec votre activité et 4 heures de déontologie dont 2 heures de non-discrimination sur le cycle de trois ans. Beaucoup de professionnels réalisent aujourd’hui l’intégralité de leur cycle en ligne.",
  },
  {
    question: "Le présentiel est-il plus efficace que l’e-learning ?",
    answer:
      "Pas nécessairement. Le présentiel favorise les échanges directs et impose un rythme, tandis que l’e-learning bien conçu — visioconférences, QCM, supports pratiques — permet de progresser à son rythme et de réviser autant que nécessaire. L’efficacité dépend surtout de la qualité pédagogique et de votre implication.",
  },
  {
    question: "Les QCM en ligne ont-ils une valeur pour le justificatif ?",
    answer:
      "Le QCM sert à valider l’assimilation des contenus et à tracer votre progression. Le justificatif opposable reste l’attestation délivrée par l’organisme, qui doit mentionner les objectifs, le contenu, la durée et la date de réalisation de l’activité de formation.",
  },
  {
    question: "Comment vérifier la durée réelle d’une formation en ligne ?",
    answer:
      "Exigez un programme détaillé indiquant la durée de chaque module et contrôlez que l’attestation finale mentionne une durée cohérente avec ce qui a été réellement suivi. Une plateforme sérieuse horodate votre progression et ne délivre l’attestation qu’après validation complète du parcours.",
  },
  {
    question: "Les visioconférences sont-elles du présentiel ou de la distance ?",
    answer:
      "Il s’agit de formation à distance synchrone : vous échangez en direct avec un formateur, sans vous déplacer. Ce format combine l’interaction du présentiel et la flexibilité de l’e-learning, et il est de plus en plus utilisé pour la formation continue immobilière.",
  },
  {
    question: "Quel format choisir si je prépare un renouvellement de carte urgent ?",
    answer:
      "Le format en ligne est généralement le plus rapide à démarrer : inscription immédiate, accès permanent et attestation délivrée dès la fin du parcours. Vérifiez néanmoins que vos heures couvrent bien la période exigée — la carte professionnelle est valable trois ans — et les 4 heures de déontologie avant de déposer votre demande auprès de la CCI.",
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
          name: "Formation à distance et présentiel",
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
          name: "Formation immobilier en ligne ou présentiel",
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
    icon: Monitor,
    value: "100 %",
    label: "à distance possible",
    detail: "Le cycle complet peut être suivi en ligne, sans déplacement.",
  },
  {
    icon: Clock3,
    value: "42 h",
    label: "sur trois ans",
    detail: "L’obligation de durée est identique quel que soit le format choisi.",
  },
  {
    icon: ShieldCheck,
    value: "Même",
    label: "validité CCI",
    detail: "Les justificatifs exigés sont les mêmes en ligne et en présentiel.",
  },
];

const comparisonRows = [
  {
    criterion: "Flexibilité des horaires",
    online:
      "Totale : vous suivez les modules quand vous voulez, y compris le soir et le week-end.",
    classroom:
      "Limitée : les sessions sont fixées à dates et horaires imposés.",
  },
  {
    criterion: "Coût global",
    online:
      "Généralement plus faible : pas de salle ni de frais de déplacement ou d’hébergement.",
    classroom:
      "Souvent plus élevé : location de salle, formateur sur place, trajets et temps d’absence.",
  },
  {
    criterion: "Interaction et échanges",
    online:
      "Visioconférences, messagerie et entraide entre apprenants ; échanges différés possibles.",
    classroom:
      "Échanges spontanés en salle, mise en réseau directe avec les autres participants.",
  },
  {
    criterion: "Rythme de progression",
    online:
      "Auto-rythmé : idéal pour les profils autonomes, exige une bonne organisation.",
    classroom:
      "Rythme imposé par le groupe : cadre rassurant mais peu adaptable.",
  },
  {
    criterion: "Supports et mises à jour",
    online:
      "Supports numériques actualisés en continu, accessibles à tout moment sur la plateforme.",
    classroom:
      "Supports remis en session ; mises à jour plus difficiles après la formation.",
  },
  {
    criterion: "Organisation pratique",
    online:
      "Aucune contrainte géographique : compatible avec une activité d’agence soutenue.",
    classroom:
      "Déplacements et demi-journées ou journées bloquées à prévoir.",
  },
  {
    criterion: "Reconnaissance CCI",
    online:
      "Mêmes exigences : contenu lié à l’activité, durée réelle, attestation complète.",
    classroom:
      "Mêmes exigences : le présentiel n’apporte aucune validité supplémentaire.",
  },
];

const profiles = [
  {
    title: "Le format en ligne est fait pour vous si…",
    items: [
      "Votre agenda d’agent ou de négociateur change chaque semaine",
      "Vous êtes autonome et aimez progresser à votre rythme",
      "Vous voulez limiter le coût et les déplacements",
      "Vous devez boucler vos heures avant une échéance proche",
    ],
  },
  {
    title: "Le présentiel est fait pour vous si…",
    items: [
      "Vous apprenez mieux en groupe, avec un formateur en face de vous",
      "Vous avez besoin d’un cadre imposé pour ne pas procrastiner",
      "Vous cherchez à développer votre réseau local de professionnels",
      "Vous pouvez bloquer des journées entières sans impacter l’agence",
    ],
  },
];

const planningSteps = [
  {
    title: "Vérifiez d’abord votre besoin réel",
    text: "Comptez les heures déjà réalisées sur le cycle de trois ans, y compris les 2 h de non-discrimination et les 2 h de déontologie obligatoires.",
  },
  {
    title: "Comparez le contenu, pas seulement le prix",
    text: "Le programme doit couvrir les domaines prévus par le décret et avoir un lien direct avec l’activité que vous exercez réellement.",
  },
  {
    title: "Exigez la preuve de la durée",
    text: "Programme détaillé, suivi de progression horodaté et attestation mentionnant objectifs, contenu, durée et date de réalisation.",
  },
  {
    title: "Testez votre autodiscipline",
    text: "Si vous savez que vous abandonnez les formations sans rendez-vous, préférez un parcours en ligne avec visioconférences planifiées ou une session en présentiel.",
  },
  {
    title: "Anticipez la formalité CCI",
    text: "La demande de renouvellement se présente dans les deux mois précédant l’expiration de la carte : choisissez un format compatible avec ce calendrier.",
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
    href: "/guides/financement-formation-immobilier-opco-cpf",
    label: "Financer sa formation immobilier (OPCO, CPF)",
  },
  {
    href: "/guides/renouvellement-carte-professionnelle-immobilier",
    label: "Renouvellement de la carte professionnelle",
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

export default function FormationImmobilierEnLigneVsPresentielPage() {
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
                    En ligne ou présentiel
                  </li>
                </ol>
              </nav>

              <div className="mt-9 max-w-4xl">
                <p className="inline-flex rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-brand-gold-pale">
                  Comparatif 2026
                </p>
                <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                  Formation immobilier en ligne ou présentiel&nbsp;: le comparatif honnête
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl">
                  Flexibilité, coût, interaction, reconnaissance par la CCI&nbsp;:
                  les deux formats se valent juridiquement, mais ne conviennent
                  pas aux mêmes profils. Voici comment trancher sans idée reçue.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#comparatif"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gold px-5 py-3.5 text-sm font-black text-brand-navy transition hover:bg-brand-gold-hover"
                  >
                    Voir le tableau comparatif
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
                    ["#comprendre", "Deux formats, une obligation"],
                    ["#comparatif", "Tableau comparatif"],
                    ["#pour-qui", "Pour qui chaque format"],
                    ["#reconnaissance", "Reconnaissance CCI"],
                    ["#choisir", "Bien choisir en 5 étapes"],
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
              <section id="comprendre" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Le cadre
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy sm:text-4xl">
                  Deux formats, une seule et même obligation
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
                  <p>
                    La formation continue des professionnels de l’immobilier
                    repose sur le{" "}
                    <SourceLink href={LEGIFRANCE_DECREE_URL}>
                      décret n°&nbsp;2016-173 du 18 février 2016
                    </SourceLink>{" "}
                    : <strong>14 heures par an</strong> ou{" "}
                    <strong>42 heures au cours de trois années consécutives d’exercice</strong>,
                    dont 2 heures de non-discrimination à l’accès au logement et
                    2 heures de déontologie par cycle.
                  </p>
                  <p>
                    Le texte encadre le <strong>contenu</strong>, la{" "}
                    <strong>durée</strong> et les <strong>justificatifs</strong> —
                    il n’impose pas de modalité physique de présence. En ligne ou
                    en salle, l’obligation est donc identique et la valeur du
                    justificatif est la même devant la CCI.
                  </p>
                </div>

                <div className="mt-7 rounded-2xl border-l-4 border-brand-gold bg-white p-6 shadow-sm">
                  <div className="flex gap-4">
                    <Scale className="mt-1 h-6 w-6 shrink-0 text-brand-gold-dark" aria-hidden />
                    <div>
                      <h3 className="font-black text-brand-navy">
                        Ce qui fait la validité, ce n’est pas le format
                      </h3>
                      <p className="mt-2 leading-7 text-slate-700">
                        Une formation «&nbsp;compte&nbsp;» si son contenu est en
                        lien direct avec votre activité, si sa durée est réelle
                        et si l’attestation mentionne les objectifs, le contenu,
                        la durée et la date de réalisation. Le reste est une
                        question de préférence pédagogique.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="comparatif" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Comparatif détaillé
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  En ligne vs présentiel&nbsp;: 7 critères passés au crible
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700">
                  Chaque critère est présenté sans parti pris&nbsp;: le «&nbsp;meilleur&nbsp;»
                  format dépend de votre contrainte principale — temps, budget,
                  besoin d’échange ou échéance.
                </p>
                <div className="mt-7 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-brand-navy text-white">
                        <th scope="col" className="px-5 py-4 font-black">
                          Critère
                        </th>
                        <th scope="col" className="px-5 py-4 font-black">
                          Formation en ligne
                        </th>
                        <th scope="col" className="px-5 py-4 font-black">
                          Formation en présentiel
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {comparisonRows.map((row) => (
                        <tr key={row.criterion} className="align-top">
                          <th
                            scope="row"
                            className="bg-slate-50 px-5 py-4 font-black text-brand-navy"
                          >
                            {row.criterion}
                          </th>
                          <td className="px-5 py-4 leading-6 text-slate-600">
                            {row.online}
                          </td>
                          <td className="px-5 py-4 leading-6 text-slate-600">
                            {row.classroom}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="pour-qui" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Profils
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Pour qui chaque format&nbsp;?
                </h2>
                <div className="mt-7 grid gap-4 md:grid-cols-2">
                  {profiles.map((profile) => (
                    <div
                      key={profile.title}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      <h3 className="text-lg font-black text-brand-navy">
                        {profile.title}
                      </h3>
                      <ul className="mt-4 space-y-3">
                        {profile.items.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-sm leading-6 text-slate-600"
                          >
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold-dark" aria-hidden />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <p className="mt-5 flex gap-3 rounded-xl bg-brand-navy/5 p-4 text-sm leading-6 text-slate-700">
                  <Users className="mt-0.5 h-5 w-5 shrink-0 text-brand-navy" aria-hidden />
                  Hésitant&nbsp;? Les parcours hybrides — e-learning auto-rythmé
                  complété par des visioconférences en direct — offrent un bon
                  compromis entre souplesse et interaction humaine.
                </p>
              </section>

              <section id="reconnaissance" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Validité administrative
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Reconnaissance CCI&nbsp;: les mêmes règles pour tous
                </h2>
                <div className="mt-6 grid gap-6 md:grid-cols-[1.3fr_1fr]">
                  <div className="space-y-5 text-base leading-8 text-slate-700">
                    <p>
                      Au moment du renouvellement de la carte professionnelle —
                      valable <strong>trois ans</strong> —, la CCI examine vos
                      justificatifs de formation continue. Elle applique le même
                      référentiel à tous les formats&nbsp;: durée accomplie,
                      contenu en lien direct avec l’activité, mentions
                      réglementaires sur l’attestation.
                    </p>
                    <p>
                      La demande de renouvellement se présente dans les{" "}
                      <strong>deux mois précédant l’expiration</strong> de la
                      carte. Une formation en ligne terminée tôt dans le cycle
                      vaut exactement autant qu’une session en salle de dernière
                      minute.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <ShieldCheck className="h-8 w-8 text-brand-gold-dark" aria-hidden />
                    <h3 className="mt-5 font-black text-brand-navy">
                      Votre checklist validité
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm text-slate-700">
                      {[
                        "42 h sur trois ans (ou 14 h/an)",
                        "4 h de déontologie dont 2 h de non-discrimination",
                        "Attestation : objectifs, contenu, durée, date",
                        "Dépôt CCI dans les 2 mois avant expiration",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-navy" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section id="choisir" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Méthode pratique
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Bien choisir son format en 5 étapes
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
                      Le budget est votre critère décisif&nbsp;?
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      Notre comparatif des prix du marché détaille les
                      fourchettes par format et ce qui les justifie.
                    </p>
                  </div>
                  <Link
                    href="/guides/formation-loi-alur-prix-comparatif"
                    className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-navy px-4 py-3 text-sm font-black text-white transition hover:bg-brand-navy-mid"
                  >
                    Comparatif des prix
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </section>

              <section id="faq" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Questions fréquentes
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  En ligne ou présentiel&nbsp;: FAQ
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
                        Personnes concernées, durée, activités recevables et justificatifs.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={LEGIFRANCE_ETHICS_URL}>
                        Décret n°&nbsp;2020-1259 du 14 octobre 2020 — Légifrance
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Intégration de la non-discrimination à l’accès au logement.
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
                      Une formation 100&nbsp;% en ligne, avec de vrais échanges
                    </h2>
                    <p className="mt-3 leading-7 text-white/75">
                      Le parcours MonPassFormation combine modules auto-rythmés,
                      visioconférences en direct, QCM et supports pratiques — 42 h
                      loi ALUR + 3 h TRACFIN, avec attestation à la clé.
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
