import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Client Supabase avec Service Role pour contourner RLS et inscrire l'accès
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  const body = await request.text();
  const signature = (await headers()).get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Gérer l'événement de succès de paiement
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_details?.email;
    const formationId = session.metadata?.formationId || "immobilier";

    console.log(`Payment successful for ${customerEmail} (Formation: ${formationId})`);

    if (customerEmail) {
      // 1. Chercher si l'utilisateur existe déjà
      const { data: user } = await supabaseAdmin
        .from("profiles")
        .select("id")
        .eq("email_auth", customerEmail) // Note: On devra peut-être adapter selon ta structure
        .single();

      // 2. Inscrire l'accès dans une nouvelle table 'user_subscriptions'
      // On crée la table si elle n'existe pas via SQL plus tard
      const { error: subError } = await supabaseAdmin
        .from("user_subscriptions")
        .upsert({
          email: customerEmail,
          formation_id: formationId,
          stripe_session_id: session.id,
          status: "active",
          user_id: user?.id || null, // Sera lié plus tard si l'user n'existe pas encore
        }, { onConflict: "email,formation_id" });

      if (subError) {
        console.error("Error saving subscription:", subError);
        return NextResponse.json({ error: "Error saving subscription" }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}
