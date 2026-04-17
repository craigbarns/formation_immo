import path from "path";
import type { NextConfig } from "next";

const root = path.join(__dirname);

const nextConfig: NextConfig = {
  /** Aligne outputFileTracingRoot et turbopack.root sur le même dossier. */
  outputFileTracingRoot: root,
  turbopack: {
    root,
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
