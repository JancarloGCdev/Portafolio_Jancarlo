"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export type MapNodeSvgProps = {
  nodeId: string;
  x: number;
  y: number;
  label: string;
  subtitle: string;
  accent: string;
  Icon: LucideIcon;
  selected: boolean;
  dimMap: boolean;
  hovered: boolean;
  isCore?: boolean;
  hitRadius: number;
  glowR: number;
  strokeW: number;
  labelMain: number;
  labelSub: number;
  iconPx: number;
  fo: number;
  gradId: string;
  glowFilter?: string;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  onFocus: () => void;
  onBlur: () => void;
  onActivate: () => void;
};

/** Nodo SOC como `<g>` para usar dentro del `<svg>` del ThreatMap. */
export function MapNode({
  nodeId: _nodeId,
  x,
  y,
  label,
  subtitle,
  accent,
  Icon,
  selected,
  dimMap,
  hovered,
  isCore,
  hitRadius,
  glowR,
  strokeW,
  labelMain,
  labelSub,
  iconPx,
  fo,
  gradId,
  glowFilter,
  onPointerEnter,
  onPointerLeave,
  onFocus,
  onBlur,
  onActivate,
}: MapNodeSvgProps) {
  const dimmed = dimMap && !selected;

  return (
    <g
      role="button"
      tabIndex={0}
      transform={`translate(${x},${y})`}
      className="cursor-pointer outline-none [&:focus-visible]:opacity-100"
      style={{ outline: "none" }}
      onMouseEnter={onPointerEnter}
      onMouseLeave={onPointerLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={(e) => {
        e.stopPropagation();
        onActivate();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate();
        }
      }}
    >
      {/* Hit target */}
      <circle r={hitRadius} fill="transparent" pointerEvents="all" />

      <motion.g
        style={{ transformOrigin: "0px 0px" }}
        animate={{
          scale:
            selected ? (hovered ? 1.12 : 1.15) : hovered && !dimMap ? 1.08 : isCore ? 1.06 : 1,
          opacity: dimmed ? 0.28 : selected ? 1 : isCore ? 0.92 : hovered ? 0.95 : 0.82,
        }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
      >
        {/* Idle pulse ring */}
        <motion.circle
          r={glowR + (isCore ? 8 : 3)}
          fill="none"
          stroke={accent}
          strokeWidth={1.25}
          strokeOpacity={selected ? 0.55 : 0.28}
          pointerEvents="none"
          animate={
            selected
              ? { r: [glowR + 4, glowR + (isCore ? 18 : 14), glowR + 4], opacity: [0.85, 0.25, 0.85] }
              : { r: [glowR + 5, glowR + 11, glowR + 5], opacity: [0.22, 0.38, 0.22] }
          }
          transition={{
            duration: selected ? 1.85 : 2.75,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.circle
          r={glowR}
          fill={`url(#${gradId})`}
          stroke={hovered || selected ? accent : "rgba(148,163,184,0.35)"}
          strokeWidth={(hovered || selected ? strokeW + 0.85 : strokeW) * (isCore ? 1.08 : 1)}
          pointerEvents="none"
          filter={glowFilter}
          animate={{
            strokeOpacity: selected ? 1 : hovered ? 0.95 : 0.72,
          }}
        />

        <foreignObject
          x={-fo / 2}
          y={-fo / 2}
          width={fo}
          height={fo}
          className="pointer-events-none overflow-visible"
        >
          <div className="flex h-full w-full items-center justify-center [&>svg]:drop-shadow-[0_0_10px_rgba(34,211,238,0.35)]">
            <Icon aria-hidden strokeWidth={1.85} color={accent} width={iconPx} height={iconPx} />
          </div>
        </foreignObject>

        <text
          y={glowR + (isCore ? 30 : 26)}
          textAnchor="middle"
          pointerEvents="none"
          className="fill-zinc-100 font-semibold tracking-wide"
          style={{
            fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
            fontSize: labelMain,
          }}
        >
          {label}
        </text>
        <text
          y={glowR + (isCore ? 48 : 44)}
          textAnchor="middle"
          pointerEvents="none"
          className="fill-zinc-500 tracking-tight"
          style={{
            fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
            fontSize: labelSub,
          }}
        >
          {subtitle.length > 28 ? `${subtitle.slice(0, 26)}…` : subtitle}
        </text>
      </motion.g>
    </g>
  );
}
