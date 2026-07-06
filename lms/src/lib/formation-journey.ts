import { COURSE, FORMATION_MODULES, lessonId } from "@/data/course";

export type NextLessonInfo = {
  href: string;
  moduleSlug: string;
  lessonSlug: string;
  moduleTitle: string;
  lessonTitle: string;
  /** Position dans tout le parcours (1-based) */
  stepNumber: number;
  totalSteps: number;
};

export function getTotalLessonCount(): number {
  // Parcours principal uniquement : les add-ons autonomes ne sont pas des étapes.
  return FORMATION_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
}

/**
 * Modules "bonus" hors de la certification finale 42h.
 * La déontologie et TRACFIN (LCB-FT) se vendent / se suivent à part et ont leur
 * propre attestation — ils ne comptent donc PAS dans le diplôme 42h des 5 modules
 * d'origine.
 */
export const BONUS_MODULE_SLUGS = ["deontologie", "tracfin"];

/** Nombre de leçons comptant pour la CERTIFICATION 42h (exclut les modules bonus). */
export function getCertifiedLessonCount(): number {
  return COURSE.filter((m) => !BONUS_MODULE_SLUGS.includes(m.slug)).reduce(
    (acc, m) => acc + m.lessons.length,
    0
  );
}

/** Première leçon non marquée « vue », dans l’ordre du parcours. */
export function findNextLesson(progress: Record<string, boolean>): NextLessonInfo | null {
  const totalSteps = getTotalLessonCount();
  let step = 0;
  for (const mod of FORMATION_MODULES) {
    for (const lesson of mod.lessons) {
      step += 1;
      const id = lessonId(mod.slug, lesson.slug);
      if (!progress[id]) {
        return {
          href: `/formation/${mod.slug}/${lesson.slug}`,
          moduleSlug: mod.slug,
          lessonSlug: lesson.slug,
          moduleTitle: mod.title,
          lessonTitle: lesson.title,
          stepNumber: step,
          totalSteps,
        };
      }
    }
  }
  return null;
}

/** Première leçon non vue dans un module (sinon null = module complété). */
export function findResumeInModule(
  moduleSlug: string,
  progress: Record<string, boolean>,
): { href: string; lessonTitle: string; lessonSlug: string } | null {
  const mod = COURSE.find((m) => m.slug === moduleSlug);
  if (!mod) return null;
  for (const lesson of mod.lessons) {
    const id = lessonId(mod.slug, lesson.slug);
    if (!progress[id]) {
      return {
        href: `/formation/${mod.slug}/${lesson.slug}`,
        lessonTitle: lesson.title,
        lessonSlug: lesson.slug,
      };
    }
  }
  return null;
}

export function countModuleProgress(
  moduleSlug: string,
  progress: Record<string, boolean>,
): { done: number; total: number; pct: number } {
  const mod = COURSE.find((m) => m.slug === moduleSlug);
  if (!mod) return { done: 0, total: 0, pct: 0 };
  let done = 0;
  for (const l of mod.lessons) {
    if (progress[lessonId(mod.slug, l.slug)]) done++;
  }
  const total = mod.lessons.length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return { done, total, pct };
}

/** Position globale d’une leçon (1-based step / total). */
export function getLessonJourneyPosition(
  moduleSlug: string,
  lessonSlug: string,
): { stepNumber: number; totalSteps: number } | null {
  const totalSteps = getTotalLessonCount();
  let step = 0;
  for (const mod of FORMATION_MODULES) {
    for (const lesson of mod.lessons) {
      step += 1;
      if (mod.slug === moduleSlug && lesson.slug === lessonSlug) {
        return { stepNumber: step, totalSteps };
      }
    }
  }
  return null;
}
