#!/usr/bin/env node
/**
 * Vérifie que FAL_KEY (lms/.env.local) fonctionne avec Fal.
 * Usage : depuis lms/ → npm run fal:test
 */
import { fal } from "@fal-ai/client";
import path from "path";
import { fileURLToPath } from "url";
import { loadDotEnvLocal } from "./lib/env-local.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lmsRoot = path.join(__dirname, "..");
loadDotEnvLocal(lmsRoot);

const FAL_KEY = process.env.FAL_KEY;

async function main() {
  if (!FAL_KEY?.trim()) {
    console.error("Définissez FAL_KEY dans lms/.env.local");
    process.exit(1);
  }

  fal.config({ credentials: FAL_KEY });

  const result = await fal.subscribe("fal-ai/flux/schnell", {
    input: {
      prompt:
        "Minimal test image, soft abstract gradient, no text, no people, 4k",
      image_size: "square_hd",
    },
    logs: true,
  });

  const images = result.data?.images;
  if (Array.isArray(images) && images[0]?.url) {
    console.log("OK — Fal répond correctement.");
    console.log("URL image test :", images[0].url);
    return;
  }

  console.log("Réponse Fal (aperçu) :", JSON.stringify(result, null, 2).slice(0, 1200));
}

main().catch((e) => {
  console.error(e?.message || e);
  process.exit(1);
});
