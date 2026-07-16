import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@react-pdf/renderer"],
  // Les médias de public/ sont servis par le CDN : ils n'ont rien à faire dans
  // la fonction serverless. Sans ces exclusions, le tracing embarque ~180 Mo
  // d'audio dans la fonction et le déploiement Netlify dépasse sa limite de 250 Mo.
  outputFileTracingExcludes: {
    "/*": [
      "./public/audio/**",
      "./public/videos/**",
      "./public/avatars/**",
      "./public/generated/**",
      "./public/images/**",
      "./public/formation-infographies/**",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        // Prevent stale Server Action IDs after redeployment
        source: "/(login|register|formation)(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "Permissions-Policy",
            value: "microphone=(self), camera=(self)",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://images.unsplash.com https://*.tile.openstreetmap.org https://tile.openstreetmap.org https://unpkg.com",
              "font-src 'self'",
              "connect-src 'self' https://api.openai.com https://*.supabase.co",
              "media-src 'self' blob:",
              "frame-src 'self' https://view.monday.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
