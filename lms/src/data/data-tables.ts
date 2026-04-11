/**
 * Tableaux de données interactifs — leçons immobilières.
 * Chaque tableau est triable et filtrable.
 */

export type TableCell = {
  value: string;
  highlight?: boolean; // fond or (#d4af37)
  badge?: string; // texte du badge coloré
  badgeColor?: "green" | "red" | "blue" | "gold" | "navy";
};

export type DataTable = {
  id: string;
  moduleSlug: string;
  lessonSlug: string;
  title: string;
  description?: string;
  icon: string;
  headers: string[];
  rows: TableCell[][];
  sortable?: boolean;
  notes?: string;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function cell(value: string): TableCell {
  return { value };
}

function highlighted(value: string): TableCell {
  return { value, highlight: true };
}

function badgeCell(
  value: string,
  badge: string,
  badgeColor: TableCell["badgeColor"],
): TableCell {
  return { value, badge, badgeColor };
}

function oui(): TableCell {
  return { value: "Oui", badge: "✓", badgeColor: "green" };
}

function non(): TableCell {
  return { value: "Non", badge: "✗", badgeColor: "red" };
}

// ---------------------------------------------------------------------------
// Tableaux
// ---------------------------------------------------------------------------

const diagnosticsObligatoires: DataTable = {
  id: "diagnostics-obligatoires",
  moduleSlug: "juridique",
  lessonSlug: "diagnostics",
  title: "Tableau des diagnostics obligatoires",
  description:
    "Récapitulatif des diagnostics techniques à fournir lors d'une vente ou d'une location.",
  icon: "🔍",
  headers: [
    "Diagnostic",
    "Biens concernés",
    "Durée de validité",
    "Obligatoire à la vente",
    "Obligatoire à la location",
  ],
  sortable: true,
  rows: [
    [
      cell("DPE — Diagnostic de Performance Énergétique"),
      cell("Tous les biens (sauf exceptions)"),
      cell("10 ans"),
      oui(),
      oui(),
    ],
    [
      cell("Amiante"),
      cell("Logements permis de construire avant le 1/07/1997"),
      cell("Illimité si négatif"),
      oui(),
      oui(),
    ],
    [
      cell("Plomb — CREP"),
      cell("Logements construits avant 1949"),
      cell("1 an (si positif) / illimité (si négatif)"),
      oui(),
      oui(),
    ],
    [
      cell("Termites"),
      cell("Zones déclarées à risque par arrêté préfectoral"),
      cell("6 mois"),
      oui(),
      non(),
    ],
    [
      cell("Gaz"),
      cell("Installation de plus de 15 ans"),
      cell("3 ans"),
      oui(),
      oui(),
    ],
    [
      cell("Électricité"),
      cell("Installation de plus de 15 ans"),
      cell("3 ans"),
      oui(),
      oui(),
    ],
    [
      cell("ERP — État des Risques et Pollutions"),
      cell("Tous les biens en zone à risque"),
      cell("6 mois"),
      oui(),
      oui(),
    ],
    [
      cell("Assainissement non collectif"),
      cell("Biens non raccordés au tout-à-l'égout"),
      cell("3 ans"),
      oui(),
      non(),
    ],
    [
      cell("Loi Carrez"),
      cell("Lots de copropriété (surface privative)"),
      cell("Illimité (sauf travaux)"),
      oui(),
      non(),
    ],
    [
      cell("Bruit — Nuisances sonores aériennes"),
      cell("Biens en zone d'exposition au bruit d'aéroport"),
      cell("6 mois"),
      oui(),
      oui(),
    ],
  ],
  notes:
    "Les durées de validité s'appliquent à compter de la date de réalisation du diagnostic. En cas de travaux affectant les installations, le diagnostic doit être renouvelé. Source : Ministère du Logement 2024.",
};

const conditionsSuspensives: DataTable = {
  id: "conditions-suspensives",
  moduleSlug: "juridique",
  lessonSlug: "compromis",
  title: "Conditions suspensives types",
  description:
    "Les conditions suspensives les plus fréquentes dans un compromis de vente et leurs implications.",
  icon: "📋",
  headers: [
    "Condition",
    "Délai standard",
    "Conséquence si non levée",
    "Fréquence",
  ],
  sortable: true,
  rows: [
    [
      cell("Obtention du crédit immobilier"),
      cell("45 à 60 jours"),
      cell(
        "Annulation du compromis sans pénalité — restitution intégrale de l'acompte",
      ),
      badgeCell("Très fréquente", "90 %", "gold"),
    ],
    [
      cell("Obtention du permis de construire"),
      cell("2 à 6 mois"),
      cell(
        "Annulation du compromis — l'acquéreur récupère son séquestre",
      ),
      badgeCell("Fréquente", "45 %", "blue"),
    ],
    [
      cell("Vente préalable d'un autre bien"),
      cell("2 à 4 mois"),
      cell(
        "Annulation possible selon clause — négociation souvent nécessaire",
      ),
      badgeCell("Courante", "30 %", "blue"),
    ],
    [
      cell("Absence de servitude non déclarée"),
      cell("Délai de rétractation + instruction"),
      cell(
        "Annulation du compromis si servitude cachée découverte en phase de due diligence",
      ),
      badgeCell("Rare", "10 %", "navy"),
    ],
    [
      cell("Absence d'exercice du droit de préemption"),
      cell("2 mois (DPU urbain)"),
      cell(
        "Vente annulée — la collectivité se substitue à l'acquéreur au même prix",
      ),
      badgeCell("Variable", "15 %", "blue"),
    ],
  ],
  notes:
    "Le délai de 10 jours de rétractation (loi SRU) court à compter de la première présentation de la lettre recommandée notifiant le compromis signé. Ce délai est distinct des conditions suspensives.",
};

const comparatifCredits: DataTable = {
  id: "comparatif-credits",
  moduleSlug: "financement",
  lessonSlug: "credit",
  title: "Comparatif des types de crédit immobilier",
  description:
    "Les principaux types de prêts disponibles sur le marché français avec leurs caractéristiques.",
  icon: "🏦",
  headers: [
    "Type de crédit",
    "Taux",
    "Durée typique",
    "Avantage principal",
    "Inconvénient",
    "Profil idéal",
  ],
  sortable: true,
  rows: [
    [
      highlighted("Taux fixe"),
      badgeCell("3,5 – 4,2 %", "Stable", "navy"),
      cell("15 – 25 ans"),
      cell("Prévisibilité totale des mensualités sur toute la durée"),
      cell("Taux légèrement plus élevé qu'un variable en phase basse"),
      cell("Primo-accédants, ménages avec budget serré"),
    ],
    [
      cell("Taux variable capé"),
      badgeCell("3,0 – 3,8 %", "Évolutif", "blue"),
      cell("15 – 25 ans"),
      cell("Bénéfice d'une baisse des taux — cap limite la hausse"),
      cell("Incertitude sur les mensualités futures"),
      cell("Investisseurs à horizon revente court terme"),
    ],
    [
      cell("Prêt in fine"),
      badgeCell("3,8 – 4,5 %", "Intérêts", "blue"),
      cell("5 – 15 ans"),
      cell("Mensualités très faibles (intérêts seuls) — fiscalité optimisée"),
      cell("Capital remboursé en totalité à l'échéance"),
      cell("Investisseurs locatifs à fort TMI"),
    ],
    [
      highlighted("PTZ — Prêt à Taux Zéro"),
      badgeCell("0 %", "Gratuit", "green"),
      cell("20 – 25 ans"),
      cell("Sans intérêts, différé possible — aide au primo-accès"),
      cell("Réservé première résidence principale, zones éligibles, plafonds"),
      cell("Primo-accédants sous conditions de ressources"),
    ],
    [
      cell("PAS — Prêt d'Accession Sociale"),
      badgeCell("3,1 – 3,6 %", "Aidé", "gold"),
      cell("5 – 35 ans"),
      cell("Taux plafonné — exonération de frais de garantie"),
      cell("Plafonds de ressources stricts selon zone et composition famille"),
      cell("Ménages modestes primo-accédants en résidence principale"),
    ],
    [
      cell("Prêt relais"),
      badgeCell("4,0 – 4,8 %", "Court terme", "red"),
      cell("12 – 24 mois"),
      cell("Permet d'acheter avant de vendre — évite la vente forcée"),
      cell("Coûteux si la vente tarde — double charge temporaire"),
      cell("Propriétaires changeant de résidence principale"),
    ],
  ],
  notes:
    "Taux indicatifs au 1er trimestre 2025. Les taux réels dépendent du profil emprunteur, de l'apport et de la banque. Hors assurance emprunteur (0,1 – 0,4 % selon âge et état de santé).",
};

const regimesFiscaux: DataTable = {
  id: "regimes-fiscaux-location",
  moduleSlug: "financement",
  lessonSlug: "fiscalite",
  title: "Régimes fiscaux pour la location",
  description:
    "Comparatif des régimes d'imposition des revenus locatifs en France.",
  icon: "📊",
  headers: [
    "Régime",
    "Plafond de revenus",
    "Abattement forfaitaire",
    "Charges déductibles",
    "Idéal pour",
  ],
  sortable: true,
  rows: [
    [
      cell("Micro-foncier"),
      badgeCell("15 000 €/an", "Plafond", "blue"),
      badgeCell("30 %", "Automatique", "gold"),
      cell("Aucune (abattement forfaitaire uniquement)"),
      cell("Petits bailleurs avec peu de charges réelles"),
    ],
    [
      cell("Foncier réel"),
      cell("Aucun plafond"),
      cell("Aucun (déduction charges réelles)"),
      cell(
        "Intérêts d'emprunt, travaux, taxes foncières, assurances, frais de gestion",
      ),
      cell("Bailleurs avec travaux importants ou crédit en cours"),
    ],
    [
      cell("Micro-BIC (meublé)"),
      badgeCell("77 700 €/an", "Plafond", "blue"),
      badgeCell("50 %", "Automatique", "gold"),
      cell("Aucune (abattement forfaitaire)"),
      cell("Loueurs meublés débutants avec peu de charges"),
    ],
    [
      highlighted("BIC réel — LMNP"),
      cell("Aucun plafond"),
      cell("Aucun (déduction charges + amortissements)"),
      cell(
        "Toutes charges + amortissement du bien et du mobilier (sur 20 – 30 ans)",
      ),
      cell("Investisseurs souhaitant effacer fiscalement leurs revenus locatifs"),
    ],
    [
      cell("LMP — Loueur Meublé Professionnel"),
      cell("Recettes > 23 000 € et > autres revenus"),
      cell("Aucun (régime réel obligatoire)"),
      cell(
        "Même que LMNP + déduction des déficits sur revenu global + exonération plus-values",
      ),
      cell("Investisseurs immobiliers à titre principal"),
    ],
  ],
  notes:
    "Depuis 2023, le seuil micro-BIC pour les meublés de tourisme classés est distinct (188 700 €). Le statut LMP est automatiquement acquis si les deux conditions de recettes sont simultanément remplies.",
};

const dispositifsDefiscalisation: DataTable = {
  id: "dispositifs-defiscalisation",
  moduleSlug: "financement",
  lessonSlug: "dispositifs",
  title: "Dispositifs de défiscalisation immobilière",
  description:
    "Comparatif des principaux dispositifs fiscaux pour l'investissement immobilier.",
  icon: "🏛️",
  headers: [
    "Dispositif",
    "Réduction d'impôt",
    "Durée d'engagement",
    "Plafond d'investissement",
    "Zone éligible",
    "Statut",
  ],
  sortable: true,
  rows: [
    [
      cell("Pinel+"),
      badgeCell("17,5 % / 21 %", "Jusqu'à", "gold"),
      cell("9 ou 12 ans"),
      cell("300 000 € / 5 500 €/m²"),
      cell("Zones A bis, A, B1"),
      badgeCell("Actif", "2024", "green"),
    ],
    [
      highlighted("Denormandie"),
      badgeCell("12 – 21 %", "Selon durée", "gold"),
      cell("6, 9 ou 12 ans"),
      cell("300 000 €"),
      cell("222 villes du programme Action Cœur de Ville"),
      badgeCell("Actif", "2026", "green"),
    ],
    [
      cell("Malraux"),
      badgeCell("22 – 30 %", "Des travaux", "gold"),
      cell("Aucune (travaux réalisés)"),
      cell("400 000 € de travaux sur 4 ans"),
      cell("ZPPAUP / Site Patrimoine Remarquable"),
      badgeCell("Actif", "Permanent", "green"),
    ],
    [
      cell("Monuments Historiques"),
      badgeCell("100 %", "Des travaux", "navy"),
      cell("Aucune"),
      cell("Aucun plafond"),
      cell("Bâtiments classés ou inscrits MH"),
      badgeCell("Actif", "Permanent", "green"),
    ],
    [
      cell("LMNP Censi-Bouvard"),
      badgeCell("11 %", "Du prix HT", "blue"),
      cell("9 ans"),
      cell("300 000 € HT"),
      cell("Résidences services agréées"),
      badgeCell("Terminé", "2022", "red"),
    ],
    [
      cell("Déficit foncier"),
      cell("Déduction du revenu global"),
      cell("3 ans de location minimum"),
      badgeCell("10 700 €/an", "Revenu global", "blue"),
      cell("Tous biens en location nue"),
      badgeCell("Actif", "Permanent", "green"),
    ],
  ],
  notes:
    "Le dispositif Pinel classique s'est terminé le 31/12/2024. Seul le Pinel+ (critères de qualité renforcés) reste actif. Le déficit foncier est porté à 21 400 €/an pour les travaux de rénovation énergétique réalisés entre 2023 et 2025.",
};

const comparatifPortails: DataTable = {
  id: "comparatif-portails",
  moduleSlug: "marketing",
  lessonSlug: "portails",
  title: "Comparatif des portails immobiliers",
  description:
    "Analyse des principales plateformes de diffusion d'annonces immobilières en France.",
  icon: "🌐",
  headers: [
    "Portail",
    "Audience mensuelle",
    "Abonnement agent (approx.)",
    "Points forts",
    "Spécialité",
  ],
  sortable: true,
  rows: [
    [
      highlighted("SeLoger"),
      badgeCell("12 M visiteurs", "N°1", "gold"),
      cell("200 – 600 €/mois selon offre"),
      cell(
        "Notoriété maximale, outils vendeurs performants, statistiques annonces",
      ),
      cell("Tous segments — résidentiel et prestige"),
    ],
    [
      cell("Leboncoin Immo"),
      badgeCell("9 M visiteurs", "N°2", "blue"),
      cell("Gratuit à 300 €/mois"),
      cell("Très forte audience grand public, petits prix, zones rurales"),
      cell("Primo-accédants, petits budgets, zones B et C"),
    ],
    [
      cell("PAP — De Particulier à Particulier"),
      cell("4,5 M visiteurs"),
      cell("Non accessible aux agents"),
      cell("Clientèle cherchant à éviter les frais d'agence"),
      cell("Marché de particuliers — veille concurrentielle"),
    ],
    [
      cell("Logic-Immo"),
      cell("3 M visiteurs"),
      cell("Inclus dans offre SeLoger Group"),
      cell("Rediffusion automatique via SeLoger Group, coûts mutualisés"),
      cell("Résidentiel standard — complément SeLoger"),
    ],
    [
      cell("Bien'ici"),
      badgeCell("5,5 M visiteurs", "Croissance", "blue"),
      cell("150 – 400 €/mois"),
      cell("Carte interactive, recherche géographique avancée, UX moderne"),
      cell("Clientèle digitale active — neuf et ancien"),
    ],
    [
      cell("Propriétés de France"),
      cell("800 K visiteurs"),
      cell("Sur devis (premium)"),
      cell("Clientèle aisée, belles demeures, château, manoirs"),
      cell("Prestige et propriétés de caractère"),
    ],
    [
      cell("MeilleursAgents"),
      cell("2 M visiteurs"),
      cell("200 – 350 €/mois"),
      cell(
        "Estimation en ligne intégrée, leads vendeurs qualifiés, indice de prix",
      ),
      cell("Prospection vendeurs — accompagnement estimation"),
    ],
  ],
  notes:
    "Données d'audience indicatives (Mediametrie 2024). Les abonnements varient selon la zone géographique, le nombre de mandats et les options choisies. La plupart des portails proposent des offres groupées.",
};

const techniquesNegociation: DataTable = {
  id: "techniques-negociation",
  moduleSlug: "transaction",
  lessonSlug: "negociation-avancee",
  title: "Techniques de négociation immobilière",
  description:
    "Répertoire des techniques de négociation professionnelles avec leurs conditions d'application.",
  icon: "🤝",
  headers: [
    "Technique",
    "Description",
    "Quand l'utiliser",
    "Taux de réussite",
    "Niveau",
  ],
  sortable: true,
  rows: [
    [
      highlighted("BATNA"),
      cell(
        "Best Alternative To a Negotiated Agreement — connaître sa meilleure alternative avant de négocier",
      ),
      cell("En amont de toute négociation — préparer son plancher minimal"),
      badgeCell("Fondamental", "Stratégique", "navy"),
      badgeCell("Expert", "Avancé", "gold"),
    ],
    [
      cell("Ancrage haut"),
      cell(
        "Poser une première offre ou demande délibérément haute pour orienter la zone de négociation",
      ),
      cell("En phase d'ouverture — vendeur positionne son prix ambitieux"),
      badgeCell("70 %", "Efficace", "green"),
      badgeCell("Intermédiaire", "Niveau 2", "blue"),
    ],
    [
      cell("Silence actif"),
      cell(
        "Laisser un silence volontaire après une proposition pour créer une pression psychologique",
      ),
      cell("Après une contre-proposition — laisser l'autre combler le vide"),
      badgeCell("65 %", "Efficace", "green"),
      badgeCell("Intermédiaire", "Niveau 2", "blue"),
    ],
    [
      cell("Concession conditionnelle"),
      cell(
        "Accorder une concession uniquement en échange d'une contrepartie explicite",
      ),
      cell(
        "Lorsqu'une demande de réduction est formulée — maintenir la valeur perçue",
      ),
      badgeCell("75 %", "Efficace", "green"),
      badgeCell("Expert", "Avancé", "gold"),
    ],
    [
      cell("Deadline artificielle"),
      cell(
        "Créer une urgence réelle ou perçue pour accélérer la prise de décision",
      ),
      cell(
        "En phase finale — autre acquéreur potentiel, délai d'offre limitée",
      ),
      badgeCell("60 %", "Contextuel", "blue"),
      badgeCell("Débutant", "Niveau 1", "navy"),
    ],
    [
      cell("Bundling"),
      cell(
        "Grouper plusieurs éléments pour rendre l'offre globale plus attrayante",
      ),
      cell(
        "Négociation complexe — inclure meubles, délai, travaux dans le package",
      ),
      badgeCell("55 %", "Variable", "blue"),
      badgeCell("Intermédiaire", "Niveau 2", "blue"),
    ],
  ],
  notes:
    "Le taux de réussite est indicatif et dépend fortement du contexte (marché vendeur/acheteur), du profil des interlocuteurs et de la maîtrise de la technique. La combinaison de plusieurs techniques est recommandée.",
};

const signauxAchat: DataTable = {
  id: "signaux-achat-closing",
  moduleSlug: "terrain",
  lessonSlug: "closing",
  title: "Signaux d'achat et réponses recommandées",
  description:
    "Identifier et capitaliser sur les signaux d'achat pour conclure efficacement.",
  icon: "🎯",
  headers: [
    "Signal du client",
    "Interprétation",
    "Réponse recommandée",
    "Urgence",
  ],
  sortable: true,
  rows: [
    [
      cell("\"On pourrait faire quelque chose pour les meubles ?\""),
      cell("Le client se projette dans le bien — il négocie les détails"),
      cell(
        "Reformuler : \"Si on règle les meubles, vous êtes prêts à avancer ?\" puis valider l'accord de principe",
      ),
      badgeCell("Haute", "Agir", "red"),
    ],
    [
      cell("\"Quel est le délai pour emménager ?\""),
      cell("Le client se voit déjà dans le logement — signal fort"),
      cell(
        "Donner une date précise et enchaîner sur la signature du compromis",
      ),
      badgeCell("Haute", "Agir", "red"),
    ],
    [
      cell("\"Vous avez d'autres visites prévues ?\""),
      cell("Peur de manquer le bien — concurrence perçue comme réelle"),
      cell(
        "Confirmer honnêtement les visites et proposer d'officialiser par une offre écrite",
      ),
      badgeCell("Haute", "Agir", "red"),
    ],
    [
      highlighted("\"Mon partenaire/conjoint doit voir ça\""),
      cell("Besoin de validation — signal d'intérêt sincère"),
      cell(
        "Proposer une deuxième visite rapide, idéalement le jour même ou le lendemain",
      ),
      badgeCell("Moyenne", "Relancer", "gold"),
    ],
    [
      cell("\"C'est un peu au-dessus de notre budget\""),
      cell("Le client aime le bien mais cherche une porte de sortie"),
      cell(
        "Explorer les options : financement, frais inclus, prix négocié, PTZ",
      ),
      badgeCell("Moyenne", "Relancer", "gold"),
    ],
    [
      cell("\"On y reviendra peut-être\""),
      cell("Hésitation — le client n'est pas encore convaincu ou pressé"),
      cell(
        "Résumer les points positifs, rappeler la rareté du bien et proposer une date de rappel précise",
      ),
      badgeCell("Faible", "Nurturer", "blue"),
    ],
    [
      cell("Le client prend des photos en détail"),
      cell("Fort engagement sensoriel — il planifie déjà l'aménagement"),
      cell(
        "Laisser le client explorer sans interrompre, puis engager la conversation sur son projet",
      ),
      badgeCell("Haute", "Observer", "green"),
    ],
    [
      cell("Le client pose des questions sur les voisins/copropriété"),
      cell("Il évalue l'environnement social — il se projette durablement"),
      cell(
        "Répondre précisément, valoriser la communauté, proposer de rencontrer le gardien ou syndic",
      ),
      badgeCell("Moyenne", "Informer", "gold"),
    ],
  ],
  notes:
    "Un signal d'achat isolé ne suffit pas. La technique du closing s'appuie sur l'accumulation de signaux positifs et la reformulation progressive des engagements du client. Ne jamais forcer — accompagner la décision.",
};

// ---------------------------------------------------------------------------
// Nouvelles tables — Transaction / Prospection & CRM
// ---------------------------------------------------------------------------

const scriptsProspection: DataTable = {
  id: "scripts-prospection",
  moduleSlug: "transaction",
  lessonSlug: "prospection",
  title: "Scripts de prospection par type de contact",
  description: "Accroches et formulations clés selon le profil du prospect et le canal utilisé.",
  icon: "📞",
  headers: ["Type de contact", "Canal", "Accroche recommandée", "Objection fréquente", "Réponse type"],
  sortable: false,
  rows: [
    [cell("Panneau À Vendre"), cell("Appel téléphonique"), highlighted("'J'ai des acheteurs qualifiés pour ce secteur — puis-je vous rencontrer 20 min ?'"), cell("'Je vends seul'"), cell("'Je comprends. Montrez-moi les données de ventes récentes — 15 min suffisent.'")],
    [cell("Voisin d'une vente récente"), cell("Porte-à-porte"), cell("'J'ai vendu le N°12 de votre rue à [prix]. Avez-vous des projets immobiliers ?'"), cell("'Pas pour l'instant'"), cell("'Je vous laisse ma carte — les marchés évoluent vite dans votre secteur.'")],
    [cell("Succession/divorce (acte public)"), cell("Courrier personnalisé"), highlighted("Lettre avec ventes comparables + estimation gratuite offerte"), cell("'Comment avez-vous eu mon nom ?'"), cell("'Les actes sont publics — je prospecte ce secteur et souhaite vous aider.'")],
    [cell("Contact réseau (recommandation)"), cell("Message WhatsApp/SMS"), cell("'[Prénom X] m'a parlé de vous — êtes-vous disponible pour un échange ?'"), cell("'Je ne connais pas votre agence'"), cell("'[X] peut vous confirmer notre sérieux. Je vous envoie nos références.'")],
    [cell("Propriétaire en PAP depuis +60j"), cell("Appel de rappel"), highlighted("'Votre bien est en ligne depuis 2 mois — j'ai des acheteurs qui correspondent. Rencontrons-nous.'"), cell("'Je vais y arriver seul'"), cell("'60 jours c'est long. Faites-moi économiser votre temps — 30 min ensemble ?'")],
    [cell("Investisseur (réseau LinkedIn)"), cell("Message LinkedIn"), cell("'Vous investissez en immobilier — j'ai une opportunité off-market dans votre secteur cible.'"), cell("'Envoyez les infos par email'"), cell("'Je préfère vous présenter en visio — 15 min ? L'opportunité est exclusive.'")],
  ],
  notes: "La personnalisation de l'accroche est clé : un script générique décroche rarement. Mentionnez toujours un élément concret local (rue, vente récente, réseau commun) pour créer un lien immédiat.",
};

const metriquesCrm: DataTable = {
  id: "metriques-crm",
  moduleSlug: "transaction",
  lessonSlug: "crm",
  title: "KPIs CRM — indicateurs de performance pipeline",
  description: "Les métriques à suivre chaque semaine pour piloter votre activité commerciale et identifier les leviers d'amélioration.",
  icon: "📊",
  headers: ["Indicateur (KPI)", "Fréquence suivi", "Seuil alerte", "Objectif cible", "Action corrective"],
  sortable: true,
  rows: [
    [highlighted("Taux de contact utile"), cell("Hebdomadaire"), badgeCell("<25 %", "⚠️", "red"), badgeCell(">35 %", "✓", "green"), cell("Améliorer l'accroche, cibler mieux les créneaux horaires")],
    [cell("Taux de RDV / contact utile"), cell("Hebdomadaire"), badgeCell("<30 %", "⚠️", "red"), badgeCell(">40 %", "✓", "green"), cell("Retravailler le pitch téléphonique et l'offre de valeur")],
    [highlighted("Taux de mandat / RDV"), cell("Mensuel"), badgeCell("<20 %", "⚠️", "red"), badgeCell(">30 %", "✓", "green"), cell("Améliorer la préparation des RDV estimation et l'argumentaire")],
    [cell("Taux de vente / mandat"), cell("Mensuel"), badgeCell("<50 %", "⚠️", "red"), badgeCell(">70 %", "✓", "green"), cell("Retravailler la stratégie prix et la diffusion des annonces")],
    [cell("Délai moyen prospection → mandat"), cell("Mensuel"), badgeCell(">45 jours", "⚠️", "red"), badgeCell("<30 jours", "✓", "green"), cell("Accélérer les relances (J+1, J+7, J+14) et densifier les contacts")],
    [highlighted("Contacts sans activité +14j"), cell("Hebdomadaire"), badgeCell(">20 % du pipe", "⚠️", "red"), badgeCell("<10 % du pipe", "✓", "green"), cell("Activer la séquence de relance automatique dans le CRM")],
    [cell("Recommandations reçues / vente"), cell("Trimestriel"), badgeCell("<0.5 / vente", "⚠️", "red"), badgeCell(">1 / vente", "✓", "green"), cell("Activer le programme ambassadeur et systématiser la demande")],
  ],
  notes: "Ces KPIs doivent être revus chaque lundi matin (15 min). Un tableau de bord simple vaut mieux qu'un CRM complexe non utilisé.",
};

// ---------------------------------------------------------------------------
// Nouvelles tables — Marketing / Réseaux & SEO
// ---------------------------------------------------------------------------

const formatsReseaux: DataTable = {
  id: "formats-reseaux-sociaux",
  moduleSlug: "marketing",
  lessonSlug: "reseaux",
  title: "Guide des formats par plateforme sociale",
  description: "Spécifications techniques et meilleures pratiques pour chaque format de contenu immobilier sur les réseaux sociaux.",
  icon: "📱",
  headers: ["Plateforme", "Format recommandé", "Durée / Dimensions", "Fréquence optimale", "Type de contenu qui performe"],
  sortable: false,
  rows: [
    [highlighted("Instagram Reels"), badgeCell("Vidéo verticale", "🏆", "gold"), cell("15 à 60 sec / 1080×1920"), badgeCell("3-4×/semaine", "✓", "green"), cell("Visite rapide d'un bien, révélation avant/après, conseil express")],
    [cell("Instagram Feed"), cell("Photo carrée ou portrait"), cell("1080×1080 ou 1080×1350"), cell("4-5×/semaine"), cell("Photo pro d'un bien, infographie marché local, témoignage client")],
    [cell("Instagram Stories"), cell("Vidéo ou photo verticale"), cell("15 sec max / 1080×1920"), cell("1-2×/jour"), highlighted("Sondages, questions, coulisses, 'bien vendu aujourd'hui'")],
    [highlighted("LinkedIn"), badgeCell("Post texte + image", "📌", "blue"), cell("1200 mots max / 1200×627"), badgeCell("2-3×/semaine", "✓", "green"), cell("Analyse marché, retour d'expérience, tendances secteur, réseautage B2B")],
    [cell("YouTube Shorts"), cell("Vidéo verticale"), cell("60 sec max / 1080×1920"), cell("2×/semaine"), cell("Conseils acheteurs/vendeurs, FAQ immobilière, présentation secteur")],
    [cell("TikTok"), cell("Vidéo verticale dynamique"), cell("15 à 60 sec / 1080×1920"), cell("5-7×/semaine"), cell("Humour immobilier, surprises de visite, conseils direct-to-camera")],
  ],
  notes: "La cohérence de marque (couleurs, logo, police) est plus importante que la perfection technique. Un contenu régulier et authentique surpasse un contenu rare et hyper-professionnel.",
};

const outilsSeo: DataTable = {
  id: "outils-seo-immobilier",
  moduleSlug: "marketing",
  lessonSlug: "seo",
  title: "Boîte à outils SEO local — comparatif",
  description: "Les meilleurs outils pour améliorer le référencement naturel d'une agence immobilière, classés par budget et usage.",
  icon: "🔍",
  headers: ["Outil", "Usage principal", "Prix", "Difficulté", "Priorité agence"],
  sortable: true,
  rows: [
    [highlighted("Google Search Console"), cell("Suivi positions, indexation, erreurs"), badgeCell("Gratuit", "✓", "green"), badgeCell("Débutant", "●", "green"), highlighted("Priorité 1 — indispensable")],
    [highlighted("Google Business Profile"), cell("Fiche locale, avis, posts GBP"), badgeCell("Gratuit", "✓", "green"), badgeCell("Débutant", "●", "green"), highlighted("Priorité 1 — indispensable")],
    [cell("Google Analytics 4"), cell("Analyse du trafic et comportement"), badgeCell("Gratuit", "✓", "green"), cell("Intermédiaire"), cell("Priorité 2 — très recommandé")],
    [cell("Ubersuggest"), cell("Recherche de mots-clés locaux"), badgeCell("29 €/mois", "€", "gold"), badgeCell("Débutant", "●", "green"), cell("Priorité 2 — pour les articles de blog")],
    [cell("SEMrush / Ahrefs"), cell("Audit complet, backlinks, concurrents"), badgeCell("100-200 €/mois", "€€", "gold"), cell("Avancé"), cell("Priorité 3 — agences établies")],
    [cell("PageSpeed Insights"), cell("Vitesse de chargement, Core Web Vitals"), badgeCell("Gratuit", "✓", "green"), badgeCell("Débutant", "●", "green"), cell("Priorité 2 — audit mensuel")],
    [cell("Yoast SEO (WordPress)"), cell("Optimisation on-page (balises, meta)"), badgeCell("Gratuit / 99 €/an", "€", "gold"), badgeCell("Débutant", "●", "green"), cell("Priorité 2 — si site sous WordPress")],
  ],
  notes: "Commencez par Google Search Console + Google Business Profile (tous deux gratuits). Ils couvrent 70 % des besoins SEO d'une agence de proximité.",
};

// ---------------------------------------------------------------------------
// Nouvelles tables — Terrain / Argumentaire & Fidélisation
// ---------------------------------------------------------------------------

const techniquesArgumentaire: DataTable = {
  id: "techniques-argumentaire-vendeur",
  moduleSlug: "terrain",
  lessonSlug: "argumentaire",
  title: "Techniques d'argumentation — rendez-vous vendeur",
  description: "Les méthodes éprouvées pour convaincre un vendeur lors d'un rendez-vous estimation, avec exemples concrets.",
  icon: "🎯",
  headers: ["Technique", "Principe", "Exemple d'utilisation", "Efficacité", "Quand l'utiliser"],
  sortable: false,
  rows: [
    [highlighted("Net Vendeur Comparé"), cell("Montrer le gain net réel vs PAP"), highlighted("'Avec l'agence : 340K nets. En PAP : 310K après délais et travaux de mise en valeur.'"), badgeCell("Très haute", "⭐⭐⭐", "gold"), cell("Face à l'objection honoraires")],
    [cell("Preuve par les comparables"), cell("Ancrage prix dans les données réelles"), cell("'3 T3 vendus en 2025 dans votre rue : 285K, 292K, 298K. Votre bien est comparable.'"), badgeCell("Haute", "⭐⭐", "blue"), cell("Pour justifier l'estimation")],
    [cell("L'urgence de marché"), cell("Créer une tension temporelle légitime"), cell("'Le marché est actif maintenant. Dans 3 mois, les taux peuvent remonter et réduire la solvabilité des acheteurs.'"), cell("Moyenne"), cell("Si le vendeur hésite à signer")],
    [highlighted("Preuve sociale"), cell("Témoignages et références terrain"), cell("'J'ai vendu 12 biens dans ce secteur en 2025 — voici les avis de mes clients.'"), badgeCell("Haute", "⭐⭐", "blue"), highlighted("En fin de RDV, pour emporter la décision")],
    [cell("La méthode CAP (Caractéristique-Avantage-Preuve)"), cell("Structurer chaque argument"), cell("'Notre diffusion (C) touche 3M acheteurs (A) — j'ai vendu en 18 jours le mois dernier (P).'"), cell("Haute"), cell("Pour présenter les services de l'agence")],
    [cell("Le silence stratégique"), cell("Laisser le client traiter l'information"), cell("Après avoir présenté le net vendeur, attendre sans parler. Laisser le chiffre opérer."), cell("Haute"), cell("Après un argument clé — ne pas remplir le silence")],
  ],
  notes: "L'argumentaire doit être préparé avant le RDV, pas improvisé. Adaptez les techniques selon le profil du vendeur (rationnel → données, émotionnel → histoires de clients).",
};

const programmeFidelisation: DataTable = {
  id: "programme-fidelisation",
  moduleSlug: "terrain",
  lessonSlug: "fidelisation",
  title: "Programme de fidélisation — actions par étape",
  description: "Calendrier des actions de suivi post-vente pour maximiser la satisfaction client et les recommandations.",
  icon: "🌟",
  headers: ["Étape", "Délai", "Action", "Support", "Objectif"],
  sortable: false,
  rows: [
    [highlighted("J — Signature acte"), cell("Jour J"), highlighted("Cadeau symbolique + photo souvenir"), cell("Carte cadeau + appareil photo"), cell("Créer le souvenir émotionnel positif")],
    [cell("J+1"), cell("Lendemain"), cell("Email de remerciement personnalisé + guide du quartier"), cell("Email + PDF"), cell("Concrétiser la relation humaine")],
    [cell("J+7"), cell("1 semaine"), cell("SMS de prise de nouvelles (emménagement)"), cell("SMS personnalisé"), cell("Vérifier la satisfaction, détecter les problèmes")],
    [highlighted("J+30"), cell("1 mois"), highlighted("Appel satisfaction + demande d'avis Google"), cell("Appel + lien direct GBP"), highlighted("Pic de satisfaction → recueillir l'avis public")],
    [cell("J+90"), cell("3 mois"), cell("Présentation du programme ambassadeur"), cell("Email + livret programme"), cell("Activer la recommandation active")],
    [cell("J+180"), cell("6 mois"), cell("Newsletter marché local (prix au m² du quartier)"), cell("Newsletter HTML"), cell("Rester 'top of mind' sans intrusion")],
    [highlighted("J+365"), cell("1 an"), highlighted("Appel anniversaire + rapport évolution valeur du bien"), cell("Appel + rapport PDF"), highlighted("Valoriser l'investissement → déclencher projet suivant")],
    [cell("Annuel +"), cell("Chaque année"), cell("Newsletter trimestrielle + invitation événements agence"), cell("Email + SMS"), cell("Maintenir la relation à long terme")],
  ],
  notes: "Ce programme peut être automatisé à 80 % dans un CRM immobilier (envois email/SMS, rappels d'appel). L'investissement temps est de 2-3h par client sur 5 ans pour un ROI exceptionnel.",
};

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const ALL_DATA_TABLES: DataTable[] = [
  diagnosticsObligatoires,
  conditionsSuspensives,
  comparatifCredits,
  regimesFiscaux,
  dispositifsDefiscalisation,
  comparatifPortails,
  techniquesNegociation,
  signauxAchat,
  scriptsProspection,
  metriquesCrm,
  formatsReseaux,
  outilsSeo,
  techniquesArgumentaire,
  programmeFidelisation,
];

export function getDataTables(
  moduleSlug: string,
  lessonSlug: string,
): DataTable[] {
  return ALL_DATA_TABLES.filter(
    (t) => t.moduleSlug === moduleSlug && t.lessonSlug === lessonSlug,
  );
}
