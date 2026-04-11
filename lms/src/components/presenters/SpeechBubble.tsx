"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface SpeechBubbleProps {
  text: string;
  speaker?: string;
  avatar?: React.ReactNode;
  type?: "speech" | "thought" | "shout" | "whisper";
  duration?: number;
  onComplete?: () => void;
  showTyping?: boolean;
}

export function SpeechBubble({
  text,
  speaker,
  avatar,
  type = "speech",
  duration = 3000,
  onComplete,
  showTyping = true,
}: SpeechBubbleProps) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showBubble, setShowBubble] = useState(true);

  useEffect(() => {
    if (!showTyping) {
      setDisplayText(text);
      setIsTyping(false);
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
        if (onComplete) {
          setTimeout(onComplete, duration);
        }
      }
    }, 30);

    return () => clearInterval(interval);
  }, [text, showTyping, duration, onComplete]);

  const bubbleStyles = {
    speech: "bg-white border-gray-200",
    thought: "bg-blue-50 border-blue-200",
    shout: "bg-amber-50 border-amber-300 border-2",
    whisper: "bg-gray-50 border-gray-300 opacity-80",
  };

  const tailStyles = {
    speech: "border-l-gray-200 border-t-gray-200",
    thought: "border-l-blue-200 border-t-blue-200",
    shout: "border-l-amber-300 border-t-amber-300",
    whisper: "border-l-gray-300 border-t-gray-300",
  };

  return (
    <AnimatePresence>
      {showBubble && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="flex items-start gap-4"
        >
          {avatar && <div className="flex-shrink-0">{avatar}</div>}
          
          <div className="relative max-w-md">
            {/* Speaker name */}
            {speaker && (
              <p className="text-xs font-semibold text-gray-500 mb-1 ml-2">{speaker}</p>
            )}

            {/* Bubble */}
            <div
              className={`relative px-5 py-4 rounded-2xl border-2 shadow-lg ${bubbleStyles[type]}`}
            >
              <p className="text-gray-800 leading-relaxed">
                {displayText}
                {isTyping && (
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-0.5 h-5 bg-gray-400 ml-1 align-middle"
                  />
                )}
              </p>

              {/* Tail */}
              <div
                className={`absolute -left-2 top-6 w-4 h-4 border-l-2 border-t-2 transform rotate-45 bg-inherit ${tailStyles[type]}`}
                style={{ backgroundColor: "inherit" }}
              />
            </div>

            {/* Action buttons */}
            {!isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-2 mt-3 ml-2"
              >
                <button
                  onClick={() => setShowBubble(false)}
                  className="text-xs text-gray-500 hover:text-gray-700 underline"
                >
                  Continuer →
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
