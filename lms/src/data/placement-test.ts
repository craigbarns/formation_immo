/**
 * Test de positionnement — 15 questions couvrant les 5 modules.
 * Évalue le niveau initial : débutant / intermédiaire / avancé.
 */

export type PlacementQuestion = {
  id: string;
  module: "juridique" | "transaction" | "financement" | "marketing" | "terrain";
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: "debutant" | "intermediaire" | "avance";
};

export type PlacementResult = {
  totalScore: number;
  totalQuestions: number;
  percentage: number;
  level: "debutant" | "intermediaire" | "avance";
  moduleScores: Record<string, { correct: number; total: number }>;
  weakModules: string[];
  strongModules: string[];
  recommendation: string;
};

export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  // ── JURIDIQUE (3 questions) ──
  {
    id: "pj1",
    module: "juridique",
    question: "La loi ALUR oblige les agents immobiliers à :",
    options: [
      "Réduire leurs honoraires de 30%",
      "Afficher clairement leurs honoraires et informations",
      "Ne travailler qu'avec des notaires agréés",
      "Limiter leurs mandats à 3 mois",
    ],
    correctIndex: 1,
    explanation: "L'ALUR impose la transparence totale sur les honoraires et les conditions.",
    difficulty: "debutant",
  },
  {
    id: "pj2",
    module: "juridique",
    question: "Dans une copropriété, les charges courantes sont réparties selon :",
    options: [
      "La surface de chaque lot (tantièmes)",
      "Le nombre d'occupants",
      "Le revenu fiscal du propriétaire",
      "La décision unanime de l'AG",
    ],
    correctIndex: 0,
    explanation: "Les tantièmes (fixés dans le règlement de copropriété) déterminent la répartition des charges.",
    difficulty: "intermediaire",
  },
  {
    id: "pj3",
    module: "juridique",
    question: "Un diagnostic DPE classe un bien en catégorie G. L'agent doit informer l'acheteur que :",
    options: [
      "Le bien est interdit à la location",
      "Des travaux d'amélioration énergétique sont recommandés",
      "Le prix de vente est plafonné",
      "L'assurance habitation sera plus chère",
    ],
    correctIndex: 1,
    explanation: "Un DPE G indique une mauvaise performance énergétique ; les travaux sont recommandés.",
    difficulty: "avance",
  },

  // ── TRANSACTION (3 questions) ──
  {
    id: "pt1",
    module: "transaction",
    question: "Un compromis de vente est :",
    options: [
      "Un simple devis du vendeur",
      "Un contrat synallagmatique qui engage les deux parties",
      "Une promesse unilatérale du vendeur",
      "Un document sans valeur juridique",
    ],
    correctIndex: 1,
    explanation: "Le compromis engage vendeur et acheteur ; c'est un contrat synallagmatique.",
    difficulty: "debutant",
  },
  {
    id: "pt2",
    module: "transaction",
    question: "Le délai de rétractation pour un acheteur en résidence principale est de :",
    options: [
      "7 jours calendaires",
      "10 jours ouvrés",
      "14 jours calendaires",
      "1 mois",
    ],
    correctIndex: 1,
    explanation: "10 jours ouvrés (pas calendaires) à compter de la première présentation de la lettre.",
    difficulty: "intermediaire",
  },
  {
    id: "pt3",
    module: "transaction",
    question: "Lors d'une succession, l'agent doit vérifier que :",
    options: [
      "Le notaire a publié l'acte de notoriété",
      "Tous les héritiers ont accepté la succession",
      "L'agent n'a pas besoin de documents spéciaux",
      "Le vendeur est seul propriétaire depuis plus de 5 ans",
    ],
    correctIndex: 0,
    explanation: "L'acte de notoriété atteste de l'identité des héritiers et des pouvoirs du vendeur.",
    difficulty: "avance",
  },

  // ── FINANCEMENT (3 questions) ──
  {
    id: "pf1",
    module: "financement",
    question: "Le TAEG représente :",
    options: [
      "Le taux d'intérêt brut sans frais",
      "Le coût total du crédit exprimé en taux annuel",
      "La durée maximale de remboursement",
      "Le montant des mensualités",
    ],
    correctIndex: 1,
    explanation: "TAEG = Taux Annuel Effectif Global, incluant tous les frais.",
    difficulty: "debutant",
  },
  {
    id: "pf2",
    module: "financement",
    question: "Un couple gagne 4 000€/mois. Avec un taux d'endettement de 35%, leur mensualité maximale est de :",
    options: [
      "1 200€",
      "1 400€",
      "1 600€",
      "2 000€",
    ],
    correctIndex: 1,
    explanation: "4 000€ × 35% = 1 400€ de mensualité maximale.",
    difficulty: "intermediaire",
  },
  {
    id: "pf3",
    module: "financement",
    question: "En LMNP (Location Meublée Non Professionnelle), le régime Micro-BIC permet d'abattre :",
    options: [
      "30% du chiffre d'affaires forfaitairement",
      "50% du chiffre d'affaires forfaitairement",
      "71% du chiffre d'affaires forfaitairement",
      "100% des charges réelles",
    ],
    correctIndex: 2,
    explanation: "Micro-BIC LMNP : abattement forfaitaire de 71% sur le chiffre d'affaires.",
    difficulty: "avance",
  },

  // ── MARKETING (3 questions) ──
  {
    id: "pm1",
    module: "marketing",
    question: "Le CTA (Call To Action) dans une annonce immobilière sert à :",
    options: [
      "Décrire le quartier en détail",
      "Inciter le lecteur à contacter l'agent",
      "Lister toutes les pièces du bien",
      "Indiquer le prix négociable",
    ],
    correctIndex: 1,
    explanation: "Le CTA est un bouton ou phrase d'action pour convertir le lecteur en lead.",
    difficulty: "debutant",
  },
  {
    id: "pm2",
    module: "marketing",
    question: "Le copywriting AIDA signifie :",
    options: [
      "Attention, Intérêt, Désir, Action",
      "Annonce, Image, Description, Appel",
      "Accroche, Information, Détail, Argument",
      "Achat, Intérêt, Décision, Action",
    ],
    correctIndex: 0,
    explanation: "AIDA = Attention, Intérêt, Désir, Action — la structure classique du copywriting.",
    difficulty: "intermediaire",
  },
  {
    id: "pm3",
    module: "marketing",
    question: "Dans une stratégie d'acquisition par contenu (content marketing), le lead magnet idéal pour un agent est :",
    options: [
      "Une liste de tous les biens à vendre",
      "Un guide gratuit sur l'estimation de son bien",
      "La carte des prix du quartier",
      "Le CV de l'agent",
    ],
    correctIndex: 1,
    explanation: "Un guide gratuit capture l'email du prospect en échange de valeur.",
    difficulty: "avance",
  },

  // ── TERRAIN (3 questions) ──
  {
    id: "ptr1",
    module: "terrain",
    question: "Lors d'une première prise de contact téléphonique, l'objectif principal est de :",
    options: [
      "Vendre le bien immédiatement",
      "Qualifier le besoin et fixer un RDV",
      "Envoyer toutes les fiches par email",
      "Négocier le prix au téléphone",
    ],
    correctIndex: 1,
    explanation: "La prise de contact vise à qualifier et fixer un rendez-vous physique.",
    difficulty: "debutant",
  },
  {
    id: "ptr2",
    module: "terrain",
    question: "La technique du SPIN Selling repose sur :",
    options: [
      "Des prix très agressifs",
      "Des questions Situation, Problème, Implication, Besoin-payant",
      "Un discours de 30 minutes sur le bien",
      "Une démonstration vidéo du bien",
    ],
    correctIndex: 1,
    explanation: "SPIN = Situation, Problem, Implication, Need-payoff — la méthode de vente consultative.",
    difficulty: "intermediaire",
  },
  {
    id: "ptr3",
    module: "terrain",
    question: "Face à une objection &ldquo;C'est trop cher&rdquo;, la meilleure réponse est :",
    options: [
      "De baisser le prix immédiatement",
      "De reformuler l'objection et de repositionner la valeur",
      "De comparer avec les concurrents",
      "D'insister sur les qualités du bien",
    ],
    correctIndex: 1,
    explanation: "Reformuler l'objection crée un dialogue ; repositionner la valeur justifie le prix.",
    difficulty: "avance",
  },
];

