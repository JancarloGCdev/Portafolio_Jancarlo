"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { usePortfolio } from "./portfolio-locale-provider";

type SectionId = "experience" | "projects" | "skills" | "contact";

const SECTION_KEYS: readonly SectionId[] = ["experience", "projects", "skills", "contact"];

export function Navbar() {
  const { profile, locale } = usePortfolio();
  const [activeSection, setActiveSection] = useState<string>("");

  const navItems: { id: SectionId; label: string }[] = [
    { id: "experience", label: locale === "es" ? "Experiencia" : "Experience" },
    { id: "projects", label: locale === "es" ? "Proyectos" : "Projects" },
    { id: "skills", label: locale === "es" ? "Skills" : "Skills" },
    { id: "contact", label: locale === "es" ? "Contacto" : "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Bottom of page detection (activates contact)
      if (scrollY + windowHeight >= documentHeight - 60) {
        setActiveSection("contact");
        return;
      }

      // Top of page check before experience section
      const expEl = document.getElementById("experience");
      if (expEl && scrollY + 220 < expEl.offsetTop) {
        setActiveSection("");
        return;
      }

      // Active section scan from bottom to top
      let current = "";
      for (let i = SECTION_KEYS.length - 1; i >= 0; i--) {
        const id = SECTION_KEYS[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - 140;
          if (scrollY >= top) {
            current = id;
            break;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-[#050b14]/85 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={() => setActiveSection("")}
          className="text-base sm:text-lg font-bold tracking-tight text-white hover:text-cyan-400 transition-colors flex items-center gap-2.5 group"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-125 group-hover:shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all" />
          <span>{profile.name}</span>
        </Link>

        {/* Desktop Navigation with Active Pill Highlighting */}
        <nav className="hidden md:flex items-center gap-1.5 text-sm font-medium">
          {navItems.map(({ id, label }) => {
            const isActive = activeSection === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setActiveSection(id)}
                className={`relative px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-cyan-300 bg-cyan-950/70 border border-cyan-500/40 shadow-[0_0_15px_rgba(34,211,238,0.25)] font-semibold"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40 border border-transparent"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)] animate-pulse" />
                  )}
                  <span>{label}</span>
                </span>
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />
        </div>
      </div>

      {/* Mobile Navigation with Active Highlighting */}
      <div className="md:hidden border-t border-zinc-800/60 bg-[#050b14]/95 px-4 py-2">
        <div className="flex flex-wrap gap-1.5 text-xs font-medium text-zinc-400 justify-center">
          {navItems.map(({ id, label }) => {
            const isActive = activeSection === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setActiveSection(id)}
                className={`px-3 py-1 rounded-full transition-all duration-200 flex items-center gap-1 ${
                  isActive
                    ? "text-cyan-300 bg-cyan-950/80 border border-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.3)] font-semibold"
                    : "text-zinc-400 hover:text-zinc-200 border border-transparent"
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                )}
                <span>{label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
}
