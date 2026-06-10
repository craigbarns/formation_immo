# Plan 2/5 — Vente backend (catalogue, checkout multi-produits, webhook) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rendre le système capable de **vendre n'importe quelle combinaison** (pack 299 € ou modules 59 € à l'unité/en panier) : catalogue de produits piloté par `COURSE`, checkout authentifié avec **filtrage serveur des droits** (Règle d'or §4), webhook qui octroie **un droit par produit** via `grantEntitlement`.

**Architecture :** Toute la logique métier est **pure et testée** (`catalog.ts` = données produits ; `purchase.ts` = filtrage panier, metadata Stripe JSON, line items, parsing webhook avec **compat legacy** pour les sessions Stripe créées avant le déploiement). Les deux routes API (`/api/checkout`, `/api/webhooks/stripe`) ne sont que de fines couches d'I/O. Rien n'est déployé : tout reste sur la branche jusqu'au go-live (Plan 5).

**Tech Stack :** TypeScript, Next.js 16.2.3 (doc route handlers vérifiée dans `node_modules/next/dist/docs/` — patterns existants valides), Stripe (`price_data` dynamique), Supabase, Vitest, Zod.

**Référence spec :** `docs/superpowers/specs/2026-06-09-vente-modules-catalogue-design.md` (§4 Règle d'or, §5.1 catalogue, §5.4 paiement, §6 tests, §7 phases 3–5).

---

## Décisions de conception (verrouillées ici)

1. **Compat ascendante webhook** : une session Stripe créée par l'ANCIEN checkout (metadata `formationId` seul, pas de `product_ids`) peut arriver APRÈS le déploiement → le parseur la traite comme **un achat pack** (comportement identique à aujourd'hui).
2. **Compat descendante (rollback)** : la nouvelle metadata n'inclut PAS l'ancienne clé `formationId` → si rollback Vercel, l'ancien webhook **ignore** les nouvelles sessions (sous-octroi + correction manuelle) plutôt que d'accorder un pack complet pour 59 € (sur-octroi). Principe : *under-grant > over-grant*.
3. **Pack dans le panier ⇒ modules retirés** du même panier (`included_in_pack`) — on ne fait pas payer 59 € un module déjà couvert par le pack acheté dans la même transaction.
4. **Email de bienvenue** : conservé pour les achats **pack** (= comportement actuel) ; **pas** envoyé pour un achat de modules (client existant qui complète — pas un "bienvenue").
5. **`success_url` → `/formation?achat=confirme&session_id=…`** : l'utilisateur est déjà connecté (connexion obligatoire). La page d'attente gracieuse (course webhook) sera ajoutée au Plan 3/5.
6. **Prix** : constantes avec override env (`FORMATION_PRICE_CENTS` déjà existant = 29900 ; `MODULE_PRICE_CENTS` nouveau = 5900). Source unique : `catalog.ts`.
7. **L'API casse volontairement l'achat anonyme** (401 sans connexion). L'UI actuelle (StripeButton) n'est mise à jour qu'au Plan 5 — pas de fenêtre cassée en prod puisque **tout merge ensemble au go-live**.

---

## File Structure

| Fichier | Rôle | Action |
|---|---|---|
| `lms/vitest.config.ts` | Ajoute l'alias `@/` → `./src` (résolution des imports en test) | **Modifier** |
| `lms/src/data/catalog.ts` | Produits vendables (pack + 6 modules), prix, dérivés de `COURSE` | **Créer** |
| `lms/src/data/catalog.test.ts` | Tests du catalogue | **Créer** |
| `lms/src/lib/purchase.ts` | Logique d'achat pure : filtrage panier, metadata, line items, parsing webhook | **Créer** |
| `lms/src/lib/purchase.test.ts` | Tests de la logique d'achat | **Créer** |
| `lms/src/lib/auth-access.ts` | Ajoute `fetchActiveEntitlementRows` (requête droits réutilisable) | **Modifier** |
| `lms/src/lib/access.ts` | `verifyModuleAccess` réutilise `fetchActiveEntitlementRows` | **Modifier** |
| `lms/src/app/api/checkout/route.ts` | Auth obligatoire + filtrage serveur + multi-produits + metadata JSON | **Réécrire** |
| `lms/src/app/api/webhooks/stripe/route.ts` | Octroi par produit via `grantEntitlement` + compat legacy | **Réécrire** |

