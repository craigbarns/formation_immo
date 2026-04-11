"use client";

import type { StatCard } from "@/data/lesson-keyconcepts";

const COLOR_MAP: Record<string, { bg: string; text: string; border: string }> = {
  navy: { bg: "bg-[#1a3a5c]/5", text: "text-[#1a3a5c]", border: "border-[#1a3a5c]/20" },
  gold: { bg: "bg-[#d4af37]/8", text: "text-[#8a7318]", border: "border-[#d4af37]/30" },
  green: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  red: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  blue: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
};

export function StatDashboard({ stats }: { stats: StatCard[] }) {
  return (
    <div className={`grid gap-3 ${stats.length <= 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4"}`}>
      {stats.map((s, i) => {
        const c = COLOR_MAP[s.color] ?? COLOR_MAP.navy;
        return (
          <div
            key={i}
            className={`rounded-xl border-2 ${c.border} ${c.bg} p-4 text-center transition hover:shadow-md`}
          >
            <p className={`text-2xl font-black tabular-nums ${c.text}`}>
              {s.value}
            </p>
            {s.unit && (
              <p className={`text-xs font-medium ${c.text} opacity-70`}>{s.unit}</p>
            )}
            <p className="mt-1 text-[11px] text-zinc-500 font-medium">{s.label}</p>
          </div>
        );
      })}
    </div>
  );
}
