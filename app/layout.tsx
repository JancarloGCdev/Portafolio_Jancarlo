import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { PROFILE } from "@/lib/data";
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

const title = "Consola JGC · Jancarlo Gallón Cano · Portafolio";
const description =
  "Portafolio en español: desarrollo web, prácticas de ciberseguridad y proyectos públicos pensados para reclutamiento claro.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title,
  description,
  applicationName: "Portafolio JGC",
  authors: [{ name: PROFILE.name }],
  creator: PROFILE.name,
  keywords: [
    "portafolio",
    "desarrollo web",
    "ciberseguridad",
    "Jancarlo Gallón Cano",
    "Colombia",
    "Next.js",
  ],
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "/",
    siteName: "Portafolio JGC",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={jetbrains.variable}>
      <body className="font-mono">{children}</body>
    </html>
  );
}
