/**
 * Concepts cles, chiffres et tableaux pour chaque lecon.
 * Affiches sous le player audio pour une experience visuelle immersive.
 */

export type KeyConcept = {
  icon: string;
  title: string;
  description: string;
  type: "definition" | "rule" | "tip" | "warning" | "stat";
};

export type StatCard = {
  label: string;
  value: string;
  unit?: string;
  color: "navy" | "gold" | "green" | "red" | "blue";
};

export type ComparisonRow = {
  label: string;
  colA: string;
  colB: string;
  highlight?: "a" | "b";
};

export type LessonVisuals = {
  keyConcepts: KeyConcept[];
  stats?: StatCard[];
  comparison?: {
    title: string;
    colAHeader: string;
    colBHeader: string;
    rows: ComparisonRow[];
  };
  /** Points cles a retenir (bullet points) */
  takeaways?: string[];
};

export const LESSON_VISUALS: Record<string, LessonVisuals> = {
  // ─── MODULE 1 : JURIDIQUE ─────────────────────────
  "juridique/loi-alur": {
    keyConcepts: [
      { icon: "balance-scale", title: "Loi ALUR", description: "Acces au Logement et Urbanisme Renove — 24 mars 2014", type: "definition" },
      { icon: "id-card", title: "Carte T", description: "Carte professionnelle obligatoire delivree par la CCI, renouvelable tous les 3 ans", type: "rule" },
      { icon: "graduation-cap", title: "42h de formation", description: "Formation continue obligatoire pour le renouvellement de la carte professionnelle", type: "rule" },
      { icon: "eye", title: "Transparence", description: "Honoraires affiches en vitrine ET sur chaque annonce (% TTC du prix)", type: "warning" },
    ],
    stats: [
      { label: "Formation obligatoire", value: "42", unit: "heures", color: "gold" },
      { label: "Renouvellement carte", value: "3", unit: "ans", color: "navy" },
      { label: "Delai retractation", value: "10", unit: "jours (acquéreur)", color: "blue" }
    ],
    takeaways: [
      "La loi ALUR encadre l'ensemble de l'activite d'agent immobilier",
      "Affichage obligatoire des honoraires en vitrine et sur les annonces",
      "42h de formation continue pour renouveler la carte professionnelle",
      "Sanctions penales en cas de non-conformite",
    ],
  },
  "juridique/compromis": {
    keyConcepts: [
      { icon: "file-signature", title: "Compromis synallagmatique", description: "Engagement bilateral : vendeur et acheteur sont lies", type: "definition" },
      { icon: "clock", title: "Delai SRU", description: "10 jours de retractation sans justification pour l'acquéreur particulier apres notification du compromis", type: "rule" },
      { icon: "shield", title: "Conditions suspensives", description: "Pret, servitudes, preemption, diagnostics", type: "tip" },
    ],
    stats: [
      { label: "Retractation", value: "10", unit: "jours", color: "red" },
      { label: "Depot de garantie", value: "5-10", unit: "% du prix", color: "navy" },
      { label: "Delai moyen", value: "3", unit: "mois", color: "blue" },
    ],
    comparison: {
      title: "Compromis vs Promesse de vente",
      colAHeader: "Compromis",
      colBHeader: "Promesse unilaterale",
      rows: [
        { label: "Engagement", colA: "Bilateral (vendeur + acheteur)", colB: "Unilateral (vendeur seul)", highlight: "a" },
        { label: "Indemnite", colA: "Depot de garantie 5-10%", colB: "Indemnite d'immobilisation ~10%", highlight: "b" },
        { label: "Enregistrement", colA: "Pas obligatoire", colB: "Obligatoire sous 10 jours", highlight: "b" },
        { label: "Usage", colA: "Le plus courant", colB: "Cas specifiques", highlight: "a" },
      ],
    },
  },
  "juridique/diagnostics": {
    keyConcepts: [
      { icon: "thermometer", title: "DPE", description: "Diagnostic de Performance Energetique — valable 10 ans, obligatoire vente et location", type: "rule" },
      { icon: "alert-triangle", title: "Amiante", description: "Obligatoire pour tout bien dont le permis date d'avant juillet 1997", type: "warning" },
      { icon: "zap", title: "Electricite/Gaz", description: "Obligatoire si l'installation a plus de 15 ans", type: "rule" },
    ],
    stats: [
      { label: "Validite DPE", value: "10", unit: "ans", color: "green" },
      { label: "Seuil amiante", value: "1997", unit: "", color: "red" },
      { label: "Seuil elec/gaz", value: "15", unit: "ans", color: "gold" },
      { label: "Diagnostics min.", value: "8", unit: "types", color: "navy" },
    ],
  },
  "juridique/mandats": {
    keyConcepts: [
      { icon: "file-text", title: "Mandat exclusif", description: "Une seule agence, taux de vente 80-90% en 3 mois", type: "tip" },
      { icon: "users", title: "Mandat simple", description: "Plusieurs agences, taux de vente 30-40%", type: "definition" },
      { icon: "clock", title: "Duree irrevocable", description: "3 mois minimum par defaut, resiliable par LRAR apres", type: "rule" },
    ],
    comparison: {
      title: "Exclusif vs Simple vs Semi-exclusif",
      colAHeader: "Exclusif",
      colBHeader: "Simple",
      rows: [
        { label: "Taux de vente", colA: "80-90%", colB: "30-40%", highlight: "a" },
        { label: "Investissement agence", colA: "Eleve (pub, visites)", colB: "Faible", highlight: "a" },
        { label: "Concurrence", colA: "Aucune", colB: "Multi-agences", highlight: "b" },
        { label: "Commission", colA: "Garantie si vente", colB: "Risque de perte", highlight: "a" },
      ],
    },
  },

  // ─── MODULE 2 : TRANSACTION ───────────────────────
  "transaction/estimation": {
    keyConcepts: [
      { icon: "search", title: "Methode comparative", description: "Prix au m2 du secteur sur les 6 derniers mois — la plus courante", type: "definition" },
      { icon: "trending-up", title: "Capitalisation", description: "Valeur = Loyer annuel / Taux de rendement attendu", type: "definition" },
      { icon: "sliders", title: "Hedoniste", description: "Ponderation de criteres : etage, exposition, etat, parking...", type: "tip" },
    ],
    stats: [
      { label: "Marge d'erreur cible", value: "+-5", unit: "%", color: "green" },
      { label: "Comparables min.", value: "5", unit: "biens", color: "navy" },
      { label: "Periode d'analyse", value: "6", unit: "mois", color: "blue" },
    ],
  },
  "transaction/negociation-mandat": {
    keyConcepts: [
      { icon: "target", title: "Technique SPIN", description: "Situation → Probleme → Implication → Need-payoff", type: "tip" },
      { icon: "shield", title: "BATNA", description: "Best Alternative To Negotiated Agreement — toujours preparer son plan B", type: "definition" },
      { icon: "anchor", title: "Ancrage", description: "La premiere offre influence tout le reste de la negociation", type: "warning" },
    ],
  },
  "transaction/crm": {
    keyConcepts: [
      { icon: "database", title: "Pipeline de mandats", description: "Visualiser chaque mandat par etape : prospection → visite → offre → compromis", type: "definition" },
      { icon: "clock", title: "Regle des 72h", description: "Contacter le visiteur dans les 72h — au-dela, l'interet chute", type: "warning" },
      { icon: "repeat", title: "Automatisation", description: "Relances automatiques, anniversaires, alertes prix", type: "tip" },
    ],
    stats: [
      { label: "Relance ideale", value: "72", unit: "heures", color: "red" },
      { label: "Suivi post-vente", value: "J+30/90/365", unit: "", color: "gold" },
    ],
  },

  // ─── MODULE 3 : FINANCEMENT ───────────────────────
  "financement/credit": {
    keyConcepts: [
      { icon: "percent", title: "Taux HCSF", description: "Endettement maximum 35% des revenus nets, assurance incluse", type: "rule" },
      { icon: "calendar", title: "Duree max", description: "25 ans (27 ans dans le neuf avec differe)", type: "rule" },
      { icon: "gift", title: "PTZ", description: "Pret a Taux Zero pour primo-accedants, jusqu'a 40% du bien", type: "tip" },
    ],
    stats: [
      { label: "Endettement max", value: "35", unit: "%", color: "red" },
      { label: "Duree max pret", value: "25", unit: "ans", color: "navy" },
      { label: "PTZ max", value: "40", unit: "% du bien", color: "green" },
      { label: "Apport conseille", value: "10", unit: "% min", color: "gold" },
    ],
    comparison: {
      title: "Taux fixe vs Taux variable",
      colAHeader: "Taux fixe",
      colBHeader: "Taux variable",
      rows: [
        { label: "Securite", colA: "Mensualite constante", colB: "Risque de hausse", highlight: "a" },
        { label: "Taux initial", colA: "Plus eleve", colB: "Plus bas au depart", highlight: "b" },
        { label: "Profil ideal", colA: "Prudent, long terme", colB: "Court terme, investisseur", highlight: "a" },
        { label: "Part de marche FR", colA: "~95%", colB: "~5%", highlight: "a" },
      ],
    },
  },
  "financement/fiscalite": {
    keyConcepts: [
      { icon: "file-text", title: "Revenus fonciers", description: "Regime micro-foncier (<15k) ou reel (deduction des charges)", type: "definition" },
      { icon: "trending-down", title: "Deficit foncier", description: "Deductible jusqu'a 10 700 EUR/an du revenu global", type: "tip" },
      { icon: "home", title: "Plus-value", description: "Exoneration totale sur la residence principale", type: "rule" },
    ],
    stats: [
      { label: "Micro-foncier seuil", value: "15 000", unit: "EUR", color: "gold" },
      { label: "Abattement micro", value: "30", unit: "%", color: "green" },
      { label: "Deficit foncier max", value: "10 700", unit: "EUR/an", color: "navy" },
    ],
  },
  "financement/rentabilite": {
    keyConcepts: [
      { icon: "bar-chart", title: "Rendement brut", description: "(Loyer annuel / Prix achat) x 100", type: "definition" },
      { icon: "bar-chart-2", title: "Rendement net", description: "Apres charges, taxe fonciere, vacance, gestion", type: "definition" },
      { icon: "dollar-sign", title: "Cash flow", description: "Loyer net - Mensualite credit = tresorerie mensuelle", type: "tip" },
    ],
    stats: [
      { label: "Brut moyen France", value: "5-7", unit: "%", color: "green" },
      { label: "Ecart brut/net", value: "1.5-2.5", unit: "pts", color: "red" },
      { label: "Vacance a prevoir", value: "1", unit: "mois/an", color: "gold" },
    ],
  },

  // ─── MODULE 4 : MARKETING ────────────────────────
  "marketing/photos": {
    keyConcepts: [
      { icon: "camera", title: "Grand-angle", description: "Focale 16-24mm, hauteur poitrine, 3 photos min par piece", type: "rule" },
      { icon: "sun", title: "Lumiere naturelle", description: "Fenetres degagees, rideaux ouverts, pas de flash direct", type: "tip" },
      { icon: "layout", title: "Home staging", description: "Ranger, depersonnaliser, ajouter quelques touches (plantes, coussins)", type: "tip" },
    ],
    stats: [
      { label: "Photos minimum", value: "10", unit: "par annonce", color: "navy" },
      { label: "Impact 1ere photo", value: "90", unit: "% des clics", color: "gold" },
      { label: "Photos ideales", value: "15-20", unit: "", color: "green" },
    ],
  },
  "marketing/annonces": {
    keyConcepts: [
      { icon: "edit", title: "Titre structure", description: "Type + Atout principal + Localisation", type: "rule" },
      { icon: "align-left", title: "Description", description: "Accroche emotionnelle → Caracteristiques → Quartier → CTA", type: "tip" },
      { icon: "alert-circle", title: "Mentions ALUR", description: "Prix, honoraires, DPE, charges copro obligatoires", type: "warning" },
    ],
    stats: [
      { label: "Longueur ideale", value: "150-250", unit: "mots", color: "navy" },
      { label: "Temps de lecture", value: "45", unit: "sec max", color: "gold" },
    ],
  },

  // ─── MODULE 5 : TERRAIN ──────────────────────────
  "terrain/visite": {
    keyConcepts: [
      { icon: "map-pin", title: "Accueil (5 min)", description: "Creer le lien, comprendre les attentes, poser le cadre", type: "definition" },
      { icon: "compass", title: "Decouverte (20 min)", description: "Parcours logique, points forts, storytelling du bien", type: "tip" },
      { icon: "check-circle", title: "Conclusion (5 min)", description: "Synthese, objections, prochain pas", type: "rule" },
    ],
    stats: [
      { label: "Duree ideale", value: "30", unit: "min", color: "navy" },
      { label: "Signaux d'achat", value: "5+", unit: "a observer", color: "green" },
    ],
  },
  "terrain/closing": {
    keyConcepts: [
      { icon: "check-square", title: "Closing alternatif", description: "Proposer 2 options positives : 'Jeudi ou vendredi ?' au lieu de 'Oui ou non ?'", type: "tip" },
      { icon: "clock", title: "Urgence legitime", description: "D'autres visites sont prevues — creer l'urgence sans pression", type: "warning" },
      { icon: "thumbs-up", title: "Engagement progressif", description: "Petits oui successifs menant naturellement a la decision", type: "tip" },
    ],
  },
  "terrain/fidelisation": {
    keyConcepts: [
      { icon: "heart", title: "Moment cle", description: "Demander la recommandation a la remise des cles (pic emotionnel)", type: "tip" },
      { icon: "star", title: "Avis Google", description: "Solliciter un avis dans les 48h apres la remise des cles", type: "rule" },
      { icon: "repeat", title: "Suivi long terme", description: "J+30 (installation), J+90 (satisfaction), J+365 (anniversaire)", type: "tip" },
    ],
    stats: [
      { label: "Taux de parrainage", value: "15-25", unit: "%", color: "gold" },
      { label: "Cout acquisition", value: "0", unit: "EUR", color: "green" },
      { label: "Valeur client vie", value: "3-5x", unit: "1ere vente", color: "navy" },
    ],
  },

  // ═══ LECONS PRECEDEMMENT VIDES — RENDUES INCROYABLES ═══

  // ─── M1 : leçons manquantes ───────────────────────
  "juridique/tracfin": {
    keyConcepts: [
      { icon: "shield", title: "TRACFIN", description: "Service de renseignement financier placé sous le Ministère de l'Économie depuis 1990", type: "definition" },
      { icon: "eye", title: "3 obligations", description: "Vigilance — Examen renforcé — Déclaration de soupçon", type: "rule" },
      { icon: "alert-triangle", title: "Signaux d'alerte", description: "Paiement en cash, société écran, bénéficiaire effectif masqué, urgence inhabituelle", type: "warning" },
    ],
    stats: [
      { label: "Sanctions max", value: "5", unit: "ans", color: "red" },
      { label: "Amende max", value: "375 000", unit: "EUR", color: "red" },
      { label: "Délai déclaration", value: "Sans", unit: "délai", color: "gold" },
    ],
    comparison: {
      title: "Blanchiment vs Financement du terrorisme",
      colAHeader: "Blanchiment",
      colBHeader: "Financement terrorisme",
      rows: [
        { label: "Origine des fonds", colA: "Illégale", colB: "Peut être légale", highlight: "a" },
        { label: "Objectif", colA: "Dissimuler l'origine", colB: "Financer activité illégale", highlight: "b" },
        { label: "Article Code pénal", colA: "324-1", colB: "421-2-1", highlight: "a" },
      ],
    },
    takeaways: [
      "Identifier et vérifier l'identité de chaque client avant toute relation d'affaires",
      "Repérer les signaux d'alerte et les situations atypiques",
      "Déclarer tout soupçon sans délai sur la plateforme ERMES",
      "Conserver une trace écrite de la vigilance appliquée",
    ],
  },
  "juridique/non-discrimination": {
    keyConcepts: [
      { icon: "balance-scale", title: "Article 225-1", description: "25 critères de discrimination prohibés dans l'accès au logement", type: "rule" },
      { icon: "users", title: "Discrimination indirecte", description: "Règle apparemment neutre qui désavantage un groupe protégé", type: "definition" },
      { icon: "check-circle", title: "Grille conforme", description: "Sélection basée sur les ressources, la situation professionnelle et les garanties", type: "tip" },
    ],
    stats: [
      { label: "Sanctions", value: "3", unit: "ans", color: "red" },
      { label: "Amende", value: "45 000", unit: "EUR", color: "red" },
      { label: "Critères interdits", value: "25", unit: "", color: "navy" },
    ],
    takeaways: [
      "Connaître les 25 critères de discrimination prohibés par l'article 225-1",
      "Différencier discrimination directe, indirecte et par association",
      "Utiliser une grille de sélection locataire objective et justifiable",
      "Savoir répondre professionnellement à une demande discriminatoire",
    ],
  },
  "juridique/baux-habitation": {
    keyConcepts: [
      { icon: "file-text", title: "Loi du 6 juillet 1989", description: "Texte fondateur des baux d'habitation, modifié par ALUR et ELAN", type: "rule" },
      { icon: "calendar", title: "Durées", description: "Vide : 3 ans (PP) / 6 ans (PM) — Meublé : 1 an (9 mois étudiant)", type: "definition" },
      { icon: "thermometer", title: "Passoires énergétiques", description: "Logements classés F ou G ne peuvent plus être loués dans les zones tendues", type: "warning" },
    ],
    stats: [
      { label: "Bail vide PP", value: "3", unit: "ans", color: "navy" },
      { label: "Bail meublé", value: "1", unit: "an", color: "blue" },
      { label: "Dépôt garantie", value: "1", unit: "mois", color: "gold" },
    ],
    comparison: {
      title: "Bail vide vs Bail meublé",
      colAHeader: "Bail vide",
      colBHeader: "Bail meublé",
      rows: [
        { label: "Durée (PP)", colA: "3 ans", colB: "1 an", highlight: "a" },
        { label: "Durée (étudiant)", colA: "3 ans", colB: "9 mois", highlight: "b" },
        { label: "Abattement fiscal", colA: "30 %", colB: "50 %", highlight: "b" },
        { label: "Mobilier", colA: "Non fourni", colB: "Obligatoire", highlight: "b" },
      ],
    },
    takeaways: [
      "Maîtriser la loi du 6 juillet 1989 et ses évolutions récentes",
      "Rédiger un bail avec toutes les mentions et annexes obligatoires",
      "Appliquer l'encadrement des loyers dans les zones tendues",
      "Gérer les logements classés F et G selon la loi Climat",
    ],
  },

  // ─── M2 : leçons manquantes ───────────────────────
  "transaction/offre-achat-avant-contrats": {
    keyConcepts: [
      { icon: "file-signature", title: "Offre d'achat", description: "Manifestation d'intention régie par les articles 1113 et suivants du Code civil", type: "definition" },
      { icon: "shield", title: "Promesse unilatérale", description: "Le vendeur s'engage seul ; l'acquéreur a une option", type: "tip" },
      { icon: "check-square", title: "Promesse synallagmatique", description: "Compromis : les deux parties s'engagent mutuellement", type: "rule" },
    ],
    stats: [
      { label: "Validité offre", value: "5-10", unit: "jours", color: "navy" },
      { label: "Indemnité d'immobilisation", value: "5-10", unit: "%", color: "gold" },
      { label: "Enregistrement PUV", value: "10", unit: "jours", color: "red" },
    ],
    comparison: {
      title: "Promesse unilatérale vs Synallagmatique",
      colAHeader: "Promesse unilatérale",
      colBHeader: "Synallagmatique (compromis)",
      rows: [
        { label: "Engagement", colA: "Vendeur seul", colB: "Bilateral", highlight: "b" },
        { label: "Acquéreur", colA: "Option d'achat", colB: "Lié dès signature", highlight: "a" },
        { label: "Indemnité", colA: "Immobilisation", colB: "Dépôt de garantie", highlight: "a" },
        { label: "Enregistrement", colA: "Obligatoire 10j", colB: "Pas obligatoire", highlight: "a" },
      ],
    },
    takeaways: [
      "Rédiger une offre d'achat sécurisée avec délai de validité précis",
      "Distinguer promesse unilatérale et promesse synallagmatique",
      "Maîtriser les conditions suspensives et leurs conséquences",
      "Gérer le délai de rétractation de 10 jours francs",
    ],
  },
  "transaction/acte-authentique": {
    keyConcepts: [
      { icon: "file-text", title: "Acte authentique", description: "Rédigé par le notaire, il rend la vente opposable aux tiers après publication", type: "definition" },
      { icon: "clock", title: "Diagnostics", description: "Vérifier les durées de validité avant signature notariale", type: "warning" },
      { icon: "users", title: "État daté", description: "Document obligatoire du syndic récapitulant la situation financière du lot", type: "rule" },
    ],
    stats: [
      { label: "DPE", value: "10", unit: "ans", color: "green" },
      { label: "Élec / Gaz", value: "3", unit: "ans", color: "gold" },
      { label: "État des risques", value: "6", unit: "mois", color: "red" },
    ],
    takeaways: [
      "Coordonner les vérifications avant la signature notariale",
      "Expliquer la composition des frais de notaire",
      "Anticiper les situations complexes : procuration, état daté, diagnostics périmés",
      "Accompagner ses clients de la promesse à la remise des clés",
    ],
  },

  // ─── M3 : leçons manquantes ───────────────────────
  "financement/defiscalisation": {
    keyConcepts: [
      { icon: "calendar", title: "Dispositifs historiques", description: "Besson, Robien, Borloo, Scellier, Duflot, Pinel — chacun avec ses propres règles", type: "definition" },
      { icon: "target", title: "Dispositifs actifs 2026", description: "Denormandie, Loc'Avantages, Malraux, Monuments Historiques", type: "tip" },
      { icon: "alert-triangle", title: "Fin du Pinel", description: "Le Pinel a pris fin le 31 décembre 2024 — orienter vers les dispositifs remplaçants", type: "warning" },
    ],
    stats: [
      { label: "Robien", value: "65", unit: "% amort.", color: "navy" },
      { label: "Scellier", value: "25", unit: "% réduc.", color: "blue" },
      { label: "Duflot", value: "18", unit: "% réduc.", color: "gold" },
    ],
    comparison: {
      title: "Anciens vs Actifs en 2026",
      colAHeader: "Anciens (obsolètes)",
      colBHeader: "Actifs",
      rows: [
        { label: "Exemples", colA: "Besson, Robien, Scellier, Pinel", colB: "Denormandie, Cosse, Malraux", highlight: "b" },
        { label: "Logement visé", colA: "Neuf / ancien selon époque", colB: "Rénovation ancien / social / patrimoine", highlight: "b" },
        { label: "Conseil", colA: "Connaître pour répondre aux clients", colB: "Orienter les nouveaux investisseurs", highlight: "b" },
      ],
    },
    takeaways: [
      "Connaître l'histoire des dispositifs Besson, Robien, Scellier, Pinel",
      "Maîtriser les dispositifs actifs en 2025-2026 : Denormandie, Cosse, Malraux",
      "Expliquer la fin du Pinel (31/12/2024) aux clients investisseurs",
      "Orienter vers un conseiller en gestion de patrimoine pour l'optimisation fiscale",
    ],
  },

  // ─── M4 : leçons manquantes ───────────────────────
  "marketing/video-visite-virtuelle": {
    keyConcepts: [
      { icon: "camera", title: "3 formats", description: "Vidéo courte (30-60s), Visite guidée (2-4min), Visite virtuelle 360°", type: "definition" },
      { icon: "zap", title: "Impact vidéo", description: "Les annonces avec vidéo génèrent 403% plus de demandes de visite", type: "stat" },
      { icon: "target", title: "Équipement minimum", description: "Smartphone + gimbal (80-150€) + micro cravate (60-120€)", type: "tip" },
    ],
    stats: [
      { label: "Impact vidéo", value: "+403", unit: "% demandes", color: "green" },
      { label: "Gimbal", value: "80-150", unit: "EUR", color: "navy" },
      { label: "Micro", value: "60-120", unit: "EUR", color: "gold" },
    ],
    takeaways: [
      "Filmer une visite professionnelle avec un smartphone et un gimbal",
      "Créer une visite virtuelle 360° avec Matterport ou iStaging",
      "Distribuer les vidéos sur SeLoger, YouTube et Instagram Reels",
      "Analyser les performances vidéo pour optimiser les annonces",
    ],
  },
  "marketing/personal-branding": {
    keyConcepts: [
      { icon: "star", title: "3 piliers", description: "Cohérence visuelle — Positionnement — Crédibilité (preuves sociales)", type: "definition" },
      { icon: "search", title: "Google Business Profile", description: "Vitrine gratuite et outil de référencement local incontournable", type: "tip" },
      { icon: "shield", title: "Gestion des avis", description: "Répondre à tous les avis, positifs comme négatifs, de manière professionnelle", type: "rule" },
    ],
    stats: [
      { label: "Photos GBP min", value: "15", unit: "", color: "navy" },
      { label: "Crédibilité spécialisé", value: "3x", unit: "plus", color: "green" },
      { label: "Temps 1ère opinion", value: "30", unit: "sec", color: "gold" },
    ],
    takeaways: [
      "Construire une identité visuelle cohérente sur tous les canaux",
      "Optimiser sa fiche Google Business Profile pour dominer localement",
      "Gérer les avis clients et les crises d'e-réputation",
      "Se positionner comme expert sur LinkedIn pour attirer les mandants",
    ],
  },

  // ─── M5 : leçons manquantes ───────────────────────
  "terrain/r0-r1-r2": {
    keyConcepts: [
      { icon: "target", title: "R0 — Qualification", description: "Appel téléphonique pour recueillir 5 infos clés et qualifier le prospect", type: "definition" },
      { icon: "compass", title: "R1 — Visite", description: "Comprendre le bien ET le propriétaire (SONCAS) — sans annoncer le prix", type: "tip" },
      { icon: "check-circle", title: "R2 — Présentation", description: "Dossier d'estimation argumenté et signature du mandat", type: "rule" },
    ],
    stats: [
      { label: "Mandats perdus", value: "60", unit: "%", color: "red" },
      { label: "Infos R0", value: "5", unit: "clés", color: "navy" },
      { label: "Profils SONCAS", value: "6", unit: "types", color: "gold" },
    ],
    takeaways: [
      "Qualifier efficacement un prospect par téléphone (R0)",
      "Conduire la visite du bien et la découverte vendeur (R1)",
      "Présenter une estimation argumentée et signer le mandat (R2)",
      "Ne jamais annoncer un prix avant d'avoir des données marché formalisées",
    ],
  },
  "terrain/decouverte-client": {
    keyConcepts: [
      { icon: "search", title: "Iceberg client", description: "Une majorité d'acheteurs signent finalement pour un bien différent de leur demande initiale", type: "stat" },
      { icon: "users", title: "4 catégories", description: "Contexte de vie — Critères absolus — Dimension financière — Projet futur", type: "definition" },
      { icon: "target", title: "Suivi 30 jours", description: "Structurer un suivi acquéreur sur 30 jours pour convertir sans forcer", type: "tip" },
    ],
    stats: [
      { label: "Acheteurs pivot", value: "73", unit: "%", color: "green" },
      { label: "Catégories questions", value: "4", unit: "", color: "navy" },
      { label: "Suivi optimal", value: "30", unit: "jours", color: "gold" },
    ],
    takeaways: [
      "Identifier les besoins profonds d'un acquéreur avec la méthode iceberg",
      "Poser les 4 catégories de questions de découverte client",
      "Mettre à jour la fiche acquéreur après chaque contact",
      "Structurer un suivi acquéreur sur 30 jours pour convertir sans forcer",
    ],
  },

  // ─── M1 : leçons manquantes complémentaires ───────────────────────
  "juridique/copropriete": {
    keyConcepts: [
      { icon: "users", title: "Syndicat de copropriété", description: "Entité juridique obligatoire dès 2 lots, représentée par le syndic", type: "definition" },
      { icon: "file-text", title: "Règlement de copropriété", description: "Document fondateur fixant les droits, charges et parties communes", type: "rule" },
      { icon: "alert-triangle", title: "Charges courantes vs travaux", description: "Charges = entretien courant. Travaux votés en AG = provisions exigibles", type: "warning" },
      { icon: "calendar", title: "État daté", description: "Document obligatoire du syndic lors d'une vente — à obtenir sous 10 jours max", type: "rule" },
    ],
    stats: [
      { label: "Lots en copropriété", value: "9M", unit: "France", color: "navy" },
      { label: "Fonds travaux obligatoire", value: "5", unit: "% charges/an", color: "gold" },
      { label: "Délai état daté", value: "10", unit: "jours", color: "blue" },
    ],
    comparison: {
      title: "Parties communes vs Parties privatives",
      colAHeader: "Communes",
      colBHeader: "Privatives",
      rows: [
        { label: "Accès", colA: "Tous copropriétaires", colB: "Propriétaire seul", highlight: "b" },
        { label: "Charges", colA: "Réparties par tantièmes", colB: "À la charge du propriétaire", highlight: "a" },
        { label: "Travaux", colA: "Vote en AG", colB: "Libre sauf règlement", highlight: "a" },
        { label: "Exemple", colA: "Hall, ascenseur, toiture", colB: "Appartement, cave", highlight: "b" },
      ],
    },
    takeaways: [
      "Lire le règlement de copropriété avant toute transaction",
      "Vérifier l'état financier du syndicat (dettes, provisions, fonds travaux)",
      "Obtenir l'état daté auprès du syndic dès la promesse",
      "Expliquer les charges et les travaux votés à l'acquéreur",
    ],
  },

  "juridique/parcours-interactif": {
    keyConcepts: [
      { icon: "eye", title: "Affichage obligatoire", description: "Prix TTC + honoraires TTC en vitrine ET sur chaque annonce sans exception", type: "rule" },
      { icon: "file-signature", title: "Traçabilité", description: "Conserver une preuve de validation de chaque annonce (email, CRM)", type: "tip" },
      { icon: "alert-triangle", title: "Sanctions encourues", description: "Amende administrative jusqu'à 15 000 € pour une agence non conforme", type: "warning" },
    ],
    stats: [
      { label: "Amende max agence", value: "15 000", unit: "EUR", color: "red" },
      { label: "Délai de mise aux normes", value: "Immédiat", unit: "", color: "gold" },
      { label: "Affichage en vitrine", value: "100", unit: "% obligatoire", color: "navy" },
    ],
    takeaways: [
      "Afficher prix et honoraires sur chaque support sans exception",
      "Valider chaque annonce par écrit avant diffusion",
      "Consulter un référent juridique en cas de doute",
      "Ne jamais différer la mise en conformité pour conserver un mandat",
    ],
  },

  // ─── M2 : leçons manquantes ───────────────────────
  "transaction/prospection": {
    keyConcepts: [
      { icon: "map-pin", title: "Farming géo", description: "Zone de prospection de 300 boîtes aux lettres exploitée sur 2 ans minimum", type: "definition" },
      { icon: "target", title: "Script entrant", description: "Répondre à un appel acheteur et le convertir en rendez-vous vendeur", type: "tip" },
      { icon: "repeat", title: "Fréquence de contact", description: "7 touches en moyenne avant qu'un prospect accepte un rendez-vous", type: "warning" },
      { icon: "star", title: "Prospection digitale", description: "Alertes prix, Facebook Marketplace, LinkedIN et Google Business Profile", type: "tip" },
    ],
    stats: [
      { label: "Touches avant RDV", value: "7", unit: "contacts", color: "gold" },
      { label: "Zone farming idéale", value: "300", unit: "boîtes", color: "navy" },
      { label: "Taux conversion flyer", value: "0.3-1", unit: "%", color: "blue" },
      { label: "Coût lead digital", value: "15-50", unit: "EUR", color: "green" },
    ],
    takeaways: [
      "Choisir et défendre une zone farming de 300 boîtes sur 24 mois minimum",
      "Rédiger un script téléphonique qui obtient des RDV en moins de 90 secondes",
      "Automatiser la prospection digitale (alertes, farming, pub locale)",
      "Bâtir un plan de prospection hebdomadaire et le tenir coûte que coûte",
    ],
  },

  "transaction/negociation-avancee": {
    keyConcepts: [
      { icon: "shield", title: "BATNA", description: "Best Alternative To Negotiated Agreement — votre valeur de repli avant d'entrer en négociation", type: "definition" },
      { icon: "anchor", title: "Effet d'ancrage", description: "Toujours formuler la première offre : elle oriente psychologiquement l'ensemble de la négociation", type: "warning" },
      { icon: "sliders", title: "Technique du Vise Haute", description: "Commencer haut pour laisser de la marge de concession visible et valorisée", type: "tip" },
      { icon: "thumbs-up", title: "ZOPA", description: "Zone Of Possible Agreement — l'espace commun où l'accord est mutuellement acceptable", type: "definition" },
    ],
    stats: [
      { label: "Gain moyen supra-BATNA", value: "+8", unit: "%", color: "green" },
      { label: "Temps de silence max", value: "7", unit: "secondes", color: "gold" },
      { label: "Contre-offres moyennes", value: "2-3", unit: "rounds", color: "navy" },
    ],
    comparison: {
      title: "Négociation distributive vs Intégrative",
      colAHeader: "Distributive",
      colBHeader: "Intégrative",
      rows: [
        { label: "Logique", colA: "Gagnant-perdant", colB: "Gagnant-gagnant", highlight: "b" },
        { label: "Usage", colA: "Transaction unique", colB: "Relation durable", highlight: "b" },
        { label: "Levier", colA: "Prix uniquement", colB: "Modalités, délais, garanties", highlight: "b" },
        { label: "Résultat", colA: "Accord rapide", colB: "Accord plus solide", highlight: "b" },
      ],
    },
    takeaways: [
      "Calculer son BATNA avant chaque négociation",
      "Ancrer en premier avec une offre audacieuse mais justifiée",
      "Utiliser le silence comme outil de pression positive",
      "Transformer un désaccord de prix en accord sur les modalités",
    ],
  },

  // ─── M3 : leçons manquantes ───────────────────────
  "financement/dispositifs": {
    keyConcepts: [
      { icon: "target", title: "Denormandie", description: "Réduction 12-21% pour rénovation dans 245 villes — conditions ressources locataire", type: "tip" },
      { icon: "home", title: "Malraux", description: "22-30% de réduction pour restauration de biens en secteur sauvegardé", type: "definition" },
      { icon: "star", title: "Monuments Historiques", description: "Déduction du revenu global sans plafond pour biens classés ou inscrits", type: "tip" },
      { icon: "alert-triangle", title: "Fin du Pinel", description: "Dispositif Pinel terminé le 31/12/2024 — orienter vers Denormandie et Loc'Avantages", type: "warning" },
    ],
    stats: [
      { label: "Réduction Denormandie", value: "21", unit: "% max", color: "green" },
      { label: "Réduction Malraux", value: "30", unit: "% max", color: "gold" },
      { label: "MH : déduction", value: "Sans", unit: "plafond", color: "navy" },
      { label: "Villes Denormandie", value: "245", unit: "communes", color: "blue" },
    ],
    comparison: {
      title: "Denormandie vs Malraux vs MH",
      colAHeader: "Denormandie",
      colBHeader: "Malraux / MH",
      rows: [
        { label: "Type de bien", colA: "Ancien à rénover", colB: "Patrimoine classé", highlight: "a" },
        { label: "Avantage fiscal", colA: "Réduction d'impôt 21%", colB: "Réduction 30% / Sans plafond", highlight: "b" },
        { label: "Plafond loyer", colA: "Oui (zone)", colB: "Non", highlight: "b" },
        { label: "Accessibilité", colA: "Large public", colB: "Investisseurs patrimoniaux", highlight: "a" },
      ],
    },
    takeaways: [
      "Maîtriser les 3 dispositifs actifs 2026 : Denormandie, Malraux, Monuments Historiques",
      "Expliquer clairement la fin du Pinel à vos clients investisseurs",
      "Qualifier chaque client investisseur avant de recommander un dispositif",
      "Orienter vers un CGP pour les profils Malraux et Monuments Historiques",
    ],
  },

  "financement/assurances": {
    keyConcepts: [
      { icon: "shield", title: "Assurance emprunteur", description: "Décès, PTIA, ITT — délégation d'assurance possible depuis la loi Lemoine 2022", type: "rule" },
      { icon: "home", title: "PNO — Propriétaire Non Occupant", description: "Obligatoire en copropriété, couvre responsabilité civile et sinistres en vacance", type: "rule" },
      { icon: "file-text", title: "GLI — Garantie Loyers Impayés", description: "Couvre 12 à 36 mois de loyers impayés + frais de procédure", type: "tip" },
      { icon: "alert-triangle", title: "Loi Lemoine 2022", description: "Résiliation à tout moment de l'assurance emprunteur — économie moyenne 10 000 €/life", type: "tip" },
    ],
    stats: [
      { label: "Économie délégation", value: "10 000", unit: "EUR/emprunt", color: "green" },
      { label: "GLI couvre", value: "12-36", unit: "mois loyers", color: "gold" },
      { label: "PNO/an en copro", value: "80-200", unit: "EUR", color: "navy" },
      { label: "Loyers impayés France", value: "2-3", unit: "% locataires", color: "red" },
    ],
    comparison: {
      title: "GLI vs Caution vs Visale",
      colAHeader: "GLI",
      colBHeader: "Caution / Visale",
      rows: [
        { label: "Coût", colA: "2-4% du loyer annuel", colB: "Gratuit (Visale) / Caution", highlight: "b" },
        { label: "Plafond couverture", colA: "12-36 mois", colB: "Variable", highlight: "a" },
        { label: "Frais juridiques", colA: "Inclus", colB: "Non inclus", highlight: "a" },
        { label: "Profil locataire", colA: "CDI exigé souvent", colB: "Tous profils (Visale)", highlight: "b" },
      ],
    },
    takeaways: [
      "Expliquer la délégation d'assurance emprunteur (loi Lemoine) pour faire économiser vos clients",
      "Recommander la PNO dès qu'un client loue sans habiter le bien",
      "Présenter la GLI comme outil de sécurisation du rendement locatif",
      "Comparer systématiquement GLI, caution et Visale selon le profil locataire",
    ],
  },

  // ─── M4 : leçons manquantes ───────────────────────
  "marketing/portails": {
    keyConcepts: [
      { icon: "trending-up", title: "Boost d'annonce", description: "Publication aux heures de pointe (12h-14h, 19h-22h) pour maximiser la visibilité", type: "tip" },
      { icon: "bar-chart", title: "Taux de contact", description: "Objectif : +2.5% de taux de contact par rapport à la moyenne du portail", type: "stat" },
      { icon: "camera", title: "Photo de couverture", description: "La 1ère photo génère 90% des clics — investir dans la meilleure prise de vue", type: "warning" },
      { icon: "star", title: "Profil agence optimisé", description: "Logo HD, description SEO, avis clients, coordonnées complètes", type: "rule" },
    ],
    stats: [
      { label: "Part de marché SeLoger", value: "35", unit: "%", color: "navy" },
      { label: "Visites Leboncoin/mois", value: "28M", unit: "visiteurs", color: "gold" },
      { label: "Impact 1ère photo", value: "90", unit: "% des clics", color: "green" },
      { label: "Boost taux contact", value: "+40", unit: "% avec vidéo", color: "blue" },
    ],
    takeaways: [
      "Optimiser son profil agence SeLoger Pro avec photos HD et avis",
      "Publier les nouvelles annonces aux heures de pointe du portail",
      "Choisir le bon abonnement Leboncoin selon le volume de portefeuille",
      "Analyser les statistiques de visibilité hebdomadaires pour ajuster",
    ],
  },

  "marketing/reseaux": {
    keyConcepts: [
      { icon: "calendar", title: "Calendrier éditorial", description: "3 à 5 posts/semaine — alterner bien du mois, conseils, coulisses, témoignages", type: "rule" },
      { icon: "camera", title: "Reels immobiliers", description: "Format vertical 9:16, 30-60 secondes, musique tendance + sous-titres", type: "tip" },
      { icon: "target", title: "Facebook Ads Local", description: "CPL immobilier : 8-25 EUR selon la zone — cibler rayon 15 km autour de l'agence", type: "tip" },
      { icon: "trending-up", title: "Instagram vs LinkedIn", description: "Instagram = notoriété locale. LinkedIn = mandants et investisseurs", type: "definition" },
    ],
    stats: [
      { label: "Portée organique IG", value: "5-10", unit: "%", color: "blue" },
      { label: "CPL Facebook Immo", value: "8-25", unit: "EUR", color: "gold" },
      { label: "Reels : portée x", value: "3x", unit: "vs photo", color: "green" },
      { label: "Posts/semaine idéal", value: "3-5", unit: "", color: "navy" },
    ],
    comparison: {
      title: "Instagram vs LinkedIn pour l'immobilier",
      colAHeader: "Instagram",
      colBHeader: "LinkedIn",
      rows: [
        { label: "Audience cible", colA: "Acheteurs / Locataires", colB: "Investisseurs / Mandants", highlight: "b" },
        { label: "Format roi", colA: "Reels 30-60s", colB: "Articles + carrousels", highlight: "a" },
        { label: "Budget pub", colA: "Accessible (5-15€/j)", colB: "Plus élevé", highlight: "a" },
        { label: "Effet notoriété", colA: "Local fort", colB: "Professionnel", highlight: "b" },
      ],
    },
    takeaways: [
      "Bâtir un calendrier éditorial de 30 jours avec 3-5 posts/semaine",
      "Filmer des Reels immobiliers avec iPhone + gimbal pour un max de portée",
      "Utiliser Facebook Ads avec ciblage géo pour générer des leads acheteurs",
      "Distinguer la stratégie Instagram (notoriété locale) de LinkedIn (B2B mandants)",
    ],
  },

  "marketing/seo": {
    keyConcepts: [
      { icon: "search", title: "Google Business Profile", description: "Fiche gratuite indispensable — photos, horaires, avis, Q&A doivent être à jour", type: "rule" },
      { icon: "map-pin", title: "SEO local", description: "Apparaître dans le 'Local Pack' Google pour des requêtes comme 'agence immobilière Bordeaux'", type: "tip" },
      { icon: "align-left", title: "Contenu evergreen", description: "1 article/mois ciblant une requête locale longue traîne (ex : 'prix m2 Lyon 3e 2026')", type: "tip" },
      { icon: "star", title: "Avis Google", description: "+50 avis 4.5★ = 3x plus de clics sur votre profil vs un concurrent sans avis", type: "stat" },
    ],
    stats: [
      { label: "Clics sur résultat #1", value: "28", unit: "%", color: "green" },
      { label: "Recherches mobiles immo", value: "65", unit: "%", color: "navy" },
      { label: "Impact 50 avis Google", value: "3x", unit: "plus de clics", color: "gold" },
      { label: "Délai SEO efficace", value: "3-6", unit: "mois", color: "blue" },
    ],
    takeaways: [
      "Optimiser et mettre à jour sa fiche Google Business Profile chaque semaine",
      "Publier 1 article SEO/mois ciblant une requête locale à fort volume",
      "Solliciter des avis Google après chaque transaction conclue",
      "Dominer les requêtes 'agence immobilière + ville' en 6 mois de travail régulier",
    ],
  },

  // ─── M5 : leçons manquantes ───────────────────────
  "terrain/argumentaire": {
    keyConcepts: [
      { icon: "target", title: "Méthode CAB", description: "Caractéristique → Avantage → Bénéfice : toujours finir sur ce que ça apporte au client", type: "definition" },
      { icon: "heart", title: "Bénéfices émotionnels", description: "Les clients achètent sur l'émotion et justifient par la raison — cibler d'abord le ressenti", type: "tip" },
      { icon: "check-circle", title: "Pitch 90 secondes", description: "Présentation de l'agence : qui vous êtes, votre spécialité locale, 1 chiffre preuves sociales", type: "rule" },
      { icon: "shield", title: "Réfutation d'objections", description: "Écouter complètement → reformuler → valider → répondre (méthode ELEVE)", type: "tip" },
    ],
    stats: [
      { label: "Objections avant achat", value: "5-7", unit: "en moyenne", color: "gold" },
      { label: "Décision émotionnelle", value: "95", unit: "% du temps", color: "blue" },
      { label: "Durée pitch idéal", value: "90", unit: "secondes", color: "navy" },
    ],
    comparison: {
      title: "Argumentation Caractéristique vs Bénéfice",
      colAHeader: "Caractéristique (mauvais)",
      colBHeader: "Bénéfice (bon)",
      rows: [
        { label: "Exemple surface", colA: "\"80 m² au sol\"", colB: "\"Assez grand pour un bureau à domicile\"", highlight: "b" },
        { label: "Exemple orientation", colA: "\"Plein Sud\"", colB: "\"Salon lumineux toute la journée\"", highlight: "b" },
        { label: "Exemple quartier", colA: "\"Proche école\"", colB: "\"Vos enfants iront à l'école à pied\"", highlight: "b" },
        { label: "Effet client", colA: "Neutre", colB: "Projection émotionnelle", highlight: "b" },
      ],
    },
    takeaways: [
      "Construire votre pitch agence en 90 secondes percutants",
      "Transformer chaque caractéristique en bénéfice concret (méthode CAB)",
      "Répondre aux 10 objections fréquentes sans jamais écraser le client",
      "Closer sur l'émotion — pas sur les données techniques du bien",
    ],
  },

  "terrain/promesse": {
    keyConcepts: [
      { icon: "file-signature", title: "Promesse unilatérale de vente", description: "Le vendeur s'engage seul, l'acquéreur dispose d'une option d'achat pendant un délai fixé", type: "definition" },
      { icon: "shield", title: "Conditions suspensives", description: "Crédit, permis, servitudes — rédigées précisément pour éviter tout litige", type: "rule" },
      { icon: "clock", title: "Délai de rétractation SRU", description: "10 jours francs pour l'acquéreur particulier après notification de la promesse", type: "warning" },
      { icon: "check-square", title: "Séquestre", description: "5 à 10% du prix consigné chez le notaire ou l'agence — conditions de restitution à anticiper", type: "tip" },
    ],
    stats: [
      { label: "Rétractation SRU", value: "10", unit: "jours francs", color: "red" },
      { label: "Séquestre standard", value: "5-10", unit: "% du prix", color: "gold" },
      { label: "Délai réalisation", value: "3-4", unit: "mois", color: "navy" },
      { label: "Enregistrement PUV", value: "10", unit: "jours obligatoire", color: "blue" },
    ],
    comparison: {
      title: "Promesse unilatérale vs Compromis",
      colAHeader: "PUV",
      colBHeader: "Compromis",
      rows: [
        { label: "Engagement vendeur", colA: "Oui (option donnée)", colB: "Oui", highlight: "a" },
        { label: "Engagement acheteur", colA: "Non (option d'achat)", colB: "Oui (bilatéral)", highlight: "b" },
        { label: "Enregistrement", colA: "Obligatoire sous 10j", colB: "Non obligatoire", highlight: "b" },
        { label: "Usage courant", colA: "Cas spécifiques", colB: "Majoritaire en France", highlight: "b" },
      ],
    },
    takeaways: [
      "Rédiger une promesse unilatérale avec toutes les conditions suspensives",
      "Gérer correctement le délai de rétractation de 10 jours francs",
      "Sécuriser le séquestre et ses conditions de restitution",
      "Préparer le dossier notaire sans accroc dès la promesse signée",
    ],
  },
};

export function getVisuals(moduleSlug: string, lessonSlug: string): LessonVisuals | null {
  return LESSON_VISUALS[`${moduleSlug}/${lessonSlug}`] ?? null;
}

