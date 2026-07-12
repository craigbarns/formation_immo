# Spec — Formation autonome « Immobilier & intelligence artificielle » (7h, 59 €)

**Date** : 2026-07-12
**Statut** : validé par Gregory (« OUI VAS Y ») — modèle exact des formations
Murs & Fonds (2026-07-09) et Rénovation énergétique (2026-07-11).

## Décisions produit

1. **Formation autonome** : 59 €, hors pack, hors certification — via `STANDALONE_MODULE_SLUGS`
   (source unique, `course.ts`). Clients pack : verrouillée + achetable.
2. **Durée : 7h EXACTES** = 4 leçons × 105 min = 420 min.
3. **Public** : professionnels de l'immobilier. Angle : utiliser l'IA au quotidien
   pour gagner du temps et vendre plus, sans risque juridique.
4. **Contenu rédigé par Claude** (domaine natif — précision maximale ; leçon 4
   juridique à faire relire par prudence).
5. Narration audio Mistral, cover générée OpenAI, aucune migration SQL.

## Identité

- **Slug** : `immobilier-ia` — **Titre** : « Immobilier & intelligence artificielle »
- **Summary** : « ChatGPT, estimation, annonces, RGPD : mettre l'IA au service de
  votre activité immobilière — efficacement et légalement. »
- **Dossier** : `module9-immobilier-ia/scripts/` (format : `### SCRIPT INTÉGRAL`,
  blocs `**NARRATION :**`, [B-ROLL…], [PAUSE Xs], cas pratique, références)
- **Formatrice** : « Clara Morel », consultante IA & immobilier — voix Mistral
  « Marie — Happy » (`49d024dd-981b-4462-bb17-74d381eb8fd7`, réutilisation assumée).
- **Couleurs** : accent `#6d28d9`, badge « 🤖 », gradient
  `from-[#1e1b4b] via-[#5b21b6] to-[#8b5cf6]`, label widget « IA ».

## Les 4 leçons (105 min chacune)

| # | Slug | Titre | Difficulté |
|---|---|---|---|
| 1 | `comprendre-ia` | Comprendre l'IA sans jargon | debutant |
| 2 | `rediger-vendre-ia` | Rédiger et vendre avec l'IA | intermediaire |
| 3 | `ia-transaction` | L'IA dans la transaction | intermediaire |
| 4 | `cadre-legal-ia` | Le cadre légal et les pièges | avance |

1. **Comprendre l'IA sans jargon** — ce qu'est une IA générative (modèles de
   langage, entraînement, prédiction de texte, expliqué simplement) ; forces
   (rédaction, synthèse, reformulation, traduction) et faiblesses (hallucinations,
   chiffres inventés, données périmées) ; règle d'or « l'IA propose, le pro
   dispose » ; panorama des usages immobiliers ; choisir ses outils, versions
   gratuites vs payantes. *Cas pratique : une matinée d'agence avant/après IA.*
2. **Rédiger et vendre avec l'IA** — la méthode de prompt CRTE (Contexte, Rôle,
   Tâche, Exemple) ; annonces différenciantes (structure, storytelling, mots
   interdits) ; e-mails de prospection et relances personnalisés ; posts réseaux
   sociaux et calendrier éditorial ; traduction multilingue pour clientèle
   étrangère ; garder SON ton. *Cas pratique : annonce banale → annonce premium.*
3. **L'IA dans la transaction** — estimations automatisées : comment ça marche,
   ce que ça vaut, pourquoi l'expertise humaine reste décisive ; analyse de
   documents longs (PV d'AG, baux, diagnostics) : méthode et vérifications ;
   comptes-rendus de visite dictés ; préparation de rendez-vous vendeur (dossier
   marché en 15 min) ; automatisations CRM simples. *Cas pratique : PV d'AG de
   40 pages dépouillé en 10 minutes, pièges compris.*
4. **Le cadre légal et les pièges** — RGPD : jamais de données clients dans un
   outil grand public, bases légales, droits des personnes, réflexes d'agence ;
   AI Act européen : calendrier et obligations pratiques pour un utilisateur
   professionnel ; biais et discrimination : l'IA peut faire discriminer sans
   intention (rappel des 25 critères, lien module déontologie) ; images générées
   ou retouchées dans les annonces : obligation de loyauté, home staging virtuel
   à mentionner ; responsabilité : qui répond d'une erreur de l'IA ; charte IA
   d'agence en 8 points. *Cas pratique : audit d'une agence fictive qui fait
   tout mal.*

### Garde-fous contenu

- Outils et tarifs cités en ordres de grandeur « début 2026 » (le marché bouge vite) ;
  privilégier les méthodes réutilisables aux modes d'emploi d'outils précis.
- Leçon 4 : recommander la relecture par un juriste avant grosse promotion.
- Aucune promesse chiffrée de productivité non sourcée.

## Architecture (copie du modèle réconcilié)

| Fichier | Changement |
|---|---|
| `lms/src/data/course.ts` | + module 9 (4 leçons, 420 min, audioUrl `/audio/0X-….mp3`) ; slug dans `STANDALONE_MODULE_SLUGS` |
| `lms/src/data/exam-questions.ts` | + examen 15 questions ids `ia1`…`ia15`, duration 20 |
| `lms/src/data/formateur-voices.json` + `module-avatars.ts` | + « Clara Morel » (Marie Happy), accent `#6d28d9`, initiales CM |
| `lms/src/data/module-showcase.ts` | + entrée (badge 🤖, gradient violet, 4 outcomes, 4 teasers) |
| `lms/src/components/gamification/ModuleTimeTracker.tsx` | grille → `grid-cols-5 sm:grid-cols-10`, label « IA » |
| `lms/src/app/page.tsx` | slug dans `withCover` |
| `lms/scripts/lib/script-discovery.mjs` + `lesson-mistral-voice.mjs` | + `module9-immobilier-ia` → slug |
| `lms/public/generated/fal/immobilier-ia/cover.jpg` | générée OpenAI (1024×576) |
| `lms/public/audio/0X-….mp3` ×4 | générés Mistral (`--only`, pauses anti rate-limit) |

Suivent automatiquement : produit 59 € au catalogue, exclusion pack/cert/chiffres
vitrine, checkout invité, webhook, gating serveur, attestation 7h + temps minimum.
Grâce au correctif `outputFileTracingExcludes`, les nouveaux MP3 ne menacent plus
la limite Netlify.

## Tests

- `formation-journey.test.ts` : module présent (4 leçons, 420 min), hors
  `FORMATION_MODULES`, certification inchangée (36).
- `entitlements.test.ts` : pack ≠ accès ; achat unitaire OK.
- `catalog.test.ts` : produit 5 900 cents, `PACK_EXCLUDED_MODULES` contient le slug.
- Suite complète + build + vérification prod (carte, cover, audio, gating, checkout).

## Déploiement

Commits sur `claude/happy-rubin-0c67f3`, fast-forward `main`. Netlify (site public)
ET Vercel (app) rebuidlent depuis main ; vérification des deux après push.
