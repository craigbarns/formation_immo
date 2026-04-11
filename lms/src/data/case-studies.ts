/**
 * Etudes de cas interactives — analyse de scenarios immobiliers avec calculs.
 * Chaque etude presente un bien et demande a l'apprenant de remplir des champs numeriques.
 */

export type CaseStudyField = {
  id: string;
  label: string;
  unit: string;
  correctValue: number;
  tolerance: number;
  hint?: string;
};

export type CaseStudy = {
  id: string;
  moduleSlug: string;
  lessonSlug: string;
  title: string;
  description: string;
  propertyDetails: { label: string; value: string }[];
  questions: CaseStudyField[];
  explanation: string;
};

const ALL_CASE_STUDIES: CaseStudy[] = [
  // ─── Module 1 : Juridique ─────────────────────────────────────────
  {
    id: "cs-jur-01",
    moduleSlug: "juridique",
    lessonSlug: "compromis",
    title: "Compromis de vente — calcul des sommes et délais",
    description:
      "M. et Mme Lefèvre achètent un appartement T4 à Bordeaux. Le compromis est signé le 15 mars 2026 chez le notaire. Le prix convenu est de 285 000 €. L'agence perçoit des honoraires de 4 % à la charge de l'acquéreur. Un séquestre de 5 % du prix de vente est demandé. Calculez les montants clés de cette transaction.",
    propertyDetails: [
      { label: "Type de bien", value: "Appartement T4" },
      { label: "Localisation", value: "Bordeaux centre" },
      { label: "Surface", value: "85 m²" },
      { label: "Prix de vente", value: "285 000 €" },
      { label: "Honoraires agence", value: "4 % charge acquéreur" },
      { label: "Date compromis", value: "15 mars 2026" },
    ],
    questions: [
      {
        id: "cs-jur-01-q1",
        label: "Montant des honoraires d'agence",
        unit: "€",
        correctValue: 11400,
        tolerance: 0,
        hint: "Prix de vente x taux d'honoraires",
      },
      {
        id: "cs-jur-01-q2",
        label: "Prix FAI (frais d'agence inclus)",
        unit: "€",
        correctValue: 296400,
        tolerance: 0,
        hint: "Prix de vente + honoraires",
      },
      {
        id: "cs-jur-01-q3",
        label: "Montant du séquestre",
        unit: "€",
        correctValue: 14250,
        tolerance: 50,
        hint: "5 % du prix de vente hors honoraires",
      },
      {
        id: "cs-jur-01-q4",
        label: "Fin du délai de rétractation (jour du mois)",
        unit: "jour",
        correctValue: 25,
        tolerance: 0,
        hint: "10 jours calendaires après la signature du compromis",
      },
    ],
    explanation:
      "Les honoraires s'élèvent à 285 000 x 4 % = 11 400 €. Le prix FAI est donc 285 000 + 11 400 = 296 400 €. Le séquestre représente 5 % de 285 000 = 14 250 €. Le délai de rétractation SRU de 10 jours court à partir du lendemain de la notification : du 16 au 25 mars 2026.",
  },
  {
    id: "cs-jur-02",
    moduleSlug: "juridique",
    lessonSlug: "copropriete",
    title: "Budget copropriété — répartition des charges",
    description:
      "Vous analysez un lot en copropriété pour un client investisseur. L'immeuble comporte 50 lots avec un budget prévisionnel annuel de 120 000 €. Le lot visé représente 45 tantièmes sur un total de 1 000. Des travaux de ravalement sont votés pour 80 000 € répartis au prorata des tantièmes. Calculez la quote-part annuelle et les travaux.",
    propertyDetails: [
      { label: "Nombre de lots", value: "50" },
      { label: "Tantièmes du lot", value: "45 / 1 000" },
      { label: "Budget prévisionnel", value: "120 000 € / an" },
      { label: "Travaux ravalement", value: "80 000 €" },
      { label: "Type de lot", value: "T2 — 38 m²" },
      { label: "Étage", value: "3e avec ascenseur" },
    ],
    questions: [
      {
        id: "cs-jur-02-q1",
        label: "Charges annuelles du lot",
        unit: "€",
        correctValue: 5400,
        tolerance: 0,
        hint: "Budget x (tantièmes du lot / tantièmes totaux)",
      },
      {
        id: "cs-jur-02-q2",
        label: "Charges mensuelles du lot",
        unit: "€/mois",
        correctValue: 450,
        tolerance: 0,
        hint: "Charges annuelles / 12",
      },
      {
        id: "cs-jur-02-q3",
        label: "Quote-part travaux ravalement",
        unit: "€",
        correctValue: 3600,
        tolerance: 0,
        hint: "Montant travaux x (tantièmes du lot / tantièmes totaux)",
      },
    ],
    explanation:
      "Le lot représente 45/1 000 = 4,5 % de la copropriété. Charges annuelles : 120 000 x 4,5 % = 5 400 €, soit 450 €/mois. Quote-part travaux : 80 000 x 4,5 % = 3 600 €. Ces charges sont un critère essentiel pour évaluer la rentabilité d'un investissement locatif.",
  },

  // ─── Module 2 : Transaction ────────────────────────────────────────
  {
    id: "cs-trans-01",
    moduleSlug: "transaction",
    lessonSlug: "estimation",
    title: "Estimation par comparaison — T3 Paris 15e",
    description:
      "Vous devez estimer un appartement T3 de 72 m² situé dans le 15e arrondissement de Paris. Vous avez relevé 3 ventes comparables récentes dans le quartier. Déterminez le prix moyen au m² et les fourchettes d'estimation.",
    propertyDetails: [
      { label: "Type", value: "Appartement T3" },
      { label: "Surface", value: "72 m²" },
      { label: "Localisation", value: "Paris 15e" },
      { label: "Comparable 1", value: "9 200 €/m²" },
      { label: "Comparable 2", value: "9 800 €/m²" },
      { label: "Comparable 3", value: "9 500 €/m²" },
    ],
    questions: [
      {
        id: "cs-trans-01-q1",
        label: "Prix moyen au m²",
        unit: "€/m²",
        correctValue: 9500,
        tolerance: 0,
        hint: "Moyenne arithmétique des 3 comparables",
      },
      {
        id: "cs-trans-01-q2",
        label: "Estimation basse (prix le plus bas x surface)",
        unit: "€",
        correctValue: 662400,
        tolerance: 0,
        hint: "Comparable le plus bas x 72 m²",
      },
      {
        id: "cs-trans-01-q3",
        label: "Estimation haute (prix le plus haut x surface)",
        unit: "€",
        correctValue: 705600,
        tolerance: 0,
        hint: "Comparable le plus haut x 72 m²",
      },
      {
        id: "cs-trans-01-q4",
        label: "Estimation moyenne",
        unit: "€",
        correctValue: 684000,
        tolerance: 0,
        hint: "Prix moyen au m² x surface",
      },
    ],
    explanation:
      "Prix moyen : (9 200 + 9 800 + 9 500) / 3 = 9 500 €/m². Estimation basse : 9 200 x 72 = 662 400 €. Estimation haute : 9 800 x 72 = 705 600 €. Estimation moyenne : 9 500 x 72 = 684 000 €. En pratique, l'agent ajustera selon l'état du bien, l'étage, la luminosité et les prestations.",
  },
  {
    id: "cs-trans-02",
    moduleSlug: "transaction",
    lessonSlug: "negociation-mandat",
    title: "Calcul d'honoraires — mandat exclusif vs simple",
    description:
      "Un propriétaire hésite entre un mandat simple à 5 % et un mandat exclusif à 4 % pour un bien estimé à 350 000 €. Historiquement, un mandat exclusif se vend en moyenne 15 % plus cher qu'un mandat simple dans le secteur. Calculez les honoraires dans chaque scénario et le gain net pour le vendeur.",
    propertyDetails: [
      { label: "Estimation", value: "350 000 €" },
      { label: "Taux mandat simple", value: "5 %" },
      { label: "Taux mandat exclusif", value: "4 %" },
      { label: "Prime exclusif", value: "+15 % sur le prix" },
      { label: "Délai moyen simple", value: "120 jours" },
      { label: "Délai moyen exclusif", value: "60 jours" },
    ],
    questions: [
      {
        id: "cs-trans-02-q1",
        label: "Honoraires en mandat simple",
        unit: "€",
        correctValue: 17500,
        tolerance: 0,
        hint: "350 000 x 5 %",
      },
      {
        id: "cs-trans-02-q2",
        label: "Net vendeur en mandat simple",
        unit: "€",
        correctValue: 332500,
        tolerance: 0,
        hint: "Prix - honoraires mandat simple",
      },
      {
        id: "cs-trans-02-q3",
        label: "Prix de vente estimé en exclusif",
        unit: "€",
        correctValue: 402500,
        tolerance: 500,
        hint: "350 000 x 1,15",
      },
      {
        id: "cs-trans-02-q4",
        label: "Honoraires en mandat exclusif",
        unit: "€",
        correctValue: 16100,
        tolerance: 100,
        hint: "Prix exclusif x 4 %",
      },
      {
        id: "cs-trans-02-q5",
        label: "Net vendeur en mandat exclusif",
        unit: "€",
        correctValue: 386400,
        tolerance: 500,
        hint: "Prix exclusif - honoraires exclusif",
      },
    ],
    explanation:
      "Mandat simple : honoraires 350 000 x 5 % = 17 500 €, net vendeur = 332 500 €. Mandat exclusif : prix estimé 350 000 x 1,15 = 402 500 €, honoraires 402 500 x 4 % = 16 100 €, net vendeur = 386 400 €. Le vendeur gagne 53 900 € de plus en exclusif tout en payant moins d'honoraires. C'est un argument clé pour convaincre un propriétaire.",
  },

  // ─── Module 3 : Financement ────────────────────────────────────────
  {
    id: "cs-fin-01",
    moduleSlug: "financement",
    lessonSlug: "rentabilite",
    title: "Rentabilité locative — Studio à Lyon",
    description:
      "Un investisseur envisage l'achat d'un studio à Lyon 7e pour de la location meublée. Analysez la rentabilité de cet investissement en calculant les indicateurs clés.",
    propertyDetails: [
      { label: "Type", value: "Studio meublé" },
      { label: "Surface", value: "22 m²" },
      { label: "Prix d'achat", value: "120 000 €" },
      { label: "Loyer mensuel", value: "650 €/mois" },
      { label: "Charges annuelles", value: "1 200 €" },
      { label: "Taxe foncière", value: "800 €" },
    ],
    questions: [
      {
        id: "cs-fin-01-q1",
        label: "Revenus locatifs annuels bruts",
        unit: "€",
        correctValue: 7800,
        tolerance: 0,
        hint: "Loyer mensuel x 12",
      },
      {
        id: "cs-fin-01-q2",
        label: "Rendement brut",
        unit: "%",
        correctValue: 6.5,
        tolerance: 0.1,
        hint: "(Loyer annuel / prix d'achat) x 100",
      },
      {
        id: "cs-fin-01-q3",
        label: "Charges totales annuelles",
        unit: "€",
        correctValue: 2000,
        tolerance: 0,
        hint: "Charges copropriété + taxe foncière",
      },
      {
        id: "cs-fin-01-q4",
        label: "Rendement net",
        unit: "%",
        correctValue: 4.83,
        tolerance: 0.1,
        hint: "((Loyer annuel - charges totales) / prix d'achat) x 100",
      },
      {
        id: "cs-fin-01-q5",
        label: "Cashflow mensuel net (avant impôts)",
        unit: "€/mois",
        correctValue: 483,
        tolerance: 5,
        hint: "(Loyer annuel - charges totales) / 12",
      },
    ],
    explanation:
      "Revenus bruts : 650 x 12 = 7 800 €/an. Rendement brut : 7 800 / 120 000 = 6,5 %. Charges totales : 1 200 + 800 = 2 000 €/an. Revenus nets : 7 800 - 2 000 = 5 800 €/an. Rendement net : 5 800 / 120 000 = 4,83 %. Cashflow mensuel : 5 800 / 12 = 483 €/mois. Un rendement net supérieur à 4 % est considéré comme correct pour Lyon.",
  },
  {
    id: "cs-fin-02",
    moduleSlug: "financement",
    lessonSlug: "credit",
    title: "Crédit immobilier — Primo-accédants",
    description:
      "Un couple de primo-accédants souhaite acheter sa résidence principale. Analysez leur capacité d'emprunt et les conditions du crédit proposé par la banque.",
    propertyDetails: [
      { label: "Revenus nets mensuels", value: "4 500 €/mois" },
      { label: "Apport personnel", value: "30 000 €" },
      { label: "Prix du bien", value: "250 000 €" },
      { label: "Taux nominal", value: "3,2 % sur 25 ans" },
      { label: "Assurance", value: "0,34 % du capital" },
      { label: "Frais de notaire", value: "8 % (ancien)" },
    ],
    questions: [
      {
        id: "cs-fin-02-q1",
        label: "Frais de notaire estimés",
        unit: "€",
        correctValue: 20000,
        tolerance: 0,
        hint: "Prix du bien x 8 %",
      },
      {
        id: "cs-fin-02-q2",
        label: "Montant total à financer",
        unit: "€",
        correctValue: 240000,
        tolerance: 0,
        hint: "Prix + frais de notaire - apport",
      },
      {
        id: "cs-fin-02-q3",
        label: "Mensualité hors assurance (approx.)",
        unit: "€/mois",
        correctValue: 1163,
        tolerance: 20,
        hint: "Utilisez la formule de mensualité : M = C x t / (1 - (1+t)^-n) avec t = taux mensuel",
      },
      {
        id: "cs-fin-02-q4",
        label: "Mensualité assurance",
        unit: "€/mois",
        correctValue: 68,
        tolerance: 2,
        hint: "(Capital emprunté x taux assurance) / 12",
      },
      {
        id: "cs-fin-02-q5",
        label: "Taux d'endettement (mensualité totale / revenus)",
        unit: "%",
        correctValue: 27.36,
        tolerance: 1,
        hint: "((Mensualité + assurance) / revenus) x 100 — seuil HCSF : 35 %",
      },
    ],
    explanation:
      "Frais de notaire : 250 000 x 8 % = 20 000 €. Montant à financer : 250 000 + 20 000 - 30 000 = 240 000 €. Mensualité (formule actuarielle, taux mensuel 3,2 %/12) : environ 1 163 €. Assurance : 240 000 x 0,34 % / 12 = 68 €/mois. Taux d'endettement : (1 163 + 68) / 4 500 = 27,36 %. Le couple reste sous le seuil HCSF de 35 %, le dossier est finançable.",
  },
  {
    id: "cs-fin-03",
    moduleSlug: "financement",
    lessonSlug: "fiscalite",
    title: "Plus-value immobilière — Résidence secondaire",
    description:
      "Votre client revend sa résidence secondaire achetée il y a 12 ans. Calculez la plus-value imposable et l'impôt dû en tenant compte des abattements pour durée de détention.",
    propertyDetails: [
      { label: "Prix d'achat", value: "180 000 €" },
      { label: "Prix de revente", value: "310 000 €" },
      { label: "Travaux (forfait 15 %)", value: "Applicable (> 5 ans)" },
      { label: "Durée de détention", value: "12 ans" },
      { label: "Abattement IR/an (6-21 ans)", value: "6 % / an" },
      { label: "Abattement PS/an (6-21 ans)", value: "1,65 % / an" },
    ],
    questions: [
      {
        id: "cs-fin-03-q1",
        label: "Majoration forfaitaire travaux (15 %)",
        unit: "€",
        correctValue: 27000,
        tolerance: 0,
        hint: "Prix d'achat x 15 %",
      },
      {
        id: "cs-fin-03-q2",
        label: "Prix d'achat corrigé",
        unit: "€",
        correctValue: 207000,
        tolerance: 0,
        hint: "Prix d'achat + majoration travaux",
      },
      {
        id: "cs-fin-03-q3",
        label: "Plus-value brute",
        unit: "€",
        correctValue: 103000,
        tolerance: 0,
        hint: "Prix de revente - prix d'achat corrigé",
      },
      {
        id: "cs-fin-03-q4",
        label: "Abattement IR (7 années au taux de 6 %)",
        unit: "%",
        correctValue: 42,
        tolerance: 0,
        hint: "De la 6e à la 12e année = 7 années x 6 %",
      },
      {
        id: "cs-fin-03-q5",
        label: "Plus-value nette imposable IR",
        unit: "€",
        correctValue: 59740,
        tolerance: 100,
        hint: "Plus-value brute x (1 - abattement IR %)",
      },
    ],
    explanation:
      "Majoration travaux : 180 000 x 15 % = 27 000 €. Prix corrigé : 207 000 €. Plus-value brute : 310 000 - 207 000 = 103 000 €. Pour 12 ans de détention, l'abattement IR s'applique de la 6e à la 21e année à 6 %/an : 7 ans x 6 % = 42 %. Plus-value nette IR : 103 000 x (1 - 0,42) = 59 740 €. L'impôt IR sera de 59 740 x 19 % = 11 351 €, auxquels s'ajoutent les prélèvements sociaux sur une base réduite différemment.",
  },

  // ─── Module 4 : Marketing ─────────────────────────────────────────
  {
    id: "cs-mkt-01",
    moduleSlug: "marketing",
    lessonSlug: "annonces",
    title: "Calcul des honoraires et prix affichés",
    description:
      "Vous préparez l'annonce d'un appartement familial. La loi ALUR impose d'afficher le prix FAI, les honoraires en pourcentage et leur répartition. Calculez tous les montants pour rédiger une annonce conforme.",
    propertyDetails: [
      { label: "Type", value: "Appartement T4" },
      { label: "Surface", value: "95 m²" },
      { label: "Prix net vendeur", value: "320 000 €" },
      { label: "Taux honoraires", value: "5 % charge acquéreur" },
      { label: "DPE", value: "Classe C" },
      { label: "Localisation", value: "Nantes — Île de Nantes" },
    ],
    questions: [
      {
        id: "cs-mkt-01-q1",
        label: "Montant des honoraires TTC",
        unit: "€",
        correctValue: 16000,
        tolerance: 0,
        hint: "Prix net vendeur x 5 %",
      },
      {
        id: "cs-mkt-01-q2",
        label: "Prix FAI à afficher",
        unit: "€",
        correctValue: 336000,
        tolerance: 0,
        hint: "Prix net vendeur + honoraires",
      },
      {
        id: "cs-mkt-01-q3",
        label: "Prix au m² (sur prix FAI)",
        unit: "€/m²",
        correctValue: 3537,
        tolerance: 5,
        hint: "Prix FAI / surface",
      },
    ],
    explanation:
      "Honoraires : 320 000 x 5 % = 16 000 €. Prix FAI : 320 000 + 16 000 = 336 000 €. Prix au m² : 336 000 / 95 = 3 536,84 €, arrondi à 3 537 €/m². L'annonce doit mentionner : « 336 000 € FAI dont 5 % TTC d'honoraires à la charge de l'acquéreur, soit 320 000 € net vendeur ».",
  },
  {
    id: "cs-mkt-02",
    moduleSlug: "marketing",
    lessonSlug: "portails",
    title: "ROI d'une campagne portails immobiliers",
    description:
      "Votre agence investit dans des remontées d'annonces sur SeLoger et Leboncoin. Analysez le retour sur investissement de votre stratégie digitale sur le dernier trimestre.",
    propertyDetails: [
      { label: "Budget SeLoger", value: "1 800 € / trimestre" },
      { label: "Budget Leboncoin", value: "900 € / trimestre" },
      { label: "Contacts générés", value: "120 contacts" },
      { label: "Visites réalisées", value: "35 visites" },
      { label: "Ventes conclues", value: "4 ventes" },
      { label: "Honoraires moyens / vente", value: "12 000 €" },
    ],
    questions: [
      {
        id: "cs-mkt-02-q1",
        label: "Budget total trimestre",
        unit: "€",
        correctValue: 2700,
        tolerance: 0,
        hint: "SeLoger + Leboncoin",
      },
      {
        id: "cs-mkt-02-q2",
        label: "Coût par contact",
        unit: "€",
        correctValue: 22.5,
        tolerance: 0.5,
        hint: "Budget total / nombre de contacts",
      },
      {
        id: "cs-mkt-02-q3",
        label: "Taux de conversion contacts → ventes",
        unit: "%",
        correctValue: 3.33,
        tolerance: 0.1,
        hint: "(Ventes / contacts) x 100",
      },
      {
        id: "cs-mkt-02-q4",
        label: "CA total honoraires",
        unit: "€",
        correctValue: 48000,
        tolerance: 0,
        hint: "Nombre de ventes x honoraires moyens",
      },
      {
        id: "cs-mkt-02-q5",
        label: "ROI de la campagne",
        unit: "%",
        correctValue: 1678,
        tolerance: 30,
        hint: "((CA - budget) / budget) x 100",
      },
    ],
    explanation:
      "Budget total : 1 800 + 900 = 2 700 €. Coût par contact : 2 700 / 120 = 22,50 €. Taux de conversion : 4 / 120 = 3,33 %. CA honoraires : 4 x 12 000 = 48 000 €. ROI : (48 000 - 2 700) / 2 700 x 100 = 1 678 %. Un ROI excellent, typique du secteur immobilier où les honoraires unitaires sont élevés par rapport aux coûts marketing.",
  },

  // ─── Module 5 : Terrain ───────────────────────────────────────────
  {
    id: "cs-ter-01",
    moduleSlug: "terrain",
    lessonSlug: "closing",
    title: "Négociation et budget total acquéreur",
    description:
      "Un acquéreur souhaite faire une offre sur une maison affichée à 310 000 € FAI. Après visite, il propose 285 000 €. Calculez les éléments financiers de la transaction pour accompagner votre client.",
    propertyDetails: [
      { label: "Prix affiché FAI", value: "310 000 €" },
      { label: "Offre acquéreur", value: "285 000 €" },
      { label: "Honoraires inclus dans FAI", value: "5 %" },
      { label: "Frais de notaire", value: "8 % (ancien)" },
      { label: "Type", value: "Maison T5 — 140 m²" },
      { label: "Localisation", value: "Villeurbanne" },
    ],
    questions: [
      {
        id: "cs-ter-01-q1",
        label: "Pourcentage de négociation",
        unit: "%",
        correctValue: 8.06,
        tolerance: 0.1,
        hint: "((Prix affiché - offre) / prix affiché) x 100",
      },
      {
        id: "cs-ter-01-q2",
        label: "Frais de notaire estimés (sur prix hors honoraires)",
        unit: "€",
        correctValue: 21714,
        tolerance: 200,
        hint: "D'abord calculer le prix hors honoraires : offre / 1,05. Puis x 8 %",
      },
      {
        id: "cs-ter-01-q3",
        label: "Budget total acquéreur",
        unit: "€",
        correctValue: 306714,
        tolerance: 200,
        hint: "Offre FAI + frais de notaire",
      },
    ],
    explanation:
      "Négociation : (310 000 - 285 000) / 310 000 = 8,06 %. Prix hors honoraires : 285 000 / 1,05 = 271 429 €. Frais de notaire : 271 429 x 8 % = 21 714 €. Budget total : 285 000 + 21 714 = 306 714 €. En tant qu'agent, présentez ces chiffres clairement à l'acquéreur pour qu'il mesure l'engagement financier total.",
  },
  {
    id: "cs-ter-02",
    moduleSlug: "terrain",
    lessonSlug: "visite",
    title: "Analyse comparative pré-visite",
    description:
      "Vous préparez une visite pour un couple à la recherche d'un appartement. Ils hésitent entre deux biens. Aidez-les à comparer objectivement en calculant les indicateurs clés de chaque bien.",
    propertyDetails: [
      { label: "Bien A — T3", value: "65 m² — 245 000 € FAI" },
      { label: "Bien A — Charges", value: "180 €/mois" },
      { label: "Bien A — DPE", value: "Classe D" },
      { label: "Bien B — T3", value: "58 m² — 215 000 € FAI" },
      { label: "Bien B — Charges", value: "220 €/mois" },
      { label: "Bien B — DPE", value: "Classe E (travaux isolation : ~15 000 €)" },
    ],
    questions: [
      {
        id: "cs-ter-02-q1",
        label: "Prix au m² — Bien A",
        unit: "€/m²",
        correctValue: 3769,
        tolerance: 5,
        hint: "245 000 / 65",
      },
      {
        id: "cs-ter-02-q2",
        label: "Prix au m² — Bien B",
        unit: "€/m²",
        correctValue: 3707,
        tolerance: 5,
        hint: "215 000 / 58",
      },
      {
        id: "cs-ter-02-q3",
        label: "Coût total Bien B avec travaux",
        unit: "€",
        correctValue: 230000,
        tolerance: 0,
        hint: "Prix + travaux d'isolation",
      },
      {
        id: "cs-ter-02-q4",
        label: "Prix au m² Bien B avec travaux",
        unit: "€/m²",
        correctValue: 3966,
        tolerance: 5,
        hint: "(Prix + travaux) / surface",
      },
    ],
    explanation:
      "Bien A : 245 000 / 65 = 3 769 €/m². Bien B brut : 215 000 / 58 = 3 707 €/m². Bien B avec travaux : (215 000 + 15 000) / 58 = 3 966 €/m². Le Bien B semble moins cher mais les travaux d'isolation et les charges plus élevées (classe E) le rendent plus coûteux au m² que le Bien A. C'est un argument objectif à présenter lors de la visite.",
  },
  {
    id: "cs-ter-03",
    moduleSlug: "terrain",
    lessonSlug: "promesse",
    title: "Promesse de vente — calcul des conditions suspensives",
    description:
      "La promesse de vente est signée pour un bien à 275 000 €. L'acquéreur a une condition suspensive d'obtention de prêt. Calculez les montants et délais clés de la promesse.",
    propertyDetails: [
      { label: "Prix de vente", value: "275 000 €" },
      { label: "Indemnité d'immobilisation", value: "10 % du prix" },
      { label: "Délai condition suspensive", value: "60 jours" },
      { label: "Frais de notaire estimés", value: "8 %" },
      { label: "Date de signature", value: "1er avril 2026" },
      { label: "Montant emprunté", value: "220 000 €" },
    ],
    questions: [
      {
        id: "cs-ter-03-q1",
        label: "Indemnité d'immobilisation",
        unit: "€",
        correctValue: 27500,
        tolerance: 0,
        hint: "10 % du prix de vente",
      },
      {
        id: "cs-ter-03-q2",
        label: "Frais de notaire",
        unit: "€",
        correctValue: 22000,
        tolerance: 0,
        hint: "Prix de vente x 8 %",
      },
      {
        id: "cs-ter-03-q3",
        label: "Apport personnel nécessaire",
        unit: "€",
        correctValue: 77000,
        tolerance: 0,
        hint: "Prix + frais de notaire - montant emprunté",
      },
      {
        id: "cs-ter-03-q4",
        label: "Date limite condition suspensive (jour du mois)",
        unit: "jour",
        correctValue: 31,
        tolerance: 0,
        hint: "Date de signature + 60 jours calendaires = 31 mai 2026",
      },
    ],
    explanation:
      "Indemnité d'immobilisation : 275 000 x 10 % = 27 500 €. Frais de notaire : 275 000 x 8 % = 22 000 €. Budget total : 275 000 + 22 000 = 297 000 €. Apport nécessaire : 297 000 - 220 000 = 77 000 €. Date limite : 1er avril + 60 jours = 31 mai 2026. Si le prêt n'est pas obtenu avant cette date, l'acquéreur peut se désengager et récupérer l'indemnité.",
  },
  {
    id: "cs-trans-prosp",
    moduleSlug: "transaction",
    lessonSlug: "prospection",
    title: "Calcul du potentiel d'un secteur de prospection",
    description:
      "Vous débutez dans un nouveau secteur de 2 000 logements à Nantes. Après analyse, le taux de rotation annuel est de 4 %. Vous visez 20 % de part de marché. Votre panier moyen est de 280 000 € avec des honoraires à 3,5 %. Calculez votre potentiel de revenus annuels.",
    propertyDetails: [
      { label: "Secteur", value: "Nantes Nord — 2 000 logements" },
      { label: "Taux de rotation", value: "4 % / an" },
      { label: "Part de marché visée", value: "20 %" },
      { label: "Panier moyen", value: "280 000 €" },
      { label: "Taux d'honoraires", value: "3,5 %" },
      { label: "Horizon", value: "12 mois" },
    ],
    questions: [
      {
        id: "cs-prosp-q1",
        label: "Nombre de transactions potentielles / an dans le secteur",
        unit: "transactions",
        correctValue: 80,
        tolerance: 0,
        hint: "2 000 × 4 %",
      },
      {
        id: "cs-prosp-q2",
        label: "Transactions captées à 20 % de part de marché",
        unit: "transactions",
        correctValue: 16,
        tolerance: 0,
        hint: "80 × 20 %",
      },
      {
        id: "cs-prosp-q3",
        label: "Chiffre d'affaires annuel brut (honoraires)",
        unit: "€",
        correctValue: 156800,
        tolerance: 0,
        hint: "16 × 280 000 × 3,5 %",
      },
      {
        id: "cs-prosp-q4",
        label: "Honoraires par transaction",
        unit: "€",
        correctValue: 9800,
        tolerance: 0,
        hint: "280 000 × 3,5 %",
      },
    ],
    explanation:
      "Le secteur génère 80 transactions/an (2 000 × 4 %). À 20 % de part de marché, vous captez 16 mandats. Honoraires par transaction : 280 000 × 3,5 % = 9 800 €. CA brut annuel : 16 × 9 800 = 156 800 €. C'est la base de votre business plan sectoriel : commencez par cartographier toutes les ventes des 3 dernières années pour identifier les zones les plus actives.",
  },
  {
    id: "cs-trans-crm",
    moduleSlug: "transaction",
    lessonSlug: "crm",
    title: "Pilotage CRM — conversion entonnoir de vente",
    description:
      "Vous analysez vos performances CRM du dernier trimestre. Votre base compte 340 contacts qualifiés. Le taux de contact utile est 35 %, le taux de rendez-vous est 40 % des contacts utiles, le taux de mandat est 25 % des rendez-vous, et votre taux de vente est 70 % des mandats signés. Calculez chaque étape de l'entonnoir.",
    propertyDetails: [
      { label: "Base contacts qualifiés", value: "340" },
      { label: "Taux contact utile", value: "35 %" },
      { label: "Taux rendez-vous", value: "40 % des contacts utiles" },
      { label: "Taux mandat", value: "25 % des RDV" },
      { label: "Taux de vente", value: "70 % des mandats" },
      { label: "Panier moyen", value: "320 000 €, honoraires 4 %" },
    ],
    questions: [
      {
        id: "cs-crm-q1",
        label: "Contacts utiles (35 % des 340)",
        unit: "contacts",
        correctValue: 119,
        tolerance: 0,
        hint: "340 × 35 %",
      },
      {
        id: "cs-crm-q2",
        label: "Rendez-vous obtenus",
        unit: "RDV",
        correctValue: 48,
        tolerance: 1,
        hint: "119 × 40 % — arrondir",
      },
      {
        id: "cs-crm-q3",
        label: "Mandats signés",
        unit: "mandats",
        correctValue: 12,
        tolerance: 0,
        hint: "48 × 25 %",
      },
      {
        id: "cs-crm-q4",
        label: "Ventes conclues",
        unit: "ventes",
        correctValue: 8,
        tolerance: 0,
        hint: "12 × 70 % — arrondir au plus proche",
      },
      {
        id: "cs-crm-q5",
        label: "CA généré (honoraires)",
        unit: "€",
        correctValue: 102400,
        tolerance: 0,
        hint: "8 × 320 000 × 4 %",
      },
    ],
    explanation:
      "Entonnoir : 340 → 119 contacts utiles → 48 RDV → 12 mandats → 8 ventes. CA : 8 × 320 000 × 4 % = 102 400 €. Le ratio clé est le coût d'acquisition : pour obtenir 1 vente, il faut contacter ~42 personnes. Le CRM vous permet d'identifier où se trouve la fuite dans votre entonnoir et d'agir dessus (ex : si les RDV ne convertissent pas en mandats, travaillez votre pitch de découverte).",
  },
  {
    id: "cs-mkt-reseaux",
    moduleSlug: "marketing",
    lessonSlug: "reseaux",
    title: "Stratégie Instagram — calcul du ROI contenu",
    description:
      "Vous publiez 4 contenus par semaine sur Instagram depuis 3 mois. Votre compte a généré 12 000 impressions/mois, un taux d'engagement de 3,2 %, et 48 demandes de contact qualifiées sur la période. Sur ces 48 contacts, 12 sont devenus des mandats à 4 % sur un panier moyen de 290 000 €. Calculez le ROI de votre stratégie.",
    propertyDetails: [
      { label: "Impressions/mois", value: "12 000" },
      { label: "Taux d'engagement", value: "3,2 %" },
      { label: "Contacts qualifiés (3 mois)", value: "48" },
      { label: "Taux conversion contacts → mandats", value: "25 %" },
      { label: "Panier moyen", value: "290 000 €" },
      { label: "Taux honoraires", value: "4 %" },
    ],
    questions: [
      {
        id: "cs-rsx-q1",
        label: "Engagements par mois (interactions)",
        unit: "interactions",
        correctValue: 384,
        tolerance: 2,
        hint: "12 000 × 3,2 %",
      },
      {
        id: "cs-rsx-q2",
        label: "Mandats obtenus via Instagram (3 mois)",
        unit: "mandats",
        correctValue: 12,
        tolerance: 0,
        hint: "48 × 25 %",
      },
      {
        id: "cs-rsx-q3",
        label: "Honoraires générés",
        unit: "€",
        correctValue: 139200,
        tolerance: 0,
        hint: "12 × 290 000 × 4 %",
      },
      {
        id: "cs-rsx-q4",
        label: "Coût d'acquisition par mandat (budget contenu 300 €/mois)",
        unit: "€",
        correctValue: 75,
        tolerance: 5,
        hint: "(300 × 3 mois) / 12 mandats",
      },
    ],
    explanation:
      "Engagements : 12 000 × 3,2 % = 384/mois. Mandats : 48 × 25 % = 12. Honoraires : 12 × 290 000 × 4 % = 139 200 €. Coût d'acquisition par mandat : 900 € de budget / 12 = 75 €. C'est un ROI exceptionnel : chaque euro investi en contenu génère 155 € d'honoraires. La clé est la régularité et la localisation des contenus (quartier, actualité marché).",
  },
  {
    id: "cs-mkt-seo",
    moduleSlug: "marketing",
    lessonSlug: "seo",
    title: "SEO local — trafic et conversion agence",
    description:
      "Votre site d'agence génère 850 visiteurs organiques/mois grâce au SEO local. Le taux de rebond est 45 %, donc 55 % restent sur le site. De ces visiteurs qui restent, 4 % remplissent un formulaire de contact. Sur 100 formulaires, 30 aboutissent à un rendez-vous vendeur. Votre taux de mandat RDV est 33 %. Panier moyen 310 000 € à 3,5 %.",
    propertyDetails: [
      { label: "Trafic organique/mois", value: "850 visiteurs" },
      { label: "Taux de rebond", value: "45 %" },
      { label: "Taux de contact (formulaire)", value: "4 % des visiteurs restants" },
      { label: "Taux RDV vendeur", value: "30 %" },
      { label: "Taux de mandat", value: "33 %" },
      { label: "Panier moyen / honoraires", value: "310 000 € / 3,5 %" },
    ],
    questions: [
      {
        id: "cs-seo-q1",
        label: "Visiteurs qui restent sur le site (sans rebond)",
        unit: "visiteurs",
        correctValue: 468,
        tolerance: 2,
        hint: "850 × 55 %",
      },
      {
        id: "cs-seo-q2",
        label: "Formulaires remplis par mois",
        unit: "formulaires",
        correctValue: 19,
        tolerance: 1,
        hint: "468 × 4 % — arrondir",
      },
      {
        id: "cs-seo-q3",
        label: "RDV vendeurs par mois",
        unit: "RDV",
        correctValue: 6,
        tolerance: 1,
        hint: "19 × 30 %",
      },
      {
        id: "cs-seo-q4",
        label: "Mandats signés par mois",
        unit: "mandats",
        correctValue: 2,
        tolerance: 0,
        hint: "6 × 33 % — arrondir",
      },
      {
        id: "cs-seo-q5",
        label: "Honoraires mensuels générés via SEO",
        unit: "€",
        correctValue: 21700,
        tolerance: 500,
        hint: "2 × 310 000 × 3,5 %",
      },
    ],
    explanation:
      "Entonnoir SEO : 850 → 468 restent → ~19 formulaires → ~6 RDV → ~2 mandats/mois. Honoraires : 2 × 310 000 × 3,5 % ≈ 21 700 €/mois. Sur 12 mois : ~260 000 € d'honoraires pour un investissement SEO de 3 000-5 000 €/an. Chaque article de blog bien référencé sur les mots-clés locaux (ex : 'appartement Lyon 6 vente') peut générer des dizaines de contacts pendant des années.",
  },
  {
    id: "cs-ter-arg",
    moduleSlug: "terrain",
    lessonSlug: "argumentaire",
    title: "Argumentaire chiffré — convaincre un vendeur sceptique",
    description:
      "Un vendeur veut vendre seul son T3 à Toulouse estimé à 230 000 €. Il pense économiser 5 % d'honoraires. Vous disposez de données prouvant qu'un mandat exclusif se vend 12 % plus cher et 40 % plus vite qu'un PAP. Construisez l'argumentaire chiffré pour le convaincre de signer.",
    propertyDetails: [
      { label: "Bien", value: "T3 Toulouse — 68 m²" },
      { label: "Estimation", value: "230 000 €" },
      { label: "Honoraires agence", value: "5 %" },
      { label: "Prime prix mandat vs PAP", value: "+12 %" },
      { label: "Délai moyen PAP", value: "180 jours" },
      { label: "Délai moyen mandat exclusif", value: "108 jours" },
    ],
    questions: [
      {
        id: "cs-arg-q1",
        label: "Économie honoraires (montant que le vendeur pense économiser)",
        unit: "€",
        correctValue: 11500,
        tolerance: 0,
        hint: "230 000 × 5 %",
      },
      {
        id: "cs-arg-q2",
        label: "Prix de vente avec mandat exclusif (+12 %)",
        unit: "€",
        correctValue: 257600,
        tolerance: 0,
        hint: "230 000 × 1,12",
      },
      {
        id: "cs-arg-q3",
        label: "Honoraires agence sur prix exclusif",
        unit: "€",
        correctValue: 12880,
        tolerance: 0,
        hint: "257 600 × 5 %",
      },
      {
        id: "cs-arg-q4",
        label: "Net vendeur avec mandat exclusif",
        unit: "€",
        correctValue: 244720,
        tolerance: 0,
        hint: "Prix exclusif - honoraires",
      },
      {
        id: "cs-arg-q5",
        label: "Gain net pour le vendeur vs PAP (arrondi)",
        unit: "€",
        correctValue: 14720,
        tolerance: 100,
        hint: "Net exclusif - prix PAP",
      },
    ],
    explanation:
      "Le vendeur pense économiser 11 500 € en vendant seul. Mais avec mandat exclusif : prix 230 000 × 1,12 = 257 600 €. Honoraires : 12 880 €. Net vendeur : 244 720 €. Gain vs PAP : 244 720 − 230 000 = 14 720 €. Le vendeur gagne en réalité 14 720 € de plus en passant par l'agence, tout en gagnant 72 jours. C'est l'argument massue : ne présentez jamais les honoraires en isolation — montrez toujours le net vendeur comparé.",
  },
  {
    id: "cs-ter-fid",
    moduleSlug: "terrain",
    lessonSlug: "fidelisation",
    title: "Programme de fidélisation — valeur à vie client",
    description:
      "Vous avez accompagné 80 clients acheteurs sur les 4 dernières années. En moyenne, un client immobilier réalise une nouvelle transaction tous les 7 ans. Le taux de recommandation actif de vos clients est 15 %. Votre panier moyen est de 295 000 €, honoraires 4 %. Calculez la valeur de votre portefeuille clients.",
    propertyDetails: [
      { label: "Portefeuille clients", value: "80 acheteurs fidélisés" },
      { label: "Fréquence rachat", value: "1 transaction / 7 ans" },
      { label: "Taux de recommandation actif", value: "15 %" },
      { label: "Panier moyen", value: "295 000 €" },
      { label: "Honoraires", value: "4 %" },
      { label: "Horizon prévisionnel", value: "7 ans" },
    ],
    questions: [
      {
        id: "cs-fid-q1",
        label: "Transactions directes attendues sur 7 ans (rachat)",
        unit: "transactions",
        correctValue: 80,
        tolerance: 0,
        hint: "80 clients × 1 transaction / 7 ans × 7 ans",
      },
      {
        id: "cs-fid-q2",
        label: "Recommandations actives générées (15 %)",
        unit: "contacts",
        correctValue: 12,
        tolerance: 0,
        hint: "80 × 15 %",
      },
      {
        id: "cs-fid-q3",
        label: "Honoraires sur rachats seuls (7 ans)",
        unit: "€",
        correctValue: 944000,
        tolerance: 0,
        hint: "80 × 295 000 × 4 %",
      },
      {
        id: "cs-fid-q4",
        label: "Honoraires sur recommandations (si 80 % se convertissent)",
        unit: "€",
        correctValue: 28320,
        tolerance: 200,
        hint: "12 × 80 % × 295 000 × 4 %",
      },
    ],
    explanation:
      "Valeur portefeuille sur 7 ans : 80 rachats × 295 000 × 4 % = 944 000 €. Recommandations : 80 × 15 % = 12 contacts, dont 80 % convertis = ~10 ventes × 295 000 × 4 % = 28 320 €. Total : ~972 000 € sur 7 ans. C'est pourquoi investir 1 h/mois par client fidélisé (appel, newsletter, vœux) est le meilleur ROI de votre activité. Calculez votre LTV (Lifetime Value) client et traitez chaque acheteur comme un actif à long terme.",
  },
];

export function getCaseStudies(moduleSlug: string, lessonSlug: string): CaseStudy[] {
  return ALL_CASE_STUDIES.filter(
    (cs) => cs.moduleSlug === moduleSlug && cs.lessonSlug === lessonSlug,
  );
}

export function getAllCaseStudies(): CaseStudy[] {
  return ALL_CASE_STUDIES;
}
