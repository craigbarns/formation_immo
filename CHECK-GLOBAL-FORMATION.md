# Check global formation — agent immobilier 42 h

Date : 2026-04-18
Périmètre : 5 modules, 36 leçons, app LMS, supports, marketing, certification.
Méthode : inventaire fichiers + audit pédago + audit technique + audit contenu.

---

## Score global : **7,2 / 10**

| Dimension | Score | Verdict |
|---|---|---|
| **Contenu pédagogique** | 8,5/10 | Très solide — 36 leçons, scripts narrés, plans détaillés |
| **Sources & véracité** | 8/10 | Audit fait, 1 correction critique (Cosse→Loc'Avantages) en attente |
| **Production audio** | 9/10 | Couverture complète 36/36 leçons + 8 intros, Voxtral live |
| **Supports interactifs** | 8/10 | 16 600 lignes data — riche (flashcards, quiz, scenarios) |
| **Évaluation / QCM** | 5/10 | 77 questions seulement, 2,1/leçon — sous-dimensionné |
| **Certification** | 3/10 | Modèle d'attestation seul, pas d'examen final ni jury |
| **Vidéo** | 2/10 | Scripts uniquement, aucune vidéo produite |
| **Marketing & vente** | 4/10 | 1 page de vente, pas de tunnel ni emails |
| **Design / UX** | 6,5/10 | Voir DESIGN-ANALYSIS.md (12 pbs documentés) |
| **Cohérence ensemble** | 7/10 | Doc plan ≫ app — gap entre planifié et implémenté |

---

## 1. Inventaire global

### 1.1 Contenu pédagogique brut

| Élément | Volume |
|---|---|
| Modules | 5 (Juridique, Transaction, Financement, Marketing, Terrain) |
| Leçons | **36** (M1: 9 / M2: 7 / M3: 6 / M4: 7 / M5: 7) |
| Scripts narration | **37** fichiers (.narration.txt) |
| Mots narration totaux | **42 681** mots |
| Moyenne par leçon | 1 153 mots ≈ **7-8 min de voix** |
| Durée audio totale estimée | **~4 h 45 min** de TTS |
| Plans pédagogiques | 174 K markdown (5 plans + 1 global) |

### 1.2 Production audio

| Catégorie | Fichiers | Statut |
|---|---|---|
| Audio leçons | **36/36** ✅ | Voxtral mistral-mini-tts |
| Intros modules | 8 | Bien (manque transaction-3 à 7) |
| Voice tests | 16 | Casting voix conservé |
| Demo SadTalker | 1 | POC |
| Volume total | 134 MB | Cohérent |

### 1.3 Supports LMS (TypeScript data)

| Fichier | Lignes | Rôle |
|---|---|---|
| `flashcards.ts` | **3 027** | Cartes mémorisation |
| `pro-checklists.ts` | **2 553** | Checklists métier |
| `case-studies.ts` | **2 056** | Études de cas |
| `quiz-checkpoints.ts` | **1 672** | Quiz intra-leçon |
| `exam-questions.ts` | 834 | Examen final |
| `data-tables.ts` | 822 | Tableaux référence |
| `timeline-data.ts` | 821 | Frises chronologiques |
| `drag-drop-exercises.ts` | 761 | Exercices drag/drop |
| `course.ts` | 709 | Métadonnées cours |
| `guided-calculations.ts` | 570 | Calculs guidés |
| `interactive-scenarios.ts` | 555 | Simulateurs |
| `lesson-keyconcepts.ts` | 492 | Visuels Cinematic |
| `cheat-sheets.ts` | 478 | Mémos express |
| `chat-roleplay.ts` | 324 | Roleplay |
| `placement-test.ts` | 309 | Test entrée |
| `scenarios-M3/4/5.ts` | 458 | Scénarios par module |
| **TOTAL data** | **~16 620 lignes** | Très riche |

### 1.4 Templates métier (5 modules)

| Module | Templates | Format |
|---|---|---|
| M1 Juridique | 5 | docx + xlsx + md (mandat, diagnostics, Tracfin) |
| M2 Transaction | 5 | docx + xlsx + md (estimation, prospection, négo) |
| M3 Financement | 4 | xlsx + docx (calcul rentabilité, simulateur crédit) |
| M4 Marketing | 5 | docx + xlsx (calendrier édito, KPIs, annonce) |
| M5 Terrain | 4 | md (closing, post-vente, visite, objections) |

**Total : 23 templates pratiques.**

---

## 2. Forces

### 🟢 Production audio terminée
36/36 leçons ont leur fichier MP3 généré via Voxtral. Pas un échantillon — la formation peut être consommée intégralement en mode audio dès aujourd'hui.

### 🟢 Densité data exceptionnelle
**16 620 lignes de TS data**. À titre comparatif, une LMS lambda fait 3-5 K. Les flashcards (3 K), checklists pro (2,5 K), case studies (2 K) sont au niveau d'une formation premium.

### 🟢 Sources juridiques auditées
Audit M1 (déjà fait précédemment) + audit M2-5 (`SOURCES-VERIFICATION-MODULES-2-5.md`) confirment que les références CGI / Code civil / Loi Lemoine / Loi ALUR sont **réelles et en vigueur**. C'est un gros différenciant vs concurrents qui inventent les sources.

### 🟢 Plans pédagogiques détaillés
174 K markdown — chaque module a son plan dédié + un plan global de 30 K. Document de référence solide.

### 🟢 Diversité des modalités d'apprentissage
Lecture / audio narré / flashcards / quiz / drag-drop / roleplay chat / scenarios interactifs / cheat sheets / case studies / pro-checklists. **Couverture 360° des styles d'apprentissage.**

### 🟢 Templates métier livrables
23 templates `.docx` / `.xlsx` / `.md`. Le stagiaire repart avec une vraie boîte à outils, pas juste de la théorie.

---

## 3. Manques critiques

### 🔴 [P1] Certification = coquille vide

| Existant | Manque |
|---|---|
| 1 modèle attestation (1,2 K) | Examen final structuré |
| | Jury / mécanisme de validation |
| | Note de passage, critères |
| | Numéro d'attestation, registre |
| | Conformité Qualiopi si visée |

**Impact :** une formation 42 h sans système de certification réel ≠ un produit pro vendable. Aujourd'hui le diplômé reçoit un PDF vide de toute valeur juridique.

**Action :** créer `certification/` avec règlement examen, grille notation, 60-100 questions tirées au sort des 834 lignes `exam-questions.ts`, score min 70 %, génération attestation nominative datée + numéro.

### 🔴 [P2] QCM sous-dimensionné — 77 questions / 36 leçons

| Module | Questions | Leçons | Ratio |
|---|---|---|---|
| M1 | 17 | 9 | 1,9 |
| M2 | 15 | 7 | 2,1 |
| M3 | 15 | 6 | 2,5 |
| M4 | 15 | 7 | 2,1 |
| M5 | 15 | 7 | 2,1 |
| **Total** | **77** | **36** | **2,1** |

**Standard pédagogique professionnel = 5 questions / leçon = 180 minimum.** Aujourd'hui à **43 % de la cible**.

**Action :** générer 100 questions supplémentaires (plutôt en TS dans `exam-questions.ts` pour intégration directe au LMS, pas en .md séparés).

### 🔴 [P3] Aucune vidéo produite

| Existant | Manque |
|---|---|
| Scripts MJ + storyboards par module | 0 vidéo générée |
| 1 demo SadTalker (mp3 seul) | 0 talking-head produit |
| Script intro 42 h | 0 capture |

**Impact :** sur le marché 2026, une formation immo sans aucune vidéo perd 60 % de sa valeur perçue. Les portails (Udemy, Teachable, plateformes pro) demandent 3-5 min vidéo / leçon mini.

**Action 2 niveaux :**
- **Court terme :** générer talking-head SadTalker / HeyGen sur les 5 intros modules + 36 leçons (~30 min de prod IA) — coût ~150 €.
- **Moyen terme :** 5 vidéos pro (1 / module) tournées avec un formateur réel, 8 min chacune, qualité Master Class.

### 🟠 [P4] Évaluation par cas pratique trop légère

5 cas pratiques (1/module), chacun 1-2 K markdown = 1 page A4. **Insuffisant pour un examen pro 42 h.**

**Action :** porter à 3 cas pratiques par module = 15 cas, chacun 5-8 K avec :
- Contexte client détaillé (persona + bien + situation)
- 5 livrables attendus (mandat, lettre, calcul, mail, plan)
- Grille correction 100 points
- Solution-type rédigée

### 🟠 [P5] Marketing & tunnel de vente quasi-inexistant

| Existant | Manque |
|---|---|
| 1 page vente (2,4 K) | Landing optimisée conversion |
| | Séquence email 7 jours pré-vente |
| | Témoignages clients |
| | Funnel post-achat (onboarding) |
| | Page vente avec témoignages, garantie, FAQ |

**Action :** spec un funnel commercial complet — landing + 5 emails + page de vente + page upsell. Repose sur le contenu existant (positionnement, USP, contenu pédago).

### 🟠 [P6] Module 1 Juridique : 9 leçons vs autres modules 6-7

Déséquilibre structurel — **le juridique pèse 25 % des leçons** alors qu'il devrait être autour de 18-20 %. Soit M1 est trop dense, soit les autres modules manquent de matière.

**Recommandation :** étoffer M2/M3/M4/M5 à 8-9 leçons chacun (+10-15 leçons à créer) pour rééquilibrer et passer à **45 leçons** au lieu de 36 — cible cohérente avec le slogan « 42 h ».

### 🟠 [P7] Stats non sourcées (23 chiffres)

Audit M2-5 a recensé 23 statistiques marketing/terrain non sourcées (« 78 % des vendeurs choisissent l'agent rencontré en premier », « 92 % des acheteurs commencent en ligne »…).

**Risque :** crédibilité érodée + risque légal mineur (publicité trompeuse) si chiffres inventés.

**Action :** soit sourcer (FNAIM, baromètre SeLoger, Notaires de France avec URL et année) soit supprimer.

### 🟠 [P8] Loi Cosse à corriger (déjà identifié)

`module3-financement/scripts/06-defiscalisation-dispositifs.md` présente la Loi Cosse comme dispositif actif. Elle a été remplacée par **Loc'Avantages** au 1er mars 2022 (art. 199 tricies CGI, prorogé jusqu'au 31/12/2027).

**Action :** correction immédiate du script + régénération audio TTS (5 min de travail).

---

## 4. Gap planifié vs implémenté

Les plans pédagogiques (174 K markdown) **dépassent l'application réelle** sur plusieurs points :

| Promesse plan | Implémentation |
|---|---|
| Parcours différencié débutant/expert | Test placement existe (309 lignes) mais branchement faible |
| Évaluation continue par compétence | Quiz checkpoint OK mais pas de tracking par compétence |
| Coaching personnalisé | Coach IA existe mais pas d'historique apprenant |
| Communauté / forum | Absent |
| Suivi cohorte | Absent |

**Risque :** vendre la promesse du plan alors que l'app livre 60 % de cette promesse. Soit re-cadrer la promesse à ce qui existe vraiment, soit livrer le delta (forum, tracking compétences, suivi cohorte = 3-4 semaines de dev).

---

## 5. Synthèse — top 5 actions priorisées

### **Sprint 1 (1 semaine) — Crédibilité juridique**
1. Corriger Loi Cosse → Loc'Avantages dans M3 + régénérer audio
2. Ajouter prorogation Denormandie 2027
3. Sourcer ou supprimer les 23 stats non vérifiées

### **Sprint 2 (2 semaines) — Évaluation pro**
4. Étoffer QCM de 77 → 180 questions (intégrer dans `exam-questions.ts`)
5. Concevoir système certification : règlement examen + tirage 60 questions + score 70 % + génération attestation PDF nominative

### **Sprint 3 (3 semaines) — Vidéo IA**
6. Générer talking-head IA pour 5 intros modules + 36 leçons (HeyGen / SadTalker)
7. Intégrer player vidéo dans CinematicPlayer (déjà spec en cours sur visuels sync)

### **Sprint 4 (2 semaines) — Marketing**
8. Tunnel de vente complet : landing optimisée + séquence 5 emails + page vente structurée + onboarding post-achat

### **Sprint 5 (4 semaines) — Rééquilibrage contenu**
9. Étoffer M2-M5 à 8-9 leçons chacun (+10 leçons) pour atteindre 45 leçons / 42 h promises
10. 3 cas pratiques par module = 15 cas (vs 5 actuels)

---

## 6. Diagnostic en une phrase

> Le projet est **solide sur le contenu et l'audio (8,5/10)** mais **incomplet sur la chaîne de valeur (4-5/10) : certification, vidéo, marketing**. Il faut désormais remonter ces 3 piliers à 7/10 minimum pour passer du **prototype riche à un produit commercialisable**.

---

## 7. Documents de référence

- `DESIGN-ANALYSIS.md` — audit design 6,5/10, 12 pbs
- `SOURCES-VERIFICATION-MODULES-2-5.md` — audit juridique 2-5
- `plan-pedagogique/PLAN_PEDAGOGIQUE_GLOBAL.md` — plan 30 K
- `INVENTAIRE-LIVRABLES.md` + `LIVRABLES-RECAPITULATIF.md` — inventaire existant
- `ROADMAP-EXCELLENCE.md` — roadmap historique
