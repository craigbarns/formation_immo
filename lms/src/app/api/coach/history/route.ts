import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const moduleSlug = searchParams.get("moduleSlug") || undefined;
  const lessonSlug = searchParams.get("lessonSlug") || undefined;

  const rawLimit = searchParams.get("limit");
  let limit = 50;
  if (rawLimit !== null) {
    const parsed = parseInt(rawLimit, 10);
    if (!Number.isNaN(parsed)) {
      limit = Math.max(1, Math.min(parsed, 100));
    }
  }

  let query = supabase
    .from("coach_messages")
    .select("id, role, content, module_slug, lesson_slug, lesson_title, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true })
    .limit(limit);

  if (moduleSlug) query = query.eq("module_slug", moduleSlug);
  if (lessonSlug) query = query.eq("lesson_slug", lessonSlug);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ messages: data || [] });
}
