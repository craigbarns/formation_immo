"use client";

import { useEffect, useState } from "react";
import { getGamificationState } from "@/lib/gamification";

const MODULE_TARGET_HOURS: Record<string, number> = {
  juridique: 8,
  transaction: 8,
  financement: 8,
  marketing: 8,
  terrain: 8,
};

function formatTime(totalSeconds: number): string {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  if (hrs === 0) return `${mins}min`;
  return `${hrs}h ${String(mins).padStart(2, "0")}min`;
}

export function ModuleTimeTracker({ moduleSlug }: { moduleSlug: string }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const state = getGamificationState();
    setSeconds(state.moduleTimers[moduleSlug] || 0);
  }, [moduleSlug]);

  const targetHours = MODULE_TARGET_HOURS[moduleSlug] || 8;
  const targetSeconds = targetHours * 3600;
  const pct = Math.min(100, (seconds / targetSeconds) * 100);

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-3 shadow-sm">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-zinc-600">Temps investi</span>
        <span className="font-bold text-[#1a3a5c]">
          {formatTime(seconds)} / {targetHours}h
        </span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#1a3a5c] to-[#2d6a9c] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function GlobalTimeTracker() {
  const [totalSeconds, setTotalSeconds] = useState(0);

  useEffect(() => {
    const state = getGamificationState();
    const total = Object.values(state.moduleTimers).reduce((a, b) => a + b, 0);
    setTotalSeconds(total);
  }, []);

  const targetSeconds = 42 * 3600;
  const pct = Math.min(100, (totalSeconds / targetSeconds) * 100);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5 text-[#1a3a5c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-semibold text-[#1a3a5c]">Temps total de formation</span>
        </div>
        <span className="text-lg font-bold text-[#d4af37]">{formatTime(totalSeconds)} / 42h</span>
      </div>
      <div className="mt-3 h-3 overflow-hidden rounded-full bg-zinc-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#d4af37] to-[#f0e6c8] transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-2 grid grid-cols-5 gap-1">
        {["juridique", "transaction", "financement", "marketing", "terrain"].map((mod) => (
          <ModuleTimeMini key={mod} moduleSlug={mod} />
        ))}
      </div>
    </div>
  );
}

function ModuleTimeMini({ moduleSlug }: { moduleSlug: string }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const state = getGamificationState();
    setSeconds(state.moduleTimers[moduleSlug] || 0);
  }, [moduleSlug]);

  const labels: Record<string, string> = {
    juridique: "Juri.",
    transaction: "Trans.",
    financement: "Fin.",
    marketing: "Mkt.",
    terrain: "Terr.",
  };

  return (
    <div className="text-center">
      <div className="text-[10px] font-medium text-zinc-500">{labels[moduleSlug]}</div>
      <div className="text-xs font-bold text-[#1a3a5c]">{formatTime(seconds)}</div>
    </div>
  );
}
