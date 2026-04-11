"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, X, RotateCcw } from "lucide-react";
import { COACH_IDENTITY, WELCOME_MESSAGE, QUICK_RESPONSES, ENGLISH_TO_FRENCH } from "@/lib/coach/french-coach";

interface Message {
  id: string;
  role: "user" | "coach";
  content: string;
  timestamp: Date;
}

function generateCoachResponse(userMessage: string): string {
  const lowerMsg = userMessage.toLowerCase();
  
  const englishWords = Object.keys(ENGLISH_TO_FRENCH);
  const hasEnglish = englishWords.some(word => lowerMsg.includes(word));
  
  if (hasEnglish) {
    return "Je vois que tu as utilisé des termes anglais ! 🇫🇷 En France, on dit plutôt : " + 
      englishWords.filter(w => lowerMsg.includes(w))
        .map(w => `"${ENGLISH_TO_FRENCH[w]}" au lieu de "${w}"`)
        .join(", ");
  }
  
  if (lowerMsg.includes("mandat") || lowerMsg.includes("exclusif")) {
    return "Excellent sujet ! Le mandat exclusif est une vraie force 💪 Il donne 3 avantages clés : une commission garantie, un accompagnement total du vendeur, et une vraie stratégie de vente ! Tu veux que je te détaille ?";
  }
  
  if (lowerMsg.includes("alur") || lowerMsg.includes("loi")) {
    return "La loi ALUR, c'est notre bible ! 📚 Elle encadre tout : les honoraires, les diagnostics, les mandats... L'essentiel à retenir : transparence totale et protection du consommateur. Tu as une question précise ?";
  }
  
  if (lowerMsg.includes("négociation") || lowerMsg.includes("prix")) {
    return "La négociation, c'est un art ! 🎯 Le secret : écouter avant de parler, comprendre les vraies motivations du vendeur, et apporter des arguments chiffrés. Jamais baisser les prix sans contrepartie !";
  }
  
  if (lowerMsg.includes("visite") || lowerMsg.includes("acheteur")) {
    return "Les visites, c'est là que tout se joue ! 🏠 Astuce d'or : préparer un parcours logique, mettre en valeur les points forts dès l'entrée, et créer une vraie connexion émotionnelle. Tu veux mes 5 étapes ?";
  }
  
  if (lowerMsg.includes("bonjour") || lowerMsg.includes("salut")) {
    const greetings = QUICK_RESPONSES.greeting;
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
  
  const encouragements = QUICK_RESPONSES.encouragement;
  return encouragements[Math.floor(Math.random() * encouragements.length)] + 
    "\n\nTu peux me demander des précisions sur : les mandats, la loi ALUR, la négociation, les visites, le financement... 🏠";
}

export function FrenchCoach() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "coach", content: WELCOME_MESSAGE, timestamp: new Date() },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const coachResponse = generateCoachResponse(userMsg.content);
      const coachMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "coach",
        content: coachResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, coachMsg]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleReset = () => {
    setMessages([{ id: "welcome", role: "coach", content: WELCOME_MESSAGE, timestamp: new Date() }]);
  };

  return (
    <>
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }} animate={{ scale: 1 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-full shadow-2xl bg-brand-gold"
        >
          <span className="text-2xl">{COACH_IDENTITY.avatar}</span>
          <span className="font-bold text-white">Parler avec Marie</span>
          <Sparkles className="w-5 h-5 text-white" />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-full max-w-md"
          >
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="p-4 flex items-center justify-between bg-brand-gold">
                <div className="flex items-center gap-3">
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-3xl">
                    {COACH_IDENTITY.avatar}
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-white">{COACH_IDENTITY.name}</h3>
                    <p className="text-xs text-white/80">{COACH_IDENTITY.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={handleReset} className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition">
                    <RotateCcw className="w-4 h-4 text-white" />
                  </button>
                  <button onClick={() => setIsOpen(false)} className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition">
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl whitespace-pre-wrap ${
                        msg.role === "user" ? "bg-brand-navy text-white rounded-br-none" : "bg-white border-2 border-brand-gold rounded-bl-none shadow-sm"
                      }`}
                    >
                      {msg.role === "coach" && <p className="text-xs font-semibold mb-1 text-brand-gold">{COACH_IDENTITY.name}</p>}
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                    <div className="flex gap-1 p-3 bg-white rounded-2xl shadow-sm">
                      {[0, 1, 2].map((i) => (
                        <motion.div key={i} animate={{ y: [0, -5, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }} className="w-2 h-2 rounded-full bg-brand-gold" />
                      ))}
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 bg-white border-t">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Pose ta question..."
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="p-3 rounded-xl bg-brand-gold text-white transition disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">🇫🇷 Je réponds uniquement en français</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
