"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { getGamificationState, getLevelForXP, LEVELS, type GamificationState } from "@/lib/gamification";
import { BadgesGrid } from "@/components/gamification/BadgesGrid";
import { GlobalTimeTracker } from "@/components/gamification/ModuleTimeTracker";
import { CertificateGenerator } from "@/components/certificate/CertificateGenerator";
import { CertificatePreview } from "@/components/certificate";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

export function ProfileContent() {
  const [state, setState] = useState<GamificationState | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from("gamification_state")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (data) {
          setState({
            xp: data.xp,
            earnedBadges: data.earned_badges || [],
            streak: data.streak,
            lastLoginDate: data.last_login_date,
            totalQuizCorrect: data.total_quiz_correct,
            totalExamsTaken: data.total_exams_taken,
            totalExamsPerfect: data.total_exams_perfect,
            simulatorsUsed: data.simulators_used || [],
            lessonTimes: data.lesson_times || {},
            examScores: data.exam_scores || {},
            xpHistory: data.xp_history || [],
            moduleTimers: data.module_timers || {},
            dailyActivity: data.daily_activity || {},
            completedChecklists: data.completed_checklists || [],
            flashcardsReviewed: data.flashcards_reviewed,
          });
          return;
        }
      }

      // Fallback to localStorage if not logged in or no Supabase data
      setState(getGamificationState());
    }

    load();
  }, []);

  if (!state) return null;

  const { current, next, progressToNext } = getLevelForXP(state.xp);
  const examResults = Object.entries(state.examScores);

  return (
    <div className="mt-8 space-y-8">
      {/* Level & XP Card */}
      <div className="rounded-2xl border-2 border-brand-navy/15 bg-gradient-to-br from-brand-navy to-[var(--brand-navy-alt)] p-6 text-white shadow-lg">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 text-4xl backdrop-blur">
            <EmojiIcon emoji={current.icon} className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-gold">
              Niveau {current.level}
            </p>
            <h2 className="text-2xl font-bold">{current.title}</h2>
            <div className="mt-2 flex items-center gap-3">
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand-gold to-[var(--brand-gold-pale)] transition-all duration-700"
                  style={{ width: `${progressToNext}%` }}
                />
              </div>
              <span className="text-sm font-bold tabular-nums">
                {state.xp} XP
              </span>
            </div>
            {next && (
              <p className="mt-1 text-xs text-white/80">
                {next.xpRequired - state.xp} XP pour atteindre <EmojiIcon emoji={next.icon} className="inline h-3 w-3" /> {next.title}
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
                    ? "border-brand-gold/50 bg-brand-gold/10 font-bold text-brand-navy"
                    : "border-zinc-200 bg-zinc-50 text-zinc-400"
                }`}
              >
                <EmojiIcon emoji={lvl.icon} className="h-4 w-4" />
                <span>{lvl.title}</span>
                <span className="text-2xs text-zinc-400">{lvl.xpRequired} XP</span>
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
                    <span className={`rounded-full px-2 py-0.5 text-2xs font-bold ${
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
                <span className="font-bold text-brand-gold">+{entry.amount} XP</span>
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
      <div className="flex justify-center"><EmojiIcon emoji={icon} className="h-5 w-5 text-white/90" /></div>
      <div className="text-lg font-bold">{value}</div>
      <div className="text-2xs text-white/80">{label}</div>
    </div>
  );
}
