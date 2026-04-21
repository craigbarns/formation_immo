"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";
import type { ProChecklist } from "@/data/pro-checklists";
import { recordChecklistComplete } from "@/lib/gamification";
import { createClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Download, Printer, ClipboardList, Sparkles } from "lucide-react";

function storageKey(clId: string) {
  return `pro-checklist-${clId}`;
}

function loadLocalChecked(clId: string): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(storageKey(clId));
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as string[];
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function saveLocalChecked(clId: string, set: Set<string>) {
  try {
    localStorage.setItem(storageKey(clId), JSON.stringify([...set]));
  } catch {
    /* ignore */
  }
}

async function loadSupabaseChecked(clId: string): Promise<Set<string> | null> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("user_settings")
    .select("pro_checklists")
    .eq("user_id", user.id)
    .single();

  if (!data?.pro_checklists) return null;

  const checklists = data.pro_checklists as Record<string, string[]>;
  const arr = checklists[clId];
  if (!Array.isArray(arr)) return null;

  return new Set(arr);
}

async function saveSupabaseChecked(clId: string, set: Set<string>) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { data } = await supabase
    .from("user_settings")
    .select("pro_checklists")
    .eq("user_id", user.id)
    .single();

  const current = (data?.pro_checklists as Record<string, string[]> | undefined) || {};
  const next = { ...current, [clId]: [...set] };

  await supabase
    .from("user_settings")
    .upsert(
      {
        user_id: user.id,
        pro_checklists: next,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    );
}

