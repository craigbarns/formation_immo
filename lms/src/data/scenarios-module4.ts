import type { InteractiveScenario, ScenarioStep } from "./interactive-scenarios";

function s(step: ScenarioStep): ScenarioStep {
  return step;
}

export const SCENARIO_ANNONCE_PARFAITE: InteractiveScenario = {
  id: "annonce-parfaite-demo",
  title: "Creer l'annonce immobiliere parfaite",
  description:
    "Mise en situation : vous devez rediger et publier une annonce pour un appartement. Chaque choix impacte la performance de votre annonce.",
  startStepId: "intro",
  steps: {
    intro: s({
      type: "video",
      id: "intro",
      badge: "Etape 1 — Le brief",
      title: "T4 lumineux en centre-ville : creez l'annonce",
      lead: "Vous avez un T4 de 85m2 a mettre en vente a 320 000 EUR. Le bien est lumineux, avec balcon, proche ecoles et transports. Le proprietaire veut vendre sous 3 mois.\n\nVotre mission : creer une annonce qui genere un maximum de contacts qualifies.",
      coverImageUrl:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1400&q=80&auto=format&fit=crop",
      next: "choice-photo",
    }),
    "choice-photo": s({
      type: "choice",
      id: "choice-photo",
      title: "Etape 2 — La photo principale",
      question: "Quelle strategie photo adoptez-vous pour la photo principale de l'annonce ?",
      options: [
        {
          label: "Une photo rapide au smartphone de la facade exterieure.",
          next: "info-photo-mauvaise",
        },
        {
          label: "Seance photo professionnelle : grand angle, lumiere naturelle, home staging du sejour.",
          next: "choice-titre",
        },
        {
          label: "Pas de photo, juste une description detaillee. Les vrais acheteurs se deplacent.",
          next: "info-photo-aucune",
        },
      ],
    }),
    "info-photo-mauvaise": s({
      type: "info",
      id: "info-photo-mauvaise",
      variant: "warn",
      title: "La photo = 80% du clic",
      body: "Statistiquement, la photo principale determine 80% des clics sur les portails. Une photo amateur au smartphone reduit dramatiquement la visibilite.\n\nInvestissez dans des photos professionnelles : le retour sur investissement est immediat.",
      next: "choice-photo",
    }),
    "info-photo-aucune": s({
      type: "info",
      id: "info-photo-aucune",
      variant: "warn",
      title: "Sans photo = sans clic",
      body: "Les annonces sans photo recoivent 10 fois moins de contacts. Sur les portails, les acheteurs scrollent visuellement. Pas de photo = invisible.\n\nC'est la premiere regle du marketing immobilier digital.",
      next: "choice-photo",
    }),
    "choice-titre": s({
      type: "choice",
      id: "choice-titre",
      title: "Etape 3 — Le titre de l'annonce",
      question: "Quel titre choisissez-vous pour maximiser les clics ?",
      options: [
        {
          label: "VENTE APPARTEMENT T4",
          next: "info-titre-generique",
        },
        {
          label: "T4 lumineux 85m2 avec balcon — Centre-ville, proche ecoles",
          next: "quiz-1",
        },
        {
          label: "URGENT !!! AFFAIRE A SAISIR !!! PRIX CASSE !!!",
          next: "info-titre-spam",
        },
      ],
    }),
    "info-titre-generique": s({
      type: "info",
      id: "info-titre-generique",
      variant: "warn",
      title: "Trop generique",
      body: "Un titre sans point fort ne se demarque pas dans le flux des annonces. Incluez les atouts cles (luminosite, surface, emplacement) pour attirer l'oeil.\n\nPensez : qu'est-ce qui rend CE bien unique ?",
      next: "choice-titre",
    }),
    "info-titre-spam": s({
      type: "info",
      id: "info-titre-spam",
      variant: "warn",
      title: "Perception negative",
      body: "Les majuscules et les points d'exclamation excessifs donnent une impression de spam et de desesperation. Cela repousse les acheteurs serieux.\n\nUn titre professionnel inspire confiance.",
      next: "choice-titre",
    }),
    "quiz-1": s({
      type: "quiz",
      id: "quiz-1",
      title: "Question 1/3",
      question: "Le nombre optimal de photos pour une annonce immobiliere sur les portails est :",
      options: [
        { label: "3-5 photos suffisent", isCorrect: false },
        { label: "10-15 photos de qualite couvrant toutes les pieces", isCorrect: true },
        { label: "Plus de 30 photos pour tout montrer", isCorrect: false },
      ],
      explanation: "10-15 photos de qualite : suffisant pour donner envie sans noyer l'acheteur. Chaque photo doit avoir une utilite.",
      next: "quiz-2",
    }),
    "quiz-2": s({
      type: "quiz",
      id: "quiz-2",
      title: "Question 2/3",
      question: "Dans la description, quelle approche est la plus efficace ?",
      options: [
        { label: "Lister uniquement les caracteristiques techniques (surface, etage, annee)", isCorrect: false },
        { label: "Raconter l'experience de vie : lumiere, ambiance, quartier, proximites", isCorrect: true },
        { label: "Ecrire le moins possible car personne ne lit", isCorrect: false },
      ],
      explanation: "Le storytelling immobilier (experience de vie) convertit mieux que la fiche technique. L'acheteur achete un mode de vie.",
      next: "quiz-3",
    }),
    "quiz-3": s({
      type: "quiz",
      id: "quiz-3",
      title: "Question 3/3",
      question: "Pour maximiser la diffusion d'une annonce, il faut :",
      options: [
        { label: "Publier uniquement sur un seul portail premium", isCorrect: false },
        { label: "Diffuser sur les portails + reseaux sociaux + site agence avec coherence", isCorrect: true },
        { label: "Poster sur Facebook uniquement car c'est gratuit", isCorrect: false },
      ],
      explanation: "La strategie multi-canal coherente (portails + social + site) maximise la visibilite et les contacts qualifies.",
      next: "done",
    }),
    done: s({
      type: "complete",
      id: "done",
      title: "Annonce optimisee validee !",
      message: "Vous maitrisez les fondamentaux du marketing immobilier digital : photo pro, titre accrocheur, storytelling et diffusion multi-canal. Ces reflexes transforment vos annonces en machines a contacts.",
      nextLesson: { href: "/formation/marketing/portails", label: "Suite — Maitriser les portails" },
    }),
  },
};
