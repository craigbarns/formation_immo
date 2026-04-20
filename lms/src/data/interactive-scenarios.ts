/**
 * Parcours interactifs « maison » : vidéo → choix → QCM (sans outil tiers).
 * Ajoutez des scénarios ici et référencez-les via `interactiveScenarioId` dans `course.ts`.
 */

export type VideoStep = {
  type: "video";
  id: string;
  title: string;
  /** Surtitre pédagogique (ex. Étape 1 — Contexte) */
  badge?: string;
  /** Texte sous le titre */
  lead?: string;
  /** Image d’en-tête (paysage, URL https) — ambiance avant la vidéo */
  coverImageUrl?: string;
  /** URL MP4/WebM ou lien YouTube/Vimeo (même format que `VideoEmbed`) */
  videoUrl?: string;
  /** Légende sous le lecteur */
  caption?: string;
  next: string;
};

export type InfoStep = {
  type: "info";
  id: string;
  title: string;
  body: string;
  next: string;
  variant?: "neutral" | "warn" | "success";
};

export type ChoiceStep = {
  type: "choice";
  id: string;
  title: string;
  question: string;
  /** Chaque option mène à une étape suivante */
  options: { label: string; next: string }[];
};

export type QuizStep = {
  type: "quiz";
  id: string;
  title: string;
  question: string;
  options: { label: string; isCorrect: boolean }[];
  /** Affiché après réponse (surtout si erreur) */
  explanation: string;
  next: string;
};

export type CompleteStep = {
  type: "complete";
  id: string;
  title: string;
  message: string;
  /** Lien optionnel « leçon suivante » */
  nextLesson?: { href: string; label: string };
};

export type ScenarioStep = VideoStep | InfoStep | ChoiceStep | QuizStep | CompleteStep;

export type InteractiveScenario = {
  id: string;
  title: string;
  description: string;
  startStepId: string;
  steps: Record<string, ScenarioStep>;
};

function s(step: ScenarioStep): ScenarioStep {
  return step;
}

/**
 * Démo pédagogique : transparence des honoraires (ALUR) — branche « erreur » + 3 QCM.
 * Vidéo d’exemple : clip court CC0 (MDN) pour ne pas dépendre d’un fichier local.
 */
