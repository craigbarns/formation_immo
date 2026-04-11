# Intégration Stack EaseGen-Front

Ce document détaille l'intégration du stack de génération de contenu vidéo basé sur easegen-front pour la formation immobilière 42h.

## Architecture Globale

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              LMS Next.js 16                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │  HeyGen Live │  │ SadTalker    │  │ Coqui XTTS   │  │ Remotion     │    │
│  │  Avatar      │  │ Avatar       │  │ Voix         │  │ Slides       │    │
│  │  (Chat)      │  │  (Vidéos)    │  │ (Clonage)    │  │ (Animés)     │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
│         │                 │                 │                 │             │
│         └─────────────────┴─────────────────┴─────────────────┘             │
│                                    │                                        │
│                         ┌──────────┴──────────┐                            │
│                         │  Video Pipeline API   │                            │
│                         │  /api/video/generate  │                            │
│                         └───────────────────────┘                            │
│                                    │                                        │
│                              ┌─────┴─────┐                                  │
│                              │  Storage  │                                  │
│                              │  /public/ │                                  │
│                              └───────────┘                                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Composants Développés

### 1. HeyGen LiveAvatar (Chat Coach Marie)

**Fichiers:**
- `src/lib/liveavatar.ts` - API client
- `src/components/LiveAvatar.tsx` - Composant React
- `src/components/LiveAvatarModal.tsx` - Modal overlay

**Configuration:**
```bash
# .env.local
LIVEAVATAR_API_KEY=votre_cle_api
LIVEAVATAR_ALUR_CONTEXT_ID=context_id_alur
```

**Usage:**
```tsx
<LiveAvatarModal 
  isOpen={showCoach}
  onClose={() => setShowCoach(false)}
  moduleSlug="juridique"
  lessonSlug="mandat"
/>
```

### 2. Coqui XTTS (Génération Voix)

**Fichiers:**
- `scripts/voice/xtts-generate.mjs` - CLI génération

**Voix disponibles:**
| Voix | Description | Fichier référence |
|------|-------------|-------------------|
| marie | Coach pédagogique | `marie-reference.wav` |
| pierre | Formateur juridique | `pierre-reference.wav` |
| sophie | Formatrice marketing | `sophie-reference.wav` |

**Installation XTTS:**
```bash
# Créer environnement Python
python -m venv venv-xtts
source venv-xtts/bin/activate

# Installer TTS
pip install TTS

# Télécharger le modèle XTTS v2
tts --model_name tts_models/multilingual/multi-dataset/xtts_v2 \
    --text "Test" \
    --speaker_wav reference.wav \
    --language_idx fr

# Démarrer le serveur API
python -m TTS.server.server \
    --model_name tts_models/multilingual/multi-dataset/xtts_v2 \
    --port 5000
```

**Génération voix:**
```bash
node scripts/voice/xtts-generate.mjs \
  --text="Bonjour, je suis Marie votre coach immobilier." \
  --speaker=marie \
  --output=intro-marie.mp3
```

### 3. SadTalker (Avatar Parlant)

**Fichiers:**
- `src/components/avatars/SadTalkerAvatar.tsx` - Composant React

**Installation SadTalker:**
```bash
git clone https://github.com/OpenTalker/SadTalker.git
cd SadTalker
pip install -r requirements.txt

# Télécharger les checkpoints
bash scripts/download_models.sh
```

**Génération vidéo avatar:**
```bash
python inference.py \
  --driven_audio audio/marie-voice.wav \
  --source_image images/marie-photo.jpg \
  --result_dir output/ \
  --still \
  --preprocess full \
  --enhancer gfpgan
```

**Composant React:**
```tsx
<SadTalkerAvatar
  imageUrl="/avatars/marie.jpg"
  audioUrl="/audio/lesson-1.mp3"
  videoUrl="/videos/avatar/marie-lesson-1.mp4"
  transcript="Bonjour, dans cette leçon nous allons..."
  mode="video"
/>
```

### 4. WhisperX (Sous-titres)

**Fichiers:**
- `scripts/subtitles/whisperx-generate.mjs` - CLI génération
- `src/components/VideoWithSubtitles.tsx` - Lecteur vidéo avec sous-titres

**Installation WhisperX:**
```bash
pip install whisperx
```

**Génération sous-titres:**
```bash
node scripts/subtitles/whisperx-generate.mjs \
  --video=videos/lecon1.mp4 \
  --lang=fr \
  --format=srt
```

### 5. Remotion (Slides Animées)

**Fichiers:**
- `scripts/remotion/` - Projet Remotion complet

**Templates disponibles:**

| Template | Description | Durée |
|----------|-------------|-------|
| MandatSlide | Animation mandat de vente | 10s |
| EstimationGraph | Graphique comparables | 12s |
| CompromisSigning | Cérémonie signature | 16s |

**Rendu templates:**
```bash
cd scripts/remotion
npm run render:mandat
npm run render:estimation
npm run render:compromis
```

## Roadmap

### Phase 1: MVP (Actuel)
- ✅ HeyGen LiveAvatar intégré
- ✅ Scripts CLI pour XTTS, WhisperX
- ✅ Templates Remotion de base
- ✅ Lecteur vidéo avec sous-titres

### Phase 2: Pipeline Automatisé
- [ ] API `/api/video/generate` complète
- [ ] Queue de génération (Bull/Redis)
- [ ] Interface admin de génération

### Phase 3: Production Scale
- [ ] GPU cloud (RunPod/Vast.ai)
- [ ] Cache CDN pour vidéos
- [ ] Analytics de visionnage

## Ressources

- **Coqui XTTS:** https://github.com/coqui-ai/TTS
- **SadTalker:** https://github.com/OpenTalker/SadTalker
- **WhisperX:** https://github.com/m-bain/whisperX
- **Remotion:** https://www.remotion.dev
- **HeyGen API:** https://docs.heygen.com
