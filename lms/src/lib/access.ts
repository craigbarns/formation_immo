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

  // 1. Vérifier si l'utilisateur est ADMIN
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role === "admin") {
    return { user, isAdmin: true };
  }

  // 2. Sinon, vérification dans la table des abonnements
  const { data: subscription, error } = await supabase
    .from("user_subscriptions")
    .select("status")
    .eq("email", user.email)
    .eq("formation_id", "immobilier")
    .single();

  if (error || !subscription || subscription.status !== "active") {
    throw new Error("Accès refusé : Aucun abonnement actif trouvé");
  }

  return { user, isAdmin: false };
}
