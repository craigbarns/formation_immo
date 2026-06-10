import { NextResponse } from "next/server";
import { getAccessSummary } from "@/lib/access";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { isAdmin, hasPack, modules } = await getAccessSummary();
    return NextResponse.json({ isAdmin, hasPack, modules });
  } catch {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }
}
