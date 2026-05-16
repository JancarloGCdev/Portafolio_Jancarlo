/** Solo http(s) externos; rechaza javascript:, data:, etc. Devuelve string normalizada o undefined. */
export function sanitizeHttpsUrl(raw: unknown): string | undefined {
  if (raw === undefined || raw === null) return undefined;
  if (typeof raw !== "string") return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  let u: URL;
  try {
    u = new URL(trimmed);
  } catch {
    return undefined;
  }
  if (u.protocol !== "http:" && u.protocol !== "https:") return undefined;
  if (!u.hostname) return undefined;
  return u.href;
}

/** Valida cada link del proyecto después de sanitizar href. */
export function sanitizeDevProjectUrls<T extends { liveUrl?: string; links?: { href: string; label: string; variant?: string }[] }>(
  p: T,
): T {
  const liveUrl = sanitizeHttpsUrl(p.liveUrl);
  const links = (p.links ?? []).map((l) => ({
    ...l,
    href: sanitizeHttpsUrl(l.href) ?? "",
  })).filter((l) => l.href.length > 0);
  return { ...p, liveUrl: liveUrl ?? undefined, links };
}
