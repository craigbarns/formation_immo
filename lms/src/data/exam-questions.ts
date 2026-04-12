/**
 * Questions d'examen par module — mode chronométré avec scoring persistant.
 */

export type ExamQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type ModuleExam = {
  moduleSlug: string;
  title: string;
  duration: number; // minutes
  questions: ExamQuestion[];
};

export const MODULE_EXAMS: ModuleExam[] = [
  {
    moduleSlug: "juridique",
    title: "Examen — Juridique & conformité",
    duration: 15,
    questions: [
      {
        id: "j1",
        question: "La loi ALUR impose principalement aux professionnels de l'immobilier :",
        options: [
          "De fixer librement les honoraires sans les afficher",
          "Une transparence totale sur les honoraires et les conditions de vente",
          "De réduire leurs commissions de 50%",
          "De ne travailler qu'avec des notaires agréés",
        ],
        correctIndex: 1,
        explanation: "La loi ALUR renforce la transparence : affichage obligatoire des honoraires, information claire du consommateur.",
      },
      {
        id: "j2",
        question: "Le compromis de vente engage :",
        options: [
          "Uniquement le vendeur",
          "Uniquement l'acheteur",
          "Les deux parties (vendeur et acheteur)",
          "Uniquement l'agent immobilier",
        ],
        correctIndex: 2,
        explanation: "Le compromis (promesse synallagmatique) engage les deux parties, sous réserve des conditions suspensives.",
      },
      {
        id: "j3",
        question: "Quel diagnostic est obligatoire pour toute vente immobilière ?",
        options: [
          "Le diagnostic termites uniquement en zone déclarée",
          "Le DPE (Diagnostic de Performance Énergétique)",
          "L'audit acoustique",
          "Le diagnostic radon partout en France",
        ],
        correctIndex: 1,
        explanation: "Le DPE est obligatoire pour toute vente ou location depuis 2006, renforcé en 2021.",
      },
      {
        id: "j4",
        question: "Le mandat exclusif se distingue du mandat simple par :",
        options: [
          "Un prix de vente plus élevé",
          "L'exclusivité donnée à une seule agence pour la commercialisation",
          "L'absence de commission",
          "Une durée illimitée",
        ],
        correctIndex: 1,
        explanation: "Le mandat exclusif confie la vente à un seul professionnel, ce qui favorise un engagement réciproque.",
      },
      {
        id: "j5",
        question: "La carte professionnelle (carte T) est délivrée par :",
        options: [
          "La mairie du lieu d'exercice",
          "La CCI (Chambre de Commerce et d'Industrie)",
          "Le tribunal de commerce",
          "La préfecture",
        ],
        correctIndex: 1,
        explanation: "Depuis la loi ALUR, la carte T est délivrée par la CCI territoriale.",
      },
      {
        id: "j6",
        question: "Le délai de rétractation pour l'acheteur après signature du compromis est de :",
        options: ["7 jours", "10 jours", "14 jours", "30 jours"],
        correctIndex: 1,
        explanation: "Depuis la loi Macron (2015), le délai de rétractation est passé de 7 à 10 jours.",
      },
      {
        id: "j7",
        question: "En copropriété, le syndic a l'obligation de fournir au vendeur :",
        options: [
          "Uniquement le règlement de copropriété",
          "Le pré-état daté et les documents prévus par la loi ALUR",
          "Seulement les 3 derniers PV d'AG",
          "Aucun document, c'est au notaire de les demander",
        ],
        correctIndex: 1,
        explanation: "La loi ALUR impose la fourniture du pré-état daté avec de nombreux documents (PV AG, carnet d'entretien, etc.).",
      },
      {
        id: "j8",
        question: "La garantie des vices cachés s'applique :",
        options: [
          "Uniquement aux biens neufs",
          "À tout bien vendu, même entre particuliers",
          "Uniquement si l'acheteur a fait appel à un agent",
          "Uniquement pendant le premier mois",
        ],
        correctIndex: 1,
        explanation: "La garantie des vices cachés (art. 1641 Code civil) s'applique à toute vente.",
      },
      {
        id: "j9",
        question: "Le RGPD impose aux agents immobiliers de :",
        options: [
          "Conserver les données clients indéfiniment",
          "Collecter et traiter les données personnelles de manière transparente et sécurisée",
          "Partager les fichiers clients entre agences",
          "Ne jamais collecter d'adresse email",
        ],
        correctIndex: 1,
        explanation: "Le RGPD impose transparence, finalité, minimisation et sécurité dans le traitement des données personnelles.",
      },
      {
        id: "j10",
        question: "Un mandat de vente doit obligatoirement mentionner :",
        options: [
          "Le nom du futur acheteur",
          "Le montant et les modalités de la rémunération de l'agent",
          "Le prix de vente minimum accepté par l'acheteur",
          "La date exacte de la vente",
        ],
        correctIndex: 1,
        explanation: "La loi Hoguet et ses décrets imposent la mention des honoraires et de leur répartition dans le mandat.",
      },
    ],
  },
  {
    moduleSlug: "transaction",
    title: "Examen — Transaction & négociation",
    duration: 15,
    questions: [
      {
        id: "t1",
        question: "La méthode par comparaison pour estimer un bien repose sur :",
        options: [
          "Le coût de reconstruction du bien",
          "Les prix de vente récents de biens similaires dans le même secteur",
          "La valeur sentimentale du propriétaire",
          "Le montant du crédit restant dû",
        ],
        correctIndex: 1,
        explanation: "La méthode par comparaison utilise des références de transactions récentes et comparables.",
      },
      {
        id: "t2",
        question: "En prospection téléphonique, la première étape est de :",
        options: [
          "Proposer immédiatement un prix",
          "Se présenter et identifier le besoin du prospect",
          "Demander un rendez-vous de signature",
          "Envoyer un email automatique",
        ],
        correctIndex: 1,
        explanation: "La prise de contact professionnelle commence par la présentation et l'écoute active du besoin.",
      },
      {
        id: "t3",
        question: "Face à un vendeur qui surestime son bien de 20%, vous devez :",
        options: [
          "Accepter son prix pour prendre le mandat",
          "Présenter des comparables et proposer un plan de test de prix",
          "Refuser catégoriquement le dossier",
          "Proposer un prix encore plus bas pour négocier",
        ],
        correctIndex: 1,
        explanation: "L'approche professionnelle : documenter avec des comparables, puis proposer un ajustement progressif.",
      },
      {
        id: "t4",
        question: "La technique SPIN en négociation immobilière signifie :",
        options: [
          "Situation, Problème, Implication, Besoin-solution",
          "Speed, Performance, Innovation, Négociation",
          "Stratégie, Prix, Information, Normes",
          "Signature, Paiement, Investissement, Notaire",
        ],
        correctIndex: 0,
        explanation: "SPIN Selling : Situation > Problème > Implication > Need-payoff (besoin-solution).",
      },
      {
        id: "t5",
        question: "Un CRM immobilier sert principalement à :",
        options: [
          "Calculer les impôts fonciers",
          "Gérer et suivre les contacts, mandats et relances",
          "Rédiger les actes notariés",
          "Publier automatiquement les annonces",
        ],
        correctIndex: 1,
        explanation: "Le CRM centralise la relation client : contacts, historique, relances, pipeline de mandats.",
      },
      {
        id: "t6",
        question: "L'objection 'votre commission est trop élevée' se traite par :",
        options: [
          "Baisser immédiatement le prix",
          "Expliquer la valeur ajoutée et les services inclus",
          "Ignorer l'objection",
          "Proposer de travailler gratuitement",
        ],
        correctIndex: 1,
        explanation: "La réponse professionnelle valorise les services (estimation, marketing, négociation, suivi juridique).",
      },
      {
        id: "t7",
        question: "Un bon indicateur de performance pour un négociateur est :",
        options: [
          "Le nombre de cafés bus par semaine",
          "Le ratio mandats pris / mandats vendus",
          "Le nombre d'heures au bureau",
          "Le nombre de cartes de visite distribuées",
        ],
        correctIndex: 1,
        explanation: "Le taux de transformation (prise de mandat -> vente) est l'indicateur clé de performance.",
      },
      {
        id: "t8",
        question: "La négociation gagnant-gagnant vise à :",
        options: [
          "Faire gagner uniquement l'acheteur",
          "Trouver un accord satisfaisant pour les deux parties",
          "Maximiser la commission de l'agent",
          "Accélérer la vente à tout prix",
        ],
        correctIndex: 1,
        explanation: "La négociation collaborative crée de la valeur pour les deux parties et préserve la relation.",
      },
      {
        id: "t9",
        question: "Le prix de présentation idéal d'un bien est :",
        options: [
          "Toujours au-dessus du marché pour laisser une marge",
          "Aligné sur les comparables récents avec une marge de négociation raisonnable",
          "Le plus bas possible pour vendre vite",
          "Le prix souhaité par le vendeur sans analyse",
        ],
        correctIndex: 1,
        explanation: "Un prix aligné sur le marché + marge raisonnable optimise le délai de vente et le prix final.",
      },
      {
        id: "t10",
        question: "La fidélisation client en immobilier passe d'abord par :",
        options: [
          "Des cadeaux coûteux",
          "Un suivi régulier et personnalisé après la transaction",
          "Des appels quotidiens",
          "Des publicités dans le journal",
        ],
        correctIndex: 1,
        explanation: "Le suivi post-transaction (anniversaire, conseils, parrainage) génère des recommandations durables.",
      },
    ],
  },
  {
    moduleSlug: "financement",
    title: "Examen — Financement & fiscalité",
    duration: 15,
    questions: [
      {
        id: "f1",
        question: "Le taux d'endettement maximum recommandé par le HCSF est de :",
        options: ["25%", "33%", "35%", "40%"],
        correctIndex: 2,
        explanation: "Depuis janvier 2022, le HCSF fixe le seuil d'endettement à 35% (assurance incluse).",
      },
      {
        id: "f2",
        question: "La rentabilité nette se calcule en déduisant du loyer :",
        options: [
          "Uniquement la taxe foncière",
          "Charges, taxe foncière, assurance, gestion et vacance locative",
          "Uniquement les intérêts d'emprunt",
          "Rien, c'est la même que la brute",
        ],
        correctIndex: 1,
        explanation: "La rentabilité nette intègre toutes les charges réelles pour refléter le rendement réel.",
      },
      {
        id: "f3",
        question: "Le dispositif Pinel permet :",
        options: [
          "Une exonération totale d'impôts",
          "Une réduction d'impôt proportionnelle à la durée d'engagement locatif",
          "Un crédit d'impôt sur les travaux uniquement",
          "Une déduction des intérêts d'emprunt sans plafond",
        ],
        correctIndex: 1,
        explanation: "Le Pinel offre une réduction d'impôt de 9% à 14% selon la durée d'engagement (6, 9 ou 12 ans).",
      },
      {
        id: "f4",
        question: "L'assurance emprunteur (ADI) couvre principalement :",
        options: [
          "Les dégâts des eaux du bien",
          "Le décès, l'invalidité et l'incapacité de travail de l'emprunteur",
          "La perte de valeur du bien",
          "Les vices cachés",
        ],
        correctIndex: 1,
        explanation: "L'ADI protège la banque et l'emprunteur en cas de décès, invalidité ou incapacité de remboursement.",
      },
      {
        id: "f5",
        question: "Le régime LMNP (Loueur Meublé Non Professionnel) permet :",
        options: [
          "D'être exonéré de toute fiscalité",
          "D'amortir le bien et de déduire les charges en régime réel",
          "De louer sans bail",
          "De vendre sans plus-value",
        ],
        correctIndex: 1,
        explanation: "Le LMNP en régime réel permet l'amortissement du bien et la déduction des charges réelles.",
      },
      {
        id: "f6",
        question: "Le PTZ (Prêt à Taux Zéro) est réservé :",
        options: [
          "À tous les acheteurs sans condition",
          "Aux primo-accédants sous conditions de ressources",
          "Aux investisseurs locatifs uniquement",
          "Aux SCI exclusivement",
        ],
        correctIndex: 1,
        explanation: "Le PTZ est réservé aux primo-accédants, sous plafonds de ressources et selon la zone géographique.",
      },
      {
        id: "f7",
        question: "La plus-value immobilière est exonérée d'impôt après :",
        options: ["15 ans", "22 ans pour l'IR et 30 ans pour les prélèvements sociaux", "10 ans", "5 ans"],
        correctIndex: 1,
        explanation: "Exonération IR après 22 ans, exonération totale (y compris prélèvements sociaux) après 30 ans.",
      },
      {
        id: "f8",
        question: "Le taux d'usure est :",
        options: [
          "Le taux minimum pratiqué par les banques",
          "Le taux maximum légal au-delà duquel un prêt ne peut être accordé",
          "Le taux moyen du marché immobilier",
          "Le taux de la Banque Centrale Européenne",
        ],
        correctIndex: 1,
        explanation: "Le taux d'usure est le TAEG maximum légal, publié trimestriellement par la Banque de France.",
      },
      {
        id: "f9",
        question: "Le déficit foncier est imputable sur le revenu global :",
        options: [
          "Sans limite",
          "Dans la limite de 10 700 EUR par an (hors intérêts d'emprunt)",
          "Uniquement sur les revenus fonciers",
          "Il n'est jamais imputable",
        ],
        correctIndex: 1,
        explanation: "Le déficit foncier (hors intérêts) est déductible du revenu global dans la limite de 10 700 EUR/an.",
      },
      {
        id: "f10",
        question: "La délégation d'assurance emprunteur permet :",
        options: [
          "De supprimer l'assurance",
          "De choisir un assureur différent de celui proposé par la banque",
          "De réduire le montant du prêt",
          "De prolonger la durée du crédit",
        ],
        correctIndex: 1,
        explanation: "Depuis la loi Lagarde (2010) et la loi Lemoine (2022), l'emprunteur peut choisir librement son assurance.",
      },
    ],
  },
  {
    moduleSlug: "marketing",
    title: "Examen — Marketing digital immobilier",
    duration: 15,
    questions: [
      {
        id: "m1",
        question: "Les photos immobilières professionnelles doivent privilégier :",
        options: [
          "Le flash direct et le mode portrait",
          "La lumière naturelle, le grand angle et le staging",
          "Les filtres Instagram lourds",
          "Le noir et blanc pour le style",
        ],
        correctIndex: 1,
        explanation: "Lumière naturelle + grand angle + home staging = photos qui convertissent les clics en visites.",
      },
      {
        id: "m2",
        question: "Sur SeLoger et Leboncoin, l'élément qui génère le plus de clics est :",
        options: [
          "La description technique",
          "La photo principale et le prix",
          "Le nom de l'agence",
          "Le numéro de téléphone",
        ],
        correctIndex: 1,
        explanation: "La photo principale et le prix sont les premiers éléments vus : ils déterminent le taux de clic.",
      },
      {
        id: "m3",
        question: "Une annonce immobilière efficace doit contenir :",
        options: [
          "Le maximum de majuscules pour attirer l'attention",
          "Un titre accrocheur, des points forts du bien et un appel à l'action",
          "Uniquement la surface et le prix",
          "Des emojis dans chaque phrase",
        ],
        correctIndex: 1,
        explanation: "Structure gagnante : titre accrocheur + avantages clés + CTA (appel à l'action) clair.",
      },
      {
        id: "m4",
        question: "Le meilleur moment pour publier sur les réseaux sociaux immobiliers est :",
        options: [
          "Lundi à 6h du matin",
          "En semaine entre 11h-13h et 18h-20h",
          "Le dimanche à 23h",
          "N'importe quand, l'algorithme s'en charge",
        ],
        correctIndex: 1,
        explanation: "Les pics d'engagement se situent à la pause déjeuner et en fin de journée en semaine.",
      },
      {
        id: "m5",
        question: "Le SEO local pour une agence immobilière commence par :",
        options: [
          "Acheter des liens par milliers",
          "Optimiser sa fiche Google Business Profile",
          "Créer un blog sur la cuisine",
          "Ignorer Google et se concentrer sur les flyers",
        ],
        correctIndex: 1,
        explanation: "Google Business Profile est la base du référencement local : fiche complète, avis, photos, posts.",
      },
      {
        id: "m6",
        question: "Le format vidéo le plus efficace sur Instagram pour l'immobilier est :",
        options: [
          "Un diaporama de 30 photos",
          "Un Reel de 30-60 secondes avec visite virtuelle",
          "Une vidéo de 10 minutes en plan fixe",
          "Une photo avec musique",
        ],
        correctIndex: 1,
        explanation: "Les Reels courts avec visite dynamique génèrent le plus d'engagement et de portée organique.",
      },
      {
        id: "m7",
        question: "Le home staging virtuel permet de :",
        options: [
          "Cacher les défauts du bien",
          "Aider l'acheteur à se projeter dans le bien grâce à des visuels aménagés",
          "Modifier les plans du bien",
          "Remplacer les visites physiques",
        ],
        correctIndex: 1,
        explanation: "Le home staging virtuel aide à la projection sans tromper : il illustre le potentiel du bien.",
      },
      {
        id: "m8",
        question: "Le taux de conversion d'une annonce immobilière se mesure par :",
        options: [
          "Le nombre de likes sur Facebook",
          "Le ratio contacts qualifiés / nombre de vues de l'annonce",
          "Le nombre de partages WhatsApp",
          "La durée de mise en ligne",
        ],
        correctIndex: 1,
        explanation: "Le taux de conversion = leads qualifiés / vues. C'est l'indicateur clé de performance d'une annonce.",
      },
      {
        id: "m9",
        question: "Pour améliorer le référencement d'un site immobilier, il faut :",
        options: [
          "Copier les annonces des concurrents",
          "Créer du contenu unique, local et régulier (blog, guides, estimations)",
          "Acheter le nom de domaine le plus long possible",
          "Mettre le maximum de mots-clés dans le footer",
        ],
        correctIndex: 1,
        explanation: "Le contenu unique, pertinent et local (guides quartier, estimations) est la clé du SEO immobilier.",
      },
      {
        id: "m10",
        question: "L'email marketing immobilier est le plus efficace quand il est :",
        options: [
          "Envoyé à toute la base sans segmentation",
          "Personnalisé, segmenté par critères (acheteur/vendeur, budget, zone)",
          "Envoyé 5 fois par jour",
          "Uniquement composé d'images sans texte",
        ],
        correctIndex: 1,
        explanation: "La segmentation et la personnalisation multiplient par 3 à 5 le taux d'ouverture et de conversion.",
      },
    ],
  },
  {
    moduleSlug: "terrain",
    title: "Examen — Visite, closing & fidélisation",
    duration: 15,
    questions: [
      {
        id: "te1",
        question: "Avant une visite, l'agent immobilier doit :",
        options: [
          "Arriver en retard pour créer l'attente",
          "Préparer un parcours de visite, vérifier l'état du bien et anticiper les questions",
          "Laisser le client découvrir seul",
          "Ne rien préparer pour être spontané",
        ],
        correctIndex: 1,
        explanation: "La préparation (parcours, points forts, réponses aux objections) est la clé d'une visite réussie.",
      },
      {
        id: "te2",
        question: "L'argumentaire de vente doit mettre en avant :",
        options: [
          "Uniquement le prix bas",
          "Les bénéfices pour l'acheteur (cadre de vie, potentiel, emplacement)",
          "Les défauts pour être honnête",
          "Le nombre de pièces uniquement",
        ],
        correctIndex: 1,
        explanation: "Vendre des bénéfices (pas des caractéristiques) : projection, mode de vie, valorisation.",
      },
      {
        id: "te3",
        question: "Face à l'objection 'je vais réfléchir', la bonne réponse est :",
        options: [
          "D'accord, rappelez-moi quand vous voulez",
          "Identifier le frein réel et proposer des éléments pour aider à la décision",
          "Baisser le prix immédiatement",
          "Ignorer et passer au client suivant",
        ],
        correctIndex: 1,
        explanation: "Derrière 'je vais réfléchir' se cache souvent un frein spécifique à identifier et traiter.",
      },
      {
        id: "te4",
        question: "Le closing immobilier efficace repose sur :",
        options: [
          "La pression agressive",
          "La création d'un sentiment d'urgence légitime et la sécurisation du client",
          "L'attente passive d'une décision",
          "La multiplication des visites sans suivi",
        ],
        correctIndex: 1,
        explanation: "Un bon closing combine urgence (marché, concurrence) et réassurance (accompagnement, garanties).",
      },
      {
        id: "te5",
        question: "La promesse de vente se distingue du compromis par :",
        options: [
          "Elle n'engage que le vendeur (promesse unilatérale)",
          "Elle est moins chère",
          "Elle n'a pas besoin de notaire",
          "Elle est plus rapide à signer",
        ],
        correctIndex: 0,
        explanation: "La promesse unilatérale engage uniquement le vendeur ; l'acheteur a une option d'achat.",
      },
      {
        id: "te6",
        question: "L'acte authentique est signé chez :",
        options: [
          "L'agent immobilier",
          "Le notaire",
          "La mairie",
          "La banque",
        ],
        correctIndex: 1,
        explanation: "Seul le notaire peut recevoir l'acte authentique de vente qui transfère la propriété.",
      },
      {
        id: "te7",
        question: "Le suivi post-vente idéal comprend :",
        options: [
          "Ne plus jamais contacter le client",
          "Un contact à 1 mois, 6 mois, 1 an avec des attentions personnalisées",
          "Un appel quotidien pendant 1 an",
          "Un email automatique unique",
        ],
        correctIndex: 1,
        explanation: "Un suivi espacé et personnalisé (anniversaire, conseils) transforme un client en ambassadeur.",
      },
      {
        id: "te8",
        question: "Le parrainage client est efficace parce que :",
        options: [
          "Il ne coûte rien",
          "La recommandation personnelle a un taux de conversion 4 à 5 fois supérieur",
          "Il remplace la prospection",
          "Il est obligatoire légalement",
        ],
        correctIndex: 1,
        explanation: "Le bouche-à-oreille qualifié convertit beaucoup mieux que la prospection froide.",
      },
      {
        id: "te9",
        question: "Lors de la visite, l'agent doit adopter une posture de :",
        options: [
          "Vendeur agressif",
          "Conseiller à l'écoute qui guide la découverte",
          "Simple ouvreur de portes",
          "Critique du bien pour négocier",
        ],
        correctIndex: 1,
        explanation: "Le rôle de conseil (écoute, réponses, projection) crée la confiance et facilite la décision.",
      },
      {
        id: "te10",
        question: "La condition suspensive d'obtention de prêt protège :",
        options: [
          "Uniquement la banque",
          "L'acheteur, qui peut se désengager si le prêt est refusé",
          "Uniquement le vendeur",
          "L'agent immobilier",
        ],
        correctIndex: 1,
        explanation: "La condition suspensive de prêt protège l'acheteur : si le crédit est refusé, la vente est annulée sans pénalité.",
      },
    ],
  },
];

export function getModuleExam(moduleSlug: string): ModuleExam | undefined {
  return MODULE_EXAMS.find((e) => e.moduleSlug === moduleSlug);
}
