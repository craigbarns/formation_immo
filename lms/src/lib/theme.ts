/**
 * Tokens de design — source de vérité unique pour les couleurs, espacements et rayons.
 * Les valeurs CSS correspondantes sont définies dans `src/app/globals.css` (:root / .dark).
 *
 * Ré-exporte aussi le ThemeProvider et useTheme depuis le dossier theme/.
 */

export { ThemeProvider, useTheme } from "./theme/index";

export const colors = {
  brand: {
    navy:       "var(--brand-navy)",
    navyDeep:   "var(--brand-navy-deep)",
    navySoft:   "var(--brand-navy-soft)",
    gold:       "var(--brand-gold)",
    goldDim:    "var(--brand-gold-dim)",
    goldSoft:   "var(--brand-gold-soft)",
  },
  surface: {
    elevated:   "var(--surface-elevated)",
    warm:       "var(--surface-warm)",
  },
  muted: {
    foreground: "var(--muted-foreground)",
  },
  bg:           "var(--background)",
  fg:           "var(--foreground)",
} as const;

export const spacing = {
  xs:  "0.25rem",   // 4px
  sm:  "0.5rem",    // 8px
  md:  "1rem",      // 16px
  lg:  "1.5rem",    // 24px
  xl:  "2rem",      // 32px
  "2xl": "2.5rem",  // 40px
  "3xl": "3rem",    // 48px
} as const;

export const radius = {
  sm:   "0.5rem",    // 8px
  md:   "0.75rem",   // 12px
  lg:   "1rem",      // 16px
  xl:   "1.5rem",    // 24px
  full: "9999px",
} as const;

export const shadows = {
  sm:  "0 2px 8px rgba(0,0,0,0.04), 0 4px 16px rgba(26,58,92,0.05)",
  md:  "0 2px 8px rgba(0,0,0,0.04), 0 16px 40px rgba(26,58,92,0.07)",
  lg:  "0 8px 32px rgba(26,58,92,0.12)",
  xl:  "0 16px 64px rgba(26,58,92,0.16)",
} as const;

export const transitions = {
  fast:   "150ms cubic-bezier(0.22, 1, 0.36, 1)",
  normal: "250ms cubic-bezier(0.22, 1, 0.36, 1)",
  slow:   "350ms cubic-bezier(0.22, 1, 0.36, 1)",
} as const;

/** Modules : couleurs d'accent assignées */
export const moduleColors = {
  juridique:   "#1a3a5c",
  transaction: "#2d5a87",
  financement: "#142d45",
  marketing:   "#d4af37",
  terrain:     "#3b6e8f",
} as const;

/** Modules : icônes Lucide assignées */
export const moduleIcons = {
  juridique:   "Scale",
  transaction: "Handshake",
  financement: "Landmark",
  marketing:   "Megaphone",
  terrain:     "MapPin",
} as const;
