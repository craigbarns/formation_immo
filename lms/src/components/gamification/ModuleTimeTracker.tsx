"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getGamificationState } from "@/lib/gamification";
import { Clock, Activity, Zap } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold shadow-lg">
                <Clock size={16} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Engagement</p>
        </div>
        <span className="text-sm font-black text-white tabular-nums">
          {formatTime(seconds)} <span className="text-white/20 ml-1">/ {targetHours}h</span>
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10 shadow-inner">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand-gold via-white to-brand-gold shadow-[0_0_10px_rgba(212,175,55,0.4)]"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
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
    <div className="rounded-[2rem] border border-white/10 bg-[#070d18] p-8 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gold/10 border border-brand-gold/20 text-brand-gold shadow-lg">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">CAPACITÉ OPÉRATIONNELLE</p>
            <h3 className="text-xl font-black text-white uppercase tracking-tight">Investissement total</h3>
          </div>
        </div>
        <div className="text-right">
            <p className="text-3xl font-black text-white tabular-nums tracking-tighter">
                {formatTime(totalSeconds)} <span className="text-sm text-white/20">/ 42h</span>
            </p>
        </div>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-white/5 ring-1 ring-white/10 shadow-inner">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand-gold via-white to-brand-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div className="mt-10 grid grid-cols-5 gap-3 border-t border-white/5 pt-8">
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
    juridique: "JURI.",
    transaction: "TRANS.",
    financement: "FIN.",
    marketing: "MKT.",
    terrain: "TERR.",
  };

  return (
    <div className="text-center group">
      <div className="text-[9px] font-black text-white/20 uppercase tracking-widest group-hover:text-brand-gold/60 transition-colors mb-1">{labels[moduleSlug]}</div>
      <div className="text-xs font-black text-white/60 tabular-nums uppercase">{formatTime(seconds)}</div>
    </div>
  );
}
