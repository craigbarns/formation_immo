export const ORGANIZATION = {
  name: "PASS Formation",
  address: "6 rue Maurice Caunes, 31200 Toulouse",
  siret: "51760378300047",
  activityDeclarationNumber: "73310551631",
  prefectureRegion: "Occitanie",
  email: "contact@passformation.com",
  phone: "+33 9 54 46 77 73",
};

export const REPRESENTATIVE = {
  name: process.env.REPRESENTATIVE_NAME || "Jérémy MARTIN",
};

export const FORMATION = {
  title: "Formation Agent Immobilier – Loi ALUR",
  modality: "Distanciel (e-learning)",
  durationHours: 42,
  durationDays: 7,
  location: "Formation à distance",
  objectives: [
    "Maîtriser les fondamentaux du droit immobilier et de la déontologie professionnelle",
    "Acquérir les techniques de vente, de négociation et de prospection immobilière",
    "Comprendre et appliquer les règles de la gestion locative et du droit des baux",
    "Connaître les dispositifs fiscaux et les mécanismes de financement immobilier",
    "Maîtriser les règles d'urbanisme, de copropriété et d'évaluation des biens",
  ],
  modules: [
    {
      slug: "module1",
      title: "Déontologie, RGPD et droit immobilier",
      durationHours: 9,
      modality: "E-learning",
    },
    {
      slug: "module2",
      title: "Techniques de vente et négociation",
      durationHours: 9,
      modality: "E-learning",
    },
    {
      slug: "module3",
      title: "Gestion locative et droit des baux",
      durationHours: 8,
      modality: "E-learning",
    },
    {
      slug: "module4",
      title: "Fiscalité et financement immobilier",
      durationHours: 8,
      modality: "E-learning",
    },
    {
      slug: "module5",
      title: "Copropriété, urbanisme et évaluation",
      durationHours: 8,
      modality: "E-learning",
    },
  ],
  programItems: [
    {
      moduleTitle: "Déontologie, RGPD et droit immobilier",
      items: [
        "Loi Hoguet et obligations légales des professionnels de l'immobilier",
        "Code de déontologie et éthique professionnelle",
        "Protection des données personnelles (RGPD) en immobilier",
        "Lutte contre le blanchiment de capitaux (LCB-FT)",
        "Obligations de formation continue – Loi ALUR",
        "Responsabilités civile et pénale de l'agent immobilier",
      ],
    },
    {
      moduleTitle: "Techniques de vente et négociation",
      items: [
        "Prospection et acquisition de mandats",
        "Estimation et valorisation des biens immobiliers",
        "Techniques de négociation et de closing",
        "Rédaction du compromis et de la promesse de vente",
        "Accompagnement de l'acheteur et du vendeur",
        "Outils digitaux et marketing immobilier",
      ],
    },
    {
      moduleTitle: "Gestion locative et droit des baux",
      items: [
        "Loi du 6 juillet 1989 et ses évolutions",
        "Rédaction et gestion du contrat de bail",
        "État des lieux d'entrée et de sortie",
        "Gestion des charges locatives et quittancement",
        "Procédures d'expulsion et contentieux locatif",
        "Encadrement des loyers et dispositifs fiscaux locatifs",
      ],
    },
    {
      moduleTitle: "Fiscalité et financement immobilier",
      items: [
        "Fiscalité des revenus fonciers et plus-values immobilières",
        "Dispositifs de défiscalisation (Pinel, Denormandie, etc.)",
        "Financement immobilier : prêts, PTZ, garanties",
        "Assurances obligatoires et complémentaires",
        "TVA immobilière et droits d'enregistrement",
        "Optimisation fiscale pour les investisseurs",
      ],
    },
    {
      moduleTitle: "Copropriété, urbanisme et évaluation",
      items: [
        "Statut de la copropriété et loi du 10 juillet 1965",
        "Fonctionnement du syndicat de copropriétaires",
        "Règles d'urbanisme : PLU, permis de construire, déclarations",
        "Méthodes d'évaluation et d'estimation immobilière",
        "Diagnostics immobiliers obligatoires (DPE, amiante, plomb…)",
        "Accessibilité, performance énergétique et rénovation",
      ],
    },
  ],
};
