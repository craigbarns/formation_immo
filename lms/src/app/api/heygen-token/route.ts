import { NextResponse } from "next/server";
import {
  getLiveAvatarAvatarIdForSession,
  resolveLessonContextId,
} from "@/lib/liveavatar";

/**
 * Token session LiveAvatar (SDK WebRTC @heygen/liveavatar-web-sdk).
 * API actuelle (mode FULL) : `context_id` doit être dans `avatar_persona`, pas à la racine.
 * @see https://docs.liveavatar.com/api-reference/sessions/create-session-token
 *
 * Body JSON optionnel : { "moduleSlug": "...", "lessonSlug": "..." }
 */
export async function POST(req: Request) {
  const key = process.env.LIVEAVATAR_API_KEY;
  if (!key?.trim()) {
    return NextResponse.json(
      { error: "LIVEAVATAR_API_KEY manquant dans .env.local" },
      { status: 500 },
    );
  }

  let moduleSlug: string | undefined;
  let lessonSlug: string | undefined;
  try {
    const body = (await req.json()) as { moduleSlug?: string; lessonSlug?: string };
    moduleSlug = typeof body.moduleSlug === "string" ? body.moduleSlug : undefined;
    lessonSlug = typeof body.lessonSlug === "string" ? body.lessonSlug : undefined;
  } catch {
    /* body vide ou non JSON */
  }

  const useSandbox = process.env.LIVEAVATAR_EMBED_SANDBOX !== "false";
  const contextId =
    moduleSlug && lessonSlug
      ? resolveLessonContextId(moduleSlug, lessonSlug)
      : process.env.LIVEAVATAR_ALUR_CONTEXT_ID?.trim() ?? "";

  if (!contextId) {
    return NextResponse.json(
      {
        error:
          "Contexte LiveAvatar manquant. Définissez LIVEAVATAR_ALUR_CONTEXT_ID ou LIVEAVATAR_LESSON_CONTEXTS.",
      },
      { status: 400 },
    );
  }

  const avatarId = getLiveAvatarAvatarIdForSession(useSandbox);

  const lang =
    process.env.LIVEAVATAR_DEFAULT_LANGUAGE?.trim() ||
    (useSandbox ? "multi" : "fr");

  const payload = {
    mode: "FULL" as const,
    avatar_id: avatarId,
    is_sandbox: useSandbox,
    avatar_persona: {
      context_id: contextId,
      language: lang,
    },
    interactivity_type: "CONVERSATIONAL" as const,
  };

  try {
    const res = await fetch("https://api.liveavatar.com/v1/sessions/token", {
      method: "POST",
      headers: {
        "X-API-KEY": key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = (await res.json()) as Record<string, unknown>;

    if (!res.ok) {
      return NextResponse.json(
        {
          error: "Refus API LiveAvatar",
          status: res.status,
          detail: data,
        },
        { status: res.status },
      );
    }

    /** Réponse typique : { code, data: { session_id, session_token }, message } */
    return NextResponse.json(data);
  } catch (e) {
    console.error("heygen-token:", e);
    return NextResponse.json({ error: "Erreur serveur token LiveAvatar" }, { status: 500 });
  }
}
