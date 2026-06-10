# Spec — Vente des modules à l'unité + catalogue (formation immobilière)

- **Date :** 2026-06-09
- **Statut :** Validé en brainstorming — en attente de relecture utilisateur
- **Approche retenue :** **A — Extension directe** du système existant (catalogue défini en code), évolutive vers un back-office plus tard.

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

## 4. Le design en 5 parties (validé)

1. **Accès** — 3 types de droits : 🎟️ Pack (tous les modules, présents et futurs) · 🧩 Module (ce module) · 👑 Admin (tout). À l'ouverture d'un module : *as-tu le pack ? sinon as-tu ce module ? sinon → verrouillé + CTA.*
2. **Vitrine** — on garde la page actuelle ; la zone catalogue passe de « 1 formation » à **pack en vedette + grille des modules à 59 €**, pilotée par les données.
3. **Panier** — « Ajouter au panier » par module, 1 paiement pour le tout, upsell pack, modules « déjà acquis » non rachetables.
4. **Espace apprenant** — tous les modules visibles ; les non-possédés sont **verrouillés** avec CTA d'achat ; chaque module verrouillé devient sa propre pub.
5. **Migration & sécurité** — données clients intactes, tests sur la logique d'accès, validation sur aperçu Vercel en mode test Stripe, fusion dans `main` seulement après validation.

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
- Index d'unicité : passer de `(email, formation_id)` à `(email, formation_id, module_slug)` (gérer le cas `NULL` via index partiel **ou** sentinelle type `'pack'` — détail d'implémentation). `upsertSubscription` : `onConflict` adapté en conséquence.
- Migration Supabase **additive** : `lms/supabase/migrations/009_module_entitlements.sql`.

### 5.3 Logique d'accès — `lms/src/lib/access.ts`
- `verifyModuleAccess(moduleSlug)` → `admin` **OU** ligne active avec `module_slug IS NULL` (pack) **OU** `module_slug = moduleSlug`.
- `getEntitlements(user)` → `{ hasPack: boolean, modules: Set<slug> }` pour l'affichage (cartes verrouillées / déverrouillées).
- `verifySubscription()` **conservée** (= « possède au moins un accès actif »), pour ne pas casser les usages existants.

### 5.4 Paiement (panier)
- **Panier côté client** sur la vitrine : « Ajouter au panier » par module, récapitulatif + bouton payer.
- `POST /api/checkout` accepte désormais **une liste de produits** (`['pack']` ou `['juridique','transaction', …]`) → construit les `line_items` Stripe (via `price_data`, montants depuis `catalog.ts`) → `metadata.products = "juridique,transaction"`.
- `POST /api/webhooks/stripe` : à `checkout.session.completed`, lit `metadata.products` → pour **chaque** produit, accorde le droit correspondant (`upsertSubscription` avec `module_slug`, ou pack). Email de bienvenue conservé pour les nouveaux clients.
- **Upsell** : quand le panier atteint ~5–6 modules (total proche/≥ prix pack), proposer le pack.
- **Déjà acquis** : pour un utilisateur connecté, les modules possédés sont marqués « Déjà acquis » et non rachetables.

### 5.5 Vitrine — `lms/src/app/page.tsx`
- Remplacer `activeFormation` / `formations[]` codés en dur par un rendu basé sur `catalog.ts` + `COURSE` : **carte pack en vedette** + **grille des modules** (59 €, ajouter au panier). Module non publié → « Bientôt disponible ». **Conserver tout le reste de la page** (héros, preuves, Qualiopi, financement, documents, FAQ, contact, footer).

### 5.6 Espace apprenant — `lms/src/app/formation/...`
- Afficher **tous** les modules ; **verrouiller** ceux non possédés (overlay + CTA « Débloquer 59 € » / ajouter au panier). Garde d'accès **au niveau leçon** via `verifyModuleAccess`. Clients pack : **tout ouvert**, aucun changement visible.

### 5.7 Stripe
- Montants via **`price_data` dynamique** (comme aujourd'hui), depuis `catalog.ts` (`MODULE_PRICE_CENTS=5900`, pack `FORMATION_PRICE_CENTS=29900`). Pas besoin de pré-créer des produits Stripe. **Mode test d'abord**, puis réel.

---

## 6. Sécurité — « on ne casse rien »
- Changements **additifs** (nouvelle colonne, nouveaux chemins de code) ; le **flux pack 299 € est conservé tel quel**.
- Données clients **intactes** ; pack = `NULL` = accès total **rétroactif**.
- **Tests automatisés** ciblés sur la logique d'accès (point sensible) — **introduire Vitest** (aucun test aujourd'hui dans le projet).
- Validation sur **aperçu Vercel** en **mode test Stripe**, 4 scénarios :
  1. Client **pack** → voit **tout**.
  2. Acheteur **d'un module** → le sien ouvert, les autres verrouillés.
  3. **Panier multi-modules** → tout se débloque.
  4. **Checkout pack 299 €** → fonctionne toujours.
- Fusion dans **`main` (= production) uniquement après validation** ; rollback Vercel en 1 clic.

---

## 7. Ordre de construction (phases)
1. **Socle d'accès** : migration `module_slug` + `verifyModuleAccess` / `getEntitlements` + **tests**. *(Ne change rien de visible — sécurise les clients existants d'abord.)*
2. **Vente** : `catalog.ts` + `/api/checkout` multi-produits + webhook multi-produits.
3. **Vitrine** : refonte de la zone catalogue (pack + modules) pilotée par les données.
4. **Panier** : état panier + upsell pack + « déjà acquis ».
5. **Espace apprenant** : verrouillage / déverrouillage + garde leçon.
6. **Stripe + go-live** : prix en test → validation aperçu → prix réels → merge `main`.

---

## 8. Fichiers principaux touchés
- `lms/supabase/migrations/009_module_entitlements.sql` *(nouveau)*
- `lms/src/lib/access.ts`, `lms/src/lib/auth-access.ts`
- `lms/src/data/catalog.ts` *(nouveau)*
- `lms/src/app/api/checkout/route.ts`, `lms/src/app/api/webhooks/stripe/route.ts`
- `lms/src/app/page.tsx` (vitrine), `lms/src/components/StripeButton.tsx` + composant **panier** *(nouveau)*
- `lms/src/app/checkout/...` (généralisation du paiement)
- `lms/src/app/formation/...` (verrouillage UI + garde leçon)
- **Tests** : configuration Vitest + tests de `access.ts`.

> ⚠️ **Note technique :** ce projet utilise une version **non standard de Next.js** (`lms/AGENTS.md`) → **lire `node_modules/next/dist/docs/` avant d'implémenter**.

---

## 9. Décisions par défaut / à confirmer (non bloquantes)
- **Module 6 (déontologie)** affiché « Bientôt disponible » tant que son contenu n'est pas publié *(défaut)*.
- **Attestation / certification** : comportement **inchangé** dans cette phase. La vente à l'unité donne accès **au contenu** ; pas de nouvelle attestation par module pour l'instant.
- **« Déjà acquis »** appliqué surtout dans l'**espace connecté** ; la vitrine publique (visiteur non connecté) montre tous les modules comme achetables.
