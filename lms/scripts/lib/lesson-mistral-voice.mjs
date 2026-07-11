/**
 * Voix Mistral Voxtral par formateur — source : `src/data/formateur-voices.json`.
 * Surcharge possible : `MISTRAL_VOICE_ID_<MODULE>` (ex. MISTRAL_VOICE_ID_MARKETING).
 */
import fs from "fs";
import path from "path";

let _cached;

function loadFormateurVoices(lmsRoot) {
  if (_cached) return _cached;
  const p = path.join(lmsRoot, "src", "data", "formateur-voices.json");
  if (!fs.existsSync(p)) {
    console.warn("formateur-voices.json introuvable :", p);
    _cached = {};
    return _cached;
  }
  _cached = JSON.parse(fs.readFileSync(p, "utf8"));
  return _cached;
}

/** Dossier racine module → slug LMS */
const FOLDER_TO_SLUG = {
  "module1-juridique": "juridique",
  "module2-transaction": "transaction",
  "module3-financement": "financement",
  "module4-marketing": "marketing",
  "module5-terrain": "terrain",
  "module6-deontologie": "deontologie",
  "module-tracfin": "tracfin",
  "module7-murs-fonds": "murs-fonds-commerce",
  "module8-renovation-energetique": "renovation-energetique",
};

/**
 * @param {string} mdPath chemin vers un fichier sous moduleX-nom/scripts/
 * @returns {string | null} slug module (ex. juridique)
 */
export function getModuleSlugFromScriptMdPath(mdPath) {
  const parts = mdPath.split(path.sep);
  const folder = parts.find((p) => FOLDER_TO_SLUG[p]);
  return folder ? FOLDER_TO_SLUG[folder] : null;
}

function envVoiceForSlug(slug) {
  if (!slug) return null;
  const key = `MISTRAL_VOICE_ID_${String(slug).toUpperCase()}`;
  return process.env[key]?.trim() || null;
}

/**
 * @param {string} lmsRoot
 * @param {string | null} slug
 */
export function getMistralVoiceIdForModuleSlug(lmsRoot, slug) {
  const fromEnv = envVoiceForSlug(slug);
  if (fromEnv) return fromEnv;

  const data = loadFormateurVoices(lmsRoot);
  const row = slug && data[slug];
  if (row?.mistralVoiceId) return row.mistralVoiceId.trim();

  const legacy = process.env.MISTRAL_VOICE_ID?.trim();
  const male = process.env.MISTRAL_VOICE_ID_MALE?.trim();
  const female = process.env.MISTRAL_VOICE_ID_FEMALE?.trim();
  const gender =
    slug &&
    {
      juridique: "male",
      transaction: "female",
      financement: "male",
      marketing: "female",
      terrain: "male",
    }[slug];

  if (gender === "male" && male) return male;
  if (gender === "female" && female) return female;
  if (legacy) return legacy;
  return male || female || null;
}

/**
 * @param {string} mdPath
 * @param {string} lmsRoot
 */
export function resolveMistralVoiceIdForScriptMd(mdPath, lmsRoot) {
  const slug = getModuleSlugFromScriptMdPath(mdPath);
  return getMistralVoiceIdForModuleSlug(lmsRoot, slug);
}

/**
 * @param {string} mdPath
 * @param {string} lmsRoot
 */
export function describeVoiceChoiceForScriptMd(mdPath, lmsRoot) {
  const slug = getModuleSlugFromScriptMdPath(mdPath);
  const id = resolveMistralVoiceIdForScriptMd(mdPath, lmsRoot);
  const short = id ? `${id.slice(0, 8)}…` : "?";
  if (!slug) return `voix ${short} (module non détecté)`;

  const data = loadFormateurVoices(lmsRoot);
  const row = data[slug];
  const name = row?.name || slug;
  const label = row?.mistralVoiceLabel || "";
  const envOverride = envVoiceForSlug(slug);
  const suffix = envOverride ? " [surcharge .env]" : "";
  return `${name} — ${label || short}${suffix}`;
}

/** @deprecated conservé pour imports externes éventuels */
export const NARRATOR_GENDER_BY_MODULE = {
  juridique: "male",
  transaction: "female",
  financement: "male",
  marketing: "female",
  terrain: "male",
};
