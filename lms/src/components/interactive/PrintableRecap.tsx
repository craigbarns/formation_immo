"use client";

import { useState, useEffect } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";
import { Printer, X, FileText, Sparkles, BookOpen, Target, Quote, PenLine } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Section = { icon: string; title: string; duration: string };
type KeyTerm = { term: string; definition: string };

type Props = {
  moduleTitle: string;
  lessonTitle: string;
  introduction?: string;
  objectives?: string[];
  keyTerms?: KeyTerm[];
  sections?: Section[];
  expertQuote?: { text: string; author: string; role: string };
  avatarName?: string;
  accentColor?: string;
};

export function PrintableRecap({
  moduleTitle,
  lessonTitle,
  introduction,
  objectives,
  keyTerms,
  sections,
  expertQuote,
  avatarName,
  accentColor = "#d4af37",
}: Props) {
  const [open, setOpen] = useState(false);

  // inject print style once
  useEffect(() => {
    const id = "print-recap-style";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      @media print {
        body > *:not(#print-backdrop) { display: none !important; }
        #print-content { display: block !important; position: static !important; }
        #print-controls { display: none !important; }
        @page { margin: 15mm; size: A4; }
        .print-only-white { background: white !important; color: black !important; border-color: #ddd !important; }
        .print-hide { display: none !important; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white/70 transition hover:bg-brand-gold hover:text-brand-navy hover:border-brand-gold shadow-xl"
      >
        <Printer size={16} className="transition-transform group-hover:scale-110" /> 
        FICHE RÉCAPITULATIVE
      </button>

      {/* Modal backdrop */}
      <AnimatePresence>
        {open && (
            <motion.div
            id="print-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-[#020617]/95 px-4 py-8 backdrop-blur-xl sm:py-16"
            >
            {/* Modal */}
            <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="w-full max-w-3xl rounded-[2.5rem] border border-white/10 bg-[#070d18] shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden"
            >
                {/* Modal controls */}
                <div
                id="print-controls"
                className="flex items-center justify-between border-b border-white/5 bg-[#030712] px-8 py-6"
                >
                    <div className="flex items-center gap-3">
                        <FileText className="text-brand-gold w-5 h-5" />
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Prévisualisation impression</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => window.print()}
                            className="flex items-center gap-2 rounded-xl bg-brand-gold px-6 py-3 text-[10px] font-black uppercase tracking-widest text-brand-navy shadow-lg shadow-brand-gold/20 transition hover:bg-white hover:scale-105 active:scale-95"
                        >
                            <Printer size={14} /> IMPRIMER (PDF)
                        </button>
                        <button
                            onClick={() => setOpen(false)}
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/40 transition hover:bg-white/10 hover:text-white"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* Printable content */}
                <div id="print-content" className="p-8 md:p-12 space-y-10">
                {/* Header band */}
                <div
                    className="relative overflow-hidden rounded-[2rem] px-8 py-10 text-white shadow-2xl"
                    style={{ background: `linear-gradient(135deg, ${accentColor}, color-mix(in srgb, ${accentColor}, black 40%))` }}
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_70%)]" />
                    <p className="relative z-10 text-[10px] font-black uppercase tracking-[0.3em] opacity-70">
                    FORMATION AGENT IMMOBILIER — 42H
                    </p>
                    <h1 className="relative z-10 mt-6 text-3xl md:text-5xl font-black uppercase leading-[1.1] tracking-tight">{lessonTitle}</h1>
                    <div className="relative z-10 mt-8 flex flex-wrap items-center gap-6 border-t border-white/20 pt-6">
                        <div>
                            <p className="text-[9px] font-black uppercase tracking-widest opacity-60">MODULE</p>
                            <p className="text-sm font-bold uppercase mt-1">{moduleTitle}</p>
                        </div>
                        {avatarName && (
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-widest opacity-60">FORMATEUR</p>
                                <p className="text-sm font-bold mt-1 uppercase">{avatarName}</p>
                            </div>
                        )}
                        <div className="ml-auto">
                            <Sparkles className="w-8 h-8 opacity-30" />
                        </div>
                    </div>
                </div>

                {/* Introduction */}
                {introduction && (
                    <div className="relative rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-lg leading-relaxed text-white/70 italic font-medium shadow-inner">
                        <Quote className="absolute -left-2 -top-2 w-10 h-10 text-white/5" />
                        &laquo; {introduction} &raquo;
                    </div>
                )}

                {/* Objectives */}
                {objectives && objectives.length > 0 && (
                    <div>
                    <p className="mb-6 text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold flex items-center gap-3">
                        <Target size={14} /> OBJECTIFS DE MAÎTRISE
                    </p>
                    <ul className="grid gap-3 sm:grid-cols-2">
                        {objectives.map((obj, i) => (
                        <li key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.01] border border-white/5">
                            <span
                            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[10px] font-black text-brand-navy shadow-xl"
                            style={{ backgroundColor: accentColor }}
                            >
                            {i + 1}
                            </span>
                            <span className="text-sm font-bold text-white/60 leading-relaxed">{obj}</span>
                        </li>
                        ))}
                    </ul>
                    </div>
                )}

                {/* Key terms */}
                {keyTerms && keyTerms.length > 0 && (
                    <div>
                    <p className="mb-6 text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold flex items-center gap-3">
                        <BookOpen size={14} /> LEXIQUE STRATÉGIQUE
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {keyTerms.map((kt) => (
                        <div key={kt.term} className="rounded-2xl border border-white/5 bg-[#030712] p-6 shadow-xl transition-all hover:bg-white/[0.02]">
                            <p className="text-base font-black text-white uppercase tracking-tight mb-2">{kt.term}</p>
                            <p className="text-sm leading-relaxed text-white/40 font-medium italic">&laquo; {kt.definition} &raquo;</p>
                        </div>
                        ))}
                    </div>
                    </div>
                )}

                {/* Expert quote */}
                {expertQuote && (
                    <blockquote
                    className="relative rounded-2xl border-l-4 p-8 bg-[#030712] shadow-2xl"
                    style={{ borderColor: accentColor }}
                    >
                    <p className="text-lg italic leading-relaxed text-white/80 font-medium">
                        &ldquo;{expertQuote.text}&rdquo;
                    </p>
                    <footer className="mt-4 text-[10px] font-black uppercase tracking-widest text-brand-gold">
                        — {expertQuote.author} <span className="text-white/20 ml-2 font-bold not-italic">{expertQuote.role}</span>
                    </footer>
                    </blockquote>
                )}

                {/* Notes box */}
                <div className="print-hide">
                    <p className="mb-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/20 flex items-center gap-3">
                        <PenLine size={14} /> NOTES PERSONNELLES
                    </p>
                    <div className="h-40 rounded-[2rem] border-2 border-dashed border-white/5 bg-white/[0.01]" />
                </div>

                {/* Footer */}
                <div className="border-t border-white/5 pt-8 text-center text-[9px] font-black uppercase tracking-[0.4em] text-white/10">
                    DOCUMENT RÉSERVÉ À L&apos;USAGE EXCLUSIF DES STAGIAIRES · © 2026
                </div>
                </div>
            </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
