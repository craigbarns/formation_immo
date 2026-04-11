# Stack Simplifié - Formation Immobilière

Stack recommandé pour aller vite en production.

## 🎯 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    STACK SIMPLE                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🎭 D-ID                →  Formateur parlant (avatar)       │
│  🎨 Canva/Gamma/Slidev  →  Slides professionnels           │
│  ❓ Quiz intégrés       →  LMS (déjà fait)                  │
│  🎬 Vidéos stock        →  Pexels/Illustration générée     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 1. 🎭 D-ID - Avatar Parlant

### Pourquoi D-ID ?
- ✅ Ultra simple : upload photo + audio = vidéo
- ✅ Qualité professionnelle
- ✅ API disponible
- ✅ Pas besoin de GPU/serveur

### Process
```
Photo portrait (Marie) + Script audio MP3 → D-ID API → Vidéo MP4
```

### Script de génération
```bash
# Générer audio avec XTTS d'abord
node scripts/voice/xtts-generate.mjs --text="Script..." --speaker=marie

# Puis envoyer à D-ID
node scripts/avatar/did-generate.mjs --audio output.mp3 --image marie.jpg
```

### Coût
- ~$0.10-0.20 / vidéo de 1 minute
- Crédits mensuels disponibles

---

## 2. 🎨 Slides - Canva / Gamma / Slidev

### Option A: Canva (Recommandé débutant)
- Interface drag & drop
- Templates immobilier
- Export MP4 direct
- Gratuit (avec watermark) ou Pro

### Option B: Gamma
- IA génère les slides
- Design moderne automatique
- Export PDF/PPT

### Option C: Slidev (Développeur)
```bash
# Dans video-tools/slidev/
npm init slidev

# Éditer slides.md
---
layout: cover
background: ./mandat-bg.jpg
---

# Le Mandat de Vente

Document essentiel de la transaction

---
layout: two-cols
---

# Types de mandat

- Simple
- Exclusif  
- Semi-exclusif

::right::

<img src="./diagram.png" />
```

Export:
```bash
npx slidev export --format pdf
# ou
npx slidev export --format png
```

---

## 3. ❓ Quiz - Déjà Intégré

✅ Système de quiz existant dans le LMS
- 50 questions QCM
- Correction immédiate
- Suivi progression

### Pour générer plus de quiz
```bash
# Option simple : utiliser ChatGPT/Claude
# Prompt: "Génère 10 QCM sur le mandat de vente ALUR"

# Ou script existant
node scripts/quiz/questgen-generate.mjs --module=juridique
```

---

## 4. 🎬 Vidéos d'Illustration

### Source 1: Pexels (Gratuit)
```bash
# Télécharger depuis pexels.com
# Mots-clés: "real estate", "house", "contract", "keys"

# Placer dans:
public/videos/stock/
```

### Source 2: Génération AI (Runway/Pika)
```bash
# Pour des séquences spécifiques
# Ex: "Signature d'un compromis de vente"
```

### Source 3: Screen Recording
```bash
# Enregistrer écran pour démos logiciels
# Ex: Démonstration CRM, simulation prêt...
```

---

## 🚀 Workflow Complet

### Étape 1: Préparer le contenu (30 min)
```
module1-juridique/scripts/
├── 01-intro.md          ← Script écrit
├── 02-mandat.md
└── 03-compromis.md
```

### Étape 2: Générer les audios (15 min)
```bash
# Un seul script
./scripts/simple/generate-audio.sh module1-juridique/

# Sortie:
# public/audio/generated/marie-module1-lesson1.mp3
```

### Étape 3: Créer slides Canva (30 min)
- Template "Formation professionnelle"
- 5-10 slides par leçon
- Export MP4 ou PDF

### Étape 4: Générer avatar D-ID (10 min)
```bash
node scripts/simple/did-generate.mjs \
  --audio public/audio/generated/marie-xxx.mp3 \
  --image public/avatars/marie-portrait.jpg \
  --output public/videos/avatars/
```

### Étape 5: Assembler (15 min)
- Montage simple dans CapCut/DaVinci (gratuit)
- OU lecteur côte à côte dans le LMS

---

## 📁 Structure Finale

```
public/
├── videos/
│   ├── avatars/           # D-ID générés
│   │   ├── marie-intro.mp4
│   │   └── marie-mandat.mp4
│   ├── slides/            # Canva/Slidev exports
│   │   ├── module1-intro.mp4
│   │   └── module1-mandat.mp4
│   └── stock/             # Pexels/illustration
│       ├── signature-hands.mp4
│       └── maison-vue.mp4
└── audio/
    └── generated/         # XTTS ou ElevenLabs
        └── marie-*.mp3
```

---

## 💰 Coûts Estimés

| Élément | Solution | Coût/mois |
|---------|----------|-----------|
| Avatar | D-ID API | $20-50 |
| Slides | Canva Pro | $13 |
| Voix | ElevenLabs | $5-20 |
| Stock | Pexels | Gratuit |
| Montage | CapCut | Gratuit |
| **Total** | | **~$40-80/mois** |

---

## ⚡ Timeline Production

Pour 1 module (5 leçons):
- Scripts: 2h
- Audios: 30 min (génération auto)
- Slides Canva: 2h
- Avatars D-ID: 30 min (upload + attendre)
- Montage: 1h
- **Total: ~6h par module**

5 modules = **~30h de production**

---

## 🎯 Recommandation

**Pour commencer immédiatement:**

1. ✅ Utiliser le **LMS existant** (quiz déjà là)
2. 🎨 **Canva** pour les slides (plus rapide que Remotion)
3. 🎭 **D-ID** pour l'avatar (plus simple que SadTalker)
4. 🎬 **Pexels** pour les illustrations vidéo

**Quand scaler:**
- Beaucoup de contenu → Passer à ElevenLabs + D-ID API
- Besoin personnalisation → Remotion pour slides
- Budget limité → SadTalker local (mais complexe)

---

## 📚 Ressources

- **D-ID:** https://studio.d-id.com
- **Canva:** https://canva.com
- **Gamma:** https://gamma.app
- **Slidev:** https://sli.dev
- **Pexels:** https://pexels.com
- **CapCut:** https://capcut.com
