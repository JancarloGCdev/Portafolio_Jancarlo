import type { Metadata } from "next";
import { headers } from "next/headers";
import { JetBrains_Mono } from "next/font/google";
import { PortfolioLocaleProvider } from "@/components/portfolio-locale-provider";
import { PROFILE } from "@/lib/data";
import { pickPortfolioLocaleFromHeader } from "@/lib/i18n/locale";
import { getPageCopy } from "@/lib/page-copy";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

/** URL canónica para metadatos (Open Graph, enlaces absolutos). En Vercel usa el dominio del despliegue si no defines NEXT_PUBLIC_SITE_URL. */
function siteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export async function generateMetadata(): Promise<Metadata> {
  const hdr = await headers();
  const locale = pickPortfolioLocaleFromHeader(hdr.get("accept-language"));
  const copy = getPageCopy(locale);
  const title = copy.seo.title;
  const description = copy.seo.description;

  return {
    metadataBase: new URL(siteUrl()),
    title,
    description,
    applicationName: copy.seo.applicationName,
    authors: [{ name: PROFILE.name }],
    creator: PROFILE.name,
    keywords: [...copy.seo.keywords],
    openGraph: {
      type: "website",
      locale: copy.seo.ogLocale,
      url: "/",
      siteName: copy.seo.siteName,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const hdr = await headers();
  const locale = pickPortfolioLocaleFromHeader(hdr.get("accept-language"));
  const lang = locale === "en" ? "en" : "es";

  return (
    <html lang={lang} className={jetbrains.variable}>
      <body className="font-mono">
        <PortfolioLocaleProvider locale={locale}>{children}</PortfolioLocaleProvider>
      </body>
    </html>
  );
}
