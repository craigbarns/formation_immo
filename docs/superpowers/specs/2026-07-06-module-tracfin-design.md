# Module 7 — TRACFIN & LCB-FT (module autonome à 49 €)

Date : 2026-07-06
Statut : validé (design approuvé par le propriétaire)

## Objectif

Ajouter un 7ᵉ module « TRACFIN & lutte contre le blanchiment (LCB-FT) » de 2 h,
vendu **49 €** à l'unité, **non inclus** dans le pack 299 €, **hors** certification 42 h
(module bonus), avec audio + QCM comme les modules existants.

## Décisions

1. **Contenu** : 3 leçons de ~40 min (total 120 min = 2 h).
2. **Prix** : 49 € (4900 c), différent des autres modules (59 €).
3. **Pack** : TRACFIN n'est **pas** couvert par le pack 299 € (add-on autonome).
4. **Certification** : module bonus, comme la déontologie (hors diplôme 42 h).

## Contenu — 3 leçons (module slug `tracfin`)

| # | slug leçon | titre | durée |
|---|---|---|---|
| 1 | `cadre-legal-obligations` | Cadre légal & obligations LCB-FT | 40 |
| 2 | `vigilance-detection` | Vigilance client & détection (KYC, faisceau d'indices) | 40 |
| 3 | `declaration-soupcon-pratique` | Déclaration de soupçon à TRACFIN & cas pratiques | 40 |

- Scripts de narration : `module7-tracfin/scripts/0N-*.md` (format identique aux modules existants).
- Audio : MP3 générés via Mistral Voxtral → `lms/public/audio/0N-*.mp3`, branchés dans `course.ts`.
- QCM : 3 par leçon (9 au total) dans `quiz-checkpoints.ts`, `moduleSlug: "tracfin"`.

## Prix par module (sans risque)

`catalog.ts` : table d'override + support env.
```ts
const MODULE_PRICE_OVERRIDES: Record<string, number> = { tracfin: 4900 };
// dans getCatalog : priceFromEnv("MODULE_PRICE_CENTS_TRACFIN", 4900) sinon getModulePriceCents()
```

## Exclusion du pack (cœur paiement — avec tests)

Règle d'accès centralisée dans un helper pur unique (`entitlements.ts`) :
```ts
export const PACK_EXCLUDED_MODULES = new Set(["tracfin"]);
export function hasModuleAccess(ent: Entitlements, slug: string): boolean {
  if (ent.modules.has(slug)) return true;              // acheté à l'unité
  return ent.hasPack && !PACK_EXCLUDED_MODULES.has(slug); // pack ≠ modules exclus
}
```
Consommateurs mis à jour vers ce helper :
- `entitlements.ts` → `canAccessModule`
- `access.ts` → `verifyModuleAccess` (gate page leçon)
- `purchase.ts` → `filterPurchasable`

Effets voulus :
- Détenteur du pack **n'a pas** accès à TRACFIN → peut l'acheter 49 €.
- Pack + TRACFIN dans le même panier → les **deux** sont facturés (pas de « included_in_pack » pour un module exclu).

## Certification (bonus)

`formation-journey.ts` → `BONUS_MODULE_SLUGS = ["deontologie", "tracfin"]`.

## Identité & voix

- `formateur-voices.json` : entrée `tracfin` (persona « Maître … », voix Mistral autoritaire réutilisée).
- `module-themes.ts` : thème dédié `tracfin` (sinon fallback juridique).
- `module-avatars.ts` : entrée `tracfin` (photo absente → fallback initiales, comme déontologie).

## Tests (garde-fous)

- `entitlements.test.ts` : `hasModuleAccess` — pack n'ouvre pas TRACFIN ; achat unité l'ouvre.
- `purchase.test.ts` : pack owner peut acheter TRACFIN ; pack+TRACFIN = 2 lignes.
- `catalog.test.ts` : 7 modules, TRACFIN à 4900, pack inchangé.
- Audit : 3 nouvelles leçons ont audio + QCM.
- Validation : `vitest` + `tsc --noEmit` + `next build`.

## Fichiers touchés

`course.ts`, `catalog.ts`, `entitlements.ts`, `access.ts`, `purchase.ts`,
`formation-journey.ts`, `quiz-checkpoints.ts`, `formateur-voices.json`,
`module-themes.ts`, `module-avatars.ts`, + 3 scripts `.md`, + 3 MP3, + tests.
