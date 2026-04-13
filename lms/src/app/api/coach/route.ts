import { streamText } from "ai";
import { createMistral } from "@ai-sdk/mistral";

const mistral = createMistral({ apiKey: process.env.MISTRAL_API_KEY });

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

export async function POST(request: Request) {
  const { messages, moduleSlug, lessonSlug, lessonTitle } = await request.json() as {
    messages: { role: "user" | "assistant"; content: string }[];
    moduleSlug?: string;
    lessonSlug?: string;
    lessonTitle?: string;
  };

  const contextNote = lessonTitle
    ? `\n\n[CONTEXTE: L'étudiant est en train de travailler sur la leçon "${lessonTitle}" (${moduleSlug}/${lessonSlug}). Adapte tes réponses à ce contexte.]`
    : "";

  try {
    const result = streamText({
      model: mistral("mistral-small-latest"),
      system: SYSTEM_PROMPT + contextNote,
      messages,
      maxOutputTokens: 400,
      temperature: 0.7,
    });

    return result.toTextStreamResponse();
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Erreur coach IA" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
