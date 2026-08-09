"use client";

import { useTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setUserLocale } from "@/app/actions";
import { usePortfolio } from "@/components/portfolio-locale-provider";
import type { PortfolioLocale } from "@/lib/i18n/locale";

export function LocaleSwitcher() {
  const { locale: serverLocale } = usePortfolio(); 
  const [visualLocale, setVisualLocale] = useState<PortfolioLocale>(serverLocale);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    // El navegador SOLO determina el estado visual inicial si NO hay cookie de idioma
    const hasCookie = document.cookie.includes("NEXT_LOCALE=");
    if (!hasCookie) {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("en")) {
        setVisualLocale("en");
      } else {
        setVisualLocale("es");
      }
    } else {
      setVisualLocale(serverLocale);
    }
  }, [serverLocale]);

  const handleLocaleChange = (newLocale: PortfolioLocale) => {
    if (newLocale === visualLocale) return;
    
    // Actualización visual optimista inmediata
    setVisualLocale(newLocale);
    
    startTransition(async () => {
      await setUserLocale(newLocale);
      router.refresh(); // Fuerza a Next.js a re-fetchear los Server Components con la nueva cookie
    });
  };

  return (
    <div
      className="flex items-center gap-1 rounded-md border border-zinc-800 bg-zinc-950/80 p-1 text-xs font-medium"
      role="group"
      aria-label="Selector de idioma / Language selector"
    >
      <button
        type="button"
        disabled={isPending}
        onClick={() => handleLocaleChange("es")}
        className={`rounded px-2 py-1 transition-all ${
          visualLocale === "es"
            ? "bg-zinc-800 text-zinc-100 shadow-sm ring-1 ring-zinc-700/50"
            : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"
        } ${isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        aria-pressed={visualLocale === "es"}
        aria-label="Cambiar a Español"
      >
        ES
      </button>
      <div className="h-3 w-px bg-zinc-800" aria-hidden="true" />
      <button
        type="button"
        disabled={isPending}
        onClick={() => handleLocaleChange("en")}
        className={`rounded px-2 py-1 transition-all ${
          visualLocale === "en"
            ? "bg-zinc-800 text-zinc-100 shadow-sm ring-1 ring-zinc-700/50"
            : "text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"
        } ${isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        aria-pressed={visualLocale === "en"}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
}
