/**
 * Flashcards interactives — révision visuelle par module.
 * Chaque carte a une face question et une face réponse avec un visuel associé.
 */

export type Flashcard = {
  id: string;
  question: string;
  answer: string;
  /** Catégorie pour filtrage */
  category: string;
  /** Indice de difficulté 1-3 */
  difficulty: 1 | 2 | 3;
};

export type ModuleFlashcards = {
  moduleSlug: string;
  cards: Flashcard[];
};

export const ALL_FLASHCARDS: ModuleFlashcards[] = [
  {
    moduleSlug: "juridique",
    cards: [
      {
        id: "j-01",
        question: "Que signifie ALUR ?",
        answer:
          "Accès au Logement et un Urbanisme Rénové. Loi du 24 mars 2014 encadrant les pratiques immobilières.",
        category: "Loi ALUR",
        difficulty: 1,
      },
      {
        id: "j-02",
        question: "Quels sont les 3 types de mandats immobiliers ?",
        answer:
          "1. Mandat simple (plusieurs agences)\n2. Mandat semi-exclusif (plusieurs agences + particulier)\n3. Mandat exclusif (une seule agence)",
        category: "Mandats",
        difficulty: 1,
      },
      {
        id: "j-03",
        question: "Quelle est la durée de validité d'un DPE ?",
        answer: "10 ans. Le DPE (Diagnostic de Performance Énergétique) est obligatoire pour toute vente ou location.",
        category: "Diagnostics",
        difficulty: 1,
      },
      {
        id: "j-04",
        question: "Quels diagnostics sont obligatoires pour une vente ?",
        answer:
          "DPE, amiante, plomb (avant 1949), termites (zones arrêtées), ERP, électricité/gaz (>15 ans), assainissement, bruit.",
        category: "Diagnostics",
        difficulty: 2,
      },
      {
        id: "j-05",
        question: "Quel est le délai de rétractation après signature du compromis ?",
        answer:
          "10 jours (loi SRU). L'acquéreur peut se rétracter sans justification ni pénalité. Le délai court à partir de la notification.",
        category: "Compromis",
        difficulty: 1,
      },
      {
        id: "j-06",
        question: "Où doivent être affichés les honoraires d'agence selon ALUR ?",
        answer:
          "En vitrine de l'agence ET sur chaque annonce. Les honoraires doivent être exprimés en % TTC du prix de vente, avec indication de qui les paye.",
        category: "Loi ALUR",
        difficulty: 2,
      },
      {
        id: "j-07",
        question: "Qu'est-ce que la loi Carrez ?",
        answer:
          "Obligation de mentionner la superficie privative (hors murs, cloisons, escaliers, caves) dans tout acte de vente en copropriété. Erreur >5% = recours de l'acheteur.",
        category: "Copropriété",
        difficulty: 2,
      },
      {
        id: "j-08",
        question: "Quelles conditions suspensives sont courantes dans un compromis ?",
        answer:
          "1. Obtention de prêt (45-60 jours)\n2. Absence de servitude\n3. Absence de préemption (mairie)\n4. Diagnostics conformes",
        category: "Compromis",
        difficulty: 3,
      },
      {
        id: "j-09",
        question: "Quelle est la différence entre compromis et promesse de vente ?",
        answer:
          "Compromis = engagement bilatéral (vendeur + acheteur). Promesse unilatérale = seul le vendeur s'engage, l'acheteur a une option d'achat (indemnité d'immobilisation ~10%).",
        category: "Compromis",
        difficulty: 3,
      },
      {
        id: "j-10",
        question: "Quelle carte professionnelle est obligatoire pour exercer ?",
        answer:
          "La carte T (Transaction) délivrée par la CCI. Renouvelable tous les 3 ans, nécessite 42h de formation continue (loi ALUR).",
        category: "Loi ALUR",
        difficulty: 2,
      },
    ],
  },
  {
    moduleSlug: "transaction",
    cards: [
      {
        id: "t-01",
        question: "Quelles sont les 3 méthodes d'estimation immobilière ?",
        answer:
          "1. Comparaison (prix/m² du secteur)\n2. Capitalisation (rendement locatif)\n3. Hédoniste (pondération de critères : étage, exposition, état…)",
        category: "Estimation",
        difficulty: 1,
      },
      {
        id: "t-02",
        question: "Quel est le taux de conversion moyen d'un mandat exclusif vs simple ?",
        answer:
          "Exclusif : 80-90% de vente dans les 3 mois. Simple : 30-40%. L'exclusif permet un investissement marketing plus important.",
        category: "Mandats",
        difficulty: 2,
      },
      {
        id: "t-03",
        question: "Quels sont les 5 canaux de prospection principaux ?",
        answer:
          "1. Pige (annonces PAP)\n2. Farming (quartier dédié)\n3. Réseau personnel\n4. Partenaires (notaires, banques)\n5. Digital (réseaux sociaux, SEO)",
        category: "Prospection",
        difficulty: 1,
      },
      {
        id: "t-04",
        question: "Qu'est-ce que la technique SPIN en négociation ?",
        answer:
          "S = Situation (contexte)\nP = Problème (douleur)\nI = Implication (conséquences)\nN = Need-payoff (solution/bénéfice)\nPermet de guider le client vers la prise de conscience.",
        category: "Négociation",
        difficulty: 2,
      },
      {
        id: "t-05",
        question: "Comment gérer l'objection « C'est trop cher » ?",
        answer:
          "1. Accuser réception (empathie)\n2. Questionner : par rapport à quoi ?\n3. Recadrer sur la valeur (comparables, prestations)\n4. Proposer un plan (négociation, conditions)",
        category: "Négociation",
        difficulty: 2,
      },
      {
        id: "t-06",
        question: "Quels KPIs suivre dans un CRM immobilier ?",
        answer:
          "Taux de transformation mandats, nombre de visites/semaine, délai moyen de vente, taux de satisfaction client, CA par agent, pipeline de mandats.",
        category: "CRM",
        difficulty: 2,
      },
      {
        id: "t-07",
        question: "Qu'est-ce que le R1/R2 en prospection téléphonique ?",
        answer:
          "R1 = Premier contact (prise de rendez-vous). R2 = Second rendez-vous (estimation sur place). Le passage de R1 à R2 est le KPI clé du téléprospecteur.",
        category: "Prospection",
        difficulty: 3,
      },
      {
        id: "t-08",
        question: "Quelle est la règle des 72h après une visite ?",
        answer:
          "Contacter le visiteur dans les 72h pour recueillir ses impressions. Au-delà, l'intérêt chute drastiquement. Idéal : relance J+1 par téléphone.",
        category: "CRM",
        difficulty: 1,
      },
    ],
  },
  {
    moduleSlug: "financement",
    cards: [
      {
        id: "f-01",
        question: "Quel est le taux d'endettement maximum selon le HCSF ?",
        answer:
          "35% des revenus nets (assurance emprunteur incluse). Règle du Haut Conseil de Stabilité Financière, applicable depuis janvier 2022.",
        category: "Crédit",
        difficulty: 1,
      },
      {
        id: "f-02",
        question: "Quelle est la durée maximum d'un prêt immobilier résidentiel ?",
        answer:
          "25 ans (27 ans dans le neuf avec différé de 2 ans). Recommandation HCSF contraignante depuis 2022.",
        category: "Crédit",
        difficulty: 1,
      },
      {
        id: "f-03",
        question: "Comment calculer un rendement locatif brut ?",
        answer:
          "Rendement brut = (Loyer annuel / Prix d'achat) × 100\nExemple : 800€/mois × 12 / 200 000€ = 4,8%",
        category: "Rentabilité",
        difficulty: 1,
      },
      {
        id: "f-04",
        question: "Quelle différence entre rendement brut et net ?",
        answer:
          "Brut = loyer/prix. Net = (loyer - charges - taxe foncière - vacance - gestion) / (prix + frais de notaire + travaux). Écart typique : 1,5 à 2,5 points.",
        category: "Rentabilité",
        difficulty: 2,
      },
      {
        id: "f-05",
        question: "Qu'est-ce que le dispositif Pinel 2026 ?",
        answer:
          "Réduction d'impôt pour investissement locatif neuf dans des zones tendues. Taux réduits : 9%/6 ans, 12%/9 ans, 14%/12 ans. Plafonds de loyer et ressources locataire.",
        category: "Fiscalité",
        difficulty: 2,
      },
      {
        id: "f-06",
        question: "Qu'est-ce que le PTZ (Prêt à Taux Zéro) ?",
        answer:
          "Prêt sans intérêts pour primo-accédants, sous conditions de ressources. Financement jusqu'à 40% du bien en zone tendue. Différé de remboursement possible.",
        category: "Crédit",
        difficulty: 1,
      },
      {
        id: "f-07",
        question: "LMNP vs LMP : quelle différence ?",
        answer:
          "LMNP : recettes <23 000€/an ET < revenus professionnels → amortissement du bien, charges déductibles. LMP : au-delà → cotisations sociales mais plus-values professionnelles et exonération ISF.",
        category: "Fiscalité",
        difficulty: 3,
      },
      {
        id: "f-08",
        question: "Que couvre l'assurance emprunteur ?",
        answer:
          "Décès, PTIA (Perte Totale et Irréversible d'Autonomie), ITT (Incapacité Temporaire de Travail), IPT/IPP (Invalidité). Délégation possible depuis la loi Lemoine (2022).",
        category: "Assurances",
        difficulty: 2,
      },
    ],
  },
  {
    moduleSlug: "marketing",
    cards: [
      {
        id: "m-01",
        question: "Quelles sont les 5 règles d'or de la photo immobilière ?",
        answer:
          "1. Lumière naturelle (fenêtres dégagées)\n2. Grand-angle (pas fisheye)\n3. Hauteur poitrine\n4. 3 photos minimum par pièce\n5. Rangement et home staging avant le shoot",
        category: "Photos",
        difficulty: 1,
      },
      {
        id: "m-02",
        question: "Comment structurer un titre d'annonce efficace ?",
        answer:
          "Type + Atout principal + Localisation.\nExemple : « Appartement T3 lumineux — Terrasse 20m² — Lyon 6e »\nÉviter : jargon, superlatifs, MAJUSCULES.",
        category: "Annonces",
        difficulty: 1,
      },
      {
        id: "m-03",
        question: "SeLoger vs Leboncoin : quelle stratégie ?",
        answer:
          "SeLoger : audience qualifiée, enchères de visibilité, boost payant. Leboncoin : volume, audience large, remontée régulière. Publier sur les deux + portails spécialisés.",
        category: "Portails",
        difficulty: 2,
      },
      {
        id: "m-04",
        question: "Quel contenu publier sur Instagram immobilier ?",
        answer:
          "1. Visites virtuelles (Reels)\n2. Avant/après (Carousel)\n3. Témoignages clients (Stories)\n4. Coulisses métier (authenticité)\n5. Conseils marché (expertise)\nRatio : 70% valeur, 30% promo.",
        category: "Réseaux",
        difficulty: 2,
      },
      {
        id: "m-05",
        question: "Qu'est-ce que le SEO local pour l'immobilier ?",
        answer:
          "Optimiser sa visibilité sur Google pour les recherches géolocalisées : fiche Google Business, mots-clés « agence immobilière + ville », avis clients, contenu local, citations NAP cohérentes.",
        category: "SEO",
        difficulty: 2,
      },
      {
        id: "m-06",
        question: "Combien de photos minimum dans une annonce performante ?",
        answer:
          "Minimum 10, idéal 15-20. La première photo génère 90% des clics. Ordre : extérieur → séjour → cuisine → chambres → salle de bain → extras (terrasse, parking).",
        category: "Photos",
        difficulty: 1,
      },
      {
        id: "m-07",
        question: "Comment rédiger une description d'annonce qui convertit ?",
        answer:
          "Structure : Accroche émotionnelle → Caractéristiques clés → Environnement/quartier → Appel à l'action. 150-250 mots. Paragraphes courts. Points forts en premier.",
        category: "Annonces",
        difficulty: 2,
      },
      {
        id: "m-08",
        question: "Qu'est-ce que la visite virtuelle 360° ?",
        answer:
          "Captation immersive (Matterport, Ricoh Theta) permettant une visite à distance. Augmente les leads qualifiés de 30-50%. Réduit les visites inutiles.",
        category: "Photos",
        difficulty: 2,
      },
    ],
  },
  {
    moduleSlug: "terrain",
    cards: [
      {
        id: "v-01",
        question: "Quelles sont les 3 phases d'une visite réussie ?",
        answer:
          "1. Accueil (5 min) : créer le lien, comprendre les attentes\n2. Découverte (20 min) : parcours logique, points forts, storytelling\n3. Conclusion (5 min) : synthèse, objections, prochain pas",
        category: "Visite",
        difficulty: 1,
      },
      {
        id: "v-02",
        question: "Comment gérer l'objection « Je dois réfléchir » ?",
        answer:
          "1. Normaliser : « C'est normal, c'est une décision importante »\n2. Identifier le frein réel : « Qu'est-ce qui vous fait hésiter précisément ? »\n3. Traiter l'objection spécifique\n4. Créer l'urgence : « D'autres visites sont prévues… »",
        category: "Closing",
        difficulty: 2,
      },
      {
        id: "v-03",
        question: "Qu'est-ce que la technique du « closing alternatif » ?",
        answer:
          "Proposer deux options positives au lieu d'une question oui/non : « Vous préférez signer le compromis jeudi ou vendredi ? » Présuppose l'accord et facilite la décision.",
        category: "Closing",
        difficulty: 2,
      },
      {
        id: "v-04",
        question: "Quelles étapes entre compromis et acte authentique ?",
        answer:
          "1. Délai de rétractation (10 j)\n2. Demande de prêt (45-60 j)\n3. Purge des conditions suspensives\n4. Rendez-vous notaire pour signature\n5. Remise des clés\nDurée totale : 2-4 mois.",
        category: "Acte",
        difficulty: 2,
      },
      {
        id: "v-05",
        question: "Comment maximiser le parrainage client ?",
        answer:
          "1. Demander au moment de la remise des clés (pic émotionnel)\n2. Programme de parrainage structuré avec récompense\n3. Suivi J+30, J+90, J+365\n4. Carte anniversaire d'emménagement\n5. Demander un avis Google",
        category: "Fidélisation",
        difficulty: 2,
      },
      {
        id: "v-06",
        question: "Quel est le parcours de visite idéal d'un appartement ?",
        answer:
          "Entrée → Pièce de vie (luminosité) → Cuisine → Chambre principale → SdB → Autres chambres → Rangements → Extérieur/vue. Toujours finir par le meilleur atout du bien.",
        category: "Visite",
        difficulty: 1,
      },
      {
        id: "v-07",
        question: "Quels signaux d'achat observer chez un visiteur ?",
        answer:
          "Questions sur le voisinage, mesure mentale des pièces, discussion d'aménagement (« On mettrait le canapé ici »), retour dans une pièce, questions sur le délai de disponibilité.",
        category: "Closing",
        difficulty: 3,
      },
      {
        id: "v-08",
        question: "Que faire si le bien ne correspond pas au client ?",
        answer:
          "Ne jamais forcer. Reconnaître honnêtement, proposer des alternatives de votre portefeuille, noter les critères affinés pour la prochaine proposition. La confiance gagnée vaut plus qu'une vente forcée.",
        category: "Visite",
        difficulty: 1,
      },
    ],
  },
];

export function getFlashcardsForModule(moduleSlug: string): Flashcard[] {
  return ALL_FLASHCARDS.find((m) => m.moduleSlug === moduleSlug)?.cards ?? [];
}
