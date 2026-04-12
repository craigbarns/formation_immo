import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };

  const expected = process.env.LMS_PASSWORD ?? "formation42";

  if (body.password === expected) {
    return NextResponse.json({
      ok: true,
      token: "demo-token-12345",
    });
  }

  return NextResponse.json(
    { error: "Mot de passe incorrect." },
    { status: 401 }
  );
}
