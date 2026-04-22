# 🎨 Design System - Formation Agent Immobilier 42H

Guide visuel complet pour tous les supports de la formation.

---

## 📐 Identité Visuelle

### Positionnement
**Corporate Training Premium** - Sotheby's International Realty × McKinsey/BCG

Une formation professionnelle haut de gamme alliant :
- L'élégance du luxe immobilier (Sotheby's)
- La rigueur des cabinets de conseil (McKinsey/BCG)

---

## 🎨 Palette de Couleurs

### Couleurs Principales

| Couleur | Hex | Usage |
|---------|-----|-------|
| **Navy Blue** | `#1a3a5c` | Titres, fonds sombres, en-têtes de tableaux, texte principal |
| **Premium Gold** | `#d4af37` | Accents, lignes décoratives, chiffres clés (max 2-3 par page) |

### Couleurs de Fond

| Couleur | Hex | Usage |
|---------|-----|-------|
| **Warm Off-White** | `#f5f3ef` | Pages de contenu (plus premium que le blanc pur) |
| **Navy Dark** | `#1a3a5c` | Couverture, pages de chapitre, page de cloture |

### Couleurs de Texte

| Couleur | Hex | Usage |
|---------|-----|-------|
| **Navy Text** | `#1a3a5c` | Texte sur fond clair |
| **White** | `#ffffff` | Texte sur fond sombre |
| **Blue-Gray** | `#6b7d8e` | Texte secondaire, légendes, annotations |

### Utilitaires

| Couleur | Hex | Usage |
|---------|-----|-------|
| **Border** | `#e0e0e0` | Bordures fines de tableaux |
| **Card BG** | `#ffffff` | Fond des cartes |

---

## 🔤 Typographie

### Polices

| Type | Police | Usage |
|------|--------|-------|
| **Titres** | Oranienbaum (serif) | Titres de page, chapitres, hero text, chiffres clés |
| **Corps** | QuattrocentoSans (sans-serif) | Texte courant, tableaux, légendes |

> **Note importante** : Ne JAMAIS utiliser les titres en MAJUSCULES pour le français (les accents ne rendent pas bien).

### Hiérarchie des Tailles

| Style | Taille | Police | Usage |
|-------|--------|--------|-------|
| **Hero Title** | 52px | Oranienbaum | Couverture, titres de chapitre |
| **Title** | 30px | Oranienbaum | Titres de pages de contenu |
| **Subtitle** | 20px | QuattrocentoSans | Sous-titres, en-têtes de section |
| **Body Large** | 20px | QuattrocentoSans | Paragraphes d'emphase |
| **Body** | 18px | QuattrocentoSans | Texte courant (minimum autorisé) |
| **Caption** | 14px | QuattrocentoSans | Légendes, annotations (minimum autorisé) |
| **KPI** | 44px | Oranienbaum | Grands chiffres, métriques clés |
| **Label** | 14px | QuattrocentoSans | Petits labels et badges |

---

## 📏 Système de Mise en Page

### Dimensions

- **Format** : 16:9 (1280×720 px)
- **Marges** : 60px gauche/droite, 50px haut/bas
- **Grille** : 12 colonnes avec gouttières de 24px

### Éléments de Pied de Page (sur toutes les pages)

- **Ligne dorée** : 2px d'épaisseur, position Y=690, pleine largeur
- **Indicateur de section** : En bas à droite, 14px, bleu-gris

---

## 📄 Templates de Pages

### 1. Page de Couverture

```
[Image full-bleed immobilier luxe]
[Dégradé navy → transparent (gauche à droite)]

┌─────────────────────────────────────┐
│                                     │
│  FORMATION AGENT                    │
│  IMMOBILIER                         │
│  ───────────                        │
│  Certification 42H                  │
│                                     │
│  Devenez un professionnel           │
│  compétent et conforme              │
│                                     │
└─────────────────────────────────────┘
```

**Éléments** :
- Image en pleine page avec masque dégradé navy
- Titre principal en blanc (Oranienbaum 52px)
- Ligne dorée sous le titre
- Sous-titre en blanc opacité

### 2. Page de Chapitre

```
[Image full-bleed + masque navy lourd]

┌─────────────────────────────────────┐
│                                     │
│           01                        │  ← Chiffre doré 48px
│                                     │
│      Juridique &                    │  ← Titre blanc
│      Conformité                     │
│      ──────────────                 │  ← Ligne dorée
│                                     │
└─────────────────────────────────────┘
```

### 3. Page de Sommaire

```
┌──────────┬──────────────────────────┐
│          │                          │
│  SOMMAIRE│  01  Juridique           │
│          │      Fondamentaux légaux │
│          │                          │
│   [Navy] │  02  Transaction         │
│   [Block]│      Négociation pratique│
│          │                          │
│          │  03  Financement         │
│          │      Calculs et fiscalité│
│          │                          │
└──────────┴──────────────────────────┘
```

### 4. Patterns de Pages de Contenu

#### Pattern A : Split Gauche-Droite (50/50)
- Gauche : Texte explicatif
- Droite : Image ou élément visuel
- Usage : Pages de présentation, introductions

#### Pattern B : Pleine Largeur Structurée
- Titre en haut
- Tableau ou liste structurée pleine largeur
- Usage : Contenu détaillé des modules

