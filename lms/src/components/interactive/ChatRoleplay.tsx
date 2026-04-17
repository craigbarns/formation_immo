"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatRoleplayScenario } from "@/data/chat-roleplay";

type Line = { role: "client" | "vous"; text: string };

export function ChatRoleplay({ scenario }: { scenario: ChatRoleplayScenario }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [pendingChoose, setPendingChoose] = useState<{
    prompt: string;
    options: { label: string; next: string }[];
  } | null>(null);
  const [finished, setFinished] = useState(false);
  const runRef = useRef(0);

  const follow = useCallback(
    (id: string) => {
      const n = scenario.nodes[id];
      if (!n) return;

      if (n.kind === "client") {
        setLines((prev) => [...prev, { role: "client", text: n.text }]);
        const nx = scenario.nodes[n.next];
        if (!nx) return;
        if (nx.kind === "choose") {
          setPendingChoose({ prompt: nx.prompt, options: nx.options });
        } else if (nx.kind === "end") {
          setLines((prev) => [...prev, { role: "client", text: nx.text }]);
          setFinished(true);
        } else if (nx.kind === "client") {
          const tid = ++runRef.current;
          setTimeout(() => {
            if (tid !== runRef.current) return;
            follow(nx.id);
          }, 450);
        }
      } else if (n.kind === "end") {
        setLines((prev) => [...prev, { role: "client", text: n.text }]);
        setFinished(true);
      }
    },
    [scenario.nodes],
  );

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
    reset();
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
      }, 320);
    },
    [follow],
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-brand-navy/15 bg-white shadow-lg">
      <div className="border-b border-brand-navy/10 bg-gradient-to-r from-brand-navy to-brand-navy-deep px-5 py-5 sm:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-gold">
          Simulation conversationnelle
        </p>
        <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">{scenario.title}</h2>
        <p className="mt-2 max-w-3xl text-sm text-white/80">{scenario.description}</p>
      </div>

      <div className="flex h-[min(520px,70vh)] flex-col bg-zinc-50/80">
        <div className="flex-1 space-y-3 overflow-y-auto px-4 py-5 sm:px-8">
          {lines.map((ln, i) => (
            <div
              key={`${i}-${ln.text.slice(0, 12)}`}
              className={`flex ${ln.role === "vous" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm sm:max-w-[85%] ${
                  ln.role === "vous"
                    ? "rounded-br-sm bg-brand-navy text-white"
                    : "rounded-bl-sm border border-zinc-200 bg-white text-zinc-800"
                }`}
              >
                {ln.role === "client" && (
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-brand-gold">
                    Client
                  </p>
                )}
                {ln.text}
              </div>
            </div>
          ))}
        </div>

        {pendingChoose && !finished && (
          <div className="border-t border-zinc-200 bg-white px-4 py-4 sm:px-8">
            <p className="text-xs font-semibold text-brand-navy">{pendingChoose.prompt}</p>
            <div className="mt-3 flex flex-col gap-2">
              {pendingChoose.options.map((opt) => (
                <button
                  key={opt.next}
                  type="button"
                  onClick={() => pickOption(opt.label, opt.next)}
                  className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-left text-sm text-zinc-800 transition hover:border-brand-navy/40 hover:bg-brand-navy/5"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {finished && (
          <div className="border-t border-zinc-200 bg-emerald-50/50 px-4 py-4 sm:px-8">
            <button
              type="button"
              onClick={reset}
              className="rounded-xl bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-navy-deep"
            >
              Rejouer la conversation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
