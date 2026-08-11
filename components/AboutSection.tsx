"use client";

import React, { useRef } from "react";
import { usePortfolio } from "@/components/portfolio-locale-provider";
import {
  Code2,
  CheckCircle2,
  ArrowUpRight,
  Layers,
  Sparkles,
  Briefcase,
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
      className="relative w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#050b14] border-t border-zinc-900/80 overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
        <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-cyan-950/20 via-blue-950/15 to-transparent blur-[140px] opacity-60" />
      </div>

      <div className="max-w-6xl w-full mx-auto space-y-6">
        {/* =========================================================================
            1. SECTION HEADER: HUMAN, DIRECT & MEMORABLE
           ========================================================================= */}
        <div className="about-single-anim max-w-3xl space-y-4 mx-auto text-center px-4 sm:px-6 mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            {locale === "es" ? (
              <>
                Construyo software que{" "}
                <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 drop-shadow-sm">
                  resuelve problemas reales.
                </span>
              </>
            ) : (
              <>
                Building software that{" "}
                <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 drop-shadow-sm">
                  solves real-world problems.
                </span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            {locale === "es"
              ? "Más allá del lenguaje o el framework, me enfoco en entender el reto técnico, adaptarme al contexto y entregar soluciones sólidas que generen valor."
              : "Beyond frameworks or languages, I focus on understanding the technical challenge, adapting to the context, and delivering solid solutions that drive value."}
          </p>
        </div>

        {/* =========================================================================
            2. UNIFIED SINGLE MASTER CONTAINER (Clean hierarchy, high readability)
           ========================================================================= */}
        <div className="about-single-anim rounded-2xl border border-zinc-700/80 bg-[#09111c]/95 backdrop-blur-2xl p-6 sm:p-8 lg:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden space-y-6">
          {/* Subtle glowing top line */}
          <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* LEFT COLUMN: Human & Authoritative Engineering Story */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
                  {locale === "es"
                    ? "Ingeniero de Sistemas con experiencia en producción, capacidad de adaptación y pensamiento crítico."
                    : "Systems Engineer with production experience, fast adaptability, and critical thinking."}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
                {locale === "es"
                  ? "Soy Ingeniero de Sistemas y Computación (UTP) y Técnico en Desarrollo de Software (SENA). Mi trayectoria abarca desde el mantenimiento de aplicaciones empresariales en entornos productivos reales bajo SLA (Outsourcing S.A.S. BIC) hasta el desarrollo de productos web modernos y proyectos orientados a Inteligencia Artificial, LLMs, datos, cloud y ciberseguridad. Mi fortaleza no es memorizar un solo stack, sino entender el problema, aprender con rapidez y elegir las herramientas adecuadas para resolverlo de forma limpia, con comunicación clara y en equipo."
                  : "I am a Systems & Computer Engineer (UTP) and Software Development Technician (SENA). My background spans maintaining mission-critical enterprise applications in production SLA environments (Outsourcing S.A.S. BIC) to building modern full-stack web products and exploring AI, LLM integration, data, cloud, and cybersecurity. My core strength isn't sticking to one stack, but understanding the core problem, learning fast, and picking the right tools to build maintainable software with clear communication and teamwork."}
              </p>

              {/* 3 VALUE PILLARS FOR RECRUITERS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[#060b13] border border-zinc-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-bold">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{locale === "es" ? "Experiencia Real" : "Real Experience"}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-tight">
                    {locale === "es"
                      ? "Software empresarial y trabajo con sistemas en producción."
                      : "Enterprise systems & production SLA support."}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#060b13] border border-zinc-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-bold">
                    <Code2 className="w-3.5 h-3.5" />
                    <span>{locale === "es" ? "Versatilidad Técnica" : "Technical Range"}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-tight">
                    {locale === "es"
                      ? "Frontend, backend, datos e IA según la necesidad."
                      : "Frontend, backend, data & AI based on business needs."}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#060b13] border border-zinc-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-purple-400 font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{locale === "es" ? "Aprendizaje Continuo" : "Continuous Growth"}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-tight">
                    {locale === "es"
                      ? "Ingeniería, cloud, redes, ciberseguridad e IA."
                      : "Engineering, cloud, networking, security & AI."}
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Evidence / Technical Proof Card */}
            <div className="lg:col-span-5 w-full">
              <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-b from-[#070d18] to-[#091222] border border-zinc-700/80 space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800 font-mono text-xs">
                  <span className="text-white font-bold flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    {locale === "es" ? "Evidencia de Experiencia" : "Proof of Execution"}
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-cyan-950/80 text-cyan-400 text-[10px] font-bold border border-cyan-500/30">
                    INGLÉS B1-B2
                  </span>
                </div>

                <ul className="space-y-3 text-xs text-zinc-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white block font-semibold">
                        {locale === "es" ? "Software Empresarial:" : "Enterprise Software:"}
                      </strong>
                      <span className="text-zinc-400">.NET, Blazor Server, SQL Server</span>
                    </span>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white block font-semibold">
                        {locale === "es" ? "Desarrollo Web & IA:" : "Web & AI Engineering:"}
                      </strong>
                      <span className="text-zinc-400">React, Next.js, TypeScript, Python / FastAPI</span>
                    </span>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white block font-semibold">
                        {locale === "es" ? "Redes & Seguridad:" : "Networking & Security:"}
                      </strong>
                      <span className="text-zinc-400">Cisco CCNA, Fundamentos de Ciberseguridad</span>
                    </span>
                  </li>
                </ul>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                  <span>{locale === "es" ? "Soporte Remoto / Híbrido" : "Remote / Hybrid Support"}</span>
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
