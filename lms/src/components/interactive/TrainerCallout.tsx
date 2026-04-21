"use client";

import type { TrainerCallout, CalloutType } from "@/data/trainer-callouts";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

const CONFIG: Record<CalloutType, {
  icon: string;
  label: string;
  bg: string;
  border: string;
  titleColor: string;
  bodyColor: string;
  badgeBg: string;
  accent: string;
}> = {
  tip: {
    icon: "⭐",
    label: "Conseil pro",
    bg: "bg-amber-500/5",
    border: "border-l-amber-500",
    titleColor: "text-amber-400",
    bodyColor: "text-white/70",
    badgeBg: "bg-amber-500/10 text-amber-400",
    accent: "#f59e0b",
  },
  warning: {
    icon: "⚠️",
    label: "Attention !",
    bg: "bg-red-500/5",
    border: "border-l-red-500",
    titleColor: "text-red-400",
    bodyColor: "text-white/70",
    badgeBg: "bg-red-500/10 text-red-400",
    accent: "#ef4444",
  },
  terrain: {
    icon: "🏠",
    label: "Sur le terrain",
    bg: "bg-brand-gold/5",
    border: "border-l-brand-gold",
    titleColor: "text-brand-gold",
    bodyColor: "text-white/70",
    badgeBg: "bg-brand-gold/10 text-brand-gold",
    accent: "#d4af37",
  },
  fact: {
    icon: "📊",
    label: "Chiffre clé",
    bg: "bg-blue-500/5",
    border: "border-l-blue-500",
    titleColor: "text-blue-400",
    bodyColor: "text-white/70",
    badgeBg: "bg-blue-500/10 text-blue-400",
    accent: "#3b82f6",
  },
  example: {
    icon: "💡",
    label: "Exemple concret",
    bg: "bg-emerald-500/5",
    border: "border-l-emerald-500",
    titleColor: "text-emerald-400",
    bodyColor: "text-white/70",
    badgeBg: "bg-emerald-500/10 text-emerald-400",
    accent: "#10b981",
  },
  legal: {
    icon: "⚖️",
    label: "Obligation légale",
    bg: "bg-purple-500/5",
    border: "border-l-purple-500",
    titleColor: "text-purple-400",
    bodyColor: "text-white/70",
    badgeBg: "bg-purple-500/10 text-purple-400",
    accent: "#8b5cf6",
  },
};

function CalloutCard({ c }: { c: TrainerCallout }) {
  const cfg = CONFIG[c.type];
  return (
    <div
      className={`relative flex gap-5 rounded-r-[1.5rem] border-l-4 p-6 transition-all duration-300 hover:bg-white/[0.03] shadow-2xl border border-white/5 ${cfg.bg} ${cfg.border}`}
    >
      {/* Icon */}
      <div 
        className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-lg shadow-xl"
        style={{ boxShadow: `0 10px 20px -5px color-mix(in srgb, ${cfg.accent} 25%, transparent)` }}
      >
        <EmojiIcon emoji={cfg.icon} className="h-6 w-6" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${cfg.titleColor}`}>
            {c.title || cfg.label}
          </span>
          {c.avatarInitials && (
            <span
              className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black text-white shadow-lg ring-1 ring-white/20"
              style={{ backgroundColor: c.avatarColor ?? "var(--brand-gold)" }}
            >
              {c.avatarInitials}
            </span>
          )}
        </div>
        <p className={`mt-3 text-base leading-relaxed font-medium ${cfg.bodyColor}`}>{c.body}</p>
      </div>
    </div>
  );
}

export function TrainerCalloutBlock({ callouts }: { callouts: TrainerCallout[] }) {
  if (callouts.length === 0) return null;
  return (
    <div className="space-y-4">
      {callouts.map((c) => (
        <CalloutCard key={c.id} c={c} />
      ))}
    </div>
  );
}

export function TrainerCalloutSingle({ callout }: { callout: TrainerCallout }) {
  return <CalloutCard c={callout} />;
}