Toutes les commandes s'exécutent depuis `lms/`.

---

## Task 1 : Alias `@/` dans Vitest

**Files:**
- Modify: `lms/vitest.config.ts`

- [ ] **Step 1 : Ajouter l'alias de résolution**

Remplacer le contenu de `lms/vitest.config.ts` par :
```ts
import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
```

- [ ] **Step 2 : Vérifier que les tests existants passent toujours**

Run : `npm test`
Attendu : 8 tests PASS (entitlements).

- [ ] **Step 3 : Commit**

```bash
git add vitest.config.ts
git commit -m "test: alias @/ dans vitest (resolution imports src)"
```

---

## Task 2 : Catalogue de produits (`catalog.ts`)

**Files:**
- Create: `lms/src/data/catalog.test.ts`
- Create: `lms/src/data/catalog.ts`

- [ ] **Step 1 : Écrire les tests qui échouent**

Create `lms/src/data/catalog.test.ts` :
```ts
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
```

- [ ] **Step 2 : Vérifier l'échec**

Run : `npm test -- catalog`
Attendu : FAIL — `Cannot find module './catalog'`.

- [ ] **Step 3 : Implémenter `catalog.ts`**

Create `lms/src/data/catalog.ts` :
```ts
import { COURSE, formatDuration, getTotalCourseDurationMin } from "@/data/course";

export const FORMATION_ID = "immobilier";
export const PACK_PRODUCT_ID = "pack";

/** Modules retirés de la vente à l'unité (slugs) — escape hatch sans toucher COURSE. */
export const UNAVAILABLE_MODULES: string[] = [];

export type Product = {
  id: string; // "pack" ou slug du module
  kind: "pack" | "module";
  label: string;
  description: string;
  priceCents: number;
  /** "all" = tous les modules (pack) ; sinon slugs accordés. */
  grants: "all" | string[];
  available: boolean;
};

function priceFromEnv(name: string, fallbackCents: number): number {
  const raw = process.env[name];
  const parsed = raw ? Number.parseInt(raw, 10) : NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallbackCents;
}

export function getPackPriceCents(): number {
  return priceFromEnv("FORMATION_PRICE_CENTS", 29900);
}

export function getModulePriceCents(): number {
  return priceFromEnv("MODULE_PRICE_CENTS", 5900);
}

/** Catalogue vendable, dérivé de COURSE (source unique de vérité du contenu). */
export function getCatalog(): Product[] {
  const pack: Product = {
    id: PACK_PRODUCT_ID,
    kind: "pack",
    label: "Formation Agent Immobilier — Loi ALUR 2026",
    description: `Accès complet aux ${COURSE.length} modules (${formatDuration(getTotalCourseDurationMin())}), attestation et certification MasterClass.`,
    priceCents: getPackPriceCents(),
    grants: "all",
    available: true,
  };
  const modules: Product[] = COURSE.map((mod) => ({
    id: mod.slug,
    kind: "module",
    label: mod.title,
    description: mod.summary,
    priceCents: getModulePriceCents(),
    grants: [mod.slug],
    available: !UNAVAILABLE_MODULES.includes(mod.slug),
  }));
  return [pack, ...modules];
}

export function getProduct(id: string): Product | undefined {
  return getCatalog().find((p) => p.id === id);
}
```

- [ ] **Step 4 : Vérifier le vert**

Run : `npm test -- catalog`
Attendu : PASS (8 tests).

- [ ] **Step 5 : Commit**

```bash
git add src/data/catalog.ts src/data/catalog.test.ts
git commit -m "feat(vente): catalogue produits pack + modules derive de COURSE"
```

---

## Task 3 : Logique d'achat pure (`purchase.ts`)

**Files:**
- Create: `lms/src/lib/purchase.test.ts`
- Create: `lms/src/lib/purchase.ts`

