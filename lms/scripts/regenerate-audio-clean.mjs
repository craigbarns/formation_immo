#!/usr/bin/env node
/**
 * Régénère les audios avec les scripts narration nettoyés (sans Markdown)
 * Usage: node scripts/regenerate-audio-clean.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

// Mistral API config
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
const VOICE_ID = process.env.MISTRAL_VOICE_ID || "mistral-voxtral-female-1";

async function generateAudio(text, outputPath) {
  console.log(`  🎤 Génération audio...`);
  
  const res = await fetch("https://api.mistral.ai/v1/audio/speech", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${MISTRAL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "voxtral",
      voice: VOICE_ID,
      input: text,
    }),
  });
  
  if (!res.ok) {
    throw new Error(`Mistral API error: ${res.status} ${await res.text()}`);
  }
  
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outputPath, buffer);
  console.log(`  ✅ Audio sauvegardé: ${path.basename(outputPath)}`);
}

async function main() {
  if (!MISTRAL_API_KEY) {
    console.error("❌ MISTRAL_API_KEY manquante");
    process.exit(1);
  }
  
  // Trouve tous les fichiers .narration.txt
  const modules = [
    "module1-juridique",
    "module2-transaction", 
    "module3-financement",
    "module4-marketing",
    "module5-terrain"
  ];
  
  for (const mod of modules) {
    const scriptsDir = path.join(ROOT, "..", mod, "scripts");
    if (!fs.existsSync(scriptsDir)) continue;
    
    const files = fs.readdirSync(scriptsDir).filter(f => f.endsWith(".narration.txt"));
    
    for (const file of files) {
      const narrationPath = path.join(scriptsDir, file);
      const baseName = file.replace(".narration.txt", "");
      const outputPath = path.join(ROOT, "public/audio", `${baseName}.mp3`);
      
      // Skip si déjà existant (décommente pour forcer la régénération)
      if (fs.existsSync(outputPath)) {
        console.log(`⏭️  SKIP (déjà existant): ${baseName}.mp3`);
        continue;
      }
      
      console.log(`\n📝 ${baseName}`);
      
      // Lit le texte narration (skip les 4 premières lignes de header)
      const content = fs.readFileSync(narrationPath, "utf8");
      const lines = content.split("\n");
      const text = lines.slice(4).join("\n").trim();
      
      if (text.length < 100) {
        console.log(`  ⚠️  Texte trop court, ignoré`);
        continue;
      }
      
      try {
        await generateAudio(text.slice(0, 4000), outputPath); // Limite 4000 caractères
      } catch (err) {
        console.error(`  ❌ Erreur: ${err.message}`);
      }
    }
  }
  
  console.log("\n✅ Terminé !");
}

main().catch(console.error);
