#!/usr/bin/env node
/**
 * CLI HeyGen — génération de vidéos avatar pour la Formation Immobilière
 *
 * Usage:
 *   node scripts/heygen-cli.mjs <command> [options]
 *
 * Commands:
 *   lesson [module]    Generate lesson videos (avatar + audio MP3)
 *   intro [module]     Generate intro videos (~15s) from narration text
 *   status <videoId>   Check video generation status
 *   list               List generated videos
 *   clean              Remove generated videos JSON
 *
 * Options:
 *   --dry-run          Preview what would be generated (no API calls)
 *   --verbose          Show detailed logs
 *   --module <name>    Filter by module (juridique, transaction, etc.)
 *   --retry <count>    Number of retries on failure (default: 3)
 *   --test             Use HeyGen test mode (saves credits)
 *
 * Examples:
 *   node scripts/heygen-cli.mjs lesson --module juridique
 *   node scripts/heygen-cli.mjs intro --dry-run
 *   node scripts/heygen-cli.mjs lesson --module marketing --test
 *   node scripts/heygen-cli.mjs list
 */

import { Command } from "commander";
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const REPO_ROOT = join(ROOT, "..");

// ─── Config (validated on demand, not at startup) ───────────────────────────

function requireHeyGenKey() {
  if (!process.env.HEYGEN_API_KEY) {
    console.error("❌ HEYGEN_API_KEY non définie. Ajoutez HEYGEN_API_KEY=sk_V2_... dans lms/.env.local");
    process.exit(1);
  }
  return process.env.HEYGEN_API_KEY;
}

function requireMistralKey() {
  if (!process.env.MISTRAL_API_KEY) {
    console.error("❌ MISTRAL_API_KEY non définie. Ajoutez MISTRAL_API_KEY=... dans lms/.env.local");
    process.exit(1);
  }
  return process.env.MISTRAL_API_KEY;
}

// ─── Logging ─────────────────────────────────────────────────────────────────

let verbose = false;

function log(...args) { console.log("🎬", ...args); }
function ok(...args) { console.log("✅", ...args); }
function warn(...args) { console.log("⚠️", ...args); }
function err(...args) { console.error("❌", ...args); }
function debug(...args) { if (verbose) console.log("🔍", ...args); }

// ─── Avatars ─────────────────────────────────────────────────────────────────

const MODULE_AVATARS = {
  juridique:   { avatarId: "Annie_Office_Standing_Front_public", name: "Annie — Juriste" },
  transaction: { avatarId: "Abigail_standing_office_front",      name: "Abigail — Négociatrice" },
  financement: { avatarId: "Bahar_Suit_Front_public",            name: "Bahar — Analyste" },
  marketing:   { avatarId: "Anja_standing_office_front",         name: "Anja — Marketing" },
  terrain:     { avatarId: "Adriana_SuitSofa_Front_public",      name: "Adriana — Terrain" },
};

const VOICES = {
  neutral:  "5a271406-039d-46fe-835b-fbbb00eaf08d",
  excited:  "2f62b1af-aea3-4079-9d10-7ca665ee7243",
  curious:  "e0580ce5-e63c-4cbe-88c8-a983b80c5f1f",
  happy:    "49d024dd-981b-4462-bb17-74d381eb8fd7",
};

// ─── Lesson → audio mapping ─────────────────────────────────────────────────

