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

/** Décide si un utilisateur peut accéder à un module donné. */
export function canAccessModule(
  rows: EntitlementRow[],
  moduleSlug: string,
  isAdmin: boolean
): boolean {
  if (isAdmin) return true;
  const { hasPack, modules } = getEntitlements(rows);
  return hasPack || modules.has(moduleSlug);
}
