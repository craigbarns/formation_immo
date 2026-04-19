#!/usr/bin/env node
/**
 * Générateur de sous-titres avec WhisperX
 * Usage: node scripts/subtitles/whisperx-generate.mjs --video lecon1.mp4 --lang fr
 */

// import { spawn } from "child_process";
import { existsSync, writeFileSync } from "fs";
import { resolve, basename, extname } from "path";
// import { fileURLToPath } from "url";
// const __dirname = dirname(fileURLToPath(import.meta.url));

const args = process.argv.slice(2);
const videoPath = args.find(a => a.startsWith("--video="))?.split("=")[1];
const lang = args.find(a => a.startsWith("--lang="))?.split("=")[1] || "fr";
const outputFormat = args.find(a => a.startsWith("--format="))?.split("=")[1] || "srt";

if (!videoPath) {
  console.log("Usage: node whisperx-generate.mjs --video=chemin/vers/video.mp4 [--lang=fr] [--format=srt]");
  console.log("\nFormats disponibles:");
  console.log("  srt    - SubRip (par défaut)");
  console.log("  vtt    - WebVTT");
  console.log("  json   - JSON avec timestamps");
  console.log("  txt    - Texte brut");
  process.exit(1);
}

if (!existsSync(videoPath)) {
  console.error(`❌ Vidéo non trouvée: ${videoPath}`);
  process.exit(1);
}

console.log(`🎬 Génération des sous-titres pour: ${basename(videoPath)}`);
console.log(`🌍 Langue: ${lang}`);
console.log(`📄 Format: ${outputFormat}`);

// Configuration WhisperX
const WHISPERX_CONFIG = {
  model: "large-v2",
  language: lang,
  output_format: outputFormat,
  // Options avancées
  max_line_count: 2,
  max_line_width: 42,
  // Alignement et diarization
  align_model: "VOXPOPULI",
  diarize: false,
  min_speakers: 1,
  max_speakers: 2
};

// Commande WhisperX
const whisperxCmd = `whisperx "${videoPath}" \
  --model ${WHISPERX_CONFIG.model} \
  --language ${WHISPERX_CONFIG.language} \
  --output_format ${WHISPERX_CONFIG.output_format} \
  --max_line_count ${WHISPERX_CONFIG.max_line_count} \
  --max_line_width ${WHISPERX_CONFIG.max_line_width} \
  --align_model ${WHISPERX_CONFIG.align_model} \
  --output_dir "${dirname(videoPath)}"`;

console.log("\n⚙️  Commande exécutée:");
console.log(whisperxCmd);
console.log("\n⏳ Traitement en cours... (peut prendre plusieurs minutes)");

// Exécution simulée (à remplacer par vraie commande si WhisperX installé)
async function generateSubtitles() {
  const baseName = basename(videoPath, extname(videoPath));
  const outputPath = resolve(dirname(videoPath), `${baseName}.${outputFormat}`);
  
  // Vérifier si WhisperX est installé
  try {
    const { execSync } = await import("child_process");
    execSync("which whisperx", { stdio: "ignore" });
    
    // WhisperX est installé, on l'exécute
    console.log("✅ WhisperX trouvé, génération en cours...");
    
    execSync(whisperxCmd, { stdio: "inherit" });
    
    console.log(`\n✅ Sous-titres générés: ${outputPath}`);
    
  } catch {
    // WhisperX non installé, on crée un fichier exemple
    console.log("⚠️  WhisperX non installé, création d'un fichier exemple");
    console.log("\nPour installer WhisperX:");
    console.log("  pip install whisperx");
    console.log("  # ou");
    console.log("  pip install git+https://github.com/m-bain/whisperx.git");
    
    // Créer un fichier SRT exemple
    const exampleSRT = `1
00:00:01,000 --> 00:00:04,000
Bonjour et bienvenue dans cette formation

2
00:00:04,500 --> 00:00:08,000
Aujourd'hui nous allons apprendre les bases

3
00:00:08,500 --> 00:00:12,000
Du métier d'agent immobilier

[FICHIER EXEMPLE - WhisperX non installé]`;

    writeFileSync(outputPath, exampleSRT);
    console.log(`\n📝 Fichier exemple créé: ${outputPath}`);
  }
  
  // Afficher les métadonnées
  console.log("\n📊 Métadonnées suggérées:");
  console.log(`  - Langue: ${lang}`);
  console.log(`  - Format: ${outputFormat.toUpperCase()}`);
  console.log(`  - Vidéo source: ${videoPath}`);
  
  return outputPath;
}

generateSubtitles().catch(err => {
  console.error("❌ Erreur:", err.message);
  process.exit(1);
});
