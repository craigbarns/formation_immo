/**
 * Test de positionnement — 15 questions couvrant les 5 modules.
 * Évalue le niveau initial : débutant / intermédiaire / avancé.
 */

import { balancedPositions, placeAt } from "@/lib/qcm-shuffle";

export type PlacementQuestion = {
  id: string;
  module: "juridique" | "transaction" | "financement" | "marketing" | "terrain";
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: "debutant" | "intermediaire" | "avance";
};

export type PlacementResult = {
  totalScore: number;
  totalQuestions: number;
  percentage: number;
  level: "debutant" | "intermediaire" | "avance";
  moduleScores: Record<string, { correct: number; total: number }>;
  weakModules: string[];
  strongModules: string[];
  recommendation: string;
};

const RAW_PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  // ── JURIDIQUE (3 questions) ──
  {
    id: "pj1",
    module: "juridique",
    question:
      "Une annonce affiche « 300 000 € FAI », honoraires à la charge de l'acquéreur. Est-elle conforme ?",
    options: [
      "Non : il manque le prix hors honoraires et le taux d'honoraires",
      "Oui : la mention FAI suffit à informer l'acquéreur du prix total",
      "Oui, dès lors que le barème d'honoraires est affiché en vitrine",
      "Non : les honoraires doivent toujours être payés par le vendeur",
    ],
    correctIndex: 0,
    explanation:
      "Arrêté du 10 janvier 2017 : quand l'acquéreur paie les honoraires, l'annonce affiche le prix honoraires inclus, le prix hors honoraires et le taux d'honoraires TTC calculé sur le prix hors honoraires. Les honoraires peuvent être à la charge du vendeur ou de l'acquéreur, selon le mandat.",
    difficulty: "debutant",
  },
  {
    id: "pj2",
    module: "juridique",
    question: "Dans une copropriété, comment se répartissent les charges d'entretien des parties communes ?",
    options: [
      "Selon les tantièmes de chaque lot, fixés par le règlement de copropriété",
      "Selon le nombre d'occupants de chaque logement, déclaré au syndic",
      "À parts égales entre copropriétaires, quelle que soit la taille du lot",
      "Selon une clé votée chaque année par l'assemblée générale à la majorité",
    ],
    correctIndex: 0,
    explanation:
      "Loi du 10 juillet 1965, art. 10 : les charges générales (conservation, entretien, administration des parties communes) sont réparties selon les tantièmes, c'est-à-dire la valeur relative de chaque lot, inscrits au règlement de copropriété.",
    difficulty: "intermediaire",
  },
  {
    id: "pj3",
    module: "juridique",
    question: "Octobre 2026. Un investisseur veut acheter un studio classé G pour le louer. Que lui dites-vous ?",
    options: [
      "Il ne pourra pas le louer en l'état : un logement G n'est plus décent",
      "Il pourra le louer jusqu'en 2028, date de l'interdiction des logements G",
      "Il pourra le louer en meublé : l'interdiction ne vise que la location vide",
      "Il pourra le louer, à condition de réaliser un audit avant de signer le bail",
    ],
    correctIndex: 0,
    explanation:
      "Loi Climat et Résilience : depuis le 1er janvier 2025, un logement classé G ne répond plus aux critères de décence et ne peut plus être proposé à la location, vide ou meublée. Les logements F suivront en 2028, les E en 2034. Il faudra prévoir des travaux avant toute mise en location.",
    difficulty: "avance",
  },

  // ── TRANSACTION (3 questions) ──
  {
    id: "pt1",
    module: "transaction",
    question: "Vendeur et acquéreur viennent de signer un compromis de vente. Qui est engagé ?",
    options: [
      "Les deux : le vendeur à vendre, l'acquéreur à acheter, sous conditions",
      "Le vendeur seul : l'acquéreur reste libre jusqu'à l'acte chez le notaire",
      "Personne : seul l'acte authentique signé chez le notaire engage les parties",
      "L'acquéreur seul, qui verse un dépôt de garantie en contrepartie",
    ],
    correctIndex: 0,
    explanation:
      "Le compromis est une promesse synallagmatique : il vaut vente dès l'accord sur la chose et le prix (art. 1589 C. civ.), sous réserve des conditions suspensives et du délai de rétractation de l'acquéreur. La promesse unilatérale, elle, n'engage que le vendeur.",
    difficulty: "debutant",
  },
  {
    id: "pt2",
    module: "transaction",
    question:
      "Le compromis est notifié à l'acquéreur par lettre recommandée, présentée le lundi 5 octobre. Quand expire son délai de rétractation ?",
    options: [
      "Le jeudi 15 octobre à minuit : 10 jours, à partir du lendemain",
      "Le mercredi 14 octobre : 10 jours, le jour de la présentation compris",
      "Le lundi 19 octobre : 10 jours ouvrés, samedis et dimanches exclus",
      "Jamais : il ne court qu'à partir de la signature chez le notaire",
    ],
    correctIndex: 0,
    explanation:
      "Article L.271-1 du CCH : 10 jours calendaires à compter du lendemain de la première présentation de la lettre, soit du mardi 6 au jeudi 15 octobre inclus. Si le dernier jour tombe un samedi, un dimanche ou un jour férié, le délai est prolongé jusqu'au premier jour ouvrable suivant.",
    difficulty: "intermediaire",
  },
  {
    id: "pt3",
    module: "transaction",
    question: "Un mandat de vente signé ne porte pas de numéro d'inscription au registre des mandats. Conséquence ?",
    options: [
      "Il est nul : l'agent ne pourra pas réclamer sa commission",
      "Il reste valable : le numéro peut être ajouté au compromis",
      "Il reste valable, mais l'agent encourt un avertissement de la CCI",
      "Il devient un mandat simple, même s'il était prévu en exclusivité",
    ],
    correctIndex: 0,
    explanation:
      "Décret n° 72-678, art. 72 : chaque mandat est inscrit au registre des mandats et son numéro est reporté sur l'exemplaire remis au mandant. La jurisprudence sanctionne son absence par la nullité du mandat : l'agent perd tout droit à commission.",
    difficulty: "avance",
  },

  // ── FINANCEMENT (3 questions) ──
  {
    id: "pf1",
    module: "financement",
    question: "Deux banques proposent le même taux nominal. Quel indicateur compare le coût réel des offres ?",
    options: [
      "Le TAEG, qui inclut intérêts, assurance, frais de dossier et garantie",
      "Le taux nominal, seul taux qui figure obligatoirement dans l'offre",
      "La mensualité, qui intègre automatiquement tous les frais du crédit",
      "Le taux d'usure, qui fixe le coût réel de chaque crédit accordé",
    ],
    correctIndex: 0,
    explanation:
      "Le TAEG (taux annuel effectif global) exprime le coût total du crédit : intérêts, assurance emprunteur exigée, frais de dossier, de garantie et de courtage. Le taux d'usure n'est qu'un plafond que le TAEG ne peut dépasser.",
    difficulty: "debutant",
  },
  {
    id: "pf2",
    module: "financement",
    question:
      "Un couple gagne 4 000 € net par mois, sans autre crédit. Quelle mensualité maximale selon la norme du HCSF ?",
    options: [
      "1 400 € : 35 % des revenus, assurance emprunteur comprise",
      "1 320 € : 33 % des revenus, assurance emprunteur non comprise",
      "1 600 € : 40 % des revenus, plafond réservé aux primo-accédants",
      "1 400 € hors assurance, celle-ci s'ajoutant à la mensualité",
    ],
    correctIndex: 0,
    explanation:
      "Norme du HCSF : taux d'effort de 35 % maximum, assurance emprunteur comprise, sur 25 ans au plus (27 ans dans le neuf). 4 000 € × 35 % = 1 400 € tout compris. Les banques peuvent déroger pour 20 % de leur production.",
    difficulty: "intermediaire",
  },
  {
    id: "pf3",
    module: "financement",
    question:
      "Un client loue à l'année un studio meublé et perçoit 9 000 € de loyers. En micro-BIC, combien est imposable ?",
    options: [
      "4 500 €, après un abattement forfaitaire de 50 %",
      "2 610 €, après un abattement forfaitaire de 71 %",
      "6 300 €, après un abattement forfaitaire de 30 %",
      "9 000 €, les charges réelles étant déduites à part",
    ],
    correctIndex: 0,
    explanation:
      "Location meublée classique en micro-BIC : abattement de 50 % (recettes jusqu'à 77 700 €), soit 4 500 € imposables. Depuis la loi Le Meur de 2024, le taux de 71 % a disparu ; seuls les meublés de tourisme non classés tombent à 30 %. Les charges réelles ne se déduisent qu'au régime réel.",
    difficulty: "avance",
  },

  // ── MARKETING (3 questions) ──
  {
    id: "pm1",
    module: "marketing",
    question: "Votre annonce se termine par « Bien rare, à saisir ! ». Que lui manque-t-il pour générer des contacts ?",
    options: [
      "Un appel à l'action précis : « Appelez Julie au 06… pour visiter samedi »",
      "Une description plus longue de la décoration de chacune des pièces",
      "Le nom du propriétaire, pour rassurer les acquéreurs sur le sérieux",
      "La mention « prix négociable », pour attirer davantage de visiteurs",
    ],
    correctIndex: 0,
    explanation:
      "Un appel à l'action (CTA) dit au lecteur quoi faire, avec qui et quand. « À saisir » ne déclenche rien. Le nom du vendeur n'a pas à figurer dans l'annonce, et « prix négociable » affaiblit la position du vendeur.",
    difficulty: "debutant",
  },
  {
    id: "pm2",
    module: "marketing",
    question: "Dans une annonce construite selon la méthode AIDA, quel est le rôle de la première ligne ?",
    options: [
      "Attirer l'attention avec le principal bénéfice du bien",
      "Lister les pièces, de l'entrée jusqu'à la dernière chambre",
      "Indiquer les honoraires et les mentions légales du bien",
      "Inviter le lecteur à appeler l'agence sans plus attendre",
    ],
    correctIndex: 0,
    explanation:
      "AIDA = Attention, Intérêt, Désir, Action. La première ligne capte l'attention (« Terrasse plein sud de 30 m² au cœur du Panier ») ; l'invitation à appeler est l'étape Action, en fin d'annonce.",
    difficulty: "intermediaire",
  },
  {
    id: "pm3",
    module: "marketing",
    question:
      "Votre site offre un guide « Bien vendre à Nantes » contre une adresse e-mail. Que faut-il pour envoyer ensuite votre newsletter ?",
    options: [
      "Un consentement distinct, par une case non pré-cochée",
      "Rien : télécharger le guide vaut accord pour tout envoi",
      "Une simple mention dans les conditions générales du site",
      "Un accord oral, recueilli lors du premier appel au client",
    ],
    correctIndex: 0,
    explanation:
      "La prospection par e-mail d'un particulier exige son consentement préalable (art. L.34-5 du Code des postes et communications électroniques). Il doit être spécifique : une case non pré-cochée, distincte du téléchargement du guide. On garde la preuve, et chaque envoi permet de se désabonner.",
    difficulty: "avance",
  },

  // ── TERRAIN (3 questions) ──
  {
    id: "ptr1",
    module: "terrain",
    question:
      "Un vendeur a demandé une estimation en ligne et accepté d'être rappelé. Quel est l'objectif de votre premier appel ?",
    options: [
      "Comprendre son projet et fixer un rendez-vous sur place",
      "Lui annoncer un prix par téléphone, pour gagner du temps",
      "Lui faire signer un mandat électronique dès cet appel",
      "Lui envoyer la liste complète des biens de l'agence",
    ],
    correctIndex: 0,
    explanation:
      "Le premier appel qualifie le projet (motif, délai, bien) et obtient un rendez-vous : une estimation sérieuse se fait sur place. Annoncer un prix à distance vous expose ; un mandat signé à distance ouvre en outre 14 jours de rétractation.",
    difficulty: "debutant",
  },
  {
    id: "ptr2",
    module: "terrain",
    question:
      "« Si vous ne vendez pas avant la rentrée, que se passe-t-il pour votre achat ? » Quel type de question SPIN est-ce ?",
    options: [
      "Une question d'implication : elle fait mesurer les conséquences",
      "Une question de situation : elle sert à collecter des faits",
      "Une question de problème : elle fait émerger une difficulté",
      "Une question de bénéfice : elle fait formuler la solution",
    ],
    correctIndex: 0,
    explanation:
      "SPIN = Situation, Problème, Implication, Need-payoff (bénéfice). La question d'implication fait mesurer au client le coût de l'inaction, ce qui crée une urgence réelle sans pression artificielle.",
    difficulty: "intermediaire",
  },
  {
    id: "ptr3",
    module: "terrain",
    question: "Après la visite, l'acquéreur dit : « C'est trop cher. » Quelle réponse ouvre la discussion ?",
    options: [
      "« Trop cher par rapport à quoi ? Qu'avez-vous visité d'autre ? »",
      "« Le vendeur acceptera sûrement une baisse d'au moins 10 %. »",
      "« Ce prix est celui du marché, il n'est absolument pas négociable. »",
      "« C'est pourtant bien moins cher que la maison d'à côté. »",
    ],
    correctIndex: 0,
    explanation:
      "Reformuler par une question fait apparaître la vraie objection (comparaison, budget, travaux) avant d'y répondre. Annoncer une baisse sans mandat du vendeur est une faute ; fermer ou contre-argumenter d'emblée bloque l'échange.",
    difficulty: "avance",
  },
];

