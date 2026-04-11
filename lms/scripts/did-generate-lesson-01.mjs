/**
 * Génère la vidéo D-ID pour la 1ère leçon : module1-juridique/scripts/01-loi-alur-2026.md
 *
 * Prérequis : DID_API_USER, DID_API_SECRET (voir did-test.mjs)
 *
 *   cd lms && DID_API_USER=... DID_API_SECRET=... node scripts/did-generate-lesson-01.mjs
 *
 * Modes :
 *   node scripts/did-generate-lesson-01.mjs           → script oral complet (~9 min de contenu, gros coût crédits)
 *   node scripts/did-generate-lesson-01.mjs --short   → intro + problématique uniquement (~2 min), moins de crédits
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const API = "https://api.d-id.com";

const SCRIPT_PATH = path.join(
  __dirname,
  "..",
  "..",
  "module1-juridique",
  "scripts",
  "01-loi-alur-2026.md"
);

function authHeader() {
  const user = process.env.DID_API_USER;
  const secret = process.env.DID_API_SECRET;
  if (!user || !secret) {
    console.error("Définir DID_API_USER et DID_API_SECRET.");
    process.exit(1);
  }
  return `Basic ${Buffer.from(`${user}:${secret}`, "utf8").toString("base64")}`;
}

/** Extrait le texte oral depuis le script Markdown (sans B-roll, sans pauses SSML). */
function extractNarration(md, shortMode) {
  const marker = "## 🎬 SCRIPT COMPLET";
  const start = md.indexOf(marker);
  if (start === -1) throw new Error("Section SCRIPT COMPLET introuvable.");
  let slice = md.slice(start + marker.length);

  if (shortMode) {
    const endShort = slice.indexOf("### CONTENU STRUCTURÉ");
    if (endShort !== -1) slice = slice.slice(0, endShort);
  }

  const cuts = [
    "## 📋 FICHE RÉCAPITULATIVE",
    "## 🎯 POINTS CLÉS",
    "## 📚 RÉFÉRENCES",
    "*Script rédigé",
  ];
  for (const c of cuts) {
    const i = slice.indexOf(c);
    if (i !== -1) slice = slice.slice(0, i);
  }

  const lines = slice.split("\n");
  const out = [];
  for (let line of lines) {
    const t = line.trim();
    if (!t) continue;
    if (t.startsWith("[B-ROLL")) continue;
    if (t.startsWith("```")) continue;
    if (t.startsWith("|") && t.includes("|")) continue;
    if (t === "---") continue;
    if (/^#{1,6}\s*📋|^#{1,6}\s*🎯|^#{1,6}\s*📚/.test(t)) break;

    let s = t;
    s = s.replace(/\[PAUSE[^\]]*\]/gi, " ");
    s = s.replace(/\*\*([^*]+)\*\*/g, "$1");
    s = s.replace(/^#{1,6}\s+/, "");
    if (/^NARRATION\s*:/i.test(s)) continue;
    if (s.startsWith("- **Durée**") || s.startsWith("- **Nombre")) continue;
    out.push(s);
  }

  let text = out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
  const max = 38000;
  if (text.length > max) {
    console.warn(`Texte tronqué à ${max} caractères (limite API).`);
    text = text.slice(0, max);
  }
  return text;
}

async function createTalk(input) {
  const body = {
    source_url:
      "https://d-id-public-bucket.s3.us-west-2.amazonaws.com/alice.jpg",
    script: {
      type: "text",
      input,
      provider: {
        type: "microsoft",
        voice_id: "fr-FR-DeniseNeural",
      },
    },
  };

  const res = await fetch(`${API}/talks`, {
    method: "POST",
    headers: {
      Authorization: authHeader(),
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  const raw = await res.text();
  if (!res.ok) {
    console.error("Erreur création:", res.status, raw);
    process.exit(1);
  }
  return JSON.parse(raw);
}

async function getTalk(id) {
  for (let attempt = 0; attempt < 8; attempt++) {
    const res = await fetch(`${API}/talks/${id}`, {
      headers: { Authorization: authHeader(), accept: "application/json" },
    });
    const raw = await res.text();
    if (res.status >= 500 || res.status === 429) {
      await sleep(2000 * (attempt + 1));
      continue;
    }
    if (!res.ok) {
      console.error("Erreur GET talk:", res.status, raw);
      process.exit(1);
    }
    return JSON.parse(raw);
  }
  throw new Error("GET /talks/:id échoue après plusieurs tentatives (serveur D-ID). Réessayez ou vérifiez le talk dans le studio D-ID.");
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const shortMode = process.argv.includes("--short");
  const md = fs.readFileSync(SCRIPT_PATH, "utf8");
  const input = extractNarration(md, shortMode);
  console.log(shortMode ? "Mode : --short (intro + problématique)" : "Mode : script complet");
  console.log("Caractères envoyés à D-ID:", input.length);
  console.log("Extrait (300 premiers car.):\n", input.slice(0, 300), "…\n");

  console.log("Création du talk (durée de génération : plusieurs minutes)…");
  const created = await createTalk(input);
  console.log("ID:", created.id, "| statut:", created.status);

  let talk = created;
  for (let i = 0; i < 400; i++) {
    if (talk.status === "done" && talk.result_url) break;
    if (talk.status === "error" || talk.status === "rejected") {
      console.error("Échec:", JSON.stringify(talk, null, 2));
      process.exit(1);
    }
    await sleep(3000);
    talk = await getTalk(created.id);
    if (i % 5 === 0) console.log("…", new Date().toISOString(), talk.status);
  }

  if (talk.result_url) {
    const outJson = path.join(__dirname, "lesson-01-did-output.json");
    fs.writeFileSync(
      outJson,
      JSON.stringify(
        { id: talk.id, result_url: talk.result_url, created_at: talk.created_at },
        null,
        2
      )
    );
    console.log("\n✅ Vidéo prête (URL temporaire — téléchargez vite le MP4) :\n");
    console.log(talk.result_url);
    console.log("\nMétadonnées enregistrées dans:", outJson);
    console.log(
      "\nPour l’intégrer au LMS : mettez une URL stable (YouTube non listé, etc.) dans lms/src/data/course.ts → videoUrl de la leçon loi-alur."
    );
  } else {
    console.log("Réponse:", JSON.stringify(talk, null, 2));
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
