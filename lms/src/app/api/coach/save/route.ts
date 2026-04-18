import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { SaveMessageSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const { allowed } = checkRateLimit(user.id + ":save");
  if (!allowed) {
    return NextResponse.json(
      { error: "Trop de requêtes. Réessaie dans une minute." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body JSON invalide" }, { status: 400 });
  }

  const parse = SaveMessageSchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json(
      { error: "Payload invalide", issues: parse.error.issues },
      { status: 400 }
    );
  }

  const { role, content, moduleSlug, lessonSlug, lessonTitle } = parse.data;

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
