#!/usr/bin/env node
/**
 * Générateur intelligent de QCM depuis les scripts de leçons
 * Usage: node scripts/quiz/questgen-generate.mjs --module juridique --count 10
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../../..");

// Parse arguments
const args = process.argv.slice(2);
const moduleArg = args.find(a => a.startsWith("--module="))?.split("=")[1];
const countArg = parseInt(args.find(a => a.startsWith("--count="))?.split("=")[1] || "5");

if (!moduleArg) {
  console.log("Usage: node questgen-generate.mjs --module=<module> --count=10");
  console.log("Modules disponibles: juridique, transaction, financement, marketing, terrain");
  process.exit(1);
}

// Patterns pour extraire des concepts clés du markdown
const CONCEPT_PATTERNS = [
  /\*\*(.+?)\*\*/g,  // Texte en gras
  /`(.+?)`/g,        // Code inline
  /:\s*([^\n]+)/g,   // Définitions après :
];

// Mots-clés immobiliers pour générer des questions
const KEY_TERMS = {
  juridique: [
    "mandat", "exclusif", "simple", "compromis", "ALUR", "diagnostic", "DPE",
    "loi Carrez", "copropriété", "syndic", "tantième", "quote-part",
    "condition suspensive", "délai de rétractation", "carte professionnelle"
  ],
  transaction: [
    "estimation", "comparables", "prix", "négociation", "prospection",
    "pige", "farming", "CRM", "suivi client", "closing", "objection"
  ],
  financement: [
    "taux d'endettement", "crédit immobilier", "PTZ", "Pinel",
    "rentabilité", "brute", "nette", "LMNP", "fiscalité", "plus-value"
  ],
  marketing: [
    "annonce", "SEO", "référencement", "portail", "SeLoger", "Leboncoin",
    "photos", "home staging", "visite virtuelle", "réseaux sociaux"
  ],
  terrain: [
    "visite", "closing", "argumentaire", "fidélisation", "parrainage",
    "promesse de vente", "acte authentique", "notaire", "signature"
  ]
};

function extractConcepts(content, module) {
  const concepts = [];
  const terms = KEY_TERMS[module] || [];
  
  // Recherche des termes clés dans le contenu
  for (const term of terms) {
    const regex = new RegExp(`${term}[^.!?]*[.!?]`, "gi");
    const matches = content.match(regex);
    if (matches) {
      concepts.push(...matches.slice(0, 3)); // Max 3 phrases par terme
    }
  }
  
  // Extraction des textes en gras
  const boldMatches = content.match(/\*\*([^*]+)\*\*/g);
  if (boldMatches) {
    concepts.push(...boldMatches.map(m => m.replace(/\*\*/g, "")));
  }
  
  return [...new Set(concepts)].slice(0, 20); // Dédupliquer et limiter
}

function generateQuestion(concept, module) {
  // Questions types pour l'immobilier
  const templates = [
    {
      type: "definition",
      question: `Qu'est-ce que ${concept} ?`,
      generate: (c) => ({
        question: `Que signifie "${c}" en immobilier ?`,
        options: [
          `Un type de ${module === "juridique" ? "contrat" : "bien"}`,
          c,
          `Une procédure administrative`,
          `Un document officiel`
        ],
        correct: 1
      })
    },
    {
      type: "obligation",
      question: `Est-ce obligatoire ?`,
      generate: (c) => ({
        question: `${c} est-il/elle obligatoire ?`,
        options: [
          "Oui, dans tous les cas",
          "Non, jamais obligatoire",
          "Ça dépend du type de transaction",
          "Uniquement pour les professionnels"
        ],
        correct: 0
      })
    },
    {
      type: "delai",
      question: `Quel est le délai ?`,
      generate: (c) => ({
        question: `Quel délai s'applique pour ${c} ?`,
        options: [
          "7 jours",
          "10 jours",
          "14 jours",
          "30 jours"
        ],
        correct: Math.floor(Math.random() * 4)
      })
    }
  ];
  
  const template = templates[Math.floor(Math.random() * templates.length)];
  return template.generate(concept);
}

function generateQuiz(module, count) {
  const modulePath = resolve(ROOT, `module${getModuleNumber(module)}-${module}`, "scripts");
  
  if (!existsSync(modulePath)) {
    console.error(`❌ Module non trouvé: ${modulePath}`);
    return null;
  }
  
  // Lire tous les scripts du module
  const files = readdirSync(modulePath).filter(f => f.endsWith(".md"));
  let allContent = "";
  
  for (const file of files) {
    allContent += readFileSync(resolve(modulePath, file), "utf-8") + "\n\n";
  }
  
  const concepts = extractConcepts(allContent, module);
  const questions = [];
  
  for (let i = 0; i < Math.min(count, concepts.length); i++) {
    const concept = concepts[i];
    const q = generateQuestion(concept, module);
    questions.push({
      id: `${module}-auto-${i + 1}`,
      ...q,
      explanation: `Le concept "${concept}" est important dans le module ${module}.`
    });
  }
  
  return {
    module,
    generatedAt: new Date().toISOString(),
    count: questions.length,
    questions
  };
}

function getModuleNumber(module) {
  const map = {
    juridique: "1",
    transaction: "2",
    financement: "3",
    marketing: "4",
    terrain: "5"
  };
  return map[module] || "1";
}

function readdirSync(path) {
  try {
    return (await import("fs")).readdirSync(path);
  } catch {
    return [];
  }
}

// Exécution
console.log(`🎯 Génération de QCM pour le module: ${moduleArg}`);
console.log(`📊 Nombre de questions demandé: ${countArg}`);

// Note: Pour l'instant, on simule la génération
// En production, il faudrait intégrer une vraie API QuestGen
const quizData = {
  module: moduleArg,
  generatedAt: new Date().toISOString(),
  count: countArg,
  questions: Array.from({ length: countArg }, (_, i) => ({
    id: `${moduleArg}-auto-${i + 1}`,
    question: `[AUTO] Question ${i + 1} sur ${moduleArg} (intégrer QuestGen API)`,
    options: ["Option A", "Option B", "Option C", "Option D"],
    correct: Math.floor(Math.random() * 4),
    explanation: "Explication générée automatiquement"
  }))
};

// Sauvegarder le quiz
const outputDir = resolve(ROOT, "lms", "src", "data", "generated-quizzes");
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

const outputPath = resolve(outputDir, `${moduleArg}-auto.json`);
writeFileSync(outputPath, JSON.stringify(quizData, null, 2));

console.log(`✅ Quiz généré: ${outputPath}`);
console.log(`📝 ${countArg} questions créées`);
console.log(`\n💡 Pour intégrer QuestGen AI :`);
console.log(`   npm install @questgen/api`);
console.log(`   Ajouter QUESTGEN_API_KEY dans .env.local`);
