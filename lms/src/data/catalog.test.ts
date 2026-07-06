import { describe, it, expect, afterEach, vi } from "vitest";
import { COURSE } from "@/data/course";
import { PACK_EXCLUDED_MODULES } from "@/lib/entitlements";
import {
  getCatalog,
  getProduct,
  getModulePriceCents,
  getPackPriceCents,
  PACK_PRODUCT_ID,
  FORMATION_ID,
} from "./catalog";

afterEach(() => vi.unstubAllEnvs());

describe("getCatalog", () => {
  it("contient le pack + un produit par module de COURSE", () => {
    const catalog = getCatalog();
    expect(catalog).toHaveLength(1 + COURSE.length);
    expect(catalog[0].id).toBe(PACK_PRODUCT_ID);
    for (const mod of COURSE) {
      expect(catalog.some((p) => p.id === mod.slug && p.kind === "module")).toBe(true);
    }
  });

  it("le pack donne tous les modules, un module ne donne que lui-même", () => {
    const catalog = getCatalog();
    expect(catalog[0].grants).toBe("all");
    const juridique = catalog.find((p) => p.id === "juridique")!;
    expect(juridique.grants).toEqual(["juridique"]);
  });

  it("prix par défaut : pack 29900, module 5900", () => {
    expect(getPackPriceCents()).toBe(29900);
    expect(getModulePriceCents()).toBe(5900);
  });

  it("les prix sont surchargeables par env", () => {
    vi.stubEnv("FORMATION_PRICE_CENTS", "19900");
    vi.stubEnv("MODULE_PRICE_CENTS", "4900");
    expect(getPackPriceCents()).toBe(19900);
    expect(getModulePriceCents()).toBe(4900);
  });

  it("env invalide => retombe sur le defaut", () => {
    vi.stubEnv("MODULE_PRICE_CENTS", "abc");
    expect(getModulePriceCents()).toBe(5900);
  });

  it("la description du pack ne compte que les modules INCLUS (hors add-ons autonomes)", () => {
    const pack = getCatalog()[0];
    const packModules = COURSE.filter((m) => !PACK_EXCLUDED_MODULES.has(m.slug));
    expect(pack.description).toContain(`${packModules.length} modules`);
    // TRACFIN est un add-on autonome : il n'est pas compté dans le pack.
    expect(packModules.length).toBe(COURSE.length - 1);
  });

  it("le module deontologie (6e) est vendable", () => {
    const deonto = getProduct("deontologie");
    expect(deonto?.available).toBe(true);
  });

  it("TRACFIN est un module autonome vendable à 49€ (4900)", () => {
    const tracfin = getProduct("tracfin");
    expect(tracfin?.available).toBe(true);
    expect(tracfin?.kind).toBe("module");
    expect(tracfin?.priceCents).toBe(4900);
  });

  it("le prix TRACFIN est surchargeable par env dédié", () => {
    vi.stubEnv("MODULE_PRICE_CENTS_TRACFIN", "3900");
    expect(getProduct("tracfin")?.priceCents).toBe(3900);
  });

  it("getProduct inconnu => undefined ; formation = immobilier", () => {
    expect(getProduct("inexistant")).toBeUndefined();
    expect(FORMATION_ID).toBe("immobilier");
  });
});
