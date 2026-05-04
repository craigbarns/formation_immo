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
  name: process.env.REPRESENTATIVE_NAME || "CRESPO Mike",
};

export const FORMATION = {
  title: "Formation Agent Immobilier – Loi ALUR",
  modality: "Distanciel (e-learning)",
  durationHours: 42,
  durationDays: 7,
  location: "Formation à distance",
  objectives: [
    "Maîtriser le cadre juridique et les obligations de conformité ALUR 2026",
    "Acquérir les techniques de transaction, d'estimation et de négociation immobilière",
    "Comprendre les mécanismes de financement et d'optimisation fiscale",
    "Maîtriser le marketing digital appliqué à l'immobilier",
    "Conduire des visites et des closings professionnels",
    "Exercer avec intégrité : déontologie, non-discrimination et éthique professionnelle",
  ],
  modules: [
    {
      slug: "juridique",
      title: "Module 1 — Juridique & conformité",
      durationHours: 8,
      modality: "Distanciel Asynchrone",
    },
    {
      slug: "transaction",
      title: "Module 2 — Transaction & négociation",
      durationHours: 7,
      modality: "Distanciel Asynchrone",
    },
    {
      slug: "financement",
      title: "Module 3 — Financement & fiscalité",
      durationHours: 8,
      modality: "Distanciel Asynchrone",
    },
    {
      slug: "marketing",
      title: "Module 4 — Marketing digital",
      durationHours: 7,
      modality: "Distanciel Asynchrone",
    },
    {
      slug: "terrain",
      title: "Module 5 — Visite, closing & fidélisation",
      durationHours: 8,
      modality: "Distanciel Asynchrone",
    },
    {
      slug: "deontologie",
      title: "Module 6 — Déontologie & Non Discrimination",
      durationHours: 4,
      modality: "Distanciel Asynchrone",
    },
  ],
  programItems: [
    {
      moduleTitle: "Module 1 — Juridique & conformité",
      items: [
        "Loi ALUR 2026 — obligations, sanctions et nouvelles règles DPE",
        "Rédaction sécurisée du compromis de vente et conditions suspensives",
        "Diagnostics immobiliers obligatoires (DPE, amiante, plomb, ERP…)",
        "Stratégie mandats : exclusif, simple, semi-exclusif",
        "Copropriété : statut, syndicat, règlement, charges",
        "Droit des successions et indivision en immobilier",
      ],
    },
    {
      moduleTitle: "Module 2 — Transaction & négociation",
      items: [
        "Estimation et méthodes de valorisation des biens",
        "Prospection : pige, boîtage, réseaux, recommandations",
        "Techniques de prise de mandat exclusif",
        "Négociation avancée et gestion des objections",
        "CRM immobilier et suivi de portefeuille clients",
        "Outils d'aide à la décision pour acquéreurs et vendeurs",
      ],
    },
    {
      moduleTitle: "Module 3 — Financement & fiscalité",
      items: [
        "Crédit immobilier 2026 : taux, PTZ, garanties",
        "Fiscalité des revenus fonciers et plus-values",
        "Dispositifs de défiscalisation (Pinel, Denormandie, Malraux…)",
        "Calcul de rentabilité locative brute et nette",
        "Assurances obligatoires : PNO, GLI, RC professionnelle",
        "TVA immobilière et droits d'enregistrement",
      ],
    },
    {
      moduleTitle: "Module 4 — Marketing digital",
      items: [
        "Photographie professionnelle et home staging virtuel",
        "Rédaction d'annonces à fort taux de conversion",
        "Maîtrise des portails (SeLoger, LeBonCoin, PAP…)",
        "Stratégie réseaux sociaux et personal branding",
        "Référencement Google local (GMB, SEO de proximité)",
        "Vidéo immobilière et visite virtuelle 360°",
      ],
    },
    {
      moduleTitle: "Module 5 — Visite, closing & fidélisation",
      items: [
        "Conduite de visite professionnelle et découverte acquéreur",
        "Argumentaire de vente et traitement des objections",
        "Techniques de closing et sécurisation de l'offre",
        "Rédaction et suivi de la promesse de vente",
        "Accompagnement jusqu'à l'acte authentique",
        "Fidélisation active et génération de recommandations",
      ],
    },
    {
      moduleTitle: "Module 6 — Déontologie & Non Discrimination",
      items: [
        "Code de déontologie — décret 2015-1090 et ses 10 principes",
        "Non-discrimination à l'accès au logement (25 critères, art. 225-1 CP)",
        "Gestion des conflits d'intérêts et transparence",
        "Lutte contre le blanchiment de capitaux (LCB-FT)",
        "Responsabilités civile, disciplinaire et pénale de l'agent",
        "Mises en situation : cas pratiques d'éthique professionnelle",
      ],
    },
  ],
};