export function ProChecklistBlock({ checklists }: { checklists: ProChecklist[] }) {
  const [tab, setTab] = useState(0);
  const cl = checklists[tab];
  const [checked, setChecked] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!cl) return;

    let cancelled = false;

    async function load() {
      const fromSupabase = await loadSupabaseChecked(cl.id);
      if (cancelled) return;

      if (fromSupabase) {
        setChecked(fromSupabase);
      } else {
        setChecked(loadLocalChecked(cl.id));
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [cl]);

  const toggle = useCallback(
    (itemId: string) => {
      if (!cl) return;
      setChecked((prev) => {
        const next = new Set(prev);
        if (next.has(itemId)) next.delete(itemId);
        else next.add(itemId);
        saveLocalChecked(cl.id, next);
        saveSupabaseChecked(cl.id, next).catch(() => {});
        return next;
      });
    },
    [cl],
  );

  const byCategory = useMemo(() => {
    if (!cl) return [];
    const map = new Map<string, typeof cl.items>();
    for (const cat of cl.categories) {
      map.set(cat, []);
    }
    for (const it of cl.items) {
      const list = map.get(it.category) ?? [];
      list.push(it);
      map.set(it.category, list);
    }
    return cl.categories.map((c) => ({ category: c, items: map.get(c) ?? [] }));
  }, [cl]);

  const printChecklist = useCallback(() => {
    if (!cl) return;
    const lines: string[] = [
      cl.title,
      "",
      ...cl.items.map((it) => `${checked.has(it.id) ? "[x]" : "[ ]"} ${it.text}`),
    ];
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(
      `<pre style="font-family:system-ui,sans-serif;padding:24px;white-space:pre-wrap;">${lines
        .join("\n")
        .replace(/</g, "&lt;")}</pre>`,
    );
    w.document.close();
    w.print();
  }, [cl, checked]);

  const downloadTxt = useCallback(() => {
    if (!cl) return;
    const lines = [
      cl.title,
      cl.description,
      "",
      ...cl.items.map((it) => `${checked.has(it.id) ? "[x]" : "[ ]"} ${it.text}`),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `checklist-${cl.id}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
  }, [cl, checked]);

  const total = cl?.items.length ?? 0;
  const done = cl ? cl.items.filter((i) => checked.has(i.id)).length : 0;
  const checklistId = cl?.id;

  // Hook avant tout early-return pour respecter les rules-of-hooks.
  useEffect(() => {
    if (!checklistId) return;
    if (done === total && total > 0) {
      recordChecklistComplete(checklistId);
    }
  }, [done, total, checklistId]);

  if (checklists.length === 0 || !cl) return null;

  return (
    <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#070d18] shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-brand-gold/20">
      <div className="relative flex flex-col gap-6 border-b border-white/10 bg-[#030712] px-8 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-12 md:py-10">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/[0.03] to-transparent pointer-events-none" />
        <div className="relative">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold mb-4">
            MAÎTRISE OPÉRATIONNELLE
          </p>
          <h2 className="flex items-center gap-3 text-3xl font-black text-white uppercase tracking-tight leading-none">
            <EmojiIcon emoji={cl.icon} className="h-8 w-8" />
            {cl.title}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-white/50 leading-relaxed italic">&laquo; {cl.description} &raquo;</p>
        </div>
        <div className="relative flex flex-wrap gap-3">
          <button
            type="button"
            onClick={printChecklist}
            className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <Printer size={14} className="transition-transform group-hover:scale-110" />
            IMPRIMER
          </button>
          <button
            type="button"
            onClick={downloadTxt}
            className="group flex items-center gap-2 rounded-xl bg-brand-gold px-6 py-3 text-[10px] font-black uppercase tracking-widest text-brand-navy shadow-lg shadow-brand-gold/20 transition hover:bg-white hover:scale-105 active:scale-95"
          >
            <Download size={14} className="transition-transform group-hover:translate-y-0.5" />
            TEXTE (.TXT)
          </button>
        </div>
      </div>

      {checklists.length > 1 && (
        <div className="flex gap-2 overflow-x-auto border-b border-white/5 bg-black/20 px-6 py-4 scrollbar-hide">
          {checklists.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setTab(i)}
              className={`flex shrink-0 items-center gap-2.5 rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${
                i === tab
                  ? "bg-brand-gold text-brand-navy shadow-lg shadow-brand-gold/20"
                  : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white border border-white/5"
              }`}
            >
              <EmojiIcon emoji={c.icon} className="h-4 w-4" />
              <span>{c.title}</span>
            </button>
          ))}
        </div>
      )}

      <div className="p-8 sm:p-10 lg:p-12">
        <div className="mb-10 flex items-center justify-between gap-6 px-2">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">CONFORMITÉ DU DOSSIER</p>
            <p className="text-xl font-black text-white tabular-nums">
              {done} <span className="text-sm text-white/20">/ {total}</span>
            </p>
          </div>
          <div className="h-2 flex-1 max-w-md overflow-hidden rounded-full bg-white/5 ring-1 ring-white/5 shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: total ? `${(done / total) * 100}%` : "0%" }}
              className="h-full rounded-full bg-gradient-to-r from-brand-gold via-white to-brand-gold shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all duration-700"
            />
          </div>
          {done === total && total > 0 && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2 text-brand-gold">
                  <Sparkles size={16} className="animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Validé</span>
              </motion.div>
          )}
        </div>

        <div className="space-y-12">
          {byCategory.map(({ category, items }, catIdx) =>
            items.length === 0 ? null : (
              <div key={category} className="space-y-6">
                <div className="flex items-center gap-4">
                    <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 text-center">
                    {category}
                    </h3>
                    <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>
                <ul className="grid gap-3">
                  {items.map((it) => (
                    <li key={it.id}>
                      <button
                        onClick={() => toggle(it.id)}
                        className={`group w-full flex items-start gap-4 rounded-[1.5rem] border-2 p-5 text-left transition-all duration-300 ${
                            checked.has(it.id)
                            ? "border-brand-gold/30 bg-brand-gold/5 shadow-inner"
                            : "border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                        }`}
                      >
                        <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition-all ${
                            checked.has(it.id)
                            ? "bg-brand-gold border-brand-gold text-brand-navy"
                            : "bg-black/20 border-white/10 text-transparent"
                        }`}>
                          <CheckCircle2 size={14} className={checked.has(it.id) ? "opacity-100" : "opacity-0"} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <span className={`text-base font-bold transition-colors ${
                                checked.has(it.id) ? "text-white" : "text-white/70 group-hover:text-white"
                            }`}>{it.text}</span>
                            {it.tip && (
                                <p className={`mt-2 text-sm italic font-medium transition-all ${
                                    checked.has(it.id) ? "text-white/40" : "text-white/20"
                                }`}>&laquo; {it.tip} &raquo;</p>
                            )}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
