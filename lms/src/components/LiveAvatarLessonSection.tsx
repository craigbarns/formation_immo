import { createAlurFormationEmbed } from "@/lib/liveavatar";

/** Bloc démo LiveAvatar intégré au parcours formation — conversation guidée sur la loi ALUR. */
export async function LiveAvatarLessonSection() {
  const r = await createAlurFormationEmbed();

  if (!r.ok) {
    return (
      <div className="rounded-xl border border-amber-200/80 bg-amber-50/90 p-5 text-sm text-amber-950 shadow-sm">
        <p className="font-semibold text-amber-900">Démo LiveAvatar — configuration requise</p>
        <p className="mt-2 leading-relaxed">{r.message}</p>
        <p className="mt-3 text-xs text-amber-800/80">
          Clé API : <code className="rounded bg-white/80 px-1">LIVEAVATAR_API_KEY</code> dans{" "}
          <code className="rounded bg-white/80 px-1">.env.local</code>. Pour parler de la loi ALUR,
          créez aussi un <strong>contexte</strong> :{" "}
          <code className="rounded bg-white/80 px-1">node scripts/liveavatar-create-alur-context.mjs</code>{" "}
          puis <code className="rounded bg-white/80 px-1">LIVEAVATAR_ALUR_CONTEXT_ID</code>.{" "}
          <a
            href="https://app.liveavatar.com/developers"
            className="font-medium underline"
            target="_blank"
            rel="noreferrer"
          >
            Developers
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-zinc-500">
        L’avatar est configuré pour répondre sur la <strong>loi ALUR</strong>, mandats, diagnostics,
        annonces, etc. (formation — pas un avis juridique personnalisé). En <strong>sandbox</strong>, la
        session est courte (~1 min) et sans crédits : cliquez sur <strong>Démarrer</strong> dans le
        lecteur, acceptez le micro, puis parlez (ou saisissez du texte si un champ est visible).
      </p>
      <p className="text-xs text-zinc-600">
        <span className="font-medium text-zinc-700">Pas de réponse à la voix ?</span> Vérifiez le micro
        dans la barre d’adresse du navigateur, essayez{" "}
        <a
          href={r.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[#1a3a5c] underline underline-offset-2"
        >
          ouvrir la démo dans un nouvel onglet
        </a>{" "}
        (souvent plus fiable que l’iframe), ou définissez{" "}
        <code className="rounded bg-zinc-100 px-1">LIVEAVATAR_EMBED_SANDBOX=false</code> dans{" "}
        <code className="rounded bg-zinc-100 px-1">.env.local</code> pour une session hors sandbox
        (consomme des crédits LiveAvatar).
      </p>
      <div className="aspect-video w-full overflow-hidden rounded-xl border-2 border-[#1a3a5c]/15 bg-zinc-950 shadow-xl">
        <iframe
          src={r.url}
          title="Démo LiveAvatar — formation"
          allow="microphone; camera; autoplay"
          className="h-full w-full border-0"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
  );
}
