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
