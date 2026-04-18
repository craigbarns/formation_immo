import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { TTSRequestSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const { allowed } = checkRateLimit(user.id + ":tts");
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

  const parse = TTSRequestSchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json(
      { error: "Payload invalide", issues: parse.error.issues },
      { status: 400 }
    );
  }

  const { text } = parse.data;

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
      const errText = await res.text().catch(() => "OpenAI TTS error");
      console.error("[TTS] OpenAI error:", res.status, errText);
      return NextResponse.json(
        { error: "Erreur synthèse vocale" },
        { status: 500 }
      );
    }

    const audioBuffer = await res.arrayBuffer();
    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": String(audioBuffer.byteLength),
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (err) {
    console.error("[TTS] Exception:", err);
    return NextResponse.json(
      { error: "Erreur serveur TTS" },
      { status: 500 }
    );
  }
}
