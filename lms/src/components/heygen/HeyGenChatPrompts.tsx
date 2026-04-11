"use client";

import { useCallback, useState } from "react";

type Props = {
  questions: string[];
};

export function HeyGenChatPrompts({ questions }: Props) {
  const [copied, setCopied] = useState<number | null>(null);

  const copy = useCallback(async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(index);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      /* ignore */
    }
  }, []);

  if (questions.length === 0) return null;

  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
        Idées de questions (copier dans le chat de l&apos;avatar)
      </p>
      <ul className="mt-3 space-y-2">
        {questions.map((q, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => copy(q, i)}
              className="w-full rounded-lg border border-white bg-white px-3 py-2.5 text-left text-sm text-zinc-800 shadow-sm transition hover:border-[#1a3a5c]/25"
            >
              {q}
            </button>
            {copied === i && (
              <p className="mt-1 text-xs font-medium text-emerald-600">Copié dans le presse-papiers</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
