# Analyse complète du design — LMS Formation Immo

Date : 2026-04-18
Scope : `lms/src/**` (Next.js 16 + Tailwind 4 + React 19)
Méthode : lecture des tokens, shell, landing, page module, page leçon, composants UI + mesure grep sur 114 fichiers

---

## 1. Synthèse

Le design repose sur une **identité forte et cohérente** (navy `#1a3a5c` + gold `#d4af37`, cartes warmes, tipographie Geist) mais souffre de **sept écarts structurels** entre ce qui est déclaré dans le design system et ce qui est réellement appliqué dans les composants. La dette est essentiellement **cosmétique et non-bloquante**, mais affaiblit la perception premium et la maintenabilité.

**Note globale : 6.5 / 10**
- Identité de marque : 8/10
- Cohérence du design system : 5/10
- Accessibilité : 4/10
- Dark mode : 2/10
- Hiérarchie typographique : 5/10

---

## 2. Points forts

### 2.1 Tokens de marque clairs
[globals.css:4-31](lms/src/app/globals.css) déclare un système de couleurs propre :
- `--brand-navy`, `--brand-navy-deep`, `--brand-navy-soft`
- `--brand-gold`, `--brand-gold-dim`, `--brand-gold-soft`
- `--surface-elevated`, `--surface-warm`, `--muted-foreground`
- Correspondances dark mode pour chaque token (l.19-31)

### 2.2 Utility layer utile
[globals.css:68-209](lms/src/app/globals.css) définit 20+ classes sémantiques :
- `.card-elevated`, `.btn-primary-solid`, `.breadcrumb-pill`, `.lesson-nav-*`
- `.trust-badge`, `.section-heading`, `.activity-badge`
- `.focus-ring-brand` (WCAG-ready)
- Animations : `.animate-enter`, `.animate-shimmer`, `.animate-float`

### 2.3 Micro-détails soignés
- Selection personnalisée en gold (l.53-56)
- Scrollbar discrète (l.258-261)
- Focus rings inputs cohérents (l.248-255)
- Radial gradients du `.formation-canvas` pour créer de la profondeur

### 2.4 Composants UI shadcn-like
[ui/](lms/src/components/ui) expose `Button`, `Card`, `Badge`, `Alert`, `Dialog`, `Input`, `Tabs`, `SkeletonLoader`, `EmptyState`, `Slider` — API stable avec `variants` + `forwardRef`.

---

## 3. Problèmes identifiés

### 🔴 P1 — Dark mode = coquille vide
**Symptôme :** le `ThemeToggle` est visible dans le header ([FormationShell.tsx:80](lms/src/components/FormationShell.tsx)) et bascule bien la classe `.dark` sur `<html>`, mais…

**Réalité mesurée :**
- Variables CSS dark définies ✓ ([globals.css:19-31](lms/src/app/globals.css))
- **1 seul fichier** utilise `dark:` Tailwind (ThemeToggle lui-même)
- **422 occurrences** de `bg-white / bg-zinc-50 / bg-zinc-100` sans variante dark
- **986 uses** de `text-{xs,sm,base,lg,xl}` souvent suivis de `text-zinc-600/700/900` non adaptatifs

**Conséquence :** toggle le mode sombre ne change que le `<body>` background et la couleur du texte racine. Toutes les cartes, badges, boutons restent clairs → **effet cassé et pire qu'un mode clair**.

**Fix minimal :** soit supprimer le toggle, soit migrer les classes vers `bg-background`, `text-foreground`, `border-border` (tokens sémantiques) sur au moins les 20 composants de surface.

---

### 🔴 P2 — Système de cartes fragmenté (quatre dialectes)
Le code propose **quatre styles concurrents** pour une même intention (carte élevée blanche) :

| Source | Classe / composant | Usage réel |
|---|---|---|
| globals.css | `.card-elevated` | 29 fichiers |
| globals.css | `.surface-card` / `.surface-card-soft` | inclus dans 29 ci-dessus |
| globals.css | `.interactive-block` | inclus |
| ui/Card.tsx | `<Card variant="elevated\|warm\|flat">` | 10 fichiers |
| (ad-hoc) | `rounded-2xl border bg-white ...` inline | **54 fichiers** |

**Le dialecte inline domine le design system officiel** (54 vs 29). Pas de règle écrite pour choisir entre eux.

**Fix :** documenter dans `AGENTS.md` la règle unique (ex : "utiliser `<Card>` partout sauf dans les 3 utility classes héritées listées") et migrer progressivement les 54 fichiers.

---

### 🟡 P3 — Typographie non tokenisée
- **986 uses** de `text-sm/base/lg/xl` directement
- **165 uses** de valeurs arbitraires `text-[10px]`, `text-[11px]`, `text-[13px]`
- Aucune échelle nommée : pas de `.text-h1`, `.text-h2`, `.text-body`, `.text-caption`, `.text-overline`
- Les tailles arbitraires répètent les mêmes valeurs (10-11-13px) sans les centraliser

