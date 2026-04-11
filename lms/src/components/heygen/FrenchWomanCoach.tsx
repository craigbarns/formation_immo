"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Sparkles, Volume2, Info } from "lucide-react";
import { createFrenchWomanCoachEmbed } from "@/lib/liveavatar";

export function FrenchWomanCoach() {
  const [isOpen, setIsOpen] = useState(false);
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadCoach = async () => {
    if (embedUrl) {
      setIsOpen(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await createFrenchWomanCoachEmbed();
      if (result.ok) {
        setEmbedUrl(result.url);
        setIsOpen(true);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Erreur de connexion au coach");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={loadCoach}
          disabled={loading}
          className="fixed bottom-24 right-6 z-40 flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full shadow-2xl text-white font-bold disabled:opacity-50"
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            <>
              <span className="text-2xl">👩‍🏫</span>
              <span>Marie (IA)</span>
              <Sparkles className="w-5 h-5" />
            </>
          )}
        </motion.button>
      )}

      {/* Coach Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-full max-w-2xl"
          >
            <div className="bg-white rounded-3xl shadow-2xl border-4 border-pink-200 overflow-hidden">
              {/* Header */}
              <div className="p-4 bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-3xl"
                  >
                    👩‍🏫
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Marie</h3>
                    <div className="flex items-center gap-2">
                      <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                      <p className="text-xs text-white/90">Coach IA - 100% Française 🇫🇷</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full">
                    <Volume2 className="w-4 h-4 text-white" />
                    <span className="text-xs text-white font-medium">Voix FR</span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Info banner */}
              <div className="px-4 py-2 bg-pink-50 border-b border-pink-100 flex items-center gap-2">
                <Info className="w-4 h-4 text-pink-500" />
                <p className="text-xs text-pink-700">
                  Je parle UNIQUEMENT en français. Active ton micro pour discuter avec moi !
                </p>
              </div>

              {/* Embed */}
              <div className="aspect-video bg-gray-900">
                {error ? (
                  <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 mb-4 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-2xl">⚠️</span>
                    </div>
                    <p className="text-white font-medium mb-2">Configuration requise</p>
                    <p className="text-gray-400 text-sm mb-4">{error}</p>
                    <code className="text-xs bg-gray-800 p-3 rounded-lg text-gray-300">
                      node scripts/liveavatar-create-french-woman-context.mjs
                    </code>
                  </div>
                ) : embedUrl ? (
                  <iframe
                    src={embedUrl}
                    title="Marie - Coach IA Française"
                    allow="microphone; camera; autoplay; display-capture"
                    className="w-full h-full border-0"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full"
                    />
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-3 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
                <span>🎙️ Autorise l'accès au micro</span>
                <span>🇫🇷 Français uniquement</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
