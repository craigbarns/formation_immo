"use server";

import { createClient } from "@/lib/supabase/server";

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

export async function getUserSettings(): Promise<UserSettings> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return DEFAULT_SETTINGS;

  const { data } = await supabase
    .from("user_settings")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!data) return DEFAULT_SETTINGS;

  return {
    theme: data.theme || "system",
    dailyGoal: data.daily_goal || DEFAULT_SETTINGS.dailyGoal,
    focusMode: data.focus_mode || false,
  };
}

export async function saveUserSettings(settings: Partial<UserSettings>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const current = await getUserSettings();
  const merged = { ...current, ...settings };

  await supabase
    .from("user_settings")
    .upsert({
      user_id: user.id,
      theme: merged.theme,
      daily_goal: merged.dailyGoal,
      focus_mode: merged.focusMode,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" });
}
