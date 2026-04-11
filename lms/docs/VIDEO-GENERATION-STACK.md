# Stack de Génération Vidéo - Formation Immobilière

Système complet de génération de contenu vidéo basé sur le stack **easegen-front** pour la formation immobilière 42h.

## 🎬 Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                    PIPELINE VIDÉO                              │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  📄 Script Markdown                                            │
│       │                                                        │
│       ▼                                                        │
│  🎙️  Coqui XTTS ──► Voix synthétique clonée                  │
│       │                                                        │
│       ▼                                                        │
│  🎭 SadTalker ────► Avatar parlant synchronisé               │
│       │                                                        │
│       ▼                                                        │
│  📝 WhisperX ─────► Sous-titres SRT/VTT                      │
│       │                                                        │
│       ▼                                                        │
│  🎨 Remotion ─────► Slides animés (mandat, compromis...)    │
│       │                                                        │
│       ▼                                                        │
│  🎞️  Montage Final ──► Vidéo de leçon prête                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## 🚀 Composants Intégrés

### 1. HeyGen LiveAvatar (Chat en direct)

**Coach Marie** - Avatar conversationnel en temps réel.

```tsx
import { LiveAvatarModal } from "@/components/LiveAvatarModal";

<LiveAvatarModal 
  isOpen={true}
  onClose={() => {}}
  moduleSlug="juridique"
  lessonSlug="mandat"
/>
```

**Configuration requise:**
```bash
# .env.local
LIVEAVATAR_API_KEY=your_api_key
LIVEAVATAR_ALUR_CONTEXT_ID=your_context_id
```

---

### 2. Coqui XTTS (Voix)

Clonage vocal haute qualité avec seulement 6 secondes d'audio de référence.

**Voix disponibles:**
| Voix | Persona | Usage |
|------|---------|-------|
| `marie` | Coach pédagogique chaleureuse | Présentations, intro |
| `pierre` | Formateur juridique sérieux | Module ALUR, lois |
| `sophie` | Formatrice marketing dynamique | Prospection, négociation |

**Génération:**
```bash
node scripts/voice/xtts-generate.mjs \
  --text="Bonjour, bienvenue dans cette formation immobilière." \
  --speaker=marie \
  --output=intro.mp3
```

**Installation serveur XTTS:**
```bash
pip install TTS
python -m TTS.server.server \
  --model_name tts_models/multilingual/multi-dataset/xtts_v2 \
  --port 5000
```

---

### 3. SadTalker (Avatar Parlant)

Synchronisation labiale réaliste à partir d'une photo et d'un audio.

**Composant React:**
```tsx
import { SadTalkerAvatar } from "@/components/avatars/SadTalkerAvatar";

<SadTalkerAvatar
  imageUrl="/avatars/marie.jpg"
  audioUrl="/audio/lesson-1.mp3"
  videoUrl="/videos/avatar-lesson-1.mp4"
  transcript="Bonjour, aujourd'hui nous allons..."
  mode="video" // "video" | "canvas" | "split"
/>
```

**Modes de rendu:**
- `video` : Vidéo MP4 pré-générée (meilleure qualité)
- `canvas` : Animation canvas temps réel (fallback)
- `split` : Audio séparé + image statique

---

### 4. WhisperX (Sous-titres)

Transcription automatique avec alignement mot-à-mot.

**Génération:**
```bash
node scripts/subtitles/whisperx-generate.mjs \
  --video=lessons/lecon1.mp4 \
  --lang=fr \
  --format=srt
```

**Formats supportés:**
- `srt` - SubRip (standard)
- `vtt` - WebVTT (web)
- `json` - Avec timestamps
- `txt` - Texte brut

**Composant React:**
```tsx
import { VideoWithSubtitles } from "@/components/VideoWithSubtitles";

<VideoWithSubtitles
  src="/videos/lecon1.mp4"
  srtUrl="/subtitles/lecon1.srt"
  vttUrl="/subtitles/lecon1.vtt"
/>
```

---

### 5. Remotion (Slides Animées)

Templates vidéo programmables pour les documents immobiliers.

**Templates disponibles:**

| Template | Contenu | Durée |
|----------|---------|-------|
| `MandatSlide` | Animation mandat de vente avec signatures | 10s |
| `EstimationGraph` | Graphique comparables dynamique | 12s |
| `CompromisSigning` | Cérémonie de signature du compromis | 16s |

**Rendu:**
```bash
cd ../video-tools/remotion
npm install
npm run render:mandat
npm run render:estimation
npm run render:compromis
```

---

### 6. QuestGen-AI (Quiz Automatiques)

Génération de QCM depuis les scripts de leçons.

**Génération:**
```bash
node scripts/quiz/questgen-generate.mjs \
  --module=juridique \
  --count=10
```

---

## 📁 Structure des Fichiers

