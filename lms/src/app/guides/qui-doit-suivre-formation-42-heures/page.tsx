import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Briefcase,
  Building2,
  CheckCircle2,
  ExternalLink,
  Scale,
  UserCheck,
  Users,
  UserX,
  type LucideIcon,
} from "lucide-react";

const SITE_URL = "https://monpassformation.com";
const PAGE_PATH = "/guides/qui-doit-suivre-formation-42-heures";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const COVER_URL = `${SITE_URL}/generated/fal/transaction/cover-immobilier.jpg`;
const LEGIFRANCE_DECREE_URL =
  "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000032080616/";
const LEGIFRANCE_ETHICS_URL =
  "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000042427805";
const CCI_RENEWAL_URL =
  "https://www.cci.fr/ressources/formalites-en-ligne/fichier-des-professionnels-de-limmobilier/renouvellement-de-carte-professionnelle";
const SERVICE_PUBLIC_URL =
  "https://www.service-public.fr/professionnels-entreprises/vosdroits/F31119";

const title =
  "Qui est concerné par la formation 42 heures en immobilier ? Cas par cas";
const description =
  "Qui doit suivre la formation 42 heures en immobilier ? Titulaire, dirigeant, salarié habilité, indépendant, syndic, marchand de listes : cas par cas.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    absolute: title,
  },
  description,
  keywords: [
    "qui est concerné formation 42 heures immobilier",
    "formation loi ALUR personnes concernées",
    "formation continue salarié habilité immobilier",
    "formation agent commercial immobilier obligatoire",
    "formation syndic de copropriété loi ALUR",
    "formation marchand de listes",
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
        alt: "Qui est concerné par la formation 42 heures en immobilier",
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
      "Le gérant d’une SARL d’agence immobilière doit-il se former, même si la carte est au nom de la société ?",
    answer:
      "Oui. Lorsque la carte professionnelle est détenue par une personne morale, l’obligation de formation pèse sur son représentant légal et statutaire, c’est-à-dire le gérant dans le cas d’une SARL. La formation du dirigeant est indispensable au renouvellement de la carte de la société.",
  },
  {
    question: "Un agent commercial indépendant est-il concerné par les 42 heures ?",
    answer:
      "Oui. Les travailleurs indépendants habilités par le titulaire de la carte à négocier, s’entremettre ou s’engager pour son compte sont expressément visés par le décret de 2016. Le statut d’indépendant ne dispense pas de l’obligation de formation continue.",
  },
  {
    question: "Une assistante administrative d’agence doit-elle suivre la formation ?",
    answer:
      "Non, sauf si elle est habilitée à négocier, s’entremettre ou s’engager pour le compte du titulaire. Les fonctions purement administratives, comptables ou d’accueil, sans pouvoir de négociation, ne sont pas soumises à l’obligation.",
  },
  {
    question: "Un syndic bénévole de copropriété est-il concerné ?",
    answer:
      "L’obligation de formation continue vise les professionnels de l’immobilier soumis à la loi Hoguet. Le syndic bénévole, qui n’exerce pas à titre professionnel et ne détient pas de carte professionnelle, n’entre pas dans ce champ. En revanche, tout syndic professionnel et ses collaborateurs habilités sont concernés.",
  },
  {
    question: "Le marchand de listes doit-il aussi justifier de 42 heures ?",
    answer:
      "Oui. L’activité de marchand de listes est une profession immobilière au sens de la loi Hoguet, exercée sous couvert d’une carte professionnelle spécifique. Son titulaire, ses dirigeants et ses collaborateurs habilités sont donc soumis à la même obligation de formation continue.",
  },
  {
    question:
      "Un salarié habilité qui change d’agence doit-il recommencer son cycle de formation ?",
    answer:
      "L’obligation de formation est attachée à la personne, pas à l’employeur. Les heures déjà effectuées et attestées restent valables pour le cycle en cours. Le nouvel employeur peut toutefois exiger la présentation des attestations pour vérifier la conformité de son équipe.",
  },
  {
    question:
      "Le dirigeant d’une succursale qui ne négocie pas lui-même est-il concerné ?",
    answer:
      "Oui. Le décret vise les personnes qui dirigent un établissement, une succursale, une agence ou un bureau, indépendamment de leur participation directe aux négociations. La fonction de direction suffit à déclencher l’obligation.",
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
          item: "https://monpassformation.com/guides",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Qui doit suivre la formation 42 heures",
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
    icon: Users,
    value: "4",
    label: "catégories concernées",
    detail: "Titulaires, dirigeants, salariés habilités et indépendants habilités.",
  },
  {
    icon: Building2,
    value: "Toutes",
    label: "les activités immobilières",
    detail: "Transaction, gestion locative, syndic de copropriété, marchand de listes.",
  },
  {
    icon: UserX,
    value: "Support",
    label: "fonctions non concernées",
    detail: "Administratif, comptabilité, accueil : pas d’obligation sans habilitation.",
  },
];

