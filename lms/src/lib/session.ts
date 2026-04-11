import type { SessionOptions } from "iron-session";

export const sessionOptions: SessionOptions = {
  cookieName: "formation_immobilier_session",
  password: process.env.SESSION_SECRET ?? "development-only-secret-min-32-chars!!",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  },
};
