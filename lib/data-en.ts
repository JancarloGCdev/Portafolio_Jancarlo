import type { DevProject, ExperienceEntry, SecurityLab, TourStep, CertificationRecord } from "@/lib/data";
import { QUICK_LINKS } from "@/lib/data";

const SI = (slug: string, color: string) => `https://cdn.simpleicons.org/${slug}/${color}`;

export const PROFILE = {
  name: "Jancarlo Gallón Cano",
  role: "Full-stack development · .NET/C# and Blazor Server · React/Next.js projects · networking and cybersecurity",
  location: "Pereira, Colombia · open to remote work",
  status: "Open to new roles",
  focus: "Reliable releases · actionable risk visibility · clear communication · CCNA/cyber coursework · English at B2",
} as const;

export const DEFAULT_ABOUT_PARAGRAPHS_EN = [
  "I’m a Full Stack Developer based in Pereira, Colombia, building and sustaining enterprise-grade apps in production with .NET (C#) and Blazor Server. I’ve optimized core business modules, closed technical and functional tickets, improved performance via SQL Server queries and stored procedures, and supported deployments on Windows Server.",
  "I complement that work with modern web projects using React and Next.js, REST APIs, Git/GitHub, and tooling like Docker and Postman, so I adapt quickly across different delivery contexts.",
  "Right now I’m deepening networking and cybersecurity through training paths such as CCNA and computer security fundamentals. I speak conversational English around B2 and keep growing through self-directed study.",
] as const;

/** Bloque de perfil sobre el mapa · retrato en `public/profile.avif` o ajusta avatarSrc. */
export const PROFILE_CONSOLE = {
  avatarSrc: "/profile.avif",
  initials: "JG",
  windowTag: "Profile · Jancarlo Gallón",
  lines: [
    { kind: "comment" as const, text: "# Executive snapshot · quick scan." },
    { kind: "cmd" as const, text: "profile --summary" },
    {
      kind: "out" as const,
      text: `${PROFILE.name} · ${PROFILE.role}`,
    },
    { kind: "cmd" as const, text: "about --extended" },
    { kind: "out" as const, text: DEFAULT_ABOUT_PARAGRAPHS_EN[0] },
    { kind: "out" as const, text: DEFAULT_ABOUT_PARAGRAPHS_EN[1] },
    { kind: "out" as const, text: DEFAULT_ABOUT_PARAGRAPHS_EN[2] },
    { kind: "cmd" as const, text: "availability" },
    { kind: "out" as const, text: `${PROFILE.status} · ${PROFILE.location}` },
    { kind: "comment" as const, text: "# The map below groups each topic—open nodes for detail and outbound links." },
  ],
};

export const EXPERIENCES: ExperienceEntry[] = [
  {
    company: "Outsourcing S.A.S. BIC",
    role: "Full Stack .NET Developer (Blazor / ASP.NET)",
    location: "Bogotá D.C., Colombia",
    period: "Jun 2025 – Dec 2025",
    summary:
      "Full stack .NET delivery on production enterprise apps—triage, feature work, SQL Server performance, and disciplined Windows Server deployment support.",
    bullets: [
      "Owned technical and functional support tickets for business-critical apps, keeping production stable and response times predictable.",
      "Built, maintained, and tuned Blazor Server (C#) modules—strengthening domain logic, shipping fixes, and reducing recurring defects.",
      "Designed and shipped new functional modules mapped to client requirements and the product roadmap.",
      "Tuned SQL Server queries and stored procedures; partnered on production releases and foundational Windows Server administration.",
    ],
    modalTakeaways: [
      "Production triage moves faster when reproduction steps and context travel with the ticket.",
      "Two lines of post-deploy notes usually prevent the same incident from reopening immediately.",
    ],
    stack: ["Blazor Server", "C#", ".NET", "SQL Server", "Windows Server"],
    insightsHeading: "Production etiquette",
    securityConsiderations: [
      "Communicate freezes before downstream changes · keep production credentials narrowly scoped.",
    ],
  },
];

export const DEV_PROJECTS: DevProject[] = [
  {
    id: "techos-rentables",
    name: "TechosRentables",
    type: "Web panel to monitor photovoltaic deployments (heavy cross-team sprint)",
    image: "/projects/github-wordmark.avif",
    features: ["KPI tiles, alerting, downloadable PDF summaries"],
    stack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Tailwind"],
    learned:
      "Practiced compressing noisy operations metrics into dashboards teams can rely on minute-to-minute.",
    links: [
      {
        label: "View on GitHub",
        href: "https://github.com/JancarloGCdev/TechosRentables-Proyecto",
        variant: "github",
      },
    ],
  },
  {
    id: "papertrail-v2",
    name: "PaperTrail v2",
    type: "Bookstore storefront with omni‑channel ecommerce flows",
    image: "/projects/github-wordmark.avif",
    features: ["Catalog search, carts, checkout, and payment integrations", "Shopper/admin roles scoped to sensible permissions"],
    stack: ["TypeScript", "JavaScript", "REST API", "Git"],
    learned:
      "Saw firsthand how storefronts knit server data, clear merchandising UX, and least-privilege IAM together.",
    links: [
      {
        label: "View on GitHub",
        href: "https://github.com/JancarloGCdev/papertrailv2",
        variant: "github",
      },
    ],
  }
];

