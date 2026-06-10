"use client";

import { Check, ShoppingCart } from "lucide-react";
import { useCart } from "./CartProvider";
import { euros } from "@/lib/price";

export function AddToCartButton({ productId }: { productId: string }) {
  const cart = useCart();
  const product = cart.products.get(productId);
  if (!product) return null;

  const inCart = cart.has(productId);

  if (inCart) {
    return (
      <button
        onClick={() => cart.remove(productId)}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-emerald-600 bg-emerald-50 px-5 py-3 text-sm font-black text-emerald-700 transition hover:bg-emerald-100"
      >
        <Check className="h-4 w-4" aria-hidden />
        Dans le panier — retirer
      </button>
    );
  }

  return (
    <button
      onClick={() => cart.add(productId)}
      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-navy px-5 py-3 text-sm font-black text-white transition hover:bg-brand-navy-mid"
    >
      <ShoppingCart className="h-4 w-4" aria-hidden />
      Ajouter au panier — {euros(product.priceCents)}
    </button>
  );
}
