import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

/**
 * Retour client (octobre 2026) : la formation présentait les logements classés F
 * comme déjà « inlouables ». Calendrier officiel de la décence énergétique
 * (métropole) : G non décent depuis le 1er janvier 2025, F au 1er janvier 2028,
 * E au 1er janvier 2034 — dans toute la France, pas seulement en zone tendue.
 */
const ROOT = path.join(__dirname, "..", "..", "..");
const SOURCES = [
  path.join(ROOT, "lms", "src", "data"),
  ...fs
    .readdirSync(ROOT)
    .filter((d) => /^module/.test(d))
    .map((d) => path.join(ROOT, d)),
];

const WRONG_PATTERNS: [RegExp, string][] = [
  [/\bF\s*(?::|en|dès|depuis|à partir de)\s*(?:le\s*)?(?:1er\s*)?(?:janv(?:ier|\.)?\s*)?(2023|2025)\b/i, "classe F datée 2023/2025 (c'est 2028)"],
  [/(2023|2025)[^.]{0,40}au tour des F\b/i, "« au tour des F » en 2023/2025 (c'est 2028)"],
  [/\bF (?:ou|et) G\b[^.]{0,60}ne peuvent plus être lou/i, "F présenté comme déjà non louable"],
  [/\bF (?:ou|et) G\b[^.]{0,80}zones? tendues?/i, "décence énergétique limitée à tort aux zones tendues"],
];

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(ts|tsx|md|txt)$/.test(entry.name) && !/\.test\./.test(entry.name)) out.push(full);
  }
  return out;
}

describe("calendrier DPE juste dans tout le contenu", () => {
  it("aucune affirmation fausse sur la classe F ou les zones tendues", () => {
    const offenders: string[] = [];
    for (const file of SOURCES.flatMap((d) => walk(d))) {
      fs.readFileSync(file, "utf8").split("\n").forEach((line, i) => {
        for (const [rx, why] of WRONG_PATTERNS) {
          if (rx.test(line)) offenders.push(`${path.relative(ROOT, file)}:${i + 1} — ${why}`);
        }
      });
    }
    expect(offenders, offenders.join("\n")).toEqual([]);
  });
});
