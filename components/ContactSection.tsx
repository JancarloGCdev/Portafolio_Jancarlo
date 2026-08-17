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

  // GSAP scroll animation
  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      gsap.from(".contact-anim", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      const isMobile = window.innerWidth < 768;

      gsap.to(".contact-bg-glow", {
        y: isMobile ? 50 : 200,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".contact-shape-1", {
        y: isMobile ? -20 : -100,
        rotation: 45,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-900/80 overflow-hidden select-none"
    >
      {/* Ambient background light & floating elements */}
      <div className="contact-bg-glow pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
        <div className="w-[900px] h-[900px] rounded-full bg-gradient-to-tr from-cyan-950/25 via-blue-950/20 to-transparent blur-[160px] opacity-70" />
      </div>
      <div className="contact-shape-1 pointer-events-none absolute bottom-[20%] right-[10%] w-56 h-56 rounded-full border-[12px] border-cyan-500/5 blur-[8px] -z-10" />

      <div className="max-w-6xl w-full mx-auto space-y-12 lg:space-y-16">
        {/* =========================================================================
            1. SECTION HEADER
           ========================================================================= */}
        <div className="max-w-3xl space-y-4 mx-auto text-center">
          <h2 className="contact-anim text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            {locale === "es" ? (
              <>
                ¿Tienes un reto técnico o una vacante abierta?{" "}
                <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 drop-shadow-sm">
                  Conectemos directamente.
                </span>
              </>
            ) : (
              <>
                Have a technical challenge or open role?{" "}
                <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 drop-shadow-sm">
                  Let&apos;s build together.
                </span>
              </>
            )}
          </h2>
        </div>

        {/* =========================================================================
            2. MAIN CONTACT CARD: PORTRAIT PHOTO + HIGH-CONVERTING CTA
           ========================================================================= */}
        <div className="contact-anim w-full mx-auto rounded-3xl border border-zinc-700/80 bg-[#09111c]/95 backdrop-blur-2xl p-6 sm:p-10 lg:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative overflow-hidden">
          {/* Subtle top glowing border line */}
          <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* LEFT COLUMN: HERO PORTRAIT PHOTO INTEGRATION (TRON DUAL-POSE MORPH) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4 text-center">
              <div
                className={`relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-2 p-1.5 bg-gradient-to-b from-blue-950/70 via-indigo-950/40 to-black transition-all duration-500 cursor-pointer group select-none ${
                  isPose2Active
                    ? "border-cyan-400 shadow-[0_0_40px_rgba(0,140,255,0.7),inset_0_0_25px_rgba(0,140,255,0.45)]"
                    : "border-blue-500/50 shadow-[0_0_30px_rgba(0,102,255,0.4),inset_0_0_20px_rgba(0,80,220,0.3)] hover:shadow-[0_0_45px_rgba(0,140,255,0.7),inset_0_0_25px_rgba(0,140,255,0.45)] hover:border-cyan-400"
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
                    sizes="(max-width: 640px) 200px, 256px"
                    className={`object-cover object-top will-change-transform transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      isPose2Active
                        ? "opacity-0 scale-[0.98] translate-y-1.5 pointer-events-none"
                        : "opacity-100 scale-100 translate-y-0 group-hover:scale-105 pointer-events-auto"
                    }`}
                    style={{
                      filter:
                        "drop-shadow(0 0 8px rgba(0, 102, 204, 0.7)) drop-shadow(0 0 16px rgba(0, 51, 153, 0.5))",
                    }}
                  />
                  {/* Pose 2: Arms Crossed (profile2.avif) */}
                  <Image
                    src="/images/profile2.avif"
                    alt={`${profile.name} - Software Engineer (Focus Pose)`}
                    fill
                    sizes="(max-width: 640px) 200px, 256px"
                    className={`object-cover object-top will-change-transform transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                      isPose2Active
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-[1.04] translate-y-3 rotate-[-0.6deg] pointer-events-none"
                    }`}
                    style={{
                      filter:
                        "drop-shadow(0 0 10px rgba(0, 140, 255, 0.8)) drop-shadow(0 0 22px rgba(0, 70, 200, 0.6))",
                    }}
                  />
                </div>
              </div>

              {/* Status Badges below photo */}
              <div className="space-y-1.5">
                <h3 className="text-xl font-extrabold text-white tracking-tight">
                  {profile.name}
                </h3>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{locale === "es" ? "Disponible para Contratación" : "Available for Hire"}</span>
                </div>
                <p className="text-xs text-zinc-400 font-mono flex items-center justify-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Pereira, CO · Remoto / Híbrido</span>
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: HIGH-CONVERTING CONTACT ACTIONS (LINKEDIN FIRST) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Pitch Banner */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {locale === "es" ? "Respuesta Rápida a Reclutadores" : "Fast Recruiter Response"}
                </span>
                <p className="text-sm text-zinc-200 font-medium leading-relaxed">
                  {locale === "es"
                    ? "Busco incorporarme a equipos de ingeniería orientados a software real, buenas prácticas y productos escalables. Si tienes una propuesta laboral o vacante, escríbeme directamente."
                    : "Looking to join engineering teams building real production software, high-throughput APIs, and scalable web apps. Connect with me for open roles."}
                </p>
              </div>

              {/* PRIMARY ACTION BUTTON #1: LINKEDIN (CANAL PREFERIDO) */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block font-bold">
                  {locale === "es" ? "Canal Preferido #1:" : "Primary Preferred Channel #1:"}
                </span>

                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#0077b5] to-[#005582] hover:from-[#006093] hover:to-[#004166] text-white font-semibold transition-all duration-300 shadow-lg shadow-cyan-950/30 group active:scale-[0.99]"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md">
                      <Linkedin className="w-6 h-6 fill-current text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold text-white flex items-center gap-1.5">
                        <span>{locale === "es" ? "Conectar en LinkedIn" : "Connect on LinkedIn"}</span>
                        <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-mono font-semibold uppercase">
                          {locale === "es" ? "Recomendado" : "Recommended"}
                        </span>
                      </div>
                      <div className="text-xs text-blue-100/90 font-mono">
                        linkedin.com/in/jancarlo-gc
                      </div>
                    </div>
                  </div>

                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>

              {/* SECONDARY ACTION BUTTON #2: EMAIL DIRECTO + COPY BUTTON */}
              <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block font-bold">
                  {locale === "es" ? "Canal Directo #2: Correo Electrónico" : "Direct Channel #2: Email Address"}
                </span>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <a
                    href={`mailto:${email}`}
                    className="flex-1 inline-flex items-center justify-between p-3.5 rounded-xl bg-zinc-900 hover:bg-cyan-950/80 border border-zinc-700/80 hover:border-cyan-500/60 text-zinc-200 transition-all text-xs font-mono group"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span className="truncate font-semibold">{email}</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-300 shrink-0" />
                  </a>

                  <button
                    type="button"
                    onClick={copyEmail}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-xs font-mono font-semibold text-zinc-200 hover:text-white transition-all active:scale-95 shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">{locale === "es" ? "Copiado!" : "Copied!"}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-zinc-400" />
                        <span>{locale === "es" ? "Copiar Email" : "Copy Email"}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* GitHub secondary link */}
              <div className="pt-2 text-xs font-mono text-zinc-400 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                  {locale === "es" ? "Roles objetivo: Software Engineer / Full Stack" : "Target roles: Software Engineer / Full Stack"}
                </span>

                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-cyan-400 hover:underline font-semibold"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            3. FOOTER COPYRIGHT & NAV LINKS
           ========================================================================= */}
        <div className="pt-12 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 font-mono gap-4">
          <div className="flex items-center gap-2">
            <span className="text-zinc-300 font-bold">{profile.name}</span>
            <span>© {new Date().getFullYear()}</span>
            <span>·</span>
            <span>{locale === "es" ? "Portafolio de Ingeniería" : "Software Engineering Portfolio"}</span>
          </div>

          <div className="flex items-center gap-4">
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
