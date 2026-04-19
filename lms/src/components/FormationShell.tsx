"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Home, Award, BarChart2, Building2, GraduationCap, BookOpen } from "lucide-react";
import { XPBar } from "@/components/gamification/XPBar";
import { GlobalSearch } from "@/components/search";
import { MagneticButton } from "@/components/animations";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { useSyncSupabase } from "@/hooks/useSyncSupabase";

export function FormationShell({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  useSyncSupabase();

  return (
    <div className="formation-canvas text-zinc-900">
      <header
        className="sticky top-0 z-50 border-b border-amber-400/30 shadow-lg"
        style={{ backgroundColor: "var(--brand-navy)" }}
      >
        <div className="mx-auto max-w-6xl px-4 py-2">
          <p className="text-center text-xs leading-snug text-amber-100 sm:text-left">
            <span className="hidden sm:inline">
              Formation premium · Accès illimité · Progressez à votre rythme
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
                <Building2 className="h-5 w-5 text-white" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-amber-100 group-hover:text-amber-100">
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
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-white/80 outline-none transition hover:bg-white/15 hover:text-white focus-ring-brand-dark"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Rechercher</span>
                <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 text-xs font-mono bg-white/20 rounded">
                  ⌘K
                </kbd>
              </button>
            </MagneticButton>

            <NavItem href="/formation">Parcours</NavItem>
            <NavItem href="/formation/supports-visuels">Fiches</NavItem>
            <NavItem href="/formation/outils">Simulateurs</NavItem>
            <NavItem href="/formation/examen/juridique">Examens</NavItem>
            <NavItem href="/formation/profil">Profil</NavItem>
            <LogoutButton />
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 pb-20 sm:px-6 md:pb-10">{children}</main>

      <footer className="border-t border-zinc-200/90 bg-white/85 py-10 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md space-y-2 text-center sm:text-left">
            <p className="text-sm font-semibold text-brand-navy">Merci de votre confiance</p>
            <p className="text-xs leading-relaxed text-zinc-600">
              Contenu structuré, mises à jour et ressources téléchargeables pour vous accompagner
              jusqu&apos;au terrain.
            </p>
          </div>
          <div className="flex flex-col gap-3">
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
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-zinc-400 sm:justify-end">
              <span>Formation en ligne — N° d&apos;activité en cours d&apos;inscription</span>
              <span aria-hidden>·</span>
              <Link href="/mentions-legales" className="hover:text-zinc-600 hover:underline">Mentions légales</Link>
              <span aria-hidden>·</span>
              <Link href="/cgv" className="hover:text-zinc-600 hover:underline">CGV</Link>
              <span aria-hidden>·</span>
              <a href="mailto:contact@formation42h.fr" className="hover:text-zinc-600 hover:underline">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Search */}
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-zinc-200/90 bg-white/95 px-2 py-2 backdrop-blur-md md:hidden shadow-md">
        <MobileNavItem href="/formation" icon={<Home className="h-5 w-5" />} label="Parcours" />
        <MobileNavItem href="/formation/examen/juridique" icon={<GraduationCap className="h-5 w-5" />} label="Examens" />
        <MobileNavItem href="/formation/outils" icon={<BarChart2 className="h-5 w-5" />} label="Outils" />
        <MobileNavItem href="/formation/supports-visuels" icon={<BookOpen className="h-5 w-5" />} label="Fiches" />
        <MobileNavItem href="/formation/profil" icon={<Award className="h-5 w-5" />} label="Profil" />
      </nav>
    </div>
  );
}

function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-full px-3 py-2 text-sm font-semibold text-white drop-shadow-sm outline-none transition hover:bg-white/15 hover:text-amber-50 focus-ring-brand-dark"
    >
      {children}
    </Link>
  );
}

function MobileNavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-0.5 px-3 py-1.5 text-zinc-600 hover:text-brand-navy transition-colors"
    >
      <span className="text-brand-navy/70">{icon}</span>
      <span className="text-xs font-semibold">{label}</span>
    </Link>
  );
}
