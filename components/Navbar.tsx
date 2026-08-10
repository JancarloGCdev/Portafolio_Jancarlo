"use client";

import Link from "next/link";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { usePortfolio } from "./portfolio-locale-provider";

export function Navbar() {
  const { profile, locale } = usePortfolio();

  const navLabels = {
    about: locale === "es" ? "Sobre mí" : "About",
    experience: locale === "es" ? "Experiencia" : "Experience",
    projects: locale === "es" ? "Proyectos" : "Projects",
    skills: locale === "es" ? "Skills" : "Skills",
    contact: locale === "es" ? "Contacto" : "Contact",
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-[#050b14]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link 
          href="/" 
          className="text-base sm:text-lg font-bold tracking-tight text-white hover:text-cyan-400 transition-colors flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span>{profile.name}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
          <a href="#about" className="hover:text-cyan-400 transition-colors">{navLabels.about}</a>
          <a href="#experience" className="hover:text-cyan-400 transition-colors">{navLabels.experience}</a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors">{navLabels.projects}</a>
          <a href="#skills" className="hover:text-cyan-400 transition-colors">{navLabels.skills}</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">{navLabels.contact}</a>
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />
        </div>
      </div>
      
      {/* Mobile Links Navigation */}
      <div className="md:hidden border-t border-zinc-800/50 bg-[#050b14]/95 px-4 py-2">
        <div className="flex flex-wrap gap-4 text-xs font-medium text-zinc-400 justify-center">
          <a href="#about" className="hover:text-cyan-400 transition-colors">{navLabels.about}</a>
          <a href="#experience" className="hover:text-cyan-400 transition-colors">{navLabels.experience}</a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors">{navLabels.projects}</a>
          <a href="#skills" className="hover:text-cyan-400 transition-colors">{navLabels.skills}</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">{navLabels.contact}</a>
        </div>
      </div>
    </header>
  );
}
