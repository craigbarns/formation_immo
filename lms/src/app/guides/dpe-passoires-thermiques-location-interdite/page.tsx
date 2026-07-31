import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  Home,
  Scale,
  Thermometer,
  Users,
  type LucideIcon,
} from "lucide-react";

const SITE_URL = "https://monpassformation.com";
const PAGE_PATH = "/guides/dpe-passoires-thermiques-location-interdite";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const COVER_URL = `${SITE_URL}/generated/fal/transaction/cover-immobilier.jpg`;
const LEGIFRANCE_CLIMAT_URL =
  "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000043956924";
const ECOLOGIE_DPE_URL =
  "https://www.ecologie.gouv.fr/diagnostic-performance-energetique-dpe";
const SERVICE_PUBLIC_DPE_URL =
  "https://www.service-public.fr/particuliers/vosdroits/F16096";

const title = "Passoire thermique : location interdite, calendrier 2025-2034";
const description =
  "Logements G interdits à la location depuis 2025, F en 2028, E en 2034 : calendrier des interdictions, DPE, décence énergétique et impacts pour agents immobiliers et bailleurs.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    absolute: title,
  },
  description,
  keywords: [
    "passoire thermique location interdite",
    "interdiction location logement G 2025",
    "DPE location obligatoire",
    "décence énergétique",
    "loi Climat et Résilience logement",
    "gel des loyers passoires thermiques",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  category: "Réglementation immobilière et transition énergétique",
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
        alt: "Calendrier d’interdiction de location des passoires thermiques",
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
    question: "Peut-on encore louer un logement classé G en 2026 ?",
    answer:
      "Non. Depuis le 1er janvier 2025, les logements classés G au DPE ne peuvent plus faire l’objet d’une nouvelle mise en location : ils ne répondent plus au critère de décence énergétique. Pour un locataire déjà en place, le bail n’est pas rompu, mais il peut demander la mise en conformité du logement.",
  },
  {
    question: "Le calendrier 2028 et 2034 est-il définitif ?",
    answer:
      "Il est inscrit dans la loi Climat et Résilience n° 2021-1104 du 22 août 2021 : interdiction de louer les logements classés F au 1er janvier 2028, puis les logements classés E au 1er janvier 2034. Toute évolution devra passer par un nouveau texte, d’où l’intérêt d’anticiper les travaux dès maintenant.",
  },
  {
    question: "Quelle est la durée de validité d’un DPE ?",
    answer:
      "Le DPE établi selon la méthode entrée en vigueur en juillet 2021 est valable dix ans. Il est opposable : le propriétaire engage sa responsabilité sur les informations qu’il contient lorsqu’il le remet à un locataire ou à un acquéreur.",
  },
  {
    question: "Le propriétaire d’une passoire thermique peut-il augmenter le loyer ?",
    answer:
      "Non pour les logements classés F ou G : le gel des loyers des passoires thermiques interdit l’augmentation du loyer, notamment lors d’une relocation ou d’un renouvellement, tant que des travaux n’ont pas amélioré la performance. Dans les zones d’encadrement des loyers, aucun complément de loyer n’est possible pour ces logements.",
  },
  {
    question: "Que risque un bailleur qui loue un logement énergivore interdit ?",
    answer:
      "Le logement est considéré comme non décent. Le locataire peut saisir la commission départementale de conciliation puis le juge pour obtenir des travaux, une suspension du paiement du loyer ou une diminution de celui-ci, sans préjudice de dommages et intérêts.",
  },
  {
    question: "Quelle responsabilité pour l’agent immobilier ?",
    answer:
      "L’agent doit vérifier l’existence et la validité du DPE, mentionner la classe énergétique dans l’annonce et alerter son client sur le calendrier des interdictions. Proposer à la location un logement classé G expose l’agence comme le bailleur, et engage le devoir de conseil du professionnel.",
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
          name: "Diagnostic de performance énergétique",
        },
        {
          "@type": "Thing",
          name: "Passoire thermique",
        },
        {
          "@type": "Thing",
          name: "Loi Climat et Résilience",
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
          name: "Passoires thermiques et interdiction de location",
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
    icon: Thermometer,
    value: "2025",
    label: "classe G",
    detail: "Les logements classés G ne peuvent plus être mis en location depuis le 1er janvier 2025.",
  },
  {
    icon: CalendarDays,
    value: "2028",
    label: "classe F",
    detail: "L’interdiction de louer s’étendra aux logements classés F au 1er janvier 2028.",
  },
  {
    icon: Home,
    value: "2034",
    label: "classe E",
    detail: "Les logements classés E seront concernés à compter du 1er janvier 2034.",
  },
];

