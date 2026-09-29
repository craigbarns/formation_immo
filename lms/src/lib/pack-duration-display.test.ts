import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import {
  getCatalog,
  PACK_DISPLAY_DURATION,
  PACK_DISPLAY_DURATION_ISO,
  PACK_PRODUCT_ID,
} from "@/data/catalog";

/**
 * Décision commerciale (septembre 2026) : la formation est présentée comme
 * « 42h » (durée officielle de la formation continue Loi ALUR), module TRACFIN
 * INCLUS — même si le contenu réel totalise davantage. Aucune page ne doit
 * afficher 45h, ni additionner des heures (« 42h + 3h TRACFIN »).
 */
describe("durée affichée du pack = 42h (TRACFIN inclus)", () => {
  it("constantes d'affichage", () => {
    expect(PACK_DISPLAY_DURATION).toBe("42h");
    expect(PACK_DISPLAY_DURATION_ISO).toBe("PT42H");
  });

  it("la description du pack (catalogue + Stripe) annonce 42h", () => {
    const pack = getCatalog().find((p) => p.id === PACK_PRODUCT_ID)!;
    expect(pack.description).toContain("42h");
    expect(pack.description).not.toMatch(/\b45\s?h/i);
  });

  it("aucune page, e-mail, attestation ou composant n'affiche 45h ni n'additionne des heures", () => {
    const srcDir = path.join(__dirname, "..");
    // Tout ce qu'un client peut voir : pages, composants, e-mails, attestations PDF.
    const clientFacingDirs = ["app", "components", "lib/email", "lib/pdf"].map((d) =>
      path.join(srcDir, d)
    );
    const offenders: string[] = [];

    const walk = (dir: string) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (/\.(tsx?|mdx?)$/.test(entry.name) && !/\.test\./.test(entry.name)) {
          fs.readFileSync(full, "utf8").split("\n").forEach((line, i) => {
            if (
              /\b45\s?h(eures?)?\b/i.test(line) ||
              /PT45H/.test(line) ||
              /42\s?h\s*\+/i.test(line) ||
              /\+\s?3\s?h\b/i.test(line)
            ) {
              offenders.push(`${path.relative(srcDir, full)}:${i + 1}  ${line.trim()}`);
            }
          });
        }
      }
    };
    clientFacingDirs.forEach(walk);

    expect(offenders, `Durée incorrecte affichée :\n${offenders.join("\n")}`).toEqual([]);
  });
});
