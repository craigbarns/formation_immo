/**
 * Quiz checkpoints inline — questions de vérification intégrées dans les pages de leçon.
 * 2-3 questions par leçon pour renforcer la compréhension en temps réel.
 */

import { balancedPositions, placeAt } from "@/lib/qcm-shuffle";

export type QuizCheckpoint = {
  id: string;
  moduleSlug: string;
  lessonSlug: string;
  question: string;
  options: { label: string; isCorrect: boolean }[];
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
};

const RAW_QUIZ_CHECKPOINTS: QuizCheckpoint[] = [
  // ──────────────────────────────────────────────
  // MODULE 1 — JURIDIQUE
  // ──────────────────────────────────────────────

  // juridique / loi-alur
  {
    id: "qc-jur-alur-01",
    moduleSlug: "juridique",
    lessonSlug: "loi-alur",
    question: "Quelle mention de la carte professionnelle faut-il pour vendre des biens pour le compte de clients ?",
    options: [
      { label: "Transactions sur immeubles et fonds de commerce", isCorrect: true },
      { label: "Gestion immobilière", isCorrect: false },
      { label: "Syndic de copropriété", isCorrect: false },
      { label: "Prestations touristiques", isCorrect: false },
    ],
    explanation: "La carte professionnelle, délivrée par la CCI pour 3 ans, porte la ou les mentions des activités exercées. La vente pour le compte d'autrui exige la mention « Transactions sur immeubles et fonds de commerce » (carte T). La gestion et le syndic relèvent d'autres mentions.",
    difficulty: "easy",
  },
  {
    id: "qc-jur-alur-02",
    moduleSlug: "juridique",
    lessonSlug: "loi-alur",
    question: "Quelle formation continue est obligatoire pour les professionnels de la transaction ?",
    options: [
      { label: "42 heures sur 3 ans", isCorrect: true },
      { label: "21 heures sur 3 ans", isCorrect: false },
      { label: "60 heures sur 3 ans", isCorrect: false },
      { label: "30 heures par an", isCorrect: false },
    ],
    explanation: "Depuis la loi ALUR (décret n° 2016-173) : 14 heures par an ou 42 heures sur trois ans consécutifs, dont au moins 2 heures de déontologie et 2 heures de non-discrimination dans l'accès au logement sur trois ans. La justification conditionne le renouvellement de la carte.",
    difficulty: "easy",
  },
  {
    id: "qc-jur-alur-03",
    moduleSlug: "juridique",
    lessonSlug: "loi-alur",
    question: "Quel organisme délivre la carte professionnelle d'agent immobilier ?",
    options: [
      { label: "La Chambre de commerce et d'industrie", isCorrect: true },
      { label: "La préfecture du département", isCorrect: false },
      { label: "Le Conseil national de l'immobilier", isCorrect: false },
      { label: "L'ordre des agents immobiliers", isCorrect: false },
    ],
    explanation: "Depuis le 1er juillet 2015 (loi ALUR), la carte est délivrée et renouvelée par la CCI territoriale, et non plus par la préfecture. Il n'existe pas d'ordre des agents immobiliers.",
    difficulty: "medium",
  },

  // juridique / compromis
  {
    id: "qc-jur-comp-01",
    moduleSlug: "juridique",
    lessonSlug: "compromis",
    question: "De quel délai de rétractation dispose l'acquéreur particulier après la notification du compromis ?",
    options: [
      { label: "10 jours", isCorrect: true },
      { label: "7 jours", isCorrect: false },
      { label: "14 jours", isCorrect: false },
      { label: "30 jours", isCorrect: false },
    ],
    explanation: "Article L.271-1 du CCH : 10 jours calendaires à compter du lendemain de la première présentation de la lettre (ou de la remise en main propre contre récépissé). Le délai de 14 jours est celui des contrats conclus à distance ou hors établissement, comme un mandat signé au domicile du vendeur.",
    difficulty: "easy",
  },
  {
    id: "qc-jur-comp-02",
    moduleSlug: "juridique",
    lessonSlug: "compromis",
    question: "Malgré des demandes conformes, l'acquéreur n'obtient pas son prêt dans le délai prévu. Que se passe-t-il ?",
    options: [
      { label: "La vente est caduque et le dépôt lui est rendu", isCorrect: true },
      { label: "L'acquéreur perd son dépôt de garantie", isCorrect: false },
      { label: "Le vendeur peut exiger des dommages-intérêts", isCorrect: false },
      { label: "L'acquéreur doit trouver un autre financement", isCorrect: false },
    ],
    explanation: "La condition suspensive de prêt défaillie rend la vente caduque : le dépôt de garantie est restitué. Il en va autrement si l'acquéreur a empêché la réalisation de la condition, par exemple en ne déposant aucune demande (art. 1304-3 du Code civil).",
    difficulty: "medium",
  },

  // juridique / diagnostics
  {
    id: "qc-jur-diag-01",
    moduleSlug: "juridique",
    lessonSlug: "diagnostics",
    question: "Quelle est la durée de validité d'un DPE réalisé aujourd'hui ?",
    options: [
      { label: "10 ans", isCorrect: true },
      { label: "3 ans", isCorrect: false },
      { label: "6 ans", isCorrect: false },
      { label: "Illimitée", isCorrect: false },
    ],
    explanation: "Le DPE est valable 10 ans. Ceux réalisés avant le 1er juillet 2021 ne sont plus valables depuis le 1er janvier 2025. Après des travaux d'amélioration énergétique, il est conseillé de le refaire pour valoriser le bien.",
    difficulty: "easy",
  },
  {
    id: "qc-jur-diag-02",
    moduleSlug: "juridique",
    lessonSlug: "diagnostics",
    question: "Pour quels biens le diagnostic amiante est-il obligatoire à la vente ?",
    options: [
      { label: "Permis de construire délivré avant le 1er juillet 1997", isCorrect: true },
      { label: "Permis de construire délivré avant le 1er janvier 1949", isCorrect: false },
      { label: "Permis de construire délivré avant le 1er janvier 1975", isCorrect: false },
      { label: "Tous les biens, quelle que soit leur date de construction", isCorrect: false },
    ],
    explanation: "L'amiante est interdit en France depuis le 1er janvier 1997 : le diagnostic concerne les immeubles dont le permis de construire a été délivré avant le 1er juillet 1997. La date du 1er janvier 1949 est celle du diagnostic plomb (CREP).",
    difficulty: "medium",
  },
  {
    id: "qc-jur-diag-03",
    moduleSlug: "juridique",
    lessonSlug: "diagnostics",
    question: "Quel diagnostic informe l'acquéreur des risques d'inondation, de séisme ou de pollution des sols ?",
    options: [
      { label: "L'état des risques (ERP)", isCorrect: true },
      { label: "Le diagnostic de performance énergétique", isCorrect: false },
      { label: "Le constat de risque d'exposition au plomb", isCorrect: false },
      { label: "Le diagnostic de l'installation électrique", isCorrect: false },
    ],
    explanation: "L'état des risques (ERP) informe sur les risques naturels, miniers et technologiques, le radon, le recul du trait de côte et la pollution des sols. Il doit dater de moins de 6 mois et être fourni dès la première visite.",
    difficulty: "easy",
  },

  // juridique / mandats
  {
    id: "qc-jur-mand-01",
    moduleSlug: "juridique",
    lessonSlug: "mandats",
    question: "Quel mandat confie la vente à une seule agence ?",
    options: [
      { label: "Le mandat exclusif", isCorrect: true },
      { label: "Le mandat simple", isCorrect: false },
      { label: "Le mandat de recherche", isCorrect: false },
      { label: "Le mandat de gestion", isCorrect: false },
    ],
    explanation: "Le mandat exclusif confie la vente à une seule agence. Selon sa clause, le vendeur peut ou non conserver le droit de vendre lui-même ; s'il vend par une autre agence pendant l'exclusivité, il doit une indemnité.",
    difficulty: "easy",
  },
  {
    id: "qc-jur-mand-02",
    moduleSlug: "juridique",
    lessonSlug: "mandats",
    question: "Quand un mandat exclusif peut-il être dénoncé par le vendeur ?",
    options: [
      { label: "À tout moment après 3 mois, avec 15 jours de préavis", isCorrect: true },
      { label: "Seulement au terme prévu, même s'il dure un an", isCorrect: false },
      { label: "À tout moment, sans préavis ni délai minimal", isCorrect: false },
      { label: "Après 6 mois, avec un mois de préavis", isCorrect: false },
    ],
    explanation: "Article 78 du décret n° 72-678 : passé un délai de trois mois à compter de sa signature, le mandat exclusif peut être dénoncé à tout moment par chacune des parties, par lettre recommandée avec accusé de réception, moyennant un préavis de quinze jours.",
    difficulty: "medium",
  },

  // juridique / copropriete
  {
    id: "qc-jur-copro-01",
    moduleSlug: "juridique",
    lessonSlug: "copropriete",
    question: "Quel document résume les données financières et techniques d'une copropriété ?",
    options: [
      { label: "La fiche synthétique", isCorrect: true },
      { label: "Le règlement de copropriété", isCorrect: false },
      { label: "Le carnet d'entretien", isCorrect: false },
      { label: "Le procès-verbal d'AG", isCorrect: false },
    ],
    explanation: "La fiche synthétique, créée par la loi ALUR et établie chaque année par le syndic, regroupe les données financières et techniques essentielles de la copropriété. Elle fait partie des documents remis à l'acquéreur d'un lot.",
    difficulty: "medium",
  },
  {
    id: "qc-jur-copro-02",
    moduleSlug: "juridique",
    lessonSlug: "copropriete",
    question: "Selon quel critère principal les charges générales de copropriété sont-elles réparties ?",
    options: [
      { label: "Les tantièmes de chaque lot", isCorrect: true },
      { label: "La seule superficie du lot", isCorrect: false },
      { label: "Le nombre de pièces du lot", isCorrect: false },
      { label: "L'étage où se situe le lot", isCorrect: false },
    ],
    explanation: "Les charges générales sont réparties selon les tantièmes (ou millièmes) fixés par le règlement de copropriété, proportionnels à la valeur relative de chaque lot, qui tient compte de sa consistance, de sa superficie et de sa situation (art. 10 de la loi du 10 juillet 1965).",
    difficulty: "medium",
  },

  // ──────────────────────────────────────────────
  // MODULE 2 — TRANSACTION
  // ──────────────────────────────────────────────

  // transaction / estimation
  {
    id: "qc-tra-est-01",
    moduleSlug: "transaction",
    lessonSlug: "estimation",
    question: "Quelle méthode d'estimation compare le bien à des ventes récentes similaires ?",
    options: [
      { label: "L'analyse comparative de marché", isCorrect: true },
      { label: "La méthode par capitalisation du loyer", isCorrect: false },
      { label: "La méthode par le coût de reconstruction", isCorrect: false },
      { label: "La méthode par la valeur du terrain nu", isCorrect: false },
    ],
    explanation: "L'analyse comparative de marché (ACM), ou méthode par comparaison, est la plus utilisée en résidentiel : elle s'appuie sur les prix de biens similaires vendus récemment dans le même secteur, corrigés des différences (étage, état, extérieur…).",
    difficulty: "easy",
  },
  {
    id: "qc-tra-est-02",
    moduleSlug: "transaction",
    lessonSlug: "estimation",
    question: "Quelle base publique donne accès aux prix de vente réels des biens immobiliers ?",
    options: [
      { label: "DVF (Demandes de valeurs foncières)", isCorrect: true },
      { label: "Les annonces archivées des portails", isCorrect: false },
      { label: "Le cadastre, consultable en mairie", isCorrect: false },
      { label: "Les loyers de référence de l'INSEE", isCorrect: false },
    ],
    explanation: "La base DVF, publique et gratuite, recense les mutations immobilières à titre onéreux publiées par les services fonciers, avec leur prix réel. Les annonces ne donnent que des prix affichés, pas des prix de vente.",
    difficulty: "medium",
  },

  // transaction / prospection
  {
    id: "qc-tra-prosp-01",
    moduleSlug: "transaction",
    lessonSlug: "prospection",
    question: "Qu'appelle-t-on la « pige » en prospection immobilière ?",
    options: [
      { label: "La distribution de flyers dans les boîtes aux lettres", isCorrect: false },
      { label: "Le repérage des biens vendus par des particuliers", isCorrect: true },
      { label: "La visite spontanée de biens en vente", isCorrect: false },
      { label: "L'envoi d'emails marketing en masse", isCorrect: false },
    ],
    explanation:
      "La pige consiste à repérer les biens mis en vente par des particuliers (Leboncoin, PAP...) pour leur proposer ses services. Depuis le 11 août 2026, on ne peut plus les appeler sans leur consentement préalable : on les contacte par courrier ou en personne.",
    difficulty: "easy",
  },
  {
    id: "qc-tra-prosp-02",
    moduleSlug: "transaction",
    lessonSlug: "prospection",
    question: "Quel est l'objectif principal du « farming » de quartier ?",
    options: [
      { label: "Devenir l'expert de référence d'un secteur", isCorrect: true },
      { label: "Vendre un maximum de biens, le plus vite", isCorrect: false },
      { label: "Ne prendre que des mandats exclusifs", isCorrect: false },
      { label: "Distribuer un maximum de cartes de visite", isCorrect: false },
    ],
    explanation: "Le farming consiste à devenir l'expert incontournable d'un secteur précis par une présence régulière : boîtage, courriers, événements, veille du marché local. Les mandats viennent ensuite de la notoriété acquise.",
    difficulty: "medium",
  },

  // transaction / negociation-mandat
  {
    id: "qc-tra-negm-01",
    moduleSlug: "transaction",
    lessonSlug: "negociation-mandat",
    question: "Pourquoi un mandat exclusif bien travaillé se vend-il souvent mieux qu'un mandat simple ?",
    options: [
      { label: "Un seul prix, une stratégie et un suivi coordonnés", isCorrect: true },
      { label: "Parce que la loi interdit les mandats simples", isCorrect: false },
      { label: "Parce que l'acquéreur ne peut pas négocier le prix", isCorrect: false },
      { label: "Parce que les honoraires y sont plafonnés par la loi", isCorrect: false },
    ],
    explanation: "Avec l'exclusivité, un seul agent porte le bien : un prix cohérent, une diffusion maîtrisée, un suivi des visites et des comptes rendus. Un bien proposé par plusieurs agences à des prix différents perd en crédibilité. Le mandat simple reste parfaitement légal.",
    difficulty: "medium",
  },
  {
    id: "qc-tra-negm-02",
    moduleSlug: "transaction",
    lessonSlug: "negociation-mandat",
    question: "Quel argument est le plus convaincant pour obtenir un mandat exclusif ?",
    options: [
      { label: "Un plan d'action précis, avec des comptes rendus", isCorrect: true },
      { label: "« Nos honoraires sont les plus bas du marché »", isCorrect: false },
      { label: "« Tous les agents travaillent de la même façon »", isCorrect: false },
      { label: "« Le mandat simple ne protège pas le vendeur »", isCorrect: false },
    ],
    explanation: "L'exclusivité se justifie par un engagement concret : photos professionnelles, diffusion, visites qualifiées, reporting. La loi impose d'ailleurs que le mandat exclusif précise les actions promises et la façon dont l'agent en rend compte (loi Hoguet, art. 6).",
    difficulty: "hard",
  },

  // transaction / negociation-avancee
  {
    id: "qc-tra-nega-01",
    moduleSlug: "transaction",
    lessonSlug: "negociation-avancee",
    question: "Que désigne le BATNA en négociation ?",
    options: [
      { label: "Votre meilleure solution si la négociation échoue", isCorrect: true },
      { label: "Le prix plancher fixé par écrit dans le mandat", isCorrect: false },
      { label: "La première offre faite par l'acquéreur", isCorrect: false },
      { label: "Le barème des honoraires affiché en agence", isCorrect: false },
    ],
    explanation: "BATNA (Best Alternative To a Negotiated Agreement) : la meilleure option de repli si l'accord échoue. Connaître le sien, et estimer celui de l'autre partie, permet de savoir jusqu'où aller.",
    difficulty: "medium",
  },
  {
    id: "qc-tra-nega-02",
    moduleSlug: "transaction",
    lessonSlug: "negociation-avancee",
    question: "En quoi consiste la technique de l'ancrage en négociation ?",
    options: [
      { label: "Poser un premier chiffre qui oriente la suite", isCorrect: true },
      { label: "Faire une offre très basse pour déstabiliser", isCorrect: false },
      { label: "Attendre que l'autre fasse la première offre", isCorrect: false },
      { label: "Refuser toute concession jusqu'à la fin", isCorrect: false },
    ],
    explanation: "L'ancrage consiste à poser le premier chiffre de référence (prix affiché, estimation argumentée), qui sert de point de départ psychologique à toute la discussion. Une offre outrancière, elle, rompt souvent la négociation.",
    difficulty: "hard",
  },

  // transaction / crm
  {
    id: "qc-tra-crm-01",
    moduleSlug: "transaction",
    lessonSlug: "crm",
    question: "Quel est l'objectif principal d'un CRM en agence immobilière ?",
    options: [
      { label: "Centraliser et suivre contacts, leads et affaires", isCorrect: true },
      { label: "Remplacer les visites physiques par du virtuel", isCorrect: false },
      { label: "Calculer automatiquement le prix de chaque bien", isCorrect: false },
      { label: "Rédiger seul les compromis de vente", isCorrect: false },
    ],
    explanation: "Le CRM centralise la relation client : contacts, historique des échanges, consentements, suivi des mandats, relances et pipeline de ventes. Il structure l'activité, il ne remplace ni l'estimation ni la rédaction juridique.",
    difficulty: "easy",
  },
  {
    id: "qc-tra-crm-02",
    moduleSlug: "transaction",
    lessonSlug: "crm",
    question: "Quel indicateur mesure le taux de transformation commerciale d'un agent ?",
    options: [
      { label: "Mandats signés / leads qualifiés", isCorrect: true },
      { label: "Le nombre de visites réalisées", isCorrect: false },
      { label: "Le nombre d'appels passés par jour", isCorrect: false },
      { label: "Le chiffre d'affaires du mois", isCorrect: false },
    ],
    explanation: "Le ratio mandats signés / leads qualifiés mesure l'efficacité commerciale. Le nombre de visites ou d'appels mesure l'activité, pas son rendement ; le chiffre d'affaires dépend aussi du prix des biens.",
    difficulty: "hard",
  },

  // ──────────────────────────────────────────────
  // MODULE 3 — FINANCEMENT
  // ──────────────────────────────────────────────

  // financement / credit
  {
    id: "qc-fin-cred-01",
    moduleSlug: "financement",
    lessonSlug: "credit",
    question:
      "Quel est le taux d'endettement maximum recommandé par le HCSF pour un crédit immobilier ?",
    options: [
      { label: "25 %", isCorrect: false },
      { label: "33 %", isCorrect: false },
      { label: "35 %", isCorrect: true },
      { label: "40 %", isCorrect: false },
    ],
    explanation:
      "Depuis janvier 2022, le HCSF (Haut Conseil de Stabilité Financière) recommande un taux d'endettement maximum de 35 % des revenus nets, assurance emprunteur incluse.",
    difficulty: "easy",
  },
  {
    id: "qc-fin-cred-02",
    moduleSlug: "financement",
    lessonSlug: "credit",
    question:
      "Quelle est la durée maximum d'un crédit immobilier selon les recommandations du HCSF ?",
    options: [
      { label: "20 ans", isCorrect: false },
      { label: "25 ans", isCorrect: true },
      { label: "30 ans", isCorrect: false },
      { label: "Pas de limite", isCorrect: false },
    ],
    explanation:
      "Le HCSF recommande une durée maximum de 25 ans (27 ans en cas de différé pour achat en VEFA ou travaux importants).",
    difficulty: "easy",
  },
  {
    id: "qc-fin-cred-03",
    moduleSlug: "financement",
    lessonSlug: "credit",
    question:
      "Quel est le délai de réflexion obligatoire après réception d'une offre de prêt ?",
    options: [
      { label: "7 jours", isCorrect: false },
      { label: "10 jours", isCorrect: true },
      { label: "14 jours", isCorrect: false },
      { label: "30 jours", isCorrect: false },
    ],
    explanation:
      "L'emprunteur dispose d'un délai de réflexion incompressible de 10 jours calendaires à compter de la réception de l'offre de prêt avant de pouvoir l'accepter.",
    difficulty: "medium",
  },

  // financement / fiscalite
  {
    id: "qc-fin-fisc-01",
    moduleSlug: "financement",
    lessonSlug: "fiscalite",
    question:
      "En dessous de quel montant de revenus fonciers annuels peut-on opter pour le micro-foncier ?",
    options: [
      { label: "10 000 EUR", isCorrect: false },
      { label: "15 000 EUR", isCorrect: true },
      { label: "20 000 EUR", isCorrect: false },
      { label: "30 000 EUR", isCorrect: false },
    ],
    explanation:
      "Le régime micro-foncier s'applique automatiquement si les revenus fonciers bruts annuels sont inférieurs à 15 000 EUR. Un abattement forfaitaire de 30 % est alors appliqué.",
    difficulty: "easy",
  },
  {
    id: "qc-fin-fisc-02",
    moduleSlug: "financement",
    lessonSlug: "fiscalite",
    question:
      "Quel est l'abattement forfaitaire en régime micro-BIC pour la location meublée (LMNP) ?",
    options: [
      { label: "30 %", isCorrect: false },
      { label: "50 %", isCorrect: true },
      { label: "40 %", isCorrect: false },
      { label: "10 %", isCorrect: false },
    ],
    explanation:
      "Le micro-BIC applique un abattement forfaitaire de 50 % aux locations meublées classiques (recettes jusqu'à 77 700 €). Depuis la loi Le Meur de 2024, les meublés de tourisme classés sont aussi à 50 %, et les non classés à 30 % (plafond 15 000 €) : l'ancien taux de 71 % a disparu.",
    difficulty: "medium",
  },

  // financement / rentabilite
  {
    id: "qc-fin-rent-01",
    moduleSlug: "financement",
    lessonSlug: "rentabilite",
    question:
      "Comment calcule-t-on la rentabilité brute d'un investissement locatif ?",
    options: [
      { label: "(Loyer mensuel x 12) / Prix d'achat x 100", isCorrect: true },
      { label: "(Loyer mensuel - charges) x 12 / Prix d'achat x 100", isCorrect: false },
      { label: "Prix d'achat / Loyer annuel x 100", isCorrect: false },
      { label: "(Loyer mensuel x 12 - impôts) / Prix d'achat x 100", isCorrect: false },
    ],
    explanation:
      "La rentabilité brute se calcule simplement : (Loyer annuel / Prix d'achat total) x 100. Par exemple, un bien acheté 200 000 EUR loué 800 EUR/mois offre une rentabilité brute de 4,8 %.",
    difficulty: "easy",
  },
  {
    id: "qc-fin-rent-02",
    moduleSlug: "financement",
    lessonSlug: "rentabilite",
    question:
      "Quelle différence principale existe entre rentabilité nette et rentabilité nette-nette ?",
    options: [
      { label: "Aucune : ce sont deux synonymes", isCorrect: false },
      { label: "La nette-nette déduit aussi l'impôt", isCorrect: true },
      { label: "La nette-nette exclut les frais de notaire", isCorrect: false },
      { label: "La nette-nette est calculée avant impôts", isCorrect: false },
    ],
    explanation:
      "La rentabilité nette déduit les charges (copropriété, taxe foncière, gestion, assurance). La rentabilité nette-nette va plus loin en intégrant la fiscalité (impôt sur le revenu, prélèvements sociaux).",
    difficulty: "hard",
  },

  // financement / dispositifs
  {
    id: "qc-fin-disp-01",
    moduleSlug: "financement",
    lessonSlug: "fiscalite-avancee",
    question: "Dans le dispositif Denormandie, quelle part minimale du coût total de l'opération les travaux doivent-ils représenter ?",
    options: [
      { label: "25 %", isCorrect: true },
      { label: "10 %", isCorrect: false },
      { label: "50 %", isCorrect: false },
      { label: "75 %", isCorrect: false },
    ],
    explanation: "Le Denormandie (art. 199 novovicies du CGI, prolongé jusqu'au 31 décembre 2027) exige des travaux représentant au moins 25 % du coût total de l'opération, dans une commune éligible. La réduction d'impôt atteint 12, 18 ou 21 % selon la durée de location (6, 9 ou 12 ans).",
    difficulty: "medium",
  },
  {
    id: "qc-fin-disp-02",
    moduleSlug: "financement",
    lessonSlug: "fiscalite",
    question: "Dans quelle limite annuelle un déficit foncier s'impute-t-il sur le revenu global ?",
    options: [
      { label: "10 700 €", isCorrect: true },
      { label: "5 000 €", isCorrect: false },
      { label: "15 000 €", isCorrect: false },
      { label: "Sans limite", isCorrect: false },
    ],
    explanation: "Le déficit foncier (charges déductibles supérieures aux revenus fonciers, hors intérêts d'emprunt) s'impute sur le revenu global dans la limite de 10 700 € par an. Le plafond relevé à 21 400 € pour les travaux de sortie de passoire concernait les dépenses payées jusqu'au 31 décembre 2025. L'excédent est reportable sur les revenus fonciers des 10 années suivantes.",
    difficulty: "hard",
  },

  // financement / assurances
  {
    id: "qc-fin-ass-01",
    moduleSlug: "financement",
    lessonSlug: "assurances",
    question:
      "La loi Lemoine permet de changer d'assurance emprunteur à quel moment ?",
    options: [
      { label: "Uniquement à la date anniversaire du contrat", isCorrect: false },
      { label: "À tout moment, sans frais ni pénalité", isCorrect: true },
      { label: "Uniquement dans les 12 premiers mois", isCorrect: false },
      { label: "Tous les 3 ans", isCorrect: false },
    ],
    explanation:
      "Depuis la loi Lemoine (juin 2022), tout emprunteur peut résilier et changer d'assurance emprunteur à tout moment, sans frais, sous réserve d'équivalence de garanties.",
    difficulty: "medium",
  },
  {
    id: "qc-fin-ass-02",
    moduleSlug: "financement",
    lessonSlug: "assurances",
    question:
      "Que signifie la « délégation d'assurance » en crédit immobilier ?",
    options: [
      { label: "Confier la gestion de son prêt à un courtier", isCorrect: false },
      { label: "Choisir l'assurance d'un autre assureur", isCorrect: true },
      { label: "Déléguer le paiement de l'assurance au notaire", isCorrect: false },
      { label: "Souscrire une assurance pour un tiers", isCorrect: false },
    ],
    explanation:
      "La délégation d'assurance permet à l'emprunteur de souscrire une assurance individuelle auprès d'un assureur externe, souvent moins chère que l'assurance groupe proposée par la banque, à garanties équivalentes.",
    difficulty: "easy",
  },

  // ──────────────────────────────────────────────
  // MODULE 4 — MARKETING
  // ──────────────────────────────────────────────

  // marketing / photos
  {
    id: "qc-mkt-photo-01",
    moduleSlug: "marketing",
    lessonSlug: "photos",
    question: "À quel moment photographier l'intérieur d'un bien ?",
    options: [
      { label: "En milieu de journée, avec la lumière du jour", isCorrect: true },
      { label: "Très tôt le matin, avant le lever du soleil", isCorrect: false },
      { label: "Le soir, toutes les lampes du logement allumées", isCorrect: false },
      { label: "La nuit, pour une ambiance chaleureuse", isCorrect: false },
    ],
    explanation: "Les photos intérieures se prennent idéalement en milieu de journée, quand la lumière naturelle est maximale, en évitant les contre-jours directs. On allume aussi les lampes pour équilibrer les zones sombres.",
    difficulty: "easy",
  },
  {
    id: "qc-mkt-photo-02",
    moduleSlug: "marketing",
    lessonSlug: "photos",
    question: "Pourquoi garder les verticales bien droites sur une photo immobilière ?",
    options: [
      { label: "Pour un rendu professionnel et des volumes fidèles", isCorrect: true },
      { label: "Pour faire paraître les pièces nettement plus grandes", isCorrect: false },
      { label: "Pour respecter une norme légale d'affichage des annonces", isCorrect: false },
      { label: "Pour obtenir un effet artistique plus original", isCorrect: false },
    ],
    explanation: "Des murs, portes et fenêtres parfaitement verticaux donnent un rendu professionnel et une perception juste de l'espace. Les lignes penchées font amateur et déforment les volumes.",
    difficulty: "medium",
  },

  // marketing / annonces
  {
    id: "qc-mkt-ann-01",
    moduleSlug: "marketing",
    lessonSlug: "annonces",
    question: "Quel est l'objectif principal du titre d'une annonce immobilière ?",
    options: [
      { label: "Capter l'attention et donner envie de cliquer", isCorrect: true },
      { label: "Décrire le bien en détail : type, m², ville", isCorrect: false },
      { label: "Afficher le prix pour filtrer les acquéreurs", isCorrect: false },
      { label: "Reprendre les mentions légales obligatoires", isCorrect: false },
    ],
    explanation: "Le titre doit accrocher en quelques secondes, avec le bénéfice principal du bien (« Terrasse plein sud au calme »). Les caractéristiques techniques et les mentions obligatoires (prix, honoraires, DPE) figurent dans le corps de l'annonce.",
    difficulty: "easy",
  },
  {
    id: "qc-mkt-ann-02",
    moduleSlug: "marketing",
    lessonSlug: "annonces",
    question: "Quelle série de photos donne la meilleure annonce ?",
    options: [
      { label: "Une douzaine de photos soignées, pièce par pièce", isCorrect: true },
      { label: "Trois photos seulement, pour garder un peu de mystère", isCorrect: false },
      { label: "Une seule photo de façade, le reste se voit en visite", isCorrect: false },
      { label: "Plus de quarante photos, y compris des placards", isCorrect: false },
    ],
    explanation: "Une série d'une dizaine à une quinzaine de photos de qualité couvre toutes les pièces et les atouts du bien sans lasser. Trop peu de photos inspire la méfiance ; trop de photos dilue l'attention sur l'essentiel.",
    difficulty: "medium",
  },

  // marketing / portails
  {
    id: "qc-mkt-port-01",
    moduleSlug: "marketing",
    lessonSlug: "portails",
    question: "Vous vendez un studio étudiant à petit prix. Où votre annonce touchera-t-elle le plus large public ?",
    options: [
      { label: "Sur Leboncoin, portail généraliste à très forte audience", isCorrect: true },
      { label: "Sur un portail de prestige réservé aux biens de luxe", isCorrect: false },
      { label: "Uniquement en vitrine, pour ne pas lasser les portails", isCorrect: false },
      { label: "Uniquement sur LinkedIn, auprès des investisseurs", isCorrect: false },
    ],
    explanation: "Leboncoin est le site d'annonces immobilières le plus visité en France, avec un public large et local. SeLoger reste le premier portail spécialisé. Le choix du portail dépend de la cible : un studio étudiant n'a pas sa place sur un site de prestige.",
    difficulty: "easy",
  },
  {
    id: "qc-mkt-port-02",
    moduleSlug: "marketing",
    lessonSlug: "portails",
    question: "Quelle action améliore le plus la visibilité d'une annonce sur un portail ?",
    options: [
      { label: "Renseigner tous les champs et soigner les photos", isCorrect: true },
      { label: "Ajouter le plus de texte possible dans la description", isCorrect: false },
      { label: "Afficher le prix le plus bas possible pour le bien", isCorrect: false },
      { label: "Ne publier l'annonce que le week-end", isCorrect: false },
    ],
    explanation: "Les algorithmes des portails favorisent les annonces complètes (tous les critères renseignés) et bien illustrées, qui correspondent aussi mieux aux filtres des acquéreurs. Un texte trop long n'apporte rien ; un prix artificiellement bas est trompeur.",
    difficulty: "medium",
  },

  // marketing / reseaux
  {
    id: "qc-mkt-res-01",
    moduleSlug: "marketing",
    lessonSlug: "reseaux",
    question: "Quel format met le mieux en valeur un bien sur Instagram ?",
    options: [
      { label: "Un Reel : courte vidéo de la visite", isCorrect: true },
      { label: "Une seule photo, sans aucune légende", isCorrect: false },
      { label: "Un long texte en légende, sans image", isCorrect: false },
      { label: "Un lien vers le site, sans visuel", isCorrect: false },
    ],
    explanation: "Les Reels (vidéos courtes verticales) sont le format le plus mis en avant par l'algorithme d'Instagram. Une visite express qui montre les trois atouts du bien, avec sous-titres, retient l'attention de l'utilisateur qui fait défiler son fil.",
    difficulty: "easy",
  },
  {
    id: "qc-mkt-res-02",
    moduleSlug: "marketing",
    lessonSlug: "reseaux",
    question: "Quel réseau social convient le mieux pour toucher notaires, promoteurs et investisseurs ?",
    options: [
      { label: "LinkedIn", isCorrect: true },
      { label: "TikTok", isCorrect: false },
      { label: "Snapchat", isCorrect: false },
      { label: "Pinterest", isCorrect: false },
    ],
    explanation: "LinkedIn est le réseau professionnel : il permet de construire sa crédibilité auprès des investisseurs, promoteurs, notaires et autres partenaires, par des analyses de marché et des retours d'expérience.",
    difficulty: "easy",
  },

  // marketing / seo
  {
    id: "qc-mkt-seo-01",
    moduleSlug: "marketing",
    lessonSlug: "seo",
    question: "Quel outil Google gratuit est indispensable au référencement local d'une agence ?",
    options: [
      { label: "Google Business Profile", isCorrect: true },
      { label: "Google Ads", isCorrect: false },
      { label: "Google Workspace", isCorrect: false },
      { label: "Google Trends", isCorrect: false },
    ],
    explanation: "Google Business Profile (ex-Google My Business) alimente les résultats locaux et Google Maps. Une fiche complète, active, avec des avis récents, est le premier levier de visibilité locale. Google Ads est payant.",
    difficulty: "easy",
  },
  {
    id: "qc-mkt-seo-02",
    moduleSlug: "marketing",
    lessonSlug: "seo",
    question: "Quel contenu attire le plus de visiteurs qualifiés sur le site d'une agence locale ?",
    options: [
      { label: "Des pages quartier : prix, écoles, transports", isCorrect: true },
      { label: "Des fiches de biens réduites aux caractéristiques", isCorrect: false },
      { label: "Des communiqués de presse sur la vie de l'agence", isCorrect: false },
      { label: "La même page de contact dupliquée par ville", isCorrect: false },
    ],
    explanation: "Les pages quartier (guide local, écoles, transports, commerces, prix) répondent aux recherches des acquéreurs et vendeurs locaux (« immobilier Montmartre »). Le contenu dupliqué est pénalisé par Google.",
    difficulty: "hard",
  },

  // ──────────────────────────────────────────────
  // MODULE 5 — TERRAIN
  // ──────────────────────────────────────────────

  // terrain / visite
  {
    id: "qc-ter-vis-01",
    moduleSlug: "terrain",
    lessonSlug: "visite",
    question: "Par quelle pièce est-il recommandé de commencer une visite ?",
    options: [
      { label: "La pièce la plus forte du bien, souvent le séjour", isCorrect: true },
      { label: "La cuisine, pièce la plus technique du logement", isCorrect: false },
      { label: "La chambre principale, pièce la plus intime", isCorrect: false },
      { label: "Les toilettes, pour montrer qu'on ne cache rien", isCorrect: false },
    ],
    explanation: "Commencer par la pièce la plus impressionnante (séjour lumineux, terrasse avec vue) crée une première impression forte et place l'acquéreur dans un état d'esprit positif pour la suite de la visite.",
    difficulty: "easy",
  },
  {
    id: "qc-ter-vis-02",
    moduleSlug: "terrain",
    lessonSlug: "visite",
    question: "Que devez-vous connaître de l'acquéreur avant de lui faire visiter un bien ?",
    options: [
      { label: "Son projet de vie et ses critères prioritaires", isCorrect: true },
      { label: "Le détail de son épargne, relevés à l'appui", isCorrect: false },
      { label: "La liste des agences qu'il a déjà consultées", isCorrect: false },
      { label: "Le prix qu'il a payé son logement actuel", isCorrect: false },
    ],
    explanation: "Connaître le projet (motif, délai), le budget validé et les critères prioritaires permet de personnaliser la visite et d'anticiper les objections. Les relevés de compte n'ont pas à être collectés : une simulation ou un accord de principe bancaire suffit.",
    difficulty: "medium",
  },

  // terrain / argumentaire
  {
    id: "qc-ter-arg-01",
    moduleSlug: "terrain",
    lessonSlug: "argumentaire",
    question: "Quelle méthode transforme chaque caractéristique du bien en bénéfice pour l'acquéreur ?",
    options: [
      { label: "CAP : Caractéristique, Avantage, Preuve", isCorrect: true },
      { label: "AIDA : Attention, Intérêt, Désir, Action", isCorrect: false },
      { label: "SWOT : forces, faiblesses, opportunités", isCorrect: false },
      { label: "Les 4P : produit, prix, place, promotion", isCorrect: false },
    ],
    explanation: "La méthode CAP relie chaque caractéristique à un avantage concret, prouvé sur place : triple vitrage (C) → silence (A) → on ferme les fenêtres pendant la visite (P). AIDA structure plutôt une annonce, SWOT et les 4P sont des outils de stratégie.",
    difficulty: "medium",
  },
  {
    id: "qc-ter-arg-02",
    moduleSlug: "terrain",
    lessonSlug: "argumentaire",
    question: "Pendant la visite, l'acquéreur lance : « C'est trop cher. » Quelle approche adopter ?",
    options: [
      { label: "Comparer au marché et détailler la valeur du bien", isCorrect: true },
      { label: "Proposer tout de suite une baisse, pour le garder", isCorrect: false },
      { label: "Ignorer la remarque et passer à la pièce suivante", isCorrect: false },
      { label: "Affirmer que le vendeur ne négociera jamais", isCorrect: false },
    ],
    explanation: "On recadre la valeur : prix au m² comparé aux ventes récentes du secteur, prestations incluses (parking, cave, travaux récents), emplacement. Proposer une baisse sans l'accord du vendeur est une faute, et fermer la discussion fait perdre l'acquéreur.",
    difficulty: "medium",
  },

  // terrain / closing
  {
    id: "qc-ter-clo-01",
    moduleSlug: "terrain",
    lessonSlug: "closing",
    question: "Quel signal montre qu'un acquéreur est prêt à faire une offre ?",
    options: [
      { label: "Il se projette : « On mettrait le canapé ici »", isCorrect: true },
      { label: "Il regarde sa montre et écourte la visite", isCorrect: false },
      { label: "Il dit vouloir voir d'autres biens d'abord", isCorrect: false },
      { label: "Il critique le prix affiché dès l'entrée", isCorrect: false },
    ],
    explanation: "Quand l'acquéreur s'approprie le bien (meubles, organisation de la vie quotidienne, travaux envisagés), c'est un signal d'achat fort : le moment de lui proposer de formaliser une offre.",
    difficulty: "easy",
  },
  {
    id: "qc-ter-clo-02",
    moduleSlug: "terrain",
    lessonSlug: "closing",
    question: "Quelle technique de conclusion laisse le client maître de sa décision ?",
    options: [
      { label: "La question alternative : « Mardi ou jeudi ? »", isCorrect: true },
      { label: "L'ultimatum : « Il faut décider ce soir »", isCorrect: false },
      { label: "La fausse rareté : « Un autre client signe demain »", isCorrect: false },
      { label: "La remise de dernière minute sur les honoraires", isCorrect: false },
    ],
    explanation: "La question alternative propose deux options qui mènent toutes deux à l'étape suivante, sans pression. L'ultimatum braque, et la fausse rareté est une pratique commerciale trompeuse.",
    difficulty: "hard",
  },

  // terrain / promesse
  {
    id: "qc-ter-prom-01",
    moduleSlug: "terrain",
    lessonSlug: "promesse",
    question: "Quelle est la différence principale entre une promesse unilatérale et un compromis de vente ?",
    options: [
      { label: "La promesse n'engage que le vendeur ; le compromis, les deux", isCorrect: true },
      { label: "Aucune : ce sont deux noms pour le même contrat de vente", isCorrect: false },
      { label: "Le compromis coûte plus cher en frais de notaire à l'acte", isCorrect: false },
      { label: "La promesse peut être conclue sans aucun écrit entre parties", isCorrect: false },
    ],
    explanation: "Dans la promesse unilatérale, seul le vendeur s'engage ; l'acquéreur dispose d'une option, contre une indemnité d'immobilisation. Signée sous seing privé, elle doit être enregistrée dans les 10 jours. Dans le compromis, les deux parties s'engagent réciproquement.",
    difficulty: "medium",
  },
  {
    id: "qc-ter-prom-02",
    moduleSlug: "terrain",
    lessonSlug: "promesse",
    question: "Quel dépôt de garantie prévoit-on en général dans un compromis de vente ?",
    options: [
      { label: "5 à 10 % du prix", isCorrect: true },
      { label: "1 à 2 % du prix", isCorrect: false },
      { label: "15 à 20 % du prix", isCorrect: false },
      { label: "La totalité du prix", isCorrect: false },
    ],
    explanation: "Le dépôt de garantie représente généralement 5 à 10 % du prix. Il est versé sur un compte séquestre (notaire, ou agent habilité à détenir des fonds) et s'impute sur le prix le jour de l'acte.",
    difficulty: "easy",
  },

  // terrain / fidelisation
  {
    id: "qc-ter-fid-01",
    moduleSlug: "terrain",
    lessonSlug: "fidelisation",
    question: "Quel est le meilleur moment pour demander une recommandation à un client ?",
    options: [
      { label: "Juste après l'acte, au pic de satisfaction", isCorrect: true },
      { label: "Dès la première visite, pour gagner du temps", isCorrect: false },
      { label: "Six mois après la vente, une fois à froid", isCorrect: false },
      { label: "Avant même d'avoir trouvé le bien recherché", isCorrect: false },
    ],
    explanation: "La demande se fait au moment où la satisfaction est la plus forte : juste après la signature de l'acte. On l'entretient ensuite par un suivi régulier, par exemple à l'anniversaire de l'achat.",
    difficulty: "medium",
  },
  {
    id: "qc-ter-fid-02",
    moduleSlug: "terrain",
    lessonSlug: "fidelisation",
    question: "Quel outil garde le lien avec vos anciens clients sans être intrusif ?",
    options: [
      { label: "Une newsletter trimestrielle sur le marché local", isCorrect: true },
      { label: "Des publicités Facebook ciblées sur leur profil", isCorrect: false },
      { label: "Des SMS promotionnels envoyés chaque semaine", isCorrect: false },
      { label: "Un appel téléphonique toutes les semaines", isCorrect: false },
    ],
    explanation: "Une newsletter trimestrielle utile (tendances du quartier, conseils patrimoniaux) entretient la relation sans harceler. Pour d'anciens clients, elle est permise si elle porte sur des services analogues et offre un désabonnement simple à chaque envoi.",
    difficulty: "easy",
  },

  // ── transaction / prospection ──────────────────────────
  {
    id: "qc-trans-prosp-01",
    moduleSlug: "transaction",
    lessonSlug: "prospection",
    question: "Comment choisir la taille de votre secteur de prospection ?",
    options: [
      { label: "Assez petit pour y être vu chaque mois", isCorrect: true },
      { label: "Le plus grand possible, toute la ville", isCorrect: false },
      { label: "Une seule rue, pour ne rien manquer", isCorrect: false },
      { label: "Celui des concurrents, pour les doubler", isCorrect: false },
    ],
    explanation: "Un bon secteur est assez grand pour générer des ventes (rotation annuelle de quelques pour cent des logements) et assez petit pour y assurer une présence régulière : boîtage, visites, événements. Trop étendu, la prospection se dilue.",
    difficulty: "easy",
  },
  {
    id: "qc-trans-prosp-02",
    moduleSlug: "transaction",
    lessonSlug: "prospection",
    question: "Quelle phrase d'ouverture est la plus efficace en porte-à-porte ?",
    options: [
      { label: "Évoquer une vente récente dans la rue", isCorrect: true },
      { label: "Présenter l'agence et ses honoraires", isCorrect: false },
      { label: "Demander tout de suite s'il veut vendre", isCorrect: false },
      { label: "Laisser un flyer, sans engager la parole", isCorrect: false },
    ],
    explanation: "Mentionner une vente récente dans la rue prouve votre présence locale, apporte une information utile et ouvre la conversation sur les projets du propriétaire, sans pression.",
    difficulty: "medium",
  },
  {
    id: "qc-trans-prosp-03",
    moduleSlug: "transaction",
    lessonSlug: "prospection",
    question: "Un propriétaire rencontré en porte-à-porte n'est « pas vendeur pour l'instant ». Que faites-vous ?",
    options: [
      { label: "Vous restez présent, par des contacts utiles et espacés", isCorrect: true },
      { label: "Vous le rayez de votre fichier, définitivement", isCorrect: false },
      { label: "Vous revenez sonner chez lui chaque semaine", isCorrect: false },
      { label: "Vous lui proposez d'emblée de baisser vos honoraires", isCorrect: false },
    ],
    explanation: "Un projet de vente mûrit souvent sur des mois : on reste présent avec régularité et utilité (étude de prix, ventes du quartier), par courrier ou en personne. Pour l'appeler, il faut son accord préalable, conservé dans le CRM.",
    difficulty: "medium",
  },

  // ── transaction / crm ──────────────────────────────────
  {
    id: "qc-trans-crm-01",
    moduleSlug: "transaction",
    lessonSlug: "crm",
    question: "Que signifie l'acronyme CRM ?",
    options: [
      { label: "Customer Relationship Management", isCorrect: true },
      { label: "Calcul de Rendement Mensuel", isCorrect: false },
      { label: "Compte Rendu de Mission", isCorrect: false },
      { label: "Contrat de Réservation de Mandat", isCorrect: false },
    ],
    explanation: "CRM = Customer Relationship Management, ou gestion de la relation client : un logiciel qui centralise contacts, échanges, rappels et statistiques pour piloter l'activité de façon systématique.",
    difficulty: "easy",
  },
  {
    id: "qc-trans-crm-02",
    moduleSlug: "transaction",
    lessonSlug: "crm",
    question: "Selon la règle empirique de Pareto, quelle part de vos contacts génère l'essentiel de votre chiffre d'affaires ?",
    options: [
      { label: "Environ 20 %", isCorrect: true },
      { label: "Environ 5 %", isCorrect: false },
      { label: "Environ 50 %", isCorrect: false },
      { label: "Environ 80 %", isCorrect: false },
    ],
    explanation: "La règle des 80/20 est une tendance observée, pas une loi : une minorité de contacts (anciens clients, prescripteurs, investisseurs) génère la majorité de l'activité. Le CRM sert à les identifier et à les suivre en priorité.",
    difficulty: "medium",
  },
  {
    id: "qc-trans-crm-03",
    moduleSlug: "transaction",
    lessonSlug: "crm",
    question: "À quoi servent les relances automatiques d'un CRM ?",
    options: [
      { label: "À ne laisser aucun contact chaud sans suite", isCorrect: true },
      { label: "À appeler chaque prospect une fois par jour", isCorrect: false },
      { label: "À remplacer tout échange humain avec le client", isCorrect: false },
      { label: "À envoyer des e-mails sans consentement préalable", isCorrect: false },
    ],
    explanation: "Les rappels automatiques garantissent qu'aucun contact qualifié n'est oublié : la fréquence dépend de la chaleur du contact (quelques jours pour un projet imminent, quelques mois pour un projet lointain). Ils déclenchent une action humaine, dans le respect du consentement de chacun.",
    difficulty: "medium",
  },

  // ── marketing / reseaux ────────────────────────────────
  {
    id: "qc-mkt-rsx-01",
    moduleSlug: "marketing",
    lessonSlug: "reseaux",
    question: "Quelle part de contenu promotionnel (biens, honoraires) viser sur vos réseaux sociaux ?",
    options: [
      { label: "Environ 20 %, le reste en contenu utile", isCorrect: true },
      { label: "Environ 80 %, le reste en contenu utile", isCorrect: false },
      { label: "La moitié, pour équilibrer les deux", isCorrect: false },
      { label: "100 % : chaque publication présente un bien", isCorrect: false },
    ],
    explanation: "Règle des 80/20 : environ 80 % de contenu utile (marché local, conseils, coulisses) et 20 % de promotion. Un compte qui ne publie que des annonces voit son engagement chuter.",
    difficulty: "easy",
  },
  {
    id: "qc-mkt-rsx-02",
    moduleSlug: "marketing",
    lessonSlug: "reseaux",
    question: "Quel choix de hashtags élargit le plus la portée d'une publication immobilière locale ?",
    options: [
      { label: "Des hashtags locaux de niche, comme #immoNantes", isCorrect: true },
      { label: "Des hashtags très généraux, comme #immobilier", isCorrect: false },
      { label: "Aucun hashtag : ils sont ignorés par l'algorithme", isCorrect: false },
      { label: "Trente hashtags identiques sur chaque publication", isCorrect: false },
    ],
    explanation: "Les hashtags locaux de niche (#appartementLyon6, #immoNantes) touchent une audience qualifiée, moins noyée dans la masse que #immobilier. Publier aux heures où votre audience est active renforce encore la portée.",
    difficulty: "medium",
  },
  {
    id: "qc-mkt-rsx-03",
    moduleSlug: "marketing",
    lessonSlug: "reseaux",
    question: "Quelle action transforme le mieux l'audience de vos réseaux en rendez-vous vendeurs ?",
    options: [
      { label: "Un appel à l'action vers votre estimation en ligne", isCorrect: true },
      { label: "Un message privé à chaque personne ayant aimé un post", isCorrect: false },
      { label: "Le partage de vos annonces dans des groupes généraux", isCorrect: false },
      { label: "Une publication chaque jour, sans ligne éditoriale", isCorrect: false },
    ],
    explanation: "On invite l'audience à faire la démarche : estimation en ligne, guide à télécharger, prise de rendez-vous, avec le consentement recueilli dans le formulaire. Écrire à des inconnus qui ont simplement aimé une publication est du démarchage non sollicité, mal perçu et juridiquement risqué.",
    difficulty: "hard",
  },

  // ── marketing / seo ────────────────────────────────────
  {
    id: "qc-mkt-seo-05",
    moduleSlug: "marketing",
    lessonSlug: "seo",
    question: "Quel outil gratuit de Google montre sur quelles recherches votre site apparaît ?",
    options: [
      { label: "Google Search Console", isCorrect: true },
      { label: "Google Ads", isCorrect: false },
      { label: "Google Business Profile", isCorrect: false },
      { label: "Google Keyword Planner", isCorrect: false },
    ],
    explanation: "La Search Console affiche les requêtes pour lesquelles votre site apparaît, votre position moyenne, le taux de clic et l'état d'indexation des pages : c'est l'outil de base du suivi SEO.",
    difficulty: "easy",
  },
  {
    id: "qc-mkt-seo-04",
    moduleSlug: "marketing",
    lessonSlug: "seo",
    question: "Quel contenu renforce le plus le référencement local d'une agence ?",
    options: [
      { label: "Des articles hyper-locaux : prix et ventes du quartier", isCorrect: true },
      { label: "Des articles sur les tendances nationales du marché", isCorrect: false },
      { label: "La liste des biens disponibles, sans aucun texte", isCorrect: false },
      { label: "Des pages génériques sur les types de contrats", isCorrect: false },
    ],
    explanation: "Le contenu hyper-local (prix au m² du quartier, ventes récentes, guide de la rue) répond exactement aux recherches des prospects du secteur et attire un trafic qualifié. Les sujets nationaux sont déjà couverts par les grands médias.",
    difficulty: "medium",
  },
  {
    id: "qc-mkt-seo-03",
    moduleSlug: "marketing",
    lessonSlug: "seo",
    question: "Que mesure l'indicateur LCP des Core Web Vitals de Google ?",
    options: [
      { label: "Le temps d'affichage du plus grand élément visible", isCorrect: true },
      { label: "Le nombre de pages vues par chaque visiteur", isCorrect: false },
      { label: "Le nombre d'annonces publiées chaque semaine", isCorrect: false },
      { label: "Le poids total du site, exprimé en mégaoctets", isCorrect: false },
    ],
    explanation: "Le LCP (Largest Contentful Paint) mesure le temps d'affichage du plus grand élément visible, souvent la photo principale : Google le juge bon sous 2,5 secondes. Des photos d'annonces non compressées le dégradent, surtout sur mobile.",
    difficulty: "hard",
  },

  // ── terrain / argumentaire ─────────────────────────────
  {
    id: "qc-ter-arg-04",
    moduleSlug: "terrain",
    lessonSlug: "argumentaire",
    question: "Un vendeur trouve vos honoraires trop élevés. Quel argument est le plus solide ?",
    options: [
      { label: "Le net vendeur attendu, comparé à une vente seul", isCorrect: true },
      { label: "Une baisse immédiate, pour sécuriser le mandat", isCorrect: false },
      { label: "La liste de toutes vos actions de marketing", isCorrect: false },
      { label: "Le rappel que vos tarifs sont dans la norme", isCorrect: false },
    ],
    explanation: "On ne défend pas un pourcentage, on montre un résultat : à partir des ventes du secteur, comparez le net que le vendeur peut espérer avec votre accompagnement (prix, délai, sécurité juridique) à celui d'une vente seul. La liste des actions vient en appui.",
    difficulty: "medium",
  },
  {
    id: "qc-ter-arg-05",
    moduleSlug: "terrain",
    lessonSlug: "argumentaire",
    question: "Qu'est-ce qu'une objection « prétexte » ?",
    options: [
      { label: "Une objection qui masque le vrai frein du client", isCorrect: true },
      { label: "Une objection qui porte sur le prix du bien", isCorrect: false },
      { label: "Une objection qui porte sur les délais de vente", isCorrect: false },
      { label: "Une objection juridique sur le contrat proposé", isCorrect: false },
    ],
    explanation: "L'objection prétexte (« vos honoraires sont trop élevés ») cache souvent un autre frein : peur de se décider, mauvaise expérience passée, préférence pour un concurrent. On la fait émerger en reformulant : « Mis à part les honoraires, qu'est-ce qui vous retient ? »",
    difficulty: "hard",
  },
  {
    id: "qc-ter-arg-03",
    moduleSlug: "terrain",
    lessonSlug: "argumentaire",
    question: "À quel moment d'un rendez-vous vendeur présenter votre estimation ?",
    options: [
      { label: "Après avoir compris ses motivations et son projet", isCorrect: true },
      { label: "Dès l'ouverture, pour cadrer tout de suite le prix", isCorrect: false },
      { label: "Par e-mail, avant le rendez-vous, pour gagner du temps", isCorrect: false },
      { label: "Jamais tant que le mandat de vente n'est pas signé", isCorrect: false },
    ],
    explanation: "Le prix s'annonce après la découverte : motif de la vente, délai, projet qui suit. Sans ce contexte, une estimation réaliste peut braquer le vendeur ; avec lui, vous la présentez au service de ses objectifs.",
    difficulty: "medium",
  },

  // ── terrain / fidelisation ─────────────────────────────
  {
    id: "qc-ter-fid-03",
    moduleSlug: "terrain",
    lessonSlug: "fidelisation",
    question: "Pourquoi un client satisfait vaut-il bien plus qu'une seule vente ?",
    options: [
      { label: "Il reviendra vendre, acheter, et vous recommandera", isCorrect: true },
      { label: "Il vous doit une commission sur sa future revente", isCorrect: false },
      { label: "Il s'engage par écrit à repasser par votre agence", isCorrect: false },
      { label: "Il devient automatiquement votre mandant exclusif", isCorrect: false },
    ],
    explanation: "Un particulier achète et vend plusieurs fois dans sa vie (évolutions familiales, mobilité, investissement), et son entourage aussi. Le fidéliser, c'est construire un portefeuille de mandats futurs et de recommandations, sans aucune obligation contractuelle de sa part.",
    difficulty: "medium",
  },

  // ═════════════════════════════════════════════════════════════════
  // LECONS PRECEDEMMENT VIDES / FAIBLES — RENDUES INCROYABLES
  // ═════════════════════════════════════════════════════════════════

  // ── juridique / tracfin ────────────────────────────────
  {
    id: "qc-jur-trac-01",
    moduleSlug: "juridique",
    lessonSlug: "tracfin",
    question: "Un agent n'a pas respecté ses obligations de vigilance, sans participer à un blanchiment. Que risque-t-il ?",
    options: [
      { label: "Des sanctions administratives, jusqu'au retrait de sa carte", isCorrect: true },
      { label: "5 ans d'emprisonnement et 375 000 € d'amende", isCorrect: false },
      { label: "Rien, tant qu'il n'a pas blanchi lui-même des fonds", isCorrect: false },
      { label: "Un simple avertissement oral de la CCI", isCorrect: false },
    ],
    explanation: "Les manquements aux obligations de vigilance sont sanctionnés par la Commission nationale des sanctions (avertissement, blâme, interdiction d'exercer, retrait de carte, amende jusqu'à 5 M€). Les peines de 5 ans et 375 000 € punissent le blanchiment lui-même (art. 324-1 du Code pénal).",
    difficulty: "medium",
  },
  {
    id: "qc-jur-trac-02",
    moduleSlug: "juridique",
    lessonSlug: "tracfin",
    question: "Par quel canal l'agent déclare-t-il un soupçon à TRACFIN ?",
    options: [
      { label: "La plateforme sécurisée ERMES", isCorrect: true },
      { label: "Un courriel à la préfecture", isCorrect: false },
      { label: "Une plainte au commissariat", isCorrect: false },
      { label: "Une mention dans le compromis", isCorrect: false },
    ],
    explanation: "La déclaration de soupçon se fait en ligne, par le déclarant désigné de l'agence, sur la plateforme sécurisée ERMES de TRACFIN. Elle est confidentielle : ni le client ni les tiers ne doivent en être informés.",
    difficulty: "easy",
  },
  {
    id: "qc-jur-trac-03",
    moduleSlug: "juridique",
    lessonSlug: "tracfin",
    question: "En quoi le financement du terrorisme se distingue-t-il du blanchiment ?",
    options: [
      { label: "Les fonds peuvent être licites mais servir un but illicite", isCorrect: true },
      { label: "Les fonds sont toujours issus d'une activité criminelle", isCorrect: false },
      { label: "Il ne fait l'objet d'aucune sanction pénale spécifique", isCorrect: false },
      { label: "Il ne concerne jamais les transactions immobilières", isCorrect: false },
    ],
    explanation: "Le blanchiment dissimule l'origine illicite de fonds. Le financement du terrorisme peut au contraire utiliser des fonds d'origine parfaitement légale, destinés à financer des actes terroristes. Les deux relèvent de la même vigilance LCB-FT.",
    difficulty: "hard",
  },

  // ── juridique / non-discrimination ─────────────────────
  {
    id: "qc-jur-disc-01",
    moduleSlug: "deontologie",
    lessonSlug: "non-discrimination",
    question: "Quel article du Code pénal énumère les critères de discrimination interdits ?",
    options: [
      { label: "Article 225-1", isCorrect: true },
      { label: "Article 324-1", isCorrect: false },
      { label: "Article 1589", isCorrect: false },
      { label: "Article 1112-1", isCorrect: false },
    ],
    explanation: "L'article 225-1 du Code pénal énumère les critères prohibés : origine, sexe, situation de famille, apparence physique, situation économique vulnérable, patronyme, lieu de résidence, santé, handicap, âge, orientation sexuelle, religion… L'article 324-1 définit le blanchiment.",
    difficulty: "easy",
  },
  {
    id: "qc-jur-disc-02",
    moduleSlug: "deontologie",
    lessonSlug: "non-discrimination",
    question: "Une agence écarte tout candidat dont les ressources incluent une aide au logement (APL). Qu'en dites-vous ?",
    options: [
      { label: "C'est une discrimination liée à la situation économique", isCorrect: true },
      { label: "C'est légal : l'APL ne compte pas dans les ressources", isCorrect: false },
      { label: "C'est une discrimination, mais seulement en zone tendue", isCorrect: false },
      { label: "C'est légal, dès lors que le bailleur l'a demandé", isCorrect: false },
    ],
    explanation: "La « particulière vulnérabilité résultant de la situation économique » est un critère de l'article 225-1 du Code pénal. L'aide au logement fait partie des ressources du candidat et doit être prise en compte dans l'appréciation de sa solvabilité.",
    difficulty: "hard",
  },
  {
    id: "qc-jur-disc-03",
    moduleSlug: "deontologie",
    lessonSlug: "non-discrimination",
    question: "Un propriétaire vous demande : « Pas de familles nombreuses. » Comment réagissez-vous ?",
    options: [
      { label: "Vous rappelez l'interdiction et refusez la consigne", isCorrect: true },
      { label: "Vous l'appliquez en sélectionnant discrètement", isCorrect: false },
      { label: "Vous exigez une caution plus élevée des familles", isCorrect: false },
      { label: "Vous transmettez sa demande au Défenseur des droits", isCorrect: false },
    ],
    explanation: "La situation de famille est un critère de discrimination interdit. L'agent rappelle la loi, refuse d'appliquer la consigne et, si le propriétaire persiste, renonce au mandat. Exécuter la demande l'exposerait personnellement à des poursuites pénales.",
    difficulty: "medium",
  },

  // ── juridique / baux-habitation ────────────────────────
  {
    id: "qc-jur-baux-01",
    moduleSlug: "juridique",
    lessonSlug: "baux-habitation",
    question: "Quelle est la durée minimale d'un bail vide lorsque le bailleur est une personne physique ?",
    options: [
      { label: "3 ans", isCorrect: true },
      { label: "1 an", isCorrect: false },
      { label: "6 ans", isCorrect: false },
      { label: "9 ans", isCorrect: false },
    ],
    explanation: "Loi du 6 juillet 1989 : 3 ans pour un bail vide consenti par une personne physique (ou une SCI familiale), 6 ans pour une personne morale. Le bail meublé dure 1 an (9 mois pour un étudiant).",
    difficulty: "easy",
  },
  {
    id: "qc-jur-baux-02",
    moduleSlug: "juridique",
    lessonSlug: "baux-habitation",
    question: "Octobre 2026. Un bailleur veut relouer un appartement classé F. Que lui dit l'agent ?",
    options: [
      { label: "Il peut le relouer, sans hausse de loyer, jusqu'au 1er janvier 2028", isCorrect: true },
      { label: "Il ne peut plus le louer : les logements F sont non décents depuis 2025", isCorrect: false },
      { label: "Il ne peut plus le louer en zone tendue, mais reste libre de le faire ailleurs", isCorrect: false },
      { label: "Il peut le relouer et réviser le loyer selon l'IRL jusqu'à l'échéance de 2034", isCorrect: false },
    ],
    explanation: "Calendrier de la décence énergétique (métropole, loi Climat et Résilience) : G non décent depuis le 1er janvier 2025, F au 1er janvier 2028, E au 1er janvier 2034, partout en France. Depuis le 24 août 2022, les loyers des logements F et G sont gelés : ni hausse à la relocation, ni révision annuelle.",
    difficulty: "medium",
  },
  {
    id: "qc-jur-baux-03",
    moduleSlug: "juridique",
    lessonSlug: "baux-habitation",
    question: "Quel préavis doit respecter le locataire d'un logement meublé ?",
    options: [
      { label: "1 mois", isCorrect: true },
      { label: "3 mois", isCorrect: false },
      { label: "6 mois", isCorrect: false },
      { label: "15 jours", isCorrect: false },
    ],
    explanation: "En meublé, le préavis du locataire est d'un mois. En location vide, il est de trois mois, réduit à un mois notamment en zone tendue, en cas de mutation, de perte d'emploi ou pour raison de santé.",
    difficulty: "easy",
  },

  // ── transaction / offre-achat-avant-contrats ──────────
  {
    id: "qc-tra-offr-01",
    moduleSlug: "transaction",
    lessonSlug: "offre-achat-avant-contrats",
    question: "Quelle durée de validité fixe-t-on en général dans une offre d'achat ?",
    options: [
      { label: "5 à 10 jours", isCorrect: true },
      { label: "24 heures", isCorrect: false },
      { label: "2 mois", isCorrect: false },
      { label: "Aucune durée", isCorrect: false },
    ],
    explanation: "Une offre d'achat fixe une durée de validité précise, généralement de 5 à 10 jours. Sans délai, elle reste révocable tant qu'elle n'a pas été acceptée, et le vendeur peut laisser l'acquéreur dans l'incertitude.",
    difficulty: "easy",
  },
  {
    id: "qc-tra-offr-02",
    moduleSlug: "transaction",
    lessonSlug: "offre-achat-avant-contrats",
    question: "Dans une promesse unilatérale de vente, qui est engagé ?",
    options: [
      { label: "Seul le vendeur", isCorrect: true },
      { label: "Les deux parties", isCorrect: false },
      { label: "Seul l'acquéreur", isCorrect: false },
      { label: "Aucune des parties", isCorrect: false },
    ],
    explanation: "Dans la promesse unilatérale, seul le vendeur (promettant) s'engage à vendre. L'acquéreur (bénéficiaire) dispose d'une option qu'il lève ou non, en général contre une indemnité d'immobilisation. Le compromis, lui, engage les deux parties.",
    difficulty: "medium",
  },
  {
    id: "qc-tra-offr-03",
    moduleSlug: "transaction",
    lessonSlug: "offre-achat-avant-contrats",
    question: "Une promesse unilatérale de vente est signée sous seing privé. Dans quel délai doit-elle être enregistrée ?",
    options: [
      { label: "10 jours, sinon elle est nulle", isCorrect: true },
      { label: "1 mois, sinon une amende est due", isCorrect: false },
      { label: "Aucun délai : c'est facultatif", isCorrect: false },
      { label: "Avant l'acte, chez le notaire", isCorrect: false },
    ],
    explanation: "Article 1589-2 du Code civil : la promesse unilatérale de vente sous seing privé doit être enregistrée dans les 10 jours de son acceptation par le bénéficiaire, à peine de nullité. Ce n'est pas le cas du compromis.",
    difficulty: "medium",
  },

  // ── transaction / acte-authentique ─────────────────────
  {
    id: "qc-tra-acte-01",
    moduleSlug: "transaction",
    lessonSlug: "acte-authentique",
    question: "Pour une vente, combien de temps les diagnostics électricité et gaz sont-ils valables ?",
    options: [
      { label: "3 ans", isCorrect: true },
      { label: "1 an", isCorrect: false },
      { label: "6 ans", isCorrect: false },
      { label: "10 ans", isCorrect: false },
    ],
    explanation: "Pour une vente, les diagnostics électricité et gaz (installations de plus de 15 ans) sont valables 3 ans (6 ans pour une location). Le DPE est valable 10 ans, l'état des risques 6 mois.",
    difficulty: "easy",
  },
  {
    id: "qc-tra-acte-02",
    moduleSlug: "transaction",
    lessonSlug: "acte-authentique",
    question: "Qui établit l'état daté remis au notaire lors de la vente d'un lot de copropriété ?",
    options: [
      { label: "Le syndic de copropriété", isCorrect: true },
      { label: "Le notaire de l'acquéreur", isCorrect: false },
      { label: "L'agent immobilier", isCorrect: false },
      { label: "Le vendeur lui-même", isCorrect: false },
    ],
    explanation: "L'état daté est établi par le syndic : il récapitule les sommes dues par le vendeur et celles qui seront dues par l'acquéreur (charges, travaux votés, avances). Ses honoraires sont plafonnés à 380 € TTC.",
    difficulty: "easy",
  },
  {
    id: "qc-tra-acte-03",
    moduleSlug: "transaction",
    lessonSlug: "acte-authentique",
    question: "Le vendeur ne peut pas libérer le bien le jour de l'acte. Que proposez-vous ?",
    options: [
      { label: "Une convention d'occupation temporaire", isCorrect: true },
      { label: "L'annulation pure et simple de la vente", isCorrect: false },
      { label: "Un report du compromis sans date limite", isCorrect: false },
      { label: "Une baisse du prix, sans autre formalité", isCorrect: false },
    ],
    explanation: "Une convention d'occupation temporaire, signée avec l'acte, encadre le départ tardif : durée, indemnité d'occupation, date limite de libération, éventuelle somme séquestrée en garantie.",
    difficulty: "medium",
  },

  // ── financement / defiscalisation ──────────────────────
  {
    id: "qc-fin-defis-01",
    moduleSlug: "financement",
    lessonSlug: "fiscalite-avancee",
    question: "Quel dispositif de défiscalisation a pris fin le 31 décembre 2024 ?",
    options: [
      { label: "Denormandie", isCorrect: false },
      { label: "Malraux", isCorrect: false },
      { label: "Pinel", isCorrect: true },
      { label: "Loc'Avantages", isCorrect: false },
    ],
    explanation: "Le dispositif Pinel, qui a connu plusieurs prolongations, a définitivement pris fin le 31 décembre 2024. Les investisseurs doivent désormais se tourner vers Denormandie, Loc'Avantages ou Malraux.",
    difficulty: "easy",
  },
  {
    id: "qc-fin-defis-02",
    moduleSlug: "financement",
    lessonSlug: "fiscalite-avancee",
    question: "Le dispositif Denormandie vise principalement :",
    options: [
      { label: "La construction de logements neufs", isCorrect: false },
      { label: "La rénovation de logements anciens", isCorrect: true },
      { label: "L'achat de résidences de services", isCorrect: false },
      { label: "L'acquisition de terrains à bâtir", isCorrect: false },
    ],
    explanation: "Denormandie offre une réduction d'impôt pour l'achat et la rénovation de logements anciens dans des communes éligibles. Les travaux doivent représenter au moins 25 % du coût total.",
    difficulty: "medium",
  },
  {
    id: "qc-fin-defis-03",
    moduleSlug: "financement",
    lessonSlug: "fiscalite-avancee",
    question: "Face à un client souhaitant optimiser massivement sa fiscalité immobilière, vers qui l'orienter ?",
    options: [
      { label: "Un notaire", isCorrect: false },
      { label: "Un conseiller en gestion de patrimoine", isCorrect: true },
      { label: "Un agent immobilier généraliste", isCorrect: false },
      { label: "Un comptable", isCorrect: false },
    ],
    explanation: "L'agent immobilier peut présenter les grands dispositifs, mais l'optimisation fiscale personnalisée relève du conseiller en gestion de patrimoine (CGP). L'agent gagne en crédibilité en sachant orienter vers le bon expert.",
    difficulty: "easy",
  },

  // ── marketing / video-visite-virtuelle ────────────────
  {
    id: "qc-mkt-vid-01",
    moduleSlug: "marketing",
    lessonSlug: "video-visite-virtuelle",
    question: "Quel est le principal intérêt d'une vidéo de visite dans une annonce ?",
    options: [
      { label: "Faire comprendre les volumes et l'enchaînement des pièces", isCorrect: true },
      { label: "Remplacer les diagnostics obligatoires du dossier de vente", isCorrect: false },
      { label: "Dispenser l'agence d'organiser des visites sur place", isCorrect: false },
      { label: "Justifier à elle seule un prix supérieur à celui du marché", isCorrect: false },
    ],
    explanation: "La vidéo montre ce que les photos rendent mal : volumes, circulation, luminosité, enchaînement des pièces. Les acquéreurs qui se déplacent sont mieux informés. Elle ne remplace ni les diagnostics ni la visite physique.",
    difficulty: "easy",
  },
  {
    id: "qc-mkt-vid-02",
    moduleSlug: "marketing",
    lessonSlug: "video-visite-virtuelle",
    question: "Quel équipement minimum pour filmer une visite de qualité avec un smartphone ?",
    options: [
      { label: "Un stabilisateur et un micro-cravate", isCorrect: true },
      { label: "Un drone et un projecteur de studio", isCorrect: false },
      { label: "Une caméra 360° professionnelle", isCorrect: false },
      { label: "Un trépied et une télécommande", isCorrect: false },
    ],
    explanation: "Le stabilisateur (gimbal) supprime les tremblements pendant les déplacements, et le micro-cravate rend la voix nette. Pour un budget modeste, c'est l'équipement qui change le plus le rendu.",
    difficulty: "easy",
  },
  {
    id: "qc-mkt-vid-03",
    moduleSlug: "marketing",
    lessonSlug: "video-visite-virtuelle",
    question: "Quel format vidéo est conçu pour les Reels, TikTok et Shorts ?",
    options: [
      { label: "Une vidéo verticale de 30 à 60 secondes", isCorrect: true },
      { label: "Une visite guidée de deux à quatre minutes", isCorrect: false },
      { label: "Une visite virtuelle à 360 degrés", isCorrect: false },
      { label: "Un documentaire de dix minutes sur le bien", isCorrect: false },
    ],
    explanation: "La vidéo courte et verticale (30 à 60 secondes) est le format natif de ces plateformes : trois atouts du bien, un rythme rapide, des sous-titres pour une lecture sans le son.",
    difficulty: "easy",
  },

  // ── marketing / personal-branding ──────────────────────
  {
    id: "qc-mkt-brand-01",
    moduleSlug: "marketing",
    lessonSlug: "personal-branding",
    question: "Un vendeur cherche votre nom sur Google avant de vous appeler. Que doit-il trouver en premier ?",
    options: [
      { label: "Une fiche à jour avec des avis récents et des réponses", isCorrect: true },
      { label: "Uniquement la liste de vos biens actuellement en vente", isCorrect: false },
      { label: "Rien : une présence discrète inspire davantage confiance", isCorrect: false },
      { label: "Vos profils personnels, sans lien avec votre métier", isCorrect: false },
    ],
    explanation: "La première impression en ligne se joue sur votre fiche Google, vos avis et vos réponses, votre site et vos réseaux professionnels. Des avis récents, avec des réponses soignées, rassurent bien plus qu'une simple liste de biens.",
    difficulty: "easy",
  },
  {
    id: "qc-mkt-brand-02",
    moduleSlug: "marketing",
    lessonSlug: "personal-branding",
    question: "Un client satisfait propose de laisser un avis. Comment l'y aider dans les règles ?",
    options: [
      { label: "Lui envoyer le lien de votre fiche, sans rien en échange", isCorrect: true },
      { label: "Lui offrir un bon d'achat en échange de 5 étoiles", isCorrect: false },
      { label: "Rédiger l'avis à sa place et le publier pour lui", isCorrect: false },
      { label: "Lui demander de ne parler que de vos honoraires", isCorrect: false },
    ],
    explanation: "On peut solliciter un avis, mais sans contrepartie ni exigence de note. Rémunérer un avis positif ou le rédiger soi-même est une pratique commerciale trompeuse, et Google peut supprimer les avis ou suspendre la fiche.",
    difficulty: "easy",
  },
  {
    id: "qc-mkt-brand-03",
    moduleSlug: "marketing",
    lessonSlug: "personal-branding",
    question: "Un client publie un avis Google négatif. Quelle est la bonne réponse ?",
    options: [
      { label: "Répondre calmement et proposer d'en parler en privé", isCorrect: true },
      { label: "L'ignorer, pour ne pas lui donner de visibilité", isCorrect: false },
      { label: "Se défendre point par point, publiquement", isCorrect: false },
      { label: "Demander à Google de le supprimer d'office", isCorrect: false },
    ],
    explanation: "Une réponse professionnelle montre aux futurs clients votre capacité à gérer un désaccord : remercier, reconnaître le ressenti, proposer un échange en privé. Google ne supprime un avis que s'il enfreint ses règles (insulte, faux avis…).",
    difficulty: "easy",
  },

  // ── terrain / r0-r1-r2 ─────────────────────────────────
  {
    id: "qc-ter-r0r1r2-01",
    moduleSlug: "terrain",
    lessonSlug: "prise-de-mandat-decouverte-client",
    question: "Un vendeur a demandé à être rappelé. Quel est l'objectif de ce premier appel (R0) ?",
    options: [
      { label: "Le qualifier et créer un lien de confiance", isCorrect: true },
      { label: "Lui vendre vos services en quelques minutes", isCorrect: false },
      { label: "Lui annoncer tout de suite un prix d'estimation", isCorrect: false },
      { label: "Obtenir un rendez-vous, quel qu'en soit le prix", isCorrect: false },
    ],
    explanation: "Le R0 est un appel de qualification : motivation, délai, agences déjà consultées, idée du prix, projet après la vente. Il permet de décider si un rendez-vous est utile, et de le préparer.",
    difficulty: "easy",
  },
  {
    id: "qc-ter-r0r1r2-02",
    moduleSlug: "terrain",
    lessonSlug: "prise-de-mandat-decouverte-client",
    question: "Au R1 (visite du bien), le vendeur insiste pour connaître votre prix. Que répondez-vous ?",
    options: [
      { label: "Vous le donnerez au R2, après analyse du marché", isCorrect: true },
      { label: "Vous lui donnez un prix tout de suite, pour le rassurer", isCorrect: false },
      { label: "Vous annoncez le prix le plus haut, pour avoir le mandat", isCorrect: false },
      { label: "Vous lui conseillez un estimateur en ligne en attendant", isCorrect: false },
    ],
    explanation: "Le R1 sert à comprendre le bien et le propriétaire. Formule type : « Je préfère vous donner une estimation précise et argumentée, après analyse des ventes comparables, lors de notre prochain rendez-vous. » Un prix lancé à chaud, surtout surévalué, se paie ensuite.",
    difficulty: "medium",
  },
  {
    id: "qc-ter-r0r1r2-03",
    moduleSlug: "terrain",
    lessonSlug: "prise-de-mandat-decouverte-client",
    question: "À quoi sert la méthode SONCAS ?",
    options: [
      { label: "Profiler le client pour adapter son argumentaire", isCorrect: true },
      { label: "Calculer le rendement locatif d'un bien à louer", isCorrect: false },
      { label: "Mesurer la surface habitable d'un logement", isCorrect: false },
      { label: "Rédiger une annonce conforme à la loi ALUR", isCorrect: false },
    ],
    explanation: "SONCAS (Sécurité, Orgueil, Nouveauté, Confort, Argent, Sympathie) aide à identifier les motivations dominantes d'un client pour adapter les arguments mis en avant lors de la prise de mandat ou de la visite.",
    difficulty: "medium",
  },

  // ── terrain / decouverte-client ────────────────────────
  {
    id: "qc-ter-deco-01",
    moduleSlug: "terrain",
    lessonSlug: "prise-de-mandat-decouverte-client",
    question: "Un acquéreur cherche « un 3 pièces avec balcon ». Pourquoi creuser au-delà de ces critères ?",
    options: [
      { label: "Ses vrais besoins peuvent mener à un autre bien", isCorrect: true },
      { label: "Pour lui vendre un bien plus cher que prévu", isCorrect: false },
      { label: "Pour vérifier qu'il ne ment pas sur son budget", isCorrect: false },
      { label: "C'est inutile : ses critères suffisent à cibler", isCorrect: false },
    ],
    explanation: "Les critères exprimés (surface, balcon) traduisent des besoins plus profonds (espace pour télétravailler, extérieur pour les enfants). Les découvrir permet de proposer des biens que l'acquéreur n'aurait pas filtrés lui-même, mais qui lui conviennent mieux.",
    difficulty: "easy",
  },
  {
    id: "qc-ter-deco-02",
    moduleSlug: "terrain",
    lessonSlug: "prise-de-mandat-decouverte-client",
    question: "Quelle question révèle le critère non négociable d'un acquéreur ?",
    options: [
      { label: "« S'il ne fallait garder qu'un critère, lequel ? »", isCorrect: true },
      { label: "« Quel est votre budget maximum, au plus juste ? »", isCorrect: false },
      { label: "« Avez-vous déjà visité d'autres biens ailleurs ? »", isCorrect: false },
      { label: "« À quelle date souhaitez-vous emménager ? »", isCorrect: false },
    ],
    explanation: "La question du critère unique fait apparaître le « deal-breaker » : l'information la plus utile pour cibler les biens et éviter des visites inutiles. Budget, visites et délai sont utiles, mais ne hiérarchisent pas les critères.",
    difficulty: "easy",
  },
  {
    id: "qc-ter-deco-03",
    moduleSlug: "terrain",
    lessonSlug: "prise-de-mandat-decouverte-client",
    question: "Après une visite, comment suivre un acquéreur sans le harceler ?",
    options: [
      { label: "Des contacts planifiés et utiles : J+1, J+7, J+30", isCorrect: true },
      { label: "Un appel chaque jour jusqu'à ce qu'il fasse une offre", isCorrect: false },
      { label: "Aucun contact : c'est à lui de revenir vers vous", isCorrect: false },
      { label: "Un seul e-mail, puis plus rien s'il ne répond pas", isCorrect: false },
    ],
    explanation: "Un suivi planifié, avec à chaque fois une information utile (nouveau bien, retour du vendeur, évolution du marché), maintient la relation sans pression. S'il demande à ne plus être contacté, on le note et on s'arrête.",
    difficulty: "easy",
  },

  // ── Renforcement leçons faibles ───────────────────────
  // juridique / parcours-interactif
  {
    id: "qc-jur-parc-01",
    moduleSlug: "juridique",
    lessonSlug: "parcours-interactif",
    question: "Avant de publier une annonce, quelle vérification passe en premier ?",
    options: [
      { label: "La conformité des honoraires et des mentions obligatoires", isCorrect: true },
      { label: "La qualité des photos et la mise en scène du séjour", isCorrect: false },
      { label: "Le budget publicitaire négocié avec les portails", isCorrect: false },
      { label: "Le nombre de portails sur lesquels publier l'annonce", isCorrect: false },
    ],
    explanation: "Avant toute diffusion : qui paie les honoraires et leur affichage (prix honoraires inclus, hors honoraires, taux), classes énergie et climat, mentions obligatoires. Une annonce non conforme expose l'agence à une amende administrative, quelle que soit la qualité des photos.",
    difficulty: "easy",
  },
  {
    id: "qc-jur-parc-02",
    moduleSlug: "juridique",
    lessonSlug: "parcours-interactif",
    question: "Un vendeur refuse que les honoraires apparaissent sur l'annonce. Que fait l'agent ?",
    options: [
      { label: "Il explique l'obligation et ne diffuse pas sans elle", isCorrect: true },
      { label: "Il accepte, pour ne pas perdre le mandat de vente", isCorrect: false },
      { label: "Il ne les affiche que sur le site de son agence", isCorrect: false },
      { label: "Il ne les mentionne qu'oralement, lors des visites", isCorrect: false },
    ],
    explanation: "L'information sur les honoraires est obligatoire sur chaque annonce, quel que soit le support (arrêté du 10 janvier 2017). L'agent explique la règle au vendeur et refuse de diffuser une annonce non conforme : c'est sa responsabilité qui est engagée.",
    difficulty: "easy",
  },

  // financement / assurances
  {
    id: "qc-fin-ass-03",
    moduleSlug: "financement",
    lessonSlug: "assurances",
    question: "Quelle garantie d'assurance emprunteur couvre l'incapacité temporaire de travail ?",
    options: [
      { label: "La garantie décès", isCorrect: false },
      { label: "La garantie PTIA (Perte Totale et Irréversible d'Autonomie)", isCorrect: false },
      { label: "La garantie ITT (Incapacité Temporaire de Travail)", isCorrect: true },
      { label: "La garantie chômage uniquement", isCorrect: false },
    ],
    explanation: "L'ITT (Incapacité Temporaire de Travail) est la garantie qui prend le relais sur les remboursements de prêt lorsque l'emprunteur est temporairement incapable de travailler à la suite d'un accident ou d'une maladie.",
    difficulty: "medium",
  },

  // ──────────────────────────────────────────────
  // MODULE 6 — DÉONTOLOGIE & ÉTHIQUE PROFESSIONNELLE
  // ──────────────────────────────────────────────

  // deontologie / non-discrimination
  {
    id: "qc-deo-discr-01",
    moduleSlug: "deontologie",
    lessonSlug: "non-discrimination",
    question: "Que risque un agent qui applique l'instruction discriminatoire d'un propriétaire bailleur ?",
    options: [
      { label: "Des poursuites pénales, comme le bailleur", isCorrect: true },
      { label: "Rien : seul le propriétaire est responsable", isCorrect: false },
      { label: "Un simple rappel à la loi, sans sanction", isCorrect: false },
      { label: "Une amende civile payée par l'agence seule", isCorrect: false },
    ],
    explanation: "Refuser un logement pour un motif discriminatoire est un délit pour celui qui donne l'instruction et pour celui qui l'exécute (art. 225-2 du Code pénal : 3 ans et 45 000 €). L'agent ne peut pas s'abriter derrière la demande du propriétaire.",
    difficulty: "medium",
  },
  {
    id: "qc-deo-discr-02",
    moduleSlug: "deontologie",
    lessonSlug: "non-discrimination",
    question: "Exiger systématiquement un CDI, alors que des candidats en CDD ou indépendants offrent des garanties équivalentes, constitue :",
    options: [
      { label: "Une discrimination indirecte", isCorrect: true },
      { label: "Une discrimination directe", isCorrect: false },
      { label: "Une pratique commerciale trompeuse", isCorrect: false },
      { label: "Une exigence légale de solvabilité", isCorrect: false },
    ],
    explanation: "La discrimination indirecte applique une règle en apparence neutre qui désavantage de façon disproportionnée certains candidats, sans justification objective. La solvabilité s'apprécie sur les ressources réelles et les garanties, pas sur le type de contrat.",
    difficulty: "medium",
  },
  {
    id: "qc-deo-discr-03",
    moduleSlug: "deontologie",
    lessonSlug: "non-discrimination",
    question: "Devant le juge civil, un candidat apporte des faits laissant présumer une discrimination. Qui doit alors prouver quoi ?",
    options: [
      { label: "L'agence doit prouver un motif objectif", isCorrect: true },
      { label: "Le candidat doit tout prouver, seul", isCorrect: false },
      { label: "Le Défenseur des droits doit enquêter", isCorrect: false },
      { label: "Personne : la plainte est classée", isCorrect: false },
    ],
    explanation: "C'est l'aménagement de la charge de la preuve (loi du 27 mai 2008, art. 4) : une fois présentés des faits laissant présumer la discrimination (un testing, par exemple), c'est à l'agence de démontrer que sa décision repose sur des éléments objectifs étrangers à toute discrimination.",
    difficulty: "hard",
  },

  // deontologie / non-discrimination-pratique
  {
    id: "qc-deo-pratique-01",
    moduleSlug: "deontologie",
    lessonSlug: "non-discrimination-pratique",
    question: "Le testing réalisé par une association est :",
    options: [
      { label: "Une preuve admise par la loi pénale", isCorrect: true },
      { label: "Un piège illégal, donc irrecevable", isCorrect: false },
      { label: "Un procédé réservé à la police", isCorrect: false },
      { label: "Une preuve valable au civil seulement", isCorrect: false },
    ],
    explanation: "Article 225-3-1 du Code pénal (loi du 31 mars 2006) : la discrimination est constituée même si elle vise des personnes qui ont sollicité le bien pour démontrer le comportement discriminatoire. Le testing est donc une preuve recevable.",
    difficulty: "easy",
  },
  {
    id: "qc-deo-pratique-02",
    moduleSlug: "deontologie",
    lessonSlug: "non-discrimination-pratique",
    question: "Parmi ces documents, lequel un agent ne peut pas demander à un candidat locataire ?",
    options: [
      { label: "Une photo d'identité", isCorrect: true },
      { label: "Son dernier avis d'imposition", isCorrect: false },
      { label: "Son contrat de travail", isCorrect: false },
      { label: "Ses trois derniers bulletins de salaire", isCorrect: false },
    ],
    explanation: "Le décret n° 2015-1437 fixe la liste limitative des pièces exigibles. La photographie d'identité est interdite (hors celle figurant sur la pièce d'identité), tout comme les relevés de compte ou l'attestation de bonne tenue de compte.",
    difficulty: "easy",
  },
  {
    id: "qc-deo-pratique-03",
    moduleSlug: "deontologie",
    lessonSlug: "non-discrimination-pratique",
    question: "Un propriétaire insiste pour exclure les candidats d'une origine donnée, malgré votre refus. Que faites-vous ?",
    options: [
      { label: "Vous refusez le mandat plutôt que d'exécuter la consigne", isCorrect: true },
      { label: "Vous appliquez sa demande discrètement, pour garder le mandat", isCorrect: false },
      { label: "Vous transmettez le dossier à un confrère, sans rien expliquer", isCorrect: false },
      { label: "Vous acceptez, en notant sa demande dans un e-mail interne", isCorrect: false },
    ],
    explanation: "Exécuter la consigne ferait de l'agent l'auteur d'une discrimination (art. 225-2 du Code pénal). Le code de déontologie impose de respecter la loi (art. 3) : l'agent rappelle la règle au propriétaire et, s'il persiste, refuse le mandat.",
    difficulty: "medium",
  },

  // deontologie / code-deontologie
  {
    id: "qc-deo-code-01",
    moduleSlug: "deontologie",
    lessonSlug: "code-deontologie",
    question: "À qui s'applique le code de déontologie des professionnels de l'immobilier ?",
    options: [
      { label: "Au titulaire de la carte, à ses dirigeants et collaborateurs", isCorrect: true },
      { label: "Au seul titulaire de la carte professionnelle, en personne", isCorrect: false },
      { label: "Aux seuls syndics de copropriété et gestionnaires locatifs", isCorrect: false },
      { label: "Aux seuls réseaux nationaux, pas aux agences indépendantes", isCorrect: false },
    ],
    explanation: "Le décret n° 2015-1090 s'impose aux titulaires de la carte professionnelle, à leurs représentants légaux et statutaires, ainsi qu'aux collaborateurs habilités, salariés ou agents commerciaux, quelle que soit la taille de l'agence.",
    difficulty: "medium",
  },
  {
    id: "qc-deo-code-02",
    moduleSlug: "deontologie",
    lessonSlug: "code-deontologie",
    question: "Un agent est sanctionné disciplinairement pour un manquement. Peut-il aussi être condamné pénalement pour les mêmes faits ?",
    options: [
      { label: "Oui : les responsabilités se cumulent", isCorrect: true },
      { label: "Non : une seule sanction par fait", isCorrect: false },
      { label: "Seulement à la demande du préfet", isCorrect: false },
      { label: "Non : le disciplinaire éteint le pénal", isCorrect: false },
    ],
    explanation: "Les responsabilités disciplinaire, civile et pénale sont indépendantes : un même manquement peut entraîner une sanction professionnelle, des dommages-intérêts et une condamnation pénale.",
    difficulty: "hard",
  },
  {
    id: "qc-deo-code-03",
    moduleSlug: "deontologie",
    lessonSlug: "code-deontologie",
    question: "Vous percevez, sans le dire à vos clients, une commission du courtier vers lequel vous les orientez. Quelle règle du code de déontologie violez-vous ?",
    options: [
      { label: "La prévention des conflits d'intérêts", isCorrect: true },
      { label: "La confraternité entre agents", isCorrect: false },
      { label: "La confidentialité des données", isCorrect: false },
      { label: "L'obligation de compétence", isCorrect: false },
    ],
    explanation: "Art. 9 du code de déontologie : l'agent informe ses clients des liens qu'il entretient avec les entreprises dont il recommande les services, et de toute rémunération directe ou indirecte qu'il en tire. Une commission cachée est un conflit d'intérêts non déclaré.",
    difficulty: "medium",
  },

  // deontologie / ethique-pratique
  {
    id: "qc-deo-ethique-01",
    moduleSlug: "deontologie",
    lessonSlug: "ethique-pratique",
    question: "Vous détenez le mandat du vendeur et l'acquéreur vous confie un mandat de recherche pour ce même bien. Que faites-vous d'abord ?",
    options: [
      { label: "Vous informez chaque partie de cette situation", isCorrect: true },
      { label: "Vous ne représentez que la partie la plus rentable", isCorrect: false },
      { label: "Vous attendez qu'une des parties vous interroge", isCorrect: false },
      { label: "Vous demandez l'autorisation de la CCI", isCorrect: false },
    ],
    explanation: "Art. 9 du code de déontologie : l'agent évite les conflits d'intérêts et informe les parties de leur existence. Il reste loyal envers chacune : il ne révèle pas à l'acquéreur le prix plancher du vendeur, ni au vendeur le budget maximal de l'acquéreur.",
    difficulty: "medium",
  },
  {
    id: "qc-deo-ethique-02",
    moduleSlug: "deontologie",
    lessonSlug: "ethique-pratique",
    question: "Selon le RGPD, combien de temps maximum un dossier de candidat locataire refusé peut-il être conservé ?",
    options: [
      { label: "3 mois", isCorrect: true },
      { label: "1 an", isCorrect: false },
      { label: "5 ans", isCorrect: false },
      { label: "10 ans", isCorrect: false },
    ],
    explanation: "Le référentiel de la CNIL sur la gestion locative retient trois mois pour les dossiers des candidats non retenus, puis suppression ou anonymisation. À comparer : 3 ans après le dernier contact pour un prospect, 5 ans pour les pièces d'identification LCB-FT, 10 ans pour les données comptables.",
    difficulty: "easy",
  },
  {
    id: "qc-deo-ethique-03",
    moduleSlug: "deontologie",
    lessonSlug: "ethique-pratique",
    question: "Un acquéreur vous propose 2 000 € « pour vous » si vous faites accepter son offre basse par votre vendeur. Que faites-vous ?",
    options: [
      { label: "Vous refusez : c'est de la corruption", isCorrect: true },
      { label: "Vous acceptez, si le vendeur l'ignore", isCorrect: false },
      { label: "Vous acceptez, puis prévenez le vendeur", isCorrect: false },
      { label: "Vous négociez plutôt 3 000 €", isCorrect: false },
    ],
    explanation: "Accepter un avantage pour manquer à ses obligations envers son mandant est une corruption passive privée (art. 445-2 du Code pénal : 5 ans et 500 000 €) et une violation du devoir de loyauté (art. 8 du code de déontologie). Le refus catégorique est la seule réponse.",
    difficulty: "medium",
  },

  // ──────────────────────────────────────────────
  // MODULE AUTONOME — TRACFIN & LCB-FT
  // ──────────────────────────────────────────────

  // tracfin / cadre-legal-obligations
  {
    id: "qc-tracfin-cadre-01",
    moduleSlug: "tracfin",
    lessonSlug: "cadre-legal-obligations",
    question: "Quel est le rôle de TRACFIN ?",
    options: [
      { label: "Recevoir et analyser les soupçons, puis saisir la justice", isCorrect: true },
      { label: "Poursuivre et juger lui-même les auteurs de blanchiment", isCorrect: false },
      { label: "Délivrer et retirer les cartes des agents immobiliers", isCorrect: false },
      { label: "Contrôler le prix de toutes les ventes immobilières", isCorrect: false },
    ],
    explanation: "TRACFIN est la cellule de renseignement financier française : elle reçoit les déclarations de soupçon des professionnels assujettis, les analyse et les enrichit, puis transmet à l'autorité judiciaire ou administrative. Elle ne juge ni ne poursuit elle-même.",
    difficulty: "easy",
  },
  {
    id: "qc-tracfin-cadre-02",
    moduleSlug: "tracfin",
    lessonSlug: "cadre-legal-obligations",
    question: "Dans l'immobilier, quelle autorité contrôle le respect des obligations anti-blanchiment ?",
    options: [
      { label: "La DGCCRF", isCorrect: true },
      { label: "L'ACPR", isCorrect: false },
      { label: "L'AMF", isCorrect: false },
      { label: "La CNIL", isCorrect: false },
    ],
    explanation: "Contrairement aux banques (ACPR) ou aux acteurs financiers (AMF), les professionnels de l'immobilier sont contrôlés par la DGCCRF. Les sanctions administratives sont prononcées par la Commission nationale des sanctions (CNS).",
    difficulty: "medium",
  },
  {
    id: "qc-tracfin-cadre-03",
    moduleSlug: "tracfin",
    lessonSlug: "cadre-legal-obligations",
    question: "Quelles sont les trois grandes obligations anti-blanchiment de l'agent immobilier ?",
    options: [
      { label: "Vigilance, approche par les risques, déclaration", isCorrect: true },
      { label: "Assurance, garantie financière, carte professionnelle", isCorrect: false },
      { label: "Estimation, publicité, rédaction du compromis", isCorrect: false },
      { label: "Formation, registre des mandats, affichage des prix", isCorrect: false },
    ],
    explanation: "Le dispositif repose sur trois piliers : la vigilance (identifier le client et le bénéficiaire effectif), l'approche par les risques (moduler cette vigilance) et la déclaration de soupçon à TRACFIN.",
    difficulty: "easy",
  },

  // tracfin / vigilance-detection
  {
    id: "qc-tracfin-vigilance-01",
    moduleSlug: "tracfin",
    lessonSlug: "vigilance-detection",
    question: "Une SCI achète un appartement. Qui est son « bénéficiaire effectif » ?",
    options: [
      { label: "La personne physique qui la contrôle réellement", isCorrect: true },
      { label: "Le gérant inscrit au registre, dans tous les cas", isCorrect: false },
      { label: "La banque qui finance l'achat de l'appartement", isCorrect: false },
      { label: "Le notaire qui rédige et reçoit l'acte de vente", isCorrect: false },
    ],
    explanation: "Le bénéficiaire effectif est la personne physique qui détient, directement ou non, plus de 25 % du capital ou des droits de vote, ou qui exerce un contrôle sur la société (art. R.561-1 CMF). L'identifier permet de percer les sociétés écrans et les prête-noms.",
    difficulty: "medium",
  },
  {
    id: "qc-tracfin-vigilance-02",
    moduleSlug: "tracfin",
    lessonSlug: "vigilance-detection",
    question: "Votre acquéreur est une « personne politiquement exposée » (PPE). Que devez-vous faire ?",
    options: [
      { label: "Renforcer la vigilance, surtout sur l'origine des fonds", isCorrect: true },
      { label: "Refuser la relation d'affaires, par simple précaution", isCorrect: false },
      { label: "Déclarer automatiquement l'opération à TRACFIN", isCorrect: false },
      { label: "Rien de particulier : son statut ne change rien", isCorrect: false },
    ],
    explanation: "Une PPE n'est pas suspecte par nature, mais son exposition justifie une vigilance renforcée (approche par les risques), en particulier sur l'origine des fonds et du patrimoine. Ce n'est ni un refus ni une déclaration automatiques.",
    difficulty: "medium",
  },
  {
    id: "qc-tracfin-vigilance-03",
    moduleSlug: "tracfin",
    lessonSlug: "vigilance-detection",
    question: "Parmi ces comportements, lequel est un signal d'alerte ?",
    options: [
      { label: "Proposer de régler une partie du prix en espèces", isCorrect: true },
      { label: "Visiter le bien deux fois, puis négocier le prix", isCorrect: false },
      { label: "Financer l'achat par un prêt bancaire justifié", isCorrect: false },
      { label: "Demander à lire tous les diagnostics techniques", isCorrect: false },
    ],
    explanation: "Le paiement partiel en espèces, l'incohérence entre profil et prix, l'absence de visite, les montages complexes ou l'urgence injustifiée sont des signaux d'alerte. C'est leur accumulation (faisceau d'indices) qui fonde le soupçon.",
    difficulty: "easy",
  },

  // tracfin / declaration-soupcon-pratique
  {
    id: "qc-tracfin-declaration-01",
    moduleSlug: "tracfin",
    lessonSlug: "declaration-soupcon-pratique",
    question: "Que faut-il pour déclarer un soupçon à TRACFIN ?",
    options: [
      { label: "Un soupçon fondé sur des faits", isCorrect: true },
      { label: "La preuve formelle du blanchiment", isCorrect: false },
      { label: "Une condamnation pénale du client", isCorrect: false },
      { label: "L'accord préalable de votre client", isCorrect: false },
    ],
    explanation: "La loi exige un soupçon motivé, pas une preuve. L'agent n'est ni enquêteur ni juge : attendre une certitude avant de déclarer serait une faute. Le soupçon s'appuie sur des faits (le faisceau d'indices).",
    difficulty: "easy",
  },
  {
    id: "qc-tracfin-declaration-02",
    moduleSlug: "tracfin",
    lessonSlug: "declaration-soupcon-pratique",
    question: "Vous avez déclaré un soupçon. Pouvez-vous en informer votre client ?",
    options: [
      { label: "Non : le révéler est un délit", isCorrect: true },
      { label: "Oui, par souci de transparence", isCorrect: false },
      { label: "Oui, s'il le demande par écrit", isCorrect: false },
      { label: "Oui, une fois la vente signée", isCorrect: false },
    ],
    explanation: "La déclaration est confidentielle (art. L.561-18 CMF). Révéler son existence au client, même à demi-mot, est un délit de divulgation (« tipping off ») qui compromettrait l'enquête. L'agent poursuit la relation normalement.",
    difficulty: "medium",
  },
  {
    id: "qc-tracfin-declaration-03",
    moduleSlug: "tracfin",
    lessonSlug: "declaration-soupcon-pratique",
    question: "Un client au profil cohérent visite, négocie et finance par un prêt bancaire justifié. Que faites-vous ?",
    options: [
      { label: "Rien : aucun signal d'alerte", isCorrect: true },
      { label: "Une déclaration, par précaution", isCorrect: false },
      { label: "Vous refusez la transaction", isCorrect: false },
      { label: "Vous alertez le notaire", isCorrect: false },
    ],
    explanation: "La vigilance n'est pas de la suspicion systématique. Sans faisceau d'indices, aucune déclaration n'est justifiée : déclarer sans motif factuel serait une erreur. La grande majorité des clients sont parfaitement honnêtes.",
    difficulty: "easy",
  },
];

