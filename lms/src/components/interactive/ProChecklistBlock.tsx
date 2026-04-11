"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ProChecklist } from "@/data/pro-checklists";

function storageKey(clId: string) {
  return `pro-checklist-${clId}`;
}

function loadChecked(clId: string): Set<string> {
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

function saveChecked(clId: string, set: Set<string>) {
  try {
    localStorage.setItem(storageKey(clId), JSON.stringify([...set]));
  } catch {
    /* ignore */
  }
}

export function ProChecklistBlock({ checklists }: { checklists: ProChecklist[] }) {
  const [tab, setTab] = useState(0);
  const cl = checklists[tab];
  const [checked, setChecked] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!cl) return;
    setChecked(loadChecked(cl.id));
  }, [cl?.id]);

  const toggle = useCallback(
    (itemId: string) => {
      if (!cl) return;
      setChecked((prev) => {
        const next = new Set(prev);
        if (next.has(itemId)) next.delete(itemId);
        else next.add(itemId);
        saveChecked(cl.id, next);
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

  if (checklists.length === 0 || !cl) return null;

  const total = cl.items.length;
  const done = cl.items.filter((i) => checked.has(i.id)).length;

  return (
    <div className="overflow-hidden rounded-2xl border border-[#1a3a5c]/15 bg-white shadow-lg">
      <div className="flex flex-col gap-4 border-b border-[#1a3a5c]/10 bg-gradient-to-br from-[#1a3a5c] to-[#0f2840] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
            Checklist pro
          </p>
          <h2 className="mt-1 flex items-center gap-2 text-xl font-bold text-white sm:text-2xl">
            <span aria-hidden>{cl.icon}</span>
            {cl.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-white/75">{cl.description}</p>
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
            className="rounded-lg border border-[#d4af37]/50 bg-[#d4af37] px-4 py-2 text-sm font-bold text-[#1a3a5c] transition hover:brightness-105"
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
                i === tab ? "text-[#1a3a5c]" : "text-zinc-400 hover:text-zinc-600"
              }`}
            >
              {c.title}
              {i === tab && (
                <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-[#d4af37]" />
              )}
            </button>
          ))}
        </div>
      )}

      <div className="px-5 py-6 sm:px-8">
        <div className="mb-6 flex items-center justify-between gap-3">
          <p className="text-sm text-zinc-600">
            Progression :{" "}
            <span className="font-bold tabular-nums text-[#1a3a5c]">
              {done}/{total}
            </span>
          </p>
          <div className="h-2 flex-1 max-w-xs overflow-hidden rounded-full bg-zinc-100">
            <div
              className="h-full rounded-full bg-[#d4af37] transition-[width]"
              style={{ width: total ? `${(done / total) * 100}%` : "0%" }}
            />
          </div>
        </div>

        <div className="space-y-8">
          {byCategory.map(({ category, items }) =>
            items.length === 0 ? null : (
              <div key={category}>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1a3a5c]">
                  {category}
                </h3>
                <ul className="mt-3 space-y-2">
                  {items.map((it) => (
                    <li key={it.id}>
                      <label className="flex cursor-pointer gap-3 rounded-xl border border-zinc-100 bg-zinc-50/50 px-4 py-3 transition hover:border-[#1a3a5c]/20">
                        <input
                          type="checkbox"
                          checked={checked.has(it.id)}
                          onChange={() => toggle(it.id)}
                          className="mt-1 h-4 w-4 shrink-0 rounded border-zinc-300 text-[#1a3a5c] focus:ring-[#d4af37]"
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
