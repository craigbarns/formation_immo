import { describe, it, expect } from "vitest";
import { getAuthErrorMessage } from "./auth-errors";

describe("getAuthErrorMessage", () => {
  it("rate limit Supabase ('after N seconds') => message FR clair", () => {
    expect(
      getAuthErrorMessage("For security purposes, you can only request this after 1 seconds")
    ).toMatch(/Patientez quelques secondes/i);
  });

  it("compte deja existant => guide vers la connexion", () => {
    expect(getAuthErrorMessage("User already registered")).toMatch(/existe déjà/i);
  });

  it("identifiants invalides", () => {
    expect(getAuthErrorMessage("Invalid login credentials")).toMatch(/incorrect/i);
  });

  it("email non confirme", () => {
    expect(getAuthErrorMessage("Email not confirmed")).toMatch(/confirmé/i);
  });

  it("message inconnu => renvoye tel quel", () => {
    expect(getAuthErrorMessage("Erreur inattendue 123")).toBe("Erreur inattendue 123");
  });
});
