"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Award, Briefcase, Cpu, FolderGit2, Layers, Mail, ShieldAlert } from "lucide-react";
import { usePortfolio, type HudTabEntry } from "@/components/portfolio-locale-provider";
import { TOP_BAR_TOP, TOP_DOCK_SHELL } from "@/lib/navDock";

type HudTabNodeId = HudTabEntry["nodeId"];

const HUD_ICONS: Record<HudTabNodeId, LucideIcon> = {
  core: Cpu,
  projects: FolderGit2,
  "security-labs": ShieldAlert,
  experience: Briefcase,
  certifications: Award,
  skills: Layers,
  contact: Mail,
};

type HUDTabsProps = {
  activeNodeId: string | null;
  onSelect: (nodeId: string) => void;
};

/**
 * Móvil: solo iconos (área táctil fija). `sm+`: etiquetas de texto.
 */
export function HUDTabs({ activeNodeId, onSelect }: HUDTabsProps) {
  const { hudTabOrder, labelForNodeId, copy } = usePortfolio();
  const hudCopy = copy.hud;
  return (
    <motion.nav
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 32 }}
      className={`pointer-events-none fixed inset-x-0 z-[110] flex items-center justify-center ${TOP_BAR_TOP} px-[max(0.35rem,env(safe-area-inset-left))] pr-[max(calc(12.85rem+env(safe-area-inset-right)),0.85rem)] sm:px-3 sm:pr-[calc(14.85rem+env(safe-area-inset-right))] md:pr-[calc(16.25rem+env(safe-area-inset-right))]`}
      aria-label={hudCopy.navAriaLabel}
    >
      <div
        className={`pointer-events-auto mx-auto flex w-full max-w-[min(52rem,calc(100vw-13.85rem-env(safe-area-inset-left)-env(safe-area-inset-right)))] flex-nowrap items-center justify-center gap-1 overflow-x-auto overscroll-x-contain ${TOP_DOCK_SHELL} p-1 [scrollbar-width:none] sm:max-w-[min(52rem,calc(100vw-16.75rem-env(safe-area-inset-left)-env(safe-area-inset-right)))] sm:flex-wrap sm:gap-x-1.5 sm:gap-y-1 sm:overflow-visible sm:p-1.5 md:max-w-[min(54rem,calc(100vw-17.85rem-env(safe-area-inset-left)-env(safe-area-inset-right)))] [&::-webkit-scrollbar]:hidden`}
      >
        {hudTabOrder.map(({ tab, nodeId }) => {
          const active = activeNodeId === nodeId;
          const nodeLabel = labelForNodeId(nodeId);
          const Icon = HUD_ICONS[nodeId];
          const label =
            nodeId === "core" ? `${nodeLabel} · ${hudCopy.coreExtraLabelSuffix}` : nodeLabel;
          return (
            <button
              key={nodeId}
              type="button"
              aria-label={label}
              title={label}
              onClick={() => onSelect(nodeId)}
              className={`relative z-0 flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-semibold uppercase transition sm:h-auto sm:w-auto sm:px-3 sm:py-1.5 ${
                active ? "text-cyan-50" : "text-zinc-500 hover:text-zinc-100"
              } sm:text-[11px] sm:tracking-[0.12em]`}
            >
              {active && (
                <motion.span
                  layoutId="hud-tab-pill"
                  className="absolute inset-0 -z-[1] rounded-full bg-gradient-to-r from-accent-cyan/28 via-accent-cyan/14 to-accent-green/22 shadow-[0_0_24px_-4px_rgba(34,211,238,0.48)]"
                  transition={{ type: "spring", stiffness: 400, damping: 34 }}
                />
              )}
              <Icon
                className={`relative z-[1] h-3.5 w-3.5 shrink-0 sm:hidden ${active ? "text-cyan-100" : ""}`}
                strokeWidth={active ? 2.15 : 1.85}
                aria-hidden
              />
              <span className="relative z-[1] hidden max-w-[7.5rem] truncate sm:inline md:max-w-none">{tab}</span>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}
