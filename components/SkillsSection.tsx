"use client";

import React, { useRef } from "react";
import { usePortfolio } from "@/components/portfolio-locale-provider";
import { TechBadge } from "@/components/TechBadge";
import {
  Cpu,
  Code2,
  Layout,
  Server,
  Database,
  Terminal,
  ShieldCheck,
  Linkedin,
  ArrowUpRight,
  Sparkles,
  Zap,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SkillsSection() {
  const { locale } = usePortfolio();
  const containerRef = useRef<HTMLElement>(null);
  const linkedinUrl = "https://www.linkedin.com/in/jancarlo-gc";

  const skillRows =
    locale === "es"
      ? [
          {
            label: "Lenguajes",
            icon: <Code2 className="w-3.5 h-3.5 text-cyan-400" />,
            colorClass: "text-cyan-400 border-cyan-500/30",
            hoverBorder: "hover:border-cyan-500/50",
            items: ["Python", "C#", "TypeScript", "JavaScript (ES6+)"],
          },
          {
            label: "Frontend & Web",
            icon: <Layout className="w-3.5 h-3.5 text-teal-400" />,
            colorClass: "text-teal-400 border-teal-500/30",
            hoverBorder: "hover:border-teal-500/50",
            items: ["React", "Next.js (App Router)", "Tailwind CSS", "GSAP Animations", "HTML5 & CSS3"],
          },
          {
            label: "Backend & APIs",
            icon: <Server className="w-3.5 h-3.5 text-emerald-400" />,
            colorClass: "text-emerald-400 border-emerald-500/30",
            hoverBorder: "hover:border-emerald-500/50",
            items: [".NET (Blazor / ASP.NET)", "Python (FastAPI)", "Node.js", "APIs RESTful", "Strapi CMS"],
          },
          {
            label: "Bases de Datos",
            icon: <Database className="w-3.5 h-3.5 text-amber-400" />,
            colorClass: "text-amber-400 border-amber-500/30",
            hoverBorder: "hover:border-amber-500/50",
            items: ["SQL Server (Stored Procedures)", "PostgreSQL", "Prisma ORM", "Entity Framework Core"],
          },
          {
            label: "DevOps & Cloud",
            icon: <Terminal className="w-3.5 h-3.5 text-purple-400" />,
            colorClass: "text-purple-400 border-purple-500/30",
            hoverBorder: "hover:border-purple-500/50",
            items: ["Git & GitHub", "Docker", "Postman", "Linux / Bash", "Windows Server", "Azure"],
          },
          {
            label: "Redes & Seguridad",
            icon: <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />,
            colorClass: "text-blue-400 border-blue-500/30",
            hoverBorder: "hover:border-blue-500/50",
            items: ["Cisco CCNA (TCP/IP)", "Ciberseguridad (Google)", "English B1-B2", "IA & Clustering"],
          },
        ]
      : [
          {
            label: "Languages",
            icon: <Code2 className="w-3.5 h-3.5 text-cyan-400" />,
            colorClass: "text-cyan-400 border-cyan-500/30",
            hoverBorder: "hover:border-cyan-500/50",
            items: ["Python", "C#", "TypeScript", "JavaScript (ES6+)"],
          },
          {
            label: "Frontend & Web",
            icon: <Layout className="w-3.5 h-3.5 text-teal-400" />,
            colorClass: "text-teal-400 border-teal-500/30",
            hoverBorder: "hover:border-teal-500/50",
            items: ["React", "Next.js (App Router)", "Tailwind CSS", "GSAP Animations", "HTML5 & CSS3"],
          },
          {
            label: "Backend & APIs",
            icon: <Server className="w-3.5 h-3.5 text-emerald-400" />,
            colorClass: "text-emerald-400 border-emerald-500/30",
            hoverBorder: "hover:border-emerald-500/50",
            items: [".NET (Blazor / ASP.NET)", "Python (FastAPI)", "Node.js", "RESTful APIs", "Strapi CMS"],
          },
          {
            label: "Databases & Data",
            icon: <Database className="w-3.5 h-3.5 text-amber-400" />,
            colorClass: "text-amber-400 border-amber-500/30",
            hoverBorder: "hover:border-amber-500/50",
            items: ["SQL Server (Stored Procedures)", "PostgreSQL", "Prisma ORM", "Entity Framework Core"],
          },
          {
            label: "DevOps & Cloud",
            icon: <Terminal className="w-3.5 h-3.5 text-purple-400" />,
            colorClass: "text-purple-400 border-purple-500/30",
            hoverBorder: "hover:border-purple-500/50",
            items: ["Git & GitHub", "Docker", "Postman", "Linux / Bash", "Windows Server", "Azure"],
          },
          {
            label: "Networking & Security",
            icon: <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />,
            colorClass: "text-blue-400 border-blue-500/30",
            hoverBorder: "hover:border-blue-500/50",
            items: ["Cisco CCNA (TCP/IP)", "Cybersecurity (Google)", "English B1-B2", "AI & Clustering"],
          },
        ];

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      gsap.from(".skills-single-anim", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 20,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="skills"
      className="relative w-full py-12 sm:py-16 bg-[#050b14] border-t border-zinc-900/80 overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
        <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-cyan-950/20 via-blue-950/15 to-transparent blur-[140px] opacity-60" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* =========================================================================
            1. SECTION HEADER (Ultra-compact, fits in 1 screen view)
           ========================================================================= */}
        <div className="skills-single-anim flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-cyan-400 tracking-wider uppercase">
              <Cpu className="w-3 h-3 text-cyan-400" />
              <span>{locale === "es" ? "04. Toolkit de Ingeniería" : "04. Tech Stack"}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {locale === "es" ? (
                <>
                  Habilidades & Stacks en{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
                    Una Sola Vista
                  </span>
                </>
              ) : (
                <>
                  Skills & Stacks in{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
                    One Single Card
                  </span>
                </>
              )}
            </h2>
          </div>

          {/* Quick status pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-[11px] font-semibold">
            <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>{locale === "es" ? "Listo para Producción desde Día 1" : "Production Ready Day 1"}</span>
          </div>
        </div>

        {/* =========================================================================
            2. THE SINGLE MASTER CARD CONTAINING ALL SKILLS
           ========================================================================= */}
        <div className="skills-single-anim rounded-2xl border border-zinc-700/80 bg-[#09111c]/95 backdrop-blur-2xl p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden space-y-4">
          {/* Top glowing line */}
          <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

          {/* MASTER CARD ROWS: Lenguajes, Frontend, Backend, Databases, DevOps, Security */}
          <div className="space-y-3">
            {skillRows.map((row, idx) => (
              <div
                key={idx}
                className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 rounded-xl bg-[#060b13]/80 border border-zinc-800/80 ${row.hoverBorder} transition-all duration-300 group`}
              >
                {/* Category Label (Fixed width for perfect alignment) */}
                <div className="w-44 shrink-0 flex items-center gap-2">
                  <div className="p-1.5 rounded bg-zinc-900 border border-zinc-800">
                    {row.icon}
                  </div>
                  <span className={`font-mono text-xs font-bold ${row.colorClass.split(" ")[0]}`}>
                    {row.label}:
                  </span>
                </div>

                {/* Tech Badges with Official Logos */}
                <div className="flex flex-wrap gap-2 items-center flex-1">
                  {row.items.map((item, itemIdx) => (
                    <TechBadge key={itemIdx} tech={item} size="sm" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* =========================================================================
              3. HIGH-CONVERTING LINKEDIN CTA INSIDE THE SINGLE CARD
             ========================================================================= */}
          <div className="pt-3 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-zinc-400 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>
                {locale === "es"
                  ? "¿Buscas este stack técnico para tu equipo u organización?"
                  : "Need this technical stack for your software engineering team?"}
              </span>
            </div>

            <a
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0077b5] to-[#005582] hover:from-[#006093] hover:to-[#004166] text-white font-mono text-xs font-bold transition-all shadow-lg shadow-cyan-950/30 active:scale-95 group shrink-0"
            >
              <Linkedin className="w-4 h-4 fill-current text-white" />
              <span>
                {locale === "es" ? "Contactar por LinkedIn" : "Connect on LinkedIn"}
              </span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
