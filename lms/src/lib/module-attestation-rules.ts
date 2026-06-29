import { getModuleDurationMin } from "@/data/course";

/**
 * Règles PURES d'éligibilité à l'attestation de suivi par module (spec §5.8).
 * Anti-fraude : « module terminé » ne suffit plus s'il a été cliqué en quelques
 * secondes — il faut aussi un TEMPS minimum réellement passé dans le module.
 */

const DEFAULT_RATIO = 0.5;

/** Fraction du temps prévu du module à passer réellement (ajustable via env MODULE_MIN_TIME_RATIO). */
function minTimeRatio(): number {
  const r = Number(process.env.MODULE_MIN_TIME_RATIO);
  return Number.isFinite(r) && r > 0 && r <= 1 ? r : DEFAULT_RATIO;
}

/** Secondes minimum à passer dans le module pour valider le suivi. */
export function requiredSecondsForModule(moduleSlug: string): number {
  const plannedMinutes = getModuleDurationMin(moduleSlug); // 0 si module inconnu
  return Math.round(plannedMinutes * 60 * minTimeRatio());
}

/** Attestation délivrable seulement si TOUTES les leçons sont faites ET le temps minimum atteint. */
export function isAttestationEligible(args: {
  lessonsDone: boolean;
  timeSpentSec: number;
  requiredSec: number;
}): boolean {
  return args.lessonsDone && args.timeSpentSec >= args.requiredSec;
}