const audiences = [
  {
    title: "Bailleurs",
    text: "Propriétaires de logements classés F ou G, vous devez planifier des travaux de rénovation énergétique pour conserver la possibilité de louer et de revaloriser le loyer.",
  },
  {
    title: "Agents immobiliers",
    text: "Vous devez vérifier le DPE avant toute mise en location, mentionner la classe énergétique dans vos annonces et conseiller vos clients sur le calendrier des interdictions.",
  },
  {
    title: "Locataires",
    text: "Vous disposez d’un droit à un logement décent : si votre logement est classé G, vous pouvez demander sa mise en conformité énergétique à votre propriétaire.",
  },
];

const dpeObligations = [
  "Un DPE valide, établi par un diagnostiqueur certifié, avant toute mise en location ou en vente",
  "Une durée de validité de dix ans pour les diagnostics réalisés depuis juillet 2021",
  "La mention de la classe énergie et de la classe climat dans les annonces immobilières",
  "La remise du DPE au locataire, annexée au dossier de diagnostic technique",
  "Le respect du critère de décence énergétique pour toute nouvelle location",
  "Un audit énergétique obligatoire lors de la vente des logements les plus énergivores",
];

const planningSteps = [
  {
    title: "Vérifier le DPE de chaque bien géré",
    text: "Contrôlez la date d’établissement, la classe énergie et la classe climat. Un DPE antérieur à juillet 2021 n’est plus opposable : faites-en réaliser un nouveau.",
  },
  {
    title: "Identifier les passoires thermiques du portefeuille",
    text: "Repérez les logements classés F et G, puis ceux classés E, afin de prioriser les dossiers à traiter avant les échéances de 2028 et 2034.",
  },
  {
    title: "Conseiller le bailleur sur les travaux",
    text: "Présentez les enjeux de la rénovation énergétique : maintien de la possibilité de louer, valorisation du bien, fin du gel des loyers une fois la performance améliorée.",
  },
  {
    title: "Sécuriser l’annonce et le bail",
    text: "Mentionnez la classe énergétique dans l’annonce, joignez le DPE au dossier de diagnostic technique et refusez toute mise en location d’un logement classé G.",
  },
  {
    title: "Documenter les conseils donnés",
    text: "Tracez par écrit les informations et alertes transmises au bailleur : c’est la meilleure protection de votre devoir de conseil en cas de litige.",
  },
];

