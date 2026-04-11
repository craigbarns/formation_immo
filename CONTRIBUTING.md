# Contribuer

## Principe

La **référence du projet est le dépôt GitHub** : les changements importants passent par des branches, des commits poussés sur `origin`, et idéalement des **Pull Requests**.

## À ne pas commiter

- `lms/.env.local` (mots de passe, clés API Mistral, Fal, D-ID, etc.)
- `lms/node_modules/`, `lms/.next/`
- fichiers personnels ou brouillons hors arborescence du cours

Le fichier **`lms/.env.local.example`** sert de modèle documenté ; il peut être versionné.

## Branches

- `main` : branche stable, protégée si possible (PR obligatoires, CI verte).
- `feat/…`, `fix/…`, `docs/…` : branches de travail courtes.

## Commits

Messages en français ou anglais, **impératif ou description factuelle**, une idée par commit quand c’est possible.

Exemples : `fix(lms): fil d’Ariane leçon sur mobile`, `docs: lien guide élève dans README`.

## Pull Request

1. Décrire **l’objectif** et les **fichiers touchés**.
2. Vérifier en local : `cd lms && npm run build` (aligné sur la CI). Lancer `npm run lint` si possible ; le lint complet sera ajouté à la CI quand il sera vert.
3. Après merge, supprimer la branche distante si besoin.

## Contenu pédagogique

- Scripts de leçons : `module*/scripts/*.md`
- Validation des chemins : `node scripts/validate-course-content.mjs` (depuis la racine du dépôt)

## Questions

Ouvrir une **issue** sur GitHub pour les sujets structurants ou les ambiguïtés de contenu.
