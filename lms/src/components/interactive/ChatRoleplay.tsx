"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatRoleplayScenario } from "@/data/chat-roleplay";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, User, RotateCcw, Send, Sparkles } from "lucide-react";

type Line = { role: "client" | "vous"; text: string };

export function ChatRoleplay({ scenario }: { scenario: ChatRoleplayScenario }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [pendingChoose, setPendingChoose] = useState<{
    prompt: string;
    options: { label: string; next: string }[];
  } | null>(null);
  const [finished, setFinished] = useState(false);
  const runRef = useRef(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines, pendingChoose]);

  // Ref vers la dernière version de `follow` pour permettre l'auto-référence
  // dans les setTimeout sans déclencher react-hooks/immutability.
  const followRef = useRef<(id: string) => void>(() => {});

  const follow = useCallback(
    (id: string) => {
      const n = scenario.nodes[id];
      if (!n) return;

      if (n.kind === "client") {
        setLines((prev) => [...prev, { role: "client", text: n.text }]);
        const nx = scenario.nodes[n.next];
        if (!nx) return;
        if (nx.kind === "choose") {
          const tid = ++runRef.current;
          setTimeout(() => {
            if (tid !== runRef.current) return;
            setPendingChoose({ prompt: nx.prompt, options: nx.options });
          }, 600);
        } else if (nx.kind === "end") {
          const tid = ++runRef.current;
          setTimeout(() => {
            if (tid !== runRef.current) return;
            setLines((prev) => [...prev, { role: "client", text: nx.text }]);
            setFinished(true);
          }, 600);
        } else if (nx.kind === "client") {
          const tid = ++runRef.current;
          setTimeout(() => {
            if (tid !== runRef.current) return;
            followRef.current(nx.id);
          }, 800);
        }
      } else if (n.kind === "end") {
        setLines((prev) => [...prev, { role: "client", text: n.text }]);
        setFinished(true);
      }
    },
    [scenario.nodes],
  );

  useEffect(() => {
    followRef.current = follow;
  }, [follow]);

  const reset = useCallback(() => {
    runRef.current += 1;
    const session = runRef.current;
    setLines([]);
    setPendingChoose(null);
    setFinished(false);
    queueMicrotask(() => {
      if (session !== runRef.current) return;
      follow(scenario.startId);
    });
  }, [follow, scenario.startId]);

  useEffect(() => {
    // Différé via microtask pour éviter setState synchronously dans l'effet
    queueMicrotask(reset);
  }, [scenario.id, reset]);

  const pickOption = useCallback(
    (label: string, nextId: string) => {
      runRef.current += 1;
      setLines((prev) => [...prev, { role: "vous", text: label }]);
      setPendingChoose(null);
      const tid = runRef.current;
      setTimeout(() => {
        if (tid !== runRef.current) return;
        follow(nextId);
      }, 500);
    },
    [follow],
  );

  return (
    <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#070d18] shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-brand-gold/20">
      <div className="relative border-b border-white/10 bg-[#030712] px-8 py-8 sm:px-12 md:py-10">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/[0.03] to-transparent pointer-events-none" />
        <div className="relative">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold mb-4">
            SIMULATION RELATIONNELLE
            </p>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight leading-none">{scenario.title}</h2>
            <p className="mt-4 max-w-2xl text-lg text-white/50 leading-relaxed italic">&laquo; {scenario.description} &raquo;</p>
        </div>
      </div>

      <div className="flex h-[min(600px,80vh)] flex-col bg-black/20">
        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-10 sm:px-12 scrollbar-hide">
          <AnimatePresence initial={false}>
            {lines.map((ln, i) => (
                <motion.div
                key={`${i}-${ln.text.slice(0, 12)}`}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${ln.role === "vous" ? "justify-end" : "justify-start"}`}
                >
                <div className={`flex gap-3 max-w-[92%] sm:max-w-[80%] ${ln.role === "vous" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`mt-1 h-8 w-8 shrink-0 rounded-full flex items-center justify-center shadow-lg border ${
                        ln.role === "vous" ? "bg-white/10 border-white/20 text-white" : "bg-brand-gold border-brand-gold text-brand-navy"
                    }`}>
                        {ln.role === "vous" ? <User size={14} /> : <MessageSquare size={14} />}
                    </div>
                    <div
                        className={`rounded-2xl px-5 py-4 text-base leading-relaxed shadow-2xl ${
                        ln.role === "vous"
                            ? "bg-brand-gold text-brand-navy font-bold rounded-tr-sm"
                            : "bg-white/5 border border-white/10 text-white/90 font-medium rounded-tl-sm"
                        }`}
                    >
                        {ln.text}
                    </div>
                </div>
                </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-white/5 bg-[#030712]/50 p-6 sm:p-10">
          <AnimatePresence mode="wait">
            {pendingChoose && !finished ? (
              <motion.div 
                key="choice"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 px-2">
                    <Send size={14} className="text-brand-gold" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40">{pendingChoose.prompt}</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {pendingChoose.options.map((opt, i) => (
                    <button
                      key={opt.next}
                      type="button"
                      onClick={() => pickOption(opt.label, opt.next)}
                      className="group relative flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-left text-sm font-bold text-white transition-all duration-300 hover:border-brand-gold/50 hover:bg-white/10 hover:-translate-y-1 shadow-xl active:scale-[0.98]"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-black/40 text-[10px] font-black text-brand-gold border border-white/10 group-hover:bg-brand-gold group-hover:text-brand-navy transition-colors">
                        {i + 1}
                      </span>
                      <span className="flex-1">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : finished ? (
              <motion.div 
                key="finished"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-[2rem] border border-emerald-500/20 bg-emerald-500/5 p-8"
              >
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <Sparkles size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1">Entretien terminé</p>
                        <p className="text-sm font-bold text-white">Analyse de la conversation validée.</p>
                    </div>
                </div>
                <button
                  type="button"
                  onClick={reset}
                  className="group inline-flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-8 py-4 text-xs font-black uppercase tracking-widest text-white transition hover:bg-white hover:text-brand-navy shadow-xl"
                >
                  <RotateCcw className="w-4 h-4 transition-transform group-hover:rotate-180 duration-700" />
                  REJOUER
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
