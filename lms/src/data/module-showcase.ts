/**
 * Contenus « vitrine » par module — expérience premium & argumentaire commercial.
 * Les titres de leçons restent dans `course.ts` ; les accroches ci-dessous sont des sous-titres pédagogiques.
 */

export type ModuleShowcase = {
  /** Accroche principale (above the fold) */
  headline: string;
  /** Promesse / sous-titre */
  subhead: string;
  /** 4 bénéfices mesurables ou émotionnels */
  outcomes: [string, string, string, string];
  /** Durée indicative affichée */
  durationLabel: string;
  /** 3 preuves de crédibilité courtes */
  proofLine: [string, string, string];
  /** Dégradé Tailwind pour le hero (from / via / to) */
  heroGradient: string;
  /** Emoji ou caractère pour le badge module */
  badge: string;
  /** Accroche par slug de leçon */
  lessonTeaser: Record<string, string>;
};

export const MODULE_SHOWCASE: Record<string, ModuleShowcase> = {
  juridique: {
    badge: "⚖️",
    headline: "Le droit immobilier comme levier commercial — pas comme frein",
    subhead:
      "Anticipez les risques, sécurisez vos mandats et parlez avec la précision d’un professionnel face aux clients et aux confrères.",
    outcomes: [
      "Décrypter l’ALUR et l’affichage des honoraires sans erreur",
      "Piloter compromis, diagnostics et clauses jusqu’à la signature",
      "Structurer vos mandats pour protéger l’agence et le client",
      "Maîtriser copropriété & location pour répondre en expert",
    ],
    durationLabel: "~9 h de contenu",
    proofLine: [
      "Scénarios interactifs conformité & honoraires",
      "Scripts prêts pour vos rendez-vous clients",
      "Lexique juridique vulgarisé pour vendre la valeur de votre conseil",
    ],
    heroGradient: "from-[#0f2840] via-[#1a3a5c] to-[#1e3a5f]",
    lessonTeaser: {
      "loi-alur": "Cadre 2026 : ce qui vous concerne au quotidien en vitrine et en mandat.",
      "parcours-interactif": "Mettez-vous en situation : transparence des honoraires sans friction.",
      compromis: "Chaque clause expliquée pour rassurer vendeurs et acquéreurs.",
      diagnostics: "Lire un dossier technique comme un acheteur averti — et comme un pro.",
      mandats: "Mandat simple, exclusif, stratégie de prix : argumentaire inclus.",
      copropriete: "Syndic, charges, travaux : les réponses qui ferment la vente.",
    },
  },
  transaction: {
    badge: "📈",
    headline: "Du premier contact à la mandat signé — méthode et closing",
    subhead:
      "Estimez avec justesse, prospectez sans subir la rejection, et négociez des mandats rentables avec un CRM qui travaille pour vous.",
    outcomes: [
      "Méthodes d’estimation crédibles (et défendables face au client)",
      "Scripts de prospection téléphonique & terrain qui convertissent",
      "Négociation du mandat : prix, durée, exclusivité",
      "Techniques avancées + CRM pour ne perdre aucun lead",
    ],
    durationLabel: "~8 h",
    proofLine: [
      "Parcours interactif estimation → négociation",
      "Grilles et scripts téléchargeables dans les leçons",
      "Ton adapté terrain Île-de-France & marchés tendus",
    ],
    heroGradient: "from-[#172554] via-[#2563eb] to-[#1d4ed8]",
    lessonTeaser: {
      estimation: "Valoriser un bien sans surpromettre — et justifier chaque chiffre.",
      prospection: "Relances, accroches, objections : la prospection devient un jeu de rôle maîtrisé.",
      "negociation-mandat": "Transformez l’entretien en signature : mandat exclusif inclus.",
      "negociation-avancee": "Ancrage, silence, concessions : la boîte à outils du closer.",
      crm: "Pipeline, relances, fidélisation : votre carnet d’adresses devient un actif.",
    },
  },
  financement: {
    badge: "💶",
    headline: "Crédit, fiscalité, rentabilité : parlez finance comme un banquier (sans l’être)",
    subhead:
      "Structurez les dossiers clients, expliquez les leviers fiscaux avec clarté et sécurisez les investisseurs grâce à des calculs irréprochables.",
    outcomes: [
      "Crédit 2026 : taux, assurance, négociation avec les banques",
      "Fiscalité immobilière sans jargon inutile",
      "Rentabilité brute / nette : tableaux et cas réels",
      "Dispositifs & assurances : conseiller sans sur-promettre",
    ],
    durationLabel: "~9 h",
    proofLine: [
      "Simulateurs reliés à ce module (parcours Outils)",
      "Scénarios crédit & investisseur interactifs",
      "Fiches comparatives régimes fiscaux dans Supports visuels",
    ],
    heroGradient: "from-[#064e3b] via-[#059669] to-[#047857]",
    lessonTeaser: {
      credit: "Taux, durée, apport : le discours qui rassure l’emprunteur.",
      fiscalite: "IR, LMNP, micro-régimes : quoi dire… et quoi éviter.",
      rentabilite: "Calculs que vos clients peuvent refaire chez eux — transparence totale.",
      dispositifs: "Pinel, Denormandie, défiscalisation : le bon niveau de détail.",
      assurances: "Emprunteur, PNO, garanties : la vente croisée éthique.",
    },
  },
  marketing: {
    badge: "✨",
    headline: "Visibilité, désir, conversion — l’annonce comme produit",
    subhead:
      "Photos qui arrêtent le scroll, annonces qui qualifient les leads, portails et SEO travaillés comme des canaux d’acquisition.",
    outcomes: [
      "Shooting & cadrage : standards pros sans studio",
      "Copywriting immobilier : titres, corps, appels à l’action",
      "SeLoger & Leboncoin : algorithmes et mises en avant",
      "Réseaux + SEO local : être trouvé au bon moment",
    ],
    durationLabel: "~8 h",
    proofLine: [
      "Parcours interactif « annonce parfaite »",
      "Checklists visuelles dans Supports visuels",
      "Compatible avec votre production avatar / vidéo",
    ],
    heroGradient: "from-[#4c1d95] via-[#7c3aed] to-[#6d28d9]",
    lessonTeaser: {
      photos: "Lumière, grand-angle, retouche : le pack qui fait cliquer.",
      annonces: "Structure AIDA adaptée à l’immobilier résidentiel.",
      portails: "Budget, visibilité, leads : optimiser chaque euro média.",
      reseaux: "Stories, reels, témoignages : calendrier éditorial réaliste.",
      seo: "Mots-clés ville / quartier : être premier sans spam",
    },
  },
  terrain: {
    badge: "🎯",
    headline: "Visite, closing, fidélisation — là où se joue la commission",
    subhead:
      "Transformez chaque visite en expérience mémorable, concluez sans brusquer et transformez vos clients en ambassadeurs.",
    outcomes: [
      "Conduite de visite scénarisée (préparation → clôture)",
      "Argumentaire émotionnel + rationnel qui convertit",
      "Techniques de closing avancées sans pression toxique",
      "Promesse à l’acte + fidélisation & recommandations",
    ],
    durationLabel: "~8 h",
    proofLine: [
      "Parcours interactif visite & objections",
      "Scripts de clôture et relances post-visite",
      "Aligné sur les meilleures pratiques terrain 2026",
    ],
    heroGradient: "from-[#7f1d1d] via-[#dc2626] to-[#b91c1c]",
    lessonTeaser: {
      visite: "Chorégraphie, silence, questions : la visite qui vend.",
      argumentaire: "Features → bénéfices → preuves : la structure gagnante.",
      closing: "Urgence positive, alternatives, signature sans friction.",
      promesse: "Du compromis à l’acte : ce que doit savoir votre client.",
      fidelisation: "Recommandations, avis Google, base active : la machine à mandats.",
    },
  },
};

export function getModuleShowcase(slug: string): ModuleShowcase | null {
  return MODULE_SHOWCASE[slug] ?? null;
}
