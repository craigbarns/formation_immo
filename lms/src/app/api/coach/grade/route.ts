import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

import { checkRateLimit } from "@/lib/rate-limit";
import { z } from "zod";
import { verifySubscription } from "@/lib/access";

const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });

const GradeRequestSchema = z.object({
  question: z.string().min(1),
  userAnswer: z.string().min(1).max(2000),
  modelAnswer: z.string().min(1),
});

const RUBRIC = `Tu es un examinateur de la certification ALUR. Évalue la réponse de l'élève selon cette rubrique sur 100 points :

- Exactitude juridique (0-40) : la réponse contient-elle les éléments juridiques corrects ?
- Clarté et structure (0-30) : la réponse est-elle bien organisée et compréhensible ?
- Exemples concrets (0-20) : l'élève illustre-t-il avec des exemples de terrain ?
- Langage professionnel (0-10) : le vocabulaire est-il adapté à un agent immobilier ?

Règles :
- Sois exigeant mais juste.
- Une réponse partielle mais correcte vaut 50+.
- Une réponse vide ou hors-sujet vaut 0.
- Réponds UNIQUEMENT en JSON valide sans markdown.

Format attendu :
{
  "score": 72,
  "feedback": "...",
  "strengths": "...",
  "improvements": "..."
}`;

export async function POST(request: Request) {
  // ── Auth & Subscription Check ──
  let user;
  try {
    const access = await verifySubscription();
    user = access.user;
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || "Accès refusé" }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  const { allowed } = checkRateLimit(user.id + ":grade");
  if (!allowed) {
    return new Response(JSON.stringify({ error: "Trop de requêtes" }), { status: 429, headers: { "Content-Type": "application/json" } });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Body JSON invalide" }), { status: 400, headers: { "Content-Type": "application/json" } });
  }

  const parse = GradeRequestSchema.safeParse(body);
  if (!parse.success) {
    return new Response(JSON.stringify({ error: "Payload invalide", issues: parse.error.issues }), { status: 400, headers: { "Content-Type": "application/json" } });
  }

  const { question, userAnswer, modelAnswer } = parse.data;

  const prompt = `${RUBRIC}\n\nQuestion : ${question}\n\nRéponse modèle : ${modelAnswer}\n\nRéponse de l'élève : ${userAnswer}\n\nÉvalue et renvoie le JSON.`;

  try {
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt,
      temperature: 0.3,
    });

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON object found");
    const result = JSON.parse(jsonMatch[0]);

    return new Response(JSON.stringify(result), { headers: { "Content-Type": "application/json" } });
  } catch {
    return new Response(JSON.stringify({ error: "Erreur notation" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
