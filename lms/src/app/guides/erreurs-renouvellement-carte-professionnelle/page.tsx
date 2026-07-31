import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  Clock3,
  ExternalLink,
  FileCheck2,
  XCircle,
  type LucideIcon,
} from "lucide-react";

const SITE_URL = "https://monpassformation.com";
const PAGE_PATH = "/guides/erreurs-renouvellement-carte-professionnelle";
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
  "Renouvellement carte professionnelle immobilier : les 7 erreurs qui font rejeter le dossier";
const description =
  "Renouvellement de la carte professionnelle immobilier : les 7 erreurs qui font rejeter le dossier CCI, les délais à respecter et la checklist avant dépôt.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    absolute: title,
  },
  description,
  keywords: [
    "renouvellement carte professionnelle immobilier erreurs",
    "dossier CCI carte professionnelle rejeté",
    "renouvellement carte agent immobilier délai",
    "justificatif formation continue CCI",
    "carte professionnelle immobilier validité 3 ans",
    "checklist renouvellement carte immobilier",
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
        alt: "Erreurs à éviter au renouvellement de la carte professionnelle immobilier",
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
      "Que se passe-t-il si la demande de renouvellement est déposée trop tard ?",
    answer:
      "La demande doit être présentée dans les deux mois précédant l’expiration de la carte. Une fois la carte expirée, le professionnel ne peut plus exercer légalement : toute négociation, entremise ou gestion sans carte valide constitue un exercice illégal de la profession. D’où l’importance de préparer le dossier plusieurs mois en amont.",
  },
  {
    question:
      "Peut-on régulariser des heures de formation manquantes avant de déposer ?",
    answer:
      "Oui, tant que les formations sont réalisées pendant le cycle de trois années consécutives concerné et avant le dépôt du dossier. Identifiez le volume manquant — y compris les heures de déontologie et de non-discrimination — et suivez les modules correspondants avant d’engager la formalité.",
  },
  {
    question: "Que faire en cas de rejet du dossier par la CCI ?",
    answer:
      "La CCI motive son refus : corrigez le point bloquant (heures, attestations, pièce manquante) et redéposez un dossier complet. Pendant ce temps, la carte arrivée à expiration ne permet plus d’exercer. En cas de désaccord, rapprochez-vous de la CCI pour connaître les voies de recours applicables.",
  },
  {
    question: "Quelle est la durée de validité de la carte professionnelle ?",
    answer:
      "La carte professionnelle est valable trois ans. C’est une évolution notable : avant la réforme issue de la loi ALUR, la validité était de dix ans. Le passage à trois ans rend le calendrier de formation continue et de renouvellement nettement plus fréquent qu’autrefois.",
  },
  {
    question:
      "Le justificatif de formation est-il la seule pièce du dossier de renouvellement ?",
    answer:
      "Non. La formation continue est une condition centrale, mais le dossier CCI comporte d’autres pièces et conditions, notamment liées à la garantie financière et à l’assurance responsabilité civile professionnelle selon l’activité. Consultez la liste actualisée publiée par CCI France avant de déposer.",
  },
  {
    question: "Quel délai de traitement prévoir pour le renouvellement ?",
    answer:
      "Les délais d’instruction varient selon les CCI et la complétude du dossier. Un dossier complet, déposé dès l’ouverture de la période — deux mois avant l’expiration — maximise les chances de recevoir la nouvelle carte sans interruption d’activité.",
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
          name: "Renouvellement de la carte professionnelle immobilier",
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
          item: "https://monpassformation.com/guides",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Erreurs au renouvellement de la carte professionnelle",
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
    icon: Clock3,
    value: "3 ans",
    label: "de validité",
    detail: "La carte professionnelle est valable trois ans — contre dix ans avant la réforme ALUR.",
  },
  {
    icon: CalendarDays,
    value: "2 mois",
    label: "avant l’expiration",
    detail: "La demande de renouvellement se présente dans les deux mois précédant l’expiration.",
  },
  {
    icon: XCircle,
    value: "7",
    label: "erreurs fréquentes",
    detail: "Les causes de rejet de dossier que ce guide vous aide à éviter.",
  },
];

