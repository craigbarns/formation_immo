# Audio des leçons (`public/audio/`)

Chaque fichier **`<stem>.mp3`** (même nom que le `.md` sans extension) correspond au script de la leçon, ex. `01-loi-alur-2026.md` → `01-loi-alur-2026.mp3`. L’app résout l’URL dans `src/lib/lesson-audio.ts`.

## Chaîne de génération

1. **Texte** — depuis la racine `formation-immobiliere/` :

   ```bash
   node lms/scripts/extract-narration-for-audio.mjs
   ```

   Cela produit des `*.narration.txt` à côté des scripts.

2. **MP3** — même répertoire :

   ```bash
   node lms/scripts/generate-all-lesson-audio.mjs
   node lms/scripts/generate-all-lesson-audio.mjs --only 01-loi-alur-2026
   ```

   - **Mistral Voxtral** si `MISTRAL_API_KEY` et `MISTRAL_VOICE_ID` sont dans `lms/.env.local`.
   - Sinon **macOS** : `say` + `ffmpeg` (voir variable `LESSON_TTS_VOICE`).

3. **TTS unitaire** (test ou extrait) :

   ```bash
   node lms/scripts/mistral-voxtral-tts.mjs --out lms/public/audio/test.mp3 --input fichier.txt
   ```

## Implémentation (scripts)

| Fichier | Rôle |
|--------|------|
| `scripts/generate-all-lesson-audio.mjs` | Point d’entrée batch |
| `scripts/mistral-voxtral-tts.mjs` | Point d’entrée fichier / `--text` |
| `scripts/lib/mistral-tts.mjs` | Appels API + découpage + concat |
| `scripts/lib/tts-chunk.mjs` | Nettoyage texte + découpe par paragraphes |
| `scripts/lib/ffmpeg-mp3.mjs` | Concat MP3 (ré-encodage) |
| `scripts/lib/narration-from-md.mjs` | Lecture `.narration.txt` ou script MD |
| `scripts/lib/script-discovery.mjs` | Liste des `module*/scripts/*.md` |
| `scripts/lib/env-local.mjs` | Chargement `.env.local` |

Option : `MISTRAL_TTS_MAX_CHARS` (défaut 5200) pour la taille max d’un segment API.
