/**
 * Quiz checkpoints inline — questions de vérification intégrées dans les pages de leçon.
 * 2-3 questions par leçon pour renforcer la compréhension en temps réel.
 */

export type QuizCheckpoint = {
  id: string;
  moduleSlug: string;
  lessonSlug: string;
  question: string;
  options: { label: string; isCorrect: boolean }[];
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
};

const ALL_QUIZ_CHECKPOINTS: QuizCheckpoint[] = [
  // ──────────────────────────────────────────────
  // MODULE 1 — JURIDIQUE
  // ──────────────────────────────────────────────

  // juridique / loi-alur
  {
    id: "qc-jur-alur-01",
    moduleSlug: "juridique",
    lessonSlug: "loi-alur",
    question:
      "Quelle carte professionnelle est nécessaire pour exercer la transaction immobilière ?",
    options: [
      { label: "Carte G (Gestion)", isCorrect: false },
      { label: "Carte T (Transaction)", isCorrect: true },
      { label: "Carte S (Syndic)", isCorrect: false },
      { label: "Carte M (Marchand de biens)", isCorrect: false },
    ],
    explanation:
      "La carte T (Transaction) est délivrée par la CCI et est obligatoire pour toute activité de transaction immobilière depuis la loi ALUR.",
    difficulty: "easy",
  },
  {
    id: "qc-jur-alur-02",
    moduleSlug: "juridique",
    lessonSlug: "loi-alur",
    question:
      "Combien d'heures de formation continue sont obligatoires sur 3 ans selon la loi ALUR ?",
    options: [
      { label: "21 heures", isCorrect: false },
      { label: "42 heures", isCorrect: true },
      { label: "60 heures", isCorrect: false },
      { label: "30 heures", isCorrect: false },
    ],
    explanation:
      "La loi ALUR impose 42 heures de formation continue sur 3 ans (14 heures par an), dont au moins 2 heures de déontologie.",
    difficulty: "easy",
  },
  {
    id: "qc-jur-alur-03",
    moduleSlug: "juridique",
    lessonSlug: "loi-alur",
    question:
      "Quel organisme délivre la carte professionnelle depuis la loi ALUR ?",
    options: [
      { label: "La préfecture", isCorrect: false },
      { label: "Le conseil national de l'immobilier", isCorrect: false },
      { label: "La Chambre de Commerce et d'Industrie (CCI)", isCorrect: true },
      { label: "L'ordre des agents immobiliers", isCorrect: false },
    ],
    explanation:
      "Depuis la loi ALUR (2014), c'est la CCI du lieu d'établissement qui délivre la carte professionnelle, et non plus la préfecture.",
    difficulty: "medium",
  },

  // juridique / compromis
  {
    id: "qc-jur-comp-01",
    moduleSlug: "juridique",
    lessonSlug: "compromis",
    question:
      "Quel est le délai légal de rétractation de l'acheteur après signature du compromis ?",
    options: [
      { label: "7 jours", isCorrect: false },
      { label: "10 jours", isCorrect: true },
      { label: "14 jours", isCorrect: false },
      { label: "30 jours", isCorrect: false },
    ],
    explanation:
      "Le délai de rétractation est de 10 jours calendaires à compter du lendemain de la notification du compromis (loi SRU modifiée par la loi Macron).",
    difficulty: "easy",
  },
  {
    id: "qc-jur-comp-02",
    moduleSlug: "juridique",
    lessonSlug: "compromis",
    question:
      "Que se passe-t-il si la condition suspensive d'obtention de prêt n'est pas réalisée ?",
    options: [
      { label: "L'acheteur perd son dépôt de garantie", isCorrect: false },
      { label: "Le compromis est annulé et le dépôt est restitué", isCorrect: true },
      { label: "Le vendeur peut réclamer des dommages et intérêts", isCorrect: false },
      { label: "L'acheteur doit trouver un autre financement", isCorrect: false },
    ],
    explanation:
      "Si la condition suspensive de prêt n'est pas réalisée dans le délai prévu, le compromis est caduc et le dépôt de garantie est intégralement restitué à l'acheteur.",
    difficulty: "medium",
  },

  // juridique / diagnostics
  {
    id: "qc-jur-diag-01",
    moduleSlug: "juridique",
    lessonSlug: "diagnostics",
    question: "Quelle est la durée de validité du DPE ?",
    options: [
      { label: "3 ans", isCorrect: false },
      { label: "6 ans", isCorrect: false },
      { label: "10 ans", isCorrect: true },
      { label: "Illimitée", isCorrect: false },
    ],
    explanation:
      "Le Diagnostic de Performance Énergétique (DPE) est valable 10 ans. Il doit être refait en cas de travaux modifiant la performance énergétique.",
    difficulty: "easy",
  },
  {
    id: "qc-jur-diag-02",
    moduleSlug: "juridique",
    lessonSlug: "diagnostics",
    question:
      "Le diagnostic amiante est obligatoire pour les bâtiments construits avant quelle date ?",
    options: [
      { label: "1er janvier 1949", isCorrect: false },
      { label: "1er juillet 1997", isCorrect: true },
      { label: "1er janvier 2000", isCorrect: false },
      { label: "1er janvier 1975", isCorrect: false },
    ],
    explanation:
      "L'amiante a été interdit en France le 1er janvier 1997. Le diagnostic est donc obligatoire pour tout bâtiment dont le permis de construire a été délivré avant le 1er juillet 1997.",
    difficulty: "medium",
  },
  {
    id: "qc-jur-diag-03",
    moduleSlug: "juridique",
    lessonSlug: "diagnostics",
    question:
      "Quel diagnostic concerne les risques naturels et technologiques auxquels est exposé un bien ?",
    options: [
      { label: "DPE", isCorrect: false },
      { label: "Diagnostic plomb", isCorrect: false },
      { label: "État des Risques et Pollutions (ERP)", isCorrect: true },
      { label: "Diagnostic électricité", isCorrect: false },
    ],
    explanation:
      "L'ERP (État des Risques et Pollutions) informe l'acquéreur des risques naturels (inondation, séisme), technologiques et de pollution des sols auxquels le bien est exposé.",
    difficulty: "easy",
  },

  // juridique / mandats
  {
    id: "qc-jur-mand-01",
    moduleSlug: "juridique",
    lessonSlug: "mandats",
    question:
      "Quel type de mandat donne l'exclusivité à une seule agence ?",
    options: [
      { label: "Mandat simple", isCorrect: false },
      { label: "Mandat semi-exclusif", isCorrect: false },
      { label: "Mandat exclusif", isCorrect: true },
      { label: "Mandat de recherche", isCorrect: false },
    ],
    explanation:
      "Le mandat exclusif confie la vente du bien à une seule agence. Le vendeur ne peut pas vendre par lui-même sans payer la commission. C'est le mandat qui offre le meilleur taux de vente.",
    difficulty: "easy",
  },
  {
    id: "qc-jur-mand-02",
    moduleSlug: "juridique",
    lessonSlug: "mandats",
    question:
      "Quelle est la durée irrévocable minimale d'un mandat exclusif ?",
    options: [
      { label: "1 mois", isCorrect: false },
      { label: "3 mois (durée usuelle irrévocable)", isCorrect: true },
      { label: "6 mois", isCorrect: false },
      { label: "Il n'y a pas de durée minimale", isCorrect: false },
    ],
    explanation:
      "La durée irrévocable usuelle d'un mandat exclusif est de 3 mois. Au-delà, le mandat peut être dénoncé avec un préavis de 15 jours par lettre recommandée.",
    difficulty: "medium",
  },

  // juridique / copropriete
  {
    id: "qc-jur-copro-01",
    moduleSlug: "juridique",
    lessonSlug: "copropriete",
    question:
      "Quel document résume les données financières et techniques de la copropriété ?",
    options: [
      { label: "Le règlement de copropriété", isCorrect: false },
      { label: "Le carnet d'entretien", isCorrect: false },
      { label: "La fiche synthétique", isCorrect: true },
      { label: "Le procès-verbal d'AG", isCorrect: false },
    ],
    explanation:
      "La fiche synthétique, obligatoire depuis la loi ALUR, regroupe les données financières et techniques essentielles de la copropriété. Elle doit être remise à tout acquéreur.",
    difficulty: "medium",
  },
  {
    id: "qc-jur-copro-02",
    moduleSlug: "juridique",
    lessonSlug: "copropriete",
    question:
      "Les charges de copropriété sont réparties selon quel critère principal ?",
    options: [
      { label: "La superficie du lot", isCorrect: false },
      { label: "Les tantièmes de copropriété", isCorrect: true },
      { label: "Le nombre de pièces", isCorrect: false },
      { label: "L'étage du lot", isCorrect: false },
    ],
    explanation:
      "Les charges générales sont réparties selon les tantièmes (ou millièmes) de copropriété définis dans le règlement de copropriété, proportionnels à la valeur relative de chaque lot.",
    difficulty: "medium",
  },

  // ──────────────────────────────────────────────
  // MODULE 2 — TRANSACTION
  // ──────────────────────────────────────────────

  // transaction / estimation
  {
    id: "qc-tra-est-01",
    moduleSlug: "transaction",
    lessonSlug: "estimation",
    question:
      "Quelle méthode d'estimation compare le bien avec des ventes récentes similaires ?",
    options: [
      { label: "Méthode par capitalisation", isCorrect: false },
      { label: "Analyse Comparative de Marché (ACM)", isCorrect: true },
      { label: "Méthode hédoniste", isCorrect: false },
      { label: "Méthode par le coût de reconstruction", isCorrect: false },
    ],
    explanation:
      "L'Analyse Comparative de Marché (ACM) est la méthode la plus courante. Elle s'appuie sur les prix des biens similaires vendus récemment dans le même secteur géographique.",
    difficulty: "easy",
  },
  {
    id: "qc-tra-est-02",
    moduleSlug: "transaction",
    lessonSlug: "estimation",
    question:
      "Quelle base de données publique permet d'accéder aux prix de vente réels des biens immobiliers ?",
    options: [
      { label: "SeLoger Pro", isCorrect: false },
      { label: "DVF (Demandes de Valeurs Foncières)", isCorrect: true },
      { label: "INSEE Immobilier", isCorrect: false },
      { label: "Cadastre National", isCorrect: false },
    ],
    explanation:
      "La base DVF (Demandes de Valeurs Foncières) est une base de données publique et gratuite qui recense toutes les transactions immobilières enregistrées par les notaires.",
    difficulty: "medium",
  },

  // transaction / prospection
  {
    id: "qc-tra-prosp-01",
    moduleSlug: "transaction",
    lessonSlug: "prospection",
    question: "Qu'appelle-t-on la « pige » en prospection immobilière ?",
    options: [
      { label: "La distribution de flyers dans les boîtes aux lettres", isCorrect: false },
      { label: "Le repérage et contact des annonces de particuliers", isCorrect: true },
      { label: "La visite spontanée de biens en vente", isCorrect: false },
      { label: "L'envoi d'emails marketing en masse", isCorrect: false },
    ],
    explanation:
      "La pige consiste à identifier les biens mis en vente par des particuliers (sur Leboncoin, PAP...) et à les contacter pour proposer ses services professionnels.",
    difficulty: "easy",
  },
  {
    id: "qc-tra-prosp-02",
    moduleSlug: "transaction",
    lessonSlug: "prospection",
    question:
      "Quel est l'objectif principal du « farming » de quartier ?",
    options: [
      { label: "Vendre un maximum de biens rapidement", isCorrect: false },
      { label: "Devenir l'expert de référence d'un secteur géographique précis", isCorrect: true },
      { label: "Obtenir des mandats exclusifs uniquement", isCorrect: false },
      { label: "Distribuer des cartes de visite", isCorrect: false },
    ],
    explanation:
      "Le farming consiste à se positionner comme l'expert incontournable d'un quartier ou secteur précis grâce à une présence régulière et des actions ciblées (courriers, événements, veille marché).",
    difficulty: "medium",
  },

  // transaction / negociation-mandat
  {
    id: "qc-tra-negm-01",
    moduleSlug: "transaction",
    lessonSlug: "negociation-mandat",
    question:
      "Quel est le taux de vente moyen d'un bien sous mandat exclusif comparé à un mandat simple ?",
    options: [
      { label: "Identique, le type de mandat n'a pas d'impact", isCorrect: false },
      { label: "2 fois supérieur", isCorrect: false },
      { label: "3 à 4 fois supérieur", isCorrect: true },
      { label: "10 fois supérieur", isCorrect: false },
    ],
    explanation:
      "Les statistiques FNAIM montrent qu'un bien sous mandat exclusif se vend en moyenne 3 à 4 fois plus souvent et plus rapidement qu'un bien sous mandat simple, grâce à un engagement marketing fort.",
    difficulty: "medium",
  },
  {
    id: "qc-tra-negm-02",
    moduleSlug: "transaction",
    lessonSlug: "negociation-mandat",
    question:
      "Quel argument est le plus convaincant pour obtenir un mandat exclusif ?",
    options: [
      { label: "\"Nos honoraires sont les plus bas du marché\"", isCorrect: false },
      { label: "\"Nous investirons un budget marketing dédié à votre bien\"", isCorrect: true },
      { label: "\"Tous les agents travaillent de la même façon\"", isCorrect: false },
      { label: "\"Le mandat simple est interdit\"", isCorrect: false },
    ],
    explanation:
      "Un plan marketing personnalisé et un budget dédié (photos pro, visite virtuelle, boost portails) sont les arguments les plus convaincants car ils montrent un engagement concret de l'agence.",
    difficulty: "hard",
  },

  // transaction / negociation-avancee
  {
    id: "qc-tra-nega-01",
    moduleSlug: "transaction",
    lessonSlug: "negociation-avancee",
    question:
      "Que signifie BATNA en négociation ?",
    options: [
      { label: "Best Alternative To a Negotiated Agreement", isCorrect: true },
      { label: "Basic Argument for Total Negotiation Achievement", isCorrect: false },
      { label: "Balanced Approach To Neutral Arbitration", isCorrect: false },
      { label: "Buyer And Tenant Negotiation Act", isCorrect: false },
    ],
    explanation:
      "BATNA (Best Alternative To a Negotiated Agreement) désigne la meilleure solution de repli si la négociation échoue. Connaître son BATNA et celui de l'autre partie est clé pour négocier en position de force.",
    difficulty: "medium",
  },
  {
    id: "qc-tra-nega-02",
    moduleSlug: "transaction",
    lessonSlug: "negociation-avancee",
    question:
      "En quoi consiste la technique de l'ancrage en négociation immobilière ?",
    options: [
      { label: "Proposer un prix très bas pour déstabiliser le vendeur", isCorrect: false },
      { label: "Poser un premier chiffre de référence qui influence la suite de la négociation", isCorrect: true },
      { label: "Attendre que l'autre partie fasse la première offre", isCorrect: false },
      { label: "Refuser toute concession jusqu'au dernier moment", isCorrect: false },
    ],
    explanation:
      "L'ancrage consiste à poser un premier prix de référence (souvent le prix affiché ou l'estimation) qui sert de point de départ psychologique. Les études montrent que le premier chiffre avancé influence fortement le résultat final.",
    difficulty: "hard",
  },

  // transaction / crm
  {
    id: "qc-tra-crm-01",
    moduleSlug: "transaction",
    lessonSlug: "crm",
    question:
      "Quel est l'objectif principal d'un CRM en immobilier ?",
    options: [
      { label: "Remplacer les visites physiques par des visites virtuelles", isCorrect: false },
      { label: "Centraliser et suivre tous les contacts, leads et transactions", isCorrect: true },
      { label: "Publier automatiquement les annonces sur les portails", isCorrect: false },
      { label: "Calculer les commissions des agents", isCorrect: false },
    ],
    explanation:
      "Le CRM (Customer Relationship Management) centralise l'ensemble de la relation client : contacts, historique d'échanges, suivi des mandats, relances automatiques et pipeline de vente.",
    difficulty: "easy",
  },
  {
    id: "qc-tra-crm-02",
    moduleSlug: "transaction",
    lessonSlug: "crm",
    question:
      "Quel indicateur CRM mesure le taux de conversion d'un agent immobilier ?",
    options: [
      { label: "Le nombre de visites réalisées", isCorrect: false },
      { label: "Le ratio mandats signés / leads qualifiés", isCorrect: true },
      { label: "Le nombre d'appels passés par jour", isCorrect: false },
      { label: "Le chiffre d'affaires mensuel", isCorrect: false },
    ],
    explanation:
      "Le taux de conversion (mandats signés / leads qualifiés) est l'indicateur clé pour mesurer l'efficacité commerciale d'un agent. Un bon taux se situe entre 15 % et 30 %.",
    difficulty: "hard",
  },

  // ──────────────────────────────────────────────
  // MODULE 3 — FINANCEMENT
  // ──────────────────────────────────────────────

  // financement / credit
  {
    id: "qc-fin-cred-01",
    moduleSlug: "financement",
    lessonSlug: "credit",
    question:
      "Quel est le taux d'endettement maximum recommandé par le HCSF pour un crédit immobilier ?",
    options: [
      { label: "25 %", isCorrect: false },
      { label: "33 %", isCorrect: false },
      { label: "35 %", isCorrect: true },
      { label: "40 %", isCorrect: false },
    ],
    explanation:
      "Depuis janvier 2022, le HCSF (Haut Conseil de Stabilité Financière) recommande un taux d'endettement maximum de 35 % des revenus nets, assurance emprunteur incluse.",
    difficulty: "easy",
  },
  {
    id: "qc-fin-cred-02",
    moduleSlug: "financement",
    lessonSlug: "credit",
    question:
      "Quelle est la durée maximum d'un crédit immobilier selon les recommandations du HCSF ?",
    options: [
      { label: "20 ans", isCorrect: false },
      { label: "25 ans", isCorrect: true },
      { label: "30 ans", isCorrect: false },
      { label: "Pas de limite", isCorrect: false },
    ],
    explanation:
      "Le HCSF recommande une durée maximum de 25 ans (27 ans en cas de différé pour achat en VEFA ou travaux importants).",
    difficulty: "easy",
  },
  {
    id: "qc-fin-cred-03",
    moduleSlug: "financement",
    lessonSlug: "credit",
    question:
      "Quel est le délai de réflexion obligatoire après réception d'une offre de prêt ?",
    options: [
      { label: "7 jours", isCorrect: false },
      { label: "10 jours", isCorrect: true },
      { label: "14 jours", isCorrect: false },
      { label: "30 jours", isCorrect: false },
    ],
    explanation:
      "L'emprunteur dispose d'un délai de réflexion incompressible de 10 jours calendaires à compter de la réception de l'offre de prêt avant de pouvoir l'accepter.",
    difficulty: "medium",
  },

  // financement / fiscalite
  {
    id: "qc-fin-fisc-01",
    moduleSlug: "financement",
    lessonSlug: "fiscalite",
    question:
      "En dessous de quel montant de revenus fonciers annuels peut-on opter pour le micro-foncier ?",
    options: [
      { label: "10 000 EUR", isCorrect: false },
      { label: "15 000 EUR", isCorrect: true },
      { label: "20 000 EUR", isCorrect: false },
      { label: "30 000 EUR", isCorrect: false },
    ],
    explanation:
      "Le régime micro-foncier s'applique automatiquement si les revenus fonciers bruts annuels sont inférieurs à 15 000 EUR. Un abattement forfaitaire de 30 % est alors appliqué.",
    difficulty: "easy",
  },
  {
    id: "qc-fin-fisc-02",
    moduleSlug: "financement",
    lessonSlug: "fiscalite",
    question:
      "Quel est l'abattement forfaitaire en régime micro-BIC pour la location meublée (LMNP) ?",
    options: [
      { label: "30 %", isCorrect: false },
      { label: "50 %", isCorrect: true },
      { label: "71 %", isCorrect: false },
      { label: "10 %", isCorrect: false },
    ],
    explanation:
      "Le régime micro-BIC pour les locations meublées (LMNP) offre un abattement forfaitaire de 50 % sur les revenus locatifs. Pour les meublés de tourisme classés, l'abattement peut atteindre 71 %.",
    difficulty: "medium",
  },

  // financement / rentabilite
  {
    id: "qc-fin-rent-01",
    moduleSlug: "financement",
    lessonSlug: "rentabilite",
    question:
      "Comment calcule-t-on la rentabilité brute d'un investissement locatif ?",
    options: [
      { label: "(Loyer mensuel x 12) / Prix d'achat x 100", isCorrect: true },
      { label: "(Loyer mensuel - charges) x 12 / Prix d'achat x 100", isCorrect: false },
      { label: "Prix d'achat / Loyer annuel x 100", isCorrect: false },
      { label: "(Loyer mensuel x 12 - impôts) / Prix d'achat x 100", isCorrect: false },
    ],
    explanation:
      "La rentabilité brute se calcule simplement : (Loyer annuel / Prix d'achat total) x 100. Par exemple, un bien acheté 200 000 EUR loué 800 EUR/mois offre une rentabilité brute de 4,8 %.",
    difficulty: "easy",
  },
  {
    id: "qc-fin-rent-02",
    moduleSlug: "financement",
    lessonSlug: "rentabilite",
    question:
      "Quelle différence principale existe entre rentabilité nette et rentabilité nette-nette ?",
    options: [
      { label: "Il n'y a aucune différence", isCorrect: false },
      { label: "La nette-nette intègre la fiscalité en plus des charges", isCorrect: true },
      { label: "La nette-nette exclut les frais de notaire", isCorrect: false },
      { label: "La nette-nette est calculée avant impôts", isCorrect: false },
    ],
    explanation:
      "La rentabilité nette déduit les charges (copropriété, taxe foncière, gestion, assurance). La rentabilité nette-nette va plus loin en intégrant la fiscalité (impôt sur le revenu, prélèvements sociaux).",
    difficulty: "hard",
  },

  // financement / dispositifs
  {
    id: "qc-fin-disp-01",
    moduleSlug: "financement",
    lessonSlug: "dispositifs",
    question:
      "Quel dispositif fiscal permet de défiscaliser via la rénovation de logements en centre-ville ancien ?",
    options: [
      { label: "Pinel+", isCorrect: false },
      { label: "Denormandie", isCorrect: true },
      { label: "Malraux", isCorrect: false },
      { label: "Censi-Bouvard", isCorrect: false },
    ],
    explanation:
      "Le dispositif Denormandie offre une réduction d'impôt pour l'achat et la rénovation de logements anciens dans des communes éligibles (centres-villes dégradés). Les travaux doivent représenter au moins 25 % du coût total.",
    difficulty: "medium",
  },
  {
    id: "qc-fin-disp-02",
    moduleSlug: "financement",
    lessonSlug: "dispositifs",
    question:
      "Jusqu'à quel montant annuel peut-on imputer un déficit foncier sur le revenu global ?",
    options: [
      { label: "5 000 EUR", isCorrect: false },
      { label: "10 700 EUR", isCorrect: true },
      { label: "15 000 EUR", isCorrect: false },
      { label: "Pas de limite", isCorrect: false },
    ],
    explanation:
      "Le déficit foncier (charges déductibles supérieures aux revenus fonciers) peut être imputé sur le revenu global dans la limite de 10 700 EUR par an. L'excédent est reportable sur les revenus fonciers des 10 années suivantes.",
    difficulty: "hard",
  },

  // financement / assurances
  {
    id: "qc-fin-ass-01",
    moduleSlug: "financement",
    lessonSlug: "assurances",
    question:
      "La loi Lemoine permet de changer d'assurance emprunteur à quel moment ?",
    options: [
      { label: "Uniquement à la date anniversaire du contrat", isCorrect: false },
      { label: "À tout moment, sans frais ni pénalité", isCorrect: true },
      { label: "Uniquement dans les 12 premiers mois", isCorrect: false },
      { label: "Tous les 3 ans", isCorrect: false },
    ],
    explanation:
      "Depuis la loi Lemoine (juin 2022), tout emprunteur peut résilier et changer d'assurance emprunteur à tout moment, sans frais, sous réserve d'équivalence de garanties.",
    difficulty: "medium",
  },
  {
    id: "qc-fin-ass-02",
    moduleSlug: "financement",
    lessonSlug: "assurances",
    question:
      "Que signifie la « délégation d'assurance » en crédit immobilier ?",
    options: [
      { label: "Confier la gestion de son prêt à un courtier", isCorrect: false },
      { label: "Choisir une assurance externe plutôt que celle de la banque", isCorrect: true },
      { label: "Déléguer le paiement de l'assurance au notaire", isCorrect: false },
      { label: "Souscrire une assurance pour un tiers", isCorrect: false },
    ],
    explanation:
      "La délégation d'assurance permet à l'emprunteur de souscrire une assurance individuelle auprès d'un assureur externe, souvent moins chère que l'assurance groupe proposée par la banque, à garanties équivalentes.",
    difficulty: "easy",
  },

  // ──────────────────────────────────────────────
  // MODULE 4 — MARKETING
  // ──────────────────────────────────────────────

  // marketing / photos
  {
    id: "qc-mkt-photo-01",
    moduleSlug: "marketing",
    lessonSlug: "photos",
    question:
      "Quel est le meilleur moment pour photographier un bien immobilier en intérieur ?",
    options: [
      { label: "Le matin très tôt, avant le lever du soleil", isCorrect: false },
      { label: "En milieu de journée, lumière naturelle maximale", isCorrect: true },
      { label: "Le soir, avec toutes les lumières allumées", isCorrect: false },
      { label: "La nuit, pour un effet cosy", isCorrect: false },
    ],
    explanation:
      "Les photos intérieures sont idéalement prises en milieu de journée (10h-14h) pour maximiser la lumière naturelle qui entre par les fenêtres, tout en évitant les contre-jours directs.",
    difficulty: "easy",
  },
  {
    id: "qc-mkt-photo-02",
    moduleSlug: "marketing",
    lessonSlug: "photos",
    question:
      "Pourquoi les verticales droites sont-elles essentielles en photographie immobilière ?",
    options: [
      { label: "Pour un effet artistique original", isCorrect: false },
      { label: "Pour donner une impression de pièces plus grandes", isCorrect: false },
      { label: "Pour un rendu professionnel et des proportions fidèles", isCorrect: true },
      { label: "Pour respecter une norme légale d'affichage", isCorrect: false },
    ],
    explanation:
      "Les verticales droites (murs, portes, fenêtres parfaitement verticaux) donnent un rendu professionnel et réaliste. Les lignes penchées donnent un aspect amateur et déforment la perception de l'espace.",
    difficulty: "medium",
  },

  // marketing / annonces
  {
    id: "qc-mkt-ann-01",
    moduleSlug: "marketing",
    lessonSlug: "annonces",
    question:
      "Quel est l'objectif principal du titre d'une annonce immobilière ?",
    options: [
      { label: "Décrire précisément le bien (type, m², ville)", isCorrect: false },
      { label: "Capter l'attention et générer le clic en 3 secondes", isCorrect: true },
      { label: "Afficher le prix pour filtrer les acheteurs", isCorrect: false },
      { label: "Respecter les obligations légales d'information", isCorrect: false },
    ],
    explanation:
      "Le titre d'une annonce doit être accrocheur et susciter la curiosité. Un acheteur décide en 3 secondes s'il clique ou passe à l'annonce suivante. Les détails techniques viennent dans le corps de l'annonce.",
    difficulty: "easy",
  },
  {
    id: "qc-mkt-ann-02",
    moduleSlug: "marketing",
    lessonSlug: "annonces",
    question:
      "Combien de photos minimum recommande-t-on pour une annonce immobilière performante ?",
    options: [
      { label: "3 à 5 photos", isCorrect: false },
      { label: "10 à 15 photos", isCorrect: true },
      { label: "1 seule photo de qualité suffit", isCorrect: false },
      { label: "Plus de 30 photos", isCorrect: false },
    ],
    explanation:
      "Les études montrent qu'une annonce avec 10 à 15 photos de qualité génère significativement plus de contacts. Moins de 5 photos inspire la méfiance, plus de 20 photos dilue l'attention.",
    difficulty: "medium",
  },

  // marketing / portails
  {
    id: "qc-mkt-port-01",
    moduleSlug: "marketing",
    lessonSlug: "portails",
    question:
      "Quel portail immobilier est le plus consulté en France ?",
    options: [
      { label: "PAP.fr", isCorrect: false },
      { label: "Leboncoin Immobilier", isCorrect: true },
      { label: "SeLoger", isCorrect: false },
      { label: "Logic-Immo", isCorrect: false },
    ],
    explanation:
      "Leboncoin est le premier site d'annonces immobilières en France en termes de trafic (plus de 30 millions de visiteurs uniques/mois). SeLoger reste le premier portail spécialisé en immobilier professionnel.",
    difficulty: "easy",
  },
  {
    id: "qc-mkt-port-02",
    moduleSlug: "marketing",
    lessonSlug: "portails",
    question:
      "Quelle action augmente le plus la visibilité d'une annonce sur SeLoger ?",
    options: [
      { label: "Ajouter un maximum de texte descriptif", isCorrect: false },
      { label: "Renseigner tous les champs et ajouter des photos HDR", isCorrect: true },
      { label: "Mettre le prix le plus bas possible", isCorrect: false },
      { label: "Publier l'annonce le week-end uniquement", isCorrect: false },
    ],
    explanation:
      "Les algorithmes des portails favorisent les annonces les plus complètes (tous les champs renseignés) avec des visuels de qualité. Une annonce complète à 100 % peut obtenir jusqu'à 3 fois plus de visibilité.",
    difficulty: "medium",
  },

  // marketing / reseaux
  {
    id: "qc-mkt-res-01",
    moduleSlug: "marketing",
    lessonSlug: "reseaux",
    question:
      "Quel format de contenu génère le plus d'engagement sur Instagram pour l'immobilier ?",
    options: [
      { label: "Les photos statiques de biens", isCorrect: false },
      { label: "Les Reels (vidéos courtes de visite)", isCorrect: true },
      { label: "Les textes longs en légende", isCorrect: false },
      { label: "Les liens vers le site de l'agence", isCorrect: false },
    ],
    explanation:
      "Les Reels Instagram (vidéos courtes de 15 à 90 secondes) génèrent jusqu'à 5 fois plus d'engagement que les photos classiques. Les visites express en Reels sont particulièrement virales en immobilier.",
    difficulty: "easy",
  },
  {
    id: "qc-mkt-res-02",
    moduleSlug: "marketing",
    lessonSlug: "reseaux",
    question:
      "Quel réseau social est le plus adapté au personal branding B2B pour un agent immobilier ?",
    options: [
      { label: "TikTok", isCorrect: false },
      { label: "Instagram", isCorrect: false },
      { label: "LinkedIn", isCorrect: true },
      { label: "Snapchat", isCorrect: false },
    ],
    explanation:
      "LinkedIn est le réseau social idéal pour le personal branding professionnel B2B. Il permet de toucher les investisseurs, promoteurs, notaires et autres professionnels de l'immobilier.",
    difficulty: "easy",
  },

  // marketing / seo
  {
    id: "qc-mkt-seo-01",
    moduleSlug: "marketing",
    lessonSlug: "seo",
    question:
      "Quel outil Google gratuit est indispensable pour le SEO local d'un agent immobilier ?",
    options: [
      { label: "Google Ads", isCorrect: false },
      { label: "Google Business Profile (ex Google My Business)", isCorrect: true },
      { label: "Google Analytics uniquement", isCorrect: false },
      { label: "Google Workspace", isCorrect: false },
    ],
    explanation:
      "Google Business Profile (anciennement Google My Business) est l'outil gratuit incontournable pour apparaître dans les résultats locaux et Google Maps. Les avis clients et les publications régulières boostent la visibilité.",
    difficulty: "easy",
  },
  {
    id: "qc-mkt-seo-02",
    moduleSlug: "marketing",
    lessonSlug: "seo",
    question:
      "Quel type de contenu SEO est le plus efficace pour un site immobilier local ?",
    options: [
      { label: "Des pages produit avec uniquement les caractéristiques du bien", isCorrect: false },
      { label: "Des pages quartier avec guide local et mots-clés géolocalisés", isCorrect: true },
      { label: "Des communiqués de presse sur l'agence", isCorrect: false },
      { label: "Des pages de contact dupliquées pour chaque ville", isCorrect: false },
    ],
    explanation:
      "Les pages quartier (guide local, écoles, transports, commerces) avec des mots-clés géolocalisés (\"immobilier Montmartre\", \"agent immobilier 75018\") sont les plus efficaces pour le SEO local et génèrent un trafic qualifié.",
    difficulty: "hard",
  },

  // ──────────────────────────────────────────────
  // MODULE 5 — TERRAIN
  // ──────────────────────────────────────────────

  // terrain / visite
  {
    id: "qc-ter-vis-01",
    moduleSlug: "terrain",
    lessonSlug: "visite",
    question:
      "Par quel espace est-il recommandé de commencer une visite immobilière ?",
    options: [
      { label: "La cuisine, pièce la plus technique", isCorrect: false },
      { label: "La chambre principale, pièce la plus intime", isCorrect: false },
      { label: "La pièce la plus impressionnante (séjour ou terrasse)", isCorrect: true },
      { label: "Les toilettes, pour montrer qu'on n'a rien à cacher", isCorrect: false },
    ],
    explanation:
      "Commencer par la pièce la plus impressionnante (grand séjour lumineux, terrasse avec vue) crée un effet \"wow\" dès le début de la visite et met l'acheteur dans un état émotionnel positif.",
    difficulty: "easy",
  },
  {
    id: "qc-ter-vis-02",
    moduleSlug: "terrain",
    lessonSlug: "visite",
    question:
      "Quelle information est essentielle à préparer avant chaque visite ?",
    options: [
      { label: "Le nom des voisins", isCorrect: false },
      { label: "Le projet de vie et les critères prioritaires de l'acheteur", isCorrect: true },
      { label: "Le prix de tous les biens du quartier", isCorrect: false },
      { label: "L'historique complet de la copropriété", isCorrect: false },
    ],
    explanation:
      "Connaître le projet de vie, le budget et les critères prioritaires de l'acheteur permet de personnaliser la visite, de mettre en avant les points forts pertinents et de traiter les objections par anticipation.",
    difficulty: "medium",
  },

  // terrain / argumentaire
  {
    id: "qc-ter-arg-01",
    moduleSlug: "terrain",
    lessonSlug: "argumentaire",
    question:
      "Quelle méthode structure un argumentaire de vente efficace en immobilier ?",
    options: [
      { label: "La méthode AIDA (Attention, Intérêt, Désir, Action)", isCorrect: false },
      { label: "La méthode CAP (Caractéristique, Avantage, Preuve)", isCorrect: true },
      { label: "La méthode SWOT", isCorrect: false },
      { label: "La méthode des 4P du marketing", isCorrect: false },
    ],
    explanation:
      "La méthode CAP transforme chaque caractéristique du bien en avantage concret pour le client, appuyé par une preuve tangible. Par exemple : triple vitrage (C) → silence absolu (A) → test en fermant les fenêtres (P).",
    difficulty: "medium",
  },
  {
    id: "qc-ter-arg-02",
    moduleSlug: "terrain",
    lessonSlug: "argumentaire",
    question:
      "Face à l'objection « C'est trop cher », quelle est la meilleure approche ?",
    options: [
      { label: "Baisser immédiatement le prix pour ne pas perdre le client", isCorrect: false },
      { label: "Détailler la valeur : prix/m² comparé, prestations, emplacement", isCorrect: true },
      { label: "Ignorer l'objection et changer de sujet", isCorrect: false },
      { label: "Dire que le vendeur ne négociera pas", isCorrect: false },
    ],
    explanation:
      "Face à l'objection prix, il faut recadrer la valeur : comparer le prix/m² avec le marché local, détailler les prestations incluses (parking, cave, travaux récents) et souligner l'emplacement. Le prix est relatif à la valeur perçue.",
    difficulty: "medium",
  },

  // terrain / closing
  {
    id: "qc-ter-clo-01",
    moduleSlug: "terrain",
    lessonSlug: "closing",
    question:
      "Quel signal d'achat indique que le client est prêt à faire une offre ?",
    options: [
      { label: "Il pose des questions sur les défauts du bien", isCorrect: false },
      { label: "Il se projette (\"On mettrait le canapé ici\")", isCorrect: true },
      { label: "Il dit qu'il veut voir d'autres biens", isCorrect: false },
      { label: "Il critique le prix affiché", isCorrect: false },
    ],
    explanation:
      "Quand un acheteur se projette dans le bien (placement des meubles, organisation de la vie quotidienne), c'est un signal d'achat fort. C'est le moment idéal pour proposer de passer à l'étape de l'offre.",
    difficulty: "easy",
  },
  {
    id: "qc-ter-clo-02",
    moduleSlug: "terrain",
    lessonSlug: "closing",
    question:
      "Quelle technique de closing est la plus douce et efficace en immobilier ?",
    options: [
      { label: "Mettre la pression avec un ultimatum", isCorrect: false },
      { label: "La question alternative (\"Préférez-vous signer cette semaine ou la semaine prochaine ?\")", isCorrect: true },
      { label: "Menacer de vendre à un autre acheteur", isCorrect: false },
      { label: "Offrir une remise de dernière minute", isCorrect: false },
    ],
    explanation:
      "La question alternative propose deux options positives (les deux menant à la vente) sans pression. Elle guide naturellement le client vers l'action tout en lui laissant le sentiment de contrôle.",
    difficulty: "hard",
  },

  // terrain / promesse
  {
    id: "qc-ter-prom-01",
    moduleSlug: "terrain",
    lessonSlug: "promesse",
    question:
      "Quelle est la différence principale entre promesse unilatérale et compromis de vente ?",
    options: [
      { label: "Il n'y a aucune différence juridique", isCorrect: false },
      { label: "La promesse n'engage que le vendeur, le compromis engage les deux parties", isCorrect: true },
      { label: "Le compromis est plus cher en frais de notaire", isCorrect: false },
      { label: "La promesse ne nécessite pas de notaire", isCorrect: false },
    ],
    explanation:
      "Dans la promesse unilatérale (PUV), seul le vendeur s'engage à vendre. L'acheteur dispose d'une option d'achat pendant un délai déterminé. Dans le compromis (PSV), les deux parties s'engagent réciproquement.",
    difficulty: "medium",
  },
  {
    id: "qc-ter-prom-02",
    moduleSlug: "terrain",
    lessonSlug: "promesse",
    question:
      "Quel montant représente généralement le dépôt de garantie lors d'un compromis ?",
    options: [
      { label: "1 à 2 % du prix de vente", isCorrect: false },
      { label: "5 à 10 % du prix de vente", isCorrect: true },
      { label: "15 à 20 % du prix de vente", isCorrect: false },
      { label: "Le montant est libre et non encadré", isCorrect: false },
    ],
    explanation:
      "Le dépôt de garantie (ou séquestre) représente généralement 5 à 10 % du prix de vente. Il est versé sur le compte séquestre du notaire ou de l'agent immobilier habilité et s'impute sur le prix final.",
    difficulty: "easy",
  },

  // terrain / fidelisation
  {
    id: "qc-ter-fid-01",
    moduleSlug: "terrain",
    lessonSlug: "fidelisation",
    question:
      "Quel est le meilleur moment pour demander une recommandation à un client ?",
    options: [
      { label: "Juste après la première visite", isCorrect: false },
      { label: "Après la signature chez le notaire, quand la satisfaction est maximale", isCorrect: true },
      { label: "6 mois après la vente", isCorrect: false },
      { label: "Avant même d'avoir trouvé le bien", isCorrect: false },
    ],
    explanation:
      "Le moment optimal pour demander une recommandation est juste après la signature de l'acte authentique, quand la satisfaction et l'émotion positive du client sont au plus haut. Un rappel peut être fait à l'anniversaire de l'achat.",
    difficulty: "medium",
  },
  {
    id: "qc-ter-fid-02",
    moduleSlug: "terrain",
    lessonSlug: "fidelisation",
    question:
      "Quel outil digital est le plus efficace pour maintenir le contact avec les anciens clients ?",
    options: [
      { label: "Les publicités Facebook ciblées", isCorrect: false },
      { label: "Une newsletter trimestrielle personnalisée (marché local, conseils)", isCorrect: true },
      { label: "Les SMS promotionnels quotidiens", isCorrect: false },
      { label: "Les appels téléphoniques hebdomadaires", isCorrect: false },
    ],
    explanation:
      "Une newsletter trimestrielle personnalisée (tendances du marché local, conseils patrimoniaux, actualités) est le meilleur outil pour rester dans l'esprit du client sans être intrusif et déclencher des recommandations spontanées.",
    difficulty: "easy",
  },

  // ── transaction / prospection ──────────────────────────
  {
    id: "qc-trans-prosp-01",
    moduleSlug: "transaction",
    lessonSlug: "prospection",
    question: "Quelle est la taille maximale recommandée pour un secteur de prospection efficace ?",
    options: [
      { label: "500 logements", isCorrect: false },
      { label: "2 000 logements", isCorrect: true },
      { label: "5 000 logements", isCorrect: false },
      { label: "10 000 logements", isCorrect: false },
    ],
    explanation: "Un secteur de 2 000 logements environ permet une maîtrise complète du marché local, un taux de pénétration mesurable et une présence régulière. Au-delà, la prospection se dilue et perd en efficacité.",
    difficulty: "easy",
  },
  {
    id: "qc-trans-prosp-02",
    moduleSlug: "transaction",
    lessonSlug: "prospection",
    question: "Quel est le message le plus efficace pour amorcer un porte-à-porte de prospection ?",
    options: [
      { label: "Présenter les services de l'agence et ses tarifs", isCorrect: false },
      { label: "Mentionner une vente récente dans la rue et demander si le propriétaire a des projets", isCorrect: true },
      { label: "Demander directement si le propriétaire veut vendre", isCorrect: false },
      { label: "Distribuer un flyer et repartir sans engager la conversation", isCorrect: false },
    ],
    explanation: "Mentionner une vente récente dans la même rue est le déclencheur le plus efficace : il prouve votre présence locale, crée un ancrage concret et ouvre naturellement la conversation sur les projets du propriétaire.",
    difficulty: "medium",
  },
  {
    id: "qc-trans-prosp-03",
    moduleSlug: "transaction",
    lessonSlug: "prospection",
    question: "En moyenne, combien de relances faut-il pour signer un mandat selon les études terrain ?",
    options: [
      { label: "1 relance suffit", isCorrect: false },
      { label: "2 relances maximum", isCorrect: false },
      { label: "3 à 5 relances sont nécessaires", isCorrect: true },
      { label: "Plus de 10 relances", isCorrect: false },
    ],
    explanation: "80 % des mandats se signent après la 3e à 5e relance. La plupart des agents abandonnent après 1 ou 2 tentatives — c'est là que la discipline de prospection fait la différence entre les meilleurs et les autres.",
    difficulty: "medium",
  },

  // ── transaction / crm ──────────────────────────────────
  {
    id: "qc-trans-crm-01",
    moduleSlug: "transaction",
    lessonSlug: "crm",
    question: "Que signifie l'acronyme CRM en immobilier ?",
    options: [
      { label: "Calcul de Rendement Mensuel", isCorrect: false },
      { label: "Customer Relationship Management (Gestion de la Relation Client)", isCorrect: true },
      { label: "Compte Rendu de Mission", isCorrect: false },
      { label: "Contrat de Réservation de Mandat", isCorrect: false },
    ],
    explanation: "CRM signifie Customer Relationship Management — c'est un outil logiciel qui centralise tous vos contacts, historiques d'interactions, rappels et statistiques de pipeline pour piloter votre activité de manière systématique.",
    difficulty: "easy",
  },
  {
    id: "qc-trans-crm-02",
    moduleSlug: "transaction",
    lessonSlug: "crm",
    question: "Selon la loi de Pareto appliquée à un portefeuille clients immobilier, quel pourcentage de contacts génère 80 % du chiffre d'affaires ?",
    options: [
      { label: "5 %", isCorrect: false },
      { label: "20 %", isCorrect: true },
      { label: "50 %", isCorrect: false },
      { label: "80 %", isCorrect: false },
    ],
    explanation: "La loi de Pareto (80/20) s'applique parfaitement en prospection immobilière : 20 % de vos contacts qualifiés génèrent 80 % de vos mandats et revenus. Identifiez ces 20 % dans votre CRM et concentrez-y vos efforts.",
    difficulty: "medium",
  },
  {
    id: "qc-trans-crm-03",
    moduleSlug: "transaction",
    lessonSlug: "crm",
    question: "Après combien de jours d'inactivité faut-il déclencher une relance automatique sur un contact qualifié ?",
    options: [
      { label: "7 jours", isCorrect: false },
      { label: "14 jours", isCorrect: true },
      { label: "30 jours", isCorrect: false },
      { label: "60 jours", isCorrect: false },
    ],
    explanation: "Un contact qualifié sans interaction depuis 14 jours risque d'être approché par un concurrent. Le délai optimal de relance est de 14 jours pour les contacts chauds, 30 jours pour les contacts tièdes et 90 jours pour les contacts froids.",
    difficulty: "medium",
  },

  // ── marketing / reseaux ────────────────────────────────
  {
    id: "qc-mkt-rsx-01",
    moduleSlug: "marketing",
    lessonSlug: "reseaux",
    question: "Quelle proportion maximale de contenu promotionnel (biens à vendre, honoraires) est recommandée sur les réseaux sociaux immobiliers ?",
    options: [
      { label: "80 % promotionnel, 20 % informatif", isCorrect: false },
      { label: "50 % promotionnel, 50 % informatif", isCorrect: false },
      { label: "20 % promotionnel, 80 % informatif", isCorrect: true },
      { label: "100 % promotionnel uniquement", isCorrect: false },
    ],
    explanation: "La règle 80/20 des réseaux sociaux : 80 % de contenu utile et informatif (marché, conseils, coulisses) et 20 % promotionnel. Un compte full-promotion voit son taux d'engagement chuter et perd des abonnés.",
    difficulty: "easy",
  },
  {
    id: "qc-mkt-rsx-02",
    moduleSlug: "marketing",
    lessonSlug: "reseaux",
    question: "Quel élément est le plus efficace pour augmenter la portée organique d'une publication immobilière sur Instagram ?",
    options: [
      { label: "Utiliser des hashtags génériques comme #immobilier (>5M posts)", isCorrect: false },
      { label: "Publier à n'importe quelle heure du jour", isCorrect: false },
      { label: "Utiliser des hashtags locaux de niche (10 000 à 200 000 posts) et publier aux heures de pointe", isCorrect: true },
      { label: "Publier uniquement des photos de biens sans texte dans la légende", isCorrect: false },
    ],
    explanation: "Les hashtags de niche locale (ex: #appartementLyon6, #immoNantais) ciblent une audience qualifiée et moins concurrentielle. Combinés aux heures de pointe (7h-8h, 12h-13h, 18h-20h), ils maximisent la portée organique sans budget publicitaire.",
    difficulty: "medium",
  },
  {
    id: "qc-mkt-rsx-03",
    moduleSlug: "marketing",
    lessonSlug: "reseaux",
    question: "Quelle action génère le meilleur taux de conversion prospect → mandat via les réseaux sociaux ?",
    options: [
      { label: "Booster une publication avec de la publicité payante", isCorrect: false },
      { label: "Envoyer un message privé personnalisé aux profils ayant liké le contenu", isCorrect: true },
      { label: "Partager ses publications dans des groupes Facebook généraux", isCorrect: false },
      { label: "Publier quotidiennement sans stratégie de fond", isCorrect: false },
    ],
    explanation: "Un DM personnalisé aux profils ayant déjà interagi avec votre contenu convertit 10× mieux que la publicité payante. Ces personnes ont déjà montré un intérêt — le contact direct, chaleureux et personnalisé, finalise la connexion.",
    difficulty: "hard",
  },

  // ── marketing / seo ────────────────────────────────────
  {
    id: "qc-mkt-seo-01",
    moduleSlug: "marketing",
    lessonSlug: "seo",
    question: "Quel est l'outil gratuit de Google le plus important pour surveiller le référencement d'un site d'agence immobilière ?",
    options: [
      { label: "Google Ads", isCorrect: false },
      { label: "Google Search Console", isCorrect: true },
      { label: "Google Analytics uniquement", isCorrect: false },
      { label: "Google Keyword Planner", isCorrect: false },
    ],
    explanation: "Google Search Console (gratuit) permet de voir exactement sur quels mots-clés votre site apparaît, votre position moyenne, votre taux de clic, et les pages indexées. C'est l'outil de base pour tout suivi SEO immobilier.",
    difficulty: "easy",
  },
  {
    id: "qc-mkt-seo-02",
    moduleSlug: "marketing",
    lessonSlug: "seo",
    question: "Quel type de contenu génère le meilleur référencement local pour une agence immobilière ?",
    options: [
      { label: "Des articles sur les tendances nationales de l'immobilier", isCorrect: false },
      { label: "Des pages et articles hyper-locaux (prix au m² du quartier, guide du quartier, ventes récentes)", isCorrect: true },
      { label: "La liste complète de tous les biens disponibles sans texte descriptif", isCorrect: false },
      { label: "Des pages génériques sur les types de contrats immobiliers", isCorrect: false },
    ],
    explanation: "Le SEO local immobilier est dominé par le contenu hyper-local : guide du quartier X, prix au m² de la rue Y, statistiques de vente du secteur Z. Ce contenu répond exactement aux requêtes des prospects locaux et génère un trafic qualifié à fort taux de conversion.",
    difficulty: "medium",
  },
  {
    id: "qc-mkt-seo-03",
    moduleSlug: "marketing",
    lessonSlug: "seo",
    question: "Quel Core Web Vital Google considère comme le plus important pour le classement mobile ?",
    options: [
      { label: "Le nombre de pages visitées par session", isCorrect: false },
      { label: "La vitesse de chargement de la première image principale (LCP < 2,5s)", isCorrect: true },
      { label: "Le nombre d'annonces publiées par semaine", isCorrect: false },
      { label: "La taille totale du site en Mo", isCorrect: false },
    ],
    explanation: "Le LCP (Largest Contentful Paint) doit être inférieur à 2,5 secondes pour un classement optimal. Un site immobilier avec des images non-compressées peut dépasser 5s de chargement, pénalisant fortement son référencement mobile qui représente 70 % du trafic.",
    difficulty: "hard",
  },

  // ── terrain / argumentaire ─────────────────────────────
  {
    id: "qc-ter-arg-01",
    moduleSlug: "terrain",
    lessonSlug: "argumentaire",
    question: "Quelle est la technique d'argumentation la plus efficace face à un vendeur qui trouve les honoraires trop élevés ?",
    options: [
      { label: "Baisser immédiatement les honoraires pour sécuriser le mandat", isCorrect: false },
      { label: "Expliquer en détail toutes les actions marketing réalisées", isCorrect: false },
      { label: "Calculer et présenter le net vendeur comparé à la vente sans agence, avec les données marché", isCorrect: true },
      { label: "Rappeler que les honoraires sont dans la norme du marché", isCorrect: false },
    ],
    explanation: "La technique du 'net vendeur comparé' est la plus convaincante : montrez avec des données chiffrées que la vente via agence génère un prix 10-15 % supérieur au PAP, ce qui compense largement les honoraires. Ne défendez jamais les honoraires en isolation.",
    difficulty: "medium",
  },
  {
    id: "qc-ter-arg-02",
    moduleSlug: "terrain",
    lessonSlug: "argumentaire",
    question: "Qu'est-ce qu'une objection 'prétexte' en négociation immobilière ?",
    options: [
      { label: "Une objection sur le prix du bien", isCorrect: false },
      { label: "Une objection qui cache le vrai motif de résistance du client", isCorrect: true },
      { label: "Une objection concernant les délais de vente", isCorrect: false },
      { label: "Une objection légale sur les conditions du contrat", isCorrect: false },
    ],
    explanation: "Une objection 'prétexte' (ex: 'vos honoraires sont trop élevés') cache souvent une vraie résistance (peur de se décider, mauvaise expérience passée, concurrent préféré). La technique est de reformuler : 'Mis à part les honoraires, y a-t-il autre chose qui vous retient ?'",
    difficulty: "hard",
  },
  {
    id: "qc-ter-arg-03",
    moduleSlug: "terrain",
    lessonSlug: "argumentaire",
    question: "À quel moment d'un rendez-vous vendeur faut-il présenter son prix d'estimation ?",
    options: [
      { label: "Dès l'ouverture du rendez-vous pour cadrer immédiatement", isCorrect: false },
      { label: "Après avoir découvert les motivations et le contexte du vendeur", isCorrect: true },
      { label: "À la fin uniquement si le vendeur demande", isCorrect: false },
      { label: "Par email avant le rendez-vous pour gagner du temps", isCorrect: false },
    ],
    explanation: "Le prix s'annonce après la phase de découverte : motivations de vente, contraintes de délai, utilisation du produit de la vente. Sans ce contexte, une estimation basse peut braquer le vendeur. Avec ce contexte, vous pouvez la présenter en alignement avec ses objectifs.",
    difficulty: "medium",
  },

  // ── terrain / fidelisation ─────────────────────────────
  {
    id: "qc-ter-fid-03",
    moduleSlug: "terrain",
    lessonSlug: "fidelisation",
    question: "Combien de transactions en moyenne un acheteur immobilier réalise-t-il sur toute sa vie d'adulte ?",
    options: [
      { label: "1 à 2 transactions", isCorrect: false },
      { label: "3 à 5 transactions", isCorrect: true },
      { label: "7 à 10 transactions", isCorrect: false },
      { label: "Plus de 15 transactions", isCorrect: false },
    ],
    explanation: "En moyenne, un particulier réalise 3 à 5 transactions immobilières sur sa vie (résidence principale + évolutions familiales + investissement). La 'valeur à vie' d'un client fidélisé est donc considérable — chaque acheteur satisfait représente potentiellement plusieurs dizaines de milliers d'euros d'honoraires.",
    difficulty: "medium",
  },
];

export function getQuizCheckpoints(
  moduleSlug: string,
  lessonSlug: string,
): QuizCheckpoint[] {
  return ALL_QUIZ_CHECKPOINTS.filter(
    (qc) => qc.moduleSlug === moduleSlug && qc.lessonSlug === lessonSlug,
  );
}

export function getQuizCheckpointById(id: string): QuizCheckpoint | undefined {
  return ALL_QUIZ_CHECKPOINTS.find((qc) => qc.id === id);
}
