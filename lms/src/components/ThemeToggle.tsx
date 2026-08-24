"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const subscribeToHydration = () => () => {};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );

  if (!mounted) return <div className="h-9 w-20" />;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
      className="rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-white/70 transition hover:bg-slate-100 dark:hover:bg-white/15 hover:text-brand-gold dark:hover:text-brand-gold"
    >
      {isDark ? "Mode clair" : "Mode sombre"}
    </button>
  );
}
