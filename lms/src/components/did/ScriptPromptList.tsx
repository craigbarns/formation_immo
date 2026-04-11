"use client";

import { useCallback, useState } from "react";
import type { LessonScriptBeat } from "@/data/lesson-avatar-scripts";

type Props = {
  beats?: LessonScriptBeat[];
  questions: string[];
};

export function ScriptPromptList({ beats = [], questions }: Props) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <div className="space-y-5">
      {beats.length > 0 ? (
        <div className="rounded-xl border border-brand-navy/15 bg-brand-navy/[0.03] p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-navy">
            Beats pour TTS → D-ID (copier le texte intégral)
          </p>
          <ul className="mt-3 space-y-3">
            {beats.map((b) => (
              <li key={b.id}>
                <button
                  type="button"
                  onClick={() => copy(b.text, `beat-${b.id}`)}
                  className="link-focus w-full rounded-lg border border-white bg-white px-3 py-2.5 text-left text-sm text-zinc-800 shadow-sm transition hover:border-brand-navy/20"
                >
                  <span className="block text-[10px] font-bold uppercase tracking-wide text-brand-gold">
                    {b.label}
                  </span>
                  <span className="mt-1 block leading-relaxed">{b.text}</span>
                </button>
                {copied === `beat-${b.id}` ? (
                  <p className="mt-1 text-xs font-medium text-emerald-600">Copié</p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {questions.length > 0 ? (
        <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
            Idées pour le coach texte (FrenchCoach)
          </p>
          <ul className="mt-3 space-y-2">
            {questions.map((q, i) => {
              const key = `q-${i}`;
              return (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => copy(q, key)}
                    className="link-focus w-full rounded-lg border border-white bg-white px-3 py-2.5 text-left text-sm text-zinc-800 shadow-sm transition hover:border-brand-navy/25"
                  >
                    {q}
                  </button>
                  {copied === key ? (
                    <p className="mt-1 text-xs font-medium text-emerald-600">Copié</p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