const profiles = [
  {
    icon: UserCheck,
    title: "Titulaire de la carte (personne physique)",
    concerned: true,
    text: "L’exploitant individuel titulaire de la carte professionnelle est soumis à l’obligation. Il doit justifier de ses 42 heures lors du renouvellement de sa carte, valable trois ans.",
  },
  {
    icon: Briefcase,
    title: "Représentant légal ou statutaire (personne morale)",
    concerned: true,
    text: "Quand la carte est détenue par une société, c’est son représentant légal et statutaire — gérant de SARL, président de SAS — qui doit accomplir la formation pour le compte de la structure.",
  },
  {
    icon: Building2,
    title: "Dirigeant d’établissement, succursale ou agence",
    concerned: true,
    text: "Toute personne qui dirige un établissement, une succursale, une agence ou un bureau est visée, même sans carte à son nom et même sans participer directement aux négociations.",
  },
  {
    icon: Users,
    title: "Salarié habilité",
    concerned: true,
    text: "Négociateurs, conseillers, gestionnaires locatifs ou copropriété : tout salarié habilité à négocier, s’entremettre ou s’engager pour le compte du titulaire doit suivre la formation.",
  },
  {
    icon: Scale,
    title: "Négociateur indépendant (agent commercial)",
    concerned: true,
    text: "Le travailleur indépendant habilité par un titulaire est concerné au même titre qu’un salarié. Son statut d’agent commercial ne le dispense pas des 42 heures.",
  },
  {
    icon: UserX,
    title: "Personnel administratif et support",
    concerned: false,
    text: "Assistantes, comptables, standardistes, chargés de marketing : sans habilitation à négocier, s’entremettre ou s’engager, ces fonctions ne sont pas soumises à l’obligation.",
  },
];

const activityCases = [
  {
    title: "Transaction immobilière",
    text: "Carte mention « transactions sur immeubles et fonds de commerce ». Titulaire, dirigeants et collaborateurs habilités : tous soumis aux 42 heures, avec des contenus en lien direct avec la transaction.",
  },
  {
    title: "Gestion locative",
    text: "Carte mention « gestion immobilière ». L’administrateur de biens et ses gestionnaires habilités choisissent des modules liés à la gestion locative : bail, charges, réglementation locative.",
  },
  {
    title: "Syndic de copropriété",
    text: "Le syndic professionnel exerce avec une carte portant la mention « syndic de copropriété ». Lui-même, ses dirigeants et ses collaborateurs habilités sont concernés, avec des contenus liés à la copropriété.",
  },
  {
    title: "Marchand de listes",
    text: "Activité régie par la loi Hoguet sous une carte spécifique. Le titulaire et les personnes habilitées doivent justifier d’une formation en lien avec cette activité particulière.",
  },
];

