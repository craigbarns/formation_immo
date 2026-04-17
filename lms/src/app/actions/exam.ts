"use server";

import { createClient } from "@/lib/supabase/server";

export interface ExamResult {
  id: string;
  moduleSlug: string;
  score: number;
  total: number;
  takenAt: string;
}

export async function getExamResults(): Promise<ExamResult[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("exam_results")
    .select("*")
    .eq("user_id", user.id)
    .order("taken_at", { ascending: false });

  return (data || []).map((r) => ({
    id: r.id,
    moduleSlug: r.module_slug,
    score: r.score,
    total: r.total,
    takenAt: r.taken_at,
  }));
}

export async function saveExamResult(moduleSlug: string, score: number, total: number) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from("exam_results")
    .insert({
      user_id: user.id,
      module_slug: moduleSlug,
      score,
      total,
      taken_at: new Date().toISOString(),
    });
}
