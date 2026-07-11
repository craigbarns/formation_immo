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

describe("PACK_EXCLUDED_MODULES (add-ons hors pack)", () => {
  it("TRACFIN est inclus au pack ; murs & fonds de commerce reste autonome", () => {
    expect(PACK_EXCLUDED_MODULES.has("tracfin")).toBe(false);
    expect(PACK_EXCLUDED_MODULES.has("murs-fonds-commerce")).toBe(true);
  });

  it("le pack donne accès à TRACFIN", () => {
    expect(canAccessModule([pack], "tracfin", false)).toBe(true);
    expect(hasModuleAccess(getEntitlements([pack]), "tracfin")).toBe(true);
  });

  it("achat TRACFIN à l'unité => accès aussi (sans pack)", () => {
    expect(canAccessModule([tracfin], "tracfin", false)).toBe(true);
  });

  it("aucun droit => pas d'accès à TRACFIN", () => {
    expect(canAccessModule([], "tracfin", false)).toBe(false);
  });
});

describe("murs & fonds de commerce (add-on autonome, hors pack)", () => {
  const mursEtFonds: EntitlementRow = { module_slug: "murs-fonds-commerce", status: "active" };

  it("le pack ne donne PAS accès au module autonome", () => {
    expect(canAccessModule([pack], "murs-fonds-commerce", false)).toBe(false);
    expect(hasModuleAccess(getEntitlements([pack]), "murs-fonds-commerce")).toBe(false);
  });

  it("le pack donne toujours accès à la déontologie (bonus mais incluse)", () => {
    expect(canAccessModule([pack], "deontologie", false)).toBe(true);
  });

  it("l'achat à l'unité donne accès au module autonome", () => {
    expect(canAccessModule([mursEtFonds], "murs-fonds-commerce", false)).toBe(true);
  });

  it("admin => accès au module autonome", () => {
    expect(canAccessModule([], "murs-fonds-commerce", true)).toBe(true);
  });

  it("aucun droit => pas d'accès", () => {
    expect(canAccessModule([], "murs-fonds-commerce", false)).toBe(false);
  });
});

describe("rénovation énergétique (add-on autonome, hors pack)", () => {
  it("le pack ne donne PAS accès ; l'achat unitaire oui ; admin oui", () => {
    expect(canAccessModule([pack], "renovation-energetique", false)).toBe(false);
    const rows: EntitlementRow[] = [{ module_slug: "renovation-energetique", status: "active" }];
    expect(canAccessModule(rows, "renovation-energetique", false)).toBe(true);
    expect(canAccessModule([], "renovation-energetique", true)).toBe(true);
    expect(canAccessModule([], "renovation-energetique", false)).toBe(false);
  });
});