- [ ] **Step 1 : Écrire les tests qui échouent**

Create `lms/src/lib/purchase.test.ts` :
```ts
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
```

- [ ] **Step 2 : Vérifier l'échec**

Run : `npm test -- purchase`
Attendu : FAIL — `Cannot find module './purchase'`.

- [ ] **Step 3 : Implémenter `purchase.ts`**

Create `lms/src/lib/purchase.ts` :
```ts
import type Stripe from "stripe";
import { FORMATION_ID, PACK_PRODUCT_ID, getCatalog, type Product } from "@/data/catalog";
import type { Entitlements } from "@/lib/entitlements";

/**
 * Logique d'achat PURE (aucune I/O).
 * Règle d'or (spec §4) : l'éligibilité à l'achat est TOUJOURS recalculée
 * côté serveur — le front n'est qu'un confort d'affichage.
 */

export type RemovalReason = "unknown" | "unavailable" | "already_owned" | "included_in_pack" | "duplicate";

export function filterPurchasable(
  requestedIds: string[],
  owned: Entitlements,
  catalog: Product[] = getCatalog()
): { allowed: Product[]; removed: { id: string; reason: RemovalReason }[] } {
  const removed: { id: string; reason: RemovalReason }[] = [];
  const seen = new Set<string>();
  const candidates: Product[] = [];

  for (const id of requestedIds) {
    if (seen.has(id)) {
      removed.push({ id, reason: "duplicate" });
      continue;
    }
    seen.add(id);
    const product = catalog.find((p) => p.id === id);
    if (!product) {
      removed.push({ id, reason: "unknown" });
      continue;
    }
    if (!product.available) {
      removed.push({ id, reason: "unavailable" });
      continue;
    }
    candidates.push(product);
  }

  const packInCart = candidates.some((p) => p.kind === "pack");
  const allowed: Product[] = [];
  for (const product of candidates) {
    if (owned.hasPack) {
      removed.push({ id: product.id, reason: "already_owned" });
      continue;
    }
    if (product.kind === "module" && owned.modules.has(product.id)) {
      removed.push({ id: product.id, reason: "already_owned" });
      continue;
    }
    if (product.kind === "module" && packInCart) {
      removed.push({ id: product.id, reason: "included_in_pack" });
      continue;
    }
    allowed.push(product);
  }
  return { allowed, removed };
}

/** Metadata Stripe en JSON (spec §5.4). Pas de clé legacy `formationId` :
 *  en cas de rollback, l'ancien webhook IGNORE plutôt que sur-octroyer. */
export function buildPurchaseMetadata(products: Product[], userId: string): Record<string, string> {
  return {
    product_ids: JSON.stringify(products.map((p) => p.id)),
    purchase_type: products.some((p) => p.kind === "pack") ? "pack" : "module_bundle",
    formation_id: FORMATION_ID,
    user_id: userId,
  };
}

export type ParsedPurchase = {
  formationId: string | null;
  productIds: string[];
  userId: string | null;
  purchaseType: "pack" | "module_bundle" | null;
  /** true = session créée par l'ANCIEN checkout (pas de product_ids lisibles) ⇒ pack. */
  legacy: boolean;
};

export function parsePurchaseMetadata(
  metadata: Record<string, string> | null | undefined
): ParsedPurchase {
  const formationId = metadata?.formation_id ?? metadata?.formationId ?? null;

  let productIds: string[] = [];
  if (metadata?.product_ids) {
    try {
      const parsed: unknown = JSON.parse(metadata.product_ids);
      if (Array.isArray(parsed)) {
        productIds = parsed.filter((x): x is string => typeof x === "string");
      }
    } catch {
      // metadata corrompue → traitée comme absente (chemin legacy)
    }
  }

  const legacy = productIds.length === 0;
  if (legacy && formationId) {
    // Sessions créées avant le déploiement : 1 produit = le pack (comportement historique).
    productIds = [PACK_PRODUCT_ID];
  }

  const rawType = metadata?.purchase_type;
  const purchaseType =
    rawType === "pack" || rawType === "module_bundle"
      ? rawType
      : legacy && formationId
        ? "pack"
        : null;

  return {
    formationId,
    productIds,
    userId: metadata?.user_id ?? null,
    purchaseType,
    legacy,
  };
}

/** Produits achetés → droits à octroyer. Pack ⇒ [null] (module_slug NULL = accès total). */
export function grantsFromProducts(
  productIds: string[],
  catalog: Product[] = getCatalog()
): (string | null)[] {
  const known = productIds
    .map((id) => catalog.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));
  if (known.some((p) => p.kind === "pack")) return [null];
  return [...new Set(known.filter((p) => p.kind === "module").map((p) => p.id))];
}

/** Produits → line items Stripe (price_data dynamique, montants depuis le catalogue). */
export function toLineItems(
  products: Product[],
  appUrl: string
): Stripe.Checkout.SessionCreateParams.LineItem[] {
  return products.map((p) => ({
    price_data: {
      currency: "eur",
      product_data: {
        name: p.label,
        description: p.description,
        ...(p.kind === "pack"
          ? { images: [`${appUrl}/generated/fal/transaction/cover-immobilier.jpg`] }
          : {}),
      },
      unit_amount: p.priceCents,
    },
    quantity: 1,
  }));
}
```

