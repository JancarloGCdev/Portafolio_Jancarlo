"use client";

import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { QUICK_LINKS } from "@/lib/data";
import { TOP_BAR_TOP, TOP_DOCK_SHELL } from "@/lib/navDock";

const ic = "flex h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4";
const dock =
  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-surface-border bg-surface-raised/95 text-zinc-300 backdrop-blur-md transition hover:border-accent-cyan/40 hover:text-accent-cyan hover:shadow-glow sm:h-9 sm:w-9";

/**
 * Dock fijo SIEMPRE por encima del HUD y del modal (`z-[120]`), accesible y compacto en móvil.
 */
export function QuickAccess() {
  return (
    <motion.nav
      aria-label="Accesos directos: CV y contacto"
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`fixed right-2 z-[120] flex ${TOP_BAR_TOP} ${TOP_DOCK_SHELL} gap-1 p-1 sm:right-4 sm:gap-1.5 sm:p-1.5 md:right-6`}
    >
      <a href={QUICK_LINKS.cvPath} download className={dock} title="Descargar CV (PDF)">
        <Download className={ic} aria-hidden />
      </a>
      <a href={QUICK_LINKS.github} target="_blank" rel="noreferrer" className={dock} title="Proyectos públicos en GitHub">
        <Github className={ic} aria-hidden />
      </a>
      <a href={QUICK_LINKS.linkedin} target="_blank" rel="noreferrer" className={dock} title="Perfil en LinkedIn">
        <Linkedin className={ic} aria-hidden />
      </a>
      <a href={QUICK_LINKS.email} className={dock} title="Enviar correo">
        <Mail className={ic} aria-hidden />
      </a>
      <a href={QUICK_LINKS.whatsapp} target="_blank" rel="noreferrer" className={dock} title="Escribir por WhatsApp">
        <MessageCircle className={ic} aria-hidden />
      </a>
    </motion.nav>
  );
}
