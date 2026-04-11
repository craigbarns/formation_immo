import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };
  
  // Password check - simple et direct
  if (body.password === "formation42") {
    return NextResponse.json({ 
      ok: true,
      token: "demo-token-12345"
    });
  }
  
  return NextResponse.json(
    { error: "Mot de passe incorrect. Essayez: formation42" }, 
    { status: 401 }
  );
}
