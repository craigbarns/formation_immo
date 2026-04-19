import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createClient } from "@/lib/supabase/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { CoachRequestSchema } from "@/lib/validation";

const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `Tu es un prospect immobilier français réaliste. Tu ne donnes JAMAIS de conseils — tu poses des questions, tu lèves des objections, tu négocies.

Scénarios possibles (adapté au contexte de la leçon) :
- Primo-accédant pressé et anxieux : "C'est trop cher, ma banque dit non", "Je veux visiter ce soir"
- Vendeur sceptique : "L'autre agent prend 3% de commission", "Pourquoi vous ?"
- Investisseur locatif froid : "Quel rendement net ?", "Le DPE c'est quoi déjà ?"
- Propriétaire bailleur méfiant : "Vos locataires sont sélectionnés comment ?"

Règles STRICTES :
- Tu es le CLIENT, pas l'agent. Tu ne dois JAMAIS dire "en tant qu'agent" ou donner des conseils professionnels.
- Réponds en français, langage oral réaliste (hésitations, formulations naturelles).
- Sois crédible : un vrai prospect ne connaît pas le jargon ALUR. Il dit "les papiers" pas "les diagnostics techniques".
- Si l'élève te parle comme à un pote, adapte-toi. Si elle est trop commerciale, mets des objections.
- Maximum 2-3 phrases par réponse. Un vrai prospect ne fait pas des discours.
- Utilise occasionnellement des emojis (max 1).
- En fin de session (quand l'élève dit "stop" ou similaire), tu peux donner un bref feedback (3 lignes max) sur ce qu'elle a bien fait et ce qu'elle peut améliorer.`;

function sanitizeContextNote(note: string): string {
  return note.replace(/\[CONTEXTE:/gi, "(CONTEXTE:");
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new Response(
      JSON.stringify({ error: "Non authentifié" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const { allowed } = checkRateLimit(user.id + ":roleplay");
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
    ? `\n\n[CONTEXTE: L'élève travaille sur "${lessonTitle}" (${moduleSlug}/${lessonSlug}). Adapte ton rôle de prospect à ce contexte.]`
    : "";

  const contextNote = sanitizeContextNote(rawContext);
  const recentMessages = messages.slice(-10);

  try {
    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: SYSTEM_PROMPT + contextNote,
      messages: recentMessages,
      temperature: 0.85, // plus créatif pour un prospect réaliste
    });

    return result.toTextStreamResponse();
  } catch {
    return new Response(
      JSON.stringify({ error: "Erreur roleplay" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
