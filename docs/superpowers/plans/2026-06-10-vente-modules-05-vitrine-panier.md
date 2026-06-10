# Plan 5/5 — Vitrine catalogue + panier + préparation go-live — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans. Steps use checkbox syntax.

**Goal:** La page d'accueil vend **le pack en vedette (« Meilleur choix »)** + **les 6 modules à 59 € à la carte** (ajout au panier, 1 paiement multi-modules, upsell pack), avec chiffres (modules/leçons/durée/prix) **calculés depuis `COURSE`/`catalog`**. Préparer la checklist go-live.

**Architecture :** la vitrine est `lms/src/app/page.tsx` (serveur). Le panier est client : `CartProvider` (contexte + localStorage `mpf-cart`, survit au login), `AddToCartButton` par module, `CartBar` flottante (total, upsell pack si total ≥ prix pack, bouton payer → `POST /api/checkout { products }`, 401 → login avec retour). Hiérarchie d'offre (spec §5.5) : pack = grande carte « Meilleur choix · modules actuels + futurs » ; modules = « Pour commencer sans engagement ». Les cartes « Prochainement » (management, marketing digital) restent en teaser. Cover module = `/generated/fal/<slug>/cover.jpg`, fallback image immobilier (déontologie).

## Tasks

- [ ] **T1 — `src/lib/price.ts`** : `euros(cents)` partagé ; `ModuleLockedView` refactoré dessus. Commit.
- [ ] **T2 — Panier** : `src/components/cart/CartProvider.tsx` (état + localStorage + `useCart()` : items, add, remove, clear, totalCents, count), `AddToCartButton.tsx` (ajouté ⇒ « Retirer »), `CartBar.tsx` (fixe en bas si non vide : récap, upsell « Passez au pack — économisez X € » si totalCents ≥ prix pack [swap items→`["pack"]`], bouton « Payer » → checkout, 401 → `/login?next=/`). Commit.
- [ ] **T3 — Vitrine `page.tsx`** : stats héros + copies « 5 modules/36 leçons/42h/299 € » recalculées (`COURSE.length`, leçons, `formatDuration(getTotalCourseDurationMin())`, `getPackPriceCents`) ; section catalogue réécrite : carte pack vedette (badge « Meilleur choix », bullets, prix, `StripeButton products=["pack"]`) + grille 6 modules (cover, titre, summary, durée/leçons, prix, `AddToCartButton`) + teasers « Prochainement » conservés ; le tout enveloppé dans `CartProvider` + `CartBar`. Commit.
- [ ] **T4 — Vérifs** : eslint, tsc, `npm test` (31), `npm run build`. Commit final.

## Checklist GO-LIVE (à dérouler avec Gregory — rien d'automatique)
1. Pousser la branche → **aperçu Vercel** (mêmes env vars ; Stripe en **mode test** sur l'aperçu si possible : `STRIPE_SECRET_KEY` test + webhook test pointant vers l'URL d'aperçu).
2. **Appliquer migration 009** (colonne `module_slug`) sur Supabase — sans risque.
3. Valider les **4 scénarios** sur l'aperçu : ① client pack → tout ouvert ② achat 1 module (CB test 4242…) → ce module ouvert, autres verrouillés ③ panier multi-modules → tout se débloque ④ achat pack → OK + email bienvenue.
4. Vérifier attestation module (terminer un module test → télécharger PDF `ATM-…`).
5. **Merge `main`** → déploiement prod.
6. **Appliquer migration 010** (index partiels) — seulement maintenant.
7. Test prod réel à 1 € ? (optionnel : baisser `MODULE_PRICE_CENTS` temporairement) ; surveiller logs webhook 24 h ; rollback Vercel possible à tout moment (avant 010).

## Self-Review
- §5.5 vitrine data-driven, hiérarchie pack/modules, « Bientôt » réservé aux futurs. T3 ✅
- §5.4 panier 1 paiement + upsell. T2 ✅ (filtrage serveur déjà en place — Plan 2.)
- §2 prix uniques depuis `catalog.ts`. T1/T3 ✅
- §6/§7 go-live ordonné (009 → code → 010), 4 scénarios. Checklist ✅
