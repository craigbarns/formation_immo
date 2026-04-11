# Scripts utilitaires

## Validation des contenus LMS

Depuis la racine du projet `formation-immobiliere` :

```bash
node scripts/validate-course-content.mjs
```

Vérifie que chaque `scriptFile` déclaré dans `lms/src/data/course.ts` pointe vers un fichier existant. Avertit si un script fait moins d’environ 45 lignes (brouillon possible).

Guide rédactionnel : **`../guide-creer-contenu.md`**, gabarit : **`../templates/TEMPLATE-LECON-SCRIPT.md`**.

## Scripts vidéo → narration audio (TTS Mistral Voxtral)

Les scripts Markdown sous `module*/scripts/` restent la **référence pédagogique** (vidéo / production). Le texte lu à voix haute est extrait automatiquement :

```bash
# Depuis la racine formation-immobiliere/
node lms/scripts/extract-narration-for-audio.mjs
```

Cela génère pour chaque leçon un fichier `*.narration.txt` à côté du `.md` (sans supprimer les indications B-roll dans le MD d’origine).

Puis génération MP3 (clés `MISTRAL_API_KEY` et `MISTRAL_VOICE_ID` dans `lms/.env.local`) :

```bash
cd lms
node scripts/mistral-voxtral-tts.mjs --input ../module1-juridique/scripts/01-loi-alur-2026.narration.txt --out public/audio/01-loi-alur-2026.mp3
```

Dans `lms/src/data/course.ts`, renseigner `audioUrl: "/audio/01-loi-alur-2026.mp3"` sur la leçon concernée.

## Génération des fichiers Excel (.xlsx)

Depuis la racine du projet `formation-immobiliere` :

```bash
pip install -r requirements.txt
python3 scripts/generate_excel_templates.py
```

Fichiers créés ou mis à jour :

- `module1-juridique/templates/TABLEAU_MANDATS_COMPARATIF.xlsx`
- `module2-transaction/templates/GRILLE_ESTIMATION_COMPARATIVE.xlsx`
- `module2-transaction/templates/TEMPLATE_SUIVI_CLIENT.xlsx`
- `module3-financement/templates/SIMULATEUR_CREDIT.xlsx`
- `module3-financement/templates/TABLEAU_FISCALITE.xlsx`
- `module3-financement/templates/CALCUL_RENTABILITE.xlsx`
- `module4-marketing/templates/CALENDRIER_EDITORIAL_RESEAUX.xlsx`
- `module4-marketing/templates/TABLEAU_PERFORMANCE_KPIs.xlsx`

Les équivalents **Word** sont fournis en **Markdown** (`.md`) dans chaque dossier `templates/` — copier-coller dans Word ou exporter en PDF.
