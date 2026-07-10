import fs from "fs";
import os from "os";
import path from "path";
import { concatMp3FilesToOutput } from "./ffmpeg-mp3.mjs";
import { chunkTextForMistralTts, resolveMistralMaxChunkChars } from "./tts-chunk.mjs";

const SPEECH_URL = "https://api.mistral.ai/v1/audio/speech";
export const MISTRAL_TTS_MODEL = "voxtral-mini-tts-2603";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const CHUNK_GAP_MS = 450;
/** Rate limit Mistral : réessais par segment (sinon un fichier long ne peut jamais finir). */
const RATE_LIMIT_RETRIES = 4;
const RATE_LIMIT_WAIT_MS = 35_000;

function requireMistralEnv(voiceIdOverride) {
  const apiKey = process.env.MISTRAL_API_KEY;
  const voiceId = voiceIdOverride?.trim() || process.env.MISTRAL_VOICE_ID?.trim();
  if (!apiKey || !voiceId) {
    throw new Error(
      "MISTRAL_API_KEY et une voix (MISTRAL_VOICE_ID ou MISTRAL_VOICE_ID_MALE + FEMALE) sont requis (lms/.env.local).",
    );
  }
  return { apiKey, voiceId };
}

/**
 * Un segment texte → buffer MP3 (API Mistral).
 */
export async function synthesizeMistralSpeechToMp3Buffer(text, voiceIdOverride) {
  const { apiKey, voiceId } = requireMistralEnv(voiceIdOverride);
  const res = await fetch(SPEECH_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MISTRAL_TTS_MODEL,
      input: text,
      voice_id: voiceId,
      response_format: "mp3",
    }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Mistral (${res.status}): ${json.message ?? JSON.stringify(json)}`);
  }
  if (!json.audio_data) {
    throw new Error("Réponse Mistral sans audio_data");
  }
  return Buffer.from(json.audio_data, "base64");
}

/**
 * Segment → buffer MP3, avec réessais espacés sur 429 (rate limit).
 * Les segments déjà générés du fichier sont ainsi conservés.
 */
async function synthesizeWithRetry(text, voiceIdOverride, log) {
  for (let attempt = 1; ; attempt++) {
    try {
      return await synthesizeMistralSpeechToMp3Buffer(text, voiceIdOverride);
    } catch (e) {
      const is429 = /\(429\)/.test(String(e?.message ?? e));
      if (!is429 || attempt > RATE_LIMIT_RETRIES) throw e;
      log?.(`    … rate limit (429), nouvel essai dans ${RATE_LIMIT_WAIT_MS / 1000}s (${attempt}/${RATE_LIMIT_RETRIES})`);
      await sleep(RATE_LIMIT_WAIT_MS);
    }
  }
}

/**
 * Texte complet → fichier MP3 (découpe + appels API + concat ffmpeg).
 */
export async function writeMistralTtsMp3File(text, outAbs, log = console.log, voiceIdOverride) {
  const maxChars = resolveMistralMaxChunkChars();
  const chunks = chunkTextForMistralTts(text, maxChars);
  fs.mkdirSync(path.dirname(outAbs), { recursive: true });

  if (chunks.length === 1) {
    const buf = await synthesizeWithRetry(chunks[0], voiceIdOverride, log);
    log?.(`    segment 1/1 — ${buf.length} octets`);
    fs.writeFileSync(outAbs, buf);
    return;
  }

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "mistral-tts-"));
  const partPaths = [];
  try {
    for (let i = 0; i < chunks.length; i++) {
      const buf = await synthesizeWithRetry(chunks[i], voiceIdOverride, log);
      log?.(`    segment ${i + 1}/${chunks.length} — ${buf.length} octets`);
      const partPath = path.join(tmpDir, `p${String(i + 1).padStart(2, "0")}.mp3`);
      fs.writeFileSync(partPath, buf);
      partPaths.push(partPath);
      if (i < chunks.length - 1) await sleep(CHUNK_GAP_MS);
    }
    concatMp3FilesToOutput(partPaths, outAbs);
  } finally {
    for (const f of fs.readdirSync(tmpDir)) {
      fs.unlinkSync(path.join(tmpDir, f));
    }
    fs.rmdirSync(tmpDir);
  }
}
