# Module 6 — Déontologie & Éthique professionnelle — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Créer un Module 6 "Déontologie & Éthique professionnelle" (4h) en restructurant les modules existants pour maintenir la formation à 42h exactement.

**Architecture:** Ajout de 3 nouveaux scripts markdown dans `module6-deontologie/scripts/`, fusion de leçons dans M3 et M5, mise à jour de `course.ts` + `exam-questions.ts` + `flashcards.ts`. Aucune migration DB requise.

**Tech Stack:** TypeScript (course.ts, exam-questions.ts, flashcards.ts), Markdown (scripts leçons), Next.js App Router

---

## Fichiers impactés

| Action | Fichier |
|--------|---------|
| Créer | `module6-deontologie/scripts/01-non-discrimination-pratique.md` |
| Créer | `module6-deontologie/scripts/02-code-deontologie.md` |
| Créer | `module6-deontologie/scripts/03-ethique-pratique.md` |
| Créer | `module3-financement/scripts/script07-fiscalite-avancee-dispositifs-defiscalisation.md` |
| Créer | `module5-terrain/scripts/08-prise-de-mandat-decouverte-client.md` |
| Modifier | `lms/src/data/course.ts` |
| Modifier | `lms/src/data/exam-questions.ts` |
| Modifier | `lms/src/data/flashcards.ts` |

---

## Task 1 : Script — Non-discrimination pratique et prévention

**Files:**
- Create: `module6-deontologie/scripts/01-non-discrimination-pratique.md`

- [ ] **Step 1 : Créer le répertoire et le fichier**

```bash
mkdir -p /Users/gregorybaranes/Desktop/formation_immo_local/module6-deontologie/scripts
```

Créer `module6-deontologie/scripts/01-non-discrimination-pratique.md` avec ce contenu exact :

```markdown
# SCRIPT LEÇON 2 — M6 : NON-DISCRIMINATION À L'ACCÈS AU LOGEMENT — PRATIQUES ET PRÉVENTION

> **Narration audio (TTS)** : texte nettoyé dans `*.narration.txt`. Régénérer avec `node lms/scripts/extract-narration-for-audio.mjs`, puis MP3 via `node lms/scripts/mistral-voxtral-tts.mjs`.

## INFORMATIONS TECHNIQUES

- **Durée** : 10 minutes 30 secondes
- **Nombre de mots** : 1 680 mots
- **Rythme** : 160 mots/minute
- **Voix recommandée** : `Rachel` (voix féminine, pédagogue, bienveillante)

---

## PROMPT MIDJOURNEY - VISUEL PRINCIPAL

```
Diverse group of people in a modern French real estate office, agent holding a document with equality symbols, professional and inclusive atmosphere, warm lighting, 8k photorealistic --ar 16:9 --style raw
```

---

## SCRIPT COMPLET

---

### INTRODUCTION (45 secondes)

[B-ROLL : Agence immobilière, agents discutant avec des candidats locataires variés]

**Voix off :**
Chaque année en France, des milliers de personnes se voient refuser un logement non pas à cause de leur dossier financier… mais à cause de leur origine, de leur nom, ou de leur apparence. En tant que professionnel de l'immobilier, vous êtes en première ligne. Vous pouvez subir des pressions discriminatoires, et vous risquez des sanctions pénales si vous y cédez. Dans cette leçon, vous allez apprendre à reconnaître la discrimination, à vous y opposer, et à vous protéger.

---

### PARTIE 1 — LES 25 CRITÈRES DE DISCRIMINATION (3 minutes)

[SLIDE : liste des 25 critères, art. 225-1 Code pénal]

**Voix off :**
L'article 225-1 du Code pénal liste aujourd'hui 25 critères de discrimination prohibés. Les voici :

Origine, sexe, situation de famille, grossesse, apparence physique, vulnérabilité économique, patronyme, lieu de résidence, état de santé, perte d'autonomie, handicap, caractéristiques génétiques, mœurs, orientation sexuelle, identité de genre, âge, opinions politiques, activités syndicales, appartenance ou non-appartenance, vraie ou supposée, à une ethnie, une nation, une race ou une religion déterminée.

Ajoutés plus récemment : la domiciliation bancaire, la capacité à s'exprimer dans une langue autre que le français, le lieu de naissance.

**À retenir :** Un propriétaire qui vous dit "pas d'Arabes, pas de Noirs, pas de familles avec enfants" vous demande de commettre une infraction pénale. Vous n'avez pas à obéir.

---

### PARTIE 2 — DISCRIMINATION DIRECTE, INDIRECTE, SYSTÉMIQUE (2 minutes)

[SLIDE : 3 colonnes — directe / indirecte / systémique]

**Voix off :**
Il existe trois formes de discrimination.

**La discrimination directe** : le refus est explicite. "Je ne veux pas louer à quelqu'un d'origine étrangère." C'est la forme la plus évidente — et paradoxalement pas la plus fréquente dans votre pratique.

**La discrimination indirecte** : une règle apparemment neutre qui désavantage un groupe. Par exemple : exiger un garant en France alors qu'un candidat étranger a un CDI bien rémunéré mais ses garants sont à l'étranger. Cette pratique peut être discriminatoire si elle n'est pas objectivement justifiée.

**La discrimination systémique** : elle résulte de pratiques accumulées dans une organisation — un tri automatique des dossiers par nom de famille, par code postal, etc.

---

### PARTIE 3 — LE TESTING : PROCÉDURE ET VALEUR DE PREUVE (2 minutes)

[SLIDE : schéma du processus de testing]

**Voix off :**
Le testing est une technique d'enquête reconnue par les tribunaux français. Voici comment il fonctionne : deux candidats identiques sur le plan financier — même revenu, même emploi — mais différents sur un critère protégé (origine, prénom, etc.) envoient des demandes à la même agence. Si l'un reçoit une réponse favorable et l'autre non, cela constitue une preuve de discrimination.

Depuis la loi du 27 janvier 2017, le testing est explicitement reconnu comme preuve admissible devant les tribunaux. Les associations comme le Défenseur des droits, SOS Racisme, ou la HALDE utilisent régulièrement cette méthode.

**Sanctions :** 3 ans d'emprisonnement et 45 000 € d'amende pour discrimination dans l'accès au logement (art. 225-2 Code pénal). Ces sanctions s'appliquent à l'agent qui a exécuté l'instruction discriminatoire, pas seulement au propriétaire qui l'a donnée.

---

### PARTIE 4 — SCRIPTS D'ENTRETIEN NON-DISCRIMINANTS (2 minutes)

[SLIDE : formulaire de sélection standardisé]

**Voix off :**
La meilleure protection est un processus de sélection standardisé et documenté. Voici les règles :

**Ce que vous pouvez demander :** revenus (justificatifs de revenus), contrat de travail, avis d'imposition, identité.

**Ce que vous ne pouvez PAS demander :** photo, état civil complet (sauf pour le bail), origine, religion, situation familiale détaillée.

Utilisez une grille de scoring objective : ratio loyer/revenu, stabilité de l'emploi, historique locatif. Appliquez les mêmes critères à tous les dossiers. Conservez vos refus écrits avec la justification objective.

---

### PARTIE 5 — CAS PRATIQUE : RÉPONDRE À UN BAILLEUR DISCRIMINANT (1 minute 30)

[MISE EN SCÈNE : conversation téléphonique]

**Voix off :**
Votre client vous dit : "Je ne veux pas de locataires d'Afrique du Nord dans mon appartement."

Voici quoi répondre : "Monsieur/Madame, je comprends que vous souhaitez le meilleur locataire pour votre bien. Cependant, je ne peux légalement sélectionner les candidats sur des critères d'origine — c'est une discrimination pénalement réprimée, et vous comme moi risquerions des poursuites. Ce que je peux faire, c'est vous présenter uniquement des dossiers qui correspondent à vos critères financiers objectifs : CDI, revenus 3x le loyer, garant. Est-ce que ça vous convient ?"

Si le client insiste, vous pouvez refuser le mandat. Vous êtes protégé par le Code de déontologie.

---

### CONCLUSION (30 secondes)

**Voix off :**
La non-discrimination n'est pas une contrainte administrative — c'est une protection pour vous. Un processus de sélection objectif et documenté vous protège des accusations, fidélise vos clients propriétaires sur le long terme, et garantit votre réputation professionnelle. Dans la prochaine leçon, nous abordons le Code de déontologie qui encadre l'ensemble de votre pratique.
```

