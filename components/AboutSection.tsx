"use client";

import React, { useRef, useState } from "react";
import { usePortfolio } from "@/components/portfolio-locale-provider";
import { 
  Code2, 
  Layers, 
  Server, 
  Database, 
  Cloud, 
  ShieldCheck, 
  Network, 
  Cpu, 
  Zap, 
  CheckCircle2, 
  Workflow, 
  Boxes, 
  ArrowRight
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type CapabilityNode = {
  id: string;
  label: string;
  category: string;
  icon: React.ElementType;
  color: string;
  bgGlow: string;
  borderColor: string;
  summaryEs: string;
  summaryEn: string;
  evidence: string;
};

export function AboutSection() {
  const { locale } = usePortfolio();
  const containerRef = useRef<HTMLElement>(null);
  const [activeNode, setActiveNode] = useState<string>("engineering");

  const nodes: CapabilityNode[] = [
    {
      id: "engineering",
      label: locale === "es" ? "Ingeniería de Software" : "Software Engineering",
      category: locale === "es" ? "Núcleo & Metodología" : "Core & Method",
      icon: Code2,
      color: "text-cyan-400",
      bgGlow: "from-cyan-500/20 via-cyan-500/5 to-transparent",
      borderColor: "border-cyan-500/40",
      summaryEs: "Arquitectura modular, código limpio, resolución metódica de problemas y criterio para seleccionar el stack adecuado para cada reto.",
      summaryEn: "Modular architecture, clean code, systematic problem solving, and pragmatic technical decision-making for every challenge.",
      evidence: "UTP Systems Engineering · UC Irvine Decision Making",
    },
    {
      id: "frontend",
      label: "Frontend & Web UX",
      category: locale === "es" ? "Experiencia de Usuario" : "User Experience",
      icon: Layers,
      color: "text-teal-400",
      bgGlow: "from-teal-500/20 via-teal-500/5 to-transparent",
      borderColor: "border-teal-500/40",
      summaryEs: "Interfaces web rápidas, accesibles y reactivas orientadas a la experiencia del usuario final.",
      summaryEn: "High-speed, accessible, and responsive interfaces built for optimal end-user experience.",
      evidence: "Next.js 15 · React 19 · TypeScript · GSAP",
    },
    {
      id: "backend",
      label: "Backend & Business Logic",
      category: locale === "es" ? "Lógica Transaccional" : "Transactional Logic",
      icon: Server,
      color: "text-emerald-400",
      bgGlow: "from-emerald-500/20 via-emerald-500/5 to-transparent",
      borderColor: "border-emerald-500/40",
      summaryEs: "Servicios robustos, diseño de APIs RESTful y lógica de negocio estable en entornos productivos.",
      summaryEn: "Resilient services, clean REST API design, and enterprise-grade business logic in production.",
      evidence: ".NET (C#) · Blazor Server · Python / FastAPI",
    },
    {
      id: "databases",
      label: "Databases & Performance",
      category: locale === "es" ? "Persistencia & Datos" : "Persistence & Data",
      icon: Database,
      color: "text-amber-400",
      bgGlow: "from-amber-500/20 via-amber-500/5 to-transparent",
      borderColor: "border-amber-500/40",
      summaryEs: "Modelado relacional, optimización de consultas complejas y stored procedures de alto rendimiento.",
      summaryEn: "Relational data modeling, complex query tuning, and high-throughput stored procedures.",
      evidence: "SQL Server · PostgreSQL · Prisma ORM · EF Core",
    },
    {
      id: "infrastructure",
      label: "Cloud & DevOps",
      category: locale === "es" ? "Despliegue & Operación" : "Deployment & Ops",
      icon: Cloud,
      color: "text-blue-400",
      bgGlow: "from-blue-500/20 via-blue-500/5 to-transparent",
      borderColor: "border-blue-500/40",
      summaryEs: "Contenedores, automatización de entornos y despliegues estables en servidores empresariales.",
      summaryEn: "Containerization, environment automation, and reliable enterprise production releases.",
      evidence: "Docker · Linux / Bash · Windows Server · Git",
    },
    {
      id: "security",
      label: "Networking & Security",
      category: locale === "es" ? "Infraestructura & Confianza" : "Infra & Trust",
      icon: ShieldCheck,
      color: "text-purple-400",
      bgGlow: "from-purple-500/20 via-purple-500/5 to-transparent",
      borderColor: "border-purple-500/40",
      summaryEs: "Fundamentos sólidos en protocolos de red, principio de menor privilegio y seguridad por diseño.",
      summaryEn: "Solid grasp of TCP/IP networking, least-privilege access, and secure-by-design standards.",
      evidence: "Cisco CCNA · Google Cybersecurity",
    },
  ];

  const activeNodeData = nodes.find((n) => n.id === activeNode) || nodes[0];
  const ActiveIcon = activeNodeData.icon;

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      // 1. Header & Lead Statement reveal
      tl.from(".about-header-anim", {
        y: 22,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
      })
        // 2. Interactive Map / Versatility Canvas reveal
        .from(
          ".about-canvas-anim",
          {
            y: 24,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.4"
        )
        // 3. Pillars / Mindset cards reveal
        .from(
          ".about-mindset-anim",
          {
            y: 18,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
          },
          "-=0.3"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#050b14] border-t border-zinc-900/80"
    >
      {/* Background ambient lighting and subtle circuit grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-cyan-950/20 via-blue-950/10 to-transparent blur-[160px] opacity-70" />
      </div>

      <div className="max-w-7xl w-full mx-auto space-y-12 lg:space-y-16">
        {/* =========================================================================
            1. COMMERCIAL LEAD & STATEMENT (Editorial, High Impact, Low Fluff)
           ========================================================================= */}
        <div className="max-w-4xl space-y-4">
          {/* Eyebrow */}
          <div className="about-header-anim inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-raised border border-zinc-800 text-[11px] font-mono text-cyan-400 tracking-wider uppercase shadow-sm">
            <Workflow className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              {locale === "es" ? "01. Enfoque de Ingeniería & Adaptabilidad" : "01. Engineering Mindset & Adaptability"}
            </span>
          </div>

          {/* Big Editorial Headline */}
          <h2 className="about-header-anim text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            {locale === "es" ? (
              <>
                Más que dominar un stack:{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                  entiendo problemas y construyo soluciones reales.
                </span>
              </>
            ) : (
              <>
                Beyond knowing a specific stack:{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                  I solve real problems and build resilient products.
                </span>
              </>
            )}
          </h2>

          {/* Punchy Supporting Paragraph */}
          <p className="about-header-anim text-base sm:text-lg text-zinc-300 leading-relaxed max-w-3xl">
            {locale === "es"
              ? "Mi formación como Ingeniero de Sistemas y mi experiencia en entornos productivos me permiten moverme con soltura entre frontend, backend, bases de datos e infraestructura. Las tecnologías son herramientas; mi valor radica en adaptarme rápido y asegurar estabilidad en producción."
              : "My Systems Engineering background and production experience allow me to navigate seamlessly across frontend, backend, databases, and infrastructure. Technologies are tools; my true value lies in rapid adaptability and guaranteeing production stability."}
          </p>
        </div>

        {/* =========================================================================
            2. INTERACTIVE VERSATILITY MATRIX (Visual Diagram showing Breadth & Depth)
           ========================================================================= */}
        <div className="about-canvas-anim relative w-full rounded-2xl border border-zinc-800/90 bg-[#070c14]/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl overflow-hidden">
          {/* Subtle background circuit decoration */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* LEFT: Interactive Capability Chips */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Boxes className="w-3.5 h-3.5 text-cyan-400" />
                  {locale === "es" ? "Mapa de Adaptabilidad Técnica" : "Technical Adaptability Map"}
                </span>
                <span className="text-[11px] font-mono text-zinc-500">
                  {locale === "es" ? "Selecciona para inspeccionar" : "Select to inspect"}
                </span>
              </div>

              {/* Grid of 6 interactive pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {nodes.map((node) => {
                  const Icon = node.icon;
                  const isSelected = activeNode === node.id;
                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => setActiveNode(node.id)}
                      onMouseEnter={() => setActiveNode(node.id)}
                      className={`text-left p-3.5 rounded-xl border transition-all duration-300 flex items-center gap-3.5 group relative ${
                        isSelected
                          ? `bg-zinc-900/90 ${node.borderColor} shadow-lg shadow-cyan-950/30 scale-[1.02]`
                          : "bg-zinc-900/40 border-zinc-800/80 hover:bg-zinc-900/70 hover:border-zinc-700"
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          isSelected ? "bg-zinc-800 text-white" : "bg-zinc-900/90 text-zinc-400 group-hover:text-zinc-200"
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isSelected ? node.color : ""}`} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">
                          {node.category}
                        </div>
                        <div className={`text-xs font-bold truncate ${isSelected ? "text-white" : "text-zinc-300"}`}>
                          {node.label}
                        </div>
                      </div>

                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT: Dynamic Insight Inspector (Vercel/Linear card style) */}
            <div className="lg:col-span-5 h-full">
              <div className={`h-full min-h-[220px] p-6 rounded-xl border bg-gradient-to-br ${activeNodeData.bgGlow} to-zinc-950/90 ${activeNodeData.borderColor} flex flex-col justify-between space-y-4 shadow-xl transition-all duration-300`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900/90 border border-zinc-800 text-xs font-mono font-semibold text-white">
                      <ActiveIcon className={`w-3.5 h-3.5 ${activeNodeData.color}`} />
                      {activeNodeData.label}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">
                      SYS // INSPECT
                    </span>
                  </div>

                  <p className="text-sm text-zinc-200 leading-relaxed">
                    {locale === "es" ? activeNodeData.summaryEs : activeNodeData.summaryEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/70 flex flex-col gap-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">
                    {locale === "es" ? "Evidencia & Respaldo:" : "Demonstrated Background:"}
                  </span>
                  <span className="text-xs font-mono font-medium text-cyan-300">
                    {activeNodeData.evidence}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            3. CORE ENGINEERING MINDSET (4 Concrete Value Drivers)
           ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="about-mindset-anim p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 transition-colors space-y-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">
              {locale === "es" ? "Adaptabilidad Rápida" : "Rapid Adaptability"}
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {locale === "es"
                ? "Capacidad probada para integrar nuevas tecnologías y librerías según el requerimiento del negocio."
                : "Proven ability to ramp up and adopt new tools and frameworks aligned with business requirements."}
            </p>
          </div>

          <div className="about-mindset-anim p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 transition-colors space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">
              {locale === "es" ? "Rigor en Producción" : "Production Discipline"}
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {locale === "es"
                ? "Experiencia en resolución metódica de incidentes bajo SLA y releases controlados."
                : "Hands-on experience debugging live production issues under strict SLA deadlines."}
            </p>
          </div>

          <div className="about-mindset-anim p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 transition-colors space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-950/50 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3">
              <Network className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">
              {locale === "es" ? "Visión de Sistema Completo" : "Full-System Vision"}
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {locale === "es"
                ? "Comprensión del flujo integral: desde la UI y las APIs hasta la base de datos y la red."
                : "Grounded understanding of the full path: from UI and APIs to database records and network packets."}
            </p>
          </div>

          <div className="about-mindset-anim p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 transition-colors space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-950/50 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
              <Cpu className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white">
              {locale === "es" ? "Foco en Producto & Valor" : "Product & Value Focus"}
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {locale === "es"
                ? "Código orientado a resolver necesidades de usuarios y clientes, no a complejidad innecesaria."
                : "Software built to deliver direct value to users and stakeholders, avoiding gratuitous complexity."}
            </p>
          </div>
        </div>

        {/* Action Link to Experience/Projects */}
        <div className="pt-2 flex items-center justify-between border-t border-zinc-900 text-xs text-zinc-500 font-mono">
          <span>{locale === "es" ? "EXPERIENCIA & PROYECTOS VERIFICABLES" : "VERIFIABLE TRACK RECORD"}</span>
          <a
            href="#projects"
            className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-sans font-semibold transition-colors group"
          >
            <span>{locale === "es" ? "Ver proyectos en acción" : "See projects in action"}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
