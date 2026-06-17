"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { getAppUrl } from "@/lib/app-url";
import {
  grantEntitlement,
  hasActiveSubscription,
  linkExistingSubscriptionToUser,
  upsertStudentProfile,
} from "@/lib/auth-access";
import { grantsFromProducts, parsePurchaseMetadata } from "@/lib/purchase";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import { createClient } from "@/lib/supabase/server";

function getValidNext(value: FormDataEntryValue | null, fallback = "/formation") {
  if (typeof value !== "string") return fallback;
  return value.startsWith("/") && !value.startsWith("//") ? value : fallback;
}

function getString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function buildRedirect(path: string, params: Record<string, string | null | undefined>) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) searchParams.set(key, value);
  });

  const query = searchParams.toString();
  return query ? `${path}?${query}` : path;
}

async function retrievePaidCheckout(sessionId: string) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeKey) {
    throw new Error("Configuration Stripe manquante pour valider le paiement.");
  }

  const stripe = new Stripe(stripeKey);
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    throw new Error("Paiement Stripe non validé.");
  }

  return session;
}

export async function login(formData: FormData) {
  const supabase = await createClient();
  const next = getValidNext(formData.get("next"));
  const email = getString(formData.get("email")).toLowerCase();
  const password = getString(formData.get("password"));

  if (!email || !password) {
    redirect(buildRedirect("/login", {
      next,
      error: "Email et mot de passe sont requis.",
    }));
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(buildRedirect("/login", {
      next,
      error: getAuthErrorMessage(error.message),
    }));
  }

  revalidatePath("/", "layout");
  redirect(next);
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const next = getValidNext(formData.get("next"));
  const sessionId = getString(formData.get("session_id"));
  const email = getString(formData.get("email")).toLowerCase();
  const password = getString(formData.get("password"));
  const firstName = getString(formData.get("first_name"));
  const lastName = getString(formData.get("last_name"));
  const fullName = `${firstName} ${lastName}`.trim();

  if (!email || !password || !firstName || !lastName) {
    redirect(buildRedirect("/register", {
      next,
      session_id: sessionId,
      error: "Tous les champs sont requis.",
    }));
  }

  // ── Étape A — ÉLIGIBILITÉ vérifiée AVANT toute création de compte ──
  // Empêche les comptes orphelins + la cascade de rate-limit Supabase :
  // un email sans accès qui s'inscrit puis réessaie déclenchait "you can only
  // request this after N seconds". On ne crée le compte que si l'achat est valide.
  let grants: (string | null)[] | null = null;
  let paidSessionId: string | null = null;
  try {
    if (sessionId) {
      const session = await retrievePaidCheckout(sessionId);
      const paidEmail = session.customer_details?.email?.toLowerCase();
      if (paidEmail && paidEmail !== email) {
        throw new Error("Utilisez l'email indiqué lors du paiement (chez Stripe).");
      }
      const purchase = parsePurchaseMetadata(
        session.metadata as Record<string, string> | null
      );
      if (purchase.formationId && purchase.formationId !== "immobilier") {
        throw new Error("Ce paiement ne correspond pas à la formation immobilière.");
      }
      // Sessions historiques sans metadata lisible : comportement d'origine = pack.
      grants = purchase.productIds.length > 0 ? grantsFromProducts(purchase.productIds) : [null];
      paidSessionId = session.id;
    } else if (!(await hasActiveSubscription(email))) {
      throw new Error("NO_ACCESS");
    }
  } catch (eligibilityError) {
    const raw = eligibilityError instanceof Error ? eligibilityError.message : "";
    const friendly =
      raw === "NO_ACCESS"
        ? "Aucune formation n'est associée à cet email. Achetez d'abord votre formation : votre compte se créera juste après le paiement."
        : raw || "Impossible de vérifier votre achat. Réessayez ou contactez-nous.";
    redirect(buildRedirect("/register", { next, session_id: sessionId, error: friendly }));
  }

  // ── Étape B — création du compte (éligibilité confirmée) ──
  const { data: authData, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        first_name: firstName,
        last_name: lastName,
      },
      emailRedirectTo: `${getAppUrl()}/auth/callback?next=${encodeURIComponent(next)}`,
    },
  });

  if (error) {
    redirect(buildRedirect("/register", {
      next,
      session_id: sessionId,
      error: getAuthErrorMessage(error.message),
    }));
  }

  // ── Étape C — profil + octroi/rattachement (best-effort) ──
  // L'éligibilité est déjà validée. En cas d'erreur transitoire ici, on NE
  // renvoie PAS vers /register (sinon nouveau signUp → rate-limit) : l'accès est
  // de toute façon rattaché par email (webhook + verifyModuleAccess matchent l'email).
  if (authData.user) {
    try {
      await upsertStudentProfile({
        id: authData.user.id,
        full_name: fullName,
        first_name: firstName,
        last_name: lastName,
      });

      if (grants) {
        for (const moduleSlug of grants) {
          await grantEntitlement({
            email,
            user_id: authData.user.id,
            formation_id: "immobilier",
            module_slug: moduleSlug,
            stripe_session_id: paidSessionId,
            status: "active",
          });
        }
      } else {
        await linkExistingSubscriptionToUser({ email, userId: authData.user.id });
      }
    } catch (postSignupError) {
      console.error("signup: octroi/rattachement post-création échoué:", postSignupError);
    }
  }

  revalidatePath("/", "layout");
  
  // Message personnalisé si c'est un retour de paiement
  const message = sessionId
    ? "Compte créé ! Confirmez votre email pour accéder à votre formation."
    : "Vérifiez votre email pour confirmer votre compte.";

  redirect(`/login?next=${encodeURIComponent(next)}&message=${encodeURIComponent(message)}`);
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient();
  const email = getString(formData.get("email")).toLowerCase();

  if (!email) {
    redirect("/login?reset=1&error=Email requis.");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${getAppUrl()}/auth/callback?next=/settings/reset-password`,
  });

  if (error) {
    redirect("/login?reset=1&error=" + encodeURIComponent(getAuthErrorMessage(error.message)));
  }

  redirect("/login?message=Un email de réinitialisation a été envoyé.");
}
