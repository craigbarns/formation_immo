"use client";

import { useCallback, useMemo, useState } from "react";
import type { DataTable, TableCell } from "@/data/data-tables";

const BADGE_COLORS: Record<string, string> = {
  green: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  red: "bg-red-100 text-red-700 border border-red-200",
  blue: "bg-blue-100 text-blue-700 border border-blue-200",
  gold: "bg-amber-100 text-amber-700 border border-amber-200",
  navy: "bg-brand-navy/10 text-brand-navy border border-brand-navy/20",
};

function Cell({ cell }: { cell: TableCell }) {
  return (
    <td
      className={`px-3 py-2.5 text-sm ${
        cell.highlight ? "bg-brand-gold/10 font-semibold text-[#7a6008]" : "text-zinc-700"
      }`}
    >
      <div className="flex flex-wrap items-center gap-1.5">
        <span>{cell.value}</span>
        {cell.badge && (
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
              BADGE_COLORS[cell.badgeColor ?? "navy"]
            }`}
          >
            {cell.badge}
          </span>
        )}
      </div>
    </td>
  );
}

function downloadCSV(table: DataTable) {
  const rows = [table.headers, ...table.rows.map((row) => row.map((c) => c.value))];
  const csv = rows.map((r) => r.map((v) => `"${v.replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${table.title.toLowerCase().replace(/\s+/g, "-")}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function TableView({ table }: { table: DataTable }) {
  const [sortCol, setSortCol] = useState<number | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [filter, setFilter] = useState("");

  const toggleSort = useCallback(
    (col: number) => {
      if (!table.sortable) return;
      if (sortCol === col) setSortAsc((a) => !a);
      else { setSortCol(col); setSortAsc(true); }
    },
    [sortCol, table.sortable],
  );

  const rows = useMemo(() => {
    let r = [...table.rows];
    if (filter.trim()) {
      const q = filter.toLowerCase();
      r = r.filter((row) => row.some((c) => c.value.toLowerCase().includes(q)));
    }
    if (sortCol !== null) {
      r.sort((a, b) => {
        const va = a[sortCol]?.value ?? "";
        const vb = b[sortCol]?.value ?? "";
        return sortAsc ? va.localeCompare(vb, "fr") : vb.localeCompare(va, "fr");
      });
    }
    return r;
  }, [table.rows, filter, sortCol, sortAsc]);

  return (
    <div>
      {/* Controls */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <span className="text-lg">{table.icon}</span>
          <span className="font-medium text-zinc-700">{rows.length} ligne{rows.length !== 1 ? "s" : ""}</span>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filtrer..."
            className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-800 outline-none placeholder:text-zinc-400 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20"
          />
          <button
            onClick={() => downloadCSV(table)}
            className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-600 transition hover:border-brand-navy/30 hover:text-brand-navy"
            title="Télécharger CSV"
          >
            ⬇ CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-zinc-200 shadow-sm">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-brand-navy">
              {table.headers.map((h, i) => (
                <th
                  key={i}
                  onClick={() => toggleSort(i)}
                  className={`px-3 py-3 text-xs font-bold uppercase tracking-wide text-white/90 first:rounded-tl-xl last:rounded-tr-xl ${
                    table.sortable ? "cursor-pointer select-none hover:bg-white/10" : ""
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {h}
                    {table.sortable && (
                      <span className="text-white/60">
                        {sortCol === i ? (sortAsc ? "↑" : "↓") : "↕"}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr
                key={ri}
                className={`border-t border-zinc-100 transition hover:bg-brand-gold/5 ${
                  ri % 2 === 0 ? "bg-white" : "bg-zinc-50/60"
                }`}
              >
                {row.map((cell, ci) => (
                  <Cell key={ci} cell={cell} />
                ))}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={table.headers.length} className="px-4 py-6 text-center text-sm text-zinc-400">
                  Aucun résultat pour &laquo; {filter} &raquo;
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {table.notes && (
        <p className="mt-2 text-xs leading-relaxed text-zinc-400">
          * {table.notes}
        </p>
      )}
    </div>
  );
}

export function DataTableBlock({ tables }: { tables: DataTable[] }) {
  const [active, setActive] = useState(0);
  if (tables.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-brand-navy/15 bg-white shadow-lg">
      {/* Header */}
      <div className="border-b border-zinc-100 bg-gradient-to-r from-brand-navy to-[#244b75] px-5 py-4 sm:px-7">
        <p className="text-[11px] font-bold uppercase tracking-widest text-brand-gold">
          Tableaux de référence
        </p>
        <p className="mt-0.5 text-sm font-semibold text-white/90">
          {tables[active].title}
        </p>
        {tables[active].description && (
          <p className="mt-1 text-xs text-white/80">{tables[active].description}</p>
        )}
      </div>

      {/* Tabs */}
      {tables.length > 1 && (
        <div className="flex gap-1 overflow-x-auto border-b border-zinc-100 bg-zinc-50 px-4 py-2">
          {tables.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                i === active
                  ? "bg-brand-navy text-white"
                  : "text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              <span>{t.icon}</span>
              <span>{t.title}</span>
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="p-5 sm:p-7">
        <TableView table={tables[active]} />
      </div>
    </div>
  );
}
