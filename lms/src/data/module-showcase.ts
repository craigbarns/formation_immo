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
    heroGradient: "from-[#0f2840] via-brand-navy to-[#1e3a5f]",
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
  deontologie: {
    badge: "🤝",
    headline: "Exercer avec intégrité — le socle éthique et légal du métier",
    subhead:
      "Code de déontologie, non-discrimination, conflits d'intérêts et mises en situation réelles : devenez l'agent que vos clients peuvent confier sans réserve.",
    outcomes: [
      "Décret 2015-1090 : 10 principes maîtrisés, sanctions comprises",
      "25 critères de discrimination — détection et prévention active",
      "Conflits d'intérêts : identifier, déclarer, se protéger",
      "Dilemmes éthiques : résolution par cas concrets",
    ],
    durationLabel: "~4 h",
    proofLine: [
      "Scripts d'entretien non-discriminants prêts à l'emploi",
      "Procédure CNTGI et recours disciplinaires expliqués",
      "Grilles de sélection locataire conformes Loi Alur",
    ],
    heroGradient: "from-[#1e1b4b] via-[#3730a3] to-[#4338ca]",
    lessonTeaser: {
      "non-discrimination": "25 critères, testing, scripts : la conformité comme réflexe.",
      "non-discrimination-pratique": "Distinguer discrimination directe, indirecte et systémique sur le terrain.",
      "code-deontologie": "Décret 2015-1090 : vos obligations, la CNTGI, les sanctions.",
      "ethique-pratique": "Conflits d'intérêts, RGPD, pratiques trompeuses : les bons réflexes.",
    },
  },
  "murs-fonds-commerce": {
    badge: "🏪",
    headline: "L'immobilier commercial, un marché à part — devenez-y incontournable",
    subhead:
      "Baux 3/6/9, cession de fonds, indemnité d'éviction, murs de boutique : 7h pour conseiller commerçants, bailleurs et investisseurs avec l'assurance d'un spécialiste.",
    outcomes: [
      "Bail commercial : statut, clauses et loyer maîtrisés de bout en bout",
      "Cession de fonds : procédure sécurisée, de l'évaluation à la publicité",
      "Indemnité d'éviction : savoir la calculer et la négocier",
      "Murs de boutique : rendement, fiscalité et montage adaptés",
    ],
    durationLabel: "~7 h",
    proofLine: [
      "Modèles d'actes : bail commercial, cession, comparatif des baux",
      "Cas pratiques chiffrés : loyers, éviction, rendements",
      "QCM final de 15 questions niveau pro",
    ],
    heroGradient: "from-[#1c1917] via-[#7c2d12] to-[#b45309]",
    lessonTeaser: {
      "bail-commercial": "L.145-1, 3/6/9, clauses, loyer : les fondamentaux qui protègent.",
      "cession-fonds": "Céder ou reprendre un fonds sans faux pas : procédure et délais.",
      "renouvellement-conge": "Congé, renouvellement, éviction : défendre les droits du preneur.",
      "murs-boutique": "Investir dans les murs : rendement, fiscalité, ERP.",
    },
  },
  "renovation-energetique": {
    badge: "🌞",
    headline: "La transition énergétique décide des prix — soyez celui qui l'explique",
    subhead:
      "DPE, interdictions de location, MaPrimeRénov', photovoltaïque : 7h pour transformer la contrainte réglementaire en argument de vente et de conseil.",
    outcomes: [
      "DPE et loi Climat & Résilience : calendrier et obligations maîtrisés",
      "Travaux : hiérarchiser isolation, ventilation, chauffage sans se tromper",
      "Aides : MaPrimeRénov', CEE, éco-PTZ et leurs cumuls, sans arnaques",
      "Photovoltaïque : rentabilité réelle et démarches sécurisées",
    ],
    durationLabel: "~7 h",
    proofLine: [
      "Cas chiffrés : passer de E à C, plan de financement complet",
      "Étude de rentabilité photovoltaïque 6 kWc pas à pas",
      "QCM final de 15 questions niveau pro",
    ],
    heroGradient: "from-[#052e16] via-[#15803d] to-[#65a30d]",
    lessonTeaser: {
      "dpe-cadre-reglementaire": "DPE opposable, interdictions de location, audit : ce qui change vos ventes.",
      "solutions-techniques": "Isoler, ventiler, chauffer : les bons travaux dans le bon ordre.",
      "aides-financement": "MaPrimeRénov', CEE, éco-PTZ : monter un plan d'aides sans se perdre.",
      "photovoltaique": "kWc, autoconsommation, Enedis : le solaire rentable et conforme.",
    },
  },
  "immobilier-ia": {
    badge: "🤖",
    headline: "L'IA ne remplacera pas les agents — elle remplacera les agents qui l'ignorent",
    subhead:
      "Prompts, annonces, analyse de documents, RGPD : 7h pour intégrer l'IA à votre quotidien d'agent — avec méthode et sans risque juridique.",
    outcomes: [
      "Une méthode de prompt réutilisable pour tout votre quotidien",
      "Annonces, prospection, réseaux sociaux : produire mieux, bien plus vite",
      "PV d'AG, baux, diagnostics : analyser des documents longs en minutes",
      "RGPD, AI Act, discrimination : utiliser l'IA sans se mettre en danger",
    ],
    durationLabel: "~7 h",
    proofLine: [
      "Cas concrets : annonce premium, PV d'AG de 40 pages, audit d'agence",
      "Charte IA d'agence en 8 points, prête à adopter",
      "QCM final de 15 questions niveau pro",
    ],
    heroGradient: "from-[#1e1b4b] via-[#5b21b6] to-[#8b5cf6]",
    lessonTeaser: {
      "comprendre-ia": "Ce que l'IA fait très bien, très mal — et la règle d'or du pro.",
      "rediger-vendre-ia": "La méthode CRTE : des prompts qui produisent VOS textes, en mieux.",
      "ia-transaction": "Estimation, documents, comptes-rendus : l'IA dans la vraie transaction.",
      "cadre-legal-ia": "RGPD, AI Act, loyauté des annonces : les lignes à ne pas franchir.",
    },
  },
};

export function getModuleShowcase(slug: string): ModuleShowcase | null {
  return MODULE_SHOWCASE[slug] ?? null;
}
