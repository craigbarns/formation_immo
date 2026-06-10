# Spec — Vente des modules à l'unité + catalogue (formation immobilière)

- **Date :** 2026-06-09
- **Statut :** Validé en brainstorming + **révisé suite à relecture** — prêt pour le plan d'implémentation
- **Approche retenue :** **A — Extension directe** du système existant (catalogue défini en code), évolutive vers un back-office plus tard.

> **Révision (relecture) — points renforcés :** unicité PostgreSQL via **index partiels** ; **vérification serveur** des droits (jamais se fier au front) ; **connexion obligatoire avant paiement** + rattachement `user_id`+`email` ; **metadata Stripe en JSON** ; **stratégie d'upgrade vers le pack** ; **ordre des phases** (accès avant vitrine) ; **hiérarchie d'offre** pack vs modules.

---

## 1. Contexte & problème

La plateforme (`lms/`, **Next.js + Supabase + Stripe**, déployée sur **Vercel**) vend aujourd'hui **une seule formation immobilière à 299 €**, en accès **tout-ou-rien** :

- **Vitrine / catalogue** = `lms/src/app/page.tsx` (servie sur `monpassformation.com` ; `app.monpassformation.com` redirige vers `/formation` — séparation par *hostname*).
- **Paiement** = `POST /api/checkout` (produit unique 299 € codé en dur) → Stripe Checkout → webhook `POST /api/webhooks/stripe` → `upsertSubscription()`.
- **Accès** = table `user_subscriptions (email, formation_id='immobilier', status, user_id, …)`. `verifySubscription()` (`lms/src/lib/access.ts`) répond seulement « a payé / n'a pas payé ».
- **Contenu** = `lms/src/data/course.ts` : `COURSE` = **5 modules** (juridique, transaction, financement, marketing, terrain). Le **6ᵉ module — déontologie & non-discrimination** est en production (pas encore branché dans `COURSE`).
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
| Module 6 — Déontologie & non-discrimination | 59 € | ce module (vendu en **1 seul bloc**) |
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

**Non-objectifs (reportés)**
- Back-office d'administration des produits/prix (Approche B) — *plus tard*.
- Attestation / certification **par module** — inchangé pour l'instant (voir §9).
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
  - Modules : pour chaque slug de `COURSE` (+ déontologie) : `{ id: <slug>, priceCents: 5900, grants: [<slug>], available: bool }`
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

### 5.4 Paiement (connexion d'abord + panier)
**Flux retenu (connexion obligatoire avant paiement) :**
```
Ajouter au panier → Connexion / création de compte → Checkout Stripe → Webhook → accès accordé (user_id + email)
```
- Choix assumé : **connexion avant achat** → on connaît le `user_id` à l'achat, et on évite le cas pénible « email Stripe ≠ email du compte ». **Arbitrage :** ça ajoute un peu de friction avant un achat à 59 € ; on **pré-remplit l'email Stripe** depuis le compte connecté pour limiter la perte. Repli possible plus tard (*guest checkout* rattaché par email) si la conversion en souffre (voir §9).
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
- Remplacer `activeFormation` / `formations[]` codés en dur par un rendu basé sur `catalog.ts` + `COURSE` : **carte pack en vedette** + **grille des modules** (59 €, ajouter au panier). Module non publié → « Bientôt disponible ». **Conserver tout le reste de la page**.
- **Hiérarchie d'offre (ne pas cannibaliser le pack) :**
  - Pack → **« Meilleur choix · Tous les modules actuels + futurs »**, mis en avant visuellement.
  - Modules à l'unité → présentés comme **« Pour commencer sans engagement »**, offre secondaire.

### 5.6 Espace apprenant — `lms/src/app/formation/...`
- Afficher **tous** les modules ; **verrouiller** ceux non possédés (overlay + CTA « Débloquer 59 € » / ajouter au panier). Garde d'accès **au niveau leçon** via `verifyModuleAccess`. Clients pack : **tout ouvert**, aucun changement visible.
- C'est ici que se joue le **vrai risque** : ce que voit le client **après** achat → testé et sécurisé **avant** la vitrine (cf. §7).

### 5.7 Stripe
- Montants via **`price_data` dynamique** (comme aujourd'hui), depuis `catalog.ts` (`MODULE_PRICE_CENTS=5900`, pack `FORMATION_PRICE_CENTS=29900`). Pas besoin de pré-créer des produits Stripe. **Mode test d'abord**, puis réel.

---

## 6. Sécurité — « on ne casse rien »
- Changements **additifs** (nouvelle colonne, nouveaux chemins de code) ; le **flux pack 299 € est conservé tel quel**.
- Données clients **intactes** ; pack = `NULL` = accès total **rétroactif**.
- **Vérification serveur systématique** des droits et de l'éligibilité à l'achat (§4) — jamais se fier au front.
- **Tests automatisés** (introduire **Vitest** — aucun test aujourd'hui) ciblés sur les points sensibles :
  - `access.ts` : pack voit tout / module = le sien / aucun accès / admin ;
  - filtrage serveur du panier (`/api/checkout`) : retire modules possédés + pack ;
  - **webhook** : `metadata.product_ids` → bons droits accordés (pack vs modules), idempotence.
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
7. **Vitrine + panier** (rendu data-driven, hiérarchie pack/modules).
8. **Upsell pack**.
9. **Test Stripe complet** sur aperçu Vercel (4 scénarios, mode test).
10. **Merge production**.

---

## 8. Fichiers principaux touchés
- `lms/supabase/migrations/009_module_entitlements.sql` *(nouveau)*
- `lms/src/lib/access.ts`, `lms/src/lib/auth-access.ts`
- `lms/src/data/catalog.ts` *(nouveau)*
- `lms/src/app/api/checkout/route.ts`, `lms/src/app/api/webhooks/stripe/route.ts`
- `lms/src/app/page.tsx` (vitrine), `lms/src/components/StripeButton.tsx` + composant **panier** *(nouveau)*
- `lms/src/app/checkout/...` (généralisation du paiement + connexion préalable)
- `lms/src/app/formation/...` (verrouillage UI + garde leçon)
- **Tests** : configuration Vitest + tests `access.ts`, checkout (filtrage), webhook.

> ⚠️ **Note technique :** ce projet utilise une version **non standard de Next.js** (`lms/AGENTS.md`) → **lire `node_modules/next/dist/docs/` avant d'implémenter**.

---

## 9. Décisions par défaut / à confirmer (non bloquantes)
- **Module 6 (déontologie)** affiché « Bientôt disponible » tant que son contenu n'est pas publié *(défaut)*.
- **Attestation / certification** : comportement **inchangé** dans cette phase. La vente à l'unité donne accès **au contenu** ; pas de nouvelle attestation par module pour l'instant.
- **Upgrade vers le pack** (a acheté des modules puis veut le pack) :
  - **Phase 1 (maintenant)** : pas de remise automatique → pack au plein tarif (299 €), accès total accordé.
  - **Phase 2 (plus tard)** : upgrade intelligent avec **déduction des modules déjà achetés**.
- **Connexion avant achat** : retenue pour la justesse des droits ; *repli guest-checkout par email* possible en Phase 2 si la conversion baisse.
- **« Déjà acquis »** : affiché côté connecté ; sur la vitrine publique (visiteur non connecté), tous les modules apparaissent achetables, le **filtrage serveur** s'applique après connexion (§4).
