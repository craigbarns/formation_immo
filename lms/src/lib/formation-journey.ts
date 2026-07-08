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
 * Modules "bonus" hors de la certification finale.
 * La déontologie reste bonus (hors 42h). TRACFIN, désormais inclus au pack,
 * COMPTE dans la certification (le diplôme passe à 45h).
 */
export const BONUS_MODULE_SLUGS = ["deontologie"];

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

/**
 * Date de bascule : TRACFIN devient requis pour la certification à partir de là.
 * Les clients dont l'achat du pack est ANTÉRIEUR sont "grandfathered" (non pénalisés).
 */
export const TRACFIN_CERT_CUTOFF_ISO = "2026-07-09T00:00:00.000Z";

/** Modules non requis pour la certification des clients grandfathered. */
const GRANDFATHER_OPTIONAL_SLUGS = new Set<string>(["tracfin"]);

/** Achat du pack antérieur à la bascule ⇒ client historique non pénalisé. */
export function isPackGrandfathered(
  packCreatedAtISO: string | null | undefined,
): boolean {
  if (!packCreatedAtISO) return false;
  const t = Date.parse(packCreatedAtISO);
  return Number.isFinite(t) && t < Date.parse(TRACFIN_CERT_CUTOFF_ISO);
}

/** Dénominateur de complétion du certificat selon le statut grandfather. */
export function getCertificationTotalLessons(isGrandfathered: boolean): number {
  return FORMATION_MODULES.filter(
    (m) => !(isGrandfathered && GRANDFATHER_OPTIONAL_SLUGS.has(m.slug)),
  ).reduce((acc, m) => acc + m.lessons.length, 0);
}
