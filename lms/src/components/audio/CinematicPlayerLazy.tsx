"use client";

import dynamic from "next/dynamic";

export const CinematicPlayer = dynamic(
  () => import("./CinematicPlayer").then((m) => m.CinematicPlayer),
  { ssr: false }
);
