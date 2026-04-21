"use client";

import { useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";
import type { InteractiveTimeline, TimelineStep } from "@/data/timeline-data";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, FileText, Lightbulb, Clock } from "lucide-react";

function StepDetail({ step }: { step: TimelineStep }) {
  return (
    <div className="space-y-6 text-base leading-relaxed text-white/70 font-medium">
      <p className="italic">&laquo; {step.description} &raquo;</p>
      
      {step.keyDocuments && step.keyDocuments.length > 0 && (
        <div className="rounded-2xl bg-white/5 border border-white/10 p-5 shadow-inner">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-4 flex items-center gap-2">
            <FileText size={12} /> Dossier documentaire
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {step.keyDocuments.map((d) => (
              <li key={d} className="flex items-center gap-2 text-xs text-white/60">
                <span className="h-1 w-1 rounded-full bg-brand-gold/40" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      )}

      {step.tips && step.tips.length > 0 && (
        <div className="rounded-2xl bg-brand-gold/5 border border-brand-gold/20 p-5 shadow-inner">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold mb-4 flex items-center gap-2">
            <Lightbulb size={12} /> Recommandations terrain
          </p>
          <ul className="space-y-3">
            {step.tips.map((t) => (
              <li
                key={t}
                className="text-sm font-bold text-white/80 leading-snug flex items-start gap-3"
              >
                <span className="mt-1 text-brand-gold">→</span>
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
    <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#070d18] shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-brand-gold/20">
      <div className="relative border-b border-white/10 bg-[#030712] px-8 py-8 sm:px-12 md:py-10">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/[0.03] to-transparent pointer-events-none" />
        <div className="relative">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">
            PROCESSUS CHRONOLOGIQUE
            </p>
            <h2 className="mt-2 text-3xl font-black text-white uppercase tracking-tight leading-none">{t.title}</h2>
            <p className="mt-4 max-w-3xl text-lg text-white/50 leading-relaxed italic">&laquo; {t.description} &raquo;</p>
        </div>
      </div>

      {timelines.length > 1 && (
        <div className="flex gap-2 overflow-x-auto border-b border-white/5 bg-black/20 px-6 py-4 scrollbar-hide">
          {timelines.map((line, i) => (
            <button
              key={line.id}
              type="button"
              onClick={() => {
                setTi(i);
                setOpenId(null);
              }}
              className={`flex shrink-0 items-center gap-2.5 rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${
                i === ti
                  ? "bg-brand-gold text-brand-navy shadow-lg shadow-brand-gold/20"
                  : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white border border-white/5"
              }`}
            >
              {line.title}
            </button>
          ))}
        </div>
      )}

      <div className="p-8 sm:p-10 lg:p-12">
        <div className="relative">
          {/* Main vertical line */}
          <div
            className="absolute left-[23px] top-0 hidden h-full w-0.5 bg-gradient-to-b from-brand-gold/40 via-white/5 to-white/5 sm:block"
            aria-hidden
          />
          <ul className="space-y-6">
            {t.steps.map((step, idx) => {
              const expanded = openId === step.id;
              return (
                <li key={step.id} className="relative sm:pl-16">
                  <button
                    type="button"
                    onClick={() => setOpenId(expanded ? null : step.id)}
                    className={`group w-full rounded-[2rem] border-2 text-left transition-all duration-500 overflow-hidden ${
                      expanded
                        ? "border-brand-gold/30 bg-[#030712] shadow-2xl"
                        : "border-white/5 bg-white/[0.02] hover:border-brand-gold/20 hover:bg-white/[0.05]"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 p-6 md:p-8">
                        {/* Step Icon */}
                        <div className={`hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.25rem] border-2 transition-all duration-500 shadow-xl ${
                            expanded ? "bg-brand-gold border-brand-gold text-brand-navy scale-110" : "bg-black/40 border-white/10 text-white/40 group-hover:border-brand-gold/40"
                        }`}>
                            <EmojiIcon emoji={step.icon} className="h-6 w-6" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                <span className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-widest ${
                                    expanded ? "bg-brand-gold/20 text-brand-gold" : "bg-white/5 text-white/30"
                                }`}>
                                    <Clock size={10} /> {step.duration}
                                </span>
                                <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Étape {idx + 1}</span>
                            </div>
                            <h3 className={`text-xl font-black uppercase tracking-tight transition-colors duration-500 ${
                                expanded ? "text-white" : "text-white/70 group-hover:text-white"
                            }`}>{step.title}</h3>
                            
                            {!expanded && (
                                <p className="mt-2 line-clamp-1 text-base text-white/40 font-medium italic">&laquo; {step.description} &raquo;</p>
                            )}
                        </div>

                        <div className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 ${
                            expanded ? "bg-brand-gold text-brand-navy rotate-180" : "bg-white/5 text-white/20 group-hover:bg-white/10"
                        }`}>
                            <ChevronDown size={20} />
                        </div>
                    </div>

                    <AnimatePresence>
                        {expanded && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="bg-[#070d18]/50 border-t border-white/5"
                            >
                                <div className="p-8 md:p-10">
                                    <StepDetail step={step} />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