**Conséquence :** changer l'échelle typographique = toucher ~150 fichiers.

**Fix :** ajouter au `@theme` :
```css
--text-caption: 11px / 16px;
--text-overline: 10px / 14px;
--text-body: 14px / 22px;
```

---

### 🟡 P4 — Palette élargie incohérente
Au-delà des tokens de marque :
- Amber : 50, 100, 200, 400, 500, 700, 900 (7 teintes)
- Emerald, blue, sky, red, violet, cyan, indigo : 3-4 teintes chacune
- **Couleurs hexadécimales hardcodées** dans [page.tsx:17-58](lms/src/app/page.tsx) pour les modules (`#2563eb`, `#7c3aed`, `#0891b2`, `#059669`) — hors design system

**Fix :** définir des `--module-1-accent`… `--module-5-accent` dans les tokens et les référencer partout.

---

### 🟡 P5 — Accessibilité : couverture faible
- **32 attributs ARIA** (label, describedby, role) across **19 fichiers** sur **114 composants**
- Landing page : `text-white/65` et `text-white/75` sur fond navy `#1a3a5c` → contraste ~2.7:1 et 3.2:1 (WCAG AA exige 4.5:1)
- Header formation : `text-amber-100/80` sur navy → ~3.1:1 ❌
- FormationShell nav : icônes seules sans `aria-label` lorsque le label est masqué en mobile

**Fix prioritaire :** remonter `text-white/65` → `text-white/80` minimum (ou `text-on-dark-muted` déjà défini, = 80%) partout. Ajouter `aria-label` sur tous les boutons icon-only.

---

### 🟡 P6 — Iconographie mixte emoji + Lucide
- **Landing page** utilise emoji décoratifs : 🎧 ✅ 🧮 📋 🃏 💼 🎯 🏆
- **FormationShell** utilise 🏛️ dans le logo
- **Dashboard** `QuickLink` utilise emoji
- **Composants métier** utilisent Lucide icons (Scale, TrendingUp, BookOpen, Sparkles…)

**Conséquence :** les emoji rendent différemment selon l'OS (Apple vs Windows vs Android) → ton "premium certifiant" fragilisé.

**Fix :** remplacer progressivement les emoji décoratifs par des Lucide icons — garder les emoji uniquement dans le contenu pédagogique (pas dans la chrome UI).

---

### 🟡 P7 — Focus rings redéfinis 30+ fois
[globals.css:184-189](lms/src/app/globals.css) déclare `.focus-ring-brand` et `.focus-ring-brand-dark` — classes **très peu utilisées**.

**Réalité :** les composants redéfinissent en ligne :
```tsx
focus-visible:ring-2 focus-visible:ring-brand-gold/70 focus-visible:ring-offset-2
```
…dans Button, Input, ThemeToggle, NavItem, QuickLink, breadcrumb-pill, etc. → **duplication mais avec variations** (parfois `/60`, parfois `/70`, parfois `/80`, offset parfois absent).

---

### 🟠 P8 — Page leçon surchargée
[page.tsx lignes 123-222](lms/src/app/formation/[moduleSlug]/[lessonSlug]/page.tsx) empile **13 blocs** avant le contenu principal :

1. `ReadingProgressBar`
2. `LessonPresenterPanel` (avatar banner)
3. Breadcrumb
4. `LessonTimer`
5. Module title (overline)
6. H1 titre leçon
7. Badge durée
8. Badge difficulté
9. Paragraphe descriptif
10. Bloc "Ce que vous allez maîtriser" (objectifs)
11. `LessonJourneyBadge`
12. 4 boutons d'action (Bookmark, Notes, Recap, AI Coach)
13. `LessonMap` (navigation interne)

**Conséquence :** fatigue cognitive, premier scroll-depth avant le vrai contenu = ~1 écran complet. L'apprenant retarde de 5-10 secondes l'engagement avec la leçon.

**Fix :** regrouper Timer + Badges durée/difficulté dans une seule barre. Déplacer LessonJourneyBadge et LessonMap plus bas ou dans une sidebar. Rendre l'avatar banner optionnel/collapsable.

---

### 🟠 P9 — Navigation desktop ≠ mobile
[FormationShell.tsx:75-82 + 130-135](lms/src/components/FormationShell.tsx) :

| Item | Desktop | Mobile bottom nav |
|---|---|---|
| Parcours | ✓ | ✓ |
| Fiches | ✓ | ✓ |
| Simulateurs | ✓ | ✓ |
| Examens | ✓ | ❌ |
| Profil | ✓ | ✓ |
| Recherche | ✓ | ❌ |
| Theme toggle | ✓ | ❌ |
| Logout | ✓ | ❌ |

Le mode mobile perd 4 fonctionnalités sans chemin alternatif. L'examen est censé être le cœur du parcours certifiant.

