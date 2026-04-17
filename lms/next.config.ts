import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
