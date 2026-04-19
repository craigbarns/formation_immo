/**
 * Parseur SRT minimal
 */

export interface SrtEntry {
  index: number;
  start: number; // secondes
  end: number;
  text: string;
}

function parseSrtTime(t: string): number {
  const m = t.match(/(\d{2}):(\d{2}):(\d{2}),(\d{3})/);
  if (!m) return 0;
  return parseInt(m[1]) * 3600 + parseInt(m[2]) * 60 + parseInt(m[3]) + parseInt(m[4]) / 1000;
}

export function parseSrt(content: string): SrtEntry[] {
  const entries: SrtEntry[] = [];
  const blocks = content.trim().split(/\n\n+/);

  for (const block of blocks) {
    const lines = block.trim().split("\n");
    if (lines.length < 3) continue;

    const index = parseInt(lines[0], 10);
    const timeLine = lines[1];
    const text = lines.slice(2).join("\n").trim();

    const timeMatch = timeLine.match(/(.+)\s+-->\s+(.+)/);
    if (!timeMatch || isNaN(index)) continue;

    entries.push({
      index,
      start: parseSrtTime(timeMatch[1]),
      end: parseSrtTime(timeMatch[2]),
      text,
    });
  }

  return entries;
}

export function findActiveSubtitle(entries: SrtEntry[], time: number): SrtEntry | null {
  for (const e of entries) {
    if (time >= e.start && time <= e.end) return e;
  }
  return null;
}
