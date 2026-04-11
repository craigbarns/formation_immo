/**
 * Contenu interactif HeyGen / LiveAvatar par leçon (embed conversationnel uniquement).
 * - suggestedQuestions : idées à copier-coller dans le chat de l’iframe.
 * - scriptBeats : optionnel, réservé pour une éventuelle réutilisation (non affiché dans l’UI).
 *
 * Contextes par leçon (optionnel) : `LIVEAVATAR_LESSON_CONTEXTS` dans `.env.local`.
 */

export type HeyGenScriptBeat = {
  id: string;
  /** Libellé court du bouton */
  label: string;
  /** Texte prononcé par l’avatar (mode repeat) */
  text: string;
};

export type HeyGenLessonInteractive = {
  /** Résumé pédagogique affiché au-dessus du bloc */
  tagline: string;
  /** Questions types pour le chat vocal / texte (iframe) */
  suggestedQuestions: string[];
  /** Non utilisé par l’interface actuelle */
  scriptBeats?: HeyGenScriptBeat[];
};

const BY_KEY: Record<string, HeyGenLessonInteractive> = {
  "juridique/loi-alur": {
    tagline:
      "Renforcez la leçon : faites résumer les points clés par l’avatar, puis dialoguez sur vos cas réels.",
    scriptBeats: [
      {
        id: "alur-1",
        label: "Rappel carte T",
        text: "En trois phrases : pourquoi la carte T est obligatoire pour la transaction immobilière en France ?",
      },
      {
        id: "alur-2",
        label: "Formation continue",
        text: "Résume les exigences de formation continue pour un agent immobilier depuis la loi ALUR.",
      },
      {
        id: "alur-3",
        label: "Transparence honoraires",
        text: "Explique comment les honoraires doivent être affichés sur une annonce conforme.",
      },
    ],
    suggestedQuestions: [
      "Quelle différence entre mandat simple et mandat exclusif pour l’affichage des honoraires ?",
      "Un agent peut-il exercer sans garantie financière si la carte T est à jour ?",
      "Quels risques si l’annonce ne mentionne pas clairement les honoraires à la charge de l’acquéreur ?",
    ],
  },

  "juridique/compromis": {
    tagline:
      "Entraînez-vous sur le compromis : récap express puis questions sur délais et conditions suspensives.",
    scriptBeats: [
      {
        id: "comp-1",
        label: "Délai de rétractation",
        text: "Quelle est la durée du délai de rétractation de l’acquéreur après un compromis, et à partir de quand court-il ?",
      },
      {
        id: "comp-2",
        label: "Condition suspensive prêt",
        text: "En deux phrases : que se passe-t-il si la condition suspensive de prêt n’est pas levée dans les délais ?",
      },
    ],
    suggestedQuestions: [
      "Peut-on prévoir une pénalité si l’acheteur se rétracte après le délai légal ?",
      "Comment formuler une condition suspensive d’obtention de prêt de façon sécurisée ?",
    ],
  },

  "transaction/negociation-mandat": {
    tagline:
      "Simulez un pitch mandat exclusif : l’avatar reformule les arguments, vous affinez en conversation.",
    scriptBeats: [
      {
        id: "nm-1",
        label: "Argument exclusif",
        text: "Donne trois arguments concrets pour convaincre un vendeur de signer un mandat exclusif plutôt qu’un mandat simple.",
      },
      {
        id: "nm-2",
        label: "Objection prix",
        text: "Comment répondre calmement à un vendeur qui veut surévaluer son bien pour le mandat ?",
      },
    ],
    suggestedQuestions: [
      "Comment présenter le barème d’honoraires sans perdre la confiance du vendeur ?",
      "Quels indicateurs montrer pour justifier une stratégie de baisse de prix après 30 jours ?",
    ],
  },

  "financement/rentabilite": {
    tagline:
      "Calculs et vocabulaire rentabilité : l’avatar vous pose le cadre avant vos questions chiffrées.",
    scriptBeats: [
      {
        id: "rent-1",
        label: "Définitions",
        text: "Explique la différence entre rentabilité brute, nette et nette-nette pour un investisseur locatif.",
      },
      {
        id: "rent-2",
        label: "Formule brute",
        text: "Donne la formule simple de la rentabilité brute à partir du loyer annuel et du prix d’achat.",
      },
    ],
    suggestedQuestions: [
      "Faut-il intégrer les frais de notaire dans le prix pour le calcul de rentabilité ?",
      "Comment intégrer la vacance locative dans une projection réaliste ?",
    ],
  },
};

export function getHeyGenInteractive(
  moduleSlug: string,
  lessonSlug: string,
): HeyGenLessonInteractive | null {
  return BY_KEY[`${moduleSlug}/${lessonSlug}`] ?? null;
}
