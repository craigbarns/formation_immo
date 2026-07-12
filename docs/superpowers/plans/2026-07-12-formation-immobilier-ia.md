# Formation « Immobilier & intelligence artificielle » — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mettre en vente la formation autonome « Immobilier & intelligence artificielle » (7h = 4 leçons × 105 min, 59 €, hors pack, hors certification) avec contenu rédigé, examen 15 questions, narration audio Mistral et cover dédiée.

**Architecture:** Troisième application du modèle « formation autonome » : slug dans `COURSE` + `STANDALONE_MODULE_SLUGS` (source unique dans `course.ts`) — exclusion pack/certification/chiffres vitrine et produit 59 € automatiques. Contenu rédigé d'après la spec. Le correctif `outputFileTracingExcludes` protège déjà la limite Netlify des nouveaux MP3.

**Tech Stack:** Next.js 16 App Router (docs locales `lms/node_modules/next/dist/docs/` avant tout code de route — aucun prévu), Vitest, pipeline TTS Mistral, génération d'image OpenAI.

**Spec:** `docs/superpowers/specs/2026-07-12-formation-immobilier-ia-design.md`

## Global Constraints

- Slug `immobilier-ia` ; titre « Immobilier & intelligence artificielle » ; 4 leçons × 105 min = **420 min exactement**.
- Prix `getModulePriceCents()` (5 900) — rien à coder. AUCUNE migration SQL.
- Contenu : français accentué ; méthodes réutilisables plutôt que modes d'emploi d'outils ; ordres de grandeur « début 2026 » ; aucune promesse de productivité non sourcée ; leçon 4 juridique → rappel de relecture en fin de livraison.
- Format scripts identique à `module8-renovation-energetique/scripts/*` : `### SCRIPT INTÉGRAL`, ~17 blocs `**NARRATION :**`, [B-ROLL…], [PAUSE Xs], FICHE TECHNIQUE, CAS PRATIQUE, RÉFÉRENCES, NOTES DE PRODUCTION.
- Commandes depuis `lms/` : `npx vitest run`, `npm run build`. Commits fréquents ; fin : fetch + fast-forward `main` ; vérifier Netlify (site public) ET Vercel (app.).

---

### Task 1 : Rédiger les 4 scripts

**Files:**
- Create: `module9-immobilier-ia/scripts/01-comprendre-ia.md`
- Create: `module9-immobilier-ia/scripts/02-rediger-vendre-ia.md`
- Create: `module9-immobilier-ia/scripts/03-ia-transaction.md`
- Create: `module9-immobilier-ia/scripts/04-cadre-legal-ia.md`

**Interfaces:** Produces : chemins consommés par `scriptFile` (Task 2) et le TTS (Task 6).

- [ ] **Step 1 : Rédiger les 4 scripts** (~1 400-1 600 mots de narration chacun) selon la spec §« Les 4 leçons » : (1) comprendre l'IA générative sans jargon, forces/faiblesses, hallucinations, « l'IA propose, le pro dispose », panorama d'usages, choix d'outils — cas : une matinée d'agence avant/après ; (2) méthode de prompt CRTE, annonces, prospection, réseaux sociaux, traduction, ton de marque — cas : annonce banale → premium ; (3) estimation automatisée et ses limites, analyse de documents longs, comptes-rendus dictés, préparation de RDV vendeur, automatisations CRM — cas : PV d'AG 40 pages en 10 min ; (4) RGPD, AI Act, biais/discrimination (25 critères), images générées et loyauté des annonces, responsabilité, charte IA en 8 points — cas : audit d'une agence fictive.

- [ ] **Step 2 : Vérifier l'extraction TTS**