const HONORAIRES_ALUR_DEMO: InteractiveScenario = {
  id: "honoraires-alur-demo",
  title: "Transparence des honoraires & information du consommateur",
  description:
    "Mise en situation : mandat de vente, rédaction d’annonce et respect du cadre ALUR. Validez vos réflexes avant la mise en ligne.",
  startStepId: "intro-video",
  steps: {
    "intro-video": s({
      type: "video",
      id: "intro-video",
      badge: "Étape 1 — Contexte",
      title: "Mandat signé : que vérifiez-vous avant l’annonce ?",
      lead:
        "Vous venez de recevoir un mandat exclusif de vente. Avant toute publication sur les portails ou les réseaux, l’annonce doit refléter une information loyale, claire et compréhensible pour le futur acquéreur — c’est le cœur des exigences issues de la loi ALUR et du droit de la consommation.\n\nVisionnez le rappel ci-dessous (extrait pédagogique — vous pouvez remplacer cette vidéo par votre propre capsule dans le fichier de scénario).",
      coverImageUrl:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&q=85&auto=format&fit=crop",
      next: "choix-annonce",
    }),
    "choix-annonce": s({
      type: "choice",
      id: "choix-annonce",
      title: "Étape 2 — Décision professionnelle",
      question:
        "Le vendeur insiste pour une annonce sans mention des honoraires à la charge de l’acquéreur, et veut afficher uniquement le prix « net vendeur ». Quelle est votre attitude conforme à la déontologie et au cadre légal ?",
      options: [
        {
          label:
            "J’accepte pour conclure le mandat : on ajuste les mentions légales après coup, quand un acquéreur se manifestera.",
          next: "rappel-loi",
        },
        {
          label:
            "J’explique au vendeur que l’annonce doit préciser le prix et les honoraires de façon transparente (vendeur et, le cas échéant, acquéreur), et je fais modifier le mandat et le brouillon d’annonce avant toute diffusion.",
          next: "quiz-1",
        },
        {
          label:
            "Je me limite au prix net vendeur : les honoraires sont une discussion privée entre l’agence et l’acquéreur au moment de l’offre.",
          next: "rappel-loi",
        },
      ],
    }),
    "rappel-loi": s({
      type: "info",
      id: "rappel-loi",
      title: "À retenir — transparence et loyauté",
      variant: "warn",
      body:
        "La loi ALUR et les textes sur l’information du consommateur imposent une présentation non trompeuse des prix et des honoraires. Une annonce qui occulte la charge supportée par l’acquéreur ou qui prête à confusion sur le coût total est non conforme : elle expose votre agence, le mandant et la relation de confiance avec le public.\n\nÀ faire : reformuler le projet d’annonce avec le vendeur, tracer la validation (email ou trace CRM), et ne diffuser qu’une version qui respecte les mentions obligatoires et la transparence des honoraires.\n\nReprenez le choix précédent et sélectionnez la réponse conforme.",
      next: "choix-annonce",
    }),
    "quiz-1": s({
      type: "quiz",
      id: "quiz-1",
      title: "Validation — question 1 / 3",
      question:
        "Concernant l’affichage dans une annonce immobilière (prix et honoraires), quelle formulation correspond le mieux à l’exigence d’information du consommateur ?",
      options: [
        {
          label: "L’honoraire acquéreur peut rester implicite tant que le bien n’a pas été visité.",
          isCorrect: false,
        },
        {
          label:
            "Les honoraires et le prix du bien doivent être présentés de façon claire et compréhensible, sans ambiguïté sur ce que paiera l’acquéreur.",
          isCorrect: true,
        },
        {
          label: "Seul le prix net vendeur doit figurer ; les honoraires se négocient toujours hors annonce.",
          isCorrect: false,
        },
      ],
      explanation:
        "L’acquéreur potentiel doit pouvoir comprendre le coût global et la répartition des honoraires **dès la lecture de l’annonce** — c’est le principe d’information loyale appliqué à l’immobilier.",
      next: "quiz-2",
    }),
    "quiz-2": s({
      type: "quiz",
      id: "quiz-2",
      title: "Validation — question 2 / 3",
      question: "Le contrat de mandat (mandat de vente) doit notamment permettre au client de comprendre :",
      options: [
        {
          label: "Uniquement le taux de TVA applicable aux prestations de l’agence.",
          isCorrect: false,
        },
        {
          label:
            "Les montants ou conditions des honoraires à sa charge et, le cas échéant, celles pouvant incomber à l’acquéreur, dans le respect des règles de transparence.",
          isCorrect: true,
        },
        {
          label: "Les honoraires peuvent être décrits verbalement ; le mandat peut rester générique.",
          isCorrect: false,
        },
      ],
      explanation:
        "Le mandat est le document qui engage le client : il doit formaliser **qui paie quoi** et sous quelles conditions, de manière lisible — ce n’est pas un simple formulaire administratif.",
      next: "quiz-3",
    }),
    "quiz-3": s({
      type: "quiz",
      id: "quiz-3",
      title: "Validation — question 3 / 3",
      question:
        "Face à une zone grise (clause atypique, annonce sur un bien atypique, doute sur une mention obligatoire), quelle conduite recommandez-vous en agence ?",
      options: [
        {
          label:
            "Solliciter l’avis du référent juridique, de la direction ou du notaire partenaire avant diffusion ou signature.",
          isCorrect: true,
        },
        {
          label: "Publier dans l’urgence pour ne pas retarder le mandat : on corrige si le CSF le signale.",
          isCorrect: false,
        },
        {
          label: "Reproduire une formulation trouvée sur une annonce concurrente sans la vérifier.",
          isCorrect: false,
        },
      ],
      explanation:
        "Le professionnel raisonnablement informé ne « devine » pas le droit : il **documente** et fait valider les cas limites pour protéger le client et l’entreprise.",
      next: "fin-parcours",
    }),
    "fin-parcours": s({
      type: "complete",
      id: "fin-parcours",
      title: "Parcours validé",
      message:
        "Vous avez restauré le bon réflexe : transparence des honoraires, mandat explicite et prudence en cas d’incertitude juridique. Ces gestes professionnels réduisent les risques réputationnels et contentieux, et renforcent la confiance des vendeurs comme des acquéreurs.\n\nPoursuivez le module juridique avec la leçon sur le compromis de vente.",
      nextLesson: { href: "/formation/juridique/compromis", label: "Suite du module — Compromis de vente" },
    }),
  },
};

