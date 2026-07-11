# Formation « Rénovation énergétique & photovoltaïque » — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mettre en vente la formation autonome « Rénovation énergétique & photovoltaïque » (7h = 4 leçons × 105 min, 59 €, hors pack, hors certification) avec contenu rédigé, examen 15 questions, narration audio Mistral et cover dédiée.

**Architecture:** Copie du modèle « murs-fonds-commerce » réconcilié : le slug entre dans `COURSE` + `STANDALONE_MODULE_SLUGS` (source unique, `course.ts`) — l'exclusion pack/certification/chiffres vitrine et le produit 59 € en découlent sans autre code. Le contenu (4 scripts .md au format narration, 15 questions d'examen, textes vitrine) est RÉDIGÉ d'après la spec.

**Tech Stack:** Next.js 16 App Router (lire `lms/node_modules/next/dist/docs/` avant tout code de route — aucun prévu), Vitest, pipeline TTS Mistral existant, génération d'image OpenAI (clé dans `lms/.env.local`).

**Spec:** `docs/superpowers/specs/2026-07-11-formation-renovation-energetique-design.md`

## Global Constraints

- Slug `renovation-energetique` ; titre « Rénovation énergétique & photovoltaïque » ; 4 leçons × 105 min = **420 min exactement**.
- Prix : `getModulePriceCents()` (5 900) — rien à coder.
- AUCUNE migration SQL. Clients pack : jamais l'accès automatique, toujours l'achat possible (logique générique déjà testée).
- Certification : inchangée (36 leçons) — le test existant doit rester vert.
- Contenu : français accentué ; **mécanismes plutôt que montants**, ordres de grandeur datés « début 2026 » + renvoi france-renov.gouv.fr ; chaque script au format parseur/TTS (voir Task 1).
- Commandes depuis `lms/` : `npx vitest run`, `npm run lint` (4 erreurs préexistantes hors périmètre tolérées), `npm run build`.
- Commits fréquents sur `claude/happy-rubin-0c67f3` ; fin : fetch puis fast-forward `main` (jamais de force-push).

---

### Task 1 : Rédiger les 4 scripts de leçon

**Files:**
- Create: `module8-renovation-energetique/scripts/01-dpe-cadre-reglementaire.md`
- Create: `module8-renovation-energetique/scripts/02-solutions-techniques.md`
- Create: `module8-renovation-energetique/scripts/03-aides-financement.md`
- Create: `module8-renovation-energetique/scripts/04-photovoltaique.md`

**Interfaces:**
- Produces: chemins `module8-renovation-energetique/scripts/0X-….md` consommés par `scriptFile` (Task 2) et le pipeline TTS (Task 6).

**Contrat de format** (identique à `module7-murs-fonds/scripts/01-bail-commercial-fondamentaux.md`, à relire avant rédaction) :

```
# SCRIPT VIDÉO X/4 — FORMATION « RÉNOVATION ÉNERGÉTIQUE & PHOTOVOLTAÏQUE »
## « <Titre de la leçon> »
### FICHE TECHNIQUE            ← tableau durée/mots/voix/B-Roll
### PROMPT MIDJOURNEY - VISUEL PRINCIPAL
### SCRIPT INTÉGRAL            ← marqueur de départ du TTS (déjà supporté)
#### ACCROCHE … #### PROBLÉMATIQUE … #### CONTENU PRINCIPAL - PARTIE 1..4/5
#### CAS PRATIQUE … #### CONCLUSION
   [B-ROLL: …]                 ← ignoré par le TTS
   **NARRATION :**             ← ~17 blocs par script, texte parlé
   [PAUSE 1s] / [PAUSE 2s]     ← nettoyés par le TTS
   [TEXTE EN SURIMPRESSION: "…"]
### RÉFÉRENCES RÉGLEMENTAIRES CITÉES   ← tableau
### NOTES DE PRODUCTION        ← ignoré par le TTS (STOP_HEADINGS)
```

- [ ] **Step 1 : Relire un script modèle** — `module7-murs-fonds/scripts/01-bail-commercial-fondamentaux.md` (structure, ton, longueur).

