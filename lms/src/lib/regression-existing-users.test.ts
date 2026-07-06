import { describe, it, expect } from "vitest";
import { COURSE, FORMATION_MODULES, STANDALONE_MODULE_SLUGS, lessonId } from "@/data/course";
import {
  getEntitlements,
  hasModuleAccess,
  type EntitlementRow,
} from "@/lib/entitlements";
import {
  getTotalLessonCount,
  getCertifiedLessonCount,
  findNextLesson,
} from "@/lib/formation-journey";

/**
 * Garanties anti-régression pour les utilisateurs EXISTANTS (achats antérieurs
 * à l'ajout du module autonome TRACFIN). L'ajout d'un add-on dans COURSE ne doit
 * RIEN changer pour eux : accès, progression, "prochaine leçon", certification.
 */
describe("Non-régression — utilisateurs existants après ajout de TRACFIN", () => {
  const pack: EntitlementRow[] = [{ module_slug: null, status: "active" }];

  it("le parcours principal exclut les add-ons (37 leçons, pas 40)", () => {
    const coreLessons = FORMATION_MODULES.reduce((a, m) => a + m.lessons.length, 0);
    const allLessons = COURSE.reduce((a, m) => a + m.lessons.length, 0);
    expect(getTotalLessonCount()).toBe(coreLessons);
    expect(getTotalLessonCount()).toBeLessThan(allLessons); // add-ons non comptés
  });

  it("le seuil de certification est inchangé (33 leçons certifiantes)", () => {
    expect(getCertifiedLessonCount()).toBe(33);
  });

  it("un détenteur du pack garde l'accès à TOUS les modules du parcours", () => {
    const ent = getEntitlements(pack);
    for (const mod of FORMATION_MODULES) {
      expect(hasModuleAccess(ent, mod.slug)).toBe(true);
    }
  });

  it("un détenteur du pack n'a PAS accès aux add-ons autonomes (TRACFIN)", () => {
    const ent = getEntitlements(pack);
    for (const slug of STANDALONE_MODULE_SLUGS) {
      expect(hasModuleAccess(ent, slug)).toBe(false);
    }
  });

  it("un utilisateur ayant terminé le parcours n'est PAS renvoyé vers un add-on", () => {
    // Progression = toutes les leçons du parcours principal faites.
    const progress: Record<string, boolean> = {};
    for (const mod of FORMATION_MODULES) {
      for (const l of mod.lessons) progress[lessonId(mod.slug, l.slug)] = true;
    }
    // Aucune "prochaine leçon" (et surtout pas une leçon TRACFIN).
    expect(findNextLesson(progress)).toBeNull();
  });
});