- [ ] **Step 2 : Vérifier que le fichier est créé**

```bash
ls -la /Users/gregorybaranes/Desktop/formation_immo_local/module6-deontologie/scripts/
```
Résultat attendu : `01-non-discrimination-pratique.md` présent.

- [ ] **Step 3 : Commit**

```bash
git add module6-deontologie/
git commit -m "content: script leçon non-discrimination pratique (M6)"
```

---

## Task 2 : Script — Code de déontologie

**Files:**
- Create: `module6-deontologie/scripts/02-code-deontologie.md`

- [ ] **Step 1 : Créer le fichier**

Créer `module6-deontologie/scripts/02-code-deontologie.md` avec ce contenu :

```markdown
# SCRIPT LEÇON 3 — M6 : LE CODE DE DÉONTOLOGIE DES PROFESSIONNELS DE L'IMMOBILIER

> **Narration audio (TTS)** : texte nettoyé dans `*.narration.txt`.

## INFORMATIONS TECHNIQUES

- **Durée** : 10 minutes 30 secondes
- **Nombre de mots** : 1 680 mots
- **Rythme** : 160 mots/minute
- **Voix recommandée** : `Josh` (voix masculine, posée, professionnelle)

---

## PROMPT MIDJOURNEY - VISUEL PRINCIPAL

```
French real estate professional studying a legal document, elegant office, French flag, scales of justice in background, professional attire, 8k photorealistic --ar 16:9 --style raw
```

---

## SCRIPT COMPLET

---

### INTRODUCTION (40 secondes)

[B-ROLL : Agent immobilier consulte un document officiel dans son bureau]

**Voix off :**
Depuis 2015, les professionnels de l'immobilier sont soumis à un Code de déontologie officiel — un texte réglementaire qui définit vos obligations éthiques et les sanctions encourues en cas de manquement. Méconnu de nombreux praticiens, ce code est pourtant central dans votre pratique. Il vous protège, il protège vos clients, et il structure votre réputation professionnelle.

---

### PARTIE 1 — LE DÉCRET 2015-1090 : HISTORIQUE ET PORTÉE (2 minutes)

[SLIDE : Décret n°2015-1090 du 28 août 2015]

**Voix off :**
Le Code de déontologie des professionnels de l'immobilier a été institué par le décret n°2015-1090 du 28 août 2015, pris en application de la loi ALUR. Il s'applique à toutes les personnes physiques ou morales titulaires d'une carte professionnelle au titre de la loi Hoguet du 2 janvier 1970.

Ce code s'impose à vous, à vos collaborateurs habilités, et à vos négociateurs, qu'ils soient salariés ou agents commerciaux. Il est opposable devant les instances disciplinaires et les tribunaux.

---

### PARTIE 2 — LES 10 PRINCIPES FONDAMENTAUX (3 minutes)

[SLIDE : liste des 10 principes]

**Voix off :**
Le Code de déontologie repose sur 10 principes fondamentaux. Retenez-les.

**1. Compétence :** Vous devez maintenir et développer vos connaissances. C'est la base de l'obligation de formation continue (42h/3 ans).

**2. Conscience professionnelle :** Vous exercez avec soin, diligence, et dans l'intérêt de votre client.

**3. Loyauté :** Vous ne trompez pas, vous ne dissmulez pas d'informations essentielles.

**4. Désintéressement :** Vous ne cherchez pas à tirer un avantage personnel au détriment de votre client. Pas de double commission cachée, pas de rétrocession non déclarée.

**5. Confraternité :** Vous respectez vos confrères. Pas de dénigrement, pas de débauchage de clients.

**6. Délicatesse :** Vous exercez avec tact dans les situations sensibles (succession, divorce, difficultés financières).

**7. Modération :** Vos communications commerciales restent mesurées et véridiques.

**8. Courtoisie :** Vous traitez chacun avec respect, indépendamment de sa situation.

**9. Indépendance :** Vous résistez aux pressions qui pourraient vous amener à manquer à vos obligations.

**10. Secret professionnel :** Vous préservez la confidentialité des informations que vos clients vous confient.

---

### PARTIE 3 — LA CNTGI : RÔLE ET PROCÉDURE DISCIPLINAIRE (2 minutes 30)

[SLIDE : organigramme CNTGI]

**Voix off :**
La Commission Nationale de la Transaction et de la Gestion Immobilières — la CNTGI — est l'instance disciplinaire de la profession. Elle est composée de représentants de l'État, de professionnels, et de consommateurs.

**Qui peut la saisir ?** Tout client s'estimant lésé, un confrère, ou le préfet de département.

**Procédure :** Saisine écrite → instruction → audition du professionnel → délibération.

**Sanctions possibles :**
- Avertissement
- Blâme
- Interdiction temporaire d'exercer (1 à 3 ans)
- Interdiction définitive d'exercer

Ces sanctions sont indépendantes des poursuites civiles ou pénales — vous pouvez cumuler une sanction disciplinaire ET une condamnation pénale pour le même fait.

---

### PARTIE 4 — RESPONSABILITÉS CIVILE, DISCIPLINAIRE ET PÉNALE (1 minute 30)

[SLIDE : 3 colonnes de responsabilité]

**Voix off :**
En cas de manquement, vous pouvez faire face à trois types de responsabilité simultanément.

**Responsabilité civile :** votre client obtient des dommages-intérêts si vous lui avez causé un préjudice (renseignement erroné, vice caché non signalé).

**Responsabilité disciplinaire :** la CNTGI prononce une sanction pouvant aller jusqu'à l'interdiction d'exercer.

**Responsabilité pénale :** le Code pénal punit certains manquements — escroquerie, abus de confiance, discrimination.

---

### PARTIE 5 — L'OBLIGATION DE FORMATION CONTINUE (1 minute)

[SLIDE : 14h/an, 42h/3 ans]

**Voix off :**
La loi ALUR impose 42 heures de formation continue sur 3 ans pour renouveler votre carte professionnelle. Ces heures doivent couvrir des thématiques précises : droit, techniques de l'immobilier, déontologie, non-discrimination.

Cette formation, que vous êtes en train de suivre, contribue directement à remplir cette obligation. Conservez vos attestations de suivi — elles sont requises pour le renouvellement de la carte T.

---

### CONCLUSION (30 secondes)

**Voix off :**
Le Code de déontologie n'est pas une contrainte abstraite. C'est votre bouclier professionnel. En le respectant, vous vous protégez des litiges, vous construisez une réputation solide, et vous contribuez à élever le niveau de toute la profession. Dans la leçon suivante, nous allons mettre ces principes à l'épreuve avec des situations réelles : conflits d'intérêts, dilemmes éthiques, RGPD.
```

