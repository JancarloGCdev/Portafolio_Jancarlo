"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, animate, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  AppWindow,
  Award,
  Briefcase,
  Cpu,
  FolderGit2,
  Layers,
  Mail,
  ShieldAlert,
} from "lucide-react";

import { HackerProfileConsole } from "@/components/HackerProfileConsole";
import { usePortfolio } from "@/components/portfolio-locale-provider";
import { MapNode } from "@/components/MapNode";
import {
  SATELLITE_IDS,
  type SatelliteId,
  type TopologyNodeId,
  TOPOLOGY_EDGES,
  edgesIncidentTo,
} from "@/lib/mapData";

type ThreatMapProps = {
  onSelectNode: (id: string) => void;
  highlightNodeId?: string | null;
  tourActive?: boolean;
};

type DensityTier = "wide" | "mid" | "tight";

const VIEWBOX = { w: 1000, h: 560 };

const DEFAULT_VB = { x: 0, y: 0, w: VIEWBOX.w, h: VIEWBOX.h };

function targetViewBoxForNode(
  id: TopologyNodeId,
  positions: Record<TopologyNodeId, { x: number; y: number }>,
): { x: number; y: number; w: number; h: number } {
  const p = positions[id];
  const factor = id === "core" ? 2.35 : 2.85;
  const w = VIEWBOX.w / factor;
  const h = VIEWBOX.h / factor;
  let x = p.x - w / 2;
  let y = p.y - h / 2;
  x = Math.max(0, Math.min(VIEWBOX.w - w, x));
  y = Math.max(0, Math.min(VIEWBOX.h - h, y));
  return { x, y, w, h };
}

function formatViewBox(r: { x: number; y: number; w: number; h: number }) {
  return `${r.x} ${r.y} ${r.w} ${r.h}`;
}

const ICON_MAP: Record<TopologyNodeId, LucideIcon> = {
  core: Cpu,
  projects: FolderGit2,
  "security-labs": ShieldAlert,
  "development-apps": AppWindow,
  experience: Briefcase,
  certifications: Award,
  skills: Layers,
  contact: Mail,
};