```
lms/
├── src/
│   ├── components/
│   │   ├── VideoWithSubtitles.tsx      # Lecteur vidéo + sous-titres
│   │   ├── avatars/
│   │   │   └── SadTalkerAvatar.tsx     # Avatar parlant
│   │   └── coach/
│   │       └── FrenchCoach.tsx         # Coach Marie (HeyGen)
│   └── lib/
│       ├── liveavatar.ts               # API HeyGen
│       └── utils.ts                    # Utilitaires
│
├── scripts/
│   ├── voice/
│   │   └── xtts-generate.mjs           # CLI génération voix
│   ├── subtitles/
│   │   └── whisperx-generate.mjs       # CLI sous-titres
│   └── quiz/
│       └── questgen-generate.mjs       # CLI quiz auto
│
├── public/
│   ├── audio/
│   │   ├── speakers/                   # Références voix (wav)
│   │   └── generated/                  # Voix générées (mp3)
│   ├── videos/
│   │   ├── avatars/                    # Vidéos SadTalker
│   │   └── lessons/                    # Vidéos de leçons
│   └── subtitles/                      # Fichiers SRT/VTT
│
└── docs/
    ├── EASEGEN-INTEGRATION.md          # Doc technique complète
    └── VIDEO-GENERATION-STACK.md       # Ce fichier

video-tools/
└── remotion/
    └── src/
        └── templates/                  # Templates Remotion
```

## 🔧 Installation Complète

### Prérequis

- Node.js 18+
- Python 3.9+
- FFmpeg
- GPU NVIDIA recommandé (pour SadTalker/WhisperX)

### 1. LMS Next.js

```bash
cd lms
npm install
npm run build
npm start
```

### 2. Serveur XTTS (Voix)

```bash
python -m venv venv-xtts
source venv-xtts/bin/activate
pip install TTS
python -m TTS.server.server --model_name tts_models/multilingual/multi-dataset/xtts_v2
```

### 3. WhisperX (Sous-titres)

```bash
pip install whisperx
```

### 4. Remotion (Slides)

```bash
cd video-tools/remotion
npm install
```

## 🎬 Workflow de Production

### Manuel (Développement)

```bash
# 1. Écrire le script dans moduleX-XXX/scripts/

# 2. Générer la voix
node lms/scripts/voice/xtts-generate.mjs \
  --speaker=marie \
  --text="Votre script ici..."

# 3. Générer l'avatar (optionnel, besoin de SadTalker)
# python SadTalker/inference.py --driven_audio audio.wav --source_image avatar.jpg

# 4. Générer les sous-titres
node lms/scripts/subtitles/whisperx-generate.mjs \
  --video=audio.mp3

# 5. Générer les slides
# cd video-tools/remotion && npm run render:mandat
```

### Automatisé (Production)

```bash
# Script complet (à créer selon besoins)
./scripts/pipeline/generate-lesson.sh \
  --script=module1-juridique/scripts/mandat.md \
  --speaker=marie \
  --template=mandat \
  --output=lecon-mandat
```

## 🌐 Intégration Web

### Page de Leçon avec Vidéo

```tsx
// app/formation/[module]/[lesson]/page.tsx
import { VideoWithSubtitles } from "@/components/VideoWithSubtitles";
import { SadTalkerAvatar } from "@/components/avatars/SadTalkerAvatar";

export default function LessonPage({ params }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Vidéo principale */}
      <div className="lg:col-span-2">
        <VideoWithSubtitles
          src="/videos/lessons/mandat.mp4"
          srtUrl="/subtitles/mandat.srt"
        />
      </div>
      
      {/* Avatar interactif */}
      <div className="hidden lg:block">
        <SadTalkerAvatar
          imageUrl="/avatars/marie.jpg"
          audioUrl="/audio/lessons/mandat.mp3"
          mode="canvas"
          className="sticky top-4"
        />
      </div>
    </div>
  );
}
```

## 📊 Roadmap

### Phase 1: MVP ✅
- [x] HeyGen LiveAvatar (Coach Marie)
- [x] Scripts CLI XTTS, WhisperX
- [x] Composants React (SadTalker, VideoPlayer)
- [x] Templates Remotion de base

### Phase 2: Pipeline ⏳
- [ ] API `/api/video/generate`
- [ ] Queue de rendu (Bull/Redis)
- [ ] Interface admin de génération
- [ ] Prévisualisation en temps réel

### Phase 3: Scale ⏳
- [ ] GPU cloud (RunPod)
- [ ] CDN vidéo
- [ ] Cache et optimisation
- [ ] Analytics visionnage

### Phase 4: IA Avancée ⏳
- [ ] Génération script auto (GPT-4)
- [ ] Adaptation personnalisée élève
- [ ] Multi-avatars conversation
- [ ] Quiz générés automatiquement

## 📚 Ressources

| Outil | Documentation | GitHub |
|-------|--------------|--------|
| Coqui XTTS | [docs.coqui.ai](https://docs.coqui.ai) | [coqui-ai/TTS](https://github.com/coqui-ai/TTS) |
| SadTalker | [OpenTalker.github.io](https://opentalker.github.io) | [OpenTalker/SadTalker](https://github.com/OpenTalker/SadTalker) |
| WhisperX | [m-bain.github.io](https://m-bain.github.io) | [m-bain/whisperX](https://github.com/m-bain/whisperX) |
| Remotion | [remotion.dev](https://remotion.dev) | [remotion-dev/remotion](https://github.com/remotion-dev/remotion) |
| HeyGen | [docs.heygen.com](https://docs.heygen.com) | - |

---

**Formation Immobilière 42h** - Stack vidéo professionnel pour la formation ALUR
