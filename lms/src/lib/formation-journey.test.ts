import { describe, it, expect } from "vitest";
import { COURSE, FORMATION_MODULES } from "@/data/course";
import {
  BONUS_MODULE_SLUGS,
  getCertifiedLessonCount,
  getTotalLessonCount,
  isPackGrandfathered,
  getCertificationTotalLessons,
  TRACFIN_CERT_CUTOFF_ISO,
} from "./formation-journey";

describe("comptage des leçons de certification (déontologie = bonus, TRACFIN compte)", () => {
  it("déontologie est marqué comme bonus", () => {
    expect(BONUS_MODULE_SLUGS).toContain("deontologie");
  });

  it("TRACFIN n'est PLUS bonus : il compte dans la certification", () => {
    expect(BONUS_MODULE_SLUGS).not.toContain("tracfin");
  });

  it("la certification exclut les leçons bonus DU PARCOURS (ex. déontologie)", () => {
    const bonusInFormation = FORMATION_MODULES.filter((m) =>
      BONUS_MODULE_SLUGS.includes(m.slug)
    ).reduce((acc, m) => acc + m.lessons.length, 0);
    expect(bonusInFormation).toBeGreaterThan(0);
    expect(getCertifiedLessonCount()).toBe(getTotalLessonCount() - bonusInFormation);
  });

  it("TRACFIN compte désormais dans le total du parcours", () => {
    const all = COURSE.reduce((acc, m) => acc + m.lessons.length, 0);
    expect(getTotalLessonCount()).toBe(all); // plus d'exclusion d'add-on
  });

  it("= 36 leçons certifiantes (5 modules coeur + TRACFIN, hors déontologie)", () => {
    expect(getCertifiedLessonCount()).toBe(36);
  });
});

describe("grandfather TRACFIN (clients pack antérieurs à la bascule)", () => {
  it("achat null => non grandfathered", () => {
    expect(isPackGrandfathered(null)).toBe(false);
    expect(isPackGrandfathered(undefined)).toBe(false);
  });

  it("achat avant la bascule => grandfathered", () => {
    expect(isPackGrandfathered("2026-06-01T10:00:00+00:00")).toBe(true);
  });

  it("achat après la bascule => non grandfathered", () => {
    expect(isPackGrandfathered("2027-07-07T10:00:00Z")).toBe(false);
  });

  it("dénominateur cert : grandfathered exclut TRACFIN, nouveau l'inclut", () => {
    const full = getCertificationTotalLessons(false);
    const legacy = getCertificationTotalLessons(true);
    const tracfinLessons = full - legacy;
    expect(tracfinLessons).toBe(3); // TRACFIN = 3 leçons
    expect(full).toBe(getTotalLessonCount()); // = parcours complet
  });

  it("le cutoff est une date ISO valide", () => {
    expect(Number.isFinite(Date.parse(TRACFIN_CERT_CUTOFF_ISO))).toBe(true);
  });
});
