"use server";

import { createClient } from "@/lib/supabase/server";

export interface Bookmark {
  id: string;
  moduleSlug: string;
  lessonSlug: string;
  lessonTitle: string;
  moduleTitle: string;
  createdAt: string;
}

export async function getBookmarks(): Promise<Bookmark[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (data || []).map((b) => ({
    id: b.id,
    moduleSlug: b.module_slug,
    lessonSlug: b.lesson_slug,
    lessonTitle: b.lesson_title,
    moduleTitle: b.module_title,
    createdAt: b.created_at,
  }));
}

export async function addBookmark(bookmark: Omit<Bookmark, "id" | "createdAt">) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from("bookmarks")
    .upsert({
      user_id: user.id,
      module_slug: bookmark.moduleSlug,
      lesson_slug: bookmark.lessonSlug,
      lesson_title: bookmark.lessonTitle,
      module_title: bookmark.moduleTitle,
    }, { onConflict: "user_id,module_slug,lesson_slug" });
}

export async function removeBookmark(moduleSlug: string, lessonSlug: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from("bookmarks")
    .delete()
    .eq("user_id", user.id)
    .eq("module_slug", moduleSlug)
    .eq("lesson_slug", lessonSlug);
}

export async function isBookmarked(moduleSlug: string, lessonSlug: string): Promise<boolean> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data } = await supabase
    .from("bookmarks")
    .select("id")
    .eq("user_id", user.id)
    .eq("module_slug", moduleSlug)
    .eq("lesson_slug", lessonSlug)
    .single();

  return !!data;
}
