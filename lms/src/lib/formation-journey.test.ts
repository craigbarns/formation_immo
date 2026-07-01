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

  it("la certification exclut les leçons des modules bonus", () => {
    const deontoLessons = COURSE.find((m) => m.slug === "deontologie")?.lessons.length ?? 0;
    expect(deontoLessons).toBeGreaterThan(0);
    expect(getCertifiedLessonCount()).toBe(getTotalLessonCount() - deontoLessons);
  });

  it("= 33 leçons (contenu réel des 5 modules d'origine)", () => {
    expect(getCertifiedLessonCount()).toBe(33);
  });
});
