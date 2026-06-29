import { describe, it, expect, afterEach, vi } from "vitest";
import { isAttestationEligible, requiredSecondsForModule } from "./module-attestation-rules";

afterEach(() => vi.unstubAllEnvs());

describe("isAttestationEligible", () => {
  it("leçons faites + temps suffisant => éligible", () => {
    expect(isAttestationEligible({ lessonsDone: true, timeSpentSec: 8000, requiredSec: 7200 })).toBe(true);
  });

  it("leçons faites mais temps insuffisant => NON éligible (le cas du clic-rapide 48 s)", () => {
    expect(isAttestationEligible({ lessonsDone: true, timeSpentSec: 48, requiredSec: 7200 })).toBe(false);
  });

  it("temps ok mais leçons non finies => NON éligible", () => {
    expect(isAttestationEligible({ lessonsDone: false, timeSpentSec: 9999, requiredSec: 7200 })).toBe(false);
  });

  it("pile au seuil => éligible", () => {
    expect(isAttestationEligible({ lessonsDone: true, timeSpentSec: 7200, requiredSec: 7200 })).toBe(true);
  });
});

describe("requiredSecondsForModule", () => {
  it("module 6 (240 min de contenu) à 50% par défaut => 7200 s", () => {
    expect(requiredSecondsForModule("deontologie")).toBe(7200);
  });

  it("ratio surchargeable par env (0.25 => 3600 s)", () => {
    vi.stubEnv("MODULE_MIN_TIME_RATIO", "0.25");
    expect(requiredSecondsForModule("deontologie")).toBe(3600);
  });

  it("ratio invalide => retombe sur 0.5", () => {
    vi.stubEnv("MODULE_MIN_TIME_RATIO", "abc");
    expect(requiredSecondsForModule("deontologie")).toBe(7200);
  });

  it("module inconnu => 0", () => {
    expect(requiredSecondsForModule("nexiste-pas")).toBe(0);
  });
});
