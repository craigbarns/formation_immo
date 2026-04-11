"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Target, CheckCircle2 } from "lucide-react";
import { getStoredProgress } from "@/components/LessonProgress";

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

export function useDailyGoal() {
  const [goal, setGoal] = useState<DailyGoal>({ lessonsPerDay: 2, minutesPerDay: 30 });
  const [progress, setProgress] = useState<DailyProgress>({ date: "", lessonsCompleted: 0, minutesSpent: 0 });

  useEffect(() => {
    const savedGoal = localStorage.getItem(DAILY_GOAL_KEY);
    if (savedGoal) {
      setGoal(JSON.parse(savedGoal));
    }
    
    const today = new Date().toISOString().slice(0, 10);
    const savedProgress = localStorage.getItem(DAILY_PROGRESS_KEY);
    
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress);
      if (parsed.date === today) {
        setProgress(parsed);
      } else {
        setProgress({ date: today, lessonsCompleted: 0, minutesSpent: 0 });
      }
    }
  }, []);

  const updateGoal = (newGoal: Partial<DailyGoal>) => {
    const updated = { ...goal, ...newGoal };
    setGoal(updated);
    localStorage.setItem(DAILY_GOAL_KEY, JSON.stringify(updated));
  };

  const recordLessonCompletion = () => {
    const today = new Date().toISOString().slice(0, 10);
    setProgress(prev => {
      const updated = prev.date === today 
        ? { ...prev, lessonsCompleted: prev.lessonsCompleted + 1 }
        : { date: today, lessonsCompleted: 1, minutesSpent: 0 };
      localStorage.setItem(DAILY_PROGRESS_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const recordMinutes = (minutes: number) => {
    const today = new Date().toISOString().slice(0, 10);
    setProgress(prev => {
      const updated = prev.date === today 
        ? { ...prev, minutesSpent: prev.minutesSpent + minutes }
        : { date: today, lessonsCompleted: 0, minutesSpent: minutes };
      localStorage.setItem(DAILY_PROGRESS_KEY, JSON.stringify(updated));
      return updated;
    });
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
    <div className="rounded-2xl border border-[#d4af37]/20 bg-gradient-to-br from-[#1a3a5c]/50 to-[#0f1f33]/50 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
            isGoalReached 
              ? "bg-emerald-500/20 text-emerald-400" 
              : "bg-[#d4af37]/20 text-[#d4af37]"
          }`}>
            {isGoalReached ? <CheckCircle2 className="h-5 w-5" /> : <Target className="h-5 w-5" />}
          </div>
          <div>
            <h4 className="font-semibold text-white">Objectif du jour</h4>
            <p className="text-xs text-white/50">
              {progress.lessonsCompleted}/{goal.lessonsPerDay} leçons • {progress.minutesSpent}/{goal.minutesPerDay} min
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <span className={`text-2xl font-bold ${isGoalReached ? "text-emerald-400" : "text-[#d4af37]"}`}>
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
              : "bg-gradient-to-r from-[#d4af37] to-[#f0c040]"
          }`}
        />
      </div>
      
      {isGoalReached && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-center text-sm font-medium text-emerald-400"
        >
          🎉 Objectif atteint ! Continuez comme ça !
        </motion.p>
      )}
    </div>
  );
}
