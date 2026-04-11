# Scripts Stack Simple

Workflow rapide pour production de contenu formation.

## 🚀 Quick Start

### 1. Générer la voix (ElevenLabs ou XTTS)
```bash
# Option A: ElevenLabs (qualité pro)
export ELEVENLABS_API_KEY=xxx
node scripts/simple/elevenlabs-generate.mjs --text="Votre script"

# Option B: XTTS local (gratuit)
python -m TTS.server.server
node scripts/voice/xtts-generate.mjs --text="Votre script" --speaker=marie
```

### 2. Créer l'avatar parlant (D-ID)
```bash
export DID_API_KEY=xxx
node scripts/simple/did-generate.mjs \
  --audio public/audio/generated/voix.mp3 \
  --image public/avatars/marie.jpg \
  --output=marie-intro
```

### 3. Créer les slides (Slidev)
```bash
node scripts/simple/slidev-create.mjs --module=juridique --lesson=mandat
cd ../../video-tools/slidev/juridique-mandat
npm install
npm run export:png  # Exporte les slides en images
```

### 4. Assembler (Optionnel)
- Utiliser CapCut (gratuit) pour monter
- OU lecteur côte à côte dans le LMS

---

## 📊 Comparaison des solutions

| Étape | Option Simple | Option Avancée | Pourquoi Simple ? |
|-------|---------------|----------------|-------------------|
| Voix | ElevenLabs | XTTS self-host | Qualité pro, setup 5min |
| Avatar | D-ID API | SadTalker local | Pas de GPU, rendu cloud |
| Slides | Canva/Slidev | Remotion code | Visuel rapide, pas de code |
| Montage | CapCut manuel | FFmpeg auto | Contrôle créatif |

---

## 💰 Budget mensuel estimé

**Formation complète (25 leçons):**

| Service | Coût | Utilisation |
|---------|------|-------------|
| ElevenLabs | $5 | ~500K caractères |
| D-ID | $20 | ~100 min vidéo |
| Canva Pro | $13 | Templates pro |
| **Total** | **~$40** | One-shot |

---

## 🎯 Workflow recommandé

### Pour 1 module (5 leçons) - 4h de travail:

**Heure 1: Contenu**
- Écrire les 5 scripts (30 min)
- Relecture/correction (30 min)

**Heure 2: Voix + Avatar**
- Générer audios ElevenLabs (10 min)
- Upload D-ID, générer vidéos (20 min)
- Attendre rendu (30 min)
- Vérifier qualité (10 min)

**Heure 3: Slides**
- Créer 5 présentations Canva (40 min)
- Exporter MP4/PDF (5 min)
- Ajuster timing (15 min)

**Heure 4: Assemblage**
- Monter dans CapCut (30 min)
- Ajouter transitions/jingles (15 min)
- Export final (15 min)

---

## 📁 Structure output

```
public/
├── videos/
│   ├── avatars/           # D-ID générés
│   │   ├── marie-intro.mp4
│   │   └── marie-mandat.mp4
│   ├── slides/            # Canva/Slidev
│   │   ├── juridique-intro.mp4
│   │   └── juridique-mandat.mp4
│   └── final/             # Montage complet (optionnel)
│       ├── module1-lecon1.mp4
│       └── module1-lecon2.mp4
└── audio/
    └── generated/         # ElevenLabs/XTTS
        └── marie-*.mp3
```

---

## 🔗 Liens utiles

- **D-ID Studio:** https://studio.d-id.com
- **ElevenLabs:** https://elevenlabs.io
- **Canva:** https://canva.com
- **Slidev:** https://sli.dev
- **CapCut:** https://capcut.com
