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
  FileCheck2,
  Scale,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

const SITE_URL = "https://monpassformation.com";
const PAGE_PATH = "/guides/tracfin-obligations-agent-immobilier";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const COVER_URL = `${SITE_URL}/generated/fal/transaction/cover-immobilier.jpg`;
const CMF_CODE_URL =
  "https://www.legifrance.gouv.fr/codes/id/LEGITEXT000006072026/";
const TRACFIN_MISSIONS_URL =
  "https://www.economie.gouv.fr/tracfin/comprendre-tracfin/les-missions-lorganisation-et-les-pouvoirs-de-tracfin";
const TRACFIN_HOME_URL = "https://www.economie.gouv.fr/tracfin";

const title = "TRACFIN : les obligations de l’agent immobilier (guide 2026)";
const description =
  "Vigilance KYC, déclaration de soupçon à TRACFIN, conservation des documents, registre et formation du personnel : le guide des obligations LCB-FT des agents immobiliers.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    absolute: title,
  },
  description,
  keywords: [
    "tracfin agent immobilier obligations",
    "déclaration de soupçon TRACFIN",
    "LCB-FT immobilier",
    "lutte contre le blanchiment agent immobilier",
    "vigilance KYC immobilier",
    "formation TRACFIN immobilier",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  category: "Conformité des professionnels de l’immobilier",
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
        alt: "Obligations TRACFIN et LCB-FT des agents immobiliers",
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
    question: "Un agent immobilier est-il vraiment assujetti à TRACFIN ?",
    answer:
      "Oui. L’article L. 561-2 du code monétaire et financier vise expressément les personnes qui se livrent aux activités immobilières mentionnées à l’article 1er de la loi n° 70-9 du 2 janvier 1970. Les agents immobiliers appliquent donc les obligations de vigilance, de déclaration de soupçon et de conservation prévues par le dispositif LCB-FT.",
  },
  {
    question: "Qu’est-ce qu’une déclaration de soupçon à TRACFIN ?",
    answer:
      "C’est la transmission à TRACFIN, la cellule de renseignement financier de Bercy, de tout fait ou soupçon concernant des sommes ou une opération susceptibles de provenir d’une infraction passible de la peine du blanchiment, ou liées au financement du terrorisme. Elle s’effectue en pratique via la téléprocédure sécurisée de TRACFIN.",
  },
  {
    question: "Peut-on informer le client qu’une déclaration a été faite ?",
    answer:
      "Non. Le professionnel ne doit pas révéler au client ni à des tiers l’existence d’une déclaration de soupçon ni les suites qui lui sont réservées. Cette interdiction de révélation protège l’efficacité des analyses menées par TRACFIN.",
  },
  {
    question: "Quels documents conserver et pendant combien de temps ?",
    answer:
      "Les documents et informations relatifs à l’identité des clients et aux opérations réalisées doivent être conservés pendant cinq ans à compter de la fin de la relation d’affaires ou de la réalisation de l’opération, afin de pouvoir répondre à toute demande de l’autorité de contrôle ou de TRACFIN.",
  },
  {
    question: "La formation du personnel à la LCB-FT est-elle obligatoire ?",
    answer:
      "Oui. Le dispositif interne imposé aux assujettis comprend l’information et la formation des salariés susceptibles d’être exposés aux risques de blanchiment et de financement du terrorisme. La formation doit être adaptée aux fonctions exercées et actualisée.",
  },
  {
    question: "TRACFIN peut-il sanctionner directement un agent immobilier ?",
    answer:
      "Non. TRACFIN est une cellule de renseignement financier placée auprès du ministère de l’Économie : elle recueille, analyse et enrichit les déclarations, puis transmet le résultat de ses investigations à l’autorité judiciaire ou aux administrations compétentes. Les sanctions relèvent des autorités de contrôle et des juridictions.",
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
          name: "Lutte contre le blanchiment de capitaux et le financement du terrorisme",
        },
        {
          "@type": "Thing",
          name: "TRACFIN",
        },
        {
          "@type": "Thing",
          name: "Agent immobilier",
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
          name: "Obligations TRACFIN de l’agent immobilier",
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
    value: "L. 561-1",
    label: "et suivants du CMF",
    detail: "Le socle des obligations de vigilance, inscrit dans le code monétaire et financier.",
  },
  {
    icon: Clock3,
    value: "5 ans",
    label: "de conservation",
    detail: "Durée de conservation des documents sur la clientèle et les opérations.",
  },
  {
    icon: ShieldCheck,
    value: "DS",
    label: "déclaration de soupçon",
    detail: "Tout soupçon d’opération liée au blanchiment ou au financement du terrorisme est déclaré à TRACFIN.",
  },
];

