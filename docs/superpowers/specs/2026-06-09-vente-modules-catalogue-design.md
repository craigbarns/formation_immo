# Spec — Vente des modules à l'unité + catalogue (formation immobilière)

- **Date :** 2026-06-09
- **Statut :** Validé en brainstorming + **révisé suite à relecture** — prêt pour le plan d'implémentation
- **Approche retenue :** **A — Extension directe** du système existant (catalogue défini en code), évolutive vers un back-office plus tard.

> **Révision (relecture) — points renforcés :** unicité PostgreSQL via **index partiels** ; **vérification serveur** des droits (jamais se fier au front) ; **connexion obligatoire avant paiement** + rattachement `user_id`+`email` ; **metadata Stripe en JSON** ; **stratégie d'upgrade vers le pack** ; **ordre des phases** (accès avant vitrine) ; **hiérarchie d'offre** pack vs modules. **Correction : les 6 modules (déontologie incluse) sont déjà branchés dans `COURSE`.** **Ajout : attestation de suivi *par module* (§5.8) pour la vente à l'unité.**

---

## 1. Contexte & problème

La plateforme (`lms/`, **Next.js + Supabase + Stripe**, déployée sur **Vercel**) vend aujourd'hui **une seule formation immobilière à 299 €**, en accès **tout-ou-rien** :

- **Vitrine / catalogue** = `lms/src/app/page.tsx` (servie sur `monpassformation.com` ; `app.monpassformation.com` redirige vers `/formation` — séparation par *hostname*).
- **Paiement** = `POST /api/checkout` (produit unique 299 € codé en dur) → Stripe Checkout → webhook `POST /api/webhooks/stripe` → `upsertSubscription()`.
- **Accès** = table `user_subscriptions (email, formation_id='immobilier', status, user_id, …)`. `verifySubscription()` (`lms/src/lib/access.ts`) répond seulement « a payé / n'a pas payé ».
- **Contenu** = `lms/src/data/course.ts` : `COURSE` = **6 modules, tous branchés** : juridique, transaction, financement, marketing, terrain, **déontologie** (slug `deontologie`, « Module 6 — Déontologie & éthique professionnelle », **inclut la non-discrimination**). *(La copie marketing « 5 modules / 36 leçons / 42h » est obsolète → à recalculer depuis `COURSE`.)*
- **Des clients ont déjà acheté le pack 299 €.** → Contrainte absolue : **ne pas leur faire perdre l'accès.**

**Objectif :** vendre chaque module à l'unité **et** conserver le pack, dans le catalogue existant, **sans rien casser** — puis pouvoir élargir le catalogue facilement.

---

## 2. Modèle commercial (validé)

| Produit | Prix | Donne accès à |
|--------|------|----------------|
| Module 1 — Juridique & conformité | 59 € | ce module |
| Module 2 — Transaction & négociation | 59 € | ce module |
| Module 3 — Financement & fiscalité | 59 € | ce module |
| Module 4 — Marketing digital | 59 € | ce module |
| Module 5 — Visite, closing & fidélisation | 59 € | ce module |
| Module 6 — Déontologie & éthique pro *(slug `deontologie`, inclut non-discrimination)* | 59 € | ce module (1 bloc) |
| **Pack complet** | **299 €** | **tous les modules, présents ET futurs** |

- Le **pack reste vendu en permanence**, mis en avant comme offre « meilleur prix » (299 € vs **354 €** à la carte).
- Les prix restent **ajustables** (configuration en code).

---

## 3. Objectifs / Non-objectifs

