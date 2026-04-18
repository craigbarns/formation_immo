import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  // ── Auth ──
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  // ── Rate limit ──
  const { allowed } = checkRateLimit(user.id + ":tts");
  if (!allowed) {
    return NextResponse.json(
      { error: "Trop de requêtes. Réessaie dans une minute." },
      { status: 429 }
    );
  }

  const { text } = await request.json() as { text: string };

  if (!text || text.length > 4096) {
    return NextResponse.json({ error: "Texte invalide ou trop long" }, { status: 400 });
  }

  try {
    const res = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "tts-1",
        voice: "alloy",
        input: text,
        response_format: "mp3",
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: "Erreur TTS", detail: err }, { status: res.status });
    }

    const audioBuffer = await res.arrayBuffer();
    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": String(audioBuffer.byteLength),
      },
    });
  } catch {
    return NextResponse.json({ error: "Erreur serveur TTS" }, { status: 500 });
  }
}
