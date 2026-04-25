import { toErrorMessage } from "@/lib/utils/error";
import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

import { checkRateLimit } from "@/lib/rate-limit";
import { CoachRequestSchema } from "@/lib/validation";
import { verifySubscription } from "@/lib/access";

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
  // ── Environment Check ──
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error("[Marie Coach] Missing OPENAI_API_KEY in environment");
    return new Response(
      JSON.stringify({ error: "Configuration API manquante" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const openai = createOpenAI({ apiKey });

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

  // ── Rate limit ──
  const { allowed } = await checkRateLimit(user.id);
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

  // Identify and strictly restrict to Real Estate context
  const STRICT_IDENTITY_NOTE = `\n\nIMPORTANT: Tu es EXCLUSIVEMENT une coach IMMOBILIER pour la formation "Formation 42h". 
Si l'historique contient des messages sur d'autres sujets (comptabilité, ConfiDoc, tests OCR, etc.), IGNORE-LES COMPLÈTEMENT. 
Ne réponds JAMAIS sur des sujets techniques de développement logiciel ou d'IA comptable.
Focalise-toi uniquement sur l'immobilier français et la Loi ALUR.`;

  const rawContext = lessonTitle
    ? `\n\n[CONTEXTE: L'étudiant est en train de travailler sur la leçon "${lessonTitle}" (${moduleSlug}/${lessonSlug}). Adapte tes réponses à ce contexte.]`
    : "";

  const contextNote = sanitizeContextNote(STRICT_IDENTITY_NOTE + rawContext);

  // Truncate history to last 10 messages (~5 exchanges) to control cost and avoid history contamination
  const recentMessages = messages.slice(-10);

  try {
    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: SYSTEM_PROMPT + contextNote,
      messages: recentMessages,
      temperature: 0.7,
    });

    return result.toTextStreamResponse();
  } catch (err) {
    console.error("[Marie Coach] Stream Error:", err);
    return new Response(
      JSON.stringify({ error: "Erreur coach IA" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
