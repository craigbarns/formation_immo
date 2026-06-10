# Plan 1/5 — Socle d'accès par module (entitlements) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter la granularité « module » aux droits d'accès (`user_subscriptions`) avec une logique d'accès pure et testée, **sans rien changer de visible** et **sans faire perdre l'accès aux clients pack existants**.

**Architecture :** On ajoute une colonne nullable `module_slug` à `user_subscriptions` (`NULL` = pack = tous les modules). La décision d'accès est extraite dans un module **pur** (`entitlements.ts`) testé unitairement avec Vitest ; `access.ts` et `auth-access.ts` n'en sont que de fines couches d'I/O Supabase. Index uniques **partiels** pour gérer proprement le `NULL` (cf. spec §5.2).

**Tech Stack :** TypeScript, Next.js (⚠️ non standard — voir `lms/AGENTS.md`), Supabase (Postgres), **Vitest** (introduit ici — aucun test n'existe aujourd'hui).

**Référence spec :** `docs/superpowers/specs/2026-06-09-vente-modules-catalogue-design.md` (§4 Règle d'or, §5.2 entitlements, §5.3 logique d'accès, §6 tests, §7 phases 1–2).

---

## ⚠️ Ordre de déploiement (sécurité production)

La base Supabase peut être **partagée** entre la prod et l'aperçu Vercel. Dropper l'ancien index unique pendant que le code de prod l'utilise **casserait** les achats pack.

**Avant d'exécuter la Task 5 (migration) sur une base de prod, confirmer :** l'aperçu utilise-t-il un projet Supabase séparé ?
- **Oui (base séparée)** → exécuter librement sur la base d'aperçu ; appliquer en prod au moment du merge.
- **Non (base partagée prod)** → respecter cet ordre : **(A)** ajouter la colonne `module_slug` (additif, sans risque) → **(B)** déployer le code (Tasks 2 & 4) qui n'utilise plus l'`onConflict` sur l'ancien index → **(C)** seulement ensuite dropper l'ancien index + créer les index partiels.

Sur la **branche de travail** (notre cas), on écrit tout le code ; l'application réelle de la migration suit l'ordre ci-dessus et n'est faite qu'après validation. Aucune commande de ce plan ne déploie en prod.

---

## File Structure

| Fichier | Rôle | Action |
|---|---|---|
| `lms/src/lib/entitlements.ts` | Logique d'accès **pure** (aucune I/O) : normalise les lignes → droits ; décide l'accès à un module | **Créer** |
| `lms/src/lib/entitlements.test.ts` | Tests unitaires Vitest de la logique pure | **Créer** |
| `lms/vitest.config.ts` | Config Vitest (env node, `src/**/*.test.ts`) | **Créer** |
| `lms/package.json` | Ajoute la dép `vitest` + scripts `test` | **Modifier** |
| `lms/src/lib/access.ts` | Ajoute `verifyModuleAccess(moduleSlug)` (fetch + délègue au pur) | **Modifier** |
| `lms/src/lib/auth-access.ts` | Ajoute `grantEntitlement(...)` ; reroute `upsertSubscription` dessus (n'utilise plus l'index droppé) | **Modifier** |
| `lms/supabase/migrations/009_module_entitlements.sql` | Colonne `module_slug` + index partiels | **Créer** |

Toutes les commandes s'exécutent depuis `lms/` sauf indication contraire.

---

## Task 1 : Mise en place de Vitest

**Files:**
- Modify: `lms/package.json` (scripts + devDependency)
- Create: `lms/vitest.config.ts`
- Create: `lms/src/lib/__smoke__.test.ts` (test jetable, supprimé en fin de tâche)

- [ ] **Step 1 : Installer Vitest**

Run (depuis `lms/`) :
```bash
npm install -D vitest
```
Attendu : `vitest` ajouté à `devDependencies` dans `package.json`, pas d'erreur.

- [ ] **Step 2 : Créer la config Vitest**

Create `lms/vitest.config.ts` :
```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
```

- [ ] **Step 3 : Ajouter les scripts de test à `package.json`**

