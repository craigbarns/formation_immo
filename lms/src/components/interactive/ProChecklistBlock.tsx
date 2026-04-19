"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";
import type { ProChecklist } from "@/data/pro-checklists";
import { recordChecklistComplete } from "@/lib/gamification";
import { createClient } from "@/lib/supabase/client";

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
    <div className="overflow-hidden rounded-2xl border border-brand-navy/15 bg-white shadow-lg">
      <div className="flex flex-col gap-4 border-b border-brand-navy/10 bg-gradient-to-br from-brand-navy to-[var(--brand-navy-deep)] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="text-3xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
            Checklist pro
          </p>
          <h2 className="mt-1 flex items-center gap-2 text-xl font-bold text-white sm:text-2xl">
            <EmojiIcon emoji={cl.icon} className="h-6 w-6" />
            {cl.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-white/85">{cl.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={printChecklist}
            className="rounded-lg border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            Imprimer
          </button>
          <button
            type="button"
            onClick={downloadTxt}
            className="rounded-lg border border-brand-gold/50 bg-brand-gold px-4 py-2 text-sm font-bold text-brand-navy transition hover:brightness-105"
          >
            Télécharger (.txt)
          </button>
        </div>
      </div>

      {checklists.length > 1 && (
        <div className="flex flex-wrap gap-1 border-b border-zinc-100 bg-zinc-50 px-5 sm:px-8">
          {checklists.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setTab(i)}
              className={`relative px-4 py-3 text-sm font-medium transition ${
                i === tab ? "text-brand-navy" : "text-zinc-400 hover:text-zinc-600"
              }`}
            >
              {c.title}
              {i === tab && (
                <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-brand-gold" />
              )}
            </button>
          ))}
        </div>
      )}

      <div className="px-5 py-6 sm:px-8">
        <div className="mb-6 flex items-center justify-between gap-3">
          <p className="text-sm text-zinc-600">
            Progression :{" "}
            <span className="font-bold tabular-nums text-brand-navy">
              {done}/{total}
            </span>
          </p>
          <div className="h-2 flex-1 max-w-xs overflow-hidden rounded-full bg-zinc-100">
            <div
              className="h-full rounded-full bg-brand-gold transition-[width]"
              style={{ width: total ? `${(done / total) * 100}%` : "0%" }}
            />
          </div>
        </div>

        <div className="space-y-8">
          {byCategory.map(({ category, items }) =>
            items.length === 0 ? null : (
              <div key={category}>
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy">
                  {category}
                </h3>
                <ul className="mt-3 space-y-2">
                  {items.map((it) => (
                    <li key={it.id}>
                      <label className="flex cursor-pointer gap-3 rounded-xl border border-zinc-100 bg-zinc-50/50 px-4 py-3 transition hover:border-brand-navy/20">
                        <input
                          type="checkbox"
                          checked={checked.has(it.id)}
                          onChange={() => toggle(it.id)}
                          className="mt-1 h-4 w-4 shrink-0 rounded border-zinc-300 text-brand-navy focus:ring-brand-gold"
                        />
                        <span className="flex-1 text-sm text-zinc-800">{it.text}</span>
                      </label>
                      {it.tip && (
                        <p className="ml-9 mt-1 text-xs text-zinc-500">{it.tip}</p>
                      )}
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
