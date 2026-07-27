import { describe, it, expect } from "vitest";
import { FORMATION_MODULES, STANDALONE_MODULE_SLUGS, lessonId } from "@/data/course";
import { getTotalLessonCount } from "./formation-journey";
import {
  parcoursLessonKeySet,
  completedParcoursCount,
  parcoursProgressPct,
} from "./admin-progress";

/**
 * Bug production (Curel, juillet 2026) : une cliente PACK (42h) affichait 77 %
 * de progression dans l'admin car le dénominateur incluait les formations
 * autonomes (add-ons 59€) qu'elle n'a pas achetées. La progression admin doit
 * être scoppée au PARCOURS certifiant (FORMATION_MODULES), pas à COURSE entier.
 */
describe("progression admin scoppée au parcours (hors add-ons autonomes)", () => {
  const allParcoursKeys = [...parcoursLessonKeySet()];

  it("le dénominateur = le parcours (getTotalLessonCount), pas COURSE entier", () => {
    expect(parcoursLessonKeySet().size).toBe(getTotalLessonCount());
  });

  it("finir TOUT le parcours affiche 100 % (Curel plafonnait sous 100)", () => {
    expect(completedParcoursCount(allParcoursKeys)).toBe(getTotalLessonCount());
    expect(parcoursProgressPct(allParcoursKeys)).toBe(100);
  });

  it("les leçons d'un module autonome (add-on) ne comptent PAS", () => {
    const addonSlug = [...STANDALONE_MODULE_SLUGS][0];
    const addonKey = lessonId(addonSlug, "une-lecon-addon");
    expect(parcoursLessonKeySet().has(addonKey)).toBe(false);
    expect(completedParcoursCount([addonKey])).toBe(0);
    expect(parcoursProgressPct([addonKey])).toBe(0);
  });

  it("la progression est bornée à 100 même avec des clés d'add-on en plus", () => {
    const mixed = [...allParcoursKeys, "murs-fonds-commerce/bail-commercial"];
    expect(completedParcoursCount(mixed)).toBe(getTotalLessonCount());
    expect(parcoursProgressPct(mixed)).toBe(100);
  });

  it("aucune leçon => 0 %", () => {
    expect(parcoursProgressPct([])).toBe(0);
  });
});