- [ ] **Step 4 : Vérifier le vert**

Run : `npm test -- purchase`
Attendu : PASS (15 tests).

- [ ] **Step 5 : Commit**

```bash
git add src/lib/purchase.ts src/lib/purchase.test.ts
git commit -m "feat(vente): logique d'achat pure (filtrage droits, metadata JSON, grants, line items)"
```

---

## Task 4 : Requête de droits réutilisable (`fetchActiveEntitlementRows`)

**Files:**
- Modify: `lms/src/lib/auth-access.ts`
- Modify: `lms/src/lib/access.ts`

- [ ] **Step 1 : Ajouter la fonction dans `auth-access.ts`**

Ajouter en haut du fichier l'import du type :
```ts
import type { EntitlementRow } from "@/lib/entitlements";
```
Append à la fin du fichier :
```ts
/**
 * Lit les droits ACTIFS d'un utilisateur (pack + modules) via service role
 * — réutilisé par verifyModuleAccess et par le filtrage serveur du checkout.
 */
export async function fetchActiveEntitlementRows(params: {
  email: string;
  userId: string;
  formationId?: string;
}): Promise<EntitlementRow[]> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("user_subscriptions")
    .select("module_slug, status")
    .eq("formation_id", params.formationId ?? "immobilier")
    .or(`email.eq.${params.email.toLowerCase()},user_id.eq.${params.userId}`)
    .eq("status", "active");

  if (error) throw new Error(error.message);
  return (data ?? []) as EntitlementRow[];
}
```

- [ ] **Step 2 : Rerouter `verifyModuleAccess` dessus**

Dans `lms/src/lib/access.ts`, remplacer le bloc « 2. Sinon, lire les droits actifs… » de `verifyModuleAccess` (la création du client admin + la requête) par :
```ts
  // 2. Sinon, lire les droits actifs (pack + modules) via service role
  const rows = await fetchActiveEntitlementRows({
    email: user.email,
    userId: user.id,
  });

  const { hasPack, modules } = getEntitlements(rows);
  const hasAccess = hasPack || modules.has(moduleSlug);

  return { user, isAdmin: false, hasAccess };
```
Et ajouter l'import : `import { fetchActiveEntitlementRows } from "@/lib/auth-access";`

- [ ] **Step 3 : Lint + typecheck + tests**

Run :
```bash
npx eslint src/lib/auth-access.ts src/lib/access.ts && npx tsc --noEmit && npm test
```
Attendu : lint OK, 0 erreur TS sur nos fichiers, tous tests PASS.

- [ ] **Step 4 : Commit**

```bash
git add src/lib/auth-access.ts src/lib/access.ts
git commit -m "refactor(access): fetchActiveEntitlementRows partagee (verifyModuleAccess + checkout)"
```

---

## Task 5 : Checkout multi-produits authentifié (`/api/checkout`)

**Files:**
- Rewrite: `lms/src/app/api/checkout/route.ts`