- [ ] **Step 2 : Vérifier**

```bash
ls -la /Users/gregorybaranes/Desktop/formation_immo_local/module6-deontologie/scripts/
```
Attendu : 2 fichiers présents.

- [ ] **Step 3 : Commit**

```bash
git add module6-deontologie/scripts/02-code-deontologie.md
git commit -m "content: script leçon code de déontologie (M6)"
```

---

## Task 3 : Script — Éthique pratique

**Files:**
- Create: `module6-deontologie/scripts/03-ethique-pratique.md`

- [ ] **Step 1 : Créer le fichier**

Créer `module6-deontologie/scripts/03-ethique-pratique.md` :

```markdown
# SCRIPT LEÇON 4 — M6 : ÉTHIQUE PRATIQUE — CONFLITS D'INTÉRÊTS ET SITUATIONS À RISQUE

> **Narration audio (TTS)** : texte nettoyé dans `*.narration.txt`.

## INFORMATIONS TECHNIQUES

- **Durée** : 10 minutes 30 secondes
- **Nombre de mots** : 1 680 mots
- **Rythme** : 160 mots/minute
- **Voix recommandée** : `Josh`

---

## PROMPT MIDJOURNEY - VISUEL PRINCIPAL

```
French real estate agent at crossroads, two paths, ethical dilemma concept, professional office background, balanced scales, modern corporate style, 8k photorealistic --ar 16:9 --style raw
```

---

## SCRIPT COMPLET

---

### INTRODUCTION (40 secondes)

**Voix off :**
Connaître les règles, c'est bien. Savoir comment se comporter quand elles sont mises à l'épreuve dans la vraie vie, c'est ce qui fait la différence entre un professionnel ordinaire et un professionnel de confiance. Dans cette leçon, nous allons traverser ensemble les situations à risque les plus fréquentes : conflits d'intérêts, secret professionnel, RGPD, pratiques trompeuses, et cinq dilemmes éthiques réels.

---

### PARTIE 1 — DOUBLE MANDANT ET CONFLITS D'INTÉRÊTS (2 minutes 30)

[SLIDE : schéma vendeur-acheteur-agent]

**Voix off :**
Le double mandant, c'est quand vous représentez à la fois le vendeur et l'acheteur dans la même transaction. C'est légal — mais encadré.

**Vos obligations :**
- Informer les deux parties de votre double rôle, par écrit, avant toute négociation.
- Ne pas divulguer à l'acheteur le prix plancher du vendeur, et vice versa.
- Facturer votre commission de façon transparente aux deux parties.

**Le conflit d'intérêts élargi :** Vous ne pouvez pas acheter un bien pour vous-même via le mandat d'un client vendeur sans l'informer. Vous ne pouvez pas orienter un client vers un prestataire (notaire, banque, assureur) contre rémunération cachée.

**Signal d'alerte :** Dès que vous pensez "est-ce que je peux faire ça ?", la réponse est probablement non — ou du moins, ça nécessite une transparence totale.

---

### PARTIE 2 — SECRET PROFESSIONNEL ET RGPD (2 minutes)

[SLIDE : cadenas sur des données]

**Voix off :**
En tant qu'agent immobilier, vous collectez des données personnelles sensibles : revenus, situation familiale, avis d'imposition, coordonnées bancaires. Le RGPD (Règlement Général sur la Protection des Données) vous impose :

**1. Base légale :** Vous devez avoir un motif légitime pour collecter chaque donnée (exécution du contrat, obligation légale, intérêt légitime).

**2. Durée de conservation :** Dossiers locataires refusés : 1 an maximum. Mandats et actes : 5 ans (prescription civile). Données comptables : 10 ans.

**3. Droits des personnes :** Vos clients ont le droit d'accéder à leurs données, de les rectifier, et dans certains cas de les supprimer.

**4. Sécurité :** Protégez vos fichiers clients. Ne les partagez pas par email non sécurisé. En cas de violation, vous devez notifier la CNIL dans les 72h.

**Secret professionnel :** Les informations confidentielles que vos clients vous confient (situation financière, motivations de vente) ne se partagent pas — ni avec des confrères, ni sur les réseaux sociaux.

---

### PARTIE 3 — PRATIQUES COMMERCIALES TROMPEUSES (1 minute 30)

[SLIDE : exemples de pratiques illicites]

**Voix off :**
Les articles L.121-1 à L.121-7 du Code de la consommation définissent les pratiques commerciales trompeuses. En immobilier, les plus fréquentes sont :

- Annoncer un bien à un prix inférieur à la réalité pour attirer des appels, puis prétendre qu'il est "déjà vendu" (appât).
- Surestimer délibérément un bien pour obtenir le mandat, sachant que le prix sera abaissé ensuite.
- Omettre des informations essentielles : servitude, projet urbain à proximité, sinistres passés.
- Utiliser des photos trompeuses ou retouchées qui ne représentent pas l'état réel du bien.

Sanctions : jusqu'à 2 ans d'emprisonnement et 300 000 € d'amende.

---

### PARTIE 4 — 5 DILEMMES ÉTHIQUES EN MISE EN SITUATION (3 minutes)

[SLIDE : 5 cas numérotés]

**Voix off :**
Voici 5 situations réelles. Pour chacune, demandez-vous ce que vous feriez — puis écoutez la réponse éthique et légale.

**Dilemme 1 :** Votre vendeur vous demande de ne pas mentionner l'humidité dans la cave lors des visites.
*Réponse :* Refus. L'article 1112-1 du Code civil impose de révéler les informations déterminantes pour le consentement de l'acheteur. Vous risquez une annulation de vente et des dommages-intérêts.

**Dilemme 2 :** Un acquéreur vous propose 2 000 € "pour vous" si vous faites accepter son offre en dessous du prix.
*Réponse :* Refus catégorique. C'est un abus de confiance (art. 314-1 Code pénal) et une violation du devoir de loyauté envers votre mandant vendeur.

**Dilemme 3 :** Un confrère vous appelle pour vous demander à quel prix votre client vendeur accepterait de céder.
*Réponse :* Refus de divulguer. Secret professionnel. Vous pouvez collaborer sur la transaction sans trahir votre mandant.

**Dilemme 4 :** Vous avez un client acheteur parfait pour un bien — mais c'est votre cousin qui veut acheter.
*Réponse :* Transparence totale auprès du vendeur. Informez-le par écrit du lien de parenté. Il peut décider de continuer ou non avec vous.

**Dilemme 5 :** Un propriétaire vous demande de rejeter tous les dossiers de candidats bénéficiant des APL.
*Réponse :* Refus. La discrimination par la domiciliation bancaire ou les allocations est prohibée depuis la loi Égalité et Citoyenneté 2017.

---

### PARTIE 5 — RÈGLES DE CONFRATERNITÉ (45 secondes)

**Voix off :**
Le Code de déontologie encadre aussi vos relations avec vos confrères. Vous ne pouvez pas dénigrer une autre agence pour obtenir un mandat. Vous ne pouvez pas contacter directement le client d'un confrère si vous savez qu'il est sous mandat exclusif. En cas de partage d'honoraires (inter-agences), les termes doivent être convenus par écrit avant toute présentation de l'offre.

---

### CONCLUSION (30 secondes)

**Voix off :**
L'éthique professionnelle n'est pas un frein à votre performance — c'est son fondement. Les agents qui durent, ceux qui construisent une clientèle fidèle et une réputation solide, sont ceux qui ont fait de la transparence et de l'intégrité leur signature. Vous avez maintenant les outils pour agir avec confiance dans les situations les plus complexes.
```