Run (lms/): `node -e "import('./scripts/lib/narration-from-md.mjs').then(({loadNarrationTextForScriptMd})=>{for(const f of ['01-comprendre-ia','02-rediger-vendre-ia','03-ia-transaction','04-cadre-legal-ia']){const t=loadNarrationTextForScriptMd('../module9-immobilier-ia/scripts/'+f+'.md');console.log(f,t.length,/B-ROLL|\\[PAUSE|NARRATION|\\| Détail/.test(t))}})"`
Expected: ≥ 8 000 caractères par fichier, `false` partout.

- [ ] **Step 3 : Commit**

```bash
git add module9-immobilier-ia
git commit -m "feat(ia): scripts des 4 lecons (7h) — comprendre, vendre, transaction, cadre legal"
```

---

### Task 2 : `course.ts` — module 9 + STANDALONE + test

**Files:**
- Modify: `lms/src/data/course.ts` (fin de COURSE + Set STANDALONE_MODULE_SLUGS)
- Modify: `lms/src/lib/formation-journey.test.ts`

- [ ] **Step 1 : Test (échec attendu)** — ajouter :

```ts
describe("immobilier & IA (formation autonome, hors parcours certifiant)", () => {
  it("le module existe dans COURSE : 4 leçons, 420 min (7h)", () => {
    const mod = COURSE.find((m) => m.slug === "immobilier-ia");
    expect(mod).toBeDefined();
    expect(mod!.lessons).toHaveLength(4);
    expect(mod!.lessons.reduce((a, l) => a + l.duration, 0)).toBe(420);
  });

  it("il est hors parcours : certification inchangée", () => {
    expect(FORMATION_MODULES.some((m) => m.slug === "immobilier-ia")).toBe(false);
    expect(getCertifiedLessonCount()).toBe(36);
  });
});
```

- [ ] **Step 2 : Vérifier l'échec** — `npx vitest run src/lib/formation-journey.test.ts` → FAIL.

- [ ] **Step 3 : Implémenter** — Set : ajouter `"immobilier-ia"` (et mettre à jour le commentaire). Fin de COURSE :

```ts
  // ═══════════════════════════════════════════════════════════════════════════
  // FORMATION AUTONOME — IMMOBILIER & INTELLIGENCE ARTIFICIELLE (420 min = 7h)
  // Vendue uniquement à l'unité (59 €), PAS incluse au pack — voir
  // STANDALONE_MODULE_SLUGS ci-dessous. Attestation propre de 7h.
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: "immobilier-ia",
    title: "Immobilier & intelligence artificielle",
    summary:
      "ChatGPT, estimation, annonces, RGPD : mettre l'IA au service de votre activité immobilière — efficacement et légalement.",
    description:
      "L'IA générative est déjà dans les agences : annonces, prospection, analyse de documents, estimation. Cette formation autonome de 7h apprend aux professionnels de l'immobilier à en tirer un gain de temps réel — méthode de prompt, cas d'usage transaction par transaction — tout en évitant les pièges : hallucinations, RGPD, AI Act, discrimination involontaire et loyauté des annonces.",
    lessons: [
      {
        slug: "comprendre-ia",
        title: "Comprendre l'IA sans jargon",
        scriptFile: "module9-immobilier-ia/scripts/01-comprendre-ia.md",
        videoUrl: null,
        audioUrl: "/audio/01-comprendre-ia.mp3",
        duration: 105,
        difficulty: "debutant",
        objectives: [
          "Expliquer simplement ce qu'est (et n'est pas) une IA générative",
          "Identifier les forces et les faiblesses : rédaction, synthèse… et hallucinations",
          "Appliquer la règle d'or : l'IA propose, le professionnel dispose",
          "Choisir ses outils et repérer les usages immobiliers rentables",
        ],
      },
      {
        slug: "rediger-vendre-ia",
        title: "Rédiger et vendre avec l'IA",
        scriptFile: "module9-immobilier-ia/scripts/02-rediger-vendre-ia.md",
        videoUrl: null,
        audioUrl: "/audio/02-rediger-vendre-ia.mp3",
        duration: 105,
        difficulty: "intermediaire",
        objectives: [
          "Maîtriser une méthode de prompt réutilisable (Contexte, Rôle, Tâche, Exemple)",
          "Produire des annonces différenciantes et conformes",
          "Personnaliser prospection, relances et réseaux sociaux à grande échelle",
          "Servir une clientèle étrangère grâce à la traduction assistée",
        ],
      },
      {
        slug: "ia-transaction",
        title: "L'IA dans la transaction",
        scriptFile: "module9-immobilier-ia/scripts/03-ia-transaction.md",
        videoUrl: null,
        audioUrl: "/audio/03-ia-transaction.mp3",
        duration: 105,
        difficulty: "intermediaire",
        objectives: [
          "Situer les estimations automatisées : ce qu'elles valent, où l'humain tranche",
          "Analyser des documents longs (PV d'AG, baux, diagnostics) avec méthode",
          "Automatiser comptes-rendus de visite et préparation de rendez-vous",
          "Brancher l'IA sur le quotidien de l'agence sans dérive",
        ],
      },
      {
        slug: "cadre-legal-ia",
        title: "Le cadre légal et les pièges",
        scriptFile: "module9-immobilier-ia/scripts/04-cadre-legal-ia.md",
        videoUrl: null,
        audioUrl: "/audio/04-cadre-legal-ia.mp3",
        duration: 105,
        difficulty: "avance",
        objectives: [
          "Protéger les données clients : RGPD et réflexes d'agence face aux chatbots",
          "Connaître les obligations pratiques de l'AI Act européen",
          "Prévenir la discrimination involontaire générée par l'IA (25 critères)",
          "Rester loyal dans les annonces : images générées, home staging virtuel",
          "Écrire la charte IA de son agence en 8 points",
        ],
      },
    ],
  },
```