export const INTERACTIVE_SCENARIOS: Record<string, InteractiveScenario> = {
  "alur-conformite-360-demo": {
    id: "alur-conformite-360-demo",
    title: "ALUR 360 - annonce, mandat, conformite",
    description:
      "Parcours scenario complet: vous prenez un mandat, verifiez les obligations ALUR, arbitrez des choix terrain, puis validez 3 QCM.",
    startStepId: "intro",
    steps: {
      intro: s({
        type: "video",
        id: "intro",
        badge: "Etape 1 - Brief client",
        title: "Nouveau mandat exclusif en zone tendue",
        lead:
          "Un proprietaire veut publier vite. Il minimise les contraintes de transparence sur les honoraires et pense que certains diagnostics peuvent attendre. Votre mission: securiser la commercialisation sans perdre le mandat.",
        coverImageUrl: "/scenarios/alur-mandat.png",
        next: "choice-1",
      }),
      "choice-1": s({
        type: "choice",
        id: "choice-1",
        title: "Etape 2 - Decision sur l'annonce",
        question:
          "Le vendeur demande d'afficher uniquement un prix net vendeur, sans mention explicite des honoraires. Que faites-vous ?",
        options: [
          {
            label: "J'accepte pour gagner du temps, puis je corrige apres les premieres visites.",
            next: "info-1",
          },
          {
            label:
              "Je refuse la diffusion immediate, j'explique l'obligation d'information claire sur prix et honoraires, puis je fais valider une annonce conforme.",
            next: "choice-2",
          },
          {
            label: "Je publie sans detail, puis j'envoie un PDF explicatif seulement aux acheteurs motives.",
            next: "info-1",
          },
        ],
      }),
      "info-1": s({
        type: "info",
        id: "info-1",
        variant: "warn",
        title: "Point de non-conformite",
        body:
          "En pratique ALUR et information du consommateur, une annonce ambigue sur le cout total expose l'agence. Le bon reflexe: clarifier prix et honoraires avant publication, puis conserver une trace ecrite de validation.",
        next: "choice-1",
      }),
      "choice-2": s({
        type: "choice",
        id: "choice-2",
        title: "Etape 3 - Validation du dossier",
        question:
          "Avant mise en ligne, quel controle prioritaire mettez-vous en place dans votre check-list agence ?",
        options: [
          {
            label: "Seulement les photos et le descriptif commercial, le juridique viendra au compromis.",
            next: "info-2",
          },
          {
            label:
              "Verification complete: mandat signe, mentions honoraires, diagnostics applicables, coherence annonce-vitrine-portails.",
            next: "quiz-1",
          },
          {
            label: "Je diffuse d'abord sur les reseaux sociaux, puis j'aligne les portails ensuite.",
            next: "info-2",
          },
        ],
      }),
      "info-2": s({
        type: "info",
        id: "info-2",
        variant: "warn",
        title: "Risque operationnel",
        body:
          "Diffuser sans check-list complete augmente le risque d'incoherence entre supports et de litige client. En agence performante, la conformite se traite avant publication, pas apres.",
        next: "choice-2",
      }),
      "quiz-1": s({
        type: "quiz",
        id: "quiz-1",
        title: "QCM 1 / 3",
        question: "Le mandat de vente doit permettre en priorite de comprendre :",
        options: [
          { label: "Uniquement le montant des travaux du bien", isCorrect: false },
          {
            label: "Les conditions de remuneration et la repartition claire des honoraires",
            isCorrect: true,
          },
          { label: "Le budget publicitaire ideal de l'agence", isCorrect: false },
        ],
        explanation:
          "Le mandat encadre la relation contractuelle: les honoraires et leurs conditions doivent etre explicites.",
        next: "quiz-2",
      }),
      "quiz-2": s({
        type: "quiz",
        id: "quiz-2",
        title: "QCM 2 / 3",
        question: "Sur l'annonce, la bonne pratique est de :",
        options: [
          {
            label: "Presenter une information claire et non trompeuse sur le prix et les honoraires",
            isCorrect: true,
          },
          { label: "Cacher les honoraires pour eviter la comparaison", isCorrect: false },
          { label: "Reporter les infos de prix detaillees apres la visite", isCorrect: false },
        ],
        explanation:
          "L'acheteur doit comprendre le cout reel des le depart; la transparence est un avantage commercial durable.",
        next: "quiz-3",
      }),
      "quiz-3": s({
        type: "quiz",
        id: "quiz-3",
        title: "QCM 3 / 3",
        question: "En cas de doute juridique sur une mention d'annonce, vous :",
        options: [
          { label: "Validez avec le referent juridique/notaire avant diffusion", isCorrect: true },
          { label: "Publiez quand meme pour ne pas perdre de temps", isCorrect: false },
          { label: "Copiez une annonce concurrente sans verifier", isCorrect: false },
        ],
        explanation:
          "Le bon standard pro est la verification en amont pour proteger le client, l'agence et la transaction.",
        next: "done",
      }),
      done: s({
        type: "complete",
        id: "done",
        title: "Mission ALUR validee",
        message:
          "Vous avez applique les bons reflexes: transparence, check-list de conformite, et validation juridique en cas de doute. Vous pouvez maintenant passer a la lecon suivante avec une base solide.",
        nextLesson: { href: "/formation/juridique/parcours-interactif", label: "Passer au parcours suivant" },
      }),
    },
  },
  [HONORAIRES_ALUR_DEMO.id]: HONORAIRES_ALUR_DEMO,
  "estimation-negociation-demo": {
    id: "estimation-negociation-demo",
    title: "Estimation & prise de mandat",
    description:
      "Demo terrain: vous devez cadrer un vendeur surestimant son bien, proposer une methode d'estimation et securiser le mandat.",
    startStepId: "intro",
    steps: {
      intro: s({
        type: "video",
        id: "intro",
        badge: "Etape 1 - Brief vendeur",
        title: "Mandat a signer sous tension",
        lead:
          "Le vendeur exige un prix 15% au-dessus du marche. Votre objectif: conserver la relation, rester factuel, et obtenir un mandat exploitable.",
        coverImageUrl:
          "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=1400&q=80&auto=format&fit=crop",
        next: "choice-prix",
      }),
      "choice-prix": s({
        type: "choice",
        id: "choice-prix",
        title: "Etape 2 - Votre posture",
        question: "Quelle approche maximise les chances de signer un mandat sain ?",
        options: [
          {
            label: "J'accepte le prix vendeur sans discuter pour prendre le mandat rapidement.",
            next: "info-piege",
          },
          {
            label:
              "Je presente 3 comparables, une fourchette argumentee et un plan de test de prix sur 14 jours avec indicateurs.",
            next: "quiz-1",
          },
          {
            label: "Je refuse directement le dossier sans explication detaillee.",
            next: "info-piege",
          },
        ],
      }),
      "info-piege": s({
        type: "info",
        id: "info-piege",
        variant: "warn",
        title: "Correction terrain",
        body:
          "Un mandat pris sur un prix irrealiste se transforme souvent en bien invendable, baisse de credibilite et frustration client.\n\nLa bonne pratique est de documenter les comparables, expliciter les delais, et poser des jalons de reajustement chiffrables.",
        next: "choice-prix",
      }),
      "quiz-1": s({
        type: "quiz",
        id: "quiz-1",
        title: "Question 1 / 3",
        question: "Quel element a le plus de poids pour justifier un prix de mise en vente ?",
        options: [
          { label: "Le prix souhaite par le vendeur", isCorrect: false },
          { label: "Des comparables recents et vraiment similaires", isCorrect: true },
          { label: "Le montant des travaux annonces oralement", isCorrect: false },
        ],
        explanation:
          "Les comparables recents, proches en caracteristiques et localisation, restent la base la plus defendable.",
        next: "quiz-2",
      }),
      "quiz-2": s({
        type: "quiz",
        id: "quiz-2",
        title: "Question 2 / 3",
        question: "Un mandat exclusif performant doit inclure en priorite :",
        options: [
          { label: "Une clause de baisse automatique sans accord vendeur", isCorrect: false },
          { label: "Un plan d'action marketing date + points d'etape de prix", isCorrect: true },
          { label: "Un prix sans justification ecrite", isCorrect: false },
        ],
        explanation: "Le plan d'action et les revues periodiques alignent attentes vendeur et realite marche.",
        next: "quiz-3",
      }),
      "quiz-3": s({
        type: "quiz",
        id: "quiz-3",
        title: "Question 3 / 3",
        question: "Indicateur d'alerte principal apres 2 semaines de diffusion ?",
        options: [
          { label: "Aucune visite qualifiee malgre une bonne diffusion", isCorrect: true },
          { label: "Des likes sur reseaux sociaux", isCorrect: false },
          { label: "Un compliment du vendeur sur les photos", isCorrect: false },
        ],
        explanation:
          "Sans visites qualifiees, le prix ou le positionnement est probablement a recalibrer rapidement.",
        next: "done",
      }),
      done: s({
        type: "complete",
        id: "done",
        title: "Demo terminee",
        message:
          "Vous avez applique la methode pro: comparables, pedagogie, pilotage par indicateurs. C'est le coeur d'une prise de mandat rentable et durable.",
      }),
    },
  },
  "rentabilite-investisseur-demo": {
    id: "rentabilite-investisseur-demo",
    title: "Rentabilite investisseur - decision d'achat",
    description:
      "Simulation interactive: vous arbitrez entre plusieurs hypotheses (vacance, charges, travaux) pour recommander une decision investisseur.",
    startStepId: "intro",
    steps: {
      intro: s({
        type: "video",
        id: "intro",
        badge: "Etape 1 - Donnees d'entree",
        title: "Studio a 145 000 EUR - bonne affaire ?",
        lead:
          "Loyer cible 730 EUR/mois, charges annuelles 1 450 EUR, taxe fonciere 980 EUR, travaux initiaux 8 000 EUR. Votre mission: valider si la rentabilite est defendable.",
        coverImageUrl:
          "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1400&q=80&auto=format&fit=crop",
        next: "choice-modele",
      }),
      "choice-modele": s({
        type: "choice",
        id: "choice-modele",
        title: "Etape 2 - Methode de calcul",
        question: "Quel calcul presentez-vous en premier a l'investisseur ?",
        options: [
          { label: "Seulement la rentabilite brute pour rassurer vite", next: "info-risque" },
          {
            label: "Brute + nette + scenario prudent (vacance locative et imprevus)",
            next: "quiz-1",
          },
          { label: "Uniquement le cash-flow du premier mois", next: "info-risque" },
        ],
      }),
      "info-risque": s({
        type: "info",
        id: "info-risque",
        variant: "warn",
        title: "Risque de recommandation incomplete",
        body:
          "Une recommandation investisseur sans scenario prudent expose a de mauvaises surprises (vacance, travaux, charges variables).\n\nLa bonne pratique est de comparer plusieurs hypotheses, puis d'assumer une recommandation argumentee.",
        next: "choice-modele",
      }),
      "quiz-1": s({
        type: "quiz",
        id: "quiz-1",
        title: "Question 1 / 3",
        question: "La rentabilite brute se calcule classiquement par :",
        options: [
          { label: "(Loyer annuel / prix d'achat) x 100", isCorrect: true },
          { label: "(Loyer mensuel / mensualite de credit) x 100", isCorrect: false },
          { label: "(Prix d'achat / loyer annuel) x 100", isCorrect: false },
        ],
        explanation: "La rentabilite brute compare le revenu locatif annuel au cout d'acquisition.",
        next: "quiz-2",
      }),
      "quiz-2": s({
        type: "quiz",
        id: "quiz-2",
        title: "Question 2 / 3",
        question: "Dans une vision prudente, quel parametre oublie le plus souvent fausse l'analyse ?",
        options: [
          { label: "La vacance locative", isCorrect: true },
          { label: "Le nombre de photos de l'annonce", isCorrect: false },
          { label: "Le type de parquet", isCorrect: false },
        ],
        explanation: "La vacance degrade directement le rendement reel sur l'annee.",
        next: "quiz-3",
      }),
      "quiz-3": s({
        type: "quiz",
        id: "quiz-3",
        title: "Question 3 / 3",
        question: "Avant recommandation finale, vous devez au minimum :",
        options: [
          { label: "Verifier charges, taxe fonciere, travaux et horizon de detention", isCorrect: true },
          { label: "Promettre une revente certaine a +20%", isCorrect: false },
          { label: "Ecarter les risques pour ne pas freiner l'achat", isCorrect: false },
        ],
        explanation: "Une recommandation pro est transparente sur les risques et hypotheses.",
        next: "done",
      }),
      done: s({
        type: "complete",
        id: "done",
        title: "Simulation validee",
        message:
          "Vous avez adopte une posture conseil: calculs robustes, scenario prudent, et decision argumentee. C'est exactement ce qu'un investisseur attend d'un professionnel fiable.",
      }),
    },
  },
};

// ── Scenarios supplementaires (modules 3, 4, 5) ──────────
import { SCENARIO_CREDIT_STRUCTURATION } from "./scenarios-module3";
import { SCENARIO_ANNONCE_PARFAITE } from "./scenarios-module4";
import { SCENARIO_VISITE_CLOSING } from "./scenarios-module5";

INTERACTIVE_SCENARIOS[SCENARIO_CREDIT_STRUCTURATION.id] = SCENARIO_CREDIT_STRUCTURATION;
INTERACTIVE_SCENARIOS[SCENARIO_ANNONCE_PARFAITE.id] = SCENARIO_ANNONCE_PARFAITE;
INTERACTIVE_SCENARIOS[SCENARIO_VISITE_CLOSING.id] = SCENARIO_VISITE_CLOSING;

export function getInteractiveScenario(id: string): InteractiveScenario | null {
  return INTERACTIVE_SCENARIOS[id] ?? null;
}