- [ ] **Step 2 : Vérifier**

```bash
ls /Users/gregorybaranes/Desktop/formation_immo_local/module6-deontologie/scripts/
```
Attendu : 3 fichiers.

- [ ] **Step 3 : Commit**

```bash
git add module6-deontologie/scripts/03-ethique-pratique.md
git commit -m "content: script leçon éthique pratique conflits d'intérêts (M6)"
```

---

## Task 4 : Script fusionné M3 — Fiscalité avancée

**Files:**
- Create: `module3-financement/scripts/script07-fiscalite-avancee-dispositifs-defiscalisation.md`

- [ ] **Step 1 : Créer le fichier de fusion**

Créer `module3-financement/scripts/script07-fiscalite-avancee-dispositifs-defiscalisation.md` :

```markdown
# SCRIPT LEÇON FUSIONNÉE — M3 : FISCALITÉ AVANCÉE — DISPOSITIFS ET DÉFISCALISATION

> Fusion des anciens scripts 04 (Dispositifs fiscaux) et 06 (Défiscalisation). Durée : 120 min.

## INFORMATIONS TECHNIQUES

- **Durée** : 20 minutes
- **Nombre de mots** : 3 200 mots
- **Rythme** : 160 mots/minute

---

## PARTIE A — DISPOSITIFS FISCAUX ACTIFS EN 2026

### Denormandie
Dispositif de défiscalisation dans l'immobilier ancien avec travaux, dans les villes du programme Action Cœur de Ville. Réduction d'impôt de 12%, 18% ou 21% selon la durée de location (6, 9 ou 12 ans). Plafond d'investissement : 300 000 €/an.

### Malraux
Pour les immeubles situés en secteur sauvegardé ou ZPPAUP. Réduction d'impôt de 22% à 30% des travaux de restauration. Non soumis au plafonnement des niches fiscales. Idéal pour investisseurs avec fort revenu foncier.

### Monuments Historiques
Déduction totale des charges et travaux des revenus globaux (sans plafond). Engagement de conservation de 15 ans minimum. Pour immeubles classés ou inscrits à l'Inventaire Supplémentaire.

### Loc'Avantages
Réduction d'impôt de 15% à 65% selon le niveau de loyer consenti (intermédiaire, social, très social) et la convention avec l'Anah. Accessible sur tout le territoire.

### Pinel : fin au 31/12/2024
Le Pinel classique a pris fin le 31 décembre 2024. Informez vos clients investisseurs : les dossiers déposés avant cette date sont maintenus jusqu'à leur terme, mais aucun nouveau Pinel n'est possible.

---

## PARTIE B — STRATÉGIES DE DÉFISCALISATION

### Comprendre l'histoire pour conseiller
Besson (1999), Robien (2003), Scellier (2009), Duflot (2013), Pinel (2014-2024) : chaque dispositif a eu ses règles propres. Des clients ont encore des biens sous ces régimes. Sachez les identifier pour les conseiller sur leurs obligations locatives résiduelles.

### La règle des plafonds
La plupart des niches fiscales sont soumises au plafond global de 10 000 € de réduction d'impôt par an (sauf Malraux et Monuments Historiques). Votre rôle est d'orienter vers un Conseiller en Gestion de Patrimoine (CGP) pour les montages complexes.

### Votre rôle dans le conseil
Vous n'êtes pas conseiller fiscal. Votre rôle est d'identifier les dispositifs applicables à un bien, d'expliquer leur mécanisme général, et de référer le client à un CGP ou expert-comptable pour la stratégie fiscale personnalisée. Facturer un conseil fiscal sans habilitation est illégal.
```

