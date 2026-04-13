"use client";

import { useEffect, useRef, useState } from "react";
import { EVOLUTION_NATIONALE, RENDEMENTS_PAR_VILLE } from "@/data/prix-immo";

type ChartTab = "evolution" | "rendement" | "tension";

export function MarcheImmoChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const rendRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const echartsRef = useRef<any>(null);
  const [tab, setTab] = useState<ChartTab>("evolution");

  useEffect(() => {
    if (tab !== "evolution" || !chartRef.current) return;

    import("echarts").then((echarts) => {
      if (echartsRef.current) echartsRef.current.dispose();

      const chart = echarts.init(chartRef.current!);
      echartsRef.current = chart;

      chart.setOption({
        backgroundColor: "transparent",
        tooltip: {
          trigger: "axis",
          backgroundColor: "#1a3a5c",
          borderColor: "#d4af37",
          textStyle: { color: "#fff", fontSize: 13 },
          formatter: (params: unknown[]) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const p = params as any[];
            return `<strong>${p[0].name}</strong><br/>${p.map((s: { seriesName: string; value: number; color: string }) =>
              `<span style="color:${s.color}">●</span> ${s.seriesName}: <strong>${s.value.toLocaleString("fr")} €/m²</strong>`
            ).join("<br/>")}`;
          },
        },
        legend: {
          data: ["Paris", "Province (moyenne)"],
          textStyle: { color: "#1a3a5c", fontWeight: "600" },
          bottom: 0,
        },
        grid: { top: 20, right: 20, bottom: 50, left: 60 },
        xAxis: {
          type: "category",
          data: EVOLUTION_NATIONALE.map((d) => d.annee.toString()),
          axisLine: { lineStyle: { color: "#e2e8f0" } },
          axisTick: { show: false },
          axisLabel: { color: "#94a3b8", fontSize: 12 },
        },
        yAxis: {
          type: "value",
          axisLabel: { formatter: (v: number) => `${(v / 1000).toFixed(0)}k€`, color: "#94a3b8", fontSize: 11 },
          splitLine: { lineStyle: { color: "#f1f5f9", type: "dashed" } },
          axisLine: { show: false },
        },
        series: [
          {
            name: "Paris",
            type: "line",
            data: EVOLUTION_NATIONALE.map((d) => d.paris),
            smooth: true,
            symbol: "circle",
            symbolSize: 8,
            lineStyle: { color: "#1a3a5c", width: 3 },
            itemStyle: { color: "#1a3a5c", borderWidth: 2, borderColor: "#fff" },
            areaStyle: {
              color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [{ offset: 0, color: "rgba(26,58,92,0.15)" }, { offset: 1, color: "rgba(26,58,92,0.01)" }] }
            },
          },
          {
            name: "Province (moyenne)",
            type: "line",
            data: EVOLUTION_NATIONALE.map((d) => d.province),
            smooth: true,
            symbol: "circle",
            symbolSize: 8,
            lineStyle: { color: "#d4af37", width: 3 },
            itemStyle: { color: "#d4af37", borderWidth: 2, borderColor: "#fff" },
            areaStyle: {
              color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [{ offset: 0, color: "rgba(212,175,55,0.15)" }, { offset: 1, color: "rgba(212,175,55,0.01)" }] }
            },
          },
        ],
      });

      const handleResize = () => chart.resize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    });

    return () => { if (echartsRef.current) { echartsRef.current.dispose(); echartsRef.current = null; } };
  }, [tab]);

  useEffect(() => {
    if (tab !== "rendement" || !rendRef.current) return;

    import("echarts").then((echarts) => {
      if (echartsRef.current) echartsRef.current.dispose();

      const chart = echarts.init(rendRef.current!);
      echartsRef.current = chart;
      const sorted = [...RENDEMENTS_PAR_VILLE].sort((a, b) => b.rendementBrut - a.rendementBrut);

      chart.setOption({
        backgroundColor: "transparent",
        tooltip: {
          trigger: "axis",
          backgroundColor: "#1a3a5c",
          borderColor: "#d4af37",
          textStyle: { color: "#fff", fontSize: 13 },
          axisPointer: { type: "shadow" },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter: (params: any[]) =>
            `<strong>${params[0].name}</strong><br/>${params.map((p: { seriesName: string; value: number; color: string }) =>
              `<span style="color:${p.color}">●</span> ${p.seriesName}: <strong>${p.value}%</strong>`
            ).join("<br/>")}`,
        },
        legend: {
          data: ["Rendement brut", "Rendement net"],
          textStyle: { color: "#1a3a5c", fontWeight: "600" },
          bottom: 0,
        },
        grid: { top: 10, right: 20, bottom: 60, left: 140 },
        yAxis: {
          type: "category",
          data: sorted.map((d) => d.ville),
          axisLabel: { color: "#1a3a5c", fontSize: 11, fontWeight: "600" },
          axisLine: { show: false },
          axisTick: { show: false },
        },
        xAxis: {
          type: "value",
          axisLabel: { formatter: "{value}%", color: "#94a3b8", fontSize: 11 },
          splitLine: { lineStyle: { color: "#f1f5f9", type: "dashed" } },
          max: 10,
        },
        series: [
          {
            name: "Rendement brut",
            type: "bar",
            data: sorted.map((d) => d.rendementBrut),
            barMaxWidth: 16,
            itemStyle: {
              color: "#d4af37",
              borderRadius: [0, 8, 8, 0],
            },
          },
          {
            name: "Rendement net",
            type: "bar",
            data: sorted.map((d) => d.rendementNet),
            barMaxWidth: 16,
            itemStyle: {
              color: "#1a3a5c",
              borderRadius: [0, 8, 8, 0],
            },
          },
        ],
      });

      const handleResize = () => chart.resize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    });

    return () => { if (echartsRef.current) { echartsRef.current.dispose(); echartsRef.current = null; } };
  }, [tab]);

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-zinc-200 pb-1">
        {([
          { key: "evolution", label: "📈 Évolution des prix" },
          { key: "rendement", label: "💰 Rendements par ville" },
        ] as const).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`rounded-t-lg px-4 py-2 text-sm font-bold transition ${
              tab === key
                ? "border-b-2 border-brand-gold bg-brand-gold-soft/40 text-brand-navy"
                : "text-zinc-500 hover:text-brand-navy"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Charts */}
      {tab === "evolution" && (
        <div>
          <p className="mb-3 text-sm text-zinc-500">
            Évolution du prix moyen au m² — Paris vs Province (2020–2026)
          </p>
          <div ref={chartRef} style={{ height: 300 }} />
          <div className="mt-3 grid grid-cols-3 gap-3">
            {[
              { label: "Paris 2026", value: "10 200 €/m²", delta: "-4.2%", up: false },
              { label: "Province 2026", value: "3 480 €/m²", delta: "+3.8%", up: true },
              { label: "Écart Paris/Province", value: "×2.9", delta: "vs ×3.4 en 2022", up: true },
            ].map(({ label, value, delta, up }) => (
              <div key={label} className="rounded-xl border border-zinc-200 bg-white p-3 text-center">
                <p className="text-[10px] font-bold uppercase tracking-wide text-zinc-400">{label}</p>
                <p className="mt-1 text-lg font-bold text-brand-navy">{value}</p>
                <p className={`text-xs font-semibold ${up ? "text-emerald-600" : "text-red-500"}`}>{delta}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "rendement" && (
        <div>
          <p className="mb-3 text-sm text-zinc-500">
            Rendement locatif brut et net estimé par ville (2026)
          </p>
          <div ref={rendRef} style={{ height: 480 }} />
          <p className="mt-2 text-xs text-zinc-400">
            Rendement net = après charges, taxe foncière et vacance locative estimée à 5%
          </p>
        </div>
      )}
    </div>
  );
}