const LESSON_AUDIO_MAP = [
  { file: "01-loi-alur-2026.mp3",       module: "juridique",   lesson: "loi-alur" },
  { file: "02-compromis-vente.mp3",      module: "juridique",   lesson: "compromis" },
  { file: "03-diagnostics-immobiliers.mp3", module: "juridique", lesson: "diagnostics" },
  { file: "04-mandats-strategie.mp3",    module: "juridique",   lesson: "mandats" },
  { file: "05-copropriete-location.mp3", module: "juridique",   lesson: "copropriete" },
  { file: "06-parcours-interactif-transparence.mp3", module: "juridique", lesson: "parcours-interactif" },
  { file: "01-estimation-immobiliere.mp3",          module: "transaction", lesson: "estimation" },
  { file: "02-prospection-scripts.mp3",             module: "transaction", lesson: "prospection" },
  { file: "03-negociation-mandat.mp3",              module: "transaction", lesson: "negociation-mandat" },
  { file: "04-techniques-negociation-avancees.mp3", module: "transaction", lesson: "negociation-avancee" },
  { file: "05-crm-fidelisation.mp3",                module: "transaction", lesson: "crm" },
  { file: "script01-credit-immobilier-2026.mp3",    module: "financement", lesson: "credit" },
  { file: "script02-fiscalite-immobiliere.mp3",     module: "financement", lesson: "fiscalite" },
  { file: "script03-calcul-rentabilite.mp3",        module: "financement", lesson: "rentabilite" },
  { file: "script04-dispositifs-fiscaux.mp3",       module: "financement", lesson: "dispositifs" },
  { file: "script05-assurances-immobilieres.mp3",   module: "financement", lesson: "assurances" },
  { file: "01-photos-immobilieres-secrets-pros.mp3", module: "marketing", lesson: "photos" },
  { file: "02-rediger-annonces-qui-vendent.mp3",     module: "marketing", lesson: "annonces" },
  { file: "03-maitriser-seloger-leboncoin.mp3",      module: "marketing", lesson: "portails" },
  { file: "04-reseaux-sociaux-strategie-2026.mp3",   module: "marketing", lesson: "reseaux" },
  { file: "05-seo-immobilier-google.mp3",            module: "marketing", lesson: "seo" },
  { file: "01-conduire-visite-pro.mp3",       module: "terrain", lesson: "visite" },
  { file: "02-argumentaire-convertit.mp3",    module: "terrain", lesson: "argumentaire" },
  { file: "03-techniques-closing-avancees.mp3", module: "terrain", lesson: "closing" },
  { file: "04-promesse-acte-authentique.mp3", module: "terrain", lesson: "promesse" },
  { file: "05-fidelisation-recommandation.mp3", module: "terrain", lesson: "fidelisation" },
];

// ─── Intro mapping ──────────────────────────────────────────────────────────

