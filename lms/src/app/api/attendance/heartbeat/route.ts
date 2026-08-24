import { NextResponse } from "next/server";
import { attendanceBatchSchema } from "@/lib/attendance";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const rawBody = await request.text();
  if (rawBody.length > 50_000) {
    return NextResponse.json({ error: "Charge utile trop volumineuse" }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "JSON invalide" }, { status: 400 });
  }

  const parsed = attendanceBatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Événements d'assiduité invalides" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const { data, error } = await supabase.rpc("record_attendance_events", {
    p_events: parsed.data.events,
  });

  if (error) {
    console.error("[attendance] Échec d'enregistrement", error);
    return NextResponse.json({ error: "Assiduité temporairement indisponible" }, { status: 503 });
  }

  return NextResponse.json(
    { accepted: typeof data === "number" ? data : 0 },
    { headers: { "Cache-Control": "no-store" } },
  );
}
