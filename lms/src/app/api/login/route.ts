import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import type { SessionData } from "iron-session";
import { sessionOptions } from "@/lib/session";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };
  const expected = process.env.LMS_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { error: "LMS_PASSWORD non configuré sur le serveur." },
      { status: 500 }
    );
  }
  if (!body.password || body.password !== expected) {
    return NextResponse.json({ error: "Mot de passe incorrect." }, { status: 401 });
  }

  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
  session.isLoggedIn = true;
  await session.save();

  return NextResponse.json({ ok: true });
}