const errors = [
  {
    title: "Erreur n° 1 — Attendre la dernière minute pour déposer",
    text: "La demande se présente dans les deux mois précédant l’expiration. Découvrir un blocage la veille de l’échéance, c’est risquer une interruption d’activité : sans carte valide, impossible d’exercer. Anticipez dès l’ouverture de la période.",
  },
  {
    title: "Erreur n° 2 — Ne pas atteindre les 42 heures",
    text: "42 heures sur trois années consécutives d’exercice, ou 14 heures par an : un volume insuffisant sur le cycle de référence est un motif de rejet direct. Faites le compte de vos heures attestées avant tout dépôt.",
  },
  {
    title: "Erreur n° 3 — Oublier les 4 heures de déontologie",
    text: "Par cycle de trois ans, au moins 2 heures de non-discrimination à l’accès au logement et 2 heures d’autres règles déontologiques sont exigées. Un dossier à 42 heures mais sans ces contenus reste incomplet.",
  },
  {
    title: "Erreur n° 4 — Présenter des formations hors domaines admis",
    text: "Seuls comptent les six domaines prévus par le décret : droit immobilier, économie du marché, pratiques commerciales du métier, déontologie, construction-habitation-urbanisme, transition énergétique. Les formations hors champ sont écartées du décompte.",
  },
  {
    title: "Erreur n° 5 — Négliger le lien direct avec l’activité",
    text: "Chaque formation doit correspondre à l’activité réellement exercée : transaction, gestion locative, syndic ou marchand de listes. Un programme déconnecté de la mention portée sur la carte fragilise le dossier.",
  },
  {
    title: "Erreur n° 6 — Transmettre des attestations incomplètes",
    text: "Chaque attestation doit mentionner objectifs, contenu, durée et date de réalisation — et être nominative. Un document sans durée, sans date ou au seul nom de l’agence peut être refusé.",
  },
  {
    title: "Erreur n° 7 — Oublier les autres pièces du dossier",
    text: "La formation continue est centrale, mais le renouvellement exige un dossier administratif complet, soumis à d’autres conditions et pièces. Vérifiez la liste actualisée de la CCI compétente avant le dépôt.",
  },
];

