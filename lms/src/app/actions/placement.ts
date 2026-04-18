"use server";

import { createClient } from "@/lib/supabase/server";

export async function savePlacementResult(data: {
  level: "debutant" | "intermediaire" | "avance";
  percentage: number;
  moduleScores?: Record<string, { correct: number; total: number }>;
  weakModules?: string[];
  strongModules?: string[];
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "Non authentifié" };

  const { error } = await supabase.from("placement_results").upsert({
    user_id: user.id,
    score: Math.round(data.percentage),
    total_questions: 7,
    percentage: data.percentage,
    level: data.level,
    module_scores: data.moduleScores || {},
    weak_modules: data.weakModules || [],
    strong_modules: data.strongModules || [],
    answers: {},
    created_at: new Date().toISOString(),
  }, { onConflict: "user_id" });

  if (error) {
    console.error("[savePlacementResult] error:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}
