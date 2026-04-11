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
      { label: "Delai retractation", value: "10", unit: "jours", color: "blue" },
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
      { icon: "clock", title: "Delai SRU", description: "10 jours de retractation sans justification apres notification", type: "rule" },
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
};

export function getVisuals(moduleSlug: string, lessonSlug: string): LessonVisuals | null {
  return LESSON_VISUALS[`${moduleSlug}/${lessonSlug}`] ?? null;
}