const INTRO_MAP = [
  { module: "juridique",   lesson: "loi-alur",            voiceId: VOICES.neutral,  avatarId: "Annie_Office_Standing_Front_public",         narration: "module1-juridique/scripts/01-loi-alur-2026.narration.txt",                     mp3Out: "intro-juridique-loi-alur.mp3" },
  { module: "juridique",   lesson: "compromis",            voiceId: VOICES.neutral,  avatarId: "Annie_Desk_Sitting_Front_public",            narration: "module1-juridique/scripts/02-compromis-vente.narration.txt",                   mp3Out: "intro-juridique-compromis.mp3" },
  { module: "juridique",   lesson: "diagnostics",          voiceId: VOICES.curious,  avatarId: "Annie_Business_Casual_Standing_Front_public",narration: "module1-juridique/scripts/03-diagnostics-immobiliers.narration.txt",           mp3Out: "intro-juridique-diagnostics.mp3" },
  { module: "juridique",   lesson: "mandats",              voiceId: VOICES.neutral,  avatarId: "Annie_Office_Sitting_Front_public",          narration: "module1-juridique/scripts/04-mandats-strategie.narration.txt",                  mp3Out: "intro-juridique-mandats.mp3" },
  { module: "juridique",   lesson: "copropriete",          voiceId: VOICES.curious,  avatarId: "Bahar_Suit_Front_public",                   narration: "module1-juridique/scripts/05-copropriete-location.narration.txt",               mp3Out: "intro-juridique-copropriete.mp3" },
  { module: "juridique",   lesson: "parcours-interactif",  voiceId: VOICES.neutral,  avatarId: "Bahar_Business_Front_public",               narration: "module1-juridique/scripts/06-parcours-interactif-transparence.narration.txt",   mp3Out: "intro-juridique-parcours.mp3" },
  { module: "transaction", lesson: "estimation",           voiceId: VOICES.curious,  avatarId: "Abigail_standing_office_front",             narration: "module2-transaction/scripts/01-estimation-immobiliere.narration.txt",           mp3Out: "intro-transaction-estimation.mp3" },
  { module: "transaction", lesson: "prospection",          voiceId: VOICES.excited,  avatarId: "Amelia_standing_business_training_front",   narration: "module2-transaction/scripts/02-prospection-scripts.narration.txt",              mp3Out: "intro-transaction-prospection.mp3" },
  { module: "transaction", lesson: "negociation-mandat",   voiceId: VOICES.excited,  avatarId: "Abigail_sitting_sofa_front",                narration: "module2-transaction/scripts/03-negociation-mandat.narration.txt",               mp3Out: "intro-transaction-negociation-mandat.mp3" },
  { module: "transaction", lesson: "negociation-avancee",  voiceId: VOICES.excited,  avatarId: "Amelia_sitting_business_training_front",    narration: "module2-transaction/scripts/04-techniques-negociation-avancees.narration.txt",  mp3Out: "intro-transaction-negociation-avancee.mp3" },
  { module: "transaction", lesson: "crm",                  voiceId: VOICES.happy,    avatarId: "Anja_standing_office_front",                narration: "module2-transaction/scripts/05-crm-fidelisation.narration.txt",                 mp3Out: "intro-transaction-crm.mp3" },
  { module: "financement", lesson: "credit",               voiceId: VOICES.curious,  avatarId: "Bahar_Business_Sitting_Front_public",       narration: "module3-financement/scripts/script01-credit-immobilier-2026.narration.txt",     mp3Out: "intro-financement-credit.mp3" },
  { module: "financement", lesson: "fiscalite",            voiceId: VOICES.neutral,  avatarId: "Adriana_Business_Front_public",             narration: "module3-financement/scripts/script02-fiscalite-immobiliere.narration.txt",      mp3Out: "intro-financement-fiscalite.mp3" },
  { module: "financement", lesson: "rentabilite",          voiceId: VOICES.curious,  avatarId: "Bahar_Jacket_Front_public",                 narration: "module3-financement/scripts/script03-calcul-rentabilite.narration.txt",         mp3Out: "intro-financement-rentabilite.mp3" },
  { module: "financement", lesson: "dispositifs",          voiceId: VOICES.neutral,  avatarId: "Adriana_BizTalk_Front_public",              narration: "module3-financement/scripts/script04-dispositifs-fiscaux.narration.txt",        mp3Out: "intro-financement-dispositifs.mp3" },
  { module: "financement", lesson: "assurances",           voiceId: VOICES.curious,  avatarId: "Bahar_Denim_Front_public",                  narration: "module3-financement/scripts/script05-assurances-immobilieres.narration.txt",    mp3Out: "intro-financement-assurances.mp3" },
  { module: "marketing",   lesson: "photos",               voiceId: VOICES.happy,    avatarId: "Anja_sitting_sofa_front",                   narration: "module4-marketing/scripts/01-photos-immobilieres-secrets-pros.narration.txt",   mp3Out: "intro-marketing-photos.mp3" },
  { module: "marketing",   lesson: "annonces",             voiceId: VOICES.excited,  avatarId: "Amanda_in_Blue_Shirt_Front",                narration: "module4-marketing/scripts/02-rediger-annonces-qui-vendent.narration.txt",       mp3Out: "intro-marketing-annonces.mp3" },
  { module: "marketing",   lesson: "portails",             voiceId: VOICES.curious,  avatarId: "Annie_Studio_Pink_Standing_Front_public",   narration: "module4-marketing/scripts/03-maitriser-seloger-leboncoin.narration.txt",        mp3Out: "intro-marketing-portails.mp3" },
  { module: "marketing",   lesson: "reseaux",              voiceId: VOICES.happy,    avatarId: "Amanda_in_Grey_Shirt_Front",                narration: "module4-marketing/scripts/04-reseaux-sociaux-strategie-2026.narration.txt",     mp3Out: "intro-marketing-reseaux.mp3" },
  { module: "marketing",   lesson: "seo",                  voiceId: VOICES.curious,  avatarId: "Annie_Casual_Standing_Front_public",        narration: "module4-marketing/scripts/05-seo-immobilier-google.narration.txt",              mp3Out: "intro-marketing-seo.mp3" },
  { module: "terrain",     lesson: "visite",               voiceId: VOICES.excited,  avatarId: "Adriana_SuitSofa_Front_public",             narration: "module5-terrain/scripts/01-conduire-visite-pro.narration.txt",                  mp3Out: "intro-terrain-visite.mp3" },
  { module: "terrain",     lesson: "argumentaire",         voiceId: VOICES.excited,  avatarId: "Annie_Bar_Standing_Front_public",           narration: "module5-terrain/scripts/02-argumentaire-convertit.narration.txt",               mp3Out: "intro-terrain-argumentaire.mp3" },
  { module: "terrain",     lesson: "closing",              voiceId: VOICES.excited,  avatarId: "Bahar_Jacket_Casual_Front_public",          narration: "module5-terrain/scripts/03-techniques-closing-avancees.narration.txt",           mp3Out: "intro-terrain-closing.mp3" },
  { module: "terrain",     lesson: "promesse",             voiceId: VOICES.neutral,  avatarId: "Annie_Sofa_Sitting_Front_public",           narration: "module5-terrain/scripts/04-promesse-acte-authentique.narration.txt",             mp3Out: "intro-terrain-promesse.mp3" },
  { module: "terrain",     lesson: "fidelisation",         voiceId: VOICES.happy,    avatarId: "Bahar_Casual_Sitting_Front_public",         narration: "module5-terrain/scripts/05-fidelisation-recommandation.narration.txt",           mp3Out: "intro-terrain-fidelisation.mp3" },
];

