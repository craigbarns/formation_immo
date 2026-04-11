/**
 * LiveAvatar (HeyGen) — https://docs.liveavatar.com/
 * Clé : app.liveavatar.com → Developers (header X-API-KEY).
 *
 * Pour discuter avec l’avatar **sur la loi ALUR**, il faut un **Context** dédié (prompt + accueil).
 * Création : `node scripts/liveavatar-create-alur-context.mjs` puis `LIVEAVATAR_ALUR_CONTEXT_ID` dans `.env.local`.
 */

export type LiveAvatarEmbedResult =
  | { ok: true; url: string; script: string }
  | { ok: false; message: string; code?: number };

/** Avatar démo public (doc LiveAvatar quickstart). */
const DEFAULT_AVATAR_ID = "65f9e3c9-d48b-4118-b73a-4ae2e3cbb8f0";
/**
 * En mode sandbox, la doc LiveAvatar n’expose qu’un avatar (Wayne). Utiliser un autre ID peut
 * casser la conversation vocale ou la session (~1 min).
 * @see https://docs.liveavatar.com/docs/sandbox-mode
 */
const SANDBOX_AVATAR_ID = "dd73ea75-1218-4ef3-92ce-606d5f7fbc0a";
/** Contexte générique quickstart (sans prompt ALUR). */
const DEFAULT_CONTEXT_ID = "158f5d55-2d4f-11f1-8d28-066a7fa2e369";

function resolveAvatarId(isSandbox: boolean): string {
  if (process.env.LIVEAVATAR_AVATAR_ID) {
    return process.env.LIVEAVATAR_AVATAR_ID;
  }
  return isSandbox ? SANDBOX_AVATAR_ID : DEFAULT_AVATAR_ID;
}

/** Même logique que l’embed / le token API session (sandbox vs prod). */
export function getLiveAvatarAvatarIdForSession(isSandbox: boolean): string {
  return resolveAvatarId(isSandbox);
}

/**
 * Contexte HeyGen/LiveAvatar pour une leçon : surcharge via JSON d’env, sinon contexte ALUR global.
 * `LIVEAVATAR_LESSON_CONTEXTS` = '{"juridique/loi-alur":"<uuid>","financement/rentabilite":"<uuid>"}'
 */
export function resolveLessonContextId(moduleSlug: string, lessonSlug: string): string {
  const key = `${moduleSlug}/${lessonSlug}`;
  const raw = process.env.LIVEAVATAR_LESSON_CONTEXTS?.trim();
  if (raw) {
    try {
      const map = JSON.parse(raw) as Record<string, string>;
      const id = map[key]?.trim();
      if (id) return id;
    } catch {
      /* ignore invalid JSON */
    }
  }
  return process.env.LIVEAVATAR_ALUR_CONTEXT_ID?.trim() ?? "";
}

/**
 * URL d’embed conversationnel pour une leçon (iframe). Réutilise le contexte ALUR ou un contexte par leçon.
 */
export async function createFormationLessonEmbed(
  moduleSlug: string,
  lessonSlug: string,
): Promise<LiveAvatarEmbedResult> {
  const contextId = resolveLessonContextId(moduleSlug, lessonSlug);
  if (!contextId) {
    return {
      ok: false,
      message:
        "Contexte LiveAvatar manquant. Ajoutez LIVEAVATAR_ALUR_CONTEXT_ID ou des entrées dans LIVEAVATAR_LESSON_CONTEXTS (.env.local).",
    };
  }

  const useSandbox = process.env.LIVEAVATAR_EMBED_SANDBOX !== "false";

  const body: Record<string, unknown> = {
    avatar_id: resolveAvatarId(useSandbox),
    context_id: contextId,
    is_sandbox: useSandbox,
  };

  const lang = process.env.LIVEAVATAR_DEFAULT_LANGUAGE?.trim();
  if (lang) {
    body.default_language = lang;
  } else if (useSandbox) {
    body.default_language = "multi";
  } else {
    body.default_language = "fr";
  }

  return postEmbedding(body);
}

