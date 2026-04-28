# LMS — Formation immobilier (Next.js)

Application web **maison** pour diffuser le parcours **42 h** : 5 modules, **36 leçons**, lecture des scripts Markdown depuis le dépôt parent `formation-immobiliere/`.

## Prérequis

- Node.js 20+
- Le dossier `lms/` doit rester **au même niveau** que `module1-juridique/`, `module2-transaction/`, etc. (structure actuelle du dépôt).

## Configuration

```bash
cp .env.local.example .env.local
```

Renseigner **au minimum** :

- `NEXT_PUBLIC_SITE_URL` — URL publique de l'app (`http://localhost:3000` en local)
- `NEXT_PUBLIC_SUPABASE_URL` — URL du projet Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — clé anon Supabase
- `SUPABASE_SERVICE_ROLE_KEY` — requis pour créer des comptes depuis `/formation/admin`

La connexion utilise Supabase Auth email/mot de passe. Depuis `/formation/admin`, un formateur admin peut créer un compte apprenant, définir son mot de passe et lui donner un accès complet à la formation sans passer par Stripe.

## Développement

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) → **Accéder à la formation** → se connecter avec un compte Supabase.

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

Stockée dans Supabase pour les comptes connectés, avec une partie synchronisée depuis le navigateur selon les composants.

## Sécurité

Supabase Auth gère les comptes par email. Les accès formation sont contrôlés par `user_subscriptions` : Stripe peut créer une ligne active via webhook, et l'admin peut créer une ligne active manuellement depuis `/formation/admin`.
