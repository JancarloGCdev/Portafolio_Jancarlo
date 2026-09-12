"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePortfolio } from "@/components/portfolio-locale-provider";
import type { DevProject } from "@/lib/data";
import { TechBadge } from "@/components/TechBadge";
import {
  Sparkles,
  ShoppingCart,
  FileText,
  Binary,
  Code2,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  ExternalLink,
  X,
  Maximize2,
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

function ArchitecturalMockup({ project }: { project: DevProject; locale?: string }) {
  switch (project.id) {
    case "papertrail-commerce":
      return (
        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-emerald-950/50 via-zinc-900/95 to-[#060b13] border border-emerald-500/30 p-3.5 sm:p-4 md:p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <ShoppingCart className="w-3.5 h-3.5" />
              STRAPI_HEADLESS // STOREFRONT
            </span>
            <span className="text-zinc-400 text-[10px] font-mono">REST_API: 200 OK</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 my-auto py-1.5">
            <div className="p-3 sm:p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-1.5 sm:space-y-2 shadow-md">
              <div className="h-10 sm:h-12 rounded-lg bg-emerald-950/40 border border-emerald-500/20 flex items-center justify-center text-emerald-400/80">
                <FileText className="w-5 sm:w-6 h-5 sm:h-6 stroke-[1.5]" />
              </div>
              <div className="text-xs font-bold text-zinc-200 truncate">Clean Architecture</div>
              <div className="text-[10px] sm:text-[11px] font-mono text-emerald-400 font-semibold">$34.90 · In Stock</div>
            </div>
            <div className="p-3 sm:p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-1.5 sm:space-y-2 shadow-md">
              <div className="h-10 sm:h-12 rounded-lg bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-center text-cyan-400/80">
                <Code2 className="w-5 sm:w-6 h-5 sm:h-6 stroke-[1.5]" />
              </div>
              <div className="text-xs font-bold text-zinc-200 truncate">Designing Data-Intensive</div>
              <div className="text-[10px] sm:text-[11px] font-mono text-emerald-400 font-semibold">$42.00 · In Stock</div>
            </div>
          </div>
          <div className="p-2 sm:p-2.5 rounded-lg bg-zinc-900 border border-zinc-800/80 flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400">CART: 2 ITEMS</span>
            <span className="text-emerald-400 font-bold">TOTAL: $76.90 → CHECKOUT</span>
          </div>
        </div>
      );
    case "quine-mccluskey-simplifier":
      return (
        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-purple-950/50 via-zinc-900/95 to-[#060b13] border border-purple-500/30 p-3.5 sm:p-4 md:p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-purple-400 font-bold">
              <Binary className="w-3.5 h-3.5" />
              BOOLEAN_MINIMIZER // PYTHON
            </span>
            <span className="text-zinc-400 text-[10px] font-mono">PYTEST: 100% PASS</span>
          </div>
          <div className="p-3 sm:p-3.5 rounded-xl bg-black/80 border border-zinc-800 font-mono text-xs space-y-2 my-auto">
            <div className="text-xs text-zinc-300">
              <span className="text-purple-400 font-bold">INPUT:</span> F(A,B,C,D) = Σm(0,1,2,5,7,8,9,10,14)
            </div>
            <div className="p-2 rounded-lg bg-purple-950/60 border border-purple-500/40 text-xs text-purple-200 font-semibold">
              <span className="text-purple-400 font-bold">MINIMAL_COVER:</span> {"F = A'B' + B'D' + A C'"}
            </div>
            <div className="text-[10px] text-zinc-500">Prime Implicant Table · Exact Tabular Reduction</div>
          </div>
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-zinc-500 pt-1.5 border-t border-zinc-800/60">
            <span>ALGORITHMS · DATA STRUCTURES</span>
            <span className="text-purple-400 font-medium">MODULAR CLI</span>
          </div>
        </div>
      );

    default:
      return (
        <div className="w-full h-full rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6 flex items-center justify-center text-zinc-500 font-mono text-xs">
          PROJECT_PREVIEW // LIVE
        </div>
      );
  }
}

// ---------------------------------------------------------------------------
// Fullscreen Image Lightbox Modal with Carousel & Mobile Gestures
// ---------------------------------------------------------------------------

function ProjectLightboxModal({
  isOpen,
  slides,
  initialIndex,
  projectName,
  projectType,
  locale,
  onClose,
}: {
  isOpen: boolean;
  slides: string[];
  initialIndex: number;
  projectName: string;
  projectType: string;
  locale: string;
  onClose: (finalIndex: number) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragDelta = useRef(0);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const prev = useCallback(() => {
    setCurrentIndex((prevIdx) => (prevIdx > 0 ? prevIdx - 1 : slides.length - 1));
  }, [slides.length]);

  const next = useCallback(() => {
    setCurrentIndex((prevIdx) => (prevIdx < slides.length - 1 ? prevIdx + 1 : 0));
  }, [slides.length]);

  // Keyboard navigation & ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose(currentIndex);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, currentIndex, onClose, prev, next]);

  if (!isOpen || typeof document === "undefined") return null;

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
    if (dragDelta.current < -40) next();
    else if (dragDelta.current > 40) prev();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-2xl flex flex-col justify-between select-none animate-in fade-in duration-200"
      onClick={() => onClose(currentIndex)}
    >
      {/* 1. Header Bar */}
      <div
        className="w-full px-4 sm:px-6 py-3.5 bg-zinc-950/90 border-b border-zinc-800/80 flex items-center justify-between z-10 backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col min-w-0 pr-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold truncate">
              {projectType}
            </span>
          </div>
          <h4 className="text-sm sm:text-base font-bold text-white truncate">{projectName}</h4>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="font-mono text-xs text-zinc-400 bg-zinc-900/90 px-2.5 py-1 rounded-md border border-zinc-800 font-semibold">
            {currentIndex + 1} / {slides.length}
          </span>

          <button
            type="button"
            onClick={() => onClose(currentIndex)}
            aria-label={locale === "es" ? "Cerrar visor" : "Close viewer"}
            className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-red-950/80 text-zinc-300 hover:text-red-300 border border-zinc-700/80 hover:border-red-500/50 flex items-center justify-center transition-all active:scale-90 shadow-md cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 2. Main Center Content (Full Image Viewport with touch gestures) */}
      <div
        className="relative flex-1 w-full flex items-center justify-center p-3 sm:p-6 overflow-hidden"
        onMouseDown={(e) => onDragStart(e.clientX)}
        onMouseMove={(e) => onDragMove(e.clientX)}
        onMouseUp={onDragEnd}
        onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
        onTouchEnd={onDragEnd}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={slides[currentIndex]}
          src={slides[currentIndex]}
          alt={`${projectName} screenshot ${currentIndex + 1}`}
          className="max-w-full max-h-[72vh] sm:max-h-[76vh] w-auto h-auto object-contain rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] border border-zinc-800/80 select-none pointer-events-none animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
          onContextMenu={(e) => e.preventDefault()}
          draggable={false}
        />

        {/* Floating Side Arrows in Lightbox */}
        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-zinc-950/80 hover:bg-cyan-950 border border-zinc-700/90 text-zinc-200 hover:text-cyan-300 flex items-center justify-center backdrop-blur-md transition-all active:scale-95 z-20 shadow-2xl cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-zinc-950/80 hover:bg-cyan-950 border border-zinc-700/90 text-zinc-200 hover:text-cyan-300 flex items-center justify-center backdrop-blur-md transition-all active:scale-95 z-20 shadow-2xl cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* 3. Footer Bar: Dots & Hint */}
      <div
        className="w-full px-4 py-3 bg-zinc-950/90 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs font-mono backdrop-blur-md z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-[11px] text-zinc-400 text-center sm:text-left">
          {locale === "es"
            ? "Desliza o usa flechas para navegar · Toca fuera o la X para cerrar"
            : "Swipe or use arrows to navigate · Tap outside or X to close"}
        </span>

        {slides.length > 1 && (
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`transition-all duration-200 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? "w-6 h-2 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.7)]"
                    : "w-2 h-2 bg-zinc-700 hover:bg-zinc-500"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

// ---------------------------------------------------------------------------
// Per-Project Screenshot Gallery Component
// ---------------------------------------------------------------------------

function ProjectScreenshotGallery({ project, locale }: { project: DevProject; locale: string }) {
  const imageList = (project.images && project.images.length > 0) ? project.images : (project.image ? [project.image] : []);
  const hasImages = imageList.length > 0;
  const slides = hasImages ? imageList : ["mockup"];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});
  const [isDragging, setIsDragging] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const dragStartX = useRef(0);
  const dragDelta = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setCurrentSlide(0);
  }, [project.id]);

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

  const isMockup = slides[currentSlide] === "mockup";

  return (
    <>
      <div
        className="relative w-full h-full flex flex-col justify-between rounded-2xl overflow-hidden border border-zinc-800/90 bg-[#040810] shadow-xl select-none"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") prevSlide();
          if (e.key === "ArrowRight") nextSlide();
        }}
      >
        {/* Slide Content Viewport: Compact & Constant Height */}
        <div
          className="relative w-full h-[180px] sm:h-[210px] md:h-[240px] lg:h-[260px] flex items-center justify-center overflow-hidden bg-[#040810] group/img"
          onMouseDown={(e) => onDragStart(e.clientX)}
          onMouseMove={(e) => onDragMove(e.clientX)}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
          onTouchEnd={onDragEnd}
        >
          {isMockup ? (
            <div className="w-full h-full p-2 sm:p-2.5">
              <ArchitecturalMockup project={project} locale={locale} />
            </div>
          ) : (
            <div
              className="w-full h-full relative bg-[#040810] flex items-center justify-center p-2 sm:p-3 overflow-hidden cursor-zoom-in"
              onClick={() => {
                if (Math.abs(dragDelta.current) < 10) {
                  setIsLightboxOpen(true);
                }
              }}
            >
              {imgError[currentSlide] ? (
                <div className="p-6 text-center space-y-2 font-mono text-xs text-zinc-400">
                  <ImageIcon className="w-8 h-8 mx-auto text-zinc-600" />
                  <p className="text-zinc-300 font-semibold">{project.name} — Screenshot {currentSlide + 1}</p>
                  <p className="text-[10px] text-zinc-500">
                    {locale === "es"
                      ? `Agregar imagen real en: public${slides[currentSlide]}`
                      : `Add screenshot image at: public${slides[currentSlide]}`}
                  </p>
                </div>
              ) : (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={slides[currentSlide]}
                    alt={`${project.name} screenshot ${currentSlide + 1}`}
                    className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg transition-all duration-300 drop-shadow-md select-none pointer-events-none group-hover/img:scale-[1.02]"
                    loading="lazy"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    onError={() => setImgError((prev) => ({ ...prev, [currentSlide]: true }))}
                  />

                  {/* Visual hint pill to tap & expand */}
                  <div className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/80 hover:bg-cyan-950/90 border border-zinc-700/80 text-zinc-300 group-hover/img:text-cyan-300 text-[10px] sm:text-[11px] font-mono backdrop-blur-md transition-all shadow-md pointer-events-none group-hover/img:border-cyan-500/50">
                    <Maximize2 className="w-3 h-3 text-cyan-400" />
                    <span>{locale === "es" ? "Toca para ampliar" : "Tap to expand"}</span>
                  </div>
                </>
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
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/75 hover:bg-cyan-950 border border-zinc-700/80 text-zinc-200 flex items-center justify-center backdrop-blur-md transition-all active:scale-95 z-20 cursor-pointer"
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
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/75 hover:bg-cyan-950 border border-zinc-700/80 text-zinc-200 flex items-center justify-center backdrop-blur-md transition-all active:scale-95 z-20 cursor-pointer"
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
              {isMockup
                ? (locale === "es" ? "PREVIEW ARQUITECTÓNICO" : "SYSTEM ARCHITECTURE")
                : (locale === "es"
                    ? `IMAGEN ${currentSlide + 1}/${slides.length}`
                    : `SCREENSHOT ${currentSlide + 1}/${slides.length}`)}
            </span>
            <div className="flex items-center gap-1.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`transition-all duration-200 rounded-full cursor-pointer ${
                    currentSlide === idx
                      ? "w-4 h-1.5 bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.6)]"
                      : "w-1.5 h-1.5 bg-zinc-700 hover:bg-zinc-500"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal (Portal) */}
      {hasImages && mounted && (
        <ProjectLightboxModal
          isOpen={isLightboxOpen}
          slides={slides}
          initialIndex={currentSlide}
          projectName={project.name}
          projectType={project.type}
          locale={locale}
          onClose={(finalIndex) => {
            setCurrentSlide(finalIndex);
            setIsLightboxOpen(false);
          }}
        />
      )}
    </>
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

  // Entrance animations - Lightweight & High Performance
  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      gsap.from(".proj-header-anim", {
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

      gsap.from(".proj-carousel-viewport", {
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
      id="projects"
      className="relative w-full py-6 sm:py-8 lg:py-10 border-t border-zinc-900/80 overflow-hidden scroll-mt-16 sm:scroll-mt-20"
    >
      {/* Background Ambient Glow - Hardware accelerated without scroll scrub lag */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden transform-gpu">
        <div className="w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-cyan-950/20 via-purple-950/10 to-transparent blur-[100px] opacity-50" />
      </div>

      <div className="w-full space-y-4">
        {/* =========================================================================
            1. UNIFIED SECTION HEADER & CONTROLS (Compact single-view layout)
           ========================================================================= */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <div className="proj-header-anim flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
              <Code2 className="w-3.5 h-3.5" />
              <span>{locale === "es" ? "Proyectos Destacados" : "Featured Projects"}</span>
            </div>

            <h2 className="proj-header-anim text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug">
              {locale === "es" ? (
                <>
                  Soluciones para{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                    retos reales de negocio.
                  </span>
                </>
              ) : (
                <>
                  Engineered solutions for{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                    real business challenges.
                  </span>
                </>
              )}
            </h2>

            <p className="proj-header-anim text-xs sm:text-[13px] text-zinc-400 leading-normal max-w-xl">
              {locale === "es"
                ? "Arquitectura full-stack, APIs robustas y productos web de alto impacto visual."
                : "Full-stack architecture, robust APIs, and high visual performance web applications."}
            </p>
          </div>

          {/* Inline Controls (Right side of header) */}
          <div className="proj-header-anim flex items-center gap-3 shrink-0 font-mono text-xs text-zinc-400 self-end sm:self-auto bg-zinc-900/90 border border-zinc-800 rounded-full px-3 py-1.5 shadow-sm">
            <div className="flex items-center gap-1.5">
              {devProjects.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goTo(idx)}
                  aria-label={`Go to project ${idx + 1}`}
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
                aria-label="Previous project"
                className="w-7 h-7 rounded-full border border-zinc-700/80 bg-zinc-800 text-zinc-200 flex items-center justify-center hover:bg-cyan-950 hover:border-cyan-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={next}
                disabled={activeIdx === total - 1}
                aria-label="Next project"
                className="w-7 h-7 rounded-full border border-zinc-700/80 bg-zinc-800 text-zinc-200 flex items-center justify-center hover:bg-cyan-950 hover:border-cyan-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. HORIZONTAL CAROUSEL — COMPACT 2-COLUMN SINGLE-VIEW PROJECT CARD
           ========================================================================= */}
        <div
          ref={viewportRef}
          className="proj-carousel-viewport relative w-full overflow-hidden select-none"
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
            {/* Sliding Track containing Projects */}
            <div
              ref={trackRef}
              className="relative flex items-stretch gap-4 sm:gap-6 lg:gap-8 will-change-transform transform-gpu py-1"
            >
              {devProjects.map((project, idx) => {
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
                    onClick={() => {
                      if (!isActive) goTo(idx);
                    }}
                    className={`proj-slide-card shrink-0 w-[92vw] sm:w-[86vw] md:w-[80vw] lg:w-[74vw] max-w-4xl transition-all duration-300 transform-gpu ${
                      !isActive ? "cursor-pointer hover:opacity-60" : ""
                    }`}
                    style={{
                      opacity: isActive ? 1 : 0.35,
                      transform: isActive ? "scale(1)" : "scale(0.95)",
                    }}
                  >
                    {/* Compact 2-Column Project Card (Engineered to fit single viewport) */}
                    <div className="relative h-full rounded-2xl border border-zinc-700/80 bg-[#09111c]/98 p-4 sm:p-5 lg:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.85)] flex flex-col justify-between overflow-hidden group hover:border-zinc-500/80">
                      {/* Top cyan glow line */}
                      <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

                      {/* 2-Column Responsive Layout: Gallery Left, Content Right */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center">
                        {/* LEFT: Mockup / Screenshot Gallery */}
                        <div className="lg:col-span-5 w-full">
                          <ProjectScreenshotGallery project={project} locale={locale} />
                        </div>

                        {/* RIGHT: Specs, Impact & Stack */}
                        <div className="lg:col-span-7 flex flex-col justify-between space-y-2.5 sm:space-y-3">
                          {/* Header: Type Tag, Name & Tagline */}
                          <div>
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-1 font-bold">
                                <Sparkles className="w-3 h-3 text-cyan-300" />
                                {project.type}
                              </span>
                              <span className="font-mono text-xs text-zinc-500 font-bold">
                                {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                              </span>
                            </div>

                            <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-white tracking-tight leading-tight mt-0.5">
                              {project.name}
                            </h3>

                            <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed font-normal mt-1 line-clamp-2">
                              {project.tagline}
                            </p>
                          </div>

                          {/* Achievements & Learning takeaway */}
                          <div className="space-y-2">
                            <ul className="space-y-1 text-xs text-zinc-300">
                              {project.features.slice(0, 2).map((feat, fIdx) => (
                                <li key={fIdx} className="flex items-start gap-1.5 leading-snug">
                                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                                  <span className="line-clamp-2">{feat}</span>
                                </li>
                              ))}
                            </ul>

                            <div className="text-[11px] sm:text-xs text-zinc-300 leading-relaxed border-l-2 border-purple-500/60 pl-2.5 py-1.5 bg-purple-950/25 rounded-r">
                              <span className="text-purple-300 font-semibold block mb-0.5 text-[10px] uppercase font-mono tracking-wider">
                                {locale === "es" ? "Aprendizaje clave:" : "Key takeaway:"}
                              </span>
                              <p className="text-zinc-200 font-normal leading-relaxed">{project.learned}</p>
                            </div>
                          </div>

                          {/* Technologies Badges & Action Link */}
                          <div className="pt-2 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2">
                            <div className="flex flex-wrap gap-1.5 items-center">
                              {project.stack.slice(0, 5).map((tech, tIdx) => (
                                <TechBadge key={tIdx} tech={tech} size="sm" />
                              ))}
                              {project.stack.length > 5 && (
                                <span className="px-1.5 py-0.5 text-[10px] rounded bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono">
                                  +{project.stack.length - 5}
                                </span>
                              )}
                            </div>

                            {liveLink && (
                              <a
                                href={liveLink.href}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 hover:border-emerald-400 text-xs font-semibold text-emerald-300 transition-all active:scale-[0.98] shrink-0 shadow-sm"
                              >
                                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                                <span>{liveLink.label || "Demo"}</span>
                              </a>
                            )}
                          </div>
                        </div>
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
