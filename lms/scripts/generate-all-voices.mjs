#!/usr/bin/env node
/**
 * Génère toutes les voix Marie avec XTTS
 * Usage: node scripts/generate-all-voices.mjs
 */

import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const API_URL = process.env.XTTS_API_URL || "http://localhost:5000";

// Récupérer tous les scripts
const modules = ['welcome', 'juridique', 'transaction', 'financement', 'marketing', 'terrain'];

console.log("🎙️  Générateur de voix XTTS pour Marie\n");
console.log(`API: ${API_URL}\n`);

async function generateVoice(moduleId) {
  const metaPath = resolve(ROOT, "public", "audio", "generated", `marie-intro-${moduleId}.json`);
  
  if (!existsSync(metaPath)) {
    console.log(`❌ Métadonnées manquantes: ${moduleId}`);
    return;
  }
  
  const metadata = JSON.parse(readFileSync(metaPath, "utf-8"));
  const { text, speaker, language } = metadata;
  
  console.log(`\n📢 ${moduleId.toUpperCase()}`);
  console.log(`   Texte: "${text.slice(0, 50)}..."`);
  console.log(`   Mots: ${metadata.word_count} | Durée estimée: ~${metadata.estimated_duration}s`);
  
  // Vérifier si le serveur XTTS est disponible
  try {
    const health = await fetch(`${API_URL}/health`).catch(() => null);
    if (!health || !health.ok) {
      console.log(`   ⚠️  Serveur XTTS indisponible sur ${API_URL}`);
      console.log(`   💡 Lancez: python -m TTS.server.server --port 5000`);
      return;
    }
  } catch (e) {
    console.log(`   ❌ Erreur connexion: ${e.message}`);
    return;
  }
  
  // Générer l'audio
  try {
    console.log(`   ⏳ Génération en cours...`);
    
    const response = await fetch(`${API_URL}/api/tts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        speaker_wav: resolve(ROOT, "public", "audio", "speakers", `${speaker}-reference.wav`),
        language
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const audioBuffer = await response.arrayBuffer();
    const outputPath = resolve(ROOT, "public", "audio", "generated", `marie-intro-${moduleId}.mp3`);
    
    writeFileSync(outputPath, Buffer.from(audioBuffer));
    console.log(`   ✅ Audio généré: ${(audioBuffer.byteLength / 1024).toFixed(1)} KB`);
    
  } catch (error) {
    console.log(`   ❌ Erreur: ${error.message}`);
  }
}

// Vérifier le fichier référence
const refPath = resolve(ROOT, "public", "audio", "speakers", "marie-reference.wav");
if (!existsSync(refPath)) {
  console.log("⚠️  Fichier référence manquant!");
  console.log(`   Attendu: ${refPath}`);
  console.log("\n📋 Instructions pour créer la référence:");
  console.log("   1. Enregistrez 6-10 secondes de voix claire");
  console.log("   2. Format: WAV, 22050Hz, mono");
  console.log("   3. Contenu: 'Bonjour, je suis Marie, votre coach immobilier.'");
  console.log("   4. Placez le fichier au chemin indiqué");
  process.exit(1);
}

console.log(`✅ Référence trouvée: ${refPath}\n`);

// Générer toutes les voix
async function main() {
  for (const moduleId of modules) {
    await generateVoice(moduleId);
  }
  
  console.log("\n" + "=".repeat(50));
  console.log("✨ Génération terminée!");
  console.log("\nProchaines étapes:");
  console.log("  1. Générer sous-titres: node scripts/subtitles/whisperx-generate.mjs");
  console.log("  2. Visiter: http://localhost:3000/formation/marie-avatar-demo");
  console.log("=".repeat(50));
}

import { writeFileSync } from "fs";
main().catch(console.error);
