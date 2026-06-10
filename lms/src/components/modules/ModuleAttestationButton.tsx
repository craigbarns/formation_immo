"use client";

import { useState } from "react";
import { Award, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function ModuleAttestationButton({ moduleSlug }: { moduleSlug: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const download = async () => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;
      if (!token) throw new Error("Non connecté");

      const res = await fetch("/api/certificates/generate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ moduleSlug }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Erreur lors de la génération");

      window.open(json.pdfUrl, "_blank");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={download}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-xl bg-brand-gold px-5 py-2.5 text-xs font-black uppercase tracking-wider text-brand-navy shadow-lg transition hover:scale-105 active:scale-95 disabled:opacity-70"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : (
          <Award className="h-4 w-4" aria-hidden />
        )}
        Télécharger mon attestation
      </button>
      {error && <p className="text-xs font-bold text-red-400">{error}</p>}
    </div>
  );
}
