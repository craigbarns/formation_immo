# Intégration D-ID avec les scripts vocaux (formation immobilière)

Ce dépôt ne dépend plus de HeyGen / LiveAvatar. La production vidéo repose sur **vos scripts Markdown** (dossiers `module*/scripts/`), un **TTS** pour l’audio, puis **D-ID** pour animer une photo d’avatar (Talking Photo) ou un avatar studio.

## Chaîne de production recommandée

1. **Script**  
   Rédigez ou exportez le texte depuis les fichiers `*.md` des modules (sections parlées, sans les titres de mise en forme si vous préférez).

2. **Audio (TTS)**  
   - **Mistral Voxtral** : voir `lms/README.md` — `node scripts/mistral-voxtral-tts.mjs` avec un fichier texte, sortie `public/audio/...mp3`.  
   - **ElevenLabs** : voix listées dans `src/data/formateur-voices.json` ; échantillons via `npm run elevenlabs:samples`.  
   Gardez la **même voix** pour toutes les vidéos d’un même formateur / module pour la cohérence avec les avatars D-ID.

3. **D-ID**  
   - **Studio** : importez l’audio + choisissez l’image de présentateur (photo conforme aux droits).  
   - **API** : Basic Auth `DID_API_USER` / `DID_API_SECRET` (voir `.env.local.example`). Des scripts d’exemple existent déjà dans `lms/scripts/` (`did-test.mjs`, `did-generate-lesson-01.mjs` — voir README).

4. **Hébergement**  
   Les URLs MP4 renvoyées par l’API sont souvent **temporaires**. Téléchargez le fichier ou hébergez-le (S3, CDN, YouTube non listé), puis renseignez une **URL stable** dans `src/data/course.ts` (`videoUrl` sur la leçon).

5. **Dans le LMS**  
   Le lecteur vidéo des leçons utilise `videoUrl`. Les **beats** et **questions** par leçon (pour la prod et le coach texte) sont centralisés dans `src/data/lesson-avatar-scripts.ts` ; la page `/formation/interactive-avatar` montre le même type de bloc qu’une leçon configurée.

## Scripts courts vs long métrage

- Pour limiter les crédits D-ID, **découpez** les longs scripts en segments (comme les `scriptBeats` dans `lesson-avatar-scripts.ts`), générez une vidéo par segment, puis **assemblez** dans un éditeur vidéo si besoin.  
- Les beats correspondent aux phrases « à dire » par l’avatar : copier-coller dans le TTS, puis utiliser le MP3 comme piste audio dans D-ID.

## Coach texte (sans vidéo)

Le widget **FrenchCoach** (shell formation) reste disponible pour des réponses immédiates en français ; les `suggestedQuestions` du fichier `lesson-avatar-scripts.ts` sont pensées pour être collées dans ce chat.

## Références

- [D-ID API](https://docs.d-id.com/)  
- README du projet : section « Génération D-ID » et narration Mistral.
