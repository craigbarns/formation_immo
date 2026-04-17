"use server";

import { createClient } from "@/lib/supabase/server";
import type { GamificationState, BadgeId } from "@/lib/gamification";

const DEFAULT_GAMIFICATION_STATE: GamificationState = {
  xp: 0,
  earnedBadges: [],
  streak: 0,
  lastLoginDate: "",
  totalQuizCorrect: 0,
  totalExamsTaken: 0,
  totalExamsPerfect: 0,
  simulatorsUsed: [],
  lessonTimes: {},
  examScores: {},
  xpHistory: [],
  moduleTimers: {},
  dailyActivity: {},
  completedChecklists: [],
  flashcardsReviewed: 0,
};

export async function getGamificationState(): Promise<GamificationState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ...DEFAULT_GAMIFICATION_STATE, earnedBadges: [] };

  const { data } = await supabase
    .from("gamification_state")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!data) return { ...DEFAULT_GAMIFICATION_STATE, earnedBadges: [] };

  return {
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
  };
}

export async function saveGamificationState(state: GamificationState) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from("gamification_state")
    .upsert({
      user_id: user.id,
      xp: state.xp,
      earned_badges: state.earnedBadges,
      streak: state.streak,
      last_login_date: state.lastLoginDate,
      total_quiz_correct: state.totalQuizCorrect,
      total_exams_taken: state.totalExamsTaken,
      total_exams_perfect: state.totalExamsPerfect,
      simulators_used: state.simulatorsUsed,
      lesson_times: state.lessonTimes,
      exam_scores: state.examScores,
      xp_history: state.xpHistory,
      module_timers: state.moduleTimers,
      daily_activity: state.dailyActivity,
      completed_checklists: state.completedChecklists,
      flashcards_reviewed: state.flashcardsReviewed,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" });
}

export async function recordSimulatorUsed(simulator: string) {
  const state = await getGamificationState();
  if (!state.simulatorsUsed.includes(simulator)) {
    state.simulatorsUsed.push(simulator);
    await saveGamificationState(state);
  }
}

export async function addXP(amount: number, reason: string) {
  const state = await getGamificationState();
  state.xp += amount;
  state.xpHistory.push({ amount, reason, date: new Date().toISOString() });
  await saveGamificationState(state);
}
