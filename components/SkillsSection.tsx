"use client";

import React, { useRef } from "react";
import { usePortfolio } from "@/components/portfolio-locale-provider";
import { TechBadge } from "@/components/TechBadge";
import { Sparkles, TerminalSquare, Server, Layout, Cpu, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STORY_ES = [
  {
    icon: <TerminalSquare className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />,
    title: "Aprender a construir",
    text: "Mi viaje inició consolidando la lógica algorítmica, el modelado de datos y la arquitectura de sistemas. Entendí que el buen código se construye sobre fundamentos sólidos.",
    techs: ["Python", "SQL", "Git", "Linux"],
  },
  {
    icon: <Server className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />,
    title: "Sistemas en producción",
    text: "En Outsourcing S.A.S. mantuve aplicaciones empresariales críticas. Aprendí el valor de la estabilidad, a resolver incidencias bajo SLA y a ejecutar despliegues seguros.",
    techs: [".NET", "C#", "SQL Server", "Windows Server"],
  },
  {
    icon: <Layout className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />,
    title: "Productos full-stack",
    text: "Expandí mi enfoque hacia el ecosistema web moderno, arquitectando plataformas escalables. Aprendí a conectar interfaces interactivas con APIs robustas y limpias.",
    techs: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    icon: <Cpu className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />,
    title: "Adaptarse y resolver",
    text: "Aprendí a no limitarme a un solo entorno, integrando nuevas bases de datos, contenedores y conceptos de redes según lo requiera el reto técnico.",
    techs: ["PostgreSQL", "FastAPI", "Docker", "Azure", "Cisco CCNA"],
  },
  {
    icon: <Users className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />,
    title: "Aportar versatilidad",
    text: "Combino ejecución técnica con habilidades profesionales. Entiendo el negocio, me comunico con claridad y priorizo el éxito del equipo.",
    isSoft: true,
    techs: ["Resolución de problemas", "Adaptabilidad", "Trabajo en equipo", "Comunicación"],
  }
];

const STORY_EN = [
  {
    icon: <TerminalSquare className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />,
    title: "Learning to build",
    text: "My journey started by consolidating algorithmic logic, data modeling, and architecture. I realized that good code is built on solid foundations.",
    techs: ["Python", "SQL", "Git", "Linux"],
  },
  {
    icon: <Server className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />,
    title: "Production systems",
    text: "At Outsourcing S.A.S., I maintained mission-critical applications. I learned the value of stability, resolving SLA incidents, and executing safe deployments.",
    techs: [".NET", "C#", "SQL Server", "Windows Server"],
  },
  {
    icon: <Layout className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />,
    title: "Full-stack products",
    text: "I expanded my focus into the modern web ecosystem, architecting scalable platforms. I learned to connect interactive interfaces with robust APIs cleanly.",
    techs: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    icon: <Cpu className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />,
    title: "Adapting and solving",
    text: "I learned not to box myself into one environment, quickly integrating new databases, containers, and networking concepts as the challenge demands.",
    techs: ["PostgreSQL", "FastAPI", "Docker", "Azure", "Cisco CCNA"],
  },
  {
    icon: <Users className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />,
    title: "Contributing versatility",
    text: "I combine technical execution with professional skills. I understand business needs, communicate clearly, and always prioritize team success.",
    isSoft: true,
    techs: ["Problem Solving", "Adaptability", "Teamwork", "Communication"],
  }
];

export function SkillsSection() {
  const { locale } = usePortfolio();
  const containerRef = useRef<HTMLElement>(null);
  const story = locale === "es" ? STORY_ES : STORY_EN;

  const allTechSkills = Array.from(
    new Set(
      story
        .filter((step) => !step.isSoft)
        .flatMap((step) => step.techs)
    )
  );

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const blocks = gsap.utils.toArray<HTMLElement>(".story-block");
      
      blocks.forEach((block) => {
        gsap.from(block, {
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: -40,
          opacity: 0,
          scale: 0.98,
          duration: 0.8,
          ease: "back.out(1.2)",
        });
      });

      gsap.from(".summary-grid", {
        scrollTrigger: {
          trigger: ".summary-grid",
          start: "top 90%",
          toggleActions: "play none none none",
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="skills"
      className="relative w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#050b14] border-t border-zinc-900/80 overflow-hidden"
    >
      <div className="max-w-6xl w-full mx-auto flex flex-col items-center">
        
        {/* Editorial Header */}
        <div className="mb-12 md:mb-20 max-w-3xl space-y-4 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            {locale === "es" ? (
              <>
                Un ingeniero definido por la{" "}
                <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 drop-shadow-sm">
                  adaptabilidad.
                </span>
              </>
            ) : (
              <>
                An engineer defined by{" "}
                <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 drop-shadow-sm">
                  adaptability.
                </span>
              </>
            )}
          </h2>
        </div>

        {/* Compact Narrative Flow - Zig-Zag Centered */}
        <div className="space-y-12 md:space-y-16 relative z-10 w-full flex flex-col items-center">
          
          {story.map((step, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div 
                key={idx} 
                className={`story-block w-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 group ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Contextual Icon */}
                <div className="shrink-0 flex justify-center">
                  <div className="p-4 md:p-5 rounded-2xl md:rounded-[2rem] bg-zinc-900/40 border border-zinc-800/80 text-zinc-600 transition-all duration-500 group-hover:text-cyan-400 group-hover:border-cyan-500/50 group-hover:bg-cyan-950/20 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] group-hover:scale-110">
                    {step.icon}
                  </div>
                </div>
                
                {/* Content */}
                <div className={`w-full max-w-xl flex flex-col items-center text-center ${
                  isEven ? 'md:items-start md:text-left' : 'md:items-end md:text-right'
                }`}>
                  <h4 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">
                    {step.title}
                  </h4>
                  
                  <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-medium mt-3">
                    {step.text}
                  </p>
                  
                  <div className={`flex flex-wrap gap-2 pt-4 justify-center ${
                    isEven ? 'md:justify-start' : 'md:justify-end'
                  }`}>
                    {step.isSoft ? (
                      step.techs.map((t, i) => (
                        <span 
                          key={i}
                          className="inline-flex items-center px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[11px] font-semibold shadow-sm transition-colors hover:bg-emerald-500/20"
                        >
                          {t}
                        </span>
                      ))
                    ) : (
                      step.techs.map((t, i) => (
                        <TechBadge key={i} tech={t} size="sm" />
                      ))
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Final Unified Toolkit Summary */}
        <div className="summary-grid mt-16 md:mt-24 pt-10 border-t border-zinc-800/60 w-full flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <h4 className="text-sm font-mono font-bold uppercase tracking-widest text-zinc-300">
              {locale === "es" ? "Resumen de Toolkit Completo" : "Complete Toolkit Summary"}
            </h4>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2.5">
            {allTechSkills.map((tech, idx) => (
              <TechBadge key={idx} tech={tech} size="md" />
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}
