import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  Archive,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  FileCheck2,
  Search,
  UserCheck,
  type LucideIcon,
} from "lucide-react";

const SITE_URL = "https://monpassformation.com";
const PAGE_PATH = "/guides/attestation-formation-alur-validite";
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
  "Attestation de formation loi ALUR : mentions obligatoires, conservation, contrôle CCI";
const description =
  "Attestation de formation loi ALUR : les 4 mentions obligatoires, la durée de conservation, le contrôle par la CCI au renouvellement et les pièges à éviter.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    absolute: title,
  },
  description,
  keywords: [
    "attestation formation loi alur",
    "attestation formation continue immobilier",
    "mentions obligatoires attestation formation",
    "justificatif formation 42 heures CCI",
    "conservation attestation formation immobilier",
    "contrôle CCI formation continue",
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
        alt: "Attestation de formation loi ALUR : mentions et validité",
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
      "Quelles mentions doivent obligatoirement figurer sur l’attestation ?",
    answer:
      "Le décret n° 2016-173 prévoit que l’attestation délivrée par l’organisme mentionne les objectifs, le contenu, la durée et la date de réalisation de l’activité de formation. En pratique, elle doit aussi identifier clairement la personne formée, car le justificatif est nominatif.",
  },
  {
    question: "Combien de temps faut-il conserver ses attestations ?",
    answer:
      "Au minimum sur toute la durée du cycle de trois ans auquel elles se rapportent, et jusqu’au renouvellement de la carte professionnelle qui les mobilise. La carte étant valable trois ans, la règle pratique est simple : ne jetez rien avant que la CCI ait validé votre renouvellement, et conservez idéalement un cycle de recul.",
  },
  {
    question:
      "Une attestation établie au nom de l’agence vaut-elle pour un salarié ?",
    answer:
      "Non. L’obligation de formation est personnelle : chaque attestant doit disposer d’un document nominatif mentionnant ses propres heures. Une attestation globale au nom de la société ne prouve pas la formation d’un salarié ou d’un indépendant habilité en particulier.",
  },
  {
    question: "Que faire en cas d’attestation perdue ?",
    answer:
      "Contactez l’organisme de formation pour demander un duplicata : les organismes conservent une trace des sessions et des participants. C’est une raison supplémentaire de choisir un organisme pérenne et d’archiver chaque attestation en numérique dès sa réception.",
  },
  {
    question: "La CCI vérifie-t-elle réellement les attestations ?",
    answer:
      "Le justificatif de formation continue fait partie des pièces exigées lors du renouvellement de la carte professionnelle : la CCI examine donc les attestations transmises avec le dossier. Un document incomplet ou incohérent avec l’activité exercée peut conduire au rejet du dossier.",
  },
  {
    question:
      "Une attestation délivrée par une formation en ligne est-elle recevable ?",
    answer:
      "Oui, les textes n’imposent pas de modalité présentielle. Ce qui compte : un contenu relevant des domaines admis, un lien direct avec l’activité exercée, et une attestation mentionnant objectifs, contenu, durée et date de réalisation.",
  },
  {
    question:
      "L’organisme doit-il être certifié Qualiopi pour que l’attestation soit valable ?",
    answer:
      "La certification Qualiopi n’est pas une condition posée par le décret pour la validité du justificatif. Elle reste un gage de qualité et ouvre l’accès aux financements publics et mutualisés, mais la conformité de l’attestation repose sur ses mentions et la réalité de la formation.",
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
          name: "Attestation de formation continue",
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
          name: "Attestation de formation ALUR et validité",
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
    icon: FileCheck2,
    value: "4",
    label: "mentions obligatoires",
    detail: "Objectifs, contenu, durée et date de réalisation de la formation.",
  },
  {
    icon: Archive,
    value: "3 ans",
    label: "de conservation minimum",
    detail: "Toute la durée du cycle, jusqu’à validation du renouvellement.",
  },
  {
    icon: UserCheck,
    value: "Nominative",
    label: "pour chaque personne formée",
    detail: "L’attestation est personnelle : pas de document collectif « agence ».",
  },
];

