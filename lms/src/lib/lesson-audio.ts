import fs from "fs";
import path from "path";
import type { Lesson } from "@/data/course";

export function deriveAudioUrlFromScript(scriptFile: string): string {
  return `/audio/${path.basename(scriptFile, ".md")}.mp3`;
}

function publicFileExists(urlPath: string): boolean {
  const rel = urlPath.replace(/^\//, "");
  try {
    return fs.existsSync(path.join(process.cwd(), "public", rel));
  } catch {
    return false;
  }
}

/**
 * URL de lecture pour une leçon : `audioUrl` dans course.ts si renseigné,
 * sinon `/audio/<nom-du-script>.mp3` lorsque le fichier existe dans public/.
 * `audioUrl: null` ou `''` désactive la narration.
 */
export function getLessonAudioPlaybackSrc(lesson: Lesson): string | null {
  if (lesson.audioUrl === null || lesson.audioUrl === "") {
    return null;
  }
  if (lesson.audioUrl !== undefined && lesson.audioUrl.length > 0) {
    return lesson.audioUrl;
  }
  const derived = deriveAudioUrlFromScript(lesson.scriptFile);
  return publicFileExists(derived) ? derived : null;
}

/**
 * URL affichée sur la **liste du module** : même règle que ci-dessus, mais l’URL
 * dérivée du script est toujours proposée (lecteur visible même avant génération du MP3).
 * Utiliser `isLessonAudioFilePresent` pour un libellé « fichier manquant » si besoin.
 */
export function getLessonModuleListAudioSrc(lesson: Lesson): string | null {
  if (lesson.audioUrl === null || lesson.audioUrl === "") {
    return null;
  }
  if (lesson.audioUrl !== undefined && lesson.audioUrl.length > 0) {
    return lesson.audioUrl;
  }
  return deriveAudioUrlFromScript(lesson.scriptFile);
}

export function isLessonAudioFilePresent(src: string): boolean {
  return publicFileExists(src);
}

/**
 * URL de l'alignment WhisperX pour une leçon.
 * Correspond au basename du MP3 avec extension .alignment.json
 */
export function getLessonAlignmentUrl(lesson: Lesson): string | null {
  const audioSrc = getLessonAudioPlaybackSrc(lesson);
  if (!audioSrc) return null;
  return audioSrc.replace(/\.mp3$/, ".alignment.json").replace("/audio/", "/audio-align/");
}
