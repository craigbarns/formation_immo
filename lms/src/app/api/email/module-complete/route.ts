import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendModuleCompletionEmail, sendCertificationEmail } from "@/lib/email/resend";
import { z } from "zod";

const Schema = z.object({
  moduleTitle: z.string(),
  moduleNumber: z.number().int().min(1).max(5),
  xp: z.number().int().min(0),
  isCertification: z.boolean().optional().default(false),
});

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  let body: unknown;
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: "Body invalide" }, { status: 400 });
  }

  const parse = Schema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ error: "Payload invalide" }, { status: 400 });
  }

  const { moduleTitle, moduleNumber, xp, isCertification } = parse.data;

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const name = profile?.full_name ?? undefined;

  if (isCertification) {
    await sendCertificationEmail(user.email, name);
  } else {
    await sendModuleCompletionEmail(user.email, name, moduleTitle, moduleNumber, xp);
  }

  return NextResponse.json({ sent: true });
}
