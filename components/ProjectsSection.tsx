"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { usePortfolio } from "@/components/portfolio-locale-provider";
import type { DevProject } from "@/lib/data";
import { TechBadge } from "@/components/TechBadge";
import {
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Github,
  Activity,
  ShoppingCart,
  FileText,
  Terminal,
  Binary,
  SunMedium,
  Zap,
  Code2,
  Workflow,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  ExternalLink,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ---------------------------------------------------------------------------
// Custom Architectural Visual Mockups (Slide 0 / Fallback for each project)
// ---------------------------------------------------------------------------

function ArchitecturalMockup({ project, locale }: { project: DevProject; locale: string }) {
  switch (project.id) {
    case "smart-school-reports":
      return (
        <div className="w-full h-full min-h-[240px] sm:min-h-[280px] rounded-xl bg-gradient-to-br from-cyan-950/50 via-zinc-900/95 to-[#060b13] border border-cyan-500/30 p-4 sm:p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between pb-2.5 border-b border-zinc-800/80 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              NLP_TRIAGE // ENGINE
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
              {locale === "es" ? "Detección Activa" : "Active Detection"}
            </span>
          </div>
          <div className="space-y-3 my-auto py-2">
            <div className="p-3 rounded-lg bg-zinc-900/90 border border-zinc-800 shadow-md space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-zinc-200 font-semibold flex items-center gap-1.5">
                  <Workflow className="w-3.5 h-3.5 text-cyan-400" />
                  {locale === "es" ? "Incidencia #1042 — Falla de Hardware" : "Incident #1042 — Hardware Fault"}
                </span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                  98% {locale === "es" ? "Similitud" : "Match"}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-snug">
                {locale === "es"
                  ? "Reporte duplicado #1039 agrupado automáticamente en clúster operativo."
                  : "Duplicate report #1039 automatically clustered to prevent redundant work."}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
              <div className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">1. Open</div>
              <div className="p-1.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-semibold">2. Triaged</div>
              <div className="p-1.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-500">3. Resolved</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-2 border-t border-zinc-800/60">
            <span>FASTAPI · POSTGRESQL</span>
            <span className="text-cyan-400 font-medium">NEXT.JS 15</span>
          </div>
        </div>
      );

    case "papertrail-commerce":
      return (
        <div className="w-full h-full min-h-[240px] sm:min-h-[280px] rounded-xl bg-gradient-to-br from-emerald-950/50 via-zinc-900/95 to-[#060b13] border border-emerald-500/30 p-4 sm:p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between pb-2.5 border-b border-zinc-800/80 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <ShoppingCart className="w-3.5 h-3.5" />
              STRAPI_HEADLESS // STOREFRONT
            </span>
            <span className="text-zinc-400 text-[10px] font-mono">REST_API: 200 OK</span>
          </div>
          <div className="grid grid-cols-2 gap-3 my-auto py-2">
            <div className="p-3 rounded-lg bg-zinc-900/90 border border-zinc-800 space-y-1.5 shadow-md">
              <div className="h-12 rounded bg-emerald-950/40 border border-emerald-500/20 flex items-center justify-center text-emerald-400/80">
                <FileText className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div className="text-[11px] font-bold text-zinc-200 truncate">Clean Architecture</div>
              <div className="text-[10px] font-mono text-emerald-400">$34.90 · In Stock</div>
            </div>
            <div className="p-3 rounded-lg bg-zinc-900/90 border border-zinc-800 space-y-1.5 shadow-md">
              <div className="h-12 rounded bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-center text-cyan-400/80">
                <Code2 className="w-6 h-6 stroke-[1.5]" />
              </div>
              <div className="text-[11px] font-bold text-zinc-200 truncate">Designing Data-Intensive</div>
              <div className="text-[10px] font-mono text-emerald-400">$42.00 · In Stock</div>
            </div>
          </div>
          <div className="p-2 rounded bg-zinc-900 border border-zinc-800/80 flex items-center justify-between text-[10px] font-mono">
            <span className="text-zinc-400">CART: 2 ITEMS</span>
            <span className="text-emerald-400 font-bold">TOTAL: $76.90 → CHECKOUT</span>
          </div>
        </div>
      );

    case "solarbrain-techos":
      return (
        <div className="w-full h-full min-h-[240px] sm:min-h-[280px] rounded-xl bg-gradient-to-br from-amber-950/50 via-zinc-900/95 to-[#060b13] border border-amber-500/30 p-4 sm:p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between pb-2.5 border-b border-zinc-800/80 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <SunMedium className="w-3.5 h-3.5" />
              TELEMETRY // DASHBOARD
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-950/80 text-amber-400 text-[10px] font-mono border border-amber-500/30">
              HACKATHON
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 my-auto py-2">
            <div className="p-3 rounded-lg bg-zinc-900/90 border border-zinc-800 space-y-1 shadow-md">
              <div className="text-[10px] font-mono text-zinc-500 uppercase">Live Generation</div>
              <div className="text-base font-bold text-white flex items-center gap-1">
                <Zap className="w-4 h-4 text-amber-400" />
                42.8 kWh
              </div>
              <div className="text-[10px] text-emerald-400 font-mono">+12.4% vs baseline</div>
            </div>
            <div className="p-3 rounded-lg bg-zinc-900/90 border border-zinc-800 space-y-1 shadow-md">
              <div className="text-[10px] font-mono text-zinc-500 uppercase">Efficiency</div>
              <div className="text-base font-bold text-white flex items-center gap-1">
                <Activity className="w-4 h-4 text-emerald-400" />
                96.4%
              </div>
              <div className="text-[10px] text-zinc-400 font-mono">PRISMA / POSTGRES</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-2 border-t border-zinc-800/60">
            <span>EXPORT_ENGINE // PDF_GEN</span>
            <span className="text-amber-400">ALERT_STATUS: NOMINAL</span>
          </div>
        </div>
      );

    case "portfolio-engineering":
      return (
        <div className="w-full h-full min-h-[240px] sm:min-h-[280px] rounded-xl bg-gradient-to-br from-cyan-950/50 via-zinc-900/95 to-[#060b13] border border-cyan-500/30 p-4 sm:p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between pb-2.5 border-b border-zinc-800/80 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <Terminal className="w-3.5 h-3.5" />
              CLI_ENGINE // NEXT.JS 15
            </span>
            <span className="text-emerald-400 font-mono text-[10px]">100% TYPE_SAFE</span>
          </div>
          <div className="p-3.5 rounded-lg bg-black/80 border border-zinc-800 font-mono text-xs space-y-2 my-auto">
            <div className="text-zinc-400 text-[11px]">
              <span className="text-cyan-400 font-bold">jancarlo@dev:~$</span> ./build --target=prod
            </div>
            <div className="text-emerald-400 text-[11px]">✓ Compiled 13 static & dynamic routes in 8.9s</div>
            <div className="text-zinc-500 text-[10px]">GSAP Timelines · Cookie i18n · Strict Hydration</div>
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-2 border-t border-zinc-800/60">
            <span>REACT 19 · TAILWIND CSS</span>
            <span className="text-cyan-400">WCAG ACCESSIBLE</span>
          </div>
        </div>
      );

    case "quine-mccluskey-simplifier":
      return (
        <div className="w-full h-full min-h-[240px] sm:min-h-[280px] rounded-xl bg-gradient-to-br from-purple-950/50 via-zinc-900/95 to-[#060b13] border border-purple-500/30 p-4 sm:p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between pb-2.5 border-b border-zinc-800/80 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-purple-400 font-bold">
              <Binary className="w-3.5 h-3.5" />
              BOOLEAN_MINIMIZER // PYTHON
            </span>
            <span className="text-zinc-400 text-[10px] font-mono">PYTEST: 100% PASS</span>
          </div>
          <div className="p-3.5 rounded-lg bg-black/80 border border-zinc-800 font-mono text-xs space-y-2 my-auto">
            <div className="text-[11px] text-zinc-400">
              <span className="text-purple-400">INPUT:</span> F(A,B,C,D) = Σm(0,1,2,5,7,8,9,10,14)
            </div>
            <div className="p-2 rounded bg-purple-950/60 border border-purple-500/40 text-[11px] text-purple-200 font-semibold">
              <span className="text-purple-400 font-bold">MINIMAL_COVER:</span> {"F = A'B' + B'D' + A C'"}
            </div>
            <div className="text-[10px] text-zinc-500">Prime Implicant Table · Exact Tabular Reduction</div>
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-2 border-t border-zinc-800/60">
            <span>ALGORITHMS · DATA STRUCTURES</span>
            <span className="text-purple-400">MODULAR CLI</span>
          </div>
        </div>
      );

    default:
      return (
        <div className="w-full h-full min-h-[240px] rounded-xl bg-zinc-900/50 border border-zinc-800 p-6 flex items-center justify-center text-zinc-500 font-mono text-xs">
          PROJECT_PREVIEW // LIVE
        </div>
      );
  }
}

// ---------------------------------------------------------------------------
// Per-Project Screenshot Gallery Component
// ---------------------------------------------------------------------------

function ProjectScreenshotGallery({ project, locale }: { project: DevProject; locale: string }) {
  const imageList = project.images || (project.image ? [project.image] : []);
  const slides = ["mockup", ...imageList];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragDelta = useRef(0);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
  }, [slides.length]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
  }, [slides.length]);

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
    if (dragDelta.current < -35) nextSlide();
    else if (dragDelta.current > 35) prevSlide();
  };

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between rounded-xl overflow-hidden border border-zinc-800/90 bg-[#060b13] shadow-xl select-none"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") prevSlide();
        if (e.key === "ArrowRight") nextSlide();
      }}
    >
      {/* Slide Content Viewport */}
      <div
        className="relative w-full min-h-[240px] sm:min-h-[280px] flex items-center justify-center overflow-hidden"
        onMouseDown={(e) => onDragStart(e.clientX)}
        onMouseMove={(e) => onDragMove(e.clientX)}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
        onTouchEnd={onDragEnd}
      >
        {currentSlide === 0 ? (
          <ArchitecturalMockup project={project} locale={locale} />
        ) : (
          <div className="w-full h-full min-h-[240px] sm:min-h-[280px] relative bg-black/85 flex items-center justify-center">
            {imgError[currentSlide] ? (
              <div className="p-6 text-center space-y-2 font-mono text-xs text-zinc-400">
                <ImageIcon className="w-8 h-8 mx-auto text-zinc-600" />
                <p className="text-zinc-300 font-semibold">{project.name} — Screenshot {currentSlide}</p>
                <p className="text-[10px] text-zinc-500">
                  {locale === "es"
                    ? `Agregar imagen real en: public${slides[currentSlide]}`
                    : `Add screenshot image at: public${slides[currentSlide]}`}
                </p>
              </div>
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={slides[currentSlide]}
                alt={`${project.name} screenshot ${currentSlide}`}
                className="proj-image-parallax w-full h-[115%] absolute top-[-7.5%] object-cover transition-opacity duration-300"
                onError={() => setImgError((prev) => ({ ...prev, [currentSlide]: true }))}
              />
            )}
          </div>
        )}

        {/* Gallery Internal Arrow Controls */}
        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/75 hover:bg-cyan-950 border border-zinc-700/80 text-zinc-200 flex items-center justify-center backdrop-blur-md transition-all active:scale-95 z-20"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/75 hover:bg-cyan-950 border border-zinc-700/80 text-zinc-200 flex items-center justify-center backdrop-blur-md transition-all active:scale-95 z-20"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Gallery Footer Bar */}
      {slides.length > 1 && (
        <div className="px-3.5 py-2 bg-[#080e18] border-t border-zinc-800/90 flex items-center justify-between text-[11px] font-mono">
          <span className="text-[10px] text-zinc-400">
            {currentSlide === 0
              ? (locale === "es" ? "PREVIEW ARQUITECTÓNICO" : "SYSTEM ARCHITECTURE")
              : `SCREENSHOT ${currentSlide}/${slides.length - 1}`}
          </span>
          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Slide ${idx}`}
                className={`transition-all duration-200 rounded-full ${currentSlide === idx
                    ? "w-4 h-1.5 bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.6)]"
                    : "w-1.5 h-1.5 bg-zinc-700 hover:bg-zinc-500"
                  }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Projects Section — Perfectly Centered Horizontal Product Showcase
// ---------------------------------------------------------------------------

export function ProjectsSection() {
  const { locale, devProjects } = usePortfolio();
  const containerRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIdx, setActiveIdx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragDelta = useRef(0);

  const total = devProjects.length;

  // Mathematically center active card in the middle (50%) of screen
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

  // Initial positioning & Window Resize listener for perfect centering
  useEffect(() => {
    const handleResize = () => goTo(activeIdx);
    const timer = setTimeout(() => goTo(activeIdx), 50);
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [activeIdx, goTo]);

  // Keyboard navigation listeners
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
    if (dragDelta.current < -45) next();
    else if (dragDelta.current > 45) prev();
  };

  // Entrance animations and Parallax on scroll
  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const isMobile = window.innerWidth < 768;

      gsap.from(".proj-header-anim", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
        y: 25,
        opacity: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.from(".proj-carousel-viewport", {
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

      // Subtle Background Glow Parallax (Increased Intensity)
      gsap.to(".proj-bg-glow", {
        y: isMobile ? 80 : 300,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Geometric floating shapes
      gsap.to(".proj-shape-1", {
        y: isMobile ? -30 : -120,
        rotation: 45,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Project Images Subtle Pan Parallax (Increased Intensity)
      gsap.to(".proj-image-parallax", {
        y: isMobile ? 30 : 70,
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
      id="projects"
      className="relative w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#050b14] border-t border-zinc-900/80 overflow-hidden"
    >
      {/* Background Ambient Glow & Shapes */}
      <div className="proj-bg-glow pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
        <div className="w-[900px] h-[900px] rounded-full bg-gradient-to-tr from-cyan-950/20 via-purple-950/10 to-transparent blur-[160px] opacity-60" />
      </div>
      <div className="proj-shape-1 pointer-events-none absolute top-[20%] right-[10%] w-48 h-48 rounded-full border-[20px] border-cyan-500/5 blur-[10px] -z-10" />

      <div className="w-full max-w-6xl mx-auto space-y-8 lg:space-y-12">
        {/* =========================================================================
            1. SECTION HEADER
           ========================================================================= */}
        <div className="max-w-3xl space-y-4 mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="proj-header-anim text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            {locale === "es" ? (
              <>
                Soluciones diseñadas para{" "}
                <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 drop-shadow-sm">
                  resolver problemas reales de negocio.
                </span>
              </>
            ) : (
              <>
                Engineered solutions designed to{" "}
                <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 drop-shadow-sm">
                  solve real-world operational challenges.
                </span>
              </>
            )}
          </h2>

          <p className="proj-header-anim text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            {locale === "es"
              ? "Cada proyecto demuestra versatilidad técnica y capacidad de adaptación: desde frontend moderno y APIs backend hasta algoritmos en Python y despliegues full-stack."
              : "Each project proves technical range and adaptability: from modern frontend and backend APIs to Python algorithms and full-stack deployments."}
          </p>
        </div>

        {/* =========================================================================
            2. HORIZONTAL CAROUSEL — PERFECTLY CENTERED ACTIVE CARD WITH SIDE PEEKS
           ========================================================================= */}
        <div
          ref={viewportRef}
          className="proj-carousel-viewport relative w-full overflow-hidden space-y-8 select-none"
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
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
          >
            {/* Sliding Track containing ALL 5 Projects */}
            <div
              ref={trackRef}
              className="flex items-stretch gap-6 md:gap-10 will-change-transform py-4"
            >
              {devProjects.map((project, idx) => {
                const githubLink = project.links.find(
                  (l) => l.variant === "github" || l.href.includes("github.com")
                );
                const liveLink =
                  project.links.find((l) => l.variant === "live") ||
                  (project.liveUrl ? { label: "Demo", href: project.liveUrl } : undefined);

                const isActive = activeIdx === idx;

                return (
                  <div
                    key={project.id}
                    ref={(el) => {
                      cardsRef.current[idx] = el;
                    }}
                    className="proj-slide-card shrink-0 w-[88vw] sm:w-[78vw] md:w-[68vw] lg:w-[58vw] max-w-4xl transition-all duration-300"
                    style={{
                      opacity: isActive ? 1 : 0.45,
                      transform: isActive ? "scale(1)" : "scale(0.92)",
                    }}
                  >
                    {/* High-Contrast Card Panel */}
                    <div className="relative h-full rounded-2xl border border-zinc-700/80 bg-[#09111c]/95 backdrop-blur-2xl p-5 sm:p-7 lg:p-9 shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-hidden group hover:border-zinc-500/80">
                      {/* Top cyan glow line */}
                      <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

                      {/* Project Index Badge */}
                      <div className="absolute top-5 right-5 font-mono text-[11px] text-zinc-500 font-bold bg-zinc-900/80 px-2.5 py-1 rounded border border-zinc-800">
                        {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                      </div>

                      {/* Card Content Layout */}
                      <div className="space-y-6">
                        {/* Top 2-Column Grid: Left (Gallery) + Right (Narrative & Features) */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                          {/* SCREENSHOT / MOCKUP GALLERY */}
                          <div className="lg:col-span-6 w-full">
                            <ProjectScreenshotGallery project={project} locale={locale} />
                          </div>

                          {/* PROJECT NARRATIVE & SPECS */}
                          <div className="lg:col-span-6 w-full flex flex-col justify-between space-y-4">
                            <div className="space-y-3">
                              <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-1.5 font-bold">
                                <Sparkles className="w-3.5 h-3.5" />
                                {project.type}
                              </span>

                              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                                {project.name}
                              </h3>

                              <p className="text-xs sm:text-sm text-zinc-300 font-medium leading-relaxed">
                                {project.tagline}
                              </p>

                              {/* Logros & Aprendizaje */}
                              <div className="space-y-4 pt-1">
                                <div className="space-y-1.5">
                                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 flex items-center gap-1.5 font-bold">
                                    <Sparkles className="w-3 h-3" />
                                    {locale === "es" ? "Lo que logré:" : "What I achieved:"}
                                  </span>
                                  <ul className="space-y-1 text-[11px] sm:text-xs text-zinc-300">
                                    {project.features.slice(0, 2).map((feat, fIdx) => (
                                      <li key={fIdx} className="flex items-start gap-1.5 leading-snug">
                                        <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                                        <span>{feat}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="space-y-1.5">
                                  <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 flex items-center gap-1.5 font-bold">
                                    <Zap className="w-3 h-3" />
                                    {locale === "es" ? "Lo que aprendí:" : "What I learned:"}
                                  </span>
                                  <p className="text-[11px] sm:text-xs text-zinc-400 leading-relaxed border-l-2 border-purple-500/30 pl-2.5">
                                    {project.learned}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Action Links */}
                            <div className="flex flex-wrap items-center gap-2.5 pt-2">
                              {githubLink && (
                                <a
                                  href={githubLink.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-cyan-950/80 border border-zinc-700/90 hover:border-cyan-500/60 text-xs font-semibold text-zinc-200 hover:text-cyan-300 transition-all active:scale-[0.98]"
                                >
                                  <Github className="w-3.5 h-3.5 text-cyan-400" />
                                  <span>{githubLink.label || "Ver en GitHub"}</span>
                                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                                </a>
                              )}

                              {liveLink && (
                                <a
                                  href={liveLink.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-950/80 border border-emerald-500/40 hover:border-emerald-400 text-xs font-semibold text-emerald-300 transition-all active:scale-[0.98]"
                                >
                                  <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>{liveLink.label || "Ver Demo"}</span>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Full-Width Container for Technologies & Skills with Official Logos */}
                        <div className="pt-4 border-t border-zinc-800/80 space-y-2.5 bg-[#060b13]/60 p-4 rounded-xl border border-zinc-800/90">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 block font-bold flex items-center gap-1.5">
                            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                            {locale === "es" ? "Stack Tecnológico & Lenguajes:" : "Technology Stack & Languages:"}
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {project.stack.map((tech, tIdx) => (
                              <TechBadge key={tIdx} tech={tech} size="md" />
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
              3. CAROUSEL CONTROLS BAR [ ← ] [ Dots / Counter ] [ → ]
             ========================================================================= */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 pt-2">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {devProjects.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goTo(idx)}
                  aria-label={`Go to project ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full ${activeIdx === idx
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

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  disabled={activeIdx === 0}
                  aria-label="Previous project"
                  className="w-10 h-10 rounded-full border border-zinc-700/80 bg-zinc-900 text-zinc-200 flex items-center justify-center hover:bg-cyan-950 hover:border-cyan-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 shadow-md"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={next}
                  disabled={activeIdx === total - 1}
                  aria-label="Next project"
                  className="w-10 h-10 rounded-full border border-zinc-700/80 bg-zinc-900 text-zinc-200 flex items-center justify-center hover:bg-cyan-950 hover:border-cyan-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 shadow-md"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
