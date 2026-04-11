import "iron-session";

declare module "iron-session" {
  interface SessionData {
    isLoggedIn?: boolean;
  }
}
