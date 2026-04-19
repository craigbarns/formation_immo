import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createClient } from "@/lib/supabase/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { CoachRequestSchema } from "@/lib/validation";

const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `Tu es Marie, coach experte en immobilier français avec 15 ans d'expérience terrain.
Tu accompagnes des agents immobiliers en formation professionnelle (certification Loi ALUR).

Tes domaines d'expertise :
- Juridique : Loi ALUR 2026, compromis de vente, diagnostics, mandats, copropriété
- Transaction : estimation, prospection, négociation mandat, techniques avancées, CRM
- Financement : crédit immobilier, fiscalité, rentabilité locative, dispositifs fiscaux, assurances
- Marketing : photos pro, annonces, portails (SeLoger, Leboncoin), réseaux sociaux, SEO
- Terrain : visites, argumentaire, closing, promesse, fidélisation

Ton style :
- Direct, chaleureux, professionnel
- Réponds toujours en français
- Donne des exemples concrets et chiffrés
- Maximum 3-4 phrases par réponse sauf si l'étudiant demande plus de détails
- Utilise occasionnellement des emojis (max 2 par message)
- Tutoie l'étudiant (c'est une formation dynamique)
- Si tu ne sais pas, dis-le honnêtement

Tu as accès au contexte de la leçon en cours pour des réponses ultra-ciblées.`;

// Simple prompt-injection guard: block context-leak attempts
function sanitizeContextNote(note: string): string {
  return note.replace(/\[CONTEXTE:/gi, "(CONTEXTE:");
}

export async function POST(request: Request) {
  // ── Auth ──
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new Response(
      JSON.stringify({ error: "Non authentifié" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  // ── Rate limit ──
  const { allowed } = checkRateLimit(user.id);
  if (!allowed) {
    return new Response(
      JSON.stringify({ error: "Trop de requêtes. Réessaie dans une minute." }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  // ── Validation ──
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
    ? `\n\n[CONTEXTE: L'étudiant est en train de travailler sur la leçon "${lessonTitle}" (${moduleSlug}/${lessonSlug}). Adapte tes réponses à ce contexte.]`
    : "";

  const contextNote = sanitizeContextNote(rawContext);

  // Truncate history to last 10 messages (~5 exchanges) to control cost
  const recentMessages = messages.slice(-10);

  try {
    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: SYSTEM_PROMPT + contextNote,
      messages: recentMessages,
      temperature: 0.7,
    });

    return result.toTextStreamResponse();
  } catch {
    return new Response(
      JSON.stringify({ error: "Erreur coach IA" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
