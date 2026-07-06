import { describe, it, expect } from "vitest";
import {
  getEntitlements,
  canAccessModule,
  hasModuleAccess,
  PACK_EXCLUDED_MODULES,
  type EntitlementRow,
} from "./entitlements";

const pack: EntitlementRow = { module_slug: null, status: "active" };
const juridique: EntitlementRow = { module_slug: "juridique", status: "active" };
const tracfin: EntitlementRow = { module_slug: "tracfin", status: "active" };

describe("getEntitlements", () => {
  it("aucune ligne => pas de pack, aucun module", () => {
    const e = getEntitlements([]);
    expect(e.hasPack).toBe(false);
    expect(e.modules.size).toBe(0);
  });

  it("ligne pack (module_slug NULL) => hasPack", () => {
    const e = getEntitlements([pack]);
    expect(e.hasPack).toBe(true);
  });

  it("ligne module => module présent, pas de pack", () => {
    const e = getEntitlements([juridique]);
    expect(e.hasPack).toBe(false);
    expect(e.modules.has("juridique")).toBe(true);
  });

  it("ignore les lignes non actives", () => {
    const refunded: EntitlementRow = { module_slug: null, status: "refunded" };
    const e = getEntitlements([refunded]);
    expect(e.hasPack).toBe(false);
  });
});

describe("canAccessModule", () => {
  it("admin => toujours vrai", () => {
    expect(canAccessModule([], "juridique", true)).toBe(true);
  });

  it("pack => accès à n'importe quel module", () => {
    expect(canAccessModule([pack], "transaction", false)).toBe(true);
  });

  it("module possédé => accès à ce module seulement", () => {
    expect(canAccessModule([juridique], "juridique", false)).toBe(true);
    expect(canAccessModule([juridique], "transaction", false)).toBe(false);
  });

  it("aucun droit => pas d'accès", () => {
    expect(canAccessModule([], "juridique", false)).toBe(false);
  });
});

describe("PACK_EXCLUDED_MODULES (add-ons autonomes hors pack)", () => {
  it("tracfin est un module exclu du pack", () => {
    expect(PACK_EXCLUDED_MODULES.has("tracfin")).toBe(true);
  });

  it("le pack N'OUVRE PAS un module exclu (tracfin)", () => {
    expect(canAccessModule([pack], "tracfin", false)).toBe(false);
    expect(hasModuleAccess(getEntitlements([pack]), "tracfin")).toBe(false);
  });

  it("le pack ouvre bien les modules NON exclus", () => {
    expect(canAccessModule([pack], "transaction", false)).toBe(true);
  });

  it("acheté à l'unité => accès au module exclu, même sans pack", () => {
    expect(canAccessModule([tracfin], "tracfin", false)).toBe(true);
  });

  it("admin => accès même à un module exclu", () => {
    expect(canAccessModule([], "tracfin", true)).toBe(true);
  });
});
