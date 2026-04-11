/**
 * Textes pédagogiques pour la chaîne de production : scripts vocaux → TTS → D-ID.
 * - scriptBeats : phrases / prompts à enregistrer ou à coller dans l’outil TTS puis D-ID.
 * - suggestedQuestions : idées de reformulation ou de Q/R pour le coach texte (FrenchCoach).
 *
 * @see docs/D-ID-INTEGRATION.md
 */

export type LessonScriptBeat = {
  id: string;
  /** Libellé court (bouton / repère en studio) */
  label: string;
  /** Texte lu par la voix sur la vidéo avatar */
  text: string;
};

export type LessonAvatarInteractive = {
  tagline: string;
  suggestedQuestions: string[];
  scriptBeats?: LessonScriptBeat[];
};

const BY_KEY: Record<string, LessonAvatarInteractive> = {
  "juridique/loi-alur": {
    tagline:
      "Renforcez la leçon : enregistrez des beats courts avec la même voix que vos vidéos D-ID, ou utilisez le coach texte pour approfondir.",
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
      "Entraînez-vous sur le compromis : enchaînez des segments courts pour D-ID, ou posez vos questions au coach.",
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
      "Simulez un pitch mandat exclusif : chaque beat peut devenir un plan D-ID, puis enchaînez dans votre monteur.",
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
      "Calculs et vocabulaire rentabilité : segments courts pour vidéos, ou questions au coach pour les cas limites.",
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

export function getLessonAvatarInteractive(
  moduleSlug: string,
  lessonSlug: string,
): LessonAvatarInteractive | null {
  return BY_KEY[`${moduleSlug}/${lessonSlug}`] ?? null;
}
