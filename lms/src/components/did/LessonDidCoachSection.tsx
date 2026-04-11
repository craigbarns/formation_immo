import Link from "next/link";
import { getLessonAvatarInteractive } from "@/data/lesson-avatar-scripts";
import { ScriptPromptList } from "./ScriptPromptList";
import { Clapperboard, ExternalLink, FileText } from "lucide-react";

type Props = {
  moduleSlug: string;
  lessonSlug: string;
  moduleTitle: string;
  lessonTitle: string;
};

export function LessonDidCoachSection({
  moduleSlug,
  lessonSlug,
  moduleTitle,
  lessonTitle,
}: Props) {
  const config = getLessonAvatarInteractive(moduleSlug, lessonSlug);
  if (!config) return null;

  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04),0_16px_40px_rgba(26,58,92,0.07)]">
      <div className="h-1 w-full bg-gradient-to-r from-brand-navy via-brand-navy-soft to-brand-gold" aria-hidden />
      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex gap-3">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-navy/10 text-brand-navy"
              aria-hidden
            >
              <Clapperboard className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-brand-navy">Production D-ID & scripts vocaux</h2>
              <p className="mt-1 text-xs text-zinc-500">
                {moduleTitle} · {lessonTitle}
              </p>
            </div>
          </div>
          <Link
            href="/formation/production"
            className="link-focus inline-flex items-center gap-1.5 rounded-full border border-brand-navy/20 bg-brand-navy/5 px-3 py-1.5 text-xs font-semibold text-brand-navy transition hover:bg-brand-navy/10"
          >
            Tableau de production
            <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden />
          </Link>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-zinc-600">{config.tagline}</p>

        <p className="mt-4 flex flex-wrap items-center gap-2 text-xs leading-relaxed text-zinc-500">
          <FileText className="h-3.5 w-3.5 shrink-0 text-zinc-400" aria-hidden />
          <span>
            Chaîne : script Markdown → <strong className="text-zinc-700">TTS</strong> → audio →{" "}
            <strong className="text-zinc-700">D-ID</strong> → MP4 →{" "}
            <code className="rounded bg-zinc-100 px-1">videoUrl</code> dans{" "}
            <code className="rounded bg-zinc-100 px-1">course.ts</code>. Guide :{" "}
            <code className="rounded bg-zinc-100 px-1 font-mono text-[11px]">lms/docs/D-ID-INTEGRATION.md</code>
          </span>
        </p>

        <div className="mt-6">
          <ScriptPromptList beats={config.scriptBeats} questions={config.suggestedQuestions} />
        </div>
      </div>
    </section>
  );
}