// ─── API helpers ──────────────────────────────────────────────────────────────

async function apiGet(path, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const r = await fetch(`https://api.heygen.com${path}`, {
        headers: { "x-api-key": API_KEY }
      });
      return r.json();
    } catch (e) {
      debug(`API GET retry ${i + 1}/${retries}: ${e.message}`);
      if (i === retries - 1) throw e;
      await new Promise(r => setTimeout(r, 2000 * (i + 1)));
    }
  }
}

async function apiPost(path, body, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const r = await fetch(`https://api.heygen.com${path}`, {
        method: "POST",
        headers: { "x-api-key": API_KEY, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      return r.json();
    } catch (e) {
      debug(`API POST retry ${i + 1}/${retries}: ${e.message}`);
      if (i === retries - 1) throw e;
      await new Promise(r => setTimeout(r, 2000 * (i + 1)));
    }
  }
}

async function uploadAudio(filePath) {
  const data = readFileSync(filePath);
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch("https://upload.heygen.com/v1/asset", {
        method: "POST",
        headers: { "x-api-key": API_KEY, "Content-Type": "audio/mpeg" },
        body: data,
      });
      const json = await r.json();
      return json?.data?.id || null;
    } catch (e) {
      debug(`Upload retry ${i + 1}/3: ${e.message}`);
      if (i === 2) throw e;
      await new Promise(r => setTimeout(r, 3000));
    }
  }
}

async function waitForVideo(videoId, maxWait = 1800000) {
  const start = Date.now();
  while (Date.now() - start < maxWait) {
    await new Promise(r => setTimeout(r, 5000));
    const res = await apiGet(`/v1/video_status.get?video_id=${videoId}`);
    const status = res?.data?.status;
    debug(`  Status: ${status}`);
    if (status === "completed") return res.data.video_url;
    if (status === "failed") throw new Error(`Video failed: ${JSON.stringify(res.data?.error)}`);
  }
  throw new Error("Timeout waiting for video (30 min)");
}

// ─── Data persistence ────────────────────────────────────────────────────────

const VIDEOS_JSON = join(ROOT, "src/data/heygen-videos.json");

function loadVideos() {
  return existsSync(VIDEOS_JSON) ? JSON.parse(readFileSync(VIDEOS_JSON, "utf8")) : {};
}

function saveVideos(data) {
  writeFileSync(VIDEOS_JSON, JSON.stringify(data, null, 2));
}

// ─── Commands ────────────────────────────────────────────────────────────────

