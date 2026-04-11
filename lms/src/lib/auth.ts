import { cookies } from "next/headers";
import type { SessionData } from "iron-session";
import { getIronSession } from "iron-session";
import { sessionOptions } from "./session";

export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}
