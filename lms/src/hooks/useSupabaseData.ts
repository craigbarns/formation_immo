"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { GamificationState } from "@/lib/gamification";
import type { BadgeId } from "@/lib/gamification";

const supabase = createClient();

/* ─── Lesson Progress ─── */

export function useLessonProgress() {
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from("lesson_progress")
        .select("lesson_key, completed")
        .eq("user_id", user.id);

      const map: Record<string, boolean> = {};
      data?.forEach((row) => { map[row.lesson_key] = row.completed; });
      setProgress(map);
      setLoading(false);
    }
    load();
  }, []);

  const toggle = useCallback(async (lessonKey: string, completed: boolean) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    setProgress((prev) => ({ ...prev, [lessonKey]: completed }));

    if (completed) {
      await supabase.from("lesson_progress").upsert({
        user_id: user.id,
        lesson_key: lessonKey,
        completed: true,
        completed_at: new Date().toISOString(),
      }, { onConflict: "user_id,lesson_key" });
    } else {
      await supabase
        .from("lesson_progress")
        .delete()
        .eq("user_id", user.id)
        .eq("lesson_key", lessonKey);
    }
  }, []);

  return { progress, loading, toggle };
}

/* ─── Gamification ─── */

const DEFAULT_STATE: GamificationState = {
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

export function useGamificationState() {
  const [state, setState] = useState<GamificationState>(DEFAULT_STATE);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }
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
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (cancelled) return;
      if (!user) {
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from("gamification_state")
        .select("*")
        .eq("user_id", user.id)
        .single();
      if (cancelled) return;
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
      }
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  const save = useCallback(async (next: Partial<GamificationState>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    setState((prev) => ({ ...prev, ...next }));

    const merged = { ...state, ...next };
    await supabase.from("gamification_state").upsert({
      user_id: user.id,
      xp: merged.xp,
      earned_badges: merged.earnedBadges,
      streak: merged.streak,
      last_login_date: merged.lastLoginDate,
      total_quiz_correct: merged.totalQuizCorrect,
      total_exams_taken: merged.totalExamsTaken,
      total_exams_perfect: merged.totalExamsPerfect,
      simulators_used: merged.simulatorsUsed,
      lesson_times: merged.lessonTimes,
      exam_scores: merged.examScores,
      xp_history: merged.xpHistory,
      module_timers: merged.moduleTimers,
      daily_activity: merged.dailyActivity,
      completed_checklists: merged.completedChecklists,
      flashcards_reviewed: merged.flashcardsReviewed,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" });
  }, [state]);

  return { state, loading, save, refresh: load };
}

/* ─── Bookmarks ─── */

export interface BookmarkItem {
  id: string;
  moduleSlug: string;
  lessonSlug: string;
  lessonTitle: string;
  moduleTitle: string;
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setBookmarks((data || []).map((b) => ({
      id: b.id,
      moduleSlug: b.module_slug,
      lessonSlug: b.lesson_slug,
      lessonTitle: b.lesson_title,
      moduleTitle: b.module_title,
    })));
    setLoading(false);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (cancelled) return;
      if (!user) { setLoading(false); return; }
      const { data } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (cancelled) return;
      setBookmarks((data || []).map((b) => ({
        id: b.id,
        moduleSlug: b.module_slug,
        lessonSlug: b.lesson_slug,
        lessonTitle: b.lesson_title,
        moduleTitle: b.module_title,
      })));
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  const add = useCallback(async (item: Omit<BookmarkItem, "id">) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("bookmarks").upsert({
      user_id: user.id,
      module_slug: item.moduleSlug,
      lesson_slug: item.lessonSlug,
      lesson_title: item.lessonTitle,
      module_title: item.moduleTitle,
    }, { onConflict: "user_id,module_slug,lesson_slug" });
    await load();
  }, [load]);

  const remove = useCallback(async (moduleSlug: string, lessonSlug: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("bookmarks")
      .delete()
      .eq("user_id", user.id)
      .eq("module_slug", moduleSlug)
      .eq("lesson_slug", lessonSlug);
    await load();
  }, [load]);

  const isBookmarked = useCallback((moduleSlug: string, lessonSlug: string) => {
    return bookmarks.some((b) => b.moduleSlug === moduleSlug && b.lessonSlug === lessonSlug);
  }, [bookmarks]);

  return { bookmarks, loading, add, remove, isBookmarked, refresh: load };
}

/* ─── Notes ─── */

export interface NoteItem {
  id: string;
  moduleSlug: string;
  lessonSlug: string;
  content: string;
  color: string;
  createdAt: string;
}

export function useNotes(moduleSlug?: string, lessonSlug?: string) {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }

    let query = supabase.from("notes").select("*").eq("user_id", user.id);
    if (moduleSlug) query = query.eq("module_slug", moduleSlug);
    if (lessonSlug) query = query.eq("lesson_slug", lessonSlug);

    const { data } = await query.order("created_at", { ascending: true });
    setNotes((data || []).map((n) => ({
      id: n.id,
      moduleSlug: n.module_slug,
      lessonSlug: n.lesson_slug,
      content: n.content,
      color: n.color,
      createdAt: n.created_at,
    })));
    setLoading(false);
  }, [moduleSlug, lessonSlug]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (cancelled) return;
      if (!user) { setLoading(false); return; }

      let query = supabase.from("notes").select("*").eq("user_id", user.id);
      if (moduleSlug) query = query.eq("module_slug", moduleSlug);
      if (lessonSlug) query = query.eq("lesson_slug", lessonSlug);

      const { data } = await query.order("created_at", { ascending: true });
      if (cancelled) return;
      setNotes((data || []).map((n) => ({
        id: n.id,
        moduleSlug: n.module_slug,
        lessonSlug: n.lesson_slug,
        content: n.content,
        color: n.color,
        createdAt: n.created_at,
      })));
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [moduleSlug, lessonSlug]);

  const add = useCallback(async (content: string, color: string = "yellow") => {
    if (!moduleSlug || !lessonSlug) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("notes").insert({
      user_id: user.id,
      module_slug: moduleSlug,
      lesson_slug: lessonSlug,
      content,
      color,
    });
    await load();
  }, [moduleSlug, lessonSlug, load]);

  const remove = useCallback(async (noteId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("notes").delete().eq("id", noteId).eq("user_id", user.id);
    await load();
  }, [load]);

  return { notes, loading, add, remove, refresh: load };
}

/* ─── Settings ─── */

export interface UserSettings {
  theme: "light" | "dark" | "system";
  dailyGoal: { lessonsPerDay: number; minutesPerDay: number };
  focusMode: boolean;
}

const DEFAULT_SETTINGS: UserSettings = {
  theme: "system",
  dailyGoal: { lessonsPerDay: 2, minutesPerDay: 30 },
  focusMode: false,
};

export function useUserSettings() {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }
      const { data } = await supabase
        .from("user_settings")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (data) {
        setSettings({
          theme: data.theme || "system",
          dailyGoal: data.daily_goal || DEFAULT_SETTINGS.dailyGoal,
          focusMode: data.focus_mode || false,
        });
      }
      setLoading(false);
    }
    load();
  }, []);

  const update = useCallback(async (next: Partial<UserSettings>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    setSettings((prev) => {
      const merged = { ...prev, ...next };
      supabase.from("user_settings").upsert({
        user_id: user.id,
        theme: merged.theme,
        daily_goal: merged.dailyGoal,
        focus_mode: merged.focusMode,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" }).then();
      return merged;
    });
  }, []);

  return { settings, loading, update };
}
