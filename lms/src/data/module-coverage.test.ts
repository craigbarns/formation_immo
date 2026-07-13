import { describe, it, expect } from "vitest";
import { COURSE } from "@/data/course";
import { getModuleShowcase } from "./module-showcase";
import { getModuleExam } from "./exam-questions";

/**
 * Couverture des données par module. La page module fait `notFound()` sans
 * entrée vitrine, la page examen fait `notFound()` sans examen : un module
 * ajouté à COURSE sans ces entrées renvoie des 404 aux clients
 * (bug réel : TRACFIN invisible/404 pour les clients pack, juillet 2026).
 */
describe("couverture des données par module (anti-404)", () => {
  it("CHAQUE module de COURSE a une entrée vitrine (MODULE_SHOWCASE)", () => {
    for (const mod of COURSE) {
      expect(
        getModuleShowcase(mod.slug),
        `entrée vitrine manquante pour « ${mod.slug} » → /formation/${mod.slug} rend 404`
      ).not.toBeNull();
    }
  });

  it("chaque lessonTeaser référence une leçon existante du module", () => {
    for (const mod of COURSE) {
      const showcase = getModuleShowcase(mod.slug);
      if (!showcase) continue;
      for (const slug of Object.keys(showcase.lessonTeaser)) {
        expect(
          mod.lessons.some((l) => l.slug === slug),
          `${mod.slug} : teaser orphelin « ${slug} »`
        ).toBe(true);
      }
    }
  });

  it("CHAQUE module de COURSE a un examen (MODULE_EXAMS)", () => {
    for (const mod of COURSE) {
      expect(
        getModuleExam(mod.slug),
        `examen manquant pour « ${mod.slug} » → /formation/examen/${mod.slug} rend 404`
      ).toBeDefined();
    }
  });
});
