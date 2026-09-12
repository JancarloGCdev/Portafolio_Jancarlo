"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { usePortfolio } from "@/components/portfolio-locale-provider";
import { TechBadge } from "@/components/TechBadge";
import { Sparkles, TerminalSquare, Server, Layout, Cpu, Users, ChevronLeft, ChevronRight, Wrench } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STORY_ES = [
  {
    icon: <TerminalSquare className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={1.5} />,
    title: "Aprender a construir",
    text: "Mi viaje inició consolidando la lógica algorítmica, el modelado de datos y la arquitectura de sistemas. Entendí que el buen código se construye sobre fundamentos sólidos.",
    techs: ["Python", "SQL", "Git", "Linux"],
  },
  {
    icon: <Server className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={1.5} />,
    title: "Sistemas en producción",
    text: "Mantuve aplicaciones empresariales críticas en entornos productivos. Aprendí el valor de la estabilidad, a resolver incidencias bajo SLA y a ejecutar despliegues seguros.",
    techs: [".NET", "C#", "SQL Server", "Windows Server"],
  },
  {
    icon: <Layout className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={1.5} />,
    title: "Productos full-stack",
    text: "Expandí mi enfoque hacia el ecosistema web moderno, arquitectando plataformas escalables. Aprendí a conectar interfaces interactivas con APIs robustas y limpias.",
    techs: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    icon: <Cpu className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={1.5} />,
    title: "Adaptarse y resolver",
    text: "Aprendí a no limitarme a un solo entorno, integrando nuevas bases de datos, contenedores y conceptos de redes según lo requiera el reto técnico.",
    techs: ["PostgreSQL", "FastAPI", "Docker", "Azure", "Cisco CCNA"],
  },
  {
    icon: <Users className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={1.5} />,
    title: "Aportar versatilidad",
    text: "Combino ejecución técnica con habilidades profesionales. Entiendo el negocio, me comunico con claridad y priorizo el éxito del equipo.",
    isSoft: true,
    techs: ["Resolución de problemas", "Adaptabilidad", "Trabajo en equipo", "Comunicación"],
  }
];

const STORY_EN = [
  {
    icon: <TerminalSquare className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={1.5} />,
    title: "Learning to build",
    text: "My journey started by consolidating algorithmic logic, data modeling, and architecture. I realized that good code is built on solid foundations.",
    techs: ["Python", "SQL", "Git", "Linux"],
  },
  {
    icon: <Server className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={1.5} />,
    title: "Production systems",
    text: "Maintained mission-critical enterprise applications in production environments. I learned the value of stability, resolving SLA incidents, and executing safe deployments.",
    techs: [".NET", "C#", "SQL Server", "Windows Server"],
  },
  {
    icon: <Layout className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={1.5} />,
    title: "Full-stack products",
    text: "I expanded my focus into the modern web ecosystem, architecting scalable platforms. I learned to connect interactive interfaces with robust APIs cleanly.",
    techs: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    icon: <Cpu className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={1.5} />,
    title: "Adapting and solving",
    text: "I learned not to box myself into one environment, quickly integrating new databases, containers, and networking concepts as the challenge demands.",
    techs: ["PostgreSQL", "FastAPI", "Docker", "Azure", "Cisco CCNA"],
  },
  {
    icon: <Users className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={1.5} />,
    title: "Contributing versatility",
    text: "I combine technical execution with professional skills. I understand business needs, communicate clearly, and always prioritize team success.",
    isSoft: true,
    techs: ["Problem Solving", "Adaptability", "Teamwork", "Communication"],
  }
];