Modifier le bloc `"scripts"` de `lms/package.json` pour ajouter `test` et `test:watch` (garder `dev`, `build`, `lint` existants) :
```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "eslint",
    "test": "vitest run",
    "test:watch": "vitest"
  },
```

- [ ] **Step 4 : Écrire un test smoke pour vérifier le harnais**

Create `lms/src/lib/__smoke__.test.ts` :
```ts
import { describe, it, expect } from "vitest";

describe("vitest harness", () => {
  it("runs", () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 5 : Lancer les tests (le smoke doit passer)**

Run :
```bash
npm test
```
Attendu : 1 fichier, 1 test, **PASS**.

- [ ] **Step 6 : Supprimer le test smoke et commiter le harnais**

Run :
```bash
rm src/lib/__smoke__.test.ts
git add package.json package-lock.json vitest.config.ts
git commit -m "test: mise en place de Vitest (aucun test n'existait)"
```

---

## Task 2 : Logique d'accès pure (`entitlements.ts`)

**Files:**
- Create: `lms/src/lib/entitlements.test.ts`
- Create: `lms/src/lib/entitlements.ts`

- [ ] **Step 1 : Écrire les tests qui échouent**

Create `lms/src/lib/entitlements.test.ts` :
```ts
import { describe, it, expect } from "vitest";
import { getEntitlements, canAccessModule, type EntitlementRow } from "./entitlements";

const pack: EntitlementRow = { module_slug: null, status: "active" };
const juridique: EntitlementRow = { module_slug: "juridique", status: "active" };

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
```

- [ ] **Step 2 : Lancer les tests (doivent échouer)**

Run :
```bash
npm test -- entitlements
```
Attendu : **FAIL** — `Cannot find module './entitlements'`.

- [ ] **Step 3 : Implémenter `entitlements.ts`**

Create `lms/src/lib/entitlements.ts` :
```ts
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
```

- [ ] **Step 4 : Lancer les tests (doivent passer)**

Run :
```bash
npm test -- entitlements
```
Attendu : **PASS** (8 tests).

- [ ] **Step 5 : Commit**

```bash
git add src/lib/entitlements.ts src/lib/entitlements.test.ts
git commit -m "feat(access): logique d'accès par module pure + tests"
```

---

## Task 3 : Brancher `verifyModuleAccess` dans `access.ts`

**Files:**
- Modify: `lms/src/lib/access.ts` (ajout d'une fonction ; on ne touche pas `verifySubscription` existante)

> Couche d'I/O fine au-dessus de la logique pure (Task 2). Pas de test unitaire ici (nécessiterait de mocker Supabase) ; la vérification réelle se fait sur l'aperçu Vercel au Plan 5. Suivre **exactement** le style de `verifySubscription` déjà présent dans le fichier.

- [ ] **Step 1 : Ajouter l'import de la logique pure**

En haut de `lms/src/lib/access.ts`, après les imports existants, ajouter :
```ts
import { getEntitlements } from "@/lib/entitlements";
```

- [ ] **Step 2 : Ajouter `verifyModuleAccess` à la fin du fichier**

Append à `lms/src/lib/access.ts` :
```ts
/**
 * Vérifie l'accès à UN module précis.
 * Renvoie { user, isAdmin, hasAccess }. Ne lève pas si l'accès est refusé —
 * l'appelant (page/leçon) décide quoi afficher (contenu vs CTA d'achat).
 */
