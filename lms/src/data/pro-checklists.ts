/**
 * Checklists professionnelles pour agents immobiliers.
 * Chaque checklist correspond a une lecon et contient des items
 * regroupes par categorie avec des conseils pratiques.
 */

export type ChecklistItem = {
  id: string;
  text: string;
  category: string;
  tip?: string;
};

export type ProChecklist = {
  id: string;
  moduleSlug: string;
  lessonSlug: string;
  title: string;
  description: string;
  icon: string;
  categories: string[];
  items: ChecklistItem[];
};

const PRO_CHECKLISTS: ProChecklist[] = [
  // ─── 1. juridique / diagnostics ───────────────────────────────────
  {
    id: "cl-jur-diag",
    moduleSlug: "juridique",
    lessonSlug: "diagnostics",
    title: "Checklist diagnostics obligatoires",
    description:
      "Tous les diagnostics a reunir avant la mise en vente d'un bien immobilier.",
    icon: "🔍",
    categories: [
      "Performance et securite",
      "Environnement et risques",
      "Mesurage et conformite",
    ],
    items: [
      {
        id: "jd-01",
        text: "DPE (Diagnostic de Performance Energetique)",
        category: "Performance et securite",
        tip: "Valable 10 ans. Obligatoire des la mise en vente pour affichage sur l'annonce.",
      },
      {
        id: "jd-02",
        text: "Diagnostic amiante (si permis de construire avant le 1er juillet 1997)",
        category: "Performance et securite",
        tip: "Illimite si negatif. Si positif, un controle periodique est obligatoire.",
      },
      {
        id: "jd-03",
        text: "Diagnostic plomb / CREP (si construction avant le 1er janvier 1949)",
        category: "Performance et securite",
        tip: "Valable 1 an si positif, illimite si negatif. Obligatoire pour les logements anciens.",
      },
      {
        id: "jd-04",
        text: "Diagnostic termites (si zone classee par arrete prefectoral)",
        category: "Environnement et risques",
        tip: "Valable 6 mois. Verifiez la cartographie de votre departement sur le site de la prefecture.",
      },
      {
        id: "jd-05",
        text: "Diagnostic electricite (installation de plus de 15 ans)",
        category: "Performance et securite",
        tip: "Valable 3 ans. Couvre les installations interieures de l'ensemble du logement.",
      },
      {
        id: "jd-06",
        text: "Diagnostic gaz (installation de plus de 15 ans)",
        category: "Performance et securite",
        tip: "Valable 3 ans. Concerne les installations fixes de chauffage et production d'eau chaude.",
      },
      {
        id: "jd-07",
        text: "ERP (Etat des Risques et Pollutions)",
        category: "Environnement et risques",
        tip: "Valable 6 mois. Inclut les risques naturels, miniers, technologiques et la pollution des sols.",
      },
      {
        id: "jd-08",
        text: "Mesurage loi Carrez (lots de copropriete)",
        category: "Mesurage et conformite",
        tip: "Valable sans limite sauf si travaux. Une erreur de plus de 5 % peut entrainer une reduction du prix.",
      },
      {
        id: "jd-09",
        text: "Diagnostic assainissement non collectif",
        category: "Environnement et risques",
        tip: "Valable 3 ans. Obligatoire si le bien n'est pas raccorde au tout-a-l'egout.",
      },
      {
        id: "jd-10",
        text: "Diagnostic bruit (zones d'exposition au bruit des aerodromes)",
        category: "Environnement et risques",
        tip: "Obligatoire depuis juin 2020 pour les biens situes dans les zones de bruit definies par le PEB.",
      },
      {
        id: "jd-11",
        text: "Verifier la coherence des dates de validite de tous les diagnostics",
        category: "Mesurage et conformite",
        tip: "Un diagnostic expire au moment du compromis peut bloquer la vente. Anticipez les renouvellements.",
      },
    ],
  },

  // ─── 2. juridique / compromis ─────────────────────────────────────
  {
    id: "cl-jur-comp",
    moduleSlug: "juridique",
    lessonSlug: "compromis",
    title: "Checklist pieces du compromis",
    description:
      "Documents a reunir pour constituer un dossier de compromis complet et conforme.",
    icon: "📋",
    categories: [
      "Documents du vendeur",
      "Documents de copropriete",
      "Documents juridiques et financiers",
    ],
    items: [
      {
        id: "jc-01",
        text: "Titre de propriete ou attestation notariee",
        category: "Documents du vendeur",
        tip: "Demandez l'original ou une copie certifiee au notaire du vendeur.",
      },
      {
        id: "jc-02",
        text: "Pieces d'identite du vendeur et de l'acquereur",
        category: "Documents du vendeur",
      },
      {
        id: "jc-03",
        text: "Dossier de diagnostics techniques complet et a jour",
        category: "Documents du vendeur",
        tip: "Verifiez chaque date de validite individuellement avant la signature.",
      },
      {
        id: "jc-04",
        text: "Trois derniers proces-verbaux d'assemblee generale",
        category: "Documents de copropriete",
        tip: "Ils revelent les travaux votes, les litiges en cours et les decisions importantes.",
      },
      {
        id: "jc-05",
        text: "Reglement de copropriete et etat descriptif de division",
        category: "Documents de copropriete",
        tip: "Verifiez les clauses sur la destination des lots et les restrictions d'usage.",
      },
      {
        id: "jc-06",
        text: "Fiche synthetique de la copropriete",
        category: "Documents de copropriete",
        tip: "Obligatoire depuis la loi ALUR. Recapitule les informations financieres et techniques.",
      },
      {
        id: "jc-07",
        text: "Carnet d'entretien de l'immeuble",
        category: "Documents de copropriete",
      },
      {
        id: "jc-08",
        text: "Etat hypothecaire ou etat date",
        category: "Documents juridiques et financiers",
        tip: "L'etat date mentionne les charges courantes, les arrieres et les procedures en cours.",
      },
      {
        id: "jc-09",
        text: "Dernieres taxes foncieres et d'habitation",
        category: "Documents juridiques et financiers",
        tip: "Permettent a l'acquereur d'estimer la fiscalite locale du bien.",
      },
      {
        id: "jc-10",
        text: "Plan cadastral et references de la parcelle",
        category: "Documents juridiques et financiers",
      },
      {
        id: "jc-11",
        text: "Attestation d'assurance du bien (PNO ou MRH)",
        category: "Documents du vendeur",
        tip: "L'assurance doit etre maintenue jusqu'au transfert effectif de propriete.",
      },
    ],
  },

  // ─── 3. transaction / estimation ──────────────────────────────────
  {
    id: "cl-tra-est",
    moduleSlug: "transaction",
    lessonSlug: "estimation",
    title: "Checklist visite d'estimation",
    description:
      "Points a verifier lors d'une visite d'estimation pour une evaluation precise du bien.",
    icon: "🏠",
    categories: [
      "Etat general du bien",
      "Caracteristiques techniques",
      "Environnement et localisation",
    ],
    items: [
      {
        id: "te-01",
        text: "Etat general : facade, toiture, parties communes",
        category: "Etat general du bien",
        tip: "Prenez des photos de tous les defauts visibles. Ils serviront a justifier votre estimation.",
      },
      {
        id: "te-02",
        text: "Surface habitable et surface Carrez si copropriete",
        category: "Caracteristiques techniques",
        tip: "Mesurez vous-meme si possible. L'ecart entre surface annoncee et reelle est frequent.",
      },
      {
        id: "te-03",
        text: "Exposition et luminosite de chaque piece",
        category: "Caracteristiques techniques",
        tip: "Un appartement double exposition sud-ouest peut valoir 10 a 15 % de plus qu'un nord.",
      },
      {
        id: "te-04",
        text: "Etat des installations electriques et de plomberie",
        category: "Etat general du bien",
      },
      {
        id: "te-05",
        text: "Type de chauffage et cout energetique annuel",
        category: "Caracteristiques techniques",
        tip: "Demandez les factures energetiques des 2 dernieres annees pour un chiffrage precis.",
      },
      {
        id: "te-06",
        text: "Standing de l'immeuble : hall, ascenseur, gardien",
        category: "Etat general du bien",
        tip: "Le standing impacte directement le prix au m2. Notez la proprete et l'entretien general.",
      },
      {
        id: "te-07",
        text: "Proximite transports en commun (metro, bus, tram)",
        category: "Environnement et localisation",
        tip: "Moins de 5 minutes a pied d'une station de metro peut ajouter 5 a 10 % au prix.",
      },
      {
        id: "te-08",
        text: "Commerces, ecoles et services de proximite",
        category: "Environnement et localisation",
      },
      {
        id: "te-09",
        text: "Nuisances sonores (rue passante, voie ferree, voisinage)",
        category: "Environnement et localisation",
        tip: "Effectuez la visite a differents moments de la journee pour evaluer les nuisances reelles.",
      },
      {
        id: "te-10",
        text: "Potentiel d'amenagement ou d'extension",
        category: "Caracteristiques techniques",
        tip: "Verifiez le PLU pour connaitre les possibilites de surelevation ou d'extension.",
      },
      {
        id: "te-11",
        text: "Comparatifs de prix des ventes recentes dans le quartier",
        category: "Environnement et localisation",
        tip: "Utilisez la base DVF (Demandes de Valeurs Foncieres) pour des references fiables.",
      },
    ],
  },

  // ─── 4. transaction / prospection ─────────────────────────────────
  {
    id: "cl-tra-pro",
    moduleSlug: "transaction",
    lessonSlug: "prospection",
    title: "Checklist prospection terrain",
    description:
      "Organiser sa prospection immobiliere pour maximiser la prise de mandats.",
    icon: "🎯",
    categories: [
      "Preparation",
      "Actions terrain",
      "Suivi et relances",
    ],
    items: [
      {
        id: "tp-01",
        text: "Definir les zones geographiques prioritaires (ilotage)",
        category: "Preparation",
        tip: "Concentrez-vous sur 2-3 quartiers maximum pour devenir la reference locale.",
      },
      {
        id: "tp-02",
        text: "Preparer les supports de distribution (flyers, cartes de visite)",
        category: "Preparation",
        tip: "Incluez un QR code vers votre site ou une estimation en ligne pour capter des leads.",
      },
      {
        id: "tp-03",
        text: "Rediger un script d'appel telephonique adapte a chaque cible",
        category: "Preparation",
        tip: "Preparez 3 variantes : proprietaire occupant, investisseur, succession.",
      },
      {
        id: "tp-04",
        text: "Identifier les biens en vente par particuliers (PAP, Le Bon Coin)",
        category: "Actions terrain",
        tip: "Contactez dans les 24h de la parution. La reactivite est le facteur numero un.",
      },
      {
        id: "tp-05",
        text: "Effectuer du porte-a-porte cible sur les immeubles reperes",
        category: "Actions terrain",
      },
      {
        id: "tp-06",
        text: "Distribuer boites aux lettres et affichage vitrine actualise",
        category: "Actions terrain",
        tip: "Renouvelez les supports tous les mois avec des references de ventes recentes.",
      },
      {
        id: "tp-07",
        text: "Mettre a jour le CRM avec chaque nouveau contact",
        category: "Suivi et relances",
        tip: "Notez le contexte de chaque echange pour personnaliser les relances futures.",
      },
      {
        id: "tp-08",
        text: "Planifier les relances a J+3, J+7 et J+30",
        category: "Suivi et relances",
        tip: "Un proprietaire indecis se decide souvent apres la 3e relance. Ne lacher rien trop tot.",
      },
      {
        id: "tp-09",
        text: "Analyser les resultats hebdomadaires (contacts, RDV, mandats)",
        category: "Suivi et relances",
        tip: "Visez un ratio de 10 contacts pour 1 rendez-vous d'estimation.",
      },
    ],
  },

  // ─── 5. financement / credit ──────────────────────────────────────
  {
    id: "cl-fin-cre",
    moduleSlug: "financement",
    lessonSlug: "credit",
    title: "Checklist dossier de financement",
    description:
      "Pieces a fournir pour constituer un dossier de pret immobilier solide.",
    icon: "🏦",
    categories: [
      "Identite et situation",
      "Revenus et charges",
      "Projet immobilier",
    ],
    items: [
      {
        id: "fc-01",
        text: "Pieces d'identite en cours de validite (CNI ou passeport)",
        category: "Identite et situation",
      },
      {
        id: "fc-02",
        text: "Livret de famille ou certificat de PACS le cas echeant",
        category: "Identite et situation",
      },
      {
        id: "fc-03",
        text: "Justificatif de domicile de moins de 3 mois",
        category: "Identite et situation",
        tip: "Facture d'electricite, de gaz ou quittance de loyer acceptees.",
      },
      {
        id: "fc-04",
        text: "3 derniers bulletins de salaire",
        category: "Revenus et charges",
        tip: "Pour les independants : 3 derniers bilans comptables et avis d'imposition.",
      },
      {
        id: "fc-05",
        text: "2 derniers avis d'imposition complets",
        category: "Revenus et charges",
        tip: "La banque verifie la coherence entre revenus declares et bulletins de salaire.",
      },
      {
        id: "fc-06",
        text: "3 derniers releves de tous les comptes bancaires",
        category: "Revenus et charges",
        tip: "Evitez les decouvertes et les depenses inhabituelles pendant les 3 mois precedants.",
      },
      {
        id: "fc-07",
        text: "Tableaux d'amortissement des credits en cours",
        category: "Revenus et charges",
        tip: "Le taux d'endettement maximal est de 35 % tous credits confondus.",
      },
      {
        id: "fc-08",
        text: "Justificatif de l'apport personnel (epargne, donation)",
        category: "Revenus et charges",
        tip: "Un apport de 10 % minimum (hors frais de notaire) ameliore significativement les conditions.",
      },
      {
        id: "fc-09",
        text: "Compromis de vente signe ou offre acceptee",
        category: "Projet immobilier",
        tip: "Le compromis doit mentionner la condition suspensive d'obtention de pret.",
      },
      {
        id: "fc-10",
        text: "Estimation du bien ou avis de valeur",
        category: "Projet immobilier",
      },
      {
        id: "fc-11",
        text: "Simulation de pret detaillee (duree, taux, mensualites)",
        category: "Projet immobilier",
        tip: "Comparez au moins 3 banques ou passez par un courtier pour optimiser les conditions.",
      },
    ],
  },

  // ─── 6. marketing / photos ────────────────────────────────────────
  {
    id: "cl-mkt-pho",
    moduleSlug: "marketing",
    lessonSlug: "photos",
    title: "Checklist shooting photo",
    description:
      "Preparer et realiser un shooting photo professionnel pour valoriser un bien.",
    icon: "📸",
    categories: [
      "Preparation du bien",
      "Prise de vue",
      "Post-production",
    ],
    items: [
      {
        id: "mp-01",
        text: "Ranger et desencombrer chaque piece visible",
        category: "Preparation du bien",
        tip: "Retirez les objets personnels (photos, collections). Le bien doit paraitre neutre et spacieux.",
      },
      {
        id: "mp-02",
        text: "Nettoyer les vitres, miroirs et surfaces brillantes",
        category: "Preparation du bien",
      },
      {
        id: "mp-03",
        text: "Allumer toutes les lumieres et ouvrir les volets",
        category: "Preparation du bien",
        tip: "Privilegiez les ampoules blanc chaud pour une ambiance accueillante et coherente.",
      },
      {
        id: "mp-04",
        text: "Photographier aux heures de belle lumiere naturelle",
        category: "Prise de vue",
        tip: "Le matin entre 9h et 11h ou le soir entre 16h et 18h offrent la meilleure lumiere.",
      },
      {
        id: "mp-05",
        text: "Utiliser un grand angle (16-24mm) sans deformer les perspectives",
        category: "Prise de vue",
        tip: "Positionnez l'appareil a hauteur de poitrine, jamais depuis un coin de la piece.",
      },
      {
        id: "mp-06",
        text: "Capturer chaque piece sous au moins 2 angles differents",
        category: "Prise de vue",
        tip: "Incluez toujours un cadrage montrant la porte d'entree de la piece pour situer le visiteur.",
      },
      {
        id: "mp-07",
        text: "Photographier les exterieurs : facade, jardin, vue, parking",
        category: "Prise de vue",
      },
      {
        id: "mp-08",
        text: "Realiser un plan de masse ou un schema d'implantation",
        category: "Prise de vue",
        tip: "Un plan cote aide les acquereurs a se projeter bien mieux que les photos seules.",
      },
      {
        id: "mp-09",
        text: "Retoucher les photos : luminosite, contraste, recadrage",
        category: "Post-production",
        tip: "Restez fidele a la realite. Des photos trop retouchees creent de la deception en visite.",
      },
      {
        id: "mp-10",
        text: "Organiser les photos dans l'ordre logique du parcours de visite",
        category: "Post-production",
        tip: "Commencez par la facade, puis l'entree, les pieces de vie, les chambres et terminez par l'exterieur.",
      },
    ],
  },

  // ─── 7. marketing / annonces ──────────────────────────────────────
  {
    id: "cl-mkt-ann",
    moduleSlug: "marketing",
    lessonSlug: "annonces",
    title: "Checklist annonce parfaite",
    description:
      "Tous les elements pour rediger une annonce immobiliere performante et conforme.",
    icon: "✍️",
    categories: [
      "Contenu redactionnel",
      "Informations obligatoires",
      "Visuels et diffusion",
    ],
    items: [
      {
        id: "ma-01",
        text: "Titre accrocheur avec type de bien, surface et localisation",
        category: "Contenu redactionnel",
        tip: "Exemple efficace : \"Appartement 3P 65m2 — Balcon Sud — Metro Republique\".",
      },
      {
        id: "ma-02",
        text: "Description structuree : accroche, description, quartier, modalites",
        category: "Contenu redactionnel",
        tip: "Utilisez des paragraphes courts. La premiere phrase doit donner envie de lire la suite.",
      },
      {
        id: "ma-03",
        text: "Mettre en avant les 3 points forts principaux du bien",
        category: "Contenu redactionnel",
        tip: "Luminosite, calme, vue, terrasse : identifiez ce qui differencie ce bien des autres.",
      },
      {
        id: "ma-04",
        text: "Prix de vente affiche (FAI ou hors honoraires selon convention)",
        category: "Informations obligatoires",
        tip: "Mentionnez toujours le montant et le pourcentage des honoraires ainsi que qui les supporte.",
      },
      {
        id: "ma-05",
        text: "Surface habitable et nombre de pieces",
        category: "Informations obligatoires",
      },
      {
        id: "ma-06",
        text: "Classe energetique DPE et GES obligatoires",
        category: "Informations obligatoires",
        tip: "L'absence du DPE dans l'annonce est sanctionnee. Affichez la lettre et la valeur.",
      },
      {
        id: "ma-07",
        text: "Montant des charges de copropriete mensuelles",
        category: "Informations obligatoires",
        tip: "Obligatoire depuis la loi ALUR. Precisez egalement le nombre de lots.",
      },
      {
        id: "ma-08",
        text: "Minimum 10 photos HD de qualite professionnelle",
        category: "Visuels et diffusion",
        tip: "Les annonces avec plus de 10 photos recoivent 3 fois plus de contacts.",
      },
      {
        id: "ma-09",
        text: "Visite virtuelle 360 degres ou video du bien",
        category: "Visuels et diffusion",
        tip: "Reduit de 40 % les visites non qualifiees en permettant un premier tri a distance.",
      },
      {
        id: "ma-10",
        text: "Diffusion simultanee sur les portails principaux",
        category: "Visuels et diffusion",
        tip: "SeLoger, Le Bon Coin, Bien'ici minimum. Publiez idealement le mardi ou mercredi matin.",
      },
    ],
  },

  // ─── 8. terrain / visite ──────────────────────────────────────────
  {
    id: "cl-ter-vis",
    moduleSlug: "terrain",
    lessonSlug: "visite",
    title: "Checklist preparation visite",
    description:
      "Preparer et conduire une visite immobiliere professionnelle et convaincante.",
    icon: "🚪",
    categories: [
      "Avant la visite",
      "Pendant la visite",
      "Apres la visite",
    ],
    items: [
      {
        id: "tv-01",
        text: "Verifier le dossier acquereur : budget, criteres, financement",
        category: "Avant la visite",
        tip: "Qualifiez le projet avant la visite pour eviter les visites tourisme.",
      },
      {
        id: "tv-02",
        text: "Recuperer et verifier les cles, codes d'acces et badges",
        category: "Avant la visite",
      },
      {
        id: "tv-03",
        text: "Preparer le dossier de visite : plans, diagnostics, charges",
        category: "Avant la visite",
        tip: "Imprimez un dossier synthetique avec les informations cles. Cela renforce votre credibilite.",
      },
      {
        id: "tv-04",
        text: "Lister les 5 points forts a mettre en avant selon le profil acquereur",
        category: "Avant la visite",
        tip: "Adaptez votre argumentaire : un couple avec enfants et un investisseur n'ont pas les memes attentes.",
      },
      {
        id: "tv-05",
        text: "Anticiper les 5 objections probables et preparer les reponses",
        category: "Avant la visite",
        tip: "Les objections les plus courantes : prix, travaux, bruit, etage sans ascenseur, DPE.",
      },
      {
        id: "tv-06",
        text: "Aerer le bien 15 minutes avant l'arrivee",
        category: "Pendant la visite",
      },
      {
        id: "tv-07",
        text: "Suivre un parcours de visite logique et valorisant",
        category: "Pendant la visite",
        tip: "Commencez par la piece la plus impressionnante. Terminez par la piece de vie principale.",
      },
      {
        id: "tv-08",
        text: "Laisser le temps au visiteur d'explorer et de se projeter",
        category: "Pendant la visite",
        tip: "Evitez de parler en continu. Les silences permettent au visiteur de s'imaginer vivre ici.",
      },
      {
        id: "tv-09",
        text: "Recueillir le ressenti a chaud et noter les retours",
        category: "Apres la visite",
        tip: "Posez la question : \"Sur une echelle de 1 a 10, ou placez-vous ce bien ?\".",
      },
      {
        id: "tv-10",
        text: "Envoyer un compte-rendu dans les 2 heures suivant la visite",
        category: "Apres la visite",
        tip: "Un email synthetique avec les points cles et les prochaines etapes augmente le taux de conversion.",
      },
    ],
  },

  // ─── 9. terrain / promesse ────────────────────────────────────────
  {
    id: "cl-ter-pro",
    moduleSlug: "terrain",
    lessonSlug: "promesse",
    title: "Checklist promesse de vente",
    description:
      "Verifier tous les elements avant la signature de la promesse de vente.",
    icon: "📝",
    categories: [
      "Parties et bien",
      "Conditions et delais",
      "Aspects financiers",
    ],
    items: [
      {
        id: "tpr-01",
        text: "Identite complete des parties (vendeur et acquereur)",
        category: "Parties et bien",
        tip: "Verifiez la concordance exacte avec les pieces d'identite et le titre de propriete.",
      },
      {
        id: "tpr-02",
        text: "Designation precise du bien (adresse, lot, cave, parking)",
        category: "Parties et bien",
      },
      {
        id: "tpr-03",
        text: "Conditions suspensives clairement redigees",
        category: "Conditions et delais",
        tip: "La condition d'obtention de pret est obligatoire sauf renonciation expresse et manuscrite.",
      },
      {
        id: "tpr-04",
        text: "Delai d'obtention du pret (generalement 45 a 60 jours)",
        category: "Conditions et delais",
        tip: "Prevoyez 60 jours minimum. Les delais bancaires sont souvent sous-estimes.",
      },
      {
        id: "tpr-05",
        text: "Date butoir de realisation de la vente",
        category: "Conditions et delais",
        tip: "Comptez 3 a 4 mois entre la promesse et l'acte authentique.",
      },
      {
        id: "tpr-06",
        text: "Delai de retractation de 10 jours mentionne (loi SRU)",
        category: "Conditions et delais",
        tip: "Le delai court a compter du lendemain de la notification par LRAR ou remise en main propre.",
      },
      {
        id: "tpr-07",
        text: "Montant et modalites de versement du sequestre",
        category: "Aspects financiers",
        tip: "Generalement 5 a 10 % du prix de vente, verse chez le notaire ou l'agent immobilier.",
      },
      {
        id: "tpr-08",
        text: "Dossier de diagnostics techniques annexe et complet",
        category: "Parties et bien",
        tip: "Tous les diagnostics doivent etre dates et valides au jour de la signature.",
      },
      {
        id: "tpr-09",
        text: "Clause penale en cas de defaillance d'une des parties",
        category: "Aspects financiers",
        tip: "Generalement fixee a 10 % du prix de vente. Elle s'applique hors conditions suspensives.",
      },
      {
        id: "tpr-10",
        text: "Repartition des frais (notaire, agence, charges courantes)",
        category: "Aspects financiers",
      },
    ],
  },

  // ─── 10. financement / défiscalisation ───────────────────────────
  {
    id: "cl-fin-defisc",
    moduleSlug: "financement",
    lessonSlug: "defiscalisation",
    title: "Checklist défiscalisation immobilière 2025",
    description:
      "Dispositifs actifs et expirés à connaître pour conseiller vos clients investisseurs en 2025.",
    icon: "💰",
    categories: [
      "Dispositifs actifs en 2025",
      "Dispositifs expirés — à connaître",
      "Vérification éligibilité client",
    ],
    items: [
      {
        id: "df-01",
        text: "Loi Denormandie : réduction 12 %, 18 % ou 21 % selon durée (6, 9 ou 12 ans)",
        category: "Dispositifs actifs en 2025",
        tip: "Travaux ≥ 25 % du coût total. Biens en centre-ville dégradé. Vérifier la liste des communes éligibles sur impots.gouv.fr.",
      },
      {
        id: "df-02",
        text: "Loi Cosse / Louer Abordable : déduction 15 % à 85 % des revenus fonciers",
        category: "Dispositifs actifs en 2025",
        tip: "Convention ANAH requise. Loyer inférieur au marché selon la zone. Très avantageux pour les TMI élevés (30 %+).",
      },
      {
        id: "df-03",
        text: "Loi Malraux : réduction 22 % (AVAP) ou 30 % (secteur sauvegardé) sur les travaux",
        category: "Dispositifs actifs en 2025",
        tip: "Plafond 400 000 € de travaux sur 4 ans. Architecte des Bâtiments de France obligatoire. Dispositif permanent sans date d'expiration.",
      },
      {
        id: "df-04",
        text: "Déficit foncier : imputation sur le revenu global jusqu'à 10 700 €/an (21 400 € si réno énergétique)",
        category: "Dispositifs actifs en 2025",
        tip: "Travaux déductibles : réparation, amélioration, entretien. Pas la construction. Régime réel obligatoire. Le plafond doublé (21 400 €) s'applique aux DPE passoires rénovées.",
      },
      {
        id: "df-05",
        text: "LMNP régime réel : amortissement du bien + déduction de toutes les charges",
        category: "Dispositifs actifs en 2025",
        tip: "Revenus locatifs < 23 000 €/an ou < 50 % des revenus du foyer. L'amortissement crée souvent un déficit BIC non imposable. Consulter un expert-comptable.",
      },
      {
        id: "df-06",
        text: "⚠️ Pinel : dispositif expiré au 31/12/2024 — ne plus proposer pour nouveaux achats",
        category: "Dispositifs expirés — à connaître",
        tip: "Les investissements Pinel engagés avant le 31/12/2024 continuent de bénéficier de la réduction jusqu'à leur terme. Pour les biens déjà acquis en Pinel, vérifier le respect des conditions de location.",
      },
      {
        id: "df-07",
        text: "⚠️ Censi-Bouvard : expiré au 31/12/2022 — droits acquis maintenus jusqu'à terme",
        category: "Dispositifs expirés — à connaître",
        tip: "Résidences gérées (étudiantes, seniors, EHPAD). Les investisseurs ayant signé avant fin 2022 gardent leur réduction 11 % jusqu'à l'échéance de leur engagement.",
      },
      {
        id: "df-08",
        text: "Vérifier la situation fiscale du client (TMI, revenus fonciers existants, capacité d'imputation)",
        category: "Vérification éligibilité client",
        tip: "Un client non imposable ne bénéficie d'aucun avantage fiscal. Calculer le TMI précis avant toute recommandation.",
      },
      {
        id: "df-09",
        text: "Vérifier la zone géographique du bien (A, A bis, B1, B2, C) selon le dispositif envisagé",
        category: "Vérification éligibilité client",
        tip: "Denormandie : communes de la liste officielle. Malraux : SPR ou AVAP. Cosse : zones A/B1/B2 selon le niveau de loyer.",
      },
      {
        id: "df-10",
        text: "Orienter vers un CGP ou expert-comptable pour l'optimisation fiscale personnalisée",
        category: "Vérification éligibilité client",
        tip: "L'agent immobilier informe sur les dispositifs mais ne délivre pas de conseil fiscal personnalisé — c'est une limite légale. Ne jamais promettre une économie d'impôt précise sans validation par un professionnel habilité.",
      },
      {
        id: "df-11",
        text: "Calculer le rendement net-net de l'investissement APRÈS avantage fiscal et charges réelles",
        category: "Vérification éligibilité client",
        tip: "Formule : (Loyers annuels − charges − impôts + économie fiscale) / (Prix d'achat + frais). Intégrez toujours 5 % de vacance locative dans le calcul.",
      },
    ],
  },

  // ─── 11. financement / rentabilité ───────────────────────────────
  {
    id: "cl-fin-rent",
    moduleSlug: "financement",
    lessonSlug: "rentabilite",
    title: "Checklist analyse de rentabilité locative",
    description:
      "Grille complète pour calculer et valider la rentabilité réelle d'un investissement locatif avant achat.",
    icon: "📈",
    categories: [
      "Collecte des données",
      "Calculs à réaliser",
      "Facteurs de risque",
    ],
    items: [
      {
        id: "rent-01",
        text: "Obtenir le loyer marché estimé (3 sources : agences locales, observatoire, annonces récentes)",
        category: "Collecte des données",
        tip: "Ne jamais se baser sur une seule source. L'écart entre loyer espéré et loyer réel dépasse souvent 10-15 %.",
      },
      {
        id: "rent-02",
        text: "Lister toutes les charges non récupérables : taxe foncière, charges copro, assurance PNO, frais gestion",
        category: "Collecte des données",
        tip: "Les charges non récupérables représentent généralement 20-30 % des loyers bruts. Ne pas les sous-estimer.",
      },
      {
        id: "rent-03",
        text: "Estimer le budget travaux immédiats et à 5 ans (ravalement, toiture, chaudière)",
        category: "Collecte des données",
        tip: "Demandez le carnet d'entretien de la copropriété et les PV d'AG pour anticiper les dépenses votées.",
      },
      {
        id: "rent-04",
        text: "Vérifier le classement DPE — logements F/G : gel des loyers + calendrier d'interdiction de location",
        category: "Collecte des données",
        tip: "G+ : interdit à la location depuis janv. 2023. G : 2025. F : 2028. E : 2034. Intégrez le coût de rénovation dans votre calcul.",
      },
      {
        id: "rent-05",
        text: "Calculer la rentabilité brute : (loyer annuel / prix d'achat total) × 100",
        category: "Calculs à réaliser",
        tip: "Le 'prix d'achat total' inclut frais de notaire, travaux, frais d'agence. Une rentabilité brute < 4 % est généralement insuffisante.",
      },
      {
        id: "rent-06",
        text: "Calculer la rentabilité nette : (loyer annuel − charges non récupérables) / prix total × 100",
        category: "Calculs à réaliser",
        tip: "Rentabilité nette cible selon le marché : Paris 2-3 %, grandes villes 3-5 %, villes moyennes 5-8 %.",
      },
      {
        id: "rent-07",
        text: "Calculer le cash-flow mensuel : loyer − mensualité crédit − charges − impôts",
        category: "Calculs à réaliser",
        tip: "Un cash-flow positif signifie que le bien s'autofinance. Un cash-flow légèrement négatif est acceptable si la plus-value potentielle compense.",
      },
      {
        id: "rent-08",
        text: "Simuler 3 scénarios : optimiste (plein loyer), réaliste (5 % vacance), pessimiste (15 % vacance + travaux imprévus)",
        category: "Calculs à réaliser",
        tip: "Le scénario pessimiste doit rester supportable financièrement pour le client — c'est la marge de sécurité.",
      },
      {
        id: "rent-09",
        text: "Évaluer le potentiel de plus-value à 10 ans selon les tendances du marché local",
        category: "Calculs à réaliser",
        tip: "Analyser l'évolution du quartier : projets urbains, nouvelles lignes de transport, gentrification.",
      },
      {
        id: "rent-10",
        text: "Vérifier le taux de vacance locative moyen dans le secteur",
        category: "Facteurs de risque",
        tip: "Un taux de vacance local > 8 % est un signal d'alerte. Vérifiez auprès de la CLAMEUR ou des bailleurs locaux.",
      },
      {
        id: "rent-11",
        text: "Analyser le profil des locataires types dans la zone (étudiants, familles, actifs)",
        category: "Facteurs de risque",
        tip: "Les zones à dominante étudiante ont une forte rotation et une saisonnalité marquée (été). Les actifs offrent plus de stabilité.",
      },
      {
        id: "rent-12",
        text: "Vérifier l'existence d'un encadrement des loyers dans la commune et le plafond applicable",
        category: "Facteurs de risque",
        tip: "Dans les villes avec encadrement (Paris, Bordeaux, Lyon...), le loyer ne peut dépasser loyer de référence + 20 %. Calculez l'impact sur la rentabilité.",
      },
    ],
  },

  // ─── 12. financement / fiscalité ─────────────────────────────────
  {
    id: "cl-fin-fisc",
    moduleSlug: "financement",
    lessonSlug: "fiscalite",
    title: "Checklist fiscalité investisseur locatif",
    description:
      "Points clés de fiscalité à vérifier pour optimiser la situation fiscale d'un investisseur immobilier.",
    icon: "⚖️",
    categories: [
      "Régime fiscal location nue",
      "Régime fiscal location meublée",
      "Fiscalité à la revente",
    ],
    items: [
      {
        id: "fisc-01",
        text: "Location nue — micro-foncier : abattement 30 % si revenus fonciers < 15 000 €/an",
        category: "Régime fiscal location nue",
        tip: "Simple à déclarer mais moins avantageux que le régime réel si les charges dépassent 30 % des loyers.",
      },
      {
        id: "fisc-02",
        text: "Location nue — régime réel : déduire intérêts d'emprunt, charges, travaux, amortissement des meubles",
        category: "Régime fiscal location nue",
        tip: "Obligatoire si revenus fonciers > 15 000 €. Recommandé dès que les charges > 30 % des loyers. Nécessite une comptabilité précise.",
      },
      {
        id: "fisc-03",
        text: "Vérifier si le déficit foncier est imputable : plafond 10 700 €/an sur le revenu global",
        category: "Régime fiscal location nue",
        tip: "Le déficit au-delà du plafond est reportable sur les revenus fonciers des 10 années suivantes.",
      },
      {
        id: "fisc-04",
        text: "LMNP régime micro-BIC : abattement 50 % (71 % pour meublé de tourisme classé)",
        category: "Régime fiscal location meublée",
        tip: "Applicable si CA < 77 700 € (meublé classique) ou 188 700 € (meublé de tourisme classé).",
      },
      {
        id: "fisc-05",
        text: "LMNP régime réel : amortir le bien sur 25-40 ans + amortir les meubles sur 5-10 ans",
        category: "Régime fiscal location meublée",
        tip: "L'amortissement du bien (hors terrain) génère un déficit BIC chronique qui réduit ou annule l'imposition des loyers. Très puissant.",
      },
      {
        id: "fisc-06",
        text: "Vérifier le seuil LMP (Loueur Meublé Professionnel) : > 23 000 €/an ET > 50 % des revenus du foyer",
        category: "Régime fiscal location meublée",
        tip: "Le statut LMP offre l'imputation du déficit sur le revenu global sans plafond, mais impose la cotisation sociale des indépendants (11 %).",
      },
      {
        id: "fisc-07",
        text: "Plus-value résidence principale : exonération totale (calculer si le client peut y résider avant cession)",
        category: "Fiscalité à la revente",
        tip: "Aucune condition de durée pour la résidence principale. Il suffit que ce soit la résidence principale au jour de la vente.",
      },
      {
        id: "fisc-08",
        text: "Plus-value résidence secondaire : 19 % IR + 17,2 % prélèvements sociaux avec abattements pour durée",
        category: "Fiscalité à la revente",
        tip: "Exonération IR totale après 22 ans. Exonération prélèvements sociaux après 30 ans. Calculer la durée optimale de détention avant cession.",
      },
      {
        id: "fisc-09",
        text: "Vérifier les abattements pour durée de détention : 6 % par an de la 6e à la 21e année",
        category: "Fiscalité à la revente",
        tip: "Abattement IR : 6 %/an de 6 à 21 ans, 4 % la 22e année = exonération totale IR à 22 ans. Abattement PS : 1,65 %/an de 6 à 21 ans, 1,6 % la 22e, 9 %/an de 23 à 30 ans.",
      },
      {
        id: "fisc-10",
        text: "Vérifier si la surtaxe sur les plus-values > 50 000 € s'applique (2 % à 6 % selon montant)",
        category: "Fiscalité à la revente",
        tip: "Surtaxe applicable uniquement sur les plus-values nettes > 50 000 €. Elle s'ajoute aux 19 % d'IR.",
      },
      {
        id: "fisc-11",
        text: "Calculer l'impact fiscal d'une donation avant cession vs vente directe",
        category: "Fiscalité à la revente",
        tip: "Une donation avant cession peut permettre d'effacer la plus-value en transmettant au prix du marché — strategy à valider avec un notaire.",
      },
    ],
  },
  {
    id: "cl-trans-crm",
    moduleSlug: "transaction",
    lessonSlug: "crm",
    title: "Checklist pilotage CRM hebdomadaire",
    description:
      "Routine hebdomadaire pour maintenir votre pipeline en bonne santé et ne jamais laisser un contact sans suite.",
    icon: "📊",
    categories: ["Pipeline actif", "Relances", "Reporting"],
    items: [
      {
        id: "crm-01",
        text: "Vérifier les contacts sans activité depuis +14 jours et planifier une relance",
        category: "Pipeline actif",
        tip: "Un contact sans interaction pendant 2 semaines risque de partir vers un concurrent.",
      },
      {
        id: "crm-02",
        text: "Mettre à jour le statut de chaque opportunité (froid/tiède/chaud)",
        category: "Pipeline actif",
        tip: "Un CRM à jour prend 10 min/jour et évite de perdre des mandats faute de suivi.",
      },
      {
        id: "crm-03",
        text: "Enregistrer tous les appels et RDV de la semaine écoulée",
        category: "Pipeline actif",
        tip: "La traçabilité est cruciale : en cas de litige, les historiques CRM font foi.",
      },
      {
        id: "crm-04",
        text: "Envoyer les relances automatiques prévues (email + SMS)",
        category: "Relances",
        tip: "Personnalisez toujours le premier paragraphe — les templates génériques ont un taux d'ouverture 3× inférieur.",
      },
      {
        id: "crm-05",
        text: "Rappeler les vendeurs dont l'estimation date de +30 jours sans mandat signé",
        category: "Relances",
        tip: "Proposez une 2e estimation gratuite avec les nouvelles données marché — c'est un prétexte de contact professionnel.",
      },
      {
        id: "crm-06",
        text: "Calculer le taux de conversion RDV → mandat de la semaine",
        category: "Reporting",
        tip: "Si ce taux passe sous 20 %, analysez les objections récurrentes et travaillez votre pitch.",
      },
      {
        id: "crm-07",
        text: "Identifier les 3 contacts les plus chauds et planifier une action prioritaire",
        category: "Reporting",
        tip: "La loi de Pareto s'applique : 20 % de vos contacts génèrent 80 % de votre CA.",
      },
      {
        id: "crm-08",
        text: "Archiver les contacts inactifs depuis +6 mois dans un segment 'dormants'",
        category: "Reporting",
        tip: "Réactivez les dormants avec une campagne ciblée 1× par trimestre (marché local, prix au m²).",
      },
    ],
  },
  {
    id: "cl-ter-arg",
    moduleSlug: "terrain",
    lessonSlug: "argumentaire",
    title: "Checklist préparation argumentaire vendeur",
    description:
      "Tous les éléments à préparer avant un rendez-vous vendeur pour construire un argumentaire percutant et personnalisé.",
    icon: "🎯",
    categories: ["Préparation marché", "Arguments personnalisés", "Réponses aux objections"],
    items: [
      {
        id: "arg-01",
        text: "Compiler 3 ventes comparables récentes dans le secteur (prix, surface, délai)",
        category: "Préparation marché",
        tip: "Les comparables doivent dater de moins de 6 mois et être dans un rayon de 500 m maximum.",
      },
      {
        id: "arg-02",
        text: "Calculer le net vendeur avec et sans agence pour préparer l'argument honoraires",
        category: "Arguments personnalisés",
        tip: "Présentez toujours en 'net vendeur' — jamais en montrant seulement le pourcentage.",
      },
      {
        id: "arg-03",
        text: "Préparer le rapport marché local (délai moyen, stocks, offre/demande)",
        category: "Préparation marché",
        tip: "Un vendeur convaincu par les données chiffres signe plus vite qu'un vendeur convaincu par le charme.",
      },
      {
        id: "arg-04",
        text: "Identifier les motivations profondes du vendeur (divorce, succession, mutation, retraite)",
        category: "Arguments personnalisés",
        tip: "La motivation détermine le levier : urgence temporelle → exclusif court, patrimonial → prix maximum.",
      },
      {
        id: "arg-05",
        text: "Préparer 5 réponses aux objections classiques (prix trop bas, trop cher d'honoraires, je vends seul)",
        category: "Réponses aux objections",
        tip: "Anticipez toujours 'pourquoi pas moins ?' — répondez avec des données, jamais avec de l'affect.",
      },
      {
        id: "arg-06",
        text: "Préparer un mini book visuel (ventes réalisées, témoignages clients, certifications)",
        category: "Arguments personnalisés",
        tip: "La preuve sociale est votre meilleur argument : un client satisfait vaut 100 discours.",
      },
      {
        id: "arg-07",
        text: "Vérifier la concurrence présente sur le secteur et leurs délais de vente",
        category: "Préparation marché",
        tip: "Si vos concurrents ont des biens similaires invendus depuis 90+ jours, c'est un argument fort sur le bon prix.",
      },
    ],
  },
  {
    id: "cl-ter-fid",
    moduleSlug: "terrain",
    lessonSlug: "fidelisation",
    title: "Checklist programme de fidélisation client",
    description:
      "Actions concrètes pour transformer vos acheteurs en ambassadeurs actifs et générer des recommandations régulières.",
    icon: "🌟",
    categories: ["Post-vente immédiat", "Suivi long terme", "Programme ambassadeur"],
    items: [
      {
        id: "fid-01",
        text: "Envoyer un email de remerciement personnalisé dans les 24h après la signature",
        category: "Post-vente immédiat",
        tip: "Mentionnez un détail spécifique de leur projet — cela montre que vous les avez vraiment écoutés.",
      },
      {
        id: "fid-02",
        text: "Offrir un cadeau de bienvenue symbolique (bouteille, livre sur le quartier, bon cadeau)",
        category: "Post-vente immédiat",
        tip: "Le budget importe peu — c'est le geste qui déclenche la réciprocité et la recommandation.",
      },
      {
        id: "fid-03",
        text: "Appeler à J+30 pour savoir comment se passe l'emménagement et recueillir un avis Google",
        category: "Post-vente immédiat",
        tip: "J+30 est le pic de satisfaction — c'est le moment idéal pour demander un avis en ligne.",
      },
      {
        id: "fid-04",
        text: "Intégrer le client dans votre CRM avec segment 'acheteur fidélisé' et rappel annuel",
        category: "Suivi long terme",
        tip: "Programmez un rappel à J+365 (anniversaire de l'achat) pour un appel de prise de nouvelles.",
      },
      {
        id: "fid-05",
        text: "Envoyer la newsletter trimestrielle marché local (prix au m², tendances)",
        category: "Suivi long terme",
        tip: "La newsletter doit être hyper-locale : parlez du quartier du client, pas du marché national.",
      },
      {
        id: "fid-06",
        text: "Contacter en priorité les clients dont la durée de détention dépasse 5 ans (potentiel revendeur)",
        category: "Suivi long terme",
        tip: "Après 5 ans, la plus-value est souvent significative — c'est le bon moment pour évoquer un projet de revente.",
      },
      {
        id: "fid-07",
        text: "Mettre en place un programme de parrainage avec contrepartie (bon d'achat, commission)",
        category: "Programme ambassadeur",
        tip: "Un programme de parrainage actif peut générer 25 à 40 % de vos nouveaux mandats sans prospection.",
      },
      {
        id: "fid-08",
        text: "Demander explicitement une recommandation lors de chaque appel de suivi",
        category: "Programme ambassadeur",
        tip: "La question magique : 'Connaissez-vous quelqu'un qui envisage de vendre ou d'acheter dans les prochains mois ?'",
      },
    ],
  },
  {
    id: "cl-mkt-rsx",
    moduleSlug: "marketing",
    lessonSlug: "reseaux",
    title: "Checklist stratégie réseaux sociaux immobilier",
    description:
      "Cadre de publication hebdomadaire pour construire une présence locale forte sur Instagram et LinkedIn.",
    icon: "📱",
    categories: ["Planification contenu", "Publication", "Engagement & Analyse"],
    items: [
      {
        id: "rsx-01",
        text: "Planifier 4 publications pour la semaine (bien, conseil, marché, coulisses)",
        category: "Planification contenu",
        tip: "La règle 80/20 : 80 % de contenu utile/informatif, 20 % promotionnel. Évitez le full-commercial qui fait fuir.",
      },
      {
        id: "rsx-02",
        text: "Préparer les visuels avec la charte graphique de l'agence (couleurs, logo, police)",
        category: "Planification contenu",
        tip: "Canva Pro avec vos templates préenregistrés permet de produire un visuel professionnel en 5 min.",
      },
      {
        id: "rsx-03",
        text: "Rédiger les légendes avec 3-5 hashtags locaux pertinents (#immobilierLyon #appartementParis etc.)",
        category: "Planification contenu",
        tip: "Utilisez des hashtags de niche locale plutôt que #immobilier (trop concurrentiel) — visez 10 000-100 000 posts.",
      },
      {
        id: "rsx-04",
        text: "Publier à heures optimales : 7h-8h ou 12h-13h ou 18h-20h selon votre audience",
        category: "Publication",
        tip: "Analysez vos insights sur 30 jours pour identifier les pics d'engagement spécifiques à votre audience.",
      },
      {
        id: "rsx-05",
        text: "Répondre à tous les commentaires et messages dans les 2h suivant la publication",
        category: "Engagement & Analyse",
        tip: "L'algorithme Instagram booste les publications avec des interactions rapides dans la première heure.",
      },
      {
        id: "rsx-06",
        text: "Analyser les 3 publications les plus performantes du mois et dupliquer le format",
        category: "Engagement & Analyse",
        tip: "Ne réinventez pas ce qui fonctionne : identifiez votre 'contenu signature' et déclinez-le.",
      },
      {
        id: "rsx-07",
        text: "Contacter en DM les profils qui ont liké votre contenu et n'ont pas encore interagi directement",
        category: "Engagement & Analyse",
        tip: "Un message privé personnalisé ('J'ai vu que vous habitez le 7e...') convertit 10× mieux qu'une pub payante.",
      },
    ],
  },
  // ─── terrain / r0-r1-r2 ──────────────────────────────────────────
  {
    id: "cl-ter-r0r1r2",
    moduleSlug: "terrain",
    lessonSlug: "r0-r1-r2",
    title: "Checklist prise de mandat R0 / R1 / R2",
    description:
      "Les 3 rendez-vous structurés pour décrocher un mandat exclusif sans improvisation.",
    icon: "🗓️",
    categories: ["R0 — Qualification téléphonique", "R1 — Visite du bien", "R2 — Présentation & signature"],
    items: [
      {
        id: "r0-01",
        text: "R0 — Demander la motivation réelle de la vente (déménagement, succession, mutation, divorce)",
        category: "R0 — Qualification téléphonique",
        tip: "La motivation détermine l'urgence. Un vendeur pressé est plus ouvert sur le prix qu'un vendeur patient.",
      },
      {
        id: "r0-02",
        text: "R0 — Identifier le délai souhaité pour vendre",
        category: "R0 — Qualification téléphonique",
        tip: "Vendeur qui veut vendre 'dans 3 mois' = prospect chaud. 'Pas pressé' = risque de surévaluation.",
      },
      {
        id: "r0-03",
        text: "R0 — Vérifier si d'autres agences ont déjà été contactées (et depuis combien de temps)",
        category: "R0 — Qualification téléphonique",
        tip: "Un bien en mandat simple depuis 6 mois signale un problème de prix ou de stratégie. À prendre en compte dans votre approche.",
      },
      {
        id: "r0-04",
        text: "R0 — Demander le prix envisagé par le vendeur",
        category: "R0 — Qualification téléphonique",
        tip: "Ne jamais commenter ce prix au R0 — notez-le pour calibrer votre argumentation au R2.",
      },
      {
        id: "r0-05",
        text: "R0 — Comprendre le projet derrière la vente (rachat, donation, remboursement)",
        category: "R0 — Qualification téléphonique",
        tip: "Un projet fort derrière la vente crée un contexte émotionnel favorable à la décision rapide.",
      },
      {
        id: "r1-01",
        text: "R1 — Mesurer la surface habitable et les pièces (même si plans disponibles)",
        category: "R1 — Visite du bien",
        tip: "Une erreur de surface > 5 % peut invalider le mandat ou déclencher une réduction du prix (loi Carrez).",
      },
      {
        id: "r1-02",
        text: "R1 — Photographier atouts ET défauts (ne rien masquer)",
        category: "R1 — Visite du bien",
        tip: "Les défauts photographiés servent à justifier le prix d'estimation. Les masquer nuit à votre crédibilité.",
      },
      {
        id: "r1-03",
        text: "R1 — Appliquer la méthode SONCAS pour profiler le vendeur",
        category: "R1 — Visite du bien",
        tip: "Sécurité, Orgueil, Nouveauté, Confort, Argent, Sympathie — identifiez les 2 leviers dominants.",
      },
      {
        id: "r1-04",
        text: "R1 — NE PAS annoncer de prix lors de cette visite, même si le vendeur insiste",
        category: "R1 — Visite du bien",
        tip: "Réponse type : 'Je préfère vous donner une estimation précise et argumentée. Puis-je revenir vendredi avec une présentation complète ?'",
      },
      {
        id: "r1-05",
        text: "R1 — Fixer le RDV R2 avant de quitter le bien",
        category: "R1 — Visite du bien",
        tip: "Ne partez jamais sans date confirmée pour le R2. Un R1 sans R2 planifié est un mandat perdu.",
      },
      {
        id: "r2-01",
        text: "R2 — Préparer 5 à 8 comparables de ventes réelles (DVF, notaires) de moins de 6 mois",
        category: "R2 — Présentation & signature",
        tip: "Présentez les comparables AVANT votre prix — laissez les données marché ancrer la valeur.",
      },
      {
        id: "r2-02",
        text: "R2 — Préparer votre plan de commercialisation (canaux, délai estimé, stratégie de prix)",
        category: "R2 — Présentation & signature",
        tip: "Un plan détaillé différencie l'agent professionnel de celui qui 'met juste une annonce sur SeLoger'.",
      },
      {
        id: "r2-03",
        text: "R2 — Apporter le mandat de vente pré-rempli, prêt à signer",
        category: "R2 — Présentation & signature",
        tip: "Venir sans le mandat oblige à reprogrammer un RDV — vous perdez 30 % des signatures ainsi.",
      },
      {
        id: "r2-04",
        text: "R2 — Si le vendeur surévalue : présenter les données chiffrées et demander 'sur quoi vous basez-vous ?'",
        category: "R2 — Présentation & signature",
        tip: "Ne jamais contredire directement. Laissez le vendeur exposer son raisonnement, puis réfutez point par point avec des preuves.",
      },
    ],
  },

  // ─── terrain / découverte client ─────────────────────────────────
  {
    id: "cl-ter-decouverte",
    moduleSlug: "terrain",
    lessonSlug: "decouverte-client",
    title: "Checklist découverte acquéreur",
    description:
      "Questions et points à valider lors du rendez-vous de découverte pour comprendre les vrais besoins de l'acquéreur.",
    icon: "🎯",
    categories: ["Contexte de vie", "Critères absolus", "Finances & freins"],
    items: [
      {
        id: "dec-01",
        text: "Demander depuis combien de temps l'acquéreur est en recherche",
        category: "Contexte de vie",
        tip: "Recherche > 6 mois sans achat = critères probablement inadaptés au budget. Requalifier entièrement.",
      },
      {
        id: "dec-02",
        text: "Comprendre la situation locative actuelle (propriétaire à revendre, locataire, hébergé)",
        category: "Contexte de vie",
        tip: "Un propriétaire à revendre est conditionné par sa propre vente. Anticipez les délais.",
      },
      {
        id: "dec-03",
        text: "Identifier les personnes qui vivront dans le bien (enfants, parents, colocataires)",
        category: "Contexte de vie",
        tip: "La composition du foyer révèle des besoins non formulés : école proche, accessibilité, taille des chambres.",
      },
      {
        id: "dec-04",
        text: "Demander : 'Si vous deviez garder un seul critère, ce serait lequel ?'",
        category: "Critères absolus",
        tip: "Cette question révèle le vrai deal-breaker. Souvent très différent des critères initiaux exprimés.",
      },
      {
        id: "dec-05",
        text: "Demander : 'Y a-t-il quelque chose que vous refusez absolument, sans exception ?'",
        category: "Critères absolus",
        tip: "Les deal-breakers négatifs (pas de rez-de-chaussée, pas de rue passante) sont aussi importants que les positifs.",
      },
      {
        id: "dec-06",
        text: "Demander les biens visités précédemment et ce qui a plu / déplu",
        category: "Critères absolus",
        tip: "L'analyse des visites passées est le meilleur indicateur des besoins réels — plus fiable que les déclarations.",
      },
      {
        id: "dec-07",
        text: "Valider le budget total incluant frais de notaire, travaux et mobilier",
        category: "Finances & freins",
        tip: "Le 'budget' annoncé est souvent le prix net vendeur — n'oubliez pas d'ajouter 7-8 % pour les frais de notaire.",
      },
      {
        id: "dec-08",
        text: "Vérifier si un accord de principe bancaire ou un passage chez un courtier a eu lieu",
        category: "Finances & freins",
        tip: "Un acquéreur sans accord de principe n'est pas qualifié. Ne faites pas visiter avant cette validation.",
      },
      {
        id: "dec-09",
        text: "Demander : 'Qu'est-ce qui vous ferait hésiter à faire une offre sur un bien qui correspond à vos critères ?'",
        category: "Finances & freins",
        tip: "Cette question anticipe les objections futures et vous permet de les traiter avant la visite.",
      },
      {
        id: "dec-10",
        text: "Mettre à jour la fiche acquéreur dans le CRM avec les résultats de la découverte",
        category: "Finances & freins",
        tip: "Une fiche découverte à jour permet de proposer des biens pertinents et d'éviter le 'tourisme immobilier'.",
      },
    ],
  },

  {
    id: "cl-mkt-seo",
    moduleSlug: "marketing",
    lessonSlug: "seo",
    title: "Checklist SEO local immobilier",
    description:
      "Actions mensuelles pour améliorer le référencement naturel de votre agence et capter des prospects vendeurs qualifiés.",
    icon: "🔍",
    categories: ["Google Business", "Contenu & Mots-clés", "Technique & Liens"],
    items: [
      {
        id: "seo-01",
        text: "Mettre à jour votre fiche Google Business Profile (horaires, photos récentes, services)",
        category: "Google Business",
        tip: "Une fiche GBP complète et active génère 7× plus de contacts que la moyenne — c'est votre vitrine locale n°1.",
      },
      {
        id: "seo-02",
        text: "Publier 1 post Google Business par semaine (actualité marché, nouveau bien, témoignage)",
        category: "Google Business",
        tip: "Les posts GBP disparaissent après 7 jours — publiez régulièrement pour rester visible dans la recherche locale.",
      },
      {
        id: "seo-03",
        text: "Répondre à tous les avis Google (positifs et négatifs) sous 48h",
        category: "Google Business",
        tip: "Répondre aux avis négatifs avec professionnalisme booste votre réputation plus que les seuls avis positifs.",
      },
      {
        id: "seo-04",
        text: "Publier 1 article de blog ciblant un mot-clé local ('appartement à vendre [ville] [quartier]')",
        category: "Contenu & Mots-clés",
        tip: "Utilisez Ubersuggest ou Google Search Console pour identifier les requêtes déjà positionnées et les améliorer.",
      },
      {
        id: "seo-05",
        text: "Optimiser les balises title et meta-description des 3 pages les plus visitées",
        category: "Contenu & Mots-clés",
        tip: "Une meta-description bien rédigée peut doubler le taux de clic sans bouger en classement.",
      },
      {
        id: "seo-06",
        text: "Vérifier les Core Web Vitals du site (vitesse, stabilité) via Google PageSpeed Insights",
        category: "Technique & Liens",
        tip: "Un site qui charge en +3s perd 50 % de ses visiteurs mobiles avant même d'avoir vu votre contenu.",
      },
      {
        id: "seo-07",
        text: "Obtenir 1-2 liens entrants locaux (presse locale, mairie, partenaires) par trimestre",
        category: "Technique & Liens",
        tip: "Un lien d'un site d'autorité locale (journaux.fr, ville.fr) vaut 100 liens de sites génériques.",
      },
      {
        id: "seo-08",
        text: "Vérifier que toutes les annonces sont bien indexées et les soumettre à Google Search Console",
        category: "Technique & Liens",
        tip: "Les fiches de biens non-indexées sont invisibles sur Google — vérifiez mensuellement via la console.",
      },
    ],
  },
];

export function getProChecklists(
  moduleSlug: string,
  lessonSlug: string,
): ProChecklist[] {
  return PRO_CHECKLISTS.filter(
    (c) => c.moduleSlug === moduleSlug && c.lessonSlug === lessonSlug,
  );
}
