import type { MetadataRoute } from "next";
import { PUBLIC_SEO_ROUTES, absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_SEO_ROUTES.map(({ path, lastModified, images }) => ({
    url: absoluteUrl(path),
    lastModified,
    images: images?.map(absoluteUrl),
  }));
}