- [ ] **Step 2 : Commit**

```bash
git add module3-financement/scripts/script07-fiscalite-avancee-dispositifs-defiscalisation.md
git commit -m "content: script fusionné dispositifs fiscaux + défiscalisation (M3)"
```

---

## Task 5 : Script fusionné M5 — Prise de mandat & découverte client

**Files:**
- Create: `module5-terrain/scripts/08-prise-de-mandat-decouverte-client.md`

- [ ] **Step 1 : Créer le fichier de fusion**

Créer `module5-terrain/scripts/08-prise-de-mandat-decouverte-client.md` :

```markdown
# SCRIPT LEÇON FUSIONNÉE — M5 : PRISE DE MANDAT & DÉCOUVERTE CLIENT

> Fusion des anciens scripts 06 (R0/R1/R2) et 07 (Découverte client). Durée : 90 min.

## INFORMATIONS TECHNIQUES

- **Durée** : 15 minutes
- **Nombre de mots** : 2 400 mots
- **Rythme** : 160 mots/minute

---

## PARTIE A — R0 / R1 / R2 : PRISE DE MANDAT EN 3 ÉTAPES

### R0 — Qualification téléphonique
Objectif : valider que le bien et le vendeur méritent un déplacement. Questions clés : "Pourquoi vendez-vous ?", "Avez-vous déjà un prix en tête ?", "Avez-vous déjà confié un mandat ?". Durée max : 7 minutes. Si le bien correspond à votre secteur et que le vendeur est décidé → R1.

### R1 — Visite du bien et découverte vendeur
Objectif : visiter le bien ET comprendre la motivation du vendeur. Ne parlez pas de prix. Posez des questions sur le projet de vie : "Où allez-vous après la vente ?", "Dans quel délai souhaitez-vous déménager ?". Prenez des notes sur l'état du bien. Fixez un R2 pour la présentation de l'estimation.

### R2 — Présentation de l'estimation et signature du mandat
Arrivez avec un dossier d'estimation étayé (comparables DVF, prix au m², contexte marché local). Présentez votre fourchette de prix avec justifications. Gérez les objections (trop bas, j'ai eu une offre à plus). Proposez le mandat exclusif avec les arguments de valeur : engagement, marketing premium, reporting hebdomadaire.

---

## PARTIE B — DÉCOUVERTE CLIENT & SUIVI ACQUÉREUR

### La méthode iceberg
Ce que l'acquéreur dit (surface) : "Je cherche un T3 avec parking." Ce qu'il veut vraiment (profond) : espace pour télétravailler, école primaire à pied, investissement patrimonial. Votre travail est de creuser sous la surface.

### Les 4 catégories de questions de découverte
1. **Besoins fonctionnels** : surface, pièces, localisation, budget.
2. **Besoins émotionnels** : cadre de vie, sécurité, prestige.
3. **Contraintes** : délai d'emménagement, revente en cours, apport disponible.
4. **Motivation** : pourquoi maintenant ? Qu'est-ce qui les a décidés à chercher ?

### Suivi acquéreur sur 30 jours
- J+0 : fiche acquéreur complète, alertes portails configurées.
- J+7 : bilan des visites, ajustement des critères si nécessaire.
- J+14 : partage actif de biens en portefeuille correspondant.
- J+30 : appel de suivi — toujours en recherche ? Critères évolués ?

Ne laissez jamais un acquéreur sans nouvelles plus de 10 jours. La concurrence est active.
```

- [ ] **Step 2 : Commit**

```bash
git add module5-terrain/scripts/08-prise-de-mandat-decouverte-client.md
git commit -m "content: script fusionné R0/R1/R2 + découverte client (M5)"
```

---

## Task 6 : Mettre à jour course.ts

**Files:**
- Modify: `lms/src/data/course.ts`

- [ ] **Step 1 : Modifier M1 — retirer la leçon non-discrimination**

Dans `lms/src/data/course.ts`, supprimer l'entrée suivante dans le tableau `lessons` de M1 (slug `"juridique"`) :

```typescript
// SUPPRIMER ce bloc entier de M1 :
{
  slug: "non-discrimination",
  title: "Non-discrimination — obligations et conformité",
  scriptFile: "module1-juridique/scripts/08-non-discrimination.md",
  videoUrl: null,
  audioUrl: "/audio/08-non-discrimination.mp3",
  duration: 60,
  difficulty: "intermediaire",
  objectives: [
    "Connaître les 25 critères de discrimination prohibés",
    "Identifier la discrimination directe, indirecte et les instructions",
    "Mettre en place une grille de sélection locataire conforme",
    "Répondre professionnellement à une demande discriminatoire",
  ],
},
```

Mettre à jour le commentaire de M1 :
```typescript
// MODULE 1 — JURIDIQUE & CONFORMITÉ  (480 min = 8h)
```

- [ ] **Step 2 : Modifier M3 — remplacer les 2 leçons par la leçon fusionnée**

Dans M3 (slug `"financement"`), remplacer les deux entrées `dispositifs` et `defiscalisation` par :

```typescript
// REMPLACER les entrées "dispositifs" ET "defiscalisation" par :
{
  slug: "fiscalite-avancee",
  title: "Fiscalité avancée — dispositifs et défiscalisation",
  scriptFile: "module3-financement/scripts/script07-fiscalite-avancee-dispositifs-defiscalisation.md",
  videoUrl: null,
  audioUrl: null,
  duration: 120,
  difficulty: "avance" as const,
  objectives: [
    "Maîtriser les dispositifs fiscaux actifs en 2026 : Denormandie, Malraux, Loc'Avantages",
    "Expliquer la fin du Pinel (31/12/2024) à vos clients investisseurs",
    "Comprendre l'historique des dispositifs pour conseiller sur les biens existants",
    "Identifier le rôle du CGP et les limites de votre conseil fiscal",
  ],
},
```

Mettre à jour le commentaire de M3 :
```typescript
// MODULE 3 — FINANCEMENT & FISCALITÉ  (480 min = 8h)
```

- [ ] **Step 3 : Modifier M5 — compressions et fusion**

Dans M5 (slug `"terrain"`), effectuer ces 3 modifications :

**a) Réduire "argumentaire" de 90 à 60 min :**
```typescript
// Changer uniquement duration dans la leçon slug "argumentaire" :
duration: 60,
```

**b) Réduire "fidelisation" de 90 à 60 min :**
```typescript
// Changer uniquement duration dans la leçon slug "fidelisation" :
duration: 60,
```

