"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

import { usePortfolio } from "@/components/portfolio-locale-provider";

type TerminalIntroProps = {
  onEnterMain: () => void;
};

function posixDoubleQuoted(value: string) {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\$/g, "\\$").replace(/`/g, "\\`")}"`;
}

function lineToneClasses(line: string) {
  if (line.startsWith("root@cli")) return "text-emerald-300/95";
  if (line.startsWith("#")) return "text-zinc-500";
  if (line.startsWith("[")) return "text-accent-cyan/85";
  if (/^PROFILE_[A-Z_]+=/.test(line)) return "text-zinc-200";
  return "text-zinc-300";
}

export function TerminalIntro({ onEnterMain }: TerminalIntroProps) {
  const { profile, copy } = usePortfolio();
  const ti = copy.terminalIntro;
  const [command, setCommand] = useState("");
  const [started, setStarted] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const [surfaceVisible, setSurfaceVisible] = useState(true);
  const [paused, setPaused] = useState(false);

  const pausedRef = useRef(false);
  const abortedRef = useRef(false);

  useEffect(() => {
    abortedRef.current = false;
    return () => {
      abortedRef.current = true;
    };
  }, []);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const togglePause = useCallback(() => {
    setPaused((p) => {
      const n = !p;
      pausedRef.current = n;
      return n;
    });
  }, []);

  const pushLine = useCallback((line: string) => {
    setLines((prev) => [...prev, line]);
  }, []);

  const delay = useCallback((ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms)), []);

  const delayRespectingPause = useCallback(
    async (totalMs: number) => {
      let elapsed = 0;
      while (elapsed < totalMs) {
        if (abortedRef.current) return;
        while (pausedRef.current && !abortedRef.current) {
          await delay(100);
        }
        const step = Math.min(100, totalMs - elapsed);
        await delay(step);
        elapsed += step;
      }
    },
    [delay],
  );

  const beat = () => 360 + Math.random() * 260;
  const lineGap = () => 300 + Math.random() * 220;

  const runBootSequence = useCallback(async () => {
    if (started) return;
    setPaused(false);
    pausedRef.current = false;
    setStarted(true);
    setLines([]);

    const wait = (ms: number) => delayRespectingPause(ms);

    for (const line of ti.shellTourScript) {
      pushLine(line);
      await wait(beat());
    }

    await wait(lineGap());
    pushLine(ti.profileCatCommand);
    await wait(beat());
    pushLine(`PROFILE_NAME=${posixDoubleQuoted(profile.name)}`);
    await wait(lineGap());
    pushLine(`PROFILE_ROLE=${posixDoubleQuoted(profile.role)}`);
    await wait(lineGap());
    pushLine(`PROFILE_LOCATION=${posixDoubleQuoted(profile.location)}`);
    await wait(lineGap());
    pushLine(`PROFILE_AVAIL=${posixDoubleQuoted(profile.status)}`);
    await wait(lineGap());
    pushLine(`PROFILE_FOCUS=${posixDoubleQuoted(profile.focus)}`);
    await wait(beat());

    pushLine(ti.mapOpenCommand);
    await wait(lineGap());
    pushLine(ti.mapOpenOutput);

    await wait(950 + Math.random() * 280);

    if (!abortedRef.current) setSurfaceVisible(false);
  }, [
    delayRespectingPause,
    profile.focus,
    profile.location,
    profile.name,
    profile.role,
    profile.status,
    pushLine,
    started,
    ti.mapOpenCommand,
    ti.mapOpenOutput,
    ti.profileCatCommand,
    ti.shellTourScript,
  ]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const value = command.trim().toLowerCase();
        setCommand("");
        if (value === "start" || value === "inicio") {
          void runBootSequence();
        }
      }
    },
    [command, runBootSequence],
  );

  useEffect(() => {
    if (!started) return;
    const onSpace = (e: KeyboardEvent) => {
      if (e.code !== "Space" && e.key !== " ") return;
      const el = e.target as HTMLElement | null;
      if (el?.closest?.("button, a, input, textarea, select")) return;
      e.preventDefault();
      togglePause();
    };
    window.addEventListener("keydown", onSpace);
    return () => window.removeEventListener("keydown", onSpace);
  }, [started, togglePause]);

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
                  <Terminal className="h-4 w-4 shrink-0 text-accent-cyan" aria-hidden />
                  <span className="font-[family-name:var(--font-jetbrains-mono)] font-semibold uppercase tracking-[0.18em] text-zinc-200">
                    {ti.windowTitle}
                  </span>
                </div>
                <span className="hidden max-w-none text-right text-[11px] font-[family-name:var(--font-jetbrains-mono)] leading-snug text-zinc-500 sm:inline">
                  {ti.windowSubtitle}
                </span>
              </div>
              <div className="flex flex-col">
                <div className="crt-scan relative max-h-[52vh] space-y-0.5 overflow-y-auto px-4 py-4 text-[13px] leading-snug sm:max-h-none sm:py-5">
                  {!started ? (
                    <pre
                      className={`mb-4 whitespace-pre-wrap font-[family-name:var(--font-jetbrains-mono)] text-[13px] ${lineToneClasses(ti.idleHashComment)}`}
                    >
                      {ti.idleHashComment}
                    </pre>
                  ) : null}
                  {lines.map((line, i) => (
                    <motion.pre
                      key={`${line}-${i}`}
                      initial={{ opacity: 0, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18 }}
                      className={`whitespace-pre-wrap font-[family-name:var(--font-jetbrains-mono)] text-[13px] ${lineToneClasses(line)}`}
                    >
                      {line || "\u00a0"}
                    </motion.pre>
                  ))}
                  {!started ? (
                    <pre className="font-[family-name:var(--font-jetbrains-mono)] text-[13px] text-emerald-300/95">
                      <span>{ti.shellPrompt}</span>
                      <span className="animate-pulse text-accent-cyan/80">▌</span>
                    </pre>
                  ) : null}
                </div>
                <div className="border-t border-surface-border bg-black/40 px-4 py-4">
                  <div className="flex flex-wrap items-center gap-2 font-[family-name:var(--font-jetbrains-mono)]">
                    <span className="max-w-[9.25rem] shrink-0 truncate text-[11px] text-emerald-300/90 sm:max-w-[14rem]" title={ti.shellPrompt}>
                      {ti.shellPrompt}
                    </span>
                    <input
                      aria-label={ti.inputAria}
                      className="min-w-[7rem] flex-1 rounded-md border border-surface-border/80 bg-black/35 px-3 py-2 text-[13px] text-zinc-100 outline-none ring-0 placeholder:text-zinc-600 focus:border-accent-cyan/40 focus:text-white"
                      placeholder={ti.inputPlaceholder}
                      value={command}
                      disabled={started}
                      onChange={(e) => setCommand(e.target.value)}
                      onKeyDown={handleKeyDown}
                      autoCorrect="off"
                      autoCapitalize="none"
                      spellCheck={false}
                    />
                    {!started ? (
                      <button
                        type="button"
                        onClick={() => void runBootSequence()}
                        className="rounded-md border border-accent-cyan/40 bg-accent-cyan/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.28em] text-accent-cyan shadow-glow transition hover:bg-accent-cyan/20"
                      >
                        {ti.startButton}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={togglePause}
                        className={`rounded-md border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.28em] transition sm:text-[12px] sm:tracking-[0.12em] ${
                          paused
                            ? "border-accent-green/40 bg-accent-green/12 text-accent-green hover:bg-accent-green/18"
                            : "border-amber-400/35 bg-amber-500/10 text-amber-100 hover:bg-amber-500/14"
                        }`}
                        aria-label={paused ? ti.resumeAria : ti.pauseAria}
                      >
                        {paused ? ti.resumeButton : ti.pauseButton}
                      </button>
                    )}
                    <span className="w-full text-[11px] font-normal text-zinc-500 sm:w-auto">{ti.hintCommands}</span>
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
