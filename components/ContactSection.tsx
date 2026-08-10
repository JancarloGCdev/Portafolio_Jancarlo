"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { usePortfolio } from "@/components/portfolio-locale-provider";
import {
  MessageSquare,
  Mail,
  Linkedin,
  Github,
  Check,
  Copy,
  ExternalLink,
  ArrowUpRight,
  User,
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
  const [imgError, setImgError] = useState(false);

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
        y: 25,
        opacity: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative w-full py-16 sm:py-24 lg:py-32 bg-[#050b14] border-t border-zinc-900/80 overflow-hidden select-none"
    >
      {/* Ambient background light */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
        <div className="w-[900px] h-[900px] rounded-full bg-gradient-to-tr from-cyan-950/25 via-blue-950/20 to-transparent blur-[160px] opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 lg:space-y-16">
        {/* =========================================================================
            1. SECTION HEADER
           ========================================================================= */}
        <div className="max-w-3xl space-y-4 mx-auto text-center">
          <div className="contact-anim inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-cyan-400 tracking-wider uppercase shadow-[0_0_15px_rgba(34,211,238,0.1)]">
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              {locale === "es"
                ? "05. Contacto Directo & Oportunidades"
                : "05. Direct Contact & Opportunities"}
            </span>
          </div>

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

          <p className="contact-anim text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            {locale === "es"
              ? "Estoy disponible para incorporarme como Software Engineer o Full Stack Developer (remoto o híbrido). Mi canal preferido para mensajes profesionales es LinkedIn, o puedes enviarme un correo directo."
              : "Available for Software Engineer and Full Stack Developer roles (remote or hybrid). My preferred contact channel for opportunities is LinkedIn, or you can send an email directly."}
          </p>
        </div>

        {/* =========================================================================
            2. MAIN CONTACT CARD: PORTRAIT PHOTO + HIGH-CONVERTING CTA
           ========================================================================= */}
        <div className="contact-anim max-w-5xl mx-auto rounded-3xl border border-zinc-700/80 bg-[#09111c]/95 backdrop-blur-2xl p-6 sm:p-10 lg:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative overflow-hidden">
          {/* Subtle top glowing border line */}
          <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* LEFT COLUMN: HERO PORTRAIT PHOTO INTEGRATION */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-4 text-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-2 border-cyan-500/40 p-1.5 bg-gradient-to-b from-cyan-950/60 to-zinc-900 shadow-2xl shadow-cyan-950/40 group">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-black/60">
                  {!imgError ? (
                    <Image
                      src="/profile.avif"
                      alt={`${profile.name} - Software Engineer`}
                      fill
                      sizes="(max-width: 640px) 200px, 256px"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-cyan-400 bg-zinc-900">
                      <User className="w-16 h-16 stroke-[1.2]" />
                    </div>
                  )}
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
            <a href="#about" className="hover:text-cyan-400 transition-colors">
              {locale === "es" ? "Sobre mí" : "About"}
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
