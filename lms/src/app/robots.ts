import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/formation/test", "/formation/test-conversationnel", "/login", "/register"],
    },
    sitemap: "https://formation-immo.vercel.app/sitemap.xml",
  };
}
