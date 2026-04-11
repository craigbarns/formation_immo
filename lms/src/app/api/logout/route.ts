import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import type { SessionData } from "iron-session";
import { sessionOptions } from "@/lib/session";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
  session.destroy();
  await session.save();
  const url = new URL("/", request.url);
  return NextResponse.redirect(url);
}