const planningSteps = [
  {
    title: "Vérifier la date d’expiration de la carte",
    text: "Repérez l’échéance exacte et fixez-vous une alerte au moins quatre mois avant : la période de dépôt s’ouvre deux mois avant l’expiration.",
  },
  {
    title: "Compter les heures attestées sur le cycle",
    text: "Additionnez les durées de vos attestations : vous devez atteindre 42 heures sur trois années consécutives, ou justifier de 14 heures par an.",
  },
  {
    title: "Isoler les 4 heures de déontologie",
    text: "Vérifiez que 2 h de non-discrimination à l’accès au logement et 2 h d’autres règles déontologiques sont clairement identifiables sur vos justificatifs.",
  },
  {
    title: "Contrôler la conformité de chaque attestation",
    text: "Objectifs, contenu, durée, date de réalisation, identité du bénéficiaire : exigez une correction de l’organisme si une mention manque.",
  },
  {
    title: "Vérifier domaines et lien direct avec l’activité",
    text: "Chaque formation doit relever d’un domaine admis et correspondre à l’activité couverte par votre carte. Écartez les heures non recevables du décompte.",
  },
  {
    title: "Compléter le dossier administratif et déposer tôt",
    text: "Rassemblez l’ensemble des pièces exigées par la CCI et déposez dès l’ouverture de la période de deux mois : un dossier complet et précoce évite toute interruption d’activité.",
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

export default function ErreursRenouvellementCarteProfessionnellePage() {
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
                    Erreurs au renouvellement de la carte professionnelle
                  </li>
                </ol>
              </nav>

              <div className="mt-9 max-w-4xl">
                <p className="inline-flex rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-brand-gold-pale">
                  Guide réglementaire 2026
                </p>
                <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                  Renouvellement de la carte professionnelle&nbsp;: les 7
                  erreurs qui font rejeter le dossier
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl">
                  Tous les trois ans, le même scénario se répète&nbsp;: des
                  dossiers rejetés pour des erreurs évitables — heures
                  insuffisantes, attestations incomplètes, dépôt tardif.
                  Passez en revue les sept pièges et la checklist avant de
                  déposer à la CCI.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#erreurs"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gold px-5 py-3.5 text-sm font-black text-brand-navy transition hover:bg-brand-gold-hover"
                  >
                    Voir les 7 erreurs
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
                    ["#delais", "Les délais à respecter"],
                    ["#erreurs", "Les 7 erreurs de rejet"],
                    ["#checklist", "Checklist avant dépôt"],
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
              <section id="delais" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Le calendrier
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy sm:text-4xl">
                  Les délais à respecter pour ne pas se retrouver sans carte
                </h2>
                <div className="mt-6 space-y-5 text-base leading-8 text-slate-700">
                  <p>
                    La carte professionnelle, délivrée par la CCI en
                    application de la loi Hoguet, est{" "}
                    <strong>valable trois ans</strong>. C’est un point
                    souvent mal connu des professionnels de longue date&nbsp;:
                    avant la réforme issue de la loi ALUR, la validité était
                    de dix ans. Le rythme actuel impose donc un renouvellement
                    — et un cycle de formation — bien plus fréquent.
                  </p>
                  <p>
                    Selon{" "}
                    <SourceLink href={CCI_RENEWAL_URL}>
                      CCI France
                    </SourceLink>
                    , la demande de renouvellement doit être réalisée{" "}
                    <strong>dans les deux mois précédant la date
                    d’expiration</strong> de la carte. Cette fenêtre est
                    courte&nbsp;: tout doit être prêt — formations effectuées,
                    attestations contrôlées, pièces rassemblées — avant son
                    ouverture.
                  </p>
                </div>
                <div className="mt-7 rounded-2xl border-l-4 border-brand-gold bg-white p-6 shadow-sm">
                  <div className="flex gap-4">
                    <CalendarDays className="mt-1 h-6 w-6 shrink-0 text-brand-gold-dark" aria-hidden />
                    <div>
                      <h3 className="font-black text-brand-navy">
                        Le bon réflexe&nbsp;: J-4 mois
                      </h3>
                      <p className="mt-2 leading-7 text-slate-700">
                        Programmez une alerte quatre mois avant l’expiration&nbsp;:
                        comptez vos heures, identifiez les manques éventuels et
                        suivez les modules nécessaires. À J-2 mois, vous
                        déposez un dossier complet dès l’ouverture de la
                        période.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="erreurs" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Causes de rejet
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Les 7 erreurs qui font rejeter le dossier CCI
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700">
                  La majorité des rejets tient à la formation continue&nbsp;:
                  volume, contenu ou justificatifs. Voici les sept erreurs les
                  plus fréquentes, et comment chacune s’évite.
                </p>
                <div className="mt-7 space-y-4">
                  {errors.map((error) => (
                    <div
                      key={error.title}
                      className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      <AlertTriangle
                        className="mt-1 h-6 w-6 shrink-0 text-brand-gold-dark"
                        aria-hidden
                      />
                      <div>
                        <h3 className="font-black text-brand-navy">
                          {error.title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">
                          {error.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-5 flex gap-3 rounded-xl bg-brand-navy/5 p-4 text-sm leading-6 text-slate-700">
                  <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-navy" aria-hidden />
                  Sur le volet justificatifs, notre guide détaille les{" "}
                  <Link
                    href="/guides/attestation-formation-alur-validite"
                    className="font-bold text-brand-navy underline decoration-brand-gold/60 decoration-2 underline-offset-4 transition hover:text-brand-navy-mid"
                  >
                    mentions obligatoires de l’attestation de formation ALUR
                  </Link>
                  .
                </p>
              </section>

              <section id="checklist" className="scroll-mt-8">
                <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold-dark">
                  Avant le dépôt
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy">
                  Checklist&nbsp;: un dossier irréprochable en 6 vérifications
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
                      <span className="inline-flex items-center gap-2">
                        <ClipboardCheck className="h-5 w-5" aria-hidden />
                        Envie de la procédure complète&nbsp;?
                      </span>
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">
                      Notre guide du renouvellement détaille la démarche pas à
                      pas, de la préparation des pièces au dépôt en ligne.
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
                  Renouvellement de la carte professionnelle&nbsp;: FAQ
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
                      <SourceLink href={CCI_RENEWAL_URL}>
                        Renouvellement de carte professionnelle — CCI France
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Période de dépôt, justificatifs exigés et accès à la
                        formalité en ligne.
                      </p>
                    </li>
                    <li>
                      <SourceLink href={LEGIFRANCE_DECREE_URL}>
                        Décret n°&nbsp;2016-173 du 18 février 2016 — Légifrance
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Volume de formation, domaines admis et mentions des
                        attestations.
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
                      <SourceLink href={SERVICE_PUBLIC_URL}>
                        Carte professionnelle d’agent immobilier — Service-Public.fr
                      </SourceLink>
                      <p className="mt-1 text-slate-500">
                        Validité de la carte et conditions d’exercice de la
                        profession.
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
                      href: "/guides/renouvellement-carte-professionnelle-immobilier",
                      title: "Renouvellement de la carte professionnelle",
                      text: "La procédure CCI complète, pas à pas.",
                    },
                    {
                      href: "/guides/attestation-formation-alur-validite",
                      title: "Attestation de formation ALUR et validité",
                      text: "Mentions obligatoires, conservation, contrôle.",
                    },
                    {
                      href: "/guides/formation-loi-alur-42-heures",
                      title: "Formation loi ALUR 42 heures : le guide complet",
                      text: "Durée, rythme, contenus et justificatifs.",
                    },
                    {
                      href: "/guides/carte-professionnelle-immobilier-prix-delais",
                      title: "Carte professionnelle immobilier : prix et délais",
                      text: "Coûts de la formalité et délais d’instruction.",
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
                      Arrivez au renouvellement avec un dossier complet
                    </h2>
                    <p className="mt-3 leading-7 text-white/75">
                      Formation Loi ALUR 42 h + TRACFIN 3 h à 299&nbsp;€,
                      certifiée Qualiopi, en visioconférences&nbsp;: volume,
                      déontologie et attestations conformes, pour un dossier
                      CCI sans mauvaise surprise.
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