const planningSteps = [
  {
    title: "Identifiez votre fonction réelle",
    text: "Titulaire, représentant légal, dirigeant d’agence, salarié ou indépendant : c’est la fonction exercée, pas l’intitulé du contrat, qui détermine l’obligation.",
  },
  {
    title: "Vérifiez l’existence d’une habilitation",
    text: "Pour un salarié ou un indépendant, l’obligation naît de l’habilitation à négocier, s’entremettre ou s’engager pour le compte du titulaire. Sans habilitation, pas d’obligation.",
  },
  {
    title: "Repérez l’activité couverte par la carte",
    text: "Transaction, gestion locative, syndic ou marchand de listes : vos formations devront présenter un lien direct avec l’activité réellement exercée.",
  },
  {
    title: "Déterminez votre cycle de référence",
    text: "42 heures sur trois années consécutives d’exercice ou 14 heures par an. En début d’activité, rapprochez-vous de la CCI pour identifier la période à justifier.",
  },
  {
    title: "Archivez vos attestations au nom de la bonne personne",
    text: "Chaque attestation est nominative : elle doit être établie au nom de la personne qui a suivi la formation, pas au nom de l’agence.",
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

export default function QuiDoitSuivreFormation42HeuresPage() {
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
                    Qui doit suivre la formation 42 heures
                  </li>
                </ol>
              </nav>

              <div className="mt-9 max-w-4xl">
                <p className="inline-flex rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-brand-gold-pale">
                  Guide réglementaire 2026
                </p>
                <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                  Qui est concerné par la formation 42 heures en
                  immobilier&nbsp;?
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl">
                  Titulaire de la carte, gérant de société, directeur
                  d’agence, négociateur salarié ou indépendant, syndic,
                  marchand de listes&nbsp;: l’obligation de formation continue
                  ne vise pas que le nom inscrit sur la carte. Vérifiez votre
                  situation, cas par cas.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#cas-par-cas"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gold px-5 py-3.5 text-sm font-black text-brand-navy transition hover:bg-brand-gold-hover"
                  >
                    Vérifier ma situation
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
                    ["#principe", "Le principe"],
                    ["#cas-par-cas", "Cas par cas"],
                    ["#par-activite", "Selon votre activité"],
                    ["#verifier", "Vérifier sa situation"],
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
              <section id="principe" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Le principe
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy sm:text-4xl">
                  Une obligation attachée à la fonction, pas seulement à la
                  carte
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
                  <p>
                    Le{" "}
                    <SourceLink href={LEGIFRANCE_DECREE_URL}>
                      décret n°&nbsp;2016-173 du 18 février 2016
                    </SourceLink>{" "}
                    soumet à la formation continue toutes les personnes qui
                    exercent effectivement la profession, et pas uniquement la
                    personne dont le nom figure sur la carte professionnelle.
                    Trois grandes catégories sont visées par le texte&nbsp;: les
                    titulaires de la carte (personne physique, ou représentant
                    légal et statutaire pour une personne morale), les personnes
                    qui dirigent un établissement, une succursale, une agence ou
                    un bureau, et les salariés ou indépendants habilités à
                    négocier, s’entremettre ou s’engager pour le compte du
                    titulaire.
                  </p>
                  <p>
                    Autrement dit, dans une agence, ce ne sont pas une mais
                    souvent plusieurs personnes qui doivent justifier chacune
                    de leurs propres heures de formation. L’attestation est
                    nominative&nbsp;: on ne peut pas «&nbsp;mutualiser&nbsp;»
                    les heures entre collègues.
                  </p>
                </div>
                <div className="mt-7 rounded-2xl border-l-4 border-brand-gold bg-white p-6 shadow-sm">
                  <div className="flex gap-4">
                    <Scale className="mt-1 h-6 w-6 shrink-0 text-brand-gold-dark" aria-hidden />
                    <div>
                      <h3 className="font-black text-brand-navy">
                        Le critère décisif&nbsp;: l’habilitation
                      </h3>
                      <p className="mt-2 leading-7 text-slate-700">
                        Pour un salarié ou un indépendant, tout se joue sur
                        l’habilitation&nbsp;: être autorisé par le titulaire à
                        négocier, s’entremettre ou s’engager pour son compte.
                        C’est ce pouvoir de représentation qui déclenche
                        l’obligation de formation, quel que soit l’intitulé du
                        poste.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="cas-par-cas" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Votre situation
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Êtes-vous concerné&nbsp;? Le détail cas par cas
                </h2>
                <div className="mt-7 grid gap-4 md:grid-cols-2">
                  {profiles.map((profile) => {
                    const Icon = profile.icon;

                    return (
                      <div
                        key={profile.title}
                        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gold/15 text-brand-navy">
                            <Icon className="h-5 w-5" aria-hidden />
                          </span>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide ${
                              profile.concerned
                                ? "bg-brand-navy/5 text-brand-navy"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {profile.concerned ? "Concerné" : "Non concerné"}
                          </span>
                        </div>
                        <h3 className="mt-5 text-lg font-black text-brand-navy">
                          {profile.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-slate-600">
                          {profile.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section id="par-activite" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Toutes les professions
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Selon votre activité&nbsp;: transaction, gestion, syndic,
                  marchand de listes
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-700">
                  L’obligation s’applique à toutes les professions régies par
                  la loi Hoguet. Ce qui change d’une activité à l’autre, c’est
                  le <strong>lien direct</strong> que doivent présenter les
                  contenus de formation avec l’activité réellement exercée.
                </p>
                <div className="mt-7 space-y-4">
                  {activityCases.map((activity) => (
                    <div
                      key={activity.title}
                      className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      <CheckCircle2
                        className="mt-1 h-6 w-6 shrink-0 text-brand-gold-dark"
                        aria-hidden
                      />
                      <div>
                        <h3 className="font-black text-brand-navy">
                          {activity.title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">
                          {activity.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-5 flex gap-3 rounded-xl bg-brand-navy/5 p-4 text-sm leading-6 text-slate-700">
                  <Users className="mt-0.5 h-5 w-5 shrink-0 text-brand-navy" aria-hidden />
                  Le choix des contenus recevables est détaillé dans notre
                  guide sur les{" "}
                  <Link
                    href="/guides/contenus-obligatoires-formation-alur"
                    className="font-bold text-brand-navy underline decoration-brand-gold/60 decoration-2 underline-offset-4 transition hover:text-brand-navy-mid"
                  >
                    contenus obligatoires de la formation ALUR
                  </Link>
                  .
                </p>
              </section>

              <section id="verifier" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Méthode pratique
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Vérifiez votre situation en 5 points
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
                      Un doute sur votre catégorie&nbsp;?
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      La CCI qui a délivré votre carte peut confirmer les
                      obligations applicables à votre situation précise avant
                      que vous ne constituiez votre programme.
                    </p>
                  </div>
                  <Link
                    href="/guides/formation-loi-alur-obligatoire"
                    className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-navy px-4 py-3 text-sm font-black text-white transition hover:bg-brand-navy-mid"
                  >
                    Guide de l’obligation
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </section>

              <section id="faq" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Questions fréquentes
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Qui est concerné&nbsp;: FAQ
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
                        Catégories de personnes soumises à la formation
                        continue.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={LEGIFRANCE_ETHICS_URL}>
                        Décret relatif à la déontologie — Légifrance
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Obligations déontologiques applicables aux
                        professionnels habilités.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={CCI_RENEWAL_URL}>
                        Renouvellement de carte professionnelle — CCI France
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Justificatifs exigés des titulaires au renouvellement.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={SERVICE_PUBLIC_URL}>
                        Carte professionnelle d’agent immobilier — Service-Public.fr
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Activités soumises à carte et conditions d’exercice.
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
                      text: "Durée, rythme, contenus et justificatifs des 42 heures.",
                    },
                    {
                      href: "/guides/formation-loi-alur-obligatoire",
                      title: "Formation loi ALUR obligatoire",
                      text: "Cadre légal, calendrier et sanctions en cas de manquement.",
                    },
                    {
                      href: "/guides/contenus-obligatoires-formation-alur",
                      title: "Contenus obligatoires de la formation ALUR",
                      text: "Les six domaines admis et ce qui ne compte pas.",
                    },
                    {
                      href: "/guides/attestation-formation-alur-validite",
                      title: "Attestation de formation ALUR et validité",
                      text: "Mentions obligatoires, conservation et contrôle CCI.",
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
                      Vous êtes concerné&nbsp;? Formez-vous avec
                      MonPassFormation
                    </h2>
                    <p className="mt-3 leading-7 text-white/75">
                      Formation Loi ALUR 42 h + TRACFIN 3 h à 299&nbsp;€,
                      certifiée Qualiopi, en visioconférences avec des experts
                      de l’immobilier. Des attestations nominatives conformes
                      pour chaque personne formée.
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
