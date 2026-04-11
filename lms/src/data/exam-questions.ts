/**
 * Questions d'examen par module — mode chronometré avec scoring persistant.
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
    title: "Examen — Juridique & conformite",
    duration: 15,
    questions: [
      {
        id: "j1",
        question: "La loi ALUR impose principalement aux professionnels de l'immobilier :",
        options: [
          "De fixer librement les honoraires sans les afficher",
          "Une transparence totale sur les honoraires et les conditions de vente",
          "De reduire leurs commissions de 50%",
          "De ne travailler qu'avec des notaires agrees",
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
        explanation: "Le compromis (promesse synallagmatique) engage les deux parties, sous reserve des conditions suspensives.",
      },
      {
        id: "j3",
        question: "Quel diagnostic est obligatoire pour toute vente immobiliere ?",
        options: [
          "Le diagnostic termites uniquement en zone declaree",
          "Le DPE (Diagnostic de Performance Energetique)",
          "L'audit acoustique",
          "Le diagnostic radon partout en France",
        ],
        correctIndex: 1,
        explanation: "Le DPE est obligatoire pour toute vente ou location depuis 2006, renforce en 2021.",
      },
      {
        id: "j4",
        question: "Le mandat exclusif se distingue du mandat simple par :",
        options: [
          "Un prix de vente plus eleve",
          "L'exclusivite donnee a une seule agence pour la commercialisation",
          "L'absence de commission",
          "Une duree illimitee",
        ],
        correctIndex: 1,
        explanation: "Le mandat exclusif confie la vente a un seul professionnel, ce qui favorise un engagement reciproque.",
      },
      {
        id: "j5",
        question: "La carte professionnelle (carte T) est delivree par :",
        options: [
          "La mairie du lieu d'exercice",
          "La CCI (Chambre de Commerce et d'Industrie)",
          "Le tribunal de commerce",
          "La prefecture",
        ],
        correctIndex: 1,
        explanation: "Depuis la loi ALUR, la carte T est delivree par la CCI territoriale.",
      },
      {
        id: "j6",
        question: "Le delai de retractation pour l'acheteur apres signature du compromis est de :",
        options: ["7 jours", "10 jours", "14 jours", "30 jours"],
        correctIndex: 1,
        explanation: "Depuis la loi Macron (2015), le delai de retractation est passe de 7 a 10 jours.",
      },
      {
        id: "j7",
        question: "En copropriete, le syndic a l'obligation de fournir au vendeur :",
        options: [
          "Uniquement le reglement de copropriete",
          "Le pre-etat date et les documents prevus par la loi ALUR",
          "Seulement les 3 derniers PV d'AG",
          "Aucun document, c'est au notaire de les demander",
        ],
        correctIndex: 1,
        explanation: "La loi ALUR impose la fourniture du pre-etat date avec de nombreux documents (PV AG, carnet d'entretien, etc.).",
      },
      {
        id: "j8",
        question: "La garantie des vices caches s'applique :",
        options: [
          "Uniquement aux biens neufs",
          "A tout bien vendu, meme entre particuliers",
          "Uniquement si l'acheteur a fait appel a un agent",
          "Uniquement pendant le premier mois",
        ],
        correctIndex: 1,
        explanation: "La garantie des vices caches (art. 1641 Code civil) s'applique a toute vente.",
      },
      {
        id: "j9",
        question: "Le RGPD impose aux agents immobiliers de :",
        options: [
          "Conserver les donnees clients indefiniment",
          "Collecter et traiter les donnees personnelles de maniere transparente et securisee",
          "Partager les fichiers clients entre agences",
          "Ne jamais collecter d'adresse email",
        ],
        correctIndex: 1,
        explanation: "Le RGPD impose transparence, finalite, minimisation et securite dans le traitement des donnees personnelles.",
      },
      {
        id: "j10",
        question: "Un mandat de vente doit obligatoirement mentionner :",
        options: [
          "Le nom du futur acheteur",
          "Le montant et les modalites de la remuneration de l'agent",
          "Le prix de vente minimum accepte par l'acheteur",
          "La date exacte de la vente",
        ],
        correctIndex: 1,
        explanation: "La loi Hoguet et ses decrets imposent la mention des honoraires et de leur repartition dans le mandat.",
      },
    ],
  },
  {
    moduleSlug: "transaction",
    title: "Examen — Transaction & negociation",
    duration: 15,
    questions: [
      {
        id: "t1",
        question: "La methode par comparaison pour estimer un bien repose sur :",
        options: [
          "Le cout de reconstruction du bien",
          "Les prix de vente recents de biens similaires dans le meme secteur",
          "La valeur sentimentale du proprietaire",
          "Le montant du credit restant du",
        ],
        correctIndex: 1,
        explanation: "La methode par comparaison utilise des references de transactions recentes et comparables.",
      },
      {
        id: "t2",
        question: "En prospection telephonique, la premiere etape est de :",
        options: [
          "Proposer immediatement un prix",
          "Se presenter et identifier le besoin du prospect",
          "Demander un rendez-vous de signature",
          "Envoyer un email automatique",
        ],
        correctIndex: 1,
        explanation: "La prise de contact professionnelle commence par la presentation et l'ecoute active du besoin.",
      },
      {
        id: "t3",
        question: "Face a un vendeur qui surestime son bien de 20%, vous devez :",
        options: [
          "Accepter son prix pour prendre le mandat",
          "Presenter des comparables et proposer un plan de test de prix",
          "Refuser categoriquement le dossier",
          "Proposer un prix encore plus bas pour negocier",
        ],
        correctIndex: 1,
        explanation: "L'approche professionnelle : documenter avec des comparables, puis proposer un ajustement progressif.",
      },
      {
        id: "t4",
        question: "La technique SPIN en negociation immobiliere signifie :",
        options: [
          "Situation, Probleme, Implication, Besoin-solution",
          "Speed, Performance, Innovation, Negociation",
          "Strategie, Prix, Information, Normes",
          "Signature, Paiement, Investissement, Notaire",
        ],
        correctIndex: 0,
        explanation: "SPIN Selling : Situation > Probleme > Implication > Need-payoff (besoin-solution).",
      },
      {
        id: "t5",
        question: "Un CRM immobilier sert principalement a :",
        options: [
          "Calculer les impots fonciers",
          "Gerer et suivre les contacts, mandats et relances",
          "Rediger les actes notaries",
          "Publier automatiquement les annonces",
        ],
        correctIndex: 1,
        explanation: "Le CRM centralise la relation client : contacts, historique, relances, pipeline de mandats.",
      },
      {
        id: "t6",
        question: "L'objection 'votre commission est trop elevee' se traite par :",
        options: [
          "Baisser immediatement le prix",
          "Expliquer la valeur ajoutee et les services inclus",
          "Ignorer l'objection",
          "Proposer de travailler gratuitement",
        ],
        correctIndex: 1,
        explanation: "La reponse professionnelle valorise les services (estimation, marketing, negociation, suivi juridique).",
      },
      {
        id: "t7",
        question: "Un bon indicateur de performance pour un negociateur est :",
        options: [
          "Le nombre de cafes bus par semaine",
          "Le ratio mandats pris / mandats vendus",
          "Le nombre d'heures au bureau",
          "Le nombre de cartes de visite distribuees",
        ],
        correctIndex: 1,
        explanation: "Le taux de transformation (prise de mandat -> vente) est l'indicateur cle de performance.",
      },
      {
        id: "t8",
        question: "La negociation gagnant-gagnant vise a :",
        options: [
          "Faire gagner uniquement l'acheteur",
          "Trouver un accord satisfaisant pour les deux parties",
          "Maximiser la commission de l'agent",
          "Accelerer la vente a tout prix",
        ],
        correctIndex: 1,
        explanation: "La negociation collaborative cree de la valeur pour les deux parties et preserve la relation.",
      },
      {
        id: "t9",
        question: "Le prix de presentation ideal d'un bien est :",
        options: [
          "Toujours au-dessus du marche pour laisser une marge",
          "Aligne sur les comparables recents avec une marge de negociation raisonnable",
          "Le plus bas possible pour vendre vite",
          "Le prix souhaite par le vendeur sans analyse",
        ],
        correctIndex: 1,
        explanation: "Un prix aligne sur le marche + marge raisonnable optimise le delai de vente et le prix final.",
      },
      {
        id: "t10",
        question: "La fidelisation client en immobilier passe d'abord par :",
        options: [
          "Des cadeaux couteux",
          "Un suivi regulier et personnalise apres la transaction",
          "Des appels quotidiens",
          "Des publicites dans le journal",
        ],
        correctIndex: 1,
        explanation: "Le suivi post-transaction (anniversaire, conseils, parrainage) genere des recommandations durables.",
      },
    ],
  },
  {
    moduleSlug: "financement",
    title: "Examen — Financement & fiscalite",
    duration: 15,
    questions: [
      {
        id: "f1",
        question: "Le taux d'endettement maximum recommande par le HCSF est de :",
        options: ["25%", "33%", "35%", "40%"],
        correctIndex: 2,
        explanation: "Depuis janvier 2022, le HCSF fixe le seuil d'endettement a 35% (assurance incluse).",
      },
      {
        id: "f2",
        question: "La rentabilite nette se calcule en deduisant du loyer :",
        options: [
          "Uniquement la taxe fonciere",
          "Charges, taxe fonciere, assurance, gestion et vacance locative",
          "Uniquement les interets d'emprunt",
          "Rien, c'est la meme que la brute",
        ],
        correctIndex: 1,
        explanation: "La rentabilite nette integre toutes les charges reelles pour reflechir le rendement reel.",
      },
      {
        id: "f3",
        question: "Le dispositif Pinel permet :",
        options: [
          "Une exoneration totale d'impots",
          "Une reduction d'impot proportionnelle a la duree d'engagement locatif",
          "Un credit d'impot sur les travaux uniquement",
          "Une deduction des interets d'emprunt sans plafond",
        ],
        correctIndex: 1,
        explanation: "Le Pinel offre une reduction d'impot de 9% a 14% selon la duree d'engagement (6, 9 ou 12 ans).",
      },
      {
        id: "f4",
        question: "L'assurance emprunteur (ADI) couvre principalement :",
        options: [
          "Les degats des eaux du bien",
          "Le deces, l'invalidite et l'incapacite de travail de l'emprunteur",
          "La perte de valeur du bien",
          "Les vices caches",
        ],
        correctIndex: 1,
        explanation: "L'ADI protege la banque et l'emprunteur en cas de deces, invalidite ou incapacite de remboursement.",
      },
      {
        id: "f5",
        question: "Le regime LMNP (Loueur Meuble Non Professionnel) permet :",
        options: [
          "D'etre exonere de toute fiscalite",
          "D'amortir le bien et de deduire les charges en regime reel",
          "De louer sans bail",
          "De vendre sans plus-value",
        ],
        correctIndex: 1,
        explanation: "Le LMNP en regime reel permet l'amortissement du bien et la deduction des charges reelles.",
      },
      {
        id: "f6",
        question: "Le PTZ (Pret a Taux Zero) est reserve :",
        options: [
          "A tous les acheteurs sans condition",
          "Aux primo-accedants sous conditions de ressources",
          "Aux investisseurs locatifs uniquement",
          "Aux SCI exclusivement",
        ],
        correctIndex: 1,
        explanation: "Le PTZ est reserve aux primo-accedants, sous plafonds de ressources et selon la zone geographique.",
      },
      {
        id: "f7",
        question: "La plus-value immobiliere est exoneree d'impot apres :",
        options: ["15 ans", "22 ans pour l'IR et 30 ans pour les prelevements sociaux", "10 ans", "5 ans"],
        correctIndex: 1,
        explanation: "Exoneration IR apres 22 ans, exoneration totale (y compris prelevements sociaux) apres 30 ans.",
      },
      {
        id: "f8",
        question: "Le taux d'usure est :",
        options: [
          "Le taux minimum pratique par les banques",
          "Le taux maximum legal au-dela duquel un pret ne peut etre accorde",
          "Le taux moyen du marche immobilier",
          "Le taux de la Banque Centrale Europeenne",
        ],
        correctIndex: 1,
        explanation: "Le taux d'usure est le TAEG maximum legal, publie trimestriellement par la Banque de France.",
      },
      {
        id: "f9",
        question: "Le deficit foncier est imputable sur le revenu global :",
        options: [
          "Sans limite",
          "Dans la limite de 10 700 EUR par an (hors interets d'emprunt)",
          "Uniquement sur les revenus fonciers",
          "Il n'est jamais imputable",
        ],
        correctIndex: 1,
        explanation: "Le deficit foncier (hors interets) est deductible du revenu global dans la limite de 10 700 EUR/an.",
      },
      {
        id: "f10",
        question: "La delegation d'assurance emprunteur permet :",
        options: [
          "De supprimer l'assurance",
          "De choisir un assureur different de celui propose par la banque",
          "De reduire le montant du pret",
          "De prolonger la duree du credit",
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
        question: "Les photos immobilieres professionnelles doivent privilegier :",
        options: [
          "Le flash direct et le mode portrait",
          "La lumiere naturelle, le grand angle et le staging",
          "Les filtres Instagram lourds",
          "Le noir et blanc pour le style",
        ],
        correctIndex: 1,
        explanation: "Lumiere naturelle + grand angle + home staging = photos qui convertissent les clics en visites.",
      },
      {
        id: "m2",
        question: "Sur SeLoger et Leboncoin, l'element qui genere le plus de clics est :",
        options: [
          "La description technique",
          "La photo principale et le prix",
          "Le nom de l'agence",
          "Le numero de telephone",
        ],
        correctIndex: 1,
        explanation: "La photo principale et le prix sont les premiers elements vus : ils determinent le taux de clic.",
      },
      {
        id: "m3",
        question: "Une annonce immobiliere efficace doit contenir :",
        options: [
          "Le maximum de majuscules pour attirer l'attention",
          "Un titre accrocheur, des points forts du bien et un appel a l'action",
          "Uniquement la surface et le prix",
          "Des emojis dans chaque phrase",
        ],
        correctIndex: 1,
        explanation: "Structure gagnante : titre accrocheur + avantages cles + CTA (appel a l'action) clair.",
      },
      {
        id: "m4",
        question: "Le meilleur moment pour publier sur les reseaux sociaux immobiliers est :",
        options: [
          "Lundi a 6h du matin",
          "En semaine entre 11h-13h et 18h-20h",
          "Le dimanche a 23h",
          "N'importe quand, l'algorithme s'en charge",
        ],
        correctIndex: 1,
        explanation: "Les pics d'engagement se situent a la pause dejeuner et en fin de journee en semaine.",
      },
      {
        id: "m5",
        question: "Le SEO local pour une agence immobiliere commence par :",
        options: [
          "Acheter des liens par milliers",
          "Optimiser sa fiche Google Business Profile",
          "Creer un blog sur la cuisine",
          "Ignorer Google et se concentrer sur les flyers",
        ],
        correctIndex: 1,
        explanation: "Google Business Profile est la base du referencement local : fiche complete, avis, photos, posts.",
      },
      {
        id: "m6",
        question: "Le format video le plus efficace sur Instagram pour l'immobilier est :",
        options: [
          "Un diaporama de 30 photos",
          "Un Reel de 30-60 secondes avec visite virtuelle",
          "Une video de 10 minutes en plan fixe",
          "Une photo avec musique",
        ],
        correctIndex: 1,
        explanation: "Les Reels courts avec visite dynamique generent le plus d'engagement et de portee organique.",
      },
      {
        id: "m7",
        question: "Le home staging virtuel permet de :",
        options: [
          "Cacher les defauts du bien",
          "Aider l'acheteur a se projeter dans le bien grace a des visuels amenages",
          "Modifier les plans du bien",
          "Remplacer les visites physiques",
        ],
        correctIndex: 1,
        explanation: "Le home staging virtuel aide a la projection sans tromper : il illustre le potentiel du bien.",
      },
      {
        id: "m8",
        question: "Le taux de conversion d'une annonce immobiliere se mesure par :",
        options: [
          "Le nombre de likes sur Facebook",
          "Le ratio contacts qualifies / nombre de vues de l'annonce",
          "Le nombre de partages WhatsApp",
          "La duree de mise en ligne",
        ],
        correctIndex: 1,
        explanation: "Le taux de conversion = leads qualifies / vues. C'est l'indicateur cle de performance d'une annonce.",
      },
      {
        id: "m9",
        question: "Pour ameliorer le referencement d'un site immobilier, il faut :",
        options: [
          "Copier les annonces des concurrents",
          "Creer du contenu unique, local et regulier (blog, guides, estimations)",
          "Acheter le nom de domaine le plus long possible",
          "Mettre le maximum de mots-cles dans le footer",
        ],
        correctIndex: 1,
        explanation: "Le contenu unique, pertinent et local (guides quartier, estimations) est la cle du SEO immobilier.",
      },
      {
        id: "m10",
        question: "L'email marketing immobilier est le plus efficace quand il est :",
        options: [
          "Envoye a toute la base sans segmentation",
          "Personnalise, segmente par criteres (acheteur/vendeur, budget, zone)",
          "Envoye 5 fois par jour",
          "Uniquement compose d'images sans texte",
        ],
        correctIndex: 1,
        explanation: "La segmentation et la personnalisation multiplient par 3 a 5 le taux d'ouverture et de conversion.",
      },
    ],
  },
  {
    moduleSlug: "terrain",
    title: "Examen — Visite, closing & fidelisation",
    duration: 15,
    questions: [
      {
        id: "te1",
        question: "Avant une visite, l'agent immobilier doit :",
        options: [
          "Arriver en retard pour creer l'attente",
          "Preparer un parcours de visite, verifier l'etat du bien et anticiper les questions",
          "Laisser le client decouvrir seul",
          "Ne rien preparer pour etre spontane",
        ],
        correctIndex: 1,
        explanation: "La preparation (parcours, points forts, reponses aux objections) est la cle d'une visite reussie.",
      },
      {
        id: "te2",
        question: "L'argumentaire de vente doit mettre en avant :",
        options: [
          "Uniquement le prix bas",
          "Les benefices pour l'acheteur (cadre de vie, potentiel, emplacement)",
          "Les defauts pour etre honnete",
          "Le nombre de pieces uniquement",
        ],
        correctIndex: 1,
        explanation: "Vendre des benefices (pas des caracteristiques) : projection, mode de vie, valorisation.",
      },
      {
        id: "te3",
        question: "Face a l'objection 'je vais reflechir', la bonne reponse est :",
        options: [
          "D'accord, rappelez-moi quand vous voulez",
          "Identifier le frein reel et proposer des elements pour aider a la decision",
          "Baisser le prix immediatement",
          "Ignorer et passer au client suivant",
        ],
        correctIndex: 1,
        explanation: "Derriere 'je vais reflechir' se cache souvent un frein specifique a identifier et traiter.",
      },
      {
        id: "te4",
        question: "Le closing immobilier efficace repose sur :",
        options: [
          "La pression agressive",
          "La creation d'un sentiment d'urgence legitime et la securisation du client",
          "L'attente passive d'une decision",
          "La multiplication des visites sans suivi",
        ],
        correctIndex: 1,
        explanation: "Un bon closing combine urgence (marche, concurrence) et reassurance (accompagnement, garanties).",
      },
      {
        id: "te5",
        question: "La promesse de vente se distingue du compromis par :",
        options: [
          "Elle n'engage que le vendeur (promesse unilaterale)",
          "Elle est moins chere",
          "Elle n'a pas besoin de notaire",
          "Elle est plus rapide a signer",
        ],
        correctIndex: 0,
        explanation: "La promesse unilaterale engage uniquement le vendeur ; l'acheteur a une option d'achat.",
      },
      {
        id: "te6",
        question: "L'acte authentique est signe chez :",
        options: [
          "L'agent immobilier",
          "Le notaire",
          "La mairie",
          "La banque",
        ],
        correctIndex: 1,
        explanation: "Seul le notaire peut recevoir l'acte authentique de vente qui transfere la propriete.",
      },
      {
        id: "te7",
        question: "Le suivi post-vente ideal comprend :",
        options: [
          "Ne plus jamais contacter le client",
          "Un contact a 1 mois, 6 mois, 1 an avec des attentions personnalisees",
          "Un appel quotidien pendant 1 an",
          "Un email automatique unique",
        ],
        correctIndex: 1,
        explanation: "Un suivi espace et personnalise (anniversaire, conseils) transforme un client en ambassadeur.",
      },
      {
        id: "te8",
        question: "Le parrainage client est efficace parce que :",
        options: [
          "Il ne coute rien",
          "La recommandation personnelle a un taux de conversion 4 a 5 fois superieur",
          "Il remplace la prospection",
          "Il est obligatoire legalement",
        ],
        correctIndex: 1,
        explanation: "Le bouche-a-oreille qualifie convertit beaucoup mieux que la prospection froide.",
      },
      {
        id: "te9",
        question: "Lors de la visite, l'agent doit adopter une posture de :",
        options: [
          "Vendeur agressif",
          "Conseiller a l'ecoute qui guide la decouverte",
          "Simple ouvreur de portes",
          "Critique du bien pour negocier",
        ],
        correctIndex: 1,
        explanation: "Le role de conseil (ecoute, reponses, projection) cree la confiance et facilite la decision.",
      },
      {
        id: "te10",
        question: "La condition suspensive d'obtention de pret protege :",
        options: [
          "Uniquement la banque",
          "L'acheteur, qui peut se desengager si le pret est refuse",
          "Uniquement le vendeur",
          "L'agent immobilier",
        ],
        correctIndex: 1,
        explanation: "La condition suspensive de pret protege l'acheteur : si le credit est refuse, la vente est annulee sans penalite.",
      },
    ],
  },
];

export function getModuleExam(moduleSlug: string): ModuleExam | undefined {
  return MODULE_EXAMS.find((e) => e.moduleSlug === moduleSlug);
}
