import type { Metadata } from "next";
import Link from "next/link";
import { COURSE } from "@/data/course";
import { Users, BookOpen, Award, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin — Vue formateur",
  description: "Suivi des apprenants et statistiques de progression.",
};

export default function AdminPage() {
  const totalLessons = COURSE.reduce((a, m) => a + m.lessons.length, 0);
  const totalModules = COURSE.length;

  return (
    <div className="space-y-8">
      <div>
        <Link href="/formation" className="text-sm text-zinc-500 hover:text-brand-navy">
          ← Retour au parcours
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-brand-navy">Vue formateur</h1>
        <p className="mt-2 text-zinc-600">
          Suivi des apprenants et statistiques de progression.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-4">
        <StatCard icon={<Users className="h-5 w-5" />} label="Apprenants" value="—" sub="Connectez-vous à Supabase" />
        <StatCard icon={<BookOpen className="h-5 w-5" />} label="Leçons" value={String(totalLessons)} sub="Contenu total" />
        <StatCard icon={<Award className="h-5 w-5" />} label="Modules" value={String(totalModules)} sub="Parcours complet" />
        <StatCard icon={<TrendingUp className="h-5 w-5" />} label="QCM" value="180" sub="Questions certifiantes" />
      </div>

      {/* Modules overview */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-zinc-400">Modules</h3>
        <div className="space-y-3">
          {COURSE.map((mod) => (
            <div key={mod.slug} className="flex items-center justify-between rounded-lg border border-zinc-100 p-3">
              <div>
                <p className="text-sm font-bold text-zinc-800">{mod.title}</p>
                <p className="text-2xs text-zinc-400">{mod.lessons.length} leçons · {mod.lessons.reduce((a, l) => a + l.duration, 0)} min</p>
              </div>
              <Link
                href={`/formation/${mod.slug}`}
                className="rounded-lg border border-brand-navy/20 px-3 py-1.5 text-xs font-semibold text-brand-navy hover:bg-brand-navy/5"
              >
                Voir
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Examens */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-zinc-400">Examens par module</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {COURSE.map((mod) => (
            <Link
              key={mod.slug}
              href={`/formation/examen/${mod.slug}`}
              className="flex items-center justify-between rounded-lg border border-zinc-100 p-3 transition hover:border-brand-gold/50 hover:bg-brand-gold/5"
            >
              <span className="text-sm font-medium text-zinc-700">{mod.title.replace(/^Module \d+ — /, "")}</span>
              <span className="rounded-full bg-brand-gold/10 px-2 py-0.5 text-2xs font-bold text-brand-navy">15 min</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 text-brand-navy">{icon}</div>
      <p className="mt-2 text-2xl font-black text-zinc-900">{value}</p>
      <p className="text-xs font-semibold text-zinc-500">{label}</p>
      <p className="text-2xs text-zinc-400">{sub}</p>
    </div>
  );
}
