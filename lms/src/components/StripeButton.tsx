"use client";

import { useState } from "react";
import { ArrowRight, Loader2, CreditCard } from "lucide-react";

export function StripeButton({ formationId, label = "Acheter la formation" }: { formationId: string, label?: string }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formationId }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Erreur lors de l'initialisation du paiement : " + (data.error || "Inconnue"));
      }
    } catch (err) {
      console.error(err);
      alert("Une erreur est survenue lors de la redirection vers Stripe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-brand-navy px-8 py-5 text-lg font-black text-white shadow-xl shadow-brand-navy/20 transition hover:bg-brand-navy-mid hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
    >
      {loading ? (
        <>
          <Loader2 className="h-6 w-6 animate-spin" aria-hidden />
          Préparation du paiement…
        </>
      ) : (
        <>
          <CreditCard className="h-6 w-6" aria-hidden />
          {label}
          <ArrowRight className="h-6 w-6" aria-hidden />
        </>
      )}
    </button>
  );
}
