#!/usr/bin/env node
/**
 * Générateur de voix avec Coqui XTTS
 * Usage: node scripts/voice/xtts-generate.mjs --text "Bonjour" --speaker marie --output voix.mp3
 */

import { writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../../..");

// Configuration des voix disponibles
const VOICES = {
  marie: {
    name: "Marie",
    description: "Coach pédagogique - ton chaleureux et professionnel",
    speaker_wav: resolve(ROOT, "lms", "public", "audio", "speakers", "marie-reference.wav"),
    language: "fr"
  },
  pierre: {
    name: "Pierre",
    description: "Formateur juridique - ton sérieux et structuré",
    speaker_wav: resolve(ROOT, "lms", "public", "audio", "speakers", "pierre-reference.wav"),
    language: "fr"
  },
  sophie: {
    name: "Sophie",
    description: "Formatrice marketing - ton dynamique et moderne",
    speaker_wav: resolve(ROOT, "lms", "public", "audio", "speakers", "sophie-reference.wav"),
    language: "fr"
  }
};

const args = process.argv.slice(2);
const textArg = args.find(a => a.startsWith("--text="))?.split("=")[1];
const speakerArg = args.find(a => a.startsWith("--speaker="))?.split("=")[1] || "marie";
const outputArg = args.find(a => a.startsWith("--output="))?.split("=")[1];
const apiUrlArg = args.find(a => a.startsWith("--api="))?.split("=")[1] || "http://localhost:5000";

if (!textArg) {
  console.log("🎙️  XTTS Voice Generator");
  console.log("\nUsage: node xtts-generate.mjs --text=\"Votre texte\" [options]");
  console.log("\nOptions:");
  console.log("  --text=\"...\"      Texte à synthétiser (obligatoire)");
  console.log("  --speaker=marie     Voix à utiliser (marie|pierre|sophie)");
  console.log("  --output=fichier    Fichier de sortie (défaut: auto)");
  console.log("  --api=URL           URL du serveur XTTS (défaut: localhost:5000)");
  console.log("\nVoix disponibles:");
  Object.entries(VOICES).forEach(([key, voice]) => {
    console.log(`  ${key.padEnd(10)} - ${voice.description}`);
  });
  process.exit(1);
}

const voice = VOICES[speakerArg];
if (!voice) {
  console.error(`❌ Voix inconnue: ${speakerArg}`);
  console.log(`Voix disponibles: ${Object.keys(VOICES).join(", ")}`);
  process.exit(1);
}

console.log(`🎙️  Génération vocale avec ${voice.name}`);
console.log(`📝 Texte: "${textArg.slice(0, 50)}${textArg.length > 50 ? "..." : ""}"`);
console.log(`🌍 Langue: ${voice.language}`);

// Générer le nom de fichier de sortie
const timestamp = Date.now();
const outputName = outputArg || `${speakerArg}-${timestamp}.mp3`;
const outputPath = resolve(ROOT, "lms", "public", "audio", "generated", outputName);

// Créer le répertoire de sortie
const outputDir = dirname(outputPath);
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

async function generateVoice() {
  try {
    // Vérifier si le serveur XTTS est disponible
    console.log(`\n🔌 Connexion à XTTS: ${apiUrlArg}`);
    
    const healthCheck = await fetch(`${apiUrlArg}/health`).catch(() => null);
    
    if (!healthCheck || !healthCheck.ok) {
      console.log("⚠️  Serveur XTTS non disponible, création d'un fichier exemple");
      console.log("\nPour démarrer XTTS:");
      console.log("  pip install TTS");
      console.log("  python -m TTS.server.server --model_name tts_models/multilingual/multi-dataset/xtts_v2");
      
      // Créer un fichier texte placeholder
      const placeholder = `# XTTS Voice Generation Placeholder
Generated: ${new Date().toISOString()}
Speaker: ${voice.name}
Text: ${textArg}
Language: ${voice.language}

[Ce fichier est un placeholder. Installez Coqui XTTS pour générer de vrais audios.]
`;
      writeFileSync(outputPath.replace(".mp3", ".txt"), placeholder);
      
      console.log(`\n📝 Placeholder créé: ${outputPath.replace(".mp3", ".txt")}`);
      return;
    }

    // Appeler l'API XTTS
    console.log("✅ Serveur XTTS connecté");
    console.log("⏳ Génération en cours... (peut prendre 10-30 secondes)");

    const response = await fetch(`${apiUrlArg}/api/tts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: textArg,
        speaker_wav: voice.speaker_wav,
        language: voice.language
      })
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    // Sauvegarder l'audio
    const audioBuffer = await response.arrayBuffer();
    writeFileSync(outputPath, Buffer.from(audioBuffer));

    console.log(`\n✅ Audio généré: ${outputPath}`);
    console.log(`📊 Taille: ${(audioBuffer.byteLength / 1024).toFixed(1)} KB`);
    
    // Générer les métadonnées
    const metadata = {
      text: textArg,
      speaker: speakerArg,
      voice_name: voice.name,
      language: voice.language,
      duration_estimate: Math.ceil(textArg.length / 15), // ~15 chars/sec
      generated_at: new Date().toISOString(),
      file_path: `/audio/generated/${outputName}`
    };
    
    writeFileSync(
      outputPath.replace(".mp3", ".json"),
      JSON.stringify(metadata, null, 2)
    );
    
    console.log(`📝 Métadonnées: ${outputPath.replace(".mp3", ".json")}`);
    
    // Suggérer la génération de sous-titres
    console.log("\n💡 Prochaines étapes suggérées:");
    console.log(`  node scripts/subtitles/whisperx-generate.mjs --video=${outputPath}`);

  } catch (error) {
    console.error("\n❌ Erreur:", error.message);
    process.exit(1);
  }
}

generateVoice();
