import { COURSE } from "@/data/course";
import { MODULE_AVATARS } from "@/data/module-avatars";
import { ALL_MODULE_VISUALS, getProductionStats } from "@/data/module-visuals";
import { ProductionDashboard } from "./ProductionDashboard";

export const dynamic = "force-dynamic";

export default function ProductionPage() {
  const stats = getProductionStats();

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1a3a5c]">
        Tableau de production
      </h1>
      <p className="mt-1 text-sm text-zinc-600">
        Suivi de la creation des visuels, videos et avatars pour chaque module.
      </p>

      {/* Global stats */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Modules" value="5" color="#1a3a5c" />
        <StatCard label="Lecons" value={String(COURSE.reduce((a, m) => a + m.lessons.length, 0))} color="#2563eb" />
        <StatCard label="Visuels prets" value={`${stats.generated}/${stats.total}`} color="#059669" />
        <StatCard label="Avatars" value={String(MODULE_AVATARS.length)} color="#d4af37" />
      </div>

      {/* Per-module production board */}
      <ProductionDashboard
        modules={COURSE}
        avatars={MODULE_AVATARS}
        visuals={ALL_MODULE_VISUALS}
      />
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm text-center">
      <p className="text-2xl font-bold" style={{ color }}>
        {value}
      </p>
      <p className="text-xs text-zinc-500 mt-1">{label}</p>
    </div>
  );
}
