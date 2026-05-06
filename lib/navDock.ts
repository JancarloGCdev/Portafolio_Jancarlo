/** Alineación vertical compartida: HUD centrado + QuickAccess derecha. */
export const TOP_BAR_TOP =
  "top-[max(0.5rem,env(safe-area-inset-top))] sm:top-[max(0.65rem,env(safe-area-inset-top))] md:top-[max(0.875rem,env(safe-area-inset-top))]" as const;

/**
 * Cromo visual unificado entre la píldora de tabs del mapa y el dock CV/redes.
 */
export const TOP_DOCK_SHELL =
  "rounded-full border border-surface-border bg-black/55 shadow-[0_12px_40px_-14px_rgba(0,0,0,.75)] backdrop-blur-xl supports-[backdrop-filter]:bg-black/42" as const;
