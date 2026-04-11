import { execFileSync } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";

/** Fallback hors Mistral : `say` (macOS) + lame via ffmpeg. */
export function writeMacOsSayToMp3(text, outAbs, voice = process.env.LESSON_TTS_VOICE || "Jacques") {
  fs.mkdirSync(path.dirname(outAbs), { recursive: true });
  const id = `${path.basename(outAbs, ".mp3")}-${Date.now()}`;
  const tmpTxt = path.join(os.tmpdir(), `${id}.txt`);
  const tmpAiff = path.join(os.tmpdir(), `${id}.aiff`);
  fs.writeFileSync(tmpTxt, text, "utf8");
  try {
    execFileSync("say", ["-v", voice, "-f", tmpTxt, "-o", tmpAiff], { stdio: "inherit" });
    execFileSync(
      "ffmpeg",
      ["-y", "-i", tmpAiff, "-codec:a", "libmp3lame", "-q:a", "3", outAbs],
      { stdio: "inherit" },
    );
  } finally {
    try {
      fs.unlinkSync(tmpTxt);
    } catch {
      /* ignore */
    }
    try {
      fs.unlinkSync(tmpAiff);
    } catch {
      /* ignore */
    }
  }
}
