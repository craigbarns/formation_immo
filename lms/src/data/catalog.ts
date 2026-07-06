import { COURSE, formatDuration } from "@/data/course";
import { PACK_EXCLUDED_MODULES } from "@/lib/entitlements";

export const FORMATION_ID = "immobilier";
export const PACK_PRODUCT_ID = "pack";

/** Modules retirés de la vente à l'unité (slugs) — escape hatch sans toucher COURSE. */
export const UNAVAILABLE_MODULES: string[] = [];

/**
 * Prix spécifiques par module (en centimes), pour les add-ons vendus à un tarif
 * différent du prix module standard. Surchargables par env `MODULE_PRICE_CENTS_<SLUG>`.
 */
const MODULE_PRICE_OVERRIDES: Record<string, number> = { tracfin: 4900 };

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

/** Prix d'un module donné : override spécifique (ex. add-on) sinon prix standard. */
export function getModulePriceCentsFor(slug: string): number {
  const override = MODULE_PRICE_OVERRIDES[slug];
  if (override != null) {
    return priceFromEnv(`MODULE_PRICE_CENTS_${slug.toUpperCase()}`, override);
  }
  return getModulePriceCents();
}

/** Catalogue vendable, dérivé de COURSE (source unique de vérité du contenu). */
export function getCatalog(): Product[] {
  // Le pack "accès complet" ne couvre PAS les add-ons autonomes (ex. TRACFIN) :
  // sa description et sa durée ne comptent que les modules réellement inclus.
  const packModules = COURSE.filter((m) => !PACK_EXCLUDED_MODULES.has(m.slug));
  const packDurationMin = packModules.reduce(
    (t, m) => t + m.lessons.reduce((a, l) => a + l.duration, 0),
    0
  );
  const pack: Product = {
    id: PACK_PRODUCT_ID,
    kind: "pack",
    label: "Formation Agent Immobilier — Loi ALUR 2026",
    description: `Accès complet aux ${packModules.length} modules (${formatDuration(packDurationMin)}), attestation et certification MasterClass.`,
    priceCents: getPackPriceCents(),
    grants: "all",
    available: true,
  };
  const modules: Product[] = COURSE.map((mod) => ({
    id: mod.slug,
    kind: "module",
    label: mod.title,
    description: mod.summary,
    priceCents: getModulePriceCentsFor(mod.slug),
    grants: [mod.slug],
    available: !UNAVAILABLE_MODULES.includes(mod.slug),
  }));
  return [pack, ...modules];
}

export function getProduct(id: string): Product | undefined {
  return getCatalog().find((p) => p.id === id);
}
