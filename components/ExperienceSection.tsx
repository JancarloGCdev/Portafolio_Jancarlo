"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { usePortfolio } from "@/components/portfolio-locale-provider";
import { TechBadge } from "@/components/TechBadge";
import {
  Building2,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
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

        // Smooth GPU-accelerated transform without heavy filters
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
    if (dragDelta.current < -45 && total > 1) next();
    else if (dragDelta.current > 45 && total > 1) prev();
  };

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      gsap.from(".exp-header-anim", {
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

      gsap.from(".exp-carousel-viewport", {
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
      id="experience"
      className="relative w-full py-6 sm:py-8 lg:py-10 border-t border-zinc-900/80 overflow-hidden scroll-mt-16 sm:scroll-mt-20"
    >
      {/* Background ambient lighting - Hardware accelerated */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden transform-gpu">
        <div className="w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-cyan-950/20 via-emerald-950/10 to-transparent blur-[90px] opacity-50" />
      </div>

      <div className="w-full space-y-4">
        {/* =========================================================================
            1. UNIFIED SECTION HEADER & CONTROLS (Compact single-view layout)
           ========================================================================= */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <div className="exp-header-anim flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{locale === "es" ? "Trayectoria Profesional" : "Work Experience"}</span>
            </div>

            <h2 className="exp-header-anim text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug">
              {locale === "es" ? (
                <>
                  Experiencia que genera{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                    estabilidad y resultados.
                  </span>
                </>
              ) : (
                <>
                  Experience delivering{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                    stability and results.
                  </span>
                </>
              )}
            </h2>

            <p className="exp-header-anim text-xs sm:text-[13px] text-zinc-400 leading-normal max-w-xl">
              {locale === "es"
                ? "Desarrollo empresarial, optimización de sistemas y soporte en entornos productivos reales."
                : "Enterprise development, systems optimization, and production software maintenance."}
            </p>
          </div>

          {/* Inline Controls (Right side of header) */}
          {total > 1 && (
            <div className="exp-header-anim flex items-center gap-3 shrink-0 font-mono text-xs text-zinc-400 self-end sm:self-auto bg-zinc-900/90 border border-zinc-800 rounded-full px-3 py-1.5 shadow-sm">
              <div className="flex items-center gap-1.5">
                {experiences.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => goTo(idx)}
                    aria-label={`Go to experience ${idx + 1}`}
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
                  aria-label="Previous experience"
                  className="w-7 h-7 rounded-full border border-zinc-700/80 bg-zinc-800 text-zinc-200 flex items-center justify-center hover:bg-cyan-950 hover:border-cyan-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={next}
                  disabled={activeIdx === total - 1}
                  aria-label="Next experience"
                  className="w-7 h-7 rounded-full border border-zinc-700/80 bg-zinc-800 text-zinc-200 flex items-center justify-center hover:bg-cyan-950 hover:border-cyan-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* =========================================================================
            2. HORIZONTAL EXPERIENCE SHOWCASE CAROUSEL (Compact & High-Performance)
           ========================================================================= */}
        <div
          ref={viewportRef}
          className="exp-carousel-viewport relative w-full overflow-hidden select-none"
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
              className="relative flex items-stretch gap-4 sm:gap-6 lg:gap-8 will-change-transform transform-gpu py-1"
            >
              {experiences.map((exp, idx) => {
                const bullets = exp.bullets || [];
                const stack = exp.stack || [];
                const isActive = activeIdx === idx;
                const normComp = exp.company.toLowerCase();
                const isEdu = normComp.includes("universidad") || normComp.includes("utp");
                const isFreelance = normComp.includes("freelance") || normComp.includes("self-employed");

                return (
                  <div
                    key={idx}
                    ref={(el) => {
                      cardsRef.current[idx] = el;
                    }}
                    onClick={() => {
                      if (!isActive) goTo(idx);
                    }}
                    className={`exp-slide-card shrink-0 w-[92vw] sm:w-[86vw] md:w-[80vw] lg:w-[72vw] max-w-4xl transition-all duration-300 transform-gpu ${
                      !isActive ? "cursor-pointer hover:opacity-60" : ""
                    }`}
                    style={{
                      opacity: isActive ? 1 : 0.35,
                      transform: isActive ? "scale(1)" : "scale(0.95)",
                    }}
                  >
                    {/* Compact Experience Card (Engineered to fit in single viewport) */}
                    <div className="relative h-full rounded-2xl border border-zinc-700/80 bg-[#09111c]/98 p-4 sm:p-5 lg:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.85)] flex flex-col justify-between overflow-hidden group hover:border-zinc-500/80 space-y-3 sm:space-y-3.5">
                      {/* Top ambient glow line */}
                      <div
                        className={`pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent ${
                          isEdu ? "via-emerald-500/40" : "via-cyan-500/40"
                        } to-transparent`}
                      />

                      {/* Header: Company Logo, Role, Period & Location */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 sm:pb-3 border-b border-zinc-800/80">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${
                              isEdu
                                ? "from-emerald-950 to-zinc-900 border-emerald-500/40 text-emerald-400"
                                : "from-cyan-950 to-zinc-900 border-cyan-500/40 text-cyan-400"
                            } border flex items-center justify-center font-bold shadow-md shrink-0`}
                          >
                            {isEdu ? (
                              <GraduationCap className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-emerald-400" />
                            ) : isFreelance ? (
                              <Briefcase className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-cyan-400" />
                            ) : (
                              <Building2 className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-cyan-400" />
                            )}
                          </div>
                          <div>
                            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white tracking-tight leading-tight">
                              {exp.role}
                            </h3>
                            <p className={`text-xs sm:text-sm font-bold ${isEdu ? "text-emerald-400" : "text-cyan-400"}`}>
                              {exp.company}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-row sm:flex-col sm:items-end gap-2 sm:gap-1 text-xs font-mono text-zinc-400 shrink-0">
                          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-zinc-900/90 border border-zinc-800 text-zinc-200 text-[11px]">
                            <Calendar className="w-3 h-3 text-cyan-400" />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-1 text-zinc-400 text-[11px]">
                            <MapPin className="w-3 h-3 text-zinc-500" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Brief Summary Context */}
                      <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed font-normal">
                        {exp.summary}
                      </p>

                      {/* Key Impact Bullet Points (Compact 2x2 grid) */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
                          {locale === "es" ? "Aportes & Logros Clave:" : "Key Contributions:"}
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] sm:text-xs text-zinc-300">
                          {bullets.slice(0, 4).map((bullet, bIdx) => (
                            <div
                              key={bIdx}
                              className="flex items-start gap-2 p-2 sm:p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 leading-snug"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="line-clamp-3 sm:line-clamp-2">{bullet}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tech Stack & Tools Badges */}
                      <div className="pt-2 sm:pt-2.5 border-t border-zinc-800/80 flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold mr-1">
                          {locale === "es" ? "Tecnologías:" : "Technologies:"}
                        </span>
                        {stack.map((tech, sIdx) => (
                          <TechBadge key={sIdx} tech={tech} size="sm" />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

