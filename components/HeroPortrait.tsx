"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePortfolio } from "@/components/portfolio-locale-provider";
import { User } from "lucide-react";

type HeroPortraitProps = {
  className?: string;
  priority?: boolean;
};

export function HeroPortrait({ className = "", priority = true }: HeroPortraitProps) {
  const { locale, profile } = usePortfolio();
  const [hasError, setHasError] = useState<boolean>(false);
  const imgSrc = "/profile.avif";

  const handleError = () => {
    setHasError(true);
  };

  return (
    <div className={`relative flex items-end justify-center select-none ${className}`}>
      {/* 1. Subtle Ambient Backlight Glow (placed strictly behind the silhouette) */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-4/5 h-4/5 rounded-full bg-gradient-to-tr from-cyan-500/15 via-teal-500/10 to-transparent blur-[90px] opacity-70" />
        <div className="absolute bottom-4 w-3/4 h-24 bg-cyan-400/10 blur-[60px] rounded-full" />
      </div>

      {/* 2. Transparent Silhouette Container without cards, borders or boxes */}
      <div className="relative w-full h-full flex items-end justify-center overflow-visible">
        {!hasError ? (
          <div className="relative w-full h-full min-h-[320px] sm:min-h-[400px] lg:min-h-[440px] flex items-end justify-center">
            <Image
              src={imgSrc}
              alt={`${profile.name} - Software Engineer`}
              fill
              sizes="(max-width: 640px) 85vw, (max-width: 1024px) 40vw, 380px"
              priority={priority}
              className="object-contain object-bottom drop-shadow-[0_12px_36px_rgba(6,182,212,0.12)] transition-opacity duration-500"
              onError={handleError}
            />

            {/* Smooth bottom fade so the half-body merges seamlessly into the Hero background */}
            <div className="pointer-events-none absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[#050b14] to-transparent z-10" />
          </div>
        ) : (
          /* Elegant Transparent Placeholder Silhouette when photo is pending */
          <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[420px] flex flex-col items-center justify-end pb-6 text-center text-zinc-500">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-cyan-950/20 border border-cyan-500/20 flex items-center justify-center text-cyan-400/80 mb-4 shadow-xl shadow-cyan-950/20">
              <User className="w-12 h-12 sm:w-16 sm:h-16 stroke-[1.2]" />
            </div>
            <div className="space-y-1 z-10 bg-[#050b14]/90 backdrop-blur-md px-3.5 py-2 rounded-lg border border-zinc-800/80 font-mono">
              <p className="text-xs text-zinc-300 font-semibold">{profile.name}</p>
              <p className="text-[10px] text-cyan-400">
                {locale === "es"
                  ? "Coloca tu PNG en public/images/profile.png"
                  : "Place your PNG at public/images/profile.png"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