export async function verifyModuleAccess(moduleSlug: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !user.email) {
    throw new Error("Non authentifié");
  }

  // 1. Admin → accès total
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role === "admin") {
    return { user, isAdmin: true, hasAccess: true };
  }

  // 2. Sinon, lire les droits actifs (pack + modules) via service role
  const admin = createAdminClient();
  const { data: rows } = await admin
    .from("user_subscriptions")
    .select("module_slug, status")
    .eq("formation_id", "immobilier")
    .or(`email.eq.${user.email},user_id.eq.${user.id}`)
    .eq("status", "active");

  const { hasPack, modules } = getEntitlements(rows ?? []);
  const hasAccess = hasPack || modules.has(moduleSlug);

  return { user, isAdmin: false, hasAccess };
}
```

- [ ] **Step 3 : Vérifier que le typecheck/lint passe**

Run :
```bash
npm run lint
```
Attendu : pas d'erreur sur `src/lib/access.ts`.

- [ ] **Step 4 : Commit**

```bash
git add src/lib/access.ts
git commit -m "feat(access): verifyModuleAccess (lecture droits pack + modules)"
```

---

## Task 4 : `grantEntitlement` + reroutage de `upsertSubscription`

**Files:**
- Modify: `lms/src/lib/auth-access.ts`

> **Pourquoi rerouter `upsertSubscription` :** la Task 5 droppe l'index unique `(email, formation_id)` sur lequel s'appuie l'`onConflict` actuel. Sans reroutage, l'octroi d'accès pack casserait après migration. `grantEntitlement` fait un upsert **manuel** (select puis insert/update) compatible avec les index partiels.

- [ ] **Step 1 : Ajouter `grantEntitlement` (upsert manuel par (email, formation, module))**

Append à `lms/src/lib/auth-access.ts` :
```ts
/**
 * Octroie un droit d'accès. module_slug === null ⇒ pack (tous les modules).
 * Upsert manuel : les index uniques PARTIELS (cf. migration 009) ne se prêtent
 * pas à l'onConflict de PostgREST, donc on select puis insert/update.
 */
export async function grantEntitlement(payload: {
  email: string;
  formation_id: string;
  module_slug: string | null;
  status?: string;
  stripe_session_id?: string | null;
  user_id?: string | null;
}) {
  const admin = createAdminClient();
  const email = payload.email.toLowerCase();

  let lookup = admin
    .from("user_subscriptions")
    .select("id")
    .eq("email", email)
    .eq("formation_id", payload.formation_id);
  lookup =
    payload.module_slug === null
      ? lookup.is("module_slug", null)
      : lookup.eq("module_slug", payload.module_slug);

  const { data: existing, error: selectError } = await lookup.maybeSingle();
  if (selectError) throw new Error(selectError.message);

  const row = {
    email,
    formation_id: payload.formation_id,
    module_slug: payload.module_slug,
    status: payload.status ?? "active",
    stripe_session_id: payload.stripe_session_id ?? null,
    user_id: payload.user_id ?? null,
  };

  if (existing?.id) {
    const { error } = await admin
      .from("user_subscriptions")
      .update(row)
      .eq("id", existing.id);
    if (error) throw new Error(error.message);
    return;
  }

  const { error } = await admin.from("user_subscriptions").insert(row);
  if (error) throw new Error(error.message);
}
```

- [ ] **Step 2 : Rerouter `upsertSubscription` (pack) vers `grantEntitlement`**

Remplacer le **corps** de la fonction `upsertSubscription` existante par une délégation (le pack = `module_slug: null`). Conserver la signature publique pour ne pas casser les appelants (webhook actuel) :
```ts
export async function upsertSubscription(payload: {
  email: string;
  formation_id: string;
  status: string;
  stripe_session_id?: string | null;
  user_id?: string | null;
}) {
  await grantEntitlement({
    email: payload.email,
    formation_id: payload.formation_id,
    module_slug: null, // pack = accès complet
    status: payload.status,
    stripe_session_id: payload.stripe_session_id ?? null,
    user_id: payload.user_id ?? null,
  });
}
```

- [ ] **Step 3 : Vérifier lint/typecheck**

Run :
```bash
npm run lint
```
Attendu : pas d'erreur sur `src/lib/auth-access.ts`.

- [ ] **Step 4 : Commit**

```bash
git add src/lib/auth-access.ts
git commit -m "feat(access): grantEntitlement + upsertSubscription via upsert manuel (compat index partiels)"
```

---

## Task 5 : Migration `009_module_entitlements.sql`

**Files:**
- Create: `lms/supabase/migrations/009_module_entitlements.sql`

> ⚠️ Relire la section **Ordre de déploiement** en tête de plan avant d'**appliquer** cette migration sur une base de prod. Ici on **écrit** le fichier et on l'applique sur la base d'aperçu/dev.

- [ ] **Step 1 : Écrire la migration (additive + index partiels)**

Create `lms/supabase/migrations/009_module_entitlements.sql` :
```sql
-- Vente des modules à l'unité : granularité "module" sur user_subscriptions.
-- Additif & rétrocompatible : les lignes existantes ont module_slug NULL = pack (accès total).