- [ ] **Step 1 : Réécrire la route**

Remplacer le contenu de `lms/src/app/api/checkout/route.ts` par :
```ts
import { toErrorMessage } from "@/lib/utils/error";
import { createClient } from "@/lib/supabase/server";
import { fetchActiveEntitlementRows } from "@/lib/auth-access";
import { getEntitlements } from "@/lib/entitlements";
import { buildPurchaseMetadata, filterPurchasable, toLineItems } from "@/lib/purchase";
import { PACK_PRODUCT_ID } from "@/data/catalog";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";

export const dynamic = "force-dynamic";

// Initialisation sécurisée pour éviter les crashs au build
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

const VERCEL_APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://app.monpassformation.com";

const BodySchema = z.object({
  /** Nouveau panier : ids produits ("pack" ou slugs de modules). */
  products: z.array(z.string().max(64)).max(20).optional(),
  /** Compat ancien front : { formationId: "immobilier" } = achat du pack. */
  formationId: z.string().max(64).optional(),
});

export async function POST(request: Request) {
  if (!stripe) {
    return NextResponse.json({ error: "Stripe is not configured" }, { status: 500 });
  }
  try {
    // 1. Connexion obligatoire avant paiement (spec §5.4) : le user_id est
    //    rattaché à l'achat et l'email Stripe est pré-rempli.
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) {
      return NextResponse.json(
        { error: "Connexion requise avant le paiement", code: "AUTH_REQUIRED" },
        { status: 401 }
      );
    }

    const json = await request.json().catch(() => ({}));
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
    }
    const requested =
      parsed.data.products ?? (parsed.data.formationId ? [PACK_PRODUCT_ID] : []);

    // 2. Règle d'or (spec §4) : recalcul des droits CÔTÉ SERVEUR — retire tout
    //    produit déjà possédé ou couvert par le pack. Le front n'est jamais cru.
    const rows = await fetchActiveEntitlementRows({
      email: user.email,
      userId: user.id,
    });
    const { allowed } = filterPurchasable(requested, getEntitlements(rows));

    if (allowed.length === 0) {
      return NextResponse.json(
        { error: "Rien à acheter : produit(s) inconnus ou déjà acquis.", code: "NOTHING_TO_BUY" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: toLineItems(allowed, VERCEL_APP_URL),
      mode: "payment",
      customer_email: user.email,
      success_url: `${VERCEL_APP_URL}/formation?achat=confirme&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.passformation.com"}#formation-immobiliere`,
      metadata: buildPurchaseMetadata(allowed, user.id),
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe Error:", err);
    return NextResponse.json({ error: toErrorMessage(err) }, { status: 500 });
  }
}
```

- [ ] **Step 2 : Lint + typecheck**

Run : `npx eslint src/app/api/checkout/route.ts && npx tsc --noEmit`
Attendu : OK.

- [ ] **Step 3 : Commit**

```bash
git add src/app/api/checkout/route.ts
git commit -m "feat(vente): checkout multi-produits authentifie + filtrage serveur des droits"
```

---

## Task 6 : Webhook multi-droits (`/api/webhooks/stripe`)

**Files:**
- Rewrite: `lms/src/app/api/webhooks/stripe/route.ts`

- [ ] **Step 1 : Réécrire la route**

Remplacer le contenu de `lms/src/app/api/webhooks/stripe/route.ts` par :
```ts
import { toErrorMessage } from "@/lib/utils/error";
import { sendWelcomeEmail } from "@/lib/email/resend";
import { grantEntitlement } from "@/lib/auth-access";
import { grantsFromProducts, parsePurchaseMetadata } from "@/lib/purchase";
import { FORMATION_ID } from "@/data/catalog";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

// Initialisation sécurisée pour éviter les crashs au build
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const isSupabaseAdminConfigured =
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
  Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

