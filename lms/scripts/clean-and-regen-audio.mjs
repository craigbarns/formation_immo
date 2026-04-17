#!/usr/bin/env node
/**
 * Nettoie les fichiers .narration.txt (supprime balises Markdown résiduelles)
 * puis régénère les MP3 affectés via macOS `say` + ffmpeg.
 *
 * Usage:
 *   node scripts/clean-and-regen-audio.mjs           # nettoie + régénère tout
 *   node scripts/clean-and-regen-audio.mjs --dry-run # affiche seulement ce qui serait corrigé
 *   MISTRAL_API_KEY=xxx node scripts/clean-and-regen-audio.mjs  # utilise Mistral si dispo
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { execSync, spawnSync } from "child_process";
import { join, dirname, basename } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const REPO_ROOT = join(ROOT, "..");
const AUDIO_DIR = join(ROOT, "public/audio");
const DRY_RUN = process.argv.includes("--dry-run");

// Voix macOS française féminine (proche de "Marie" Mistral)
const MAC_VOICE = "Sandy (Français (France))";

// ─── Nettoyeur Markdown ─────────────────────────────────────────────────────
function cleanNarration(raw) {
  let text = raw;

  // 1. Supprimer les lignes de commentaires # en tête de fichier
  text = text
    .split("\n")
    .filter((l) => !l.trimStart().startsWith("#"))
    .join("\n");

  // 2. Supprimer les marqueurs de sous-partie: [SOUS-PARTIE X : ...]
  text = text.replace(/\[SOUS-PARTIE\s+[^\]]*\]/gi, " ");

  // 3. Supprimer les marqueurs **NARRATION :" ou **NARRATION:** (avec ou sans guillemet)
  text = text.replace(/\*\*NARRATION\s*:?\s*["«]?\**/gi, " ");
  text = text.replace(/\*\*\s*["»]\s*\*\*/g, " ");

  // 4. Supprimer les marqueurs de timing [X minute], [X minutes 30], [X min ...]
  text = text.replace(/\[\d+\s+min[^\]]*\]/gi, " ");

  // 5. Supprimer les effets sonores *Son* ou *Sonnerie* (astérisques simples isolés)
  text = text.replace(/\*[^*\n]{1,30}\*/g, (match) => {
    // Garder **bold** intacts → on les traite séparément
    return " ";
  });

  // 6. Supprimer le gras **...**  → garder le texte
  text = text.replace(/\*\*([^*]+)\*\*/g, "$1");

  // 7. Supprimer l'italique *...* → garder le texte
  text = text.replace(/\*([^*\n]+)\*/g, "$1");

  // 8. Supprimer les liens Markdown [texte](url) → garder texte
  text = text.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");

  // 9. Supprimer les marqueurs [option A], [option B] etc.
  text = text.replace(/\[option\s+[^\]]*\]/gi, " ");

  // 10. Supprimer les balises B-ROLL résiduelles
  text = text.replace(/\[[Bb]-\s*[Rr][Oo][Ll]{2}[^\]]*\]/g, " ");

  // 11. Supprimer les timecodes [mm:ss-mm:ss]
  text = text.replace(/\[\d{1,2}:\d{2}-\d{1,2}:\d{2}\][^\n]*/g, " ");

  // 12. Nettoyer les guillemets droits qui entourent des paragraphes entiers
  //     (financement: "narration text." "next text." → retire les guillemets)
  text = text.replace(/"([^"]+)"/g, "$1");

  // 13. Nettoyer les guillemets typographiques « »
  text = text.replace(/«\s*/g, "").replace(/\s*»/g, "");

  // 14. Supprimer les titres # Heading
  text = text.replace(/^#{1,6}\s+.*/gm, " ");

  // 15. Supprimer les séparateurs ---
  text = text.replace(/^---+\s*$/gm, " ");

  // 16. Supprimer les items de liste - xxx ou * xxx en début de ligne
  text = text.replace(/^[\s]*[-*]\s+/gm, "");

  // 17. Supprimer backticks inline `code`
  text = text.replace(/`[^`]+`/g, "");

  // 18. Normaliser les espaces multiples et lignes vides
  text = text.replace(/[ \t]{2,}/g, " ");
  text = text.replace(/\n{3,}/g, "\n\n");

  return text.trim();
}

// ─── Découverte des narration.txt ───────────────────────────────────────────
function findNarrationFiles() {
  const modules = [
    "module1-juridique",
    "module2-transaction",
    "module3-financement",
    "module4-marketing",
    "module5-terrain",
  ];
  const files = [];
  for (const mod of modules) {
    const dir = join(REPO_ROOT, mod, "scripts");
    if (!existsSync(dir)) continue;
    const { stdout } = spawnSync("find", [dir, "-name", "*.narration.txt"], {
      encoding: "utf8",
    });
    for (const f of stdout.trim().split("\n").filter(Boolean)) {
      files.push(f);
    }
  }
  return files;
}

// ─── Détection si un fichier a des artefacts Markdown réels (pas juste # headers) ─
function hasDirtyMarkdown(text) {
  return (
    /\[SOUS-PARTIE/i.test(text) ||
    /\*\*NARRATION/i.test(text) ||
    /\[\d+\s+min[^\]]*\]/i.test(text) ||
    /(?<!\*)\*(?!\*)[^*\n]{1,30}\*(?!\*)/.test(text) ||
    /\*\*[^*]+\*\*/.test(text) ||
    /\[option\s+[A-Z]\]/i.test(text)
  );
}

// ─── Génération MP3 via macOS say + ffmpeg ───────────────────────────────────
function regenWithSay(text, outPath) {
  const tmpAiff = `/tmp/tts_${Date.now()}.aiff`;
  try {
    // macOS say → AIFF
    const sayRes = spawnSync("say", ["-v", MAC_VOICE, "-o", tmpAiff, text], {
      encoding: "utf8",
    });
    if (sayRes.status !== 0) throw new Error(`say failed: ${sayRes.stderr}`);

    // AIFF → MP3 via ffmpeg
    const ffRes = spawnSync("ffmpeg", [
      "-y", "-i", tmpAiff,
      "-codec:a", "libmp3lame", "-qscale:a", "2",
      outPath
    ], { encoding: "utf8" });
    if (ffRes.status !== 0) throw new Error(`ffmpeg failed: ${ffRes.stderr}`);
    return true;
  } finally {
    if (existsSync(tmpAiff)) {
      try { spawnSync("rm", [tmpAiff]); } catch {}
    }
  }
}

// ─── Génération MP3 via Mistral Voxtral ─────────────────────────────────────
async function regenWithMistral(text, outPath, voiceId = "fr-FR-Marie") {
  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) throw new Error("MISTRAL_API_KEY manquant");

  // Chunk si > 5000 chars
  const MAX = 5000;
  const chunks = [];
  let rest = text;
  while (rest.length > MAX) {
    let cut = rest.lastIndexOf(". ", MAX);
    if (cut < MAX * 0.5) cut = rest.lastIndexOf(" ", MAX);
    if (cut < 100) cut = MAX;
    chunks.push(rest.slice(0, cut + 1).trim());
    rest = rest.slice(cut + 1).trim();
  }
  if (rest) chunks.push(rest);

  const buffers = [];
  for (let i = 0; i < chunks.length; i++) {
    const res = await fetch("https://api.mistral.ai/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "voxtral-mini-tts-2603",
        input: chunks[i],
        voice_id: voiceId,
        response_format: "mp3",
      }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(`Mistral (${res.status}): ${json.message ?? JSON.stringify(json)}`);
    if (!json.audio_data) throw new Error("Réponse Mistral sans audio_data");
    buffers.push(Buffer.from(json.audio_data, "base64"));
    if (i < chunks.length - 1) await new Promise(r => setTimeout(r, 500));
  }

  if (buffers.length === 1) {
    writeFileSync(outPath, buffers[0]);
    return;
  }

  // Concat avec ffmpeg
  const tmpDir = `/tmp/mistral_tts_${Date.now()}`;
  spawnSync("mkdir", ["-p", tmpDir]);
  const parts = [];
  for (let i = 0; i < buffers.length; i++) {
    const pf = join(tmpDir, `part${i}.mp3`);
    writeFileSync(pf, buffers[i]);
    parts.push(pf);
  }
  const listFile = join(tmpDir, "list.txt");
  writeFileSync(listFile, parts.map(p => `file '${p}'`).join("\n"));
  spawnSync("ffmpeg", ["-y", "-f", "concat", "-safe", "0", "-i", listFile, "-c", "copy", outPath]);
  spawnSync("rm", ["-rf", tmpDir]);
}

// ─── Mapping narration.txt → nom MP3 ────────────────────────────────────────
function narratTxtToMp3Name(narratPath) {
  const base = basename(narratPath, ".narration.txt");
  return `${base}.mp3`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const useMistral = Boolean(process.env.MISTRAL_API_KEY?.trim());
  console.log(`\n🧹 Nettoyage narrations + régénération MP3`);
  console.log(`   Mode: ${useMistral ? "Mistral Voxtral (Marie)" : `macOS say (${MAC_VOICE})`}`);
  if (DRY_RUN) console.log("   ⚠️  DRY-RUN — aucune modification\n");
  else console.log("");

  const narratFiles = findNarrationFiles();
  console.log(`📂 ${narratFiles.length} fichiers .narration.txt trouvés\n`);

  let cleaned = 0;
  let regenerated = 0;
  let skipped = 0;

  for (const narratPath of narratFiles) {
    const raw = readFileSync(narratPath, "utf8");
    const isDirty = hasDirtyMarkdown(raw);

    if (!isDirty) {
      skipped++;
      continue;
    }

    const mp3Name = narratTxtToMp3Name(narratPath);
    const mp3Path = join(AUDIO_DIR, mp3Name);

    console.log(`🔧 DIRTY: ${basename(narratPath)}`);

    const cleanedText = cleanNarration(raw);

    if (DRY_RUN) {
      console.log(`   Avant (extrait): ${raw.slice(0, 120).replace(/\n/g, " ")}...`);
      console.log(`   Après (extrait): ${cleanedText.slice(0, 120).replace(/\n/g, " ")}...`);
      console.log("");
      continue;
    }

    // Écrire le .narration.txt nettoyé
    writeFileSync(narratPath, cleanedText, "utf8");
    cleaned++;
    console.log(`   ✅ narration.txt nettoyé (${cleanedText.length} chars)`);

    // Régénérer le MP3
    if (!existsSync(mp3Path)) {
      console.log(`   ⚠️  MP3 absent: ${mp3Name} — skip régénération`);
      continue;
    }

    try {
      console.log(`   🎙  Régénération ${mp3Name}...`);
      if (useMistral) {
        await regenWithMistral(cleanedText, mp3Path, "fr-FR-Marie");
      } else {
        regenWithSay(cleanedText, mp3Path);
      }
      regenerated++;
      console.log(`   ✅ MP3 régénéré`);
    } catch (err) {
      console.error(`   ❌ Erreur MP3: ${err.message}`);
    }
    console.log("");
  }

  // Cas spécial: 06-parcours-interactif-transparence.mp3 (script sans SCRIPT COMPLET)
  const parcoursNarrat = join(REPO_ROOT, "module1-juridique/scripts/06-parcours-interactif-transparence.narration.txt");
  const parcoursMp3 = join(AUDIO_DIR, "06-parcours-interactif-transparence.mp3");
  if (!existsSync(parcoursNarrat)) {
    console.log("📝 Création narration pour 06-parcours-interactif...");
    const parcoursText = `Bienvenue dans ce parcours interactif sur la transparence des honoraires en immobilier.

Dans ce module pratique, vous allez découvrir les obligations légales issues de la loi ALUR concernant l'affichage et la communication des honoraires.

Vous apprendrez à identifier les situations problématiques, à appliquer les bonnes pratiques professionnelles, et à sécuriser vos mandats et annonces immobilières.

Ce parcours inclut des mises en situation concrètes et des quiz de validation pour ancrer vos connaissances.

Commencez dès maintenant en cliquant sur le premier scénario interactif.`;
    if (!DRY_RUN) {
      writeFileSync(parcoursNarrat, parcoursText, "utf8");
      console.log("   ✅ narration.txt créé");
      if (existsSync(parcoursMp3)) {
        try {
          console.log("   🎙  Régénération MP3 parcours-interactif...");
          if (useMistral) {
            await regenWithMistral(parcoursText, parcoursMp3, "fr-FR-Marie");
          } else {
            regenWithSay(parcoursText, parcoursMp3);
          }
          regenerated++;
          console.log("   ✅ MP3 régénéré");
        } catch (err) {
          console.error(`   ❌ ${err.message}`);
        }
      }
    }
    console.log("");
  }

  console.log("─".repeat(50));
  console.log(`✅ Terminé: ${cleaned} narration.txt nettoyés, ${regenerated} MP3 régénérés, ${skipped} fichiers propres ignorés`);

  if (regenerated > 0) {
    console.log(`\n🎬 Les MP3 propres sont prêts dans public/audio/`);
  }
}

main().catch(console.error);
