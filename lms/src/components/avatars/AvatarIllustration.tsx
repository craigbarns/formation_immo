"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
type ModuleSlug = "juridique" | "transaction" | "financement" | "marketing" | "terrain";
type Expression = "neutral" | "happy" | "thinking" | "excited" | "focused";
type Size = "sm" | "md" | "lg" | "xl";

interface AvatarIllustrationProps {
  moduleSlug: ModuleSlug;
  isSpeaking?: boolean;
  expression?: Expression;
  size?: Size;
  showName?: boolean;
  animated?: boolean; // enable idle float
}

// ─── Character data ───────────────────────────────────────────────────────────
const CHARACTERS: Record<ModuleSlug, {
  name: string;
  role: string;
  skinColor: string;
  skinShadow: string;
  hairColor: string;
  eyeColor: string;
  accentColor: string;
  clothingColor: string;
  gender: "m" | "f";
  hairVariant: "short" | "pompadour" | "long" | "wavy" | "gray";
  hasBeard: boolean;
  hasGlasses: boolean;
}> = {
  juridique: {
    name: "Alexandre Verdier",
    role: "Juriste immobilier",
    skinColor: "#C8956C",
    skinShadow: "#a87550",
    hairColor: "#2D1B00",
    eyeColor: "#3D2B1F",
    accentColor: "#1a3a5c",
    clothingColor: "#1a3a5c",
    gender: "m",
    hairVariant: "pompadour",
    hasBeard: false,
    hasGlasses: false,
  },
  transaction: {
    name: "Sophia Bensalem",
    role: "Négociatrice senior",
    skinColor: "#C68642",
    skinShadow: "#a86c2e",
    hairColor: "#1C0A00",
    eyeColor: "#3B2314",
    accentColor: "#2563eb",
    clothingColor: "#2563eb",
    gender: "f",
    hairVariant: "long",
    hasBeard: false,
    hasGlasses: false,
  },
  financement: {
    name: "Thomas Mercier",
    role: "Courtier & analyste",
    skinColor: "#FDBCB4",
    skinShadow: "#d99a92",
    hairColor: "#4A3728",
    eyeColor: "#2D4A3E",
    accentColor: "#059669",
    clothingColor: "#1f2d3d",
    gender: "m",
    hairVariant: "short",
    hasBeard: true,
    hasGlasses: false,
  },
  marketing: {
    name: "Léa Fontaine",
    role: "Marketing digital",
    skinColor: "#F1C27D",
    skinShadow: "#d4a050",
    hairColor: "#1a0a0a",
    eyeColor: "#4B0082",
    accentColor: "#7c3aed",
    clothingColor: "#7c3aed",
    gender: "f",
    hairVariant: "wavy",
    hasBeard: false,
    hasGlasses: false,
  },
  terrain: {
    name: "Nicolas Aubert",
    role: "Directeur d'agence",
    skinColor: "#DEB887",
    skinShadow: "#c09060",
    hairColor: "#888888",
    eyeColor: "#2C3E50",
    accentColor: "#dc2626",
    clothingColor: "#1a2535",
    gender: "m",
    hairVariant: "gray",
    hasBeard: false,
    hasGlasses: false,
  },
};

// ─── Size map ─────────────────────────────────────────────────────────────────
const SIZE_MAP: Record<Size, number> = { sm: 80, md: 120, lg: 160, xl: 220 };

// ─── Hair paths (in a 160x180 viewBox space) ──────────────────────────────────
function HairPath({ variant, color }: { variant: string; color: string }) {
  switch (variant) {
    case "pompadour":
      return (
        <g>
          {/* Back/sides */}
          <ellipse cx="80" cy="54" rx="46" ry="30" fill={color} />
          {/* Pompadour front sweep */}
          <path d="M38 60 Q45 25 80 28 Q115 25 122 60 Q110 40 80 38 Q50 40 38 60 Z" fill={color} />
        </g>
      );
    case "short":
      return (
        <ellipse cx="80" cy="55" rx="44" ry="28" fill={color} />
      );
    case "gray": // salt & pepper - distinguished
      return (
        <g>
          <ellipse cx="80" cy="55" rx="44" ry="28" fill={color} />
          {/* Gray highlight streaks */}
          <path d="M50 45 Q55 35 70 38 Q60 40 50 45Z" fill="white" opacity="0.5" />
          <path d="M110 45 Q105 35 90 38 Q100 40 110 45Z" fill="white" opacity="0.5" />
        </g>
      );
    case "long": // woman - long hair
      return (
        <g>
          {/* Top */}
          <ellipse cx="80" cy="52" rx="44" ry="26" fill={color} />
          {/* Sides flowing down */}
          <rect x="34" y="70" width="18" height="60" rx="9" fill={color} />
          <rect x="108" y="70" width="18" height="60" rx="9" fill={color} />
          {/* Part in middle */}
          <path d="M75 30 L80 55 L85 30" fill={color} />
        </g>
      );
    case "wavy": // woman - bob/wavy
      return (
        <g>
          {/* Top */}
          <ellipse cx="80" cy="52" rx="44" ry="26" fill={color} />
          {/* Left wave */}
          <path d="M34 72 Q28 90 35 105 Q40 92 38 80 Z" fill={color} />
          {/* Right wave */}
          <path d="M126 72 Q132 90 125 105 Q120 92 122 80 Z" fill={color} />
        </g>
      );
    default:
      return <ellipse cx="80" cy="55" rx="44" ry="28" fill={color} />;
  }
}

