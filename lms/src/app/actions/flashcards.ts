"use server";

import { createClient } from "@/lib/supabase/server";

export async function getFlashcardsSM2(): Promise<unknown[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("flashcards_sm2")
    .select("cards")
    .eq("user_id", user.id)
    .single();

  return (data?.cards as unknown[]) || [];
}

export async function saveFlashcardsSM2(cards: unknown[]) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from("flashcards_sm2")
    .upsert({
      user_id: user.id,
      cards: cards as Record<string, unknown>[],
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" });
}
