"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Target, CheckCircle2 } from "lucide-react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";
import { createClient } from "@/lib/supabase/client";

const DAILY_GOAL_KEY = "formation-daily-goal";
const DAILY_PROGRESS_KEY = "formation-daily-progress";

interface DailyGoal {
  lessonsPerDay: number;
  minutesPerDay: number;
}

interface DailyProgress {
  date: string;
  lessonsCompleted: number;
  minutesSpent: number;
}

function getLocalDailyGoal(): DailyGoal {
  if (typeof window === "undefined") return { lessonsPerDay: 2, minutesPerDay: 30 };
  const saved = localStorage.getItem(DAILY_GOAL_KEY);
  return saved ? JSON.parse(saved) : { lessonsPerDay: 2, minutesPerDay: 30 };
}

function getLocalDailyProgress(): DailyProgress {
  const today = new Date().toISOString().slice(0, 10);
  if (typeof window === "undefined") return { date: today, lessonsCompleted: 0, minutesSpent: 0 };
  const savedProgress = localStorage.getItem(DAILY_PROGRESS_KEY);
  if (savedProgress) {
    const parsed = JSON.parse(savedProgress);
    if (parsed.date === today) {
      return parsed;
    }
  }
  return { date: today, lessonsCompleted: 0, minutesSpent: 0 };
}

export function useDailyGoal() {
  const [goal, setGoal] = useState<DailyGoal>({ lessonsPerDay: 2, minutesPerDay: 30 });
  const [progress, setProgress] = useState<DailyProgress>(() => {
    const today = new Date().toISOString().slice(0, 10);
    return { date: today, lessonsCompleted: 0, minutesSpent: 0 };
  });

  const goalRef = useRef(goal);
  const progressRef = useRef(progress);

  // Synchronise les refs avec le state à chaque rendu via un effet
  // (les writes pendant le render sont interdits par react-hooks/refs).
  useEffect(() => {
    goalRef.current = goal;
  }, [goal]);
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    let cancelled = false;
    const localGoal = getLocalDailyGoal();
    const localProgress = getLocalDailyProgress();
    queueMicrotask(() => {
      if (cancelled) return;
      setGoal(localGoal);
      setProgress(localProgress);
      goalRef.current = localGoal;
      progressRef.current = localProgress;
    });

    (async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (cancelled || !user) return;

      const { data } = await supabase
        .from("user_settings")
        .select("daily_goal, daily_progress")
        .eq("user_id", user.id)
        .single();

      if (cancelled) return;

      if (data?.daily_goal) {
        const g = data.daily_goal as DailyGoal;
        setGoal(g);
        goalRef.current = g;
      }
      if (data?.daily_progress) {
        const parsed = data.daily_progress as DailyProgress;
        const today = new Date().toISOString().slice(0, 10);
        const p = parsed.date === today
          ? parsed
          : { date: today, lessonsCompleted: 0, minutesSpent: 0 };
        setProgress(p);
        progressRef.current = p;
      }
    })();

    return () => { cancelled = true; };
  }, []);

  const saveToSupabase = async (goalData: DailyGoal, progressData: DailyProgress) => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
      .from("user_settings")
      .upsert({
        user_id: user.id,
        daily_goal: goalData,
        daily_progress: progressData,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });
  };

  const updateGoal = (newGoal: Partial<DailyGoal>) => {
    const updated = { ...goalRef.current, ...newGoal };
    goalRef.current = updated;
    setGoal(updated);
    localStorage.setItem(DAILY_GOAL_KEY, JSON.stringify(updated));
    saveToSupabase(updated, progressRef.current);
  };

  const recordLessonCompletion = () => {
    const today = new Date().toISOString().slice(0, 10);
    const prev = progressRef.current;
    const updated = prev.date === today
      ? { ...prev, lessonsCompleted: prev.lessonsCompleted + 1 }
      : { date: today, lessonsCompleted: 1, minutesSpent: 0 };
    progressRef.current = updated;
    setProgress(updated);
    localStorage.setItem(DAILY_PROGRESS_KEY, JSON.stringify(updated));
    saveToSupabase(goalRef.current, updated);
  };

  const recordMinutes = (minutes: number) => {
    const today = new Date().toISOString().slice(0, 10);
    const prev = progressRef.current;
    const updated = prev.date === today
      ? { ...prev, minutesSpent: prev.minutesSpent + minutes }
      : { date: today, lessonsCompleted: 0, minutesSpent: minutes };
    progressRef.current = updated;
    setProgress(updated);
    localStorage.setItem(DAILY_PROGRESS_KEY, JSON.stringify(updated));
    saveToSupabase(goalRef.current, updated);
  };

  const isGoalReached = progress.lessonsCompleted >= goal.lessonsPerDay || progress.minutesSpent >= goal.minutesPerDay;
  const progressPercent = Math.min(100, Math.max(
    (progress.lessonsCompleted / goal.lessonsPerDay) * 100,
    (progress.minutesSpent / goal.minutesPerDay) * 100
  ));

  return { goal, progress, updateGoal, recordLessonCompletion, recordMinutes, isGoalReached, progressPercent };
}

export function DailyGoalTracker() {
  const { goal, progress, progressPercent, isGoalReached } = useDailyGoal();

  return (
    <div className="rounded-2xl border border-brand-gold/20 bg-gradient-to-br from-brand-navy to-[#0a1f35] dark:from-brand-navy/50 dark:to-[#0f172a]/50 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
            isGoalReached 
              ? "bg-emerald-500/20 text-emerald-400" 
              : "bg-brand-gold/20 text-brand-gold"
          }`}>
            {isGoalReached ? <CheckCircle2 className="h-5 w-5" /> : <Target className="h-5 w-5" />}
          </div>
          <div>
            <h4 className="font-semibold text-white">Objectif du jour</h4>
            <p className="text-xs text-white/80">
              {progress.lessonsCompleted}/{goal.lessonsPerDay} leçons • {progress.minutesSpent}/{goal.minutesPerDay} min
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <span className={`text-2xl font-bold ${isGoalReached ? "text-emerald-400" : "text-brand-gold"}`}>
            {Math.round(progressPercent)}%
          </span>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`h-full rounded-full ${
            isGoalReached 
              ? "bg-gradient-to-r from-emerald-500 to-teal-500" 
              : "bg-gradient-to-r from-brand-gold to-[var(--brand-gold-light)]"
          }`}
        />
      </div>
      
      {isGoalReached && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-center text-sm font-medium text-emerald-400"
        >
          <EmojiIcon emoji="🎉" className="h-4 w-4 inline-block" /> Objectif atteint ! Continuez comme ça !
        </motion.p>
      )}
    </div>
  );
}
