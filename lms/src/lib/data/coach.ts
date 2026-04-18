import { createClient } from "@/lib/supabase/server";

export interface CoachMessage {
  id: string;
  user_id: string;
  role: "user" | "assistant";
  content: string;
  module_slug: string | null;
  lesson_slug: string | null;
  lesson_title: string | null;
  created_at: string;
}

export async function getCoachHistory(moduleSlug?: string, lessonSlug?: string, limit = 50): Promise<CoachMessage[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  let query = supabase
    .from("coach_messages")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true })
    .limit(limit);

  if (moduleSlug) query = query.eq("module_slug", moduleSlug);
  if (lessonSlug) query = query.eq("lesson_slug", lessonSlug);

  const { data, error } = await query;
  if (error) {
    console.error("getCoachHistory error:", error);
    return [];
  }
  return (data as CoachMessage[]) || [];
}

export async function saveCoachMessage(
  role: "user" | "assistant",
  content: string,
  moduleSlug?: string,
  lessonSlug?: string,
  lessonTitle?: string
): Promise<void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { error } = await supabase.from("coach_messages").insert({
    user_id: user.id,
    role,
    content,
    module_slug: moduleSlug || null,
    lesson_slug: lessonSlug || null,
    lesson_title: lessonTitle || null,
  });

  if (error) {
    console.error("saveCoachMessage error:", error);
  }
}

export async function clearCoachHistory(moduleSlug?: string, lessonSlug?: string): Promise<void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  let query = supabase.from("coach_messages").delete().eq("user_id", user.id);
  if (moduleSlug) query = query.eq("module_slug", moduleSlug);
  if (lessonSlug) query = query.eq("lesson_slug", lessonSlug);

  const { error } = await query;
  if (error) {
    console.error("clearCoachHistory error:", error);
  }
}
