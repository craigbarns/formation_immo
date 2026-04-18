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

export function CoachChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Salut ! Je suis Marie, ton coach immobilier. Pose-moi une question sur les fiches que tu consultes — juridique, financement, négociation, je suis là !",
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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<SpeechRecognitionType | null>(null);

  useEffect(() => {
    const supported = typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);
    setSpeechSupported(supported);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streaming]);

  // Auto-speak when a new assistant message arrives
  useEffect(() => {
    if (autoSpeak && !isLoading && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.role === "assistant" && lastMsg.content.length > 10) {
        speak(lastMsg.content, messages.length - 1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length, isLoading]);

  // Cleanup speech recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Auto-send after voice input
  useEffect(() => {
    if (!isListening && input.trim() && !isLoading && autoSpeak) {
      const timer = setTimeout(() => {
        handleSend();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isListening, input, isLoading, autoSpeak]);

  const startListening = useCallback(() => {
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
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interim += transcript;
        }
      }
      setInput(finalTranscript + interim);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
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
  }, [speechSupported]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, []);

  async function speak(text: string, index: number) {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    if (playingIndex === index) {
      setPlayingIndex(null);
      return;
    }

    setPlayingIndex(index);
    setAudioError(null);

    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) {
        const err = await res.text();
        console.error("TTS error:", res.status, err);
        setAudioError(`Erreur vocale (${res.status})`);
        setPlayingIndex(null);
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => {
        setPlayingIndex(null);
        URL.revokeObjectURL(url);
        audioRef.current = null;
      };
      audio.onerror = () => {
        console.error("Audio play error");
        setPlayingIndex(null);
        URL.revokeObjectURL(url);
        audioRef.current = null;
      };
      await audio.play();
    } catch {
      setAudioError("Erreur lecture audio");
      setPlayingIndex(null);
    }
  }

  async function handleSend() {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setInput("");
    setIsLoading(true);
    setStreaming("");
    setAudioError(null);

    try {
      const res = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: allMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          moduleSlug: "supports-visuels",
          lessonSlug: "fiches",
          lessonTitle: "Supports visuels & fiches opérationnelles",
        }),
      });

      if (!res.ok || !res.body) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Oups, une erreur est survenue. Réessaie dans un instant !" },
        ]);
        setIsLoading(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        full += chunk;
        setStreaming(full);
      }

      setMessages((prev) => [...prev, { role: "assistant", content: full }]);
      setStreaming("");
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Oups, une erreur est survenue. Réessaie dans un instant !" },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-all duration-300 hover:scale-110 ${
          isOpen
            ? "bg-zinc-800 text-white rotate-0"
            : "bg-brand-navy text-white hover:bg-brand-navy/90"
        }`}
        aria-label={isOpen ? "Fermer le chat" : "Ouvrir le coach IA"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!isOpen && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-gold text-[10px] font-bold text-brand-navy">
            IA
          </span>
        )}
      </button>

      {/* Fenêtre de chat */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex w-[22rem] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-brand-navy to-[#244b75] px-5 py-4 text-white">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
              <Bot className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold">Coach Marie</p>
              <p className="text-[11px] text-white/70">Expert immobilier IA</p>
            </div>
            <button
              onClick={() => setAutoSpeak((a) => !a)}
              title={autoSpeak ? "Désactiver la voix auto" : "Activer la voix auto"}
              className={`rounded-lg p-1.5 transition-colors ${
                autoSpeak
                  ? "bg-brand-gold text-brand-navy"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {autoSpeak ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 p-4 max-h-80">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    m.role === "user" ? "bg-brand-navy/10 text-brand-navy" : "bg-brand-gold/15 text-brand-gold"
                  }`}
                >
                  {m.role === "user" ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                </div>
                <div className="flex max-w-[80%] flex-col gap-1">
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-brand-navy text-white rounded-br-sm"
                        : "bg-zinc-100 text-zinc-800 rounded-bl-sm"
                    }`}
                  >
                    {m.content}
                  </div>
                  {m.role === "assistant" && (
                    <button
                      onClick={() => speak(m.content, i)}
                      className={`self-start flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all ${
                        playingIndex === i
                          ? "bg-brand-gold/20 text-brand-gold animate-pulse"
                          : "text-zinc-500 hover:text-brand-navy hover:bg-zinc-100 border border-transparent hover:border-zinc-200"
                      }`}
                    >
                      <Volume2 className={`h-3.5 w-3.5 ${playingIndex === i ? "animate-bounce" : ""}`} />
                      {playingIndex === i ? "Lecture en cours..." : "Écouter Marie"}
                    </button>
                  )}
                </div>
              </div>
            ))}
            {streaming && (
              <div className="flex gap-2 flex-row">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold">
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-zinc-100 px-3.5 py-2.5 text-sm leading-relaxed text-zinc-800">
                  {streaming}
                  <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-brand-navy/40 ml-1" />
                </div>
              </div>
            )}
            {isLoading && !streaming && (
              <div className="flex gap-2 flex-row">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold">
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <div className="rounded-2xl rounded-bl-sm bg-zinc-100 px-4 py-3 text-sm text-zinc-500">
                  <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-brand-navy/40" />
                  <span className="ml-1 inline-block h-2 w-2 animate-bounce rounded-full bg-brand-navy/40 [animation-delay:0.15s]" />
                  <span className="ml-1 inline-block h-2 w-2 animate-bounce rounded-full bg-brand-navy/40 [animation-delay:0.3s]" />
                </div>
              </div>
            )}
            {audioError && (
              <div className="mx-4 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600 text-center">
                {audioError}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-zinc-100 p-3">
            {speechSupported && (
              <button
                onClick={isListening ? stopListening : startListening}
                title={isListening ? "Arrêter l'écoute" : "Parler à Marie"}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition ${
                  isListening
                    ? "bg-red-500 text-white animate-pulse"
                    : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700"
                }`}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>
            )}
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={isListening ? "Écoute en cours..." : "Pose ta question..."}
              disabled={isListening}
              className="flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm outline-none transition-colors focus:border-brand-navy/30 focus:bg-white disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading || isListening}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-navy text-white transition-all hover:bg-brand-navy/90 disabled:opacity-40 disabled:hover:bg-brand-navy"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          {speechSupported && (
            <p className="pb-2 text-center text-[10px] text-zinc-400">
              🎤 Cliquez sur le micro pour parler à Marie
            </p>
          )}
        </div>
      )}
    </>
  );
}
