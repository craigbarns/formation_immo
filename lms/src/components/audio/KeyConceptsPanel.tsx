"use client";

import type { KeyConcept } from "@/data/lesson-keyconcepts";

const ICONS: Record<string, string> = {
  "balance-scale": "\u2696\uFE0F",
  "id-card": "\uD83E\uDEAA",
  "graduation-cap": "\uD83C\uDF93",
  "eye": "\uD83D\uDC41\uFE0F",
  "file-signature": "\u270D\uFE0F",
  "clock": "\u23F0",
  "shield": "\uD83D\uDEE1\uFE0F",
  "thermometer": "\uD83C\uDF21\uFE0F",
  "alert-triangle": "\u26A0\uFE0F",
  "zap": "\u26A1",
  "file-text": "\uD83D\uDCC4",
  "users": "\uD83D\uDC65",
  "search": "\uD83D\uDD0D",
  "trending-up": "\uD83D\uDCC8",
  "sliders": "\uD83C\uDFA8",
  "target": "\uD83C\uDFAF",
  "anchor": "\u2693",
  "database": "\uD83D\uDDC4\uFE0F",
  "repeat": "\uD83D\uDD01",
  "percent": "\uD83D\uDCCA",
  "calendar": "\uD83D\uDCC5",
  "gift": "\uD83C\uDF81",
  "bar-chart": "\uD83D\uDCCA",
  "bar-chart-2": "\uD83D\uDCC9",
  "dollar-sign": "\uD83D\uDCB0",
  "camera": "\uD83D\uDCF7",
  "sun": "\u2600\uFE0F",
  "layout": "\uD83C\uDFE0",
  "edit": "\u270F\uFE0F",
  "align-left": "\uD83D\uDCDD",
  "alert-circle": "\u26A0\uFE0F",
  "map-pin": "\uD83D\uDCCD",
  "compass": "\uD83E\uDDED",
  "check-circle": "\u2705",
  "check-square": "\u2611\uFE0F",
  "thumbs-up": "\uD83D\uDC4D",
  "heart": "\u2764\uFE0F",
  "star": "\u2B50",
  "home": "\uD83C\uDFE0",
  "trending-down": "\uD83D\uDCC9",
};

const TYPE_STYLES: Record<string, string> = {
  definition: "border-blue-200 bg-blue-50",
  rule: "border-[#1a3a5c]/20 bg-[#1a3a5c]/5",
  tip: "border-emerald-200 bg-emerald-50",
  warning: "border-amber-200 bg-amber-50",
  stat: "border-[#d4af37]/30 bg-[#d4af37]/5",
};

const TYPE_LABELS: Record<string, string> = {
  definition: "Definition",
  rule: "Regle",
  tip: "Conseil pro",
  warning: "Attention",
  stat: "Chiffre cle",
};

const TYPE_LABEL_STYLES: Record<string, string> = {
  definition: "bg-blue-100 text-blue-700",
  rule: "bg-[#1a3a5c]/10 text-[#1a3a5c]",
  tip: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-800",
  stat: "bg-[#d4af37]/15 text-[#8a7318]",
};

export function KeyConceptsPanel({ concepts }: { concepts: KeyConcept[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {concepts.map((c, i) => (
        <div
          key={i}
          className={`rounded-xl border-2 p-4 transition hover:shadow-md ${TYPE_STYLES[c.type] ?? "border-zinc-200 bg-white"}`}
        >
          <div className="flex items-start gap-3">
            <span className="text-xl shrink-0">{ICONS[c.icon] ?? "📌"}</span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-bold text-[#1a3a5c] text-sm">{c.title}</h4>
                <span
                  className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                    TYPE_LABEL_STYLES[c.type] ?? "bg-zinc-100 text-zinc-600"
                  }`}
                >
                  {TYPE_LABELS[c.type] ?? c.type}
                </span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-zinc-600">{c.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
