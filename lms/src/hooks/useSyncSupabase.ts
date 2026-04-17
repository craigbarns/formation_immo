"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import type { GamificationState } from "@/lib/gamification";

/**
 * Hook de synchronisation hybride Supabase ↔ localStorage.
 * Au chargement : si connecté, pull Supabase → localStorage.
 * Périodiquement : push localStorage → Supabase.
 */
export function useSyncSupabase() {
  const syncedRef = useRef(false);

  useEffect(() => {
    const supabase = createClient();

    async function sync() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        syncedRef.current = false;
        return;
      }

      if (syncedRef.current) return;
      syncedRef.current = true;

      // ── Pull lesson_progress from Supabase → localStorage ──
      const { data: progressRows } = await supabase
        .from("lesson_progress")
        .select("lesson_key, completed")
        .eq("user_id", user.id);

      const progressMap: Record<string, boolean> = {};
      progressRows?.forEach((r) => { progressMap[r.lesson_key] = r.completed; });
      localStorage.setItem("formation-immobilier-progress", JSON.stringify(progressMap));

      // ── Pull gamification_state from Supabase → localStorage ──
      const { data: gameRow } = await supabase
        .from("gamification_state")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (gameRow) {
        const gameState = {
          xp: gameRow.xp,
          earnedBadges: gameRow.earned_badges || [],
          streak: gameRow.streak,
          lastLoginDate: gameRow.last_login_date,
          totalQuizCorrect: gameRow.total_quiz_correct,
          totalExamsTaken: gameRow.total_exams_taken,
          totalExamsPerfect: gameRow.total_exams_perfect,
          simulatorsUsed: gameRow.simulators_used || [],
          lessonTimes: gameRow.lesson_times || {},
          examScores: gameRow.exam_scores || {},
          xpHistory: gameRow.xp_history || [],
          moduleTimers: gameRow.module_timers || {},
          dailyActivity: gameRow.daily_activity || {},
          completedChecklists: gameRow.completed_checklists || [],
          flashcardsReviewed: gameRow.flashcards_reviewed,
        };
        localStorage.setItem("formation-immobilier-gamification", JSON.stringify(gameState));
      }

      // ── Pull bookmarks from Supabase → localStorage ──
      const { data: bookmarkRows } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", user.id);

      if (bookmarkRows) {
        const bookmarksState = {
          bookmarks: bookmarkRows.map((b) => ({
            id: b.id,
            moduleSlug: b.module_slug,
            lessonSlug: b.lesson_slug,
            lessonTitle: b.lesson_title,
            moduleTitle: b.module_title,
            createdAt: b.created_at,
          })),
          version: 1,
        };
        localStorage.setItem("formation-immobilier-bookmarks", JSON.stringify(bookmarksState));
      }

      // ── Pull notes from Supabase → localStorage ──
      const { data: noteRows } = await supabase
        .from("notes")
        .select("*")
        .eq("user_id", user.id);

      if (noteRows) {
        const notesState = {
          notes: noteRows.map((n) => ({
            id: n.id,
            moduleSlug: n.module_slug,
            lessonSlug: n.lesson_slug,
            content: n.content,
            color: n.color,
            createdAt: n.created_at,
            updatedAt: n.updated_at,
          })),
          version: 1,
        };
        localStorage.setItem("formation-immobilier-notes", JSON.stringify(notesState));
      }

      // Dispatch event to notify components that data changed
      window.dispatchEvent(new CustomEvent("formation-progress-changed"));
      window.dispatchEvent(new CustomEvent("formation-data-synced"));
    }

    sync();

    // Re-sync on auth state change
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        syncedRef.current = false;
        sync();
      }
    });

    // Push gamification changes to Supabase
    const handleGameChange = async (e: Event) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const state = (e as CustomEvent<GamificationState>).detail;
      if (!state) return;

      await supabase.from("gamification_state").upsert({
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
    };

    window.addEventListener("gamification-state-changed", handleGameChange);

    // Push bookmarks changes to Supabase
    const handleBookmarksChange = async (e: Event) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const state = (e as CustomEvent<{ bookmarks: { id: string; moduleSlug: string; lessonSlug: string; lessonTitle: string; moduleTitle: string; createdAt: string }[] }>).detail;
      if (!state) return;

      // Delete all existing bookmarks and re-insert
      await supabase.from("bookmarks").delete().eq("user_id", user.id);
      if (state.bookmarks.length > 0) {
        await supabase.from("bookmarks").insert(
          state.bookmarks.map((b) => ({
            user_id: user.id,
            module_slug: b.moduleSlug,
            lesson_slug: b.lessonSlug,
            lesson_title: b.lessonTitle,
            module_title: b.moduleTitle,
            created_at: b.createdAt,
          }))
        );
      }
    };
    window.addEventListener("bookmarks-state-changed", handleBookmarksChange);

    // Push notes changes to Supabase
    const handleNotesChange = async (e: Event) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const state = (e as CustomEvent<{ notes: { id: string; moduleSlug: string; lessonSlug: string; content: string; color: string; createdAt: string; updatedAt: string }[] }>).detail;
      if (!state) return;

      await supabase.from("notes").delete().eq("user_id", user.id);
      if (state.notes.length > 0) {
        await supabase.from("notes").insert(
          state.notes.map((n) => ({
            user_id: user.id,
            module_slug: n.moduleSlug,
            lesson_slug: n.lessonSlug,
            content: n.content,
            color: n.color,
            created_at: n.createdAt,
            updated_at: n.updatedAt,
          }))
        );
      }
    };
    window.addEventListener("notes-state-changed", handleNotesChange);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener("gamification-state-changed", handleGameChange);
      window.removeEventListener("bookmarks-state-changed", handleBookmarksChange);
      window.removeEventListener("notes-state-changed", handleNotesChange);
    };
  }, []);
}
