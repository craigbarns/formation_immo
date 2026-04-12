import videosData from "@/data/heygen-videos.json";

interface HeyGenVideoEntry {
  videoUrl: string;
  avatarId: string;
  introText?: string;
  generatedAt: string;
}

type VideosMap = Record<string, HeyGenVideoEntry>;

export function getHeyGenVideoUrl(moduleSlug: string, lessonSlug: string): string | null {
  const key = `${moduleSlug}/${lessonSlug}`;
  const entry = (videosData as unknown as VideosMap)[key];
  return entry?.videoUrl ?? null;
}
