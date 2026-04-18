"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined") window.print();
      }}
      className="ml-auto inline-flex items-center gap-2 rounded-xl bg-brand-gold px-4 py-2 text-sm font-bold text-brand-navy shadow-lg transition hover:brightness-105"
    >
      <Printer className="h-4 w-4" aria-hidden />
      Imprimer
    </button>
  );
}
