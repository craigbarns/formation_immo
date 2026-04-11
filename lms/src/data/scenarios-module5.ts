import type { InteractiveScenario, ScenarioStep } from "./interactive-scenarios";

function s(step: ScenarioStep): ScenarioStep {
  return step;
}

export const SCENARIO_VISITE_CLOSING: InteractiveScenario = {
  id: "visite-closing-demo",
  title: "De la visite au closing — mission terrain",
  description:
    "Simulation complete : conduisez une visite, gerez les objections et concluez la vente. Chaque decision compte.",
  startStepId: "intro",
  steps: {
    intro: s({
      type: "video",
      id: "intro",
      badge: "Etape 1 — Preparation",
      title: "Visite decisive : un couple hesite entre 3 biens",
      lead: "M. et Mme Martin ont visite 2 biens concurrents. Ils viennent voir votre T3 avec jardin a 295 000 EUR. C'est potentiellement leur derniere visite.\n\nVotre objectif : transformer cette visite en offre d'achat.",
      coverImageUrl:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&q=80&auto=format&fit=crop",
      next: "choice-accueil",
    }),
    "choice-accueil": s({
      type: "choice",
      id: "choice-accueil",
      title: "Etape 2 — L'accueil",
      question: "Les Martin arrivent. Comment commencez-vous la visite ?",
      options: [
        {
          label: "Je les laisse entrer et decouvrir seuls, je reste disponible pour les questions.",
          next: "info-passif",
        },
        {
          label: "Je les accueille, rappelle leurs criteres, et commence par le jardin (leur critere n1) avant de visiter l'interieur.",
          next: "choice-objection",
        },
        {
          label: "Je commence par le prix et les conditions de vente pour etre transparent.",
          next: "info-prix-dabord",
        },
      ],
    }),
    "info-passif": s({
      type: "info",
      id: "info-passif",
      variant: "warn",
      title: "Visite trop passive",
      body: "Laisser le client seul = pas de creation de valeur. Votre role est de guider la decouverte, mettre en valeur les points forts et projeter le client dans son futur mode de vie.\n\nUne visite guidee strategique convertit 3 fois mieux.",
      next: "choice-accueil",
    }),
    "info-prix-dabord": s({
      type: "info",
      id: "info-prix-dabord",
      variant: "warn",
      title: "Le prix en dernier",
      body: "Commencer par le prix ancre la discussion sur le cout avant que le client ait percu la valeur du bien.\n\nLa bonne sequence : decouverte emotionnelle d'abord, details pratiques ensuite, prix en dernier.",
      next: "choice-accueil",
    }),
    "choice-objection": s({
      type: "choice",
      id: "choice-objection",
      title: "Etape 3 — L'objection",
      question:
        'Mme Martin aime le jardin mais dit : "La cuisine est un peu petite par rapport aux autres biens qu\'on a vus." Comment reagissez-vous ?',
      options: [
        {
          label: "Vous avez raison, la cuisine est petite. Mais le prix est interessant.",
          next: "info-valider-negatif",
        },
        {
          label: "J'entends votre remarque. Savez-vous que cette cuisine peut etre ouverte sur le sejour ? Le budget travaux serait d'environ 3-5K EUR. Voulez-vous que je vous montre comment ?",
          next: "choice-closing",
        },
        {
          label: "Non, elle fait la meme taille que les autres. Vous vous trompez.",
          next: "info-contredire",
        },
      ],
    }),
    "info-valider-negatif": s({
      type: "info",
      id: "info-valider-negatif",
      variant: "warn",
      title: "Ne validez pas le negatif",
      body: "Valider l'objection sans proposer de solution renforce le doute. La technique : reconnaitre le ressenti, puis recadrer avec une solution concrete.\n\nTransformer l'objection en opportunite (travaux, amenagement) est un reflexe de negociateur.",
      next: "choice-objection",
    }),
    "info-contredire": s({
      type: "info",
      id: "info-contredire",
      variant: "warn",
      title: "Ne contredisez jamais le client",
      body: "Contredire frontalement le client cree un mur defensif. Le client a toujours droit a son ressenti.\n\nLa bonne approche : ecoute active + reformulation + proposition de solution.",
      next: "choice-objection",
    }),
    "choice-closing": s({
      type: "choice",
      id: "choice-closing",
      title: "Etape 4 — Le closing",
      question:
        'Les Martin sont enthousiastes apres la visite. M. Martin dit : "On aime bien, on va reflechir ce week-end." Que faites-vous ?',
      options: [
        {
          label: "Tres bien, prenez votre temps et rappelez-moi quand vous voulez.",
          next: "info-attendre",
        },
        {
          label: "Je comprends, c'est une decision importante. Pour vous aider : 2 autres familles ont visite cette semaine. Si le bien vous plait, je peux bloquer une option 48h avec une offre ecrite, sans engagement definitif a ce stade.",
          next: "quiz-1",
        },
        {
          label: "Si vous ne signez pas maintenant, je propose le bien a un autre acheteur demain.",
          next: "info-pression",
        },
      ],
    }),
    "info-attendre": s({
      type: "info",
      id: "info-attendre",
      variant: "warn",
      title: "Risque de perdre le deal",
      body: "Laisser partir sans ancrer de prochaine etape = 70% de chances de perdre le client. Le week-end, ils verront d'autres biens, l'enthousiasme retombera.\n\nLe bon closing : creer un pont vers l'action (visite de confirmation, offre sous conditions).",
      next: "choice-closing",
    }),
    "info-pression": s({
      type: "info",
      id: "info-pression",
      variant: "warn",
      title: "Pression = rupture de confiance",
      body: "Un ultimatum agressif detruit la confiance et le professionnalisme. Les clients fuient la pression.\n\nL'urgence doit etre legitime et factuelle (autres visiteurs, delai vendeur), pas artificielle.",
      next: "choice-closing",
    }),
    "quiz-1": s({
      type: "quiz",
      id: "quiz-1",
      title: "Question 1/3",
      question: "Le taux de conversion visite > offre d'un bon negociateur est d'environ :",
      options: [
        { label: "5-10%", isCorrect: false },
        { label: "20-30%", isCorrect: true },
        { label: "80-90%", isCorrect: false },
      ],
      explanation: "Un taux de 20-30% est considere comme performant. Il se travaille via la qualification amont et la technique de visite.",
      next: "quiz-2",
    }),
    "quiz-2": s({
      type: "quiz",
      id: "quiz-2",
      title: "Question 2/3",
      question: "L'objection la plus frequente en visite est :",
      options: [
        { label: "Le bien est trop cher", isCorrect: true },
        { label: "Le bien est trop grand", isCorrect: false },
        { label: "Le quartier est trop calme", isCorrect: false },
      ],
      explanation: "L'objection prix est la plus courante. Elle cache souvent un manque de perception de valeur plutot qu'un vrai probleme budgetaire.",
      next: "quiz-3",
    }),
    "quiz-3": s({
      type: "quiz",
      id: "quiz-3",
      title: "Question 3/3",
      question: "Apres une offre acceptee, la prochaine etape professionnelle est de :",
      options: [
        { label: "Attendre que le notaire appelle", isCorrect: false },
        { label: "Organiser le rendez-vous notaire, rassembler les documents et securiser le financement", isCorrect: true },
        { label: "Publier la vente sur les reseaux sociaux", isCorrect: false },
      ],
      explanation: "Le professionnel accompagne activement jusqu'a la signature : coordination notaire, suivi financement, documents.",
      next: "done",
    }),
    done: s({
      type: "complete",
      id: "done",
      title: "Mission terrain reussie !",
      message: "Vous avez maitrise les 4 piliers d'une visite reussie : accueil personnalise, gestion des objections, closing par l'urgence legitime et suivi proactif. Ces competences terrain font la difference entre un bon et un excellent agent.",
      nextLesson: { href: "/formation/terrain/argumentaire", label: "Suite — Argumentaire qui convertit" },
    }),
  },
};
