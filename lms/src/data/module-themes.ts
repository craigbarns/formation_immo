/**
 * Thèmes visuels par module pour le CinematicPlayer
 * Chaque module a sa propre identité colorée, watermark et voice signature
 */

export interface ModuleTheme {
  /** Slug du module */
  slug: string;
  /** Nom affiché du module */
  label: string;
  /** Couleur principale (hex) */
  primary: string;
  /** Couleur secondaire / accent */
  secondary: string;
  /** Dégradé de fond pour la zone vidéo */
  gradient: string;
  /** Glow color pour les effets */
  glow: string;
  /** Icône Lucide-like (emoji pour l'instant, à remplacer par Lucide si besoin) */
  watermark: string;
  /** Position du watermark */
  watermarkPosition: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  /** Opacité du watermark */
  watermarkOpacity: number;
  /** Voice signature texte */
  voiceSignature: string;
  /** Couleur du texte de voice signature */
  voiceSignatureColor: string;
}

export const MODULE_THEMES: Record<string, ModuleTheme> = {
  juridique: {
    slug: "juridique",
    label: "Juridique & Conformité",
    primary: "#1a3a5c",
    secondary: "#60a5fa",
    gradient: "from-[#0a1628] via-[#1a3a5c] to-[#0d1f33]",
    glow: "rgba(96,165,250,0.3)",
    watermark: "⚖️",
    watermarkPosition: "bottom-right",
    watermarkOpacity: 0.06,
    voiceSignature: "Voix : Marie — posée & autoritaire",
    voiceSignatureColor: "rgba(96,165,250,0.7)",
  },
  transaction: {
    slug: "transaction",
    label: "Transaction & Négociation",
    primary: "#2563eb",
    secondary: "#a78bfa",
    gradient: "from-[#0f172a] via-[#1e1b4b] to-[#172554]",
    glow: "rgba(167,139,250,0.3)",
    watermark: "🤝",
    watermarkPosition: "bottom-right",
    watermarkOpacity: 0.06,
    voiceSignature: "Voix : Marie — dynamique & enthousiaste",
    voiceSignatureColor: "rgba(167,139,250,0.7)",
  },
  financement: {
    slug: "financement",
    label: "Financement & Fiscalité",
    primary: "#059669",
    secondary: "#34d399",
    gradient: "from-[#022c22] via-[#064e3b] to-[#0f2e1f]",
    glow: "rgba(52,211,153,0.3)",
    watermark: "📈",
    watermarkPosition: "bottom-right",
    watermarkOpacity: 0.06,
    voiceSignature: "Voix : Marie — curieuse & pédagogue",
    voiceSignatureColor: "rgba(52,211,153,0.7)",
  },
  marketing: {
    slug: "marketing",
    label: "Marketing Digital",
    primary: "#7c3aed",
    secondary: "#fbbf24",
    gradient: "from-[#2e1065] via-[#4c1d95] to-[#1e1b4b]",
    glow: "rgba(251,191,36,0.3)",
    watermark: "📱",
    watermarkPosition: "bottom-right",
    watermarkOpacity: 0.06,
    voiceSignature: "Voix : Marie — chaleureuse & créative",
    voiceSignatureColor: "rgba(251,191,36,0.7)",
  },
  terrain: {
    slug: "terrain",
    label: "Terrain & Visites",
    primary: "#dc2626",
    secondary: "#f87171",
    gradient: "from-[#450a0a] via-[#7f1d1d] to-[#2a0a0a]",
    glow: "rgba(248,113,113,0.3)",
    watermark: "🏠",
    watermarkPosition: "bottom-right",
    watermarkOpacity: 0.06,
    voiceSignature: "Voix : Marie — confiante & expérimentée",
    voiceSignatureColor: "rgba(248,113,113,0.7)",
  },
  tracfin: {
    slug: "tracfin",
    label: "TRACFIN & LCB-FT",
    primary: "#0f766e",
    secondary: "#2dd4bf",
    gradient: "from-[#042f2e] via-[#0f766e] to-[#052e2b]",
    glow: "rgba(45,212,191,0.3)",
    watermark: "🛡️",
    watermarkPosition: "bottom-right",
    watermarkOpacity: 0.06,
    voiceSignature: "Voix : Marie — posée & autoritaire",
    voiceSignatureColor: "rgba(45,212,191,0.7)",
  },
};

export function getModuleTheme(moduleSlug: string): ModuleTheme {
  return MODULE_THEMES[moduleSlug] ?? MODULE_THEMES["juridique"];
}
