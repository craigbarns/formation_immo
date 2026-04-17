import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Évite que Turbopack remonte au mauvais workspace (plusieurs lockfiles). */
  turbopack: {
    root: path.join(__dirname),
  },
  /** Micro / caméra réservés à l’origine de l’app (widgets ou futurs iframes D-ID sur votre domaine). */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Permissions-Policy",
            value: "microphone=(self), camera=(self)",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
