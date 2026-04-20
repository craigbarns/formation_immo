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
    <div className="formation-canvas min-h-screen bg-[#030712] text-white">
      <header
        className="sticky top-0 z-50 border-b border-white/10 bg-[#030712]/80 backdrop-blur-xl shadow-2xl"
      >
        <div className="mx-auto max-w-6xl px-4 py-2 border-b border-white/[0.05]">
          <p className="text-center text-xs font-medium leading-snug text-white/70 sm:text-left">
            <span className="hidden sm:inline">
              FORMATION PREMIUM · ACCÈS ILLIMITÉ · EXPÉRIENCE CINÉMATIQUE
            </span>
            <span className="sm:hidden">FORMATION PREMIUM · ACCÈS ILLIMITÉ</span>
          </p>
        </div>
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-4 px-4 pb-4 pt-2 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-5">
            <Link
              href="/formation"
              className="group flex shrink-0 items-center gap-3 leading-tight text-white transition hover:text-brand-gold"
            >
              <div
                className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-gold to-[#b4941f] text-brand-navy shadow-lg shadow-brand-gold/20 transition-transform group-hover:scale-105"
                aria-hidden
              >
                <Building2 className="h-6 w-6" />
              </div>
              <span className="min-w-0">
                <span className="block text-2xs font-black uppercase tracking-[0.25em] text-brand-gold/90 group-hover:text-brand-gold transition-colors">
                  VOTRE ESPACE
                </span>
                <span className="block truncate text-lg font-black tracking-tight text-white sm:text-xl">
                  Formation 42 h
                </span>
              </span>
            </Link>
            <div className="flex min-w-0 items-center border-l border-white/15 pl-3 sm:pl-5">
              <XPBar />
            </div>
          </div>
          <nav
            className="flex flex-wrap items-center justify-center gap-1.5 border-t border-white/10 pt-3 text-sm lg:justify-end lg:border-t-0 lg:pt-0"
            aria-label="Navigation formation"
          >
            {/* Search button */}
            <MagneticButton strength={0.2}>
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white/80 outline-none transition hover:bg-white/15 hover:text-white hover:border-white/20"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Rechercher</span>
                <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 text-xs font-mono bg-white/10 rounded border border-white/10">
                  ⌘K
                </kbd>
              </button>
            </MagneticButton>

            <NavItem href="/formation">Parcours</NavItem>
            <NavItem href="/formation/supports-visuels">Fiches</NavItem>
            <NavItem href="/formation/outils">Simulateurs</NavItem>
            <NavItem href="/formation/examen/juridique">Examens</NavItem>
            <NavItem href="/formation/profil">Profil</NavItem>
            <div className="ml-1 border-l border-white/15 pl-1">
              <LogoutButton />
            </div>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 pb-24 sm:px-6 md:pb-12">{children}</main>

      <footer className="border-t border-white/10 bg-[#020617] py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-md space-y-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="h-2 w-2 rounded-full bg-brand-gold animate-pulse" />
              <p className="text-sm font-black uppercase tracking-widest text-white">FORMATION 42 H</p>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              Contenu structuré, mises à jour législatives 2026 et ressources professionnelles téléchargeables pour vous accompagner du premier mandat jusqu&apos;au closing final.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs font-bold uppercase tracking-wider sm:justify-end">
              <Link
                href="/formation/supports-visuels"
                className="text-white/70 transition hover:text-brand-gold"
              >
                Fiches visuelles
              </Link>
              <Link
                href="/formation/outils"
                className="text-white/70 transition hover:text-brand-gold"
              >
                Simulateurs
              </Link>
              <Link
                href="/formation/profil"
                className="text-white/70 transition hover:text-brand-gold"
              >
                Certificat
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-white/60 sm:justify-end">
              <span>Formation certifiante ALUR 2026</span>
              <span aria-hidden>·</span>
              <Link href="/mentions-legales" className="hover:text-white/80 transition">Mentions légales</Link>
              <span aria-hidden>·</span>
              <Link href="/cgv" className="hover:text-white/80 transition">CGV</Link>
              <span aria-hidden>·</span>
              <a href="mailto:contact@formation42h.fr" className="hover:text-white/80 transition">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Search */}
      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-white/10 bg-[#030712]/90 px-2 py-3 backdrop-blur-xl md:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
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
      className="rounded-full px-3.5 py-2 text-sm font-bold text-white/70 transition hover:bg-white/10 hover:text-white focus-ring-brand-dark"
    >
      {children}
    </Link>
  );
}

function MobileNavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-1 px-3 py-1 text-white/60 transition-colors hover:text-brand-gold"
    >
      <span className="transition-transform active:scale-90">{icon}</span>
      <span className="text-[10px] font-black uppercase tracking-wider">{label}</span>
    </Link>
  );
}
