export type Difficulty = "debutant" | "intermediaire" | "avance";

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
  /** Durée estimée en minutes (narration + lecture + exercices + quiz) */
  duration: number;
  /** Objectifs pédagogiques de la leçon */
  objectives: string[];
  /** Niveau de difficulté */
  difficulty: Difficulty;
};

export type CourseModule = {
  slug: string;
  title: string;
  /** Résumé court (affiché dans les cards) */
  summary: string;
  /** Description longue (affichée sur la page module) */
  description: string;
  lessons: Lesson[];
};

// ─── Helpers durée ────────────────────────────────────────────────────────────
export function getTotalCourseDurationMin(): number {
  return COURSE.reduce(
    (total, mod) => total + mod.lessons.reduce((acc, l) => acc + l.duration, 0),
    0
  );
}

export function getModuleDurationMin(moduleSlug: string): number {
  const mod = COURSE.find((m) => m.slug === moduleSlug);
  return mod ? mod.lessons.reduce((acc, l) => acc + l.duration, 0) : 0;
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h${m.toString().padStart(2, "0")}`;
}

// ─── Cours (36 leçons — 42h total) ───────────────────────────────────────────
// Répartition : M1 9h (540) · M2 7h (420) · M3 9h (540) · M4 7h (420) · M5 10h (600)  =  2520 min = 42h
export const COURSE: CourseModule[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // MODULE 1 — JURIDIQUE & CONFORMITÉ  (540 min = 9h)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: "juridique",
    title: "Module 1 — Juridique & conformité",
    summary: "ALUR 2026, compromis, diagnostics, mandats, copropriété.",
    description:
      "Maîtrisez tout le cadre légal de votre métier : obligations ALUR, rédaction sécurisée du compromis, lecture des diagnostics, stratégie mandats et gestion de la copropriété. Ce module est la colonne vertébrale juridique de votre pratique quotidienne.",
    lessons: [
      {
        slug: "loi-alur",
        title: "Loi ALUR — panorama 2026",
        scriptFile: "module1-juridique/scripts/01-loi-alur-2026.md",
        videoUrl: null,
        audioUrl: "/audio/01-loi-alur-2026.mp3",
        interactiveScenarioId: "alur-conformite-360-demo",
        duration: 75,
        difficulty: "intermediaire",
        objectives: [
          "Maîtriser les obligations ALUR 2026 applicables dès maintenant",
          "Identifier les sanctions encourues en cas de non-conformité",
          "Appliquer les nouvelles règles DPE à vos mandats",
          "Afficher vos honoraires en toute légalité",
        ],
      },
      {
        slug: "compromis",
        title: "Compromis de vente",
        scriptFile: "module1-juridique/scripts/02-compromis-vente.md",
        videoUrl: null,
        audioUrl: "/audio/02-compromis-vente.mp3",
        duration: 75,
        difficulty: "avance",
        objectives: [
          "Rédiger un compromis conforme sans risque de nullité",
          "Sécuriser les 7 conditions suspensives indispensables",
          "Gérer le délai de rétractation de 10 jours SRU (acquéreur particulier)",
          "Éviter les 5 erreurs qui font capoter une vente",
        ],
      },
      {
        slug: "diagnostics",
        title: "Diagnostics immobiliers",
        scriptFile: "module1-juridique/scripts/03-diagnostics-immobiliers.md",
        videoUrl: null,
        audioUrl: "/audio/03-diagnostics-immobiliers.mp3",
        duration: 60,
        difficulty: "intermediaire",
        objectives: [
          "Lire et interpréter les 9 diagnostics obligatoires en 2026",
          "Identifier les diagnostics selon l'âge et la nature du bien",
          "Conseiller vendeur et acquéreur sur les implications",
          "Gérer les délais de validité et les renouvellements",
        ],
      },
      {
        slug: "mandats",
        title: "Mandats & stratégie",
        scriptFile: "module1-juridique/scripts/04-mandats-strategie.md",
        videoUrl: null,
        audioUrl: "/audio/04-mandats-strategie.mp3",
        duration: 60,
        difficulty: "avance",
        objectives: [
          "Rédiger un mandat exclusif juridiquement béton",
          "Fixer et afficher vos honoraires conformes ALUR",
          "Défendre votre exclusivité face aux remises en cause",
          "Optimiser votre portefeuille mandats par zone",
        ],
      },
      {
        slug: "copropriete",
        title: "Copropriété & location",
        scriptFile: "module1-juridique/scripts/05-copropriete-location.md",
        videoUrl: null,
        audioUrl: "/audio/05-copropriete-location.mp3",
        duration: 60,
        difficulty: "intermediaire",
        objectives: [
          "Lire et synthétiser un règlement de copropriété",
          "Expliquer les charges et travaux votés aux acquéreurs",
          "Gérer les locations (Pinel, meublé) en copropriété",
          "Anticiper les litiges lors d'une transaction",
        ],
      },
      {
        slug: "parcours-interactif",
        title: "Parcours interactif — transparence des honoraires",
        scriptFile: "module1-juridique/scripts/06-parcours-interactif-transparence.md",
        videoUrl: null,
        audioUrl: "/audio/06-parcours-interactif-transparence.mp3",
        interactiveScenarioId: "honoraires-alur-demo",
        duration: 45,
        difficulty: "avance",
        objectives: [
          "Appliquer les règles ALUR dans un cas réel complexe",
          "Gérer une situation de transparence des honoraires",
          "Valider vos acquis du module par l'action",
        ],
      },
      {
        slug: "tracfin",
        title: "TRACFIN & lutte anti-blanchiment",
        scriptFile: "module1-juridique/scripts/07-tracfin-blanchiment.md",
        videoUrl: null,
        audioUrl: "/audio/07-tracfin-blanchiment.mp3",
        duration: 60,
        difficulty: "avance",
        objectives: [
          "Identifier les obligations TRACFIN des agents immobiliers",
          "Reconnaître les signaux d'alerte d'une opération suspecte",
          "Effectuer une déclaration de soupçon sur la plateforme ERMES",
          "Protéger son agence contre les sanctions pénales anti-blanchiment",
        ],
      },
      {
        slug: "non-discrimination",
        title: "Non-discrimination — obligations et conformité",
        scriptFile: "module1-juridique/scripts/08-non-discrimination.md",
        videoUrl: null,
        audioUrl: "/audio/08-non-discrimination.mp3",
        duration: 60,
        difficulty: "intermediaire",
        objectives: [
          "Connaître les 25 critères de discrimination prohibés",
          "Identifier la discrimination directe, indirecte et les instructions",
          "Mettre en place une grille de sélection locataire conforme",
          "Répondre professionnellement à une demande discriminatoire",
        ],
      },
      {
        slug: "baux-habitation",
        title: "Baux d'habitation — loi du 6 juillet 1989",
        scriptFile: "module1-juridique/scripts/09-baux-habitation.md",
        videoUrl: null,
        audioUrl: "/audio/09-baux-habitation.mp3",
        duration: 45,
        difficulty: "intermediaire",
        objectives: [
          "Maîtriser la loi du 6 juillet 1989 et ses évolutions récentes",
          "Rédiger un bail avec toutes les mentions et annexes obligatoires",
          "Appliquer l'encadrement des loyers dans les zones tendues",
          "Gérer les logements classés F et G selon la loi Climat",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MODULE 2 — TRANSACTION & NÉGOCIATION  (420 min = 7h)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: "transaction",
    title: "Module 2 — Transaction & négociation",
    summary: "Estimation, prospection, négociation, CRM.",
    description:
      "Du premier contact vendeur à la signature du mandat exclusif : techniques d'estimation fiables, scripts de prospection redoutables, méthodes de négociation avancées et CRM pour fidéliser sur le long terme. Le module opérationnel de votre business immobilier.",
    lessons: [
      {
        slug: "estimation",
        title: "Estimation immobilière",
        scriptFile: "module2-transaction/scripts/01-estimation-immobiliere.md",
        videoUrl: null,
        audioUrl: "/audio/01-estimation-immobiliere.mp3",
        interactiveScenarioId: "estimation-negociation-demo",
        duration: 60,
        difficulty: "intermediaire",
        objectives: [
          "Utiliser 3 méthodes d'estimation complémentaires",
          "Défendre votre estimation face à un vendeur surévaluant",
          "Analyser les données DVF et prix au m² local",
          "Éviter les erreurs de surestimation qui bloquent les ventes",
        ],
      },
      {
        slug: "prospection",
        title: "Prospection & scripts",
        scriptFile: "module2-transaction/scripts/02-prospection-scripts.md",
        videoUrl: null,
        audioUrl: "/audio/02-prospection-scripts.mp3",
        duration: 60,
        difficulty: "debutant",
        objectives: [
          "Créer un script téléphonique qui obtient des RDV",
          "Maîtriser les 5 techniques de prospection terrain",
          "Automatiser votre prospection digitale (alertes, farming)",
          "Bâtir un plan de prospection sur 90 jours",
        ],
      },
      {
        slug: "negociation-mandat",
        title: "Négociation du mandat",
        scriptFile: "module2-transaction/scripts/03-negociation-mandat.md",
        videoUrl: null,
        audioUrl: "/audio/03-negociation-mandat.mp3",
        duration: 60,
        difficulty: "intermediaire",
        objectives: [
          "Décrocher le mandat exclusif dès le 1er RDV",
          "Répondre aux 7 objections classiques du vendeur",
          "Signer en un seul rendez-vous avec la méthode BET",
          "Fixer une durée et un prix de mandat stratégiques",
        ],
      },
      {
        slug: "negociation-avancee",
        title: "Négociation avancée",
        scriptFile: "module2-transaction/scripts/04-techniques-negociation-avancees.md",
        videoUrl: null,
        audioUrl: "/audio/04-techniques-negociation-avancees.mp3",
        duration: 60,
        difficulty: "avance",
        objectives: [
          "Maîtriser la méthode BATNA pour ne jamais céder",
          "Gérer les acheteurs difficiles et les lowballers",
          "Arbitrer une négociation vendeur/acheteur",
          "Transformer une offre basse en accord gagnant-gagnant",
        ],
      },
      {
        slug: "crm",
        title: "CRM & fidélisation",
        scriptFile: "module2-transaction/scripts/05-crm-fidelisation.md",
        videoUrl: null,
        audioUrl: "/audio/05-crm-fidelisation.mp3",
        duration: 60,
        difficulty: "debutant",
        objectives: [
          "Paramétrer un CRM immobilier efficace en 1h",
          "Automatiser les relances et anniversaires clients",
          "Mettre en place un suivi post-vente sur 24 mois",
          "Générer 2 recommandations par transaction conclue",
        ],
      },
      {
        slug: "offre-achat-avant-contrats",
        title: "Offre d'achat & avant-contrats",
        scriptFile: "module2-transaction/scripts/06-offre-achat-avant-contrats.md",
        videoUrl: null,
        audioUrl: "/audio/06-offre-achat-avant-contrats.mp3",
        duration: 60,
        difficulty: "avance",
        objectives: [
          "Rédiger une offre d'achat juridiquement sécurisée",
          "Distinguer promesse unilatérale et synallagmatique",
          "Maîtriser les conditions suspensives et leurs conséquences",
          "Gérer le délai de rétractation de 10 jours francs (acquéreur particulier)",
        ],
      },
      {
        slug: "acte-authentique",
        title: "Réitération de l'acte authentique",
        scriptFile: "module2-transaction/scripts/07-acte-authentique-notaire.md",
        videoUrl: null,
        audioUrl: "/audio/07-acte-authentique-notaire.mp3",
        duration: 60,
        difficulty: "avance",
        objectives: [
          "Coordonner les vérifications avant la signature notariale",
          "Expliquer la composition des frais de notaire",
          "Anticiper les situations complexes : procuration, état daté, diagnostics périmés",
          "Accompagner ses clients de la promesse à la remise des clés",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MODULE 3 — FINANCEMENT & FISCALITÉ  (540 min = 9h)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: "financement",
    title: "Module 3 — Financement & fiscalité",
    summary: "Crédit, fiscalité, rentabilité, dispositifs, assurances.",
    description:
      "Devenez le conseiller financier de confiance de vos clients : crédit immobilier 2026, optimisation fiscale, calcul de rentabilité locative, dispositifs de défiscalisation et assurances. Ce module vous différencie de la majorité des agents.",
    lessons: [
      {
        slug: "credit",
        title: "Crédit immobilier 2026",
        scriptFile: "module3-financement/scripts/script01-credit-immobilier-2026.md",
        videoUrl: null,
        audioUrl: "/audio/script01-credit-immobilier-2026.mp3",
        interactiveScenarioId: "credit-structuration-demo",
        duration: 90,
        difficulty: "intermediaire",
        objectives: [
          "Calculer la capacité d'emprunt maximale en 5 minutes",
          "Expliquer les 6 étapes d'obtention d'un crédit",
          "Identifier les causes de refus bancaire et les anticiper",
          "Orienter vers les bons courtiers et partenaires bancaires",
        ],
      },
      {
        slug: "fiscalite",
        title: "Fiscalité immobilière",
        scriptFile: "module3-financement/scripts/script02-fiscalite-immobiliere.md",
        videoUrl: null,
        audioUrl: "/audio/script02-fiscalite-immobiliere.mp3",
        duration: 90,
        difficulty: "avance",
        objectives: [
          "Comparer régime micro-foncier vs réel simplifié",
          "Calculer et optimiser la plus-value immobilière",
          "Conseiller sur l'IFI et les stratégies d'exonération",
          "Optimiser la fiscalité en location meublée (LMNP)",
        ],
      },
      {
        slug: "rentabilite",
        title: "Calcul de rentabilité",
        scriptFile: "module3-financement/scripts/script03-calcul-rentabilite.md",
        videoUrl: null,
        audioUrl: "/audio/script03-calcul-rentabilite.mp3",
        interactiveScenarioId: "rentabilite-investisseur-demo",
        duration: 90,
        difficulty: "intermediaire",
        objectives: [
          "Calculer rendement brut, net et net-net",
          "Utiliser le simulateur de cashflow mensuel",
          "Analyser et comparer 2 investissements locatifs",
          "Identifier les zones à fort rendement en 2026",
        ],
      },
      {
        slug: "dispositifs",
        title: "Dispositifs fiscaux",
        scriptFile: "module3-financement/scripts/script04-dispositifs-fiscaux.md",
        videoUrl: null,
        audioUrl: "/audio/script04-dispositifs-fiscaux.mp3",
        duration: 90,
        difficulty: "avance",
        objectives: [
          "Maîtriser Denormandie, Malraux et Monuments Historiques",
          "Calculer les réductions d'impôt par dispositif",
          "Conseiller sur le Pinel Plus et ses conditions 2026",
          "Présenter un dossier de défiscalisation clé en main",
        ],
      },
      {
        slug: "assurances",
        title: "Assurances immobilières",
        scriptFile: "module3-financement/scripts/script05-assurances-immobilieres.md",
        videoUrl: null,
        audioUrl: "/audio/script05-assurances-immobilieres.mp3",
        duration: 90,
        difficulty: "intermediaire",
        objectives: [
          "Présenter les 4 assurances obligatoires à vos clients",
          "Comparer PNO vs assurance loyers impayés (GLI)",
          "Conseiller sur les garanties emprunteur et délégation",
          "Accompagner un client lors d'un sinistre",
        ],
      },
      {
        slug: "defiscalisation",
        title: "Défiscalisation — dispositifs et stratégies",
        scriptFile: "module3-financement/scripts/06-defiscalisation-dispositifs.md",
        videoUrl: null,
        audioUrl: "/audio/06-defiscalisation-dispositifs.mp3",
        duration: 90,
        difficulty: "intermediaire",
        objectives: [
          "Connaître l'histoire des dispositifs Besson, Robien, Scellier, Pinel",
          "Maîtriser les dispositifs actifs en 2025 : Denormandie, Loc'Avantages, Malraux",
          "Expliquer la fin du Pinel (31/12/2024) à vos clients investisseurs",
          "Orienter vers un conseiller en gestion de patrimoine pour l'optimisation fiscale",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MODULE 4 — MARKETING DIGITAL  (420 min = 7h)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: "marketing",
    title: "Module 4 — Marketing digital",
    summary: "Photos, annonces, portails, réseaux, SEO.",
    description:
      "Vendez plus vite grâce à un marketing immobilier de haut niveau : photographie professionnelle, annonces qui convertissent, maîtrise des portails, stratégie réseaux sociaux et référencement Google local. Attirez les vendeurs ET les acheteurs.",
    lessons: [
      {
        slug: "photos",
        title: "Photos immobilières pro",
        scriptFile: "module4-marketing/scripts/01-photos-immobilieres-secrets-pros.md",
        videoUrl: null,
        audioUrl: "/audio/01-photos-immobilieres-secrets-pros.mp3",
        duration: 60,
        difficulty: "debutant",
        objectives: [
          "Réaliser des photos professionnelles avec un smartphone",
          "Maîtriser la lumière naturelle et le HDR",
          "Retoucher avec Lightroom Mobile en 10 minutes",
          "Créer des visites virtuelles 360° sans équipement coûteux",
        ],
      },
      {
        slug: "annonces",
        title: "Annonces qui vendent",
        scriptFile: "module4-marketing/scripts/02-rediger-annonces-qui-vendent.md",
        videoUrl: null,
        audioUrl: "/audio/02-rediger-annonces-qui-vendent.mp3",
        interactiveScenarioId: "annonce-parfaite-demo",
        duration: 60,
        difficulty: "debutant",
        objectives: [
          "Rédiger un titre accrocheur en moins de 10 mots",
          "Structurer une annonce en 5 blocs convertissants",
          "Intégrer les bons mots-clés pour le référencement",
          "Augmenter votre taux de clics de 40% en 1 semaine",
        ],
      },
      {
        slug: "portails",
        title: "SeLoger & Leboncoin",
        scriptFile: "module4-marketing/scripts/03-maitriser-seloger-leboncoin.md",
        videoUrl: null,
        audioUrl: "/audio/03-maitriser-seloger-leboncoin.mp3",
        duration: 60,
        difficulty: "debutant",
        objectives: [
          "Optimiser votre profil agence sur SeLoger Pro",
          "Choisir le bon abonnement Leboncoin Immo",
          "Booster vos annonces aux heures de pic de trafic",
          "Analyser vos statistiques de visibilité et contacts",
        ],
      },
      {
        slug: "reseaux",
        title: "Réseaux sociaux 2026",
        scriptFile: "module4-marketing/scripts/04-reseaux-sociaux-strategie-2026.md",
        videoUrl: null,
        audioUrl: "/audio/04-reseaux-sociaux-strategie-2026.mp3",
        duration: 60,
        difficulty: "intermediaire",
        objectives: [
          "Créer un calendrier éditorial immobilier sur 30 jours",
          "Filmer et monter des Reels immobiliers avec un iPhone",
          "Automatiser vos publications avec Buffer ou Later",
          "Générer des leads qualifiés via Instagram et Facebook Ads",
        ],
      },
      {
        slug: "seo",
        title: "SEO immobilier Google",
        scriptFile: "module4-marketing/scripts/05-seo-immobilier-google.md",
        videoUrl: null,
        audioUrl: "/audio/05-seo-immobilier-google.mp3",
        duration: 60,
        difficulty: "intermediaire",
        objectives: [
          "Comprendre comment Google classe les agences locales",
          "Créer et optimiser votre fiche Google Business Profile",
          "Rédiger 1 article SEO par mois qui génère des appels",
          "Dominer les recherches locales en 6 mois",
        ],
      },
      {
        slug: "video-visite-virtuelle",
        title: "Vidéo immobilière & visite virtuelle 360°",
        scriptFile: "module4-marketing/scripts/06-video-visite-virtuelle.md",
        videoUrl: null,
        audioUrl: "/audio/06-video-visite-virtuelle.mp3",
        duration: 60,
        difficulty: "debutant",
        objectives: [
          "Filmer une visite professionnelle avec un smartphone et un gimbal",
          "Créer une visite virtuelle 360° avec Matterport",
          "Distribuer vos vidéos sur SeLoger, YouTube et Instagram Reels",
          "Analyser les performances vidéo pour optimiser vos annonces",
        ],
      },
      {
        slug: "personal-branding",
        title: "Personal branding & e-réputation",
        scriptFile: "module4-marketing/scripts/07-personal-branding-ereputation.md",
        videoUrl: null,
        audioUrl: "/audio/07-personal-branding-ereputation.mp3",
        duration: 60,
        difficulty: "intermediaire",
        objectives: [
          "Construire une identité visuelle cohérente sur tous les canaux",
          "Optimiser sa fiche Google Business Profile pour dominer localement",
          "Gérer les avis clients et les crises d'e-réputation",
          "Se positionner comme expert sur LinkedIn pour attirer les mandants",
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // MODULE 5 — VISITE, CLOSING & FIDÉLISATION  (600 min = 10h)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: "terrain",
    title: "Module 5 — Visite, closing & fidélisation",
    summary: "Visites, argumentaire, closing, promesse, acte, post-vente.",
    description:
      "Le module terrain qui fait la différence sur le vrai marché : conduite de visite professionnelle, argumentaire qui convertit, techniques de closing avancées, sécurisation de la promesse et fidélisation active pour générer des recommandations.",
    lessons: [
      {
        slug: "visite",
        title: "Conduire une visite pro",
        scriptFile: "module5-terrain/scripts/01-conduire-visite-pro.md",
        videoUrl: null,
        audioUrl: "/audio/01-conduire-visite-pro.mp3",
        interactiveScenarioId: "visite-closing-demo",
        duration: 90,
        difficulty: "intermediaire",
        objectives: [
          "Préparer une visite efficacement en 15 minutes",
          "Conduire avec la méthode SONCAS",
          "Créer l'urgence naturellement sans pression",
          "Convertir visite → offre dans les 7 jours",
        ],
      },
      {
        slug: "argumentaire",
        title: "Argumentaire qui convertit",
        scriptFile: "module5-terrain/scripts/02-argumentaire-convertit.md",
        videoUrl: null,
        audioUrl: "/audio/02-argumentaire-convertit.mp3",
        duration: 90,
        difficulty: "intermediaire",
        objectives: [
          "Construire votre pitch de présentation en 90 secondes",
          "Répondre aux 10 objections les plus fréquentes en visite",
          "Utiliser la méthode CAB (Caractéristique-Avantage-Bénéfice)",
          "Closer sur les bénéfices émotionnels plutôt que rationnels",
        ],
      },
      {
        slug: "closing",
        title: "Closing avancé",
        scriptFile: "module5-terrain/scripts/03-techniques-closing-avancees.md",
        videoUrl: null,
        audioUrl: "/audio/03-techniques-closing-avancees.mp3",
        duration: 90,
        difficulty: "avance",
        objectives: [
          "Identifier les 7 signaux d'achat verbaux et non-verbaux",
          "Proposer une offre d'achat au bon moment",
          "Gérer un vendeur hésitant sans le braquer",
          "Sécuriser la vente en moins de 48h",
        ],
      },
      {
        slug: "promesse",
        title: "Promesse & acte authentique",
        scriptFile: "module5-terrain/scripts/04-promesse-acte-authentique.md",
        videoUrl: null,
        audioUrl: "/audio/04-promesse-acte-authentique.mp3",
        duration: 90,
        difficulty: "avance",
        objectives: [
          "Rédiger une promesse unilatérale de vente sécurisée",
          "Sécuriser les conditions suspensives de crédit",
          "Gérer le délai légal de rétractation de 10 jours (acquéreur particulier)",
          "Préparer le passage chez le notaire sans accroc",
        ],
      },
      {
        slug: "fidelisation",
        title: "Fidélisation & recommandation",
        scriptFile: "module5-terrain/scripts/05-fidelisation-recommandation.md",
        videoUrl: null,
        audioUrl: "/audio/05-fidelisation-recommandation.mp3",
        duration: 90,
        difficulty: "intermediaire",
        objectives: [
          "Mettre en place un suivi post-vente sur 90 jours",
          "Créer un programme de parrainage actif",
          "Générer 2 recommandations minimum par transaction",
          "Construire votre réputation 5 étoiles sur Google",
        ],
      },
      {
        slug: "r0-r1-r2",
        title: "R0 / R1 / R2 — Prise de mandat en 3 étapes",
        scriptFile: "module5-terrain/scripts/06-r0-r1-r2-prise-mandat.md",
        videoUrl: null,
        audioUrl: "/audio/06-r0-r1-r2-prise-mandat.mp3",
        duration: 75,
        difficulty: "intermediaire",
        objectives: [
          "Qualifier efficacement un prospect par téléphone (R0)",
          "Conduire la visite du bien et la découverte vendeur (R1)",
          "Présenter une estimation argumentée et signer le mandat (R2)",
          "Ne jamais annoncer un prix avant d'avoir des données marché formalisées",
        ],
      },
      {
        slug: "decouverte-client",
        title: "Découverte client & suivi acquéreur",
        scriptFile: "module5-terrain/scripts/07-decouverte-client-suivi.md",
        videoUrl: null,
        audioUrl: "/audio/07-decouverte-client-suivi.mp3",
        duration: 75,
        difficulty: "intermediaire",
        objectives: [
          "Identifier les besoins profonds d'un acquéreur avec la méthode iceberg",
          "Poser les 4 catégories de questions de découverte client",
          "Mettre à jour la fiche acquéreur après chaque contact",
          "Structurer un suivi acquéreur sur 30 jours pour convertir sans forcer",
        ],
      },
    ],
  },
];

// ─── Fonctions d'accès ────────────────────────────────────────────────────────
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
