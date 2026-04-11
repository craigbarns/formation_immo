export type CalcStep = {
  id: string;
  stepNumber: number;
  title: string;
  instruction: string;
  formula?: string;
  hint?: string;
  inputLabel: string;
  inputUnit: string;
  correctValue: number;
  tolerance: number;
  explanation: string;
};

export type GuidedCalculation = {
  id: string;
  moduleSlug: string;
  lessonSlug: string;
  title: string;
  scenario: string;
  propertyContext: { label: string; value: string; icon: string }[];
  steps: CalcStep[];
  finalSummary: string;
};

const ALL: GuidedCalculation[] = [
  // ─── Module 3 — Crédit immobilier ──────────────────────────────────────────
  {
    id: "calc-credit-martin",
    moduleSlug: "financement",
    lessonSlug: "credit",
    title: "Crédit d'un primo-accédant — M. & Mme Martin",
    scenario:
      "M. et Mme Martin souhaitent acheter un appartement 3 pièces à Lyon 6e. Le bien est affiché à 280 000 €. Ils disposent d'un apport de 28 000 €. Leurs revenus nets mensuels cumulés s'élèvent à 4 800 €/mois. La banque leur propose un taux de 3,80 % sur 20 ans.",
    propertyContext: [
      { label: "Prix d'achat", value: "280 000 €", icon: "🏠" },
      { label: "Apport personnel", value: "28 000 €", icon: "💰" },
      { label: "Revenus nets/mois", value: "4 800 €", icon: "💳" },
      { label: "Taux proposé", value: "3,80 % sur 20 ans", icon: "📊" },
    ],
    steps: [
      {
        id: "s1",
        stepNumber: 1,
        title: "Capital emprunté",
        instruction: "Calculez le montant que les Martin doivent emprunter après déduction de l'apport.",
        formula: "Capital = Prix d'achat − Apport",
        hint: "280 000 − 28 000",
        inputLabel: "Capital emprunté",
        inputUnit: "€",
        correctValue: 252000,
        tolerance: 100,
        explanation:
          "Les Martin empruntent 252 000 €. C'est le capital de départ sur lequel les intérêts seront calculés chaque mois.",
      },
      {
        id: "s2",
        stepNumber: 2,
        title: "Taux mensuel",
        instruction: "Convertissez le taux annuel de 3,80 % en taux mensuel (divisez par 12).",
        formula: "Taux mensuel = Taux annuel ÷ 12",
        hint: "3,80 ÷ 12 = 0,3167 %",
        inputLabel: "Taux mensuel",
        inputUnit: "%",
        correctValue: 0.3167,
        tolerance: 0.01,
        explanation:
          "Le taux mensuel est de 0,3167 %. C'est ce taux qui s'applique chaque mois sur le capital restant dû.",
      },
      {
        id: "s3",
        stepNumber: 3,
        title: "Mensualité",
        instruction:
          "Calculez la mensualité avec la formule standard. Durée : 240 mois (20 ans). Taux mensuel : 0,3167 % = 0,003167.",
        formula: "M = C × [t / (1 − (1+t)^−n)]",
        hint: "M ≈ 252 000 × 0,003167 / (1 − (1,003167)^−240) ≈ 1 496 €",
        inputLabel: "Mensualité",
        inputUnit: "€",
        correctValue: 1496,
        tolerance: 20,
        explanation:
          "La mensualité est d'environ 1 496 €/mois. Ce montant inclut le remboursement du capital et les intérêts, mais pas l'assurance emprunteur.",
      },
      {
        id: "s4",
        stepNumber: 4,
        title: "Taux d'endettement",
        instruction:
          "Calculez le taux d'endettement. La règle HCSF est un maximum de 35 % des revenus nets.",
        formula: "Taux endettement = (Mensualité ÷ Revenus nets) × 100",
        hint: "1 496 ÷ 4 800 × 100",
        inputLabel: "Taux d'endettement",
        inputUnit: "%",
        correctValue: 31.2,
        tolerance: 1,
        explanation:
          "Le taux d'endettement est de 31,2 %, bien en dessous du plafond réglementaire de 35 %. Le dossier est finançable. Sous le seuil, la banque peut aller jusqu'à 35 % (43 % dans certains cas dérogatoires pour primo-accédants).",
      },
      {
        id: "s5",
        stepNumber: 5,
        title: "Coût total du crédit",
        instruction: "Calculez le coût total des intérêts sur 20 ans (sans l'assurance).",
        formula: "Coût intérêts = (Mensualité × Nombre de mois) − Capital",
        hint: "1 496 × 240 − 252 000",
        inputLabel: "Coût total des intérêts",
        inputUnit: "€",
        correctValue: 107040,
        tolerance: 2000,
        explanation:
          "Les Martin paieront environ 107 000 € d'intérêts sur 20 ans. Pour réduire ce coût, ils peuvent opter pour une durée plus courte (15 ans) si leur capacité d'endettement le permet, ou chercher à négocier un meilleur taux.",
      },
    ],
    finalSummary:
      "Le dossier des Martin est solide : 10 % d'apport, taux d'endettement à 31,2 %, profil stable. La banque accordera le prêt sans difficulté. Conseil terrain : proposez-leur de comparer avec un taux à 15 ans — la mensualité monte à ~1 840 €, mais ils économisent plus de 40 000 € d'intérêts.",
  },

  // ─── Module 3 — Rentabilité locative ───────────────────────────────────────
  {
    id: "calc-rentabilite-studio",
    moduleSlug: "financement",
    lessonSlug: "rentabilite",
    title: "Rentabilité d'un studio à Bordeaux",
    scenario:
      "Un investisseur envisage d'acheter un studio de 28 m² à Bordeaux-Centre. Prix de vente : 145 000 €. Loyer mensuel estimé : 650 €. Charges annuelles (copropriété + taxe foncière) : 1 800 €. Frais de notaire : 10 500 €.",
    propertyContext: [
      { label: "Prix d'achat", value: "145 000 €", icon: "🏠" },
      { label: "Loyer mensuel", value: "650 €", icon: "💶" },
      { label: "Charges annuelles", value: "1 800 €", icon: "📋" },
      { label: "Frais notaire", value: "10 500 €", icon: "✍️" },
    ],
    steps: [
      {
        id: "s1",
        stepNumber: 1,
        title: "Revenu locatif annuel brut",
        instruction: "Calculez le revenu annuel brut généré par le loyer.",
        formula: "Revenu brut = Loyer mensuel × 12",
        hint: "650 × 12",
        inputLabel: "Revenu annuel brut",
        inputUnit: "€",
        correctValue: 7800,
        tolerance: 10,
        explanation:
          "7 800 €/an de revenus bruts. C'est le chiffre de départ, avant déduction des charges et vacance locative.",
      },
      {
        id: "s2",
        stepNumber: 2,
        title: "Rendement brut",
        instruction: "Calculez le rendement brut (sur le prix d'achat seul, sans frais de notaire).",
        formula: "Rendement brut = (Revenu brut ÷ Prix achat) × 100",
        hint: "7 800 ÷ 145 000 × 100",
        inputLabel: "Rendement brut",
        inputUnit: "%",
        correctValue: 5.38,
        tolerance: 0.1,
        explanation:
          "5,38 % de rendement brut — au-dessus de la moyenne bordelaise (4,5 %). C'est le premier filtre : en dessous de 5 % brut en province, l'investissement mérite réflexion.",
      },
      {
        id: "s3",
        stepNumber: 3,
        title: "Revenu locatif annuel net",
        instruction: "Calculez le revenu net après déduction des charges annuelles.",
        formula: "Revenu net = Revenu brut − Charges annuelles",
        hint: "7 800 − 1 800",
        inputLabel: "Revenu annuel net",
        inputUnit: "€",
        correctValue: 6000,
        tolerance: 10,
        explanation:
          "6 000 €/an nets de charges. Attention : ce calcul n'inclut pas encore la vacance locative (prévoir 1 mois/an en moyenne), ni les travaux d'entretien.",
      },
      {
        id: "s4",
        stepNumber: 4,
        title: "Rendement net-net (coût réel)",
        instruction:
          "Calculez le rendement net sur le coût total d'acquisition (prix + frais de notaire).",
        formula: "Rendement net = (Revenu net ÷ Coût total) × 100",
        hint: "(6 000 ÷ (145 000 + 10 500)) × 100",
        inputLabel: "Rendement net",
        inputUnit: "%",
        correctValue: 3.85,
        tolerance: 0.1,
        explanation:
          "3,85 % net-net : c'est la vraie rentabilité. En dessous de 4 % en province, il faut jouer sur la fiscalité (LMNP, Denormandie…) pour que l'opération reste intéressante.",
      },
      {
        id: "s5",
        stepNumber: 5,
        title: "Cashflow mensuel (hors crédit)",
        instruction:
          "Calculez le cashflow mensuel disponible après charges (sans remboursement de crédit).",
        formula: "Cashflow = Revenu net annuel ÷ 12",
        hint: "6 000 ÷ 12",
        inputLabel: "Cashflow mensuel",
        inputUnit: "€",
        correctValue: 500,
        tolerance: 10,
        explanation:
          "500 €/mois de cashflow hors crédit. Avec un crédit de 155 500 € à 3,8 % sur 20 ans, la mensualité serait d'environ 925 €, soit un effort mensuel de 425 € — un investissement à cashflow légèrement négatif mais avec un fort potentiel de valorisation sur Bordeaux.",
      },
    ],
    finalSummary:
      "Ce studio présente un rendement brut attractif (5,38 %) mais un rendement net modéré (3,85 %). Pour optimiser : proposer le statut LMNP (abattement 50 % en micro-BIC), chercher un bien avec travaux pour bénéficier du déficit foncier, ou cibler une revente à 5 ans sur un marché en hausse.",
  },

  // ─── Module 2 — Estimation ─────────────────────────────────────────────────
  {
    id: "calc-estimation-paris",
    moduleSlug: "transaction",
    lessonSlug: "estimation",
    title: "Estimation par comparaison — Paris 11e",
    scenario:
      "Vous devez estimer un appartement 3 pièces de 72 m² au 3e étage avec ascenseur, bon état général, Paris 11e. Vous avez 3 ventes comparables récentes dans le même arrondissement.",
    propertyContext: [
      { label: "Surface", value: "72 m²", icon: "📐" },
      { label: "Étage", value: "3e avec ascenseur", icon: "🛗" },
      { label: "État", value: "Bon état", icon: "✅" },
      { label: "Ventes comparables", value: "3 références", icon: "🔍" },
    ],
    steps: [
      {
        id: "s1",
        stepNumber: 1,
        title: "Prix au m² — Comparable A",
        instruction:
          "Comparable A : 65 m², 2e étage sans ascenseur, vendu 572 000 €. Calculez son prix au m².",
        formula: "Prix/m² = Prix de vente ÷ Surface",
        hint: "572 000 ÷ 65",
        inputLabel: "Prix au m² — Comparable A",
        inputUnit: "€/m²",
        correctValue: 8800,
        tolerance: 50,
        explanation:
          "8 800 €/m² pour ce comparable. Attention : il est au 2e sans ascenseur, ce qui le pénalise par rapport à votre bien.",
      },
      {
        id: "s2",
        stepNumber: 2,
        title: "Prix au m² — Comparable B",
        instruction:
          "Comparable B : 78 m², 4e avec ascenseur, rénové récemment, vendu 741 000 €. Calculez son prix au m².",
        formula: "Prix/m² = Prix de vente ÷ Surface",
        hint: "741 000 ÷ 78",
        inputLabel: "Prix au m² — Comparable B",
        inputUnit: "€/m²",
        correctValue: 9500,
        tolerance: 50,
        explanation:
          "9 500 €/m². Ce bien est rénové et à un étage plus élevé — il sert de plafond de marché pour votre estimation.",
      },
      {
        id: "s3",
        stepNumber: 3,
        title: "Prix au m² — Comparable C",
        instruction:
          "Comparable C : 70 m², 3e avec ascenseur, état moyen, vendu 630 000 €. Calculez son prix au m².",
        formula: "Prix/m² = Prix de vente ÷ Surface",
        hint: "630 000 ÷ 70",
        inputLabel: "Prix au m² — Comparable C",
        inputUnit: "€/m²",
        correctValue: 9000,
        tolerance: 50,
        explanation:
          "9 000 €/m². Comparable similaire en termes d'étage et d'ascenseur, mais état moyen. Votre bien étant en bon état, sa valeur sera supérieure.",
      },
      {
        id: "s4",
        stepNumber: 4,
        title: "Moyenne pondérée",
        instruction:
          "Calculez la moyenne simple des 3 prix au m² (8 800, 9 500, 9 000). Pondération égale.",
        formula: "(Prix A + Prix B + Prix C) ÷ 3",
        hint: "(8 800 + 9 500 + 9 000) ÷ 3",
        inputLabel: "Moyenne des prix/m²",
        inputUnit: "€/m²",
        correctValue: 9100,
        tolerance: 50,
        explanation:
          "9 100 €/m² est la base de travail. Pour affiner, on applique ensuite des coefficients correcteurs liés aux caractéristiques spécifiques du bien à estimer.",
      },
      {
        id: "s5",
        stepNumber: 5,
        title: "Valeur estimée du bien",
        instruction:
          "Appliquez le prix moyen à la surface du bien (72 m²) pour obtenir la valeur centrale.",
        formula: "Valeur = Prix/m² × Surface",
        hint: "9 100 × 72",
        inputLabel: "Valeur estimée",
        inputUnit: "€",
        correctValue: 655200,
        tolerance: 5000,
        explanation:
          "Valeur centrale : 655 200 €. En pratique, vous présenterez une fourchette : 640 000 – 670 000 €. Le prix de mise en vente recommandé est à 660 000 € pour laisser une marge de négociation de 1,5 à 2 %.",
      },
    ],
    finalSummary:
      "Estimation finale : 640 000 – 670 000 €, prix de vente recommandé 660 000 €. Cette méthode par comparaison est la plus utilisée et la plus solide pour convaincre un vendeur. Présentez toujours les comparables physiquement (photos, adresses) pour asseoir votre crédibilité.",
  },

  // ─── Module Transaction — Prospection ─────────────────────────────────────
  {
    id: "calc-honoraires-prospection",
    moduleSlug: "transaction",
    lessonSlug: "prospection",
    title: "Calculer ses honoraires et objectifs de CA",
    scenario:
      "Vous démarrez en tant qu'agent immobilier et souhaitez atteindre 100 000 € de chiffre d'affaires annuel. Le panier moyen de votre secteur est de 280 000 € et votre taux d'honoraires est de 3,5 %. Calculez le nombre de contacts nécessaires chaque semaine pour atteindre cet objectif.",
    propertyContext: [
      { label: "Panier moyen", value: "280 000 €", icon: "🏠" },
      { label: "Taux honoraires", value: "3,5 %", icon: "📊" },
      { label: "Objectif CA", value: "100 000 €", icon: "🎯" },
      { label: "Taux vente/mandat", value: "70 %", icon: "✅" },
    ],
    steps: [
      {
        id: "s1",
        stepNumber: 1,
        title: "Honoraires par transaction",
        instruction: "Calculez les honoraires générés par une seule vente au panier moyen de 280 000 € avec un taux de 3,5 %.",
        formula: "Honoraires = Prix de vente × Taux",
        hint: "280 000 × 3,5 % = 280 000 × 0,035",
        inputLabel: "Honoraires par transaction",
        inputUnit: "€",
        correctValue: 9800,
        tolerance: 0,
        explanation:
          "Chaque vente rapporte 9 800 € d'honoraires. Ce chiffre est la brique de base de votre plan d'action commercial.",
      },
      {
        id: "s2",
        stepNumber: 2,
        title: "Transactions nécessaires",
        instruction: "Combien de transactions devez-vous réaliser pour atteindre 100 000 € de CA ? (Arrondir au supérieur)",
        formula: "Transactions = Objectif CA ÷ Honoraires/transaction",
        hint: "100 000 ÷ 9 800 ≈ 10,2 → arrondi à 11",
        inputLabel: "Nombre de transactions",
        inputUnit: "ventes",
        correctValue: 11,
        tolerance: 1,
        explanation:
          "Il vous faut 11 transactions dans l'année, soit environ une vente par mois. C'est l'objectif cible à décliner en mandats, puis en RDV, puis en contacts.",
      },
      {
        id: "s3",
        stepNumber: 3,
        title: "Mandats nécessaires",
        instruction: "Si votre taux de vente par mandat est de 70 %, combien de mandats devez-vous signer pour réaliser 11 ventes ?",
        formula: "Mandats = Transactions ÷ Taux de vente",
        hint: "11 ÷ 0,70 ≈ 15,7 → arrondi à 16",
        inputLabel: "Nombre de mandats",
        inputUnit: "mandats",
        correctValue: 16,
        tolerance: 1,
        explanation:
          "16 mandats signés dans l'année. Sur 10 mandats, 3 ne se vendront pas (prix trop élevé, délai trop long, désistement). C'est la réalité du marché — prévoir cette marge dès le départ.",
      },
      {
        id: "s4",
        stepNumber: 4,
        title: "RDV estimation nécessaires",
        instruction: "Si votre taux de transformation RDV → mandat est de 25 %, combien de rendez-vous estimation faut-il décrocher ?",
        formula: "RDV = Mandats ÷ Taux mandat/RDV",
        hint: "16 ÷ 0,25 = 64",
        inputLabel: "Nombre de RDV estimation",
        inputUnit: "RDV",
        correctValue: 64,
        tolerance: 2,
        explanation:
          "64 rendez-vous estimation par an, soit un peu plus de 5 par mois. C'est réaliste pour un agent actif. Travailler le taux de transformation (actuellement 25 %) est le levier le plus puissant : passer à 33 % réduit les RDV nécessaires à 48.",
      },
      {
        id: "s5",
        stepNumber: 5,
        title: "Contacts nécessaires",
        instruction: "Si votre taux de RDV par contact utile est de 40 %, combien de contacts qualifiés faut-il générer par an ?",
        formula: "Contacts = RDV ÷ Taux RDV/contact",
        hint: "64 ÷ 0,40 = 160",
        inputLabel: "Nombre de contacts qualifiés",
        inputUnit: "contacts",
        correctValue: 160,
        tolerance: 5,
        explanation:
          "160 contacts qualifiés à l'année, soit 3 par semaine. Cette réalité est importante : la prospection n'est pas optionnelle, c'est le moteur de tout votre pipeline. Un CRM bien tenu transforme ces chiffres en habitudes quotidiennes.",
      },
    ],
    finalSummary:
      "Pour 100 000 € de CA : 160 contacts → 64 RDV → 16 mandats → 11 ventes. Chaque semaine, votre objectif minimal est de générer 3 contacts qualifiés. Améliorer un seul maillon (ex. taux mandat/RDV de 25 % à 33 %) peut réduire votre charge de prospection de 20 %. Pilotez ces KPIs chaque semaine dans votre CRM.",
  },

  // ─── Module Juridique — Copropriété ───────────────────────────────────────
  {
    id: "calc-charges-copropriete",
    moduleSlug: "juridique",
    lessonSlug: "copropriete",
    title: "Analyser les charges d'une copropriété",
    scenario:
      "Vous conseillez un investisseur qui envisage l'achat d'un lot dans un immeuble de 60 lots à Paris 15e. Le budget prévisionnel de la copropriété est de 180 000 €/an. Le lot convoité dispose de 72 tantièmes sur 1 000. Le loyer envisagé est de 1 500 €/mois.",
    propertyContext: [
      { label: "Budget copropriété/an", value: "180 000 €", icon: "🏢" },
      { label: "Tantièmes du lot", value: "72 / 1 000", icon: "📐" },
      { label: "Nombre de lots", value: "60 lots", icon: "🔑" },
      { label: "Loyer mensuel visé", value: "1 500 €", icon: "💶" },
    ],
    steps: [
      {
        id: "s1",
        stepNumber: 1,
        title: "Quote-part du lot",
        instruction: "Calculez la quote-part de ce lot dans la copropriété. Le lot a 72 tantièmes sur un total de 1 000.",
        formula: "Quote-part = Tantièmes du lot ÷ Total tantièmes × 100",
        hint: "72 ÷ 1 000 × 100 = 7,2 %",
        inputLabel: "Quote-part du lot",
        inputUnit: "%",
        correctValue: 7.2,
        tolerance: 0.1,
        explanation:
          "Ce lot représente 7,2 % de la copropriété. Ce pourcentage s'applique à toutes les charges générales : entretien parties communes, assurance immeuble, gardien, etc.",
      },
      {
        id: "s2",
        stepNumber: 2,
        title: "Charges annuelles du lot",
        instruction: "Calculez le montant annuel des charges de copropriété pour ce lot (budget total × quote-part).",
        formula: "Charges annuelles = Budget annuel × Quote-part",
        hint: "180 000 × 7,2 % = 180 000 × 0,072",
        inputLabel: "Charges annuelles",
        inputUnit: "€",
        correctValue: 12960,
        tolerance: 0,
        explanation:
          "12 960 €/an de charges de copropriété. C'est un poste de dépense significatif à intégrer dans le calcul de rentabilité. Vérifiez aussi l'état du fonds de travaux (loi ALUR : 5 % minimum du budget).",
      },
      {
        id: "s3",
        stepNumber: 3,
        title: "Charges mensuelles",
        instruction: "Ramenez les charges annuelles au mois pour les comparer directement au loyer mensuel.",
        formula: "Charges mensuelles = Charges annuelles ÷ 12",
        hint: "12 960 ÷ 12",
        inputLabel: "Charges mensuelles",
        inputUnit: "€",
        correctValue: 1080,
        tolerance: 0,
        explanation:
          "1 080 €/mois de charges. C'est un niveau élevé qui doit alerter l'investisseur. À titre de comparaison, des charges saines représentent généralement 20 à 30 % du loyer — ici elles atteignent 72 % du loyer envisagé.",
      },
      {
        id: "s4",
        stepNumber: 4,
        title: "Revenu net mensuel",
        instruction: "Calculez le revenu net mensuel après déduction des charges de copropriété (loyer 1 500 € − charges 1 080 €). Hors crédit et fiscalité.",
        formula: "Revenu net mensuel = Loyer mensuel − Charges mensuelles",
        hint: "1 500 − 1 080",
        inputLabel: "Revenu net mensuel",
        inputUnit: "€",
        correctValue: 420,
        tolerance: 0,
        explanation:
          "Seulement 420 €/mois de revenu net avant crédit et impôts. Cet investissement est très fragile : une vacance d'un mois représente plus de 3 mois de cashflow net. Conseil : négocier le prix à la baisse ou chercher un loyer meublé plus élevé (LMNP) pour compenser les charges.",
      },
    ],
    finalSummary:
      "Les charges de 12 960 €/an (1 080 €/mois) laissent un revenu net maigre de 420 €/mois avant crédit. Ce bien n'est viable qu'en LMNP avec un loyer meublé supérieur (~1 900 €) ou à un prix d'achat significativement réduit. Vérifiez toujours le carnet d'entretien et les 3 derniers PV d'AG avant toute acquisition en copropriété.",
  },

  // ─── Module Marketing — Annonces ──────────────────────────────────────────
  {
    id: "calc-roi-marketing-digital",
    moduleSlug: "marketing",
    lessonSlug: "annonces",
    title: "Calculer le ROI de son budget marketing",
    scenario:
      "Vous gérez une agence immobilière et souhaitez mesurer le retour sur investissement de votre budget marketing digital. Abonnement SeLoger : 2 400 €/an. Photos professionnelles : 150 €/bien pour 12 biens. En 2025, 8 ventes ont été directement générées via vos annonces en ligne. Panier moyen : 295 000 €, taux d'honoraires : 4 %.",
    propertyContext: [
      { label: "Budget SeLoger/an", value: "2 400 €", icon: "📢" },
      { label: "Photos pro (12 biens)", value: "1 800 €", icon: "📷" },
      { label: "Ventes via annonces", value: "8 ventes", icon: "✅" },
      { label: "Panier moyen", value: "295 000 €", icon: "🏠" },
    ],
    steps: [
      {
        id: "s1",
        stepNumber: 1,
        title: "Budget total marketing annuel",
        instruction: "Calculez le budget marketing total en additionnant l'abonnement SeLoger (2 400 €) et le coût des photos professionnelles pour 12 biens à 150 €/bien.",
        formula: "Budget total = Abonnement + (Photos/bien × Nombre de biens)",
        hint: "2 400 + (150 × 12) = 2 400 + 1 800",
        inputLabel: "Budget marketing total",
        inputUnit: "€",
        correctValue: 4200,
        tolerance: 0,
        explanation:
          "4 200 €/an de budget marketing. C'est un investissement modeste pour une agence — la question est de savoir ce qu'il génère en retour.",
      },
      {
        id: "s2",
        stepNumber: 2,
        title: "Honoraires par vente",
        instruction: "Calculez les honoraires générés par une seule vente au panier moyen de 295 000 € avec un taux de 4 %.",
        formula: "Honoraires/vente = Prix moyen × Taux honoraires",
        hint: "295 000 × 4 % = 295 000 × 0,04",
        inputLabel: "Honoraires par vente",
        inputUnit: "€",
        correctValue: 11800,
        tolerance: 0,
        explanation:
          "11 800 € d'honoraires par vente. C'est le revenu brut généré par chaque transaction avant frais de structure.",
      },
      {
        id: "s3",
        stepNumber: 3,
        title: "CA total généré",
        instruction: "Calculez le chiffre d'affaires total généré par les 8 ventes issues de vos annonces en ligne.",
        formula: "CA total = Nombre de ventes × Honoraires/vente",
        hint: "8 × 11 800",
        inputLabel: "CA total généré",
        inputUnit: "€",
        correctValue: 94400,
        tolerance: 0,
        explanation:
          "94 400 € de CA généré par les annonces digitales. Ce chiffre met en perspective l'investissement marketing de 4 200 €.",
      },
      {
        id: "s4",
        stepNumber: 4,
        title: "ROI du budget marketing",
        instruction: "Calculez le ROI (Return On Investment) de votre budget marketing. Formule : (CA généré − Budget) ÷ Budget × 100.",
        formula: "ROI = (CA − Budget) ÷ Budget × 100",
        hint: "(94 400 − 4 200) ÷ 4 200 × 100 ≈ 2 148 %",
        inputLabel: "ROI",
        inputUnit: "%",
        correctValue: 2148,
        tolerance: 50,
        explanation:
          "Un ROI de 2 148 % signifie que chaque euro investi en marketing rapporte 22 € de CA. C'est exceptionnel — à comparer avec la publicité digitale classique (ROI moyen de 200 à 400 %). La raison : les paniers immobiliers sont élevés, donc chaque vente a un effet de levier massif.",
      },
      {
        id: "s5",
        stepNumber: 5,
        title: "Coût d'acquisition par vente",
        instruction: "Calculez le coût moyen pour acquérir un client via vos annonces (budget total ÷ nombre de ventes générées).",
        formula: "Coût acquisition = Budget total ÷ Ventes générées",
        hint: "4 200 ÷ 8",
        inputLabel: "Coût d'acquisition",
        inputUnit: "€",
        correctValue: 525,
        tolerance: 0,
        explanation:
          "525 € par vente générée via annonces en ligne. Rapporté aux 11 800 € d'honoraires, le coût d'acquisition représente seulement 4,4 % du revenu par vente — un ratio excellent. Objectif : maintenir ce ratio sous 10 % en optimisant les annonces (photos pro, descriptions, prix cohérents).",
      },
    ],
    finalSummary:
      "ROI de 2 148 % pour un budget de 4 200 €, soit 525 € de coût d'acquisition par vente. La photographie professionnelle (150 €/bien) est l'investissement le plus rentable : les biens avec photos pro se vendent 30 % plus vite et attirent 40 % de contacts supplémentaires selon les études SeLoger. Augmentez votre budget annonces de 20 % si votre taux de conversion reste stable.",
  },
];

export function getGuidedCalculations(
  moduleSlug: string,
  lessonSlug: string,
): GuidedCalculation[] {
  return ALL.filter(
    (c) => c.moduleSlug === moduleSlug && c.lessonSlug === lessonSlug,
  );
}
