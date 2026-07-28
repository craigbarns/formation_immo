import { describe, expect, it } from "vitest";
import { FORMATION_MODULES } from "@/data/course";
import {
  PUBLIC_SEO_ROUTES,
  SITE_URL,
  absoluteUrl,
  serializeJsonLd,
} from "./seo";

describe("SEO configuration", () => {
  it("uses the Netlify production domain as the only canonical origin", () => {
    expect(SITE_URL).toBe("https://monpassformation.com");
    expect(absoluteUrl("/formation-immobiliere-loi-alur")).toBe(
      "https://monpassformation.com/formation-immobiliere-loi-alur",
    );
  });

  it("lists unique, public and indexable sitemap routes", () => {
    const paths = PUBLIC_SEO_ROUTES.map(({ path }) => path);

    expect(new Set(paths).size).toBe(paths.length);
    expect(paths).not.toContain("/login");
    expect(paths).not.toContain("/register");
    expect(paths.some((path) => path.startsWith("/formation/"))).toBe(false);
  });

  it("escapes JSON-LD values that could otherwise close a script tag", () => {
    const serialized = serializeJsonLd({
      value: "</script><script>alert('xss')</script>",
    });

    expect(serialized).not.toContain("<");
    expect(serialized).toContain("\\u003c/script>");
  });

  it("keeps the public course claims aligned with the current primary curriculum", () => {
    const lessons = FORMATION_MODULES.flatMap(({ lessons }) => lessons);
    const durationMinutes = lessons.reduce(
      (total, lesson) => total + lesson.duration,
      0,
    );

    expect(FORMATION_MODULES).toHaveLength(7);
    expect(lessons).toHaveLength(40);
    expect(durationMinutes).toBe(45 * 60);
  });
});
