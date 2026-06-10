import { describe, it, expect, afterEach, vi } from "vitest";
import { COURSE } from "@/data/course";
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

  it("la description du pack est calculee depuis COURSE (nb de modules)", () => {
    const pack = getCatalog()[0];
    expect(pack.description).toContain(`${COURSE.length} modules`);
  });

  it("le module deontologie (6e) est vendable", () => {
    const deonto = getProduct("deontologie");
    expect(deonto?.available).toBe(true);
  });

  it("getProduct inconnu => undefined ; formation = immobilier", () => {
    expect(getProduct("inexistant")).toBeUndefined();
    expect(FORMATION_ID).toBe("immobilier");
  });
});
