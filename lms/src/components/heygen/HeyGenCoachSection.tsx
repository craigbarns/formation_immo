import { createFormationLessonEmbed } from "@/lib/liveavatar";
import type { HeyGenLessonInteractive } from "@/data/heygen-interactive";
import { HeyGenChatPrompts } from "./HeyGenChatPrompts";

type Props = {
  moduleSlug: string;
  lessonSlug: string;
  moduleTitle: string;
  lessonTitle: string;
  config: HeyGenLessonInteractive;
};

export async function HeyGenCoachSection({
  moduleSlug,
  lessonSlug,
  moduleTitle,
  lessonTitle,
  config,
}: Props) {
  const embed = await createFormationLessonEmbed(moduleSlug, lessonSlug);

  return (
    <section className="rounded-2xl border-2 border-[#d4af37]/25 bg-gradient-to-b from-[#1a3a5c]/5 to-white p-6 shadow-lg md:p-8">
      <div className="mb-6 border-b border-[#1a3a5c]/10 pb-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#d4af37]">
          HeyGen — Coach interactif
        </p>
        <h2 className="mt-2 text-xl font-bold text-[#1a3a5c] md:text-2xl">
          Conversation avec l&apos;avatar
        </h2>
        <p className="mt-2 text-sm font-medium text-zinc-700">
          {moduleTitle} — {lessonTitle}
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-600">{config.tagline}</p>
      </div>

      <div className="mx-auto max-w-4xl space-y-6">
        {embed.ok ? (
          <>
            <p className="text-xs text-zinc-500">
              Autorisez le micro si demandé. En sandbox, la session est courte (~1 min) — ouvrir
              dans un nouvel onglet peut être plus stable.
            </p>
            <div className="aspect-video w-full overflow-hidden rounded-xl border-2 border-[#1a3a5c]/15 bg-zinc-950 shadow-xl">
              <iframe
                src={embed.url}
                title="HeyGen — conversation formation"
                allow="microphone; camera; autoplay; display-capture"
                className="h-full w-full border-0"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <a
              href={embed.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm font-medium text-[#1a3a5c] underline underline-offset-2"
            >
              Ouvrir le coach dans un nouvel onglet
            </a>
            <HeyGenChatPrompts questions={config.suggestedQuestions} />
          </>
        ) : (
          <div className="rounded-xl border border-amber-200 bg-amber-50/90 p-4 text-sm text-amber-950">
            <p className="font-semibold">Embed indisponible</p>
            <p className="mt-2 leading-relaxed">{embed.message}</p>
          </div>
        )}
      </div>
    </section>
  );
}
