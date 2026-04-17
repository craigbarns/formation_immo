"use server";

import { createClient } from "@/lib/supabase/server";
import type { GamificationState, BadgeId } from "@/lib/gamification";

export async function getGamificationState(): Promise<GamificationState> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return {
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
  }

  const { data } = await supabase
    .from("gamification_state")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!data) {
    return {
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
  }

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

export async function getUserXP(): Promise<number> {
  const state = await getGamificationState();
  return state.xp;
}

export async function getUserStreak(): Promise<number> {
  const state = await getGamificationState();
  return state.streak;
}

export async function getEarnedBadges(): Promise<BadgeId[]> {
  const state = await getGamificationState();
  return state.earnedBadges;
}
