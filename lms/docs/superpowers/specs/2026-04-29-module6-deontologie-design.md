# Spec — Module 6 : Déontologie & Éthique professionnelle

**Date :** 2026-04-29  
**Statut :** Approuvé  

---

## Objectif

Intégrer 2h de déontologie des professionnels de l'immobilier et 2h de non-discrimination à l'accès au logement dans la formation existante de 42h, en créant un Module 6 dédié.

---

## Contrainte principale

La formation doit rester à **42h exactement** (2520 min). Aucun ajout net de durée.

---

## Restructuration des modules existants

### Suppressions / compressions (−4h)

| Module | Action | Économie |
|--------|--------|---------|
| M1 — Juridique | Déplacer la leçon "Non-discrimination — obligations et conformité" (60 min) vers M6 | −1h |
| M3 — Financement | Fusionner "Dispositifs fiscaux" (90 min) + "Défiscalisation — dispositifs et stratégies" (90 min) → une leçon "Fiscalité avancée : dispositifs et défiscalisation" (120 min) | −1h |
| M5 — Terrain | Fusionner "R0/R1/R2" (75 min) + "Découverte client & suivi acquéreur" (75 min) → "Prise de mandat & découverte client" (90 min) | −1h |
| M5 — Terrain | Réduire "Fidélisation & recommandation" de 90 min à 60 min | −30 min |
| M5 — Terrain | Réduire une leçon 90 min → 60 min (ex. "Conduire une visite pro" ou "Argumentaire") | −30 min |

**Total économisé : 4h = 240 min**

### Nouvelle répartition des modules

| Module | Avant | Après |
|--------|-------|-------|
| M1 — Juridique & conformité | 9h | 8h |
| M2 — Transaction & négociation | 7h | 7h |
| M3 — Financement & fiscalité | 9h | 8h |
| M4 — Marketing digital | 7h | 7h |
| M5 — Visite, closing & fidélisation | 10h | 8h |
| M6 — Déontologie & Éthique professionnelle | — | 4h |
| **Total** | **42h** | **42h** |

---

## Module 6 — Déontologie & Éthique professionnelle (4h)

**Slug :** `deontologie`  
**Résumé :** Maîtrisez le Code de déontologie des professionnels de l'immobilier et les obligations légales en matière de non-discrimination à l'accès au logement.

### Leçon 1 — Non-discrimination : obligations et conformité (60 min)

**Slug :** `non-discrimination`  
**Statut :** Contenu existant — déplacé depuis M1  
**Difficulté :** intermédiaire  
**Objectifs :**
- Identifier les textes légaux encadrant la non-discrimination dans l'immobilier
- Connaître les obligations de l'agent immobilier en matière de conformité

### Leçon 2 — Non-discrimination à l'accès au logement : pratiques et prévention (60 min)

**Slug :** `non-discrimination-pratique`  
**Statut :** Nouvelle leçon  
**Difficulté :** intermédiaire  
**Objectifs :**
- Maîtriser les 25 critères de discrimination de l'art. 225-1 du Code pénal
- Distinguer discrimination directe, indirecte et systémique
- Comprendre la procédure de testing et sa valeur de preuve
- Appliquer des scripts d'entretien non-discriminants
- Savoir répondre à un bailleur ou vendeur qui demande une pratique discriminatoire

**Contenu :**
- Les 25 critères de l'art. 225-1 du Code pénal
- Discrimination directe / indirecte / systémique : définitions et exemples
- Le testing : comment ça fonctionne, quelles preuves, quelles sanctions
- Sanctions pénales (jusqu'à 3 ans d'emprisonnement + 45 000 € d'amende) et disciplinaires
- Scripts d'entretien non-discriminants pour la location et la vente
- Cas pratique : l'agent face à un bailleur qui discrimine — comment refuser et se protéger

### Leçon 3 — Le Code de déontologie des professionnels de l'immobilier (60 min)

**Slug :** `code-deontologie`  
**Statut :** Nouvelle leçon  
**Difficulté :** intermédiaire  
**Objectifs :**
- Connaître les sources légales du Code de déontologie (décret 2015-1090)
- Maîtriser les 10 principes fondamentaux
- Comprendre le rôle de la CNTGI et la procédure disciplinaire
- Identifier les responsabilités civile, disciplinaire et pénale

**Contenu :**
- Décret n°2015-1090 du 28 août 2015 : historique et portée
- Les 10 principes fondamentaux : compétence, conscience professionnelle, loyauté, désintéressement, confraternité, délicatesse, modération, courtoisie, indépendance, secret professionnel
- La CNTGI : composition, rôle, comment la saisir
- Procédure disciplinaire : avertissement, blâme, suspension de la carte professionnelle
- Responsabilités civile (indemnisation), disciplinaire (CNTGI) et pénale (Code pénal)
- L'obligation de 42h de formation continue tous les 3 ans (loi ALUR)

### Leçon 4 — Éthique pratique : conflits d'intérêts et situations à risque (60 min)

**Slug :** `ethique-pratique`  
**Statut :** Nouvelle leçon  
**Difficulté :** avancé  
**Objectifs :**
- Identifier et gérer les situations de conflits d'intérêts
- Appliquer les règles du secret professionnel et du RGPD
- Reconnaître les pratiques commerciales trompeuses
- Résoudre des dilemmes éthiques réels par la mise en situation

**Contenu :**
- Double mandant : obligations de transparence envers les deux parties
- Conflits d'intérêts : définition, signaux d'alerte, procédure à suivre
- Secret professionnel et RGPD : quelles données, combien de temps, comment les protéger
- Pratiques commerciales trompeuses (art. L121-1 à L121-7 du Code de la consommation) : exemples concrets
- 5 dilemmes éthiques réels en mise en situation (un vendeur veut cacher un défaut, un acquéreur propose un dessous-de-table, etc.)
- Règles de confraternité : partage d'honoraires, présentation aux confrères, interdictions

---

## Fichiers à créer / modifier

### Nouveaux fichiers de contenu (scripts leçons)
```
module6-deontologie/
  non-discrimination-pratique.md
  code-deontologie.md
  ethique-pratique.md
```
*(La leçon non-discrimination existante a déjà son fichier dans module1-juridique/)*

### Fichiers à modifier
- `lms/src/data/course.ts` — restructuration des 6 modules
- `lms/src/data/exam-questions.ts` — ajout de questions QCM pour M6
- `lms/src/data/flashcards.ts` — ajout de flashcards pour M6

### Migrations Supabase
Aucune migration nécessaire : la structure de la base de données est inchangée.

---

## Critères de succès

- La formation affiche bien 42h au total dans le LMS
- M6 apparaît correctement dans le parcours avec ses 4 leçons
- La leçon non-discrimination n'apparaît plus dans M1
- M3 affiche la leçon fusionnée (2h) à la place des deux leçons séparées
- M5 affiche les leçons fusionnées/compressées correctement
- Les 3 nouvelles leçons ont leur contenu markdown et sont accessibles
