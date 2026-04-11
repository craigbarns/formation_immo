# MODULE 3 : FINANCEMENT - Templates

Ce dossier contient les 4 templates professionnels pour la formation des agents immobiliers sur le financement immobilier.

---

## 📊 TEMPLATES EXCEL

### 1. SIMULATEUR_CREDIT.xlsx
**Simulateur complet de crédit immobilier**

#### Contenu :
- **Données du prêt** : Prix du bien, frais, apport, montant emprunté
- **Capacité d'emprunt** : Revenus, charges, taux d'endettement maximum
- **Résultats** : Mensualités (hors/avec assurance), coût total du crédit
- **Tableau d'amortissement** : 12 premières mensualités détaillées

#### Taux 2026 intégrés :
- Crédit immobilier : 3,2% - 3,8%
- Assurance emprunteur : 0,25% - 0,45%
- Taux d'endettement max (HCSF) : 35%

#### Formules clés :
```excel
Mensualité = Capital × (Taux/12) / (1-(1+Taux/12)^-N)
Taux endettement = Mensualité / Revenus × 100
```

#### Utilisation :
1. Remplir les cellules **JAUNES** avec les données du client
2. Les cellules **GRISÉES** calculent automatiquement
3. Vérifier que le taux d'endettement < 35%
4. Vérifier que le reste à vivre > 800€

---

### 2. TABLEAU_FISCALITE.xlsx
**Comparatif complet de la fiscalité immobilière**

#### Contenu :
- **IFI** : Barème progressif 2026 avec exemple de calcul
- **Plus-value immobilière** : Abattements selon durée de détention
- **Loi Pinel** : Réductions d'impôt 6/9/12 ans
- **Loi Denormandie** : Réhabilitation ancien
- **LMNP** : Micro-BIC vs Régime réel

#### Données 2026 :
| Dispositif | Durée | Réduction max |
|------------|-------|---------------|
| Pinel | 6 ans | 31 500 € |
| Pinel | 9 ans | 45 000 € |
| Pinel | 12 ans | 52 500 € |
| Denormandie | 6 ans | 36 000 € |
| Denormandie | 9 ans | 54 000 € |
| Denormandie | 12 ans | 63 000 € |

#### Plafonds IFI 2026 :
- Jusqu'à 800 000 € : 0%
- 800 000 € - 1,3 M€ : 0,5%
- 1,3 M€ - 2,57 M€ : 0,7%
- Au-delà : progressif jusqu'à 1,5%

#### Calculatrice intégrée :
- Plus-value brute et imposable
- Abattements automatiques selon durée
- Impôt + prélèvements sociaux

---

### 3. CALCUL_RENTABILITE.xlsx
**Calculateur complet de rentabilité locative**

#### Contenu :
- **Données d'investissement** : Prix, travaux, meubles, loyers
- **Charges annuelles** : 10 postes de charges détaillés
- **Indicateurs de rentabilité** : Brut, net, net-net, cash-flow
- **Loi de Moore** : Règle des 72 pour doubler le capital
- **Simulation 10 ans** : Évolution avec inflation 2%
- **Grille d'évaluation** : Score pondéré sur 100 points

#### Benchmarks 2026 :
| Indicateur | Excellent | Bon | Correct | À éviter |
|------------|-----------|-----|---------|----------|
| Rendement brut | > 6% | 5-6% | 4-5% | < 4% |
| Rendement net | > 4% | 3-4% | 2-3% | < 2% |
| Cash-flow | Positif | -50€/mois | -100€/mois | < -100€ |

#### Formules clés :
```excel
Rendement brut = Loyer annuel / Prix d'achat × 100
Rendement net = (Loyer - Charges) / Investissement total × 100
Cash-flow = Loyer mensuel - Charges mensuelles
Loi de Moore = 72 / Taux de rendement = Années pour doubler
```

#### Grille d'évaluation :
- Rentabilité brute (25 pts)
- Rentabilité nette (20 pts)
- Cash-flow (20 pts)
- Emplacement (15 pts)
- État du bien (10 pts)
- Potentiel valorisation (10 pts)

**Score :**
- 80-100 : EXCELLENT
- 65-79 : BON
- 50-64 : MOYEN
- < 50 : À ÉVITER

---

## 📝 TEMPLATE WORD

### 4. FICHE_ASSURANCES.docx
**Guide complet des assurances immobilières**

#### Contenu :

##### 1. Assurance Emprunteur (OBLIGATOIRE)
- Garanties : Décès, IPT/ITT, ITT, Perte d'emploi
- Taux indicatifs 2026 : 0,15% - 0,45%
- Questions à poser au courtier
- Loi Lemoine : résiliation à tout moment

##### 2. PNO - Propriétaire Non Occupant (OBLIGATOIRE)
- Garanties essentielles
- Coût : 150€ - 400€/an
- Exclusions principales

##### 3. GLI - Garantie Loyers Impayés (RECOMMANDÉ)
- Fonctionnement et franchises
- Coût : 2,5% - 4% des loyers
- Conditions d'éligibilité du locataire
- Garanties complémentaires

##### 4. RC Pro - Responsabilité Civile (OBLIGATOIRE agents)
- Garanties professionnelles
- Coût : 300€ - 5 000€/an

##### 5. Tableau récapitulatif comparatif

##### 6. Checklist avant signature
- 10 points de vérification essentiels

##### 7. Contacts utiles
- ACPR, Médiation, FNAIM, Service-Public

---

## 🎯 INSTRUCTIONS GÉNÉRALES

### Pour les formateurs :
1. Distribuer les templates aux stagiaires
2. Expliquer le fonctionnement des formules Excel
3. Faire des exercices pratiques avec des cas réels
4. Vérifier la compréhension des indicateurs clés

### Pour les stagiaires :
1. **Ne pas modifier** les cellules avec formules (grisées)
2. **Remplir uniquement** les cellules de saisie (jaunes)
3. **Tester** différents scénarios pour comprendre l'impact
4. **Comparer** les résultats avec les benchmarks

### Mise à jour des données :
Les taux et barèmes sont à jour pour 2026. Pour les années suivantes :
- Mettre à jour les taux de crédit
- Actualiser les barèmes fiscaux
- Vérifier les plafonds Pinel/Denormandie

---

## 📞 SUPPORT

Pour toute question sur l'utilisation des templates :
- Vérifier les instructions dans chaque fichier
- Consulter le formateur référent
- Se référer à la documentation officielle

---

**Version :** 1.0 - Janvier 2026  
**Auteur :** Formation Agents Immobiliers - Module 3 Financement
