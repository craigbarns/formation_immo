#!/usr/bin/env node
/**
 * Génère les vidéos HeyGen avec TTS NATIF HeyGen (pas besoin de MP3 externe).
 * Chaque avatar HeyGen a sa propre voix française intégrée.
 *
 * Usage:
 *   node scripts/heygen-native.mjs                    # Toutes les leçons
 *   node scripts/heygen-native.mjs juridique          # Un module
 *   node scripts/heygen-native.mjs --dry-run          # Preview
 *   node scripts/heygen-native.mjs --test             # Mode test (économise crédits)
 *
 * Voix françaises HeyGen par module :
 *   juridique   → Annie (voix française féminine, grave, sérieuse)
 *   transaction → Abigail (voix française féminine, dynamique)
 *   financement → Bahar (voix française féminine, analytique)
 *   marketing   → Anja (voix française féminine, chaleureuse)
 *   terrain     → Adriana (voix française féminine, énergique)
 */

import { Command } from "commander";
import { readFileSync, writeFileSync, existsSync, rmSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { loadDotEnvLocal } from "./lib/env-local.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const REPO_ROOT = join(ROOT, "..");

loadDotEnvLocal(ROOT);

// ─── Config ──────────────────────────────────────────────────────────────────

const API_KEY = process.env.HEYGEN_API_KEY;
if (!API_KEY) {
  console.error("❌ HEYGEN_API_KEY manquante. Ajoutez HEYGEN_API_KEY=sk_V2_... dans lms/.env.local");
  process.exit(1);
}

// ─── Logging ─────────────────────────────────────────────────────────────────

let verbose = false;
const log = (...args) => console.log("🎬", ...args);
const ok = (...args) => console.log("✅", ...args);
const warn = (...args) => console.log("⚠️", ...args);
const err = (...args) => console.error("❌", ...args);
const debug = (...args) => { if (verbose) console.log("🔍", ...args); };

// ─── Avatars avec voix françaises HeyGen ─────────────────────────────────────
// Voix réelles du catalogue HeyGen (récupérées via GET /v2/voices)
// https://docs.heygen.com/reference/list-voices-v2

const MODULE_CONFIG = {
  juridique: {
    avatarId: "Annie_Office_Standing_Front_public",
    name: "Annie — Juriste",
    // Élise Laurent — féminine, professionnelle, grave
    voiceId: "728ce6e943044fc3b67d81c078b75893",
    accentColor: "#1a3a5c",
  },
  transaction: {
    avatarId: "Abigail_standing_office_front",
    name: "Abigail — Négociatrice",
    // Camille Martin — féminine, dynamique
    voiceId: "59bb21cd39f44b8398a64530b83e008f",
    accentColor: "#2d5a87",
  },
  financement: {
    avatarId: "Bahar_Suit_Front_public",
    name: "Bahar — Analyste",
    // Sylvie — féminine, professionnelle, analytique
    voiceId: "64cc0b129ac34e04a521cb4627126923",
    accentColor: "#142d45",
  },
  marketing: {
    avatarId: "Anja_standing_office_front",
    name: "Anja — Marketing",
    // Eloise — féminine, chaleureuse, naturelle
    voiceId: "50f8370a02fe45099636687d0d21750d",
    accentColor: "#d4af37",
  },
  terrain: {
    avatarId: "Adriana_SuitSofa_Front_public",
    name: "Adriana — Terrain",
    // Ariane — féminine, naturelle, énergique
    voiceId: "0e051caf8e0947a18870ee24bbbfce36",
    accentColor: "#3b6e8f",
  },
};

// ─── Lesson → narration mapping ─────────────────────────────────────────────

const LESSON_MAP = [
  // Module 1 - Juridique
  { module: "juridique",   lesson: "loi-alur",            narration: "module1-juridique/scripts/01-loi-alur-2026.narration.txt" },
  { module: "juridique",   lesson: "compromis",           narration: "module1-juridique/scripts/02-compromis-vente.narration.txt" },
  { module: "juridique",   lesson: "diagnostics",         narration: "module1-juridique/scripts/03-diagnostics-immobiliers.narration.txt" },
  { module: "juridique",   lesson: "mandats",             narration: "module1-juridique/scripts/04-mandats-strategie.narration.txt" },
  { module: "juridique",   lesson: "copropriete",         narration: "module1-juridique/scripts/05-copropriete-location.narration.txt" },
  { module: "juridique",   lesson: "parcours-interactif", narration: "module1-juridique/scripts/06-parcours-interactif-transparence.narration.txt" },
  // Module 2 - Transaction
  { module: "transaction", lesson: "estimation",          narration: "module2-transaction/scripts/01-estimation-immobiliere.narration.txt" },
  { module: "transaction", lesson: "prospection",         narration: "module2-transaction/scripts/02-prospection-scripts.narration.txt" },
  { module: "transaction", lesson: "negociation-mandat",  narration: "module2-transaction/scripts/03-negociation-mandat.narration.txt" },
  { module: "transaction", lesson: "negociation-avancee", narration: "module2-transaction/scripts/04-techniques-negociation-avancees.narration.txt" },
  { module: "transaction", lesson: "crm",                 narration: "module2-transaction/scripts/05-crm-fidelisation.narration.txt" },
  // Module 3 - Financement
  { module: "financement", lesson: "credit",              narration: "module3-financement/scripts/script01-credit-immobilier-2026.narration.txt" },
  { module: "financement", lesson: "fiscalite",           narration: "module3-financement/scripts/script02-fiscalite-immobiliere.narration.txt" },
  { module: "financement", lesson: "rentabilite",         narration: "module3-financement/scripts/script03-calcul-rentabilite.narration.txt" },
  { module: "financement", lesson: "dispositifs",         narration: "module3-financement/scripts/script04-dispositifs-fiscaux.narration.txt" },
  { module: "financement", lesson: "assurances",          narration: "module3-financement/scripts/script05-assurances-immobilieres.narration.txt" },
  // Module 4 - Marketing
  { module: "marketing",   lesson: "photos",              narration: "module4-marketing/scripts/01-photos-immobilieres-secrets-pros.narration.txt" },
  { module: "marketing",   lesson: "annonces",            narration: "module4-marketing/scripts/02-rediger-annonces-qui-vendent.narration.txt" },
  { module: "marketing",   lesson: "portails",            narration: "module4-marketing/scripts/03-maitriser-seloger-leboncoin.narration.txt" },
  { module: "marketing",   lesson: "reseaux",             narration: "module4-marketing/scripts/04-reseaux-sociaux-strategie-2026.narration.txt" },
  { module: "marketing",   lesson: "seo",                 narration: "module4-marketing/scripts/05-seo-immobilier-google.narration.txt" },
  // Module 5 - Terrain
  { module: "terrain",     lesson: "visite",              narration: "module5-terrain/scripts/01-conduire-visite-pro.narration.txt" },
  { module: "terrain",     lesson: "argumentaire",        narration: "module5-terrain/scripts/02-argumentaire-convertit.narration.txt" },
  { module: "terrain",     lesson: "closing",             narration: "module5-terrain/scripts/03-techniques-closing-avancees.narration.txt" },
  { module: "terrain",     lesson: "promesse",            narration: "module5-terrain/scripts/04-promesse-acte-authentique.narration.txt" },
  { module: "terrain",     lesson: "fidelisation",        narration: "module5-terrain/scripts/05-fidelisation-recommandation.narration.txt" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function loadNarration(narrationPath) {
  if (!existsSync(narrationPath)) return null;
  const raw = readFileSync(narrationPath, "utf8");
  return raw
    .split("\n")
    .filter(l => !l.trimStart().startsWith("#"))
    .join(" ")
    .replace(/\s+/g, " ")
    .replace(/"/g, "")
    .trim();
}

/** Découpe le texte en segments de maxChars (défaut 4500 pour marge) */
function chunkText(text, maxChars = 4500) {
  if (text.length <= maxChars) return [text];
  const chunks = [];
  let remaining = text;
  while (remaining.length > 0) {
    if (remaining.length <= maxChars) {
      chunks.push(remaining);
      break;
    }
    // Couper à la dernière ponctuation forte avant maxChars
    let cut = maxChars;
    const endChars = [".", "?", "!", ";"];
    for (let i = maxChars; i >= maxChars * 0.6; i--) {
      if (endChars.includes(remaining[i]) && (remaining[i + 1] === " " || i === remaining.length - 1)) {
        cut = i + 1;
        break;
      }
    }
    chunks.push(remaining.slice(0, cut).trim());
    remaining = remaining.slice(cut).trim();
  }
  return chunks;
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

async function apiGet(path) {
  const r = await fetch(`https://api.heygen.com${path}`, {
    headers: { "x-api-key": API_KEY }
  });
  return r.json();
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
  throw new Error("Timeout (30 min)");
}

// ─── Data persistence ────────────────────────────────────────────────────────

const VIDEOS_JSON = join(ROOT, "src/data/heygen-videos.json");

function loadVideos() {
  return existsSync(VIDEOS_JSON) ? JSON.parse(readFileSync(VIDEOS_JSON, "utf8")) : {};
}

function saveVideos(data) {
  writeFileSync(VIDEOS_JSON, JSON.stringify(data, null, 2));
}

// ─── Main command ────────────────────────────────────────────────────────────

async function cmdGenerate(opts) {
  const { module: filterModule, dryRun, test } = opts;
  const lessons = filterModule
    ? LESSON_MAP.filter(l => l.module === filterModule)
    : LESSON_MAP;

  log(`HeyGen TTS natif — ${lessons.length} leçons${filterModule ? ` (${filterModule})` : ""}${dryRun ? " [DRY RUN]" : ""}${test ? " [TEST MODE]" : ""}\n`);

  // Show voice mapping
  const shownModules = new Set();
  for (const lesson of lessons) {
    if (!shownModules.has(lesson.module)) {
      shownModules.add(lesson.module);
      const cfg = MODULE_CONFIG[lesson.module];
      log(`  ${lesson.module} → ${cfg.name} (voice: ${cfg.voiceId})`);
    }
  }
  console.log();

  const existing = loadVideos();
  let countOk = 0;
  let countSkipped = 0;
  let countFailed = 0;

  for (const lesson of lessons) {
    const key = `${lesson.module}/${lesson.lesson}`;
    const cfg = MODULE_CONFIG[lesson.module];
    const narrationPath = join(REPO_ROOT, lesson.narration);

    if (existing[key]?.videoUrl && !process.argv.includes("--force")) {
      ok(`SKIP: ${key} (déjà généré)`);
      countSkipped++;
      continue;
    }

    const text = loadNarration(narrationPath);
    if (!text || text.length < 50) {
      warn(`Narration vide ou courte: ${lesson.narration}`);
      countFailed++;
      continue;
    }

    log(`${key}`);
    log(`  Avatar: ${cfg.name}`);
    log(`  Voix:   ${cfg.voiceId}`);
    log(`  Texte:  ${text.length} caractères`);

    if (dryRun) {
      log(`  [DRY RUN] Générerait vidéo avec TTS HeyGen "${cfg.voiceId}"`);
      countOk++;
      continue;
    }

    try {
      // HeyGen v2 API avec TTS natif — chunking si > 5000 chars
      const chunks = chunkText(text, 4500);
      debug(`  ${chunks.length} segment(s) de texte`);

      const videoInputs = chunks.map(chunk => ({
        character: {
          type: "avatar",
          avatar_id: cfg.avatarId,
          avatar_style: "normal",
        },
        voice: {
          type: "text",
          input_text: chunk,
          voice_id: cfg.voiceId,
        },
        background: {
          type: "color",
          value: "#F8F7F3",
        },
      }));

      const genRes = await apiPost("/v2/video/generate", {
        video_inputs: videoInputs,
        dimension: { width: 1280, height: 720 },
        test: test ?? false,
      });

      const videoId = genRes?.data?.video_id;
      if (!videoId) throw new Error(`Pas de video_id: ${JSON.stringify(genRes)}`);
      debug(`Video ID: ${videoId}`);

      log(`  ⏳ Génération en cours (video_id: ${videoId})...`);
      const videoUrl = await waitForVideo(videoId);

      existing[key] = {
        videoUrl,
        avatarId: cfg.avatarId,
        voiceId: cfg.voiceId,
        textLength: text.length,
        chunkCount: chunks.length,
        generatedAt: new Date().toISOString(),
        ttsEngine: "heygen-native",
      };
      saveVideos(existing);
      ok(`${key} → ${videoUrl.slice(0, 60)}...`);
      countOk++;
    } catch (e) {
      err(`${key}: ${e.message}`);
      countFailed++;
    }
  }

  console.log();
  log(`Terminé : ${countOk} OK, ${countSkipped} skip, ${countFailed} échoué`);
}

// ─── CLI ─────────────────────────────────────────────────────────────────────

const program = new Command();

program
  .name("heygen-native")
  .description("Génère vidéos HeyGen avec TTS natif (voix françaises intégrées)")
  .version("0.1.0")
  .option("--verbose", "Verbose logging");

program
  .command("generate")
  .description("Génère les vidéos de leçons avec TTS HeyGen natif")
  .argument("[module]", "Filter par module (juridique, transaction, financement, marketing, terrain)")
  .option("--dry-run", "Preview sans appels API")
  .option("--test", "Mode test HeyGen (économise crédits)")
  .option("--force", "Régénérer même si déjà existant")
  .action(async (moduleArg, opts) => {
    verbose = opts.verbose ?? false;
    await cmdGenerate({ ...opts, module: moduleArg || null });
  });

program
  .command("list")
  .description("Liste les vidéos générées")
  .action(() => {
    const data = loadVideos();
    const keys = Object.keys(data).filter(k => k !== "_comment");
    if (keys.length === 0) { log("Aucune vidéo."); return; }
    log(`${keys.length} vidéos :`);
    for (const key of keys) {
      const e = data[key];
      console.log(`  ${key} — ${e.avatarId} — ${e.voiceId || "N/A"} — ${e.generatedAt}`);
    }
  });

program
  .command("clean")
  .description("Supprime le fichier de vidéos JSON")
  .action(() => {
    if (existsSync(VIDEOS_JSON)) {
      rmSync(VIDEOS_JSON);
      ok("Nettoyé.");
    } else {
      log("Rien à nettoyer.");
    }
  });

// Default command: generate
program
  .action(async (opts) => {
    // If no subcommand provided, run generate
    if (!opts.args?.length) {
      await cmdGenerate({ module: null, dryRun: false, test: false });
    }
  });

program.parse();
