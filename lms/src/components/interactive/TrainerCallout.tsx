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
}> = {
  tip: {
    icon: "⭐",
    label: "Conseil pro",
    bg: "bg-amber-50",
    border: "border-l-amber-400",
    titleColor: "text-amber-700",
    bodyColor: "text-amber-900",
    badgeBg: "bg-amber-100 text-amber-700",
  },
  warning: {
    icon: "⚠️",
    label: "Attention !",
    bg: "bg-red-50",
    border: "border-l-red-400",
    titleColor: "text-red-700",
    bodyColor: "text-red-900",
    badgeBg: "bg-red-100 text-red-700",
  },
  terrain: {
    icon: "🏠",
    label: "Sur le terrain",
    bg: "bg-brand-navy/[0.04]",
    border: "border-l-brand-navy",
    titleColor: "text-brand-navy",
    bodyColor: "text-brand-navy/80",
    badgeBg: "bg-brand-navy/10 text-brand-navy",
  },
  fact: {
    icon: "📊",
    label: "Chiffre clé",
    bg: "bg-blue-50",
    border: "border-l-blue-400",
    titleColor: "text-blue-700",
    bodyColor: "text-blue-900",
    badgeBg: "bg-blue-100 text-blue-700",
  },
  example: {
    icon: "💡",
    label: "Exemple concret",
    bg: "bg-emerald-50",
    border: "border-l-emerald-400",
    titleColor: "text-emerald-700",
    bodyColor: "text-emerald-900",
    badgeBg: "bg-emerald-100 text-emerald-700",
  },
  legal: {
    icon: "⚖️",
    label: "Obligation légale",
    bg: "bg-purple-50",
    border: "border-l-purple-400",
    titleColor: "text-purple-700",
    bodyColor: "text-purple-900",
    badgeBg: "bg-purple-100 text-purple-700",
  },
};

function CalloutCard({ c }: { c: TrainerCallout }) {
  const cfg = CONFIG[c.type];
  return (
    <div
      className={`relative flex gap-4 rounded-r-2xl border-l-4 p-4 transition-all hover:-translate-y-0.5 hover:shadow-md ${cfg.bg} ${cfg.border}`}
    >
      {/* Icon */}
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/70 text-lg shadow-sm">
        <EmojiIcon emoji={cfg.icon} className="h-5 w-5" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`text-xs font-bold uppercase tracking-wide ${cfg.titleColor}`}>
            {c.title || cfg.label}
          </span>
          {c.avatarInitials && (
            <span
              className="flex h-5 w-5 items-center justify-center rounded-full text-2xs font-bold text-white shadow-sm"
              style={{ backgroundColor: c.avatarColor ?? "var(--brand-navy)" }}
            >
              {c.avatarInitials}
            </span>
          )}
        </div>
        <p className={`mt-1.5 text-sm leading-relaxed ${cfg.bodyColor}`}>{c.body}</p>
      </div>
    </div>
  );
}

export function TrainerCalloutBlock({ callouts }: { callouts: TrainerCallout[] }) {
  if (callouts.length === 0) return null;
  return (
    <div className="space-y-3">
      {callouts.map((c) => (
        <CalloutCard key={c.id} c={c} />
      ))}
    </div>
  );
}

export function TrainerCalloutSingle({ callout }: { callout: TrainerCallout }) {
  return <CalloutCard c={callout} />;
}
