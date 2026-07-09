# Spec — Module autonome « Murs & Fonds de Commerce » (7h, 59 €)

**Date** : 2026-07-09
**Statut** : validé par Gregory (option 1 — module autonome branché dans le système existant)

## Contexte

Gregory a fourni un zip de contenu complet (`Kimi_Agent_7h Murs & Fonds Training.zip`) pour une
nouvelle formation de 7 heures sur les baux commerciaux, cessions de fonds de commerce et murs
de boutique. Elle doit apparaître sur le catalogue à **59 €**, sur le même modèle que les
modules existants.

## Décisions produit (validées)

1. **Module autonome** : il n'est PAS inclus dans le pack 299 €. Vendu uniquement à l'unité 59 €.
   Les clients pack (20 existants + futurs) le voient **verrouillé** avec un CTA d'achat 59 € (upsell).
2. **Hors certification 42h** : comme la déontologie, il ne compte pas dans le diplôme 42h
   (le seuil reste 33 leçons certifiantes). Il a **sa propre attestation 7h** avec la règle
   anti-clic existante (toutes les leçons + ≥ 50 % du temps réel, soit 3h30).
3. **Vidéos** : les MP4 du zip font 5 secondes (teasers) → `videoUrl: null`, placeholder
   « Contenu vidéo en production ». Gregory branchera les vraies vidéos plus tard.
4. **Aucune migration SQL** : le modèle `user_subscriptions.module_slug` couvre déjà ce cas
   (`module_slug = 'murs-fonds-commerce'`).

## Contenu

Nouveau dossier racine `module7-murs-fonds/` (copié du zip, hors `visuels/` — 47 Mo de teasers exclus) :
`scripts/` (4 scripts .md), `qcm/` (15 questions corrigées), `templates/` (docx/xlsx),
`plan-pedagogique/`, `guide-eleve/`.

Module dans `COURSE` — slug **`murs-fonds-commerce`**, titre **« Murs & fonds de commerce »**
(sans préfixe « Module N — » : c'est une formation autonome), 4 leçons × 105 min = **420 min = 7h** :

| # | Slug leçon | Titre | Script |
|---|---|---|---|
| 1 | `bail-commercial` | Le bail commercial — fondamentaux | `01-bail-commercial-fondamentaux.md` |
| 2 | `cession-fonds` | La cession de fonds de commerce | `02-cession-fonds-commerce.md` |
| 3 | `renouvellement-conge` | Renouvellement, congé & indemnité d'éviction | `03-renouvellement-conge-droits.md` |
| 4 | `murs-boutique` | Murs de boutique — investissement & fiscalité | `04-murs-boutique-investissement.md` |

Difficulté `intermediaire`/`avance`, objectifs repris du plan pédagogique du zip.

## Architecture

### Nouveau concept : `STANDALONE_MODULE_SLUGS`

Défini dans `lms/src/lib/entitlements.ts` (constante pure, sans import) :
`["murs-fonds-commerce"]`. Distinct de `BONUS_MODULE_SLUGS` (certif) :
la déontologie est *bonus* mais *incluse au pack* ; murs-fonds est *bonus ET autonome*.

- `canAccessModule(rows, slug, isAdmin)` : le pack (`module_slug null`) donne accès à tout
  **sauf** les modules autonomes → `modules.has(slug) || (hasPack && !STANDALONE.includes(slug))`.
  L'achat à l'unité et l'admin ne changent pas.

### Fichiers touchés

| Fichier | Changement |
|---|---|
| `lms/src/data/course.ts` | + module 7 (4 leçons, 420 min) |
| `lms/src/lib/entitlements.ts` | + `STANDALONE_MODULE_SLUGS`, `canAccessModule` exclut du pack |
| `lms/src/data/catalog.ts` | description/compte du pack **pack-scoped** (6 modules, 46h — ne bouge pas quand on ajoute un module autonome) ; le produit 59 € apparaît automatiquement |
| `lms/src/lib/formation-journey.ts` | `BONUS_MODULE_SLUGS` += `murs-fonds-commerce` (certif reste 33 leçons) |
| `lms/src/data/exam-questions.ts` | + examen 15 questions (transcrites du QCM du zip, avec explications) |
| `lms/src/data/module-avatars.ts` + `formateur-voices.json` | + formateur dédié (juriste spécialisé baux commerciaux) |
| `lms/src/data/module-showcase.ts` | + entrée vitrine (headline, outcomes, teasers par leçon) |
| `lms/src/components/gamification/ModuleTimeTracker.tsx` | grille 6 → 7 colonnes, label « MURS » |
| `lms/src/app/page.tsx` (landing) | chiffres hero pack-scoped (le « 6 modules / 46h » du pack ne doit pas devenir 7/53h) |
| `lms/src/lib/email/resend.ts` | comptes d'e-mails pack-scoped (l'e-mail de bienvenue pack ne doit pas annoncer 7 modules) — s'appuie sur le diff local non commité existant |

### Ce qui marche sans modification

Checkout invité 59 €, webhook Stripe (grants par `product_ids`), gating serveur
(`verifyModuleAccess`), attestation module avec temps minimum, minuteur par module,
page module verrouillée avec CTA d'achat (déjà en place pour les acheteurs à l'unité).

## Points d'attention

- **Clients pack existants** : ne doivent PAS gagner l'accès (test unitaire dédié).
- **Certification 42h** : reste 33 leçons — le test `formation-journey.test.ts` qui calcule
  « total − déonto » doit devenir « total − modules bonus ».
- **« Leçon suivante »** : en fin de déontologie, le parcours peut pointer vers une leçon
  murs-fonds verrouillée pour un client pack → il tombe sur la page d'upsell existante. Acceptable.
- **Tableau de bord apprenant** : les totaux affichés (`COURSE.length`, durée totale) passent à
  7 modules / 53h — cohérent puisque les 7 cartes y sont listées (précédent : acheteurs à l'unité).

## Tests

- `entitlements` : pack n'accède pas à `murs-fonds-commerce` ; achat unitaire oui ; admin oui.
- `catalog` : produit `murs-fonds-commerce` présent, 5 900 cents, disponible ; description pack
  toujours « 6 modules ».
- `formation-journey` : `getCertifiedLessonCount() === 33` inchangé.
- Vérification build + lint + suite complète avant push.

## Déploiement

Aucune migration SQL. Commit sur `claude/happy-rubin-0c67f3`, fast-forward `main` → Vercel prod
(workflow habituel : fetch + rebase d'abord, jamais de force-push sur main).
