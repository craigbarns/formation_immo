export function toErrorMessage(err: unknown, fallback = "Erreur serveur"): string {
  return err instanceof Error ? err.message : fallback;
}
