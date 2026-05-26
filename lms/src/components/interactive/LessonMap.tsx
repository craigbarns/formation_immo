"use client";

import { useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";
import { ChevronDown, Sparkles, BookOpen, Target, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    { id: "exercises", icon: "🧩", label: "Ateliers", anchor: "#section-exercises", available: hasExercises },
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
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#070d18] shadow-2xl transition-all duration-500 hover:border-brand-gold/20">
      {/* Feature pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/5 bg-black/40 px-6 py-4">
        <span className="text-[10px] font-black uppercase tracking-widest text-white/75 mr-2">
          ACCÈS RAPIDE :
        </span>
        {features.map((f) => (
          <button
            key={f.id}
            onClick={() => scrollTo(f.anchor)}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white/60 transition hover:bg-brand-gold hover:text-brand-navy hover:border-brand-gold shadow-lg"
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
            className="flex w-full items-center justify-between px-6 py-4 text-left transition hover:bg-white/[0.02]"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-4 h-4 text-brand-gold" />
              <span className="text-sm font-black uppercase tracking-widest text-white">
                CURRICULUM DE LA LEÇON
                {totalDuration && (
                  <span className="ml-3 rounded-full bg-brand-gold/15 border border-brand-gold/30 px-3 py-0.5 text-[10px] font-black text-brand-gold tabular-nums shadow-lg backdrop-blur-md">
                    {totalDuration}
                  </span>
                )}
              </span>
            </div>
            <ChevronDown className={`w-4 h-4 text-white/75 transition-transform duration-500 ${open ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                >
                    <div className="border-t border-white/5 px-8 py-8 space-y-10 bg-black/20">
                    {/* Expert quote */}
                    {expertQuote && (
                        <div className="relative group overflow-hidden rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-6 shadow-2xl">
                            <Quote className="absolute -right-2 -top-2 w-16 h-16 text-brand-gold opacity-10 -rotate-12" />
                            <p className="relative z-10 text-base italic leading-relaxed text-white font-medium">&ldquo;{expertQuote.text}&rdquo;</p>
                            <footer className="relative z-10 mt-4 flex items-center gap-3">
                                <div className="h-6 w-px bg-brand-gold/30" />
                                <p className="text-[10px] font-black uppercase tracking-widest text-brand-gold">
                                    {expertQuote.author} <span className="text-white/75 not-italic ml-1">— {expertQuote.role}</span>
                                </p>
                            </footer>
                        </div>
                    )}

                    {/* Objectives */}
                    {objectives && objectives.length > 0 && (
                        <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/75 mb-6 flex items-center gap-3 px-1">
                            <Target className="w-3.5 h-3.5" /> OBJECTIFS DE MAÎTRISE
                        </p>
                        <ul className="grid gap-3 sm:grid-cols-2">
                            {objectives.map((obj, i) => (
                            <li key={i} className="flex items-start gap-4 rounded-xl bg-white/[0.02] border border-white/5 p-4 transition-all hover:bg-white/5">
                                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-brand-navy border border-white/10 text-[10px] font-black text-white shadow-xl">
                                {i + 1}
                                </span>
                                <span className="text-sm font-bold text-white/70 leading-relaxed">{obj}</span>
                            </li>
                            ))}
                        </ul>
                        </div>
                    )}

                    {/* Sections */}
                    {sections && sections.length > 0 && (
                        <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/75 mb-6 flex items-center gap-3 px-1">
                            <Sparkles className="w-3.5 h-3.5" /> PLAN DÉTAILLÉ
                        </p>
                        <ol className="divide-y divide-white/5 border-y border-white/5">
                            {sections.map((s, i) => (
                            <li
                                key={s.id}
                                className="flex items-center gap-5 py-4 px-2 transition hover:bg-white/[0.01] group"
                            >
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-black/40 text-[9px] font-black text-white/75 border border-white/5 group-hover:text-brand-gold transition-colors">
                                {i + 1}
                                </span>
                                <EmojiIcon emoji={s.icon} className="h-5 w-5 transition-transform group-hover:scale-110" />
                                <span className="flex-1 text-sm font-black uppercase tracking-tight text-white/60 group-hover:text-white transition-colors">{s.title}</span>
                                <span className="shrink-0 rounded-lg bg-white/5 border border-white/5 px-2.5 py-1 text-[9px] font-black text-white/75 tabular-nums">
                                {s.duration}
                                </span>
                            </li>
                            ))}
                        </ol>
                        </div>
                    )}
                    </div>
                </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
