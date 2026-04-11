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

  // ─── 10. financement / dispositifs ────────────────────────────────
  {
    id: "cl-fin-dis",
    moduleSlug: "financement",
    lessonSlug: "dispositifs",
    title: "Checklist dispositifs fiscaux",
    description:
      "Panorama des principaux dispositifs de defiscalisation immobiliere et leurs conditions.",
    icon: "💰",
    categories: [
      "Dispositifs pour le neuf",
      "Dispositifs pour l'ancien",
      "Verification eligibilite",
    ],
    items: [
      {
        id: "fd-01",
        text: "Dispositif Pinel : reduction d'impot sur le revenu (6, 9 ou 12 ans)",
        category: "Dispositifs pour le neuf",
        tip: "Verifiez les plafonds de loyer et de ressources du locataire selon la zone (A, A bis, B1).",
      },
      {
        id: "fd-02",
        text: "Pinel Plus : bonus pour les logements BBC ou quartiers prioritaires",
        category: "Dispositifs pour le neuf",
        tip: "Taux majores par rapport au Pinel classique. Le logement doit respecter le RE2020.",
      },
      {
        id: "fd-03",
        text: "Dispositif Denormandie : renovation dans l'ancien en centre-ville",
        category: "Dispositifs pour l'ancien",
        tip: "Les travaux doivent representer au moins 25 % du cout total de l'operation.",
      },
      {
        id: "fd-04",
        text: "Statut LMNP : Loueur en Meuble Non Professionnel",
        category: "Dispositifs pour l'ancien",
        tip: "Le regime reel permet d'amortir le bien et de deduire toutes les charges. Tres avantageux.",
      },
      {
        id: "fd-05",
        text: "Deficit foncier : imputation sur le revenu global jusqu'a 10 700 euros/an",
        category: "Dispositifs pour l'ancien",
        tip: "Les travaux d'amelioration et de reparation sont deductibles. Pas les travaux de construction.",
      },
      {
        id: "fd-06",
        text: "Loi Malraux : reduction pour renovation en secteur sauvegarde",
        category: "Dispositifs pour l'ancien",
        tip: "Reduction de 22 a 30 % du montant des travaux. Plafond de 400 000 euros sur 4 ans.",
      },
      {
        id: "fd-07",
        text: "Verifier les zones eligibles pour chaque dispositif",
        category: "Verification eligibilite",
        tip: "Utilisez le simulateur du gouvernement pour verifier l'eligibilite d'une adresse precise.",
      },
      {
        id: "fd-08",
        text: "Verifier les plafonds de ressources des locataires",
        category: "Verification eligibilite",
        tip: "Les plafonds varient selon la composition du foyer et la zone geographique.",
      },
      {
        id: "fd-09",
        text: "Calculer le rendement net apres avantage fiscal",
        category: "Verification eligibilite",
        tip: "Integrez toutes les charges, la vacance locative et la fiscalite dans votre calcul.",
      },
      {
        id: "fd-10",
        text: "Verifier la duree minimale d'engagement de location",
        category: "Verification eligibilite",
        tip: "Le non-respect de l'engagement de location entraine la reprise de l'avantage fiscal.",
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