// ─── Main Component ──────────────────────────────────────────────────────────
export function AvatarIllustration({
  moduleSlug,
  isSpeaking = false,
  expression = "neutral",
  size = "md",
  showName = false,
  animated = true,
}: AvatarIllustrationProps) {
  const char = CHARACTERS[moduleSlug];
  const px = SIZE_MAP[size];
  const [blink, setBlink] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(false);

  // Auto blink
  useEffect(() => {
    const schedule = () => {
      const delay = 2500 + Math.random() * 3000;
      return setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 120);
        timeoutRef.current = schedule();
      }, delay);
    };
    const timeoutRef = { current: schedule() };
    return () => clearTimeout(timeoutRef.current);
  }, []);

  // Speaking mouth animation
  useEffect(() => {
    if (!isSpeaking) { setMouthOpen(false); return; }
    const id = setInterval(() => setMouthOpen((v) => !v), 180);
    return () => clearInterval(id);
  }, [isSpeaking]);

  // Expression-based eye/brow offsets
  const eyeScale = blink ? 0.08 : expression === "excited" ? 1.15 : 1;
  const browLeft = expression === "thinking" ? -4 : expression === "happy" ? 2 : 0;
  const browRight = expression === "thinking" ? 4 : expression === "happy" ? -2 : 0;
  const browRaise = expression === "excited" ? -4 : expression === "happy" ? -2 : 0;

  // Mouth shape
  const mouthPath = mouthOpen
    ? "M63 108 Q80 118 97 108 Q80 122 63 108 Z"   // open oval
    : expression === "happy"
    ? "M63 108 Q80 120 97 108"                      // wide smile
    : expression === "excited"
    ? "M65 106 Q80 121 95 106"                      // big smile
    : "M67 108 Q80 115 93 108";                     // gentle smile / neutral

  const idleAnimation = animated
    ? { y: [0, -4, 0], transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" as const } }
    : {};

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div animate={idleAnimation} style={{ width: px, height: px }}>
        <svg
          viewBox="0 0 160 180"
          width={px}
          height={px}
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.18))" }}
        >
          <defs>
            <radialGradient id={`bg-${moduleSlug}`} cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor={char.accentColor} stopOpacity="0.18" />
              <stop offset="100%" stopColor={char.accentColor} stopOpacity="0.06" />
            </radialGradient>
            <clipPath id={`circle-clip-${moduleSlug}`}>
              <circle cx="80" cy="80" r="78" />
            </clipPath>
          </defs>

          {/* Background */}
          <circle cx="80" cy="80" r="78" fill={`url(#bg-${moduleSlug})`} />
          <circle cx="80" cy="80" r="78" fill="white" opacity="0.85" />
          <circle cx="80" cy="80" r="78" fill={`url(#bg-${moduleSlug})`} />

          {/* Accent ring */}
          <circle cx="80" cy="80" r="78" fill="none" stroke={char.accentColor} strokeWidth="3" opacity="0.25" />

          {/* Clothing - shirt/suit collar */}
          <path
            d={`M20 180 L42 130 Q60 120 80 118 Q100 120 118 130 L140 180 Z`}
            fill={char.clothingColor}
          />
          {/* Inner shirt */}
          <path d="M65 118 L80 135 L95 118" fill="white" opacity="0.9" />
          {/* Tie (for males) */}
          {char.gender === "m" && (
            <path d="M80 135 L76 155 L80 168 L84 155 Z" fill={char.accentColor} opacity="0.9" />
          )}

          {/* Neck */}
          <ellipse cx="80" cy="122" rx="15" ry="10" fill={char.skinColor} />

          {/* Head */}
          <ellipse cx="80" cy="82" rx="44" ry="50" fill={char.skinColor} />

          {/* Chin shadow */}
          <ellipse cx="80" cy="124" rx="22" ry="6" fill={char.skinShadow} opacity="0.3" />

          {/* Hair (behind = drawn first, in front drawn after) */}
          <g opacity="0.97">
            <HairPath variant={char.hairVariant} color={char.hairColor} />
          </g>

          {/* Beard (Thomas - financement) */}
          {char.hasBeard && (
            <ellipse cx="80" cy="116" rx="22" ry="12" fill={char.hairColor} opacity="0.8" />
          )}

          {/* === FACE FEATURES === */}

          {/* Left eyebrow */}
          <motion.path
            d="M50 68 Q62 62 72 66"
            stroke={char.hairColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            animate={{ y: browRaise, rotate: browLeft }}
            transition={{ duration: 0.2 }}
          />
          {/* Right eyebrow */}
          <motion.path
            d="M88 66 Q98 62 110 68"
            stroke={char.hairColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            animate={{ y: browRaise, rotate: browRight }}
            transition={{ duration: 0.2 }}
          />

          {/* Left eye white */}
          <ellipse cx="62" cy="78" rx="10" ry="11" fill="white" />
          {/* Right eye white */}
          <ellipse cx="98" cy="78" rx="10" ry="11" fill="white" />

          {/* Left eye iris */}
          <motion.g animate={{ scaleY: eyeScale }} style={{ transformOrigin: "62px 78px" }}>
            <ellipse cx="62" cy="78" rx="6" ry="7" fill={char.eyeColor} />
            <ellipse cx="62" cy="77" rx="3.5" ry="4" fill={char.eyeColor} />
            <circle cx="63.5" cy="75.5" r="2" fill="black" />
            <circle cx="64.5" cy="74.5" r="0.8" fill="white" opacity="0.8" />
          </motion.g>
          {/* Right eye iris */}
          <motion.g animate={{ scaleY: eyeScale }} style={{ transformOrigin: "98px 78px" }}>
            <ellipse cx="98" cy="78" rx="6" ry="7" fill={char.eyeColor} />
            <ellipse cx="98" cy="77" rx="3.5" ry="4" fill={char.eyeColor} />
            <circle cx="99.5" cy="75.5" r="2" fill="black" />
            <circle cx="100.5" cy="74.5" r="0.8" fill="white" opacity="0.8" />
          </motion.g>

          {/* Nose */}
          <path d="M77 94 Q80 100 83 94" stroke={char.skinShadow} strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* Cheek blush (for happy/excited) */}
          {(expression === "happy" || expression === "excited") && (
            <>
              <ellipse cx="47" cy="96" rx="9" ry="5" fill="#ff9999" opacity="0.3" />
              <ellipse cx="113" cy="96" rx="9" ry="5" fill="#ff9999" opacity="0.3" />
            </>
          )}

          {/* Mouth */}
          <motion.path
            d={mouthPath}
            stroke={char.skinShadow}
            strokeWidth="2"
            fill={mouthOpen ? "#c0705090" : "none"}
            strokeLinecap="round"
            animate={{ d: mouthPath }}
            transition={{ duration: 0.1 }}
          />

          {/* Thinking bubble */}
          {expression === "thinking" && (
            <g>
              <circle cx="125" cy="30" r="12" fill="white" stroke={char.accentColor} strokeWidth="1.5" opacity="0.9" />
              <circle cx="137" cy="20" r="7" fill="white" stroke={char.accentColor} strokeWidth="1.5" opacity="0.9" />
              <circle cx="144" cy="12" r="4" fill="white" stroke={char.accentColor} strokeWidth="1.5" opacity="0.9" />
              <text x="119" y="35" fontSize="12" textAnchor="middle">💭</text>
            </g>
          )}

          {/* Speaking dots */}
          {isSpeaking && (
            <g>
              {[0, 1, 2].map((i) => (
                <motion.circle
                  key={i}
                  cx={140 + i * 7}
                  cy={155}
                  r={2.5}
                  fill={char.accentColor}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }}
                />
              ))}
            </g>
          )}
        </svg>
      </motion.div>

      {showName && (
        <div className="text-center">
          <p className="font-bold text-sm text-zinc-800">{char.name}</p>
          <p className="text-[11px] text-zinc-500 uppercase tracking-wide">{char.role}</p>
        </div>
      )}
    </div>
  );
}

export { CHARACTERS };
export type { ModuleSlug, Expression, Size };
