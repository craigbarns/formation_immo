/**
 * Génère 26 courtes vidéos HeyGen (~15s) — avatar intro par leçon
 *
 * Workflow:
 *  1. Extrait les 2-3 premières phrases de chaque narration.txt (~15s de parole)
 *  2. Génère un mini-MP3 via Mistral Voxtral
 *  3. Upload + génération vidéo HeyGen
 *  4. Sauvegarde les URLs dans src/data/heygen-videos.json
 *
 * Usage: node scripts/heygen-generate-intros.mjs [module]
 *   ex:  node scripts/heygen-generate-intros.mjs juridique
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const REPO_ROOT = join(ROOT, "..");
const API_KEY = process.env.HEYGEN_API_KEY || "sk_V2_hgu_kUsxd24XGEM_Y8yRwWCKno6FWSNkQ9LCwNCtSAsk90ea";
const MISTRAL_KEY = process.env.MISTRAL_API_KEY || "yFg7Zt2i3fMRCT4xmFcoTfa7JsANLLWK";
const INTROS_DIR = join(ROOT, "public/audio/intros");

// ─── 4 voix françaises Mistral Voxtral ───────────────────────────────────────
const VOICES = {
  neutral:  "5a271406-039d-46fe-835b-fbbb00eaf08d", // Marie — Neutral  (grave, légal, sérieux)
  excited:  "2f62b1af-aea3-4079-9d10-7ca665ee7243", // Marie — Excited  (dynamique, action, vente)
  curious:  "e0580ce5-e63c-4cbe-88c8-a983b80c5f1f", // Marie — Curious  (pédago, analytique)
  happy:    "49d024dd-981b-4462-bb17-74d381eb8fd7", // Marie — Happy    (chaleur, créativité)
};

// ─── Mapping leçon → narration.txt + avatar unique + voix par leçon ─────────
// Voix choisie selon le ton du contenu :
//   neutral  → juridique, technique, sérieux
//   curious  → analytique, pédagogique (financement)
//   excited  → dynamique, action, vente (transaction, terrain)
//   happy    → créatif, chaleureux (marketing)
const LESSON_MAP = [
  // Module 1 - Juridique (Annie — tons professionnels bureau)
  { module: "juridique",   lesson: "loi-alur",            voiceId: VOICES.neutral,  avatarId: "Annie_Office_Standing_Front_public",         narration: "module1-juridique/scripts/01-loi-alur-2026.narration.txt",                     mp3Out: "intro-juridique-loi-alur.mp3" },
  { module: "juridique",   lesson: "compromis",            voiceId: VOICES.neutral,  avatarId: "Annie_Desk_Sitting_Front_public",            narration: "module1-juridique/scripts/02-compromis-vente.narration.txt",                   mp3Out: "intro-juridique-compromis.mp3" },
  { module: "juridique",   lesson: "diagnostics",          voiceId: VOICES.curious,  avatarId: "Annie_Business_Casual_Standing_Front_public",narration: "module1-juridique/scripts/03-diagnostics-immobiliers.narration.txt",           mp3Out: "intro-juridique-diagnostics.mp3" },
  { module: "juridique",   lesson: "mandats",              voiceId: VOICES.neutral,  avatarId: "Annie_Office_Sitting_Front_public",          narration: "module1-juridique/scripts/04-mandats-strategie.narration.txt",                  mp3Out: "intro-juridique-mandats.mp3" },
  { module: "juridique",   lesson: "copropriete",          voiceId: VOICES.curious,  avatarId: "Bahar_Suit_Front_public",                   narration: "module1-juridique/scripts/05-copropriete-location.narration.txt",               mp3Out: "intro-juridique-copropriete.mp3" },
  { module: "juridique",   lesson: "parcours-interactif",  voiceId: VOICES.neutral,  avatarId: "Bahar_Business_Front_public",               narration: "module1-juridique/scripts/06-parcours-interactif-transparence.narration.txt",   mp3Out: "intro-juridique-parcours.mp3" },
  // Module 2 - Transaction (Abigail + Amelia — dynamiques)
  { module: "transaction", lesson: "estimation",           voiceId: VOICES.curious,  avatarId: "Abigail_standing_office_front",             narration: "module2-transaction/scripts/01-estimation-immobiliere.narration.txt",           mp3Out: "intro-transaction-estimation.mp3" },
  { module: "transaction", lesson: "prospection",          voiceId: VOICES.excited,  avatarId: "Amelia_standing_business_training_front",   narration: "module2-transaction/scripts/02-prospection-scripts.narration.txt",              mp3Out: "intro-transaction-prospection.mp3" },
  { module: "transaction", lesson: "negociation-mandat",   voiceId: VOICES.excited,  avatarId: "Abigail_sitting_sofa_front",                narration: "module2-transaction/scripts/03-negociation-mandat.narration.txt",               mp3Out: "intro-transaction-negociation-mandat.mp3" },
  { module: "transaction", lesson: "negociation-avancee",  voiceId: VOICES.excited,  avatarId: "Amelia_sitting_business_training_front",    narration: "module2-transaction/scripts/04-techniques-negociation-avancees.narration.txt",  mp3Out: "intro-transaction-negociation-avancee.mp3" },
  { module: "transaction", lesson: "crm",                  voiceId: VOICES.happy,    avatarId: "Anja_standing_office_front",                narration: "module2-transaction/scripts/05-crm-fidelisation.narration.txt",                 mp3Out: "intro-transaction-crm.mp3" },
  // Module 3 - Financement (Bahar + Adriana — analytiques)
  { module: "financement", lesson: "credit",               voiceId: VOICES.curious,  avatarId: "Bahar_Business_Sitting_Front_public",       narration: "module3-financement/scripts/script01-credit-immobilier-2026.narration.txt",     mp3Out: "intro-financement-credit.mp3" },
  { module: "financement", lesson: "fiscalite",            voiceId: VOICES.neutral,  avatarId: "Adriana_Business_Front_public",             narration: "module3-financement/scripts/script02-fiscalite-immobiliere.narration.txt",      mp3Out: "intro-financement-fiscalite.mp3" },
  { module: "financement", lesson: "rentabilite",          voiceId: VOICES.curious,  avatarId: "Bahar_Jacket_Front_public",                 narration: "module3-financement/scripts/script03-calcul-rentabilite.narration.txt",         mp3Out: "intro-financement-rentabilite.mp3" },
  { module: "financement", lesson: "dispositifs",          voiceId: VOICES.neutral,  avatarId: "Adriana_BizTalk_Front_public",              narration: "module3-financement/scripts/script04-dispositifs-fiscaux.narration.txt",        mp3Out: "intro-financement-dispositifs.mp3" },
  { module: "financement", lesson: "assurances",           voiceId: VOICES.curious,  avatarId: "Bahar_Denim_Front_public",                  narration: "module3-financement/scripts/script05-assurances-immobilieres.narration.txt",    mp3Out: "intro-financement-assurances.mp3" },
  // Module 4 - Marketing (Anja + Amanda — créatives)
  { module: "marketing",   lesson: "photos",               voiceId: VOICES.happy,    avatarId: "Anja_sitting_sofa_front",                   narration: "module4-marketing/scripts/01-photos-immobilieres-secrets-pros.narration.txt",   mp3Out: "intro-marketing-photos.mp3" },
  { module: "marketing",   lesson: "annonces",             voiceId: VOICES.excited,  avatarId: "Amanda_in_Blue_Shirt_Front",                narration: "module4-marketing/scripts/02-rediger-annonces-qui-vendent.narration.txt",       mp3Out: "intro-marketing-annonces.mp3" },
  { module: "marketing",   lesson: "portails",             voiceId: VOICES.curious,  avatarId: "Annie_Studio_Pink_Standing_Front_public",   narration: "module4-marketing/scripts/03-maitriser-seloger-leboncoin.narration.txt",        mp3Out: "intro-marketing-portails.mp3" },
  { module: "marketing",   lesson: "reseaux",              voiceId: VOICES.happy,    avatarId: "Amanda_in_Grey_Shirt_Front",                narration: "module4-marketing/scripts/04-reseaux-sociaux-strategie-2026.narration.txt",     mp3Out: "intro-marketing-reseaux.mp3" },
  { module: "marketing",   lesson: "seo",                  voiceId: VOICES.curious,  avatarId: "Annie_Casual_Standing_Front_public",        narration: "module4-marketing/scripts/05-seo-immobilier-google.narration.txt",              mp3Out: "intro-marketing-seo.mp3" },
  // Module 5 - Terrain (Adriana + Annie casual — terrain/action)
  { module: "terrain",     lesson: "visite",               voiceId: VOICES.excited,  avatarId: "Adriana_SuitSofa_Front_public",             narration: "module5-terrain/scripts/01-conduire-visite-pro.narration.txt",                  mp3Out: "intro-terrain-visite.mp3" },
  { module: "terrain",     lesson: "argumentaire",         voiceId: VOICES.excited,  avatarId: "Annie_Bar_Standing_Front_public",           narration: "module5-terrain/scripts/02-argumentaire-convertit.narration.txt",               mp3Out: "intro-terrain-argumentaire.mp3" },
  { module: "terrain",     lesson: "closing",              voiceId: VOICES.excited,  avatarId: "Bahar_Jacket_Casual_Front_public",          narration: "module5-terrain/scripts/03-techniques-closing-avancees.narration.txt",           mp3Out: "intro-terrain-closing.mp3" },
  { module: "terrain",     lesson: "promesse",             voiceId: VOICES.neutral,  avatarId: "Annie_Sofa_Sitting_Front_public",           narration: "module5-terrain/scripts/04-promesse-acte-authentique.narration.txt",             mp3Out: "intro-terrain-promesse.mp3" },
  { module: "terrain",     lesson: "fidelisation",         voiceId: VOICES.happy,    avatarId: "Bahar_Casual_Sitting_Front_public",         narration: "module5-terrain/scripts/05-fidelisation-recommandation.narration.txt",           mp3Out: "intro-terrain-fidelisation.mp3" },
];

// ─── Extrait les 2-3 premières phrases (~15 secondes de parole) ──────────────
function extractIntroText(narrationPath) {
  const full = readFileSync(narrationPath, "utf8");
  // Nettoyer les lignes # de commentaire
  const text = full.split("\n").filter(l => !l.trimStart().startsWith("#")).join(" ")
    .replace(/\s+/g, " ").replace(/"/g, "").trim();

  // Couper après ~200 chars à la dernière ponctuation forte
  const TARGET = 200;
  if (text.length <= TARGET) return text;

  // Cherche le dernier . ? ! avant TARGET+50
  const endChars = [".", "?", "!"];
  let cut = -1;
  for (let i = Math.min(text.length - 1, TARGET + 60); i >= 100; i--) {
    if (endChars.includes(text[i]) && text[i + 1] === " ") {
      cut = i + 1;
      break;
    }
  }
  if (cut === -1) cut = TARGET;
  return text.slice(0, cut).trim();
}

// ─── Mistral TTS → MP3 ──────────────────────────────────────────────────────
async function generateIntroMp3(text, outPath, voiceId) {
  const res = await fetch("https://api.mistral.ai/v1/audio/speech", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${MISTRAL_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "voxtral-mini-tts-2603",
      input: text,
      voice_id: voiceId,
      response_format: "mp3",
    }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Mistral (${res.status}): ${json.message ?? JSON.stringify(json)}`);
  if (!json.audio_data) throw new Error("Pas d'audio_data Mistral");
  writeFileSync(outPath, Buffer.from(json.audio_data, "base64"));
}

// ─── HeyGen: upload audio ────────────────────────────────────────────────────
async function uploadAudio(filePath) {
  const data = readFileSync(filePath);
  const r = await fetch("https://upload.heygen.com/v1/asset", {
    method: "POST",
    headers: { "x-api-key": API_KEY, "Content-Type": "audio/mpeg" },
    body: data,
  });
  const json = await r.json();
  return json?.data?.id || null;
}

// ─── HeyGen: poll status ────────────────────────────────────────────────────
async function waitForVideo(videoId, maxWait = 1800000) {
  const start = Date.now();
  while (Date.now() - start < maxWait) {
    await new Promise(r => setTimeout(r, 5000));
    const res = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${videoId}`, {
      headers: { "x-api-key": API_KEY }
    });
    const data = (await res.json())?.data;
    const status = data?.status;
    console.log(`  ⏳ ${status}`);
    if (status === "completed") return data.video_url;
    if (status === "failed") throw new Error(`Video failed: ${JSON.stringify(data.error)}`);
  }
  throw new Error("Timeout waiting for video");
}

// ─── HeyGen: generate video ──────────────────────────────────────────────────
async function generateVideo(audioAssetId, avatarId) {
  const r = await fetch("https://api.heygen.com/v2/video/generate", {
    method: "POST",
    headers: { "x-api-key": API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({
      video_inputs: [{
        character: { type: "avatar", avatar_id: avatarId, avatar_style: "normal" },
        voice: { type: "audio", audio_asset_id: audioAssetId },
        background: { type: "color", value: "#F8F7F3" },
      }],
      dimension: { width: 1280, height: 720 },
      test: false,
    }),
  });
  const json = await r.json();
  const videoId = json?.data?.video_id;
  if (!videoId) throw new Error(`Pas de video_id: ${JSON.stringify(json)}`);
  return videoId;
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  mkdirSync(INTROS_DIR, { recursive: true });

  const outputPath = join(ROOT, "src/data/heygen-videos.json");
  const existing = existsSync(outputPath) ? JSON.parse(readFileSync(outputPath, "utf8")) : {};

  const filterModule = process.argv[2] || null;
  const lessons = filterModule ? LESSON_MAP.filter(l => l.module === filterModule) : LESSON_MAP;

  console.log(`\n🎬 HeyGen intros (~15s) — ${lessons.length} leçons\n`);

  for (const lesson of lessons) {
    const key = `${lesson.module}/${lesson.lesson}`;

    if (existing[key]?.videoUrl) {
      console.log(`✅ SKIP: ${key}`);
      continue;
    }

    const narrationPath = join(REPO_ROOT, lesson.narration);
    if (!existsSync(narrationPath)) {
      console.log(`⚠️  Narration manquante: ${lesson.narration} — skip`);
      continue;
    }

    const mp3Path = join(INTROS_DIR, lesson.mp3Out);
    const introText = extractIntroText(narrationPath);

    console.log(`\n🎥 ${key}`);
    console.log(`   Avatar: ${lesson.avatarId}`);
    console.log(`   Intro (${introText.length} chars): "${introText.slice(0, 80)}..."`);

    try {
      // 1. Générer mini-MP3 intro
      if (!existsSync(mp3Path)) {
        console.log("   🎙  Génération intro MP3 (Mistral)...");
        await generateIntroMp3(introText, mp3Path, lesson.voiceId);
        console.log(`   ✅ MP3 intro prêt`);
        await new Promise(r => setTimeout(r, 400));
      } else {
        console.log("   ✅ MP3 intro déjà existant");
      }

      // 2. Upload HeyGen
      console.log("   📤 Upload HeyGen...");
      const assetId = await uploadAudio(mp3Path);
      if (!assetId) throw new Error("Upload audio échoué");

      // 3. Générer vidéo
      console.log("   🎬 Génération vidéo...");
      const videoId = await generateVideo(assetId, lesson.avatarId);
      console.log(`   ⏳ video_id: ${videoId}`);

      // 4. Attendre
      const videoUrl = await waitForVideo(videoId);
      console.log(`   ✅ Vidéo: ${videoUrl.slice(0, 70)}...`);

      // 5. Sauvegarder
      existing[key] = {
        videoUrl,
        avatarId: lesson.avatarId,
        introText,
        generatedAt: new Date().toISOString(),
      };
      writeFileSync(outputPath, JSON.stringify(existing, null, 2));
      console.log(`   💾 Sauvegardé`);

    } catch (err) {
      console.error(`   ❌ ${err.message}`);
    }
  }

  console.log("\n✅ Terminé !");
}

main().catch(console.error);
