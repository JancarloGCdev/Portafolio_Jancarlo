/** Alineación vertical compartida: HUD centrado + QuickAccess derecha. */
export const TOP_BAR_TOP =
  "top-[max(0.5rem,env(safe-area-inset-top))] sm:top-[max(0.65rem,env(safe-area-inset-top))] md:top-[max(0.875rem,env(safe-area-inset-top))]" as const;

/**
 * Cromo visual unificado entre la píldora de tabs del mapa y el dock CV/redes.
 */
export const TOP_DOCK_SHELL =
  "rounded-full border border-surface-border bg-black/55 shadow-[0_12px_40px_-14px_rgba(0,0,0,.75)] backdrop-blur-xl supports-[backdrop-filter]:bg-black/42" as const;

/** Hueco interior compartido: misma altura externa HUD (icono solo) ⇄ QuickAccess. */
export const TOP_DOCK_INSET = "gap-1 p-1 sm:gap-1.5 sm:p-1.5" as const;

/** Botón táctil 32→36 px (altura que mide QuickAccess como pastilla derecha). */
export const TOP_DOCK_ICON_BTN =
  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-surface-border bg-surface-raised/95 text-zinc-300 backdrop-blur-md transition hover:border-accent-cyan/40 hover:text-accent-cyan hover:shadow-glow sm:h-9 sm:w-9" as const;

/** Tamaño de iconos Lucide dentro del botón del dock (~14→16 px). */
export const TOP_DOCK_ICON_GLYPH = "h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" as const;