- [ ] **Step 4 : Vérifier** — `npx vitest run` → tout PASS (adapter, comme pour la rénovation, le test de régression si la liste des autonomes y est figée).

- [ ] **Step 5 : Commit**

```bash
git add lms/src/data/course.ts lms/src/lib/formation-journey.test.ts lms/src/lib/regression-existing-users.test.ts
git commit -m "feat(ia): module autonome dans COURSE (4 lecons, 7h) — hors pack et certification"
```

---

### Task 3 : Verrous accès / catalogue

**Files:** `lms/src/lib/entitlements.test.ts`, `lms/src/data/catalog.test.ts`

- [ ] **Step 1 : Assertions** — entitlements :

```ts
describe("immobilier & IA (add-on autonome, hors pack)", () => {
  it("le pack ne donne PAS accès ; l'achat unitaire oui ; admin oui", () => {
    expect(canAccessModule([pack], "immobilier-ia", false)).toBe(false);
    const rows: EntitlementRow[] = [{ module_slug: "immobilier-ia", status: "active" }];
    expect(canAccessModule(rows, "immobilier-ia", false)).toBe(true);
    expect(canAccessModule([], "immobilier-ia", true)).toBe(true);
    expect(canAccessModule([], "immobilier-ia", false)).toBe(false);
  });
});
```

catalog :

```ts
  it("le module autonome immobilier-ia est au catalogue à 59 €, hors pack", () => {
    const p = getProduct("immobilier-ia");
    expect(p?.kind).toBe("module");
    expect(p?.priceCents).toBe(5900);
    expect(p?.available).toBe(true);
    expect(PACK_EXCLUDED_MODULES.has("immobilier-ia")).toBe(true);
  });
```

- [ ] **Step 2 : `npx vitest run`** → PASS. **Step 3 : Commit** `test(ia): verrouille exclusion pack + produit 59 EUR`.

---

### Task 4 : Examen 15 questions