function hexAlpha(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const r = Number.parseInt(h.slice(0, 2), 16);
  const g = Number.parseInt(h.slice(2, 4), 16);
  const b = Number.parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function resolveDensityTier(widthPx: number): DensityTier {
  if (widthPx >= 840) return "wide";
  if (widthPx >= 560) return "mid";
  return "tight";
}

type NodeCoordsSource = Record<TopologyNodeId, { x: number; y: number }>;

function buildPositions(tier: DensityTier, topologyNodes: NodeCoordsSource): Record<TopologyNodeId, { x: number; y: number }> {
  const cx = topologyNodes.core.x;
  const cy = topologyNodes.core.y;
  const out = {} as Record<TopologyNodeId, { x: number; y: number }>;
  (Object.keys(topologyNodes) as TopologyNodeId[]).forEach((id) => {
    const base = topologyNodes[id];
    let { x, y } = base;
    /** Mismo factor en X e Y para conservar simetría radial. */
    const scale = tier === "tight" ? 0.88 : tier === "mid" ? 0.93 : 1;
    if (scale !== 1) {
      x = (x - cx) * scale + cx;
      y = (y - cy) * scale + cy;
    }
    out[id] = { x, y };
  });
  return out;
}

export function ThreatMap({ onSelectNode, highlightNodeId, tourActive }: ThreatMapProps) {
  const { topologyNodes, copy } = usePortfolio();
  const tm = copy.threatMap;
  const gid = useId().replace(/:/g, "");
  const shellRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const vbRaf = useRef<number | null>(null);
  const vbRef = useRef(DEFAULT_VB);
  const immersionCtl = useRef<ReturnType<typeof animate> | null>(null);
  const [containerWidth, setContainerWidth] = useState(960);
  const [hoverId, setHoverId] = useState<TopologyNodeId | null>(null);
  const [viewBoxStr, setViewBoxStr] = useState(formatViewBox(DEFAULT_VB));
  const [immersing, setImmersing] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useLayoutEffect(() => {
    try {
      setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    } catch {
      setReduceMotion(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (vbRaf.current != null) cancelAnimationFrame(vbRaf.current);
    };
  }, []);

  useLayoutEffect(() => {
    const el = shellRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w && Number.isFinite(w)) setContainerWidth(Math.max(260, Math.round(w)));
    });
    ro.observe(el);
    setContainerWidth(Math.max(260, Math.round(el.getBoundingClientRect().width)));
    return () => ro.disconnect();
  }, []);

  const tier = useMemo(() => resolveDensityTier(containerWidth), [containerWidth]);
  const positions = useMemo(() => buildPositions(tier, topologyNodes), [tier, topologyNodes]);

  const selected = useMemo(() => {
    if (!highlightNodeId) return null as TopologyNodeId | null;
    const id = highlightNodeId as TopologyNodeId;
    return id in topologyNodes ? id : null;
  }, [highlightNodeId, topologyNodes]);

  const litEdges = useMemo(() => {
    if (!selected) return new Set<string>();
    return edgesIncidentTo(selected);
  }, [selected]);

  const tierGeom = useMemo(() => {
    switch (tier) {
      case "wide":
        return { coreGlow: 48, glow: 36, stroke: 1.65, iconCore: 28, icon: 21, foCore: 58, fo: 46, lbl: 12, sub: 9, pad: 58 };
      case "mid":
        return { coreGlow: 44, glow: 32, stroke: 1.48, iconCore: 26, icon: 19.5, foCore: 54, fo: 42, lbl: 11.25, sub: 8.5, pad: 54 };
      default:
        return { coreGlow: 38, glow: 26, stroke: 1.25, iconCore: 22, icon: 17.5, foCore: 48, fo: 38, lbl: 9.85, sub: 7.85, pad: 50 };
    }
  }, [tier]);

  const dimOthers = Boolean(selected) || Boolean(tourActive);

  const nodeByTopology = topologyNodes;

  const handleSelect = useCallback(
    (id: TopologyNodeId) => {
      onSelectNode(id);
    },
    [onSelectNode],
  );

  const animateViewBox = useCallback(
    (to: { x: number; y: number; w: number; h: number }, duration: number) => {
      const from = vbRef.current;
      if (reduceMotion) {
        vbRef.current = to;
        const str = formatViewBox(to);
        svgRef.current?.setAttribute("viewBox", str);
        setViewBoxStr(str);
        return Promise.resolve();
      }
      immersionCtl.current?.stop();
      if (vbRaf.current != null) {
        cancelAnimationFrame(vbRaf.current);
        vbRaf.current = null;
      }
      const flushVbState = () => {
        vbRaf.current = null;
        setViewBoxStr(formatViewBox(vbRef.current));
      };
      const ctl = animate(0, 1, {
        duration,
        ease: [0.17, 0.92, 0.22, 1],
        onUpdate: (t) => {
          const x = from.x + (to.x - from.x) * t;
          const y = from.y + (to.y - from.y) * t;
          const w = from.w + (to.w - from.w) * t;
          const h = from.h + (to.h - from.h) * t;
          vbRef.current = { x, y, w, h };
          const str = formatViewBox(vbRef.current);
          svgRef.current?.setAttribute("viewBox", str);
          if (vbRaf.current == null) {
            vbRaf.current = requestAnimationFrame(() => {
              flushVbState();
            });
          }
        },
      });
      immersionCtl.current = ctl;
      return ctl.then(() => {
        if (vbRaf.current != null) {
          cancelAnimationFrame(vbRaf.current);
          vbRaf.current = null;
        }
        vbRef.current = to;
        const str = formatViewBox(to);
        svgRef.current?.setAttribute("viewBox", str);
        setViewBoxStr(str);
      });
    },
    [reduceMotion],
  );

  const resetViewBox = useCallback(
    () => animateViewBox(DEFAULT_VB, reduceMotion ? 0 : 0.72),
    [animateViewBox, reduceMotion],
  );

  const immerseAndSelect = useCallback(
    async (id: TopologyNodeId) => {
      if (reduceMotion) {
        handleSelect(id);
        return;
      }
      setImmersing(true);
      try {
        const to = targetViewBoxForNode(id, positions);
        await animateViewBox(to, 0.95);
        handleSelect(id);
      } finally {
        setImmersing(false);
      }
    },
    [animateViewBox, handleSelect, positions, reduceMotion],
  );

  useLayoutEffect(() => {
    if (!highlightNodeId) {
      const { w, h } = vbRef.current;
      const isZoomed = w < VIEWBOX.w - 1 || h < VIEWBOX.h - 1;
      if (isZoomed) void resetViewBox();
      else {
        vbRef.current = DEFAULT_VB;
        const str = formatViewBox(DEFAULT_VB);
        svgRef.current?.setAttribute("viewBox", str);
        setViewBoxStr(str);
      }
    }
  }, [highlightNodeId, resetViewBox]);

  const sortedSatellites = useMemo(() => {
    const list = [...SATELLITE_IDS];
    if (selected && list.includes(selected as SatelliteId)) {
      list.sort((a, b) => {
        if (a === selected) return 1;
        if (b === selected) return -1;
        return 0;
      });
    }
    return list;
  }, [selected]);

  const mapCard = (
    <div
      ref={shellRef}
      className="relative z-[1] mx-auto box-border w-full max-w-[min(100%,58rem)] rounded-2xl border border-cyan-500/14 bg-[#050913]/55 shadow-[0_30px_120px_-50px_rgba(0,0,0,.95),inset_0_1px_0_rgba(34,211,238,0.06)] backdrop-blur-md"
    >
      <div className="box-border flex w-full justify-center px-4 py-5 sm:px-6 md:px-7 md:py-7 lg:p-9">
        <div className="relative mx-auto w-full max-w-[min(100%,940px)]">
          <svg
            ref={svgRef}
            viewBox={viewBoxStr}
            preserveAspectRatio="xMidYMid meet"
            className={`block aspect-[125/70] h-auto w-full max-h-[min(76vh,540px)] min-h-[208px] touch-manipulation [-webkit-tap-highlight-color:transparent] ${immersing ? "pointer-events-none select-none" : ""}`}
            role="img"
            aria-label={tm.svgAriaLabel}
          >
            <defs>
              <filter id={`${gid}-glow-node`} x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation={tier === "tight" ? 4.8 : 5.6} result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id={`${gid}-flow`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={VIEWBOX.w} y2={VIEWBOX.h}>
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#4ade80" stopOpacity="0.35" />
              </linearGradient>
              {(Object.keys(topologyNodes) as TopologyNodeId[]).map((id) => (
                <radialGradient key={id} id={`${gid}-fill-${id}`} cx="40%" cy="36%" r="62%">
                  <stop offset="0%" stopColor={hexAlpha(topologyNodes[id].accent, 0.55)} />
                  <stop offset="100%" stopColor="rgba(6,13,26,0.35)" />
                </radialGradient>
              ))}
            </defs>

            {/* Subtle SOC grid */}
            <g opacity={0.12} pointerEvents="none">
              {Array.from({ length: Math.floor(VIEWBOX.w / 40) + 1 }).map((_, i) => (
                <line key={`v-${i}`} x1={i * 40} x2={i * 40} y1={0} y2={VIEWBOX.h} stroke="#22d3ee" strokeWidth={0.5} />
              ))}
              {Array.from({ length: Math.floor(VIEWBOX.h / 40) + 1 }).map((_, i) => (
                <line key={`h-${i}`} x1={0} x2={VIEWBOX.w} y1={i * 40} y2={i * 40} stroke="#334155" strokeWidth={0.45} />
              ))}
            </g>

            {/* Edges */}
            <g strokeLinecap="round" pointerEvents="none">
              {TOPOLOGY_EDGES.map(([a, b], idx) => {
                const pa = positions[a];
                const pb = positions[b];
                if (!pa || !pb) return null;
                const k = [a, b].sort().join("--");
                const lit = litEdges.has(k);
                const baseOpacity = lit ? (selected === a || selected === b ? 0.92 : 0.58) : selected ? 0.28 : 0.38;
                return (
                  <motion.line
                    key={`${a}-${b}-${idx}`}
                    x1={pa.x}
                    y1={pa.y}
                    x2={pb.x}
                    y2={pb.y}
                    stroke={lit ? `url(#${gid}-flow)` : "rgba(148,163,184,0.55)"}
                    strokeWidth={lit ? (tier === "tight" ? 2.15 : 2.55) : tier === "tight" ? 1.45 : 1.75}
                    strokeDasharray={lit ? "7 13" : "4 17"}
                    vectorEffect="non-scaling-stroke"
                    opacity={baseOpacity}
                    animate={{ strokeDashoffset: lit ? [0, -38] : [0, -30] }}
                    transition={{ duration: lit ? 2.1 : 2.9, repeat: Infinity, ease: "linear" }}
                  />
                );
              })}
            </g>

            {/* Satellites (selected drawn last inside group) */}
            <g style={{ isolation: "isolate" }}>
              {sortedSatellites.map((id) => {
                const n = nodeByTopology[id];
                const pos = positions[id];
                const isSel = highlightNodeId === id;
                return (
                  <MapNode
                    key={id}
                    nodeId={id}
                    x={pos.x}
                    y={pos.y}
                    label={n.label}
                    subtitle={n.subtitle}
                    accent={n.accent}
                    Icon={ICON_MAP[id]}
                    selected={isSel}
                    dimMap={dimOthers}
                    hovered={hoverId === id}
                    glowR={tierGeom.glow}
                    strokeW={tierGeom.stroke}
                    labelMain={tierGeom.lbl}
                    labelSub={tierGeom.sub}
                    iconPx={tierGeom.icon}
                    fo={tierGeom.fo}
                    gradId={`${gid}-fill-${id}`}
                    glowFilter={hoverId === id || isSel ? `url(#${gid}-glow-node)` : undefined}
                    hitRadius={tierGeom.pad}
                    onPointerEnter={() => setHoverId(id)}
                    onPointerLeave={() => setHoverId((p) => (p === id ? null : p))}
                    onFocus={() => setHoverId(id)}
                    onBlur={() => setHoverId((p) => (p === id ? null : p))}
                    onActivate={() => void immerseAndSelect(id)}
                  />
                );
              })}
            </g>

            {/* Core hub on top */}
            <MapNode
              nodeId="core"
              x={positions.core.x}
              y={positions.core.y}
              label={nodeByTopology.core.label}
              subtitle={nodeByTopology.core.subtitle}
              accent={nodeByTopology.core.accent}
              Icon={ICON_MAP.core}
              selected={highlightNodeId === "core"}
              dimMap={dimOthers}
              hovered={hoverId === "core"}
              isCore
              glowR={tierGeom.coreGlow}
              strokeW={tierGeom.stroke * 1.05}
              labelMain={tierGeom.lbl + 1.35}
              labelSub={tierGeom.sub}
              iconPx={tierGeom.iconCore}
              fo={tierGeom.foCore}
              gradId={`${gid}-fill-core`}
              glowFilter={hoverId === "core" || highlightNodeId === "core" ? `url(#${gid}-glow-node)` : undefined}
              hitRadius={tierGeom.pad + 10}
              onPointerEnter={() => setHoverId("core")}
              onPointerLeave={() => setHoverId((p) => (p === "core" ? null : p))}
              onFocus={() => setHoverId("core")}
              onBlur={() => setHoverId((p) => (p === "core" ? null : p))}
              onActivate={() => void immerseAndSelect("core")}
            />
          </svg>

          <AnimatePresence>
            {hoverId && (
              <motion.div
                key={hoverId}
                role="tooltip"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 2 }}
                transition={{ duration: 0.18 }}
                className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center px-4 sm:inset-auto sm:bottom-auto sm:right-4 sm:top-3 sm:justify-end"
              >
                <div className="rounded-xl border border-cyan-500/25 bg-black/82 px-3 py-2 text-center shadow-[0_12px_40px_-14px_rgba(0,0,0,.9)] backdrop-blur-xl sm:w-auto sm:text-left">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200/95">{tm.tooltipHeading}</p>
                  <p className="mt-1 text-[13px] text-white">{nodeByTopology[hoverId].label}</p>
                  <p className="mt-1 text-[12px] text-zinc-500">{nodeByTopology[hoverId].subtitle}</p>
                  <p className="mt-2 text-[10px] text-zinc-500">{tm.tooltipFootnote}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 pb-28 pt-20 sm:px-6 lg:pb-24">
      <div className="pointer-events-none absolute inset-0 opacity-[0.32] [background-image:linear-gradient(to_right,_rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(to_bottom,_rgba(34,211,238,0.04)_1px,transparent_1px)] [background-size:42px_42px]" />

      <div className="relative z-[1]">
        <HackerProfileConsole />
      </div>

      <header className="relative z-[1] mx-auto max-w-2xl space-y-3 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-cyan-200/70">{tm.heroKicker}</p>
        <h1 className="text-balance text-2xl font-semibold text-white sm:text-3xl">
          {tm.heroTitleLeading}{" "}
          <span className="text-cyan-200/95">{tm.heroTitleAccent}</span>
          {tm.heroTitleTrailing}
        </h1>
        <p className="text-[13px] leading-relaxed text-zinc-400">{tm.heroSubtitle}</p>
      </header>

      <div className="relative z-[1]">{mapCard}</div>

      {/* Lista móvil
      <div className="grid gap-3 sm:hidden">
        <p className="text-center text-[12px] text-zinc-500">Selección rápida (mismo contenido que el mapa)</p>
        {[("core" as TopologyNodeId), ...SATELLITE_IDS].map((nid) => {
          const meta = topologyNodes[nid];
          const active = highlightNodeId === nid;
          return (
            <motion.button
              key={nid}
              type="button"
              onClick={() => handleSelect(nid)}
              layout
              className={`flex w-full flex-col rounded-xl border px-4 py-4 text-left transition ${
                active ? "border-accent-green/52 bg-accent-cyan/8 shadow-[0_0_28px_-8px_rgba(34,211,238,0.45)]" : "border-white/12 bg-black/40 hover:border-cyan-500/34"
              }`}
              whileTap={{ scale: 0.988 }}
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-zinc-500">{nid === "core" ? "Núcleo" : "Área"}</span>
              <span className="mt-2 text-[16px] text-white">{meta.label}</span>
              <span className="mt-1 text-[13px] text-zinc-400">{meta.subtitle}</span>
              <span className="mt-3 text-[11px] text-cyan-200/95">Ver resumen</span>
            </motion.button>
          );
        })}
      </div> */}
    </div>
  );
}
