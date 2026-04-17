import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  /** Force la racine Turbopack au dossier de l'app pour éviter la détection d'un lockfile parent. */
  turbopack: {
    root: path.join(__dirname),
  },
  /** Micro / caméra réservés à l’origine de l’app. */
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
