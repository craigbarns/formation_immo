import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, GraduationCap, Target } from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-brand-navy text-white">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-brand-navy"
      >
        Aller au contenu principal
      </a>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,175,55,0.18),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/25 to-transparent"
        aria-hidden
      />

      <header className="relative z-20 border-b border-white/10 bg-brand-navy/35 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <span className="text-sm font-bold tracking-tight text-white">Formation 42 h</span>
          <Link
            href="/login"
            className="rounded-full border border-white/25 bg-white/5 px-4 py-2 text-sm font-semibold text-white outline-none transition hover:border-white/40 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-brand-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
          >
            Connexion
          </Link>
        </div>
      </header>

      <main
        id="contenu"
        className="relative flex flex-1 flex-col items-center justify-center px-6 py-16 md:py-20"
      >
        <p className="animate-enter text-center text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold">
          Formation professionnelle
        </p>
        <h1 className="animate-enter-delay-1 mt-5 max-w-3xl text-center text-4xl font-bold leading-[1.12] tracking-tight md:text-5xl lg:text-[3.25rem]">
          Agent immobilier —{" "}
          <span className="bg-gradient-to-r from-white to-white/85 bg-clip-text text-transparent">
            42 heures pour performer
          </span>
        </h1>
        <p className="animate-enter-delay-2 mt-6 max-w-xl text-center text-lg leading-relaxed text-white/85">
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
            className="group inline-flex items-center gap-2 rounded-full bg-brand-gold px-8 py-3.5 text-base font-bold text-brand-navy shadow-lg shadow-black/20 outline-none transition hover:bg-[#e4c34d] focus-visible:ring-2 focus-visible:ring-white/90 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy active:scale-[0.98]"
          >
            Accéder à la formation
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
          </Link>
          <Link href="#pourquoi" className="btn-secondary-outline rounded-full py-3.5">
            Pourquoi cette formation ?
          </Link>
        </div>

        <section
          id="pourquoi"
          className="mt-24 w-full max-w-5xl scroll-mt-24 border-t border-white/10 pt-16"
          aria-labelledby="pourquoi-titre"
        >
          <h2 id="pourquoi-titre" className="text-center text-sm font-bold uppercase tracking-[0.2em] text-brand-gold">
            Une méthode pensée pour le terrain
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-base text-white/80">
            Chaque module relie théorie et pratique : vous avancez par étapes claires, avec des
            repères pour consolider avant de passer à l&apos;action.
          </p>
          <ul className="mt-10 grid gap-5 sm:grid-cols-3">
            <li className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <GraduationCap className="h-8 w-8 text-brand-gold" aria-hidden />
              <h3 className="mt-4 text-lg font-bold text-white">Parcours guidé</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Ordre logique des leçons, révisions et examens par module pour ancrer les notions.
              </p>
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <BookOpen className="h-8 w-8 text-brand-gold" aria-hidden />
              <h3 className="mt-4 text-lg font-bold text-white">Formats variés</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Texte, audio, fiches et scénarios interactifs pour s&apos;adapter à votre rythme.
              </p>
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <Target className="h-8 w-8 text-brand-gold" aria-hidden />
              <h3 className="mt-4 text-lg font-bold text-white">Outils concrets</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Simulateurs et QCM pour préparer vos dossiers clients et vos arbitrages.
              </p>
            </li>
          </ul>
        </section>
      </main>

      <footer className="relative border-t border-white/10 py-8 text-center text-xs text-white/55">
        <p className="text-white/70">Formation agent immobilier — usage professionnel.</p>
        <details className="mt-4 text-left sm:mx-auto sm:max-w-xl">
          <summary className="cursor-pointer list-none text-center text-[11px] text-white/45 underline decoration-white/20 underline-offset-2 hover:text-white/65 [&::-webkit-details-marker]:hidden">
            Configuration technique (déploiement)
          </summary>
          <p className="mt-3 text-center text-[11px] leading-relaxed">
            Variables{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono">LMS_PASSWORD</code> et{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono">SESSION_SECRET</code> dans{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono">lms/.env.local</code>
          </p>
        </details>
      </footer>
    </div>
  );
}
