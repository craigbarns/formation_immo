"use server";

import { createClient } from "@/lib/supabase/server";

export interface UserAnswerInput {
  questionId: string;
  moduleSlug: string;
  lessonSlug?: string;
  questionText: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  timeSpentSeconds?: number;
  source: "exam" | "quiz";
}

export async function saveUserAnswers(answers: UserAnswerInput[]) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || answers.length === 0) return { success: false };

  const rows = answers.map((a) => ({
    user_id: user.id,
    question_id: a.questionId,
    module_slug: a.moduleSlug,
    lesson_slug: a.lessonSlug || null,
    question_text: a.questionText,
    selected_answer: a.selectedAnswer,
    correct_answer: a.correctAnswer,
    is_correct: a.isCorrect,
    time_spent_seconds: a.timeSpentSeconds ?? null,
    source: a.source,
  }));

  const { error } = await supabase.from("user_answers").insert(rows);

  if (error) {
    console.error("[saveUserAnswers] error:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function getWrongAnswers(moduleSlug?: string, limit = 20) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { answers: [] };

  let query = supabase
    .from("user_answers")
    .select("question_id, module_slug, lesson_slug, question_text, selected_answer, correct_answer, created_at")
    .eq("user_id", user.id)
    .eq("is_correct", false)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (moduleSlug) query = query.eq("module_slug", moduleSlug);

  const { data, error } = await query;

  if (error) {
    console.error("[getWrongAnswers] error:", error.message);
    return { answers: [] };
  }

  return { answers: data || [] };
}
