import { describe, it, expect } from "vitest";
import { COURSE } from "@/data/course";
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

  it("la certification exclut les leçons de TOUS les modules bonus", () => {
    const bonusLessons = COURSE.filter((m) => BONUS_MODULE_SLUGS.includes(m.slug)).reduce(
      (acc, m) => acc + m.lessons.length,
      0
    );
    expect(bonusLessons).toBeGreaterThan(0);
    expect(getCertifiedLessonCount()).toBe(getTotalLessonCount() - bonusLessons);
  });

  it("= 33 leçons (contenu réel des 5 modules d'origine)", () => {
    expect(getCertifiedLessonCount()).toBe(33);
  });
});
