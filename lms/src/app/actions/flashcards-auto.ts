"use server";

import { createClient } from "@/lib/supabase/server";
import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface AutoFlashcard {
  id: string;
  front: string;
  back: string;
  moduleSlug: string;
  lessonSlug?: string;
  interval: number;
  repetitions: number;
  easeFactor: number;
  nextReview: string;
}

export async function generateFlashcardsFromMistakes(moduleSlug?: string, limit = 5) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "Non authentifié" };

  // Fetch recent wrong answers
  let query = supabase
    .from("user_answers")
    .select("question_id, module_slug, lesson_slug, question_text, selected_answer, correct_answer")
    .eq("user_id", user.id)
    .eq("is_correct", false)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (moduleSlug) query = query.eq("module_slug", moduleSlug);

  const { data: wrongAnswers, error } = await query;

  if (error || !wrongAnswers || wrongAnswers.length === 0) {
    return { success: false, error: "Aucune erreur récente à transformer" };
  }

  const prompt = `Tu es un professeur d'immobilier français expert (certification ALUR). 
À partir des erreurs de QCM ci-dessous, crée ${wrongAnswers.length} flashcards au format JSON.

Règles :
- Chaque flashcard doit reformuler la question ORIGINALE (pas la réponse erronée) pour tester la compréhension.
- Le verso donne la BONNE réponse + une explication concise (max 2 phrases).
- Le style est direct et professionnel, adapté à un agent immobilier en formation.
- Réponds UNIQUEMENT en JSON valide sans markdown.

Format attendu :
[
  { "front": "...", "back": "...", "moduleSlug": "...", "lessonSlug": "..." }
]

Erreurs :
${wrongAnswers.map((a, i) => `${i + 1}. Question : ${a.question_text}\n   Réponse erronée : ${a.selected_answer}\n   Bonne réponse : ${a.correct_answer}`).join("\n\n")}`;

  try {
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt,
      temperature: 0.6,
    });

    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (!jsonMatch) throw new Error("No JSON array found");
    const generated = JSON.parse(jsonMatch[0]) as { front: string; back: string; moduleSlug: string; lessonSlug?: string }[];

    const now = new Date().toISOString();
    const newCards: AutoFlashcard[] = generated.map((c, i) => ({
      id: `auto-${Date.now()}-${i}`,
      front: c.front,
      back: c.back,
      moduleSlug: c.moduleSlug || moduleSlug || "general",
      lessonSlug: c.lessonSlug || wrongAnswers[i]?.lesson_slug || undefined,
      interval: 1,
      repetitions: 0,
      easeFactor: 2.5,
      nextReview: now,
    }));

    // Merge into existing flashcards_sm2
    const { data: existing } = await supabase
      .from("flashcards_sm2")
      .select("cards")
      .eq("user_id", user.id)
      .single();

    const existingCards: AutoFlashcard[] = existing?.cards || [];
    const merged = [...existingCards, ...newCards];

    const { error: upsertError } = await supabase
      .from("flashcards_sm2")
      .upsert({ user_id: user.id, cards: merged, updated_at: new Date().toISOString() });

    if (upsertError) throw upsertError;

    return { success: true, count: newCards.length };
  } catch (err) {
    console.error("[generateFlashcardsFromMistakes] error:", err);
    return { success: false, error: "Erreur génération flashcards" };
  }
}
