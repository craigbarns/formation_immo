# Audit contenu — suspects d'hallucination juridique/statistique

> Généré automatiquement par scan du codebase. À relire manuellement par un juriste immo avant commercialisation.

## 🔴 Statistiques non sourcées (risque publicité trompeuse)

| Fichier | Ligne | Texte | Problème |
|---|---|---|---|
| `src/data/course.ts` | 332 | "Ce module vous différencie de 90% des agents." | 90% inventé, aucune source |
| `src/data/lesson-keyconcepts.ts` | 472 | "73% des acheteurs signent pour un bien différent de leur demande initiale" | Stat non sourcée |
| `src/data/timeline-data.ts` | 731 | "80% des mandats se signent après la 3e ou 4e relance." | Stat non sourcée |
| `src/data/exam-questions.ts` | 634 | "30 à 50% selon les études" | "les études" = trop vague |

## 🟡 Sources citées mais à vérifier

| Fichier | Ligne | Texte | Problème |
|---|---|---|---|
| `src/data/trainer-callouts.ts` | 118 | "Selon la FNAIM, 62% des acheteurs..." | Chiffre FNAIM à croiser avec rapport officiel |
| `src/data/trainer-callouts.ts` | 284 | "31 jours plus vite... Source : FNAIM 2024" | Vérifier existence de cette étude FNAIM 2024 |
| `src/data/flashcards.ts` | 872 | "93 jours (Baromètre FNAIM T1 2026)" | **Date future** (2026) dans un baromètre → probablement halluciné |
| `src/data/flashcards.ts` | 848 | "Décote moyenne de 12 à 20% (baromètre LPI-SeLoger 2025)" | **Date future** (2025) → vérifier existence |
| `src/data/quiz-checkpoints.ts` | 307 | "Les statistiques FNAIM montrent qu'un bien sous mandat exclusif se vend en moyenne 3 à 4 fois plus souvent" | Chiffre à croiser avec étude FNAIM |

## 🟠 Références légales non trouvées dans le codebase

Les éléments suivants mentionnés dans un audit externe n'ont **pas été trouvés** dans le codebase actuel :
- "Décret n° 2025-487 du 15 mai 2025"
- "Loi n° 2025-127 du 23 février 2025"
- "73% des agents se sentent mal informés" (FNAIM)
- "23% de commissions supplémentaires"
- "Studios < 9 m² DPE obligatoire"

**Hypothèses :**
- Déjà supprimés dans une version précédente
- Contenus dans les scripts audio (MP3) sans équivalent texte dans le repo
- Dans un autre repo/dossier non versionné

## ✅ Recommandations

1. **Avant toute pub** : faire relire les 36 leçons par un juriste immobilier (ou avocat en droit immobilier)
2. **Toute statistique** doit avoir une source vérifiable (lien, rapport, baromètre officiel)
3. **Toute référence légale** doit être croisée avec Legifrance.fr
4. **Dates futures dans des sources** (FNAIM 2026, LPI 2025) = red flag d'hallucination LLM
5. **Scripts audio** : si les MP3 sont générés à partir de scripts non versionnés, versionner les scripts ET les relire avant TTS
