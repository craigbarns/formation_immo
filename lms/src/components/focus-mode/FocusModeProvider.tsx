"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface FocusModeContextType {
  isFocusMode: boolean;
  toggleFocusMode: () => void;
  enableFocusMode: () => void;
  disableFocusMode: () => void;
}

const FocusModeContext = createContext<FocusModeContextType | null>(null);

const FOCUS_MODE_KEY = "formation-focus-mode";

export function FocusModeProvider({ children }: { children: ReactNode }) {
  const [isFocusMode, setIsFocusMode] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(FOCUS_MODE_KEY) === "true";
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  const toggleFocusMode = () => {
    const newValue = !isFocusMode;
    setIsFocusMode(newValue);
    localStorage.setItem(FOCUS_MODE_KEY, String(newValue));
  };

  const enableFocusMode = () => {
    setIsFocusMode(true);
    localStorage.setItem(FOCUS_MODE_KEY, "true");
  };

  const disableFocusMode = () => {
    setIsFocusMode(false);
    localStorage.setItem(FOCUS_MODE_KEY, "false");
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <FocusModeContext.Provider
      value={{ isFocusMode, toggleFocusMode, enableFocusMode, disableFocusMode }}
    >
      <div className={isFocusMode ? "focus-mode-active" : ""}>{children}</div>
    </FocusModeContext.Provider>
  );
}

export function useFocusModeContext() {
  const context = useContext(FocusModeContext);
  if (!context) {
    throw new Error("useFocusModeContext must be used within FocusModeProvider");
  }
  return context;
}