async function postEmbedding(body: Record<string, unknown>): Promise<LiveAvatarEmbedResult> {
  const key = process.env.LIVEAVATAR_API_KEY;
  if (!key) {
    return { ok: false, message: "LIVEAVATAR_API_KEY manquant dans .env.local" };
  }

  const res = await fetch("https://api.liveavatar.com/v2/embeddings", {
    method: "POST",
    headers: {
      "X-API-KEY": key,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const json = (await res.json()) as {
    code?: number;
    message?: string;
    data?: { url: string; script: string };
  };

  if (json.code === 1000 && json.data?.url) {
    return { ok: true, url: json.data.url, script: json.data.script };
  }

  return {
    ok: false,
    message: json.message ?? res.statusText,
    code: json.code,
  };
}

/** Embed générique (démo doc), sandbox. */
export async function createSandboxEmbed(): Promise<LiveAvatarEmbedResult> {
  return postEmbedding({
    avatar_id: resolveAvatarId(true),
    context_id: process.env.LIVEAVATAR_CONTEXT_ID ?? DEFAULT_CONTEXT_ID,
    is_sandbox: true,
  });
}

/**
 * Embed **formation Loi ALUR** : avatar + contexte pédagogique (conversation sur ALUR, mandats, diagnostics…).
 * Nécessite `LIVEAVATAR_ALUR_CONTEXT_ID` (créé une fois via le script du repo).
 */
export async function createAlurFormationEmbed(): Promise<LiveAvatarEmbedResult> {
  const alurContext = process.env.LIVEAVATAR_ALUR_CONTEXT_ID;
  if (!alurContext) {
    return {
      ok: false,
      message:
        "Contexte ALUR manquant. Dans le dossier lms/, exécutez : node scripts/liveavatar-create-alur-context.mjs puis ajoutez LIVEAVATAR_ALUR_CONTEXT_ID dans .env.local (voir README).",
    };
  }

  const useSandbox = process.env.LIVEAVATAR_EMBED_SANDBOX !== "false";

  const body: Record<string, unknown> = {
    avatar_id: resolveAvatarId(useSandbox),
    context_id: alurContext,
    is_sandbox: useSandbox,
  };

  const lang = process.env.LIVEAVATAR_DEFAULT_LANGUAGE?.trim();
  if (lang) {
    body.default_language = lang;
  } else if (useSandbox) {
    /** Sans langue explicite, certains navigateurs / pipelines STT se comportent mieux avec multi. */
    body.default_language = "multi";
  } else {
    body.default_language = "fr";
  }

  return postEmbedding(body);
}

/**
 * Embed **Coach Femme Française (Marie)** : avatar féminin + contexte strictement français
 * Nécessite `LIVEAVATAR_FRENCH_WOMAN_CONTEXT_ID` (créé via le script liveavatar-create-french-woman-context.mjs)
 */
export async function createFrenchWomanCoachEmbed(): Promise<LiveAvatarEmbedResult> {
  const frenchWomanContext = process.env.LIVEAVATAR_FRENCH_WOMAN_CONTEXT_ID;
  if (!frenchWomanContext) {
    return {
      ok: false,
      message:
        "Contexte Coach Femme Française manquant. Dans le dossier lms/, exécutez : node scripts/liveavatar-create-french-woman-context.mjs puis ajoutez LIVEAVATAR_FRENCH_WOMAN_CONTEXT_ID dans .env.local",
    };
  }

  const useSandbox = process.env.LIVEAVATAR_EMBED_SANDBOX !== "false";

  const body: Record<string, unknown> = {
    avatar_id: resolveAvatarId(useSandbox),
    context_id: frenchWomanContext,
    is_sandbox: useSandbox,
    default_language: "fr", // FORCER le français
    voice: {
      voice_id: "female-french",
      language: "fr"
    }
  };

  return postEmbedding(body);
}
