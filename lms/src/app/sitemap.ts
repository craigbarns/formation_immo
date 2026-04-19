import type { MetadataRoute } from "next";
import { COURSE } from "@/data/course";

const BASE = "https://formation-immo.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/formation",
    "/formation/outils",
    "/formation/supports-visuels",
    "/formation/examen/juridique",
    "/formation/profil",
    "/formation/oral",
    "/formation/roleplay",
    "/formation/formateurs",
    "/mentions-legales",
    "/cgv",
    "/login",
    "/register",
  ];

  const staticRoutes = staticPages.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const lessonRoutes = COURSE.flatMap((mod) =>
    mod.lessons.map((les) => ({
      url: `${BASE}/formation/${mod.slug}/${les.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
  );

  return [...staticRoutes, ...lessonRoutes];
}