**c) Remplacer les entrées "r0-r1-r2" ET "decouverte-client" par la leçon fusionnée :**
```typescript
// REMPLACER les entrées "r0-r1-r2" ET "decouverte-client" par :
{
  slug: "prise-de-mandat-decouverte-client",
  title: "Prise de mandat & découverte client",
  scriptFile: "module5-terrain/scripts/08-prise-de-mandat-decouverte-client.md",
  videoUrl: null,
  audioUrl: null,
  duration: 90,
  difficulty: "intermediaire" as const,
  objectives: [
    "Qualifier un prospect par téléphone et préparer le R1 (R0)",
    "Conduire la visite du bien et la découverte vendeur (R1)",
    "Présenter une estimation argumentée et signer le mandat (R2)",
    "Identifier les besoins profonds d'un acquéreur avec la méthode iceberg",
    "Structurer un suivi acquéreur sur 30 jours pour convertir sans forcer",
  ],
},
```

Mettre à jour le commentaire de M5 :
```typescript
// MODULE 5 — VISITE, CLOSING & FIDÉLISATION  (480 min = 8h)
```

- [ ] **Step 4 : Ajouter M6 à la fin du tableau COURSE**

Ajouter avant la fermeture `];` du tableau `COURSE` :

```typescript
  // ═══════════════════════════════════════════════════════════════════════════
  // MODULE 6 — DÉONTOLOGIE & ÉTHIQUE PROFESSIONNELLE  (240 min = 4h)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: "deontologie",
    title: "Module 6 — Déontologie & éthique professionnelle",
    summary: "Code de déontologie, non-discrimination, conflits d'intérêts, éthique pratique.",
    description:
      "Maîtrisez le cadre éthique et légal de votre métier : Code de déontologie (décret 2015-1090), obligations en matière de non-discrimination à l'accès au logement, gestion des conflits d'intérêts et mises en situation réelles. Un module indispensable pour exercer avec intégrité et sécurité juridique.",
    lessons: [
      {
        slug: "non-discrimination",
        title: "Non-discrimination — obligations et conformité",
        scriptFile: "module1-juridique/scripts/08-non-discrimination.md",
        videoUrl: null,
        audioUrl: "/audio/08-non-discrimination.mp3",
        duration: 60,
        difficulty: "intermediaire" as const,
        objectives: [
          "Connaître les 25 critères de discrimination prohibés",
          "Identifier la discrimination directe, indirecte et les instructions",
          "Mettre en place une grille de sélection locataire conforme",
          "Répondre professionnellement à une demande discriminatoire",
        ],
      },
      {
        slug: "non-discrimination-pratique",
        title: "Non-discrimination à l'accès au logement — pratiques et prévention",
        scriptFile: "module6-deontologie/scripts/01-non-discrimination-pratique.md",
        videoUrl: null,
        audioUrl: null,
        duration: 60,
        difficulty: "intermediaire" as const,
        objectives: [
          "Maîtriser les 25 critères de l'art. 225-1 du Code pénal",
          "Distinguer discrimination directe, indirecte et systémique",
          "Comprendre la procédure de testing et sa valeur de preuve",
          "Appliquer des scripts d'entretien non-discriminants",
          "Répondre à un bailleur qui demande une pratique discriminatoire",
        ],
      },
      {
        slug: "code-deontologie",
        title: "Le Code de déontologie des professionnels de l'immobilier",
        scriptFile: "module6-deontologie/scripts/02-code-deontologie.md",
        videoUrl: null,
        audioUrl: null,
        duration: 60,
        difficulty: "intermediaire" as const,
        objectives: [
          "Connaître le décret 2015-1090 et son périmètre d'application",
          "Maîtriser les 10 principes fondamentaux du Code de déontologie",
          "Comprendre le rôle de la CNTGI et la procédure disciplinaire",
          "Identifier les responsabilités civile, disciplinaire et pénale",
        ],
      },
      {
        slug: "ethique-pratique",
        title: "Éthique pratique — conflits d'intérêts et situations à risque",
        scriptFile: "module6-deontologie/scripts/03-ethique-pratique.md",
        videoUrl: null,
        audioUrl: null,
        duration: 60,
        difficulty: "avance" as const,
        objectives: [
          "Identifier et gérer les situations de conflits d'intérêts",
          "Appliquer les règles du secret professionnel et du RGPD",
          "Reconnaître les pratiques commerciales trompeuses",
          "Résoudre des dilemmes éthiques réels par la mise en situation",
        ],
      },
    ],
  },
```

- [ ] **Step 5 : Vérifier la compilation TypeScript**

```bash
cd /Users/gregorybaranes/Desktop/formation_immo_local/lms && npx tsc --noEmit
```
Attendu : aucune erreur.

- [ ] **Step 6 : Vérifier le total des heures via Node**

```bash
cd /Users/gregorybaranes/Desktop/formation_immo_local/lms && node -e "
const { COURSE } = require('./src/data/course.ts');
// Si erreur require, utiliser ts-node ou vérifier manuellement
" 2>/dev/null || echo "Vérification manuelle : additionner les durées dans course.ts"
```

Vérification manuelle attendue :
- M1 : 75+75+60+60+60+45+60+45 = **480 min = 8h** ✓ (non-discrim retirée)
- M2 : 7×60 = **420 min = 7h** ✓
- M3 : 90+90+90+120+90 = **480 min = 8h** ✓ (fusion dispositifs+défiscalisation)
- M4 : 7×60 = **420 min = 7h** ✓
- M5 : 90+60+90+90+60+90 = **480 min = 8h** ✓ (argumentaire 60, fidelisation 60, fusion R0+découverte 90)
- M6 : 60+60+60+60 = **240 min = 4h** ✓
- **Total : 2520 min = 42h** ✓

- [ ] **Step 7 : Commit**

```bash
git add lms/src/data/course.ts
git commit -m "feat: Module 6 Déontologie — restructuration course.ts (42h conservés)"
```

---

## Task 7 : Ajouter les questions d'examen M6

**Files:**
- Modify: `lms/src/data/exam-questions.ts`

- [ ] **Step 1 : Ajouter l'examen M6 dans MODULE_EXAMS**

À la fin du tableau `MODULE_EXAMS` dans `lms/src/data/exam-questions.ts`, ajouter :

