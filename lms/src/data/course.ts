export type Lesson = {
  slug: string;
  title: string;
  /** Chemin relatif à la racine formation-immobiliere/ */
  scriptFile: string;
  /** URL iframe (YouTube embed, Vimeo, Mux…) — à remplir après production vidéo */
  videoUrl: string | null;
  /** Narration audio MP3 (ex. généré avec Mistral Voxtral) — chemin dans `lms/public/` */
  audioUrl?: string | null;
  /**
   * Parcours interactif maison (vidéo → choix → QCM) défini dans `src/data/interactive-scenarios.ts`.
   */
  interactiveScenarioId?: string;
};

export type CourseModule = {
  slug: string;
  title: string;
  summary: string;
  lessons: Lesson[];
};

export const COURSE: CourseModule[] = [
  {
    slug: "juridique",
    title: "Module 1 — Juridique & conformité",
    summary: "ALUR, compromis, diagnostics, mandats, copropriété.",
    lessons: [
      {
        slug: "loi-alur",
        title: "Loi ALUR — panorama 2026",
        scriptFile: "module1-juridique/scripts/01-loi-alur-2026.md",
        videoUrl: null,
        audioUrl: "/audio/01-loi-alur-2026.mp3",
        interactiveScenarioId: "alur-conformite-360-demo",
      },
      {
        slug: "parcours-interactif",
        title: "Parcours interactif — transparence des honoraires",
        scriptFile: "module1-juridique/scripts/06-parcours-interactif-transparence.md",
        videoUrl: null,
        audioUrl: "/audio/06-parcours-interactif-transparence.mp3",
        interactiveScenarioId: "honoraires-alur-demo",
      },
      {
        slug: "compromis",
        title: "Compromis de vente",
        scriptFile: "module1-juridique/scripts/02-compromis-vente.md",
        videoUrl: null,
        audioUrl: "/audio/02-compromis-vente.mp3",
      },
      {
        slug: "diagnostics",
        title: "Diagnostics immobiliers",
        scriptFile: "module1-juridique/scripts/03-diagnostics-immobiliers.md",
        videoUrl: null,
        audioUrl: "/audio/03-diagnostics-immobiliers.mp3",
      },
      {
        slug: "mandats",
        title: "Mandats & stratégie",
        scriptFile: "module1-juridique/scripts/04-mandats-strategie.md",
        videoUrl: null,
        audioUrl: "/audio/04-mandats-strategie.mp3",
      },
      {
        slug: "copropriete",
        title: "Copropriété & location",
        scriptFile: "module1-juridique/scripts/05-copropriete-location.md",
        videoUrl: null,
        audioUrl: "/audio/05-copropriete-location.mp3",
      },
    ],
  },
  {
    slug: "transaction",
    title: "Module 2 — Transaction & négociation",
    summary: "Estimation, prospection, négociation, CRM.",
    lessons: [
      {
        slug: "estimation",
        title: "Estimation immobilière",
        scriptFile: "module2-transaction/scripts/01-estimation-immobiliere.md",
        videoUrl: null,
        audioUrl: "/audio/01-estimation-immobiliere.mp3",
        interactiveScenarioId: "estimation-negociation-demo",
      },
      {
        slug: "prospection",
        title: "Prospection & scripts",
        scriptFile: "module2-transaction/scripts/02-prospection-scripts.md",
        videoUrl: null,
        audioUrl: "/audio/02-prospection-scripts.mp3",
      },
      {
        slug: "negociation-mandat",
        title: "Négociation du mandat",
        scriptFile: "module2-transaction/scripts/03-negociation-mandat.md",
        videoUrl: null,
        audioUrl: "/audio/03-negociation-mandat.mp3",
      },
      {
        slug: "negociation-avancee",
        title: "Négociation avancée",
        scriptFile: "module2-transaction/scripts/04-techniques-negociation-avancees.md",
        videoUrl: null,
        audioUrl: "/audio/04-techniques-negociation-avancees.mp3",
      },
      {
        slug: "crm",
        title: "CRM & fidélisation",
        scriptFile: "module2-transaction/scripts/05-crm-fidelisation.md",
        videoUrl: null,
        audioUrl: "/audio/05-crm-fidelisation.mp3",
      },
    ],
  },
  {
    slug: "financement",
    title: "Module 3 — Financement & fiscalité",
    summary: "Crédit, fiscalité, rentabilité, dispositifs, assurances.",
    lessons: [
      {
        slug: "credit",
        title: "Crédit immobilier 2026",
        scriptFile: "module3-financement/scripts/script01-credit-immobilier-2026.md",
        videoUrl: null,
        audioUrl: "/audio/script01-credit-immobilier-2026.mp3",
        interactiveScenarioId: "credit-structuration-demo",
      },
      {
        slug: "fiscalite",
        title: "Fiscalité immobilière",
        scriptFile: "module3-financement/scripts/script02-fiscalite-immobiliere.md",
        videoUrl: null,
        audioUrl: "/audio/script02-fiscalite-immobiliere.mp3",
      },
      {
        slug: "rentabilite",
        title: "Calcul de rentabilité",
        scriptFile: "module3-financement/scripts/script03-calcul-rentabilite.md",
        videoUrl: null,
        audioUrl: "/audio/script03-calcul-rentabilite.mp3",
        interactiveScenarioId: "rentabilite-investisseur-demo",
      },
      {
        slug: "dispositifs",
        title: "Dispositifs fiscaux",
        scriptFile: "module3-financement/scripts/script04-dispositifs-fiscaux.md",
        videoUrl: null,
        audioUrl: "/audio/script04-dispositifs-fiscaux.mp3",
      },
      {
        slug: "assurances",
        title: "Assurances immobilières",
        scriptFile: "module3-financement/scripts/script05-assurances-immobilieres.md",
        videoUrl: null,
        audioUrl: "/audio/script05-assurances-immobilieres.mp3",
      },
    ],
  },
  {
    slug: "marketing",
    title: "Module 4 — Marketing digital",
    summary: "Photos, annonces, portails, réseaux, SEO.",
    lessons: [
      {
        slug: "photos",
        title: "Photos immobilières pro",
        scriptFile: "module4-marketing/scripts/01-photos-immobilieres-secrets-pros.md",
        videoUrl: null,
        audioUrl: "/audio/01-photos-immobilieres-secrets-pros.mp3",
      },
      {
        slug: "annonces",
        title: "Annonces qui vendent",
        scriptFile: "module4-marketing/scripts/02-rediger-annonces-qui-vendent.md",
        videoUrl: null,
        audioUrl: "/audio/02-rediger-annonces-qui-vendent.mp3",
        interactiveScenarioId: "annonce-parfaite-demo",
      },
      {
        slug: "portails",
        title: "SeLoger & Leboncoin",
        scriptFile: "module4-marketing/scripts/03-maitriser-seloger-leboncoin.md",
        videoUrl: null,
        audioUrl: "/audio/03-maitriser-seloger-leboncoin.mp3",
      },
      {
        slug: "reseaux",
        title: "Réseaux sociaux 2026",
        scriptFile: "module4-marketing/scripts/04-reseaux-sociaux-strategie-2026.md",
        videoUrl: null,
        audioUrl: "/audio/04-reseaux-sociaux-strategie-2026.mp3",
      },
      {
        slug: "seo",
        title: "SEO immobilier Google",
        scriptFile: "module4-marketing/scripts/05-seo-immobilier-google.md",
        videoUrl: null,
        audioUrl: "/audio/05-seo-immobilier-google.mp3",
      },
    ],
  },
  {
    slug: "terrain",
    title: "Module 5 — Visite, closing & fidélisation",
    summary: "Visites, argumentaire, closing, promesse, acte, post-vente.",
    lessons: [
      {
        slug: "visite",
        title: "Conduire une visite pro",
        scriptFile: "module5-terrain/scripts/01-conduire-visite-pro.md",
        videoUrl: null,
        audioUrl: "/audio/01-conduire-visite-pro.mp3",
        interactiveScenarioId: "visite-closing-demo",
      },
      {
        slug: "argumentaire",
        title: "Argumentaire qui convertit",
        scriptFile: "module5-terrain/scripts/02-argumentaire-convertit.md",
        videoUrl: null,
        audioUrl: "/audio/02-argumentaire-convertit.mp3",
      },
      {
        slug: "closing",
        title: "Closing avancé",
        scriptFile: "module5-terrain/scripts/03-techniques-closing-avancees.md",
        videoUrl: null,
        audioUrl: "/audio/03-techniques-closing-avancees.mp3",
      },
      {
        slug: "promesse",
        title: "Promesse & acte authentique",
        scriptFile: "module5-terrain/scripts/04-promesse-acte-authentique.md",
        videoUrl: null,
        audioUrl: "/audio/04-promesse-acte-authentique.mp3",
      },
      {
        slug: "fidelisation",
        title: "Fidélisation & recommandation",
        scriptFile: "module5-terrain/scripts/05-fidelisation-recommandation.md",
        videoUrl: null,
        audioUrl: "/audio/05-fidelisation-recommandation.mp3",
      },
    ],
  },
];

