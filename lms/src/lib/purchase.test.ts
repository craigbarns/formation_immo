import { describe, it, expect } from "vitest";
import type { Product } from "@/data/catalog";
import { PACK_PRODUCT_ID } from "@/data/catalog";
import type { Entitlements } from "@/lib/entitlements";
import {
  filterPurchasable,
  buildPurchaseMetadata,
  parsePurchaseMetadata,
  grantsFromProducts,
  toLineItems,
} from "./purchase";

// Catalogue fixture déterministe (indépendant de COURSE)
const pack: Product = {
  id: PACK_PRODUCT_ID, kind: "pack", label: "Pack", description: "Tout",
  priceCents: 29900, grants: "all", available: true,
};
const juridique: Product = {
  id: "juridique", kind: "module", label: "M1", description: "Droit",
  priceCents: 5900, grants: ["juridique"], available: true,
};
const transaction: Product = {
  id: "transaction", kind: "module", label: "M2", description: "Vente",
  priceCents: 5900, grants: ["transaction"], available: true,
};
const brouillon: Product = {
  id: "brouillon", kind: "module", label: "Brouillon", description: "WIP",
  priceCents: 5900, grants: ["brouillon"], available: false,
};
const CATALOG = [pack, juridique, transaction, brouillon];

const none: Entitlements = { hasPack: false, modules: new Set() };
const ownsPack: Entitlements = { hasPack: true, modules: new Set() };
const ownsJuridique: Entitlements = { hasPack: false, modules: new Set(["juridique"]) };

describe("filterPurchasable (Règle d'or — recalcul serveur)", () => {
  it("client pack => tout est retiré (rien à racheter)", () => {
    const { allowed, removed } = filterPurchasable(["pack", "juridique"], ownsPack, CATALOG);
    expect(allowed).toHaveLength(0);
    expect(removed.map((r) => r.reason)).toEqual(["already_owned", "already_owned"]);
  });

  it("module possédé retiré, module non possédé conservé", () => {
    const { allowed, removed } = filterPurchasable(["juridique", "transaction"], ownsJuridique, CATALOG);
    expect(allowed.map((p) => p.id)).toEqual(["transaction"]);
    expect(removed).toEqual([{ id: "juridique", reason: "already_owned" }]);
  });

  it("pack dans le panier => les modules du panier deviennent redondants", () => {
    const { allowed, removed } = filterPurchasable(["juridique", "pack"], none, CATALOG);
    expect(allowed.map((p) => p.id)).toEqual(["pack"]);
    expect(removed).toEqual([{ id: "juridique", reason: "included_in_pack" }]);
  });

  it("inconnu / indisponible / doublon => retirés avec la bonne raison", () => {
    const { allowed, removed } = filterPurchasable(
      ["nexiste-pas", "brouillon", "transaction", "transaction"], none, CATALOG
    );
    expect(allowed.map((p) => p.id)).toEqual(["transaction"]);
    expect(removed).toEqual([
      { id: "nexiste-pas", reason: "unknown" },
      { id: "brouillon", reason: "unavailable" },
      { id: "transaction", reason: "duplicate" },
    ]);
  });

  it("panier vide => rien", () => {
    expect(filterPurchasable([], none, CATALOG).allowed).toHaveLength(0);
  });
});

describe("metadata Stripe (JSON, spec §5.4)", () => {
  it("achat pack => purchase_type pack", () => {
    const meta = buildPurchaseMetadata([pack], "user-123");
    expect(JSON.parse(meta.product_ids)).toEqual(["pack"]);
    expect(meta.purchase_type).toBe("pack");
    expect(meta.formation_id).toBe("immobilier");
    expect(meta.user_id).toBe("user-123");
  });

  it("achat modules => module_bundle, round-trip parse", () => {
    const meta = buildPurchaseMetadata([juridique, transaction], "user-123");
    const parsed = parsePurchaseMetadata(meta);
    expect(parsed.productIds).toEqual(["juridique", "transaction"]);
    expect(parsed.purchaseType).toBe("module_bundle");
    expect(parsed.formationId).toBe("immobilier");
    expect(parsed.userId).toBe("user-123");
    expect(parsed.legacy).toBe(false);
  });

  it("session LEGACY (ancien checkout: formationId seul) => pack", () => {
    const parsed = parsePurchaseMetadata({ formationId: "immobilier" });
    expect(parsed.legacy).toBe(true);
    expect(parsed.productIds).toEqual([PACK_PRODUCT_ID]);
    expect(parsed.purchaseType).toBe("pack");
    expect(parsed.formationId).toBe("immobilier");
  });

  it("metadata absente ou corrompue => sans danger", () => {
    expect(parsePurchaseMetadata(undefined).productIds).toEqual([]);
    expect(parsePurchaseMetadata(null).formationId).toBeNull();
    const corrupted = parsePurchaseMetadata({ formation_id: "immobilier", product_ids: "{pas-du-json" });
    expect(corrupted.legacy).toBe(true);
    expect(corrupted.productIds).toEqual([PACK_PRODUCT_ID]); // formation immo sans produits lisibles = legacy pack
  });

  it("autre formation => ignorable par l'appelant", () => {
    const parsed = parsePurchaseMetadata({ formationId: "digiformat" });
    expect(parsed.formationId).toBe("digiformat");
  });
});

describe("grantsFromProducts (webhook → droits)", () => {
  it("pack => un seul droit NULL (acces total)", () => {
    expect(grantsFromProducts(["pack"], CATALOG)).toEqual([null]);
  });

  it("modules => un droit par slug, dedupliques", () => {
    expect(grantsFromProducts(["juridique", "transaction", "juridique"], CATALOG))
      .toEqual(["juridique", "transaction"]);
  });

  it("pack + modules melanges => le pack absorbe tout", () => {
    expect(grantsFromProducts(["juridique", "pack"], CATALOG)).toEqual([null]);
  });

  it("ids inconnus ignores", () => {
    expect(grantsFromProducts(["nexiste-pas"], CATALOG)).toEqual([]);
  });
});

describe("toLineItems (Stripe price_data)", () => {
  it("eur, montants, libelles ; image uniquement sur le pack", () => {
    const items = toLineItems([pack, juridique], "https://app.example.com");
    expect(items).toHaveLength(2);
    expect(items[0].price_data?.currency).toBe("eur");
    expect(items[0].price_data?.unit_amount).toBe(29900);
    expect(items[0].price_data?.product_data?.images?.[0]).toContain("https://app.example.com");
    expect(items[1].price_data?.unit_amount).toBe(5900);
    expect(items[1].price_data?.product_data?.name).toBe("M1");
    expect(items[1].price_data?.product_data?.images).toBeUndefined();
    expect(items[1].quantity).toBe(1);
  });
});
