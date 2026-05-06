"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

import { PROFILE } from "@/lib/data";

const BOOT_LINES = [
  "Preparando la vista…",
  "Cargando tu perfil profesional…",
  "Aplicando estándares de presentación…",
  "Listo para continuar.",
] as const;

type TerminalIntroProps = {
  onEnterMain: () => void;
};

export function TerminalIntro({ onEnterMain }: TerminalIntroProps) {
  const [command, setCommand] = useState("");
  const [started, setStarted] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const [surfaceVisible, setSurfaceVisible] = useState(true);

  const pushLine = useCallback((line: string) => {
    setLines((prev) => [...prev, line]);
  }, []);

  const delay = useCallback((ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms)), []);

  const runBootSequence = useCallback(async () => {
    if (started) return;
    setStarted(true);
    setLines([]);
    for (const line of BOOT_LINES) {
      pushLine(`> ${line}`);
      await delay(520 + Math.random() * 380);
    }
    await delay(380);
    pushLine("");
    pushLine(`Nombre: ${PROFILE.name}`);
    pushLine(`Rol: ${PROFILE.role}`);
    pushLine(`Ubicación: ${PROFILE.location}`);
    pushLine(`Disponibilidad: ${PROFILE.status}`);
    pushLine(`Enfoque: ${PROFILE.focus}`);
    await delay(600);
    pushLine("");
    pushLine("Sistema en línea. Abriendo el mapa de contenidos…");
    await delay(1100);
    setSurfaceVisible(false);
  }, [delay, pushLine, started]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const value = command.trim().toLowerCase();
        setCommand("");
        if (value === "start" || value === "inicio" || value === "continuar") {
          void runBootSequence();
        }
      }
    },
    [command, runBootSequence],
  );

  return (
    <div className="relative z-20 flex min-h-[100svh] w-full items-center justify-center px-4 py-14">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,211,238,0.06),transparent_55%)]" />
      <AnimatePresence mode="wait" onExitComplete={onEnterMain}>
        {surfaceVisible && (
          <motion.div
            key="terminal-full"
            layout
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -28, filter: "blur(8px)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl"
          >
            <div className="overflow-hidden rounded-xl border border-surface-border bg-surface-raised/95 shadow-[0_40px_120px_-40px_rgba(0,0,0,.85)] backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-surface-border bg-black/35 px-4 py-3">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <Terminal className="h-4 w-4 text-accent-cyan" aria-hidden />
                  <span className="tracking-wide text-zinc-200">Acceso · bienvenida</span>
                </div>
                <span className="text-[11px] text-zinc-500">Vista previa</span>
              </div>
              <div className="flex flex-col">
                <div className="crt-scan relative max-h-[52vh] space-y-1 overflow-y-auto px-4 py-5 sm:max-h-none">
                  <p className="text-sm text-zinc-100 text-glow">Portafolio · JGC</p>
                  <p className="text-[13px] text-zinc-400">
                    Para entrar al portafolio interactivo, escribe <span className="text-zinc-300">continuar</span> o pulsa el botón.
                  </p>
                  <div className="border-t border-surface-border/80 pt-4 text-[13px] leading-relaxed text-zinc-300">
                    {lines.map((line, i) => (
                      <motion.div
                        key={`${line}-${i}`}
                        initial={{ opacity: 0, y: 2 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="whitespace-pre-wrap"
                      >
                        {line || "\u00a0"}
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-surface-border bg-black/40 px-4 py-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-accent-muted">$</span>
                    <input
                      aria-label="Continuar al portafolio"
                      className="min-w-[12rem] flex-1 rounded-md border border-surface-border/80 bg-black/35 px-3 py-2 text-[13px] text-zinc-100 outline-none ring-0 placeholder:text-zinc-600 focus:border-accent-cyan/40 focus:text-white"
                      placeholder="continuar"
                      value={command}
                      disabled={started}
                      onChange={(e) => setCommand(e.target.value)}
                      onKeyDown={handleKeyDown}
                      autoCorrect="off"
                      autoCapitalize="none"
                      spellCheck={false}
                    />
                    <button
                      type="button"
                      disabled={started}
                      onClick={() => void runBootSequence()}
                      className="rounded-md border border-accent-cyan/40 bg-accent-cyan/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan shadow-glow transition hover:bg-accent-cyan/20 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Continuar
                    </button>
                    <span className="w-full text-[11px] text-zinc-500 sm:w-auto">
                      También puedes escribir <span className="text-zinc-400">continuar</span>,{" "}
                      <span className="text-zinc-400">inicio</span> o <span className="text-zinc-400">start</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