/**
 * Ordre des réponses mélangé (graine = id), avec la bonne réponse répartie à
 * parts égales sur A/B/C/D.
 */
const PLACEMENT_POSITIONS = balancedPositions("placement", RAW_PLACEMENT_QUESTIONS.length);

export const PLACEMENT_QUESTIONS: PlacementQuestion[] = RAW_PLACEMENT_QUESTIONS.map((q, i) => {
  const { items, index } = placeAt(q.id, q.options, q.correctIndex, PLACEMENT_POSITIONS[i]);
  return { ...q, options: items, correctIndex: index };
});

export const PLACEMENT_MODULE_LABELS: Record<string, string> = {
  juridique: "Juridique & ALUR",
  transaction: "Transaction & Compromis",
  financement: "Financement & Fiscalité",
  marketing: "Marketing & Acquisition",
  terrain: "Terrain & Négociation",
};

export function calculatePlacementResult(
  answers: Record<string, number>
): PlacementResult {
  const totalQuestions = PLACEMENT_QUESTIONS.length;
  let correct = 0;
  const moduleScores: Record<string, { correct: number; total: number }> = {};

  for (const q of PLACEMENT_QUESTIONS) {
    if (!moduleScores[q.module]) {
      moduleScores[q.module] = { correct: 0, total: 0 };
    }
    moduleScores[q.module].total++;
    if (answers[q.id] === q.correctIndex) {
      correct++;
      moduleScores[q.module].correct++;
    }
  }

  const percentage = Math.round((correct / totalQuestions) * 100);

  let level: "debutant" | "intermediaire" | "avance";
  if (percentage >= 75) level = "avance";
  else if (percentage >= 45) level = "intermediaire";
  else level = "debutant";

  const weakModules: string[] = [];
  const strongModules: string[] = [];
  for (const [mod, scores] of Object.entries(moduleScores)) {
    const pct = scores.total > 0 ? (scores.correct / scores.total) * 100 : 0;
    if (pct < 50) weakModules.push(mod);
    if (pct >= 80) strongModules.push(mod);
  }

  let recommendation = "";
  if (level === "debutant") {
    recommendation = "Nous vous recommandons de commencer par le Module 1 (Juridique) et de suivre le parcours dans l'ordre. Ne sautez aucune étape !";
  } else if (level === "intermediaire") {
    recommendation = `Vous avez des bases solides. Concentrez-vous sur ${weakModules.length > 0 ? weakModules.map(m => PLACEMENT_MODULE_LABELS[m]).join(", ") : "vos points faibles"} pour passer au niveau avancé.`;
  } else {
    recommendation = "Excellent niveau ! Vous pouvez aborder directement les modules avancés ou passer les examens pour valider vos compétences.";
  }

  return {
    totalScore: correct,
    totalQuestions,
    percentage,
    level,
    moduleScores,
    weakModules,
    strongModules,
    recommendation,
  };
}
