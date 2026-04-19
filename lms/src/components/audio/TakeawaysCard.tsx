"use client";

import { useState } from "react";

export function TakeawaysCard({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<Set<number>>(() => new Set());

  function toggle(i: number) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  const allDone = checked.size === items.length;

  return (
    <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-2 mb-3">
        <h4 className="text-sm font-bold text-emerald-800 flex items-center gap-2">
          <span className="text-lg">&#x1F4CB;</span>
          A retenir
        </h4>
        <span className="text-2xs font-bold text-emerald-600 tabular-nums">
          {checked.size}/{items.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-emerald-100 mb-4 overflow-hidden">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all duration-300"
          style={{ width: `${(checked.size / items.length) * 100}%` }}
        />
      </div>

      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i}>
            <button
              onClick={() => toggle(i)}
              className={`flex w-full items-start gap-3 rounded-lg px-3 py-2 text-left transition ${
                checked.has(i)
                  ? "bg-emerald-100/60 line-through"
                  : "hover:bg-emerald-50"
              }`}
            >
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 text-xs transition ${
                  checked.has(i)
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : "border-zinc-300 bg-white"
                }`}
              >
                {checked.has(i) ? "\u2714" : ""}
              </span>
              <span className={`text-sm ${checked.has(i) ? "text-zinc-400" : "text-zinc-700"}`}>
                {item}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {allDone && (
        <div className="mt-3 rounded-lg bg-emerald-500 p-2 text-center text-sm font-bold text-white">
          Bravo ! Tous les points sont assimiles.
        </div>
      )}
    </div>
  );
}
