import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Formation Loi ALUR — Agent immobilier",
    short_name: "Formation ALUR",
    description:
      "Formation en ligne pour agents immobiliers : Loi ALUR, juridique, transaction, financement, marketing, terrain, déontologie et TRACFIN.",
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
