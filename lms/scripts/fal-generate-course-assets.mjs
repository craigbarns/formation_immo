#!/usr/bin/env node
/**
 * Génère visuels (Flux) et optionnellement vidéos bumpers (Luma) par module via Fal.
 *
 * Prérequis : FAL_KEY dans lms/.env.local
 *
 * Usage (depuis lms/) :
 *   node scripts/fal-generate-course-assets.mjs
 *   node scripts/fal-generate-course-assets.mjs --only juridique
 *   node scripts/fal-generate-course-assets.mjs --with-videos
 *   node scripts/fal-generate-course-assets.mjs --dry-run
 */
import { fal } from "@fal-ai/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadDotEnvLocal } from "./lib/env-local.mjs";
import { FAL_MODULE_PROMPTS, MODULE_SLUGS } from "./lib/fal-course-prompts.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lmsRoot = path.join(__dirname, "..");
const OUT_ROOT = path.join(lmsRoot, "public", "generated", "fal");

const MODEL_IMAGE = "fal-ai/flux/schnell";
const MODEL_VIDEO = "fal-ai/luma-dream-machine";

function parseArgs() {
  const argv = process.argv.slice(2);
  const onlyIdx = argv.indexOf("--only");
  const only = onlyIdx >= 0 && argv[onlyIdx + 1] ? argv[onlyIdx + 1] : null;
  return {
    only,
    withVideos: argv.includes("--with-videos"),
    dryRun: argv.includes("--dry-run"),
  };
}

async function downloadToFile(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download ${res.status}: ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, buf);
}

async function main() {
  const { only, withVideos, dryRun } = parseArgs();
  loadDotEnvLocal(lmsRoot);

  const key = process.env.FAL_KEY?.trim();
  if (!key) {
    console.error("Définissez FAL_KEY dans lms/.env.local");
    process.exit(1);
  }

  fal.config({ credentials: key });

  let slugs = MODULE_SLUGS;
  if (only) {
    if (!FAL_MODULE_PROMPTS[only]) {
      console.error(`Module inconnu: ${only}. Valides: ${MODULE_SLUGS.join(", ")}`);
      process.exit(1);
    }
    slugs = [only];
  }

  console.log(
    dryRun
      ? "[dry-run] Aucun appel API."
      : `Modèles : image=${MODEL_IMAGE}${withVideos ? `, vidéo=${MODEL_VIDEO}` : ""}`,
  );
  console.log(`Sortie : ${path.relative(lmsRoot, OUT_ROOT)}/\n`);

  for (const slug of slugs) {
    const mod = FAL_MODULE_PROMPTS[slug];
    const dir = path.join(OUT_ROOT, slug);
    console.log(`— ${mod.title} (${slug})`);

    if (dryRun) {
      console.log(`  image  → ${path.join(dir, "cover.jpg")}`);
      if (withVideos) console.log(`  vidéo → ${path.join(dir, "bumper.mp4")}`);
      continue;
    }

    const imgPath = path.join(dir, "cover.jpg");
    const resultImg = await fal.subscribe(MODEL_IMAGE, {
      input: {
        prompt: mod.imagePrompt,
        image_size: "landscape_16_9",
      },
      logs: true,
    });
    const imgUrl = resultImg.data?.images?.[0]?.url;
    if (!imgUrl) {
      console.error("  Erreur image :", JSON.stringify(resultImg).slice(0, 400));
      continue;
    }
    await downloadToFile(imgUrl, imgPath);
    console.log(`  ✓ image  ${path.relative(lmsRoot, imgPath)}`);

    if (withVideos) {
      const vidPath = path.join(dir, "bumper.mp4");
      const resultVid = await fal.subscribe(MODEL_VIDEO, {
        input: {
          prompt: mod.videoPrompt,
          aspect_ratio: "16:9",
        },
        logs: true,
      });
      const vidUrl = resultVid.data?.video?.url;
      if (!vidUrl) {
        console.error("  Erreur vidéo :", JSON.stringify(resultVid).slice(0, 400));
        continue;
      }
      await downloadToFile(vidUrl, vidPath);
      console.log(`  ✓ vidéo  ${path.relative(lmsRoot, vidPath)}`);
    }
  }

  if (!dryRun) {
    const manifest = {
      generatedAt: new Date().toISOString(),
      models: { image: MODEL_IMAGE, video: withVideos ? MODEL_VIDEO : null },
      modules: slugs.map((s) => ({
        slug: s,
        cover: `/generated/fal/${s}/cover.jpg`,
        bumper: withVideos ? `/generated/fal/${s}/bumper.mp4` : null,
      })),
    };
    fs.mkdirSync(OUT_ROOT, { recursive: true });
    fs.writeFileSync(path.join(OUT_ROOT, "manifest.json"), JSON.stringify(manifest, null, 2));
    console.log(`\n✓ manifest.json`);
  }
}

main().catch((e) => {
  console.error(e?.message || e);
  process.exit(1);
});
