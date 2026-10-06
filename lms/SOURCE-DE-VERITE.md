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
- "+403 % de demandes de visite avec une vidéo" (QCM marketing)
- "Un prospect se fait une opinion en 30 secondes" (QCM marketing)
- "Un message privé convertit 10× mieux que la publicité" (QCM marketing)
- "Un exclusif se vend 3 à 4 fois plus (FNAIM)" (QCM transaction)
- "Un particulier réalise 3 à 5 transactions dans sa vie" (QCM terrain)
- "La vente via agence se fait 10 à 15 % plus cher qu'en PAP" (QCM terrain)
- "Un bon taux de conversion se situe entre 15 et 30 %" (QCM transaction)

---

## Données réglementaires validées — octobre 2026

| Sujet | Règle | Source |
|---|---|---|
| Démarchage téléphonique | Interdit sans consentement préalable du particulier depuis le 11/08/2026 (fin de Bloctel). Consentement spécifique, 1 an maximum, sans reconduction tacite, preuve conservée 3 ans. Amende jusqu'à 75 000 € (PP) / 375 000 € (PM). Professionnels non concernés. | C. conso. L.223-1, L.242-16 ; loi n° 2025-594 du 30/06/2025 ; décret n° 2026-662 du 23/07/2026 |
| Démarchage rénovation énergétique | Interdit même avec consentement (sauf contrat en cours) | Loi n° 2020-901 du 24/07/2020 |
| Horaires d'appel | Semaine, 10 h-13 h et 14 h-20 h, hors fériés ; 4 tentatives max / 30 jours | C. conso. D.223-8 et D.223-9 |
| DPE — électricité | Coefficient d'énergie primaire 2,3 → 1,9 au 01/01/2026 (≈ 850 000 logements gagnent une classe ; attestation ADEME gratuite pour les DPE depuis 07/2021) | Arrêté d'août 2025 ; observatoire DPE ADEME |
| DPE collectif | Obligatoire pour toutes les copropriétés (y compris ≤ 50 lots) depuis le 01/01/2026 | Loi Climat & Résilience |
| Décence énergétique | G non décent depuis 01/01/2025, F au 01/01/2028, E au 01/01/2034, partout en France ; loyers F et G gelés depuis le 24/08/2022 | Loi Climat & Résilience |
| Photovoltaïque ≤ 9 kWc | Demandes de raccordement depuis le 05/06/2026 : surplus racheté 1,1 c€/kWh, prime à l'autoconsommation supprimée, vente en totalité impossible. TVA 5,5 % (sous conditions) depuis 10/2025. Contrats antérieurs maintenus. | Arrêté du 01/06/2026 (JO du 04/06/2026) |
| MaPrimeRénov' d'ampleur | Logements E, F ou G ; 2 gestes d'isolation ; gain ≥ 2 classes ; accompagnement obligatoire. Plafond 30 000 € HT (2 classes) / 40 000 € HT (3+). Taux 80 / 60 / 45 / 10 % selon revenus. | Guide des aides Anah, éd. septembre 2026 |
| MaPrimeRénov' par geste | Chauffage décarboné ; revenus très modestes, modestes et intermédiaires | Guide des aides Anah, éd. septembre 2026 |
| Éco-PTZ MaPrimeRénov' | Jusqu'à 50 000 €, 20 ans max | Guide des aides Anah, éd. septembre 2026 |
| LMNP micro-BIC | 50 % (recettes ≤ 77 700 €) : meublé classique et meublé de tourisme classé ; 30 % (≤ 15 000 €) : meublé de tourisme non classé. Le taux de 71 % n'existe plus. | Loi Le Meur n° 2024-1039 |
| Exercice sans carte | 6 mois d'emprisonnement et 7 500 € d'amende | Loi Hoguet, art. 14 |
| Formation continue | 42 h / 3 ans (ou 14 h / an), dont 2 h déontologie et 2 h non-discrimination | Décrets n° 2016-173 et 2020-1259 |
| Mandat exclusif | Dénonçable à tout moment après 3 mois, préavis de 15 jours (LRAR) | Décret 72-678, art. 78 |
| Candidats locataires non retenus | Dossier conservé 3 mois maximum | Référentiel CNIL gestion locative (2021) |
| Prospects | Données conservées 3 ans après le dernier contact | Recommandation CNIL |

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
| 2026-10-06 | Claude Code | Fin de Bloctel, DPE 2026, photovoltaïque (arrêté du 01/06/2026), MaPrimeRénov' 2026, LMNP, CNIL ; QCM réécrits |

---

**Ce document est la source de vérité unique. Toute divergence entre le code et ce document doit être traitée comme un bug critique.**
