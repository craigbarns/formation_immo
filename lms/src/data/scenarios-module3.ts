import type { InteractiveScenario, ScenarioStep } from "./interactive-scenarios";

function s(step: ScenarioStep): ScenarioStep {
  return step;
}

export const SCENARIO_CREDIT_STRUCTURATION: InteractiveScenario = {
  id: "credit-structuration-demo",
  title: "Structuration d'un dossier de credit",
  description:
    "Mise en situation : un couple de primo-accedants souhaite acheter un T3. Aidez-les a structurer le meilleur montage financier.",
  startStepId: "intro",
  steps: {
    intro: s({
      type: "video",
      id: "intro",
      badge: "Etape 1 — Le client",
      title: "Primo-accedants : premier achat immobilier",
      lead: "M. et Mme Dupont, 32 et 30 ans, revenus combines 5 200 EUR/mois, souhaitent acheter un T3 a 280 000 EUR. Ils disposent de 35 000 EUR d'epargne. Aucun credit en cours.\n\nVotre mission : les guider vers le meilleur montage.",
      coverImageUrl:
        "https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=1400&q=80&auto=format&fit=crop",
      next: "choice-apport",
    }),
    "choice-apport": s({
      type: "choice",
      id: "choice-apport",
      title: "Etape 2 — Strategie d'apport",
      question: "Quelle strategie d'apport recommandez-vous a ce couple ?",
      options: [
        {
          label: "Mettre 100% de l'epargne en apport (35 000 EUR) pour baisser les mensualites.",
          next: "info-epargne",
        },
        {
          label: "Apport de 25 000 EUR + garder 10 000 EUR d'epargne de securite, puis verifier l'eligibilite au PTZ.",
          next: "choice-duree",
        },
        {
          label: "Pas d'apport du tout, garder tout en epargne de precaution.",
          next: "info-apport-zero",
        },
      ],
    }),
    "info-epargne": s({
      type: "info",
      id: "info-epargne",
      variant: "warn",
      title: "Attention — epargne de securite",
      body: "Mettre 100% de son epargne en apport est risque. Il est essentiel de conserver une epargne de precaution (3 a 6 mois de charges) pour faire face aux imprevus.\n\nLa recommandation pro : toujours garder un matelas de securite.",
      next: "choice-apport",
    }),
    "info-apport-zero": s({
      type: "info",
      id: "info-apport-zero",
      variant: "warn",
      title: "Financement a 110% — difficile en 2026",
      body: "En 2026, tres peu de banques financent a 110% (achat + frais de notaire). Un minimum d'apport couvrant les frais de notaire est quasi indispensable.\n\nDe plus, un apport demontre la capacite d'epargne et ameliore les conditions du pret.",
      next: "choice-apport",
    }),
    "choice-duree": s({
      type: "choice",
      id: "choice-duree",
      title: "Etape 3 — Duree du credit",
      question: "Le taux d'endettement maximum HCSF est de 35%. Avec un emprunt de ~265 000 EUR (280K - 25K + frais), quelle duree recommandez-vous ?",
      options: [
        { label: "15 ans — mensualites elevees mais moins d'interets.", next: "info-trop-court" },
        { label: "25 ans — mensualites compatibles avec le taux d'endettement 35%.", next: "quiz-1" },
        { label: "30 ans — pour des mensualites minimales.", next: "info-trop-long" },
      ],
    }),
    "info-trop-court": s({
      type: "info",
      id: "info-trop-court",
      variant: "warn",
      title: "Taux d'endettement depasse",
      body: "Sur 15 ans, les mensualites depasseraient largement 35% des revenus du couple. Le dossier serait refuse par la banque.\n\nCalculez toujours le taux d'endettement avant de proposer une duree.",
      next: "choice-duree",
    }),
    "info-trop-long": s({
      type: "info",
      id: "info-trop-long",
      variant: "warn",
      title: "Reglementation HCSF",
      body: "La reglementation HCSF 2022 limite la duree maximale des prets immobiliers a 25 ans (27 ans pour le neuf avec differe). Un pret de 30 ans n'est plus autorise en France.\n\nRenseignez-vous sur les regles actuelles avant de conseiller vos clients.",
      next: "choice-duree",
    }),
    "quiz-1": s({
      type: "quiz",
      id: "quiz-1",
      title: "Question 1/3",
      question: "Le PTZ (Pret a Taux Zero) est accessible :",
      options: [
        { label: "A tous les acheteurs sans condition", isCorrect: false },
        { label: "Aux primo-accedants sous conditions de ressources et de zone geographique", isCorrect: true },
        { label: "Uniquement aux investisseurs locatifs", isCorrect: false },
      ],
      explanation: "Le PTZ est reserve aux primo-accedants, sous plafonds de ressources, et varie selon la zone (A, B1, B2, C).",
      next: "quiz-2",
    }),
    "quiz-2": s({
      type: "quiz",
      id: "quiz-2",
      title: "Question 2/3",
      question: "Pour optimiser le taux d'interet, le courtier recommande generalement de :",
      options: [
        { label: "Prendre le premier taux propose par sa banque", isCorrect: false },
        { label: "Mettre les banques en concurrence et negocier avec des comparatifs", isCorrect: true },
        { label: "Mentir sur ses revenus pour obtenir un meilleur taux", isCorrect: false },
      ],
      explanation: "La mise en concurrence est la methode la plus efficace pour obtenir les meilleures conditions.",
      next: "quiz-3",
    }),
    "quiz-3": s({
      type: "quiz",
      id: "quiz-3",
      title: "Question 3/3",
      question: "L'assurance emprunteur represente en moyenne quel pourcentage du cout total du credit ?",
      options: [
        { label: "Moins de 5%", isCorrect: false },
        { label: "Entre 20% et 40% du cout total", isCorrect: true },
        { label: "Plus de 50%", isCorrect: false },
      ],
      explanation: "L'assurance represente souvent 25-35% du cout total. La delegation d'assurance (loi Lemoine) permet d'economiser significativement.",
      next: "done",
    }),
    done: s({
      type: "complete",
      id: "done",
      title: "Dossier structure avec succes",
      message: "Vous avez guide vos clients vers un montage solide : apport raisonnable, epargne de securite, duree adaptee et optimisation des conditions. C'est la base d'un conseil financier professionnel.",
      nextLesson: { href: "/formation/financement/fiscalite", label: "Lecon suivante — Fiscalite" },
    }),
  },
};
