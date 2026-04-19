# Source de vérité — Formation Immo LMS

> Document de référence unique pour les données chiffrées, les seuils et les faits juridiques utilisés dans l'application. Toute statistique ou donnée légale doit être vérifiable ici avant d'être intégrée au codebase.

---

## Architecture du contenu

| Élément | Quantité | Source |
|---|---|---|
| Modules | 5 | `src/data/course.ts` |
| Leçons | 36 | `src/data/course.ts` (flatMap) |
| Questions QCM examens | 79 | `src/data/exam-questions.ts` |
| Questions quiz checkpoints | 103 | `src/data/quiz-checkpoints.ts` |
| Flashcards | 200+ | `src/data/flashcards.ts` |
| MP3 audio | 36 | `public/audio/` |
| Alignements WhisperX | 36 | `public/audio-align/` |

---

## Seuils de certification

| Seuil | Valeur | Fichiers concernés |
|---|---|---|
| Réussite examen module | **70 %** | `ExamMode.tsx`, `certification.ts`, `ProfileContent.tsx`, `CertificateGenerator.tsx`, `ExamScoresChart.tsx` |
| Réussite questions ouvertes (IA) | **70/100** | `ExamMode.tsx` |
| Complétion leçons (certificat) | **80 %** | `CertificateGenerator.tsx` |
| Examens réussis minimum (certificat) | **3 / 5** | `CertificateGenerator.tsx` |

---

## Données juridiques validées (M1)

| Sujet | Valeur | Portée |
|---|---|---|
| Délai de rétractation SRU | 10 jours calendaires | **Acquéreur particulier uniquement** — compromis/promesse de vente |
| Durée bail meublé | 1 an (9 mois étudiant) | Loi n° 89-462 du 6 juillet 1989 |
| Durée bail vide (bailleur PP) | 3 ans | Loi n° 89-462 du 6 juillet 1989 |
| Durée bail vide (bailleur PM) | 6 ans | Loi n° 89-462 du 6 juillet 1989 |
| Préavis locataire bail meublé | 1 mois | Loi n° 89-462 du 6 juillet 1989 |
| Honoraires — charge | À charge vendeur **ou** acquéreur selon mandat | Loi Hoguet 70-9 + décret 72-678 |
| Mandat écrit — durée max | 3 mois renouvelables | Loi Hoguet art. 6 |

> **Correction appliquée** : la notion de "répartition" des honoraires entre vendeur et acheteur a été supprimée. Les honoraires sont supportés par l'une ou l'autre partie, jamais répartis.

---

## Données fiscales validées (M3)

| Dispositif | Taux / Durée | Date butoir | Fondement |
|---|---|---|---|
| **Denormandie** | 12 % (6 ans) / 18 % (9 ans) / **21 % (12 ans)** | 31/12/2027 | Art. 199 novovicies CGI |
| **Loc'Avantages** | 15 % à 65 % selon conventionnement | 31/12/2027 | Art. 199 tricies CGI |
| **Pinel** | Fermé | 31/12/2024 | Non reconduit |
| **Malraux** | 22 % (AVAP) / 30 % (secteur sauvegardé) | Permanent | Art. 199 tervicies CGI |
| **Loc'Avantages** (remplace Cosse) | 15 % à 65 % selon conventionnement | 31/12/2027 | Art. 199 tricies CGI |

> **Correction appliquée** : les taux Denormandie 12 ans étaient erronés à 18 % dans certains callouts ; corrigés en **21 %**.

---

## Statistiques — règles de publication

Toute statistique affichée dans l'application doit respecter les règles suivantes :

1. **Source vérifiable** : nom de l'étude, URL ou rapport officiel.
2. **Date de publication** ≤ date de build.
3. **Pas de date future** dans une source citée (ex: "Baromètre FNAIM 2026" interdit en 2025).
4. **Intervalle de confiance** mentionné si disponible.
5. **Revue juridique** obligatoire avant toute citation légale.

### Stats validées

| Stat | Valeur | Source | Date |
|---|---|---|---|
| Part gestion locative dans les agences | 40 % | FNAIM (ordre de grandeur) | 2024 |
| Taux de recommandation client | 15 % | Interne / à sourcer | — |

### Stats supprimées (hallucination LLM)

- "90% des agents" (différenciation module marketing)
- "73% des acheteurs signent pour un bien différent"
- "80% des mandats se signent après la 3e ou 4e relance"
- "Baromètre FNAIM T1 2026" (date future)
- "Baromètre LPI-SeLoger 2025" (date future au moment de la génération)

---

## Références légales valides

| Texte | Statut |
|---|---|
| Loi Hoguet 70-9 | ✅ En vigueur |
| Décret 72-678 | ✅ En vigueur |
| Loi ALUR 2014-366 | ✅ En vigueur |
| Loi Climat & Résilience 2021-1104 | ✅ En vigueur |
| Loi n° 89-462 (baux habitation) | ✅ En vigueur |
| Article 1184 Code civil | ❌ Abrogé — remplacé par art. 1304 à 1304-7 |
| eIDAS | ✅ En vigueur (signature électronique) |

---

## Révisions

| Date | Auteur | Changement |
|---|---|---|
| 2026-04-17 | Kimi Code CLI | Uniformisation certification 70 %, corrections M1/M3, création du document |

---

**Ce document est la source de vérité unique. Toute divergence entre le code et ce document doit être traitée comme un bug critique.**
