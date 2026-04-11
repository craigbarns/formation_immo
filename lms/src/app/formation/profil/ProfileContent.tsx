"use client";

import { useEffect, useState } from "react";
import { getGamificationState, getLevelForXP, LEVELS, type GamificationState } from "@/lib/gamification";
import { BadgesGrid } from "@/components/gamification/BadgesGrid";
import { GlobalTimeTracker } from "@/components/gamification/ModuleTimeTracker";
import { CertificateGenerator } from "@/components/certificate/CertificateGenerator";
import { CertificatePreview } from "@/components/certificate";

export function ProfileContent() {
  const [state, setState] = useState<GamificationState | null>(null);

  useEffect(() => {
    setState(getGamificationState());
  }, []);

  if (!state) return null;

  const { current, next, progressToNext } = getLevelForXP(state.xp);
  const examResults = Object.entries(state.examScores);

  return (
    <div className="mt-8 space-y-8">
      {/* Level & XP Card */}
      <div className="rounded-2xl border-2 border-[#1a3a5c]/15 bg-gradient-to-br from-[#1a3a5c] to-[#2d5a7c] p-6 text-white shadow-lg">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 text-4xl backdrop-blur">
            {current.icon}
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wider text-[#d4af37]">
              Niveau {current.level}
            </p>
            <h2 className="text-2xl font-bold">{current.title}</h2>
            <div className="mt-2 flex items-center gap-3">
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#d4af37] to-[#f0e6c8] transition-all duration-700"
                  style={{ width: `${progressToNext}%` }}
                />
              </div>
              <span className="text-sm font-bold tabular-nums">
                {state.xp} XP
              </span>
            </div>
            {next && (
              <p className="mt-1 text-xs text-white/60">
                {next.xpRequired - state.xp} XP pour atteindre {next.icon} {next.title}
              </p>
            )}
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Streak" value={`${state.streak} jour${state.streak > 1 ? "s" : ""}`} icon="🔥" />
          <StatCard label="QCM reussis" value={String(state.totalQuizCorrect)} icon="✅" />
          <StatCard label="Examens passes" value={String(state.totalExamsTaken)} icon="📝" />
          <StatCard label="Badges" value={`${state.earnedBadges.length}/17`} icon="🏅" />
        </div>
      </div>

      {/* Levels roadmap */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Progression des niveaux</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {LEVELS.map((lvl) => {
            const reached = state.xp >= lvl.xpRequired;
            return (
              <div
                key={lvl.level}
                className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs transition ${
                  reached
                    ? "border-[#d4af37]/50 bg-[#d4af37]/10 font-bold text-[#1a3a5c]"
                    : "border-zinc-200 bg-zinc-50 text-zinc-400"
                }`}
              >
                <span className="text-base">{lvl.icon}</span>
                <span>{lvl.title}</span>
                <span className="text-[10px] text-zinc-400">{lvl.xpRequired} XP</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Time tracker */}
      <GlobalTimeTracker />

      {/* Badges */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-zinc-400">Badges</h3>
        <BadgesGrid />
      </div>

      {/* Exam results */}
      {examResults.length > 0 && (
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-zinc-400">Resultats d&apos;examens</h3>
          <div className="space-y-2">
            {examResults.map(([slug, result]) => {
              const pct = Math.round((result.score / result.total) * 100);
              const passed = pct >= 80;
              return (
                <div key={slug} className="flex items-center justify-between rounded-lg border border-zinc-100 p-3">
                  <div>
                    <span className="text-sm font-medium text-zinc-800 capitalize">{slug}</span>
                    <span className="ml-2 text-xs text-zinc-400">
                      {new Date(result.date).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${passed ? "text-emerald-600" : "text-amber-600"}`}>
                      {result.score}/{result.total}
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      passed ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    }`}>
                      {passed ? "REUSSI" : "A REVOIR"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* XP History */}
      {state.xpHistory.length > 0 && (
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-zinc-400">
            Derniers gains XP
          </h3>
          <div className="max-h-48 space-y-1 overflow-y-auto">
            {[...state.xpHistory].reverse().slice(0, 20).map((entry, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="text-zinc-500">{entry.reason}</span>
                <span className="font-bold text-[#d4af37]">+{entry.amount} XP</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certificate */}
      <CertificateGenerator />
      
      {/* LinkedIn Certificate */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <CertificatePreview />
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="rounded-xl bg-white/10 px-3 py-2.5 text-center backdrop-blur">
      <div className="text-lg">{icon}</div>
      <div className="text-lg font-bold">{value}</div>
      <div className="text-[10px] text-white/70">{label}</div>
    </div>
  );
}
