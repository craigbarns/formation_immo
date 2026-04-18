import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { text } = await request.json() as { text: string };

  if (!text || text.length > 4096) {
    return NextResponse.json({ error: "Texte invalide ou trop long" }, { status: 400 });
  }

  try {
    const res = await fetch("https://api.deepgram.com/v1/speak", {
      method: "POST",
      headers: {
        Authorization: `Token ${process.env.DEEPGRAM_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "aura-2",
        language: "fr",
        text,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: "Erreur TTS", detail: err }, { status: res.status });
    }

    const audioBuffer = await res.arrayBuffer();
    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/wav",
        "Content-Length": String(audioBuffer.byteLength),
      },
    });
  } catch {
    return NextResponse.json({ error: "Erreur serveur TTS" }, { status: 500 });
  }
}
