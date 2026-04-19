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

## 🟠 Références légales — correction effectuée

Les 5 textes inventés et l'article abrogé ont été **corrigés** dans les scripts `.md` du dossier `module1-juridique/scripts/` et les `.narration.txt` ont été régénérés :

| Texte inventé | Remplacé par |
|---------------|--------------|
| Décret n° 2025-487 du 15 mai 2025 | Loi Hoguet 70-9 + Décret 72-678 |
| Loi n° 2025-127 du 23 février 2025 | Loi Climat 2021-1104 + CCH L.126-26 |
| Décret n° 2025-612 du 3 juin 2025 | eIDAS + Art. 1366-1367 Code civil |
| Arrêté du 28 septembre 2025 | Arrêté du 10 janvier 2017 |
| Arrêté du 15 septembre 2025 | CCH L.271-4 à L.271-6 |
| Article 1184 Code civil (abrogé) | Articles 1304 à 1304-7 Code civil |

**⚠️ Les MP3 existants dans `public/audio/` contiennent encore les anciennes erreurs.** Ils doivent être régénérés depuis les `.narration.txt` corrigés avant toute mise en production.

## ✅ Corrections effectuées (2026-04-18)

### Module 1 Juridique
- 5 textes juridiques inventés supprimés/remplacés
- 1 article abrogé (1184 CC) mis à jour (1304-1304-7 CC)
- 12+ stats inventées supprimées
- 9 fichiers `.narration.txt` régénérés

### Module 2 Transaction
- 4 stats inventées supprimées (72%, 60%, 30%, 80%)
- 4 fichiers `.narration.txt` régénérés

### Module 3 Financement
- Loi Cosse obsolète → Loc'Avantages (art. 199 tricies CGI, prorogé 2027)
- Denormandie : date butoir 2027 explicitement ajoutée (art. 199 novovicies CGI)
- 1 stat inventée supprimée (73%)
- 2 fichiers `.narration.txt` régénérés

### Module 4 Marketing
- 5 stats inventées supprimées (92%, 3,5x, 78%, 403%, 15%)
- 3 fichiers `.narration.txt` régénérés

### Module 5 Terrain
- 7 stats inventées supprimées (70%, 68%, 60%+répartition, 15%+répartition, 78%, 60%, 73%)
- 7 fichiers `.narration.txt` régénérés

**Total : 37 fichiers `.narration.txt` régénérés sur l'ensemble des 5 modules.**

## ✅ Recommandations

1. **Avant toute pub** : faire relire les 36 leçons par un juriste immobilier (ou avocat en droit immobilier)
2. **Toute statistique** doit avoir une source vérifiable (lien, rapport, baromètre officiel)
3. **Toute référence légale** doit être croisée avec Legifrance.fr
4. **Dates futures dans des sources** (FNAIM 2026, LPI 2025) = red flag d'hallucination LLM
5. **Scripts audio** : si les MP3 sont générés à partir de scripts non versionnés, versionner les scripts ET les relire avant TTS
