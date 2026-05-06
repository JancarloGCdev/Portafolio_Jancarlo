"use client";

import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useIsPresent, useReducedMotion } from "framer-motion";
import { ExternalLink, FileText, Github, LayoutGrid, Sparkles, Shield, X } from "lucide-react";
import Image from "next/image";
import type { CaseBadge, TopologyNodeId } from "@/lib/mapData";
import { CASE_FILES } from "@/lib/mapData";

type NodeModalProps = {
  nodeId: TopologyNodeId | null;
  anchorId?: string | null;
  onClose: () => void;
};

/** Por debajo del HUD (`z-[110]`) y QuickAccess (`z-[120]`) — el mapa y el ribbon quedan tapados. */
function ModalBackdrop({ onClose }: { onClose: () => void }) {
  const present = useIsPresent();
  const reduceMotion = useReducedMotion();
  return (
    <motion.button
      type="button"
      aria-label="Cerrar"
      className={`fixed inset-0 z-[80] cursor-default bg-[radial-gradient(ellipse_at_50%_0%,rgba(34,211,238,0.14),transparent_52%)] bg-slate-950/30 backdrop-blur-[2px] transition-[opacity] ${present ? "pointer-events-auto" : "pointer-events-none"}`}
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
      className={`pointer-events-auto flex min-h-0 w-full flex-col overflow-hidden rounded-2xl border border-accent-cyan/28 bg-[#050b14]/93 shadow-[0_8px_40px_-16px_rgba(0,0,0,0.85)] backdrop-blur-md will-change-transform max-sm:max-h-[min(calc(100dvh-8rem),88dvh)] max-sm:max-w-[min(34rem,calc(100vw-2rem))] max-sm:flex-none sm:max-h-[min(94dvh,900px,calc(100dvh-5.5rem))] sm:max-w-[min(100vw,56rem)] sm:rounded-[2rem] sm:shadow-[0_32px_100px_-36px_rgba(0,0,0,0.75)] ${present ? "" : "pointer-events-none"}`}
      initial={reduceMotion ? { opacity: 0, y: 10, scale: 1 } : { opacity: 0.92, scale: 0.045 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={reduceMotion ? { opacity: 0, y: 8 } : { opacity: 0.88, scale: 0.06 }}
      transition={
        reduceMotion
          ? { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
          : { duration: 0.58, ease: [0.17, 0.9, 0.18, 1] }
      }
      onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
    >
      {children}
    </motion.div>
  );
}

function Badge({ badge }: { badge: CaseBadge }) {
  const isDone = badge === "completed";
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${
        isDone ? "border border-accent-green/35 bg-accent-green/14 text-accent-green" : "border border-amber-400/35 bg-amber-500/12 text-amber-100"
      }`}
    >
      {isDone ? "Entregado" : "En curso"}
    </span>
  );
}

function EvRaster({ src, alt }: { src: string; alt: string }) {
  const [ok, setOk] = useState(true);
  if (!ok) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-surface-border bg-black/35 text-[11px] text-zinc-500">
        Imagen pendiente · {alt}
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

export function NodeModal({ nodeId, anchorId, onClose }: NodeModalProps) {
  const dossier = nodeId ? CASE_FILES[nodeId] : null;

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
      {dossier && (
        <>
          <ModalBackdrop key="nm-bd" onClose={onClose} />
          <motion.div
            key="nm-shell"
            className="pointer-events-none fixed inset-0 z-[100] flex min-h-0 w-full flex-col items-center justify-center pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))] pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(3.25rem,env(safe-area-inset-top))] sm:px-4 sm:pb-[max(1rem,env(safe-area-inset-bottom))] sm:pt-[max(4.25rem,env(safe-area-inset-top))]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <ImmersivePanel>
              <div className="flex shrink-0 items-start justify-between gap-3 border-b border-white/10 bg-black/55 px-4 py-4 sm:px-5">
                <div className="min-w-0 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Shield className="h-5 w-5 shrink-0 text-accent-cyan" aria-hidden />
                    <Badge badge={dossier.badge} />
                    <span className="text-[10px] uppercase tracking-[0.28em] text-zinc-500">Resumen</span>
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
                  aria-label="Cerrar"
                >
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>

              <motion.div
                className="min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain px-4 py-5 sm:px-6 sm:pb-8"
                variants={section}
                initial="hidden"
                animate="visible"
              >
                {anchorId ? <div id={`anchor-${anchorId}`} className="h-0 w-full scroll-mt-28" aria-hidden /> : null}

                <motion.p variants={fadeUp} className="leading-relaxed text-[14px] text-zinc-300">
                  {dossier.summary}
                </motion.p>

                <motion.div variants={fadeUp} className="mt-6">
                  <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                    <LayoutGrid className="h-3.5 w-3.5" aria-hidden /> Destacados
                  </h3>
                  <ul className="mt-3 list-inside list-disc space-y-1.5 text-[13px] text-zinc-300">
                    {dossier.features.slice(0, 5).map((f) => (
                      <li key={f.slice(0, 48)}>{f}</li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div variants={fadeUp} className="mt-6">
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">Stack y herramientas</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {dossier.stack.slice(0, 12).map((t) => (
                      <span key={t} className="rounded-md border border-cyan-500/20 bg-accent-cyan/10 px-2.5 py-1 text-[11px] text-cyan-100/95">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="mt-6">
                  <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden /> Enfoque de seguridad
                  </h3>
                  <ul className="mt-2 space-y-2 text-[13px] leading-relaxed text-zinc-400">
                    {dossier.securityConsiderations.map((line) => (
                      <li key={line.slice(0, 48)} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-green/80" aria-hidden />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div variants={fadeUp} className="mt-7">
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">Referencias y capturas</h3>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {dossier.evidence.map((slot) => (
                      <motion.div key={slot.src + slot.alt} variants={fadeUp}>
                        {slot.src.endsWith(".svg") ? <EvSvg src={slot.src} alt={slot.alt} /> : <EvRaster src={slot.src} alt={slot.alt} />}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="mt-7 flex flex-wrap gap-2">
                  {dossier.actions.github ? (
                    <a
                      href={dossier.actions.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-zinc-600 bg-zinc-900/85 px-3 py-2 text-[13px] font-medium text-white transition hover:border-accent-cyan/45 hover:text-accent-cyan"
                    >
                      <Github className="h-4 w-4" aria-hidden /> GitHub
                      <ExternalLink className="h-3 w-3 opacity-60" aria-hidden />
                    </a>
                  ) : null}
                  {dossier.actions.githubSecondary ? (
                    <a
                      href={dossier.actions.githubSecondary}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-zinc-600/85 bg-black/55 px-3 py-2 text-[12px] font-medium text-zinc-200 transition hover:border-accent-cyan/45 hover:text-accent-cyan"
                    >
                      <Github className="h-4 w-4" aria-hidden /> Repo 2
                      <ExternalLink className="h-3 w-3 opacity-55" aria-hidden />
                    </a>
                  ) : null}
                  {dossier.actions.demo ? (
                    <a
                      href={dossier.actions.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-accent-cyan/38 bg-accent-cyan/14 px-3 py-2 text-[13px] font-medium text-accent-cyan transition hover:bg-accent-cyan/22"
                    >
                      Sitio en vivo
                      <ExternalLink className="h-3 w-3 opacity-70" aria-hidden />
                    </a>
                  ) : null}
                  {dossier.actions.pdf ? (
                    <a
                      href={dossier.actions.pdf}
                      download
                      className="inline-flex items-center gap-2 rounded-lg border border-accent-green/32 bg-accent-green/14 px-3 py-2 text-[13px] font-medium text-accent-green transition hover:bg-accent-green/22"
                    >
                      <FileText className="h-4 w-4" aria-hidden /> PDF / CV
                    </a>
                  ) : null}
                </motion.div>

                <motion.div variants={fadeUp} className="mt-8 rounded-xl border border-accent-cyan/15 bg-accent-cyan/5 px-4 py-4">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent-cyan/90">Aprendizajes</span>
                  <p className="mt-2 text-[13px] leading-relaxed text-zinc-300">{dossier.learned[0]}</p>
                  <p className="mt-2 border-t border-white/10 pt-3 text-[13px] leading-relaxed text-zinc-400">{dossier.learned[1]}</p>
                </motion.div>
              </motion.div>
            </ImmersivePanel>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
