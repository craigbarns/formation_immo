"use client";

import { useState, useEffect } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

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
  accentColor = "#1a3a5c",
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
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl border border-brand-gold/40 bg-brand-gold/5 px-4 py-2.5 text-sm font-semibold text-brand-gold-dark transition hover:bg-brand-gold/15 hover:shadow-sm"
      >
        <EmojiIcon emoji="🖨️" className="h-4 w-4 inline-block" /> Fiche récap imprimable
      </button>

      {/* Modal backdrop */}
      {open && (
        <div
          id="print-backdrop"
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 px-4 py-8 backdrop-blur-sm"
        >
          {/* Modal */}
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            {/* Modal controls */}
            <div
              id="print-controls"
              className="flex items-center justify-between border-b border-zinc-100 px-6 py-4"
            >
              <p className="text-sm font-bold text-brand-navy">Fiche récap — {lessonTitle}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 rounded-xl bg-brand-navy px-4 py-2 text-sm font-bold text-white shadow-md transition hover:bg-brand-navy-deep"
                >
                  <EmojiIcon emoji="🖨️" className="h-4 w-4 inline-block" /> Imprimer
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 transition hover:bg-zinc-100"
                >
                  <EmojiIcon emoji="✕" className="h-4 w-4 inline-block" />
                </button>
              </div>
            </div>

            {/* Printable content */}
            <div id="print-content" className="p-6 space-y-5">
              {/* Header band */}
              <div
                className="rounded-xl px-5 py-4 text-white"
                style={{ backgroundColor: accentColor }}
              >
                <p className="text-2xs font-bold uppercase tracking-widest opacity-70">
                  Formation Agent Immobilier — 42h
                </p>
                <p className="text-xs font-semibold opacity-80 mt-0.5">{moduleTitle}</p>
                <h1 className="mt-1 text-xl font-black leading-tight">{lessonTitle}</h1>
                {avatarName && (
                  <p className="mt-1 text-xs opacity-70">Formateur : {avatarName}</p>
                )}
              </div>

              {/* Introduction */}
              {introduction && (
                <div className="rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3 text-sm leading-relaxed text-zinc-700">
                  {introduction}
                </div>
              )}

              {/* Objectives */}
              {objectives && objectives.length > 0 && (
                <div>
                  <p
                    className="mb-2 text-2xs font-bold uppercase tracking-widest"
                    style={{ color: accentColor }}
                  >
                    Objectifs de la leçon
                  </p>
                  <ul className="space-y-1.5">
                    {objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-zinc-700">
                        <span
                          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-2xs font-bold text-white"
                          style={{ backgroundColor: accentColor }}
                        >
                          {i + 1}
                        </span>
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Key terms */}
              {keyTerms && keyTerms.length > 0 && (
                <div>
                  <p
                    className="mb-2 text-2xs font-bold uppercase tracking-widest"
                    style={{ color: accentColor }}
                  >
                    Vocabulaire clé
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {keyTerms.map((kt) => (
                      <div key={kt.term} className="rounded-xl border border-zinc-100 bg-zinc-50 p-3">
                        <p className="text-xs font-bold text-zinc-800">{kt.term}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-zinc-600">{kt.definition}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sections */}
              {sections && sections.length > 0 && (
                <div>
                  <p
                    className="mb-2 text-2xs font-bold uppercase tracking-widest"
                    style={{ color: accentColor }}
                  >
                    Programme
                  </p>
                  <ol className="space-y-1">
                    {sections.map((s, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 rounded-xl border border-zinc-100 px-3 py-2"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-3xs font-bold text-white" style={{ backgroundColor: accentColor }}>
                          {i + 1}
                        </span>
                        <EmojiIcon emoji={s.icon} className="h-4 w-4" />
                        <span className="flex-1 text-sm text-zinc-800">{s.title}</span>
                        <span className="text-2xs font-semibold text-zinc-400">{s.duration}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Expert quote */}
              {expertQuote && (
                <blockquote
                  className="rounded-xl border-l-4 py-3 pl-4 pr-3"
                  style={{ borderColor: accentColor, backgroundColor: `${accentColor}08` }}
                >
                  <p className="text-sm italic leading-relaxed text-zinc-700">
                    &ldquo;{expertQuote.text}&rdquo;
                  </p>
                  <footer className="mt-2 text-3xs font-semibold text-zinc-500">
                    — {expertQuote.author}, {expertQuote.role}
                  </footer>
                </blockquote>
              )}

              {/* Notes box */}
              <div>
                <p
                  className="mb-2 text-2xs font-bold uppercase tracking-widest"
                  style={{ color: accentColor }}
                >
                  Mes notes
                </p>
                <div className="h-28 rounded-xl border border-dashed border-zinc-200 bg-zinc-50/50" />
              </div>

              {/* Footer */}
              <div className="border-t border-zinc-100 pt-3 text-center text-2xs text-zinc-400">
                Formation Agent Immobilier — 42h · Tous droits réservés
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
