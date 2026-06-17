"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

/** Champ mot de passe avec bascule afficher/masquer (œil). */
export function PasswordInput({
  id,
  name,
  autoComplete,
  minLength,
  placeholder = "••••••••",
}: {
  id: string;
  name: string;
  autoComplete: string;
  minLength?: number;
  placeholder?: string;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={show ? "text" : "password"}
        autoComplete={autoComplete}
        required
        minLength={minLength}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 pr-12 text-white placeholder:text-zinc-500 focus:border-brand-gold/50 focus:outline-none focus:ring-4 focus:ring-brand-gold/10 transition-all"
        placeholder={placeholder}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Masquer le mot de passe" : "Afficher le mot de passe"}
        aria-pressed={show}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-white/50 transition-colors hover:text-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/40"
        tabIndex={-1}
      >
        {show ? <EyeOff className="h-5 w-5" aria-hidden /> : <Eye className="h-5 w-5" aria-hidden />}
      </button>
    </div>
  );
}
