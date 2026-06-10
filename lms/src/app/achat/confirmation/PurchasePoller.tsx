"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, RefreshCw } from "lucide-react";

const POLL_MS = 2000;
const TIMEOUT_MS = 30000;

export function PurchasePoller() {
  const router = useRouter();
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const startedAt = Date.now();

    async function poll() {
      if (cancelled) return;
      try {
        const res = await fetch("/api/entitlements", { cache: "no-store" });
        if (res.ok) {
          const data: { hasPack: boolean; modules: string[] } = await res.json();
          if (data.hasPack || data.modules.length > 0) {
            router.replace("/formation");
            return;
          }
        }
      } catch {
        // réseau instable : on retentera au prochain tick
      }
      if (Date.now() - startedAt >= TIMEOUT_MS) {
        if (!cancelled) setTimedOut(true);
        return;
      }
      setTimeout(poll, POLL_MS);
    }

    poll();
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (timedOut) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-lg font-bold text-slate-900">
          Paiement reçu — l&apos;activation prend un peu plus de temps que prévu.
        </p>
        <p className="text-sm text-slate-600">
          Votre accès s&apos;ouvre automatiquement d&apos;ici quelques minutes. Vous pouvez
          réessayer, ou nous écrire à contact@passformation.com si besoin.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-navy px-5 py-3 text-sm font-black text-white transition hover:bg-brand-navy-mid"
        >
          <RefreshCw className="h-4 w-4" aria-hidden />
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-center">
      <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" aria-hidden />
      <p className="text-lg font-bold text-slate-900">Paiement confirmé !</p>
      <p className="inline-flex items-center gap-2 text-sm text-slate-600">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        Activation de votre accès en cours…
      </p>
    </div>
  );
}