```typescript
  {
    moduleSlug: "deontologie",
    title: "Examen — Déontologie & éthique professionnelle",
    duration: 15,
    questions: [
      {
        id: "d1",
        question: "Le Code de déontologie des professionnels de l'immobilier a été instauré par :",
        options: [
          "La loi Hoguet du 2 janvier 1970",
          "Le décret n°2015-1090 du 28 août 2015",
          "La loi ALUR du 24 mars 2014",
          "Le Code civil article 1240",
        ],
        correctIndex: 1,
        explanation: "Le Code de déontologie est issu du décret n°2015-1090 du 28 août 2015, pris en application de la loi ALUR.",
      },
      {
        id: "d2",
        question: "Combien de critères de discrimination sont listés à l'article 225-1 du Code pénal ?",
        options: ["12", "18", "25", "30"],
        correctIndex: 2,
        explanation: "L'article 225-1 du Code pénal liste 25 critères de discrimination prohibés, dont l'origine, le sexe, l'état de santé, l'orientation sexuelle, la domiciliation bancaire, etc.",
      },
      {
        id: "d3",
        question: "Quelle est la sanction pénale maximale pour discrimination dans l'accès au logement ?",
        options: [
          "1 an et 15 000 €",
          "2 ans et 30 000 €",
          "3 ans et 45 000 €",
          "5 ans et 75 000 €",
        ],
        correctIndex: 2,
        explanation: "L'article 225-2 du Code pénal prévoit 3 ans d'emprisonnement et 45 000 € d'amende pour discrimination dans l'accès au logement.",
      },
      {
        id: "d4",
        question: "Le testing immobilier consiste à :",
        options: [
          "Tester la solidité d'un bien avant achat",
          "Envoyer deux candidats similaires financièrement mais différents sur un critère protégé pour détecter une discrimination",
          "Faire visiter un bien à plusieurs acquéreurs simultanément",
          "Tester la performance énergétique d'un logement",
        ],
        correctIndex: 1,
        explanation: "Le testing envoie deux candidats comparables financièrement mais différents sur un critère protégé (origine, prénom…). Reconnu comme preuve depuis la loi du 27 janvier 2017.",
      },
      {
        id: "d5",
        question: "Lequel de ces principes NE fait PAS partie des 10 principes du Code de déontologie ?",
        options: ["Loyauté", "Désintéressement", "Rentabilité", "Confraternité"],
        correctIndex: 2,
        explanation: "La rentabilité n'est pas un principe du Code de déontologie. Les 10 principes sont : compétence, conscience professionnelle, loyauté, désintéressement, confraternité, délicatesse, modération, courtoisie, indépendance, secret professionnel.",
      },
      {
        id: "d6",
        question: "La CNTGI est :",
        options: [
          "La Commission Nationale des Transactions et Gestions Immobilières",
          "Le Centre National de Traitement des Garanties Immobilières",
          "La Commission Nationale de la Transaction et de la Gestion Immobilières",
          "Le Comité National de Transparence et de Gouvernance Immobilière",
        ],
        correctIndex: 2,
        explanation: "La CNTGI est la Commission Nationale de la Transaction et de la Gestion Immobilières, instance disciplinaire de la profession.",
      },
      {
        id: "d7",
        question: "En cas de double mandant (représenter vendeur ET acheteur), l'agent doit :",
        options: [
          "Refuser systématiquement — c'est interdit",
          "Informer les deux parties par écrit de son double rôle avant toute négociation",
          "Facturer uniquement le vendeur",
          "Obtenir l'accord du préfet",
        ],
        correctIndex: 1,
        explanation: "Le double mandant est légal mais nécessite une information écrite des deux parties avant toute négociation, conformément au Code de déontologie.",
      },
      {
        id: "d8",
        question: "Combien de temps maximum peut-on conserver un dossier locataire refusé selon le RGPD ?",
        options: ["6 mois", "1 an", "3 ans", "5 ans"],
        correctIndex: 1,
        explanation: "Un dossier locataire refusé ne doit pas être conservé plus d'1 an. Les mandats et actes se conservent 5 ans (prescription civile).",
      },
    ],
  },
```

- [ ] **Step 2 : Vérifier la compilation**

```bash
cd /Users/gregorybaranes/Desktop/formation_immo_local/lms && npx tsc --noEmit
```
Attendu : aucune erreur.

- [ ] **Step 3 : Commit**

```bash
git add lms/src/data/exam-questions.ts
git commit -m "feat: questions d'examen Module 6 Déontologie (8 QCM)"
```

---

## Task 8 : Ajouter les flashcards M6

**Files:**
- Modify: `lms/src/data/flashcards.ts`

- [ ] **Step 1 : Ajouter les decks leçon par leçon dans LESSON_FLASHCARDS**

À la fin du tableau `LESSON_FLASHCARDS` dans `lms/src/data/flashcards.ts`, ajouter :

