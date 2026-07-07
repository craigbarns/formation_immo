# TRACFIN dans le pack + autonome + certifiant (grandfather) — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rendre TRACFIN accessible aux détenteurs du pack, le garder vendu 49 € en autonome, le faire compter dans la certification (45h), sans jamais pénaliser un client existant (grandfather par date d'achat).

**Architecture:** La session précédente a introduit `STANDALONE_MODULE_SLUGS` (course.ts) dont dérive `PACK_EXCLUDED_MODULES` (entitlements.ts). **Vider `STANDALONE_MODULE_SLUGS` bascule tout en cascade** : le pack ouvre TRACFIN, TRACFIN réintègre `FORMATION_MODULES` (parcours), et la page d'accueil / le tableau de bord s'auto-adaptent (les blocs « add-on » se vident). Le seul code réellement neuf est la logique de grandfather du certificat. Le reste = retirer TRACFIN de `BONUS_MODULE_SLUGS`, mettre à jour les tests (dont les garanties s'inversent), et nettoyer le code UI devenu mort.

**Tech Stack:** Next.js (App Router), TypeScript, Vitest, Supabase (client), Stripe.

**Contexte préalable :** travailler sur une branche dédiée. Depuis `main` à jour :
```bash
git checkout main && git pull --ff-only origin main
git checkout -b feat/tracfin-dans-pack
```

---

## Fichiers touchés

- `src/data/course.ts` — vider `STANDALONE_MODULE_SLUGS`.
- `src/lib/formation-journey.ts` — retirer `tracfin` de `BONUS_MODULE_SLUGS` ; ajouter helpers grandfather.
- `src/lib/formation-journey.test.ts` — mettre à jour les attentes (total=40, certifié=36) + tests grandfather.
- `src/lib/entitlements.test.ts` — inverser les garanties d'exclusion (pack ouvre TRACFIN).
- `src/lib/purchase.test.ts` — inverser les cas add-on (pack couvre TRACFIN).
- `src/data/catalog.test.ts` — pack = 7 modules ; TRACFIN toujours 49 €.
- `src/lib/regression-existing-users.test.ts` — inverser (pack ouvre TRACFIN ; TRACFIN dans le parcours) ; garder « aucun client pénalisé ».
- `src/components/certificate/CertificateGenerator.tsx` — logique grandfather (lecture date d'achat + dénominateur dynamique).
- `src/app/page.tsx` — retirer le bloc « Module autonome », ajuster le titre des modules à l'unité.
- `src/app/formation/page.tsx` — retirer `ownedAddons` et la section « Modules spécialisés ».
- (Vérif) `src/lib/pdf/AttestationPDF.tsx`, `src/lib/email/resend.ts` — cohérence des heures affichées.

**Note de cascade :** `catalog.ts`, `purchase.ts`, `formation-journey.ts` (fonctions parcours), `formation/[moduleSlug]/page.tsx`, et les composants analytics utilisent déjà `PACK_EXCLUDED_MODULES` / `FORMATION_MODULES` — ils s'adaptent SANS modification une fois `STANDALONE_MODULE_SLUGS` vidé.

---

## Task 1 : Basculer les données — TRACFIN dans le pack + le parcours

**Files:**
- Modify: `src/data/course.ts:769`
- Modify: `src/lib/formation-journey.ts:25`

- [ ] **Step 1 : Vider `STANDALONE_MODULE_SLUGS`**

Dans `src/data/course.ts`, remplacer :
```ts
export const STANDALONE_MODULE_SLUGS = new Set<string>(["tracfin"]);
```
par :
```ts
// Aucun module autonome pour l'instant : TRACFIN est désormais inclus dans le
// pack ET dans le parcours de formation. La notion est conservée (vide) pour de
// futurs add-ons. PACK_EXCLUDED_MODULES (entitlements) en dérive.
export const STANDALONE_MODULE_SLUGS = new Set<string>([]);
```

- [ ] **Step 2 : Mettre à jour le commentaire de bloc au-dessus (facultatif mais propre)**

Toujours dans `src/data/course.ts`, remplacer le bloc de commentaire décrivant les modules autonomes (juste avant la constante) pour refléter qu'il n'y en a plus. Remplacer :
```ts
/**
 * Modules "autonomes" (add-ons) : vendus à part, hors du parcours de formation
 * principal et hors certification 42h. Ils vivent dans COURSE (pour être
 * consultables/achetables/quizables), mais ne comptent PAS comme des étapes du
 * parcours : progression globale, "prochaine leçon", stats du tableau de bord.
 * Source unique — voir aussi PACK_EXCLUDED_MODULES (dérivé) côté paiement.
 */
```
par :
```ts
/**
 * Modules "autonomes" (add-ons) éventuels : hors parcours ET hors pack. Vide
 * aujourd'hui — TRACFIN est inclus dans le pack et dans le parcours. Source
 * unique dont dérive PACK_EXCLUDED_MODULES (entitlements).
 */
```

- [ ] **Step 3 : Retirer TRACFIN des modules bonus (il compte dans la certification)**

Dans `src/lib/formation-journey.ts`, remplacer :
```ts
export const BONUS_MODULE_SLUGS = ["deontologie", "tracfin"];
```
par :
```ts
// Déontologie reste bonus (hors 42h). TRACFIN, désormais inclus au pack, COMPTE
// dans la certification (le diplôme passe à 45h).
export const BONUS_MODULE_SLUGS = ["deontologie"];
```

- [ ] **Step 4 : Vérifier le typecheck (pas de test encore)**

Run: `cd lms && npx tsc --noEmit`
Expected: `EXIT 0` (les tests échoueront à l'étape suivante, c'est attendu).

- [ ] **Step 5 : Commit**

```bash
git add lms/src/data/course.ts lms/src/lib/formation-journey.ts
git commit -m "feat(tracfin): inclure TRACFIN dans le pack et le parcours certifiant"
```

---

## Task 2 : Helpers de grandfather (logique pure, testée)

**Files:**
- Modify: `src/lib/formation-journey.ts` (ajouts en fin de fichier)
- Test: `src/lib/formation-journey.test.ts`

- [ ] **Step 1 : Écrire les tests d'abord**

Ajouter dans `src/lib/formation-journey.test.ts` (nouveaux imports + nouveau `describe`). En haut, compléter l'import existant :
```ts
import {
  BONUS_MODULE_SLUGS,
  getCertifiedLessonCount,
  getTotalLessonCount,
  findNextLesson,
  isPackGrandfathered,
  getCertificationTotalLessons,
  TRACFIN_CERT_CUTOFF_ISO,
} from "./formation-journey";
```
Puis ajouter à la fin du fichier :
```ts
describe("grandfather TRACFIN (clients pack antérieurs à la bascule)", () => {
  it("achat null => non grandfathered", () => {
    expect(isPackGrandfathered(null)).toBe(false);
    expect(isPackGrandfathered(undefined)).toBe(false);
  });

  it("achat avant la bascule => grandfathered", () => {
    expect(isPackGrandfathered("2026-06-01T10:00:00+00:00")).toBe(true);
  });

  it("achat après la bascule => non grandfathered", () => {
    // 1 an après le cutoff
    expect(isPackGrandfathered("2027-07-07T10:00:00Z")).toBe(false);
  });

  it("dénominateur cert : grandfathered exclut TRACFIN, nouveau l'inclut", () => {
    const full = getCertificationTotalLessons(false);
    const legacy = getCertificationTotalLessons(true);
    const tracfinLessons = full - legacy;
    expect(tracfinLessons).toBe(3); // TRACFIN = 3 leçons
    expect(full).toBe(getTotalLessonCount()); // = parcours complet
  });

  it("le cutoff est une date ISO valide", () => {
    expect(Number.isFinite(Date.parse(TRACFIN_CERT_CUTOFF_ISO))).toBe(true);
  });
});
```

- [ ] **Step 2 : Lancer les tests grandfather (doivent échouer)**

Run: `cd lms && npx vitest run src/lib/formation-journey.test.ts -t grandfather`
Expected: FAIL (`isPackGrandfathered is not a function`).

- [ ] **Step 3 : Implémenter les helpers**

Ajouter à la fin de `src/lib/formation-journey.ts` (après les fonctions existantes) :
```ts
/**
 * Date de bascule : TRACFIN devient requis pour la certification à partir de là.
 * Les clients dont l'achat du pack est ANTÉRIEUR sont "grandfathered" (non pénalisés).
 */
export const TRACFIN_CERT_CUTOFF_ISO = "2026-07-07T00:00:00.000Z";

/** Modules non requis pour la certification des clients grandfathered. */
const GRANDFATHER_OPTIONAL_SLUGS = new Set<string>(["tracfin"]);

/** Achat du pack antérieur à la bascule ⇒ client historique non pénalisé. */
export function isPackGrandfathered(
  packCreatedAtISO: string | null | undefined,
): boolean {
  if (!packCreatedAtISO) return false;
  const t = Date.parse(packCreatedAtISO);
  return Number.isFinite(t) && t < Date.parse(TRACFIN_CERT_CUTOFF_ISO);
}

/** Dénominateur de complétion du certificat selon le statut grandfather. */
export function getCertificationTotalLessons(isGrandfathered: boolean): number {
  return FORMATION_MODULES.filter(
    (m) => !(isGrandfathered && GRANDFATHER_OPTIONAL_SLUGS.has(m.slug)),
  ).reduce((acc, m) => acc + m.lessons.length, 0);
}
```

- [ ] **Step 4 : Lancer les tests grandfather (doivent passer)**

Run: `cd lms && npx vitest run src/lib/formation-journey.test.ts -t grandfather`
Expected: PASS.

- [ ] **Step 5 : Commit**

```bash
git add lms/src/lib/formation-journey.ts lms/src/lib/formation-journey.test.ts
git commit -m "feat(tracfin): helpers de grandfather pour la certification"
```

---

## Task 3 : Mettre à jour les tests de parcours (total=40, certifié=36)

**Files:**
- Modify: `src/lib/formation-journey.test.ts`

- [ ] **Step 1 : Lancer le fichier pour voir les échecs actuels**

Run: `cd lms && npx vitest run src/lib/formation-journey.test.ts`
Expected: FAIL sur les tests supposant total=37 / certifié=33 / tracfin bonus.

- [ ] **Step 2 : Corriger les attentes**

Dans `src/lib/formation-journey.test.ts` :

a) Le test `"tracfin est marqué comme bonus (add-on autonome)"` doit être remplacé (TRACFIN n'est plus bonus). Remplacer :
```ts
  it("tracfin est marqué comme bonus (add-on autonome)", () => {
    expect(BONUS_MODULE_SLUGS).toContain("tracfin");
  });
```
par :
```ts
  it("TRACFIN n'est PLUS bonus : il compte dans la certification", () => {
    expect(BONUS_MODULE_SLUGS).not.toContain("tracfin");
  });
```

b) Le test `"= 33 leçons (contenu réel des 5 modules d'origine)"` : la certification inclut maintenant TRACFIN (36). Remplacer `.toBe(33)` par `.toBe(36)` et le libellé :
```ts
  it("= 36 leçons certifiantes (5 modules coeur + TRACFIN, hors déontologie)", () => {
    expect(getCertifiedLessonCount()).toBe(36);
  });
```

c) Le test `"les add-ons autonomes ne comptent PAS dans le total du parcours"` : TRACFIN compte maintenant. Remplacer par :
```ts
  it("TRACFIN compte désormais dans le total du parcours", () => {
    const all = COURSE.reduce((acc, m) => acc + m.lessons.length, 0);
    expect(getTotalLessonCount()).toBe(all); // plus d'exclusion d'add-on
  });
```