export function getLesson(moduleSlug: string, lessonSlug: string) {
  const mod = COURSE.find((m) => m.slug === moduleSlug);
  if (!mod) return null;
  const lesson = mod.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return null;
  return { module: mod, lesson };
}

export function lessonId(moduleSlug: string, lessonSlug: string) {
  return `${moduleSlug}/${lessonSlug}`;
}

export function getPrevNext(moduleSlug: string, lessonSlug: string) {
  const modIndex = COURSE.findIndex((m) => m.slug === moduleSlug);
  if (modIndex < 0) return null;
  const mod = COURSE[modIndex];
  const lIndex = mod.lessons.findIndex((l) => l.slug === lessonSlug);
  if (lIndex < 0) return null;

  let prev: { href: string; label: string } | null = null;
  if (lIndex > 0) {
    const l = mod.lessons[lIndex - 1];
    prev = { href: `/formation/${mod.slug}/${l.slug}`, label: `← ${l.title}` };
  } else if (modIndex > 0) {
    const pm = COURSE[modIndex - 1];
    const l = pm.lessons[pm.lessons.length - 1];
    prev = { href: `/formation/${pm.slug}/${l.slug}`, label: `← ${l.title}` };
  }

  let next: { href: string; label: string } | null = null;
  if (lIndex < mod.lessons.length - 1) {
    const l = mod.lessons[lIndex + 1];
    next = { href: `/formation/${mod.slug}/${l.slug}`, label: `${l.title} →` };
  } else if (modIndex < COURSE.length - 1) {
    const nm = COURSE[modIndex + 1];
    const l = nm.lessons[0];
    next = { href: `/formation/${nm.slug}/${l.slug}`, label: `${l.title} →` };
  }

  return { prev, next };
}
