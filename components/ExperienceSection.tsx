"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { usePortfolio } from "@/components/portfolio-locale-provider";
import { TechBadge } from "@/components/TechBadge";
import {
  Briefcase,
  CheckCircle2,
  ShieldCheck,
  Terminal,
  Calendar,
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Server,
  Layers,
  Linkedin,
  Sparkles,
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
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIdx, setActiveIdx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragDelta = useRef(0);

  const total = experiences.length;

  // Center active experience card in exact middle of viewport (50vw)
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
          duration: prefersReduced ? 0 : 0.55,
          ease: "power3.out",
        });

        cardsRef.current.forEach((card, i) => {
          if (!card) return;
          if (i === clamped) {
            gsap.to(card, {
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.5,
              ease: "power2.out",
            });
          } else {
            gsap.to(card, {
              scale: 0.92,
              opacity: 0.45,
              filter: "blur(2px)",
              duration: 0.5,
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

  // Initial positioning & window resize listener
  useEffect(() => {
    const handleResize = () => goTo(activeIdx);
    const timer = setTimeout(() => goTo(activeIdx), 50);
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [activeIdx, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next]);

  // Touch & Mouse Drag handlers
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
    if (dragDelta.current < -45 && total > 1) next();
    else if (dragDelta.current > 45 && total > 1) prev();
  };

  // Entrance reveal animations
  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      gsap.from(".exp-header-anim", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(".exp-carousel-viewport", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 68%",
          toggleActions: "play none none none",
        },
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative w-full py-16 sm:py-24 lg:py-32 bg-[#050b14] border-t border-zinc-900/80 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
        <div className="w-[850px] h-[850px] rounded-full bg-gradient-to-tr from-cyan-950/20 via-emerald-950/10 to-transparent blur-[140px] opacity-60" />
      </div>

      <div className="w-full space-y-10 lg:space-y-14">
        {/* =========================================================================
            1. SECTION HEADER
           ========================================================================= */}
        <div className="max-w-3xl space-y-4 mx-auto text-center px-4 sm:px-6">
          <div className="exp-header-anim inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-cyan-400 tracking-wider uppercase shadow-[0_0_15px_rgba(34,211,238,0.1)]">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              {locale === "es"
                ? `02. Experiencia Profesional & Sistemas en Producción`
                : `02. Work Experience & Production Systems`}
            </span>
          </div>

          <h2 className="exp-header-anim text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            {locale === "es" ? (
              <>
                Software en producción real:{" "}
                <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 drop-shadow-sm">
                  estabilidad, soporte SLA y rigor de ingeniería.
                </span>
              </>
            ) : (
              <>
                Enterprise production software:{" "}
                <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 drop-shadow-sm">
                  reliability, SLA support, and technical rigor.
                </span>
              </>
            )}
          </h2>

          <p className="exp-header-anim text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            {locale === "es"
              ? "Evidencia de experiencia directa trabajando en sistemas empresariales críticos, optimizando lógica de negocio, bases de datos SQL y apoyando despliegues productivos."
              : "Direct proof of building and maintaining business-critical systems, optimizing SQL database performance, and supporting production deployments."}
          </p>
        </div>

        {/* =========================================================================
            2. HORIZONTAL EXPERIENCE SHOWCASE CAROUSEL
           ========================================================================= */}
        <div
          ref={viewportRef}
          className="exp-carousel-viewport relative w-full overflow-hidden space-y-8 select-none"
        >
          {/* Main Track Viewport */}
          <div
            className="w-full overflow-hidden"
            onMouseDown={(e) => onDragStart(e.clientX)}
            onMouseMove={(e) => onDragMove(e.clientX)}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
            onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
            onTouchEnd={onDragEnd}
            style={{ cursor: total > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
          >
            {/* Sliding Track containing Experiences */}
            <div
              ref={trackRef}
              className="flex items-stretch gap-6 md:gap-10 will-change-transform py-4"
            >
              {experiences.map((exp, idx) => {
                const bullets = exp.bullets || [];
                const stack = exp.stack || [];
                const modalTakeaways =
                  ((exp as Record<string, unknown>).modalTakeaways as string[]) || [
                    "La reproducibilidad metódica y el registro riguroso de contexto reducen drásticamente los tiempos de resolución en entornos productivos.",
                    "La validación temprana en bases de datos y la gestión estricta de permisos previenen incidentes recurrentes tras cada despliegue.",
                  ];
                const securityConsiderations =
                  ((exp as Record<string, unknown>).securityConsiderations as string[]) || [
                    "Principio de menor privilegio en credenciales de producción y ventanas controladas para despliegues.",
                  ];

                const isActive = activeIdx === idx;

                return (
                  <div
                    key={idx}
                    ref={(el) => {
                      cardsRef.current[idx] = el;
                    }}
                    className="exp-slide-card shrink-0 w-[88vw] sm:w-[78vw] md:w-[68vw] lg:w-[60vw] max-w-4xl transition-all duration-300"
                    style={{
                      opacity: isActive ? 1 : 0.45,
                      transform: isActive ? "scale(1)" : "scale(0.92)",
                    }}
                  >
                    {/* High-Contrast Experience Card */}
                    <div className="relative h-full rounded-2xl border border-zinc-700/80 bg-[#09111c]/95 backdrop-blur-2xl p-5 sm:p-8 lg:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-hidden group hover:border-zinc-500/80">
                      {/* Top cyan glow line */}
                      <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

                      {/* MEMORABLE VISUAL ELEMENT: Production Telemetry & Timeline Indicator Bar */}
                      <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800/80 font-mono text-xs">
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                          </span>
                          <span className="text-emerald-400 font-bold text-[11px] tracking-wide">
                            {locale === "es" ? "ENTORNO PRODUCTIVO ACTIVO" : "LIVE PRODUCTION SYSTEM"}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-zinc-500 text-[10px]">
                          <span className="hidden sm:inline-flex items-center gap-1">
                            <Server className="w-3 h-3 text-cyan-400" /> SLA_UPTIME: 99.9%
                          </span>
                          <span className="bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded font-bold">
                            {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                          </span>
                        </div>
                      </div>

                      {/* 5-SECOND RECRUITER CHECK: Role, Company, Period */}
                      <div className="space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-zinc-800/80">
                          <div className="space-y-1.5">
                            <div className="flex flex-wrap items-center gap-2.5">
                              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                                {exp.role}
                              </h3>
                            </div>
                            <div className="flex items-center gap-2 text-base font-bold text-cyan-400">
                              <Briefcase className="w-4 h-4 text-cyan-400" />
                              <span>{exp.company}</span>
                            </div>
                          </div>

                          <div className="flex flex-col sm:items-end gap-1.5 text-xs font-mono text-zinc-400 shrink-0">
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-900/90 border border-zinc-800 text-zinc-200">
                              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                              <span>{exp.period}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] px-1">
                              <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                              <span>{exp.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* Brief Summary Context */}
                        <div className="p-4 rounded-xl bg-[#060b13]/80 border border-zinc-800/90 text-sm text-zinc-300 leading-relaxed font-medium">
                          {exp.summary}
                        </div>

                        {/* Core Grid: Left (Impact Bullet Points) + Right (Production Criteria) */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                          {/* LEFT: Impact & Responsibilities */}
                          <div className="lg:col-span-7 space-y-3">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block font-bold">
                              {locale === "es"
                                ? "Impacto Operativo & Responsabilidades:"
                                : "Operational Impact & Responsibilities:"}
                            </span>
                            <div className="space-y-2 text-xs text-zinc-300">
                              {bullets.map((bullet, bIdx) => (
                                <div
                                  key={bIdx}
                                  className="flex items-start gap-2.5 p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 leading-relaxed"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                  <span>{bullet}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* RIGHT: Production Criteria & Security */}
                          <div className="lg:col-span-5 space-y-3">
                            <div className="p-4 rounded-xl bg-gradient-to-b from-[#070d18] to-zinc-900/40 border border-zinc-800 space-y-3">
                              <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80 font-mono text-xs">
                                <span className="font-bold text-white flex items-center gap-1.5 text-[11px]">
                                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                                  {locale === "es" ? "Criterio en Producción" : "Production Mindset"}
                                </span>
                                <span className="text-[10px] text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                                  SLA_STABLE
                                </span>
                              </div>

                              <div className="space-y-2 text-[11px] text-zinc-300 leading-normal">
                                {modalTakeaways.map((takeaway, tIdx) => (
                                  <div key={tIdx} className="flex items-start gap-2">
                                    <span className="text-cyan-400 font-mono font-bold text-xs">0{tIdx + 1}.</span>
                                    <p className="text-zinc-300">{takeaway}</p>
                                  </div>
                                ))}
                              </div>

                              {securityConsiderations && securityConsiderations.length > 0 && (
                                <div className="pt-2 border-t border-zinc-800/60 flex items-start gap-2 text-[10.5px] text-zinc-400">
                                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                                  <span>
                                    <strong className="text-zinc-200">
                                      {locale === "es" ? "Seguridad:" : "Security:"}
                                    </strong>{" "}
                                    {securityConsiderations[0]}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Full-Width Container for Tech Stack & Tools with Official Brand Logos */}
                        <div className="pt-4 border-t border-zinc-800/80 space-y-2.5 bg-[#060b13]/60 p-4 rounded-xl border border-zinc-800/90">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 block font-bold flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-cyan-400" />
                            {locale === "es" ? "Herramientas & Entorno de Trabajo:" : "Tools & Operating Environment:"}
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {stack.map((tech, sIdx) => (
                              <TechBadge key={sIdx} tech={tech} size="md" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* =========================================================================
              3. CAROUSEL CONTROLS BAR (Only active if > 1 experience, or indicator)
             ========================================================================= */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 pt-2">
            {/* Dots / Indicators */}
            <div className="flex items-center gap-2">
              {experiences.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goTo(idx)}
                  aria-label={`Go to experience ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    activeIdx === idx
                      ? "w-7 h-2.5 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                      : "w-2 h-2 bg-zinc-700 hover:bg-zinc-500"
                  }`}
                />
              ))}
            </div>

            {/* Navigation Arrows & Counter */}
            <div className="flex items-center gap-3 font-mono text-xs text-zinc-400">
              <span>
                <strong className="text-white">{String(activeIdx + 1).padStart(2, "0")}</strong> / {String(total).padStart(2, "0")}
              </span>

              {total > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prev}
                    disabled={activeIdx === 0}
                    aria-label="Previous experience"
                    className="w-10 h-10 rounded-full border border-zinc-700/80 bg-zinc-900 text-zinc-200 flex items-center justify-center hover:bg-cyan-950 hover:border-cyan-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 shadow-md"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={next}
                    disabled={activeIdx === total - 1}
                    aria-label="Next experience"
                    className="w-10 h-10 rounded-full border border-zinc-700/80 bg-zinc-900 text-zinc-200 flex items-center justify-center hover:bg-cyan-950 hover:border-cyan-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 shadow-md"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Link & Strategic LinkedIn CTA */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 flex flex-col sm:flex-row sm:items-center justify-between border-t border-zinc-800/80 text-xs text-zinc-500 font-mono gap-4">
          <div className="flex items-center gap-2 text-zinc-300">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>{locale === "es" ? "¿Buscas este nivel de resolución en tu equipo?" : "Looking for this level of execution in your team?"}</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/jancarlo-gc"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#0077b5] to-[#005582] hover:from-[#006093] hover:to-[#004166] text-white font-sans font-bold text-xs transition-all shadow-md active:scale-95 group"
            >
              <Linkedin className="w-3.5 h-3.5 fill-current text-white" />
              <span>{locale === "es" ? "Contactar por LinkedIn" : "Connect on LinkedIn"}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
