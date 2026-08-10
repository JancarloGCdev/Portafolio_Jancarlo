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
  Zap,
  ArrowRight,
  GraduationCap,
  Award,
  Globe2,
  CheckCircle2,
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

  // Define categorized HV skill sets to ensure 100% fidelity with Jancarlo's Resume & Data
  const categories =
    locale === "es"
      ? [
          {
            id: "languages",
            title: "Lenguajes de Programación",
            icon: <Code2 className="w-4 h-4 text-cyan-400" />,
            colSpan: "lg:col-span-6",
            items: ["Python", "C#", "TypeScript", "JavaScript (ES6+)"],
            highlight: "Desarrollo multi-paradigma: orientado a objetos, tipado estricto y scripts algorítmicos.",
          },
          {
            id: "frontend",
            title: "Desarrollo Frontend & Web",
            icon: <Layout className="w-4 h-4 text-cyan-400" />,
            colSpan: "lg:col-span-6",
            items: [
              "React",
              "Next.js (App Router)",
              "Tailwind CSS",
              "GSAP Animations",
              "HTML5 & CSS3 Semántico",
            ],
            highlight: "Interfaces modernas, accesibles, adaptables a móviles y optimizadas en rendimiento.",
          },
          {
            id: "backend",
            title: "Backend & Arquitectura de APIs",
            icon: <Server className="w-4 h-4 text-emerald-400" />,
            colSpan: "lg:col-span-6",
            items: [
              ".NET (Blazor / ASP.NET)",
              "Python (FastAPI)",
              "Node.js",
              "APIs RESTful",
              "Strapi CMS",
              "Arquitectura Limpia & Modular",
            ],
            highlight: "Servicios robustos, alta disponibilidad, consumo de APIs y separación clara de capas.",
          },
          {
            id: "databases",
            title: "Bases de Datos & Almacenamiento",
            icon: <Database className="w-4 h-4 text-amber-400" />,
            colSpan: "lg:col-span-6",
            items: [
              "SQL Server (Stored Procedures)",
              "PostgreSQL",
              "Prisma ORM",
              "Entity Framework Core",
              "Modelado Relacional",
            ],
            highlight: "Consultas complejas, optimización de procedimientos almacenados e integridad de datos.",
          },
          {
            id: "devops",
            title: "Herramientas, Cloud & Producción",
            icon: <Terminal className="w-4 h-4 text-purple-400" />,
            colSpan: "lg:col-span-6",
            items: [
              "Git & GitHub (Flujos Colaborativos)",
              "Docker (Contenedores)",
              "Postman (Pruebas de API)",
              "Linux / Bash",
              "Windows Server (Producción)",
              "Azure Fundamentals",
            ],
            highlight: "Control de versiones, pruebas de integración y soporte a despliegues en servidores productivos.",
          },
          {
            id: "security",
            title: "Redes, Ciberseguridad & IA",
            icon: <ShieldCheck className="w-4 h-4 text-blue-400" />,
            colSpan: "lg:col-span-6",
            items: [
              "Cisco CCNA (TCP/IP & Redes)",
              "Fundamentos de Ciberseguridad (Google & Cisco)",
              "English For IT (Cisco)",
              "Resolución de Problemas (UC Irvine)",
              "Integración de Modelos de IA & Clustering",
            ],
            highlight: "Respaldo en seguridad informática, arquitectura de red y resolución metódica de problemas.",
          },
        ]
      : [
          {
            id: "languages",
            title: "Programming Languages",
            icon: <Code2 className="w-4 h-4 text-cyan-400" />,
            colSpan: "lg:col-span-6",
            items: ["Python", "C#", "TypeScript", "JavaScript (ES6+)"],
            highlight: "Multi-paradigm development: object-oriented, strictly typed, and algorithmic logic.",
          },
          {
            id: "frontend",
            title: "Frontend & Web Engineering",
            icon: <Layout className="w-4 h-4 text-cyan-400" />,
            colSpan: "lg:col-span-6",
            items: [
              "React",
              "Next.js (App Router)",
              "Tailwind CSS",
              "GSAP Animations",
              "Semantic HTML5 & CSS3",
            ],
            highlight: "Modern, responsive, mobile-first interfaces optimized for speed and UX.",
          },
          {
            id: "backend",
            title: "Backend & API Architecture",
            icon: <Server className="w-4 h-4 text-emerald-400" />,
            colSpan: "lg:col-span-6",
            items: [
              ".NET (Blazor / ASP.NET)",
              "Python (FastAPI)",
              "Node.js",
              "RESTful APIs",
              "Strapi CMS",
              "Clean & Modular Architecture",
            ],
            highlight: "High-availability services, clean layer separation, and resilient backend integrations.",
          },
          {
            id: "databases",
            title: "Databases & Storage",
            icon: <Database className="w-4 h-4 text-amber-400" />,
            colSpan: "lg:col-span-6",
            items: [
              "SQL Server (Stored Procedures)",
              "PostgreSQL",
              "Prisma ORM",
              "Entity Framework Core",
              "Relational Data Modeling",
            ],
            highlight: "Query tuning, stored procedure optimization, and relational data integrity.",
          },
          {
            id: "devops",
            title: "Tooling, Cloud & Production",
            icon: <Terminal className="w-4 h-4 text-purple-400" />,
            colSpan: "lg:col-span-6",
            items: [
              "Git & GitHub (Collaborative Workflows)",
              "Docker (Containers)",
              "Postman (API Testing)",
              "Linux / Bash",
              "Windows Server (Production Releases)",
              "Azure Fundamentals",
            ],
            highlight: "Version control, API testing, containerization, and production server support.",
          },
          {
            id: "security",
            title: "Networking, Security & AI",
            icon: <ShieldCheck className="w-4 h-4 text-blue-400" />,
            colSpan: "lg:col-span-6",
            items: [
              "Cisco CCNA (TCP/IP & Networking)",
              "Cybersecurity Foundations (Google & Cisco)",
              "English For IT (Cisco)",
              "Problem Solving & Decision Making (UC Irvine)",
              "AI Model Integration & Clustering",
            ],
            highlight: "Grounded in network architecture, software security, and systematic decision making.",
          },
        ];

  // GSAP Entrance reveal on scroll
  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      gsap.from(".skill-header-anim", {
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

      gsap.from(".skill-category-card", {
        scrollTrigger: {
          trigger: ".skill-grid-container",
          start: "top 75%",
          toggleActions: "play none none none",
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="skills"
      className="relative w-full py-16 sm:py-24 lg:py-32 bg-[#050b14] border-t border-zinc-900/80 overflow-hidden"
    >
      {/* Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
        <div className="w-[950px] h-[950px] rounded-full bg-gradient-to-tr from-cyan-950/20 via-purple-950/15 to-transparent blur-[160px] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 lg:space-y-16">
        {/* =========================================================================
            1. SECTION HEADER
           ========================================================================= */}
        <div className="max-w-3xl space-y-4 mx-auto text-center">
          <div className="skill-header-anim inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-cyan-400 tracking-wider uppercase shadow-[0_0_15px_rgba(34,211,238,0.1)]">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              {locale === "es"
                ? "04. Versatilidad Técnica & Toolkit Comercial"
                : "04. Technical Range & Production Toolkit"}
            </span>
          </div>

          <h2 className="skill-header-anim text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            {locale === "es" ? (
              <>
                Ingeniería versátil respaldada por{" "}
                <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 drop-shadow-sm">
                  experiencia en producción y certificaciones.
                </span>
              </>
            ) : (
              <>
                Versatile software engineering backed by{" "}
                <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 drop-shadow-sm">
                  production background & industry credentials.
                </span>
              </>
            )}
          </h2>

          <p className="skill-header-anim text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            {locale === "es"
              ? "Mi propuesta como Software Engineer se basa en la capacidad de comprender problemas, adaptar tecnologías y construir soluciones escalables. No dependo de un solo framework: domino capas frontend, backend, bases de datos y seguridad."
              : "My value as a Software Engineer is analyzing complex requirements, picking the right stack, and adapting quickly. I don't rely on a single tool—I bridge frontend, backend, databases, infrastructure, and security."}
          </p>
        </div>

        {/* =========================================================================
            2. COMMERCIAL VALUE PROPOSITION PILLARS (Selling Profile in 5 Seconds)
           ========================================================================= */}
        <div className="skill-header-anim grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {/* Pillar 1: Formación UTP & SENA */}
          <div className="p-4 rounded-xl bg-[#09111c] border border-zinc-800 space-y-2 shadow-md hover:border-cyan-500/40 transition-colors">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>{locale === "es" ? "Formación Académica" : "Academic Base"}</span>
            </div>
            <p className="text-xs text-zinc-300 font-medium leading-snug">
              {locale === "es"
                ? "Ingeniería de Sistemas (UTP) + Técnico en Software (SENA)."
                : "B.S. Systems Eng (UTP) + Software Associate (SENA)."}
            </p>
          </div>

          {/* Pillar 2: Producción Empresarial */}
          <div className="p-4 rounded-xl bg-[#09111c] border border-zinc-800 space-y-2 shadow-md hover:border-emerald-500/40 transition-colors">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>{locale === "es" ? "Software Real" : "Production Reality"}</span>
            </div>
            <p className="text-xs text-zinc-300 font-medium leading-snug">
              {locale === "es"
                ? "Experiencia en producción empresariales (.NET, Blazor, SQL Server)."
                : "Production software experience (.NET, Blazor, SQL Server)."}
            </p>
          </div>

          {/* Pillar 3: Certificaciones Meta/Google/Cisco */}
          <div className="p-4 rounded-xl bg-[#09111c] border border-zinc-800 space-y-2 shadow-md hover:border-amber-500/40 transition-colors">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase">
              <Award className="w-4 h-4 text-amber-400" />
              <span>{locale === "es" ? "Certificaciones" : "Industry Credentials"}</span>
            </div>
            <p className="text-xs text-zinc-300 font-medium leading-snug">
              {locale === "es"
                ? "Respaldo en Python, Git, Ciberseguridad (Meta, Google, Cisco)."
                : "Certified in Python, Git & Cybersecurity (Meta, Google, Cisco)."}
            </p>
          </div>

          {/* Pillar 4: Bilingüe B1-B2 */}
          <div className="p-4 rounded-xl bg-[#09111c] border border-zinc-800 space-y-2 shadow-md hover:border-purple-500/40 transition-colors">
            <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold uppercase">
              <Globe2 className="w-4 h-4 text-purple-400" />
              <span>{locale === "es" ? "Inglés Bilingüe" : "Global Readyness"}</span>
            </div>
            <p className="text-xs text-zinc-300 font-medium leading-snug">
              {locale === "es"
                ? "Español Nativo · Inglés B1-B2 Conversacional & IT."
                : "Native Spanish · Conversational English (B1-B2) & English for IT."}
            </p>
          </div>
        </div>

        {/* =========================================================================
            3. DYNAMIC 6-CATEGORY SKILLS MATRIX (100% Real HV Data)
           ========================================================================= */}
        <div className="skill-grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`${cat.colSpan} rounded-2xl border border-zinc-700/80 bg-[#09111c]/95 backdrop-blur-2xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col justify-between overflow-hidden group hover:border-zinc-500/80 transition-all duration-300`}
            >
              {/* Top ambient glow line on hover */}
              <div className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="space-y-5">
                {/* Category Header */}
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 group-hover:border-cyan-500/40 transition-colors">
                      {cat.icon}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {cat.title}
                    </h3>
                  </div>

                  <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
                    {cat.items.length} {locale === "es" ? "herramientas" : "skills"}
                  </span>
                </div>

                {/* Skill Badges with Official Brand Logos */}
                <div className="flex flex-wrap gap-2.5 pt-1">
                  {cat.items.map((item, iIdx) => (
                    <TechBadge key={iIdx} tech={item} size="md" />
                  ))}
                </div>
              </div>

              {/* Category Highlight / Real HV Context */}
              <div className="pt-4 mt-6 border-t border-zinc-800/60 flex items-start gap-2 text-[11px] font-mono text-zinc-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{cat.highlight}</span>
              </div>
            </div>
          ))}
        </div>

        {/* =========================================================================
            4. BOTTOM ACTION LINK TO CERTIFICATIONS
           ========================================================================= */}
        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between border-t border-zinc-800/80 text-xs text-zinc-500 font-mono gap-4">
          <span>
            {locale === "es"
              ? "RESPALDADO POR CERTIFICACIONES DE CISCO, GOOGLE & META"
              : "BACKED BY CISCO, GOOGLE & META CERTIFICATIONS"}
          </span>
          <a
            href="#certifications"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-cyan-400 hover:text-cyan-300 hover:bg-zinc-800 font-sans font-semibold transition-all group shadow-sm shadow-cyan-950/20"
          >
            <span>
              {locale === "es"
                ? "Explorar certificaciones y títulos oficiales"
                : "Explore credentials & certifications"}
            </span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
