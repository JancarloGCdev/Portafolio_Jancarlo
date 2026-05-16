"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useIsPresent, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Github, LayoutGrid, Linkedin, Shield, Sparkles, X } from "lucide-react";
import Image from "next/image";
import type { CaseActions, CaseBadge, CaseDetailSlide, TopologyNodeId } from "@/lib/mapData";
import { flattenStackEntries, resolveTechLogo, techLogoImgSrc } from "@/lib/tech-logos";
import { usePortfolio } from "@/components/portfolio-locale-provider";
import type { PageCopy } from "@/lib/page-copy";

type NodeModalProps = {
  nodeId: TopologyNodeId | null;
  anchorId?: string | null;
  onClose: () => void;
};

/** Por debajo del HUD (`z-[110]`) y QuickAccess (`z-[120]`) — el mapa y el ribbon quedan tapados. */
function ModalBackdrop({ onClose, closeAria }: { onClose: () => void; closeAria: string }) {
  const present = useIsPresent();
  const reduceMotion = useReducedMotion();
  return (
    <motion.button
      type="button"
      aria-label={closeAria}
      className={`fixed inset-0 z-[80] cursor-default bg-slate-950/50 backdrop-blur-none transition-[opacity] ${present ? "pointer-events-auto" : "pointer-events-none"}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0.12 : 0.28, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClose}
    />
  );
}

function ImmersivePanel({
  children,
}: {
  children: ReactNode;
}) {
  const present = useIsPresent();
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-file-title"
      style={{ transformOrigin: "50% 34%" }}
      className={`pointer-events-auto flex min-h-0 min-w-0 w-full flex-col overflow-hidden rounded-2xl border border-accent-cyan/28 bg-[#050b14] shadow-[0_8px_40px_-16px_rgba(0,0,0,0.85)] will-change-transform max-sm:max-h-[min(calc(100dvh-8rem),88dvh)] max-sm:max-w-[min(34rem,calc(100vw-2rem))] max-sm:flex-none sm:max-h-[min(94dvh,900px,calc(100dvh-5.5rem))] sm:max-w-[min(100vw,56rem)] sm:rounded-[2rem] sm:shadow-[0_32px_100px_-36px_rgba(0,0,0,0.75)] ${present ? "" : "pointer-events-none"}`}
      initial={reduceMotion ? { opacity: 0, y: 10, scale: 1 } : { opacity: 0.92, scale: 0.045 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={reduceMotion ? { opacity: 0, y: 8 } : { opacity: 0.88, scale: 0.06 }}
      transition={
        reduceMotion ? { duration: 0.2, ease: [0.22, 1, 0.36, 1] } : { duration: 0.58, ease: [0.17, 0.9, 0.18, 1] }
      }
      onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
    >
      {children}
    </motion.div>
  );
}

function Badge({ badge }: { badge: CaseBadge }) {
  const nm = usePortfolio().copy.nodeModal;
  const isDone = badge === "completed";
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${
        isDone ? "border border-accent-green/35 bg-accent-green/14 text-accent-green" : "border border-amber-400/35 bg-amber-500/12 text-amber-100"
      }`}
    >
      {isDone ? nm.badgeDelivered : nm.badgeInProgress}
    </span>
  );
}

function EvRaster({ src, alt }: { src: string; alt: string }) {
  const nm = usePortfolio().copy.nodeModal;
  const [ok, setOk] = useState(true);
  if (!ok) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-surface-border bg-black/35 text-[11px] text-zinc-500">
        {nm.imagePending} {alt}
      </div>
    );
  }
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-surface-border bg-black/25">
      <Image src={src} alt={alt} fill className="object-cover object-center" sizes="320px" onError={() => setOk(false)} unoptimized />
    </div>
  );
}

function EvSvg({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-surface-border bg-black/25">
      <Image src={src} alt={alt} fill className="object-cover object-center" sizes="320px" unoptimized />
    </div>
  );
}

const section = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.055, delayChildren: 0.06 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 380, damping: 36 },
  },
};

function StackTechBadge({ rawToken }: { rawToken: string }) {
  const resolved = resolveTechLogo(rawToken);
  const label = resolved?.label ?? rawToken;

  return (
    <span title={label} className="inline-flex max-w-[220px] items-center gap-1.5 rounded-md border border-cyan-500/20 bg-accent-cyan/10 px-2 py-1 text-left text-cyan-100/95">
      {resolved ? (
        <Image
          src={techLogoImgSrc(resolved)}
          alt=""
          width={22}
          height={22}
          loading="lazy"
          sizes="22px"
          unoptimized
          className="size-[22px] shrink-0 [filter:drop-shadow(0_0_10px_rgba(34,211,238,0.22))]"
        />
      ) : null}
      <span className="truncate text-[11px]">{resolved ? label : rawToken}</span>
    </span>
  );
}

function CaseActionButtons({ actions, nm }: { actions: CaseActions; nm: PageCopy["nodeModal"] }) {
  return (
    <>
      {actions.github ? (
        <a
          href={actions.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-600 bg-zinc-900/85 px-3 py-2 text-[13px] font-medium text-white transition hover:border-accent-cyan/45 hover:text-accent-cyan"
        >
          <Github className="h-4 w-4" aria-hidden /> GitHub
          <ExternalLink className="h-3 w-3 opacity-60" aria-hidden />
        </a>
      ) : null}
      {actions.githubSecondary ? (
        <a
          href={actions.githubSecondary}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-600/85 bg-black/55 px-3 py-2 text-[12px] font-medium text-zinc-200 transition hover:border-accent-cyan/45 hover:text-accent-cyan"
        >
          <Github className="h-4 w-4" aria-hidden /> {nm.repoSecondary}
          <ExternalLink className="h-3 w-3 opacity-55" aria-hidden />
        </a>
      ) : null}
      {actions.demo ? (
        <a
          href={actions.demo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-accent-cyan/38 bg-accent-cyan/14 px-3 py-2 text-[13px] font-medium text-accent-cyan transition hover:bg-accent-cyan/22"
        >
          {nm.liveSite}
          <ExternalLink className="h-3 w-3 opacity-70" aria-hidden />
        </a>
      ) : null}
      {actions.linkedin ? (
        <a
          href={actions.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-sky-500/35 bg-sky-500/12 px-3 py-2 text-[13px] font-medium text-sky-100 transition hover:border-sky-400/50 hover:bg-sky-500/18"
        >
          <Linkedin className="h-4 w-4" aria-hidden /> {nm.linkedinActionLabel}
          <ExternalLink className="h-3 w-3 opacity-60" aria-hidden />
        </a>
      ) : null}
    </>
  );
}

function DetailSlideBody({ slide, nm }: { slide: CaseDetailSlide; nm: PageCopy["nodeModal"] }) {
  const stackTokens = useMemo(() => flattenStackEntries(slide.stack, 28), [slide.stack]);
  const summaryTrim = slide.summary.trim();

  return (
    <div className="min-h-0 min-w-0 space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h3 className="text-[17px] font-semibold leading-snug tracking-tight text-white sm:text-xl">{slide.title}</h3>
        {slide.subtitle ? (
          <p className="mt-1 text-[13px] leading-snug text-accent-cyan/90">{slide.subtitle}</p>
        ) : null}
      </div>

      {summaryTrim ? <p className="leading-relaxed text-[14px] text-zinc-300">{summaryTrim}</p> : null}

      {slide.features.length > 0 ? (
        <div>
          <h4 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
            <LayoutGrid className="h-3.5 w-3.5" aria-hidden /> {nm.highlightsHeading}
          </h4>
          <ul className="mt-3 list-inside list-disc space-y-1.5 text-[13px] text-zinc-300">
            {slide.features.slice(0, 12).map((f, i) => (
              <li key={`${i}-${f.slice(0, 96)}`}>{f}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {stackTokens.length > 0 ? (
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">{nm.stackHeading}</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {stackTokens.map((t) => (
              <StackTechBadge key={`${slide.title}-${t}`} rawToken={t} />
            ))}
          </div>
        </div>
      ) : null}

      {slide.securityConsiderations.length > 0 ? (
        <div>
          <h4 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
            <Sparkles className="h-3.5 w-3.5" aria-hidden /> {slide.insightsHeading ?? nm.securityHeading}
          </h4>
          <ul className="mt-2 space-y-2 text-[13px] leading-relaxed text-zinc-400">
            {slide.securityConsiderations.map((line, i) => (
              <li key={`${i}-${line.slice(0, 64)}`} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-green/80" aria-hidden />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {slide.evidence.length > 0 ? (
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">{nm.evidenceHeading}</h4>
          <div className="mt-3 grid min-w-0 gap-3 sm:grid-cols-2">
            {slide.evidence.map((slot, i) => (
              <div key={`${i}-${slot.src}`} className="min-w-0">
                {slot.src.endsWith(".svg") ? <EvSvg src={slot.src} alt={slot.alt} /> : <EvRaster src={slot.src} alt={slot.alt} />}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {slide.actions.github || slide.actions.githubSecondary || slide.actions.demo || slide.actions.linkedin ? (
        <motion.div variants={fadeUp} className="flex flex-wrap gap-2 pt-2">
          <CaseActionButtons actions={slide.actions} nm={nm} />
        </motion.div>
      ) : null}

      {slide.learned ? (
        <motion.div variants={fadeUp} className="rounded-xl border border-accent-cyan/15 bg-accent-cyan/5 px-4 py-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent-cyan/90">{nm.learnHeading}</span>
          <p className="mt-2 text-[13px] leading-relaxed text-zinc-300">{slide.learned[0]}</p>
          <p className="mt-2 border-t border-white/10 pt-3 text-[13px] leading-relaxed text-zinc-400">{slide.learned[1]}</p>
        </motion.div>
      ) : slide.reflectionSingle ? (
        <motion.div variants={fadeUp} className="rounded-xl border border-accent-cyan/15 bg-accent-cyan/5 px-4 py-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent-cyan/90">{nm.learnHeading}</span>
          <p className="mt-2 text-[13px] leading-relaxed text-zinc-300">{slide.reflectionSingle}</p>
        </motion.div>
      ) : null}
    </div>
  );
}

function DetailSlidesCarousel({ slides, nodeId }: { slides: readonly CaseDetailSlide[]; nodeId: TopologyNodeId }) {
  const nm = usePortfolio().copy.nodeModal;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
    requestAnimationFrame(() => {
      const el = scrollerRef.current;
      if (el) el.scrollLeft = 0;
    });
  }, [nodeId]);

  const goTo = useCallback((index: number) => {
    const root = scrollerRef.current;
    if (!root) return;
    const clamped = Math.max(0, Math.min(slides.length - 1, index));
    const target = root.querySelector(`[data-slide-pin="${clamped}"]`) as HTMLElement | null;
    if (target) {
      root.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
    }
    setActive(clamped);
  }, [slides.length]);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root || slides.length <= 1) return;

    let raf = 0;
    const syncFromScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const w = root.clientWidth;
        if (w <= 0) return;
        const idx = Math.max(0, Math.min(slides.length - 1, Math.round(root.scrollLeft / w)));
        setActive((prev) => (prev === idx ? prev : idx));
      });
    };

    root.addEventListener("scroll", syncFromScroll, { passive: true });
    syncFromScroll();

    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener("scroll", syncFromScroll);
    };
  }, [slides.length, nodeId]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(active - 1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(active + 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goTo, slides.length]);

  const statusText = nm.carouselSlideStatus.replace("{current}", String(active + 1)).replace("{total}", String(slides.length));

  const showNav = slides.length > 1;

  return (
    <motion.div variants={fadeUp} className="mt-7 min-w-0 max-w-full">
      <div className="relative min-w-0 overflow-x-hidden">
        {showNav ? (
          <>
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              aria-label={nm.carouselPrevAria}
              className="absolute left-1 top-1/2 z-10 hidden -translate-y-1/2 rounded-lg border border-white/14 bg-black/65 p-2 text-white shadow-lg backdrop-blur-sm transition hover:border-accent-cyan/45 hover:bg-black/85 disabled:pointer-events-none disabled:opacity-30 sm:flex"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              disabled={active >= slides.length - 1}
              aria-label={nm.carouselNextAria}
              className="absolute right-1 top-1/2 z-10 hidden -translate-y-1/2 rounded-lg border border-white/14 bg-black/65 p-2 text-white shadow-lg backdrop-blur-sm transition hover:border-accent-cyan/45 hover:bg-black/85 disabled:pointer-events-none disabled:opacity-30 sm:flex"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </>
        ) : null}

        <div
          ref={scrollerRef}
          className={`carousel-x grid min-h-0 min-w-0 max-w-full grid-flow-col auto-cols-[100%] gap-0 overflow-x-auto overflow-y-visible overscroll-x-contain scroll-smooth pb-1 touch-pan-x [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0 ${showNav ? "snap-x snap-mandatory" : ""}`}
        >
          {slides.map((slide, i) => (
            <article
              key={`${slide.title}-${i}`}
              data-slide-pin={i}
              className={`box-border min-h-0 min-w-0 max-w-full shrink-0 rounded-2xl border border-white/[0.09] bg-black/38 px-4 py-5 sm:px-5 sm:py-6 ${showNav ? "snap-start snap-always" : ""}`}
            >
              <DetailSlideBody slide={slide} nm={nm} />
            </article>
          ))}
        </div>
      </div>

      {showNav ? (
        <div className="mt-4 flex flex-col items-center gap-3">
          <p className="text-center text-[11px] uppercase tracking-[0.16em] text-zinc-500" aria-live="polite">
            {statusText}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex gap-1.5" role="tablist" aria-label={statusText}>
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={nm.carouselSlideStatus.replace("{current}", String(i + 1)).replace("{total}", String(slides.length))}
                  onClick={() => goTo(i)}
                  className={`h-2 w-2 rounded-full transition ${i === active ? "scale-125 bg-accent-cyan" : "bg-zinc-600 hover:bg-zinc-500"}`}
                />
              ))}
            </div>
            <div className="flex gap-2 sm:hidden">
              <button
                type="button"
                onClick={() => goTo(active - 1)}
                disabled={active === 0}
                aria-label={nm.carouselPrevAria}
                className="rounded-lg border border-white/14 bg-black/65 p-2 text-white disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => goTo(active + 1)}
                disabled={active >= slides.length - 1}
                aria-label={nm.carouselNextAria}
                className="rounded-lg border border-white/14 bg-black/65 p-2 text-white disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronRight className="h-5 w-5" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </motion.div>
  );
}

export function NodeModal({ nodeId, anchorId, onClose }: NodeModalProps) {
  const { caseFiles, copy } = usePortfolio();
  const nm = copy.nodeModal;
  const dossier = nodeId ? caseFiles[nodeId] : null;
  const detailSlides = dossier?.detailSlides;
  const slideMode = (detailSlides?.length ?? 0) > 0;
  const stackTokens = useMemo(
    () => (dossier && !slideMode ? flattenStackEntries(dossier.stack, 28) : []),
    [dossier, slideMode],
  );

  useEffect(() => {
    if (!nodeId || !anchorId) return;
    window.requestAnimationFrame(() => {
      document.getElementById(`anchor-${anchorId}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }, [anchorId, nodeId]);

  useEffect(() => {
    if (!nodeId) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [nodeId]);

  useEffect(() => {
    if (!nodeId) return;
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [nodeId, onClose]);

  return (
    <AnimatePresence mode="sync">
      {dossier && nodeId ? (
        <>
          <ModalBackdrop key="nm-bd" onClose={onClose} closeAria={nm.closeBackdropAria} />
          <motion.div
            key="nm-shell"
            className="pointer-events-none fixed inset-0 z-[100] flex min-h-0 w-full flex-col items-center justify-center pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))] pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(3.25rem,env(safe-area-inset-top))] sm:px-4 sm:pb-[max(1rem,env(safe-area-inset-bottom))] sm:pt-[max(4.25rem,env(safe-area-inset-top))]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <ImmersivePanel>
              <div className="flex shrink-0 items-start justify-between gap-3 border-b border-white/10 bg-[#060d18] px-4 py-4 sm:px-5">
                <div className="min-w-0 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Shield className="h-5 w-5 shrink-0 text-accent-cyan" aria-hidden />
                    <Badge badge={dossier.badge} />
                    <span className="text-[10px] uppercase tracking-[0.28em] text-zinc-500">{nm.summaryBadge}</span>
                  </div>
                  <div>
                    <h2 id="case-file-title" className="text-balance text-xl font-semibold tracking-tight text-white sm:text-2xl">
                      {dossier.title}
                    </h2>
                    {dossier.subtitle ? <p className="mt-1 text-[13px] text-accent-cyan/90">{dossier.subtitle}</p> : null}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="shrink-0 rounded-lg border border-transparent p-2 text-zinc-400 transition hover:border-white/15 hover:bg-white/5 hover:text-white"
                  aria-label={nm.closeAria}
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>

              <motion.div
                className="min-h-0 min-w-0 max-w-full flex-1 touch-pan-y overflow-y-auto overscroll-contain px-4 py-5 sm:px-6 sm:pb-8"
                variants={section}
                initial="hidden"
                animate="visible"
              >
                {anchorId ? <div id={`anchor-${anchorId}`} className="h-0 w-full scroll-mt-28" aria-hidden /> : null}

                {dossier.summary.trim().length > 0 ? (
                  <motion.p variants={fadeUp} className="leading-relaxed text-[14px] text-zinc-300">
                    {dossier.summary}
                  </motion.p>
                ) : null}

                {slideMode && detailSlides ? (
                  <DetailSlidesCarousel slides={detailSlides} nodeId={nodeId} />
                ) : null}

                {!slideMode ? (
                  <motion.div variants={fadeUp} className={dossier.summary.trim().length > 0 ? "mt-6" : undefined}>
                    <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                      <LayoutGrid className="h-3.5 w-3.5" aria-hidden /> {nm.highlightsHeading}
                    </h3>
                    {(dossier.certificationCards?.length ?? 0) > 0 ? (
                      <ul className="mt-3 space-y-2.5 sm:space-y-3" role="list">
                        {(dossier.certificationCards ?? []).map((c, i) => (
                          <li
                            key={`${i}-${c.title.slice(0, 64)}`}
                            className="flex gap-3 rounded-xl border border-white/10 bg-black/28 px-3 py-2.5 sm:gap-3.5 sm:px-4 sm:py-3"
                          >
                            <Image
                              src={c.logoSrc}
                              alt={c.logoAlt}
                              width={44}
                              height={44}
                              unoptimized
                              className="h-11 w-11 shrink-0 rounded-lg bg-white/[0.96] object-contain p-1.5 ring-1 ring-black/25"
                            />
                            <div className="min-w-0 flex-1">
                              <p className="text-[13px] font-semibold leading-snug text-zinc-100">{c.title}</p>
                              <p className="mt-0.5 text-[11.5px] leading-relaxed text-zinc-500 sm:text-[12px]">{c.caption}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : dossier.features.length > 0 ? (
                      <ul className="mt-3 list-inside list-disc space-y-1.5 text-[13px] text-zinc-300">
                        {dossier.features.slice(0, 12).map((f, i) => (
                          <li key={`${i}-${f.slice(0, 96)}`}>{f}</li>
                        ))}
                      </ul>
                    ) : null}
                  </motion.div>
                ) : null}

                {!slideMode && stackTokens.length > 0 ? (
                  <motion.div variants={fadeUp} className="mt-6">
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">{nm.stackHeading}</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {stackTokens.map((t) => (
                        <StackTechBadge key={t} rawToken={t} />
                      ))}
                    </div>
                  </motion.div>
                ) : null}

                {!slideMode && dossier.securityConsiderations.length > 0 ? (
                  <motion.div variants={fadeUp} className="mt-6">
                    <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                      <Sparkles className="h-3.5 w-3.5" aria-hidden /> {dossier.insightsHeading ?? nm.securityHeading}
                    </h3>
                    <ul className="mt-2 space-y-2 text-[13px] leading-relaxed text-zinc-400">
                      {dossier.securityConsiderations.map((line, i) => (
                        <li key={`${i}-${line.slice(0, 64)}`} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-green/80" aria-hidden />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ) : null}

                {!slideMode && dossier.evidence.length > 0 ? (
                  <motion.div variants={fadeUp} className="mt-7">
                    <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">{nm.evidenceHeading}</h3>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {dossier.evidence.map((slot, i) => (
                        <motion.div key={`${i}-${slot.src}`} variants={fadeUp}>
                          {slot.src.endsWith(".svg") ? <EvSvg src={slot.src} alt={slot.alt} /> : <EvRaster src={slot.src} alt={slot.alt} />}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ) : null}

                <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-2">
                  <CaseActionButtons actions={dossier.actions} nm={nm} />
                </motion.div>

                {!slideMode && dossier.learned ? (
                  <motion.div variants={fadeUp} className="mt-8 rounded-xl border border-accent-cyan/15 bg-accent-cyan/5 px-4 py-4">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent-cyan/90">{nm.learnHeading}</span>
                    <p className="mt-2 text-[13px] leading-relaxed text-zinc-300">{dossier.learned[0]}</p>
                    <p className="mt-2 border-t border-white/10 pt-3 text-[13px] leading-relaxed text-zinc-400">{dossier.learned[1]}</p>
                  </motion.div>
                ) : null}
              </motion.div>
            </ImmersivePanel>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
