import { describe, it, expect } from "vitest";
import { COURSE, FORMATION_MODULES } from "@/data/course";
import {
  BONUS_MODULE_SLUGS,
  getCertifiedLessonCount,
  getTotalLessonCount,
} from "./formation-journey";

describe("comptage des leçons de certification (option A : déontologie = bonus hors cert)", () => {
  it("déontologie est marqué comme bonus", () => {
    expect(BONUS_MODULE_SLUGS).toContain("deontologie");
  });

  it("tracfin est marqué comme bonus (add-on autonome)", () => {
    expect(BONUS_MODULE_SLUGS).toContain("tracfin");
  });

  it("la certification exclut les leçons bonus DU PARCOURS (ex. déontologie)", () => {
    // getTotalLessonCount ne compte que le parcours principal (add-ons exclus).
    // Le seul écart avec la certification = les modules bonus du parcours (déontologie).
    const bonusInFormation = FORMATION_MODULES.filter((m) =>
      BONUS_MODULE_SLUGS.includes(m.slug)
    ).reduce((acc, m) => acc + m.lessons.length, 0);
    expect(bonusInFormation).toBeGreaterThan(0);
    expect(getCertifiedLessonCount()).toBe(getTotalLessonCount() - bonusInFormation);
  });

  it("les add-ons autonomes ne comptent PAS dans le total du parcours", () => {
    // TRACFIN (add-on) ne fait pas partie de getTotalLessonCount.
    const tracfinLessons = COURSE.find((m) => m.slug === "tracfin")?.lessons.length ?? 0;
    expect(tracfinLessons).toBeGreaterThan(0);
    expect(getTotalLessonCount()).toBe(
      COURSE.reduce((acc, m) => acc + m.lessons.length, 0) - tracfinLessons
    );
  });

  it("= 33 leçons (contenu réel des 5 modules d'origine)", () => {
    expect(getCertifiedLessonCount()).toBe(33);
  });
});
