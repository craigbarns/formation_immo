import { createClient } from "@/lib/supabase/server";

/**
 * Vérifie si un utilisateur authentifié possède un accès payant actif.
 * @returns { email: string, userId: string } ou lance une redirection/erreur
 */
export async function verifySubscription() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !user.email) {
    throw new Error("Non authentifié");
  }

  // Vérification dans la table des abonnements
  const { data: subscription, error } = await supabase
    .from("user_subscriptions")
    .select("status")
    .eq("email", user.email)
    .eq("formation_id", "immobilier")
    .single();

  if (error || !subscription || subscription.status !== "active") {
    throw new Error("Accès refusé : Aucun abonnement actif trouvé");
  }

  return { user };
}
