#!/usr/bin/env node
/**
 * Génération voix avec ElevenLabs (ultra réaliste)
 * Usage: node scripts/simple/elevenlabs-generate.mjs --text="Bonjour" --voice=marie
 */

import { writeFileSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");

const args = process.argv.slice(2);
const text = args.find(a => a.startsWith("--text="))?.split("=")[1];
const voiceId = args.find(a => a.startsWith("--voice="))?.split("=")[1] || "marie";
const output = args.find(a => a.startsWith("--output="))?.split("=")[1] || "output";

if (!text) {
  console.log("🎙️ ElevenLabs Voice Generator");
  console.log("\nUsage: node elevenlabs-generate.mjs --text=\"Votre texte\" [--voice=marie] [--output=nom]");
  console.log("\nVoix disponibles:");
  console.log("  marie    - Voix féminine française professionnelle");
  console.log("  pierre   - Voix masculine française");
  console.log("  sophie   - Voix féminine jeune et dynamique");
  console.log("\nConfiguration:");
  console.log("  Ajouter dans .env.local: ELEVENLABS_API_KEY=votre_clé");
  console.log("  Obtenir une clé: https://elevenlabs.io/app/sign-up");
  process.exit(1);
}

const API_KEY = process.env.ELEVENLABS_API_KEY;

if (!API_KEY) {
  console.log("❌ Clé API ElevenLabs manquante");
  console.log("\n1. Créer compte sur https://elevenlabs.io");
  console.log("2. Copier votre clé API");
  console.log("3. Ajouter dans .env.local:");
  console.log("   ELEVENLABS_API_KEY=votre_clé_ici");
  process.exit(1);
}

// Mapping voix
const VOICES = {
  marie: { id: "21m00Tcm4TlvDq8ikWAM", name: "Rachel (FR-like)" },
  pierre: { id: "AZnzlk1XvdvUeBnXmlld", name: "Domi (Masc)" },
  sophie: { id: "EXAVITQu4vr4xnSDxMaL", name: "Bella (Young)" },
};

const voice = VOICES[voiceId] || VOICES.marie;

async function generateVoice() {
  console.log(`🎙️ ElevenLabs - Génération voix`);
  console.log(`   Voix: ${voice.name}`);
  console.log(`   Texte: "${text.slice(0, 50)}${text.length > 50 ? '...' : ''}"`);
  console.log(`   Caractères: ${text.length}\n`);

  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice.id}`, {
      method: "POST",
      headers: {
        "Accept": "audio/mpeg",
        "Content-Type": "application/json",
        "xi-api-key": API_KEY,
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.3,
          use_speaker_boost: true,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail?.message || `HTTP ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const outputPath = resolve(ROOT, "public", "audio", "generated", `${output}.mp3`);
    writeFileSync(outputPath, Buffer.from(arrayBuffer));

    const duration = Math.ceil(text.length / 15); // ~15 chars/sec
    
    console.log(`✅ Audio généré!`);
    console.log(`   Fichier: ${outputPath}`);
    console.log(`   Taille: ${(arrayBuffer.byteLength / 1024).toFixed(1)} KB`);
    console.log(`   Durée estimée: ~${duration}s`);
    console.log(`\n💡 Prochaine étape:`);
    console.log(`   node scripts/simple/did-generate.mjs \\\n     --audio ${outputPath} \\\n     --image public/avatars/marie.jpg \\\n     --output=${output}`);

  } catch (error) {
    console.error("❌ Erreur:", error.message);
    console.log("\n💡 Vérifiez:");
    console.log("   - Votre clé API est valide");
    console.log("   - Vous avez des crédits suffisants");
    console.log("   - Le texte ne dépasse pas les limites");
    process.exit(1);
  }
}

generateVoice();
