# 🎬 Guide Rapide: Avatar + Voix

Guide pas à pas pour faire parler l'avatar Marie avec sa voix clonée.

## 📋 Prérequis

- Node.js 18+
- Python 3.9+
- ~2GB espace disque (modèles XTTS)

---

## 🚀 Installation (5 minutes)

### 1. Installer Coqui XTTS

```bash
# Créer environnement virtuel
python -m venv venv-xtts
source venv-xtts/bin/activate  # Windows: venv-xtts\Scripts\activate

# Installer TTS
pip install TTS

# Télécharger le modèle XTTS v2 (première utilisation)
tts --model_name tts_models/multilingual/multi-dataset/xtts_v2 --text "test"
```

### 2. Créer le fichier référence voix

Enregistrez **6-10 secondes** de votre voix (ou celle d'une comédienne) :

**Spécifications:**
- Format: WAV
- Fréquence: 22050 Hz
- Canaux: Mono
- Contenu: *"Bonjour, je suis Marie, votre coach immobilier."*

**Placement:**
```
lms/public/audio/speakers/marie-reference.wav
```

💡 **Astuce:** Utilisez votre téléphone en mode avion + Audacity (gratuit) pour convertir.

---

## 🎙️ Génération des Voix

### 3. Lancer le serveur XTTS

```bash
python -m TTS.server.server \
  --model_name tts_models/multilingual/multi-dataset/xtts_v2 \
  --port 5000
```

Vous devriez voir:
```
Running on http://localhost:5000
```

### 4. Générer les audios

Dans un autre terminal:

```bash
cd lms

# Générer tous les scripts d'intro
node scripts/generate-all-voices.mjs

# Ou générer un seul module
node scripts/voice/xtts-generate.mjs \
  --text="Votre texte ici" \
  --speaker=marie \
  --output=mon-audio.mp3
```

**Résultat:**
```
lms/public/audio/generated/
├── marie-intro-welcome.mp3
├── marie-intro-juridique.mp3
├── marie-intro-transaction.mp3
├── marie-intro-financement.mp3
├── marie-intro-marketing.mp3
└── marie-intro-terrain.mp3
```

---

## 🎭 Intégration avec l'Avatar

### 5. Utiliser dans vos composants

```tsx
import { SadTalkerAvatar } from '@/components/avatars/SadTalkerAvatar';

// Mode simple: Image + Audio
<SadTalkerAvatar
  imageUrl="/avatars/marie.svg"
  audioUrl="/audio/generated/marie-intro-juridique.mp3"
  mode="canvas"  // Animation fallback
/>

// Mode complet: avec sous-titres
<SadTalkerAvatar
  imageUrl="/avatars/marie.svg"
  audioUrl="/audio/generated/marie-intro-juridique.mp3"
  transcript="Bonjour et bienvenue dans le module juridique..."
  mode="canvas"
/>
```

### 6. Page de démo

Visitez la page interactive:

```
http://localhost:3000/formation/marie-avatar-demo
```

Cette page permet de:
- Sélectionner le module (juridique, transaction, etc.)
- Lire l'audio généré
- Voir l'avatar animé
- Afficher les sous-titres

---

## 📝 Génération Sous-titres (Optionnel)

```bash
# Installer WhisperX
pip install whisperx

# Générer SRT
node scripts/subtitles/whisperx-generate.mjs \
  --video=public/audio/generated/marie-intro-juridique.mp3 \
  --lang=fr

# Résultat: public/subtitles/marie-intro-juridique.srt
```

---

## 🎨 Personnalisation

### Ajouter une nouvelle voix

1. Créer `public/audio/speakers/pierre-reference.wav`
2. Modifier `scripts/voice/xtts-generate.mjs`:
```javascript
const VOICES = {
  marie: { ... },
  pierre: {
    name: "Pierre",
    description: "Formateur juridique",
    speaker_wav: resolve(ROOT, "public", "audio", "speakers", "pierre-reference.wav"),
    language: "fr"
  }
};
```

### Créer un nouveau script

```bash
node scripts/voice/xtts-generate.mjs \
  --text="Votre texte personnalisé ici" \
  --speaker=marie \
  --output=mon-message.mp3
```

---

## 🐛 Dépannage

### Erreur: "Serveur XTTS indisponible"
```bash
# Vérifier que le serveur tourne
curl http://localhost:5000/health

# Relancer
python -m TTS.server.server --port 5000
```

### Erreur: "Fichier référence manquant"
- Vérifiez le chemin: `public/audio/speakers/marie-reference.wav`
- Format doit être WAV (pas MP3)

### Qualité voix mauvaise
- Utilisez un micro de meilleure qualité
- Enregistrez dans un environnement calme
- Augmentez à 10-15 secondes de référence
- Parlez clairement et à vitesse normale

### Erreur mémoire
```bash
# XTTS nécessite ~4GB RAM
# Sur machine limitée, utiliser le mode CPU:
export CUDA_VISIBLE_DEVICES=""
python -m TTS.server.server --port 5000
```

---

## 📊 Performance

| Étape | Temps | Ressources |
|-------|-------|------------|
| Téléchargement modèle | 2-3 min | 2GB download |
| Génération audio (100 mots) | 10-15s | 2GB RAM |
| Génération sous-titres | 5-10s | 1GB RAM |

**Recommandé:** GPU NVIDIA pour génération plus rapide (2-3x)

---

## 🎯 Prochaines Étapes

1. ✅ Générer toutes les voix
2. ✅ Tester sur `/formation/marie-avatar-demo`
3. ⏳ Intégrer dans les pages de leçons
4. ⏳ Ajouter SadTalker (vidéo avatar synchronisé)
5. ⏳ Pipeline automatique

---

**Support:** Voir `docs/EASEGEN-INTEGRATION.md` pour documentation complète.
