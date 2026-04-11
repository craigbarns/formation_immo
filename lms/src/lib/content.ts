import fs from "fs";
import path from "path";

/** Racine du dépôt formation (dossier parent de `lms/`) */
export function getRepoRoot(): string {
  return path.join(process.cwd(), "..");
}

export function readLessonMarkdown(relativePathFromRepoRoot: string): string {
  const full = path.join(getRepoRoot(), relativePathFromRepoRoot);
  try {
    return fs.readFileSync(full, "utf-8");
  } catch {
    return `# Contenu indisponible\n\nLe fichier \`${relativePathFromRepoRoot}\` est introuvable. En production, déployez le dépôt **formation-immobiliere** complet (modules à côté de \`lms/\`) ou copiez les dossiers \`module*\` dans \`lms/content/\`.\n`;
  }
}
