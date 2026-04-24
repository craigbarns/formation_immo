"use server";

import { createClient } from "@/lib/supabase/server";

export async function logConnectionSession(data: {
  startedAt: string;
  durationSeconds: number;
  moduleSlug?: string;
  lessonSlug?: string;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "Non authentifié" };

  const { error } = await supabase.from("connection_logs").insert({
    user_id: user.id,
    email: user.email,
    started_at: data.startedAt,
    ended_at: new Date().toISOString(),
    duration_seconds: data.durationSeconds,
    module_slug: data.moduleSlug,
    lesson_slug: data.lessonSlug,
  });

  if (error) {
    console.error("Error logging session:", error);
    return { error: error.message };
  }

  return { success: true };
}
