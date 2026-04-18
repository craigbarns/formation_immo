import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const { allowed } = checkRateLimit(user.id + ":save");
  if (!allowed) {
    return NextResponse.json({ error: "Trop de requêtes" }, { status: 429 });
  }

  const { role, content, moduleSlug, lessonSlug, lessonTitle } = await request.json() as {
    role: "user" | "assistant";
    content: string;
    moduleSlug?: string;
    lessonSlug?: string;
    lessonTitle?: string;
  };

  if (!role || !content) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }

  const { error } = await supabase.from("coach_messages").insert({
    user_id: user.id,
    role,
    content,
    module_slug: moduleSlug || null,
    lesson_slug: lessonSlug || null,
    lesson_title: lessonTitle || null,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