/**
 * Ordre des réponses mélangé (graine = id), avec la bonne réponse répartie à
 * parts égales sur A/B/C/D au sein de chaque module.
 */
const ALL_QUIZ_CHECKPOINTS: QuizCheckpoint[] = (() => {
  const byModule = new Map<string, QuizCheckpoint[]>();
  for (const qc of RAW_QUIZ_CHECKPOINTS) {
    byModule.set(qc.moduleSlug, [...(byModule.get(qc.moduleSlug) ?? []), qc]);
  }
  const targets = new Map<string, number>();
  for (const [moduleSlug, list] of byModule) {
    const positions = balancedPositions(`qc:${moduleSlug}`, list.length);
    list.forEach((qc, i) => targets.set(qc.id, positions[i]));
  }
  return RAW_QUIZ_CHECKPOINTS.map((qc) => ({
    ...qc,
    options: placeAt(
      qc.id,
      qc.options,
      qc.options.findIndex((o) => o.isCorrect),
      targets.get(qc.id) ?? 0,
    ).items,
  }));
})();

export function getQuizCheckpoints(
  moduleSlug: string,
  lessonSlug: string,
): QuizCheckpoint[] {
  return ALL_QUIZ_CHECKPOINTS.filter(
    (qc) => qc.moduleSlug === moduleSlug && qc.lessonSlug === lessonSlug,
  );
}

export function getQuizCheckpointById(id: string): QuizCheckpoint | undefined {
  return ALL_QUIZ_CHECKPOINTS.find((qc) => qc.id === id);
}
