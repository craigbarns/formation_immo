"use server";

import { createClient } from "@/lib/supabase/server";

export async function getLessonProgress(): Promise<Record<string, boolean>> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return {};

  const { data } = await supabase
    .from("lesson_progress")
    .select("lesson_key, completed")
    .eq("user_id", user.id);

  const result: Record<string, boolean> = {};
  data?.forEach((row) => {
    result[row.lesson_key] = row.completed;
  });
  return result;
}

export async function isLessonCompleted(lessonKey: string): Promise<boolean> {
  const progress = await getLessonProgress();
  return !!progress[lessonKey];
}

export async function getCompletedCount(): Promise<number> {
  const progress = await getLessonProgress();
  return Object.values(progress).filter(Boolean).length;
}
