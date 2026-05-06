"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import type { RefObject } from "react";
import { motion } from "framer-motion";
import { Play, Square } from "lucide-react";
import { GUIDED_TOUR_STEPS } from "@/lib/data";

type GuidedTourProps = {
  disabled?: boolean;
  onStep: (step: { nodeId: string; anchorId?: string; logMessage?: string }, index: number) => void;
  onComplete?: () => void;
  /** Limpia timers/estado en la página (cerrar modal, quitar modo tour). */
  onCancel?: () => void;
  /** Llama desde fuera para abortar la secuencia (p. ej. el usuario cerró el modal durante el tour). */
  abortRef?: RefObject<{ abort: () => void } | null>;
};

const STEP_MS = 10_200;
const TOTAL_MS = 70_000;

export function GuidedTour({ disabled, onStep, onComplete, onCancel, abortRef }: GuidedTourProps) {
  const [running, setRunning] = useState(false);
  const cancelRef = useRef(false);
  const runningRef = useRef(false);
  runningRef.current = running;

  const cancel = useCallback(() => {
    if (!runningRef.current) return;
    cancelRef.current = true;
    setRunning(false);
    onCancel?.();
  }, [onCancel]);

  useEffect(() => {
    if (!abortRef) return;
    abortRef.current = { abort: cancel };
    return () => {
      abortRef.current = null;
    };
  }, [abortRef, cancel]);

  const run = useCallback(async () => {
    if (disabled || running) return;
    cancelRef.current = false;
    setRunning(true);
    const started = performance.now();
    for (let i = 0; i < GUIDED_TOUR_STEPS.length; i++) {
      if (cancelRef.current) {
        setRunning(false);
        return;
      }
      onStep(GUIDED_TOUR_STEPS[i], i);
      const elapsed = performance.now() - started;
      const remaining = TOTAL_MS - elapsed;
      const stepsLeft = GUIDED_TOUR_STEPS.length - i - 1;
      const wait = stepsLeft > 0 ? Math.min(STEP_MS, Math.max(3200, remaining / (stepsLeft + 1))) : 0;
      if (wait > 0) {
        await new Promise<void>((resolve) => {
          window.setTimeout(resolve, wait);
        });
      }
      if (cancelRef.current) {
        setRunning(false);
        return;
      }
    }
    setRunning(false);
    if (!cancelRef.current) {
      onComplete?.();
    }
  }, [disabled, onComplete, onStep, running]);

  return (
    <motion.div
      className="pointer-events-none fixed bottom-[max(2rem,env(safe-area-inset-bottom))] left-auto right-[max(0.75rem,env(safe-area-inset-right))] z-[44] flex justify-end sm:bottom-4 sm:right-6 md:bottom-5 md:right-8"
      aria-hidden={false}
    >
      <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-2">
        {!running ? (
          <motion.button
            layout
            type="button"
            disabled={disabled}
            onClick={() => void run()}
            whileTap={{ scale: 0.985 }}
            className="inline-flex max-w-[calc(100vw-9rem)] items-center gap-3 rounded-full border border-accent-green/36 bg-accent-green/12 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-accent-green shadow-glow backdrop-blur-md transition hover:border-accent-green/50 hover:bg-accent-green/18 disabled:cursor-not-allowed disabled:opacity-40 sm:max-w-none"
            title="Recorrido guiado del portafolio (aprox. 1 min)"
          >
            <Play className="h-4 w-4 shrink-0 fill-current text-accent-green" aria-hidden />
            Recorrido guiado (~1 min)
          </motion.button>
        ) : (
          <motion.div layout className="flex items-center gap-2 rounded-full border border-amber-500/35 bg-amber-500/12 px-1 py-1 pl-3 shadow-lg backdrop-blur-md">
            <span className="hidden text-[10px] uppercase tracking-[0.2em] text-amber-200/90 sm:inline">Recorrido ·</span>
            <span className="max-w-[9rem] truncate text-[11px] leading-tight text-zinc-300 sm:max-w-none">en curso…</span>
            <motion.button
              layout
              type="button"
              onClick={cancel}
              whileTap={{ scale: 0.97 }}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-amber-500/40 bg-black/55 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-100 transition hover:border-amber-400/60 hover:bg-black/65"
              title="Salir del recorrido y volver al mapa"
            >
              <Square className="h-3.5 w-3.5 fill-current" aria-hidden />
              Salir
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
