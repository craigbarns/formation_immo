# LMS — Formation immobilier (Next.js)

Application web **maison** pour diffuser le parcours **42 h** : 5 modules, 25 leçons, lecture des scripts Markdown depuis le dépôt parent `formation-immobiliere/`.

## Prérequis

- Node.js 20+
- Le dossier `lms/` doit rester **au même niveau** que `module1-juridique/`, `module2-transaction/`, etc. (structure actuelle du dépôt).

## Configuration

```bash
cp .env.local.example .env.local
```

Renseigner **au minimum** :

- `LMS_PASSWORD` — mot de passe pour `/login`
- `SESSION_SECRET` — **32 caractères minimum** (ex. `openssl rand -base64 32`)

Sans `LMS_PASSWORD`, l’API `/api/login` répond 500.

## Développement

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) → **Accéder à la formation** → saisir le mot de passe.

## Production

```bash
npm run build
npm start
```

Déploiement type **Vercel** : déployer le **dépôt entier** (racine `formation-immobiliere/` avec `lms/` + tous les `module*`) pour que les fichiers Markdown soient lus au runtime.  
Si vous ne déployez que le sous-dossier `lms/`, copiez les contenus des modules dans `lms/content/` et adaptez `src/lib/content.ts`.

## Personnalisation

| Fichier | Rôle |
|---------|------|
| `src/data/course.ts` | Titres des modules/leçons, chemins vers les `.md`, **URLs vidéo** (`videoUrl`), **audio** (`audioUrl`) |
| `src/app/page.tsx` | Landing publique |
| `src/app/globals.css` | Thème (couleurs marque déjà proches du bleu marine / or) |

## Vidéos

Renseigner chaque `videoUrl` dans `course.ts` (lien YouTube, Vimeo, ou URL d’embed). Si `videoUrl` est `null`, la section vidéo n’est pas affichée.

## Narration audio (Mistral Voxtral)

Génération de **MP3** via l’API Mistral (**modèle** `voxtral-mini-tts-2603`), puis fichier servi depuis `public/audio/`.

1. Créez une **voix** sur Mistral (ou récupérez un `voice_id` via l’API `/v1/audio/voices`).
2. Dans `lms/.env.local` : `MISTRAL_API_KEY` et `MISTRAL_VOICE_ID` (voir `.env.local.example`).
3. Préparez un fichier texte (français) avec le texte à lire.
4. Exécutez :

```bash
cd lms
node scripts/mistral-voxtral-tts.mjs --input ../module1-juridique/scripts/mon-texte.txt --out public/audio/ma-lecon.mp3
```

5. Dans `src/data/course.ts`, sur la leçon concernée : `audioUrl: "/audio/ma-lecon.mp3"`.

Ne commitez **jamais** la clé API.

### Voix ElevenLabs (français — avatar / échantillons)

Utilisé pour les **IDs de voix** dans `src/data/formateur-voices.json` (colonnes ElevenLabs des formateurs) et pour générer des **MP3 de test** avant production D-ID / HeyGen.

