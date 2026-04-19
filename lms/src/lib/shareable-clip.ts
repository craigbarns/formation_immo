/**
 * Génère des liens partageables vers un moment précis d'une leçon
 */

export interface ClipLink {
  url: string;
  time: number;
  label: string;
}

export function generateClipLink(
  baseUrl: string,
  moduleSlug: string,
  lessonSlug: string,
  time: number,
  label?: string
): ClipLink {
  const url = new URL(baseUrl);
  url.pathname = `/formation/${moduleSlug}/${lessonSlug}`;
  url.searchParams.set("t", String(Math.floor(time)));

  return {
    url: url.toString(),
    time,
    label: label ?? `À ${formatTime(time)}`,
  };
}

export function parseClipTimeFromUrl(): number | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const t = params.get("t");
  if (!t) return null;
  const parsed = parseInt(t, 10);
  return isNaN(parsed) ? null : parsed;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand("copy");
    document.body.removeChild(textarea);
    return success;
  }
}

function formatTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}