const audiences = [
  {
    title: "Titulaires de la carte professionnelle",
    text: "Les personnes physiques et morales qui se livrent aux opérations d’achat, de vente, d’échange ou de location d’immeubles et de fonds de commerce sont assujetties au dispositif LCB-FT.",
  },
  {
    title: "Salariés et collaborateurs",
    text: "Le dispositif interne engage l’ensemble du personnel exposé : négociateurs, assistants, gestionnaires. Chacun doit connaître les mesures de vigilance et la marche à suivre en cas de soupçon.",
  },
  {
    title: "Déclarant et correspondant TRACFIN",
    text: "Une personne doit être désignée pour centraliser les soupçons internes, rédiger les déclarations et servir d’interlocuteur de la cellule de renseignement financier.",
  },
];

const vigilanceMeasures = [
  "Identifier le client et vérifier son identité sur présentation d’un document probant",
  "Identifier le bénéficiaire effectif de l’opération lorsque le client est une personne morale",
  "Comprendre l’objet et la nature de la relation d’affaires et recueillir les informations utiles",
  "Appliquer un examen renforcé lorsque le risque l’exige : montants atypiques, pays à risque, personnes politiquement exposées",
  "Suivre la relation d’affaires dans la durée et examiner la cohérence des opérations",
  "Conserver les documents et informations recueillis pendant cinq ans",
];

const planningSteps = [
  {
    title: "Évaluer les risques de votre agence",
    text: "Cartographiez les risques de blanchiment et de financement du terrorisme propres à votre clientèle, à vos zones d’activité et aux types d’opérations traités. Cette classification fonde toutes les autres mesures.",
  },
  {
    title: "Formaliser des procédures écrites",
    text: "Rédigez les procédures de vigilance à l’entrée en relation, de contrôle des opérations et de traitement des soupçons, en les adaptant à la taille et à l’organisation de votre structure.",
  },
  {
    title: "Désigner un déclarant et correspondant TRACFIN",
    text: "Choisissez la personne responsable des déclarations de soupçon et des échanges avec TRACFIN, et prévoyez un suppléant pour assurer la continuité du dispositif.",
  },
  {
    title: "Former régulièrement le personnel",
    text: "Organisez des sessions de formation adaptées aux fonctions : repérage des signaux d’alerte, vérification d’identité, conduite à tenir face à une opération atypique.",
  },
  {
    title: "Tracer et contrôler le dispositif",
    text: "Tenez à jour le registre interne, archivez les justificatifs cinq ans et vérifiez périodiquement que les procédures sont bien appliquées par les équipes.",
  },
];