export const PLACEMENT_MODULE_LABELS: Record<string, string> = {
  juridique: "Juridique & ALUR",
  transaction: "Transaction & Compromis",
  financement: "Financement & Fiscalité",
  marketing: "Marketing & Acquisition",
  terrain: "Terrain & Négociation",
};

export function calculatePlacementResult(
  answers: Record<string, number>
): PlacementResult {
  const totalQuestions = PLACEMENT_QUESTIONS.length;
  let correct = 0;
  const moduleScores: Record<string, { correct: number; total: number }> = {};

  for (const q of PLACEMENT_QUESTIONS) {
    if (!moduleScores[q.module]) {
      moduleScores[q.module] = { correct: 0, total: 0 };
    }
    moduleScores[q.module].total++;
    if (answers[q.id] === q.correctIndex) {
      correct++;
      moduleScores[q.module].correct++;
    }
  }

  const percentage = Math.round((correct / totalQuestions) * 100);

  let level: "debutant" | "intermediaire" | "avance";
  if (percentage >= 75) level = "avance";
  else if (percentage >= 45) level = "intermediaire";
  else level = "debutant";

  const weakModules: string[] = [];
  const strongModules: string[] = [];
  for (const [mod, scores] of Object.entries(moduleScores)) {
    const pct = scores.total > 0 ? (scores.correct / scores.total) * 100 : 0;
    if (pct < 50) weakModules.push(mod);
    if (pct >= 80) strongModules.push(mod);
  }

  let recommendation = "";
  if (level === "debutant") {
    recommendation = "Nous vous recommandons de commencer par le Module 1 (Juridique) et de suivre le parcours dans l'ordre. Ne sautez aucune étape !";
  } else if (level === "intermediaire") {
    recommendation = `Vous avez des bases solides. Concentrez-vous sur ${weakModules.length > 0 ? weakModules.map(m => PLACEMENT_MODULE_LABELS[m]).join(", ") : "vos points faibles"} pour passer au niveau avancé.`;
  } else {
    recommendation = "Excellent niveau ! Vous pouvez aborder directement les modules avancés ou passer les examens pour valider vos compétences.";
  }

  return {
    totalScore: correct,
    totalQuestions,
    percentage,
    level,
    moduleScores,
    weakModules,
    strongModules,
    recommendation,
  };
}
