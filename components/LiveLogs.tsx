"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, ChevronDown } from "lucide-react";
import { usePortfolio } from "@/components/portfolio-locale-provider";

const STORAGE_KEY = "portfolio-live-logs-collapsed";

type LiveLogsProps = {
  logs: string[];
};

export function LiveLogs({ logs }: LiveLogsProps) {
  const { copy } = usePortfolio();
  const ll = copy.liveLogs;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    try {
      const v = sessionStorage.getItem(STORAGE_KEY);
      if (v === "0" || v === "1") setCollapsed(v === "1");
      else if (typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches) {
        setCollapsed(false);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, collapsed ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [collapsed]);

  useEffect(() => {
    if (!collapsed) {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [logs, collapsed]);

  const toggle = useCallback(() => setCollapsed((c) => !c), []);

  const lastLogLine = useMemo(() => {
    if (logs.length === 0) return ll.waiting;
    const raw = logs[logs.length - 1] ?? "";
    const oneLine = raw.replace(/\s+/g, " ").trim();
    return oneLine || "—";
  }, [logs, ll.waiting]);

  /**
   * Espejo exacto de `GuidedTour`: mismo `bottom` / `sm` / `md`, solo `left` en lugar de `right`.
   * Tour: `bottom-[max(2rem,...)]` · `right-[max(0.75rem,...)]` · `sm:bottom-4 sm:right-6` · `md:bottom-5 md:right-8`
   */
  const dockAlign =
    "bottom-[max(2rem,env(safe-area-inset-bottom))] left-[max(0.75rem,env(safe-area-inset-left))] sm:bottom-4 sm:left-6 md:bottom-5 md:left-8";

  return (
    <motion.aside
      layout
      initial={{ opacity: 0, x: -12, scale: 0.98 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`pointer-events-none fixed z-[44] w-[min(calc(100vw-5.5rem),22rem)] max-md:w-[min(calc(100vw-4.25rem),20rem)] md:w-[min(calc(100vw-1.5rem),22rem)] ${dockAlign}`}
      aria-live="polite"
    >
      <AnimatePresence mode="popLayout">
        {collapsed ? (
          <motion.button
            key="fab"
            type="button"
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={toggle}
            className="pointer-events-auto flex h-9 min-h-9 w-full max-w-[min(calc(100vw-11rem),18rem)] items-center gap-2 rounded-full border border-surface-border bg-surface-raised/95 px-3 py-0 text-left shadow-xl backdrop-blur-md transition hover:border-accent-cyan/35 hover:text-accent-cyan sm:max-w-[min(calc(100vw-15rem),20rem)]"
            aria-expanded={false}
            aria-controls="live-logs-panel"
            title={`${ll.fabTitleTemplate} ${lastLogLine}`}
          >
            <Activity className="h-4 w-4 shrink-0 text-accent-green" aria-hidden />
            <span className="min-w-0 flex-1 select-none truncate font-mono text-[10px] leading-tight text-zinc-300 sm:text-[11px]">
              {lastLogLine}
            </span>
          </motion.button>
        ) : (
          <motion.div
            key="panel"
            id="live-logs-panel"
            layout
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto overflow-hidden rounded-lg border border-surface-border bg-surface-raised/92 shadow-xl backdrop-blur-md"
          >
            <div className="flex items-center justify-between border-b border-surface-border/80 px-2 py-1.5 sm:px-3 sm:py-2">
              <div className="flex min-w-0 items-center gap-2 text-[10px] text-zinc-400 sm:text-[11px]">
                <Activity className="h-3.5 w-3.5 shrink-0 text-accent-green" aria-hidden />
                <span className="truncate uppercase tracking-widest">{ll.panelTitle}</span>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <span className="hidden text-[10px] text-zinc-500 sm:inline">{ll.subtitle}</span>
                <button
                  type="button"
                  onClick={toggle}
                  className="rounded-md border border-transparent p-1.5 text-zinc-400 transition hover:border-surface-border hover:bg-black/30 hover:text-zinc-100"
                  aria-expanded
                  aria-controls="live-logs-panel"
                  title={ll.minimizeTitle}
                >
                  <ChevronDown className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </div>
            <div
              ref={scrollRef}
              className="max-h-[min(28vh,10.5rem)] space-y-1 overflow-y-auto px-2 py-2 text-[10px] leading-relaxed text-zinc-300 [-ms-overflow-style:none] [scrollbar-width:thin] sm:max-h-[10.5rem] sm:px-3 sm:text-[11px]"
            >
              {logs.slice(-42).map((line, idx) => (
                <motion.p
                  key={`${idx}-${line}`}
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="whitespace-pre-wrap font-mono"
                >
                  {line}
                </motion.p>
              ))}
              {logs.length === 0 && <span className="text-zinc-500">{ll.waiting}</span>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}
