# Règlement d'examen — Certification Agent Immobilier

## Objet
Ce règlement définit les modalités d'évaluation, de notation et de délivrance du certificat de réussite de la formation « Agent Immobilier — 42 heures ».

## Seuils de réussite

| Critère | Seuil |
|---|---|
| **Score minimum par module** | **70 %** |
| **Score global minimum (moyenne pondérée)** | **70 %** |
| **Tous les modules doivent être validés** | Oui (5/5) |

> **Unification critique** : le seuil de 70 % s'applique uniformément à l'interface utilisateur, au backend (server actions) et à la base de données. Aucune divergence n'est tolérée.

## Tentatives
- **3 tentatives maximum** par module.
- **Délai de carence** : 15 jours entre deux tentatives du même module.
- Chaque tentative est enregistrée dans `exam_results` avec horodatage, score et réponses.

## Composition des examens
- **36 questions** par examen de module (QCM + questions ouvertes).
- **Durée** : 45 minutes.
- **Notation** : 1 point par question. Les questions ouvertes sont notées par l'IA coach (seuil de validation : 70/100).

## Anti-triche
- Temps minimum de réponse par question : 15 secondes.
- Détection de patterns répétitifs (clics identiques, réponses en moins de 5 secondes).
- Verrouillage si 3 échecs consécutifs en moins de 24 heures.

## Délivrance du certificat
Le certificat est généré automatiquement lorsque :
1. Les 5 modules sont validés (score ≥ 70 % chacun).
2. Le taux de complétion des leçons est ≥ 80 %.
3. Au moins 3 examens sont réussis.

**Numérotation** : `ATC-2026-XXXXX` (Aléatoire à 5 chiffres).

## Vérification publique
Tout certificat peut être vérifié via le numéro sur la page `/verify-certificate`.

## Révisions
- Dernière mise à jour : 2026-04-17
- Responsable : Équipe pédagogique Formation Immo
