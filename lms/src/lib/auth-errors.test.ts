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

  // Réinitialisation du mot de passe : plus jamais d'échec silencieux ou en anglais.
  it("lien de réinitialisation expiré / déjà utilisé => refaire une demande", () => {
    expect(getAuthErrorMessage("Token has expired or is invalid")).toMatch(/expiré.*refaites/i);
    expect(getAuthErrorMessage("Email link is invalid or has expired")).toMatch(/expiré.*refaites/i);
    expect(getAuthErrorMessage("otp_expired")).toMatch(/expiré.*refaites/i);
  });

  it("échec du lien de connexion (callback) => message FR, pas le code brut", () => {
    expect(getAuthErrorMessage("auth_callback_failed")).toMatch(/expiré.*refaites/i);
  });

  it("session absente sur la page nouveau mot de passe => refaire une demande", () => {
    expect(getAuthErrorMessage("Auth session missing!")).toMatch(/refaites/i);
  });

  it("nouveau mot de passe identique à l'ancien", () => {
    expect(
      getAuthErrorMessage("New password should be different from the old password.")
    ).toMatch(/différent/i);
  });
});
