# Spec — Formation autonome « Rénovation énergétique & photovoltaïque » (7h, 59 €)

**Date** : 2026-07-11
**Statut** : validé par Gregory (public : professionnels de l'immobilier ; durée : 7h STRICTES)

## Contexte

Nouvelle formation autonome sur le modèle exact de « Murs & fonds de commerce » (spec
2026-07-09), MAIS sans zip source : **tout le contenu est rédigé par Claude** (scripts,
examen, textes vitrine), avec les garde-fous de la section « Contenu » ci-dessous.

## Décisions produit (validées)

1. **Formation autonome** : 59 € à l'unité, PAS incluse au pack 299 €. Clients pack :
   verrouillée + achetable. Mécanisme : ajout du slug à `STANDALONE_MODULE_SLUGS`
   (source unique dans `course.ts`) — exclusion automatique de `FORMATION_MODULES`,
   du pack, de la certification et des chiffres vitrine/e-mails.
2. **Durée : 7h EXACTES** = 4 leçons × 105 min = 420 min (affichage carte + attestation
   7h + temps minimum anti-clic 3h30).
3. **Public** : professionnels de l'immobilier (agents, conseillers, gestionnaires) —
   angle « conseiller vos clients vendeurs, acquéreurs et bailleurs ».
4. **Narration audio Mistral** pour les 4 leçons (pipeline existant), nouvelle
   formatrice dédiée.
5. **Cover dédiée** générée avec OpenAI (maison rénovée avec panneaux solaires).
6. Aucune migration SQL.

## Identité

- **Slug** : `renovation-energetique`
- **Titre** : « Rénovation énergétique & photovoltaïque »
- **Summary** : « DPE, interdictions de location, travaux, MaPrimeRénov', CEE et solaire :
  conseiller vos clients sur la transition énergétique. »
- **Dossier contenu** : `module8-renovation-energetique/scripts/` (4 scripts .md au
  format existant : `### SCRIPT INTÉGRAL`, blocs `**NARRATION :**`, [B-ROLL…],
  [PAUSE Xs], fiche technique, cas pratique, références réglementaires)
- **Formatrice** : « Élodie Ferrand » — conseillère en rénovation énergétique,
  voix Mistral « Marie — Curious » (`e0580ce5-e63c-4cbe-88c8-a983b80c5f1f`,
  déjà utilisée par financement — réutilisation assumée comme juridique/déontologie).

## Les 4 leçons (105 min chacune)

| # | Slug | Titre | Difficulté |
|---|---|---|---|
| 1 | `dpe-cadre-reglementaire` | Le DPE & le cadre réglementaire | intermediaire |
| 2 | `solutions-techniques` | Les solutions techniques de rénovation | intermediaire |
| 3 | `aides-financement` | Les aides de l'État & le financement | avance |
| 4 | `photovoltaique` | Photovoltaïque — technique, rentabilité & démarches | avance |

Contenus par leçon (cas pratique chiffré inclus dans chaque script, ~1 400-1 600 mots
de narration par leçon) :

1. **DPE & cadre réglementaire** : méthode et classes du DPE opposable ; calendrier
   loi Climat & Résilience (gel des loyers, interdictions de location G/F/E) ; audit
   énergétique obligatoire à la vente ; mentions dans les annonces ; « valeur verte »
   et décote des passoires ; responsabilités de l'agent. *Cas pratique : vendre un
   appartement classé F à Lyon.*
2. **Solutions techniques** : enveloppe (combles, murs, planchers, menuiseries) ;
   ventilation ; chauffage (PAC, granulés, chauffe-eau thermodynamique) ; rénovation
   d'ampleur vs par gestes ; ordre des travaux ; coûts moyens et sauts de classes ;
   lire un devis, repérer les malfaçons. *Cas pratique : passer une maison de E à C.*
3. **Aides & financement** : MaPrimeRénov' (parcours par geste / rénovation d'ampleur,
   logique des plafonds par revenus) ; CEE ; éco-PTZ ; TVA réduite ; aides locales ;
   exonérations ; règles de cumul ; obligation RGE ; Mon Accompagnateur Rénov' ;
   interdiction du démarchage téléphonique et arnaques. *Cas pratique : plan de
   financement complet pour un couple primo-accédant.*
