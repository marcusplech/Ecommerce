export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const withProtocol = vercel.startsWith("http")
      ? vercel
      : `https://${vercel}`;
    return withProtocol.replace(/\/$/, "");
  }

  return "http://localhost:3000";
}
