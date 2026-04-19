# Pipeline Audio Cinematic — Documentation

## Architecture

```
script.md ──► narration.txt ──► MP3 (Mistral Voxtral)
                                    │
                                    ▼
                           whisperx-align.mjs
                                    │
                                    ▼
                            alignment.json
                           (mots + timestamps)
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
             detect-cues.mjs  generate-srt.mjs  Karaoké
                    │               │               │
                    ▼               ▼               ▼
               cues.json         .srt         Kinetic Flash
           (timestamps slides)  (sous-titres)  (key terms)
```

## Scripts

### 1. `scripts/whisperx-align.mjs`
Batch WhisperX sur tous les MP3. Temps estimé : ~5-8h sur CPU avec `large-v2`.

```bash
# Lancer le batch (long)
node scripts/whisperx-align.mjs

# Un seul fichier
node scripts/whisperx-align.mjs --only 01-loi-alur-2026

# Dry-run
node scripts/whisperx-align.mjs --dry-run
```

### 2. `scripts/post-align.mjs`
Watcher qui génère automatiquement cues + SRT dès qu'un alignment arrive.

```bash
# Lancer en parallèle du batch
node scripts/post-align.mjs
```

### 3. `scripts/detect-cues.mjs`
Génère les `cues.json` : timestamps des slides et keyTerms.

```bash
node scripts/detect-cues.mjs
node scripts/detect-cues.mjs --only 01-loi-alur-2026
```

### 4. `scripts/generate-srt.mjs`
Génère les sous-titres `.srt` à partir de l'alignment.

```bash
node scripts/generate-srt.mjs
node scripts/generate-srt.mjs --only 01-loi-alur-2026
```

### 5. `scripts/generate-test-alignment.mjs`
Génère un alignment de test à partir du `narration.txt` — utile pour tester l'UI sans attendre WhisperX.

```bash
node scripts/generate-test-alignment.mjs 07-decouverte-client-suivi
```

## Fichiers générés

Tous dans `public/audio-align/` :
- `{slug}.alignment.json` — alignment WhisperX (mots + segments)
- `{slug}.cues.json` — timestamps des slides et keyTerms
- `{slug}.srt` — sous-titres

## Intégration CinematicPlayer

Le player charge automatiquement ces fichiers quand ils existent :
- `alignment.json` → karaoké + kinetic flash + sous-titres
- `cues.json` → slide sync précis (remplace le calcul linéaire)

Pas de build nécessaire — les fichiers sont servis statiquement depuis `public/`.

## Raccourcis clavier du player

| Touche | Action |
|--------|--------|
| `Space` | Play/Pause |
| `→ ←` | Slide suivant/précédent |
| `↑` | Vitesse |
| `↓` / `F` | Plein écran |
| `J` / `L` | -10s / +10s |
| `M` | Mute |
| `K` | Karaoké on/off |
| `C` | Sous-titres on/off |
| `B` | Ajouter un bookmark |
| `0` / `Home` | Revenir au début |
| `?` | Aide |

## Thèmes par module

| Module | Couleur | Watermark | Voice signature |
|--------|---------|-----------|-----------------|
| juridique | `#1a3a5c` | ⚖️ | Posée & autoritaire |
| transaction | `#2563eb` | 🤝 | Dynamique & enthousiaste |
| financement | `#059669` | 📈 | Curieuse & pédagogue |
| marketing | `#7c3aed` | 📱 | Chaleureuse & créative |
| terrain | `#dc2626` | 🏠 | Confiante & expérimentée |