const requiredMentions = [
  {
    title: "Les objectifs de la formation",
    text: "Ce que la formation visait à développer : mise à jour juridique, maîtrise d’un domaine, compétences déontologiques. Les objectifs relient le contenu à l’activité exercée.",
  },
  {
    title: "Le contenu de la formation",
    text: "Les thèmes réellement traités, qui doivent relever des six domaines admis. C’est cette mention qui permet de vérifier le fameux « lien direct » avec l’activité.",
  },
  {
    title: "La durée",
    text: "Le nombre d’heures effectuées, qui s’impute sur les 42 heures du cycle. Les heures de déontologie et de non-discrimination doivent être identifiables.",
  },
  {
    title: "La date de réalisation",
    text: "Elle rattache la formation au bon cycle de trois années consécutives d’exercice. Une attestation non datée ne peut pas être imputée.",
  },
];

const pitfalls = [
  {
    title: "L’attestation au nom de l’agence",
    text: "La formation est personnelle : un document collectif ne prouve rien pour un salarié ou un indépendant habilité. Exigez une attestation nominative pour chaque personne formée.",
  },
  {
    title: "Les mentions incomplètes",
    text: "Une attestation sans durée, sans date ou avec un contenu flou (« divers sujets immobiliers ») peut être refusée. Vérifiez les quatre mentions dès réception, pas au moment du renouvellement.",
  },
  {
    title: "L’organisme injoignable ou disparu",
    text: "Si l’organisme a cessé son activité, obtenir un duplicata devient impossible. Privilégiez des organismes établis et conservez vos documents en double exemplaire numérique.",
  },
  {
    title: "L’imputation sur le mauvais cycle",
    text: "Une formation suivie hors de la période de trois années consécutives concernée ne compte pas pour ce cycle. Vérifiez la cohérence entre dates de formation et période à justifier.",
  },
  {
    title: "Les heures de déontologie non identifiables",
    text: "Les 2 h de non-discrimination et 2 h de règles déontologiques doivent ressortir clairement. Si elles sont noyées dans un volume global indifférencié, le contrôle devient difficile.",
  },
];

