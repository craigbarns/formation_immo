/**
 * Questions d'examen par module — mode chronométré avec scoring persistant.
 */

export type ExamQuestion = {
  id: string;
  question: string;
  type?: "qcm" | "open";
  options?: string[];
  correctIndex?: number;
  modelAnswer?: string;
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
        explanation: "La loi Hoguet et ses décrets imposent la mention des honoraires et de leur charge supportée (vendeur ou acquéreur) dans le mandat."
      },
      {
        id: "j11",
        question: "Depuis le 1er janvier 2025, quels logements ne peuvent plus être loués (interdiction de location loi Climat) ?",
        options: [
          "Les logements classés G au DPE (passoires thermiques)",
          "Les logements classés F au DPE",
          "Tous les logements de plus de 30 ans",
          "Les logements situés en zone tendue uniquement",
        ],
        correctIndex: 0,
        explanation: "La loi Climat & Résilience interdit la location des logements G depuis 2025, F depuis 2028, E depuis 2034. Les biens DPE G sortent progressivement du marché locatif.",
      },
      {
        id: "j12",
        question: "Le seuil de déclaration de soupçon Tracfin (LCB-FT) en transaction immobilière est :",
        options: [
          "Aucun seuil — toute opération suspecte doit être déclarée",
          "À partir de 10 000 € en espèces",
          "À partir de 100 000 € quel que soit le mode de paiement",
          "Uniquement pour les transactions internationales",
        ],
        correctIndex: 0,
        explanation: "Tracfin n'impose pas de seuil financier : c'est l'analyse du risque (incohérence du financement, profil client, origine des fonds) qui déclenche la déclaration. Le seuil 10 000 € concerne le paiement espèces interdit (Code monétaire L112-6).",
      },
      {
        id: "j13",
        question: "Le délai légal de rétractation SRU pour un acquéreur particulier est de :",
        options: [
          "7 jours calendaires",
          "10 jours calendaires à compter de la réception du compromis",
          "14 jours ouvrables",
          "30 jours à compter de la signature",
        ],
        correctIndex: 1,
        explanation: "Article L271-1 CCH : 10 jours calendaires de rétractation pour l'acquéreur non-pro après remise du compromis (LRAR ou main propre). Délai d'ordre public, non négociable.",
      },
      {
        id: "j14",
        question: "Expliquez avec vos mots : qu'est-ce qu'un mandat exclusif et quels sont ses avantages pour le vendeur et pour l'agent ?",
        type: "open",
        modelAnswer: "Le mandat exclusif confie la vente d'un bien immobilier à un seul agent. Pour le vendeur, il garantit une meilleure visibilité (l'agent investit davantage en marketing), un suivi personnalisé et souvent un délai de vente plus court. Pour l'agent, il sécurise sa rémunération, lui permet de maîtriser la commercialisation et de négocier sereinement avec les acquéreurs sans crainte d'être court-circuité.",
        explanation: "Un bon agent doit savoir argumenter les 2 types de mandats (simple vs exclusif) en mettant en valeur les bénéfices concrets pour chaque partie.",
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
      {
        id: "t11",
        question: "La loi Lemoine (2022) sur l'assurance emprunteur permet :",
        options: [
          "De ne pas souscrire d'assurance pour les prêts < 50 000 €",
          "De résilier et changer d'assurance emprunteur à tout moment, sans frais",
          "De réduire automatiquement le taux d'intérêt du prêt",
          "De supprimer le questionnaire médical pour tous les prêts",
        ],
        correctIndex: 1,
        explanation: "Loi Lemoine 2022 : résiliation infra-annuelle (à tout moment) de l'assurance emprunteur + suppression du questionnaire médical pour prêts < 200 000 € remboursés avant 60 ans. Économie moyenne : 5 000 à 15 000 € sur la durée du prêt.",
      },
      {
        id: "t12",
        question: "La différence principale entre compromis de vente et promesse unilatérale de vente :",
        options: [
          "Aucune, ce sont des synonymes",
          "Le compromis engage les deux parties, la promesse n'engage que le vendeur (option pour l'acheteur)",
          "La promesse est obligatoire chez le notaire, pas le compromis",
          "Le compromis est uniquement pour le neuf",
        ],
        correctIndex: 1,
        explanation: "Compromis (synallagmatique) = vente parfaite, les deux engagés. Promesse unilatérale = vendeur engagé, acheteur dispose d'une option (indemnité d'immobilisation 5-10% si renonce hors conditions suspensives).",
      },
      {
        id: "t13",
        question: "Le séquestre versé par l'acquéreur lors du compromis représente généralement :",
        options: [
          "1% à 2% du prix",
          "5% à 10% du prix de vente",
          "20% à 30% du prix",
          "Le prix complet",
        ],
        correctIndex: 1,
        explanation: "Le dépôt de garantie (séquestre) est usuellement de 5 à 10% du prix de vente, conservé par le notaire ou l'agence. Restituable si conditions suspensives non levées, conservé par le vendeur en cas de défaillance acquéreur après les 10 jours de rétractation SRU.",
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
      {
        id: "f11",
        question: "Une SCI à l'IS (Impôt sur les Sociétés) est généralement préférable à une SCI à l'IR pour :",
        options: [
          "Une location nue de courte durée pour des particuliers",
          "Un investissement locatif avec amortissement du bien et capitalisation",
          "Une résidence principale familiale",
          "Aucun cas, l'IR est toujours mieux",
        ],
        correctIndex: 1,
        explanation: "SCI à l'IS : amortissement comptable du bien (diminue la base imposable), taux IS 15% jusqu'à 42 500 € puis 25%, parfaite pour capitaliser. Inconvénient : double imposition à la sortie (IS sur plus-value + IR sur dividendes).",
      },
      {
        id: "f12",
        question: "Le démembrement temporaire (vente nue-propriété) sur 15-20 ans permet à l'investisseur :",
        options: [
          "De percevoir immédiatement les loyers",
          "D'acquérir un bien avec une décote de 30-40% et récupérer la pleine propriété sans fiscalité au terme",
          "De déduire les loyers de ses impôts",
          "De revendre rapidement avec plus-value",
        ],
        correctIndex: 1,
        explanation: "Achat nue-propriété : prix décoté 30-40%, pas de loyers ni fiscalité IFI/IR pendant 15-20 ans. À l'échéance, l'usufruit s'éteint automatiquement, l'investisseur récupère la pleine propriété sans frais ni fiscalité. Stratégie patrimoniale long terme.",
      },
      {
        id: "f13",
        question: "Le déficit foncier généré par des travaux sur un bien locatif loué nu est imputable :",
        options: [
          "Sans plafond sur le revenu global",
          "Sur le revenu global jusqu'à 10 700 €/an (21 400 € pour travaux énergétiques 2023-2025)",
          "Uniquement sur les revenus fonciers futurs",
          "Sur la plus-value de revente uniquement",
        ],
        correctIndex: 1,
        explanation: "Plafond standard 10 700 € imputables sur revenu global, doublé à 21 400 € pour travaux de rénovation énergétique permettant de sortir d'une étiquette F ou G (loi de finances 2023, prolongé jusqu'en 2025). Économie d'impôt = TMI × montant déficit.",
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
      {
        id: "m11",
        question: "Une visite virtuelle 3D type Matterport augmente en moyenne le taux de prise de RDV de :",
        options: [
          "5%",
          "30 à 50% selon les baromètres sectoriels",
          "Aucun impact démontré",
          "200% systématiquement",
        ],
        correctIndex: 1,
        explanation: "Études MoxiWorks/Matterport : annonces avec visite 3D génèrent +30 à +50% de prises de contact qualifiées et réduisent les visites physiques 'curieuses' (-40%). ROI shooting Matterport (300-600€) atteint en 1 mandat.",
      },
      {
        id: "m12",
        question: "Sur LinkedIn, la stratégie personal branding immobilier la plus efficace est :",
        options: [
          "Publier uniquement des annonces de biens à vendre",
          "Mixer expertise locale (analyses marché), success stories clients, conseils pédagogiques",
          "Reposter le contenu de l'agence",
          "Acheter des followers",
        ],
        correctIndex: 1,
        explanation: "LinkedIn = vitrine d'expertise. Algorithme valorise contenu original + interaction. Mix gagnant : 50% expertise/conseils, 30% témoignages clients, 20% coulisses du métier. Évitez le 'achetez/vendez' direct (-80% de portée).",
      },
      {
        id: "m13",
        question: "Depuis 2022, l'affichage du DPE dans une annonce immobilière est :",
        options: [
          "Recommandé mais pas obligatoire",
          "Obligatoire avec lettres + montant estimé des dépenses énergétiques annuelles",
          "Obligatoire uniquement pour la location",
          "Obligatoire uniquement pour les biens > 100 m²",
        ],
        correctIndex: 1,
        explanation: "Décret 2021-1104 : annonce doit afficher la classe DPE (A à G) + GES + montant estimé charges énergétiques annuelles min/max. Sanction DGCCRF : 3 000 € (PP) / 15 000 € (PM). Mention obligatoire 'logement à consommation énergétique excessive' pour F/G.",
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
      {
        id: "te11",
        question: "La méthode BANT (Budget, Authority, Need, Timing) sert à :",
        options: [
          "Calculer la commission de l'agent",
          "Qualifier rapidement un prospect : a-t-il les moyens, le pouvoir de décision, le besoin et l'urgence ?",
          "Décrire un bien immobilier",
          "Évaluer un agent en formation",
        ],
        correctIndex: 1,
        explanation: "BANT = grille de qualification leads. Un prospect 'BANT-positif' (4/4) doit être prioritaire, un BANT 1-2/4 nécessite nurturing avant relance. Outil canonique pour ne pas perdre de temps sur des contacts froids.",
      },
      {
        id: "te12",
        question: "Pour traiter l'objection 'C'est trop cher', la meilleure technique est :",
        options: [
          "Baisser immédiatement le prix",
          "Reformuler ('trop cher par rapport à quoi ?'), creuser la vraie objection (peur, comparaison, capacité), puis valoriser les bénéfices",
          "Ignorer l'objection et passer à la suite",
          "Conseiller un autre bien moins cher",
        ],
        correctIndex: 1,
        explanation: "Méthode CRAC (Creuser, Reformuler, Argumenter, Confirmer). 'Trop cher' cache souvent : peur de se tromper, comparaison fausse, capacité financière mal évaluée. Reformuler permet de désarmer et personnaliser la réponse.",
      },
      {
        id: "te13",
        question: "La technique de closing 'Ben Franklin' (balance bénéfices/freins) est efficace car :",
        options: [
          "Elle force la décision immédiate",
          "Elle aide le client à structurer sa réflexion en listant pros/cons, ce qui réduit la peur du choix",
          "Elle utilise la pression psychologique",
          "Elle promet des cadeaux",
        ],
        correctIndex: 1,
        explanation: "Ben Franklin Close : on co-construit avec le client une balance écrite '+/-'. Effet : le client visualise objectivement la décision, l'agent guide subtilement vers les bénéfices. Excellent pour acheteurs hésitants/analytiques.",
      },
      {
        id: "te14",
        question: "Le renouvellement de la carte professionnelle (carte T) est obligatoire tous les :",
        options: ["1 an", "2 ans", "3 ans", "5 ans"],
        correctIndex: 2,
        explanation: "La carte professionnelle est délivrée par la CCI et doit être renouvelée tous les 3 ans, sous réserve de 42h de formation continue.",
      },
      {
        id: "te15",
        question: "Le délai de rétractation de l'acheteur après signature du compromis est de :",
        options: ["7 jours", "10 jours", "14 jours", "1 mois"],
        correctIndex: 1,
        explanation: "Le délai de rétractation est de 10 jours calendaires à compter de la notification du compromis (loi SRU).",
      },
      {
        id: "te16",
        question: "La méthode d'estimation la plus utilisée par les agents immobiliers est :",
        options: ["La méthode du coût de reconstruction", "La méthode comparative (prix au m²)", "La méthode du rendement", "La méthode comptable"],
        correctIndex: 1,
        explanation: "La méthode comparative consiste à comparer le bien avec des biens similaires vendus récemment dans le même secteur. C'est la plus utilisée en pratique.",
      },
      {
        id: "te17",
        question: "Le taux d'usure en crédit immobilier est fixé par :",
        options: ["La Banque de France", "Le ministère de l'Économie", "L'ACPR", "La BCE"],
        correctIndex: 0,
        explanation: "Le taux d'usure est fixé trimestriellement par la Banque de France. Il représente le taux effectif global (TEG) maximum autorisé.",
      },
      {
        id: "te18",
        question: "Pour optimiser le référencement local d'une annonce immobilière, l'élément le plus important est :",
        options: ["Le nombre d'images", "La présence du nom du quartier dans le titre et la description", "Le prix affiché", "La couleur de l'annonce"],
        correctIndex: 1,
        explanation: "Le SEO local immobilier repose fortement sur la présence des noms de quartiers, villes et landmarks dans le contenu textuel.",
      },
      {
        id: "te19",
        question: "Sur Instagram, le format le plus performant pour les agents immobiliers est :",
        options: ["Le texte statique", "Le carousel (plusieurs images)", "La story éphémère", "Le live"],
        correctIndex: 1,
        explanation: "Les carousels génèrent le plus d'engagement car ils incitent au swipe et augmentent le temps passé sur le contenu.",
      },
      {
        id: "te20",
        question: "Lors d'une visite virtuelle 3D (Matterport), l'erreur la plus fréquente est :",
        options: ["Utiliser trop de points de scan", "Scanner sans préparer le logement (objets personnels, lumière)", "Mettre la musique trop forte", "Filmer en 720p"],
        correctIndex: 1,
        explanation: "Un logement mal préparé (encombré, mal éclairé, objets personnels visibles) dégrade fortement la qualité perçue de la visite virtuelle.",
      },
      {
        id: "te21",
        question: "La technique de négociation 'boule de neige' consiste à :",
        options: ["Baisser le prix progressivement", "Accumuler les concessions mineures pour obtenir un gain majeur", "Augmenter le prix à chaque visite", "Refuser toute concession"],
        correctIndex: 1,
        explanation: "La technique de la boule de neige consiste à demander plusieurs concessions mineures qui, cumulées, créent un avantage significatif en négociation.",
      },
      {
        id: "te22",
        question: "La plus-value immobilière est exonérée d'impôt après une détention de :",
        options: ["15 ans", "22 ans", "30 ans", "5 ans"],
        correctIndex: 1,
        explanation: "La plus-value sur les biens immobiliers est exonérée après 22 ans pour l'impôt sur le revenu et 30 ans pour les prélèvements sociaux.",
      },
      {
        id: "te23",
        question: "Les honoraires d'agence sont encadrés par :",
        options: ["Aucune réglementation", "La loi Hoguet (affichage obligatoire et répartition)", "Un décret du ministère du Logement", "La Chambre de Commerce"],
        correctIndex: 1,
        explanation: "La loi Hoguet impose l'affichage des honoraires en vitrine et sur chaque annonce, ainsi que la mention de leur charge supportée (vendeur ou acquéreur selon le mandat)."
      },
      {
        id: "te24",
        question: "Un compromis de vente doit obligatoirement contenir :",
        options: ["Uniquement le prix et l'adresse", "L'identification des parties, le prix, la description du bien, les conditions suspensives et la date de signature", "Uniquement la date de signature", "Le nom du notaire uniquement"],
        correctIndex: 1,
        explanation: "Le compromis doit contenir : identification des parties, description du bien, prix, conditions suspensives, date de signature, et délai de rétractation.",
      },
      {
        id: "te25",
        question: "Le mandat de vente simple permet au propriétaire de :",
        options: ["Vendre lui-même ou via plusieurs agences simultanément", "Vendre uniquement via une agence", "Ne pas vendre", "Vendre uniquement à un acheteur proposé par l'agence"],
        correctIndex: 0,
        explanation: "Le mandat simple autorise le propriétaire à vendre par lui-même ou de confier la vente à plusieurs agences en parallèle.",
      },
    ],
  },
  {
    moduleSlug: "tracfin",
    title: "Examen — TRACFIN & lutte anti-blanchiment",
    duration: 15,
    questions: [
      {
        id: "tr1",
        question: "Les professionnels de l'immobilier sont-ils assujettis à la lutte contre le blanchiment (LCB-FT) ?",
        options: [
          "Non, seules les banques le sont",
          "Oui : agents immobiliers et intermédiaires figurent parmi les professions assujetties du Code monétaire et financier",
          "Uniquement pour les transactions de plus d'un million d'euros",
          "Uniquement les notaires dans la chaîne immobilière",
        ],
        correctIndex: 1,
        explanation:
          "Les professionnels de l'immobilier (transaction, et selon les cas location) sont expressément assujettis aux obligations LCB-FT par le Code monétaire et financier (art. L.561-2). L'immobilier est un secteur prioritaire de vigilance : c'est un canal classique de blanchiment.",
      },
      {
        id: "tr2",
        question: "Que recouvre l'obligation de « vigilance client » (KYC) avant d'entrer en relation d'affaires ?",
        options: [
          "Demander uniquement le nom du client",
          "Identifier le client ET vérifier son identité sur document probant, identifier le bénéficiaire effectif, et comprendre l'objet de la relation",
          "Vérifier seulement la solvabilité bancaire",
          "Rien tant que le compromis n'est pas signé",
        ],
        correctIndex: 1,
        explanation:
          "La vigilance impose d'identifier et vérifier l'identité du client (pièce officielle), d'identifier le bénéficiaire effectif des personnes morales, et de recueillir les informations sur l'objet et la nature de la relation — AVANT la transaction, avec conservation des justificatifs.",
      },
      {
        id: "tr3",
        question: "Qu'est-ce que le « bénéficiaire effectif » d'une société acheteuse ?",
        options: [
          "Le gérant inscrit au Kbis, toujours",
          "La ou les personnes physiques qui contrôlent en dernier ressort la société (détention significative du capital ou contrôle de fait)",
          "L'agent immobilier mandaté",
          "Le notaire chargé de l'acte",
        ],
        correctIndex: 1,
        explanation:
          "Le bénéficiaire effectif est la personne physique qui, in fine, possède ou contrôle la société (seuil indicatif de détention de 25 % du capital ou contrôle par d'autres moyens). Les montages en cascade visant à le dissimuler sont un signal d'alerte classique.",
      },
      {
        id: "tr4",
        question: "Parmi ces situations, laquelle constitue un signal d'alerte typique de blanchiment dans une transaction ?",
        options: [
          "Un acquéreur qui négocie le prix à la baisse",
          "Un acquéreur pressé, indifférent au prix et aux caractéristiques du bien, avec un financement au montage opaque",
          "Un acquéreur qui demande un second rendez-vous de visite",
          "Un vendeur qui refuse une offre trop basse",
        ],
        correctIndex: 1,
        explanation:
          "Le faisceau d'indices inclut : indifférence au prix ou aux caractéristiques, précipitation inhabituelle, fonds d'origine floue ou en provenance de tiers/étranger sans justification, montages sociétaires opaques, distance inexpliquée entre le client et le bien.",
      },
      {
        id: "tr5",
        question: "Un client souhaite régler une partie du prix « en espèces, de la main à la main ». Que devez-vous savoir ?",
        options: [
          "C'est légal si les deux parties sont d'accord",
          "Les paiements en espèces sont strictement plafonnés ; une demande de ce type est un signal d'alerte majeur à documenter",
          "C'est autorisé jusqu'à 50 000 €",
          "Cela ne concerne que le notaire",
        ],
        correctIndex: 1,
        explanation:
          "Le règlement d'une transaction immobilière passe par le notaire et les paiements en espèces sont très strictement plafonnés par la loi. Une telle proposition est un indice caractérisé : refus, documentation de la demande, et évaluation d'une déclaration de soupçon.",
      },
      {
        id: "tr6",
        question: "Qu'est-ce que la « déclaration de soupçon » ?",
        options: [
          "Une plainte pénale déposée au commissariat contre le client",
          "Un signalement confidentiel transmis à TRACFIN lorsque le professionnel soupçonne que des fonds proviennent d'une infraction",
          "Un e-mail d'alerte envoyé à la FNAIM",
          "Une mention obligatoire ajoutée au compromis de vente",
        ],
        correctIndex: 1,
        explanation:
          "La déclaration de soupçon est le signalement, via la plateforme dédiée de TRACFIN (ERMES), des sommes ou opérations dont on soupçonne qu'elles proviennent d'une infraction ou participent au financement du terrorisme. Ce n'est ni une plainte ni une accusation — c'est une transmission d'informations protégée.",
      },
      {
        id: "tr7",
        question: "Après avoir déclaré un soupçon à TRACFIN, pouvez-vous en informer votre client « par transparence » ?",
        options: [
          "Oui, la transparence prime dans la relation commerciale",
          "Non : révéler l'existence d'une déclaration est interdit et pénalement sanctionné (interdiction de divulgation)",
          "Oui, mais seulement après la signature de l'acte",
          "Oui, si le client le demande par écrit",
        ],
        correctIndex: 1,
        explanation:
          "L'interdiction de divulgation (« tipping off ») est absolue : informer le client ou un tiers de l'existence d'une déclaration de soupçon est une infraction pénale. La déclaration est confidentielle et le déclarant de bonne foi bénéficie d'une immunité civile et pénale.",
      },
      {
        id: "tr8",
        question: "Le client visé par un soupçon insiste pour conclure. Faut-il refuser la transaction pour « se couvrir » ?",
        options: [
          "Oui, tout soupçon impose de rompre immédiatement la relation",
          "Pas nécessairement : on déclare à TRACFIN, on renforce la vigilance, et on n'alerte surtout pas le client — rompre brutalement peut constituer une divulgation indirecte",
          "Oui, et il faut prévenir les autres agences du secteur",
          "Non, la déclaration dispense de toute autre précaution",
        ],
        correctIndex: 1,
        explanation:
          "La déclaration n'interdit pas mécaniquement la poursuite de la relation : elle appelle une vigilance renforcée. Une rupture brutale et inexpliquée peut mettre la puce à l'oreille du client (divulgation indirecte). Chaque situation s'apprécie — au besoin avec conseil juridique — sans jamais révéler la déclaration.",
      },
      {
        id: "tr9",
        question: "Quelles obligations d'organisation interne la LCB-FT impose-t-elle à une agence ?",
        options: [
          "Aucune : la vigilance est une affaire individuelle",
          "Des procédures internes écrites, la formation régulière du personnel et la conservation des justificatifs de vigilance",
          "Uniquement l'affichage d'une plaque en vitrine",
          "L'embauche obligatoire d'un juriste à temps plein",
        ],
        correctIndex: 1,
        explanation:
          "L'assujetti doit disposer de procédures internes adaptées (classification des risques, modalités de vigilance), former régulièrement son personnel et conserver les documents de vigilance pendant cinq ans après la fin de la relation. La DGCCRF contrôle et sanctionne les manquements.",
      },
      {
        id: "tr10",
        question: "Que risque un professionnel de l'immobilier qui ignore ses obligations LCB-FT ?",
        options: [
          "Rien, tant qu'il n'a pas lui-même blanchi d'argent",
          "Des sanctions administratives et disciplinaires (amendes, interdiction d'exercer) et, en cas de participation, des poursuites pénales pour blanchiment",
          "Un simple rappel à l'ordre sans conséquence",
          "Uniquement la perte de sa carte de visite",
        ],
        correctIndex: 1,
        explanation:
          "Le manquement aux obligations LCB-FT expose à des sanctions administratives et disciplinaires lourdes (Commission nationale des sanctions : amendes, interdictions temporaires d'exercer, publication). Participer sciemment à une opération de blanchiment relève du pénal — jusqu'à 5 ans d'emprisonnement et 375 000 € d'amende, davantage en cas de circonstances aggravantes.",
      },
    ],
  },
  {
    moduleSlug: "deontologie",
    title: "Examen — Déontologie & éthique professionnelle",
    duration: 15,
    questions: [
      {
        id: "d1",
        question: "Le Code de déontologie des professionnels de l'immobilier a été instauré par :",
        options: [
          "La loi Hoguet du 2 janvier 1970",
          "Le décret n°2015-1090 du 28 août 2015",
          "La loi ALUR du 24 mars 2014",
          "Le Code civil article 1240",
        ],
        correctIndex: 1,
        explanation: "Le Code de déontologie est issu du décret n°2015-1090 du 28 août 2015, pris en application de la loi ALUR.",
      },
      {
        id: "d2",
        question: "Combien de critères de discrimination sont listés à l'article 225-1 du Code pénal ?",
        options: ["12", "18", "25", "30"],
        correctIndex: 2,
        explanation: "L'article 225-1 du Code pénal liste 25 critères de discrimination prohibés, dont l'origine, le sexe, l'état de santé, l'orientation sexuelle, la domiciliation bancaire, etc.",
      },
      {
        id: "d3",
        question: "Quelle est la sanction pénale maximale pour discrimination dans l'accès au logement ?",
        options: [
          "1 an et 15 000 €",
          "2 ans et 30 000 €",
          "3 ans et 45 000 €",
          "5 ans et 75 000 €",
        ],
        correctIndex: 2,
        explanation: "L'article 225-2 du Code pénal prévoit 3 ans d'emprisonnement et 45 000 € d'amende pour discrimination dans l'accès au logement.",
      },
      {
        id: "d4",
        question: "Le testing immobilier consiste à :",
        options: [
          "Tester la solidité d'un bien avant achat",
          "Envoyer deux candidats similaires financièrement mais différents sur un critère protégé pour détecter une discrimination",
          "Faire visiter un bien à plusieurs acquéreurs simultanément",
          "Tester la performance énergétique d'un logement",
        ],
        correctIndex: 1,
        explanation: "Le testing envoie deux candidats comparables financièrement mais différents sur un critère protégé (origine, prénom…). Reconnu comme preuve depuis la loi du 27 janvier 2017.",
      },
      {
        id: "d5",
        question: "Lequel de ces principes NE fait PAS partie des 10 principes du Code de déontologie ?",
        options: ["Loyauté", "Désintéressement", "Rentabilité", "Confraternité"],
        correctIndex: 2,
        explanation: "La rentabilité n'est pas un principe du Code de déontologie. Les 10 principes sont : compétence, conscience professionnelle, loyauté, désintéressement, confraternité, délicatesse, modération, courtoisie, indépendance, secret professionnel.",
      },
      {
        id: "d6",
        question: "La CNTGI est :",
        options: [
          "La Commission Nationale des Transactions et Gestions Immobilières",
          "Le Centre National de Traitement des Garanties Immobilières",
          "La Commission Nationale de la Transaction et de la Gestion Immobilières",
          "Le Comité National de Transparence et de Gouvernance Immobilière",
        ],
        correctIndex: 2,
        explanation: "La CNTGI est la Commission Nationale de la Transaction et de la Gestion Immobilières, instance disciplinaire de la profession.",
      },
      {
        id: "d7",
        question: "En cas de double mandant (représenter vendeur ET acheteur), l'agent doit :",
        options: [
          "Refuser systématiquement — c'est interdit",
          "Informer les deux parties par écrit de son double rôle avant toute négociation",
          "Facturer uniquement le vendeur",
          "Obtenir l'accord du préfet",
        ],
        correctIndex: 1,
        explanation: "Le double mandant est légal mais nécessite une information écrite des deux parties avant toute négociation, conformément au Code de déontologie.",
      },
      {
        id: "d8",
        question: "Combien de temps maximum peut-on conserver un dossier locataire refusé selon le RGPD ?",
        options: ["6 mois", "1 an", "3 ans", "5 ans"],
        correctIndex: 1,
        explanation: "Un dossier locataire refusé ne doit pas être conservé plus d'1 an. Les mandats et actes se conservent 5 ans (prescription civile).",
      },
    ],
  },
  {
    moduleSlug: "murs-fonds-commerce",
    title: "Examen — Murs & fonds de commerce",
    duration: 20,
    questions: [
      {
        id: "mf1",
        question:
          "Selon l'article L.145-1 du Code de commerce, quel est le critère déterminant pour qualifier un contrat de « bail commercial » au sens strict ?",
        options: [
          "L'immatriculation du locataire au Registre du Commerce et des Sociétés (RCS)",
          "L'exploitation par le locataire d'un fonds de commerce ou d'un établissement artisanal dans le local loué",
          "La conclusion d'un contrat écrit obligatoirement devant notaire",
          "La présence d'une enseigne visible depuis la voie publique",
        ],
        correctIndex: 1,
        explanation:
          "La qualification repose sur l'exploitation effective d'un fonds de commerce ou artisanal dans le local loué : c'est l'articulation entre l'activité et le local qui fonde le statut protecteur. L'acte notarié et l'enseigne ne sont pas des critères (art. L.145-1 C. com.).",
      },
      {
        id: "mf2",
        question:
          "Un restaurateur signe un bail commercial. Quelle est la durée minimale légale du bail et comment fonctionne le congé ?",
        options: [
          "Durée minimale de 3 ans avec congé possible à tout moment moyennant un préavis de 3 mois",
          "Durée minimale de 6 ans avec congé possible tous les 3 ans",
          "Durée minimale de 9 ans, renouvelable, avec congé possible à l'expiration de chaque période triennale (3e, 6e et 9e année)",
          "Durée minimale de 12 ans avec congé possible uniquement à l'expiration de la 9e année",
        ],
        correctIndex: 2,
        explanation:
          "Le bail commercial a une durée minimale de 9 ans (art. L.145-4 C. com.). Le congé peut être donné à l'expiration de chaque période triennale, avec un préavis d'au moins 6 mois. À l'issue des 9 ans, le locataire bénéficie du droit au renouvellement.",
      },
      {
        id: "mf3",
        question:
          "En cas de désaccord sur le loyer lors du renouvellement du bail commercial, comment le nouveau loyer est-il déterminé ?",
        options: [
          "Le loyer est automatiquement indexé sur l'indice du coût de la construction (ICC)",
          "Le loyer est fixé par le juge en tenant compte de la valeur locative des locaux, des charges, des travaux et des conditions du bail",
          "Le loyer est imposé par la Chambre de commerce et d'industrie locale",
          "Le loyer ne peut pas changer et reste identique à celui du bail initial",
        ],
        correctIndex: 1,
        explanation:
          "À défaut d'accord, le juge fixe le loyer du bail renouvelé d'après la valeur locative : état des lieux, conditions de jouissance, charges du locataire, travaux effectués et usages de la profession (art. L.145-33 et L.145-34 C. com.).",
      },
      {
        id: "mf4",
        question:
          "Selon l'article L.141-1 du Code de commerce, lequel de ces éléments constitue un élément essentiel du fonds de commerce ?",
        options: [
          "Les stocks de marchandises seulement",
          "L'enseigne, le nom commercial et la clientèle",
          "Le mobilier de bureau personnel du commerçant",
          "Le véhicule personnel du commerçant",
        ],
        correctIndex: 1,
        explanation:
          "Le fonds de commerce est un ensemble d'éléments corporels et incorporels. Les éléments incorporels — clientèle (élément le plus précieux), enseigne, nom commercial, droit au bail — en constituent l'essence (art. L.141-1 C. com.).",
      },
      {
        id: "mf5",
        question:
          "Lors d'une cession de fonds de commerce, quel mécanisme protège les créanciers du cédant après la publicité de la cession ?",
        options: [
          "Aucun : les créanciers du cédant perdent tout recours dès la signature de l'acte",
          "Un délai d'opposition permettant aux créanciers du cédant de faire valoir leurs créances, le prix étant séquestré en cas d'opposition",
          "Un délai de 60 jours pendant lequel les créanciers du cessionnaire peuvent contester la cession",
          "Un délai de 90 jours pendant lequel le cessionnaire peut renoncer à la cession",
        ],
        correctIndex: 1,
        explanation:
          "Après publicité de la cession, les créanciers du cédant disposent d'un délai légal pour former opposition ; en cas d'opposition, le prix de cession est séquestré (généralement chez le notaire) jusqu'à résolution. Sans opposition dans le délai, le prix est libéré (art. L.141-14 et s. C. com.).",
      },
      {
        id: "mf6",
        question:
          "Un locataire commercial veut céder son droit au bail seul à un repreneur. Le bail réserve au bailleur une faculté de préemption. Comment s'exerce-t-elle ?",
        options: [
          "Le bailleur se substitue au cessionnaire dans le délai prévu, au même prix et aux mêmes conditions que l'offre du repreneur",
          "Le bailleur peut préempter à tout moment en proposant un prix inférieur au prix de cession",
          "Le bailleur n'a jamais aucun droit de regard sur la cession du bail commercial",
          "Le bailleur doit obligatoirement acheter le fonds de commerce entier pour exercer sa préemption",
        ],
        correctIndex: 0,
        explanation:
          "La préemption s'exerce aux mêmes prix et conditions que l'offre du cessionnaire proposé, dans le délai imparti — le bailleur ne peut pas imposer un prix inférieur. À noter : la cession du bail avec le fonds de commerce, elle, ne peut pas être interdite au locataire (art. L.145-16 C. com.).",
      },
      {
        id: "mf7",
        question:
          "Un boulanger conteste les conditions d'un congé avec offre de renouvellement. Dans quel délai peut-il faire valoir ses droits en justice ?",
        options: [
          "Il n'a aucun droit au renouvellement et doit quitter les lieux à l'expiration du bail",
          "Il dispose d'un délai de 2 ans à compter de la date à laquelle le bail a pris fin pour saisir le tribunal",
          "Il dispose d'un délai de 6 mois après l'expiration du bail, puis le droit est périmé",
          "Il peut exiger un renouvellement automatique de 12 ans sans conditions",
        ],
        correctIndex: 1,
        explanation:
          "Les actions relatives au bail commercial se prescrivent par 2 ans (art. L.145-60 C. com.). Le locataire dispose donc de ce délai pour contester le congé ou faire fixer les conditions du bail renouvelé devant le juge.",
      },
      {
        id: "mf8",
        question:
          "Un tribunal accorde une indemnité d'éviction de 3 ans de loyer (loyer mensuel : 2 500 €). Le commerçant a réalisé 45 000 € de travaux il y a 4 ans (amortissement d'usage sur 10 ans). Quel raisonnement de calcul est correct ?",
        options: [
          "90 000 € (3 ans de loyer uniquement)",
          "135 000 € (3 ans de loyer + remboursement intégral des travaux)",
          "90 000 € (3 ans de loyer) + la part non amortie des travaux : 45 000 − (45 000 × 4/10) = 27 000 €",
          "90 000 € (3 ans de loyer) + remboursement intégral des travaux, sans tenir compte de l'amortissement",
        ],
        correctIndex: 2,
        explanation:
          "L'indemnité d'éviction (art. L.145-14 C. com.) compense le préjudice : indemnité principale (ici 3 ans de loyer = 90 000 €) plus indemnités accessoires, dont la part non amortie des travaux (27 000 € après 4 ans sur 10), frais de déménagement et perte de clientèle le cas échéant.",
      },
      {
        id: "mf9",
        question:
          "Un propriétaire veut donner congé à l'expiration de la première période triennale. Quelles formalités doit-il respecter ?",
        options: [
          "Un simple courrier recommandé envoyé au moins 1 mois avant l'échéance suffit",
          "Un acte d'huissier ou une lettre recommandée avec AR, motivé, notifié au moins 6 mois avant la fin de la période triennale",
          "Une décision du tribunal de commerce autorisant le congé",
          "Une information verbale au locataire suivie d'un courriel de confirmation",
        ],
        correctIndex: 1,
        explanation:
          "Le congé doit être donné par acte extrajudiciaire (huissier) ou LRAR, préciser ses motifs, et être notifié au moins 6 mois avant l'échéance (art. L.145-9 C. com.). Un congé irrégulier en la forme ou hors délai est sans effet.",
      },
      {
        id: "mf10",
        question:
          "Un avocat exerce dans un local loué à Paris, sans vente de marchandises. Quel type de bail régit en principe sa location ?",
        options: [
          "Un bail commercial car l'avocat est un commerçant inscrit au RCS",
          "Un bail professionnel, car les activités libérales ne constituent pas une activité commerciale au sens du Code de commerce",
          "Un bail commercial car tout local loué à usage professionnel est automatiquement un bail commercial",
          "Un bail mixte commercial et professionnel",
        ],
        correctIndex: 1,
        explanation:
          "L'activité libérale relève en principe du bail professionnel (durée minimale 6 ans, pas de droit au renouvellement automatique ni d'indemnité d'éviction). Les parties peuvent toutefois se soumettre volontairement au statut des baux commerciaux (art. L.145-2 C. com.).",
      },
      {
        id: "mf11",
        question:
          "Le bail ne prévoit rien sur les travaux d'amélioration. Le bailleur rénove la façade et remplace les fenêtres par des baies vitrées (120 000 €). Quelle est la répartition applicable ?",
        options: [
          "Le bailleur supporte la totalité car ils relèvent de son obligation de mise en conformité",
          "Le locataire supporte la totalité car il bénéficie de l'amélioration des locaux",
          "Le bailleur supporte les deux tiers et le locataire un tiers, proportionnellement à la durée du bail restant à courir",
          "Le bailleur supporte les travaux lourds (façade, structure) ; le locataire peut participer à hauteur du bénéfice qu'il en retire, selon la nature des travaux et les usages",
        ],
        correctIndex: 3,
        explanation:
          "Sans stipulation, le locataire supporte l'entretien courant et les réparations locatives, le bailleur les gros travaux (structure, façade — art. 606 C. civ.). Pour les améliorations, la répartition dépend de leur nature et du bénéfice retiré par chaque partie ; le juge apprécie au cas par cas.",
      },
      {
        id: "mf12",
        question:
          "Un investisseur achète des murs de boutique via une société soumise à l'IS. Quel est le régime fiscal des loyers et de la future plus-value ?",
        options: [
          "Loyers imposés à l'IR en revenus fonciers, plus-value immobilière des particuliers avec abattement pour durée de détention",
          "Loyers imposés au résultat de la société (IS à 25 %), bien amortissable, et plus-value professionnelle soumise à l'IS sans abattement pour durée de détention",
          "Les loyers sont exonérés d'impôt car il s'agit de murs de boutique",
          "Les loyers sont obligatoirement soumis à la TVA au taux de 20 %",
        ],
        correctIndex: 1,
        explanation:
          "En société à l'IS, les loyers entrent dans le résultat imposable (taux normal 25 %), le bâtiment est amortissable, et la plus-value de cession est calculée sur la valeur nette comptable et imposée à l'IS — sans abattement pour durée de détention, contrairement au régime des particuliers.",
      },
      {
        id: "mf13",
        question:
          "Un promoteur veut louer un local 2 ans pour une agence de vente temporaire. Quel bail est adapté et quelles sont ses caractéristiques ?",
        options: [
          "Un bail commercial classique de 9 ans avec congé à la 3e année",
          "Un bail dérogatoire (précaire) de courte durée : 3 ans maximum au total, sans droit au renouvellement ni indemnité d'éviction",
          "Un bail professionnel de 6 ans",
          "Un bail emphytéotique de 18 à 99 ans",
        ],
        correctIndex: 1,
        explanation:
          "Le bail dérogatoire (art. L.145-5 C. com.) permet d'échapper au statut pour une durée totale maximale de 3 ans : pas de droit au renouvellement ni d'indemnité d'éviction. Idéal pour une activité temporaire. Au-delà de 3 ans d'occupation, un bail commercial de 9 ans s'opère de plein droit.",
      },
      {
        id: "mf14",
        question:
          "Deux ans après réception, des fissures structurelles compromettent la sécurité d'un bâtiment commercial loué à un restaurateur. Qui peut invoquer la garantie décennale ?",
        options: [
          "Seul le propriétaire-investisseur peut agir contre l'entrepreneur dans les 10 ans suivant la réception",
          "Le propriétaire et les acquéreurs successifs peuvent agir contre les constructeurs (entrepreneur, architecte, bureau d'études) dans les 10 ans suivant la réception",
          "Seul le locataire commercial peut agir car il subit le préjudice directement",
          "La garantie décennale ne s'applique pas aux locaux commerciaux",
        ],
        correctIndex: 1,
        explanation:
          "La garantie décennale (art. 1792 C. civ.) couvre 10 ans les dommages compromettant la solidité de l'ouvrage ou le rendant impropre à sa destination ; elle bénéficie au maître d'ouvrage et aux propriétaires successifs, contre tous les constructeurs. Elle s'applique pleinement aux locaux commerciaux.",
      },
      {
        id: "mf15",
        question:
          "Un fleuriste cède son fonds de commerce alors que son bail arrive à échéance avec un congé portant offre de renouvellement. Que peut faire le repreneur ?",
        options: [
          "Rien : seul le cédant pouvait former la demande de renouvellement avant la cession",
          "Le repreneur, substitué dans les droits du cédant, peut faire valoir le droit au renouvellement dans le délai de 2 ans ; la cession du fonds doit par ailleurs respecter la publicité et l'opposition des créanciers",
          "Le repreneur doit verser au bailleur une prime obligatoire prévue par la loi pour obtenir le renouvellement",
          "Le bailleur peut refuser le renouvellement sans aucune justification ni indemnité",
        ],
        correctIndex: 1,
        explanation:
          "La cession du fonds emporte transmission du droit au renouvellement au cessionnaire (art. L.145-16 C. com.), qui dispose du délai de prescription de 2 ans (art. L.145-60). Le refus de renouvellement sans motif grave et légitime ouvre droit à l'indemnité d'éviction (art. L.145-14).",
      },
    ],
  },
  {
    moduleSlug: "renovation-energetique",
    title: "Examen — Rénovation énergétique & photovoltaïque",
    duration: 20,
    questions: [
      {
        id: "re1",
        question:
          "Depuis la loi ELAN puis la loi Climat & Résilience, quelle est la portée juridique du DPE ?",
        options: [
          "Il reste purement informatif : l'acquéreur ne peut rien en tirer",
          "Il est opposable : l'acquéreur ou le locataire peut se retourner contre le vendeur ou le bailleur en cas d'écart significatif",
          "Il n'engage que le diagnostiqueur, jamais le vendeur",
          "Il n'est obligatoire que pour les logements construits avant 1975",
        ],
        correctIndex: 1,
        explanation:
          "Depuis le 1er juillet 2021, le DPE est opposable : ses résultats engagent le vendeur ou le bailleur, et un écart significatif peut fonder un recours. Seules les recommandations de travaux restent indicatives.",
      },
      {
        id: "re2",
        question: "Sur quoi se base le calcul du DPE depuis la réforme de 2021 ?",
        options: [
          "Sur les factures d'énergie des trois dernières années des occupants",
          "Sur les caractéristiques physiques du bâti : isolation, menuiseries, chauffage, ventilation (méthode 3CL)",
          "Sur une simple déclaration du propriétaire",
          "Sur la moyenne des consommations du quartier",
        ],
        correctIndex: 1,
        explanation:
          "La méthode 3CL évalue le logement lui-même, indépendamment du comportement des occupants : deux logements identiques obtiennent la même étiquette. Les factures ne servent plus de base de calcul.",
      },
      {
        id: "re3",
        question:
          "Selon le calendrier de la loi Climat & Résilience, quand la location des logements classés F devient-elle interdite (indécence énergétique) ?",
        options: [
          "Depuis le 1er janvier 2025",
          "Au 1er janvier 2028",
          "Au 1er janvier 2034",
          "Jamais : seuls les G sont concernés",
        ],
        correctIndex: 1,
        explanation:
          "Le calendrier : classe G interdite depuis le 1er janvier 2025, classe F au 1er janvier 2028, classe E au 1er janvier 2034. Les loyers des F et G sont par ailleurs gelés depuis 2022.",
      },
      {
        id: "re4",
        question:
          "Quelle mention est obligatoire dans une annonce immobilière pour un logement classé F ou G ?",
        options: [
          "« Logement à consommation énergétique excessive »",
          "« Passoire thermique certifiée »",
          "« Travaux obligatoires avant la vente »",
          "Aucune mention particulière n'est exigée",
        ],
        correctIndex: 0,
        explanation:
          "Les annonces doivent afficher la classe énergie, la classe climat, l'estimation des dépenses annuelles d'énergie, et pour les F/G la mention « logement à consommation énergétique excessive ». L'annonce non conforme expose à une amende.",
      },
      {
        id: "re5",
        question:
          "Dans une maison ancienne non isolée, quel poste représente en général la plus grande part des déperditions de chaleur ?",
        options: [
          "Les fenêtres",
          "Le toit (25 à 30 % des déperditions)",
          "Le plancher bas",
          "La porte d'entrée",
        ],
        correctIndex: 1,
        explanation:
          "Le toit concentre 25 à 30 % des déperditions, devant les murs (20-25 %), les fenêtres (10-15 %) et les planchers bas (7-10 %). D'où la règle : commencer par isoler les combles — le geste le plus rentable.",
      },
      {
        id: "re6",
        question:
          "Un client fait isoler sa maison et changer toutes ses fenêtres, sans autre intervention. Quel risque majeur doit-on lui signaler ?",
        options: [
          "Aucun : l'isolation n'a que des avantages",
          "Sans ventilation adaptée (VMC), l'humidité ne s'évacue plus : condensation, moisissures et air intérieur dégradé",
          "La maison deviendra trop chaude en hiver",
          "Le DPE sera automatiquement dégradé",
        ],
        correctIndex: 1,
        explanation:
          "Qui isole doit ventiler : en rendant le logement étanche, on supprime les fuites d'air qui « ventilaient » par défaut. Sans VMC adaptée, l'humidité stagne — moisissures et désordres. Un devis d'isolation sans poste ventilation est un signal d'alerte.",
      },
      {
        id: "re7",
        question:
          "Pourquoi recommande-t-on d'isoler AVANT de remplacer le système de chauffage ?",
        options: [
          "Parce que c'est imposé par la loi",
          "Parce qu'une fois l'enveloppe traitée, les besoins chutent : l'équipement est dimensionné plus petit, coûte moins cher et fonctionne mieux",
          "Parce que les aides n'existent que pour l'isolation",
          "Parce que les pompes à chaleur ne fonctionnent pas dans les maisons anciennes",
        ],
        correctIndex: 1,
        explanation:
          "Installer une pompe à chaleur dans une maison qui fuit conduit à un équipement surdimensionné, énergivore et inconfortable. L'ordre des travaux : enveloppe (toit, murs, planchers, fenêtres), ventilation, puis chauffage dimensionné sur les besoins réels.",
      },
      {
        id: "re8",
        question: "Qu'est-ce qui caractérise une « rénovation d'ampleur » au sens des aides ?",
        options: [
          "N'importe quel chantier de plus de 10 000 €",
          "Un bouquet de travaux cohérent (dont gestes d'isolation) permettant un saut d'au moins deux classes de DPE, avec accompagnement obligatoire",
          "Le remplacement d'une chaudière par une pompe à chaleur",
          "Une rénovation faite en moins de six mois",
        ],
        correctIndex: 1,
        explanation:
          "La rénovation d'ampleur combine plusieurs gestes coordonnés et vise au moins deux classes de DPE gagnées, validées par audit. C'est le parcours le mieux subventionné, avec Mon Accompagnateur Rénov' obligatoire.",
      },
      {
        id: "re9",
        question: "Comment le montant de MaPrimeRénov' est-il modulé ?",
        options: [
          "Selon l'âge du demandeur",
          "Selon les revenus du ménage : quatre profils, du plus modeste (aide maximale) au plus aisé",
          "Selon la région uniquement",
          "Il est identique pour tous les ménages",
        ],
        correctIndex: 1,
        explanation:
          "MaPrimeRénov' repose sur quatre profils de revenus (historiquement bleu, jaune, violet, rose) : plus les revenus sont modestes, plus le taux d'aide est élevé. Les barèmes évoluent chaque année — seule la simulation officielle sur france-renov.gouv.fr fait foi.",
      },
      {
        id: "re10",
        question:
          "Quelle condition est indispensable pour que des travaux ouvrent droit à MaPrimeRénov', aux CEE et à l'éco-PTZ ?",
        options: [
          "Que le logement soit vide pendant les travaux",
          "Que les travaux soient réalisés par une entreprise qualifiée RGE (Reconnu Garant de l'Environnement)",
          "Que le propriétaire ait plus de 10 ans d'ancienneté dans le logement",
          "Que le chantier dure moins de trois mois",
        ],
        correctIndex: 1,
        explanation:
          "Sans entreprise RGE, pas d'aides : c'est la condition transversale du système. La qualification se vérifie sur l'annuaire officiel de France Rénov', pour le bon domaine de travaux et à la date du devis.",
      },
      {
        id: "re11",
        question:
          "Un client reçoit un appel : « Bonjour, nous sommes mandatés par l'État pour vos aides à la rénovation à 1 € ». Que doit-il savoir ?",
        options: [
          "C'est une offre légitime s'il rappelle rapidement",
          "Le démarchage téléphonique en rénovation énergétique est interdit par la loi depuis 2020 : cet appel est illégal par définition",
          "Il doit donner son numéro fiscal pour vérifier son éligibilité",
          "Les offres à 1 € sont garanties par l'ANAH",
        ],
        correctIndex: 1,
        explanation:
          "La loi du 24 juillet 2020 interdit le démarchage téléphonique en rénovation énergétique. Personne n'est « mandaté par l'État » à domicile, les conseillers France Rénov' ne démarchent jamais, et les offres « à 1 € » ont été le terreau des grandes fraudes aux CEE.",
      },
      {
        id: "re12",
        question:
          "Un couple aux revenus intermédiaires engage 50 000 € de travaux d'ampleur (saut E→C). Comment se structure typiquement son plan de financement ?",
        options: [
          "Aucune aide : les revenus intermédiaires sont exclus",
          "MaPrimeRénov' d'ampleur (CEE intégrés) pour une part significative, TVA 5,5 % sur les devis, aides locales éventuelles, et le reste à charge via un éco-PTZ sans intérêts",
          "Uniquement un crédit à la consommation classique",
          "L'État avance 100 % puis se rembourse à la revente",
        ],
        correctIndex: 1,
        explanation:
          "Le montage type : subvention MaPrimeRénov' d'ampleur selon les revenus (ordre de grandeur 30 à 90 % d'un plafond de travaux), TVA réduite directement facturée, aides locales, et éco-PTZ jusqu'à 50 000 € pour le reste à charge. Les économies d'énergie compensent souvent la mensualité.",
      },
      {
        id: "re13",
        question:
          "Une installation photovoltaïque de 6 kWc à Aix-en-Provence, sans batterie, avec un bon pilotage des usages : quel ordre de grandeur de rentabilité annoncer honnêtement ?",
        options: [
          "Retour sur investissement en 2 à 3 ans, autonomie totale",
          "Temps de retour d'environ 8 à 12 ans, pour un matériel garanti 25 ans et plus",
          "Aucune rentabilité : le photovoltaïque est déficitaire en France",
          "Rentabilité uniquement si l'on revend la maison dans l'année",
        ],
        correctIndex: 1,
        explanation:
          "Avec ~10-15 k€ posés (ordre de grandeur début 2026) et 1 000 à 1 500 € de recettes annuelles (économies + vente du surplus) dans le sud, le retour se situe entre 8 et 12 ans. Toute promesse de retour en 2-3 ans ou d'« autonomie totale » sans batterie est un signal d'arnaque.",
      },
      {
        id: "re14",
        question:
          "Sans batterie, quelle part de sa production photovoltaïque un foyer autoconsomme-t-il typiquement ?",
        options: [
          "100 % : tout est consommé sur place",
          "30 à 50 % — le reste est injecté au réseau et vendu dans le cadre de l'obligation d'achat (contrat 20 ans)",
          "Moins de 5 %",
          "80 à 90 % dans tous les cas",
        ],
        correctIndex: 1,
        explanation:
          "L'autoconsommation spontanée se situe entre 30 et 50 % : la production a lieu en journée, la consommation plutôt le soir. Le pilotage des usages (chauffe-eau en journée, recharge du véhicule) augmente ce taux — et c'est lui qui fait la rentabilité réelle.",
      },
      {
        id: "re15",
        question:
          "Vous vendez une maison équipée de panneaux photovoltaïques. Quelles vérifications s'imposent ?",
        options: [
          "Aucune : les panneaux suivent la maison automatiquement et sans risque",
          "Statut de l'installation (propriété, crédit, location de toiture), contrat d'obligation d'achat transférable par avenant, conformité (Consuel, déclaration préalable, décennale) et impact DPE/valeur",
          "Il faut obligatoirement démonter les panneaux avant la vente",
          "Seule la facture d'électricité du vendeur est à vérifier",
        ],
        correctIndex: 1,
        explanation:
          "Quatre vérifications : qui possède l'installation (un crédit affecté doit être soldé ou repris, un bail de toiture s'impose à l'acquéreur) ; le contrat d'obligation d'achat, actif transférable par avenant ; la conformité administrative et les garanties ; et la valorisation (production documentée, impact DPE). Bien documentée, l'installation est un argument de vente.",
      },
    ],
  },
  {
    moduleSlug: "immobilier-ia",
    title: "Examen — Immobilier & intelligence artificielle",
    duration: 20,
    questions: [
      {
        id: "ia1",
        question:
          "Un agent demande à ChatGPT le prix moyen au m² d'un quartier et obtient un chiffre précis et convaincant. Quel réflexe professionnel s'impose ?",
        options: [
          "Le publier tel quel : les IA sont connectées aux données notariales",
          "Vérifier le chiffre à la source : une IA générative peut « halluciner » des données plausibles mais fausses",
          "Le majorer de 10 % par prudence",
          "Demander le même chiffre à une autre IA pour le confirmer",
        ],
        correctIndex: 1,
        explanation:
          "Un modèle de langage prédit du texte plausible : il peut inventer des chiffres avec aplomb (« hallucination »). Les données chiffrées se vérifient toujours à la source (DVF, notaires, bases professionnelles). Croiser deux IA ne constitue pas une vérification.",
      },
      {
        id: "ia2",
        question: "Qu'est-ce qu'une IA générative comme ChatGPT, Claude ou Gemini, fondamentalement ?",
        options: [
          "Une base de données immobilière connectée en temps réel",
          "Un modèle de langage entraîné à prédire la suite la plus probable d'un texte",
          "Un moteur de recherche amélioré qui cite toujours ses sources",
          "Un logiciel expert programmé règle par règle par des juristes",
        ],
        correctIndex: 1,
        explanation:
          "Une IA générative est un modèle de langage : elle a appris, sur d'immenses corpus de textes, à générer la suite la plus plausible d'un texte. C'est ce qui explique à la fois son excellence rédactionnelle et ses erreurs factuelles.",
      },
      {
        id: "ia3",
        question: "Quelle est la « règle d'or » de l'usage professionnel de l'IA présentée dans cette formation ?",
        options: [
          "L'IA décide, le professionnel exécute",
          "L'IA propose, le professionnel dispose : vérifier les faits, relire chaque texte, protéger les données",
          "Ne jamais utiliser l'IA pour des documents clients",
          "Utiliser au moins trois IA différentes pour chaque tâche",
        ],
        correctIndex: 1,
        explanation:
          "L'IA produit des propositions ; le professionnel garde la décision et la responsabilité. Les trois garde-fous : vérifier tout fait ou chiffre, relire tout texte avant envoi, ne jamais exposer de données personnelles de clients.",
      },
      {
        id: "ia4",
        question: "Parmi ces tâches, laquelle l'IA générative fait-elle le MIEUX aujourd'hui ?",
        options: [
          "Estimer précisément un bien atypique sans visite",
          "Rédiger, résumer, reformuler et traduire des textes",
          "Négocier un prix avec un acquéreur",
          "Détecter des fissures structurelles sur photos",
        ],
        correctIndex: 1,
        explanation:
          "La langue est le terrain naturel des modèles de langage : rédaction, synthèse, reformulation, traduction. L'estimation fiable exige la visite et le terrain ; la négociation et le conseil restent des compétences humaines.",
      },
      {
        id: "ia5",
        question:
          "Que signifient les quatre lettres de la méthode de prompt CRTE enseignée dans cette formation ?",
        options: [
          "Créativité, Rapidité, Technologie, Efficacité",
          "Contexte, Rôle, Tâche, Exemple",
          "Client, Résultat, Ton, Envoi",
          "Consigne, Relecture, Test, Évaluation",
        ],
        correctIndex: 1,
        explanation:
          "Un prompt efficace donne le Contexte (les faits que l'IA ne peut pas deviner), un Rôle (qui elle doit être), une Tâche précise (format, longueur, structure) et un Exemple de votre ton. Puis on itère sur la proposition.",
      },
      {
        id: "ia6",
        question:
          "Pourquoi joindre une de VOS meilleures annonces à un prompt de rédaction ?",
        options: [
          "Pour prouver à l'IA que vous savez écrire",
          "Parce que l'IA imite très bien un style qu'on lui montre : le texte produit garde VOTRE ton",
          "Pour que l'IA la republie telle quelle",
          "C'est inutile : toutes les IA écrivent pareil",
        ],
        correctIndex: 1,
        explanation:
          "L'exemple est le levier le plus puissant du prompt : le modèle calque le ton, la structure et le niveau de langue du texte fourni. C'est la parade principale contre la « bouillie IA » standardisée.",
      },
      {
        id: "ia7",
        question:
          "Quelle instruction réduit le plus le risque qu'une IA invente des informations dans une réponse à un prospect ?",
        options: [
          "« Sois créatif et convaincant »",
          "« Si une information manque, écris [À COMPLÉTER] au lieu de deviner »",
          "« Réponds le plus vite possible »",
          "« Utilise beaucoup de superlatifs »",
        ],
        correctIndex: 1,
        explanation:
          "Autoriser explicitement l'IA à signaler ce qu'elle ne sait pas — plutôt que de combler les trous — élimine une grande partie des inventions. Le professionnel complète ensuite les blancs avec les vraies informations.",
      },
      {
        id: "ia8",
        question:
          "Un vendeur arrive avec l'estimation d'un site en ligne, supérieure de 15 % à votre avis de valeur. Quelle est la meilleure réponse professionnelle ?",
        options: [
          "S'aligner sur le chiffre du site pour prendre le mandat",
          "Expliquer ce que l'algorithme ne peut pas savoir de SON bien (état, lumière, vis-à-vis, travaux) et étayer votre avis avec de vraies références de ventes",
          "Dénigrer les outils en ligne comme des gadgets",
          "Couper la poire en deux entre les deux chiffres",
        ],
        correctIndex: 1,
        explanation:
          "L'estimation automatisée croise des données passées mais n'a jamais visité. Montrer précisément ses angles morts sur ce bien, références réelles à l'appui, est la meilleure démonstration de la valeur ajoutée de l'agent — sans dénigrer l'outil que le client a utilisé.",
      },
      {
        id: "ia9",
        question:
          "Pour analyser un PV d'assemblée générale de 40 pages avec l'IA, quelle exigence rend l'analyse professionnellement fiable ?",
        options: [
          "Demander un résumé « le plus court possible »",
          "Exiger, pour chaque point relevé, la citation du passage exact et de la page — puis vérifier dans le document",
          "Faire analyser le document par deux IA et comparer",
          "Se contenter des 10 premières pages, l'essentiel y figure toujours",
        ],
        correctIndex: 1,
        explanation:
          "La citation source transforme l'IA de « boîte noire » en index intelligent : chaque alerte (travaux votés, contentieux, impayés) se vérifie en trente secondes dans le document. Jamais de confiance aveugle au résumé seul.",
      },
      {
        id: "ia10",
        question:
          "Un agent veut coller le dossier complet d'un candidat locataire (bulletins de salaire, pièce d'identité) dans un chatbot gratuit « pour vérifier la solvabilité ». Qu'en dites-vous ?",
        options: [
          "Bonne idée : c'est rapide et gratuit",
          "Double faute : transmission de données personnelles sensibles à un outil non maîtrisé (RGPD) ET délégation d'une évaluation de personne à l'IA",
          "Acceptable si le candidat n'est pas informé",
          "Acceptable si l'agent supprime la conversation après",
        ],
        correctIndex: 1,
        explanation:
          "Les documents sensibles (identité, revenus) ne transitent jamais par un outil grand public : c'est un traitement de données non conforme au RGPD. Et l'évaluation de candidats ne se délègue pas à une IA — risque discriminatoire en prime.",
      },
      {
        id: "ia11",
        question: "Quel réflexe RGPD s'applique AVANT de coller un texte concernant un client dans une IA ?",
        options: [
          "Vérifier que le client est bien solvable",
          "Anonymiser : retirer noms, coordonnées et données sensibles — l'IA n'en a pas besoin pour analyser",
          "Mettre le texte en majuscules",
          "Attendre 48h après la signature du mandat",
        ],
        correctIndex: 1,
        explanation:
          "L'anonymisation par défaut (« Monsieur D., cadre, revenus X ») permet presque tous les usages sans exposer de données personnelles. S'y ajoutent : désactiver l'entraînement sur vos conversations et préférer les offres professionnelles pour un usage d'équipe.",
      },
      {
        id: "ia12",
        question: "Selon l'AI Act européen, que doit savoir un client qui dialogue avec le chatbot de votre site ?",
        options: [
          "Le prénom de son conseiller virtuel",
          "Qu'il converse avec une machine et non un humain — la transparence est obligatoire",
          "Rien : le chatbot peut se présenter comme un conseiller humain",
          "Le modèle d'IA exact utilisé et son numéro de version",
        ],
        correctIndex: 1,
        explanation:
          "L'AI Act impose la transparence : l'utilisateur doit savoir qu'il interagit avec une IA. Un chatbot qui se fait passer pour « Julie, votre conseillère » humaine contrevient à cette exigence. Côté agence, l'autre vigilance concerne les outils de scoring de personnes.",
      },
      {
        id: "ia13",
        question:
          "Vous demandez à une IA de « classer 10 dossiers locataires du plus solide au plus fragile ». Quel est le risque juridique principal ?",
        options: [
          "Aucun : le classement algorithmique est neutre par nature",
          "Une discrimination involontaire : si le modèle pondère patronyme, lieu de résidence ou âge, le tri viole les 25 critères prohibés — et la responsabilité reste la vôtre",
          "Une violation du droit d'auteur des candidats",
          "Un problème uniquement si le classement est publié",
        ],
        correctIndex: 1,
        explanation:
          "L'IA peut intégrer des critères prohibés de manière invisible : « c'est l'algorithme » n'est pas une défense — la décision de tri est celle du professionnel. La sélection de candidats ne se délègue pas ; en support, seuls des critères objectifs et légaux (taux d'effort, complétude) sont admissibles.",
      },
      {
        id: "ia14",
        question: "En matière de photos d'annonces, où passe la ligne entre l'autorisé et l'interdit ?",
        options: [
          "Tout est permis tant que le bien se vend",
          "Home staging virtuel signalé (« photo aménagée virtuellement ») : autorisé ; modifier la réalité du bien (effacer un poteau, agrandir une pièce, inventer une vue) : pratique trompeuse interdite",
          "Toute retouche, même la luminosité, est interdite",
          "Les images générées par IA sont interdites dans l'immobilier",
        ],
        correctIndex: 1,
        explanation:
          "Le critère est la loyauté : aider l'acquéreur à se projeter (meublage virtuel signalé) est légitime ; le tromper sur les caractéristiques réelles du bien relève des pratiques commerciales trompeuses (Code de la consommation) et détruit la confiance en visite.",
      },
      {
        id: "ia15",
        question:
          "Une annonce générée par IA contient une erreur qui induit un acquéreur en erreur. Qui est juridiquement responsable ?",
        options: [
          "L'éditeur de l'outil d'IA",
          "Le professionnel qui a publié l'annonce : l'outil n'est jamais responsable à sa place",
          "Personne : l'erreur d'une machine est un cas de force majeure",
          "L'acquéreur, qui aurait dû vérifier",
        ],
        correctIndex: 1,
        explanation:
          "La responsabilité de ce qui est publié incombe au professionnel — c'est la traduction juridique de la règle d'or. D'où la relecture humaine obligatoire avant toute publication, inscrite dans la charte IA d'agence (8 points).",
      },
    ],
  },
];

export const FINAL_EXAM_ID = "certification-finale";

export function getModuleExam(moduleSlug: string): ModuleExam | undefined {
  if (moduleSlug === FINAL_EXAM_ID) {
    return getFinalExam();
  }
  return MODULE_EXAMS.find((e) => e.moduleSlug === moduleSlug);
}

export function getFinalExam(): ModuleExam {
  // Take 6 random questions from each module to make a 30-question final exam
  const allFinalQuestions: ExamQuestion[] = [];
  
  MODULE_EXAMS.forEach(module => {
    const shuffled = [...module.questions].sort(() => 0.5 - Math.random());
    allFinalQuestions.push(...shuffled.slice(0, 6));
  });

  return {
    moduleSlug: FINAL_EXAM_ID,
    title: "Certification Professionnelle — Agent Immobilier (42h)",
    duration: 45, // 45 minutes for 30 questions
    questions: allFinalQuestions.sort(() => 0.5 - Math.random()), // Shuffle final set
  };
}
