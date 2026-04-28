import { toErrorMessage } from "@/lib/utils/error";
import { sendWelcomeEmail } from "@/lib/email/resend";
import { upsertSubscription } from "@/lib/auth-access";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

// Initialisation sécurisée pour éviter les crashs au build
const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY) 
  : null;

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const isSupabaseAdminConfigured =
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
  Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

export async function POST(request: Request) {
  if (!stripe || !isSupabaseAdminConfigured || !webhookSecret) {
    console.error("Webhook configuration missing");
    return NextResponse.json({ error: "Configuration missing" }, { status: 500 });
  }
  const body = await request.text();
  const signature = (await headers()).get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed: ${toErrorMessage(err)}`);
    return NextResponse.json({ error: `Webhook Error: ${toErrorMessage(err)}` }, { status: 400 });
  }

  // Gérer l'événement de succès de paiement
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_details?.email;
    const formationId = session.metadata?.formationId || "immobilier";

    console.log(`Payment successful for ${customerEmail} (Formation: ${formationId})`);

    if (customerEmail) {
      // 1. Inscrire l'accès dans la table 'user_subscriptions'
      // Le user_id sera lié lors de l'inscription ou de la prochaine connexion
      try {
        await upsertSubscription({
          email: customerEmail,
          formation_id: formationId,
          stripe_session_id: session.id,
          status: "active",
        });
      } catch (subError) {
        console.error("Error saving subscription:", subError);
        return NextResponse.json({ error: "Error saving subscription" }, { status: 500 });
      }

      // Envoyer l'email de bienvenue
      const customerName = session.customer_details?.name ?? undefined;
      await sendWelcomeEmail(customerEmail, customerName);
    }
  }

  return NextResponse.json({ received: true });
}
