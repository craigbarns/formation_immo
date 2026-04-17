"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, X, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getConversationHistory, getPersonalizedRecommendation } from "./ai-coach-service";
import { addMessageToMemory, clearCoachMemory, type ChatMessage } from "./ai-coach-storage";

interface AICoachChatProps {
  moduleSlug?: string;
  lessonSlug?: string;
  lessonTitle?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function AICoachChat({ moduleSlug, lessonSlug, lessonTitle, isOpen, onClose }: AICoachChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load conversation history on mount
  useEffect(() => {
    if (isOpen) {
      const history = getConversationHistory();
      if (history.length === 0) {
        // Add initial greeting
        const greeting: ChatMessage = {
          id: "greeting",
          role: "assistant",
          content: "Bonjour ! Je suis Marie, votre coach immobilier personnel. Je peux vous aider à comprendre les concepts de la formation, vous motiver, ou répondre à vos questions sur l'immobilier. Que puis-je faire pour vous ?",
          timestamp: new Date().toISOString(),
        };
        setMessages([greeting]);
      } else {
        setMessages(history);
      }
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);
    setShowRecommendation(false);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: userMessage,
      timestamp: new Date().toISOString(),
      context: { moduleSlug, lessonSlug, lessonTitle },
    };
    const assistantId = `assistant-${Date.now()}`;
    const assistantMsg: ChatMessage = {
      id: assistantId,
      role: "assistant",
      content: "",
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMsg, assistantMsg]);

    try {
      // Build API messages from current conversation (exclude synthetic greeting)
      const apiMessages = [...messages, userMsg]
        .filter(m => m.id !== "greeting")
        .map(m => ({ role: m.role as "user" | "assistant", content: m.content }));

      const response = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages, moduleSlug, lessonSlug, lessonTitle }),
      });

      if (!response.ok || !response.body) throw new Error("Network error");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        accText += chunk;
        setMessages(prev =>
          prev.map(m => m.id === assistantId ? { ...m, content: accText } : m)
        );
      }

      // Persist to local memory
      addMessageToMemory({ role: "user", content: userMessage, context: { moduleSlug, lessonSlug, lessonTitle } });
      addMessageToMemory({ role: "assistant", content: accText });

    } catch {
      setMessages(prev =>
        prev.map(m => m.id === assistantId
          ? { ...m, content: "Désolée, j'ai rencontré un problème technique. Réessayez dans un instant !" }
          : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    clearCoachMemory();
    setMessages([{
      id: "greeting",
      role: "assistant",
      content: "Conversation effacée. Comment puis-je vous aider ?",
      timestamp: new Date().toISOString(),
    }]);
  };

  const recommendation = getPersonalizedRecommendation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Chat Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="relative flex h-[80vh] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-brand-gold/30 bg-[#0f1f33] shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-brand-navy to-[#0f1f33] px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-gold to-[#f0c040] text-brand-navy">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-white">Marie, votre coach</h3>
              <p className="text-[10px] text-white/70">Propulsée par IA • En ligne</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleClearChat}
              className="rounded-full p-2 text-on-dark-muted hover:bg-white/10 hover:text-white"
              title="Effacer la conversation"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-on-dark-muted hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  msg.role === "user" 
                    ? "bg-white/10 text-white" 
                    : "bg-gradient-to-br from-brand-gold to-[#f0c040] text-brand-navy"
                }`}>
                  {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                  msg.role === "user"
                    ? "bg-brand-gold/20 text-white"
                    : "bg-white/10 text-white/90"
                }`}>
                  {msg.content.split("\n").map((line, i) => (
                    <p key={i} className={i > 0 ? "mt-2" : ""}>
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Personalized Recommendation */}
          {showRecommendation && messages.length <= 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl border border-brand-gold/20 bg-brand-gold/5 p-3"
            >
              <div className="flex items-center gap-2 text-brand-gold">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs font-semibold">Suggestion personnalisée</span>
              </div>
              <p className="mt-1 text-xs text-white/70">{recommendation}</p>
            </motion.div>
          )}
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-on-dark-muted"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-gold to-[#f0c040]">
                <Bot className="h-4 w-4 text-brand-navy" />
              </div>
              <div className="flex gap-1">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>.</span>
                <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-white/10 bg-white/5 p-4">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Posez votre question..."
              className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/30 focus:border-brand-gold/50 focus:outline-none focus:ring-1 focus:ring-brand-gold/30"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold text-brand-navy transition hover:bg-[#e0bf4d] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-[10px] text-center text-white/50">
            Marie est une IA expérimentale. Vérifiez les informations importantes.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
