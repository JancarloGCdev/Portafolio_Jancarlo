import type { Metadata } from "next";
import { headers } from "next/headers";
import { JetBrains_Mono } from "next/font/google";

import { PortfolioLocaleProvider } from "@/components/portfolio-locale-provider";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { pickPortfolioLocaleFromHeader } from "@/lib/i18n/locale";
import { getPageCopy } from "@/lib/page-copy";
import { resolvePortfolioBundles } from "@/lib/portfolio-resolve";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const hdr = await headers();
  const locale = pickPortfolioLocaleFromHeader(hdr.get("accept-language"));
  const bundles = await resolvePortfolioBundles();
  const profile = locale === "en" ? bundles.en.profile : bundles.es.profile;
  const copy = getPageCopy(locale);
  const title = copy.seo.title;
  const description = copy.seo.description;
  
  // Usamos directamente tu URL de Vercel real para evitar fallos de getSiteUrl()
  const base = "https://portafolio-jancarlo.vercel.app";
  const canonical = base;
  const ogImageAlt = `${profile.name} — ${copy.seo.ogTagline}`;

  return {
    // metadataBase le dice a Next.js cuál es el dominio absoluto para TODO el SEO
    metadataBase: new URL(base),
    title: {
      default: title,
      template: `%s · ${profile.name}`,
    },
    description,
    applicationName: copy.seo.applicationName,
    authors: [{ name: profile.name, url: canonical }],
    creator: profile.name,
    publisher: profile.name,
    keywords: [...copy.seo.keywords],
    category: "technology",
    alternates: {
      canonical: "/",
      languages: {
        es: "/",
        en: "/",
      },
    },
    openGraph: {
      type: "website",
      locale: copy.seo.ogLocale,
      alternateLocale: locale === "en" ? ["es_CO"] : ["en_US"],
      url: canonical,
      siteName: copy.seo.siteName,
      title,
      description,
      images: [
        {
          // Al tener metadataBase configurado arriba, Next.js resolverá esto automáticamente como:
          // https://vercel.app
          url: "/OpenGraphJancarlo.jpeg", 
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/OpenGraphJancarlo.jpeg"], // Next.js también lo volverá absoluto automáticamente
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/icon",
      apple: "/apple-icon",
    },
    verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : undefined,
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const hdr = await headers();
  const locale = pickPortfolioLocaleFromHeader(hdr.get("accept-language"));
  const bundles = await resolvePortfolioBundles();
  const lang = locale === "en" ? "en" : "es";

  return (
    <html lang={lang} className={jetbrains.variable}>
      {/* Eliminamos la etiqueta <meta> manual que tenías aquí porque Next.js ya la inyecta automáticamente gracias a generateMetadata */}
      <body className="font-mono">
        <SeoJsonLd />
        <PortfolioLocaleProvider locale={locale} bundles={bundles}>
          {children}
        </PortfolioLocaleProvider>
      </body>
    </html>
  );
}
