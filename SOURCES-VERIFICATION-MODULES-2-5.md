# Audit sources modules 2-5 — vérification juridique

Date : 2026-04-18
Scope : modules 2 (transaction), 3 (financement), 4 (marketing), 5 (terrain)
Méthode : vérification Legifrance + CGI + textes officiels

---

## MODULE 2 — Transaction

### ✅ Références juridiques CORRECTES (à conserver)

| Script | Citation | Statut |
|---|---|---|
| `06-offre-achat-avant-contrats.md` | Article 1113 Code civil (offre/acceptation) | ✅ En vigueur |
| `06-offre-achat-avant-contrats.md` | Article 1124 Code civil (promesse unilatérale) | ✅ En vigueur (issu ord. 2016-131) |
| `06-offre-achat-avant-contrats.md` | Article 1589 Code civil (promesse synallagmatique vaut vente) | ✅ En vigueur |
| `07-acte-authentique-notaire.md` | Droits de mutation 5,80 % ancien / 2-3 % neuf | ✅ Correct |
| `07-acte-authentique-notaire.md` | Émoluments notaire tarif réglementé | ✅ Correct |

### ⚠️ Statistiques non-sourcées (à supprimer ou sourcer)

- « 30 % des transactions échouent » — source absente
- « 60 % des offres sont négociées » — source absente
- « 72 % des acheteurs reviennent sur leur offre » — source absente
- « 80 % des compromis nécessitent une clause suspensive » — source absente

**Action :** retirer ces chiffres ou les remplacer par données FNAIM / Notaires de France avec URL.

---

## MODULE 3 — Financement

### 🔴 CORRECTION MAJEURE — Loi Cosse obsolète

**Script :** `06-defiscalisation-dispositifs.md`

**Problème :** le script présente la « Loi Cosse » (ou « Louer abordable ») comme dispositif ACTIF en 2025-2026.

**Réalité juridique :**
- La Loi Cosse a été **remplacée par Loc'Avantages** au **1er mars 2022**
- Base légale actuelle : **article 199 tricies du CGI**, créé par la **loi n° 2021-1900 du 30 décembre 2021** (loi de finances pour 2022)
- **Loc'Avantages prorogé jusqu'au 31 décembre 2027** par l'article 88 de la loi de finances 2025

**Correction à apporter :**
```
AVANT : "Loi Cosse — dispositif actif — déduction 15-85% revenus fonciers"
APRÈS : "Loc'Avantages (ex-Cosse) — art. 199 tricies CGI — réduction d'impôt
         15-65% selon niveau loyer — prorogé jusqu'au 31/12/2027"
```

### ⚠️ Denormandie — prorogation à ajouter

**Script :** `06-defiscalisation-dispositifs.md`

Le dispositif Denormandie est **prorogé jusqu'au 31 décembre 2027** :
- Article 42 de la loi du 9 avril 2024
- Article 72 de la loi de finances pour 2024
- Encadré par l'article **199 novovicies du CGI**

Le script doit explicitement mentionner la date butoir 2027.

### ✅ Références CORRECTES (à conserver)

| Script | Citation | Statut |
|---|---|---|
| `script01-credit-immobilier-2026.md` | Taux d'usure Banque de France calcul trimestriel | ✅ Confirmé |
| `script01-credit-immobilier-2026.md` | Loi Lemoine 2022 (assurance emprunteur) | ✅ En vigueur |
| `script01-credit-immobilier-2026.md` | HCSF (Haut Conseil Stabilité Financière) | ✅ Correct |
| `script02-fiscalite-immobiliere.md` | Frais notaire 7-8 % ancien / 2-3 % neuf | ✅ Correct |
| `script02-fiscalite-immobiliere.md` | Micro-foncier 30 % abattement si < 15 000 € | ✅ Correct |
| `script02-fiscalite-immobiliere.md` | Plus-value : exo 22 ans IR / 30 ans PS | ✅ Correct |
| `script02-fiscalite-immobiliere.md` | Abattement 6 %/an années 6-21, 1,65 % PS | ✅ Correct |
| `06-defiscalisation-dispositifs.md` | Pinel clos au 31/12/2024 | ✅ Correct |
| `06-defiscalisation-dispositifs.md` | Besson / Robien / Borloo / Scellier / Duflot / Censi-Bouvard / Malraux | ✅ Historiquement corrects |

### ⚠️ Statistique non-sourcée

- « 73 % des acheteurs interrogent l'agent avant le banquier » (`script01`) — source absente

---

## MODULE 4 — Marketing

### Aucune citation juridique fabriquée détectée

Le module ne s'appuie pas sur des textes de loi — risque principal = statistiques marketing non-sourcées.

### ⚠️ Statistiques non-sourcées (à supprimer ou sourcer)

- « 92 % des acheteurs commencent leur recherche en ligne »
- « 78 % regardent les photos en premier »
- « 3,5× plus de contacts avec photos pro »
- « 4× plus de visites si vidéo »
- « 40 % de clics en plus avec une vidéo »
- « 28 % de mandats exclusifs supplémentaires »
- « 75 % des biens vendus via recommandation »
- « ROI 403 % du marketing digital »

**Action :** retirer ces chiffres ou citer la source (baromètre SeLoger, FNAIM, MeilleursAgents avec année et URL).

---

## MODULE 5 — Terrain

### Aucune citation juridique fabriquée détectée

### ⚠️ Statistiques non-sourcées (à supprimer ou sourcer)

- « 78 % des vendeurs choisissent l'agent rencontré en premier »
- « 68 % des agents ratent le 2e contact »
- « 60 % des mandats obtenus en porte-à-porte »
- « 73 % des prospects prospectés »
- « 70 % des leads perdus par absence de relance »
- « 15 % de conversion moyenne »
- Répartition 40/25/20/15 % des sources de prospection

**Action :** retirer ou sourcer FNAIM / Opinion System / Keller Williams France.

---

## Synthèse

| Module | Fabrications juridiques | Erreur critique | Stats non-sourcées |
|---|---|---|---|
| 2 Transaction | 0 | — | 4 |
| 3 Financement | 0 | **Cosse → Loc'Avantages** à corriger + prorogation Denormandie à mentionner | 1 |
| 4 Marketing | 0 | — | 8 |
| 5 Terrain | 0 | — | 7 |

**Priorité 1 :** corriger Cosse → Loc'Avantages dans `module3-financement/scripts/06-defiscalisation-dispositifs.md`.
**Priorité 2 :** ajouter la prorogation Denormandie 2027 dans le même fichier.
**Priorité 3 :** nettoyer toutes les statistiques non-sourcées (23 chiffres identifiés).

---

## Sources officielles utilisées pour vérification

- CGI art. 199 tricies — https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044988025
- CGI art. 199 novovicies — https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000049462283
- Code civil art. 1113, 1124, 1589 — Legifrance
- Loi n° 2021-1900 du 30 décembre 2021 (loi finances 2022) — création Loc'Avantages
- Loi du 9 avril 2024 art. 42 — prorogation Denormandie
- Loi finances 2024 art. 72 — Denormandie
- Loi finances 2025 art. 88 — prorogation Loc'Avantages jusqu'à fin 2027
