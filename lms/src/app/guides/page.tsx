import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Briefcase,
  Compass,
  Scale,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const SITE_URL = "https://monpassformation.com";
const PAGE_PATH = "/guides";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const COVER_URL = `${SITE_URL}/generated/fal/transaction/cover-immobilier.jpg`;

const title = "Guides formation immobilier | MonPassFormation";
const description =
  "Tous nos guides sur la formation loi ALUR, la carte professionnelle immobilier, la conformité et le métier d'agent : obligations, délais, prix et comparatifs.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    absolute: title,
  },
  description,
  keywords: [
    "guides formation immobilier",
    "formation loi ALUR",
    "carte professionnelle immobilier",
    "formation continue agent immobilier",
    "loi Hoguet",
    "TRACFIN immobilier",
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  category: "Guides des professionnels de l’immobilier",
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
    type: "website",
    images: [
      {
        url: COVER_URL,
        width: 1024,
        height: 576,
        alt: "Guides de la formation immobilier — MonPassFormation",
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

type Guide = {
  href: string;
  title: string;
  excerpt: string;
};

type GuideCategory = {
  icon: LucideIcon;
  title: string;
  description: string;
  guides: Guide[];
};

const guideCategories: GuideCategory[] = [
  {
    icon: Scale,
    title: "Loi ALUR & obligations",
    description:
      "Le cadre réglementaire de la formation continue et ses justificatifs.",
    guides: [
      {
        href: "/guides/formation-loi-alur-42-heures",
        title: "Formation loi ALUR 42 heures : guide 2026",
        excerpt:
          "Durée, personnes concernées et contenus obligatoires des 42 heures.",
      },
      {
        href: "/guides/formation-loi-alur-obligatoire",
        title: "La formation loi ALUR est-elle obligatoire ?",
        excerpt:
          "Ce que dit la loi et les risques en cas de manquement.",
      },
      {
        href: "/guides/qui-doit-suivre-formation-42-heures",
        title: "Qui doit suivre les 42 heures de formation ?",
        excerpt:
          "Titulaires, dirigeants et collaborateurs habilités : qui est concerné.",
      },
      {
        href: "/guides/contenus-obligatoires-formation-alur",
        title: "Contenus obligatoires de la formation ALUR",
        excerpt:
          "Thèmes recevables, déontologie et non-discrimination.",
      },
      {
        href: "/guides/attestation-formation-alur-validite",
        title: "Attestation de formation ALUR : validité et mentions",
        excerpt:
          "Les mentions obligatoires et la durée de validité du justificatif.",
      },
      {
        href: "/guides/renouvellement-carte-professionnelle-immobilier",
        title: "Renouvellement de la carte professionnelle immobilier",
        excerpt:
          "Délai de deux mois, 42 heures à justifier et dossier CCI.",
      },
      {
        href: "/guides/erreurs-renouvellement-carte-professionnelle",
        title: "7 erreurs qui font rejeter votre renouvellement de carte",
        excerpt:
          "Les pièges à éviter pour un dossier de renouvellement accepté.",
      },
    ],
  },
  {
    icon: Briefcase,
    title: "Carte professionnelle & carrière",
    description:
      "Obtenir la carte, passer l'examen CCI et construire sa carrière.",
    guides: [
      {
        href: "/guides/carte-professionnelle-immobilier-prix-delais",
        title: "Carte professionnelle immobilier : prix et délais",
        excerpt:
          "Coût de la demande, délais d'instruction et étapes de la formalité.",
      },
      {
        href: "/guides/examen-carte-professionnelle-cci",
        title: "Examen de capacité immobilière CCI : se préparer",
        excerpt:
          "Épreuves, programme et méthode de préparation de l'examen.",
      },
      {
        href: "/guides/devenir-agent-immobilier-sans-diplome",
        title: "Devenir agent immobilier sans diplôme",
        excerpt:
          "Les voies possibles pour exercer sans diplôme initial.",
      },
      {
        href: "/guides/negociateur-immobilier-statut-salaire",
        title: "Négociateur immobilier : statut et salaire",
        excerpt:
          "Salarié ou indépendant, rémunération et évolutions du métier.",
      },
      {
        href: "/guides/syndic-copropriete-carte-g-formation",
        title: "Syndic de copropriété : carte et formation",
        excerpt:
          "Carte G, conditions d'exercice et formation continue du syndic.",
      },
    ],
  },
  {
    icon: ShieldCheck,
    title: "Conformité & thématiques",
    description:
      "TRACFIN, loi Hoguet, DPE et sujets juridiques du quotidien.",
    guides: [
      {
        href: "/guides/tracfin-obligations-agent-immobilier",
        title: "TRACFIN : obligations de l'agent immobilier",
        excerpt:
          "Vigilance, déclaration de soupçon et bonnes pratiques anti-blanchiment.",
      },
      {
        href: "/guides/dpe-passoires-thermiques-location-interdite",
        title: "Passoires thermiques : calendrier des interdictions",
        excerpt:
          "DPE, décence énergétique et dates d'interdiction à la location.",
      },
      {
        href: "/guides/murs-fonds-commerce-differences",
        title: "Murs ou fonds de commerce : les différences",
        excerpt:
          "Deux opérations distinctes, deux cadres juridiques à maîtriser.",
      },
      {
        href: "/guides/immobilier-intelligence-artificielle",
        title: "L'IA dans l'immobilier : usages concrets",
        excerpt:
          "Estimation, rédaction, prospection : ce que l'IA change au métier.",
      },
      {
        href: "/guides/loi-hoguet-guide-complet",
        title: "Loi Hoguet : le guide complet",
        excerpt:
          "Le texte fondateur qui encadre l'activité immobilière, expliqué.",
      },
    ],
  },
  {
    icon: Compass,
    title: "Guides pratiques & comparatifs",
    description:
      "Choisir sa formation, la financer et affiner sa pratique commerciale.",
    guides: [
      {
        href: "/guides/formation-immobilier-en-ligne-vs-presentiel",
        title: "Formation immobilier : en ligne ou présentiel ?",
        excerpt:
          "Les avantages et limites de chaque modalité, comparés.",
      },
      {
        href: "/guides/financement-formation-immobilier-opco-cpf",
        title: "Financer sa formation immobilier : OPCO et CPF",
        excerpt:
          "Les dispositifs de financement mobilisables selon votre statut.",
      },
      {
        href: "/guides/formation-loi-alur-prix-comparatif",
        title: "Formation loi ALUR : comparer les prix",
        excerpt:
          "Ce qui fait varier les tarifs et comment lire une offre.",
      },
      {
        href: "/guides/mandat-exclusif-vs-mandat-simple",
        title: "Mandat exclusif ou simple : le comparatif",
        excerpt:
          "Périmètre, engagement et intérêts de chaque type de mandat.",
      },
      {
        href: "/guides/estimation-immobiliere-methodes",
        title: "Les méthodes d'estimation immobilière",
        excerpt:
          "Comparaison, capitalisation et autres méthodes d'avis de valeur.",
      },
    ],
  },
];

const allGuides = guideCategories.flatMap(({ guides }) => guides);

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${PAGE_URL}#collection`,
      name: title,
      description,
      url: PAGE_URL,
      inLanguage: "fr-FR",
      isPartOf: {
        "@type": "WebSite",
        name: "MonPassFormation",
        url: SITE_URL,
      },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: allGuides.length,
        itemListElement: allGuides.map((guide, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${SITE_URL}${guide.href}`,
          name: guide.title,
        })),
      },
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
          item: PAGE_URL,
        },
      ],
    },
  ],
};

export default function GuidesPage() {
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
                  <li aria-current="page" className="font-semibold text-white">
                    Guides
                  </li>
                </ol>
              </nav>

              <div className="mt-9 max-w-4xl">
                <p className="inline-flex rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-brand-gold-pale">
                  {allGuides.length} guides pratiques 2026
                </p>
                <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                  Guides formation immobilier&nbsp;: ALUR, carte professionnelle et métier
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80 sm:text-xl">
                  Toutes les réponses aux questions des professionnels de
                  l’immobilier, réunies en un seul endroit&nbsp;: obligations de
                  formation, formalités de la carte professionnelle et sujets
                  de conformité.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="#categories"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gold px-5 py-3.5 text-sm font-black text-brand-navy transition hover:bg-brand-gold-hover"
                  >
                    Explorer les guides
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                  <Link
                    href="/guides/formation-loi-alur-42-heures"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    Commencer par les 42 heures
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section
            aria-label="Présentation des guides"
            className="mx-auto max-w-7xl px-5 pt-14 sm:px-6 lg:px-8"
          >
            <div className="max-w-3xl space-y-5 text-base leading-8 text-slate-700">
              <p>
                La formation continue est au cœur du métier immobilier&nbsp;:
                elle conditionne le renouvellement de la carte professionnelle,
                encadre les pratiques commerciales et oblige chaque
                professionnel à rester à jour sur un cadre juridique qui évolue
                en permanence. Entre la loi ALUR et ses 42 heures sur trois
                ans, les exigences de la CCI, la loi Hoguet, les obligations
                TRACFIN ou encore le calendrier des passoires thermiques, il
                n’est pas toujours simple de savoir ce qui s’applique
                vraiment à sa situation.
              </p>
              <p>
                Cette bibliothèque de guides a été conçue pour répondre à ces
                questions de manière claire et sourcée. Vous y trouverez le
                décryptage des obligations réglementaires, les étapes des
                formalités auprès de la CCI, des comparatifs pour choisir et
                financer votre formation, ainsi que des analyses des
                thématiques qui transforment le métier. Chaque guide s’appuie
                sur les textes officiels et indique sa date de vérification.
                Que vous prépariez votre première carte professionnelle, un
                renouvellement ou simplement la mise à jour de vos
                connaissances, choisissez une catégorie ci-dessous et
                avancez pas à pas.
              </p>
            </div>
          </section>

          <div
            id="categories"
            className="mx-auto max-w-7xl scroll-mt-8 space-y-14 px-5 py-14 sm:px-6 sm:py-20 lg:px-8"
          >
            {guideCategories.map((category) => {
              const Icon = category.icon;

              return (
                <section key={category.title} aria-label={category.title}>
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-gold/15 text-brand-navy">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <div>
                      <h2 className="text-2xl font-black tracking-tight text-brand-navy sm:text-3xl">
                        {category.title}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {category.guides.map((guide) => (
                      <li key={guide.href}>
                        <Link
                          href={guide.href}
                          className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-gold/50 hover:shadow-md"
                        >
                          <div>
                            <h3 className="font-black leading-snug text-brand-navy transition group-hover:text-brand-navy-mid">
                              {guide.title}
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-slate-600">
                              {guide.excerpt}
                            </p>
                          </div>
                          <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-brand-gold-dark">
                            Lire le guide
                            <ArrowRight
                              className="h-4 w-4 transition group-hover:translate-x-1"
                              aria-hidden
                            />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}

            <section className="overflow-hidden rounded-3xl bg-brand-navy p-7 text-white sm:p-10">
              <div className="flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
                <div className="max-w-2xl">
                  <BookOpen className="h-8 w-8 text-brand-gold" aria-hidden />
                  <h2 className="mt-5 text-2xl font-black sm:text-3xl">
                    Passer de la lecture à la formation
                  </h2>
                  <p className="mt-3 leading-7 text-white/75">
                    Découvrez le parcours de formation immobilière loi ALUR,
                    ses modules et ses modalités, pour construire un cycle de
                    formation conforme aux exigences du renouvellement.
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
