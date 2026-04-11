#!/usr/bin/env node
/**
 * Crée des slides avec Slidev
 * Usage: node scripts/simple/slidev-create.mjs --module=juridique --lesson=mandat
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");

const args = process.argv.slice(2);
const moduleName = args.find(a => a.startsWith("--module="))?.split("=")[1];
const lessonName = args.find(a => a.startsWith("--lesson="))?.split("=")[1];

if (!moduleName || !lessonName) {
  console.log("🎨 Slidev Slide Creator");
  console.log("\nUsage: node slidev-create.mjs --module=juridique --lesson=mandat");
  console.log("\nPrérequis:");
  console.log("  npm install -g @slidev/cli");
  console.log("\nOu utiliser npx:");
  console.log("  npx slidev");
  process.exit(1);
}

// Templates de slides par type de contenu
const SLIDE_TEMPLATES = {
  title: (title, subtitle) => `
---
layout: cover
background: https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920
---

# ${title}

${subtitle}

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-4 py-2 rounded bg-gold-400 text-navy-900 cursor-pointer hover:bg-gold-500">
    Commencer →
  </span>
</div>
`,

  content: (title, points) => `
---
layout: default
---

# ${title}

${points.map(p => `- ${p}`).join('\n')}
`,

  twoColumn: (title, left, right) => `
---
layout: two-cols
---

# ${title}

${left.map(p => `- ${p}`).join('\n')}

::right::

${right}
`,

  image: (title, imageUrl, caption) => `
---
layout: image
image: ${imageUrl}
---

# ${title}

<div class="absolute bottom-10 left-0 right-0 text-center">
  <p class="text-white bg-black/50 inline-block px-4 py-2 rounded">
    ${caption}
  </p>
</div>
`,

  quote: (text, author) => `
---
layout: quote
---

# "${text}"

— ${author}
`,
};

// Générer les slides selon le module
function generateSlides(module, lesson) {
  const slidesDir = resolve(ROOT, "..", "video-tools", "slidev", `${module}-${lesson}`);
  
  if (!existsSync(slidesDir)) {
    mkdirSync(slidesDir, { recursive: true });
  }

  // Exemple pour leçon "mandat"
  let content = "";

  if (lesson === "mandat") {
    content = `
---
theme: seriph
background: https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920
class: text-center
highlighter: shiki
---

# Le Mandat de Vente

Formation Immobilière 42h - Module Juridique

---

# Qu'est-ce qu'un mandat ?

Le mandat est un **contrat** par lequel le propriétaire donne pouvoir à un agent immobilier de vendre son bien.

<div class="mt-8 p-4 bg-blue-100 rounded-lg">
  💡 Sans mandat écrit, l'agent ne peut pas percevoir de commission.
</div>

---

# Les 3 types de mandat

| Type | Description | Exclusivité |
|------|-------------|-------------|
| **Simple** | Le propriétaire peut vendre lui-même ou via plusieurs agences | ❌ Non |
| **Exclusif** | Une seule agence, le propriétaire ne peut pas vendre seul | ✅ Oui |
| **Semi-exclusif** | Une seule agence, mais le propriétaire peut vendre seul | ⚡ Partielle |

---

# Durée du mandat

<v-clicks>

- **Maximum** : 3 mois renouvelable
- **Renouvellement** : doit être exprès (pas tacite)
- **Réduction** : possible si clause dans le mandat
- **ALUR** : information sur le prix médian obligatoire

</v-clicks>

---

# Points clés à retenir

<div class="grid grid-cols-2 gap-4">

<div>

### ✅ Obligatoire
- Écrit et signé
- Prix du bien
- Durée
- Taux de commission

</div>

<div>

### ❌ Interdit
- Durée > 3 mois tacite
- Commission non précisée
- Mandat sans identité agent

</div>

</div>

---
layout: center
class: text-center
---

# Merci !

Questions ?

<div class="mt-8">
  <a href="/formation/juridique/mandat/quiz" class="px-6 py-3 bg-gold-400 text-navy-900 rounded-lg font-semibold hover:bg-gold-500">
    Passer au quiz →
  </a>
</div>
`;
  } else {
    // Template générique
    content = `
---
theme: seriph
background: https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920
class: text-center
---

# ${lesson.charAt(0).toUpperCase() + lesson.slice(1)}

Formation Immobilière 42h - Module ${module}

---

# Introduction

Contenu à personnaliser...

---

# Concept principal

- Point 1
- Point 2
- Point 3

---

# Exemple pratique

Illustration à ajouter

---
layout: center
class: text-center
---

# Merci !
`;
  }

  // Écrire le fichier slides.md
  const slidesPath = resolve(slidesDir, "slides.md");
  writeFileSync(slidesPath, content.trim());

  // Créer package.json
  const packageJson = {
    "name": `@formation/slides-${module}-${lesson}`,
    "private": true,
    "scripts": {
      "dev": "slidev",
      "build": "slidev build",
      "export": "slidev export --format pdf",
      "export:png": "slidev export --format png"
    },
    "dependencies": {
      "@slidev/cli": "^0.46.0",
      "@slidev/theme-seriph": "^0.25.0"
    }
  };
  writeFileSync(resolve(slidesDir, "package.json"), JSON.stringify(packageJson, null, 2));

  console.log(`✅ Slides créés: ${slidesDir}`);
  console.log("\n📋 Prochaines étapes:");
  console.log(`  cd ${slidesDir}`);
  console.log("  npm install");
  console.log("  npm run dev          # Preview");
  console.log("  npm run export       # PDF");
  console.log("  npm run export:png   # Images");
}

generateSlides(moduleName, lessonName);
