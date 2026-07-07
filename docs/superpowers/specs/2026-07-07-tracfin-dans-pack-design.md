# TRACFIN inclus dans le pack + gardé en autonome + certifiant (avec grandfather)

Date : 2026-07-07
Statut : validé (design approuvé par le propriétaire)

## Contexte

Les clients du pack 42h réclament l'accès à TRACFIN. On l'intègre donc au pack,
tout en le gardant vendu en autonome à 49 €. Ce changement **inverse en partie**
la décision précédente (TRACFIN était volontairement hors pack, add-on).

## Décisions validées

1. **Pack inclut TRACFIN** : les détenteurs du pack (actuels et futurs) y accèdent.
2. **TRACFIN reste vendu 49 € en autonome** (pour les non-détenteurs du pack).
3. **TRACFIN compte dans la certification** : le diplôme passe de 42h à **45h**.
4. **Grandfather (mécanisme G1, par date d'achat)** : les clients dont l'achat du
   pack précède la date de bascule ne sont **jamais pénalisés** — leur certificat
   reste débloquable sur les 5 modules cœur (TRACFIN facultatif pour eux). Les
   nouveaux clients ont le seuil complet (TRACFIN requis).
5. Prix du pack **inchangé (299 €)** — TRACFIN est de la valeur ajoutée.

## Section 1 — Accès & catalogue

- `PACK_EXCLUDED_MODULES` → **vide** (le pack couvre TRACFIN). Accès des clients
  pack calculé via `hasPack` ⇒ **aucune migration de données** nécessaire.
- `MODULE_PRICE_OVERRIDES` conservé : TRACFIN 49 € à l'unité.
- `filterPurchasable` : un détenteur du pack ne peut plus racheter TRACFIN
  (déjà couvert) ; pack + TRACFIN au panier ⇒ TRACFIN « included_in_pack ».
  Un non-détenteur du pack achète TRACFIN seul à 49 €.
- Description du pack : « 7 modules · 45h ».

## Section 2 — Parcours & certification

- `STANDALONE_MODULE_SLUGS` → **vide** : TRACFIN réintègre `FORMATION_MODULES`
  (parcours, progression, tableau de bord).
- `BONUS_MODULE_SLUGS` → `["deontologie"]` : TRACFIN retiré ⇒ il compte dans la
  certification. `getCertifiedLessonCount()` = 40 − 4 (déontologie) = **36 leçons**
  (soit 45h certifiantes ; déontologie reste bonus hors 42h/45h).

## Section 3 — Grandfather (G1, par date d'achat)

- Constante `TRACFIN_PACK_CUTOFF` = date de déploiement (ex. `2026-07-07`).
- `isGrandfathered(user)` = l'abonnement pack (`user_subscriptions.created_at`,
  ligne `module_slug IS NULL`) est antérieur à `TRACFIN_PACK_CUTOFF`.
- Éligibilité au certificat :
  `nouveau_critère OU (isGrandfathered ET ancien_critère_cœur)`.
  - `nouveau_critère` : complétion sur le parcours complet (40 leçons) ≥ 80 %,
    ≥ 3 examens réussis, ≥ 42h suivies.
  - `ancien_critère_cœur` : complétion sur les 5 modules cœur (33 leçons) ≥ 80 %,
    même conditions examens/heures (TRACFIN non requis).
- Personne ne perd un certificat déjà obtenu ou déjà à portée.

## Section 4 — UI

- **Page d'accueil (catalogue)** : TRACFIN réintègre la grille normale des modules
  à l'unité (49 €). Suppression du bloc « Module autonome — hors pack ». Titre
  « modules à l'unité » → « à partir de 49 € ». Chiffres du pack : 7 modules / 45h.
- **Tableau de bord `/formation`** : TRACFIN réapparaît dans « VOTRE PARCOURS »
  (accessible au pack). Suppression de la section « Modules spécialisés ».
  `FORMATION_MODULES` réinclut TRACFIN (progression sur 40).

## Section 5 — Certificat, cohérence, tests

- `CertificateGenerator.tsx` : dénominateur = parcours complet (40) ; éligibilité
  avec la règle grandfather ci-dessus (lecture de `user_subscriptions.created_at`).
- Vérifier la cohérence des heures affichées (45h) sur l'attestation PDF et les
  emails (`AttestationPDF`, `resend.ts`) si elles dérivent du total.
- Tests :
  - `regression-existing-users.test.ts` : inverser les garanties (le pack ouvre
    TRACFIN ; TRACFIN dans le parcours) + conserver « aucun client actuel pénalisé ».
  - Nouveaux tests grandfather : client historique jamais bloqué ; nouveau client
    a TRACFIN requis pour le seuil complet.
  - Ajuster `entitlements`, `purchase`, `catalog`, `formation-journey` tests.
- Validation : `vitest` + `tsc --noEmit` + `next build`.

## Fichiers touchés (prévision)

`src/lib/entitlements.ts`, `src/data/course.ts`, `src/data/catalog.ts`,
`src/lib/purchase.ts`, `src/lib/formation-journey.ts`,
`src/components/certificate/CertificateGenerator.tsx`, `src/app/page.tsx`,
`src/app/formation/page.tsx`, `src/app/formation/[moduleSlug]/page.tsx`,
composants analytics (`ProgressOverview`, `DashboardAnalytics`,
`ModuleProgressBars`, `AdaptiveLearningPath`), attestation/email si nécessaire,
et les fichiers de tests correspondants.

## Hors périmètre

- Pas de changement de prix du pack.
- Pas de refonte du contenu des leçons TRACFIN (déjà livré).
- Pas de modification de la certification pour la déontologie (reste bonus).
