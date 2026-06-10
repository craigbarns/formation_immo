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
