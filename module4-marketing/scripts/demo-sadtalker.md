# Démo — SadTalker (avatar parlant)

## Objectif pédagogique

Comprendre comment produire une **vidéo** à partir d’une **photo** et d’une **piste audio** (comme vos MP3 de formation) avec **SadTalker** sur Hugging Face, puis où placer le fichier dans le projet.

## Déroulé

1. Ouvrez la **page d’exemple** dédiée (lien ci-dessous) : interface Hugging Face intégrée et consignes.
2. Téléchargez un portrait net (droits d’utilisation OK) et une piste audio courte (ex. un extrait de narration du module Marketing).
3. Générez la vidéo sur le Space ou avec le script Python fourni (`lms/scripts/sadtalker/`).
4. Déposez le MP4 sous `lms/public/videos/sadtalker-exemple-marketing.mp4`, puis ajoutez `videoUrl: "/videos/sadtalker-exemple-marketing.mp4"` sur cette leçon dans `course.ts`. Script d’inspection API : `lms/scripts/sadtalker/inspect_space.py`.

---

### 🎬 SCRIPT COMPLET

Bienvenue dans cette démonstration. SadTalker transforme une photo fixe et un fichier audio en une courte vidéo où le visage suit la parole. C’est idéal pour illustrer vos scripts de formation sans tourner une vraie vidéo en studio. Suivez les étapes sur la page dédiée : vous y trouverez le cadre Hugging Face, les prérequis et le script de génération optionnel. Une fois le fichier MP4 en place dans le dossier public du LMS, vous pourrez l’associer à cette leçon via le champ vidéo du cours.

---

## 📚 Références

- Page d’exemple dans l’app : `/formation/exemple-sadtalker`
- Script : `lms/scripts/sadtalker/`