1. Créez une clé API sur [elevenlabs.io](https://elevenlabs.io) (Developer → API keys).
2. Dans `lms/.env.local` : `ELEVENLABS_API_KEY=…` — **ne jamais commiter** ; en cas de fuite, **révoquez la clé** sur le dashboard.
3. Paramètres TTS recommandés (modèle multilingue + réglages voix) : `src/data/elevenlabs-tts-fr-defaults.json`.
4. Lister les voix du compte (tri par pertinence FR approximative) :

```bash
cd lms
npm run elevenlabs:voices
```

5. Générer des **échantillons MP3** (même phrase en français, top 8 voix) :

```bash
npm run elevenlabs:samples
```

Fichiers : `public/audio/elevenlabs-fr-samples/`. Une seule voix :  
`node scripts/elevenlabs-french-voices.mjs --sample <VOICE_ID>`.

6. Recopiez les `voice_id` choisis dans `formateur-voices.json` (`elevenLabsVoiceId` par module).

Les entrées actuelles utilisent des **voix françaises** (catalogue / Voice Library ElevenLabs). Si une voix est absente de votre compte, ajoutez-la depuis [Voice Library](https://elevenlabs.io/voice-library) ou remplacez l’ID par celui affiché dans le détail de la voix.

### Génération D-ID (1ʳᵉ leçon)

Scripts dans `scripts/` (variables `DID_API_USER` et `DID_API_SECRET`, jamais commitées) :

| Script | Rôle |
|--------|------|
| `did-test.mjs` | Test court (une phrase) |
| `did-generate-lesson-01.mjs` | Vidéo à partir de `module1-juridique/scripts/01-loi-alur-2026.md` |

```bash
export DID_API_USER="…"
export DID_API_SECRET="…"
node scripts/did-generate-lesson-01.mjs --short   # intro + problématique (moins de crédits)
node scripts/did-generate-lesson-01.mjs           # narration complète (~9 min, beaucoup de crédits)
```

- **402** : ajouter des crédits sur [studio.d-id.com](https://studio.d-id.com/).  
- L’URL MP4 renvoyée est **temporaire** : téléchargez le fichier ou uploadez sur YouTube (non listé), puis mettez l’URL stable dans `course.ts`.

### LiveAvatar (HeyGen)

La clé **LiveAvatar** (`LIVEAVATAR_API_KEY` dans `.env.local`) s’utilise sur **`api.liveavatar.com`**, pas sur l’ancienne API `api.heygen.com/v1/streaming.*` (sunset mars 2026).

Pour **`POST /v1/sessions/token` en mode `FULL`**, le corps doit inclure **`avatar_persona`** (avec `context_id`), pas seulement `context_id` à la racine — voir la [doc Create Session Token](https://docs.liveavatar.com/api-reference/sessions/create-session-token). La réponse fournit **`data.session_token`** (plus un champ `token` à la racine).

Pour **discuter avec l’avatar sur la loi ALUR** (mandats, diagnostics, annonces, etc.), il faut un **Context** LiveAvatar dédié (prompt + message d’accueil) :

1. `cd lms && LIVEAVATAR_API_KEY=… node scripts/liveavatar-create-alur-context.mjs`
2. Copier l’`id` renvoyé dans `.env.local` : `LIVEAVATAR_ALUR_CONTEXT_ID=…`

En **sandbox**, l’API n’expose qu’un avatar (Wayne) : le code utilise cet ID par défaut ; un autre avatar peut empêcher la conversation vocale. Si le micro ne donne aucune réponse, ouvrez l’URL d’embed dans un **nouvel onglet** ou définissez `LIVEAVATAR_EMBED_SANDBOX=false` (session facturée en crédits).

- **Page isolée (optionnelle)** : `/demo-liveavatar` — test d’embed hors parcours.
- **Coach HeyGen sur les leçons** : le bloc « HeyGen — Coach interactif » (embed conversation LiveAvatar) s’affiche sur les leçons définies dans `src/data/heygen-interactive.ts`. Pour un **contexte différent par leçon** (prompt HeyGen dédié), renseignez `LIVEAVATAR_LESSON_CONTEXTS` (JSON `moduleSlug/leçon` → `context_id`) dans `.env.local`.
- **Page démo** : `/formation/interactive-avatar` — même bloc que la leçon ALUR.
- **CLI** : `LIVEAVATAR_API_KEY=… node scripts/liveavatar-embed-test.mjs`

Documentation : [docs.liveavatar.com](https://docs.liveavatar.com/).

## Progression élève

Stockée dans **localStorage** du navigateur (clé `formation-immobilier-progress`). Pour une progression serveur multi-appareils, il faudra une base de données et des comptes utilisateurs (NextAuth + Prisma, Clerk, Supabase, etc.).

## Sécurité

Le mot de passe unique convient à un **prototype ou une petite cohorte**. Pour de la vente à grande échelle, prévoir **comptes par email**, reset mot de passe, et **HTTPS** en production.