export function SkillsSection() {
  const { locale } = usePortfolio();
  const containerRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIdx, setActiveIdx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragDelta = useRef(0);

  const story = locale === "es" ? STORY_ES : STORY_EN;
  const total = story.length;

  const allTechSkills = Array.from(
    new Set(
      story
        .filter((step) => !step.isSoft)
        .flatMap((step) => step.techs)
    )
  );

  const goTo = useCallback(
    (idx: number) => {
      const clamped = Math.max(0, Math.min(idx, total - 1));
      setActiveIdx(clamped);

      if (!trackRef.current || !viewportRef.current) return;
      const viewportEl = viewportRef.current;
      const activeCard = cardsRef.current[clamped];

      if (activeCard) {
        const cardCenter = activeCard.offsetLeft + activeCard.offsetWidth / 2;
        const viewportCenter = viewportEl.offsetWidth / 2;
        const targetX = viewportCenter - cardCenter;

        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        gsap.to(trackRef.current, {
          x: targetX,
          duration: prefersReduced ? 0 : 0.45,
          ease: "power2.out",
        });

        cardsRef.current.forEach((card, i) => {
          if (!card) return;
          if (i === clamped) {
            gsap.to(card, {
              scale: 1,
              opacity: 1,
              duration: 0.35,
              ease: "power2.out",
            });
          } else {
            gsap.to(card, {
              scale: 0.95,
              opacity: 0.35,
              duration: 0.35,
              ease: "power2.out",
            });
          }
        });
      }
    },
    [total]
  );

  const prev = useCallback(() => goTo(activeIdx - 1), [activeIdx, goTo]);
  const next = useCallback(() => goTo(activeIdx + 1), [activeIdx, goTo]);

  useEffect(() => {
    const handleResize = () => goTo(activeIdx);
    const timer = setTimeout(() => goTo(activeIdx), 50);
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [activeIdx, goTo]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next]);

  const onDragStart = (clientX: number) => {
    dragStartX.current = clientX;
    dragDelta.current = 0;
    setIsDragging(true);
  };

  const onDragMove = (clientX: number) => {
    if (!isDragging) return;
    dragDelta.current = clientX - dragStartX.current;
  };

  const onDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragDelta.current < -45) next();
    else if (dragDelta.current > 45) prev();
  };

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      gsap.from(".skills-header-anim", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 15,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });

      gsap.from(".skills-carousel-viewport", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
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
      className="relative w-full py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8 border-t border-zinc-900/80 overflow-hidden scroll-mt-16 sm:scroll-mt-20"
    >
      {/* Background ambient lighting - Hardware accelerated */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden transform-gpu">
        <div className="w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-cyan-950/20 via-blue-950/15 to-transparent blur-[100px] opacity-50" />
      </div>

      <div className="max-w-4xl w-full mx-auto space-y-4">
        {/* =========================================================================
            1. UNIFIED SECTION HEADER & CONTROLS (Compact single-view layout)
           ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <div className="skills-header-anim flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
              <Wrench className="w-3.5 h-3.5" />
              <span>{locale === "es" ? "Habilidades & Metodología" : "Skills & Methodology"}</span>
            </div>

            <h2 className="skills-header-anim text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug">
              {locale === "es" ? (
                <>
                  Un perfil técnico definido por la{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                    adaptabilidad.
                  </span>
                </>
              ) : (
                <>
                  An engineering profile defined by{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                    adaptability.
                  </span>
                </>
              )}
            </h2>

            <p className="skills-header-anim text-xs sm:text-[13px] text-zinc-400 leading-normal max-w-xl">
              {locale === "es"
                ? "Evolución técnica desde fundamentos sólidos hasta arquitectura web moderna y producción."
                : "Technical evolution from engineering fundamentals to modern full-stack platforms."}
            </p>
          </div>

          {/* Inline Controls (Right side of header) */}
          <div className="skills-header-anim flex items-center gap-3 shrink-0 font-mono text-xs text-zinc-400 self-end sm:self-auto bg-zinc-900/90 border border-zinc-800 rounded-full px-3 py-1.5 shadow-sm">
            <div className="flex items-center gap-1.5">
              {story.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goTo(idx)}
                  aria-label={`Go to skill chapter ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    activeIdx === idx
                      ? "w-5 h-2 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                      : "w-2 h-2 bg-zinc-700 hover:bg-zinc-500"
                  }`}
                />
              ))}
            </div>

            <span className="text-[11px] text-zinc-400 pl-1 border-l border-zinc-800">
              <strong className="text-white">{String(activeIdx + 1).padStart(2, "0")}</strong> / {String(total).padStart(2, "0")}
            </span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={prev}
                disabled={activeIdx === 0}
                aria-label="Previous skill"
                className="w-7 h-7 rounded-full border border-zinc-700/80 bg-zinc-800 text-zinc-200 flex items-center justify-center hover:bg-cyan-950 hover:border-cyan-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={next}
                disabled={activeIdx === total - 1}
                aria-label="Next skill"
                className="w-7 h-7 rounded-full border border-zinc-700/80 bg-zinc-800 text-zinc-200 flex items-center justify-center hover:bg-cyan-950 hover:border-cyan-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. COMPACT STORY CAROUSEL
           ========================================================================= */}
        <div
          ref={viewportRef}
          className="skills-carousel-viewport relative w-full overflow-hidden select-none"
        >
          <div
            className="w-full overflow-hidden"
            onMouseDown={(e) => onDragStart(e.clientX)}
            onMouseMove={(e) => onDragMove(e.clientX)}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
            onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
            onTouchEnd={onDragEnd}
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
          >
            <div
              ref={trackRef}
              className="relative flex items-stretch gap-4 sm:gap-6 lg:gap-8 will-change-transform transform-gpu py-1"
            >
              {story.map((step, idx) => {
                const isActive = activeIdx === idx;

                return (
                  <div
                    key={idx}
                    ref={(el) => {
                      cardsRef.current[idx] = el;
                    }}
                    onClick={() => {
                      if (!isActive) goTo(idx);
                    }}
                    className={`shrink-0 w-[92vw] sm:w-[86vw] md:w-[80vw] lg:w-[74vw] max-w-4xl transition-all duration-300 transform-gpu ${
                      !isActive ? "cursor-pointer hover:opacity-60" : ""
                    }`}
                    style={{
                      opacity: isActive ? 1 : 0.35,
                      transform: isActive ? "scale(1)" : "scale(0.95)",
                    }}
                  >
                    <div className="relative h-full rounded-2xl border border-zinc-700/80 bg-[#09111c]/98 p-4 sm:p-5 lg:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.85)] flex flex-col sm:flex-row items-center gap-4 sm:gap-6 overflow-hidden group hover:border-zinc-500/80">
                      {/* Top cyan glow line */}
                      <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

                      {/* Icon Container */}
                      <div className="shrink-0 flex items-center justify-center p-3 sm:p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/40 text-cyan-400 shadow-sm">
                        {step.icon}
                      </div>

                      {/* Content */}
                      <div className="w-full flex flex-col text-center sm:text-left space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <h4 className="text-base sm:text-lg lg:text-xl font-extrabold text-white tracking-tight">
                            {step.title}
                          </h4>
                          <span className="font-mono text-xs text-zinc-500 font-bold">
                            {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                          </span>
                        </div>

                        <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed font-normal">
                          {step.text}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-1 justify-center sm:justify-start">
                          {step.isSoft
                            ? step.techs.map((t, i) => (
                                <span
                                  key={i}
                                  className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[11px] font-semibold"
                                >
                                  {t}
                                </span>
                              ))
                            : step.techs.map((t, i) => (
                                <TechBadge key={i} tech={t} size="sm" />
                              ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* =========================================================================
            3. INTEGRATED COMPACT TOOLKIT SUMMARY (Always accessible in 1 view)
           ========================================================================= */}
        <div className="pt-3 border-t border-zinc-800/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-cyan-300" />
              {locale === "es" ? "Toolkit Tecnológico Completo:" : "Complete Technology Toolkit:"}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
            {allTechSkills.map((tech, idx) => (
              <TechBadge key={idx} tech={tech} size="sm" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
