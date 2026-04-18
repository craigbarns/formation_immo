/**
 * Aide-mémoire — fiches de référence rapide imprimables.
 *
 * Format : table compacte, chiffres-clés, sanctions, deadlines.
 * Usage : à imprimer, à plastifier, à garder en visite ou en RDV.
 */

export type CheatSheetRow = {
  /** Première colonne (ex. "Loi ALUR") */
  label: string;
  /** Deuxième colonne (ex. "24 mars 2014") */
  value: string;
  /** Troisième colonne, optionnelle (ex. "Transparence honoraires") */
  detail?: string;
  /** Mise en valeur (rouge = sanction, or = deadline, vert = dispositif) */
  tone?: "warning" | "deadline" | "positive" | "neutral";
};

export type CheatSheetSection = {
  title: string;
  rows: CheatSheetRow[];
};

export type CheatSheet = {
  id: string;
  moduleSlug: string;
  title: string;
  subtitle: string;
  /** Icône lucide-react (string, mappée côté composant) */
  icon: "scale" | "trending-up" | "calculator" | "megaphone" | "map-pin";
  color: string;
  sections: CheatSheetSection[];
  /** Texte d'avertissement légal en bas de fiche */
  disclaimer?: string;
};

export const CHEAT_SHEETS: CheatSheet[] = [
  // ════════════════════════════════════════════════════════════════════════
  // MODULE 1 — JURIDIQUE
  // ════════════════════════════════════════════════════════════════════════
  {
    id: "cs-juridique-textes",
    moduleSlug: "juridique",
    title: "Textes juridiques essentiels",
    subtitle: "Les 8 textes que vous devez citer de tête en RDV",
    icon: "scale",
    color: "#1a3a5c",
    sections: [
      {
        title: "Cadre professionnel",
        rows: [
          {
            label: "Loi Hoguet",
            value: "n° 70-9 du 2 janv. 1970",
            detail: "Statut agent immo : carte T, mandat écrit, garantie financière",
            tone: "neutral",
          },
          {
            label: "Décret Hoguet",
            value: "n° 72-678 du 20 juill. 1972",
            detail: "Modalités d'application Hoguet",
            tone: "neutral",
          },
          {
            label: "Loi ALUR",
            value: "n° 2014-366 du 24 mars 2014",
            detail: "Transparence honoraires, formation continue 14h/an, CCAPEX",
            tone: "neutral",
          },
          {
            label: "Loi Climat & Résilience",
            value: "n° 2021-1104 du 22 août 2021",
            detail: "DPE opposable, interdiction location passoires énergétiques",
            tone: "neutral",
          },
          {
            label: "Loi Lemoine",
            value: "n° 2022-270 du 28 fév. 2022",
            detail: "Résiliation infra-annuelle assurance emprunteur, fin questionnaire santé < 200k€",
            tone: "neutral",
          },
        ],
      },
      {
        title: "Consommateur & transaction",
        rows: [
          {
            label: "Loi SRU (rétractation)",
            value: "Art. L271-1 CCH",
            detail: "10 jours calendaires de rétractation acquéreur particulier",
            tone: "deadline",
          },
          {
            label: "Code conso (info loyale)",
            value: "Art. L111-1, L121-1 C. conso",
            detail: "Information précontractuelle, pratiques commerciales déloyales",
            tone: "neutral",
          },
          {
            label: "Loi anti-discrimination",
            value: "Art. 225-1 et 225-2 C. pénal",
            detail: "Refus de service / location pour 25 critères : 3 ans, 45 000 €",
            tone: "warning",
          },
        ],
      },
    ],
    disclaimer: "Toujours vérifier la dernière version sur Légifrance avant tout acte engageant.",
  },

  {
    id: "cs-juridique-dpe",
    moduleSlug: "juridique",
    title: "DPE — Deadlines location 2025-2034",
    subtitle: "Calendrier d'interdiction des passoires thermiques (loi Climat)",
    icon: "scale",
    color: "#1a3a5c",
    sections: [
      {
        title: "Interdictions de mise en location",
        rows: [
          {
            label: "Logements G",
            value: "1er janvier 2025",
            detail: "Interdiction de mise en location (consommation > 450 kWh/m²/an)",
            tone: "deadline",
          },
          {
            label: "Logements F",
            value: "1er janvier 2028",
            detail: "Interdiction étendue aux étiquettes F",
            tone: "deadline",
          },
          {
            label: "Logements E",
            value: "1er janvier 2034",
            detail: "Interdiction étendue aux étiquettes E",
            tone: "deadline",
          },
          {
            label: "Audit énergétique",
            value: "Vente F/G depuis 2023",
            detail: "Obligatoire pour vendre un bien classé F ou G (D depuis 2025)",
            tone: "warning",
          },
        ],
      },
      {
        title: "Obligations annonces",
        rows: [
          {
            label: "Affichage classe énergie",
            value: "Obligatoire",
            detail: "Lettre A à G + GES dans toutes annonces depuis juill. 2022",
            tone: "neutral",
          },
          {
            label: "Estimation coûts annuels",
            value: "Obligatoire",
            detail: "Fourchette min/max énergie + chauffage en €/an",
            tone: "neutral",
          },
          {
            label: "Mention F/G",
            value: "Obligatoire",
            detail: "« Logement à consommation énergétique excessive »",
            tone: "warning",
          },
        ],
      },
      {
        title: "Sanctions affichage",
        rows: [
          {
            label: "Particulier (PP)",
            value: "3 000 €",
            detail: "Amende DGCCRF par annonce non conforme",
            tone: "warning",
          },
          {
            label: "Professionnel (PM)",
            value: "15 000 €",
            detail: "Amende DGCCRF par annonce non conforme",
            tone: "warning",
          },
        ],
      },
    ],
  },

  {
    id: "cs-juridique-tracfin",
    moduleSlug: "juridique",
    title: "TRACFIN & LCB-FT — Réflexes du jour",
    subtitle: "Vigilance, déclarations, sanctions",
    icon: "scale",
    color: "#1a3a5c",
    sections: [
      {
        title: "Indicateurs de risque (red flags)",
        rows: [
          { label: "Paiement comptant > 10 000 €", value: "INTERDIT", detail: "Code monétaire L112-6 (résident fr.)", tone: "warning" },
          { label: "Origine fonds floue", value: "À déclarer", detail: "Si justification incohérente / refus de transparence", tone: "warning" },
          { label: "Achat express après 1 visite", value: "Vigilance", detail: "Examiner profil & justificatifs", tone: "warning" },
          { label: "Société écran étrangère", value: "Vigilance renforcée", detail: "Bénéficiaire effectif via RCS", tone: "warning" },
          { label: "Prête-nom suspect", value: "Vigilance renforcée", detail: "Différent de l'acquéreur réel", tone: "warning" },
        ],
      },
      {
        title: "Procédure déclaration",
        rows: [
          { label: "Outil", value: "ERMES (en ligne)", detail: "Portail Tracfin sécurisé", tone: "neutral" },
          { label: "Délai", value: "Sans tarder", detail: "Dès le soupçon, avant signature si possible", tone: "deadline" },
          { label: "Confidentialité", value: "Obligatoire", detail: "Ne jamais informer le client (interdit pénalement)", tone: "warning" },
          { label: "Conservation", value: "5 ans minimum", detail: "Trace écrite de la déclaration et justificatifs", tone: "neutral" },
        ],
      },
      {
        title: "Sanctions absence de vigilance",
        rows: [
          { label: "Amende administrative ACPR", value: "Jusqu'à 5 M€", detail: "Pour défaut systémique", tone: "warning" },
          { label: "Sanction pénale", value: "5 ans + 375 000 €", detail: "Blanchiment par négligence", tone: "warning" },
          { label: "Suspension carte T", value: "Jusqu'à 5 ans", detail: "CCI / préfet", tone: "warning" },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════
  // MODULE 2 — TRANSACTION
  // ════════════════════════════════════════════════════════════════════════
  {
    id: "cs-transaction-deadlines",
    moduleSlug: "transaction",
    title: "Compromis & promesse — Délais clés",
    subtitle: "Tous les délais qui peuvent annuler la vente",
    icon: "trending-up",
    color: "#2563eb",
    sections: [
      {
        title: "Délais légaux",
        rows: [
          { label: "Rétractation SRU", value: "10 jours", detail: "Calendaires, à compter réception compromis (LRAR)", tone: "deadline" },
          { label: "Conditions suspensives", value: "45-60 jours", detail: "Délai usuel pour obtention prêt", tone: "deadline" },
          { label: "Refus prêt — preuve", value: "Min. 2 refus banques", detail: "Pour activer condition suspensive", tone: "neutral" },
          { label: "Acte authentique", value: "3-4 mois", detail: "Délai standard après compromis (purge délais)", tone: "neutral" },
        ],
      },
      {
        title: "Séquestre & dépôt de garantie",
        rows: [
          { label: "Compromis (séquestre)", value: "5-10 % prix", detail: "Conservé par notaire ou agence séquestre", tone: "neutral" },
          { label: "Promesse (immobilisation)", value: "5-10 % prix", detail: "Acquis vendeur si acquéreur renonce hors CS", tone: "warning" },
          { label: "Restitution rétractation 10j", value: "21 jours max", detail: "Après notification rétractation", tone: "deadline" },
          { label: "Restitution échec CS prêt", value: "Sans délai", detail: "Sur preuve refus, sans pénalité", tone: "positive" },
        ],
      },
      {
        title: "Frais de notaire (ancien vs neuf)",
        rows: [
          { label: "Ancien (5-10 ans+)", value: "≈ 7-8 % prix", detail: "Droits mutation 5,80% + émoluments + débours", tone: "neutral" },
          { label: "Neuf / VEFA", value: "≈ 2-3 % prix", detail: "TVA 20% incluse, droits réduits 0,71%", tone: "positive" },
          { label: "Frais d'agence", value: "3-8 % prix", detail: "Hors frais notaire — affichage TTC obligatoire", tone: "neutral" },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════
  // MODULE 3 — FINANCEMENT
  // ════════════════════════════════════════════════════════════════════════
  {
    id: "cs-financement-hcsf",
    moduleSlug: "financement",
    title: "Crédit immo — Règles HCSF 2026",
    subtitle: "Capacité d'emprunt, durée, taux d'usure",
    icon: "calculator",
    color: "#7c3aed",
    sections: [
      {
        title: "Plafonds HCSF (norme contraignante depuis 2022)",
        rows: [
          { label: "Taux d'endettement max.", value: "35 %", detail: "Assurance incluse — calcul mensualité / revenus nets", tone: "warning" },
          { label: "Durée maximale", value: "25 ans", detail: "+ 2 ans différé pour neuf / VEFA / travaux > 25%", tone: "warning" },
          { label: "Marge dérogation", value: "20 % production", detail: "Banque peut déroger sur 20% des dossiers (primo-acc.)", tone: "neutral" },
          { label: "Reste à vivre", value: "Min. 700-1000 €/pers.", detail: "Norme bancaire interne, pas légale stricte", tone: "neutral" },
        ],
      },
      {
        title: "Apport personnel recommandé",
        rows: [
          { label: "Apport minimum", value: "10 %", detail: "Couvre frais notaire (ancien)", tone: "neutral" },
          { label: "Apport confort", value: "20 %", detail: "Meilleurs taux + dossier solide", tone: "positive" },
          { label: "Sans apport", value: "Difficile", detail: "Possible jeunes pros, hauts revenus, primo (5% prod.)", tone: "warning" },
        ],
      },
      {
        title: "Assurance emprunteur (loi Lemoine 2022)",
        rows: [
          { label: "Résiliation infra-annuelle", value: "À tout moment", detail: "Sans frais, sans pénalité — depuis 1er sept. 2022", tone: "positive" },
          { label: "Questionnaire médical", value: "Supprimé", detail: "Si prêt < 200 000 € et fin avant 60 ans", tone: "positive" },
          { label: "Économie moyenne", value: "5 000 - 15 000 €", detail: "Sur la durée du prêt en changeant d'assureur", tone: "positive" },
        ],
      },
    ],
    disclaimer: "Le HCSF revoit ses normes annuellement. Vérifier la dernière publication.",
  },

  {
    id: "cs-financement-fiscalite",
    moduleSlug: "financement",
    title: "Fiscalité immobilière — Dispositifs 2026",
    subtitle: "Quelle niche pour quel investisseur ?",
    icon: "calculator",
    color: "#7c3aed",
    sections: [
      {
        title: "Dispositifs locatifs actifs",
        rows: [
          { label: "Pinel", value: "FERMÉ", detail: "Clôturé au 31/12/2024 — non reconduit", tone: "warning" },
          { label: "Denormandie", value: "Jusqu'au 31/12/2027", detail: "Ancien à rénover en zones ORT — réduction 12 à 21%", tone: "positive" },
          { label: "LMNP / LMP", value: "Permanent", detail: "Loueur meublé non pro / pro — amortissement bien", tone: "positive" },
          { label: "Loc'Avantages", value: "Jusqu'au 31/12/2027", detail: "Conventionnement Anah — réduction d'impôt 15 à 65%", tone: "positive" },
          { label: "Malraux", value: "Permanent (zones)", detail: "Travaux secteurs sauvegardés — réduction 22 à 30%", tone: "neutral" },
          { label: "Monuments historiques", value: "Permanent", detail: "Déduction sans plafond travaux + intérêts", tone: "neutral" },
        ],
      },
      {
        title: "Déficit foncier (location nue)",
        rows: [
          { label: "Plafond standard", value: "10 700 €/an", detail: "Imputable revenu global, reste reportable 10 ans", tone: "positive" },
          { label: "Plafond rénovation énergétique", value: "21 400 €/an", detail: "Sortie passoire F/G — loi finances 2023, jusqu'à 2025", tone: "positive" },
          { label: "Économie d'impôt TMI 30 %", value: "≈ 6 420 €", detail: "Sur 21 400 € de déficit", tone: "positive" },
          { label: "Économie d'impôt TMI 41 %", value: "≈ 8 774 €", detail: "Sur 21 400 € de déficit", tone: "positive" },
        ],
      },
      {
        title: "SCI — Choix IR vs IS",
        rows: [
          { label: "SCI à l'IR", value: "Transparence fiscale", detail: "Loyers imposés au TMI associés — adapté patrimoine perso", tone: "neutral" },
          { label: "SCI à l'IS", value: "15 % puis 25 %", detail: "Amortissement bien — adapté capitalisation long terme", tone: "neutral" },
          { label: "Prélèv. sociaux", value: "17,2 %", detail: "Sur revenus fonciers IR + plus-values", tone: "neutral" },
          { label: "Plus-value SCI IS", value: "25 % + dividendes", detail: "Double imposition à la sortie — attention", tone: "warning" },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════
  // MODULE 4 — MARKETING
  // ════════════════════════════════════════════════════════════════════════
  {
    id: "cs-marketing-portails",
    moduleSlug: "marketing",
    title: "Portails & SEO — Hiérarchie 2026",
    subtitle: "Où publier, à quel prix, pour quel volume",
    icon: "megaphone",
    color: "#0891b2",
    sections: [
      {
        title: "Portails majeurs",
        rows: [
          { label: "SeLoger", value: "≈ 50-200 €/mois", detail: "1ère visibilité B2C — leader historique", tone: "neutral" },
          { label: "Leboncoin", value: "≈ 30-150 €/mois", detail: "Audience max., conversion + faible mais volume énorme", tone: "neutral" },
          { label: "Bien'ici", value: "≈ 40-180 €/mois", detail: "Visites 3D natives, audience qualifiée", tone: "neutral" },
          { label: "Logic-Immo", value: "≈ 40-120 €/mois", detail: "Réseau historique, complément SeLoger", tone: "neutral" },
          { label: "Pap.fr", value: "Gratuit (PAP)", detail: "Audience particuliers à particuliers — non agences", tone: "neutral" },
        ],
      },
      {
        title: "Annonce optimisée — bonnes pratiques",
        rows: [
          { label: "Photos minimum", value: "15 - 25 photos", detail: "Lumière naturelle, grand angle, pièces principales", tone: "positive" },
          { label: "Visite 3D / Matterport", value: "+30 à 50 % RDV", detail: "ROI atteint en 1 mandat (300-600 € shooting)", tone: "positive" },
          { label: "Vidéo drone (extérieur)", value: "+15 à 25 % CTR", detail: "Pour maisons / biens haut de gamme", tone: "positive" },
          { label: "Plan 2D coté", value: "Indispensable", detail: "Réduit visites 'curieuses' (-40 %)", tone: "positive" },
          { label: "Description (longueur)", value: "200 - 400 mots", detail: "SEO portails + clarté lecteur", tone: "neutral" },
        ],
      },
      {
        title: "Personal branding LinkedIn",
        rows: [
          { label: "Mix contenu optimal", value: "50/30/20", detail: "Expertise / témoignages / coulisses du métier", tone: "positive" },
          { label: "Fréquence publication", value: "2-3× / semaine", detail: "Régularité > volume — algo récompense", tone: "positive" },
          { label: "Promo directe", value: "< 20 %", detail: "Plus = chute portée -80%", tone: "warning" },
          { label: "Posts longs (carousels)", value: "+250 % portée", detail: "vs simple texte", tone: "positive" },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════
  // MODULE 5 — TERRAIN
  // ════════════════════════════════════════════════════════════════════════
  {
    id: "cs-terrain-bant",
    moduleSlug: "terrain",
    title: "BANT, CRAC, Closing — Frameworks de poche",
    subtitle: "Les 3 grilles à retenir pour qualifier, rebondir, conclure",
    icon: "map-pin",
    color: "#059669",
    sections: [
      {
        title: "BANT — Qualification prospect",
        rows: [
          { label: "B - Budget", value: "Capacité financière", detail: "Apport, salaire, crédit en cours — qualifié si confirmé", tone: "neutral" },
          { label: "A - Authority", value: "Décideur identifié", detail: "Prend décision seul ou couple/parents — clarifier", tone: "neutral" },
          { label: "N - Need", value: "Besoin réel", detail: "Projet fondé : naissance, mutation, mariage, divorce", tone: "neutral" },
          { label: "T - Timing", value: "Échéance précise", detail: "< 3 mois = chaud, 3-12 mois = tiède, > 12 mois = froid", tone: "neutral" },
          { label: "Score 4/4", value: "Action immédiate", detail: "RDV physique sous 48h, visite sous 7 jours", tone: "positive" },
          { label: "Score < 2/4", value: "Nurturing", detail: "Newsletter, follow-up trimestriel — pas de RDV", tone: "warning" },
        ],
      },
      {
        title: "CRAC — Traitement objections",
        rows: [
          { label: "C - Creuser", value: "Question ouverte", detail: "« Trop cher par rapport à quoi ? »", tone: "neutral" },
          { label: "R - Reformuler", value: "Empathie active", detail: "« Si je comprends bien, vous trouvez que… »", tone: "neutral" },
          { label: "A - Argumenter", value: "Bénéfice client", detail: "Référence chiffrée, cas similaire, valeur ajoutée", tone: "neutral" },
          { label: "C - Confirmer", value: "Question de validation", detail: "« Cela répond à votre préoccupation ? »", tone: "neutral" },
        ],
      },
      {
        title: "Techniques de closing",
        rows: [
          { label: "Alternative", value: "« Plutôt mardi 18h ou samedi 11h ? »", detail: "Force la décision sur le quand, pas le si", tone: "neutral" },
          { label: "Ben Franklin", value: "Balance + / -", detail: "Co-construire liste pros/cons — pour analytiques", tone: "neutral" },
          { label: "Urgence réelle", value: "« Visite cet après-midi déjà »", detail: "Jamais inventer — confiance > vente", tone: "warning" },
          { label: "Récap engageant", value: "« Sur quoi on est d'accord ? »", detail: "Liste les oui partiels, lève le dernier doute", tone: "neutral" },
        ],
      },
    ],
  },

  {
    id: "cs-terrain-r0r1r2",
    moduleSlug: "terrain",
    title: "R0 / R1 / R2 — Funnel client",
    subtitle: "Les 3 rendez-vous qui font 80 % de votre CA",
    icon: "map-pin",
    color: "#059669",
    sections: [
      {
        title: "R0 — Découverte (15-30 min)",
        rows: [
          { label: "Lieu", value: "Téléphone ou agence", detail: "Pas de déplacement chez le client", tone: "neutral" },
          { label: "Objectif", value: "Qualifier BANT", detail: "Confirmer projet réel + délai + budget", tone: "neutral" },
          { label: "Output", value: "RDV R1 fixé", detail: "Si BANT ≥ 3/4 — sinon nurturing", tone: "positive" },
        ],
      },
      {
        title: "R1 — Visite + estimation (45-90 min)",
        rows: [
          { label: "Lieu", value: "Domicile vendeur", detail: "Estimation au cœur du projet émotionnel", tone: "neutral" },
          { label: "Méthode estimation", value: "3 comparables récents", detail: "Vendus < 6 mois, < 500m, même typologie", tone: "neutral" },
          { label: "Output", value: "Avis de valeur écrit", detail: "Remise lors du R2 — pas en R1 (effet d'attente)", tone: "positive" },
        ],
      },
      {
        title: "R2 — Signature mandat (30-60 min)",
        rows: [
          { label: "Lieu", value: "Domicile vendeur", detail: "Confort psychologique = signature", tone: "neutral" },
          { label: "Documents prêts", value: "Mandat + DPE + comparables", detail: "Imprimés en double exemplaire", tone: "positive" },
          { label: "Mandat à viser", value: "EXCLUSIF 12 sem.", detail: "vs simple : 30 % de mandats convertis en plus", tone: "positive" },
          { label: "Honoraires affichés", value: "TTC obligatoire", detail: "Loi Hoguet — barème agence + qui paie (vendeur/acq.)", tone: "warning" },
        ],
      },
    ],
  },
];

export function getCheatSheetsByModule(moduleSlug: string): CheatSheet[] {
  return CHEAT_SHEETS.filter((s) => s.moduleSlug === moduleSlug);
}

export function getCheatSheet(id: string): CheatSheet | undefined {
  return CHEAT_SHEETS.find((s) => s.id === id);
}
