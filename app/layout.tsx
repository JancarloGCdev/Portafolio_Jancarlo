import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Consola JGC · Jancarlo Gallón Cano · Portafolio",
  description:
    "Portafolio en español: desarrollo web, prácticas de ciberseguridad y proyectos públicos pensados para reclutamiento claro.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={jetbrains.variable}>
      <body className="font-mono">{children}</body>
    </html>
  );
}