async function cmdLesson(opts) {
  const { module: filterModule, dryRun, test } = opts;
  const lessons = filterModule
    ? LESSON_AUDIO_MAP.filter(l => l.module === filterModule)
    : LESSON_AUDIO_MAP;

  log(`Lesson videos — ${lessons.length} leçons${filterModule ? ` (${filterModule})` : ""}${dryRun ? " [DRY RUN]" : ""}`);

  const existing = loadVideos();

  for (const lesson of lessons) {
    const key = `${lesson.module}/${lesson.lesson}`;
    if (existing[key]?.videoUrl) { ok(`SKIP: ${key}`); continue; }

    const audioFile = join(ROOT, "public/audio", lesson.file);
    if (!existsSync(audioFile)) { warn(`Audio manquant: ${lesson.file}`); continue; }

    const avatar = MODULE_AVATARS[lesson.module];
    log(`${key}`);
    log(`  Avatar: ${avatar.name}`);
    log(`  Audio:  ${lesson.file}`);

    if (dryRun) {
      log(`  [DRY RUN] Générerait vidéo avec ${avatar.avatarId} + audio`);
      continue;
    }

    try {
      const audioAssetId = await uploadAudio(audioFile);
      if (!audioAssetId) throw new Error("Upload audio échoué");
      debug(`Audio asset: ${audioAssetId}`);

      const genRes = await apiPost("/v2/video/generate", {
        video_inputs: [{
          character: { type: "avatar", avatar_id: avatar.avatarId, avatar_style: "normal" },
          voice: { type: "audio", audio_asset_id: audioAssetId },
          background: { type: "color", value: "#F8F7F3" },
        }],
        dimension: { width: 1280, height: 720 },
        test: test ?? false,
      });

      const videoId = genRes?.data?.video_id;
      if (!videoId) throw new Error(`Pas de video_id: ${JSON.stringify(genRes)}`);
      debug(`Video ID: ${videoId}`);

      const videoUrl = await waitForVideo(videoId);
      existing[key] = { videoUrl, avatarId: avatar.avatarId, generatedAt: new Date().toISOString() };
      saveVideos(existing);
      ok(`${key} → ${videoUrl.slice(0, 60)}...`);
    } catch (e) {
      err(`${key}: ${e.message}`);
    }
  }
  log("Terminé !");
}

