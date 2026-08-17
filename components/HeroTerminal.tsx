"use client";

import React, { useState, useEffect, useRef, useTransition } from "react";
import { usePortfolio } from "@/components/portfolio-locale-provider";
import { Terminal, Sparkles, CornerDownLeft, RotateCcw, CheckCircle2, ShieldCheck, Flame, Cpu, ArrowUpRight, Check } from "lucide-react";

type TerminalHistoryItem = {
  id: string;
  command: string;
  output: React.ReactNode;
  time?: string;
};

export function HeroTerminal() {
  const { locale, profile, devProjects, experiences } = usePortfolio();
  const [history, setHistory] = useState<TerminalHistoryItem[]>([]);
  const [activeCommand, setActiveCommand] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const [, startTransition] = useTransition();

  // Scroll to bottom when history updates
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTo({
        top: terminalBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [history, isTyping]);

  // Initial sequence
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(prefersReduced);



    if (prefersReduced) {
      setHistory([]);
      return;
    }

    // Initialize clear
    setHistory([]);

  }, [locale, profile]);

  const executeCommand = (cmd: string) => {
    if (isTyping) return;

    setActiveCommand(cmd);

    let outputNode: React.ReactNode = null;

    switch (cmd) {
      case "whoami":
        outputNode = (
          <div className="text-zinc-300 text-xs leading-relaxed space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-cyan-400 font-bold text-sm">{profile.name}</span>
              <span className="px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-[10px]">
                Software Engineer · Full Stack · Cyber, AI & Cloud
              </span>
            </div>
            <p className="text-zinc-300 leading-normal">
              {locale === "es"
                ? "Ingeniero de Software y Desarrollador Full Stack con enfoque en Ciberseguridad, Inteligencia Artificial y Cloud. Uno la agilidad y experiencia visual del desarrollo web moderno (Next.js, React, TypeScript) con la solidez y seguridad de arquitecturas empresariales (.NET, Python, SQL)."
                : "Software Engineer and Full Stack Developer with a strong focus on Cybersecurity, Artificial Intelligence, and Cloud. Combining modern web engineering (Next.js, React, TypeScript) with robust, secure enterprise architectures (.NET, Python, SQL)."}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-zinc-400 pt-1.5 border-t border-zinc-800/60">
              <span>📍 {profile.location}</span>
              <span>🗣️ {locale === "es" ? "Español (Nativo) · Inglés (B1-B2)" : "Spanish (Native) · English (B1-B2)"}</span>
              <span className="text-emerald-400 font-medium">✓ {locale === "es" ? "Disponible para contratación inmediata" : "Available for immediate hire"}</span>
            </div>
          </div>
        );
        break;

      case "skills":
        outputNode = (
          <div className="text-xs space-y-2.5">
            <div className="border-l-2 border-cyan-400 pl-2.5">
              <div className="text-cyan-400 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                <span>Frontend & Web Moderno:</span>
              </div>
              <p className="text-zinc-300 text-[11px] mt-0.5">
                React, Next.js (App Router), TypeScript, JavaScript (ES6+), Tailwind CSS, GSAP Animations, UI/UX reactivo y accesible.
              </p>
            </div>

            <div className="border-l-2 border-emerald-400 pl-2.5">
              <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <Cpu className="w-3 h-3" />
                <span>Backend & Arquitectura:</span>
              </div>
              <p className="text-zinc-300 text-[11px] mt-0.5">
                .NET / C#, Blazor Server, ASP.NET Core, Python (FastAPI), Node.js, Diseño e Integración de APIs RESTful, Arquitectura Limpia.
              </p>
            </div>

            <div className="border-l-2 border-amber-400 pl-2.5">
              <div className="text-amber-400 font-semibold">
                Bases de Datos & Rendimiento:
              </div>
              <p className="text-zinc-300 text-[11px] mt-0.5">
                SQL Server (Consultas complejas, Stored Procedures, Tuning), PostgreSQL, Prisma ORM, Entity Framework Core.
              </p>
            </div>

            <div className="border-l-2 border-purple-400 pl-2.5">
              <div className="text-purple-400 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3" />
                <span>DevOps, Cloud & Ciberseguridad:</span>
              </div>
              <p className="text-zinc-300 text-[11px] mt-0.5">
                Docker, Git/GitHub, Linux/Bash, Windows Server (Despliegues en producción), Fundamentos Azure, Cisco CCNA (Redes & TCP/IP), Google Cybersecurity.
              </p>
            </div>
          </div>
        );
        break;

      case "projects":
        outputNode = (
          <div className="text-xs space-y-3">
            <p className="text-zinc-400 text-[11px] font-mono">
              {locale === "es"
                ? `${devProjects.length} proyectos · arquitectura probada, código limpio y foco en resolver problemas de negocio:`
                : `${devProjects.length} projects · proven architecture, clean code, and business problem-solving:`}
            </p>
            <div className="grid grid-cols-1 gap-2">
              {devProjects.map((proj, pIdx) => (
                <div
                  key={proj.id}
                  className="border border-zinc-800/80 rounded-lg bg-zinc-900/40 p-3 space-y-1.5 hover:border-zinc-700 transition-colors"
                >
                  {/* Header row */}
                  <div className="flex flex-wrap items-start justify-between gap-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono text-zinc-600">
                        {String(pIdx + 1).padStart(2, "0")}.
                      </span>
                      <span className="text-emerald-400 font-bold text-xs">{proj.name}</span>
                    </div>
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-400 hover:underline inline-flex items-center gap-0.5 text-[10px] font-mono shrink-0"
                      >
                        Demo <ArrowUpRight className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                  {/* Type + tagline */}
                  <div className="text-[10px] font-mono text-cyan-400/70">{proj.type}</div>
                  <div className="text-[11px] text-zinc-300 leading-snug">{proj.tagline}</div>
                  {/* Stack pills */}
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {proj.stack.slice(0, 4).map((s, i) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.5 text-[10px] rounded bg-zinc-950 text-zinc-400 border border-zinc-800 font-mono"
                      >
                        {s}
                      </span>
                    ))}
                    {proj.stack.length > 4 && (
                      <span className="text-[10px] text-zinc-600 font-mono py-0.5">
                        +{proj.stack.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-zinc-500 font-mono pt-1">
              {locale === "es"
                ? "→ Ver sección completa de proyectos para mockups y detalles técnicos."
                : "→ See the full projects section for mockups and technical deep dives."}
            </p>
          </div>
        );
        break;


      case "experience":
        outputNode = (
          <div className="text-xs space-y-2.5">
            {experiences.map((exp, idx) => (
              <div key={idx} className="border-l-2 border-cyan-500/60 pl-3 py-1.5 bg-zinc-900/40 rounded-r space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <span className="text-cyan-300 font-bold text-xs">{exp.role}</span>
                  <span className="text-zinc-400 text-[11px] font-mono">{exp.period}</span>
                </div>
                <div className="text-emerald-400 font-medium text-xs">{exp.company} — {exp.location}</div>
                <p className="text-zinc-300 text-[11px] leading-relaxed">{exp.summary}</p>
                <ul className="mt-1.5 space-y-1 text-[11px] text-zinc-400">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-1.5 leading-normal">
                      <span className="text-cyan-400 font-bold text-[10px]">✓</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1 mt-2">
                  {exp.stack.map((s, i) => (
                    <span key={i} className="px-1.5 py-0.5 text-[10px] rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "education":
        outputNode = (
          <div className="text-xs space-y-2.5 text-zinc-300">
            <div className="border-l-2 border-purple-500/60 pl-3 py-1 bg-zinc-900/40 rounded-r">
              <div className="text-purple-300 font-bold text-xs">
                {locale === "es" ? "Ingeniería de Sistemas y Computación" : "B.S. in Systems and Computer Engineering"}
              </div>
              <div className="text-zinc-400 text-[11px]">Universidad Tecnológica de Pereira · 2021 – 2026</div>
              <p className="text-zinc-400 text-[11px] mt-0.5 leading-normal">
                {locale === "es"
                  ? "Formación en algoritmos avanzados, estructuras de datos, arquitectura de software, bases de datos relacionales, redes e ingeniería web."
                  : "Core focus on advanced algorithms, data structures, software architecture, relational databases, networking, and web engineering."}
              </p>
            </div>

            <div className="border-l-2 border-purple-500/60 pl-3 py-1 bg-zinc-900/40 rounded-r">
              <div className="text-purple-300 font-bold text-xs">
                {locale === "es" ? "Técnico en Desarrollo de Software" : "Associate Degree in Software Development"}
              </div>
              <div className="text-zinc-400 text-[11px]">Servicio Nacional de Aprendizaje (SENA) · 2019 – 2020</div>
            </div>

            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800 text-[11px] space-y-1.5">
              <span className="text-cyan-400 font-semibold block">Certificaciones Verificables:</span>
              <ul className="space-y-1 text-zinc-300">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span><strong>Cisco Networking Academy:</strong> CCNA (Introduction to Networks) & English for IT 1</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span><strong>Google (Coursera):</strong> Fundamentos de la Ciberseguridad</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span><strong>Meta (Coursera):</strong> Python, JavaScript, Back-End & Front-End</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span><strong>UC Irvine (Merage):</strong> Resolución de problemas y toma de decisiones</span>
                </li>
              </ul>
            </div>
          </div>
        );
        break;

      case "why-me":
      case "value":
        outputNode = (
          <div className="text-xs space-y-2 text-zinc-300 p-3 rounded bg-cyan-950/20 border border-cyan-500/30">
            <div className="text-cyan-300 font-bold text-xs flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>{locale === "es" ? "¿Por qué contratar a Jancarlo?" : "Why hire Jancarlo?"}</span>
            </div>
            <ul className="space-y-2 text-[11px] text-zinc-300">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold">1.</span>
                <span>
                  <strong className="text-emerald-400">Experiencia en Producción Real:</strong> Mantenimiento y evolución de aplicaciones empresariales bajo SLA con .NET y SQL Server.
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-cyan-400 font-bold">2.</span>
                <span>
                  <strong className="text-cyan-400">Dominio Full Stack Completo:</strong> Desde interfaces dinámicas y modernas en Next.js/React hasta arquitecturas de API y bases de datos robustas.
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-purple-400 font-bold">3.</span>
                <span>
                  <strong className="text-purple-400">Disciplina de Ingeniería & Seguridad:</strong> Formación rigurosa en redes (CCNA), principios de ciberseguridad y código limpio.
                </span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-amber-400 font-bold">4.</span>
                <span>
                  <strong className="text-amber-400">Capacidad Analítica y Comunicación:</strong> Pensamiento crítico metódico (UC Irvine) e inglés conversacional (B1-B2) para colaborar con equipos globales.
                </span>
              </li>
            </ul>
          </div>
        );
        break;

      case "contact":
        outputNode = (
          <div className="text-xs space-y-2 text-zinc-300">
            <p className="text-zinc-400 text-[11px]">
              {locale === "es" ? "Canales directos para coordinar entrevistas o proyectos:" : "Direct channels to schedule interviews or projects:"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 rounded bg-zinc-900 border border-zinc-800">
                <span className="text-cyan-400 font-medium block text-[10px]">EMAIL:</span>
                <a href="mailto:jancarlogallonc@gmail.com" className="text-zinc-200 hover:text-cyan-300 hover:underline font-mono">
                  jancarlogallonc@gmail.com
                </a>
              </div>
              <div className="p-2.5 rounded bg-zinc-900 border border-zinc-800">
                <span className="text-cyan-400 font-medium block text-[10px]">LINKEDIN:</span>
                <a href="https://www.linkedin.com/in/jancarlo-gc" target="_blank" rel="noreferrer" className="text-zinc-200 hover:text-cyan-300 hover:underline truncate block font-mono">
                  linkedin.com/in/jancarlo-gc
                </a>
              </div>
              <div className="p-2.5 rounded bg-zinc-900 border border-zinc-800">
                <span className="text-cyan-400 font-medium block text-[10px]">GITHUB:</span>
                <a href="https://github.com/JancarloGCdev" target="_blank" rel="noreferrer" className="text-zinc-200 hover:text-cyan-300 hover:underline truncate block font-mono">
                  github.com/JancarloGCdev
                </a>
              </div>
              <div className="p-2.5 rounded bg-zinc-900 border border-zinc-800">
                <span className="text-cyan-400 font-medium block text-[10px]">UBICACIÓN:</span>
                <span className="text-zinc-300 block font-mono">Pereira, Risaralda, CO (Remoto / Híbrido)</span>
              </div>
            </div>
          </div>
        );
        break;

      default:
        outputNode = <span className="text-rose-400 text-xs">Comando no reconocido. Prueba los botones sugeridos abajo.</span>;
    }

    const newItem: TerminalHistoryItem = {
      id: `cmd-${Date.now()}`,
      command: cmd,
      output: outputNode,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    if (reducedMotion) {
      setHistory((prev) => [...prev, newItem]);
      setActiveCommand("");
      return;
    }

    setIsTyping(true);
    setTimeout(() => {
      startTransition(() => {
        setHistory((prev) => [...prev, newItem]);
        setIsTyping(false);
        setActiveCommand("");
      });
    }, 180);
  };

  const handleClear = () => {
    setHistory([]);
  };

  const quickCommands = [
    { label: "whoami", cmd: "whoami" },
    { label: "skills", cmd: "skills" },
    { label: "projects", cmd: "projects" },
    { label: "experience", cmd: "experience" },
    { label: "education", cmd: "education" },
    { label: "why-me", cmd: "why-me" },
    { label: "contact", cmd: "contact" },
  ];

  return (
    <div className="w-full rounded-xl border border-zinc-800/90 bg-[#070c14]/95 backdrop-blur-xl shadow-2xl shadow-cyan-950/20 overflow-hidden flex flex-col font-mono text-sm transition-all duration-300 hover:border-zinc-700/80 group">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#0a121e] border-b border-zinc-800/80 select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block ring-1 ring-rose-500/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block ring-1 ring-amber-500/30" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block ring-1 ring-emerald-500/30" />
          </div>
          <span className="text-[11px] font-medium text-zinc-400 tracking-wide ml-1.5 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-cyan-400/80" />
            jancarlo@dev:~
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-zinc-500">
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px]">
            bash · zsh
          </span>
          <button
            type="button"
            onClick={handleClear}
            className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
            title={locale === "es" ? "Limpiar terminal" : "Clear terminal"}
            aria-label="Clear terminal"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Terminal Content Body */}
      <div
        ref={terminalBodyRef}
        className="p-4 space-y-3.5 overflow-y-auto max-h-[300px] sm:max-h-[340px] soc-scrollbar text-xs leading-relaxed"
      >
        {/* Welcome header banner */}
        <div className="text-zinc-500 text-[11px] pb-1 border-b border-zinc-900 flex items-center justify-between">
          <span>Linux 6.8.0-generic x86_64 · Engineering Session</span>
          <span className="text-emerald-500/80 text-[10px] flex items-center gap-1">
            <CheckCircle2 className="w-2.5 h-2.5" /> Ready
          </span>
        </div>

        {/* History log */}
        {history.map((item) => (
          <div key={item.id} className="space-y-1 animate-fadeIn">
            <div className="flex items-center gap-1.5 text-zinc-400">
              <span className="text-cyan-400 font-semibold select-none">jancarlo@dev:~$</span>
              <span className="text-zinc-200 font-medium">{item.command}</span>
            </div>
            <div className="pl-3 sm:pl-4 border-l border-zinc-800/60 my-1">{item.output}</div>
          </div>
        ))}

        {/* Active Typing Line */}
        {isTyping && (
          <div className="flex items-center gap-1.5 text-zinc-400">
            <span className="text-cyan-400 font-semibold select-none">jancarlo@dev:~$</span>
            <span className="text-zinc-200">{activeCommand}</span>
            <span className="w-2 h-3.5 bg-cyan-400 inline-block animate-pulse" />
          </div>
        )}

        {/* Idle Prompt Cursor */}
        {!isTyping && (
          <div className="flex items-center gap-1.5 text-zinc-400 pt-0.5">
            <span className="text-cyan-400 font-semibold select-none">jancarlo@dev:~$</span>
            {history.length === 0 && (
              <span className="text-cyan-500/80 font-mono text-[11px] italic animate-pulse">
                {locale === "es" ? "Elige una opción..." : "Choose an option..."}
              </span>
            )}
            <span className="w-2 h-3.5 bg-cyan-400/80 inline-block animate-pulse" />
          </div>
        )}
      </div>

      {/* Suggested Command Bar (Mobile friendly touch targets) */}
      <div className="p-2.5 bg-[#09101a] border-t border-zinc-800/80 flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-[10px] text-zinc-500 px-1 font-sans">
          <span className="flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
            {locale === "es" ? "Comandos interactivos sugeridos:" : "Suggested interactive commands:"}
          </span>
          <span className="text-[9px] text-zinc-500 hidden sm:inline">
            {locale === "es" ? "Haz clic para consultar" : "Click to query"}
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 soc-scrollbar">
          {quickCommands.map((qc) => (
            <button
              key={qc.cmd}
              type="button"
              disabled={isTyping}
              onClick={() => executeCommand(qc.cmd)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-zinc-900/90 hover:bg-cyan-950/60 border border-zinc-800 hover:border-cyan-500/40 text-[11px] text-zinc-300 hover:text-cyan-300 transition-all active:scale-95 disabled:opacity-50 whitespace-nowrap shadow-sm"
            >
              <CornerDownLeft className="w-2.5 h-2.5 text-cyan-400/80" />
              <span>{qc.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
