import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ToastProvider } from "@/components/toast";
import { FocusModeProvider } from "@/components/focus-mode";
import { PwaRegister } from "@/components/PwaRegister";
import { Analytics } from "@vercel/analytics/next";
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

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
    default: "Formation immobilière Loi ALUR en ligne | MonPassFormation",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Formation immobilière en ligne de 45h : socle Loi ALUR de 42h, module TRACFIN de 3h, QCM, supports et suivi de progression.",
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  authors: [{ name: "PASS Formation" }],
  creator: "PASS Formation",
  publisher: "PASS Formation",
  category: "Formation professionnelle",
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  openGraph: {
    title: "Formation immobilière Loi ALUR en ligne",
    description:
      "Un parcours en ligne de 45h : socle Loi ALUR de 42h et module TRACFIN de 3h.",
    locale: "fr_FR",
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1024,
        height: 576,
        alt: "Formation immobilière Loi ALUR en ligne",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Formation immobilière Loi ALUR en ligne",
    description:
      "Un parcours en ligne de 45h : socle Loi ALUR de 42h et module TRACFIN de 3h.",
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      }
    : undefined,
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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="formation-theme">
          <FocusModeProvider>
            <ToastProvider>
              {children}
              <PwaRegister />
              <Analytics />
            </ToastProvider>
          </FocusModeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
