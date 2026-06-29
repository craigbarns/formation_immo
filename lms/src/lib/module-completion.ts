import { createAdminClient } from "@/lib/supabase/admin";
import { COURSE, lessonId } from "@/data/course";
import { isAttestationEligible, requiredSecondsForModule } from "@/lib/module-attestation-rules";

/** Clés lesson_progress d'un module (format "module/lecon"), ou null si module inconnu. */
export function getModuleLessonKeys(moduleSlug: string): string[] | null {
  const mod = COURSE.find((m) => m.slug === moduleSlug);
  if (!mod) return null;
  return mod.lessons.map((l) => lessonId(moduleSlug, l.slug));
}

export type ModuleCompletion = {
  /** Éligible à l'attestation : TOUTES les leçons faites ET temps minimum atteint. */
  completed: boolean;
  /** Date de la dernière leçon complétée (ISO), si toutes les leçons sont faites. */
  completedAt: string | null;
  /** Toutes les leçons sont cochées (sans tenir compte du temps). */
  lessonsDone: boolean;
  /** Temps réellement passé dans le module (secondes). */
  timeSpentSec: number;
  /** Temps minimum requis pour l'attestation (secondes). */
  requiredSec: number;
};

/**
 * Complétion CÔTÉ SERVEUR d'un module pour l'attestation de suivi (spec §5.8).
 * Deux conditions (anti-fraude) : toutes les leçons cochées dans lesson_progress
 * ET un temps minimum réellement passé dans le module (module_timers) — sinon un
 * simple clic « terminé » suffirait à obtenir l'attestation sans suivre le module.
 */
export async function getModuleCompletion(
  userId: string,
  moduleSlug: string
): Promise<ModuleCompletion> {
  const requiredSec = requiredSecondsForModule(moduleSlug);
  const keys = getModuleLessonKeys(moduleSlug);
  if (!keys || keys.length === 0) {
    return { completed: false, completedAt: null, lessonsDone: false, timeSpentSec: 0, requiredSec };
  }

  const admin = createAdminClient();

  // 1. Toutes les leçons cochées ?
  const { data: progressData, error: progressErr } = await admin
    .from("lesson_progress")
    .select("lesson_key, completed_at")
    .eq("user_id", userId)
    .eq("completed", true)
    .in("lesson_key", keys);

  if (progressErr) throw new Error(progressErr.message);

  const rows = progressData ?? [];
  const done = new Set(rows.map((r) => r.lesson_key));
  const lessonsDone = keys.every((k) => done.has(k));

  // 2. Temps réellement passé dans le module (même source que la certification 42h)
  const { data: gamRow } = await admin
    .from("gamification_state")
    .select("module_timers")
    .eq("user_id", userId)
    .maybeSingle();
  const timers = (gamRow?.module_timers ?? {}) as Record<string, number>;
  const timeSpentSec = Math.max(0, Math.round(timers[moduleSlug] ?? 0));

  const completed = isAttestationEligible({ lessonsDone, timeSpentSec, requiredSec });

  const completedAt = lessonsDone
    ? (rows
        .map((r) => r.completed_at as string | null)
        .filter((d): d is string => Boolean(d))
        .sort()
        .at(-1) ?? new Date().toISOString())
    : null;

  return { completed, completedAt, lessonsDone, timeSpentSec, requiredSec };
}