export async function POST(request: Request) {
  if (!stripe || !isSupabaseAdminConfigured || !webhookSecret) {
    console.error("Webhook configuration missing");
    return NextResponse.json({ error: "Configuration missing" }, { status: 500 });
  }
  const body = await request.text();
  const signature = (await headers()).get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed: ${toErrorMessage(err)}`);
    return NextResponse.json({ error: `Webhook Error: ${toErrorMessage(err)}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_details?.email;
    const purchase = parsePurchaseMetadata(session.metadata);

    // Cette app ne gère que la formation immobilier.
    // Les autres produits (Digiformat, etc.) sont traités par leur propre système.
    if (purchase.formationId !== FORMATION_ID) {
      console.log(
        `Stripe webhook ignored — formation "${purchase.formationId ?? "(none)"}" n'est pas immobilier (session: ${session.id})`
      );
      return NextResponse.json({ received: true, ignored: true });
    }

    if (!customerEmail) {
      console.error(`Webhook sans email client (session: ${session.id})`);
      return NextResponse.json({ received: true, ignored: true });
    }

    // Un droit par produit : pack ⇒ module_slug NULL (accès total),
    // module ⇒ son slug. Sessions legacy (ancien checkout) ⇒ pack.
    const grants = grantsFromProducts(purchase.productIds);
    if (grants.length === 0) {
      console.error(
        `Webhook sans produit reconnu (session: ${session.id}, product_ids: ${JSON.stringify(purchase.productIds)})`
      );
      return NextResponse.json({ received: true, ignored: true });
    }

    console.log(
      `Payment successful for ${customerEmail} — produits: ${purchase.productIds.join(", ")} (session: ${session.id})`
    );

    try {
      for (const moduleSlug of grants) {
        await grantEntitlement({
          email: customerEmail,
          formation_id: FORMATION_ID,
          module_slug: moduleSlug,
          status: "active",
          stripe_session_id: session.id,
          user_id: purchase.userId,
        });
      }
    } catch (subError) {
      // 500 ⇒ Stripe rejouera le webhook ; grantEntitlement est idempotent
      // (upsert manuel), donc le retry est sans danger.
      console.error("Error saving entitlements:", subError);
      return NextResponse.json({ error: "Error saving entitlements" }, { status: 500 });
    }

    // Email de bienvenue : achats PACK uniquement (comportement historique).
    // Un client existant qui ajoute un module ne reçoit pas de "bienvenue".
    if (purchase.purchaseType === "pack") {
      const customerName = session.customer_details?.name ?? undefined;
      try {
        await sendWelcomeEmail(customerEmail, customerName);
      } catch (emailError) {
        console.error("Error sending welcome email:", emailError);
      }
    }
  }

  return NextResponse.json({ received: true });
}
```

- [ ] **Step 2 : Lint + typecheck + suite complète**

Run : `npx eslint src/app/api/webhooks/stripe/route.ts && npx tsc --noEmit && npm test`
Attendu : OK, tous tests PASS.

- [ ] **Step 3 : Commit**

```bash
git add src/app/api/webhooks/stripe/route.ts
git commit -m "feat(vente): webhook multi-droits via grantEntitlement (compat legacy = pack)"
```

---

## Self-Review (couverture spec)

- **§5.1 catalogue en code** (pack + 6 modules, prix env-overridables, libellés depuis `COURSE`) → Task 2. ✅
- **§4 Règle d'or** (recalcul serveur, module possédé/couvert jamais revendable, panier vide ⇒ pas de session) → Tasks 3 & 5. ✅
- **§5.4 paiement** (connexion obligatoire, email pré-rempli, metadata JSON `product_ids`/`purchase_type`/`formation_id`/`user_id`, panier multi-produits en 1 paiement) → Tasks 3, 5. ✅ (Upsell pack = UI, Plan 5.)
- **§6 tests** (filtrage checkout, webhook → bons droits, idempotence via `grantEntitlement` + retry Stripe) → Tasks 3, 6. ✅
- **Compat sessions en vol** (ancien checkout → nouveau webhook = pack) → Task 3 (parse legacy) + Task 6. ✅
- **Types cohérents** : `Product`/`Entitlements`/`EntitlementRow` partagés entre catalog/purchase/access ; `grantEntitlement(module_slug: string | null)` aligné avec `grants: (string|null)[]`. ✅
