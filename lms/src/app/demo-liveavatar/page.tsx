import Link from "next/link";
import { createAlurFormationEmbed } from "@/lib/liveavatar";

export const metadata = {
  title: "Démo LiveAvatar — Loi ALUR (sandbox)",
};

export default async function DemoLiveAvatarPage() {
  const result = await createAlurFormationEmbed();

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-10 text-zinc-100">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm text-amber-400/90">
          Sandbox — pas de crédits consommés (voir docs LiveAvatar).
        </p>
        <h1 className="mt-2 text-2xl font-bold text-white">LiveAvatar — loi ALUR</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Même embed que la leçon <strong>Loi ALUR</strong> : conversation guidée sur ALUR, mandats,
          diagnostics (formation). Clé sur <code className="text-zinc-300">api.liveavatar.com</code>.
        </p>

        {!result.ok ? (
          <div className="mt-8 rounded-lg border border-red-500/40 bg-red-950/40 p-4 text-red-200">
            <p className="font-medium">Impossible de charger l’embed</p>
            <p className="mt-1 text-sm">{result.message}</p>
            <p className="mt-4 text-sm text-zinc-500">
              Ajoutez <code className="text-zinc-300">LIVEAVATAR_API_KEY</code> et{" "}
              <code className="text-zinc-300">LIVEAVATAR_ALUR_CONTEXT_ID</code> (voir{" "}
              <code className="text-zinc-300">scripts/liveavatar-create-alur-context.mjs</code>) dans{" "}
              <code className="text-zinc-300">lms/.env.local</code>, puis redémarrez{" "}
              <code className="text-zinc-300">npm run dev</code>.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            <p className="text-sm text-zinc-400">
              Cliquez sur <strong className="text-zinc-200">Démarrer</strong>, acceptez le micro, puis parlez.
              Session sandbox ~1 min. Si la voix ne répond pas, ouvrez le lien ci-dessous dans un nouvel onglet ou
              passez en <code className="text-zinc-300">LIVEAVATAR_EMBED_SANDBOX=false</code> (crédits).
            </p>
            <div className="aspect-video w-full overflow-hidden rounded-xl border border-zinc-700 bg-black shadow-2xl">
              <iframe
                src={result.url}
                title="LiveAvatar"
                allow="microphone; camera; autoplay"
                className="h-full w-full border-0"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <p className="text-xs text-zinc-500">
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-amber-400/90 underline"
              >
                Ouvrir la démo dans un nouvel onglet
              </a>
              {" · "}
              <span className="break-all">URL : {result.url}</span>
            </p>
          </div>
        )}

        <p className="mt-10 text-sm">
          <Link href="/" className="text-amber-400 hover:underline">
            ← Accueil LMS
          </Link>
        </p>
      </div>
    </div>
  );
}
