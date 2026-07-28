import { describe, expect, it } from "vitest";
import {
  APP_HOST,
  canonicalMarketingPath,
  isAppOnlyPath,
  isAppDeploymentHost,
  isPublicMarketingPath,
  isSessionlessAppPath,
  requestHostname,
} from "./host-routing";

describe("host routing", () => {
  it("identifies every public marketing route without classifying private LMS paths", () => {
    expect(isPublicMarketingPath("/")).toBe(true);
    expect(isPublicMarketingPath("/guides/formation-loi-alur-42-heures")).toBe(true);
    expect(isPublicMarketingPath("/formation-immobiliere-loi-alur")).toBe(true);
    expect(isPublicMarketingPath("/formation/juridique/loi-alur")).toBe(false);
    expect(isPublicMarketingPath("/api/checkout")).toBe(false);
  });

  it("consolidates the legacy checkout URL on the public landing page", () => {
    expect(canonicalMarketingPath("/checkout/immobilier")).toBe(
      "/formation-immobiliere-loi-alur",
    );
    expect(canonicalMarketingPath("/cgv")).toBe("/cgv");
  });

  it("marks the app and Vercel deployments as non-indexable hosts", () => {
    expect(isAppDeploymentHost(APP_HOST)).toBe(true);
    expect(isAppDeploymentHost("formation-immo.vercel.app")).toBe(true);
    expect(isAppDeploymentHost("preview-123.vercel.app")).toBe(true);
    expect(isAppDeploymentHost("monpassformation.com")).toBe(false);
  });

  it("separates app-only routes from the marketing site", () => {
    expect(isAppOnlyPath("/formation/juridique")).toBe(true);
    expect(isAppOnlyPath("/login")).toBe(true);
    expect(isAppOnlyPath("/achat/confirmation")).toBe(true);
    expect(isAppOnlyPath("/formation-immobiliere-loi-alur")).toBe(false);
    expect(isSessionlessAppPath("/settings/reset-password")).toBe(true);
    expect(isSessionlessAppPath("/formation")).toBe(false);
  });

  it("prefers the forwarded public hostname and strips its port", () => {
    const headers = new Headers({
      host: "internal.vercel.app",
      "x-forwarded-host": "app.monpassformation.com:443",
    });

    expect(requestHostname({ headers, nextUrl: { hostname: "fallback.test" } })).toBe(
      "app.monpassformation.com",
    );
  });
});
