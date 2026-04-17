"use server";

import { createClient } from "@/lib/supabase/server";

export interface Note {
  id: string;
  moduleSlug: string;
  lessonSlug: string;
  content: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export async function getNotes(): Promise<Note[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (data || []).map((n) => ({
    id: n.id,
    moduleSlug: n.module_slug,
    lessonSlug: n.lesson_slug,
    content: n.content,
    color: n.color,
    createdAt: n.created_at,
    updatedAt: n.updated_at,
  }));
}

export async function getNotesForLesson(moduleSlug: string, lessonSlug: string): Promise<Note[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", user.id)
    .eq("module_slug", moduleSlug)
    .eq("lesson_slug", lessonSlug)
    .order("created_at", { ascending: true });

  return (data || []).map((n) => ({
    id: n.id,
    moduleSlug: n.module_slug,
    lessonSlug: n.lesson_slug,
    content: n.content,
    color: n.color,
    createdAt: n.created_at,
    updatedAt: n.updated_at,
  }));
}

export async function addNote(moduleSlug: string, lessonSlug: string, content: string, color: string = "yellow") {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from("notes")
    .insert({
      user_id: user.id,
      module_slug: moduleSlug,
      lesson_slug: lessonSlug,
      content,
      color,
    });
}

export async function updateNote(noteId: string, content: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from("notes")
    .update({ content, updated_at: new Date().toISOString() })
    .eq("id", noteId)
    .eq("user_id", user.id);
}

export async function deleteNote(noteId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from("notes")
    .delete()
    .eq("id", noteId)
    .eq("user_id", user.id);
}

export async function searchNotes(query: string): Promise<Note[]> {
  const all = await getNotes();
  const lower = query.toLowerCase();
  return all.filter((n) => n.content.toLowerCase().includes(lower));
}
