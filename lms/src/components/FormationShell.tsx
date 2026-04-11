"use client";

import Link from "next/link";
import { useState } from "react";
import { Search } from "lucide-react";
import { XPBar } from "@/components/gamification/XPBar";
import { GlobalSearch } from "@/components/search";
import { MagneticButton } from "@/components/animations";
import { ThemeToggleSimple } from "@/components/theme";
import { FrenchCoach } from "@/components/coach/FrenchCoach";

export function FormationShell({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="formation-canvas text-zinc-900">
      <header
        className="sticky top-0 z-50 border-b border-amber-400/30 shadow-[0_8px_28px_rgba(0,0,0,0.2)]"
        style={{ backgroundColor: "var(--brand-navy)" }}
      >
        <div className="mx-auto max-w-6xl px-4 py-2">
          <p className="text-center text-[10px] leading-snug text-amber-100/90 sm:text-left">
            <span className="hidden sm:inline">
              Formation premium · Accès illimité à tout le contenu · Progressez à votre rythme
            </span>
            <span className="sm:hidden">Formation premium · Accès illimité</span>
          </p>
        </div>
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-4 px-4 pb-4 pt-1 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-5">
            <Link
              href="/formation"
              className="group flex shrink-0 items-center gap-3 leading-tight text-white transition hover:text-amber-200"
            >
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-lg shadow-inner ring-1 ring-white/25"
                aria-hidden
              >
                🏛️
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-100/80 group-hover:text-amber-100">
                  Votre espace
                </span>
                <span className="block truncate text-base font-bold tracking-tight text-white sm:text-lg">
                  Formation 42 h
                </span>
              </span>
            </Link>
            <div className="flex min-w-0 items-center border-l border-white/20 pl-3 sm:pl-5">
              <XPBar />
            </div>
          </div>
          <nav
            className="flex flex-wrap items-center justify-center gap-1 border-t border-white/15 pt-3 text-sm lg:justify-end lg:border-t-0 lg:pt-0"
            aria-label="Navigation formation"
          >
            {/* Search button */}
            <MagneticButton strength={0.2}>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 rounded-full px-3 py-2 text-[13px] font-semibold text-white/80 hover:bg-white/15 hover:text-white transition"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Rechercher</span>
                <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono bg-white/20 rounded">
                  ⌘K
                </kbd>
              </button>
            </MagneticButton>

            <NavItem href="/formation">Parcours</NavItem>
            <NavItem href="/formation/supports-visuels">Fiches</NavItem>
            <NavItem href="/formation/outils">Outils</NavItem>
            <NavItem href="/formation/production">Production</NavItem>
            <NavItem href="/formation/interactive-avatar">Coach</NavItem>
            <NavItem href="/formation/profil">Profil</NavItem>
            <ThemeToggleSimple />
            <a
              href="/api/logout"
              className="ml-1 rounded-full border border-white/40 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:border-amber-200/60 hover:bg-white/20"
            >
              Déconnexion
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 pb-20 sm:px-6">{children}</main>

      <footer className="border-t border-zinc-200/90 bg-white/85 py-10 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md space-y-2 text-center sm:text-left">
            <p className="text-sm font-semibold text-brand-navy">Merci de votre confiance</p>
            <p className="text-xs leading-relaxed text-zinc-600">
              Contenu structuré, mises à jour et ressources téléchargeables pour vous accompagner
              jusqu&apos;au terrain.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs sm:justify-end">
            <Link
              href="/formation/supports-visuels"
              className="font-semibold text-brand-navy underline-offset-4 hover:underline"
            >
              Fiches visuelles
            </Link>
            <span className="text-zinc-300" aria-hidden>
              ·
            </span>
            <Link
              href="/formation/outils"
              className="font-semibold text-brand-navy underline-offset-4 hover:underline"
            >
              Simulateurs
            </Link>
            <span className="text-zinc-300" aria-hidden>
              ·
            </span>
            <Link
              href="/formation/profil"
              className="font-semibold text-brand-navy underline-offset-4 hover:underline"
            >
              Certificat & badges
            </Link>
          </div>
        </div>
      </footer>

      {/* Global Search */}
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      {/* French Coach */}
      <FrenchCoach />
    </div>
  );
}

function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-full px-3 py-2 text-[13px] font-semibold text-white drop-shadow-sm transition hover:bg-white/15 hover:text-amber-50"
    >
      {children}
    </Link>
  );
}