4. **Photovoltaïque** : technologies et dimensionnement ; autoconsommation avec/sans
   revente ; prime à l'autoconsommation et obligation d'achat ; démarches (déclaration
   préalable, Consuel, raccordement Enedis) ; rentabilité et temps de retour ; le
   solaire dans une transaction (transfert des contrats, impact DPE/valeur).
   *Cas pratique : étude de rentabilité d'une installation de 6 kWc.*

### Garde-fous contenu (aides = matière mouvante)

- Insister sur les **mécanismes** ; montants donnés en ordres de grandeur avec la
  mention « à jour début 2026 — vérifier sur france-renov.gouv.fr ».
- Encadré de renvoi officiel dans chaque leçon concernée (France Rénov', ANAH,
  photovoltaique.info, Enedis).
- Recommandation de relecture par un professionnel du secteur avant grosse promotion
  (rappelée à Gregory en fin de livraison).

## Architecture (copie du modèle murs-fonds réconcilié)

| Fichier | Changement |
|---|---|
| `lms/src/data/course.ts` | + module 8 (4 leçons, 420 min, audioUrl `/audio/0X-….mp3`) ; slug ajouté à `STANDALONE_MODULE_SLUGS` |
| `lms/src/data/exam-questions.ts` | + examen 15 questions ids `re1`…`re15` (rédigées, 3 niveaux, explications + références) |
| `lms/src/data/formateur-voices.json` + `module-avatars.ts` | + « Élodie Ferrand » (voix Marie Curious), accentColor `#15803d`, initiales EF |
| `lms/src/data/module-showcase.ts` | + entrée (badge « 🌞 », gradient `from-[#052e16] via-[#15803d] to-[#65a30d]`, 4 outcomes, 4 lessonTeaser) |
| `lms/src/components/gamification/ModuleTimeTracker.tsx` | grille 7 → 8 colonnes (`grid-cols-4 sm:grid-cols-8`), label « RÉNO. » |
| `lms/src/app/page.tsx` | slug dans `withCover` (cover `/generated/fal/renovation-energetique/cover.jpg`) |
| `lms/scripts/lib/script-discovery.mjs` + `lesson-mistral-voice.mjs` | + `module8-renovation-energetique` → slug |
| `lms/public/generated/fal/renovation-energetique/cover.jpg` | générée OpenAI (1024×576, style des covers existantes) |
| `lms/public/audio/0X-….mp3` ×4 | générés Mistral (pipeline `generate-all-lesson-audio.mjs --only`) |

### Ce qui suit automatiquement (zéro code)

Produit 59 € au catalogue, exclusion pack/certification/chiffres vitrine
(`STANDALONE_MODULE_SLUGS` = source unique), checkout invité, webhook, gating serveur,
attestation 7h + temps minimum, achat possible pour les clients pack (règles
`purchase.ts` déjà génériques).

## Tests

- `formation-journey.test.ts` : le module existe (4 leçons, 420 min) ; hors
  `FORMATION_MODULES` ; certification inchangée (36 leçons).
- `entitlements.test.ts` : pack ≠ accès `renovation-energetique` ; achat unitaire OK.
- `catalog.test.ts` : produit présent à 5 900 cents ; description pack inchangée.
- Suite complète + build + vérification navigateur (carte, cover, page leçon) avant push.

## Déploiement

Commits sur `claude/happy-rubin-0c67f3`, fast-forward `main` (fetch d'abord,
jamais de force-push). Vérification prod post-déploiement (carte, cover, audio, gating).
