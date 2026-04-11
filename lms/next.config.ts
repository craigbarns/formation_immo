import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Évite que Turbopack remonte au mauvais workspace (plusieurs lockfiles). */
  turbopack: {
    root: path.join(__dirname),
  },
  /**
   * Autoriser le micro / la caméra pour l’iframe cross-origin embed.liveavatar.com
   * (sinon certains navigateurs bloquent la conversation vocale dans l’embed).
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Permissions-Policy",
            value:
              'microphone=(self "https://embed.liveavatar.com"), camera=(self "https://embed.liveavatar.com")',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
