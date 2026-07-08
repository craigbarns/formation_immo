import { describe, it, expect } from "vitest";
import { COURSE, FORMATION_MODULES, STANDALONE_MODULE_SLUGS } from "@/data/course";
import {
  getEntitlements,
  hasModuleAccess,
  PACK_EXCLUDED_MODULES,
  type EntitlementRow,
} from "@/lib/entitlements";
import {
  getTotalLessonCount,
  getCertifiedLessonCount,
  getCertificationTotalLessons,
  isPackGrandfathered,
} from "@/lib/formation-journey";

/**
 * TRACFIN est désormais inclus au pack ET compte dans la certification.
 * Garantie clé : aucun client EXISTANT (achat pack avant la bascule) n'est
 * pénalisé — son certificat reste débloquable sans TRACFIN (grandfather).
 */
describe("TRACFIN inclus au pack — non-régression clients existants", () => {
  const pack: EntitlementRow[] = [{ module_slug: null, status: "active" }];

  it("plus aucun module autonome / exclu du pack", () => {
    expect(STANDALONE_MODULE_SLUGS.size).toBe(0);
    expect(PACK_EXCLUDED_MODULES.size).toBe(0);
  });

  it("le détenteur du pack accède à TOUS les modules, TRACFIN compris", () => {
    const ent = getEntitlements(pack);
    for (const mod of COURSE) {
      expect(hasModuleAccess(ent, mod.slug)).toBe(true);
    }
  });

  it("TRACFIN fait partie du parcours (total = tout COURSE)", () => {
    const all = COURSE.reduce((a, m) => a + m.lessons.length, 0);
    expect(getTotalLessonCount()).toBe(all);
    expect(FORMATION_MODULES.some((m) => m.slug === "tracfin")).toBe(true);
  });

  it("certification = 36 leçons (TRACFIN compte, déontologie bonus)", () => {
    expect(getCertifiedLessonCount()).toBe(36);
  });

  it("GRANDFATHER : un client pack historique n'a PAS TRACFIN requis pour son certificat", () => {
    const legacyTotal = getCertificationTotalLessons(true);
    const fullTotal = getCertificationTotalLessons(false);
    expect(legacyTotal).toBeLessThan(fullTotal); // seuil plus bas pour l'historique
    expect(isPackGrandfathered("2026-01-01T00:00:00Z")).toBe(true);
  });

  it("un NOUVEAU client (achat après bascule) a TRACFIN requis", () => {
    expect(isPackGrandfathered("2027-01-01T00:00:00Z")).toBe(false);
  });
});
