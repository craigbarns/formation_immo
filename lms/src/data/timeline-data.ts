/**
 * Timelines interactives — parcours etape par etape des processus immobiliers.
 * Chaque timeline est liee a un module/lecon et decrit un processus chronologique.
 */

export type TimelineStep = {
  id: string;
  title: string;
  duration: string;
  description: string;
  keyDocuments?: string[];
  tips?: string[];
  icon: string;
};

export type InteractiveTimeline = {
  id: string;
  moduleSlug: string;
  lessonSlug: string;
  title: string;
  description: string;
  steps: TimelineStep[];
};

const TIMELINES: InteractiveTimeline[] = [
  // ─── 1. juridique / compromis ─────────────────────────────────────
  {
    id: "tl-jur-comp",
    moduleSlug: "juridique",
    lessonSlug: "compromis",
    title: "Du compromis a l'acte authentique",
    description:
      "Les etapes cles entre la signature du compromis et la remise des cles chez le notaire.",
    steps: [
      {
        id: "jc-s1",
        title: "Signature du compromis de vente",
        duration: "Jour J",
        description:
          "Les parties signent le compromis chez le notaire ou en agence. Le dossier de diagnostics est annexe. L'acquereur verse le depot de garantie (5 a 10 % du prix).",
        keyDocuments: [
          "Compromis de vente",
          "Dossier de diagnostics techniques",
          "Justificatifs d'identite",
        ],
        tips: [
          "Verifiez que toutes les conditions suspensives sont clairement redigees avant la signature.",
        ],
        icon: "✍️",
      },
      {
        id: "jc-s2",
        title: "Delai de retractation (loi SRU)",
        duration: "10 jours",
        description:
          "L'acquereur beneficie d'un delai de 10 jours calendaires pour se retracter sans motif ni penalite. Le delai court a partir du lendemain de la notification.",
        tips: [
          "La retractation doit etre envoyee par lettre recommandee avec accuse de reception.",
          "Aucun versement ne peut etre exige pendant ce delai de 10 jours.",
        ],
        icon: "⏳",
      },
      {
        id: "jc-s3",
        title: "Depot du dossier de financement",
        duration: "1-2 semaines",
        description:
          "L'acquereur depose sa demande de pret aupres d'une ou plusieurs banques. Il fournit l'ensemble des pieces justificatives necessaires.",
        keyDocuments: [
          "Bulletins de salaire",
          "Avis d'imposition",
          "Releves bancaires",
          "Compromis signe",
        ],
        tips: [
          "Deposez le dossier dans plusieurs banques simultanement pour mettre en concurrence.",
        ],
        icon: "🏦",
      },
      {
        id: "jc-s4",
        title: "Obtention de l'accord de pret",
        duration: "3-6 semaines",
        description:
          "La banque etudie le dossier, realise l'expertise du bien et delivre un accord de principe puis l'offre de pret officielle.",
        keyDocuments: [
          "Accord de principe",
          "Offre de pret bancaire",
        ],
        tips: [
          "Le delai de la condition suspensive de pret est generalement de 45 a 60 jours. Surveillez-le.",
        ],
        icon: "✅",
      },
      {
        id: "jc-s5",
        title: "Delai de reflexion de l'offre de pret",
        duration: "10 jours minimum",
        description:
          "A reception de l'offre de pret, l'emprunteur dispose d'un delai de reflexion obligatoire de 10 jours. Il ne peut accepter qu'a partir du 11e jour.",
        tips: [
          "Profitez de ce delai pour relire attentivement toutes les clauses et l'assurance emprunteur.",
        ],
        icon: "📖",
      },
      {
        id: "jc-s6",
        title: "Purge des conditions suspensives",
        duration: "1-2 semaines",
        description:
          "Le notaire verifie que toutes les conditions suspensives sont levees : pret obtenu, absence de preemption, servitudes verifiees.",
        keyDocuments: [
          "Attestation de pret",
          "Purge du droit de preemption urbain",
          "Etat hypothecaire",
        ],
        icon: "🔓",
      },
      {
        id: "jc-s7",
        title: "Preparation de l'acte authentique par le notaire",
        duration: "2-3 semaines",
        description:
          "Le notaire redige l'acte de vente definitif, effectue les derniers controles et convoque les parties pour la signature.",
        keyDocuments: [
          "Projet d'acte authentique",
          "Decompte financier",
        ],
        tips: [
          "Demandez a recevoir le projet d'acte au moins 5 jours avant la signature pour le relire.",
        ],
        icon: "📜",
      },
      {
        id: "jc-s8",
        title: "Signature de l'acte authentique et remise des cles",
        duration: "Jour J (3-4 mois apres compromis)",
        description:
          "Les parties signent l'acte chez le notaire. Les fonds sont transferes au vendeur. L'acquereur recoit les cles et devient officiellement proprietaire.",
        keyDocuments: [
          "Acte authentique de vente",
          "Attestation de propriete",
          "Cles du bien",
        ],
        tips: [
          "Effectuez un dernier etat des lieux du bien la veille ou le matin de la signature.",
        ],
        icon: "🔑",
      },
    ],
  },

  // ─── 1b. juridique / mandats — vue globale mandat → acte ──────────
  {
    id: "tl-jur-mand",
    moduleSlug: "juridique",
    lessonSlug: "mandats",
    title: "Du mandat à l'acte authentique",
    description:
      "Chronologie type d'une vente avec mandat d'agence : ce que vous pilotez côté transaction jusqu'à la signature définitive.",
    steps: [
      {
        id: "jm-s1",
        title: "Signature du mandat de vente",
        duration: "Jour J",
        description:
          "Le mandat (simple, semi-exclusif ou exclusif) encadre la mission, les honoraires et la durée. Le dossier de vente et les diagnostics sont lancés.",
        keyDocuments: ["Mandat signé", "Fiche client / mandant"],
        tips: [
          "Vérifiez l'identité du mandant, le titre de propriété et l'exactitude des surfaces avant toute diffusion.",
        ],
        icon: "📋",
      },
      {
        id: "jm-s2",
        title: "Mise en marché & diffusion",
        duration: "1-2 semaines",
        description:
          "Shooting, annonce multicanal, vitrine, relances acheteurs. Vous assurez la conformité ALUR et la transparence des honoraires.",
        tips: [
          "Un repositionnement prix peut être nécessaire selon le retour du marché et les retours de visites.",
        ],
        icon: "📣",
      },
      {
        id: "jm-s3",
        title: "Visites et négociation",
        duration: "Variable",
        description:
          "Organisation des visites, collecte des offres, négociation entre vendeur et acquéreur jusqu'à accord sur le prix et les conditions.",
        icon: "🤝",
      },
      {
        id: "jm-s4",
        title: "Offre acceptée & compromis de vente",
        duration: "1-3 semaines",
        description:
          "Rédaction ou validation du compromis, séquestre, conditions suspensives (prêt, DIA, etc.) et délai de rétractation de l'acquéreur.",
        keyDocuments: ["Compromis", "Attestation de financement"],
        icon: "✍️",
      },
      {
        id: "jm-s5",
        title: "Instruction du financement & levée des conditions",
        duration: "2-3 mois",
        description:
          "Suivi du dossier de prêt, transmission des pièces au notaire, levée des conditions suspensives dans les délais.",
        tips: [
          "Gardez vendeur et acquéreur informés sur les jalons (accord de principe, offre de prêt signée).",
        ],
        icon: "🏦",
      },
      {
        id: "jm-s6",
        title: "Acte authentique & remise des clés",
        duration: "Jour J",
        description:
          "Signature chez le notaire, paiement des fonds et frais, publication de l'acte. Remise des clés et fin de mission de transaction.",
        keyDocuments: ["Acte authentique", "Attestation de propriété"],
        icon: "🔑",
      },
    ],
  },

  // ─── 2. transaction / estimation ──────────────────────────────────
  {
    id: "tl-tra-est",
    moduleSlug: "transaction",
    lessonSlug: "estimation",
    title: "Parcours d'une vente immobiliere",
    description:
      "Du premier contact avec le vendeur jusqu'a la remise des cles a l'acquereur.",
    steps: [
      {
        id: "te-s1",
        title: "Premier contact et prise de rendez-vous",
        duration: "Jour J",
        description:
          "Le proprietaire contacte l'agence ou est identifie lors de la prospection. Un rendez-vous d'estimation est fixe.",
        tips: [
          "Qualifiez le projet du vendeur des le premier appel : motivation, delai souhaite, prix espere.",
        ],
        icon: "📞",
      },
      {
        id: "te-s2",
        title: "Visite d'estimation du bien",
        duration: "1-3 jours",
        description:
          "L'agent visite le bien, releve les caracteristiques techniques, evalue l'etat general et photographie les lieux.",
        keyDocuments: [
          "Fiche de releve terrain",
          "Photos du bien",
        ],
        tips: [
          "Prenez le temps de visiter le quartier et notez les atouts et faiblesses de l'environnement.",
        ],
        icon: "🏠",
      },
      {
        id: "te-s3",
        title: "Analyse comparative et avis de valeur",
        duration: "2-5 jours",
        description:
          "Analyse des ventes comparables, etude du marche local et redaction d'un avis de valeur argumente.",
        keyDocuments: [
          "Avis de valeur",
          "Comparatifs de ventes",
          "Donnees DVF",
        ],
        icon: "📊",
      },
      {
        id: "te-s4",
        title: "Signature du mandat de vente",
        duration: "1 semaine",
        description:
          "Presentation de l'estimation au proprietaire et signature du mandat de vente (simple, semi-exclusif ou exclusif).",
        keyDocuments: [
          "Mandat de vente",
          "Pieces d'identite du vendeur",
        ],
        tips: [
          "Privilegiez le mandat exclusif : il vous permet d'investir pleinement dans la commercialisation.",
        ],
        icon: "📋",
      },
      {
        id: "te-s5",
        title: "Mise en vente et diffusion",
        duration: "1-2 semaines",
        description:
          "Realisation du shooting photo, redaction de l'annonce, diffusion sur les portails immobiliers et activation du reseau.",
        keyDocuments: [
          "Photos professionnelles",
          "Annonce redigee",
          "Plan du bien",
        ],
        tips: [
          "Publiez l'annonce en milieu de semaine. Le mardi et mercredi generent le plus de contacts.",
        ],
        icon: "📢",
      },
      {
        id: "te-s6",
        title: "Organisation des visites",
        duration: "2-6 semaines",
        description:
          "Gestion des demandes de visite, qualification des acquereurs potentiels et organisation du planning de visites.",
        tips: [
          "Faites un compte-rendu de visite au vendeur apres chaque visite pour maintenir la confiance.",
        ],
        icon: "🚪",
      },
      {
        id: "te-s7",
        title: "Reception et negociation des offres",
        duration: "1-2 semaines",
        description:
          "Reception des offres d'achat, negociation entre les parties et acceptation de l'offre finale.",
        keyDocuments: [
          "Offre d'achat ecrite",
          "Attestation de financement",
        ],
        tips: [
          "Une offre accompagnee d'une attestation de financement a beaucoup plus de poids.",
        ],
        icon: "🤝",
      },
      {
        id: "te-s8",
        title: "Constitution du dossier et compromis",
        duration: "2-3 semaines",
        description:
          "Rassemblement de toutes les pieces du dossier et signature du compromis de vente.",
        keyDocuments: [
          "Compromis de vente",
          "Diagnostics techniques",
          "Documents de copropriete",
        ],
        icon: "✍️",
      },
      {
        id: "te-s9",
        title: "Suivi du financement et des conditions suspensives",
        duration: "6-10 semaines",
        description:
          "Accompagnement de l'acquereur dans l'obtention de son pret et suivi de la levee des conditions suspensives.",
        tips: [
          "Relancez l'acquereur regulierement pour eviter les mauvaises surprises de derniere minute.",
        ],
        icon: "⏰",
      },
      {
        id: "te-s10",
        title: "Acte authentique et remise des cles",
        duration: "Jour J (3-4 mois apres mandat)",
        description:
          "Signature de l'acte definitif chez le notaire. Le vendeur recoit le prix de vente et l'acquereur les cles de son nouveau bien.",
        keyDocuments: [
          "Acte authentique",
          "Cles du bien",
        ],
        tips: [
          "Accompagnez vos clients chez le notaire. Ce moment est crucial pour la fidelisation.",
        ],
        icon: "🔑",
      },
    ],
  },

  // ─── 3. financement / credit ──────────────────────────────────────
  {
    id: "tl-fin-cre",
    moduleSlug: "financement",
    lessonSlug: "credit",
    title: "Parcours du credit immobilier",
    description:
      "De la premiere simulation bancaire jusqu'au deblocage des fonds.",
    steps: [
      {
        id: "fc-s1",
        title: "Simulation et etude de faisabilite",
        duration: "1-3 jours",
        description:
          "L'emprunteur realise des simulations en ligne ou en agence pour evaluer sa capacite d'emprunt, le montant des mensualites et la duree optimale.",
        tips: [
          "Le taux d'endettement ne doit pas depasser 35 % des revenus nets mensuels.",
          "Incluez les frais de notaire et de garantie dans le plan de financement.",
        ],
        icon: "🔢",
      },
      {
        id: "fc-s2",
        title: "Constitution du dossier de pret",
        duration: "1-2 semaines",
        description:
          "Rassemblement de toutes les pieces justificatives : identite, revenus, charges, epargne et descriptif du projet immobilier.",
        keyDocuments: [
          "Pieces d'identite",
          "3 derniers bulletins de salaire",
          "2 derniers avis d'imposition",
          "Releves bancaires 3 mois",
          "Compromis de vente",
        ],
        tips: [
          "Un dossier complet et bien organise accelere considerablement le delai de traitement.",
        ],
        icon: "📁",
      },
      {
        id: "fc-s3",
        title: "Depot dans plusieurs banques",
        duration: "1 semaine",
        description:
          "Le dossier est depose simultanement dans 3 a 5 banques pour mettre en concurrence les offres. Un courtier peut effectuer cette demarche.",
        tips: [
          "Ne signez aucun document d'exclusivite avec une banque a ce stade.",
        ],
        icon: "🏦",
      },
      {
        id: "fc-s4",
        title: "Accord de principe de la banque",
        duration: "1-3 semaines",
        description:
          "La banque etudie le dossier et delivre un accord de principe sous reserve de l'expertise du bien et de la validation finale par le comite de credit.",
        keyDocuments: [
          "Accord de principe ecrit",
        ],
        tips: [
          "L'accord de principe n'est pas un engagement definitif. Attendez l'offre de pret officielle.",
        ],
        icon: "👍",
      },
      {
        id: "fc-s5",
        title: "Expertise du bien par la banque",
        duration: "1-2 semaines",
        description:
          "La banque mandate un expert pour evaluer la valeur du bien et s'assurer de la coherence avec le prix d'achat.",
        tips: [
          "Si l'expertise est inferieure au prix, la banque peut reduire le montant du pret.",
        ],
        icon: "🔎",
      },
      {
        id: "fc-s6",
        title: "Edition de l'offre de pret officielle",
        duration: "1-2 semaines",
        description:
          "La banque edite l'offre de pret detaillant le montant, le taux, la duree, les mensualites et les conditions de l'assurance emprunteur.",
        keyDocuments: [
          "Offre de pret bancaire",
          "Tableau d'amortissement previsionnel",
          "Contrat d'assurance emprunteur",
        ],
        icon: "📄",
      },
      {
        id: "fc-s7",
        title: "Delai de reflexion obligatoire",
        duration: "10 jours minimum",
        description:
          "L'emprunteur dispose d'un delai de reflexion obligatoire de 10 jours calendaires. Il ne peut accepter l'offre qu'a compter du 11e jour.",
        tips: [
          "Comparez l'assurance emprunteur proposee avec des offres alternatives (delegation d'assurance).",
          "Verifiez les conditions de remboursement anticipe et les penalites eventuelles.",
        ],
        icon: "📖",
      },
      {
        id: "fc-s8",
        title: "Acceptation et deblocage des fonds",
        duration: "1-2 semaines",
        description:
          "L'emprunteur retourne l'offre de pret signee. La banque debloque les fonds aupres du notaire pour la signature de l'acte authentique.",
        keyDocuments: [
          "Offre de pret signee",
          "Appel de fonds du notaire",
        ],
        tips: [
          "Les fonds sont vires directement chez le notaire, jamais sur le compte de l'acquereur.",
        ],
        icon: "💸",
      },
    ],
  },

  // ─── 4. terrain / promesse ────────────────────────────────────────
  {
    id: "tl-ter-pro",
    moduleSlug: "terrain",
    lessonSlug: "promesse",
    title: "De l'offre a la remise des cles",
    description:
      "Les etapes commerciales et juridiques entre l'offre d'achat et la finalisation de la vente.",
    steps: [
      {
        id: "tp-s1",
        title: "Redaction et presentation de l'offre d'achat",
        duration: "1-3 jours",
        description:
          "L'acquereur redige une offre ecrite precisant le prix propose, les conditions de financement et le delai de validite de l'offre.",
        keyDocuments: [
          "Offre d'achat ecrite",
          "Attestation de financement ou de fonds",
        ],
        tips: [
          "Une offre au prix ne peut pas etre refusee si elle est conforme aux conditions du mandat.",
        ],
        icon: "💌",
      },
      {
        id: "tp-s2",
        title: "Negociation et acceptation de l'offre",
        duration: "1-7 jours",
        description:
          "Discussion entre les parties sur le prix et les conditions. Le vendeur accepte, refuse ou fait une contre-proposition.",
        tips: [
          "Conseillez au vendeur d'evaluer la solidite du financement plutot que le seul prix propose.",
        ],
        icon: "🤝",
      },
      {
        id: "tp-s3",
        title: "Preparation et signature du compromis",
        duration: "2-3 semaines",
        description:
          "Le notaire ou l'agent immobilier prepare le compromis. Les parties signent et l'acquereur verse le sequestre.",
        keyDocuments: [
          "Compromis de vente",
          "Diagnostics techniques",
          "Documents de copropriete",
        ],
        icon: "✍️",
      },
      {
        id: "tp-s4",
        title: "Delai de retractation de l'acquereur",
        duration: "10 jours",
        description:
          "L'acquereur peut se retracter librement pendant ce delai. Le depot de garantie est restitue integralement en cas de retractation.",
        icon: "⏳",
      },
      {
        id: "tp-s5",
        title: "Obtention du financement",
        duration: "6-10 semaines",
        description:
          "L'acquereur finalise son dossier de pret, obtient l'accord de la banque et respecte le delai de reflexion de l'offre de pret.",
        keyDocuments: [
          "Offre de pret acceptee",
          "Attestation d'assurance emprunteur",
        ],
        tips: [
          "Transmettez l'attestation de pret au notaire des sa reception pour accelerer la suite.",
        ],
        icon: "🏦",
      },
      {
        id: "tp-s6",
        title: "Preparation de l'acte authentique",
        duration: "2-4 semaines",
        description:
          "Le notaire effectue les verifications finales (hypotheques, servitudes, preemption), redige l'acte et convoque les parties.",
        keyDocuments: [
          "Projet d'acte authentique",
          "Etat hypothecaire actualise",
        ],
        icon: "📜",
      },
      {
        id: "tp-s7",
        title: "Signature de l'acte et remise des cles",
        duration: "Jour J (3-4 mois apres offre)",
        description:
          "Signature definitive chez le notaire, transfert des fonds au vendeur et remise des cles au nouveau proprietaire. La vente est conclue.",
        keyDocuments: [
          "Acte authentique signe",
          "Attestation de propriete",
          "Cles et badges d'acces",
        ],
        tips: [
          "Preparez un petit dossier de bienvenue pour l'acquereur avec les contacts utiles (syndic, EDF, eau).",
        ],
        icon: "🔑",
      },
    ],
  },

  // ─── 5. marketing / annonces ──────────────────────────────────────
  {
    id: "tl-mkt-ann",
    moduleSlug: "marketing",
    lessonSlug: "annonces",
    title: "Cycle de vie d'une annonce",
    description:
      "De la creation de l'annonce a la conclusion de la vente : chaque phase de la commercialisation.",
    steps: [
      {
        id: "ma-s1",
        title: "Redaction de l'annonce",
        duration: "1-2 jours",
        description:
          "Redaction d'un texte accrocheur, structure et conforme a la reglementation. Mise en avant des atouts du bien et des informations obligatoires (DPE, honoraires, surface).",
        keyDocuments: [
          "Texte de l'annonce",
          "Informations reglementaires",
        ],
        tips: [
          "Testez plusieurs titres differents. Le titre est le premier filtre de selection des acquereurs.",
        ],
        icon: "✍️",
      },
      {
        id: "ma-s2",
        title: "Shooting photo et visuels",
        duration: "1-3 jours",
        description:
          "Realisation des photos professionnelles, creation de la visite virtuelle et preparation du plan du bien.",
        keyDocuments: [
          "Photos HD",
          "Visite virtuelle 360",
          "Plan 2D du bien",
        ],
        tips: [
          "Investissez dans un photographe professionnel. Le cout est derisoire face au gain de visibilite.",
        ],
        icon: "📸",
      },
      {
        id: "ma-s3",
        title: "Diffusion sur les portails immobiliers",
        duration: "Jour J",
        description:
          "Publication simultanee sur les principaux portails (SeLoger, Le Bon Coin, Bien'ici) et sur le site de l'agence. Activation des reseaux sociaux.",
        tips: [
          "Les premieres 48h de publication sont cruciales. Le bien beneficie d'une visibilite maximale.",
        ],
        icon: "🌐",
      },
      {
        id: "ma-s4",
        title: "Gestion des contacts et qualification",
        duration: "En continu",
        description:
          "Reponse aux demandes de renseignements, qualification des acquereurs (budget, delai, criteres) et prise de rendez-vous de visite.",
        tips: [
          "Repondez dans l'heure aux premiers contacts. La reactivite fait la difference.",
        ],
        icon: "📱",
      },
      {
        id: "ma-s5",
        title: "Organisation et suivi des visites",
        duration: "2-6 semaines",
        description:
          "Planification des visites, accompagnement des acquereurs, recueil des retours et reporting au vendeur.",
        keyDocuments: [
          "Comptes-rendus de visite",
          "Bilan de commercialisation",
        ],
        tips: [
          "Apres 10 visites sans offre, re-evaluez le positionnement prix avec le vendeur.",
        ],
        icon: "🚪",
      },
      {
        id: "ma-s6",
        title: "Ajustement et conclusion",
        duration: "Variable",
        description:
          "Si necessaire, ajustement du prix, amelioration des visuels ou changement de strategie. Aboutissement vers une offre d'achat acceptee.",
        tips: [
          "Un repositionnement prix de 5 % peut multiplier par 3 le nombre de contacts.",
        ],
        icon: "🎯",
      },
    ],
  },

  // ─── 6. transaction / prospection ────────────────────────────────
  {
    id: "tl-trans-prosp",
    moduleSlug: "transaction",
    lessonSlug: "prospection",
    title: "Processus de prospection — du contact au mandat",
    description: "Les étapes clés d'un cycle de prospection réussi, de la première prise de contact à la signature du mandat.",
    steps: [
      {
        id: "prosp-s1",
        title: "Identification du secteur et cartographie",
        duration: "Semaine 1",
        description: "Définissez votre secteur prioritaire (max 2 000 logements). Cartographiez les transactions des 12 derniers mois pour identifier les rues les plus actives et les propriétaires susceptibles de vendre.",
        keyDocuments: ["Carte de secteur annotée", "Liste des transactions DVF", "Planning de prospection"],
        tips: ["Concentrez-vous sur un secteur maîtrisable plutôt que de disperser vos efforts sur toute une ville."],
        icon: "🗺️",
      },
      {
        id: "prosp-s2",
        title: "Premiers contacts — porte-à-porte et boîtage",
        duration: "Semaines 2-4",
        description: "Diffusez vos supports (flyers, cartes de visite) et engagez les premiers échanges de voisinage. Le porte-à-porte ciblé (immeubles avec beaucoup de mutations) génère 3× plus de contacts que le boîtage aléatoire.",
        keyDocuments: ["Flyer personnalisé avec ventes récentes", "Carnet de contacts terrain"],
        tips: ["Mentionnez toujours une vente récente dans la rue — c'est votre légitimité locale."],
        icon: "🚪",
      },
      {
        id: "prosp-s3",
        title: "Qualification des contacts entrants",
        duration: "En continu",
        description: "Chaque contact doit être qualifié selon 4 critères : projet réel, délai, motivation de vente, contraintes financières. Seuls les contacts CHAUDS (projet <6 mois) méritent un suivi hebdomadaire.",
        keyDocuments: ["Fiche de qualification contact", "Agenda CRM"],
        tips: ["Un contact sans projet dans les 6 mois n'est pas perdu — il rejoint votre base 'long terme' avec relance trimestrielle."],
        icon: "📋",
      },
      {
        id: "prosp-s4",
        title: "Rendez-vous d'estimation",
        duration: "J+0 à J+14 après contact",
        description: "Le RDV d'estimation est l'objectif de toute la prospection. Préparez un dossier comparatif solide (3-5 ventes récentes), une présentation de votre agence et une stratégie de mise en marché personnalisée.",
        keyDocuments: ["Rapport comparatif de marché", "Plaquette agence", "Projet de mandat"],
        tips: ["Arrivez avec les données, pas avec des promesses. Un propriétaire convaincu par les chiffres signe 2× plus vite."],
        icon: "🏠",
      },
      {
        id: "prosp-s5",
        title: "Suivi et relance post-RDV",
        duration: "J+1 à J+21",
        description: "80 % des mandats se signent après la 3e ou 4e relance. Planifiez : J+1 (email récap), J+7 (appel marché), J+14 (nouvelle vente dans le secteur), J+21 (dernière offre de service).",
        keyDocuments: ["Email de suivi type", "Alerte nouvelles ventes secteur"],
        tips: ["La régularité du suivi montre votre sérieux. Un vendeur qui hésite choisira toujours l'agent qui reste présent."],
        icon: "📞",
      },
      {
        id: "prosp-s6",
        title: "Signature du mandat",
        duration: "Objectif J+30 après premier contact",
        description: "Le mandat signé est la conclusion du cycle de prospection. Choisissez le bon type (simple ou exclusif) selon le profil du vendeur. Définissez ensemble les objectifs, la stratégie prix et le calendrier.",
        keyDocuments: ["Mandat signé", "Plan de commercialisation", "Calendrier visites"],
        tips: ["Célébrez chaque mandat avec votre client — c'est le début d'un partenariat, pas une transaction."],
        icon: "✍️",
      },
    ],
  },

  // ─── 7. terrain / fidelisation ───────────────────────────────────
  {
    id: "tl-ter-fid",
    moduleSlug: "terrain",
    lessonSlug: "fidelisation",
    title: "Parcours de fidélisation client — de l'acte à l'ambassadeur",
    description: "Le programme complet de fidélisation post-vente pour transformer chaque client en source de recommandations actives.",
    steps: [
      {
        id: "fid-s1",
        title: "Signature de l'acte authentique",
        duration: "Jour J",
        description: "Le jour de la signature chez le notaire est le point de départ de votre relation long terme. Félicitez chaleureusement, remettez un cadeau symbolique et assurez-vous que le client part avec toutes les informations pratiques (assurances, déménagement, services).",
        keyDocuments: ["Acte authentique", "Guide du nouveau propriétaire", "Carte cadeau"],
        tips: ["Prenez une photo souvenir devant la porte du bien avec les clés — partagez sur vos réseaux avec l'accord du client."],
        icon: "🔑",
      },
      {
        id: "fid-s2",
        title: "Suivi J+1 à J+7",
        duration: "Première semaine",
        description: "Envoyez un email de remerciement personnalisé dans les 24h. Incluez les coordonnées utiles (EDF, mairie, voisinage). Vérifiez que le déménagement se passe bien. C'est la période de 'lune de miel' — le client est au pic de satisfaction.",
        keyDocuments: ["Email de bienvenue", "Carnet d'adresses locales"],
        tips: ["Mentionnez un détail spécifique discuté pendant la recherche — ça prouve que vous les avez vraiment écoutés."],
        icon: "📧",
      },
      {
        id: "fid-s3",
        title: "Demande d'avis Google — J+30",
        duration: "1 mois après l'acte",
        description: "À J+30, appelez pour savoir comment se passe l'installation. C'est le moment optimal pour demander un avis Google et une recommandation. La satisfaction est encore élevée et l'emménagement est terminé.",
        keyDocuments: ["Lien direct vers fiche Google Business"],
        tips: ["Script : 'Si vous êtes satisfait de notre accompagnement, un avis Google nous aide énormément — je vous envoie le lien direct.' Simple et efficace."],
        icon: "⭐",
      },
      {
        id: "fid-s4",
        title: "Anniversaire de l'achat — J+365",
        duration: "Un an après",
        description: "Un appel ou message pour l'anniversaire de l'achat. Partagez l'évolution du marché dans son quartier. C'est un prétexte élégant pour rester en contact sans être intrusif.",
        keyDocuments: ["Rapport marché local du quartier"],
        tips: ["'Votre appartement a pris +3 % de valeur en un an selon les ventes récentes' — voilà une information qui intéresse tout propriétaire."],
        icon: "🎂",
      },
      {
        id: "fid-s5",
        title: "Programme ambassadeur — J+90 en continu",
        duration: "Dès 3 mois et à vie",
        description: "Intégrez le client dans votre programme de parrainage. Expliquez le fonctionnement (récompense pour chaque recommandation qui aboutit à une vente). Un client actif dans votre réseau vaut 3 à 5 mandats sur sa durée de vie.",
        keyDocuments: ["Règlement du programme parrainage", "Carte ambassadeur"],
        tips: ["La question à poser : 'Parmi vos amis ou votre famille, connaissez-vous quelqu'un qui envisage un projet immobilier ?' — posez-la systématiquement à chaque contact."],
        icon: "🌟",
      },
      {
        id: "fid-s6",
        title: "Newsletter trimestrielle",
        duration: "Tous les 3 mois",
        description: "Envoyez une newsletter locale avec les prix au m² du quartier, les nouvelles du marché, les tendances. Personnalisez avec le prénom et le quartier du client. Objectif : rester 'top of mind' pour le prochain projet ou une recommandation.",
        keyDocuments: ["Template newsletter", "Données marché local trimestre"],
        tips: ["Une newsletter hyper-locale (prix au m² de la rue du client) génère 4× plus d'ouvertures qu'une newsletter immobilière générale."],
        icon: "📰",
      },
    ],
  },
];

export function getTimelines(
  moduleSlug: string,
  lessonSlug: string,
): InteractiveTimeline[] {
  return TIMELINES.filter(
    (t) => t.moduleSlug === moduleSlug && t.lessonSlug === lessonSlug,
  );
}
