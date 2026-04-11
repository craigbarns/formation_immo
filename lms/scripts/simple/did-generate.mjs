#!/usr/bin/env node
/**
 * Génération avatar parlant avec D-ID
 * Usage: node scripts/simple/did-generate.mjs --audio voix.mp3 --image marie.jpg
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");

const args = process.argv.slice(2);
const audioPath = args.find(a => a.startsWith("--audio="))?.split("=")[1];
const imagePath = args.find(a => a.startsWith("--image="))?.split("=")[1];
const outputName = args.find(a => a.startsWith("--output="))?.split("=")[1] || "output";

if (!audioPath || !imagePath) {
  console.log("🎭 D-ID Avatar Generator");
  console.log("\nUsage: node did-generate.mjs --audio=voix.mp3 --image=marie.jpg [--output=nom]");
  console.log("\nÉtapes:");
  console.log("  1. Obtenir une clé API sur https://studio.d-id.com");
  console.log("  2. Lancer: node did-generate.mjs --audio=... --image=...");
  console.log("  3. Attendre la génération (~1-2 min)");
  console.log("\nOptions:");
  console.log("  --audio=path    Fichier audio MP3/WAV");
  console.log("  --image=path    Photo portrait (face visible)");
  console.log("  --output=nom    Nom du fichier sortie");
  process.exit(1);
}

// Configuration
const API_KEY = process.env.DID_API_KEY;

if (!API_KEY) {
  console.log("⚠️  Clé API D-ID manquante");
  console.log("\nPour obtenir une clé:");
  console.log("  1. Créer compte sur https://studio.d-id.com");
  console.log("  2. Aller dans Settings > API");
  console.log("  3. Ajouter dans .env.local: DID_API_KEY=votre_clé");
  console.log("\n💡 Alternative: Utiliser l'interface web de D-ID");
  console.log("   - Upload votre image sur studio.d-id.com");
  console.log("   - Upload votre audio");
  console.log("   - Télécharger la vidéo générée");
  process.exit(1);
}

async function generateAvatar() {
  console.log("🎭 Génération avatar D-ID\n");
  console.log(`📁 Audio: ${audioPath}`);
  console.log(`📁 Image: ${imagePath}`);
  console.log(`📤 Output: ${outputName}.mp4\n`);

  try {
    // Lire les fichiers
    const audioBuffer = readFileSync(resolve(ROOT, audioPath));
    const imageBuffer = readFileSync(resolve(ROOT, imagePath));

    // Convertir en base64
    const audioBase64 = audioBuffer.toString("base64");
    const imageBase64 = imageBuffer.toString("base64");

    console.log("⏳ Upload vers D-ID...");

    // Créer la vidéo
    const response = await fetch("https://api.d-id.com/talks", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source_url: `data:image/jpeg;base64,${imageBase64}`,
        script: {
          type: "audio",
          audio_url: `data:audio/mpeg;base64,${audioBase64}`,
        },
        config: {
          fluent: true,
          pad_audio: 0.5,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    const { id } = await response.json();
    console.log(`✅ Vidéo créée: ${id}`);
    console.log("⏳ Génération en cours... (~1-2 minutes)");

    // Attendre la fin
    let attempts = 0;
    const maxAttempts = 60;

    while (attempts < maxAttempts) {
      await new Promise(r => setTimeout(r, 2000));
      
      const statusRes = await fetch(`https://api.d-id.com/talks/${id}`, {
        headers: { "Authorization": `Basic ${API_KEY}` },
      });

      const status = await statusRes.json();
      
      if (status.status === "done") {
        const videoUrl = status.result_url;
        console.log(`\n✅ Vidéo prête!`);
        console.log(`🔗 URL: ${videoUrl}`);
        
        // Sauvegarder l'URL
        const outputPath = resolve(ROOT, "public", "videos", "avatars", `${outputName}.json`);
        writeFileSync(outputPath, JSON.stringify({
          id,
          url: videoUrl,
          created_at: new Date().toISOString(),
          audio: audioPath,
          image: imagePath,
        }, null, 2));
        
        console.log(`📝 Métadonnées: ${outputPath}`);
        console.log("\n💡 Pour télécharger:");
        console.log(`   curl -o ${outputName}.mp4 "${videoUrl}"`);
        return;
      }
      
      if (status.status === "error") {
        throw new Error(status.error || "Erreur de génération");
      }

      attempts++;
      process.stdout.write(".");
    }

    throw new Error("Timeout - la génération prend trop de temps");

  } catch (error) {
    console.error("\n❌ Erreur:", error.message);
    console.log("\n💡 Conseils:");
    console.log("   - Vérifiez que l'image contient un visage visible");
    console.log("   - L'audio doit être en MP3 ou WAV");
    console.log("   - Essayez avec l'interface web de D-ID");
    process.exit(1);
  }
}

generateAvatar();
