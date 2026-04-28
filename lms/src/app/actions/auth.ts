"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { getAppUrl } from "@/lib/app-url";
import {
  linkExistingSubscriptionToUser,
  upsertStudentProfile,
  upsertSubscription,
} from "@/lib/auth-access";
import { createClient } from "@/lib/supabase/server";

function getValidNext(value: FormDataEntryValue | null, fallback = "/formation") {
  if (typeof value !== "string") return fallback;
  return value.startsWith("/") && !value.startsWith("//") ? value : fallback;
}

function getString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function getAuthErrorMessage(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes("invalid login credentials")) {
    return "Email ou mot de passe incorrect.";
  }

  if (normalized.includes("email not confirmed")) {
    return "Email non confirmé. Vérifiez votre boîte mail avant de vous connecter.";
  }

  if (normalized.includes("user already registered")) {
    return "Un compte existe déjà avec cet email. Connectez-vous ou réinitialisez le mot de passe.";
  }

  return message;
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

  const data = {
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
  };

  const { data: authData, error } = await supabase.auth.signUp(data);

  if (error) {
    redirect(buildRedirect("/register", {
      next,
      session_id: sessionId,
      error: getAuthErrorMessage(error.message),
    }));
  }

  if (authData.user) {
    try {
      await upsertStudentProfile({
        id: authData.user.id,
        full_name: fullName,
        first_name: firstName,
        last_name: lastName,
      });

      if (sessionId) {
        const session = await retrievePaidCheckout(sessionId);
        const paidEmail = session.customer_details?.email?.toLowerCase();

        if (paidEmail && paidEmail !== email) {
          throw new Error("L'email du paiement ne correspond pas à l'email du compte.");
        }

        await upsertSubscription({
          email,
          user_id: authData.user.id,
          formation_id: session.metadata?.formationId || "immobilier",
          stripe_session_id: session.id,
          status: "active",
        });
      } else {
        const linked = await linkExistingSubscriptionToUser({
          email,
          userId: authData.user.id,
        });

        if (!linked) {
          throw new Error("Aucun accès actif n'existe pour cet email. Contactez l'administrateur.");
        }
      }
    } catch (subscriptionError) {
      redirect(buildRedirect("/register", {
        next,
        session_id: sessionId,
        error: subscriptionError instanceof Error
          ? subscriptionError.message
          : "Impossible de créer l'accès formation.",
      }));
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
