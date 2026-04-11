# Formation immobilier — 42 h

Dépôt source : **contenus pédagogiques** (5 modules) + **LMS** (`lms/`, Next.js).

**Référence détaillée** : [README-GLOBAL.md](./README-GLOBAL.md)  
**Application web** : [lms/README.md](./lms/README.md)

---

## Travailler depuis GitHub (flux recommandé)

1. **Cloner** (une seule fois par machine)  
   `git clone https://github.com/craigbarns/FORMATION-IMMO.git`  
   `cd FORMATION-IMMO`

2. **Récupérer les changements** avant de coder  
   `git checkout main && git pull origin main`

3. **Créer une branche** pour chaque sujet  
   `git checkout -b feat/ma-fonctionnalite`

4. **Commiter et pousser**  
   `git add -A && git commit -m "Description claire"`  
   `git push -u origin feat/ma-fonctionnalite`

5. **Ouvrir une Pull Request** sur GitHub → revue → fusion dans `main`.

Les **secrets** (`.env.local`) ne sont jamais commités : copier `lms/.env.local.example` en `lms/.env.local` en local uniquement.

---

## CI

Chaque push / PR sur `main` lance **`npm ci` + `npm run build`** dans `lms/` (voir [.github/workflows/ci.yml](.github/workflows/ci.yml)). Le lint pourra être ajouté une fois `npm run lint` vert sur tout le dépôt.

---

## Contribution

Voir [CONTRIBUTING.md](./CONTRIBUTING.md).
