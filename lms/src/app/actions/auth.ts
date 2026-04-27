"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function getValidNext(value: FormDataEntryValue | null, fallback = "/formation") {
  if (typeof value !== "string") return fallback;
  return value.startsWith("/") && !value.startsWith("//") ? value : fallback;
}

export async function login(formData: FormData) {
  const supabase = await createClient();
  const next = getValidNext(formData.get("next"));

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/login?error=" + encodeURIComponent(error.message));
  }

  revalidatePath("/", "layout");
  redirect(next);
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const next = getValidNext(formData.get("next"));
  const email = formData.get("email") as string;
  const firstName = (formData.get("first_name") as string ?? "").trim();
  const lastName = (formData.get("last_name") as string ?? "").trim();
  const fullName = `${firstName} ${lastName}`.trim();

  const data = {
    email,
    password: formData.get("password") as string,
    options: {
      data: {
        full_name: fullName,
        first_name: firstName,
        last_name: lastName,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://app.monpassformation.com"}/auth/callback?next=${encodeURIComponent(next)}`,
    },
  };

  const { data: authData, error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/register?error=" + encodeURIComponent(error.message));
  }

  if (authData.user) {
    // Lien automatique avec l'achat Stripe
    await supabase
      .from("user_subscriptions")
      .update({ user_id: authData.user.id })
      .eq("email", email);

    // Upsert profil avec prénom + nom séparés
    await supabase
      .from("profiles")
      .upsert({
        id: authData.user.id,
        full_name: fullName,
        first_name: firstName,
        last_name: lastName,
      }, { onConflict: "id" });
  }

  revalidatePath("/", "layout");
  
  // Message personnalisé si c'est un retour de paiement
  const message = next.includes("session_id") 
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
  const email = formData.get("email") as string;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/settings/reset-password`,
  });

  if (error) {
    redirect("/login?error=" + encodeURIComponent(error.message));
  }

  redirect("/login?message=Un email de réinitialisation a été envoyé.");
}
