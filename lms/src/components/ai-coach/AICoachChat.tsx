"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Bot, User, Sparkles, X, RotateCcw, Volume2, VolumeX, Mic, MicOff } from "lucide-react";
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

// Web Speech API — minimal types for build
type SpeechRecognitionEvent = {
  resultIndex: number;
  results: {
    [index: number]: {
      [index: number]: { transcript: string };
      isFinal: boolean;
    };
    length: number;
  };
};

type SpeechRecognitionErrorEvent = {
  error: string;
};

type SpeechRecognitionType = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionType;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

/* ─── Web Audio API helper ─── */
function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AC = (window as any).AudioContext || (window as any).webkitAudioContext;
  return AC ? new AC() : null;
}

function cleanForTTS(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")     // **gras** → gras
    .replace(/\*(.*?)\*/g, "$1")          // *italique* → italique
    .replace(/\n\d+\.\s*/g, ". ")        // "1. " "2. " → pause
    .replace(/\n-\s*/g, ". ")            // "- " → pause
    .replace(/\n#/g, ". ")               // titres markdown
    .replace(/\n\n/g, ". ")              // paragraphes
    .replace(/\n/g, " ")                  // retours ligne simples
    .replace(/:\s*/g, ", ")               // deux-points → virgule
    .replace(/;\s*/g, ", ")               // point-virgule → virgule
    .replace(/\s+/g, " ")                 // espaces multiples
    .trim();
}

export function AICoachChat({ moduleSlug, lessonSlug, lessonTitle, isOpen, onClose }: AICoachChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(true);
  const [playingIndex, setPlayingIndex] = useState<string | null>(null);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognitionType | null>(null);

  // ── Web Audio (sequential TTS queue) ──
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isProcessingTTSRef = useRef(false);
  const pendingTTSRef = useRef<string[]>([]);

  const ensureAudioContext = useCallback(() => {
    if (!audioCtxRef.current) audioCtxRef.current = getAudioContext();
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") audioCtxRef.current.resume();
    return audioCtxRef.current;
  }, []);

  const loadServerHistory = useCallback(async () => {
    try {
      const res = await fetch(`/api/coach/history?moduleSlug=${encodeURIComponent(moduleSlug || '')}&lessonSlug=${encodeURIComponent(lessonSlug || '')}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.messages?.length > 0) {
        setMessages(data.messages.map((m: any) => ({
          id: m.id,
          role: m.role,
          content: m.content,
          timestamp: m.created_at,
        })));
        return;
      }
    } catch {
      // fallback to localStorage
    }
    const history = getConversationHistory();
    if (history.length === 0) {
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
  }, [moduleSlug, lessonSlug]);

  const saveServerMessage = useCallback(async (role: "user" | "assistant", content: string) => {
    try {
      await fetch("/api/coach/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, content, moduleSlug, lessonSlug, lessonTitle }),
      });
    } catch {
      // silent fail — localStorage fallback already handles this
    }
  }, [moduleSlug, lessonSlug, lessonTitle]);

  const processNextTTS = useCallback(async () => {
    if (isProcessingTTSRef.current || pendingTTSRef.current.length === 0) return;
    isProcessingTTSRef.current = true;
    const rawText = pendingTTSRef.current.shift()!;
    const text = cleanForTTS(rawText);
    if (!text) { isProcessingTTSRef.current = false; processNextTTS(); return; }
    const ctx = ensureAudioContext();
    if (!ctx) { isProcessingTTSRef.current = false; processNextTTS(); return; }
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: cleanForTTS(text) }),
      });
      if (!res.ok) { isProcessingTTSRef.current = false; processNextTTS(); return; }
      const audioBuffer = await ctx.decodeAudioData((await res.arrayBuffer()).slice(0));
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      source.onended = () => { isProcessingTTSRef.current = false; processNextTTS(); };
      source.start();
    } catch {
      isProcessingTTSRef.current = false;
      processNextTTS();
    }
  }, [ensureAudioContext]);

  const enqueueTTS = useCallback((text: string) => {
    pendingTTSRef.current.push(text);
    processNextTTS();
  }, [processNextTTS]);

  // Check speech recognition support
  useEffect(() => {
    const supported = typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);
    setSpeechSupported(supported);
  }, []);

  // Load conversation history on mount
  useEffect(() => {
    if (isOpen) {
      loadServerHistory();
      inputRef.current?.focus();
    }
  }, [isOpen, loadServerHistory]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // (streaming TTS handles auto-speak — no fallback needed)

  // Cleanup
  useEffect(() => {
    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
      pendingTTSRef.current = [];
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  const startListening = useCallback(() => {
    ensureAudioContext(); // unlock on user gesture
    if (!speechSupported) return;
    const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) return;
    const recognition = new SpeechRecognitionCtor();
    recognition.lang = "fr-FR";
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    let finalTranscript = "";

    recognition.onstart = () => {
      setIsListening(true);
      setAudioError(null);
    };
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += transcript;
        else interim += transcript;
      }
      setInput(finalTranscript + interim);
    };
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error !== "aborted" && event.error !== "no-speech") {
        setAudioError("Micro : " + event.error);
      }
      setIsListening(false);
    };
    recognition.onend = () => {
      setIsListening(false);
      if (finalTranscript.trim()) {
        setInput(finalTranscript.trim());
        setAutoSpeak(true);
      }
    };
    recognitionRef.current = recognition;
    recognition.start();
  }, [speechSupported, ensureAudioContext]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, []);

  const speak = useCallback(async (text: string, msgId: string) => {
    if (playingIndex === msgId) {
      setPlayingIndex(null);
      return;
    }
    setPlayingIndex(msgId);
    setAudioError(null);

    const ctx = ensureAudioContext();
    if (!ctx) {
      setAudioError("Audio non supporté");
      setPlayingIndex(null);
      return;
    }

    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) {
        setAudioError(`Erreur vocale (${res.status})`);
        setPlayingIndex(null);
        return;
      }
      const arrayBuffer = await res.arrayBuffer();
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer.slice(0));
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      source.onended = () => setPlayingIndex(null);
      source.start();
    } catch {
      setAudioError("Erreur lecture audio");
      setPlayingIndex(null);
    }
  }, [playingIndex, ensureAudioContext]);

  const handleSend = useCallback(async () => {
    ensureAudioContext(); // unlock on user gesture
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);
    setShowRecommendation(false);
    setAudioError(null);

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
    saveServerMessage("user", userMessage);

    let ttsBuffer = "";
    const spokenSentences = new Set<string>();

    try {
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

        if (autoSpeak) {
          ttsBuffer += chunk;
          const parts = ttsBuffer.split(/(?<=[.!?])\s+/);
          ttsBuffer = parts.pop() || "";
          for (const part of parts) {
            const sentence = part.trim();
            if (sentence.length > 3 && !spokenSentences.has(sentence)) {
              spokenSentences.add(sentence);
              enqueueTTS(sentence);
            }
          }
        }
      }

      // Flush remaining text (even short fragments)
      const remaining = ttsBuffer.trim();
      if (autoSpeak && remaining.length > 0 && !spokenSentences.has(remaining)) {
        enqueueTTS(remaining);
      }

      addMessageToMemory({ role: "user", content: userMessage, context: { moduleSlug, lessonSlug, lessonTitle } });
      addMessageToMemory({ role: "assistant", content: accText });
      saveServerMessage("assistant", accText);

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
  }, [input, isLoading, messages, moduleSlug, lessonSlug, lessonTitle, autoSpeak, enqueueTTS, ensureAudioContext, saveServerMessage]);

  // Auto-send after voice input
  useEffect(() => {
    if (!isListening && input.trim() && !isLoading && autoSpeak) {
      const timer = setTimeout(() => handleSend(), 600);
      return () => clearTimeout(timer);
    }
  }, [isListening, input, isLoading, autoSpeak, handleSend]);

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
    setPlayingIndex(null);
    setAutoSpeak(false);
    pendingTTSRef.current = [];
  };

  const recommendation = getPersonalizedRecommendation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="relative flex h-[80vh] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-brand-gold/30 bg-[#0f1f33] shadow-2xl"
      >
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
              onClick={() => setAutoSpeak(a => !a)}
              title={autoSpeak ? "Désactiver la voix auto" : "Activer la voix auto"}
              className={`rounded-full p-2 transition ${
                autoSpeak ? "bg-brand-gold text-brand-navy" : "text-white/50 hover:bg-white/10 hover:text-white"
              }`}
            >
              {autoSpeak ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
            <button onClick={handleClearChat} className="rounded-full p-2 text-white/50 hover:bg-white/10 hover:text-white transition" title="Effacer la conversation">
              <RotateCcw className="h-4 w-4" />
            </button>
            <button onClick={onClose} className="rounded-full p-2 text-white/50 hover:bg-white/10 hover:text-white transition">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${msg.role === "user" ? "bg-white/10 text-white" : "bg-gradient-to-br from-brand-gold to-[#f0c040] text-brand-navy"}`}>
                  {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className="flex max-w-[80%] flex-col gap-1.5">
                  <div className={`rounded-2xl px-4 py-2 text-sm ${msg.role === "user" ? "bg-brand-gold/20 text-white" : "bg-white/10 text-white/90"}`}>
                    {msg.content.split("\n").map((line, i) => <p key={i} className={i > 0 ? "mt-2" : ""}>{line}</p>)}
                  </div>
                  {msg.role === "assistant" && msg.content.length > 5 && (
                    <button onClick={() => speak(msg.content, msg.id)} className={`self-start flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${playingIndex === msg.id ? "bg-brand-gold/20 text-brand-gold animate-pulse" : "text-white/40 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10"}`}>
                      <Volume2 className={`h-3.5 w-3.5 ${playingIndex === msg.id ? "animate-bounce" : ""}`} />
                      {playingIndex === msg.id ? "Lecture en cours..." : "Écouter Marie"}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {showRecommendation && messages.length <= 2 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-xl border border-brand-gold/20 bg-brand-gold/5 p-3">
              <div className="flex items-center gap-2 text-brand-gold"><Sparkles className="h-4 w-4" /><span className="text-xs font-semibold">Suggestion personnalisée</span></div>
              <p className="mt-1 text-xs text-white/70">{recommendation}</p>
            </motion.div>
          )}
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-on-dark-muted">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-gold to-[#f0c040]"><Bot className="h-4 w-4 text-brand-navy" /></div>
              <div className="flex gap-1"><span className="animate-bounce">.</span><span className="animate-bounce" style={{ animationDelay: "0.1s" }}>.</span><span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span></div>
            </motion.div>
          )}
          {audioError && <div className="rounded-lg bg-red-500/10 px-3 py-2 text-xs text-red-300 text-center">{audioError}</div>}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-white/10 bg-white/5 p-4">
          <div className="flex gap-2">
            {speechSupported && (
              <button onClick={isListening ? stopListening : startListening} title={isListening ? "Arrêter l'écoute" : "Parler à Marie (microphone)"} className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${isListening ? "bg-red-500 text-white animate-pulse" : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"}`}>
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>
            )}
            <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder={isListening ? "Écoute en cours..." : "Posez votre question..."} disabled={isListening} className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/30 focus:border-brand-gold/50 focus:outline-none focus:ring-1 focus:ring-brand-gold/30 disabled:opacity-50" />
            <button onClick={handleSend} disabled={!input.trim() || isLoading || isListening} className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold text-brand-navy transition hover:bg-[#e0bf4d] disabled:opacity-50 disabled:cursor-not-allowed"><Send className="h-4 w-4" /></button>
          </div>
          <p className="mt-2 text-[10px] text-center text-white/50">{speechSupported ? "🎤 Cliquez sur le micro pour parler à Marie • Elle vous répondra à voix haute en temps réel" : "Marie est une IA expérimentale. Vérifiez les informations importantes."}</p>
        </div>
      </motion.div>
    </div>
  );
}
