"use client";

import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

import { usePortfolio } from "@/components/portfolio-locale-provider";
import { QUICK_LINKS } from "@/lib/data";
import {
  TOP_BAR_TOP,
  TOP_DOCK_ICON_BTN,
  TOP_DOCK_ICON_GLYPH,
  TOP_DOCK_INSET,
  TOP_DOCK_SHELL,
} from "@/lib/navDock";

/**
 * Dock fijo SIEMPRE por encima del HUD y del modal (`z-[120]`), accesible y compacto en móvil.
 */
export function QuickAccess() {
  const { copy } = usePortfolio();
  const qa = copy.quickAccess;
  return (
    <motion.nav
      aria-label={qa.navAria}
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`fixed right-2 z-[120] flex items-center ${TOP_BAR_TOP} ${TOP_DOCK_SHELL} ${TOP_DOCK_INSET} sm:right-4 md:right-6`}
    >
      <a href={QUICK_LINKS.github} target="_blank" rel="noreferrer" className={TOP_DOCK_ICON_BTN} title={qa.githubTitle}>
        <Github className={TOP_DOCK_ICON_GLYPH} aria-hidden />
      </a>
      <a href={QUICK_LINKS.linkedin} target="_blank" rel="noreferrer" className={TOP_DOCK_ICON_BTN} title={qa.linkedinTitle}>
        <Linkedin className={TOP_DOCK_ICON_GLYPH} aria-hidden />
      </a>
    </motion.nav>
  );
}
