"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Award, Briefcase, Cpu, FolderGit2, Layers, Linkedin, Menu, ShieldAlert, X } from "lucide-react";

import { usePortfolio, type HudTabEntry } from "@/components/portfolio-locale-provider";
import {
  TOP_BAR_TOP,
  TOP_DOCK_ICON_BTN,
  TOP_DOCK_ICON_GLYPH,
  TOP_DOCK_INSET,
  TOP_DOCK_SHELL,
} from "@/lib/navDock";

type HudTabNodeId = HudTabEntry["nodeId"];

const HUD_ICONS: Record<HudTabNodeId, LucideIcon> = {
  core: Cpu,
  projects: FolderGit2,
  "security-labs": ShieldAlert,
  experience: Briefcase,
  certifications: Award,
  skills: Layers,
  contact: Linkedin,
};

const MENU_PANEL_SHELL =
  "rounded-2xl border border-surface-border bg-black/55 shadow-[0_12px_40px_-14px_rgba(0,0,0,.75)] backdrop-blur-xl supports-[backdrop-filter]:bg-black/42";

/** Texto junto al botón (sección seleccionada). */
const LABEL_FLUID_ROW =
  "text-[clamp(0.575rem,min(4.05vw,0.6875rem),0.6875rem)] uppercase font-semibold leading-none tracking-[0.04em] min-[460px]:tracking-[0.08em]";
/** Chips del panel abierto · tipografía uniforme para banda horizontal. */
const LABEL_MENU_CHIP =
  "inline-block max-w-full truncate whitespace-nowrap text-[10px] font-semibold uppercase leading-none tracking-[0.05em] sm:text-[11px] sm:tracking-[0.07em]";

/** Una sola franja tipo barra · reparto en columnas proporcionadas (7 ítems = 7 columnas donde cabe el ancho). */
const MENU_GRID =
  "grid w-full min-w-0 grid-cols-2 gap-1.5 p-2 min-[400px]:grid-cols-3 min-[560px]:grid-cols-4 min-[740px]:grid-cols-7 min-[740px]:gap-2 sm:p-2.5";

type HUDTabsProps = {
  activeNodeId: string | null;
  onSelect: (nodeId: string) => void;
};

/**
 * Menú compacto · flyout **a la derecha del botón**; cuando hay hueco usa todo el ancho disponible hasta el hueco de QuickAccess (sin scrollbar horizontal).
 */
export function HUDTabs({ activeNodeId, onSelect }: HUDTabsProps) {
  const reduceMotion = useReducedMotion();
  const { hudTabOrder, copy } = usePortfolio();
  const hudCopy = copy.hud;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuPanelId = useId();

  const activeEntry = useMemo(
    () => (activeNodeId ? hudTabOrder.find((e) => e.nodeId === activeNodeId) : undefined),
    [activeNodeId, hudTabOrder],
  );

  const toggleAriaLabel = useMemo(() => {
    if (open) return hudCopy.menuCollapseAria;
    if (activeEntry) return `${hudCopy.menuExpandAria} · ${activeEntry.tab}`;
    return hudCopy.menuExpandAria;
  }, [activeEntry, hudCopy.menuCollapseAria, hudCopy.menuExpandAria, open]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleSelect = (nodeId: string) => {
    onSelect(nodeId);
    setOpen(false);
  };

  return (
    <motion.nav
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 32 }}
      className={`pointer-events-none fixed inset-x-0 z-[110] flex w-full min-w-0 items-center justify-start ${TOP_BAR_TOP} box-border px-[max(0.35rem,env(safe-area-inset-left))] pr-[max(calc(12.25rem+env(safe-area-inset-right)),0.85rem)] sm:px-3 sm:pr-[calc(14.25rem+env(safe-area-inset-right))] md:pr-[calc(15.5rem+env(safe-area-inset-right))] lg:pr-[calc(16.25rem+env(safe-area-inset-right))]`}
      aria-label={hudCopy.navAriaLabel}
    >
      <div ref={rootRef} className="pointer-events-auto w-full min-w-0 max-w-full">
        <div
          className={`flex w-full min-w-0 max-w-full items-start gap-x-2 gap-y-2 sm:gap-x-3 ${
            open ? "flex-wrap sm:flex-nowrap sm:items-stretch" : "flex-nowrap items-center"
          }`}
        >
          <div className={`inline-flex shrink-0 items-center justify-center ${TOP_DOCK_SHELL} ${TOP_DOCK_INSET}`}>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={menuPanelId}
              aria-label={toggleAriaLabel}
              onClick={() => setOpen((v) => !v)}
              className={`${TOP_DOCK_ICON_BTN} outline-none ring-accent-cyan/40 focus-visible:ring-2`}
            >
              {open ? (
                <X className={TOP_DOCK_ICON_GLYPH} strokeWidth={2.25} aria-hidden />
              ) : (
                <Menu className={TOP_DOCK_ICON_GLYPH} strokeWidth={2.25} aria-hidden />
              )}
            </button>
          </div>

          {!open && activeEntry ? (
            <p
              className={`min-w-0 flex-1 self-center truncate text-zinc-200/98 sm:max-w-[min(22rem,calc(100%-4rem))] ${LABEL_FLUID_ROW}`}
            >
              {activeEntry.tab}
            </p>
          ) : null}

          <AnimatePresence initial={false}>
            {open ? (
              <motion.div
                id={menuPanelId}
                role="region"
                aria-label={hudCopy.menuListLabel}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -10 }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -10 }}
                transition={{ duration: reduceMotion ? 0.12 : 0.2, ease: [0.22, 1, 0.36, 1] }}
                className={`relative z-[112] flex min-h-0 min-w-0 flex-1 flex-col ${MENU_PANEL_SHELL} w-full basis-full sm:basis-0`}
              >
                <ul role="list" className={MENU_GRID}>
                  {hudTabOrder.map(({ tab, nodeId }) => {
                    const active = activeNodeId === nodeId;
                    const Icon = HUD_ICONS[nodeId];
                    return (
                      <li key={nodeId} className="min-w-0">
                        <button
                          type="button"
                          aria-current={active ? "true" : undefined}
                          title={tab}
                          onClick={() => handleSelect(nodeId)}
                          className={`relative flex min-h-[2.85rem] w-full flex-col items-center justify-center gap-1 overflow-hidden rounded-xl px-1.5 py-1.5 text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/50 min-[740px]:min-h-[2.625rem] min-[740px]:flex-row min-[740px]:gap-1.5 min-[740px]:rounded-full min-[740px]:px-2 min-[740px]:py-1.5 md:gap-2 md:px-2.5 md:py-2 ${
                            active ? "text-cyan-50" : "text-zinc-500 hover:bg-white/[0.06] hover:text-zinc-100"
                          }`}
                        >
                          {active ? (
                            <motion.span
                              layoutId="hud-menu-active-chip"
                              className="pointer-events-none absolute inset-0 -z-[1] rounded-[inherit] bg-gradient-to-r from-accent-cyan/26 via-accent-cyan/14 to-accent-green/20 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.12),0_0_16px_-4px_rgba(34,211,238,0.35)]"
                              transition={{ type: "spring", stiffness: 400, damping: 34 }}
                            />
                          ) : null}
                          <Icon
                            className={`relative z-[1] size-[15px] shrink-0 text-zinc-300 min-[740px]:size-4 ${active ? "!text-cyan-100" : ""}`}
                            strokeWidth={active ? 2.15 : 1.85}
                            aria-hidden
                          />
                          <span className={`relative z-[1] ${LABEL_MENU_CHIP}`}>{tab}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}
