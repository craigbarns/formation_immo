/**
 * Exercices glisser-déposer (ordre & correspondance) pour chaque module.
 * Utilisés dans les pages de leçon pour renforcer l'apprentissage actif.
 */

export type DragDropExercise = {
  id: string;
  moduleSlug: string;
  lessonSlug: string;
  type: "order" | "match";
  title: string;
  instruction: string;
  items: string[];
  correctOrder?: number[];
  matchPairs?: { left: string; right: string }[];
};

const ALL_DRAG_DROP_EXERCISES: DragDropExercise[] = [
  // ──────────────────────────────────────────────
  // MODULE 1 — JURIDIQUE
  // ──────────────────────────────────────────────

  // juridique / loi-alur
  {
    id: "dd-jur-alur-01",
    moduleSlug: "juridique",
    lessonSlug: "loi-alur",
    type: "match",
    title: "Les piliers de la loi ALUR",
    instruction:
      "Associez chaque obligation ALUR à sa description correcte.",
    items: [
      "Carte professionnelle (T)",
      "Garantie financière",
      "Assurance RCP",
      "Formation continue",
      "Affichage des honoraires",
    ],
    matchPairs: [
      {
        left: "Carte professionnelle (T)",
        right: "Délivrée par la CCI, obligatoire pour exercer la transaction",
      },
      {
        left: "Garantie financière",
        right: "Couvre les fonds détenus pour le compte des clients",
      },
      {
        left: "Assurance RCP",
        right: "Protège contre les erreurs et fautes professionnelles",
      },
      {
        left: "Formation continue",
        right: "42 heures sur 3 ans (14 h/an) incluant déontologie",
      },
      {
        left: "Affichage des honoraires",
        right: "Barème visible en vitrine et sur les annonces en ligne",
      },
    ],
  },

  // juridique / compromis
  {
    id: "dd-jur-comp-01",
    moduleSlug: "juridique",
    lessonSlug: "compromis",
    type: "order",
    title: "Les étapes du compromis de vente",
    instruction:
      "Remettez dans l'ordre les étapes du compromis de vente.",
    items: [
      "Offre d'achat acceptée",
      "Choix du notaire",
      "Rédaction du compromis",
      "Signature des parties",
      "Délai de rétractation 10 jours",
      "Levée des conditions suspensives",
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
  },

  // juridique / diagnostics
  {
    id: "dd-jur-diag-01",
    moduleSlug: "juridique",
    lessonSlug: "diagnostics",
    type: "match",
    title: "Diagnostics immobiliers obligatoires",
    instruction:
      "Associez chaque diagnostic à sa description.",
    items: ["DPE", "Amiante", "Plomb (CREP)", "Termites", "ERP"],
    matchPairs: [
      {
        left: "DPE",
        right: "Évalue la consommation énergétique, valable 10 ans",
      },
      {
        left: "Amiante",
        right: "Obligatoire pour les bâtiments construits avant 1997",
      },
      {
        left: "Plomb (CREP)",
        right: "Recherche de plomb dans les peintures, biens avant 1949",
      },
      {
        left: "Termites",
        right: "Obligatoire en zone déclarée par arrêté préfectoral",
      },
      {
        left: "ERP",
        right: "État des Risques et Pollutions (inondation, séisme...)",
      },
    ],
  },

  // juridique / mandats
  {
    id: "dd-jur-mand-01",
    moduleSlug: "juridique",
    lessonSlug: "mandats",
    type: "order",
    title: "Processus de prise de mandat",
    instruction:
      "Classez les étapes de la prise de mandat dans l'ordre chronologique.",
    items: [
      "Premier contact avec le propriétaire",
      "Visite du bien et estimation",
      "Présentation du service et de la stratégie",
      "Négociation des conditions du mandat",
      "Signature du mandat",
      "Mise en marché du bien",
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
  },

  // juridique / copropriete
  {
    id: "dd-jur-copro-01",
    moduleSlug: "juridique",
    lessonSlug: "copropriete",
    type: "match",
    title: "Documents de copropriété",
    instruction:
      "Associez chaque document à son rôle dans la copropriété.",
    items: [
      "Règlement de copropriété",
      "Carnet d'entretien",
      "PV d'assemblée générale",
      "Fiche synthétique",
      "Appel de fonds",
    ],
    matchPairs: [
      {
        left: "Règlement de copropriété",
        right: "Définit les droits et obligations de chaque copropriétaire",
      },
      {
        left: "Carnet d'entretien",
        right: "Recense les travaux réalisés et à prévoir sur l'immeuble",
      },
      {
        left: "PV d'assemblée générale",
        right: "Résumé des décisions votées lors de l'AG annuelle",
      },
      {
        left: "Fiche synthétique",
        right: "Document obligatoire résumant les données financières et techniques",
      },
      {
        left: "Appel de fonds",
        right: "Demande de versement des charges trimestrielles aux copropriétaires",
      },
    ],
  },

  // ──────────────────────────────────────────────
  // MODULE 2 — TRANSACTION
  // ──────────────────────────────────────────────

  // transaction / estimation
  {
    id: "dd-tra-est-01",
    moduleSlug: "transaction",
    lessonSlug: "estimation",
    type: "order",
    title: "Étapes de l'estimation immobilière",
    instruction:
      "Remettez dans l'ordre les étapes d'une estimation professionnelle.",
    items: [
      "Prise de rendez-vous et préparation",
      "Visite détaillée du bien",
      "Analyse comparative de marché (ACM)",
      "Application des décotes et surcotes",
      "Rédaction de l'avis de valeur",
      "Présentation du prix au propriétaire",
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
  },

  // transaction / prospection
  {
    id: "dd-tra-prosp-01",
    moduleSlug: "transaction",
    lessonSlug: "prospection",
    type: "match",
    title: "Canaux de prospection",
    instruction:
      "Associez chaque canal de prospection à son avantage principal.",
    items: [
      "Pige téléphonique",
      "Porte-à-porte",
      "Réseaux sociaux",
      "Partenariats notaires",
      "Farming de quartier",
    ],
    matchPairs: [
      {
        left: "Pige téléphonique",
        right: "Contact direct avec les vendeurs ayant un bien en ligne",
      },
      {
        left: "Porte-à-porte",
        right: "Détecte les projets avant la mise en vente",
      },
      {
        left: "Réseaux sociaux",
        right: "Visibilité large et génération de leads entrants",
      },
      {
        left: "Partenariats notaires",
        right: "Accès aux dossiers de succession et de partage",
      },
      {
        left: "Farming de quartier",
        right: "Positionnement comme expert local de référence",
      },
    ],
  },

  // transaction / negociation-mandat
  {
    id: "dd-tra-negm-01",
    moduleSlug: "transaction",
    lessonSlug: "negociation-mandat",
    type: "order",
    title: "Argumentaire pour le mandat exclusif",
    instruction:
      "Ordonnez les étapes d'un argumentaire pour obtenir un mandat exclusif.",
    items: [
      "Écouter les attentes et motivations du vendeur",
      "Présenter les statistiques de vente exclusif vs simple",
      "Détailler le plan marketing personnalisé",
      "Expliquer la stratégie de prix et la marge de négociation",
      "Proposer un engagement de résultat avec clause de sortie",
      "Obtenir l'accord et signer",
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
  },

  // transaction / negociation-avancee
  {
    id: "dd-tra-nega-01",
    moduleSlug: "transaction",
    lessonSlug: "negociation-avancee",
    type: "match",
    title: "Techniques de négociation",
    instruction:
      "Associez chaque technique de négociation à sa définition.",
    items: [
      "Ancrage",
      "BATNA",
      "Miroir",
      "Silence stratégique",
      "Reformulation",
    ],
    matchPairs: [
      {
        left: "Ancrage",
        right: "Poser un premier chiffre qui influence toute la négociation",
      },
      {
        left: "BATNA",
        right: "Meilleure alternative en cas d'échec de la négociation",
      },
      {
        left: "Miroir",
        right: "Répéter les derniers mots de l'interlocuteur pour créer du rapport",
      },
      {
        left: "Silence stratégique",
        right: "Laisser un blanc pour inciter l'autre à compléter ou concéder",
      },
      {
        left: "Reformulation",
        right: "Résumer les propos de l'autre pour montrer la compréhension",
      },
    ],
  },

  // transaction / crm
  {
    id: "dd-tra-crm-01",
    moduleSlug: "transaction",
    lessonSlug: "crm",
    type: "order",
    title: "Cycle de vie client dans le CRM",
    instruction:
      "Classez les étapes du cycle de vie client dans votre CRM.",
    items: [
      "Capture du lead (formulaire, appel, visite)",
      "Qualification du projet et du budget",
      "Envoi de biens correspondants",
      "Organisation de visites",
      "Offre et négociation",
      "Signature et suivi post-vente",
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
  },

  // ──────────────────────────────────────────────
  // MODULE 3 — FINANCEMENT
  // ──────────────────────────────────────────────

  // financement / credit
  {
    id: "dd-fin-cred-01",
    moduleSlug: "financement",
    lessonSlug: "credit",
    type: "order",
    title: "Étapes de la demande de crédit",
    instruction:
      "Remettez dans l'ordre les étapes d'une demande de crédit immobilier.",
    items: [
      "Simulation de capacité d'emprunt",
      "Constitution du dossier bancaire",
      "Dépôt du dossier et étude par la banque",
      "Obtention de l'accord de principe",
      "Émission de l'offre de prêt",
      "Délai de réflexion de 10 jours et acceptation",
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
  },

  // financement / fiscalite
  {
    id: "dd-fin-fisc-01",
    moduleSlug: "financement",
    lessonSlug: "fiscalite",
    type: "match",
    title: "Régimes fiscaux immobiliers",
    instruction:
      "Associez chaque régime fiscal à sa caractéristique principale.",
    items: [
      "Micro-foncier",
      "Régime réel",
      "LMNP micro-BIC",
      "LMNP réel",
      "SCI à l'IS",
    ],
    matchPairs: [
      {
        left: "Micro-foncier",
        right: "Abattement forfaitaire de 30 %, revenus fonciers < 15 000 EUR/an",
      },
      {
        left: "Régime réel",
        right: "Déduction des charges réelles (travaux, intérêts, assurances)",
      },
      {
        left: "LMNP micro-BIC",
        right: "Abattement de 50 % sur les revenus locatifs meublés",
      },
      {
        left: "LMNP réel",
        right: "Amortissement du bien et déduction de toutes les charges",
      },
      {
        left: "SCI à l'IS",
        right: "Imposition à l'impôt sur les sociétés, amortissement possible",
      },
    ],
  },

  // financement / rentabilite
  {
    id: "dd-fin-rent-01",
    moduleSlug: "financement",
    lessonSlug: "rentabilite",
    type: "order",
    title: "Calcul de rentabilité pas à pas",
    instruction:
      "Ordonnez les étapes du calcul de rentabilité d'un investissement.",
    items: [
      "Estimer le loyer mensuel du marché",
      "Calculer la rentabilité brute (loyer annuel / prix achat)",
      "Déduire les charges (copro, taxe foncière, gestion)",
      "Calculer la rentabilité nette",
      "Intégrer la fiscalité applicable",
      "Obtenir la rentabilité nette-nette (après impôts)",
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
  },

  // financement / dispositifs
  {
    id: "dd-fin-disp-01",
    moduleSlug: "financement",
    lessonSlug: "dispositifs",
    type: "match",
    title: "Dispositifs fiscaux et leurs avantages",
    instruction:
      "Associez chaque dispositif à son avantage fiscal principal.",
    items: [
      "Pinel+",
      "Denormandie",
      "Malraux",
      "Monuments Historiques",
      "Déficit foncier",
    ],
    matchPairs: [
      {
        left: "Pinel+",
        right: "Réduction d'impôt jusqu'à 21 % pour un logement neuf en zone tendue",
      },
      {
        left: "Denormandie",
        right: "Réduction d'impôt pour rénovation en centre-ville dégradé",
      },
      {
        left: "Malraux",
        right: "Réduction d'impôt pour restauration en secteur sauvegardé",
      },
      {
        left: "Monuments Historiques",
        right: "Déduction totale des travaux du revenu global sans plafond",
      },
      {
        left: "Déficit foncier",
        right: "Imputation des travaux sur le revenu global jusqu'à 10 700 EUR/an",
      },
    ],
  },

  // financement / assurances
  {
    id: "dd-fin-ass-01",
    moduleSlug: "financement",
    lessonSlug: "assurances",
    type: "order",
    title: "Choix de l'assurance emprunteur",
    instruction:
      "Classez les étapes du choix d'une assurance emprunteur.",
    items: [
      "Recevoir la proposition de la banque (assurance groupe)",
      "Comparer avec des assurances individuelles (délégation)",
      "Vérifier l'équivalence de garanties",
      "Choisir l'offre la plus avantageuse",
      "Soumettre la délégation à la banque pour accord",
      "Signature de l'assurance et activation des garanties",
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
  },

  // ──────────────────────────────────────────────
  // MODULE 4 — MARKETING
  // ──────────────────────────────────────────────

  // marketing / photos
  {
    id: "dd-mkt-photo-01",
    moduleSlug: "marketing",
    lessonSlug: "photos",
    type: "order",
    title: "Réaliser un shooting photo professionnel",
    instruction:
      "Remettez dans l'ordre les étapes d'un shooting photo immobilier.",
    items: [
      "Préparer le bien (rangement, home staging léger)",
      "Choisir le bon créneau (lumière naturelle optimale)",
      "Photographier l'extérieur et l'environnement",
      "Photographier chaque pièce (angle large, verticales droites)",
      "Retoucher les photos (luminosité, perspective)",
      "Sélectionner les 15-20 meilleures photos pour l'annonce",
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
  },

  // marketing / annonces
  {
    id: "dd-mkt-ann-01",
    moduleSlug: "marketing",
    lessonSlug: "annonces",
    type: "match",
    title: "Éléments d'une annonce efficace",
    instruction:
      "Associez chaque élément d'annonce à son objectif.",
    items: [
      "Titre accrocheur",
      "Description détaillée",
      "Photos HDR",
      "Prix affiché",
      "DPE et superficie",
    ],
    matchPairs: [
      {
        left: "Titre accrocheur",
        right: "Capter l'attention en 3 secondes et générer le clic",
      },
      {
        left: "Description détaillée",
        right: "Raconter une histoire et projeter l'acheteur dans le bien",
      },
      {
        left: "Photos HDR",
        right: "Montrer le bien sous son meilleur jour et déclencher la visite",
      },
      {
        left: "Prix affiché",
        right: "Filtrer les acheteurs qualifiés et créer la confiance",
      },
      {
        left: "DPE et superficie",
        right: "Respecter les obligations légales et informer objectivement",
      },
    ],
  },

  // marketing / portails
  {
    id: "dd-mkt-port-01",
    moduleSlug: "marketing",
    lessonSlug: "portails",
    type: "order",
    title: "Optimiser une annonce sur SeLoger",
    instruction:
      "Ordonnez les étapes pour maximiser la visibilité d'une annonce.",
    items: [
      "Renseigner tous les champs obligatoires et optionnels",
      "Uploader les photos dans l'ordre stratégique (meilleure en premier)",
      "Rédiger un titre avec mots-clés géolocalisés",
      "Activer les options de mise en avant (boost, vitrine)",
      "Surveiller les statistiques (vues, contacts)",
      "Ajuster le prix ou la description si peu de contacts",
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
  },

  // marketing / reseaux
  {
    id: "dd-mkt-res-01",
    moduleSlug: "marketing",
    lessonSlug: "reseaux",
    type: "match",
    title: "Réseaux sociaux et stratégie",
    instruction:
      "Associez chaque réseau social à sa stratégie immobilière optimale.",
    items: [
      "Instagram",
      "Facebook",
      "LinkedIn",
      "TikTok",
      "YouTube",
    ],
    matchPairs: [
      {
        left: "Instagram",
        right: "Reels et stories de visites, photos avant/après home staging",
      },
      {
        left: "Facebook",
        right: "Groupes locaux, marketplace, publicités ciblées géographiquement",
      },
      {
        left: "LinkedIn",
        right: "Personal branding professionnel et réseau B2B investisseurs",
      },
      {
        left: "TikTok",
        right: "Vidéos courtes éducatives, conseils immobiliers viraux",
      },
      {
        left: "YouTube",
        right: "Visites virtuelles longues et vidéos éducatives référencées sur Google",
      },
    ],
  },

  // marketing / seo
  {
    id: "dd-mkt-seo-01",
    moduleSlug: "marketing",
    lessonSlug: "seo",
    type: "order",
    title: "Stratégie SEO pour un site immobilier",
    instruction:
      "Classez les actions SEO par ordre de priorité pour un agent immobilier.",
    items: [
      "Créer une fiche Google Business Profile optimisée",
      "Publier des pages quartier avec mots-clés locaux",
      "Rédiger des articles de blog (guide achat, tendances marché)",
      "Obtenir des backlinks (annuaires, presse locale, partenaires)",
      "Optimiser la vitesse du site et le mobile-first",
      "Suivre les positions et ajuster la stratégie",
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
  },

  // ──────────────────────────────────────────────
  // MODULE 5 — TERRAIN
  // ──────────────────────────────────────────────

  // terrain / visite
  {
    id: "dd-ter-vis-01",
    moduleSlug: "terrain",
    lessonSlug: "visite",
    type: "order",
    title: "Conduire une visite immobilière",
    instruction:
      "Remettez dans l'ordre les étapes d'une visite immobilière réussie.",
    items: [
      "Accueillir le client et créer le rapport",
      "Présenter le quartier et l'environnement",
      "Faire découvrir les pièces dans l'ordre stratégique",
      "Mettre en valeur les points forts du bien",
      "Répondre aux objections avec empathie",
      "Conclure par un bilan et proposer l'étape suivante",
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
  },

  // terrain / argumentaire
  {
    id: "dd-ter-arg-01",
    moduleSlug: "terrain",
    lessonSlug: "argumentaire",
    type: "match",
    title: "Objections et réponses types",
    instruction:
      "Associez chaque objection courante à la meilleure réponse.",
    items: [
      "\"C'est trop cher\"",
      "\"Je veux réfléchir\"",
      "\"Les travaux me font peur\"",
      "\"Le quartier ne me plaît pas\"",
      "\"J'ai vu moins cher ailleurs\"",
    ],
    matchPairs: [
      {
        left: "\"C'est trop cher\"",
        right: "Détailler la valeur (prix/m², comparables, prestations incluses)",
      },
      {
        left: "\"Je veux réfléchir\"",
        right: "Fixer un délai précis et identifier le frein réel sous-jacent",
      },
      {
        left: "\"Les travaux me font peur\"",
        right: "Chiffrer les travaux et montrer l'impact sur la plus-value",
      },
      {
        left: "\"Le quartier ne me plaît pas\"",
        right: "Présenter les projets urbains et l'évolution positive du secteur",
      },
      {
        left: "\"J'ai vu moins cher ailleurs\"",
        right: "Comparer objectivement les prestations et l'emplacement exact",
      },
    ],
  },

  // terrain / closing
  {
    id: "dd-ter-clo-01",
    moduleSlug: "terrain",
    lessonSlug: "closing",
    type: "order",
    title: "Techniques de closing en séquence",
    instruction:
      "Ordonnez les étapes d'un closing efficace après une visite concluante.",
    items: [
      "Résumer les points d'accord et les attentes satisfaites",
      "Poser la question de closing (\"Souhaitez-vous avancer ?\")",
      "Traiter les dernières objections",
      "Présenter les modalités de l'offre d'achat",
      "Rédiger et faire signer l'offre",
      "Confirmer par écrit les prochaines étapes au client",
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
  },

  // terrain / promesse
  {
    id: "dd-ter-prom-01",
    moduleSlug: "terrain",
    lessonSlug: "promesse",
    type: "match",
    title: "Promesse vs Compromis",
    instruction:
      "Associez chaque caractéristique au bon type d'avant-contrat.",
    items: [
      "Engagement unilatéral du vendeur",
      "Engagement bilatéral vendeur-acheteur",
      "Indemnité d'immobilisation (5-10 %)",
      "Dépôt de garantie (5-10 %)",
      "Enregistrement fiscal obligatoire",
    ],
    matchPairs: [
      {
        left: "Engagement unilatéral du vendeur",
        right: "Promesse unilatérale de vente (PUV)",
      },
      {
        left: "Engagement bilatéral vendeur-acheteur",
        right: "Compromis de vente (promesse synallagmatique)",
      },
      {
        left: "Indemnité d'immobilisation (5-10 %)",
        right: "Promesse unilatérale de vente (PUV)",
      },
      {
        left: "Dépôt de garantie (5-10 %)",
        right: "Compromis de vente (promesse synallagmatique)",
      },
      {
        left: "Enregistrement fiscal obligatoire",
        right: "Promesse unilatérale de vente (PUV)",
      },
    ],
  },

  // terrain / fidelisation
  {
    id: "dd-ter-fid-01",
    moduleSlug: "terrain",
    lessonSlug: "fidelisation",
    type: "order",
    title: "Parcours de fidélisation post-vente",
    instruction:
      "Classez les actions de fidélisation dans l'ordre chronologique.",
    items: [
      "Envoyer un message de félicitations après la signature",
      "Offrir un cadeau de bienvenue dans le nouveau logement",
      "Appeler 30 jours après l'emménagement pour un suivi",
      "Envoyer une newsletter trimestrielle sur le marché local",
      "Contacter à la date anniversaire de l'achat",
      "Demander une recommandation et un avis Google",
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
  },
];

export function getDragDropExercises(
  moduleSlug: string,
  lessonSlug: string,
): DragDropExercise[] {
  return ALL_DRAG_DROP_EXERCISES.filter(
    (ex) => ex.moduleSlug === moduleSlug && ex.lessonSlug === lessonSlug,
  );
}
