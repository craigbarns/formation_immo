import { NextResponse } from "next/server";

export async function POST(request: Request) {
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
