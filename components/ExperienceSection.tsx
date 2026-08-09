"use client";

import React, { useRef } from "react";
import { usePortfolio } from "@/components/portfolio-locale-provider";
import { 
  Briefcase, 
  CheckCircle2, 
  ShieldCheck, 
  Terminal, 
  Calendar, 
  MapPin, 
  Activity,
  ArrowRight
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ExperienceSection() {
  const { locale, experiences } = usePortfolio();
  const containerRef = useRef<HTMLElement>(null);

  const exp = experiences[0] || {
    company: "Outsourcing S.A.S. BIC",
    role: "Desarrollador Full Stack .NET (Blazor / ASP.NET)",
    location: "Bogotá D.C., Colombia (Remoto)",
    period: "Jun. 2025 – Dic. 2025",
    summary:
      "Desarrollo y soporte full stack de aplicaciones empresariales en producción utilizando .NET (C#), Blazor Server y SQL Server, asegurando alta disponibilidad, resolución ágil de incidencias y despliegues estables.",
    bullets: [
      "Desarrollé y mantuve módulos empresariales críticos en Blazor Server (C#), implementando mejoras funcionales y optimizaciones en la lógica de negocio.",
      "Participé en la resolución de incidencias en ambientes productivos bajo SLA, garantizando la estabilidad y continuidad operativa de los sistemas.",
      "Optimicé consultas complejas y procedimientos almacenados en SQL Server, mejorando los tiempos de respuesta de la base de datos.",
      "Apoyé despliegues en ambientes Windows Server y colaboré en actividades de mantenimiento y configuración de infraestructura.",
    ],
    modalTakeaways: [
      "La reproducibilidad metódica y el registro riguroso de contexto reducen drásticamente los tiempos de resolución en entornos productivos.",
      "La validación temprana en bases de datos y la gestión estricta de permisos previenen incidentes recurrentes tras cada despliegue.",
    ],
    stack: [".NET", "C#", "Blazor Server", "ASP.NET Core", "SQL Server", "Stored Procedures", "Windows Server"],
    insightsHeading: "Entornos Productivos",
    securityConsiderations: [
      "Principio de menor privilegio en credenciales de producción y ventanas controladas para despliegues.",
    ],
  };

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      // 1. Header reveal
      tl.from(".exp-header-anim", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
      })
        // 2. Main experience card reveal
        .from(
          ".exp-card-anim",
          {
            y: 24,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.3"
        )
        // 3. Milestones reveal
        .from(
          ".exp-milestone-anim",
          {
            x: -15,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
          },
          "-=0.4"
        )
        // 4. Production insight panel reveal
        .from(
          ".exp-panel-anim",
          {
            y: 18,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.3"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative w-full py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#050b14] border-t border-zinc-900/80"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-cyan-950/15 via-emerald-950/10 to-transparent blur-[150px] opacity-70" />
      </div>

      <div className="max-w-7xl w-full mx-auto space-y-10 lg:space-y-14">
        {/* =========================================================================
            1. SECTION HEADER
           ========================================================================= */}
        <div className="max-w-3xl space-y-3">
          <div className="exp-header-anim inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-raised border border-zinc-800 text-[11px] font-mono text-cyan-400 tracking-wider uppercase shadow-sm">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              {locale === "es" ? "02. Experiencia Profesional & Producción" : "02. Work Experience & Production"}
            </span>
          </div>

          <h2 className="exp-header-anim text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            {locale === "es" ? (
              <>
                Software en producción real:{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                  estabilidad, resolución bajo SLA y rigor técnico.
                </span>
              </>
            ) : (
              <>
                Live production software:{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                  reliability, SLA troubleshooting, and technical rigor.
                </span>
              </>
            )}
          </h2>

          <p className="exp-header-anim text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
            {locale === "es"
              ? "Experiencia comprobable manteniendo y evolucionando aplicaciones de negocio críticas, optimizando consultas SQL y operando bajo estándares de continuidad empresarial."
              : "Verifiable experience maintaining and scaling business-critical applications, tuning SQL throughput, and delivering under enterprise continuity standards."}
          </p>
        </div>

        {/* =========================================================================
            2. PRODUCTION EXPERIENCE DOSSIER (Enterprise Impact & System Continuity)
           ========================================================================= */}
        <div className="exp-card-anim relative w-full rounded-2xl border border-zinc-800/90 bg-[#070c14]/90 backdrop-blur-xl p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden">
          {/* Subtle ambient lighting inside card */}
          <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/5 via-teal-500/5 to-transparent blur-3xl" />

          {/* Top Company & Meta Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {exp.company}
                </h3>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 font-mono text-[11px]">
                  <Activity className="w-3 h-3 animate-pulse" />
                  {locale === "es" ? "Producción Empresarial" : "Enterprise Production"}
                </span>
              </div>

              <div className="text-sm sm:text-base font-semibold text-cyan-400">
                {exp.role}
              </div>
            </div>

            <div className="flex flex-col sm:items-end gap-1 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-1.5 text-zinc-300">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>{exp.period}</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-500">
                <MapPin className="w-3.5 h-3.5" />
                <span>{exp.location}</span>
              </div>
            </div>
          </div>

          {/* Core Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pt-6">
            {/* LEFT: Actionable Responsibilities & Impact Milestones */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {exp.summary}
              </p>

              <div className="space-y-3.5">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
                  {locale === "es" ? "Aportes y Responsabilidades Clave:" : "Key Contributions & Responsibilities:"}
                </span>

                <div className="space-y-3">
                  {exp.bullets.map((bullet, bIdx) => (
                    <div
                      key={bIdx}
                      className="exp-milestone-anim flex items-start gap-3 p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/60 hover:border-zinc-700/80 transition-colors group"
                    >
                      <div className="w-6 h-6 rounded-md bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-cyan-400/60 transition-colors">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {bullet}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: Production Insights & Engineering Principles */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="exp-panel-anim p-5 sm:p-6 rounded-xl bg-gradient-to-b from-cyan-950/15 via-zinc-900/40 to-zinc-950/80 border border-cyan-500/20 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
                  <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    {locale === "es" ? "Criterio de Ingeniería en Producción" : "Production Engineering Insights"}
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                    SLA_COMPLIANT
                  </span>
                </div>

                <div className="space-y-3 text-xs leading-relaxed text-zinc-300">
                  {exp.modalTakeaways.map((takeaway, tIdx) => (
                    <div key={tIdx} className="flex items-start gap-2.5">
                      <span className="text-cyan-400 font-mono font-bold text-xs mt-0.5">0{tIdx + 1}.</span>
                      <p className="text-zinc-300 text-xs leading-normal">
                        {takeaway}
                      </p>
                    </div>
                  ))}

                  {exp.securityConsiderations && exp.securityConsiderations.length > 0 && (
                    <div className="pt-2.5 border-t border-zinc-800/60 flex items-start gap-2 text-[11px] text-zinc-400">
                      <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-zinc-200">{locale === "es" ? "Seguridad & Control:" : "Security & Governance:"}</strong>{" "}
                        {exp.securityConsiderations[0]}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Technologies in Context (Secondary Technical Pills) */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">
                  {locale === "es" ? "Herramientas & Entorno Utilizado:" : "Tools & Operating Stack:"}
                </span>

                <div className="flex flex-wrap gap-1.5">
                  {exp.stack.map((tech, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-lg bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono text-zinc-300 hover:border-zinc-700 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Link to Projects */}
        <div className="pt-2 flex items-center justify-between border-t border-zinc-900 text-xs text-zinc-500 font-mono">
          <span>{locale === "es" ? "SIGUIENTE: PROYECTOS DESARROLLADOS" : "NEXT: FEATURED PROJECTS"}</span>
          <a
            href="#projects"
            className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-sans font-semibold transition-colors group"
          >
            <span>{locale === "es" ? "Ver proyectos construidos" : "Explore shipped projects"}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
