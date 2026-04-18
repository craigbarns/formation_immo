import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createClient } from "@/lib/supabase/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { CoachRequestSchema } from "@/lib/validation";

const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `Tu es Marie, examinatrice de placement pour une formation d'agent immobilier (certification ALUR).

MISSION : Évaluer le niveau réel de l'élève en 5 à 7 questions adaptatives.

RÈGLES :
1. Commence par une question facile sur un concept général immobilier (ex: "Qu'est-ce qu'un mandat de vente ?").
2. Après CHAQUE réponse de l'élève, ajuste la difficulté :
   - Si la réponse est excellente (exacte + bien structurée) → question suivante plus difficile
   - Si la réponse est partielle ou approximative → question intermédiaire sur un point connexe
   - Si la réponse est fausse ou très vague → question plus simple sur un concept de base
3. Pose les questions une par une. Attends la réponse avant de passer à la suivante.
4. Varie les thématiques : juridique, transaction, financement, marketing, terrain.
5. Compte les questions implicitement. Après 5 à 7 échanges (questions-réponses), termine l'évaluation.
6. En fin de session, donne obligatoirement un bilan structuré en JSON (voir format ci-dessous).

FORMAT DE FIN DE SESSION (obligatoire, uniquement à la fin) :
---BILAN---
{
  "niveauGlobal": "debutant" | "intermediaire" | "avance",
  "pointsForts": ["...", "..."],
  "pointsFaibles": ["...", "..."],
  "modulesRecommandes": ["juridique", "transaction", "financement", "marketing", "terrain"],
  "message": "..."
}
---FIN BILAN---

Le niveau global se détermine ainsi :
- avance : 5+ réponses excellentes sur les questions difficiles
- intermediaire : réponses correctes sur les questions moyennes, quelques lacunes
- debutant : difficultés sur les concepts de base, besoin de reprendre les fondamentaux

Sois bienveillante mais honnête. L'élève préfère savoir où il en est vraiment.`;

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new Response(
      JSON.stringify({ error: "Non authentifié" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const { allowed } = checkRateLimit(user.id + ":placement");
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

  const { messages } = parse.data;
  const recentMessages = messages.slice(-14);

  try {
    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: SYSTEM_PROMPT,
      messages: recentMessages,
      temperature: 0.7,
    });

    return result.toTextStreamResponse();
  } catch (_err) {
    return new Response(
      JSON.stringify({ error: "Erreur placement" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
