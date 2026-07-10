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

  it("TRACFIN n'est plus autonome ; seul murs & fonds de commerce (add-on 59€) l'est", () => {
    expect(STANDALONE_MODULE_SLUGS.has("tracfin")).toBe(false);
    expect(PACK_EXCLUDED_MODULES.has("tracfin")).toBe(false);
    expect([...STANDALONE_MODULE_SLUGS]).toEqual(["murs-fonds-commerce"]);
  });

  it("le détenteur du pack accède à TOUT le parcours, TRACFIN compris", () => {
    const ent = getEntitlements(pack);
    for (const mod of FORMATION_MODULES) {
      expect(hasModuleAccess(ent, mod.slug)).toBe(true);
    }
    // …mais pas aux add-ons autonomes vendus à part.
    expect(hasModuleAccess(ent, "murs-fonds-commerce")).toBe(false);
  });

  it("TRACFIN fait partie du parcours (total = parcours principal)", () => {
    const formationTotal = FORMATION_MODULES.reduce((a, m) => a + m.lessons.length, 0);
    expect(getTotalLessonCount()).toBe(formationTotal);
    expect(FORMATION_MODULES.some((m) => m.slug === "tracfin")).toBe(true);
    // Les add-ons autonomes restent dans COURSE (contenu) mais hors parcours.
    expect(COURSE.some((m) => m.slug === "murs-fonds-commerce")).toBe(true);
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