#### Pattern C : Grille de Cartes
- 2-3 cartes égales par ligne
- Chaque carte : icône + titre + description
- Usage : Fonctionnalités, avantages

#### Pattern D : Hero Haut + Contenu Bas
- Image hero sur 40% supérieur
- Contenu texte sur 60% inférieur
- Usage : Pages d'emphase, transitions

### 5. Page de Clôture

```
[Fond navy uni #1a3a5c]

┌─────────────────────────────────────┐
│                                     │
│   "90% des agents échouent          │
│    sans méthode.                    │
│    Cette formation est             │
│    votre assurance réussite."       │
│                                     │
│   ─────────────────────             │
│                                     │
│   contact@formation.immo            │  ← Doré
│   01 23 45 67 89                    │
│                                     │
└─────────────────────────────────────┘
```

---

## 🧩 Composants

### Cartes

- **Coins** : AIGUISÉS (pas d'arrondis)
- **Bordure** : Aucune
- **Fond** : `#f5f3ef` sur fond blanc, ou blanc semi-transparent sur navy
- **Ombre** : Aucune

### Tableaux

**Style Standard** :
- En-tête : Navy `#1a3a5c`, texte blanc
- Corps : Lignes alternées blanc et `#f5f3ef`
- Bordures : fines `#e0e0e0`
- Police : QuattrocentoSans 16px

**Style Minimal** :
- En-tête : `#f5f3ef`, texte navy
- Corps : Blanc uniquement
- Bordures : discrètes

### Éléments Décoratifs

| Élément | Description |
|---------|-------------|
| **Ligne dorée** | 2px, horizontale, séparateur de section |
| **Marqueur bullet** | Petit carré/doré 6px |
| **Barre d'accent** | Ligne verticale navy 4px |
| **Icônes** | Font Awesome (fas), navy ou doré |

---

## 🖼️ Images

### Style
- Photographie immobilière premium
- Propriétés de luxe, agents professionnels, architecture moderne
- **Traitement couleur** : Tonalité bleue froide pour harmonie avec le navy

### Couverture/Chapitre
- Image pleine page avec masque dégradé
- Masque navy 70-80% d'opacité
- Direction : gauche → droite

### Contenu
- Chaque image doit avoir un lien avec l'immobilier/formation
- Pas d'images purement décoratives
- Pas de clip art bon marché

---

## ⚠️ Règles à Respecter (Interdictions)

### Couleurs
- ❌ Pas de bleu-cyan ou turquoise
- ❌ Pas plus de 2-3 éléments dorés par page

### Formes
- ❌ Pas de rectangles arrondis
- ❌ Pas de dégradés sur les pages de contenu

### Typographie
- ❌ Pas de texte corps en dessous de 18px
- ❌ Pas d'annotations en dessous de 14px
- ❌ Pas de titres en ALL CAPS (français)

### Mise en page
- ❌ Pas de décalages d'alignement
- ❌ Pas plus de 6 lignes de texte sans rupture

### Images
- ❌ Pas de clip art basique
- ❌ Pas d'images purement décoratives

---

## 🎯 Mapping Contenu - Formation

### Modules avec Icônes

| Module | Icône | Élément Doré |
|--------|-------|--------------|
| M1 - Juridique | `fa-scale-balanced` | Balance/justice dorée |
| M2 - Transaction | `fa-handshake` | Poignée de main dorée |
| M3 - Financement | `fa-calculator` | Calculatrice/pièces dorées |
| M4 - Marketing | `fa-bullhorn` | Mégaphone/graphique doré |
| M5 - Terrain | `fa-key` | Clé/maison dorée |

### Chiffres Clés à Mettre en Avant

| Valeur | Label | Style |
|--------|-------|-------|
| **42h** | de formation | KPI doré large |
| **5** | modules | KPI doré large |
| **36** | leçons | KPI moyen |
| **20+** | templates | KPI moyen |
| **90%** | échec sans méthode | KPI rouge (alerte) |

---

## 📤 Export

### PDF
- Format : A4 paysage
- Qualité : Impression
- Fond perdu : 3mm
- Profil : CMYK ready

### Présentation
- Format : 1280×720
- Ratio : 16:9

### Web
- Format : Responsive
- Max-width : 1200px

---

## 📝 Exemples d'Utilisation

### Exemple de Titre Hero
```
Formation Agent Immobilier
Certification Professionnelle 42H
```

### Exemple de Sous-titre
```
Devenez un professionnel compétent et conforme
```

### Exemple de Corps de Texte
```
Cette formation complète de 42 heures couvre l'ensemble
des compétences nécessaires pour exercer la profession
d'agent immobilier en conformité avec la législation 2026.
```

### Exemple de Label
```
MODULE 1    JURIDIQUE    BONUS
```

---

## 📦 Fichiers Associés

- `DESIGN-SYSTEM.yml` - Fichier de configuration machine
- `PRESENTATION-COMPLETE-FORMATION.md` - Contenu brut
- `PRESENTATION-COMPLETE-FORMATION.pdf` - PDF généré

---

**Version 1.0** | **21 avril 2026**

*Formation créée avec soin pour une montée en compétence optimale* 🏠🎓
