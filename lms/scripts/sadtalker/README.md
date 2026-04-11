# SadTalker — exemple Module Marketing

## Dans l’app

- Page dédiée : **`/formation/exemple-sadtalker`** (iframe + lien vers Hugging Face).
- Leçon : **Module 4 → Démo — SadTalker** (`/formation/marketing/demo-sadtalker`).
- Après génération, déposez le fichier :  
  `lms/public/videos/sadtalker-exemple-marketing.mp4`  
  Puis dans `src/data/course.ts`, sur la leçon `demo-sadtalker`, vous pouvez renseigner  
  `videoUrl: "/videos/sadtalker-exemple-marketing.mp4"`.

## Générer la vidéo (interface web)

1. Ouvrir le [Space vinthony/SadTalker](https://huggingface.co/spaces/vinthony/SadTalker) (si en erreur de build, utiliser **Duplicate space** sur votre compte).
2. Uploader une **photo** (visage net) + un **audio** court (MP3/WAV).
3. Télécharger le MP4 et le placer comme ci-dessus.

## Inspecter l’API Gradio (Python)

```bash
cd lms/scripts
python3 -m venv .venv-sadtalker
source .venv-sadtalker/bin/activate
pip install -r sadtalker/requirements.txt
export HF_TOKEN=hf_votre_token
export SADTALKER_SPACE=vinthony/SadTalker
python sadtalker/inspect_space.py
```

Adaptez ensuite un script `predict(...)` selon la sortie de `view_api()` (chaque Space peut différer).