**Files:** `lms/src/data/exam-questions.ts` (après l'entrée renovation-energetique, avant `];`)

- [ ] **Step 1 : Rédiger** — `moduleSlug: "immobilier-ia"`, `title: "Examen — Immobilier & intelligence artificielle"`, `duration: 20`, ids `ia1`…`ia15`. Répartition : 5 faciles (nature de l'IA, hallucinations, règle d'or), 5 moyennes (prompts, annonces, analyse de docs, estimation), 5 difficiles (RGPD, AI Act, discrimination, loyauté des annonces, responsabilité). Exemple complet :

```ts
      {
        id: "ia1",
        question:
          "Un agent demande à ChatGPT le prix moyen au m² d'un quartier et obtient un chiffre précis et convaincant. Quel réflexe professionnel s'impose ?",
        options: [
          "Le publier tel quel : les IA sont connectées aux données notariales",
          "Vérifier le chiffre à la source : une IA générative peut « halluciner » des données plausibles mais fausses",
          "Le majorer de 10 % par prudence",
          "Demander le même chiffre à une autre IA pour le confirmer",
        ],
        correctIndex: 1,
        explanation:
          "Un modèle de langage prédit du texte plausible : il peut inventer des chiffres avec aplomb (« hallucination »). Les données chiffrées se vérifient toujours à la source (DVF, notaires, bases professionnelles). Croiser deux IA ne constitue pas une vérification.",
      },
```

- [ ] **Step 2 : Vérifier** — `grep -c '"ia[0-9]' src/data/exam-questions.ts` → 15 ; `npx tsc --noEmit` silencieux ; `npx vitest run` PASS ; relire chaque correctIndex.

- [ ] **Step 3 : Commit** `feat(ia): examen QCM 15 questions`.

---

### Task 5 : Présentation — formatrice, vitrine, widget, cover

**Files:** `formateur-voices.json`, `module-avatars.ts`, `module-showcase.ts`, `ModuleTimeTracker.tsx`, `page.tsx`, Create: `lms/public/generated/fal/immobilier-ia/cover.jpg`

- [ ] **Step 1 : voix** :

```json
  "immobilier-ia": {
    "name": "Clara Morel",
    "mistralVoiceId": "49d024dd-981b-4462-bb17-74d381eb8fd7",
    "mistralVoiceLabel": "Marie — Happy (fr_fr) — voix française native, chaleureuse et enthousiaste"
  }
```

- [ ] **Step 2 : avatar** (fin de MODULE_AVATARS) :

```ts
  {
    moduleSlug: "immobilier-ia",
    name: v["immobilier-ia"].name,
    role: "Consultante IA & immobilier",
    description:
      "Consultante en transformation digitale des métiers de l'immobilier. Forme les réseaux d'agences aux usages concrets de l'IA générative depuis ses débuts — avec un principe : la technologie au service du conseil, jamais l'inverse.",
    mistralVoiceId: v["immobilier-ia"].mistralVoiceId,
    mistralVoiceLabel: v["immobilier-ia"].mistralVoiceLabel,
    portraitPrompt:
      "Professional headshot, French woman 35 years old, modern tech-forward style, violet blazer, bright engaging smile, background of a sleek real estate agency with screens showing dashboards, soft neon accents, photorealistic --ar 1:1 --style raw --s 250 --q 2",
    accentColor: "#6d28d9",
    initials: "CM",
  },
```

- [ ] **Step 3 : showcase** (avant `};`) :

```ts
  "immobilier-ia": {
    badge: "🤖",
    headline: "L'IA ne remplacera pas les agents — elle remplacera les agents qui l'ignorent",
    subhead:
      "Prompts, annonces, analyse de documents, RGPD : 7h pour intégrer l'IA à votre quotidien d'agent — avec méthode et sans risque juridique.",
    outcomes: [
      "Une méthode de prompt réutilisable pour tout votre quotidien",
      "Annonces, prospection, réseaux sociaux : produire mieux, 5× plus vite",
      "PV d'AG, baux, diagnostics : analyser des documents longs en minutes",
      "RGPD, AI Act, discrimination : utiliser l'IA sans se mettre en danger",
    ],
    durationLabel: "~7 h",
    proofLine: [
      "Cas concrets : annonce premium, PV d'AG de 40 pages, audit d'agence",
      "Charte IA d'agence en 8 points, prête à adopter",
      "QCM final de 15 questions niveau pro",
    ],
    heroGradient: "from-[#1e1b4b] via-[#5b21b6] to-[#8b5cf6]",
    lessonTeaser: {
      "comprendre-ia": "Ce que l'IA fait très bien, très mal — et la règle d'or du pro.",
      "rediger-vendre-ia": "La méthode CRTE : des prompts qui produisent VOS textes, en mieux.",
      "ia-transaction": "Estimation, documents, comptes-rendus : l'IA dans la vraie transaction.",
      "cadre-legal-ia": "RGPD, AI Act, loyauté des annonces : les lignes à ne pas franchir.",
    },
  },
```

- [ ] **Step 4 : widget** — grille `grid-cols-3 … sm:grid-cols-9` → `grid-cols-5 … sm:grid-cols-10` ; label `"immobilier-ia": "IA"`.

- [ ] **Step 5 : cover OpenAI** — gpt-image-1 1536×1024, prompt : "Photorealistic scene inside a modern French real estate agency, an elegant agent at a desk reviewing property listings on a large screen with a subtle glowing AI assistant interface and data visualizations, warm professional lighting with soft violet accents, ultra-detailed, no text, no watermark" → recadrer 1024×576 JPG q82 → `lms/public/generated/fal/immobilier-ia/cover.jpg` ; contrôle visuel ; ajouter `"immobilier-ia"` à `withCover` dans `page.tsx`.

- [ ] **Step 6 : Vérifier + commit** — `npx vitest run` PASS ; commit `feat(ia): formatrice Clara Morel, vitrine, widget 10 colonnes, cover dediee`.

---

### Task 6 : Audio Mistral ×4

**Files:** `script-discovery.mjs` (+ `"module9-immobilier-ia"`), `lesson-mistral-voice.mjs` (+ `"module9-immobilier-ia": "immobilier-ia"`), Create: 4 MP3 dans `lms/public/audio/`

- [ ] **Step 1 : brancher module9** (une ligne dans chaque lib).
- [ ] **Step 2 : générer** — `node scripts/generate-all-lesson-audio.mjs --only 01-comprendre-ia` puis 02/03/04, ~65 s d'écart (arrière-plan) ; voix attendue « Clara Morel — Marie Happy ».
- [ ] **Step 3 : durées** — ffprobe : 7 à 13 min chacun.
- [ ] **Step 4 : Commit** `feat(ia): narration audio Mistral des 4 lecons (voix Clara Morel)`.

---

### Task 7 : Vérification + déploiement

- [ ] **Step 1 :** `npx vitest run` PASS ; `npm run build` OK.
- [ ] **Step 2 :** push branche + fast-forward `main` (fetch d'abord).
- [ ] **Step 3 :** vérifier LES DEUX prods après build : monpassformation.com (Netlify — carte 🤖, cover 200, 4 MP3 en 206, leçon → login, checkout Stripe) et app.monpassformation.com (Vercel — statiques 200/206). Si Netlify ne rebuild pas : commit vide de relance.
- [ ] **Step 4 :** récap à Gregory + rappel relecture juridique de la leçon 4.

## Self-Review (fait à l'écriture)
- Couverture spec complète (contenu T1, produit T2-T3, examen T4, présentation T5, audio T6, deploy T7). 420 min testées T2. Slugs cohérents partout (`immobilier-ia`, leçons `comprendre-ia`/`rediger-vendre-ia`/`ia-transaction`/`cadre-legal-ia`). Garde-fous contenu dans les contraintes globales. ✔
