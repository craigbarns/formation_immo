"use server";

import { createClient } from "@/lib/supabase/server";

export async function getLessonProgress() {
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

export async function setLessonCompleted(lessonKey: string, completed: boolean) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  if (completed) {
    await supabase
      .from("lesson_progress")
      .upsert({
        user_id: user.id,
        lesson_key: lessonKey,
        completed: true,
        completed_at: new Date().toISOString(),
      }, { onConflict: "user_id,lesson_key" });
  } else {
    await supabase
      .from("lesson_progress")
      .delete()
      .eq("user_id", user.id)
      .eq("lesson_key", lessonKey);
  }
}
