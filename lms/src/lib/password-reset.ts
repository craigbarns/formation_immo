/**
 * Réinitialisation du mot de passe — logique PURE (aucune I/O, testable).
 *
 * Pourquoi ce circuit : l'e-mail Supabase n'était pas délivré, et son lien PKCE
 * (`exchangeCodeForSession`) échouait dès qu'on l'ouvrait sur un autre appareil,
 * navigateur ou domaine. Le lien porte désormais le `token_hash`, vérifié par
 * `verifyOtp` au moment où l'utilisateur VALIDE son nouveau mot de passe — donc
 * valable partout, et insensible aux robots qui pré-ouvrent les liens des mails.
 */

/** Délai minimal entre deux e-mails de réinitialisation pour un même compte. */
export const RESET_THROTTLE_MS = 60_000;

/** URL du lien envoyé par e-mail (page publique « Nouveau mot de passe »). */
export function buildResetUrl(appUrl: string, hashedToken: string): string {
  return `${appUrl.replace(/\/$/, "")}/settings/reset-password?token_hash=${encodeURIComponent(hashedToken)}`;
}

/** Faut-il envoyer un nouveau lien, vu le dernier envoi connu pour ce compte ? */
export function shouldSendResetLink(
  lastSentAt: string | null | undefined,
  now: number
): boolean {
  if (!lastSentAt) return true;
  const last = Date.parse(lastSentAt);
  if (!Number.isFinite(last)) return true;
  return now - last >= RESET_THROTTLE_MS;
}
