"use client";

import { useState } from "react";
import type { VisualPrompt } from "@/data/module-visuals";

const CATEGORY_LABELS: Record<string, string> = {
  intro: "Introduction",
  concept: "Concept",
  infographic: "Infographie",
  scenario: "Mise en situation",
  closing: "Conclusion",
};

const CATEGORY_COLORS: Record<string, string> = {
  intro: "bg-blue-100 text-blue-700",
  concept: "bg-purple-100 text-purple-700",
  infographic: "bg-emerald-100 text-emerald-700",
  scenario: "bg-amber-100 text-amber-700",
  closing: "bg-rose-100 text-rose-700",
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
    <div className="grid gap-4 sm:grid-cols-2">
      {prompts.map((p) => (
        <div
          key={p.id}
          className="group rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md overflow-hidden"
        >
          {/* Image placeholder or actual image */}
          <div className="relative aspect-video bg-gradient-to-br from-zinc-100 to-zinc-200">
            {p.imageUrl ? (
              <img
                src={p.imageUrl}
                alt={p.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-zinc-400">
                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                <span className="text-xs font-medium">A generer</span>
              </div>
            )}
            {/* Category badge */}
            <span
              className={`absolute top-2 left-2 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                CATEGORY_COLORS[p.category] ?? "bg-zinc-100 text-zinc-600"
              }`}
            >
              {CATEGORY_LABELS[p.category] ?? p.category}
            </span>
            {/* Status badge */}
            <span
              className={`absolute top-2 right-2 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                p.imageUrl
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              {p.imageUrl ? "Pret" : "En attente"}
            </span>
          </div>

          {/* Info */}
          <div className="p-4">
            <h4 className="font-bold text-brand-navy text-sm">{p.title}</h4>
            <p className="mt-1 text-xs text-zinc-600">{p.description}</p>

            {/* Expand prompt */}
            <button
              onClick={() =>
                setExpandedId(expandedId === p.id ? null : p.id)
              }
              className="mt-2 text-[11px] font-medium text-brand-gold hover:underline"
            >
              {expandedId === p.id ? "Masquer le prompt" : "Prompt Midjourney"}
            </button>

            {expandedId === p.id && (
              <div className="mt-2 rounded-lg bg-zinc-50 p-3">
                <p className="text-[11px] leading-relaxed text-zinc-700 font-mono break-all">
                  {p.prompt}
                </p>
                <button
                  onClick={() => copy(p.id, p.prompt)}
                  className="mt-2 rounded bg-brand-navy px-3 py-1 text-[10px] font-bold text-white hover:bg-brand-navy-deep"
                >
                  {copiedId === p.id ? "Copie !" : "Copier"}
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