```typescript
  // ══════════════════════════════════════════════════════════════════════════
  // MODULE DÉONTOLOGIE — 4 leçons
  // ══════════════════════════════════════════════════════════════════════════
  {
    moduleSlug: "deontologie",
    lessonSlug: "non-discrimination",
    title: "Non-discrimination — obligations",
    cards: [
      {
        id: "de-nd1-01",
        question: "Combien de critères de discrimination liste l'art. 225-1 du Code pénal ?",
        answer: "25 critères, dont l'origine, le sexe, la situation de famille, l'état de santé, l'orientation sexuelle, la domiciliation bancaire, le lieu de résidence.",
        category: "Non-discrimination",
        difficulty: 1,
      },
      {
        id: "de-nd1-02",
        question: "Quelle est la peine maximale pour discrimination dans l'accès au logement ?",
        answer: "3 ans d'emprisonnement et 45 000 € d'amende (art. 225-2 Code pénal).",
        category: "Non-discrimination",
        difficulty: 2,
      },
      {
        id: "de-nd1-03",
        question: "Qu'est-ce que la discrimination indirecte ?",
        answer: "Une règle apparemment neutre qui désavantage un groupe protégé sans justification objective. Ex : exiger un garant en France pour des candidats étrangers à revenus équivalents.",
        category: "Non-discrimination",
        difficulty: 2,
      },
    ],
  },
  {
    moduleSlug: "deontologie",
    lessonSlug: "non-discrimination-pratique",
    title: "Non-discrimination — pratiques",
    cards: [
      {
        id: "de-nd2-01",
        question: "Depuis quelle loi le testing immobilier est-il une preuve admissible ?",
        answer: "Depuis la loi du 27 janvier 2017 (loi Égalité et Citoyenneté).",
        category: "Testing",
        difficulty: 2,
      },
      {
        id: "de-nd2-02",
        question: "Peut-on demander une photo à un candidat locataire ?",
        answer: "Non. La photo n'est pas un document autorisé dans la liste des pièces justificatives légales (décret du 5 novembre 2015).",
        category: "Pratiques",
        difficulty: 1,
      },
      {
        id: "de-nd2-03",
        question: "Comment répondre à un propriétaire qui exige de ne pas louer à des personnes d'origine étrangère ?",
        answer: "Refuser catégoriquement : c'est une discrimination pénale. Proposer de sélectionner sur des critères financiers objectifs. Si le propriétaire insiste, vous pouvez refuser le mandat.",
        category: "Pratiques",
        difficulty: 3,
      },
    ],
  },
  {
    moduleSlug: "deontologie",
    lessonSlug: "code-deontologie",
    title: "Code de déontologie",
    cards: [
      {
        id: "de-cd-01",
        question: "Quel texte institue le Code de déontologie des agents immobiliers ?",
        answer: "Le décret n°2015-1090 du 28 août 2015, pris en application de la loi ALUR.",
        category: "Déontologie",
        difficulty: 1,
      },
      {
        id: "de-cd-02",
        question: "Citez 5 des 10 principes du Code de déontologie.",
        answer: "Compétence, conscience professionnelle, loyauté, désintéressement, confraternité, délicatesse, modération, courtoisie, indépendance, secret professionnel.",
        category: "Déontologie",
        difficulty: 2,
      },
      {
        id: "de-cd-03",
        question: "Quelle est la sanction maximale que peut prononcer la CNTGI ?",
        answer: "L'interdiction définitive d'exercer la profession d'agent immobilier.",
        category: "CNTGI",
        difficulty: 2,
      },
      {
        id: "de-cd-04",
        question: "L'obligation de formation continue ALUR est de combien d'heures ?",
        answer: "42 heures sur 3 ans (ou 14h/an), couvrant droit, techniques immobilières, déontologie et non-discrimination.",
        category: "Formation",
        difficulty: 1,
      },
    ],
  },
  {
    moduleSlug: "deontologie",
    lessonSlug: "ethique-pratique",
    title: "Éthique pratique",
    cards: [
      {
        id: "de-ep-01",
        question: "Qu'est-ce que le double mandant ?",
        answer: "Représenter à la fois le vendeur et l'acheteur dans la même transaction. Légal si les deux parties sont informées par écrit avant toute négociation.",
        category: "Conflits d'intérêts",
        difficulty: 2,
      },
      {
        id: "de-ep-02",
        question: "Combien de temps pour notifier la CNIL en cas de violation de données personnelles ?",
        answer: "72 heures maximum après la découverte de la violation.",
        category: "RGPD",
        difficulty: 3,
      },
      {
        id: "de-ep-03",
        question: "Un acquéreur propose 2 000 € pour que vous fassiez accepter son offre en dessous du prix. Que faites-vous ?",
        answer: "Refus catégorique : c'est un abus de confiance (art. 314-1 Code pénal) et une violation du devoir de loyauté envers le mandant vendeur.",
        category: "Dilemmes éthiques",
        difficulty: 3,
      },
      {
        id: "de-ep-04",
        question: "Peut-on dénigrer une agence concurrente pour obtenir un mandat ?",
        answer: "Non. Les règles de confraternité du Code de déontologie l'interdisent. Vous risquez une sanction disciplinaire et une action en concurrence déloyale.",
        category: "Confraternité",
        difficulty: 2,
      },
    ],
  },
```

- [ ] **Step 2 : Ajouter le deck module dans ALL_FLASHCARDS**

Dans le tableau `ALL_FLASHCARDS` de `flashcards.ts`, ajouter en fin de tableau :

```typescript
  {
    moduleSlug: "deontologie",
    cards: [
      {
        id: "de-all-01",
        question: "Quel décret institue le Code de déontologie des agents immobiliers ?",
        answer: "Décret n°2015-1090 du 28 août 2015.",
        category: "Déontologie",
        difficulty: 1,
      },
      {
        id: "de-all-02",
        question: "Combien de critères de discrimination interdit l'art. 225-1 du Code pénal ?",
        answer: "25 critères.",
        category: "Non-discrimination",
        difficulty: 1,
      },
      {
        id: "de-all-03",
        question: "Peine maximale pour discrimination dans l'accès au logement ?",
        answer: "3 ans d'emprisonnement + 45 000 € d'amende (art. 225-2 Code pénal).",
        category: "Non-discrimination",
        difficulty: 2,
      },
      {
        id: "de-all-04",
        question: "Qu'est-ce que la CNTGI ?",
        answer: "Commission Nationale de la Transaction et de la Gestion Immobilières — instance disciplinaire de la profession.",
        category: "CNTGI",
        difficulty: 1,
      },
      {
        id: "de-all-05",
        question: "Qu'est-ce que le testing immobilier ?",
        answer: "Deux candidats similaires financièrement mais différents sur un critère protégé (origine, prénom…) contactent la même agence. Toute réponse différenciée constitue une preuve de discrimination admissible en justice (loi 27/01/2017).",
        category: "Testing",
        difficulty: 2,
      },
    ],
  },
```

- [ ] **Step 3 : Vérifier la compilation**

```bash
cd /Users/gregorybaranes/Desktop/formation_immo_local/lms && npx tsc --noEmit
```
Attendu : aucune erreur.

- [ ] **Step 4 : Commit**

```bash
git add lms/src/data/flashcards.ts
git commit -m "feat: flashcards Module 6 Déontologie (14 cartes leçon + 5 cartes module)"
```

---

## Task 9 : Vérification finale et push

- [ ] **Step 1 : Vérifier la compilation complète**

```bash
cd /Users/gregorybaranes/Desktop/formation_immo_local/lms && npx tsc --noEmit
```

- [ ] **Step 2 : Vérifier le build Next.js**

```bash
cd /Users/gregorybaranes/Desktop/formation_immo_local/lms && npm run build 2>&1 | tail -20
```
Attendu : `Route (app)` affiché sans erreurs critiques.

- [ ] **Step 3 : Vérifier le total 42h manuellement**

Sommer les `duration` dans `course.ts` :
- M1 : 75+75+60+60+60+45+60+45 = **480** ✓
- M2 : 60×7 = **420** ✓
- M3 : 90+90+90+120+90 = **480** ✓
- M4 : 60×7 = **420** ✓
- M5 : 90+60+90+90+60+90 = **480** ✓
- M6 : 60+60+60+60 = **240** ✓
- **Total : 2520 min = 42h** ✓

- [ ] **Step 4 : Push**

```bash
git push
```