**Fix :** revoir la mobile bottom nav (Parcours / Examens / Fiches / Profil) et mettre Simulateurs dans "Outils" d'une page /formation.

---

### 🟠 P10 — Shadow/effect overkill
- **34 fichiers** redéclarent à la main `shadow-[0_2px_8px_rgba(0,0,0,0.04),0_16px_40px_rgba(26,58,92,0.07)]`
- **167 uses** de `backdrop-blur` ou `bg-gradient-to-*`
- **165 uses** de tailles arbitraires `text-[10-13px]`

Les effets cumulés (blur + gradient + shadow double + radial gradient canvas) **coûtent perceptuellement et en performance mobile**. Safari mobile commence à faire des saccades.

**Fix :** définir une échelle de shadows (`--shadow-xs`, `--shadow-sm`, `--shadow-md`, `--shadow-lg`) et limiter `backdrop-blur` aux éléments flottants (header, modals, bottom nav) — pas aux cartes statiques.

---

### 🟠 P11 — Landing vs Formation : deux univers visuels
- **Landing** ([page.tsx](lms/src/app/page.tsx)) : fond navy uniforme, texte blanc, CTAs gold — univers "sales"
- **Formation** ([FormationShell.tsx](lms/src/components/FormationShell.tsx)) : fond warm `#f6f4ef`, header navy, cartes blanches — univers "learning"
- **Transition brutale** au login : l'utilisateur passe d'un site "premium dark" à une app "warm light" sans apprêt visuel

**Fix :** soit introduire un overlap (landing page peut aussi contenir un aperçu warm), soit assumer explicitement le contraste (animation de transition au login).

---

### 🟠 P12 — Footer peu utile
[FormationShell.tsx:88-124](lms/src/components/FormationShell.tsx) : footer dupplique 3 liens déjà dans la nav top (Fiches, Simulateurs, Profil). Absent :
- Mentions légales
- CGV
- Contact / support
- Numéro NDA mentionné seulement dans la landing

**Fix :** séparer les liens utilitaires du texte marketing, ajouter mentions légales requises par un organisme de formation.

---

## 4. Recommandations prioritaires (ordre d'impact)

### Sprint 1 — Fondations (1 semaine)
1. **Décision dark mode :** migrer 20 composants clés OU retirer le toggle
2. **Contraste texte :** remplacer `text-white/65` → `text-on-dark-muted` (tous fichiers)
3. **Focus rings :** généraliser `.focus-ring-brand` / `.focus-ring-brand-dark`
4. **ARIA labels :** auditer les boutons icon-only

### Sprint 2 — Système (1-2 semaines)
5. **Tokens typographiques :** créer `--text-h1/h2/h3/body/caption/overline` et migrer la landing + shell + modules
6. **Tokens modules :** remplacer les HEX hardcodés par `--module-{1-5}-accent`
7. **Shadow scale :** définir `--shadow-xs/sm/md/lg` et retirer les valeurs inline

### Sprint 3 — Composants (2 semaines)
8. **Unifier les cartes :** documenter la règle puis migrer les 54 fichiers ad-hoc vers `<Card>` ou `.card-elevated`
9. **Alléger la page leçon :** passer de 13 blocs d'en-tête à 4-5
10. **Mobile nav :** inclure Examens + Recherche

### Sprint 4 — Cosmétique (1 semaine)
11. Remplacer emoji UI → Lucide icons
12. Enrichir le footer (mentions légales)
13. Animation de transition landing → formation

---

## 5. Check-list technique

| Élément | État | Action |
|---|---|---|
| Tokens CSS brand-navy/gold | ✅ déclarés | — |
| Dark mode variables | ✅ déclarées | **Non propagées** |
| Dark mode Tailwind classes | ❌ 1 fichier | Migrer 20 fichiers |
| Focus ring utility | ✅ définie | Généraliser |
| Card system | ⚠️ 4 dialectes | Unifier |
| Typography scale | ❌ absente | Créer tokens |
| Shadow scale | ❌ inline | Créer tokens |
| Color palette hors brand | ⚠️ 7 familles | Limiter à 3 |
| ARIA coverage | ❌ 17% fichiers | Audit a11y |
| Mobile nav parity | ⚠️ 4 items manquants | Repenser |
| Landing ↔ Formation | ⚠️ rupture | Transition |
| Emoji vs Lucide | ⚠️ mix | Harmoniser |

---

## 6. Livrables suggérés

1. **DESIGN-TOKENS.md** — canoniser les tokens (couleurs, typo, radius, shadows, spacing)
2. **COMPONENT-GUIDELINES.md** — règle "une seule façon" par composant (carte, bouton, badge)
3. **A11Y-AUDIT.md** — score contraste + ARIA par page
4. **STORYBOOK** (optionnel) — 15 composants UI documentés pour usage cohérent