const relatedLinks = [
  {
    href: "/formation-immobiliere-loi-alur",
    label: "Formation immobilière loi ALUR (42 h)",
    detail: "Intégrez la transition énergétique à votre cycle de formation continue.",
  },
  {
    href: "/guides/formation-loi-alur-42-heures",
    label: "Formation loi ALUR 42 heures",
    detail: "Tout savoir sur l’obligation de formation des professionnels.",
  },
  {
    href: "/guides/estimation-immobiliere-methodes",
    label: "Estimation immobilière : les méthodes",
    detail: "L’impact de la classe énergétique sur la valeur des biens.",
  },
  {
    href: "/formation-juridique-immobilier",
    label: "Formation juridique immobilier",
    detail: "Approfondir le cadre légal de la location et de la décence.",
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

export default function DpePassoiresThermiquesLocationInterditePage() {
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
                    Passoires thermiques
                  </li>
                </ol>
              </nav>

              <div className="mt-9 max-w-4xl">
                <p className="inline-flex rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-brand-gold-pale">
                  Guide réglementaire 2026
                </p>
                <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                  Passoire thermique&nbsp;: quelles locations interdites entre 2025 et 2034&nbsp;?
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl">
                  Logements classés G, F puis E progressivement bannis du marché locatif, DPE devenu opposable, loyers gelés&nbsp;: le guide complet du calendrier de la loi Climat et Résilience pour les professionnels et les bailleurs.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#calendrier"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gold px-5 py-3.5 text-sm font-black text-brand-navy transition hover:bg-brand-gold-hover"
                  >
                    Voir le calendrier des interdictions
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <a
                    href={ECOLOGIE_DPE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    Le DPE sur ecologie.gouv.fr
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
                    ["#calendrier", "Calendrier des interdictions"],
                    ["#dpe", "Le DPE, outil central"],
                    ["#decence", "Décence et loyers"],
                    ["#acteurs", "Impacts par acteur"],
                    ["#actions", "Conduite à tenir"],
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
              <section id="calendrier" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Le principe
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy sm:text-4xl">
                  G en 2025, F en 2028, E en 2034&nbsp;: la sortie progressive des passoires thermiques
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
                  <p>
                    La{" "}
                    <SourceLink href={LEGIFRANCE_CLIMAT_URL}>
                      loi Climat et Résilience n° 2021-1104 du 22 août 2021
                    </SourceLink>{" "}
                    a inscrit dans le droit un principe simple&nbsp;: un logement
                    trop énergivore n’est plus un logement décent et ne peut donc
                    plus être proposé à la location. L’interdiction s’applique
                    par étapes, suivant la classe attribuée par le diagnostic de
                    performance énergétique (DPE).
                  </p>
                  <p>
                    Depuis le <strong>1er janvier 2025</strong>, les logements
                    classés <strong>G</strong> ne peuvent plus être mis en
                    location. Suivront les logements classés <strong>F</strong>{" "}
                    au <strong>1er janvier 2028</strong>, puis ceux classés{" "}
                    <strong>E</strong> au <strong>1er janvier 2034</strong>.
                  </p>
                </div>

                <div className="mt-7 rounded-2xl border-l-4 border-brand-gold bg-white p-6 shadow-sm">
                  <div className="flex gap-4">
                    <Scale className="mt-1 h-6 w-6 shrink-0 text-brand-gold-dark" aria-hidden />
                    <div>
                      <h3 className="font-black text-brand-navy">
                        Ce que l’interdiction signifie concrètement
                      </h3>
                      <p className="mt-2 leading-7 text-slate-700">
                        L’interdiction vise la mise en location&nbsp;: signature
                        d’un nouveau bail, relocation entre deux locataires ou
                        renouvellement. Le locataire en place n’est pas expulsé&nbsp;;
                        en revanche, il peut exiger la mise en conformité du
                        logement au titre du droit à un logement décent.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="dpe" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  L’outil de mesure
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Le DPE, pièce centrale du dispositif
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700">
                  Le diagnostic de performance énergétique classe chaque logement
                  de A à G selon sa consommation d’énergie et ses émissions de
                  gaz à effet de serre. Depuis la réforme entrée en vigueur en
                  juillet 2021, il est <strong>opposable</strong>&nbsp;: le
                  propriétaire engage sa responsabilité sur son contenu.
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {dpeObligations.map((obligation) => (
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
                      <p className="text-4xl font-black text-brand-gold">10 ans</p>
                      <p className="mt-2 font-bold">de validité du DPE</p>
                    </div>
                    <div className="p-6 md:p-8">
                      <p className="leading-7 text-white/80">
                        Un DPE établi selon la méthode en vigueur depuis juillet
                        2021 reste valable <strong className="text-white">dix ans</strong>.
                        Les diagnostics plus anciens ne sont plus recevables&nbsp;:
                        ils doivent être refaits par un diagnostiqueur certifié
                        avant toute mise en location ou en vente.
                      </p>
                      <p className="mt-4 text-sm text-white/70">
                        Source&nbsp;:{" "}
                        <a
                          href={SERVICE_PUBLIC_DPE_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-brand-gold-pale underline underline-offset-4"
                        >
                          fiche DPE sur service-public.fr
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="decence" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Décence énergétique
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Décence, gel et encadrement des loyers
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
                  <p>
                    Le critère de <strong>décence énergétique</strong> lie le
                    droit de louer à la performance du logement. Un bien qui ne
                    l’atteint plus est réputé non décent&nbsp;: le bailleur ne peut
                    ni le proposer à la location, ni en augmenter le loyer.
                  </p>
                  <p>
                    Pour les logements classés F ou G, le <strong>gel des
                    loyers</strong> s’applique&nbsp;: aucune hausse n’est possible
                    lors d’une relocation, d’un renouvellement ou d’une révision,
                    tant que des travaux n’ont pas amélioré la performance. Dans
                    les zones où l’encadrement des loyers s’applique, aucun{" "}
                    <strong>complément de loyer</strong> ne peut être demandé
                    pour ces logements énergivores.
                  </p>
                </div>
              </section>

              <section id="acteurs" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Acteurs concernés
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Quels impacts pour les bailleurs, les agents et les locataires&nbsp;?
                </h2>
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
                  Pour l’agent immobilier, le sujet dépasse la conformité&nbsp;:
                  la classe énergétique influence l’estimation, l’argumentaire de
                  vente et la négociation. C’est désormais une compétence de base
                  du métier.
                </p>
              </section>

              <section id="actions" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Méthode pratique
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Conduite à tenir pour sécuriser vos locations
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
                      Intégrer la transition énergétique à votre formation&nbsp;?
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      La transition énergétique fait partie des thèmes recevables
                      de la formation continue loi ALUR. Notre parcours détaille
                      le DPE, la décence et les stratégies de conseil aux bailleurs.
                    </p>
                  </div>
                  <Link
                    href="/formation-immobiliere-loi-alur"
                    className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-navy px-4 py-3 text-sm font-black text-white transition hover:bg-brand-navy-mid"
                  >
                    Découvrir la formation ALUR
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </section>

              <section id="faq" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Questions fréquentes
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Passoires thermiques&nbsp;: FAQ
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
                      <SourceLink href={LEGIFRANCE_CLIMAT_URL}>
                        Loi n° 2021-1104 du 22 août 2021, dite « Climat et Résilience » — Légifrance
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Calendrier d’interdiction de location, audit énergétique
                        et gel des loyers des passoires thermiques.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={ECOLOGIE_DPE_URL}>
                        Le diagnostic de performance énergétique — ecologie.gouv.fr
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Méthode de calcul, classes énergie et climat, rôle du DPE
                        dans les politiques du logement.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={SERVICE_PUBLIC_DPE_URL}>
                        Diagnostic de performance énergétique (DPE) — service-public.fr
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Durée de validité, obligation de remise et mentions dans
                        les annonces immobilières.
                      </p>
                    </li>
                  </ul>
                  <p className="mt-6 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500">
                    Informations vérifiées le 31 juillet 2026. Ce guide présente
                    le cadre général du calendrier des interdictions de location&nbsp;;
                    il ne remplace ni les textes officiels ni l’analyse de votre
                    situation par un professionnel du droit.
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
                      Faites de la transition énergétique un atout métier
                    </h2>
                    <p className="mt-3 leading-7 text-white/75">
                      DPE, décence énergétique, conseil aux bailleurs&nbsp;: notre
                      formation immobilière loi ALUR vous donne les clés pour
                      accompagner vos clients dans le nouveau paysage locatif.
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
