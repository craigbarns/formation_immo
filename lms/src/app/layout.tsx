import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { ToastProvider } from "@/components/toast";
import { ThemeProvider } from "@/lib/theme";
import { FocusModeProvider } from "@/components/focus-mode";
import { AICoachButton } from "@/components/ai-coach";
import { StreakReminder } from "@/components/retention";
import { ProactiveCoachBanner } from "@/components/ai-coach/ProactiveCoachBanner";

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
    default: "Formation agent immobilier — 42 h",
    template: "%s | Formation 42 h",
  },
  description:
    "Parcours professionnel : juridique, transaction, financement, marketing et terrain. Leçons, QCM, fiches et simulateurs.",
  openGraph: {
    title: "Formation agent immobilier — 42 h",
    description:
      "5 modules, leçons audio, QCM, simulateurs et fiches — aligné sur la pratique terrain.",
    locale: "fr_FR",
    type: "website",
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
        <ThemeProvider>
          <FocusModeProvider>
            <ToastProvider>
              {children}
              <StreakReminder />
              <ProactiveCoachBanner />
              <AICoachButton />
            </ToastProvider>
          </FocusModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

