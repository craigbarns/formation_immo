# Module autonome « Murs & Fonds de Commerce » — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter la formation « Murs & fonds de commerce » (7h, 4 leçons, 59 €) au catalogue comme module **autonome** : vendable à l'unité, PAS inclus dans le pack 299 €, hors certification 42h, avec sa propre attestation.

**Architecture:** Le module rejoint `COURSE` (toute l'UX apprenant existante fonctionne : leçons, examen, minuteur, attestation). Un nouveau concept pur `STANDALONE_MODULE_SLUGS` dans `entitlements.ts` l'exclut du pack partout où « pack ⇒ tout » était supposé : accès (`canAccessModule`, `verifyModuleAccess`, dashboard), achat (`filterPurchasable`, `grantsFromProducts`) et affichage (description pack, landing, e-mails).

**Tech Stack:** Next.js 16 App Router (NON standard — lire `lms/node_modules/next/dist/docs/` avant tout code de route), Supabase (non typé), Stripe v22, Vitest (`npx vitest run` dans `lms/`).

**Spec:** `docs/superpowers/specs/2026-07-09-module-murs-fonds-commerce-design.md`

## Global Constraints

- Slug du module : `murs-fonds-commerce`. Prix : `getModulePriceCents()` (5 900 cents) — rien à coder côté prix.
- AUCUNE migration SQL. AUCUN changement de sémantique DB (`module_slug` null = pack, non-null = module).
- Les clients pack existants ne doivent JAMAIS gagner l'accès à `murs-fonds-commerce` (test obligatoire), et doivent POUVOIR l'acheter à 59 € (test obligatoire).
- La certification 42h reste à 33 leçons certifiantes (test existant `=33` doit rester vert).
- Ne PAS toucher à la sémantique du cumul de temps 42h (`issueCertificate` somme tous les timers — comportement existant, hors périmètre).
- Toute copie UI en français. Contenu apprenant : restaurer les accents (le zip est en ASCII sans accents).
- Commandes depuis `lms/` : tests `npx vitest run`, lint `npm run lint`, build `npm run build`.
- Commits fréquents sur la branche `claude/happy-rubin-0c67f3`. Fin de plan : fetch + rebase puis fast-forward `main` (jamais de force-push sur main).
- **Note transcription de contenu** : pour les fichiers de CONTENU (scripts .md, questions d'examen, textes vitrine), la source de vérité est le dossier du zip déjà dézippé — après la Task 1 elle est DANS le repo (`module7-murs-fonds/`). Les tasks de contenu donnent le format exact + un exemple complet ; le reste se transcrit depuis la source in-repo (pas un placeholder : transformation de données définie).

Source dézippée : `/private/tmp/claude-501/-Users-gregorybaranes-Desktop-formation-immo-local--claude-worktrees-happy-rubin-0c67f3/1697cec3-022e-4b7a-81c7-5d95bb1e04ee/scratchpad/murs-fonds/formation-murs-fonds-commerce/`
(si absent : re-dézipper `/Users/gregorybaranes/Downloads/Kimi_Agent_7h Murs & Fonds Training.zip`)

---

### Task 1 : Contenu — dossier racine `module7-murs-fonds/`

**Files:**
- Create: `module7-murs-fonds/scripts/01-bail-commercial-fondamentaux.md`
- Create: `module7-murs-fonds/scripts/02-cession-fonds-commerce.md`
- Create: `module7-murs-fonds/scripts/03-renouvellement-conge-droits.md`
- Create: `module7-murs-fonds/scripts/04-murs-boutique-investissement.md`
- Create: `module7-murs-fonds/qcm/qcm-murs-fonds.md` (copie brute)
- Create: `module7-murs-fonds/templates/` (4 fichiers docx/xlsx, copie brute)
- Create: `module7-murs-fonds/plan-pedagogique/plan-pedagogique-complet.md` (copie brute)
- Create: `module7-murs-fonds/guide-eleve/guide-eleve-murs-fonds.md` (copie brute)
- NE PAS copier `visuels/` (47 Mo de teasers 5 s — inutiles).

**Interfaces:**
- Produces: les chemins `module7-murs-fonds/scripts/*.md` consommés par `scriptFile` dans `course.ts` (Task 2). Le parser (`lms/src/lib/lesson-script-parser.ts`) résout ces chemins depuis la racine du repo (candidat `cwd/..`).

- [ ] **Step 1 : Copier les fichiers bruts** (qcm, templates, plan-pedagogique, guide-eleve) avec `mkdir -p` + `cp`.

- [ ] **Step 2 : Réécrire les 4 scripts leçon avec cette transformation** (fichier par fichier, à la main — pas de sed aveugle) :
  1. Restaurer TOUS les accents français (é, è, à, ç, ê, ô, û, œ…) — le texte source est en ASCII.
  2. Remplacer chaque marqueur `**VOIX OFF:**` par `**NARRATION :**` (format attendu par `extractNarrationBlocks` du parser — regex `\*\*NARRATION\s*:\*\*`).
  3. Conserver la structure headings / [B-ROLL…] / [PAUSE Xs] (le parser les nettoie).
  4. Conserver l'intégralité du texte pédagogique (ne pas résumer).

- [ ] **Step 3 : Vérifier la restauration d'accents**

Run: `grep -c "é" module7-murs-fonds/scripts/01-bail-commercial-fondamentaux.md`
Expected: > 50 par fichier. Et `grep -in "negoci\|proprietaire\|duree\|bailleur qui a annonce" module7-murs-fonds/scripts/*.md` ne doit retourner AUCUN mot sans accent évident (contrôle visuel).

- [ ] **Step 4 : Vérifier que le parser trouve les blocs narration**

Run (depuis `lms/`): `node -e "const s=require('fs').readFileSync('../module7-murs-fonds/scripts/01-bail-commercial-fondamentaux.md','utf8'); const m=s.match(/\*\*NARRATION\s*:\*\*/g); console.log('blocs narration:', m?m.length:0)"`
Expected: ≥ 5 blocs.

- [ ] **Step 5 : Commit**

```bash
git add module7-murs-fonds
git commit -m "feat(murs-fonds): contenu de la formation 7h (scripts accentués, QCM, templates)"
```

---

### Task 2 : `course.ts` module 7 + exclusion certification (`BONUS_MODULE_SLUGS`)

**Files:**
- Modify: `lms/src/lib/formation-journey.ts` (BONUS_MODULE_SLUGS)
- Modify: `lms/src/lib/formation-journey.test.ts`
- Modify: `lms/src/data/course.ts` (fin du tableau COURSE, après le module `deontologie`)

**Interfaces:**
- Produces: `COURSE` contient un 7e module slug `murs-fonds-commerce` (4 leçons × 105 min = 420 min). `BONUS_MODULE_SLUGS === ["deontologie", "murs-fonds-commerce"]`. `getCertifiedLessonCount()` reste 33.

- [ ] **Step 1 : Adapter le test (échec attendu d'abord)** — remplacer le test « la certification exclut les leçons des modules bonus » et ajouter les attentes murs-fonds dans `formation-journey.test.ts` :

```ts
import { describe, it, expect } from "vitest";
import { COURSE } from "@/data/course";
import {
  BONUS_MODULE_SLUGS,
  getCertifiedLessonCount,
  getTotalLessonCount,
} from "./formation-journey";

describe("comptage des leçons de certification (bonus hors cert : déontologie + murs-fonds)", () => {
  it("déontologie et murs-fonds-commerce sont marqués comme bonus", () => {
    expect(BONUS_MODULE_SLUGS).toContain("deontologie");
    expect(BONUS_MODULE_SLUGS).toContain("murs-fonds-commerce");
  });

  it("la certification exclut les leçons de TOUS les modules bonus", () => {
    const bonusLessons = COURSE.filter((m) => BONUS_MODULE_SLUGS.includes(m.slug))
      .reduce((acc, m) => acc + m.lessons.length, 0);
    expect(bonusLessons).toBeGreaterThan(0);
    expect(getCertifiedLessonCount()).toBe(getTotalLessonCount() - bonusLessons);
  });

  it("= 33 leçons (contenu réel des 5 modules d'origine)", () => {
    expect(getCertifiedLessonCount()).toBe(33);
  });

  it("le module murs-fonds-commerce existe : 4 leçons, 420 min", () => {
    const mod = COURSE.find((m) => m.slug === "murs-fonds-commerce");
    expect(mod).toBeDefined();
    expect(mod!.lessons).toHaveLength(4);
    expect(mod!.lessons.reduce((a, l) => a + l.duration, 0)).toBe(420);
  });
});
```

- [ ] **Step 2 : Vérifier l'échec** — Run (lms/): `npx vitest run src/lib/formation-journey.test.ts` → FAIL (module absent, bonus absent).

- [ ] **Step 3 : `formation-journey.ts`** — remplacer la constante :

```ts
/**
 * Modules "bonus" hors de la certification finale 42h.
 * - deontologie : incluse au pack, mais attestation à part.
 * - murs-fonds-commerce : formation AUTONOME (hors pack — voir STANDALONE_MODULE_SLUGS),
 *   avec sa propre attestation 7h.
 * Ils ne comptent PAS dans le diplôme 42h des 5 modules d'origine.
 */
export const BONUS_MODULE_SLUGS = ["deontologie", "murs-fonds-commerce"];
```

- [ ] **Step 4 : `course.ts`** — ajouter à la FIN de `COURSE` (après `deontologie`, avant `];`) :

```ts
  // ═══════════════════════════════════════════════════════════════════════════
  // FORMATION AUTONOME — MURS & FONDS DE COMMERCE  (420 min = 7h)
  // Vendue uniquement à l'unité (59 €), PAS incluse au pack — voir
  // STANDALONE_MODULE_SLUGS (entitlements.ts). Hors certification 42h.
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: "murs-fonds-commerce",
    title: "Murs & fonds de commerce",
    summary:
      "Baux commerciaux, cession de fonds, renouvellement, indemnité d'éviction, murs de boutique et fiscalité.",
    description:
      "Maîtrisez l'immobilier commercial de bout en bout : statut des baux commerciaux (art. L.145-1 et s. du Code de commerce), rédaction et négociation du bail, cession de fonds de commerce (art. L.141-1, opposition des créanciers), renouvellement, congé et indemnité d'éviction, et investissement en murs de boutique avec sa fiscalité. Une formation autonome de 7h pour conseiller commerçants, bailleurs et investisseurs en toute sécurité juridique.",
    lessons: [
      {
        slug: "bail-commercial",
        title: "Le bail commercial — fondamentaux",
        scriptFile: "module7-murs-fonds/scripts/01-bail-commercial-fondamentaux.md",
        videoUrl: null,
        audioUrl: null,
        duration: 105,
        difficulty: "intermediaire",
        objectives: [
          "Qualifier un bail commercial : les conditions cumulatives de l'art. L.145-1",
          "Maîtriser le mécanisme 3/6/9 : durée, congés triennaux, renouvellement tacite",
          "Distinguer bail commercial, bail professionnel et bail précaire (L.145-5)",
          "Identifier les clauses essentielles et les clauses à risque d'un bail",
          "Comprendre fixation, révision et réévaluation du loyer commercial",
        ],
      },
      {
        slug: "cession-fonds",
        title: "La cession de fonds de commerce",
        scriptFile: "module7-murs-fonds/scripts/02-cession-fonds-commerce.md",
        videoUrl: null,
        audioUrl: null,
        duration: 105,
        difficulty: "intermediaire",
        objectives: [
          "Définir le fonds de commerce : éléments corporels et incorporels (L.141-1)",
          "Dérouler la procédure de cession : information du bailleur, agrément, publicité",
          "Sécuriser le délai d'opposition des créanciers et le séquestre du prix",
          "Évaluer un fonds : multiples de CA, clientèle, droit au bail",
          "Accompagner cédant et repreneur jusqu'à l'acte de cession",
        ],
      },
      {
        slug: "renouvellement-conge",
        title: "Renouvellement, congé & indemnité d'éviction",
        scriptFile: "module7-murs-fonds/scripts/03-renouvellement-conge-droits.md",
        videoUrl: null,
        audioUrl: null,
        duration: 105,
        difficulty: "avance",
        objectives: [
          "Faire valoir le droit au renouvellement du preneur (L.145-8 et s.)",
          "Rédiger et qualifier un congé : avec offre, sans offre, délais de 6 mois",
          "Calculer une indemnité d'éviction : valeur du fonds, transfert, réinstallation",
          "Connaître les recours du preneur et les délais pour agir",
          "Identifier les causes légitimes et sérieuses de refus de renouvellement",
        ],
      },
      {
        slug: "murs-boutique",
        title: "Murs de boutique — investissement & fiscalité",
        scriptFile: "module7-murs-fonds/scripts/04-murs-boutique-investissement.md",
        videoUrl: null,
        audioUrl: null,
        duration: 105,
        difficulty: "avance",
        objectives: [
          "Évaluer un investissement en murs de boutique : rendement, emplacement, bail attaché",
          "Maîtriser la fiscalité : plus-values, droits d'enregistrement, TVA, IS vs IR",
          "Choisir le bon montage : détention directe, SCI, holding",
          "Vérifier conformité ERP et accessibilité avant l'achat",
        ],
      },
    ],
  },
```

- [ ] **Step 5 : Vérifier** — Run (lms/): `npx vitest run src/lib/formation-journey.test.ts` → PASS (4 tests).

- [ ] **Step 6 : Suite complète (détecter les tests cassés par le 7e module)** — Run: `npx vitest run` → si un test suppose 6 modules / 37 leçons ailleurs, le corriger dans la même logique pack/bonus. Expected: tout vert.

- [ ] **Step 7 : Commit**

```bash
git add lms/src/data/course.ts lms/src/lib/formation-journey.ts lms/src/lib/formation-journey.test.ts
git commit -m "feat(murs-fonds): module 7 autonome dans COURSE (4 lecons, 7h) — hors certification 42h"
```

---

### Task 3 : Accès — `STANDALONE_MODULE_SLUGS` (le pack n'inclut PAS le module)

**Files:**
- Modify: `lms/src/lib/entitlements.ts`
- Modify: `lms/src/lib/entitlements.test.ts`
- Modify: `lms/src/lib/access.ts:78-81` (verifyModuleAccess délègue à canAccessModule)
- Modify: `lms/src/app/formation/page.tsx:53` (canAccess du dashboard)

**Interfaces:**
- Produces: `STANDALONE_MODULE_SLUGS: string[]`, `packIncludesModule(moduleSlug: string): boolean` exportés de `@/lib/entitlements`. `canAccessModule(rows, slug, isAdmin)` signature inchangée, nouvelle règle pack. Consommés par Tasks 4, 5, 8.

- [ ] **Step 1 : Tests (échec attendu)** — ajouter dans `entitlements.test.ts` :

```ts
import { STANDALONE_MODULE_SLUGS, packIncludesModule } from "./entitlements";

describe("modules autonomes (hors pack)", () => {
  const packRow = [{ module_slug: null, status: "active" }];

  it("murs-fonds-commerce est autonome", () => {
    expect(STANDALONE_MODULE_SLUGS).toContain("murs-fonds-commerce");
    expect(packIncludesModule("murs-fonds-commerce")).toBe(false);
    expect(packIncludesModule("juridique")).toBe(true);
    expect(packIncludesModule("deontologie")).toBe(true);
  });

  it("le pack ne donne PAS accès à un module autonome", () => {
    expect(canAccessModule(packRow, "murs-fonds-commerce", false)).toBe(false);
  });

  it("le pack donne toujours accès à la déontologie (bonus mais incluse)", () => {
    expect(canAccessModule(packRow, "deontologie", false)).toBe(true);
  });

  it("l'achat à l'unité donne accès au module autonome", () => {
    const rows = [{ module_slug: "murs-fonds-commerce", status: "active" }];
    expect(canAccessModule(rows, "murs-fonds-commerce", false)).toBe(true);
  });

  it("admin => accès au module autonome", () => {
    expect(canAccessModule([], "murs-fonds-commerce", true)).toBe(true);
  });
});
```

- [ ] **Step 2 : Vérifier l'échec** — Run: `npx vitest run src/lib/entitlements.test.ts` → FAIL (exports absents).

- [ ] **Step 3 : `entitlements.ts`** — ajouter avant `getEntitlements` et modifier `canAccessModule` :

```ts
/**
 * Modules AUTONOMES : vendus uniquement à l'unité, JAMAIS couverts par le
 * pack (module_slug null). Liste pure (aucun import) pour rester testable.
 */
export const STANDALONE_MODULE_SLUGS = ["murs-fonds-commerce"];

/** true si le pack couvre ce module (tout sauf les modules autonomes). */
export function packIncludesModule(moduleSlug: string): boolean {
  return !STANDALONE_MODULE_SLUGS.includes(moduleSlug);
}
```

```ts
/** Décide si un utilisateur peut accéder à un module donné. */
export function canAccessModule(
  rows: EntitlementRow[],
  moduleSlug: string,
  isAdmin: boolean
): boolean {
  if (isAdmin) return true;
  const { hasPack, modules } = getEntitlements(rows);
  return modules.has(moduleSlug) || (hasPack && packIncludesModule(moduleSlug));
}
```

Mettre à jour le commentaire d'en-tête du fichier : `module_slug === null ⇒ accès "pack" (tous les modules SAUF autonomes)`.

- [ ] **Step 4 : `access.ts`** — dans `verifyModuleAccess`, remplacer les lignes 78-79 :

```ts
  const hasAccess = canAccessModule(rows, moduleSlug, false);
```

et l'import : `import { getEntitlements, canAccessModule } from "@/lib/entitlements";` (getEntitlements reste utilisé par getAccessSummary).

- [ ] **Step 5 : `formation/page.tsx` ligne 53** — remplacer :

```ts
  const canAccess = (slug: string) =>
    access.isAdmin ||
    access.modules.includes(slug) ||
    (access.hasPack && packIncludesModule(slug));
```

avec l'import `import { packIncludesModule } from "@/lib/entitlements";`. (Le cas admin passait par `hasPack: true` — sans `access.isAdmin`, l'admin verrait le module autonome verrouillé.)

- [ ] **Step 6 : Vérifier** — Run: `npx vitest run src/lib/entitlements.test.ts` puis `npx vitest run` → PASS.

- [ ] **Step 7 : Commit**

```bash
git add lms/src/lib/entitlements.ts lms/src/lib/entitlements.test.ts lms/src/lib/access.ts lms/src/app/formation/page.tsx
git commit -m "feat(murs-fonds): STANDALONE_MODULE_SLUGS — le pack n'ouvre pas les modules autonomes"
```

---

### Task 4 : Achat — un client pack peut ACHETER le module autonome

**Files:**
- Modify: `lms/src/lib/purchase.ts` (filterPurchasable, grantsFromProducts)
- Modify: `lms/src/lib/purchase.test.ts`

**Interfaces:**
- Consumes: `packIncludesModule` (Task 3).
- Produces: comportements — pack possédé + achat module autonome ⇒ autorisé ; panier [pack + module autonome] ⇒ les deux passent et `grantsFromProducts` renvoie `[null, "murs-fonds-commerce"]`.

- [ ] **Step 1 : Tests (échec attendu)** — ajouter dans `purchase.test.ts` (adapter les imports existants) :

```ts
describe("modules autonomes à l'achat", () => {
  it("un client pack PEUT acheter un module autonome", () => {
    const owned = { hasPack: true, modules: new Set<string>() };
    const { allowed, removed } = filterPurchasable(["murs-fonds-commerce"], owned);
    expect(allowed.map((p) => p.id)).toEqual(["murs-fonds-commerce"]);
    expect(removed).toEqual([]);
  });

  it("un client pack ne peut toujours pas racheter le pack ni un module inclus", () => {
    const owned = { hasPack: true, modules: new Set<string>() };
    const { allowed, removed } = filterPurchasable(["pack", "juridique"], owned);
    expect(allowed).toEqual([]);
    expect(removed.map((r) => r.reason)).toEqual(["already_owned", "already_owned"]);
  });

  it("panier [pack + module autonome] : les deux sont achetables ensemble", () => {
    const owned = { hasPack: false, modules: new Set<string>() };
    const { allowed, removed } = filterPurchasable(["pack", "murs-fonds-commerce"], owned);
    expect(allowed.map((p) => p.id)).toEqual(["pack", "murs-fonds-commerce"]);
    expect(removed).toEqual([]);
  });

  it("panier [pack + module inclus] : le module inclus reste retiré", () => {
    const owned = { hasPack: false, modules: new Set<string>() };
    const { removed } = filterPurchasable(["pack", "juridique"], owned);
    expect(removed).toEqual([{ id: "juridique", reason: "included_in_pack" }]);
  });

  it("grantsFromProducts(pack + module autonome) = [null, module]", () => {
    expect(grantsFromProducts(["pack", "murs-fonds-commerce"])).toEqual([
      null,
      "murs-fonds-commerce",
    ]);
    expect(grantsFromProducts(["pack", "juridique"])).toEqual([null]);
  });
});
```

- [ ] **Step 2 : Vérifier l'échec** — Run: `npx vitest run src/lib/purchase.test.ts` → FAIL sur les nouveaux tests.

- [ ] **Step 3 : `purchase.ts`** — import `packIncludesModule` depuis `@/lib/entitlements`, puis dans `filterPurchasable`, remplacer la boucle d'éligibilité :

```ts
  const packInCart = candidates.some((p) => p.kind === "pack");
  const allowed: Product[] = [];
  for (const product of candidates) {
    const coveredByPack = product.kind === "pack" || packIncludesModule(product.id);
    if (owned.hasPack && coveredByPack) {
      removed.push({ id: product.id, reason: "already_owned" });
      continue;
    }
    if (product.kind === "module" && owned.modules.has(product.id)) {
      removed.push({ id: product.id, reason: "already_owned" });
      continue;
    }
    if (product.kind === "module" && packInCart && packIncludesModule(product.id)) {
      removed.push({ id: product.id, reason: "included_in_pack" });
      continue;
    }
    allowed.push(product);
  }
```

et `grantsFromProducts` :

```ts
export function grantsFromProducts(
  productIds: string[],
  catalog: Product[] = getCatalog()
): (string | null)[] {
  const known = productIds
    .map((id) => catalog.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));
  const moduleIds = [...new Set(known.filter((p) => p.kind === "module").map((p) => p.id))];
  if (known.some((p) => p.kind === "pack")) {
    // Le pack couvre tout SAUF les modules autonomes achetés en plus.
    return [null, ...moduleIds.filter((id) => !packIncludesModule(id))];
  }
  return moduleIds;
}
```

- [ ] **Step 4 : Vérifier** — Run: `npx vitest run src/lib/purchase.test.ts` puis `npx vitest run` → PASS (anciens tests inclus).

- [ ] **Step 5 : Commit**

```bash
git add lms/src/lib/purchase.ts lms/src/lib/purchase.test.ts
git commit -m "feat(murs-fonds): achat du module autonome possible avec ou en plus du pack"
```

---

### Task 5 : Catalogue — description du pack pack-scoped

**Files:**
- Modify: `lms/src/data/catalog.ts`
- Modify: `lms/src/data/catalog.test.ts`

**Interfaces:**
- Consumes: `STANDALONE_MODULE_SLUGS` (Task 3).
- Produces: `getPackModules(): CourseModule[]` et `getPackDurationMin(): number` exportés de `@/data/catalog` (consommés par Task 8 : landing + e-mails). La description du pack affiche « 6 modules (46h) » et n'évolue pas quand on ajoute un module autonome.

- [ ] **Step 1 : Tests (échec attendu)** — dans `catalog.test.ts`, remplacer le test « la description du pack est calculee depuis COURSE (nb de modules) » par :

```ts
  it("la description du pack ne compte que les modules inclus (hors autonomes)", () => {
    const pack = getCatalog()[0];
    expect(pack.description).toContain(`${getPackModules().length} modules`);
    expect(getPackModules().some((m) => m.slug === "murs-fonds-commerce")).toBe(false);
    expect(pack.description).not.toContain("7 modules");
  });

  it("le module autonome murs-fonds-commerce est au catalogue à 59 €", () => {
    const p = getProduct("murs-fonds-commerce");
    expect(p?.kind).toBe("module");
    expect(p?.priceCents).toBe(5900);
    expect(p?.available).toBe(true);
    expect(p?.grants).toEqual(["murs-fonds-commerce"]);
  });
```

avec `getPackModules` ajouté aux imports du test.

- [ ] **Step 2 : Vérifier l'échec** — Run: `npx vitest run src/data/catalog.test.ts` → FAIL (export absent).

- [ ] **Step 3 : `catalog.ts`** — ajouter les helpers et l'utiliser dans le pack :

```ts
import { COURSE, formatDuration, type CourseModule } from "@/data/course";
import { STANDALONE_MODULE_SLUGS } from "@/lib/entitlements";

/** Modules couverts par le pack 299 € (exclut les formations autonomes). */
export function getPackModules(): CourseModule[] {
  return COURSE.filter((m) => !STANDALONE_MODULE_SLUGS.includes(m.slug));
}

export function getPackDurationMin(): number {
  return getPackModules().reduce(
    (total, mod) => total + mod.lessons.reduce((acc, l) => acc + l.duration, 0),
    0
  );
}
```

et dans `getCatalog()` :

```ts
  const packModules = getPackModules();
  const pack: Product = {
    id: PACK_PRODUCT_ID,
    kind: "pack",
    label: "Formation Agent Immobilier — Loi ALUR 2026",
    description: `Accès complet aux ${packModules.length} modules (${formatDuration(getPackDurationMin())}), attestation et certification MasterClass.`,
    priceCents: getPackPriceCents(),
    grants: "all",
    available: true,
  };
```

(supprimer l'import devenu inutile `getTotalCourseDurationMin` ; `CourseModule` est exporté par `course.ts`).

- [ ] **Step 4 : Vérifier** — Run: `npx vitest run src/data/catalog.test.ts` puis `npx vitest run` → PASS.

- [ ] **Step 5 : Commit**

```bash
git add lms/src/data/catalog.ts lms/src/data/catalog.test.ts
git commit -m "feat(murs-fonds): pack 299 EUR pack-scoped (6 modules, 46h) + produit 59 EUR auto"
```

---

### Task 6 : Examen — 15 questions QCM

**Files:**
- Modify: `lms/src/data/exam-questions.ts` (nouvelle entrée dans `MODULE_EXAMS`, après `deontologie`)

**Interfaces:**
- Consumes: source `module7-murs-fonds/qcm/qcm-murs-fonds.md` (Task 1).
- Produces: `getModuleExam("murs-fonds-commerce")` renvoie 15 questions ids `mf1`…`mf15`.

- [ ] **Step 1 : Transcrire l'examen.** Format de l'entrée (à insérer avant `];` de MODULE_EXAMS) — exemple complet avec la Q1 ; transcrire mf2…mf15 depuis la source à l'identique (ordre des options conservé, `correctIndex` = index 0-based de la lettre de « Bonne reponse », `explanation` = 1-3 phrases condensées de l'« Explication detaillee » + la référence juridique, accents restaurés) :

```ts
  {
    moduleSlug: "murs-fonds-commerce",
    title: "Examen — Murs & fonds de commerce",
    duration: 20,
    questions: [
      {
        id: "mf1",
        question:
          "Selon l'article L.145-1 du Code de commerce, quel est le critère déterminant pour qualifier un contrat de « bail commercial » au sens strict ?",
        options: [
          "L'immatriculation du locataire au Registre du Commerce et des Sociétés (RCS)",
          "L'exploitation par le locataire d'un fonds de commerce ou d'un établissement artisanal dans le local loué",
          "La conclusion d'un contrat écrit obligatoirement devant notaire",
          "La présence d'une enseigne visible depuis la voie publique",
        ],
        correctIndex: 1,
        explanation:
          "La qualification repose sur l'exploitation effective d'un fonds de commerce ou artisanal dans le local : c'est l'articulation entre l'activité et le local qui fonde le statut protecteur. L'écrit notarié et l'enseigne ne sont pas des critères (art. L.145-1 C. com.).",
      },
      // … mf2 à mf15 : transcrire depuis module7-murs-fonds/qcm/qcm-murs-fonds.md
    ],
  },
```

- [ ] **Step 2 : Vérifier le typage et le compte**

Run: `npx vitest run` (aucun test ne casse) puis
`node -e "const{execSync}=require('child_process')" ` — plus simple : `npx tsc --noEmit 2>&1 | head -5` (0 erreur) et `grep -c '"mf' src/data/exam-questions.ts` → 15.

- [ ] **Step 3 : Contrôle qualité contenu** — relire les 15 `correctIndex` contre les « Bonne reponse » de la source (A=0, B=1, C=2, D=3). Zéro tolérance : une mauvaise réponse marquée juste casse l'examen payant.

- [ ] **Step 4 : Commit**

```bash
git add lms/src/data/exam-questions.ts
git commit -m "feat(murs-fonds): examen QCM 15 questions"
```

---

### Task 7 : Présentation — avatar, vitrine module, widget temps

**Files:**
- Modify: `lms/src/data/formateur-voices.json` (nouvelle clé)
- Modify: `lms/src/data/module-avatars.ts` (nouvelle entrée)
- Modify: `lms/src/data/module-showcase.ts` (nouvelle entrée)
- Modify: `lms/src/components/gamification/ModuleTimeTracker.tsx:126,158-165`

**Interfaces:**
- Consumes: rien de nouveau. NB : `ModuleAvatar.moduleSlug` est typé `keyof typeof formateurVoices` → la clé JSON DOIT être ajoutée d'abord.

- [ ] **Step 1 : `formateur-voices.json`** — ajouter la clé (même voix Marie Neutral que juridique/déontologie, persona distincte) :

```json
  "murs-fonds-commerce": {
    "name": "Maître Camille Perrin",
    "mistralVoiceId": "5a271406-039d-46fe-835b-fbbb00eaf08d",
    "mistralVoiceLabel": "Marie — Neutral (fr_fr) — voix française native, ton posé et autoritaire"
  }
```

- [ ] **Step 2 : `module-avatars.ts`** — ajouter à la fin de `MODULE_AVATARS` :

```ts
  {
    moduleSlug: "murs-fonds-commerce",
    name: v["murs-fonds-commerce"].name,
    role: "Avocate en droit immobilier commercial",
    description:
      "Avocate d'affaires spécialisée dans les baux commerciaux et les cessions de fonds de commerce. Quinze ans de pratique aux côtés de commerçants, bailleurs et investisseurs en murs de boutique.",
    mistralVoiceId: v["murs-fonds-commerce"].mistralVoiceId,
    mistralVoiceLabel: v["murs-fonds-commerce"].mistralVoiceLabel,
    portraitPrompt:
      "Professional headshot, French woman 40 years old, sharp navy business suit, confident expression, background of a Parisian commercial street with elegant storefronts, soft golden light, photorealistic --ar 1:1 --style raw --s 250 --q 2",
    accentColor: "#b45309",
    initials: "CP",
  },
```

- [ ] **Step 3 : `module-showcase.ts`** — ajouter la clé avant `};` :

```ts
  "murs-fonds-commerce": {
    badge: "🏪",
    headline: "L'immobilier commercial, un marché à part — devenez-y incontournable",
    subhead:
      "Baux 3/6/9, cession de fonds, indemnité d'éviction, murs de boutique : 7h pour conseiller commerçants, bailleurs et investisseurs avec l'assurance d'un spécialiste.",
    outcomes: [
      "Bail commercial : statut, clauses et loyer maîtrisés de bout en bout",
      "Cession de fonds : procédure sécurisée, du compromis à la publicité",
      "Indemnité d'éviction : savoir la calculer et la négocier",
      "Murs de boutique : rendement, fiscalité et montage adaptés",
    ],
    durationLabel: "~7 h",
    proofLine: [
      "Modèles d'actes : bail, information du bailleur, cession",
      "Cas chiffrés : loyers, éviction, plus-values",
      "QCM final de 15 questions niveau pro",
    ],
    heroGradient: "from-[#1c1917] via-[#7c2d12] to-[#b45309]",
    lessonTeaser: {
      "bail-commercial": "L.145-1, 3/6/9, clauses, loyer : les fondamentaux qui protègent.",
      "cession-fonds": "Céder ou reprendre un fonds sans faux pas : procédure et délais.",
      "renouvellement-conge": "Congé, renouvellement, éviction : défendre les droits du preneur.",
      "murs-boutique": "Investir dans les murs : rendement, fiscalité, ERP.",
    },
  },
```

- [ ] **Step 4 : `ModuleTimeTracker.tsx`** — ligne 126, la grille passe de `grid-cols-3 … sm:grid-cols-6` à :

```tsx
      <div className="mt-10 grid grid-cols-4 gap-3 border-t border-white/5 pt-8 sm:grid-cols-7">
```

et dans `labels` (ligne ~158) ajouter :

```ts
    "murs-fonds-commerce": "MURS",
```

- [ ] **Step 5 : Vérifier** — Run (lms/): `npm run lint` → 0 erreur ; `npx vitest run` → PASS.

- [ ] **Step 6 : Commit**

```bash
git add lms/src/data/formateur-voices.json lms/src/data/module-avatars.ts lms/src/data/module-showcase.ts lms/src/components/gamification/ModuleTimeTracker.tsx
git commit -m "feat(murs-fonds): avatar formateur, vitrine module, widget temps 7 colonnes"
```

---

### Task 8 : Chiffres pack-scoped — landing + e-mails

**Files:**
- Modify: `lms/src/app/page.tsx:38-40` (chiffres hero/pack)
- Modify: `lms/src/lib/email/resend.ts` (intégrer et corriger le diff local NON COMMITÉ existant)

**Interfaces:**
- Consumes: `getPackModules()`, `getPackDurationMin()` (Task 5).

- [ ] **Step 1 : `page.tsx`** — les chiffres décrivent le PACK vendu 299 € ; remplacer les lignes 38-40 :

```ts
// Chiffres du pack 299 € (source unique : catalog). Les formations autonomes
// (ex. murs & fonds de commerce) ont leur propre carte et n'entrent pas ici.
const PACK_MODULES = getPackModules();
const TOTAL_MODULES = PACK_MODULES.length;
const TOTAL_LESSONS = PACK_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
const TOTAL_DURATION = formatDuration(getPackDurationMin());
```

Imports : ajouter `getPackModules, getPackDurationMin` à l'import `@/data/catalog` ; retirer `getTotalCourseDurationMin` (et `COURSE` s'il ne reste plus utilisé — vérifier avec la ligne 647 qui utilise `getCatalog()`).
NB ligne 621 (`euros(getModulePriceCents() * TOTAL_MODULES)` « à la carte ») redevient correcte d'elle-même : 6 × 59 €.

- [ ] **Step 2 : `resend.ts`** — le fichier a un diff local non commité (comptes dérivés). Le conserver mais le rendre pack-scoped (l'e-mail de bienvenue est envoyé aux acheteurs du PACK uniquement — webhook « welcome email pack-only ») :

```ts
import { Resend } from "resend";
import { getPackModules } from "@/data/catalog";
import { BONUS_MODULE_SLUGS } from "@/lib/formation-journey";
```

```ts
// Chiffres dérivés du contenu réel du PACK (plus de « 5 modules / 36 leçons » en dur).
const PACK_MODULES = getPackModules();
const MODULE_COUNT = PACK_MODULES.length;
const CERTIFIED_MODULE_COUNT = PACK_MODULES.filter(
  (m) => !BONUS_MODULE_SLUGS.includes(m.slug)
).length;
const TOTAL_LESSON_COUNT = PACK_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
```

Relire le reste du diff local (`git diff lms/src/lib/email/resend.ts`) et garder ses autres remplacements tels quels (ils utilisent ces constantes).

- [ ] **Step 3 : Vérifier** — Run (lms/): `npm run lint` puis `npm run build` → succès, aucune erreur de type.

- [ ] **Step 4 : Commit**

```bash
git add lms/src/app/page.tsx lms/src/lib/email/resend.ts
git commit -m "fix(murs-fonds): chiffres landing + emails limites au pack (6 modules, 46h)"
```

---

### Task 9 : Vérification de bout en bout + déploiement

**Files:** aucun nouveau. Vérification + push.

- [ ] **Step 1 : Suite complète** — Run (lms/): `npx vitest run` → tout PASS. `npm run lint` → clean. `npm run build` → succès.

- [ ] **Step 2 : Vérification visuelle (preview)** — lancer le dev server (outil preview_start), vérifier :
  1. Landing `/` : carte « Murs & fonds de commerce » à 59 € visible ; hero toujours « 6 modules / 46h / 37 leçons » côté pack.
  2. `/formation/murs-fonds-commerce/bail-commercial` (connecté admin) : la leçon rend le script accentué, placeholder vidéo « en production ».
  3. `/formation` : le module apparaît ; pour un compte pack il est verrouillé avec CTA « Débloquer → ».

- [ ] **Step 3 : Push + déploiement (workflow habituel)**

```bash
git fetch origin && git rebase origin/main
git push origin claude/happy-rubin-0c67f3
git push origin HEAD:main   # fast-forward uniquement ; si refus, refetch + rebase, jamais de force
```

- [ ] **Step 4 : Annonce à Gregory** — récap : module en vente 59 €, pack inchangé, clients pack voient l'upsell ; rappeler que le contenu du zip est généré par IA → relecture juridique recommandée (notamment QCM Q5/Q15) avant promotion massive.

---

## Self-Review (fait à l'écriture)

- Spec ↔ plan : contenu (T1), COURSE+certif (T2), accès pack (T3), achat (T4), catalogue (T5), examen (T6), avatar/vitrine/widget (T7), landing+emails (T8), tests+deploy (T9). ✔
- Ajouts découverts pendant l'exploration, absents de la spec mais nécessaires : `purchase.ts` (T4 — un client pack doit pouvoir acheter le module ; panier pack+module autonome doit octroyer les deux) et le fix admin du `canAccess` dashboard (T3). ✔
- Types cohérents : `packIncludesModule(slug: string): boolean` utilisé T3/T4 ; `getPackModules(): CourseModule[]` T5/T8 ; slug `murs-fonds-commerce` partout. ✔
- Contenu : pas de placeholder — sources in-repo définies + exemples complets + règles de transcription exactes. ✔
