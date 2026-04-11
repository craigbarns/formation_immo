# Créer et maintenir le contenu de la formation

Ce dépôt est déjà structuré (5 modules × 5 leçons, QCM, cas pratiques, templates). Ce guide fixe **la chaîne de travail** et les **outils** pour produire ou enrichir le contenu sans se perdre.

---

## 1. Principe : pédagogie d’abord, technique ensuite


| Étape                          | Livrable                        | Où c’est dans le dépôt                                                                        |
| ------------------------------ | ------------------------------- | --------------------------------------------------------------------------------------------- |
| **Cadre**                      | Objectifs, durées, évaluation   | `plan-pedagogique/PLAN_PEDAGOGIQUE_GLOBAL.md`, `plan-pedagogique/module*-plan-pedagogique.md` |
| **Cours écrit / script vidéo** | Markdown par leçon              | `module*/scripts/*.md`                                                                        |
| **Affichage LMS**              | Lecture des `.md` dans Next.js  | `lms/src/data/course.ts` → champ `scriptFile`                                                 |
| **Parcours interactif**        | Vidéo → choix → QCM (sans SaaS) | `lms/src/data/interactive-scenarios.ts` + `interactiveScenarioId` sur la leçon                |
| **Support élève**              | Vue d’ensemble                  | `guide-eleve/guide-eleve-complet.md`                                                          |
| **Évaluation**                 | QCM + cas                       | `module*/qcm/*.md`, `evaluation/cas-pratique-module-*.md`                                     |
| **Outils terrain**             | Fiches, grilles                 | `module*/templates/*.md` (+ Excel générés, voir ci-dessous)                                   |
| **Vidéo**                      | MP4 / YouTube                   | `lms/public/videos/` ou URL dans `course.ts` → `videoUrl`                                     |
| **Vidéo avatar (D-ID)**        | Script → TTS → D-ID → MP4       | `lms/docs/D-ID-INTEGRATION.md`, `lesson-avatar-scripts.ts`, `videoUrl` dans `course.ts`        |


Toute nouvelle leçon doit toucher au minimum : **un fichier dans `module*/scripts/`** + **une entrée dans `lms/src/data/course.ts`**.

---

## 2. Outils recommandés (par usage)


| Besoin                             | Outil                                                   | Comment l’utiliser ici                                                               |
| ---------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Rédaction structurée               | **Markdown** (Cursor, VS Code, Obsidian)                | Éditer les `scripts/*.md` ; prévisualiser via le LMS (`npm run dev` dans `lms/`)     |
| Cohérence du parcours              | `**course.ts`**                                         | Titres, slugs URL, chemins `scriptFile`, `videoUrl`, `audioUrl`                      |
| Vérifier que rien ne manque        | `**node scripts/validate-course-content.mjs`**          | Depuis la racine du dépôt (voir `scripts/README.md`)                                 |
| Tableurs pédagogiques              | **Python**                                              | `pip install -r requirements.txt` puis `python3 scripts/generate_excel_templates.py` |
| Vidéo avatar / voix                | **D-ID**, **Synthesia**, **ElevenLabs** (selon scripts) | Scripts prêts dans `module*/scripts/` (sections narration + repères B-roll)          |
| Démo interactive loi               | **LiveAvatar**                                          | Clé + contexte ALUR, section sous la leçon dans le LMS                               |
| Parcours à branches / QCM intégrés | **Next.js** (composant maison)                          | `InteractiveScenario` + scénarios dans `interactive-scenarios.ts`                    |
| Images IA                          | **Midjourney** / équivalent                             | Prompts dans `module*/visuels/`                                                      |


---

## 3. Ajouter ou réécrire une leçon (checklist)

1. Dupliquer `**templates/TEMPLATE-LECON-SCRIPT.md`** vers le bon dossier, ex. `module2-transaction/scripts/06-nouvelle-lecon.md`.
2. Remplir : objectifs, durée cible, **script narration** (ou structure article si vous préférez un cours lisible sans tout le cinéma B-roll).
3. Enregistrer le fichier avec un nom cohérent avec les autres scripts du module.
4. Ouvrir `**lms/src/data/course.ts`** : ajouter un objet `Lesson` dans le bon module (`slug`, `title`, `scriptFile`, `videoUrl`, options).
5. **Parcours interactif** : dupliquer un scénario dans `**lms/src/data/interactive-scenarios.ts`**, puis `**interactiveScenarioId`** sur la leçon (ex. démo `honoraires-alur-demo`, URL `/formation/juridique/parcours-interactif`).
6. Lancer `**node scripts/validate-course-content.mjs**` puis `**cd lms && npm run build**` pour valider les chemins.
7. (Option) Ajouter des questions dans `**module*/qcm/module*-qcm.md**` et un cas dans `**evaluation/**` si la leçon ouvre un nouveau thème d’évaluation.
8. (Option) `**videoUrl**` : fichier dans `lms/public/videos/` ou lien YouTube/Vimeo.

---

## 4. Fichiers à ne pas oublier

- **Mot de passe / secrets** : uniquement dans `lms/.env.local` (jamais commité).
- **Attestation** : modèle dans `certification/MODELE-ATTESTATION.md`.
- **Page vente** : `marketing/PAGE-VENTE-FORMATION-42H.md`.

---

## 5. Rythme de production réaliste

- **Une leçon** : objectifs + script principal (cœur du texte) en premier ; fiches et QCM ensuite.
- **Juridique / chiffres** : une passe « sources » (Légifrance, textes en vigueur) avant publication grand public.
- **Vidéos** : privilégier des scripts découpés en **blocs de 5–10 minutes** pour faciliter tournage ou génération IA.

Pour toute évolution majeure du plan (nouveau module, renommage), mettre à jour `**plan-pedagogique/`** en même temps que `course.ts` pour rester aligné avec les livrables réglementaires ou commerciaux.