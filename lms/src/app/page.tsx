import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-brand-navy text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,175,55,0.18),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/25 to-transparent"
        aria-hidden
      />

      <main className="relative flex flex-1 flex-col items-center justify-center px-6 py-20">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">
          Formation professionnelle
        </p>
        <h1 className="mt-5 max-w-3xl text-center text-4xl font-bold leading-[1.12] tracking-tight md:text-5xl lg:text-[3.25rem]">
          Agent immobilier —{" "}
          <span className="bg-gradient-to-r from-white to-white/85 bg-clip-text text-transparent">
            42 heures pour performer
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-center text-lg leading-relaxed text-white/85">
          Un parcours structuré : leçons, audio, QCM, simulateurs et fiches. Conçu pour être clair,
          actionnable, aligné sur votre métier.
        </p>

        <ul className="mt-10 flex flex-col gap-3 text-left text-sm text-white/90 sm:flex-row sm:gap-8">
          {["5 modules clés", "25 leçons guidées", "Outils & examens"].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-gold" aria-hidden />
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/login"
            className="group inline-flex items-center gap-2 rounded-full bg-brand-gold px-8 py-3.5 text-base font-bold text-brand-navy shadow-lg shadow-black/20 transition hover:bg-[#e4c34d]"
          >
            Accéder à la formation
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </main>

      <footer className="relative border-t border-white/10 py-8 text-center text-xs text-white/55">
        <p>
          Configuration technique : variables{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[11px]">LMS_PASSWORD</code>{" "}
          et{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[11px]">SESSION_SECRET</code>{" "}
          dans <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[11px]">lms/.env.local</code>
        </p>
      </footer>
    </div>
  );
}