- [ ] **Step 2 : Rédiger les 4 scripts** (~1 400-1 600 mots de narration chacun), contenus tirés de la spec §« Les 4 leçons » :
  1. **DPE & cadre réglementaire** — DPE opposable (méthode 3CL, classes A-G, durée de validité), calendrier loi Climat & Résilience (gel des loyers passoires, interdiction location G puis F puis E), audit énergétique obligatoire à la vente, mentions obligatoires dans les annonces, valeur verte/décote, responsabilités et argumentaire de l'agent. Cas pratique : vente d'un T3 classé F à Lyon.
  2. **Solutions techniques** — enveloppe (combles, murs ITE/ITI, planchers, menuiseries), ventilation (VMC simple/double flux), chauffage (PAC air/eau, granulés, chauffe-eau thermodynamique), rénovation d'ampleur vs par gestes, ordre des travaux (isoler avant de chauffer), ordres de grandeur de coûts et sauts de classes, lecture de devis et signaux de malfaçon. Cas pratique : maison des années 70 de E à C.
  3. **Aides & financement** — MaPrimeRénov' par geste vs rénovation d'ampleur (logique des profils de revenus, taux d'aide croissants avec le saut de classes), CEE, éco-PTZ, TVA réduite, aides locales, exonération de taxe foncière possible, règles de cumul, artisan RGE obligatoire, Mon Accompagnateur Rénov', interdiction du démarchage téléphonique en rénovation énergétique + arnaques classiques. Encadré : « montants à jour début 2026 — vérifier sur france-renov.gouv.fr ». Cas pratique : plan de financement d'un couple pour une rénovation d'ampleur.
  4. **Photovoltaïque** — technologies (mono/polycristallin, onduleur vs micro-onduleurs), dimensionnement (kWc, orientation, ombrage), autoconsommation avec/sans revente du surplus, prime à l'autoconsommation et obligation d'achat (ordres de grandeur datés), démarches (déclaration préalable, Consuel, raccordement Enedis), rentabilité et temps de retour (~8-12 ans), le solaire dans une transaction (transfert du contrat d'obligation d'achat, impact DPE/valeur). Cas pratique : étude de rentabilité d'une installation 6 kWc à Aix-en-Provence.

- [ ] **Step 3 : Vérifier l'extraction TTS à blanc**

Run (lms/): `node -e "import('./scripts/lib/narration-from-md.mjs').then(({loadNarrationTextForScriptMd})=>{for(const f of ['01-dpe-cadre-reglementaire','02-solutions-techniques','03-aides-financement','04-photovoltaique']){const t=loadNarrationTextForScriptMd('../module8-renovation-energetique/scripts/'+f+'.md');console.log(f,t.length,/B-ROLL|\\[PAUSE|NARRATION|Détail \\|/.test(t))}})"`
Expected: ≥ 9 000 caractères par fichier, `false` partout (pas d'artefacts).

- [ ] **Step 4 : Commit**

```bash
git add module8-renovation-energetique
git commit -m "feat(renovation): scripts des 4 lecons (7h) — DPE, travaux, aides, photovoltaique"
```

---

### Task 2 : `course.ts` — module 8 + `STANDALONE_MODULE_SLUGS` + tests

**Files:**
- Modify: `lms/src/data/course.ts` (fin de COURSE, après murs-fonds-commerce ; + slug dans le Set ligne ~847)
- Modify: `lms/src/lib/formation-journey.test.ts` (nouveau describe)

**Interfaces:**
- Produces: `COURSE` contient `renovation-energetique` (4 leçons, 420 min) ; `STANDALONE_MODULE_SLUGS` = Set{"murs-fonds-commerce","renovation-energetique"} → exclusion pack/cert automatique.

- [ ] **Step 1 : Test (échec attendu)** — ajouter à `formation-journey.test.ts` :

```ts
describe("rénovation énergétique (formation autonome, hors parcours certifiant)", () => {
  it("le module existe dans COURSE : 4 leçons, 420 min (7h)", () => {
    const mod = COURSE.find((m) => m.slug === "renovation-energetique");
    expect(mod).toBeDefined();
    expect(mod!.lessons).toHaveLength(4);
    expect(mod!.lessons.reduce((a, l) => a + l.duration, 0)).toBe(420);
  });

  it("il est hors parcours : certification inchangée", () => {
    expect(FORMATION_MODULES.some((m) => m.slug === "renovation-energetique")).toBe(false);
    expect(getCertifiedLessonCount()).toBe(36);
  });
});
```

- [ ] **Step 2 : Vérifier l'échec** — Run: `npx vitest run src/lib/formation-journey.test.ts` → FAIL (module absent).

- [ ] **Step 3 : `course.ts`** — dans le Set existant :

```ts
export const STANDALONE_MODULE_SLUGS = new Set<string>([
  "murs-fonds-commerce",
  "renovation-energetique",
]);
```

et ajouter à la FIN de `COURSE` (après le module murs-fonds-commerce, avant `];`) :

```ts
  // ═══════════════════════════════════════════════════════════════════════════
  // FORMATION AUTONOME — RÉNOVATION ÉNERGÉTIQUE & PHOTOVOLTAÏQUE (420 min = 7h)
  // Vendue uniquement à l'unité (59 €), PAS incluse au pack — voir
  // STANDALONE_MODULE_SLUGS ci-dessous. Attestation propre de 7h.
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: "renovation-energetique",
    title: "Rénovation énergétique & photovoltaïque",
    summary:
      "DPE, interdictions de location, travaux, MaPrimeRénov', CEE et solaire : conseiller vos clients sur la transition énergétique.",
    description:
      "Le DPE et le calendrier de la loi Climat & Résilience redessinent le marché : passoires interdites à la location, audit obligatoire à la vente, valeur verte qui creuse les écarts de prix. Cette formation autonome de 7h donne aux professionnels de l'immobilier les clés techniques (isolation, chauffage, ventilation, photovoltaïque) et financières (MaPrimeRénov', CEE, éco-PTZ) pour conseiller vendeurs, acquéreurs et bailleurs en toute crédibilité.",
    lessons: [
      {
        slug: "dpe-cadre-reglementaire",
        title: "Le DPE & le cadre réglementaire",
        scriptFile: "module8-renovation-energetique/scripts/01-dpe-cadre-reglementaire.md",
        videoUrl: null,
        audioUrl: "/audio/01-dpe-cadre-reglementaire.mp3",
        duration: 105,
        difficulty: "intermediaire",
        objectives: [
          "Expliquer la méthode et les classes du DPE opposable à un client",
          "Maîtriser le calendrier des interdictions de location (loi Climat & Résilience)",
          "Identifier quand l'audit énergétique est obligatoire à la vente",
          "Respecter les mentions obligatoires dans les annonces immobilières",
          "Argumenter la valeur verte et la décote d'une passoire thermique",
        ],
      },
      {
        slug: "solutions-techniques",
        title: "Les solutions techniques de rénovation",
        scriptFile: "module8-renovation-energetique/scripts/02-solutions-techniques.md",
        videoUrl: null,
        audioUrl: "/audio/02-solutions-techniques.mp3",
        duration: 105,
        difficulty: "intermediaire",
        objectives: [
          "Hiérarchiser les postes de travaux : isolation, ventilation, chauffage",
          "Comparer rénovation d'ampleur et rénovation par gestes",
          "Estimer les ordres de grandeur de coûts et les sauts de classes DPE",
          "Lire un devis de rénovation et repérer les points de vigilance",
        ],
      },
      {
        slug: "aides-financement",
        title: "Les aides de l'État & le financement",
        scriptFile: "module8-renovation-energetique/scripts/03-aides-financement.md",
        videoUrl: null,
        audioUrl: "/audio/03-aides-financement.mp3",
        duration: 105,
        difficulty: "avance",
        objectives: [
          "Orienter un client entre MaPrimeRénov' par geste et rénovation d'ampleur",
          "Mobiliser CEE, éco-PTZ, TVA réduite et aides locales — et leurs cumuls",
          "Exiger le bon intervenant : RGE, Mon Accompagnateur Rénov'",
          "Détecter les arnaques et le démarchage illégal en rénovation énergétique",
          "Construire un plan de financement de travaux crédible",
        ],
      },
      {
        slug: "photovoltaique",
        title: "Photovoltaïque — technique, rentabilité & démarches",
        scriptFile: "module8-renovation-energetique/scripts/04-photovoltaique.md",
        videoUrl: null,
        audioUrl: "/audio/04-photovoltaique.mp3",
        duration: 105,
        difficulty: "avance",
        objectives: [
          "Dimensionner un projet : kWc, orientation, autoconsommation vs revente",
          "Connaître les démarches : déclaration préalable, Consuel, Enedis",
          "Calculer une rentabilité et un temps de retour réalistes",
          "Sécuriser le photovoltaïque dans une transaction (contrats, DPE, valeur)",
        ],
      },
    ],
  },
```

- [ ] **Step 4 : Vérifier** — Run: `npx vitest run` → tout PASS (les tests pack/cert existants prouvent l'exclusion automatique).

- [ ] **Step 5 : Commit**

```bash
git add lms/src/data/course.ts lms/src/lib/formation-journey.test.ts
git commit -m "feat(renovation): module autonome dans COURSE (4 lecons, 7h) — hors pack et certification"
```

---

### Task 3 : Tests accès / catalogue pour le nouveau slug

**Files:**
- Modify: `lms/src/lib/entitlements.test.ts`
- Modify: `lms/src/data/catalog.test.ts`

**Interfaces:**
- Consumes: `canAccessModule`, `packIncludesModule` (existants) ; `getProduct` (existant).

- [ ] **Step 1 : Ajouter les assertions** — `entitlements.test.ts`, dans le describe « modules autonomes (hors pack) » :

```ts
  it("le pack ne donne PAS accès à renovation-energetique ; l'achat unitaire oui", () => {
    expect(packIncludesModule("renovation-energetique")).toBe(false);
    expect(canAccessModule([pack], "renovation-energetique", false)).toBe(false);
    const rows: EntitlementRow[] = [{ module_slug: "renovation-energetique", status: "active" }];
    expect(canAccessModule(rows, "renovation-energetique", false)).toBe(true);
  });
```

et `catalog.test.ts` :

```ts
  it("le module autonome renovation-energetique est au catalogue à 59 €", () => {
    const p = getProduct("renovation-energetique");
    expect(p?.kind).toBe("module");
    expect(p?.priceCents).toBe(5900);
    expect(p?.available).toBe(true);
    expect(getPackModules().some((m) => m.slug === "renovation-energetique")).toBe(false);
  });
```

- [ ] **Step 2 : Vérifier** — Run: `npx vitest run` → PASS direct (la logique est générique ; ces tests verrouillent le comportement).

- [ ] **Step 3 : Commit**

```bash
git add lms/src/lib/entitlements.test.ts lms/src/data/catalog.test.ts
git commit -m "test(renovation): verrouille exclusion pack + produit 59 EUR"
```

---

### Task 4 : Examen — 15 questions rédigées

**Files:**
- Modify: `lms/src/data/exam-questions.ts` (entrée après murs-fonds-commerce, avant `];`)

**Interfaces:**
- Produces: `getModuleExam("renovation-energetique")` → 15 questions ids `re1`…`re15`, duration 20.

- [ ] **Step 1 : Rédiger l'entrée.** Répartition : 5 faciles (DPE/classes/annonces), 5 moyennes (travaux, aides, RGE), 5 difficiles (cas chiffrés : saut de classes, cumul d'aides, rentabilité PV). Format (exemple complet de la première ; les 14 autres sur le même modèle, options A-D, `explanation` de 1-3 phrases avec référence, JAMAIS de montant d'aide précis sans « ordre de grandeur début 2026 ») :

```ts
  {
    moduleSlug: "renovation-energetique",
    title: "Examen — Rénovation énergétique & photovoltaïque",
    duration: 20,
    questions: [
      {
        id: "re1",
        question:
          "Depuis la loi ELAN puis la loi Climat & Résilience, quelle est la portée juridique du DPE ?",
        options: [
          "Il reste purement informatif : l'acquéreur ne peut rien en tirer",
          "Il est opposable : l'acquéreur ou le locataire peut se retourner contre le vendeur ou le bailleur en cas d'écart significatif",
          "Il n'engage que le diagnostiqueur, jamais le vendeur",
          "Il n'est obligatoire que pour les logements construits avant 1975",
        ],
        correctIndex: 1,
        explanation:
          "Depuis le 1er juillet 2021, le DPE est opposable : ses résultats engagent le vendeur ou le bailleur, et un écart significatif peut fonder un recours. Seules les recommandations de travaux restent indicatives.",
      },
      // … re2 à re15, mêmes règles
    ],
  },
```

- [ ] **Step 2 : Vérifier** — Run: `grep -c '"re' src/data/exam-questions.ts` → 15 ; `npx vitest run` → PASS ; relire chaque `correctIndex`.

- [ ] **Step 3 : Commit**

```bash
git add lms/src/data/exam-questions.ts
git commit -m "feat(renovation): examen QCM 15 questions"
```

---

### Task 5 : Présentation — formatrice, vitrine, widget, cover

**Files:**
- Modify: `lms/src/data/formateur-voices.json`
- Modify: `lms/src/data/module-avatars.ts`
- Modify: `lms/src/data/module-showcase.ts`
- Modify: `lms/src/components/gamification/ModuleTimeTracker.tsx` (grille + label)
- Modify: `lms/src/app/page.tsx` (withCover)
- Create: `lms/public/generated/fal/renovation-energetique/cover.jpg` (générée OpenAI, 1024×576)

- [ ] **Step 1 : `formateur-voices.json`** — ajouter après murs-fonds-commerce :

```json
  "renovation-energetique": {
    "name": "Élodie Ferrand",
    "mistralVoiceId": "e0580ce5-e63c-4cbe-88c8-a983b80c5f1f",
    "mistralVoiceLabel": "Marie — Curious (fr_fr) — voix française native, pédagogue et analytique"
  }
```

- [ ] **Step 2 : `module-avatars.ts`** — ajouter à la fin de MODULE_AVATARS :

```ts
  {
    moduleSlug: "renovation-energetique",
    name: v["renovation-energetique"].name,
    role: "Conseillère en rénovation énergétique",
    description:
      "Ingénieure thermicienne, ancienne conseillère France Rénov'. Dix ans d'audits énergétiques et de plans de financement aux côtés des particuliers et des professionnels de l'immobilier.",
    mistralVoiceId: v["renovation-energetique"].mistralVoiceId,
    mistralVoiceLabel: v["renovation-energetique"].mistralVoiceLabel,
    portraitPrompt:
      "Professional headshot, French woman 38 years old, smart casual blazer over green top, warm confident smile, background of a renovated bright home interior with insulation materials and a tablet showing energy charts, natural light, photorealistic --ar 1:1 --style raw --s 250 --q 2",
    accentColor: "#15803d",
    initials: "EF",
  },
```

- [ ] **Step 3 : `module-showcase.ts`** — ajouter avant `};` :

```ts
  "renovation-energetique": {
    badge: "🌞",
    headline: "La transition énergétique décide des prix — soyez celui qui l'explique",
    subhead:
      "DPE, interdictions de location, MaPrimeRénov', photovoltaïque : 7h pour transformer la contrainte réglementaire en argument de vente et de conseil.",
    outcomes: [
      "DPE et loi Climat & Résilience : calendrier et obligations maîtrisés",
      "Travaux : hiérarchiser isolation, ventilation, chauffage sans se tromper",
      "Aides : MaPrimeRénov', CEE, éco-PTZ et leurs cumuls, sans arnaques",
      "Photovoltaïque : rentabilité réelle et démarches sécurisées",
    ],
    durationLabel: "~7 h",
    proofLine: [
      "Cas chiffrés : passer de E à C, plan de financement complet",
      "Étude de rentabilité photovoltaïque 6 kWc pas à pas",
      "QCM final de 15 questions niveau pro",
    ],
    heroGradient: "from-[#052e16] via-[#15803d] to-[#65a30d]",
    lessonTeaser: {
      "dpe-cadre-reglementaire": "DPE opposable, interdictions de location, audit : ce qui change vos ventes.",
      "solutions-techniques": "Isoler, ventiler, chauffer : les bons travaux dans le bon ordre.",
      "aides-financement": "MaPrimeRénov', CEE, éco-PTZ : monter un plan d'aides sans se perdre.",
      "photovoltaique": "kWc, autoconsommation, Enedis : le solaire rentable et conforme.",
    },
  },
```

- [ ] **Step 4 : `ModuleTimeTracker.tsx`** — grille `grid-cols-4 … sm:grid-cols-7` → `sm:grid-cols-8` (le `grid-cols-4` mobile reste : 8 = 2 rangées de 4) et label :

```ts
    "renovation-energetique": "RÉNO.",
```

- [ ] **Step 5 : Cover OpenAI** — générer (gpt-image-1, 1536×1024, prompt : "Photorealistic wide shot of a beautifully renovated French suburban house with new rooftop solar panels, visible fresh exterior insulation work with scaffolding partially removed, heat pump unit beside the wall, warm late afternoon sunlight, blue sky, professional architectural photography, ultra-detailed, no text, no watermark") puis recadrer 1024×576 JPG qualité 82 → `lms/public/generated/fal/renovation-energetique/cover.jpg`. Contrôle visuel avant intégration.

- [ ] **Step 6 : `page.tsx`** — ajouter `"renovation-energetique"` à la liste `withCover` de `moduleCover()`.

- [ ] **Step 7 : Vérifier + commit**

Run: `npx vitest run` → PASS ; `npm run lint` → rien de nouveau.

```bash
git add lms/src/data/formateur-voices.json lms/src/data/module-avatars.ts lms/src/data/module-showcase.ts lms/src/components/gamification/ModuleTimeTracker.tsx lms/src/app/page.tsx lms/public/generated/fal/renovation-energetique
git commit -m "feat(renovation): formatrice Elodie Ferrand, vitrine, widget 8 colonnes, cover dediee"
```

---

### Task 6 : Audio Mistral — 4 MP3

**Files:**
- Modify: `lms/scripts/lib/script-discovery.mjs` (+ `"module8-renovation-energetique"` dans MODULE_SCRIPT_ROOTS)
- Modify: `lms/scripts/lib/lesson-mistral-voice.mjs` (+ `"module8-renovation-energetique": "renovation-energetique"` dans FOLDER_TO_SLUG)
- Create: `lms/public/audio/01-dpe-cadre-reglementaire.mp3` (+ 02, 03, 04)

**Interfaces:**
- Consumes: scripts Task 1, voix Task 5. Le retry par segment (429) est déjà dans `mistral-tts.mjs`.

- [ ] **Step 1 : Brancher module8** dans les deux fichiers lib (une ligne chacun).

- [ ] **Step 2 : Générer les 4 MP3** — un par un, en arrière-plan si nécessaire (rate limit) :

Run (lms/): `node scripts/generate-all-lesson-audio.mjs --only 01-dpe-cadre-reglementaire` (puis 02, 03, 04, avec ~65 s d'écart)
Expected: `✓ …/public/audio/0X-….mp3` avec la voix « Élodie Ferrand — Marie Curious ».

- [ ] **Step 3 : Vérifier les durées** — `ffprobe` sur les 4 fichiers → 8 à 13 min chacun.

- [ ] **Step 4 : Commit**

```bash
git add lms/public/audio/01-dpe-cadre-reglementaire.mp3 lms/public/audio/02-solutions-techniques.mp3 lms/public/audio/03-aides-financement.mp3 lms/public/audio/04-photovoltaique.mp3 lms/scripts/lib/script-discovery.mjs lms/scripts/lib/lesson-mistral-voice.mjs
git commit -m "feat(renovation): narration audio Mistral des 4 lecons (voix Elodie Ferrand)"
```

---

### Task 7 : Vérification de bout en bout + déploiement

**Files:** aucun nouveau.

- [ ] **Step 1 : Suite complète** — Run (lms/): `npx vitest run` → PASS ; `npm run build` → succès.

- [ ] **Step 2 : Préview navigateur** — carte « Rénovation énergétique & photovoltaïque » à 59 € avec sa cover sur `/` ; chiffres pack inchangés (7 modules / 45h / 40 leçons / 413 € à la carte) ; `/audio/01-dpe-cadre-reglementaire.mp3` → 206 ; leçon non connecté → redirection login.

- [ ] **Step 3 : Push + déploiement**

```bash
git fetch origin && git rev-list --left-right --count origin/main...HEAD   # attendu : 0 <n>
git push origin claude/happy-rubin-0c67f3
git push origin HEAD:main   # fast-forward uniquement
```

- [ ] **Step 4 : Vérification prod** — curl : carte présente, cover 200, 4 MP3 en 206, leçon → login. Récap à Gregory + rappel relecture par un pro du secteur (contenu rédigé par IA, aides mouvantes).

---

## Self-Review (fait à l'écriture)

- Spec ↔ plan : scripts (T1), COURSE+standalone (T2), verrous accès/catalogue (T3), examen (T4), présentation+cover (T5), audio (T6), vérif+deploy (T7). ✔
- 420 min exactes : 4 × `duration: 105` dans le code T2, testé T2 Step 1. ✔
- Garde-fous contenu (mécanismes > montants, renvoi france-renov.gouv.fr) : contraintes globales + T1/T4. ✔
- Pas de placeholder : le contenu rédactionnel référence la spec §« Les 4 leçons » (définitions complètes) + contrat de format + exemples complets (course.ts entier, re1 entier, showcase entier). ✔
