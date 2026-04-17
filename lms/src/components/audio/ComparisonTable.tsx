"use client";

import type { ComparisonRow } from "@/data/lesson-keyconcepts";

type Props = {
  title: string;
  colAHeader: string;
  colBHeader: string;
  rows: ComparisonRow[];
};

export function ComparisonTable({ title, colAHeader, colBHeader, rows }: Props) {
  return (
    <div className="rounded-xl border-2 border-zinc-200 bg-white overflow-hidden shadow-sm">
      <div className="bg-brand-navy px-4 py-3">
        <h4 className="text-sm font-bold text-white">{title}</h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50">
              <th className="px-4 py-2.5 text-left text-xs font-bold text-zinc-500 uppercase tracking-wide w-1/4">
                Critere
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-bold text-brand-navy uppercase tracking-wide w-[37.5%]">
                {colAHeader}
              </th>
              <th className="px-4 py-2.5 text-left text-xs font-bold text-brand-gold uppercase tracking-wide w-[37.5%]">
                {colBHeader}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-zinc-100 last:border-0">
                <td className="px-4 py-3 text-xs font-semibold text-zinc-700">{r.label}</td>
                <td
                  className={`px-4 py-3 text-xs ${
                    r.highlight === "a"
                      ? "font-bold text-brand-navy bg-brand-navy/5"
                      : "text-zinc-600"
                  }`}
                >
                  {r.highlight === "a" && <span className="mr-1">&#x2714;</span>}
                  {r.colA}
                </td>
                <td
                  className={`px-4 py-3 text-xs ${
                    r.highlight === "b"
                      ? "font-bold text-[#8a7318] bg-brand-gold/5"
                      : "text-zinc-600"
                  }`}
                >
                  {r.highlight === "b" && <span className="mr-1">&#x2714;</span>}
                  {r.colB}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