const relatedLinks = [
  {
    href: "/formation-tracfin-immobilier",
    label: "Formation TRACFIN immobilier (3 h)",
    detail: "Le module spécialisé pour sécuriser votre conformité LCB-FT.",
  },
  {
    href: "/guides/loi-hoguet-guide-complet",
    label: "Loi Hoguet : le guide complet",
    detail: "Le socle juridique du métier d’agent immobilier.",
  },
  {
    href: "/guides/formation-loi-alur-42-heures",
    label: "Formation loi ALUR 42 heures",
    detail: "L’obligation de formation continue des professionnels.",
  },
  {
    href: "/formation-deontologie-immobilier",
    label: "Formation déontologie immobilier",
    detail: "Les règles déontologiques applicables à la profession.",
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

export default function TracfinObligationsAgentImmobilierPage() {
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
              href="/formation-tracfin-immobilier"
              className="rounded-xl bg-brand-navy px-4 py-2.5 text-sm font-black text-white transition hover:bg-brand-navy-mid"
            >
              Voir la formation TRACFIN
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
                    Obligations TRACFIN
                  </li>
                </ol>
              </nav>

              <div className="mt-9 max-w-4xl">
                <p className="inline-flex rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-brand-gold-pale">
                  Guide conformité 2026
                </p>
                <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                  TRACFIN&nbsp;: les obligations de l’agent immobilier en matière de LCB-FT
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl">
                  Vigilance à l’égard de la clientèle, déclaration de soupçon, conservation des documents et formation du personnel&nbsp;: le cadre complet de la lutte contre le blanchiment dans l’immobilier.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#cadre"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gold px-5 py-3.5 text-sm font-black text-brand-navy transition hover:bg-brand-gold-hover"
                  >
                    Comprendre le dispositif LCB-FT
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <a
                    href={TRACFIN_HOME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    Visiter le site de TRACFIN
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
                    ["#cadre", "Le dispositif LCB-FT"],
                    ["#personnes-concernees", "Professionnels concernés"],
                    ["#vigilance", "Vigilance et KYC"],
                    ["#dispositif", "Dispositif interne"],
                    ["#conservation-sanctions", "Conservation et sanctions"],
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
              <section id="cadre" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Le cadre général
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy sm:text-4xl">
                  TRACFIN et la lutte contre le blanchiment dans l’immobilier
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
                  <p>
                    Les transactions immobilières brassent des montants élevés
                    et peuvent servir de support au blanchiment de capitaux.
                    C’est pourquoi les professionnels de l’immobilier figurent,
                    depuis longtemps, parmi les acteurs assujettis au dispositif
                    français de lutte contre le blanchiment de capitaux et le
                    financement du terrorisme (<strong>LCB-FT</strong>).
                  </p>
                  <p>
                    Les articles{" "}
                    <SourceLink href={CMF_CODE_URL}>
                      L. 561-1 et suivants du code monétaire et financier
                    </SourceLink>{" "}
                    définissent ce dispositif. L’article L. 561-2 désigne les
                    personnes assujetties, parmi lesquelles les professionnels
                    exerçant les activités immobilières prévues par la loi
                    Hoguet. Au centre du système se trouve{" "}
                    <strong>TRACFIN</strong> (Traitement du renseignement et
                    action contre les circuits financiers clandestins), la
                    cellule de renseignement financier du ministère de
                    l’Économie, installée à Bercy.
                  </p>
                </div>

                <div className="mt-7 rounded-2xl border-l-4 border-brand-gold bg-white p-6 shadow-sm">
                  <div className="flex gap-4">
                    <Scale className="mt-1 h-6 w-6 shrink-0 text-brand-gold-dark" aria-hidden />
                    <div>
                      <h3 className="font-black text-brand-navy">
                        Une cellule de renseignement, pas une autorité de sanction
                      </h3>
                      <p className="mt-2 leading-7 text-slate-700">
                        TRACFIN recueille, analyse, enrichit et exploite les
                        déclarations de soupçon. Le résultat de ses
                        investigations est transmis à l’autorité judiciaire ou
                        aux administrations partenaires. Votre obligation est
                        donc de déclarer&nbsp;; l’enquête et les suites
                        appartiennent aux autorités.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="personnes-concernees" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Public concerné
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Quels professionnels sont assujettis&nbsp;?
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700">
                  L’assujettissement ne se limite pas au dirigeant de l’agence.
                  Il s’organise autour de trois cercles de personnes, chacun
                  avec un rôle précis dans le dispositif.
                </p>
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
                <p className="mt-5 flex gap-3 rounded-xl bg-brand-navy/5 p-4 text-sm leading-6 text-slate-700">
                  <Users className="mt-0.5 h-5 w-5 shrink-0 text-brand-navy" aria-hidden />
                  Même une petite agence ou un agent indépendant doit disposer
                  de procédures écrites et d’un interlocuteur identifié pour
                  TRACFIN. La proportionnalité adapte le dispositif à la taille
                  de la structure, elle ne le supprime pas.
                </p>
              </section>

              <section id="vigilance" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Obligation de vigilance
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Vigilance KYC&nbsp;: connaître son client avant toute opération
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-700">
                  Avant d’entrer en relation d’affaires — et tout au long de
                  celle-ci — vous devez appliquer des mesures de vigilance
                  proportionnées au risque. Elles recouvrent notamment&nbsp;:
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {vigilanceMeasures.map((measure) => (
                    <li
                      key={measure}
                      className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold leading-6 text-slate-700"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold-dark" aria-hidden />
                      {measure}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 overflow-hidden rounded-2xl bg-brand-navy text-white">
                  <div className="grid gap-0 md:grid-cols-[1fr_1.35fr]">
                    <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-8">
                      <p className="text-4xl font-black text-brand-gold">Examen renforcé</p>
                      <p className="mt-2 font-bold">quand le risque l’exige</p>
                    </div>
                    <div className="p-6 md:p-8">
                      <p className="leading-7 text-white/80">
                        Face à une situation présentant un risque particulier —
                        montant inhabituel, paiement comptant, structure
                        complexe, client établi dans un pays à risque ou
                        personne politiquement exposée — vous devez aller au-delà
                        de la vigilance standard&nbsp;: <strong className="text-white">informations
                        complémentaires sur l’origine des fonds</strong>, sur la
                        destination de l’opération et validation renforcée du
                        dossier.
                      </p>
                      <p className="mt-4 text-sm text-white/70">
                        Source&nbsp;:{" "}
                        <a
                          href={CMF_CODE_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-brand-gold-pale underline underline-offset-4"
                        >
                          code monétaire et financier sur Légifrance
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="dispositif" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Organisation interne
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Mettre en place le dispositif interne et former le personnel
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
                      Former vos équipes à la LCB-FT&nbsp;?
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      Notre module TRACFIN immobilier couvre la vigilance, la
                      déclaration de soupçon et l’organisation du dispositif,
                      avec des cas concrets de transaction.
                    </p>
                  </div>
                  <Link
                    href="/formation-tracfin-immobilier"
                    className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-navy px-4 py-3 text-sm font-black text-white transition hover:bg-brand-navy-mid"
                  >
                    Découvrir le module TRACFIN
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </section>

              <section id="conservation-sanctions" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Traçabilité et risques
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Registre, conservation des documents et sanctions
                </h2>
                <div className="mt-6 grid gap-6 md:grid-cols-[1.3fr_1fr]">
                  <div className="space-y-5 text-base leading-8 text-slate-700">
                    <p>
                      Les documents et informations recueillis au titre de la
                      vigilance — pièces d’identité, justificatifs, éléments sur
                      le bénéficiaire effectif, analyses internes — doivent être
                      conservés <strong>pendant cinq ans</strong> à compter de
                      la fin de la relation d’affaires ou de la réalisation de
                      l’opération.
                    </p>
                    <p>
                      En cas de manquement, le professionnel s’expose à des{" "}
                      <strong>sanctions disciplinaires</strong> prononcées par
                      l’autorité de contrôle compétente, ainsi qu’à des{" "}
                      <strong>sanctions pénales</strong>. À titre de repère, le
                      délit de blanchiment est puni de cinq ans d’emprisonnement
                      et de 375&nbsp;000&nbsp;euros d’amende (article 324-1 du
                      code pénal).
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <FileCheck2 className="h-8 w-8 text-brand-gold-dark" aria-hidden />
                    <h3 className="mt-5 font-black text-brand-navy">
                      Les réflexes en cas de soupçon
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm text-slate-700">
                      {[
                        "Ne pas révéler la déclaration au client",
                        "Saisir le déclarant TRACFIN interne",
                        "Déclarer sans délai via la téléprocédure",
                        "Archiver les éléments du dossier cinq ans",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-brand-navy" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="mt-5 flex gap-3 rounded-xl bg-brand-navy/5 p-4 text-sm leading-6 text-slate-700">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-brand-navy" aria-hidden />
                  Le doute ne doit jamais être tranché seul&nbsp;: remontez
                  systématiquement l’information au déclarant désigné. C’est lui
                  qui apprécie l’opportunité d’une déclaration de soupçon, dans
                  le strict respect de la confidentialité.
                </p>
              </section>

              <section id="faq" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Questions fréquentes
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  TRACFIN et agent immobilier&nbsp;: FAQ
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
                      <SourceLink href={CMF_CODE_URL}>
                        Code monétaire et financier, articles L. 561-1 et suivants — Légifrance
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Personnes assujetties, mesures de vigilance, déclaration
                        de soupçon, conservation et dispositif interne.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={TRACFIN_MISSIONS_URL}>
                        Les missions, l’organisation et les pouvoirs de TRACFIN — economie.gouv.fr
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Rôle de la cellule de renseignement financier et suites
                        données aux déclarations.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={TRACFIN_HOME_URL}>
                        Site institutionnel de TRACFIN — economie.gouv.fr
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Accès à la téléprocédure de déclaration et aux
                        ressources destinées aux professionnels assujettis.
                      </p>
                    </li>
                  </ul>
                  <p className="mt-6 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500">
                    Informations vérifiées le 31 juillet 2026. Ce guide présente
                    le cadre général du dispositif LCB-FT et ne remplace ni les
                    textes officiels ni un accompagnement juridique adapté à
                    votre structure.
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
                      Sécurisez votre conformité avec la formation TRACFIN
                    </h2>
                    <p className="mt-3 leading-7 text-white/75">
                      Le module TRACFIN immobilier de MonPassFormation vous
                      donne les procédures, les modèles et les réflexes
                      opérationnels pour répondre à vos obligations LCB-FT.
                    </p>
                  </div>
                  <Link
                    href="/formation-tracfin-immobilier"
                    className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-gold px-5 py-3.5 text-sm font-black text-brand-navy transition hover:bg-brand-gold-hover"
                  >
                    Voir la formation TRACFIN
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
                    href="/formation-tracfin-immobilier"
                    className="transition hover:text-brand-navy"
                  >
                    Formation TRACFIN
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
              </ul>
            </nav>
          </div>
        </footer>
      </div>
    </>
  );
}
