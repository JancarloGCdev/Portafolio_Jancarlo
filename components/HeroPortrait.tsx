"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { usePortfolio } from "@/components/portfolio-locale-provider";
import { User } from "lucide-react";

type HeroPortraitProps = {
  className?: string;
  priority?: boolean;
};

export function HeroPortrait({ className = "", priority = true }: HeroPortraitProps) {
  const { profile } = usePortfolio();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isTapped, setIsTapped] = useState<boolean>(false);
  const [isAutoPosed, setIsAutoPosed] = useState<boolean>(false);
  const [hasError1, setHasError1] = useState<boolean>(false);
  const [hasError2, setHasError2] = useState<boolean>(false);
  const isTouchDevice = useRef<boolean>(false);

  // Auto-cycle on mobile / touch devices periodically when not manually interacted with
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      isTouchDevice.current = true;
      const interval = setInterval(() => {
        setIsAutoPosed((prev) => !prev);
      }, 4500);
      return () => clearInterval(interval);
    }
  }, []);

  const isPose2Active = isHovered || isTapped || isAutoPosed;

  const handleToggleTap = () => {
    setIsAutoPosed(false);
    setIsTapped((prev) => !prev);
  };

  return (
    <div
      className={`relative flex items-end justify-center select-none cursor-pointer group ${className}`}
      onMouseEnter={() => {
        if (!isTouchDevice.current) setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (!isTouchDevice.current) setIsHovered(false);
      }}
      onClick={handleToggleTap}
      role="button"
      tabIndex={0}
      aria-label="Interactive Portrait - Toggle Pose"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleToggleTap();
        }
      }}
    >
      {/* 1. TRON DARK-BLUE AMBIENT BACKLIGHT & RADIAL RAYS */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        {/* Deep dark blue Tron core */}
        <div
          className={`w-[88%] h-[88%] rounded-full bg-gradient-to-tr from-blue-900/35 via-cyan-900/25 to-indigo-950/45 blur-[100px] transition-all duration-700 ${isPose2Active ? "opacity-95 scale-105" : "opacity-75 scale-100"
            }`}
        />
        {/* Concentrated Tron blue rim aura */}
        <div
          className={`absolute bottom-6 w-3/4 h-32 bg-blue-600/20 blur-[70px] rounded-full transition-opacity duration-700 ${isPose2Active ? "opacity-100" : "opacity-60"
            }`}
        />
        {/* Subtle Tron cyber glow ring behind head/shoulders */}
        <div
          className={`absolute top-10 w-52 h-52 sm:w-64 sm:h-64 rounded-full border border-blue-500/25 blur-[1px] transition-all duration-700 ${isPose2Active
              ? "scale-105 border-cyan-400/40 shadow-[0_0_45px_rgba(0,102,255,0.4)]"
              : "scale-95 shadow-[0_0_25px_rgba(0,50,180,0.25)]"
            }`}
        />
      </div>

      {/* 2. SILHOUETTES WITH DYNAMIC MORPHING MOVEMENT & TRON CONTOUR LIGHTING */}
      <div className="relative w-full h-full flex items-end justify-center overflow-visible">
        {!hasError1 ? (
          <div className="relative w-full h-full min-h-[340px] sm:min-h-[420px] lg:min-h-[470px] flex items-end justify-center">
            {/* POSE 1: Hands in pockets (profile.png) */}
            <div
              className={`absolute inset-0 flex items-end justify-center will-change-transform transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isPose2Active
                  ? "opacity-0 scale-[0.985] translate-y-2 pointer-events-none"
                  : "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                }`}
              style={{
                filter:
                  "drop-shadow(0 0 1.5px rgba(0, 180, 255, 0.55)) drop-shadow(0 0 16px rgba(0, 80, 220, 0.5)) drop-shadow(0 0 35px rgba(2, 20, 110, 0.7))",
              }}
            >
              <Image
                src="/images/profile.png"
                alt={`${profile.name} - Software Engineer (Relaxed Pose)`}
                fill
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 42vw, 420px"
                priority={priority}
                className="object-contain object-bottom"
                onError={() => setHasError1(true)}
              />
            </div>

            {/* POSE 2: Arms crossed (profile2.png) */}
            {!hasError2 && (
              <div
                className={`absolute inset-0 flex items-end justify-center will-change-transform transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isPose2Active
                    ? "opacity-100 scale-100 translate-y-0 rotate-0 pointer-events-auto"
                    : "opacity-0 scale-[1.03] translate-y-4 rotate-[-0.8deg] pointer-events-none"
                  }`}
                style={{
                  filter:
                    "drop-shadow(0 0 2px rgba(0, 220, 255, 0.8)) drop-shadow(0 0 24px rgba(0, 130, 255, 0.7)) drop-shadow(0 0 45px rgba(2, 40, 170, 0.85))",
                }}
              >
                <Image
                  src="/images/profile2.png"
                  alt={`${profile.name} - Software Engineer (Focus Pose)`}
                  fill
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 42vw, 420px"
                  priority={priority}
                  className="object-contain object-bottom"
                  onError={() => setHasError2(true)}
                />
              </div>
            )}

          </div>
        ) : (
          /* Placeholder */
          <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[420px] flex flex-col items-center justify-end pb-6 text-center text-zinc-500">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-cyan-950/20 border border-cyan-500/20 flex items-center justify-center text-cyan-400/80 mb-4 shadow-xl shadow-cyan-950/20">
              <User className="w-12 h-12 sm:w-16 sm:h-16 stroke-[1.2]" />
            </div>
            <div className="space-y-1 z-10 bg-[#050b14]/90 backdrop-blur-md px-3.5 py-2 rounded-lg border border-zinc-800/80 font-mono">
              <p className="text-xs text-zinc-300 font-semibold">{profile.name}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
