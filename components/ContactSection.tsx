"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { usePortfolio } from "@/components/portfolio-locale-provider";
import {
  Mail,
  Linkedin,
  Github,
  Check,
  Copy,
  ExternalLink,
  ArrowUpRight,
  Sparkles,
  Briefcase,
  MapPin,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ContactSection() {
  const { locale, profile } = usePortfolio();
  const containerRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const [isContactHovered, setIsContactHovered] = useState(false);
  const [isContactTapped, setIsContactTapped] = useState(false);
  const [isContactAutoPosed, setIsContactAutoPosed] = useState(false);
  const isTouchDevice = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      isTouchDevice.current = true;
      const interval = setInterval(() => {
        setIsContactAutoPosed((prev) => !prev);
      }, 4500);
      return () => clearInterval(interval);
    }
  }, []);

  const isPose2Active = isContactHovered || isContactTapped || isContactAutoPosed;

  const handleToggleContactPose = () => {
    setIsContactAutoPosed(false);
    setIsContactTapped((prev) => !prev);
  };

  const email = profile.email || "jancarlogallonc@gmail.com";
  const linkedinUrl = "https://www.linkedin.com/in/jancarlo-gc";
  const githubUrl = "https://github.com/JancarloGCdev";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // GSAP scroll animation - Lightweight entrance without heavy scroll-scrub lag
  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      gsap.from(".contact-anim", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative w-full py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8 border-t border-zinc-900/80 overflow-hidden select-none scroll-mt-16 sm:scroll-mt-20"
    >
      {/* Ambient background light - Hardware accelerated without scroll-scrub overhead */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden transform-gpu">
        <div className="w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-cyan-950/20 via-blue-950/15 to-transparent blur-[120px] opacity-60" />
      </div>

      <div className="max-w-4xl w-full mx-auto space-y-6 sm:space-y-8">
        {/* =========================================================================
            1. SECTION HEADER (Compact single-view)
           ========================================================================= */}
        <div className="space-y-2 mx-auto text-center">
          <div className="contact-anim inline-flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{locale === "es" ? "Contacto Directo" : "Direct Contact"}</span>
          </div>

          <h2 className="contact-anim text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug">
            {locale === "es" ? (
              <>
                ¿Tienes un reto técnico o una vacante abierta?{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                  Conectemos directamente.
                </span>
              </>
            ) : (
              <>
                Have a technical challenge or open role?{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                  Let&apos;s build together.
                </span>
              </>
            )}
          </h2>
        </div>

        {/* =========================================================================
            2. MAIN CONTACT CARD: PORTRAIT PHOTO + HIGH-CONVERTING CTA
           ========================================================================= */}
        <div className="contact-anim w-full mx-auto rounded-2xl border border-zinc-700/80 bg-[#09111c]/98 p-4 sm:p-6 lg:p-7 shadow-[0_15px_35px_rgba(0,0,0,0.85)] relative overflow-hidden">
          {/* Subtle top glowing border line */}
          <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-center">
            {/* LEFT COLUMN: HERO PORTRAIT PHOTO INTEGRATION (TRON DUAL-POSE MORPH) */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-2.5 text-center">
              <div
                className={`relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden border-2 p-1 bg-gradient-to-b from-blue-950/70 via-indigo-950/40 to-black transition-all duration-500 cursor-pointer group select-none shrink-0 ${
                  isPose2Active
                    ? "border-cyan-400 shadow-[0_0_30px_rgba(0,140,255,0.7),inset_0_0_20px_rgba(0,140,255,0.45)]"
                    : "border-blue-500/50 shadow-[0_0_20px_rgba(0,102,255,0.4),inset_0_0_15px_rgba(0,80,220,0.3)] hover:shadow-[0_0_35px_rgba(0,140,255,0.7),inset_0_0_20px_rgba(0,140,255,0.45)] hover:border-cyan-400"
                }`}
                onClick={handleToggleContactPose}
                onMouseEnter={() => {
                  if (!isTouchDevice.current) setIsContactHovered(true);
                }}
                onMouseLeave={() => {
                  if (!isTouchDevice.current) setIsContactHovered(false);
                }}
                role="button"
                tabIndex={0}
                aria-label="Toggle profile photo pose"
              >
                <div className="relative w-full h-full rounded-full overflow-hidden bg-black/80">
                  {/* Pose 1: Relaxed (profile.avif) */}
                  <Image
                    src="/images/profile.avif"
                    alt={`${profile.name} - Software Engineer`}
                    fill
                    sizes="144px"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    className={`object-cover object-top pointer-events-none select-none will-change-transform transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      isPose2Active
                        ? "opacity-0 scale-[0.98] translate-y-1"
                        : "opacity-100 scale-100 translate-y-0 group-hover:scale-105"
                    }`}
                    style={{
                      filter:
                        "drop-shadow(0 0 6px rgba(0, 102, 204, 0.7)) drop-shadow(0 0 12px rgba(0, 51, 153, 0.5))",
                    }}
                  />
                  {/* Pose 2: Arms Crossed (profile2.avif) */}
                  <Image
                    src="/images/profile2.avif"
                    alt={`${profile.name} - Software Engineer (Focus Pose)`}
                    fill
                    sizes="144px"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    className={`object-cover object-top pointer-events-none select-none will-change-transform transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      isPose2Active
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-[1.04] translate-y-2 rotate-[-0.6deg]"
                    }`}
                    style={{
                      filter:
                        "drop-shadow(0 0 8px rgba(0, 140, 255, 0.8)) drop-shadow(0 0 16px rgba(0, 70, 200, 0.6))",
                    }}
                  />
                </div>
              </div>

              {/* Status Badges below photo */}
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                  {profile.name}
                </h3>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[11px] font-mono font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{locale === "es" ? "Disponible para Contratación" : "Available for Hire"}</span>
                </div>
                <p className="text-[11px] text-zinc-400 font-mono flex items-center justify-center gap-1">
                  <MapPin className="w-3 h-3 text-zinc-500" />
                  <span>Pereira, CO · Remoto / Híbrido</span>
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: HIGH-CONVERTING CONTACT ACTIONS (LINKEDIN FIRST) */}
            <div className="lg:col-span-8 space-y-3.5 sm:space-y-4">
              {/* Pitch Banner */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  {locale === "es" ? "Respuesta Rápida a Reclutadores" : "Fast Recruiter Response"}
                </span>
                <p className="text-xs sm:text-[13px] text-zinc-300 font-normal leading-relaxed">
                  {locale === "es"
                    ? "Busco incorporarme a equipos de ingeniería para roles de Software Engineer, Full Stack Developer, Ciberseguridad, Cloud o Inteligencia Artificial (IA). Si tienes una vacante o propuesta laboral, escríbeme directamente."
                    : "Looking to join engineering teams for Software Engineer, Full Stack Developer, Cybersecurity, Cloud, or AI roles. Connect with me for open opportunities or collaborations."}
                </p>
              </div>

              {/* PRIMARY ACTION BUTTON #1: LINKEDIN (CANAL PREFERIDO) */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block font-bold">
                  {locale === "es" ? "Canal Preferido #1:" : "Primary Preferred Channel #1:"}
                </span>

                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-gradient-to-r from-[#0077b5] to-[#005582] hover:from-[#006093] hover:to-[#004166] text-white font-semibold transition-all duration-300 shadow-md shadow-cyan-950/30 group active:scale-[0.99]"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-md">
                      <Linkedin className="w-5 h-5 fill-current text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                        <span>{locale === "es" ? "Conectar en LinkedIn" : "Connect on LinkedIn"}</span>
                        <span className="text-[9px] sm:text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono font-semibold uppercase">
                          {locale === "es" ? "Recomendado" : "Recommended"}
                        </span>
                      </div>
                      <div className="text-[11px] text-blue-100/90 font-mono">
                        linkedin.com/in/jancarlo-gc
                      </div>
                    </div>
                  </div>

                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0" />
                </a>
              </div>

              {/* SECONDARY ACTION BUTTON #2: EMAIL DIRECTO + COPY BUTTON */}
              <div className="space-y-1.5 pt-1.5 border-t border-zinc-800/80">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block font-bold">
                  {locale === "es" ? "Canal Directo #2: Correo Electrónico" : "Direct Channel #2: Email Address"}
                </span>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <a
                    href={`mailto:${email}`}
                    className="flex-1 inline-flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-zinc-900 hover:bg-cyan-950/80 border border-zinc-700/80 hover:border-cyan-500/60 text-zinc-200 transition-all text-xs font-mono group"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate font-semibold">{email}</span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-cyan-300 shrink-0 ml-1.5" />
                  </a>

                  <button
                    type="button"
                    onClick={copyEmail}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-xs font-mono font-semibold text-zinc-200 hover:text-white transition-all active:scale-95 shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">{locale === "es" ? "Copiado!" : "Copied!"}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{locale === "es" ? "Copiar Email" : "Copy Email"}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Target Roles & Focus Areas */}
              <div className="pt-2 border-t border-zinc-800/80 space-y-1.5 text-xs font-mono text-zinc-400">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-cyan-400 font-bold text-[10px] sm:text-[11px] uppercase tracking-wider">
                    <Briefcase className="w-3 h-3 text-cyan-400" />
                    {locale === "es" ? "Roles Objetivo & Áreas de Interés:" : "Target Roles & Focus Areas:"}
                  </span>

                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-cyan-400 hover:underline font-semibold text-[11px]"
                  >
                    <Github className="w-3 h-3" />
                    <span>GitHub</span>
                  </a>
                </div>

                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {[
                    { es: "Software Engineer", en: "Software Engineer" },
                    { es: "Full Stack Developer", en: "Full Stack Developer" },
                    { es: "Ciberseguridad & Redes", en: "Cybersecurity & Networks" },
                    { es: "Cloud & Backend APIs", en: "Cloud & Backend APIs" },
                    { es: "Inteligencia Artificial (IA / LLMs)", en: "Artificial Intelligence (AI / LLMs)" },
                  ].map((item, rIdx) => (
                    <span
                      key={rIdx}
                      className="px-2 py-0.5 rounded-md bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:text-cyan-300 hover:border-cyan-500/40 text-[10px] sm:text-[11px] font-mono transition-colors"
                    >
                      {locale === "es" ? item.es : item.en}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            3. FOOTER COPYRIGHT & NAV LINKS (Compact)
           ========================================================================= */}
        <div className="pt-4 border-t border-zinc-900/80 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 font-mono gap-3">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <span className="text-zinc-300 font-bold">{profile.name}</span>
            <span>© {new Date().getFullYear()}</span>
            <span>·</span>
            <span>{locale === "es" ? "Portafolio de Ingeniería" : "Software Engineering Portfolio"}</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] sm:text-xs">
            <a href="#hero" className="hover:text-cyan-400 transition-colors">
              {locale === "es" ? "Inicio" : "Top"}
            </a>
            <a href="#experience" className="hover:text-cyan-400 transition-colors">
              {locale === "es" ? "Experiencia" : "Experience"}
            </a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">
              {locale === "es" ? "Proyectos" : "Projects"}
            </a>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">
              Skills
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
