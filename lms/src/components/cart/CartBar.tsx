"use client";

import { useState } from "react";
import { ArrowRight, Loader2, ShoppingCart, Sparkles, Trash2 } from "lucide-react";
import { useCart } from "./CartProvider";
import { euros } from "@/lib/price";

/**
 * Barre de panier flottante (vitrine). Upsell pack quand le total à la carte
 * atteint le prix du pack — le pack devient objectivement le meilleur choix.
 */
export function CartBar() {
  const cart = useCart();
  const [loading, setLoading] = useState(false);

  if (cart.count === 0) return null;

  const isPackOnly = cart.items.length === 1 && cart.items[0] === "pack";
  const savings = cart.totalCents - cart.packPriceCents;
  const showUpsell = !isPackOnly && savings >= 0;

  const pay = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: cart.items }),
      });

      if (response.status === 401) {
        // Connexion obligatoire avant paiement — le panier survit (localStorage).
        window.location.href = `/login?next=${encodeURIComponent(window.location.pathname)}`;
        return;
      }

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
    <div className="fixed inset-x-0 bottom-4 z-50 px-4">
      <div className="mx-auto max-w-2xl space-y-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-2xl">
        {showUpsell && (
          <button
            onClick={() => cart.setItems(["pack"])}
            className="flex w-full items-center justify-between gap-3 rounded-xl border border-brand-gold/40 bg-brand-gold/10 px-4 py-3 text-left transition hover:bg-brand-gold/20"
          >
            <span className="inline-flex items-center gap-2 text-sm font-black text-brand-navy">
              <Sparkles className="h-4 w-4 text-brand-gold" aria-hidden />
              Passez au pack complet — tous les modules{savings > 0 ? ` et économisez ${euros(savings)}` : " au même prix"}
            </span>
            <span className="text-sm font-black text-brand-navy">{euros(cart.packPriceCents)}</span>
          </button>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-navy text-white">
              <ShoppingCart className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-black text-brand-navy">
                {isPackOnly
                  ? "Pack complet"
                  : `${cart.count} module${cart.count > 1 ? "s" : ""} sélectionné${cart.count > 1 ? "s" : ""}`}
              </p>
              <p className="text-xs font-bold text-zinc-500">Total : {euros(cart.totalCents)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={cart.clear}
              aria-label="Vider le panier"
              className="rounded-lg border border-zinc-200 p-2.5 text-zinc-500 transition hover:bg-zinc-100"
            >
              <Trash2 className="h-4 w-4" aria-hidden />
            </button>
            <button
              onClick={pay}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-navy px-6 py-3 text-sm font-black text-white transition hover:bg-brand-navy-mid disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              ) : (
                <>
                  Payer {euros(cart.totalCents)}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
