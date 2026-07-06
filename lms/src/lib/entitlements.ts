/**
 * Logique d'accès PURE (aucune I/O). Testable unitairement.
 * Convention : module_slug === null  ⇒  accès "pack" (tous les modules).
 */

export type EntitlementRow = {
  module_slug: string | null;
  status: string;
};

export type Entitlements = {
  hasPack: boolean;
  modules: Set<string>;
};

const ACTIVE = "active";

/**
 * Modules vendus en ADD-ON autonome : accessibles UNIQUEMENT à l'achat à
 * l'unité, jamais couverts par le pack "accès complet". Le pack donne accès à
 * tous les modules SAUF ceux-ci.
 */
export const PACK_EXCLUDED_MODULES = new Set<string>(["tracfin"]);

/** Réduit des lignes user_subscriptions brutes en un set de droits normalisé. */
export function getEntitlements(rows: EntitlementRow[]): Entitlements {
  let hasPack = false;
  const modules = new Set<string>();
  for (const row of rows) {
    if (row.status !== ACTIVE) continue;
    if (row.module_slug === null) {
      hasPack = true;
    } else {
      modules.add(row.module_slug);
    }
  }
  return { hasPack, modules };
}

/**
 * Règle d'accès CENTRALE (source unique de vérité). Un utilisateur accède à un
 * module s'il l'a acheté à l'unité, OU s'il a le pack ET que le module n'est
 * pas un add-on autonome exclu du pack.
 */
export function hasModuleAccess(ent: Entitlements, moduleSlug: string): boolean {
  if (ent.modules.has(moduleSlug)) return true;
  return ent.hasPack && !PACK_EXCLUDED_MODULES.has(moduleSlug);
}

/** Décide si un utilisateur peut accéder à un module donné. */
export function canAccessModule(
  rows: EntitlementRow[],
  moduleSlug: string,
  isAdmin: boolean
): boolean {
  if (isAdmin) return true;
  return hasModuleAccess(getEntitlements(rows), moduleSlug);
}
