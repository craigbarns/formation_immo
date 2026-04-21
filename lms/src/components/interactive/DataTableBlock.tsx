"use client";

import { useCallback, useMemo, useState } from "react";
import { ArrowUp, ArrowDown, ArrowUpDown, Download, Table, Search } from "lucide-react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";
import type { DataTable, TableCell } from "@/data/data-tables";

const BADGE_COLORS: Record<string, string> = {
  green: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  red: "bg-red-500/10 text-red-400 border border-red-500/20",
  blue: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  gold: "bg-brand-gold/15 text-brand-gold border border-brand-gold/30",
  navy: "bg-brand-navy/20 text-blue-300 border border-brand-navy/30",
};

function Cell({ cell }: { cell: TableCell }) {
  return (
    <td
      className={`px-5 py-4 text-sm transition-colors duration-300 ${
        cell.highlight ? "bg-brand-gold/5 font-black text-brand-gold" : "text-white/70 group-hover:text-white"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span>{cell.value}</span>
        {cell.badge && (
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest ${
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
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/40">
                <Table size={18} />
            </div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40">ANALYSE</p>
                <p className="text-sm font-bold text-white/70 uppercase tracking-tight">{rows.length} enregistrements</p>
            </div>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/20" />
            <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Filtrer..."
                className="w-48 rounded-xl border border-white/10 bg-white/5 pl-9 pr-4 py-2 text-sm text-white outline-none placeholder:text-white/20 focus:border-brand-gold/50 focus:ring-4 focus:ring-brand-gold/10 transition-all"
            />
          </div>
          <button
            onClick={() => downloadCSV(table)}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white/60 transition hover:bg-white/10 hover:text-white"
            title="Exporter en CSV"
          >
            <Download className="h-3.5 w-3.5" /> EXPORT
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-[1.5rem] border border-white/10 bg-[#030712] shadow-2xl">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-white/5">
              {table.headers.map((h, i) => (
                <th
                  key={i}
                  onClick={() => toggleSort(i)}
                  className={`px-5 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold border-b border-white/10 ${
                    table.sortable ? "cursor-pointer select-none hover:bg-white/5 transition-colors" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {h}
                    {table.sortable && (
                      <span className="text-white/20">
                        {sortCol === i ? (sortAsc ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />) : <ArrowUpDown className="h-3 w-3" />}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.map((row, ri) => (
              <tr
                key={ri}
                className="group transition-colors hover:bg-white/[0.02]"
              >
                {row.map((cell, ci) => (
                  <Cell key={ci} cell={cell} />
                ))}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={table.headers.length} className="px-6 py-20 text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2 italic">Aucun résultat trouvé</p>
                  <p className="text-white/40 text-sm italic">&laquo; {filter} &raquo;</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {table.notes && (
        <div className="mt-6 flex items-start gap-3 px-2 text-xs leading-relaxed text-white/30 italic font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-white/10 shrink-0 mt-1.5" />
          <p>{table.notes}</p>
        </div>
      )}
    </div>
  );
}

export function DataTableBlock({ tables }: { tables: DataTable[] }) {
  const [active, setActive] = useState(0);
  if (tables.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#070d18] shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-brand-gold/20">
      {/* Header */}
      <div className="relative border-b border-white/10 bg-[#030712] px-8 py-8 sm:px-10">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/[0.03] to-transparent pointer-events-none" />
        <div className="relative">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">
            RESSOURCES ANALYTIQUES
            </p>
            <h2 className="mt-2 text-2xl font-black text-white uppercase tracking-tight">
            {tables[active].title}
            </h2>
            {tables[active].description && (
            <p className="mt-4 text-base leading-relaxed text-white/50 max-w-2xl italic">
                &laquo; {tables[active].description} &raquo;
            </p>
            )}
        </div>
      </div>

      {/* Tabs */}
      {tables.length > 1 && (
        <div className="flex gap-2 overflow-x-auto border-b border-white/5 bg-black/20 px-6 py-4 scrollbar-hide">
          {tables.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className={`flex shrink-0 items-center gap-2.5 rounded-xl px-5 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${
                i === active
                  ? "bg-brand-gold text-brand-navy shadow-lg shadow-brand-gold/20"
                  : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white border border-white/5"
              }`}
            >
              <EmojiIcon emoji={t.icon} className="h-4 w-4" />
              <span>{t.title}</span>
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="p-8 sm:p-10 lg:p-12">
        <TableView table={tables[active]} />
      </div>
    </div>
  );
}