export const SECURITY_LABS: SecurityLab[] = [
  {
    id: "wazuh-siem",
    name: "Wazuh SIEM visibility lab",
    image: "/labs/wazuh.avif",
    description: [
      "Wazuh deployed as my mini SOC anchor",
      "Structured review of workstation/server logs",
      "Escalating repeat abuse attempts with shared context panels",
      "Simple dashboards showcasing lab health snapshots",
    ],
    status: "In progress",
    ongoing: true,
    learned:
      "Learned how to normalize noisy telemetry, prioritize it, and keep evidence that backs each suspicion narrative.",
  },
  {
    id: "python-log-analyzer",
    name: "Python log analyzer prototype",
    description: [
      "Parses heterogeneous log dumps and bubbles interesting patterns",
      "Exports summarized findings into CSV or JSON for async review",
    ],
    learned:
      "Repeated how automation saves tedious parsing loops while handing stakeholders portable artifacts.",
  },
  {
    id: "enterprise-network-security",
    name: "Segmented enterprise LAN (study model)",
    description: [
      "Baseline VLAN-style segmentation managed over SSH workflows",
      "Countermeasures sketching against spoofed traffic and rogue devices",
      "Physical/logical hardening knobs for switches",
      "Blueprint modeled Packet Tracer to rehearse troubleshooting",
    ],
    learned:
      "Framed networking as cascading trust tiers so failures stay isolated instead of cascading everywhere.",
  },
];

export const CERTIFICATIONS: CertificationRecord[] = [
  {
    sortDate: "2026-05-05",
    logoSrc: SI("cisco", "1BA0D7"),
    logoAlt: "Cisco",
    title: "English for IT 1",
    caption: "Cisco Networking Academy · May 2026",
  },
  {
    sortDate: "2025-03-31",
    logoSrc: SI("meta", "0668E1"),
    logoAlt: "Meta",
    title: "Introduction to Back-End Development",
    caption: "Meta · Coursera · Jan 2025 – Mar 2025",
  },
  {
    sortDate: "2025-03-31",
    logoSrc: SI("meta", "0668E1"),
    logoAlt: "Meta",
    title: "Introduction to Front-End Development",
    caption: "Meta · Coursera · Jan 2025 – Mar 2025",
  },
  {
    sortDate: "2025-03-31",
    logoSrc: SI("meta", "0668E1"),
    logoAlt: "Meta",
    title: "Version Control with Git",
    caption: "Meta · Coursera · Jan 2025 – Mar 2025",
  },
  {
    sortDate: "2025-03-31",
    logoSrc: SI("meta", "0668E1"),
    logoAlt: "Meta",
    title: "Programming with JavaScript",
    caption: "Meta · Coursera · Jan 2025 – Mar 2025",
  },
  {
    sortDate: "2025-03-31",
    logoSrc: SI("meta", "0668E1"),
    logoAlt: "Meta",
    title: "Programming with Python",
    caption: "Meta · Coursera · Jan 2025 – Mar 2025",
  },
  {
    sortDate: "2025-02-28",
    logoSrc: "/certifications/uci-merage.svg",
    logoAlt: "UC Irvine · The Paul Merage School of Business",
    title: "Problem Solving and Decision Making",
    caption: "UC Irvine · Merage · Feb 2025",
  },
  {
    sortDate: "2025-01-31",
    logoSrc: SI("google", "4285F4"),
    logoAlt: "Google",
    title: "Foundations of Cybersecurity",
    caption: "Google · Coursera · Jan 2025",
  },
  {
    sortDate: "2024-11-30",
    logoSrc: SI("cisco", "1BA0D7"),
    logoAlt: "Cisco",
    title: "CCNA: Introduction to Networks",
    caption: "Cisco Networking Academy · Nov 2024",
  },
  {
    sortDate: "2026-05-10",
    logoSrc: SI("cisco", "1BA0D7"),
    logoAlt: "Cisco",
    title: "Introduction to Cybersecurity",
    caption: "Cisco Networking Academy · may 2026",
  },
];

export const SKILL_MODULES = [
  {
    title: "Development",
    items: ["C#, Blazor Server, .NET", "Next.js, React", "TypeScript, JavaScript", "SQL Server, PostgreSQL"],
  },
  {
    title: "Cybersecurity",
    items: [
      "Routing/switching familiarity",
      "Practical Linux hardening instincts",
      "Introductory SIEM and centralized telemetry",
      "Comfort triaging sprawling logs quickly",
    ],
  },
  {
    title: "Tooling",
    items: ["Git/GitHub", "Postman", "Docker fundamentals"],
  },
] as const;

export const CONTACT = {
  headline: "Software that stays observable, secure by default, and maintainable over time.",
  sub: "I don’t expose a downloadable résumé to the open web: handing out a personal dossier PDF to strangers raises fraud and impersonation risks. If you’d like to work together, message me on LinkedIn with concise context—role, company, stack—and we can take it from there through a deliberate, safer channel.",
  links: [
    {
      label: "LinkedIn",
      href: QUICK_LINKS.linkedin,
      variant: "linkedin" as const,
    },
    {
      label: "GitHub",
      href: QUICK_LINKS.github,
      variant: "github" as const,
    },
  ],
};


export const GUIDED_TOUR_STEPS: TourStep[] = [
  {
    nodeId: "core",
    logMessage: "Tour · Profile hub & reading the mesh",
  },
  {
    nodeId: "projects",
    logMessage: "Tour · Published builds and deliveries",
  },
  {
    nodeId: "security-labs",
    anchorId: "python-log-analyzer",
    logMessage: "Tour · Hands-on security labs & log practice",
  },
  {
    nodeId: "experience",
    logMessage: "Tour · Collaboration context story",
  },
  {
    nodeId: "certifications",
    logMessage: "Tour · Credentialed learning stack",
  },
  {
    nodeId: "skills",
    logMessage: "Tour · Stacks and habitual tooling",
  },
  {
    nodeId: "contact",
    logMessage: "Tour · Outreach channels · next beats",
  },
];
