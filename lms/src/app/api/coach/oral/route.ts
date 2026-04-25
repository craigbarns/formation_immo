import { toErrorMessage } from "@/lib/utils/error";
import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

import { checkRateLimit } from "@/lib/rate-limit";
import { CoachRequestSchema } from "@/lib/validation";
import { verifySubscription } from "@/lib/access";

const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `Tu es Marie, examinatrice officielle de la certification ALUR (Loi Hoguet). Tu conduis un oral blanc de 5 questions pour un agent immobilier en formation.

RÈGLES STRICTES :
1. Tu poses EXACTEMENT 5 questions, une par une. Numérote-les clairement : "Question 1/5", "Question 2/5", etc.
2. Tu attends la réponse de l'élève avant de passer à la question suivante. NE JAMAIS poser plusieurs questions d'un coup.
3. Les questions doivent couvrir différents aspects : juridique, technique, éthique/professionnelle.
4. Après la 5e réponse (quand l'élève a répondu à la question 5), tu dois obligatoirement :
   - Donner un score global sur 100 points
   - Un verdict : "Validé" (≥ 60) ou "Non validé" (< 60)
   - 3 lignes de feedback constructif (points forts + axes d'amélioration)
   - Dire : "Fin de l'oral blanc. Vous pouvez repasser quand vous voulez !"
5. Si l'élève dit "stop", "fin", "résultat", ou similaire avant la question 5, termine immédiatement l'oral avec le score partiel.
6. Ne donne JAMAIS la réponse correcte avant la fin de l'oral. En cours d'oral, tu poses juste la question suivante.
7. Adapte les questions au contexte de la leçon si fourni.
8. Langage professionnel mais bienveillant.`;

function sanitizeContextNote(note: string): string {
  return note.replace(/\[CONTEXTE:/gi, "(CONTEXTE:");
}

export async function POST(request: Request) {
  // ── Auth & Subscription Check ──
  let user;
  try {
    const access = await verifySubscription();
    user = access.user;
  } catch (err) {
    return new Response(
      JSON.stringify({ error: toErrorMessage(err, "Accès refusé") }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  const { allowed } = checkRateLimit(user.id + ":oral");
  if (!allowed) {
    return new Response(
      JSON.stringify({ error: "Trop de requêtes. Réessaie dans une minute." }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Body JSON invalide" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const parse = CoachRequestSchema.safeParse(body);
  if (!parse.success) {
    return new Response(
      JSON.stringify({ error: "Payload invalide", issues: parse.error.issues }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const { messages, moduleSlug, lessonSlug, lessonTitle } = parse.data;

  const rawContext = lessonTitle
    ? `\n\n[CONTEXTE: L'élève prépare l'oral ALUR sur le thème "${lessonTitle}" (${moduleSlug}/${lessonSlug}).]`
    : "";

  const contextNote = sanitizeContextNote(rawContext);
  const recentMessages = messages.slice(-12); // un peu plus d'historique pour l'oral

  try {
    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: SYSTEM_PROMPT + contextNote,
      messages: recentMessages,
      temperature: 0.6,
    });

    return result.toTextStreamResponse();
  } catch {
    return new Response(
      JSON.stringify({ error: "Erreur oral ALUR" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
