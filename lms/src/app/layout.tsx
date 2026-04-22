import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/toast";
import { FocusModeProvider } from "@/components/focus-mode";
import { PwaRegister } from "@/components/PwaRegister";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MonPassFormation — Formations professionnelles",
    template: "%s | MonPassFormation",
  },
  description:
    "Plateforme de formations professionnelles en ligne, avec un premier module immobilier 42h conforme ALUR 2026.",
  metadataBase: new URL("https://www.monpassformation.com"),
  openGraph: {
    title: "MonPassFormation — Formations professionnelles",
    description:
      "Catalogue de formations professionnelles en ligne, dont le module immobilier 42h conforme ALUR 2026.",
    locale: "fr_FR",
    type: "website",
    siteName: "MonPassFormation",
    url: "https://www.monpassformation.com",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a3a5c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <FocusModeProvider>
          <ToastProvider>
            {children}
            <PwaRegister />
          </ToastProvider>
        </FocusModeProvider>
      </body>
    </html>
  );
}
