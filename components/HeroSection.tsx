"use client";

import React, { useRef } from "react";
import { usePortfolio } from "@/components/portfolio-locale-provider";
import { HeroTerminal } from "./HeroTerminal";
import { HeroPortrait } from "./HeroPortrait";
import { ArrowRight, Mail, ShieldCheck, Database, Layers, Sparkles, TerminalSquare, Github, Linkedin } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function HeroSection() {
  const { locale, profile } = usePortfolio();
  const containerRef = useRef<HTMLElement>(null);
  const identityBlockRef = useRef<HTMLDivElement>(null);
  const terminalBlockRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Entrance of Portrait
      tl.from(".hero-portrait-anim", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      })
        // 2. Stagger of commercial content (Badge, Name, Title, Pitch)
        .from(
          ".hero-badge",
          {
            y: -12,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.6"
        )
        .from(
          ".hero-title",
          {
            y: 18,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          ".hero-subtitle",
          {
            y: 14,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.4"
        )
        .from(
          ".hero-desc",
          {
            y: 14,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.3"
        )
        // 3. CTAs & Technical badges
        .from(
          ".hero-cta",
          {
            y: 12,
            opacity: 0,
            duration: 0.45,
            stagger: 0.08,
          },
          "-=0.3"
        )
        .from(
          ".hero-pills",
          {
            opacity: 0,
            y: 8,
            duration: 0.4,
          },
          "-=0.2"
        )
        // 4. Interactive Linux Terminal entrance
        .from(
          terminalBlockRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.3"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-[500px] h-[500px] sm:w-[750px] sm:h-[750px] rounded-full bg-gradient-to-tr from-cyan-950/20 via-blue-950/15 to-emerald-950/10 blur-[140px] opacity-70" />
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-cyan-500/5 blur-[100px]" />
      </div>

      {/* Subtle background grid */}
      <div 
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03] [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="max-w-7xl w-full mx-auto flex flex-col gap-10 lg:gap-14">
        {/* =========================================================================
            STAGE 1 (DESKTOP & MOBILE): UNIFIED IDENTITY & PORTRAIT BLOCK
            [ FOTO (A LA IZQUIERDA) + NOMBRE / ROL / PROPUESTA / CTAs (A LA DERECHA) ]
           ========================================================================= */}
        <div 
          ref={identityBlockRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full"
        >
          {/* DESKTOP: Photo on the LEFT (5 cols) */}
          <div className="hidden lg:flex lg:col-span-5 h-full min-h-[380px] lg:min-h-[440px] xl:min-h-[480px] items-end justify-center relative">
            <div className="hero-portrait-anim w-full h-full flex items-end justify-center">
              <HeroPortrait className="w-full h-full" priority />
            </div>
          </div>

          {/* MAIN IDENTITY & COMMERCIAL PITCH (7 cols Desktop / Full width Mobile) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left w-full">
            {/* 1. Eyebrow Status Badge */}
            <div className="hero-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-raised border border-zinc-800/90 shadow-sm mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-zinc-300 tracking-wide">
                {profile.status}
              </span>
              <span className="text-zinc-600 text-xs">|</span>
              <span className="text-[11px] font-mono text-cyan-400">Pereira, CO · Remote</span>
            </div>

            {/* 2. Name */}
            <h1 className="hero-title text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] mb-2">
              {profile.name}
            </h1>

            {/* 3. Role Subtitle */}
            <div className="hero-subtitle text-lg sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 mb-4 flex items-center gap-2">
              <TerminalSquare className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>
                {locale === "es"
                  ? "Software Engineer & Desarrollador Full Stack"
                  : "Software Engineer & Full Stack Developer"}
              </span>
            </div>

            {/* 4. Commercial Value Proposition */}
            <p className="hero-desc text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl mb-5">
              {locale === "es"
                ? "Desarrollo aplicaciones web modernas, arquitecturas backend y productos full stack con Next.js, React, TypeScript, .NET (C#) y Python. Experiencia en producción empresarial, optimización de base de datos SQL y enfoque de ingeniería respaldado por formación en Cloud, AI y Ciberseguridad."
                : "I build modern web applications, scalable backend architectures, and full-stack products using Next.js, React, TypeScript, .NET (C#), and Python. Backed by production enterprise experience, SQL database tuning, and engineering training in Cloud, AI, and Cybersecurity."}
            </p>

            {/* MOBILE ONLY: Natural order in mobile (Photo appears right after value proposition) */}
            <div className="hero-portrait-anim lg:hidden w-full h-[320px] sm:h-[380px] mb-6 flex items-end justify-center">
              <HeroPortrait className="w-full h-full max-w-[300px] sm:max-w-[340px]" priority />
            </div>

            {/* 5. Call To Actions (CTAs) */}
            <div className="flex flex-wrap items-center gap-3.5 mb-6 w-full sm:w-auto">
              <a
                href="#projects"
                className="hero-cta group relative inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 text-zinc-950 font-bold text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 hover:brightness-110 active:scale-[0.98] transition-all"
              >
                <span>{locale === "es" ? "Ver proyectos" : "View projects"}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#contact"
                className="hero-cta inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-zinc-700/80 bg-zinc-900/60 hover:bg-zinc-800/80 hover:border-zinc-600 text-zinc-200 font-semibold text-sm transition-all active:scale-[0.98]"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>{locale === "es" ? "Contactarme" : "Contact me"}</span>
              </a>

              <div className="flex items-center gap-2 ml-auto sm:ml-2">
                <a
                  href="https://github.com/JancarloGCdev"
                  target="_blank"
                  rel="noreferrer"
                  className="hero-cta p-2.5 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:text-cyan-400 text-zinc-400 transition-colors"
                  aria-label="GitHub Profile"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com/in/jancarlo-gallon-cano"
                  target="_blank"
                  rel="noreferrer"
                  className="hero-cta p-2.5 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:text-cyan-400 text-zinc-400 transition-colors"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* 6. Quick Technical Highlights Pills */}
            <div className="hero-pills pt-3.5 border-t border-zinc-800/80 w-full flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Next.js · React · TypeScript
              </span>
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                .NET / C# · Blazor · Python
              </span>
              <span className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-amber-400" />
                SQL Server · PostgreSQL
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                Docker · Azure · CCNA Security
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            STAGE 2: INTERACTIVE LINUX TERMINAL
            [ FOTO + IDENTIDAD ] → [ TERMINAL LINUX ]
           ========================================================================= */}
        <div 
          ref={terminalBlockRef}
          className="w-full relative max-w-5xl mx-auto"
        >
          {/* Subtle glow aura behind terminal */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-teal-500/5 to-emerald-500/10 blur-xl opacity-75 -z-10" />
          <HeroTerminal />
        </div>
      </div>
    </section>
  );
}