d) Le test `"la certification exclut les leçons bonus DU PARCOURS (ex. déontologie)"` reste valide (déontologie toujours bonus) : vérifier qu'il passe tel quel. Si le calcul `bonusInFormation` utilise `FORMATION_MODULES.filter(BONUS...)`, il vaut désormais 4 (déontologie) — cohérent avec `getCertifiedLessonCount() = getTotalLessonCount() - 4`.

- [ ] **Step 3 : Lancer le fichier (doit passer)**

Run: `cd lms && npx vitest run src/lib/formation-journey.test.ts`
Expected: PASS.

- [ ] **Step 4 : Commit**

```bash
git add lms/src/lib/formation-journey.test.ts
git commit -m "test(tracfin): parcours=40, certification=36 (TRACFIN compte)"
```

---

## Task 4 : Inverser les tests d'accès (entitlements)

**Files:**
- Modify: `src/lib/entitlements.test.ts`

- [ ] **Step 1 : Lancer pour voir les échecs**

Run: `cd lms && npx vitest run src/lib/entitlements.test.ts`
Expected: FAIL sur le `describe("PACK_EXCLUDED_MODULES ...")` (tracfin n'est plus exclu).

- [ ] **Step 2 : Réécrire le bloc d'exclusion**

Dans `src/lib/entitlements.test.ts`, remplacer tout le `describe("PACK_EXCLUDED_MODULES (add-ons autonomes hors pack)", ...)` par :
```ts
describe("PACK_EXCLUDED_MODULES (add-ons hors pack) — vide désormais", () => {
  it("aucun module n'est exclu du pack (TRACFIN inclus)", () => {
    expect(PACK_EXCLUDED_MODULES.size).toBe(0);
    expect(PACK_EXCLUDED_MODULES.has("tracfin")).toBe(false);
  });

  it("le pack donne accès à TRACFIN", () => {
    expect(canAccessModule([pack], "tracfin", false)).toBe(true);
    expect(hasModuleAccess(getEntitlements([pack]), "tracfin")).toBe(true);
  });

  it("achat TRACFIN à l'unité => accès aussi (sans pack)", () => {
    expect(canAccessModule([tracfin], "tracfin", false)).toBe(true);
  });

  it("aucun droit => pas d'accès à TRACFIN", () => {
    expect(canAccessModule([], "tracfin", false)).toBe(false);
  });
});
```

- [ ] **Step 3 : Lancer (doit passer)**

Run: `cd lms && npx vitest run src/lib/entitlements.test.ts`
Expected: PASS.

- [ ] **Step 4 : Commit**

```bash
git add lms/src/lib/entitlements.test.ts
git commit -m "test(tracfin): le pack ouvre TRACFIN (exclusion vidée)"
```

---

## Task 5 : Inverser les tests d'achat (purchase)

**Files:**
- Modify: `src/lib/purchase.test.ts`

- [ ] **Step 1 : Lancer pour voir les échecs**

Run: `cd lms && npx vitest run src/lib/purchase.test.ts`
Expected: FAIL sur les cas « add-on autonome ».

- [ ] **Step 2 : Réécrire les 4 cas add-on**

Dans `src/lib/purchase.test.ts`, remplacer les tests ajoutés la session précédente (les 4 `it` mentionnant « add-on autonome / tracfin ») par :
```ts
  it("TRACFIN est couvert par le pack : un client PACK ne peut pas le racheter", () => {
    const { allowed, removed } = filterPurchasable(["tracfin"], ownsPack, CATALOG);
    expect(allowed).toHaveLength(0);
    expect(removed).toEqual([{ id: "tracfin", reason: "already_owned" }]);
  });

  it("pack + tracfin dans le panier => tracfin devient redondant (inclus au pack)", () => {
    const { allowed, removed } = filterPurchasable(["pack", "tracfin"], none, CATALOG);
    expect(allowed.map((p) => p.id)).toEqual(["pack"]);
    expect(removed).toEqual([{ id: "tracfin", reason: "included_in_pack" }]);
  });

  it("sans pack : TRACFIN reste achetable seul (49€)", () => {
    const { allowed, removed } = filterPurchasable(["tracfin"], none, CATALOG);
    expect(allowed.map((p) => p.id)).toEqual(["tracfin"]);
    expect(removed).toHaveLength(0);
  });

  it("tracfin déjà possédé à l'unité => retiré (already_owned)", () => {
    const ownsTracfin: Entitlements = { hasPack: false, modules: new Set(["tracfin"]) };
    const { allowed, removed } = filterPurchasable(["tracfin"], ownsTracfin, CATALOG);
    expect(allowed).toHaveLength(0);
    expect(removed).toEqual([{ id: "tracfin", reason: "already_owned" }]);
  });
```
(La fixture `tracfin` en haut du fichier reste inchangée : module 49 €.)

- [ ] **Step 3 : Lancer (doit passer)**

Run: `cd lms && npx vitest run src/lib/purchase.test.ts`
Expected: PASS.

- [ ] **Step 4 : Commit**

```bash
git add lms/src/lib/purchase.test.ts
git commit -m "test(tracfin): le pack couvre TRACFIN à l'achat"
```

---

## Task 6 : Mettre à jour les tests du catalogue

**Files:**
- Modify: `src/data/catalog.test.ts`

- [ ] **Step 1 : Lancer pour voir les échecs**

Run: `cd lms && npx vitest run src/data/catalog.test.ts`
Expected: FAIL sur « la description du pack ne compte que les modules INCLUS » (packModules == COURSE.length désormais).

- [ ] **Step 2 : Corriger l'assertion de description**

Dans `src/data/catalog.test.ts`, remplacer :
```ts
  it("la description du pack ne compte que les modules INCLUS (hors add-ons autonomes)", () => {
    const pack = getCatalog()[0];
    const packModules = COURSE.filter((m) => !PACK_EXCLUDED_MODULES.has(m.slug));
    expect(pack.description).toContain(`${packModules.length} modules`);
    // TRACFIN est un add-on autonome : il n'est pas compté dans le pack.
    expect(packModules.length).toBe(COURSE.length - 1);
  });
```
par :
```ts
  it("le pack inclut désormais TOUS les modules (TRACFIN compris)", () => {
    const pack = getCatalog()[0];
    expect(PACK_EXCLUDED_MODULES.size).toBe(0);
    expect(pack.description).toContain(`${COURSE.length} modules`);
  });
```
Les tests « TRACFIN à 49 € » et « surcharge env » restent inchangés (le prix unitaire ne change pas).

- [ ] **Step 3 : Lancer (doit passer)**

Run: `cd lms && npx vitest run src/data/catalog.test.ts`
Expected: PASS.

- [ ] **Step 4 : Commit**

```bash
git add lms/src/data/catalog.test.ts
git commit -m "test(tracfin): le pack compte tous les modules (TRACFIN inclus)"
```

---

## Task 7 : Réécrire le test de non-régression clients existants

**Files:**
- Modify: `src/lib/regression-existing-users.test.ts`

- [ ] **Step 1 : Réécrire le fichier**

Les garanties s'inversent (le pack ouvre TRACFIN, TRACFIN est dans le parcours) mais l'esprit reste : **aucun client existant pénalisé** (grâce au grandfather). Remplacer tout le contenu de `src/lib/regression-existing-users.test.ts` par :
```ts
import { describe, it, expect } from "vitest";
import { COURSE, FORMATION_MODULES, STANDALONE_MODULE_SLUGS } from "@/data/course";
import { getEntitlements, hasModuleAccess, PACK_EXCLUDED_MODULES, type EntitlementRow } from "@/lib/entitlements";
import {
  getTotalLessonCount,
  getCertifiedLessonCount,
  getCertificationTotalLessons,
  isPackGrandfathered,
} from "@/lib/formation-journey";

/**
 * TRACFIN est désormais inclus au pack ET compte dans la certification.
 * Garantie clé : aucun client EXISTANT (achat pack avant la bascule) n'est
 * pénalisé — son certificat reste débloquable sans TRACFIN (grandfather).
 */
describe("TRACFIN inclus au pack — non-régression clients existants", () => {
  const pack: EntitlementRow[] = [{ module_slug: null, status: "active" }];

  it("plus aucun module autonome / exclu du pack", () => {
    expect(STANDALONE_MODULE_SLUGS.size).toBe(0);
    expect(PACK_EXCLUDED_MODULES.size).toBe(0);
  });

  it("le détenteur du pack accède à TOUS les modules, TRACFIN compris", () => {
    const ent = getEntitlements(pack);
    for (const mod of COURSE) {
      expect(hasModuleAccess(ent, mod.slug)).toBe(true);
    }
  });

  it("TRACFIN fait partie du parcours (total = tout COURSE)", () => {
    const all = COURSE.reduce((a, m) => a + m.lessons.length, 0);
    expect(getTotalLessonCount()).toBe(all);
    expect(FORMATION_MODULES.some((m) => m.slug === "tracfin")).toBe(true);
  });

  it("certification = 36 leçons (TRACFIN compte, déontologie bonus)", () => {
    expect(getCertifiedLessonCount()).toBe(36);
  });

  it("GRANDFATHER : un client pack historique n'a PAS TRACFIN requis pour son certificat", () => {
    const legacyTotal = getCertificationTotalLessons(true);
    const fullTotal = getCertificationTotalLessons(false);
    expect(legacyTotal).toBeLessThan(fullTotal); // seuil plus bas pour l'historique
    expect(isPackGrandfathered("2026-01-01T00:00:00Z")).toBe(true);
  });

  it("un NOUVEAU client (achat après bascule) a TRACFIN requis", () => {
    expect(isPackGrandfathered("2027-01-01T00:00:00Z")).toBe(false);
  });
});
```

- [ ] **Step 2 : Lancer (doit passer)**

Run: `cd lms && npx vitest run src/lib/regression-existing-users.test.ts`
Expected: PASS.

- [ ] **Step 3 : Commit**

```bash
git add lms/src/lib/regression-existing-users.test.ts
git commit -m "test(tracfin): non-régression — clients existants grandfathered"
```

---

## Task 8 : Grandfather dans le générateur de certificat

**Files:**
- Modify: `src/components/certificate/CertificateGenerator.tsx`

- [ ] **Step 1 : Importer les helpers grandfather**

Dans `src/components/certificate/CertificateGenerator.tsx`, remplacer l'import de `FORMATION_MODULES` :
```ts
import { FORMATION_MODULES } from "@/data/course";
```
par :
```ts
import { getCertificationTotalLessons, isPackGrandfathered } from "@/lib/formation-journey";
```

- [ ] **Step 2 : Ajouter l'état grandfather et rendre le dénominateur dynamique**

Remplacer le calcul statique :
```ts
  // Parcours principal uniquement : les add-ons autonomes (ex. TRACFIN) ne
  // comptent pas dans le taux de complétion certifiant.
  const totalLessons = FORMATION_MODULES.reduce((a, m) => a + m.lessons.length, 0);
```
par (ajouter un `useState` près des autres, en haut du composant) :
```ts
  const [isGrandfathered, setIsGrandfathered] = useState(false);

  // Clients pack historiques (achat avant la bascule) : TRACFIN non requis.
  const totalLessons = getCertificationTotalLessons(isGrandfathered);
```
(Le `useState` doit être ajouté au même niveau que `const [completedLessons, setCompletedLessons] = useState(0);`.)

- [ ] **Step 3 : Lire la date d'achat du pack et calculer le grandfather**

Dans le `useEffect`, dans la branche `if (user) { ... }`, juste après le `setCompletedLessons(progressRows?.length ?? 0);`, ajouter :
```ts
        // Date d'achat du pack (module_slug NULL) pour le grandfathering.
        const { data: subRow } = await supabase
          .from("user_subscriptions")
          .select("created_at")
          .eq("formation_id", "immobilier")
          .is("module_slug", null)
          .eq("status", "active")
          .order("created_at", { ascending: true })
          .limit(1)
          .maybeSingle();
        setIsGrandfathered(isPackGrandfathered(subRow?.created_at ?? null));
```

- [ ] **Step 4 : Vérifier le typecheck**

Run: `cd lms && npx tsc --noEmit`
Expected: `EXIT 0`.

- [ ] **Step 5 : Vérifier que `completionPct` borne toujours à 100**

Confirmer que la ligne existante est bien :
```ts
  const completionPct = Math.min(100, Math.round((completedLessons / totalLessons) * 100));
```
(Aucune modification si déjà présente — un client grandfathered qui a aussi fait TRACFIN peut dépasser 100 % avant le `Math.min`.)

- [ ] **Step 6 : Commit**

```bash
git add lms/src/components/certificate/CertificateGenerator.tsx
git commit -m "feat(tracfin): grandfather du certificat (dénominateur selon date d'achat pack)"
```

---

## Task 9 : Nettoyer la page d'accueil (bloc add-on mort + libellé prix)

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1 : Simplifier le filtre de la grille des modules à l'unité**

Dans `src/app/page.tsx`, remplacer :
```tsx
              {getCatalog()
                .filter((p) => p.kind === "module" && !PACK_EXCLUDED_MODULES.has(p.id))
                .map((product, i) => {
```
par :
```tsx
              {getCatalog()
                .filter((p) => p.kind === "module")
                .map((product, i) => {
```

- [ ] **Step 2 : Supprimer le bloc « Modules autonomes (add-ons) »**

Supprimer entièrement le bloc JSX ajouté la session précédente, délimité par le commentaire `{/* Modules autonomes (add-ons) — vendus à part, hors pack ... */}` et sa condition `{getCatalog().filter((p) => p.kind === "module" && PACK_EXCLUDED_MODULES.has(p.id)).length > 0 && ( ... )}`, jusqu'à sa parenthèse/`)}` fermante, juste avant `{/* Prochaines formations du catalogue */}`. (Lire le fichier pour délimiter exactement le bloc `&& ( <> ... </> )}`.)

- [ ] **Step 3 : Ajuster le titre « modules à l'unité » (prix mixtes)**

Remplacer :
```tsx
              <h3 className="text-xl font-black text-brand-navy">
                Les modules à l&apos;unité — {euros(getModulePriceCents())} chacun
              </h3>
```
par :
```tsx
              <h3 className="text-xl font-black text-brand-navy">
                Les modules à l&apos;unité — à partir de {euros(4900)}
              </h3>
```

- [ ] **Step 4 : Retirer l'import devenu inutile si plus utilisé**

Si `PACK_EXCLUDED_MODULES` n'est plus référencé dans `src/app/page.tsx` après les steps 1-2, retirer la ligne :
```tsx
import { PACK_EXCLUDED_MODULES } from "@/lib/entitlements";
```
Run: `cd lms && grep -n "PACK_EXCLUDED_MODULES" src/app/page.tsx` pour vérifier avant de retirer.

- [ ] **Step 5 : Typecheck**

Run: `cd lms && npx tsc --noEmit`
Expected: `EXIT 0`.

- [ ] **Step 6 : Commit**

```bash
git add lms/src/app/page.tsx
git commit -m "fix(accueil): TRACFIN réintègre la grille modules, retrait du bloc add-on"
```

---

## Task 10 : Nettoyer le tableau de bord (section « Modules spécialisés » morte)

**Files:**
- Modify: `src/app/formation/page.tsx`

- [ ] **Step 1 : Supprimer le calcul `ownedAddons`**

Dans `src/app/formation/page.tsx`, supprimer le bloc :
```tsx
  // Add-ons autonomes que l'utilisateur possède réellement (achetés à l'unité).
  const ownedAddons = COURSE.filter(
    (m) => PACK_EXCLUDED_MODULES.has(m.slug) && access.modules.includes(m.slug)
  );
```

- [ ] **Step 2 : Supprimer la section JSX « MODULES SPÉCIALISÉS »**

Supprimer entièrement le bloc `{ownedAddons.length > 0 && ( <section id="modules-specialises" ...> ... </section> )}` (lire le fichier pour délimiter exactement, entre la fermeture de la section « VOTRE PARCOURS » `</section>` et le `</div>` final du composant).

- [ ] **Step 3 : Retirer l'import `PACK_EXCLUDED_MODULES` s'il n'est plus utilisé**

`canAccess` utilise encore `PACK_EXCLUDED_MODULES.has(slug)`. Comme l'ensemble est désormais vide, `canAccess` reste correct (le pack ouvre tout). **Ne pas** retirer l'import tant que `canAccess` le référence. Vérifier :
Run: `cd lms && grep -n "PACK_EXCLUDED_MODULES" src/app/formation/page.tsx`
Si la seule occurrence restante est dans `canAccess`, laisser l'import (le code reste juste et prêt pour de futurs add-ons).

- [ ] **Step 4 : Vérifier que `COURSE` est encore importé/utilisé**

`ownedAddons` était la dernière utilisation de `COURSE` ? Vérifier :
Run: `cd lms && grep -n "COURSE" src/app/formation/page.tsx`
Si `COURSE` n'est plus utilisé, retirer `COURSE` de l'import `@/data/course` (garder `FORMATION_MODULES, formatDuration`).

- [ ] **Step 5 : Typecheck**

Run: `cd lms && npx tsc --noEmit`
Expected: `EXIT 0`.

- [ ] **Step 6 : Commit**

```bash
git add lms/src/app/formation/page.tsx
git commit -m "fix(dashboard): TRACFIN dans le parcours, retrait de la section add-on"
```

---

## Task 11 : Vérifier la cohérence des heures (attestation PDF / email)

**Files:**
- Inspect: `src/lib/pdf/AttestationPDF.tsx`, `src/lib/pdf/ModuleAttestationPDF.tsx`, `src/lib/email/resend.ts`

- [ ] **Step 1 : Chercher les heures/leçons codées en dur**

Run: `cd lms && grep -rn "42h\|42 h\|37 leçons\|36 leçons\|getTotalCourseDurationMin\|getCertifiedLessonCount\|getTotalLessonCount" src/lib/pdf src/lib/email`
Analyser chaque occurrence :
- Si une valeur est **calculée** depuis `COURSE` / helpers ⇒ elle s'adapte automatiquement (rien à faire).
- Si une valeur « 42h » est **codée en dur** et représente la durée certifiante ⇒ décider avec le contexte : l'attestation officielle par module n'est PAS concernée (par module) ; le diplôme global doit refléter 45h.

- [ ] **Step 2 : Corriger uniquement si incohérence réelle**

Pour toute étiquette globale « 42h » devenue fausse (diplôme = 45h), remplacer la valeur littérale par la valeur dérivée existante ou par `45h`. Ne PAS toucher aux attestations par module (elles portent la durée du module).
(S'il n'y a aucune valeur globale codée en dur, ne rien changer et noter « aucune incohérence ».)

- [ ] **Step 3 : Typecheck si un fichier a changé**

Run: `cd lms && npx tsc --noEmit`
Expected: `EXIT 0`.

- [ ] **Step 4 : Commit (si changement)**

```bash
git add -A && git commit -m "fix(tracfin): cohérence des heures certifiantes (45h) sur attestation/email"
```
(Si aucun changement nécessaire, passer cette étape.)

---

## Task 12 : Validation complète + push

**Files:** aucun (vérification)

- [ ] **Step 1 : Suite de tests complète**

Run: `cd lms && npx vitest run`
Expected: PASS (100 %). Tous les fichiers verts.

- [ ] **Step 2 : Typecheck**

Run: `cd lms && npx tsc --noEmit`
Expected: `EXIT 0`.

- [ ] **Step 3 : Build de production**

Run: `cd lms && npm run build`
Expected: `Compiled successfully`, build sans erreur.

- [ ] **Step 4 : Audit rapide de complétude (données)**

Vérifier via un test jetable ou un `grep` que : catalogue = pack (299 €) + 7 modules (TRACFIN à 49 €), `getCertifiedLessonCount() === 36`, `getTotalLessonCount() === 40`.

- [ ] **Step 5 : Push de la branche**

```bash
git push -u origin feat/tracfin-dans-pack
```

- [ ] **Step 6 : Décision de merge**

Proposer au propriétaire : merge dans `main` (fast-forward) + redéploiement Vercel, OU relecture d'abord. **Ne pas** créer de PR sauf demande. **Ne pas** merger sans accord explicite.

---

## Notes de vérification finale (self-review vs spec)

- ✅ Pack inclut TRACFIN (Task 1 — `PACK_EXCLUDED_MODULES` vidé en cascade).
- ✅ TRACFIN gardé en autonome 49 € (fixture/prix inchangés — Tasks 5/6).
- ✅ TRACFIN compte dans la certification 45h (Task 1 + 3).
- ✅ Grandfather par date d'achat (Tasks 2 + 8).
- ✅ Clients actuels non pénalisés (Task 7 — tests).
- ✅ UI cohérente : accueil + dashboard (Tasks 9 + 10).
- ✅ Cohérence heures attestation/email (Task 11).
- ✅ Validation vitest + tsc + build (Task 12).
