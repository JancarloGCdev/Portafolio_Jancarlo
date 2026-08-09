import { cookies } from "next/headers";

export type PortfolioLocale = "es" | "en";

export async function getPortfolioLocale(): Promise<PortfolioLocale> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value;

  if (locale === "en") {
    return "en";
  }

  return "es";
}
