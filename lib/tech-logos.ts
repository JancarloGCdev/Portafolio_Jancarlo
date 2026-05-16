/**
 * Resolver logos: Simple Icons CDN cuando el slug existe, o SVG local si el icono dejó de publicarse en SI.
 * @see https://simpleicons.org/
 */
export type ResolvedTechLogo =
  | { label: string; slug: string }
  | { label: string; assetSrc: string };

const DIRECT = {
  typescript: { slug: "typescript", label: "TypeScript" },
  javascript: { slug: "javascript", label: "JavaScript" },
  react: { slug: "react", label: "React" },
  nextdotjs: { slug: "nextdotjs", label: "Next.js" },
  nodedotjs: { slug: "nodedotjs", label: "Node.js" },
  prisma: { slug: "prisma", label: "Prisma" },
  postgresql: { slug: "postgresql", label: "PostgreSQL" },
  /** El slug `microsoftsqlserver` ya no existe en el CDN de Simple Icons — copia local desde SI v9.x. */
  microsoftsqlserver: { assetSrc: "/tech/microsoft-sql-server.svg", label: "SQL Server" },
  dotnet: { slug: "dotnet", label: ".NET" },
  csharp: { slug: "csharp", label: "C#" },
  blazor: { slug: "blazor", label: "Blazor" },
  tailwindcss: { slug: "tailwindcss", label: "Tailwind CSS" },
  git: { slug: "git", label: "Git" },
  github: { slug: "github", label: "GitHub" },
  docker: { slug: "docker", label: "Docker" },
  postman: { slug: "postman", label: "Postman" },
  microsoftazure: { slug: "microsoftazure", label: "Azure" },
  microsoftwindows: { slug: "microsoftwindows", label: "Windows Server" },
  google: { slug: "google", label: "Google" },
  fortinet: { slug: "fortinet", label: "Fortinet" },
  cisco: { slug: "cisco", label: "Cisco" },
  linux: { slug: "linux", label: "Linux" },
  python: { slug: "python", label: "Python" },
  vite: { slug: "vite", label: "Vite" },
} as const satisfies Record<string, ResolvedTechLogo>;

type LogoKey = keyof typeof DIRECT;

/** Reglas por orden — primera coincidencia gana. */
const RULES: { test: RegExp; tag: LogoKey }[] = [
  { test: /next\.?js/i, tag: "nextdotjs" },
  { test: /\bpostgres(ql)?\b/i, tag: "postgresql" },
  { test: /sql\s*server|\bmssql\b|t-?sql/i, tag: "microsoftsqlserver" },
  { test: /\.net|dotnet/i, tag: "dotnet" },
  { test: /\bc#\b|c\s*sharp/i, tag: "csharp" },
  { test: /blazor/i, tag: "blazor" },
  { test: /typescript|\btsx?\b/i, tag: "typescript" },
  { test: /javascript|\bjsx?\b/i, tag: "javascript" },
  { test: /\breact\b/i, tag: "react" },
  { test: /tailwind/i, tag: "tailwindcss" },
  { test: /\bnode\b(?!\sserver)/i, tag: "nodedotjs" },
  { test: /prisma/i, tag: "prisma" },
  { test: /\bgit\b(?!hub)/i, tag: "git" },
  { test: /github/i, tag: "github" },
  { test: /docker/i, tag: "docker" },
  { test: /postman/i, tag: "postman" },
  { test: /azure\b/i, tag: "microsoftazure" },
  { test: /windows\s*server|microsoft\s*windows/i, tag: "microsoftwindows" },
  { test: /fortinet|^nse\b/i, tag: "fortinet" },
  { test: /\bcisco\b|ccna/i, tag: "cisco" },
  { test: /python/i, tag: "python" },
  { test: /linux/i, tag: "linux" },
  { test: /\bvite\b/i, tag: "vite" },
  { test: /google\s*cloud|^gcp\b/i, tag: "google" },
];

export function techLogoImgSrc(resolved: ResolvedTechLogo): string {
  return "assetSrc" in resolved ? resolved.assetSrc : simpleIconSvgUrl(resolved.slug);
}

export function resolveTechLogo(fragment: string): ResolvedTechLogo | null {
  const raw = fragment.trim();
  if (!raw) return null;

  const key = raw.replace(/\([^)]*\)/g, "").trim();

  const lowerNorm = key
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");

  const stripped = lowerNorm.replace(/[^a-z0-9]+/g, "");
  if (stripped in DIRECT) return DIRECT[stripped as LogoKey];

  for (const { test, tag } of RULES) {
    if (test.test(lowerNorm)) return DIRECT[tag];
  }

  return null;
}

/** Parte etiquetas tipo "A · B · C" de una entrada. */
export function expandStackTokens(entry: string): string[] {
  return entry
    .split(/[,·/|]|(?=\s+V\d)/)
    .map((s) => s.replace(/^[\s\u2013\-]+/, "").trim())
    .filter(Boolean)
    .filter((tok, idx, arr) => arr.indexOf(tok) === idx);
}

/** Une varias líneas del stack del dossier en tokens únicos (orden estable). */
export function flattenStackEntries(entries: readonly string[], maxTokens = 28): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of entries) {
    for (const tok of expandStackTokens(raw)) {
      const k = tok.trim().toLowerCase();
      if (!k || seen.has(k)) continue;
      seen.add(k);
      out.push(tok.trim());
      if (out.length >= maxTokens) return out;
    }
  }
  return out;
}

export function simpleIconSvgUrl(slug: string): string {
  return `https://cdn.simpleicons.org/${slug}`;
}
