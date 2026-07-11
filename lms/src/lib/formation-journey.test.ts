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

  it("TRACFIN compte dans le total du parcours ; les add-ons autonomes non", () => {
    const formationTotal = FORMATION_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
    expect(getTotalLessonCount()).toBe(formationTotal);
    expect(FORMATION_MODULES.some((m) => m.slug === "tracfin")).toBe(true);
    expect(FORMATION_MODULES.some((m) => m.slug === "murs-fonds-commerce")).toBe(false);
  });

  it("= 36 leçons certifiantes (5 modules coeur + TRACFIN, hors déontologie)", () => {
    expect(getCertifiedLessonCount()).toBe(36);
  });
});

describe("murs & fonds de commerce (formation autonome, hors parcours certifiant)", () => {
  it("le module existe dans COURSE : 4 leçons, 420 min (7h)", () => {
    const mod = COURSE.find((m) => m.slug === "murs-fonds-commerce");
    expect(mod).toBeDefined();
    expect(mod!.lessons).toHaveLength(4);
    expect(mod!.lessons.reduce((a, l) => a + l.duration, 0)).toBe(420);
  });

  it("il est hors parcours : la certification et le grandfather ne bougent pas", () => {
    expect(getCertifiedLessonCount()).toBe(36);
    expect(getCertificationTotalLessons(false)).toBe(getTotalLessonCount());
    expect(getCertificationTotalLessons(false) - getCertificationTotalLessons(true)).toBe(3);
  });
});

describe("rénovation énergétique (formation autonome, hors parcours certifiant)", () => {
  it("le module existe dans COURSE : 4 leçons, 420 min (7h)", () => {
    const mod = COURSE.find((m) => m.slug === "renovation-energetique");
    expect(mod).toBeDefined();
    expect(mod!.lessons).toHaveLength(4);
    expect(mod!.lessons.reduce((a, l) => a + l.duration, 0)).toBe(420);
  });

  it("il est hors parcours : certification inchangée", () => {
    expect(FORMATION_MODULES.some((m) => m.slug === "renovation-energetique")).toBe(false);
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
