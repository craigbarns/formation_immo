import { createAdminClient } from "@/lib/supabase/admin";
import { COURSE, lessonId } from "@/data/course";

/** Clés lesson_progress d'un module (format "module/lecon"), ou null si module inconnu. */
export function getModuleLessonKeys(moduleSlug: string): string[] | null {
  const mod = COURSE.find((m) => m.slug === moduleSlug);
  if (!mod) return null;
  return mod.lessons.map((l) => lessonId(moduleSlug, l.slug));
}

export type ModuleCompletion = {
  completed: boolean;
  /** Date de la dernière leçon complétée (ISO), si le module est terminé. */
  completedAt: string | null;
};

/**
 * Complétion CÔTÉ SERVEUR d'un module : toutes ses leçons cochées dans
 * lesson_progress (source de vérité utilisée par l'attestation — Règle d'or §4).
 */
export async function getModuleCompletion(
  userId: string,
  moduleSlug: string
): Promise<ModuleCompletion> {
  const keys = getModuleLessonKeys(moduleSlug);
  if (!keys || keys.length === 0) return { completed: false, completedAt: null };

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("lesson_progress")
    .select("lesson_key, completed_at")
    .eq("user_id", userId)
    .eq("completed", true)
    .in("lesson_key", keys);

  if (error) throw new Error(error.message);

  const rows = data ?? [];
  const done = new Set(rows.map((r) => r.lesson_key));
  const completed = keys.every((k) => done.has(k));
  if (!completed) return { completed: false, completedAt: null };

  const completedAt = rows
    .map((r) => r.completed_at as string | null)
    .filter((d): d is string => Boolean(d))
    .sort()
    .at(-1) ?? new Date().toISOString();

  return { completed: true, completedAt };
}
