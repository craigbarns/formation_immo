"use client";

import { motion } from "framer-motion";
import { AnimatedAvatar } from "./AnimatedAvatar";
import { SpeechBubble } from "./SpeechBubble";
import { useState, useEffect } from "react";

interface Message {
  id: string;
  text: string;
  expression?: "neutral" | "happy" | "thinking" | "excited" | "focused";
}

interface PresenterCardProps {
  name: string;
  role: string;
  color: string;
  emoji: string;
  messages: Message[];
  autoPlay?: boolean;
  delay?: number;
}

export function PresenterCard({
  name,
  role,
  color,
  emoji,
  messages,
  autoPlay = true,
  delay = 1000,
}: PresenterCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [expression, setExpression] = useState<Message["expression"]>("neutral");

  useEffect(() => {
    if (!autoPlay || messages.length === 0) return;

    const timer = setTimeout(() => {
      setIsSpeaking(true);
      setExpression(messages[currentIndex].expression || "neutral");
    }, delay);

    return () => clearTimeout(timer);
  }, [currentIndex, autoPlay, delay, messages]);

  const handleMessageComplete = () => {
    setIsSpeaking(false);
    setExpression("neutral");
    
    if (currentIndex < messages.length - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 500);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 shadow-xl border border-gray-100">
      <div className="flex items-start gap-6">
        {/* Animated Avatar */}
        <AnimatedAvatar
          name={name}
          role={role}
          color={color}
          emoji={emoji}
          isSpeaking={isSpeaking}
          expression={expression}
          size="lg"
        />

        {/* Speech area */}
        <div className="flex-1 min-h-[200px]">
          {messages.length > 0 && currentIndex < messages.length && (
            <SpeechBubble
              key={messages[currentIndex].id}
              text={messages[currentIndex].text}
              speaker={name}
              type="speech"
              onComplete={handleMessageComplete}
              showTyping={isSpeaking}
            />
          )}

          {/* Progress indicator */}
          {messages.length > 1 && (
            <div className="flex gap-1 mt-4">
              {messages.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-1 rounded-full ${
                    index <= currentIndex ? "bg-brand-navy" : "bg-gray-200"
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: index <= currentIndex ? 24 : 16 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Stats badge */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-3">
          <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
            {messages.length} messages
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
            Module actif
          </span>
        </div>

        {/* Navigation */}
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 transition"
          >
            ←
          </button>
          <button
            onClick={() => setCurrentIndex(Math.min(messages.length - 1, currentIndex + 1))}
            disabled={currentIndex === messages.length - 1}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 transition"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
