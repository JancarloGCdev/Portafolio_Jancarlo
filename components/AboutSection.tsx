"use client";

import React, { useRef } from "react";
import { usePortfolio } from "@/components/portfolio-locale-provider";
import {
  UserCheck,
  Zap,
  ShieldCheck,
  Code2,
  CheckCircle2,
  Linkedin,
  ArrowUpRight,
  Sparkles,
  Layers,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutSection() {
  const { locale } = usePortfolio();
  const containerRef = useRef<HTMLElement>(null);
  const linkedinUrl = "https://www.linkedin.com/in/jancarlo-gc";

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      gsap.from(".about-single-anim", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 20,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full py-12 sm:py-16 bg-[#050b14] border-t border-zinc-900/80 overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
        <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-cyan-950/20 via-blue-950/15 to-transparent blur-[140px] opacity-60" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* =========================================================================
            1. SECTION HEADER (Ultra-compact, fits in 1 screen view)
           ========================================================================= */}
        <div className="about-single-anim flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-cyan-400 tracking-wider uppercase">
              <UserCheck className="w-3 h-3 text-cyan-400" />
              <span>{locale === "es" ? "01. Perfil de Ingeniería" : "01. Engineering Profile"}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {locale === "es" ? (
                <>
                  Resumen Ejecutivo &{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
                    Propuesta de Valor
                  </span>
                </>
              ) : (
                <>
                  Executive Summary &{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
                    Value Proposition
                  </span>
                </>
              )}
            </h2>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-[11px] font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{locale === "es" ? "Disponible para Contratación" : "Available for Hire"}</span>
          </div>
        </div>

        {/* =========================================================================
            2. UNIFIED SINGLE MASTER CONTAINER (Fits in 1 Screen View)
           ========================================================================= */}
        <div className="about-single-anim rounded-2xl border border-zinc-700/80 bg-[#09111c]/95 backdrop-blur-2xl p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden space-y-6">
          {/* Top glowing line */}
          <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* LEFT COLUMN: Concise Commercial Narrative */}
            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {locale === "es" ? "Ingeniero de Software Versátil" : "Versatile Software Engineer"}
                </span>

                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
                  {locale === "es"
                    ? "Resuelvo problemas complejos en producción adaptándome a cualquier stack técnico."
                    : "Solving complex business problems with clean production code in any tech stack."}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
                {locale === "es"
                  ? "Ingeniero de Sistemas (UTP, 9no sem) y Técnico en Software (SENA) con experiencia real en Outsourcing S.A.S. BIC (.NET, Blazor, SQL Server). Destaco por mi pensamiento crítico, adaptabilidad a diferentes tecnologías y código mantenible guiado por mejores prácticas."
                  : "Systems Engineer (UTP) and Software Associate (SENA) with production experience at Outsourcing S.A.S. BIC (.NET, Blazor, SQL Server). Known for critical thinking, fast stack adaptation, and clean maintainable code."}
              </p>

              {/* 3 Micro Impact Pillars */}
              <div className="grid grid-cols-3 gap-2.5 pt-1">
                <div className="p-2.5 rounded-lg bg-[#060b13] border border-zinc-800 space-y-0.5">
                  <div className="flex items-center gap-1 text-[11px] font-mono text-cyan-400 font-bold">
                    <Zap className="w-3 h-3" />
                    <span>{locale === "es" ? "Producción" : "Production"}</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 leading-tight">
                    {locale === "es" ? "SLA 99.9% uptime." : "SLA 99.9% uptime."}
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-[#060b13] border border-zinc-800 space-y-0.5">
                  <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-bold">
                    <Code2 className="w-3 h-3" />
                    <span>{locale === "es" ? "Full Stack" : "Full Stack"}</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 leading-tight">
                    {locale === "es" ? "Web, APIs & DBs." : "Web, APIs & DBs."}
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-[#060b13] border border-zinc-800 space-y-0.5">
                  <div className="flex items-center gap-1 text-[11px] font-mono text-purple-400 font-bold">
                    <ShieldCheck className="w-3 h-3" />
                    <span>{locale === "es" ? "Credenciales" : "Credentials"}</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 leading-tight">
                    {locale === "es" ? "Meta, Google, Cisco." : "Meta, Google, Cisco."}
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Proof Box */}
            <div className="lg:col-span-5">
              <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-b from-[#070d18] to-[#091222] border border-zinc-700/80 space-y-3.5 shadow-xl">
                <div className="flex items-center justify-between pb-2.5 border-b border-zinc-800 font-mono text-xs">
                  <span className="text-white font-bold flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    {locale === "es" ? "Compromiso Técnico" : "Technical Proof"}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 text-[10px] font-bold border border-cyan-500/30">
                    INGLÉS B1-B2
                  </span>
                </div>

                <ul className="space-y-2 text-xs text-zinc-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">
                        {locale === "es" ? "Software de Producción:" : "Production Code:"}
                      </strong>{" "}
                      {locale === "es"
                        ? ".NET Blazor Server & SQL Server Stored Procedures."
                        : ".NET Blazor Server & SQL Server Stored Procedures."}
                    </span>
                  </li>

                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">
                        {locale === "es" ? "Desarrollo Web Moderno:" : "Modern Web Stack:"}
                      </strong>{" "}
                      {locale === "es"
                        ? "React, Next.js App Router, FastAPI & Tailwind."
                        : "React, Next.js App Router, FastAPI & Tailwind."}
                    </span>
                  </li>

                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">
                        {locale === "es" ? "Redes & Seguridad:" : "Networking & Sec:"}
                      </strong>{" "}
                      {locale === "es"
                        ? "Cisco CCNA (TCP/IP) y Ciberseguridad Google."
                        : "Cisco CCNA (TCP/IP) & Google Cybersecurity."}
                    </span>
                  </li>
                </ul>

                <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>{locale === "es" ? "Soporte Remoto / Híbrido" : "Remote / Hybrid Support"}</span>
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar inside Card with Direct LinkedIn Button */}
          <div className="pt-3 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-zinc-400 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>
                {locale === "es"
                  ? "¿Quieres evaluar mi perfil para una vacante abierta en tu empresa?"
                  : "Want to review my profile for an open engineering position?"}
              </span>
            </div>

            <a
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#0077b5] to-[#005582] hover:from-[#006093] hover:to-[#004166] text-white font-mono text-xs font-bold transition-all shadow-lg active:scale-95 group shrink-0"
            >
              <Linkedin className="w-4 h-4 fill-current text-white" />
              <span>{locale === "es" ? "Contactar por LinkedIn" : "Connect on LinkedIn"}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
