"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  scale: number;
  /** Précalculés à la création pour éviter Math.random() pendant le render */
  driftX: number;
  duration: number;
  isCircle: boolean;
}

interface ConfettiProps {
  trigger: boolean;
  onComplete?: () => void;
  particleCount?: number;
}

const colors = ["#d4af37", "#1a3a5c", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6"];

export function Confetti({ trigger, onComplete, particleCount = 50 }: ConfettiProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!trigger || isActive) return;

    const newPieces: ConfettiPiece[] = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -20,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
      scale: 0.5 + Math.random() * 0.5,
      driftX: (Math.random() - 0.5) * 200,
      duration: 2 + Math.random() * 1,
      isCircle: Math.random() > 0.5,
    }));

    // Différé pour éviter setState synchroniquement dans l'effet
    queueMicrotask(() => {
      setIsActive(true);
      setPieces(newPieces);
    });

    const t = setTimeout(() => {
      setPieces([]);
      setIsActive(false);
      onComplete?.();
    }, 3000);

    return () => clearTimeout(t);
  }, [trigger, isActive, onComplete, particleCount]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {pieces.map((piece) => (
          <motion.div
            key={piece.id}
            initial={{
              x: piece.x,
              y: piece.y,
              rotate: 0,
              scale: 0,
            }}
            animate={{
              x: piece.x + piece.driftX,
              y: window.innerHeight + 50,
              rotate: piece.rotation + 720,
              scale: piece.scale,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: piece.duration,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{
              position: "absolute",
              width: "10px",
              height: "10px",
              backgroundColor: piece.color,
              borderRadius: piece.isCircle ? "50%" : "2px",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
