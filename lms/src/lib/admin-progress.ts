import { FORMATION_MODULES, lessonId } from "@/data/course";
import { getTotalLessonCount } from "@/lib/formation-journey";

/**
 * Progression admin scoppée au PARCOURS certifiant (42h = FORMATION_MODULES).
 *
 * Les formations autonomes (add-ons 59€ : murs & fonds, rénovation énergétique,
 * immobilier & IA) ont leur propre attestation et ne font PAS partie du parcours.
 * Sans ce cadrage, une cliente pack qui a fini ses 42h plafonnait sous 100 %
 * (bug Curel) car le dénominateur incluait des leçons qu'elle n'a jamais achetées.
 */

/** Clés de leçons du parcours certifiant (`slug/lecon`), add-ons exclus. */
export function parcoursLessonKeySet(): Set<string> {
  const keys = new Set<string>();
  for (const mod of FORMATION_MODULES) {
    for (const l of mod.lessons) keys.add(lessonId(mod.slug, l.slug));
  }
  return keys;
}

/** Leçons du parcours réellement complétées (ignore les leçons d'add-ons). */
export function completedParcoursCount(completedKeys: Iterable<string>): number {
  const parcours = parcoursLessonKeySet();
  let n = 0;
  for (const k of completedKeys) if (parcours.has(k)) n++;
  return n;
}

/** Taux de progression sur le parcours certifiant (entier 0–100, borné). */
export function parcoursProgressPct(completedKeys: Iterable<string>): number {
  const total = getTotalLessonCount();
  if (total <= 0) return 0;
  return Math.min(100, Math.round((completedParcoursCount(completedKeys) / total) * 100));
}
