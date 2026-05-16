export type PortfolioLocale = "es" | "en";

/**
 * Elige contenido ES o EN usando el encabezado Accept-Language.
 * Preferimos inglés sólo cuando el primer idioma aceptado comienza con `en`;
 * cualquier otro caso queda en español (valor por defecto del portafolio).
 */
export function pickPortfolioLocaleFromHeader(acceptLanguage: string | null): PortfolioLocale {
  if (!acceptLanguage?.trim()) return "es";

  const raw = acceptLanguage.split(",")[0]?.trim()?.replace(/;q=.*/, "").toLowerCase() ?? "";
  const first = raw.split("-")[0] ?? "";

  if (!first) return "es";
  return first.startsWith("en") ? "en" : "es";
}
