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

## Progression élève

Stockée dans **localStorage** du navigateur (clé `formation-immobilier-progress`). Pour une progression serveur multi-appareils, il faudra une base de données et des comptes utilisateurs (NextAuth + Prisma, Clerk, Supabase, etc.).

## Sécurité

Le mot de passe unique convient à un **prototype ou une petite cohorte**. Pour de la vente à grande échelle, prévoir **comptes par email**, reset mot de passe, et **HTTPS** en production.