**Objectifs**
- Vendre les 6 modules à l'unité (59 €) **et** le pack (299 €).
- **Panier** multi-modules (1 seul paiement pour plusieurs modules) + **upsell** vers le pack.
- Accès **par module** dans l'espace apprenant (verrouillé / déverrouillé).
- Clients pack existants : **accès total conservé, automatiquement et rétroactivement**.
- Catalogue **alimenté par les vraies données de cours** (pas de texte recopié à la main).
- **Attestation de suivi par module** (preuve d'heures) pour les achats à l'unité ; **certification finale** conservée pour le parcours complet.

**Non-objectifs (reportés)**
- Back-office d'administration des produits/prix (Approche B) — *plus tard*.
- Examen/QCM **bloquant** par module — non retenu : on délivre une **attestation de suivi** (option A, voir §5.8). La **certification finale** (examen global) reste inchangée.
- CPF / OPCO — inchangé (prise de contact).
- Autres formations (management, marketing digital) — la structure les accueillera, mais **hors périmètre immédiat**.

---

## 4. Règle d'or (sécurité des droits)

> **Les droits d'accès et l'éligibilité à l'achat sont TOUJOURS recalculés côté serveur. Le front (boutons cachés, panier) n'est qu'un confort d'affichage, jamais une sécurité.**

Conséquences concrètes :
- **Un module inclus dans le pack n'est jamais revendable.** Si `hasPack = true`, tous les modules sont « Inclus dans votre pack » → achat impossible.
- **Un module déjà possédé n'est jamais racheté.** `/api/checkout` **retire** du panier tout produit déjà détenu (module possédé OU couvert par le pack) **avant** de créer la session Stripe.
- Si après filtrage le panier est vide → pas de session Stripe, message clair.

---

## 5. Conception technique

### 5.1 Catalogue de produits (config en code)
- Nouveau fichier **`lms/src/data/catalog.ts`** : liste des produits vendables.
  - Pack : `{ id: 'pack', label, priceCents: 29900, grants: 'all' }`
  - Modules : pour **chaque** slug de `COURSE` (les **6**, déontologie incluse) : `{ id: <slug>, priceCents: 5900, grants: [<slug>], available: bool }`
- Libellés / durées tirés de `COURSE` (**source unique**) ; `catalog.ts` n'ajoute que **prix + disponibilité**.

### 5.2 Modèle de droits (entitlements)
- On **réutilise `user_subscriptions`** et on ajoute une colonne **`module_slug text` (nullable)** :
  - `module_slug IS NULL` ⇒ **pack** (accès à tous les modules).
  - `module_slug = '<slug>'` ⇒ accès **à ce module**.
- **Rétrocompatibilité totale : les lignes existantes ont `module_slug = NULL` ⇒ pack ⇒ accès total.** Aucune donnée modifiée ni supprimée.
- **Unicité (index partiels — évite les pièges du `NULL`) :**
  ```sql
  -- un seul accès "pack" par client
  CREATE UNIQUE INDEX ... ON user_subscriptions (email, formation_id)
    WHERE module_slug IS NULL;
  -- un seul accès par module par client
  CREATE UNIQUE INDEX ... ON user_subscriptions (email, formation_id, module_slug)
    WHERE module_slug IS NOT NULL;
  ```
  Ainsi : un client peut avoir 1 pack **et/ou** plusieurs modules, sans double ligne pack accidentelle, sans toucher aux anciennes lignes.
- **`upsertSubscription`** s'appuie sur ces index. Si l'upsert PostgREST ne gère pas bien l'arbitrage sur index partiel, on utilise le **chemin manuel *select-puis-insert/update*** déjà présent dans `auth-access.ts` (fallback existant).
- **`user_id` devient de 1ère importance, à parité avec `email`.** L'achat se faisant connecté (cf. §5.4), on écrit `user_id` **dès** l'octroi du droit (plus seulement l'email). Le rattachement par email reste un filet de sécurité.
- Migration Supabase **additive** : `lms/supabase/migrations/009_module_entitlements.sql`.

### 5.3 Logique d'accès — `lms/src/lib/access.ts`
- `verifyModuleAccess(moduleSlug)` → `admin` **OU** ligne active avec `module_slug IS NULL` (pack) **OU** `module_slug = moduleSlug` (par `user_id` **ou** `email`).
- `getEntitlements(user)` → `{ hasPack: boolean, modules: Set<slug> }` pour l'affichage **et** pour le filtrage serveur du panier (§4).
- `verifySubscription()` **conservée** (= « possède au moins un accès actif »), pour ne pas casser les usages existants.

### 5.4 Paiement (paiement d'abord + panier) — **révisé 2026-06-11 (décision Gregory)**
**Flux retenu (identique au pack 299 € historique — paiement d'abord, compte ensuite) :**
```
Visiteur : Panier → Checkout Stripe (email saisi chez Stripe) → /register?session_id (email pré-rempli) → accès exact
Connecté : Panier → Checkout Stripe (email pré-rempli, user_id en metadata) → /achat/confirmation → accès
```
- **Décision :** la connexion obligatoire avant paiement (version initiale de cette section) ajoutait une marche avant le paiement → friction/conversion + incohérence avec le parcours 299 € connu des clients. Le `user_id` est rattaché **à l'inscription** (`linkExistingSubscriptionToUser`, multi-lignes) ou immédiatement si l'acheteur était connecté.
- L'inscription post-paiement octroie **exactement** les produits payés (`parsePurchaseMetadata` + `grantsFromProducts` — pas de pack par défaut pour un achat module) ; le webhook fait de même (idempotent, l'un couvre le retard de l'autre).
- *Limite assumée (identique à l'existant 299 €) :* un client possédant déjà un module mais non connecté peut racheter ce module en invité — le filtrage serveur ne connaît pas ses droits sans session. Les pages connectées (app) affichent « déjà acquis ».
- **Panier côté client** (vitrine + espace apprenant) : « Ajouter au panier » par module, récap + bouton payer.
- `POST /api/checkout` :
  1. exige une session authentifiée ;
  2. **recalcule les droits** et **retire** les produits déjà possédés / couverts par le pack (§4) ;
  3. construit les `line_items` Stripe (via `price_data`, montants depuis `catalog.ts`) ;
  4. **metadata en JSON** :
     ```
     metadata.product_ids   = JSON.stringify(["juridique","transaction"])
     metadata.purchase_type = "pack" | "module_bundle"
     metadata.formation_id  = "immobilier"
     metadata.user_id       = <uuid>
     ```
- `POST /api/webhooks/stripe` : à `checkout.session.completed`, lit `metadata.product_ids` → pour **chaque** produit, accorde le droit correspondant (pack ⇒ `module_slug NULL` ; module ⇒ `module_slug=<slug>`), avec `user_id`+`email`. Email de bienvenue conservé pour les nouveaux clients.
- **Upsell** : quand le panier approche 5–6 modules (total proche/≥ prix pack), proposer le pack (« débloque TOUT pour 299 € »).

### 5.5 Vitrine — `lms/src/app/page.tsx`
- Remplacer `activeFormation` / `formations[]` codés en dur par un rendu basé sur `catalog.ts` + `COURSE` : **carte pack en vedette** + **grille des 6 modules** (59 €, ajouter au panier). Les 6 modules sont **branchés et vendables** ; « Bientôt disponible » est réservé aux **futurs** modules/formations. **Recalculer les chiffres affichés (nb de modules, leçons, durée totale) depuis `COURSE`** (la copie « 5 modules / 42h » est obsolète). **Conserver tout le reste de la page**.
- **Hiérarchie d'offre (ne pas cannibaliser le pack) :**
  - Pack → **« Meilleur choix · Tous les modules actuels + futurs »**, mis en avant visuellement.
  - Modules à l'unité → présentés comme **« Pour commencer sans engagement »**, offre secondaire.

### 5.6 Espace apprenant — `lms/src/app/formation/...`
- Afficher **tous** les modules ; **verrouiller** ceux non possédés (overlay + CTA « Débloquer 59 € » / ajouter au panier). Garde d'accès **au niveau leçon** via `verifyModuleAccess`. Clients pack : **tout ouvert**, aucun changement visible.
- C'est ici que se joue le **vrai risque** : ce que voit le client **après** achat → testé et sécurisé **avant** la vitrine (cf. §7).

### 5.7 Stripe
- Montants via **`price_data` dynamique** (comme aujourd'hui), depuis `catalog.ts` (`MODULE_PRICE_CENTS=5900`, pack `FORMATION_PRICE_CENTS=29900`). Pas besoin de pré-créer des produits Stripe. **Mode test d'abord**, puis réel.

### 5.8 Attestation par module (attestation de suivi)
Deux niveaux :
- **Attestation de suivi par module** — pour un client qui **possède** un module et l'a **terminé** (toutes les leçons suivies). Contient : nom, **titre + heures du module** (depuis `COURSE`), date de fin, n° `ATC-…`, QR de vérification. C'est la **preuve réglementaire d'heures suivies** (Loi ALUR).
- **Certification finale** (existante, **inchangée**) — examen global `certification-finale` ≥ 70 %, couvre tous les modules ; « diplôme » premium pour les parcours complets (pack **ou** 6 modules possédés + terminés).

**Réutilise l'existant :**
- `certificates.modules` (champ liste déjà présent) → **1 slug** (attestation module) ou **tous** (certification finale). N° + QR identiques.
- `AttestationPDF` → ajouter une **variante « 1 module »** (titre + heures du module). `formation-data.ts` doit lister les **6 modules** + heures.
- Suivi de progression des leçons (déjà en place) → « module terminé » = toutes ses leçons complétées (déclencheur option A, **pas d'examen**).

**Génération — `api/certificates/generate` :**
- Accepte un **scope** : `moduleSlug` (attestation module) **ou** `"full"` (certification finale).
- **Garde serveur (Règle d'or §4)** : pour `moduleSlug`, vérifier que l'utilisateur **possède** (`verifyModuleAccess`) **et** a **terminé** le module. Pour `"full"`, règle actuelle conservée (examen ≥ 70 %).
- Idempotent : réutilise le certificat existant pour ce scope.

**UI :** bouton **« Télécharger mon attestation (Module X) »** à la fin d'un module possédé + terminé ; la certification finale reste sur `formation/certification`.

---

## 6. Sécurité — « on ne casse rien »
- Changements **additifs** (nouvelle colonne, nouveaux chemins de code) ; le **flux pack 299 € est conservé tel quel**.
- Données clients **intactes** ; pack = `NULL` = accès total **rétroactif**.
- **Vérification serveur systématique** des droits et de l'éligibilité à l'achat (§4) — jamais se fier au front.
- **Tests automatisés** (introduire **Vitest** — aucun test aujourd'hui) ciblés sur les points sensibles :
  - `access.ts` : pack voit tout / module = le sien / aucun accès / admin ;
  - filtrage serveur du panier (`/api/checkout`) : retire modules possédés + pack ;
  - **webhook** : `metadata.product_ids` → bons droits accordés (pack vs modules), idempotence.
  - **attestation** : refus si module non possédé ou non terminé ; PDF généré si possédé + terminé.
- Validation sur **aperçu Vercel** en **mode test Stripe**, 4 scénarios :
  1. Client **pack** → voit **tout** · 2. Acheteur **d'un module** → le sien ouvert, les autres verrouillés · 3. **Panier multi-modules** → tout se débloque · 4. **Checkout pack 299 €** → fonctionne toujours.
- Fusion dans **`main` (= production) uniquement après validation** ; rollback Vercel en 1 clic.

---

## 7. Ordre de construction (phases — révisé : accès avant vitrine)
1. **Migration DB** (`module_slug` + index partiels) + accès rétrocompatible.
2. **Tests `access.ts`** — *avant toute UI*.
3. **Catalogue en code** (`catalog.ts`).
4. **Checkout multi-produits** (`/api/checkout` : auth + filtrage serveur + metadata JSON).
5. **Webhook multi-entitlements** (octroi des droits par produit) + tests.
6. **Espace apprenant** verrouillé / déverrouillé + garde leçon. *(Le vrai risque : l'accès après achat.)*
7. **Attestation par module** (route `generate` scope module + garde *possédé + terminé* + PDF variante 1-module + `formation-data` / `module-complete` à 6 modules).
8. **Vitrine + panier** (rendu data-driven, hiérarchie pack/modules).
9. **Upsell pack**.
10. **Test Stripe complet** sur aperçu Vercel (4 scénarios, mode test).
11. **Merge production**.

---

## 8. Fichiers principaux touchés
- `lms/supabase/migrations/009_module_entitlements.sql` *(nouveau)*
- `lms/src/lib/access.ts`, `lms/src/lib/auth-access.ts`
- `lms/src/data/catalog.ts` *(nouveau)*
- `lms/src/app/api/checkout/route.ts`, `lms/src/app/api/webhooks/stripe/route.ts`
- `lms/src/app/page.tsx` (vitrine), `lms/src/components/StripeButton.tsx` + composant **panier** *(nouveau)*
- `lms/src/app/checkout/...` (généralisation du paiement + connexion préalable)
- `lms/src/app/formation/...` (verrouillage UI + garde leçon)
- `lms/src/app/api/certificates/generate/route.ts` (scope module/full + garde), `lms/src/lib/pdf/AttestationPDF.tsx` (variante 1 module), `lms/src/lib/pdf/formation-data.ts` (6 modules + heures), `lms/src/app/api/email/module-complete/route.ts` (`max 5`→6)
- **Tests** : configuration Vitest + tests `access.ts`, checkout (filtrage), webhook, attestation.

> ⚠️ **Note technique :** ce projet utilise une version **non standard de Next.js** (`lms/AGENTS.md`) → **lire `node_modules/next/dist/docs/` avant d'implémenter**.

---

## 9. Décisions par défaut / à confirmer (non bloquantes)
- **Module 6 (déontologie & éthique pro, slug `deontologie`)** : **branché et vendable** comme les autres. ⚠️ Vérifier que **tous ses audios sont finalisés** avant mise en vente (narration en cours de production). Le mécanisme « Bientôt disponible » ne concerne que les **futurs** modules.
- **Attestation** : *attestation de suivi par module* (option A) **ajoutée** pour la vente à l'unité (voir §5.8). **Certification finale** (examen global ≥ 70 %) **inchangée** pour le parcours complet.
- **Upgrade vers le pack** (a acheté des modules puis veut le pack) :
  - **Phase 1 (maintenant)** : pas de remise automatique → pack au plein tarif (299 €), accès total accordé.
  - **Phase 2 (plus tard)** : upgrade intelligent avec **déduction des modules déjà achetés**.
- **Connexion avant achat** : ~~retenue initialement~~ **abandonnée le 2026-06-11** (décision Gregory, test utilisateur) au profit du *paiement d'abord* — voir §5.4 révisé.
- **« Déjà acquis »** : affiché côté connecté ; sur la vitrine publique (visiteur non connecté), tous les modules apparaissent achetables, le **filtrage serveur** s'applique après connexion (§4).
