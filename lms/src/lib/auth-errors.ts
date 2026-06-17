/** Traduit les messages d'erreur Supabase Auth en français lisible pour l'utilisateur. */
export function getAuthErrorMessage(message: string): string {
  const normalized = message.toLowerCase();

  if (normalized.includes("invalid login credentials")) {
    return "Email ou mot de passe incorrect.";
  }

  if (normalized.includes("email not confirmed")) {
    return "Email non confirmé. Vérifiez votre boîte mail avant de vous connecter.";
  }

  if (
    normalized.includes("user already registered") ||
    normalized.includes("already been registered")
  ) {
    return "Un compte existe déjà avec cet email. Connectez-vous, ou réinitialisez votre mot de passe.";
  }

  // Limite anti-spam Supabase (« For security purposes, you can only request this after N seconds »)
  if (
    normalized.includes("for security purposes") ||
    normalized.includes("you can only request this after") ||
    normalized.includes("rate limit") ||
    normalized.includes("too many requests")
  ) {
    return "Trop de tentatives rapprochées. Patientez quelques secondes, puis réessayez.";
  }

  if (normalized.includes("password should be at least")) {
    return "Le mot de passe doit contenir au moins 6 caractères.";
  }

  return message;
}
