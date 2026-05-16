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
/** Chips en panel: tamaño muy compacto hasta que entren todos sin scroll. */
const LABEL_FLUID_CHIP =
  "text-[clamp(0.5rem,min(2.7vw,0.725rem),0.725rem)] uppercase font-semibold leading-tight tracking-[0.02em] min-[620px]:tracking-[0.055em]";

/** Reparto proporcional dentro del ancho disponible (sin horizontal scroll). */
const CHIP_COL =
  "min-w-0 flex-[1_1_calc(50%-5px)] min-[420px]:flex-[1_1_calc(33.333%-7px)] min-[640px]:flex-[1_1_calc(25%-7px)] min-[900px]:flex-[1_1_calc(20%-7px)] min-[1100px]:flex-[1_1_calc(calc(100%/7)-8px)]";

type HUDTabsProps = {
  activeNodeId: string | null;
  onSelect: (nodeId: string) => void;
};

/**
 * Menú compacto · alineado a la izquierda; flyout a la derecha del botón, **sin scroll** (envuelve filas).
 * El ancho respeta el `padding-right` del HUD (hueco reservado para QuickAccess).
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
      <div ref={rootRef} className="pointer-events-auto w-full min-w-0 max-w-full lg:max-w-[min(54rem,100%)]">
        <div
          className={`flex w-full min-w-0 max-w-full items-start gap-x-2 gap-y-2 sm:gap-x-3 ${open ? "flex-wrap" : "flex-nowrap items-center"}`}
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
                className={`relative z-[112] w-full min-w-0 flex-1 basis-full ${MENU_PANEL_SHELL} min-[440px]:basis-0 min-[440px]:w-auto`}
              >
                <ul className="flex w-full min-w-0 flex-wrap content-start justify-start gap-x-1 gap-y-1 px-2 py-2 sm:gap-x-2 sm:gap-y-1.5 sm:px-2.5 sm:py-2.5 md:gap-x-2.5 md:gap-y-2">
                  {hudTabOrder.map(({ tab, nodeId }) => {
                    const active = activeNodeId === nodeId;
                    const Icon = HUD_ICONS[nodeId];
                    return (
                      <li key={nodeId} className={CHIP_COL}>
                        <button
                          type="button"
                          aria-current={active ? "true" : undefined}
                          onClick={() => handleSelect(nodeId)}
                          className={`relative flex w-full min-w-0 items-center justify-center gap-1 overflow-hidden rounded-full px-1.5 py-1 text-center transition min-[460px]:gap-2 min-[460px]:px-2.5 min-[460px]:py-1.5 sm:justify-start sm:text-left md:gap-2.5 md:px-3 md:py-2 ${
                            active ? "text-cyan-50" : "text-zinc-500 hover:bg-white/[0.06] hover:text-zinc-100"
                          }`}
                        >
                          {active ? (
                            <motion.span
                              layoutId="hud-menu-active-chip"
                              className="pointer-events-none absolute inset-0 -z-[1] rounded-full bg-gradient-to-r from-accent-cyan/26 via-accent-cyan/14 to-accent-green/20 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.12),0_0_16px_-4px_rgba(34,211,238,0.35)]"
                              transition={{ type: "spring", stiffness: 400, damping: 34 }}
                            />
                          ) : null}
                          <Icon
                            className={`relative z-[1] size-3 shrink-0 text-zinc-300 min-[460px]:h-[15px] min-[460px]:w-[15px] sm:h-4 sm:w-4 ${active ? "!text-cyan-100" : ""}`}
                            strokeWidth={active ? 2.15 : 1.85}
                            aria-hidden
                          />
                          <span className={`relative z-[1] min-w-0 flex-1 whitespace-normal break-words text-pretty hyphens-none ${LABEL_FLUID_CHIP}`}>
                            {tab}
                          </span>
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