-- (A) Colonne nullable. NULL = pack (tous les modules). Sans risque sur l'existant.
alter table public.user_subscriptions
  add column if not exists module_slug text;

-- (C) L'ancien index unique (email, formation_id) empêche d'avoir pack + modules
-- pour un même email. On le remplace par deux index PARTIELS.
drop index if exists user_subscriptions_email_formation_id_idx;

-- Un seul accès "pack" par (email, formation) — module_slug IS NULL.
create unique index if not exists user_subscriptions_pack_idx
  on public.user_subscriptions (email, formation_id)
  where module_slug is null;

-- Un seul accès par module par (email, formation) — module_slug renseigné.
create unique index if not exists user_subscriptions_module_idx
  on public.user_subscriptions (email, formation_id, module_slug)
  where module_slug is not null;
```

- [ ] **Step 2 : Appliquer la migration (base d'aperçu/dev)**

Appliquer via le process de migration habituel du projet — au choix :
```bash
# Option Supabase CLI (si configuré pour ce projet) :
supabase db push
```
ou coller le contenu du fichier dans l'éditeur SQL Supabase de la base d'aperçu/dev.
Attendu : exécution sans erreur (colonne ajoutée, 1 index droppé, 2 index créés).

- [ ] **Step 3 : Vérifier la rétrocompat (les anciens accès = pack)**

Exécuter cette requête sur la base :
```sql
select email, formation_id, module_slug, status
from public.user_subscriptions
order by created_at desc
limit 20;
```
Attendu : **toutes les lignes existantes ont `module_slug = NULL`** → elles valent « pack » → accès total conservé. ✅

- [ ] **Step 4 : Commit**

```bash
git add supabase/migrations/009_module_entitlements.sql
git commit -m "feat(db): migration 009 - module_slug + index partiels (retrocompat pack)"
```

---

## Self-Review (couverture spec)

- **§5.2 entitlements** (colonne `module_slug` nullable, NULL=pack, index partiels) → Task 5. ✅
- **§5.3 logique d'accès** (`getEntitlements`, `canAccessModule`/`verifyModuleAccess`, `verifySubscription` conservée) → Tasks 2 & 3. ✅
- **§6 tests** (introduire Vitest ; tester la logique d'accès) → Tasks 1 & 2. ✅ (filtrage panier + webhook = plans suivants.)
- **§Règle d'or §4** : la décision d'accès est serveur (`access.ts`), jamais front. ✅ (le filtrage `/api/checkout` arrive au Plan 2.)
- **Rétrocompat clients pack** : lignes existantes `module_slug NULL` intactes + `verifyModuleAccess` les lit comme pack → Task 5 step 3. ✅
- **Cohérence des types** : `EntitlementRow {module_slug, status}` identique entre `entitlements.ts`, son test, et la requête `.select("module_slug, status")` d'`access.ts`. ✅

---

## Reste du périmètre (plans suivants — détaillés au fur et à mesure)

- **Plan 2/5 — Vente** : `catalog.ts` (produits/prix), `/api/checkout` multi-produits **+ filtrage serveur des droits** (§4), webhook multi-entitlements (via `grantEntitlement`), tests checkout + webhook.
- **Plan 3/5 — Espace apprenant** : verrouillage/déverrouillage des modules dans `src/app/formation/...`, garde leçon via `verifyModuleAccess`.
- **Plan 4/5 — Attestation par module** : `api/certificates/generate` (scope module/full + garde possédé+terminé), variante PDF 1-module, `formation-data.ts`/`module-complete` à 6 modules.
- **Plan 5/5 — Vitrine + panier + go-live** : refonte zone catalogue (`page.tsx`, data-driven, hiérarchie pack/modules), panier + upsell, prix Stripe en test, validation des 4 scénarios sur aperçu Vercel, merge prod.

Chaque plan produit un logiciel **fonctionnel et testable** indépendamment et sera écrit après lecture des fichiers concernés (cf. `lms/AGENTS.md` : lire `node_modules/next/dist/docs/` avant de coder les routes/pages Next).
