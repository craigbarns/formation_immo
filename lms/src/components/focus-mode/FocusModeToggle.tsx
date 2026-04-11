"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

const FOCUS_MODE_KEY = "formation-focus-mode";

export function useFocusMode() {
  const [isFocusMode, setIsFocusMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(FOCUS_MODE_KEY);
    if (saved === "true") setIsFocusMode(true);
  }, []);

  const toggleFocusMode = () => {
    const newValue = !isFocusMode;
    setIsFocusMode(newValue);
    localStorage.setItem(FOCUS_MODE_KEY, String(newValue));
  };

  return { isFocusMode, toggleFocusMode };
}

export function FocusModeToggle() {
  const { isFocusMode, toggleFocusMode } = useFocusMode();

  return (
    <button
      onClick={toggleFocusMode}
      className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
        isFocusMode
          ? "bg-[#d4af37]/20 text-[#d4af37] ring-1 ring-[#d4af37]/40"
          : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"
      }`}
      title={isFocusMode ? "Désactiver le mode focus" : "Activer le mode focus"}
    >
      {isFocusMode ? (
        <>
          <EyeOff className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Mode focus</span>
        </>
      ) : (
        <>
          <Eye className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Mode focus</span>
        </>
      )}
    </button>
  );
}
