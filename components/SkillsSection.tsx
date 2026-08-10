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
  Users,
  MessageSquare,
  Zap,
  Target,
  Brain,
  BookOpen,
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

  const techCategories =
    locale === "es"
      ? [
          {
            label: "Lenguajes",
            icon: <Code2 className="w-3.5 h-3.5 text-cyan-400" />,
            colorClass: "text-cyan-400 border-cyan-500/30",
            hoverBorder: "hover:border-cyan-500/50",
            items: ["C#", "Python", "TypeScript", "JavaScript (ES6+)", "SQL"],
          },
          {
            label: "Frontend & Web",
            icon: <Layout className="w-3.5 h-3.5 text-teal-400" />,
            colorClass: "text-teal-400 border-teal-500/30",
            hoverBorder: "hover:border-teal-500/50",
            items: [
              "React",
              "Next.js (App Router)",
              "Blazor Server",
              "Tailwind CSS",
              "GSAP Animations",
            ],
          },
          {
            label: "Backend & APIs",
            icon: <Server className="w-3.5 h-3.5 text-emerald-400" />,
            colorClass: "text-emerald-400 border-emerald-500/30",
            hoverBorder: "hover:border-emerald-500/50",
            items: [
              ".NET (ASP.NET)",
              "Python (FastAPI)",
              "Node.js",
              "APIs RESTful",
              "Strapi CMS",
            ],
          },
          {
            label: "Bases de Datos",
            icon: <Database className="w-3.5 h-3.5 text-amber-400" />,
            colorClass: "text-amber-400 border-amber-500/30",
            hoverBorder: "hover:border-amber-500/50",
            items: [
              "SQL Server (Stored Procedures)",
              "PostgreSQL",
              "Prisma ORM",
              "Entity Framework Core",
            ],
          },
          {
            label: "DevOps & Cloud",
            icon: <Terminal className="w-3.5 h-3.5 text-purple-400" />,
            colorClass: "text-purple-400 border-purple-500/30",
            hoverBorder: "hover:border-purple-500/50",
            items: [
              "Git & GitHub",
              "Docker",
              "Postman",
              "Linux / Bash",
              "Windows Server",
              "Azure Fundamentals",
            ],
          },
          {
            label: "Redes & Ciberseguridad",
            icon: <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />,
            colorClass: "text-blue-400 border-blue-500/30",
            hoverBorder: "hover:border-blue-500/50",
            items: [
              "Cisco CCNA (TCP/IP)",
              "Fundamentos Ciberseguridad (Google)",
              "English For IT (Cisco)",
              "SOC / Blue Team Foundations",
            ],
          },
        ]
      : [
          {
            label: "Languages",
            icon: <Code2 className="w-3.5 h-3.5 text-cyan-400" />,
            colorClass: "text-cyan-400 border-cyan-500/30",
            hoverBorder: "hover:border-cyan-500/50",
            items: ["C#", "Python", "TypeScript", "JavaScript (ES6+)", "SQL"],
          },
          {
            label: "Frontend & Web",
            icon: <Layout className="w-3.5 h-3.5 text-teal-400" />,
            colorClass: "text-teal-400 border-teal-500/30",
            hoverBorder: "hover:border-teal-500/50",
            items: [
              "React",
              "Next.js (App Router)",
              "Blazor Server",
              "Tailwind CSS",
              "GSAP Animations",
            ],
          },
          {
            label: "Backend & APIs",
            icon: <Server className="w-3.5 h-3.5 text-emerald-400" />,
            colorClass: "text-emerald-400 border-emerald-500/30",
            hoverBorder: "hover:border-emerald-500/50",
            items: [
              ".NET (ASP.NET)",
              "Python (FastAPI)",
              "Node.js",
              "RESTful APIs",
              "Strapi CMS",
            ],
          },
          {
            label: "Databases & Data",
            icon: <Database className="w-3.5 h-3.5 text-amber-400" />,
            colorClass: "text-amber-400 border-amber-500/30",
            hoverBorder: "hover:border-amber-500/50",
            items: [
              "SQL Server (Stored Procedures)",
              "PostgreSQL",
              "Prisma ORM",
              "Entity Framework Core",
            ],
          },
          {
            label: "DevOps & Cloud",
            icon: <Terminal className="w-3.5 h-3.5 text-purple-400" />,
            colorClass: "text-purple-400 border-purple-500/30",
            hoverBorder: "hover:border-purple-500/50",
            items: [
              "Git & GitHub",
              "Docker",
              "Postman",
              "Linux / Bash",
              "Windows Server",
              "Azure Fundamentals",
            ],
          },
          {
            label: "Networking & Security",
            icon: <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />,
            colorClass: "text-blue-400 border-blue-500/30",
            hoverBorder: "hover:border-blue-500/50",
            items: [
              "Cisco CCNA (TCP/IP)",
              "Google Cybersecurity",
              "English For IT (Cisco)",
              "SOC / Blue Team Foundations",
            ],
          },
        ];

  const softSkills =
    locale === "es"
      ? [
          {
            title: "Comunicación Asertiva",
            desc: "Capacidad para transmitir decisiones técnicas complejas de forma clara a desarrolladores y stakeholders.",
            icon: <MessageSquare className="w-4 h-4 text-cyan-400" />,
          },
          {
            title: "Trabajo en Equipo",
            desc: "Colaboración fluida y respetuosa en entornos multidisciplinarios, priorizando objetivos comunes.",
            icon: <Users className="w-4 h-4 text-emerald-400" />,
          },
          {
            title: "Adaptabilidad Acelerada",
            desc: "Rápida curva de aprendizaje para dominar e incorporar nuevas tecnologías según las necesidades del proyecto.",
            icon: <Zap className="w-4 h-4 text-teal-400" />,
          },
          {
            title: "Resolución Pragmática",
            desc: "Enfoque estructurado orientado a solucionar problemas técnicos con criterios de eficiencia y mantenibilidad.",
            icon: <Target className="w-4 h-4 text-amber-400" />,
          },
          {
            title: "Pensamiento Analítico",
            desc: "Evaluación rigurosa de arquitectura, lógica transaccional y prevención de fallos en producción.",
            icon: <Brain className="w-4 h-4 text-purple-400" />,
          },
          {
            title: "Aprendizaje Continuo",
            desc: "Mentalidad de mejora constante, actualización en mejores prácticas y metodologías de ingeniería.",
            icon: <BookOpen className="w-4 h-4 text-blue-400" />,
          },
        ]
      : [
          {
            title: "Clear Communication",
            desc: "Ability to convey complex technical concepts clearly to both technical peers and stakeholders.",
            icon: <MessageSquare className="w-4 h-4 text-cyan-400" />,
          },
          {
            title: "Team Collaboration",
            desc: "Seamless teamwork within cross-functional groups, driving shared goals and engineering quality.",
            icon: <Users className="w-4 h-4 text-emerald-400" />,
          },
          {
            title: "Fast Adaptability",
            desc: "Accelerated learning curve to quickly master and implement new tech stacks as required.",
            icon: <Zap className="w-4 h-4 text-teal-400" />,
          },
          {
            title: "Pragmatic Problem Solving",
            desc: "Structured approach focused on solving business challenges with clean, maintainable code.",
            icon: <Target className="w-4 h-4 text-amber-400" />,
          },
          {
            title: "Analytical Thinking",
            desc: "Rigorous analysis of system architecture, database performance, and edge-case handling.",
            icon: <Brain className="w-4 h-4 text-purple-400" />,
          },
          {
            title: "Continuous Learning",
            desc: "Constant drive to upgrade skills in modern web standards, software architecture, and security.",
            icon: <BookOpen className="w-4 h-4 text-blue-400" />,
          },
        ];

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      gsap.from(".skills-anim-unit", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 22,
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
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#050b14] border-t border-zinc-900/80 overflow-hidden select-none"
    >
      {/* Ambient background light */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
        <div className="w-[850px] h-[850px] rounded-full bg-gradient-to-tr from-cyan-950/20 via-blue-950/15 to-transparent blur-[150px] opacity-60" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* =========================================================================
            1. INTRODUCTION BLOCK (Versatility & Adaptation Message)
           ========================================================================= */}
        <div className="skills-anim-unit max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-cyan-400 tracking-wider uppercase shadow-[0_0_15px_rgba(34,211,238,0.1)]">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              {locale === "es"
                ? "04. Capacidad Técnica & Versatilidad"
                : "04. Technical Range & Adaptability"}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            {locale === "es" ? (
              <>
                Versatilidad para{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 drop-shadow-sm">
                  Construir y Resolver
                </span>
              </>
            ) : (
              <>
                Versatility to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 drop-shadow-sm">
                  Build & Solve
                </span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-medium max-w-2xl mx-auto">
            {locale === "es"
              ? "No me limito a una sola tecnología. Tengo experiencia trabajando con diferentes herramientas, lenguajes y entornos, lo que me permite adaptarme a las necesidades de cada proyecto y colaborar eficazmente dentro de equipos multidisciplinarios."
              : "I don't limit myself to a single technology. I have hands-on experience working across diverse tools, languages, and environments, allowing me to adapt quickly to project needs and collaborate effectively within multidisciplinary engineering teams."}
          </p>
        </div>

        {/* =========================================================================
            2. THE SINGLE UNIFIED MASTER CARD (All Tech Skills + Soft Skills)
           ========================================================================= */}
        <div className="skills-anim-unit rounded-3xl border border-zinc-700/80 bg-[#09111c]/95 backdrop-blur-2xl p-6 sm:p-9 lg:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative overflow-hidden space-y-8">
          {/* Top glowing accent line */}
          <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

          {/* SECTION A: TECHNICAL STACK CATEGORIES WITH BRAND LOGOS */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {locale === "es" ? "Stack Técnico & Herramientas" : "Tech Stack & Tools"}
              </span>

              <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900/90 px-3 py-1 rounded-full border border-zinc-800">
                {locale === "es" ? "100% Verificado en Producción" : "100% Verified in Production"}
              </span>
            </div>

            <div className="space-y-3">
              {techCategories.map((row, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-4 p-3.5 rounded-xl bg-[#060b13]/80 border border-zinc-800/80 ${row.hoverBorder} transition-all duration-300 group`}
                >
                  {/* Category Label */}
                  <div className="w-48 shrink-0 flex items-center gap-2">
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
          </div>

          {/* SECTION B: SOFT SKILLS / HABILIDADES PROFESIONALES BLOCK */}
          <div className="pt-6 border-t border-zinc-800/80 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
              <div className="space-y-0.5">
                <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>
                    {locale === "es"
                      ? "Habilidades Profesionales & Trabajo en Equipo"
                      : "Professional Soft Skills & Teamwork"}
                  </span>
                </h3>
                <p className="text-xs text-zinc-400 font-mono">
                  {locale === "es"
                    ? "Competencias humanas y metodológicas que complementan la capacidad técnica para el éxito del equipo."
                    : "Human and methodological competencies that complement technical skills for team success."}
                </p>
              </div>

              <span className="px-2.5 py-1 rounded bg-emerald-950/80 text-emerald-300 text-[10px] font-mono font-semibold border border-emerald-500/30 shrink-0 self-start sm:self-auto">
                {locale === "es" ? "Cultura de Equipo" : "Team Culture"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {softSkills.map((sk, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#060b13]/90 border border-zinc-800/90 space-y-1.5 hover:border-emerald-500/40 transition-colors group"
                >
                  <div className="flex items-center gap-2 text-xs font-bold text-white tracking-tight">
                    <div className="p-1 rounded bg-zinc-900 border border-zinc-800">
                      {sk.icon}
                    </div>
                    <span>{sk.title}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-snug font-sans">
                    {sk.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION C: MASTER CARD FOOTER & STRATEGIC LINKEDIN CTA */}
          <div className="pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 text-zinc-300 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>
                {locale === "es"
                  ? "¿Buscas esta combinación de solidez técnica y adaptabilidad profesional?"
                  : "Looking for this combination of technical execution and professional adaptability?"}
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
