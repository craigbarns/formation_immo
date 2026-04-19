"use client";

import { useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";
import type { InteractiveTimeline, TimelineStep } from "@/data/timeline-data";

function StepDetail({ step }: { step: TimelineStep }) {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-zinc-700">
      <p>{step.description}</p>
      {step.keyDocuments && step.keyDocuments.length > 0 && (
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-brand-navy">Documents</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-zinc-600">
            {step.keyDocuments.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      )}
      {step.tips && step.tips.length > 0 && (
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-brand-gold">Conseils pro</p>
          <ul className="mt-2 space-y-2">
            {step.tips.map((t) => (
              <li
                key={t}
                className="rounded-lg border border-brand-gold/20 bg-brand-gold/5 px-3 py-2 text-zinc-700"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function InteractiveTimelineBlock({ timelines }: { timelines: InteractiveTimeline[] }) {
  const [ti, setTi] = useState(0);
  const [openId, setOpenId] = useState<string | null>(null);
  const t = timelines[ti];
  if (!t) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-brand-navy/15 bg-white shadow-lg">
      <div className="border-b border-brand-navy/10 bg-slate-50 px-5 py-5 sm:px-8">
        <p className="text-3xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
          Frise chronologique
        </p>
        <h2 className="mt-1 text-xl font-bold text-brand-navy sm:text-2xl">{t.title}</h2>
        <p className="mt-2 max-w-3xl text-sm text-zinc-600">{t.description}</p>
      </div>

      {timelines.length > 1 && (
        <div className="flex flex-wrap gap-1 border-b border-zinc-100 bg-white px-5 sm:px-8">
          {timelines.map((line, i) => (
            <button
              key={line.id}
              type="button"
              onClick={() => {
                setTi(i);
                setOpenId(null);
              }}
              className={`rounded-t-lg px-4 py-2.5 text-sm font-medium transition ${
                i === ti
                  ? "bg-brand-navy text-white"
                  : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800"
              }`}
            >
              {line.title}
            </button>
          ))}
        </div>
      )}

      <div className="px-5 py-6 sm:px-8 sm:py-8">
        <div className="relative">
          <div
            className="absolute left-[19px] top-0 hidden h-full w-px bg-brand-navy/20 sm:block"
            aria-hidden
          />
          <ul className="space-y-3">
            {t.steps.map((step) => {
              const expanded = openId === step.id;
              return (
                <li key={step.id} className="relative sm:pl-12">
                  <button
                    type="button"
                    onClick={() => setOpenId(expanded ? null : step.id)}
                    className={`flex w-full flex-col rounded-xl border text-left transition sm:flex-row sm:items-start sm:gap-4 ${
                      expanded
                        ? "border-brand-navy/40 bg-brand-navy/5 shadow-md"
                        : "border-zinc-200 bg-white hover:border-brand-navy/25"
                    }`}
                  >
                    <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-brand-navy/30 bg-white sm:flex">
                      <EmojiIcon emoji={step.icon} className="h-5 w-5" />
                    </span>
                    <div className="flex-1 px-4 py-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="sm:hidden" aria-hidden>
                          <EmojiIcon emoji={step.icon} className="h-5 w-5" />
                        </span>
                        <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-3xs font-semibold text-zinc-600">
                          {step.duration}
                        </span>
                      </div>
                      <h3 className="mt-2 text-base font-bold text-brand-navy">{step.title}</h3>
                      {!expanded && (
                        <p className="mt-1 line-clamp-2 text-sm text-zinc-500">{step.description}</p>
                      )}
                      <p className="mt-2 text-xs font-medium text-brand-gold">
                        {expanded ? "Masquer le détail" : "Voir le détail"}
                      </p>
                    </div>
                  </button>
                  {expanded && (
                    <div className="mt-2 rounded-xl border border-zinc-100 bg-zinc-50/80 px-4 py-4 sm:ml-[3.25rem]">
                      <StepDetail step={step} />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
