"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Bot, User, Volume2, VolumeX, Mic, MicOff } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
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

export function CoachChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Salut ! Je suis Marie, ton coach immobilier. Pose-moi une question sur les fiches que tu consultes — juridique, financement, négociation, je suis là !",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streaming, setStreaming] = useState("");
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognitionType | null>(null);

  // ── Web Audio (sequential TTS queue) ──
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isProcessingTTSRef = useRef(false);
  const pendingTTSRef = useRef<string[]>([]);

  useEffect(() => {
    const supported = typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);
    setSpeechSupported(supported);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, streaming]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
      pendingTTSRef.current = [];
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  const ensureAudioContext = useCallback(() => {
    if (!audioCtxRef.current) audioCtxRef.current = getAudioContext();
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") audioCtxRef.current.resume();
    return audioCtxRef.current;
  }, []);

  const processNextTTS = useCallback(async () => {
    if (isProcessingTTSRef.current || pendingTTSRef.current.length === 0) return;
    isProcessingTTSRef.current = true;
    const rawText = pendingTTSRef.current.shift()!;
    const text = cleanForTTS(rawText);
    if (!text) { isProcessingTTSRef.current = false; processNextTTS(); return; }
    const ctx = ensureAudioContext();
    if (!ctx) { isProcessingTTSRef.current = false; processNextTTS(); return; }
    try {
      const res = await fetch("/api/tts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: cleanForTTS(text) }) });
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

  const startListening = useCallback(() => {
    ensureAudioContext();
    if (!speechSupported) return;
    const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) return;
    const recognition = new SpeechRecognitionCtor();
    recognition.lang = "fr-FR"; recognition.continuous = false; recognition.interimResults = true; recognition.maxAlternatives = 1;
    let finalTranscript = "";
    recognition.onstart = () => { setIsListening(true); setAudioError(null); };
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const t = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += t; else interim += t;
      }
      setInput(finalTranscript + interim);
    };
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error !== "aborted" && event.error !== "no-speech") setAudioError("Micro : " + event.error);
      setIsListening(false);
    };
    recognition.onend = () => {
      setIsListening(false);
      if (finalTranscript.trim()) { setInput(finalTranscript.trim()); setAutoSpeak(true); }
    };
    recognitionRef.current = recognition;
    recognition.start();
  }, [speechSupported, ensureAudioContext]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) { recognitionRef.current.stop(); recognitionRef.current = null; }
    setIsListening(false);
  }, []);

  const speak = useCallback(async (text: string, index: number) => {
    if (playingIndex === index) { setPlayingIndex(null); return; }
    setPlayingIndex(index); setAudioError(null);
    const ctx = ensureAudioContext();
    if (!ctx) { setAudioError("Audio non supporté"); setPlayingIndex(null); return; }
    try {
      const res = await fetch("/api/tts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }) });
      if (!res.ok) { setAudioError(`Erreur vocale (${res.status})`); setPlayingIndex(null); return; }
      const audioBuffer = await ctx.decodeAudioData((await res.arrayBuffer()).slice(0));
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      source.onended = () => setPlayingIndex(null);
      source.start();
    } catch { setAudioError("Erreur lecture audio"); setPlayingIndex(null); }
  }, [playingIndex, ensureAudioContext]);

  async function handleSend() {
    ensureAudioContext();
    if (!input.trim() || isLoading) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    const allMessages = [...messages, userMsg];
    setMessages(allMessages); setInput(""); setIsLoading(true); setStreaming(""); setAudioError(null);
    let ttsBuffer = ""; const spokenSentences = new Set<string>();
    try {
      const res = await fetch("/api/coach", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: allMessages.map(m => ({ role: m.role, content: m.content })), moduleSlug: "supports-visuels", lessonSlug: "fiches", lessonTitle: "Supports visuels & fiches opérationnelles" }),
      });
      if (!res.ok || !res.body) { setMessages(p => [...p, { role: "assistant", content: "Oups, une erreur est survenue. Réessaie dans un instant !" }]); setIsLoading(false); return; }
      const reader = res.body.getReader(); const decoder = new TextDecoder(); let full = "";
      while (true) {
        const { done, value } = await reader.read(); if (done) break;
        const chunk = decoder.decode(value, { stream: true }); full += chunk; setStreaming(full);
        if (autoSpeak) {
          ttsBuffer += chunk;
          const parts = ttsBuffer.split(/(?<=[.!?])\s+/);
          ttsBuffer = parts.pop() || "";
          for (const part of parts) {
            const sentence = part.trim();
            if (sentence.length > 3 && !spokenSentences.has(sentence)) { spokenSentences.add(sentence); enqueueTTS(sentence); }
          }
        }
      }
      const remaining = ttsBuffer.trim();
      if (autoSpeak && remaining.length > 0 && !spokenSentences.has(remaining)) enqueueTTS(remaining);
      setMessages(p => [...p, { role: "assistant", content: full }]); setStreaming("");
    } catch { setMessages(p => [...p, { role: "assistant", content: "Oups, une erreur est survenue. Réessaie dans un instant !" }]); }
    finally { setIsLoading(false); }
  }

  useEffect(() => {
    if (!isListening && input.trim() && !isLoading && autoSpeak) {
      const timer = setTimeout(() => handleSend(), 600);
      return () => clearTimeout(timer);
    }
  }, [isListening, input, isLoading, autoSpeak]);

  return (
    <>
      <button onClick={() => setIsOpen(o => !o)} className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-all duration-300 hover:scale-110 ${isOpen ? "bg-zinc-800 text-white" : "bg-brand-navy text-white hover:bg-brand-navy/90"}`} aria-label={isOpen ? "Fermer" : "Ouvrir"}>
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!isOpen && <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-gold text-[10px] font-bold text-brand-navy">IA</span>}
      </button>
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex w-[22rem] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-3 bg-gradient-to-r from-brand-navy to-[#244b75] px-5 py-4 text-white">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15"><Bot className="h-5 w-5" /></div>
            <div className="flex-1"><p className="text-sm font-bold">Coach Marie</p><p className="text-[11px] text-white/70">Expert immobilier IA</p></div>
            <button onClick={() => setAutoSpeak(a => !a)} className={`rounded-lg p-1.5 transition-colors ${autoSpeak ? "bg-brand-gold text-brand-navy" : "text-white/70 hover:bg-white/10"}`}>{autoSpeak ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}</button>
            <button onClick={() => setIsOpen(false)} className="rounded-lg p-1 text-white/70 hover:bg-white/10"><X className="h-4 w-4" /></button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 p-4 max-h-80">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${m.role === "user" ? "bg-brand-navy/10 text-brand-navy" : "bg-brand-gold/15 text-brand-gold"}`}>{m.role === "user" ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}</div>
                <div className="flex max-w-[80%] flex-col gap-1">
                  <div className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${m.role === "user" ? "bg-brand-navy text-white rounded-br-sm" : "bg-zinc-100 text-zinc-800 rounded-bl-sm"}`}>{m.content}</div>
                  {m.role === "assistant" && (
                    <button onClick={() => speak(m.content, i)} className={`self-start flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${playingIndex === i ? "bg-brand-gold/20 text-brand-gold animate-pulse" : "text-zinc-500 hover:text-brand-navy hover:bg-zinc-100"}`}>
                      <Volume2 className={`h-3.5 w-3.5 ${playingIndex === i ? "animate-bounce" : ""}`} />{playingIndex === i ? "Lecture..." : "Écouter Marie"}
                    </button>
                  )}
                </div>
              </div>
            ))}
            {streaming && <div className="flex gap-2 flex-row"><div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold"><Bot className="h-3.5 w-3.5" /></div><div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-zinc-100 px-3.5 py-2.5 text-sm text-zinc-800">{streaming}<span className="inline-block h-2 w-2 animate-pulse rounded-full bg-brand-navy/40 ml-1" /></div></div>}
            {isLoading && !streaming && <div className="flex gap-2 flex-row"><div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold"><Bot className="h-3.5 w-3.5" /></div><div className="rounded-2xl rounded-bl-sm bg-zinc-100 px-4 py-3 text-sm text-zinc-500"><span className="inline-block h-2 w-2 animate-bounce rounded-full bg-brand-navy/40" /><span className="ml-1 inline-block h-2 w-2 animate-bounce rounded-full bg-brand-navy/40 [animation-delay:0.15s]" /><span className="ml-1 inline-block h-2 w-2 animate-bounce rounded-full bg-brand-navy/40 [animation-delay:0.3s]" /></div></div>}
            {audioError && <div className="mx-4 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 text-center">{audioError}</div>}
          </div>
          <div className="flex items-center gap-2 border-t border-zinc-100 p-3">
            {speechSupported && <button onClick={isListening ? stopListening : startListening} className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition ${isListening ? "bg-red-500 text-white animate-pulse" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"}`}>{isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}</button>}
            <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSend()} placeholder={isListening ? "Écoute..." : "Pose ta question..."} disabled={isListening} className="flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none focus:border-brand-navy/30 focus:bg-white disabled:opacity-50" />
            <button onClick={handleSend} disabled={!input.trim() || isLoading || isListening} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-navy text-white hover:bg-brand-navy/90 disabled:opacity-40"><Send className="h-4 w-4" /></button>
          </div>
          {speechSupported && <p className="pb-2 text-center text-[10px] text-zinc-400">🎤 Clique sur le micro pour parler à Marie</p>}
        </div>
      )}
    </>
  );
}
