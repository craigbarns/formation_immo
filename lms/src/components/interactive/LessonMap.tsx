"use client";

import { useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

export type LessonSection = {
  id: string;
  title: string;
  icon: string;
  duration: string;
  description?: string;
};

type Feature = {
  id: string;
  icon: string;
  label: string;
  anchor: string;
  available: boolean;
};

type Props = {
  sections?: LessonSection[];
  totalDuration?: string;
  objectives?: string[];
  expertQuote?: { text: string; author: string; role: string };
  hasVideo: boolean;
  hasScenario: boolean;
  hasQuiz: boolean;
  hasExercises: boolean;
  hasTimeline: boolean;
  hasChecklist: boolean;
  hasRoleplay: boolean;
  hasCalculation?: boolean;
  hasTable?: boolean;
};

export function LessonMap({
  sections,
  totalDuration,
  objectives,
  expertQuote,
  hasVideo,
  hasScenario,
  hasQuiz,
  hasExercises,
  hasTimeline,
  hasChecklist,
  hasRoleplay,
  hasCalculation,
  hasTable,
}: Props) {
  const [open, setOpen] = useState(false);

  const features: Feature[] = [
    { id: "video", icon: "🎬", label: "Vidéo", anchor: "#section-video", available: hasVideo },
    { id: "scenario", icon: "🎯", label: "Parcours", anchor: "#section-scenario", available: hasScenario },
    { id: "quiz", icon: "✅", label: "Quiz", anchor: "#section-quiz", available: hasQuiz },
    { id: "calc", icon: "🧮", label: "Calcul guidé", anchor: "#section-calc", available: !!hasCalculation },
    { id: "table", icon: "📊", label: "Tableaux", anchor: "#section-table", available: !!hasTable },
    { id: "exercises", icon: "🧩", label: "Exercices", anchor: "#section-exercises", available: hasExercises },
    { id: "timeline", icon: "📅", label: "Timeline", anchor: "#section-timeline", available: hasTimeline },
    { id: "checklist", icon: "📋", label: "Checklist", anchor: "#section-checklist", available: hasChecklist },
    { id: "roleplay", icon: "💬", label: "Roleplay", anchor: "#section-roleplay", available: hasRoleplay },
    { id: "notes", icon: "📝", label: "Notes", anchor: "#section-notes", available: true },
  ].filter((f) => f.available);

  const scrollTo = (anchor: string) => {
    const el = document.querySelector(anchor);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm">
      {/* Feature pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-zinc-100 bg-gradient-to-r from-white to-zinc-50/80 px-4 py-3">
        <span className="text-2xs font-bold uppercase tracking-widest text-zinc-400 mr-1">
          Contenu :
        </span>
        {features.map((f) => (
          <button
            key={f.id}
            onClick={() => scrollTo(f.anchor)}
            className="flex items-center gap-1.5 rounded-full border border-brand-navy/15 bg-white px-3 py-1 text-3xs font-semibold text-brand-navy shadow-sm transition hover:border-brand-gold/50 hover:bg-brand-gold/5 hover:shadow-md"
          >
            <EmojiIcon emoji={f.icon} className="h-3.5 w-3.5" />
            <span>{f.label}</span>
          </button>
        ))}
      </div>

      {/* Collapsible programme */}
      {(sections || objectives || expertQuote) && (
        <>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex w-full items-center justify-between px-5 py-3 text-left transition hover:bg-zinc-50"
          >
            <div className="flex items-center gap-2">
              <EmojiIcon emoji="📚" className="h-4 w-4" />
              <span className="text-sm font-semibold text-brand-navy">
                Programme de la leçon
                {totalDuration && (
                  <span className="ml-2 rounded-full bg-brand-gold/15 px-2 py-0.5 text-2xs font-bold text-brand-gold-dark">
                    {totalDuration}
                  </span>
                )}
              </span>
            </div>
            <span
              className={`text-zinc-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            >
              ▼
            </span>
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="border-t border-zinc-100 px-5 py-4 space-y-5">
              {/* Expert quote */}
              {expertQuote && (
                <blockquote className="rounded-xl border-l-4 border-brand-gold bg-brand-gold/5 py-3 pl-4 pr-3">
                  <p className="text-sm italic leading-relaxed text-zinc-700">&ldquo;{expertQuote.text}&rdquo;</p>
                  <footer className="mt-2 text-3xs font-semibold text-zinc-500">
                    — {expertQuote.author}
                    {expertQuote.role && <span className="font-normal">, {expertQuote.role}</span>}
                  </footer>
                </blockquote>
              )}

              {/* Objectives */}
              {objectives && objectives.length > 0 && (
                <div>
                  <p className="text-2xs font-bold uppercase tracking-widest text-zinc-400 mb-2">
                    Objectifs
                  </p>
                  <ul className="space-y-1.5">
                    {objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-zinc-700">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-navy text-2xs font-bold text-white">
                          {i + 1}
                        </span>
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Sections */}
              {sections && sections.length > 0 && (
                <div>
                  <p className="text-2xs font-bold uppercase tracking-widest text-zinc-400 mb-2">
                    Chapitres
                  </p>
                  <ol className="space-y-1">
                    {sections.map((s, i) => (
                      <li
                        key={s.id}
                        className="flex items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-zinc-50"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-3xs font-bold text-zinc-500">
                          {i + 1}
                        </span>
                        <EmojiIcon emoji={s.icon} className="h-4 w-4" />
                        <span className="flex-1 text-sm font-medium text-zinc-800">{s.title}</span>
                        <span className="shrink-0 rounded-full bg-zinc-100 px-2 py-0.5 text-2xs font-semibold text-zinc-500">
                          {s.duration}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
