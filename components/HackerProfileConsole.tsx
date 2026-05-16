"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Terminal } from "lucide-react";
import { usePortfolio } from "@/components/portfolio-locale-provider";

export function HackerProfileConsole() {
  const { profile, profileConsole, copy } = usePortfolio();
  const [avatarLoaded, setAvatarLoaded] = useState(true);
  const windowId = useMemo(() => "consola-perfil", []);

  return (
    <motion.section
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-[1] mx-auto w-full max-w-[min(100%,56rem)]"
      aria-labelledby={`${windowId}-heading`}
    >
      <div className="overflow-hidden rounded-xl border border-accent-cyan/30 bg-[#050a0e]/95 shadow-[0_0_42px_-14px_rgba(34,211,238,0.45),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md">
        <div className="flex items-center gap-2 border-b border-surface-border bg-gradient-to-r from-black/70 to-zinc-950/80 px-4 py-2.5">
          <span className="flex gap-2" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/90" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-green/90" />
          </span>
          <Terminal className="h-4 w-4 shrink-0 text-accent-cyan opacity-90" aria-hidden />
          <p id={`${windowId}-heading`} className="truncate text-[11px] tracking-tight text-zinc-500">
            {profileConsole.windowTag}
          </p>
          <span className="ml-auto hidden items-center gap-1 rounded border border-accent-green/25 bg-accent-green/5 px-2 py-0.5 text-[9px] uppercase tracking-widest text-accent-green sm:flex">
            <ShieldCheck className="h-3 w-3" aria-hidden />
            {copy.hackerConsole.integrityBadge}
          </span>
        </div>

        <div className="relative flex flex-col gap-6 p-5 sm:flex-row sm:items-start sm:gap-8 sm:p-7">
          <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.55)_2px,rgba(0,0,0,0.55)_4px)]" />

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.12, duration: 0.35 }}
            className="relative z-[1] mx-auto shrink-0 sm:mx-0"
          >
            <div className="relative h-40 w-40 overflow-hidden rounded-lg border border-accent-cyan/35 bg-black/50 shadow-[0_0_32px_-8px_rgba(34,211,238,0.35)] ring-1 ring-accent-green/15 sm:h-44 sm:w-44">
              {avatarLoaded ? (
                <img
                  src={profileConsole.avatarSrc}
                  alt={`${copy.hackerConsole.portraitAltSuffix}${profile.name}`}
                  width={176}
                  height={176}
                  className="h-full w-full object-cover"
                  decoding="async"
                  onError={() => setAvatarLoaded(false)}
                  style={{
                    filter: "contrast(1.06) saturate(0.92)",
                  }}
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[radial-gradient(ellipse_at_30%_-10%,rgba(34,211,238,0.15),transparent_58%),linear-gradient(to_bottom,#0b1219,#060a0f)] px-4 text-center">
                  <span className="text-3xl font-bold tracking-tighter text-accent-cyan text-glow sm:text-4xl">
                    {profileConsole.initials}
                  </span>
                  <span className="text-[9px] leading-snug uppercase tracking-[0.2em] text-zinc-500">
                    {copy.hackerConsole.avatarFallback}
                  </span>
                </div>
              )}
              <div
                className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-[0.22]"
                style={{
                  background:
                    "repeating-linear-gradient(180deg,rgba(0,0,0,0)_0px,rgba(0,0,0,0)_2px,rgba(0,240,180,0.07)_2px,rgba(0,240,180,0.07)_4px)",
                }}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/55 to-transparent" />
            </div>
            <p className="mt-2 max-w-[11rem] text-center text-[9px] uppercase tracking-[0.28em] text-zinc-500 sm:text-left">
              {copy.hackerConsole.photoCaption}
            </p>
          </motion.div>

          <div className="relative z-[1] min-w-0 flex-1 space-y-2 font-mono text-[12px] leading-relaxed sm:text-[13px]">
            {profileConsole.lines.map((row, idx) => {
              const delay = 0.18 + idx * 0.055;
              if (row.kind === "comment") {
                return (
                  <motion.p
                    key={`c-${idx}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay, duration: 0.25 }}
                    className="text-[11px] text-zinc-600"
                  >
                    {row.text}
                  </motion.p>
                );
              }
              if (row.kind === "cmd") {
                return (
                  <motion.p
                    key={`k-${idx}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay, duration: 0.25 }}
                    className="text-accent-green"
                  >
                    <span className="text-accent-muted">└─$ </span>
                    <span>{row.text}</span>
                  </motion.p>
                );
              }
              return (
                <motion.p
                  key={`o-${idx}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay, duration: 0.25 }}
                  className="border-l-2 border-accent-cyan/35 pl-3 text-zinc-200"
                >
                  {row.text}
                </motion.p>
              );
            })}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.18 + profileConsole.lines.length * 0.055 + 0.1 }}
              className="pt-3 text-accent-cyan/85"
            >
              <span className="text-accent-muted">└─$ </span>
              <span className="animate-pulse">█</span>
            </motion.p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
