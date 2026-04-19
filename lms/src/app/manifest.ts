import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Formation 42h — Agent immobilier",
    short_name: "Formation 42h",
    description: "Formation en ligne pour agents immobiliers : juridique, transaction, financement, marketing et terrain.",
    start_url: "/formation",
    display: "standalone",
    background_color: "#fafafa",
    theme_color: "#1a3a5c",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
