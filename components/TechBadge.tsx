"use client";

import React, { useState } from "react";
import { Database, Cloud, Server, TerminalSquare, ShieldCheck, Code2 } from "lucide-react";

export function getTechIconInfo(tech: string) {
  const norm = tech.toLowerCase().trim();
  if (norm.includes("next")) return { slug: "nextdotjs", color: "ffffff" };
  if (norm.includes("react")) return { slug: "react", color: "61DAFB" };
  if (norm.includes("typescript")) return { slug: "typescript", color: "3178C6" };
  if (norm.includes("javascript")) return { slug: "javascript", color: "F7DF1E" };
  if (norm.includes("python")) return { slug: "python", color: "3776AB" };
  if (norm.includes("fastapi")) return { slug: "fastapi", color: "009688" };
  if (norm.includes("postgres")) return { slug: "postgresql", color: "4169E1" };
  if (norm.includes(".net") || norm.includes("c#") || norm.includes("asp.net")) return { slug: "dotnet", color: "512BD4" };
  if (norm.includes("tailwind")) return { slug: "tailwindcss", color: "06B6D4" };
  if (norm.includes("strapi")) return { slug: "strapi", color: "4945FF" };
  if (norm.includes("prisma")) return { slug: "prisma", color: "3982CE" };
  if (norm.includes("gsap") || norm.includes("greensock")) return { slug: "greensock", color: "88CE02" };
  if (norm.includes("docker")) return { slug: "docker", color: "2496ED" };
  if (norm.includes("git")) return { slug: "git", color: "F05032" };
  if (norm.includes("blazor")) return { slug: "blazor", color: "512BD4" };
  if (norm.includes("sql server") || norm.includes("stored procedures")) return { slug: "microsoftsqlserver", color: "CC292B", fallback: "database" };
  if (norm.includes("pytest")) return { slug: "pytest", color: "0A9EDC" };
  if (norm.includes("linux") || norm.includes("bash")) return { slug: "linux", color: "FCC624", fallback: "terminal" };
  if (norm.includes("cisco") || norm.includes("ccna")) return { slug: "cisco", color: "1BA0D7", fallback: "shield" };
  if (norm.includes("azure")) return { slug: "microsoftazure", color: "0078D4", fallback: "cloud" };
  if (norm.includes("html")) return { slug: "html5", color: "E34F26" };
  if (norm.includes("css")) return { slug: "css3", color: "1572B6" };
  if (norm.includes("node")) return { slug: "nodedotjs", color: "5FA04E" };
  if (norm.includes("postman")) return { slug: "postman", color: "FF6C37" };
  if (norm.includes("windows server")) return { slug: "windows", color: "0078D6", fallback: "server" };
  if (norm.includes("meta")) return { slug: "meta", color: "0467DF" };
  if (norm.includes("google")) return { slug: "google", color: "4285F4" };
  if (norm.includes("entity framework")) return { slug: "dotnet", color: "512BD4" };
  if (norm.includes("ai") || norm.includes("ia") || norm.includes("embeddings")) return { slug: "openai", color: "412991" };
  return { slug: null, color: "22D3EE", fallback: "code" };
}

export function TechBadge({
  tech,
  size = "sm",
}: {
  tech: string;
  size?: "sm" | "md";
}) {
  const [hasError, setHasError] = useState(false);
  const info = getTechIconInfo(tech);
  const iconUrl = info.slug && !hasError ? `https://cdn.simpleicons.org/${info.slug}/${info.color}` : null;

  const renderFallback = () => {
    const props = { className: "w-3.5 h-3.5 shrink-0 text-cyan-400" };
    switch (info.fallback) {
      case "database": return <Database {...props} />;
      case "cloud": return <Cloud {...props} />;
      case "server": return <Server {...props} />;
      case "terminal": return <TerminalSquare {...props} />;
      case "shield": return <ShieldCheck {...props} />;
      default: return <Code2 {...props} />;
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg bg-[#070d18] border border-zinc-800 text-zinc-200 font-mono shadow-sm transition-all duration-200 hover:border-cyan-500/50 hover:text-cyan-300 hover:shadow-cyan-950/20 ${size === "md" ? "px-3 py-1.5 text-xs font-semibold" : "px-2.5 py-1 text-[11px]"
        }`}
    >
      {iconUrl ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={iconUrl}
          alt={tech}
          className="w-3.5 h-3.5 object-contain shrink-0"
          onError={() => setHasError(true)}
        />
      ) : (
        renderFallback()
      )}
      <span>{tech}</span>
    </span>
  );
}
