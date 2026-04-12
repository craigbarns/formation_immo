/**
 * Génération vidéos HeyGen — avatar parle sur les MP3 existants
 * Usage: node scripts/heygen-generate-videos.mjs
 *
 * Workflow:
 *  1. Lit les MP3 depuis public/audio/
 *  2. Upload chaque MP3 sur HeyGen
 *  3. Lance la génération vidéo (avatar + audio)
 *  4. Poll le status jusqu'à completion
 *  5. Sauvegarde les URLs dans src/data/heygen-videos.json
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const API_KEY = process.env.HEYGEN_API_KEY || "sk_V2_hgu_kUsxd24XGEM_Y8yRwWCKno6FWSNkQ9LCwNCtSAsk90ea";

// ─── Avatar assigné par module ───────────────────────────────────────────────
const MODULE_AVATARS = {
  juridique:   { avatarId: "Bastien_public_1",              name: "Bastien — Blazer bleu (Juriste)" },
  transaction: { avatarId: "Abigail_standing_office_front", name: "Abigail — Bureau (Négociatrice)" },
  financement: { avatarId: "Florin_Suit_Front_public",      name: "Florin — Costume (Analyste)" },
  marketing:   { avatarId: "Anja_standing_office_front",    name: "Anja — Bureau (Marketing)" },
  terrain:     { avatarId: "Brandon_Office_Standing_Front_public", name: "Brandon — Bureau (Directeur)" },
};

// ─── Mapping audio → module/leçon ────────────────────────────────────────────
const LESSON_AUDIO_MAP = [
  // Module 1 - Juridique
  { file: "01-loi-alur-2026.mp3",       module: "juridique",   lesson: "loi-alur" },
  { file: "02-compromis-vente.mp3",      module: "juridique",   lesson: "compromis" },
  { file: "03-diagnostics-immobiliers.mp3", module: "juridique", lesson: "diagnostics" },
  { file: "04-mandats-strategie.mp3",    module: "juridique",   lesson: "mandats" },
  { file: "05-copropriete-location.mp3", module: "juridique",   lesson: "copropriete" },
  { file: "06-parcours-interactif-transparence.mp3", module: "juridique", lesson: "parcours-interactif" },
  // Module 2 - Transaction
  { file: "01-estimation-immobiliere.mp3",          module: "transaction", lesson: "estimation" },
  { file: "02-prospection-scripts.mp3",             module: "transaction", lesson: "prospection" },
  { file: "03-negociation-mandat.mp3",              module: "transaction", lesson: "negociation-mandat" },
  { file: "04-techniques-negociation-avancees.mp3", module: "transaction", lesson: "negociation-avancee" },
  { file: "05-crm-fidelisation.mp3",                module: "transaction", lesson: "crm" },
  // Module 3 - Financement
  { file: "script01-credit-immobilier-2026.mp3",    module: "financement", lesson: "credit" },
  { file: "script02-fiscalite-immobiliere.mp3",     module: "financement", lesson: "fiscalite" },
  { file: "script03-calcul-rentabilite.mp3",        module: "financement", lesson: "rentabilite" },
  { file: "script04-dispositifs-fiscaux.mp3",       module: "financement", lesson: "dispositifs" },
  { file: "script05-assurances-immobilieres.mp3",   module: "financement", lesson: "assurances" },
  // Module 4 - Marketing
  { file: "01-photos-immobilieres-secrets-pros.mp3", module: "marketing", lesson: "photos" },
  { file: "02-rediger-annonces-qui-vendent.mp3",     module: "marketing", lesson: "annonces" },
  { file: "03-maitriser-seloger-leboncoin.mp3",      module: "marketing", lesson: "portails" },
  { file: "04-reseaux-sociaux-strategie-2026.mp3",   module: "marketing", lesson: "reseaux" },
  { file: "05-seo-immobilier-google.mp3",            module: "marketing", lesson: "seo" },
  // Module 5 - Terrain
  { file: "01-conduire-visite-pro.mp3",       module: "terrain", lesson: "visite" },
  { file: "02-argumentaire-convertit.mp3",    module: "terrain", lesson: "argumentaire" },
  { file: "03-techniques-closing-avancees.mp3", module: "terrain", lesson: "closing" },
  { file: "04-promesse-acte-authentique.mp3", module: "terrain", lesson: "promesse" },
  { file: "05-fidelisation-recommandation.mp3", module: "terrain", lesson: "fidelisation" },
];

// ─── Helpers API ─────────────────────────────────────────────────────────────
async function apiGet(path) {
  const r = await fetch(`https://api.heygen.com${path}`, {
    headers: { "x-api-key": API_KEY }
  });
  return r.json();
}

async function apiPost(path, body) {
  const r = await fetch(`https://api.heygen.com${path}`, {
    method: "POST",
    headers: { "x-api-key": API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return r.json();
}

// Upload MP3 — binary body vers upload.heygen.com
async function uploadAudio(filePath) {
  const data = readFileSync(filePath);
  const r = await fetch("https://upload.heygen.com/v1/asset", {
    method: "POST",
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": "audio/mpeg",
    },
    body: data,
  });
  const json = await r.json();
  // Retourne l'asset_id (pas l'url) pour utiliser audio_asset_id dans video/generate
  return json?.data?.id || null;
}

// Poll video status until done
async function waitForVideo(videoId, maxWait = 300000) {
  const start = Date.now();
  while (Date.now() - start < maxWait) {
    await new Promise(r => setTimeout(r, 5000));
    const res = await apiGet(`/v1/video_status.get?video_id=${videoId}`);
    const status = res?.data?.status;
    console.log(`  ⏳ Status: ${status}`);
    if (status === "completed") return res.data.video_url;
    if (status === "failed") throw new Error(`Video failed: ${JSON.stringify(res.data)}`);
  }
  throw new Error("Timeout waiting for video");
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const outputPath = join(ROOT, "src/data/heygen-videos.json");
  const existing = existsSync(outputPath) ? JSON.parse(readFileSync(outputPath, "utf8")) : {};

  // Optionally filter by module arg: node heygen-generate-videos.mjs juridique
  const filterModule = process.argv[2] || null;
  const lessons = filterModule
    ? LESSON_AUDIO_MAP.filter(l => l.module === filterModule)
    : LESSON_AUDIO_MAP;

  console.log(`\n🎬 Génération HeyGen — ${lessons.length} leçons\n`);

  for (const lesson of lessons) {
    const key = `${lesson.module}/${lesson.lesson}`;
    if (existing[key]) {
      console.log(`✅ SKIP (déjà généré): ${key}`);
      continue;
    }

    const audioFile = join(ROOT, "public/audio", lesson.file);
    if (!existsSync(audioFile)) {
      console.log(`⚠️  Audio manquant: ${lesson.file} — skip`);
      continue;
    }

    const avatar = MODULE_AVATARS[lesson.module];
    console.log(`\n🎥 ${key}`);
    console.log(`   Avatar: ${avatar.name}`);
    console.log(`   Audio:  ${lesson.file}`);

    try {
      // 1. Upload audio
      console.log("   📤 Upload audio...");
      const audioUrl = await uploadAudio(audioFile);
      if (!audioUrl) throw new Error("Upload audio échoué");
      console.log(`   ✅ Audio URL: ${audioUrl.slice(0, 60)}...`);

      // 2. Generate video
      console.log("   🎬 Lancement génération...");
      const genRes = await apiPost("/v2/video/generate", {
        video_inputs: [{
          character: {
            type: "avatar",
            avatar_id: avatar.avatarId,
            avatar_style: "normal",
          },
          voice: {
            type: "audio",
            audio_asset_id: audioUrl,  // audioUrl = asset_id
          },
          background: {
            type: "color",
            value: "#F8F7F3",
          },
        }],
        dimension: { width: 1280, height: 720 },
        test: false,
      });

      const videoId = genRes?.data?.video_id;
      if (!videoId) throw new Error(`Pas de video_id: ${JSON.stringify(genRes)}`);
      console.log(`   ⏳ video_id: ${videoId}`);

      // 3. Wait for completion
      const videoUrl = await waitForVideo(videoId);
      console.log(`   ✅ Vidéo prête: ${videoUrl.slice(0, 60)}...`);

      // 4. Save
      existing[key] = { videoUrl, avatarId: avatar.avatarId, generatedAt: new Date().toISOString() };
      writeFileSync(outputPath, JSON.stringify(existing, null, 2));
      console.log(`   💾 Sauvegardé dans heygen-videos.json`);

    } catch (err) {
      console.error(`   ❌ Erreur: ${err.message}`);
    }
  }

  console.log("\n✅ Terminé !\n");
  console.log("Prochaine étape : npm run heygen:inject pour mettre à jour course.ts");
}

main().catch(console.error);
