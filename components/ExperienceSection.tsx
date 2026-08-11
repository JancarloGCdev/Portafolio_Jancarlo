"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { usePortfolio } from "@/components/portfolio-locale-provider";
import { TechBadge } from "@/components/TechBadge";
import {
  Building2,
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

      const isMobile = window.innerWidth < 768;

      gsap.to(".exp-bg-glow", {
        y: isMobile ? 80 : 300,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".exp-shape-1", {
        y: isMobile ? -30 : -150,
        rotation: -45,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#050b14] border-t border-zinc-900/80 overflow-hidden"
    >
      {/* Background ambient lighting & floating elements */}
      <div className="exp-bg-glow pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
        <div className="w-[850px] h-[850px] rounded-full bg-gradient-to-tr from-cyan-950/20 via-emerald-950/10 to-transparent blur-[140px] opacity-60" />
      </div>
      <div className="exp-shape-1 pointer-events-none absolute bottom-[10%] left-[5%] w-64 h-64 rounded-full border-[15px] border-emerald-500/5 blur-[8px] -z-10" />

      <div className="w-full max-w-6xl mx-auto space-y-8 lg:space-y-10">
        {/* =========================================================================
            1. SECTION HEADER
           ========================================================================= */}
        <div className="max-w-3xl space-y-3 mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="exp-header-anim text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            {locale === "es" ? (
              <>
                Experiencia que se traduce en{" "}
                <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 drop-shadow-sm">
                  resultados y estabilidad.
                </span>
              </>
            ) : (
              <>
                Experience that translates to{" "}
                <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 drop-shadow-sm">
                  stability and results.
                </span>
              </>
            )}
          </h2>

          <p className="exp-header-anim text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            {locale === "es"
              ? "Desarrollo de software empresarial, optimización de sistemas y mantenimiento en entornos productivos reales."
              : "Building enterprise software, optimizing systems, and maintaining software in production."}
          </p>
        </div>

        {/* =========================================================================
            2. HORIZONTAL EXPERIENCE SHOWCASE CAROUSEL
           ========================================================================= */}
        <div
          ref={viewportRef}
          className="exp-carousel-viewport relative w-full overflow-hidden space-y-6 select-none"
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
              className="flex items-stretch gap-6 md:gap-10 will-change-transform py-2"
            >
              {experiences.map((exp, idx) => {
                const bullets = exp.bullets || [];
                const stack = exp.stack || [];
                const isActive = activeIdx === idx;

                return (
                  <div
                    key={idx}
                    ref={(el) => {
                      cardsRef.current[idx] = el;
                    }}
                    className="exp-slide-card shrink-0 w-[88vw] sm:w-[78vw] md:w-[68vw] lg:w-[58vw] max-w-4xl transition-all duration-300"
                    style={{
                      opacity: isActive ? 1 : 0.45,
                      transform: isActive ? "scale(1)" : "scale(0.92)",
                    }}
                  >
                    {/* Compact & Attractive Experience Card */}
                    <div className="relative h-full rounded-2xl border border-zinc-700/80 bg-[#09111c]/95 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col justify-between overflow-hidden group hover:border-zinc-500/80 space-y-5">
                      {/* Top cyan glow line */}
                      <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

                      {/* Header: Company Logo, Role, Period & Location */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800/80">
                        <div className="flex items-center gap-3.5">
                          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-950 to-zinc-900 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold shadow-md shrink-0">
                            <Building2 className="w-5.5 h-5.5 text-cyan-400" />
                          </div>
                          <div className="space-y-0.5">
                            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                              {exp.role}
                            </h3>
                            <p className="text-sm font-bold text-cyan-400">
                              {exp.company}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:items-end gap-1 text-xs font-mono text-zinc-400 shrink-0">
                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-900/90 border border-zinc-800 text-zinc-200">
                            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center gap-1 text-zinc-400 text-[11px]">
                            <MapPin className="w-3 h-3 text-zinc-500" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Brief Summary Context */}
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
                        {exp.summary}
                      </p>

                      {/* Key Impact Bullet Points */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
                          {locale === "es" ? "Aportes & Logros Clave:" : "Key Contributions:"}
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-zinc-300">
                          {bullets.slice(0, 4).map((bullet, bIdx) => (
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

                      {/* Tech Stack & Tools Badges */}
                      <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold mr-1">
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

          {/* Controls Bar */}
          {total > 1 && (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2">
                {experiences.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => goTo(idx)}
                    aria-label={`Go to experience ${idx + 1}`}
                    className={`transition-all duration-300 rounded-full ${activeIdx === idx
                        ? "w-7 h-2.5 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                        : "w-2 h-2 bg-zinc-700 hover:bg-zinc-500"
                      }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3 font-mono text-xs text-zinc-400">
                <span>
                  <strong className="text-white">{String(activeIdx + 1).padStart(2, "0")}</strong> / {String(total).padStart(2, "0")}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prev}
                    disabled={activeIdx === 0}
                    aria-label="Previous experience"
                    className="w-9 h-9 rounded-full border border-zinc-700/80 bg-zinc-900 text-zinc-200 flex items-center justify-center hover:bg-cyan-950 hover:border-cyan-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 shadow-md"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={next}
                    disabled={activeIdx === total - 1}
                    aria-label="Next experience"
                    className="w-9 h-9 rounded-full border border-zinc-700/80 bg-zinc-900 text-zinc-200 flex items-center justify-center hover:bg-cyan-950 hover:border-cyan-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 shadow-md"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

