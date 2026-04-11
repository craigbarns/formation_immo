import { execFileSync } from "child_process";

/**
 * Concatène des pistes MP3 en une seule, avec ré-encodage (jointures propres).
 * Un seul fichier : normalise quand même via lame (cohérence de format).
 */
export function concatMp3FilesToOutput(partPaths, outAbs) {
  if (partPaths.length === 0) throw new Error("concatMp3FilesToOutput: aucun fichier");
  if (partPaths.length === 1) {
    execFileSync("ffmpeg", ["-y", "-i", partPaths[0], "-c:a", "libmp3lame", "-q:a", "2", outAbs], {
      stdio: "pipe",
    });
    return;
  }
  const args = ["-y"];
  for (const p of partPaths) {
    args.push("-i", p);
  }
  const n = partPaths.length;
  const ins = partPaths.map((_, i) => `[${i}:a]`).join("");
  const filter = `${ins}concat=n=${n}:v=0:a=1[aout]`;
  args.push("-filter_complex", filter, "-map", "[aout]", "-c:a", "libmp3lame", "-q:a", "2", outAbs);
  execFileSync("ffmpeg", args, { stdio: "pipe", maxBuffer: 32 * 1024 * 1024 });
}
