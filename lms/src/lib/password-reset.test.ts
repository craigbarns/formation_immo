import { describe, it, expect } from "vitest";
import { buildResetUrl, shouldSendResetLink, RESET_THROTTLE_MS } from "./password-reset";

/**
 * Bug production (septembre 2026) : les e-mails de réinitialisation envoyés
 * par Supabase n'arrivaient pas, et le lien PKCE échouait dès qu'on l'ouvrait
 * sur un autre appareil/navigateur/domaine. Nouveau circuit : lien construit
 * sur le token_hash (vérifié au moment où l'utilisateur valide son nouveau mot
 * de passe) et envoyé via Resend.
 */
describe("buildResetUrl", () => {
  it("pointe vers la page nouveau mot de passe avec le token_hash", () => {
    expect(buildResetUrl("https://app.monpassformation.com", "abc123")).toBe(
      "https://app.monpassformation.com/settings/reset-password?token_hash=abc123"
    );
  });

  it("ignore un slash final dans l'URL de l'app", () => {
    expect(buildResetUrl("https://app.monpassformation.com/", "abc")).toBe(
      "https://app.monpassformation.com/settings/reset-password?token_hash=abc"
    );
  });

  it("encode le token (sécurité URL)", () => {
    expect(buildResetUrl("https://x.fr", "a b&c=d")).toBe(
      "https://x.fr/settings/reset-password?token_hash=a%20b%26c%3Dd"
    );
  });
});

describe("shouldSendResetLink (anti-spam par compte)", () => {
  const now = Date.parse("2026-09-25T12:00:00Z");

  it("aucun envoi précédent => on envoie", () => {
    expect(shouldSendResetLink(null, now)).toBe(true);
    expect(shouldSendResetLink(undefined, now)).toBe(true);
  });

  it("dernier envoi il y a moins d'une minute => on n'envoie pas", () => {
    const recent = new Date(now - 30_000).toISOString();
    expect(shouldSendResetLink(recent, now)).toBe(false);
  });

  it("dernier envoi il y a plus d'une minute => on envoie", () => {
    const old = new Date(now - RESET_THROTTLE_MS - 1).toISOString();
    expect(shouldSendResetLink(old, now)).toBe(true);
  });

  it("date illisible => on envoie (ne bloque jamais un vrai utilisateur)", () => {
    expect(shouldSendResetLink("pas-une-date", now)).toBe(true);
  });
});
