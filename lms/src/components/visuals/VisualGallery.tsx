"use client";

import { useState } from "react";
import Image from "next/image";
import type { VisualPrompt } from "@/data/module-visuals";

const CATEGORY_LABELS: Record<string, string> = {
  intro: "Introduction",
  concept: "Concept clé",
  infographic: "Synthèse visuelle",
  scenario: "Mise en situation",
  closing: "Points clés",
};

const CATEGORY_COLORS: Record<string, string> = {
  intro: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  concept: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  infographic: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  scenario: "bg-amber-500/20 text-brand-gold border-brand-gold/30",
  closing: "bg-rose-500/20 text-rose-300 border-rose-500/30",
};

export function VisualGallery({ prompts }: { prompts: VisualPrompt[] }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function copy(id: string, text: string) {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  if (prompts.length === 0) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {prompts.map((p) => (
        <div
          key={p.id}
          className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#070d18] shadow-2xl transition-all duration-500 hover:border-brand-gold/20"
        >
          {/* Image placeholder or actual image */}
          <div className="relative aspect-video bg-[#030712]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
            {p.imageUrl ? (
              <Image
                src={p.imageUrl}
                alt={p.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-white/75">
                <div className="relative">
                    <div className="absolute inset-0 rounded-full blur-2xl bg-brand-gold/10 animate-pulse" />
                    <svg className="relative h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                    </svg>
                </div>
                <div className="text-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/75 block">Visualisation</span>
                    <span className="text-xs font-bold text-white/75 uppercase tracking-widest mt-1 block italic">En cours de production</span>
                </div>
              </div>
            )}
            {/* Category badge */}
            <span
              className={`absolute top-4 left-4 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-lg ${
                CATEGORY_COLORS[p.category] ?? "bg-white/10 text-white/60 border-white/10"
              }`}
            >
              {CATEGORY_LABELS[p.category] ?? p.category}
            </span>
            {/* Status badge */}
            <span
              className={`absolute top-4 right-4 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-lg ${
                p.imageUrl
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-orange-500/20 text-orange-400 border border-orange-500/30"
              }`}
            >
              {p.imageUrl ? "Prêt" : "En attente"}
            </span>
          </div>

          {/* Info */}
          <div className="p-6">
            <h4 className="text-lg font-black text-white uppercase tracking-tight">{p.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-white/50 line-clamp-2 italic">
              &laquo; {p.description} &raquo;
            </p>

            {/* Expand prompt */}
            <button
              onClick={() =>
                setExpandedId(expandedId === p.id ? null : p.id)
              }
              className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em] text-brand-gold transition hover:text-white"
            >
              <span className="h-1 w-1 rounded-full bg-brand-gold animate-pulse" />
              {expandedId === p.id ? "Masquer la recette" : "Prompt Midjourney"}
            </button>

            {expandedId === p.id && (
              <div className="mt-4 rounded-2xl bg-black/40 border border-white/5 p-4 shadow-inner">
                <p className="text-[11px] leading-relaxed text-white/60 font-mono break-all">
                  {p.prompt}
                </p>
                <button
                  onClick={() => copy(p.id, p.prompt)}
                  className="mt-4 w-full rounded-xl bg-white px-4 py-2 text-xs font-black uppercase tracking-widest text-brand-navy transition hover:bg-brand-gold hover:scale-[1.02] active:scale-[0.98]"
                >
                  {copiedId === p.id ? "Copié !" : "Copier la recette"}
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
