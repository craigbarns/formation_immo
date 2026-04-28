export function getAppUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    "https://app.monpassformation.com"
  ).replace(/\/$/, "");
}
