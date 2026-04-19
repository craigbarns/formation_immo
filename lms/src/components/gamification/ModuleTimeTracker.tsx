"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
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
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("gamification_state")
          .select("module_timers")
          .eq("user_id", user.id)
          .single();
        if (data?.module_timers) {
          setSeconds(data.module_timers[moduleSlug] || 0);
          return;
        }
      }
      setSeconds(getGamificationState().moduleTimers[moduleSlug] || 0);
    }
    load();
  }, [moduleSlug]);

  const targetHours = MODULE_TARGET_HOURS[moduleSlug] || 8;
  const targetSeconds = targetHours * 3600;
  const pct = Math.min(100, (seconds / targetSeconds) * 100);

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-3 shadow-sm">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-zinc-600">Temps investi</span>
        <span className="font-bold text-brand-navy">
          {formatTime(seconds)} / {targetHours}h
        </span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-navy to-[var(--brand-navy-soft)] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function GlobalTimeTracker() {
  const [totalSeconds, setTotalSeconds] = useState(0);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("gamification_state")
          .select("module_timers")
          .eq("user_id", user.id)
          .single();
        if (data?.module_timers) {
          const timers = data.module_timers as Record<string, number>;
          setTotalSeconds(Object.values(timers).reduce((a, b) => a + b, 0));
          return;
        }
      }
      const state = getGamificationState();
      setTotalSeconds(Object.values(state.moduleTimers).reduce((a, b) => a + b, 0));
    }
    load();
  }, []);

  const targetSeconds = 42 * 3600;
  const pct = Math.min(100, (totalSeconds / targetSeconds) * 100);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5 text-brand-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-semibold text-brand-navy">Temps total de formation</span>
        </div>
        <span className="text-lg font-bold text-brand-gold">{formatTime(totalSeconds)} / 42h</span>
      </div>
      <div className="mt-3 h-3 overflow-hidden rounded-full bg-zinc-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-gold to-[var(--brand-gold-pale)] transition-all duration-700"
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
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("gamification_state")
          .select("module_timers")
          .eq("user_id", user.id)
          .single();
        if (data?.module_timers) {
          setSeconds(data.module_timers[moduleSlug] || 0);
          return;
        }
      }
      setSeconds(getGamificationState().moduleTimers[moduleSlug] || 0);
    }
    load();
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
      <div className="text-2xs font-medium text-zinc-500">{labels[moduleSlug]}</div>
      <div className="text-xs font-bold text-brand-navy">{formatTime(seconds)}</div>
    </div>
  );
}