function extractIntroText(narrationPath) {
  const full = readFileSync(narrationPath, "utf8");
  const text = full.split("\n").filter(l => !l.trimStart().startsWith("#")).join(" ")
    .replace(/\s+/g, " ").replace(/"/g, "").trim();
  const TARGET = 200;
  if (text.length <= TARGET) return text;
  const endChars = [".", "?", "!"];
  let cut = -1;
  for (let i = Math.min(text.length - 1, TARGET + 60); i >= 100; i--) {
    if (endChars.includes(text[i]) && text[i + 1] === " ") { cut = i + 1; break; }
  }
  if (cut === -1) cut = TARGET;
  return text.slice(0, cut).trim();
}

async function generateIntroMp3(text, outPath, voiceId) {
  const res = await fetch("https://api.mistral.ai/v1/audio/speech", {
    method: "POST",
    headers: { Authorization: `Bearer ${MISTRAL_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "voxtral-mini-tts-2603", input: text, voice_id: voiceId, response_format: "mp3" }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`Mistral (${res.status}): ${json.message ?? JSON.stringify(json)}`);
  if (!json.audio_data) throw new Error("Pas d'audio_data Mistral");
  writeFileSync(outPath, Buffer.from(json.audio_data, "base64"));
}

async function cmdIntro(opts) {
  const { module: filterModule, dryRun } = opts;
  if (!MISTRAL_KEY && !dryRun) {
    err("MISTRAL_API_KEY requis pour générer les intros audio.");
    process.exit(1);
  }

  const lessons = filterModule
    ? INTRO_MAP.filter(l => l.module === filterModule)
    : INTRO_MAP;
  const INTROS_DIR = join(ROOT, "public/audio/intros");
  mkdirSync(INTROS_DIR, { recursive: true });

  log(`Intro videos — ${lessons.length} leçons${filterModule ? ` (${filterModule})` : ""}${dryRun ? " [DRY RUN]" : ""}`);

  const existing = loadVideos();

  for (const lesson of lessons) {
    const key = `${lesson.module}/${lesson.lesson}`;
    if (existing[key]?.videoUrl) { ok(`SKIP: ${key}`); continue; }

    const narrationPath = join(REPO_ROOT, lesson.narration);
    if (!existsSync(narrationPath)) { warn(`Narration manquante: ${lesson.narration}`); continue; }

    const introText = extractIntroText(narrationPath);
    const mp3Path = join(INTROS_DIR, lesson.mp3Out);

    log(`${key}`);
    log(`  Avatar: ${lesson.avatarId}`);
    log(`  Intro: "${introText.slice(0, 80)}..."`);

    if (dryRun) {
      log(`  [DRY RUN] Générerait intro MP3 + vidéo HeyGen`);
      continue;
    }

    try {
      if (!existsSync(mp3Path)) {
        debug("Génération MP3 (Mistral)...");
        await generateIntroMp3(introText, mp3Path, lesson.voiceId);
      }

      const assetId = await uploadAudio(mp3Path);
      if (!assetId) throw new Error("Upload audio échoué");

      const genRes = await apiPost("/v2/video/generate", {
        video_inputs: [{
          character: { type: "avatar", avatar_id: lesson.avatarId, avatar_style: "normal" },
          voice: { type: "audio", audio_asset_id: assetId },
          background: { type: "color", value: "#F8F7F3" },
        }],
        dimension: { width: 1280, height: 720 },
        test: false,
      });

      const videoId = genRes?.data?.video_id;
      if (!videoId) throw new Error(`Pas de video_id`);

      const videoUrl = await waitForVideo(videoId);
      existing[key] = { videoUrl, avatarId: lesson.avatarId, introText, generatedAt: new Date().toISOString() };
      saveVideos(existing);
      ok(`${key} → vidéo prête`);
    } catch (e) {
      err(`${key}: ${e.message}`);
    }
  }
  log("Terminé !");
}

async function cmdStatus(videoId) {
  const res = await apiGet(`/v1/video_status.get?video_id=${videoId}`);
  console.log(JSON.stringify(res, null, 2));
}

function cmdList() {
  const data = loadVideos();
  const keys = Object.keys(data);
  if (keys.length === 0) { log("Aucune vidéo générée."); return; }
  log(`${keys.length} vidéos générées :`);
  for (const key of keys) {
    const entry = data[key];
    console.log(`  ${key} — ${entry.avatarId} — ${entry.generatedAt}`);
  }
}

function cmdClean() {
  if (existsSync(VIDEOS_JSON)) {
    rmSync(VIDEOS_JSON);
    ok(`${VIDEOS_JSON} supprimé`);
  } else {
    log("Rien à nettoyer.");
  }
}

// ─── CLI ─────────────────────────────────────────────────────────────────────

const program = new Command();

program
  .name("heygen-cli")
  .description("CLI HeyGen — génération de vidéos avatar pour la Formation Immobilière")
  .version("0.1.0")
  .option("--verbose", "Verbose logging")
  .hook("preAction", (thisCmd) => { verbose = !!thisCmd.opts().verbose; });

program
  .command("lesson")
  .description("Generate lesson videos (avatar + audio MP3)")
  .argument("[module]", "Filter by module name")
  .option("--dry-run", "Preview without API calls")
  .option("--test", "Use HeyGen test mode (saves credits)")
  .action(async (moduleArg, opts) => {
    await cmdLesson({ ...opts, module: moduleArg || opts.module });
  });

program
  .command("intro")
  .description("Generate ~15s intro videos from narration text")
  .argument("[module]", "Filter by module name")
  .option("--dry-run", "Preview without API calls")
  .action(async (moduleArg, opts) => {
    await cmdIntro({ ...opts, module: moduleArg || opts.module });
  });

program
  .command("status")
  .description("Check video generation status")
  .argument("<videoId>", "HeyGen video ID")
  .action(cmdStatus);

program
  .command("list")
  .description("List generated videos")
  .action(cmdList);

program
  .command("clean")
  .description("Remove generated videos JSON data")
  .action(cmdClean);

program.parse();
