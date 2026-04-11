import Link from "next/link";
import { Clapperboard, FileText } from "lucide-react";

export const metadata = {
  title: "D-ID — intégration scripts",
};

export default function DemoDidPage() {
  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-16 text-zinc-100">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">Formation 42 h</p>
        <h1 className="mt-3 flex items-center gap-3 text-3xl font-bold text-white">
          <Clapperboard className="h-8 w-8 text-brand-gold" aria-hidden />
          D-ID & scripts vocaux
        </h1>
        <p className="mt-4 leading-relaxed text-zinc-400">
          HeyGen / LiveAvatar ont été retirés du code. La production vidéo repose sur vos fichiers Markdown,
          un TTS (Mistral ou ElevenLabs), puis D-ID pour animer l’avatar.
        </p>

        <ul className="mt-8 space-y-3 text-sm text-zinc-300">
          <li className="flex gap-2">
            <FileText className="mt-0.5 h-4 w-4 shrink-0 text-brand-gold" aria-hidden />
            <span>
              Lisez <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs">lms/docs/D-ID-INTEGRATION.md</code>{" "}
              dans le dépôt.
            </span>
          </li>
          <li>
            • Variables : <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs">DID_API_USER</code> /{" "}
            <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs">DID_API_SECRET</code> (voir{" "}
            <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs">.env.local.example</code>).
          </li>
          <li>
            • Scripts CLI : <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs">lms/scripts/did-test.mjs</code>
            , <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs">did-generate-lesson-01.mjs</code>.
          </li>
        </ul>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/formation/interactive-avatar"
            className="rounded-xl bg-brand-gold px-5 py-3 text-sm font-bold text-brand-navy transition hover:brightness-105"
          >
            Exemple beats (Loi ALUR)
          </Link>
          <Link
            href="/"
            className="rounded-xl border border-zinc-600 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:border-zinc-400"
          >
            Accueil
          </Link>
        </div>

        <p className="mt-12 text-xs text-zinc-600">
          L’ancienne route <code className="text-zinc-500">/demo-liveavatar</code> redirige vers cette page.
        </p>
      </div>
    </div>
  );
}