const planningSteps = [
  {
    title: "Réclamer l’attestation immédiatement après la session",
    text: "N’attendez pas le renouvellement : exigez le document à l’issue de chaque formation, pendant que l’organisme a vos informations sous la main.",
  },
  {
    title: "Contrôler les quatre mentions obligatoires",
    text: "Objectifs, contenu, durée, date de réalisation : si l’une manque, demandez une correction à l’organisme avant d’archiver.",
  },
  {
    title: "Vérifier l’identité et le rattachement au cycle",
    text: "Nom de la personne formée correctement orthographié, date cohérente avec le cycle de trois ans en cours, heures de déontologie identifiables.",
  },
  {
    title: "Archiver en numérique et en double",
    text: "Scannez chaque attestation, classez-la par année dans un dossier dédié « carte professionnelle », et conservez une copie de secours.",
  },
  {
    title: "Préparer le paquet pour la CCI avant l’échéance",
    text: "La demande de renouvellement se présente dans les deux mois précédant l’expiration de la carte : rassemblez vos justificatifs au moins trois mois en amont.",
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

export default function AttestationFormationAlurValiditePage() {
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
                    Attestation de formation ALUR et validité
                  </li>
                </ol>
              </nav>

              <div className="mt-9 max-w-4xl">
                <p className="inline-flex rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-brand-gold-pale">
                  Guide réglementaire 2026
                </p>
                <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                  Attestation de formation loi ALUR&nbsp;: mentions, validité
                  et contrôle CCI
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl">
                  C’est le document qui prouve vos 42 heures au moment du
                  renouvellement de la carte professionnelle. Quelles mentions
                  exiger, combien de temps le conserver, comment la CCI le
                  contrôle&nbsp;? Et surtout&nbsp;: quels pièges évitent un
                  rejet de dossier.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#mentions"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gold px-5 py-3.5 text-sm font-black text-brand-navy transition hover:bg-brand-gold-hover"
                  >
                    Voir les mentions obligatoires
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <a
                    href={CCI_RENEWAL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    La formalité sur CCI France
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
                    ["#mentions", "Mentions obligatoires"],
                    ["#conservation", "Durée de conservation"],
                    ["#controle-cci", "Le contrôle CCI"],
                    ["#pieges", "Les pièges à éviter"],
                    ["#securiser", "Sécuriser ses justificatifs"],
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
              <section id="mentions" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Traçabilité
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy sm:text-4xl">
                  Les 4 mentions obligatoires de l’attestation
                </h2>
                <div className="mt-6 grid gap-6 md:grid-cols-[1.3fr_1fr]">
                  <div className="space-y-5 text-base leading-8 text-slate-700">
                    <p>
                      À l’issue de chaque activité de formation, l’organisme
                      délivre une attestation à la personne formée. Le{" "}
                      <SourceLink href={LEGIFRANCE_DECREE_URL}>
                        décret n°&nbsp;2016-173 du 18 février 2016
                      </SourceLink>{" "}
                      prévoit que ce document mentionne les{" "}
                      <strong>objectifs</strong>, le <strong>contenu</strong>,
                      la <strong>durée</strong> et la{" "}
                      <strong>date de réalisation</strong>. Ces mentions ne sont
                      pas un formalisme&nbsp;: ce sont elles qui permettent à la
                      CCI de vérifier la recevabilité de vos heures.
                    </p>
                    <p>
                      L’attestation est en outre <strong>nominative</strong>&nbsp;:
                      elle identifie la personne qui a réellement suivi la
                      formation. Pour une agence, chaque salarié ou indépendant
                      habilité dispose donc de ses propres justificatifs.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <FileCheck2 className="h-8 w-8 text-brand-gold-dark" aria-hidden />
                    <h3 className="mt-5 font-black text-brand-navy">
                      Contrôle rapide d’une attestation
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm text-slate-700">
                      {["Objectifs", "Contenu", "Durée", "Date de réalisation"].map(
                        (item) => (
                          <li key={item} className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-brand-navy" aria-hidden />
                            {item}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>
                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {requiredMentions.map((mention) => (
                    <div
                      key={mention.title}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      <h3 className="font-black text-brand-navy">
                        {mention.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {mention.text}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="conservation" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Archivage
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Combien de temps conserver ses attestations&nbsp;?
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
                  <p>
                    Les attestations justifient un <strong>cycle de trois
                    années consécutives d’exercice</strong>. Elles doivent donc
                    être conservées au minimum pendant toute la durée de ce
                    cycle — et jusqu’à ce que la CCI ait validé le
                    renouvellement de la carte professionnelle qui s’appuie
                    dessus, la carte étant valable trois ans.
                  </p>
                  <p>
                    En pratique, la règle d’or est simple&nbsp;:{" "}
                    <strong>ne rien jeter avant la validation du
                    renouvellement</strong>, et conserver idéalement un cycle
                    complet de recul. En cas de contrôle ultérieur ou de
                    contestation, vous pourrez démontrer votre conformité sur
                    la durée.
                  </p>
                  <p>
                    Bon réflexe&nbsp;: constituez un dossier unique «&nbsp;carte
                    professionnelle&nbsp;», alimenté après chaque formation, en
                    version numérique (PDF horodatés) et papier. Au moment de
                    la formalité, tout est déjà rassemblé.
                  </p>
                </div>
                <div className="mt-7 rounded-2xl border-l-4 border-brand-gold bg-white p-6 shadow-sm">
                  <div className="flex gap-4">
                    <Archive className="mt-1 h-6 w-6 shrink-0 text-brand-gold-dark" aria-hidden />
                    <div>
                      <h3 className="font-black text-brand-navy">
                        Le duplicata, plan B à connaître
                      </h3>
                      <p className="mt-2 leading-7 text-slate-700">
                        En cas de perte, l’organisme de formation peut délivrer
                        un duplicata, car il conserve la trace des sessions et
                        des participants. Encore faut-il qu’il soit toujours en
                        activité et joignable&nbsp;: d’où l’importance de
                        l’archivage numérique au fil de l’eau.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="controle-cci" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Vérification
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Comment la CCI contrôle vos justificatifs
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
                  <p>
                    Le justificatif de formation continue fait partie des
                    pièces exigées lors de la{" "}
                    <SourceLink href={CCI_RENEWAL_URL}>
                      demande de renouvellement de la carte professionnelle
                    </SourceLink>
                    , à présenter dans les deux mois précédant l’expiration de
                    la carte. Les attestations transmises avec le dossier sont
                    examinées&nbsp;: volume d’heures, rattachement au cycle,
                    mentions obligatoires, cohérence avec l’activité couverte
                    par la carte.
                  </p>
                  <p>
                    Un dossier incomplet ou incohérent peut être rejeté, ce qui
                    retarde — voire empêche — le renouvellement. Les erreurs
                    les plus fréquentes qui conduisent au rejet sont détaillées
                    dans notre guide dédié aux{" "}
                    <Link
                      href="/guides/erreurs-renouvellement-carte-professionnelle"
                      className="font-bold text-brand-navy underline decoration-brand-gold/60 decoration-2 underline-offset-4 transition hover:text-brand-navy-mid"
                    >
                      erreurs au renouvellement de la carte professionnelle
                    </Link>
                    .
                  </p>
                </div>
                <p className="mt-5 flex gap-3 rounded-xl bg-brand-navy/5 p-4 text-sm leading-6 text-slate-700">
                  <Search className="mt-0.5 h-5 w-5 shrink-0 text-brand-navy" aria-hidden />
                  Ce que l’examen porte concrètement&nbsp;: 42 heures
                  atteintes sur le cycle, 4 heures de déontologie
                  identifiables, domaines admis respectés, attestations
                  nominatives et datées.
                </p>
              </section>

              <section id="pieges" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Vigilance
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Les 5 pièges qui fragilisent un justificatif
                </h2>
                <div className="mt-7 space-y-4">
                  {pitfalls.map((pitfall) => (
                    <div
                      key={pitfall.title}
                      className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      <AlertTriangle
                        className="mt-1 h-6 w-6 shrink-0 text-brand-gold-dark"
                        aria-hidden
                      />
                      <div>
                        <h3 className="font-black text-brand-navy">
                          {pitfall.title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">
                          {pitfall.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="securiser" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Méthode pratique
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Sécuriser ses justificatifs en 5 étapes
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
                  Attestation de formation loi ALUR&nbsp;: FAQ
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
                        Mentions obligatoires de l’attestation et conditions de
                        justification.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={LEGIFRANCE_ETHICS_URL}>
                        Décret relatif à la déontologie — Légifrance
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Heures de déontologie et de non-discrimination à
                        identifier sur le justificatif.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={CCI_RENEWAL_URL}>
                        Renouvellement de carte professionnelle — CCI France
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Transmission des justificatifs et période de dépôt de
                        la demande.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={SERVICE_PUBLIC_URL}>
                        Carte professionnelle d’agent immobilier — Service-Public.fr
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Conditions de délivrance et de renouvellement de la
                        carte.
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
                      href: "/guides/contenus-obligatoires-formation-alur",
                      title: "Contenus obligatoires de la formation ALUR",
                      text: "Les six domaines admis et ce qui ne compte pas.",
                    },
                    {
                      href: "/guides/erreurs-renouvellement-carte-professionnelle",
                      title: "Erreurs au renouvellement de la carte professionnelle",
                      text: "Les 7 erreurs qui font rejeter le dossier CCI.",
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
                      Des attestations conformes, sans mauvaise surprise
                    </h2>
                    <p className="mt-3 leading-7 text-white/75">
                      Formation Loi ALUR 42 h + TRACFIN 3 h à 299&nbsp;€,
                      certifiée Qualiopi, en visioconférences. Chaque
                      participant reçoit une attestation nominative complète&nbsp;:
                      objectifs, contenu, durée et date de réalisation.
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
