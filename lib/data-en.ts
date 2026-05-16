import type { DevProject, SecurityLab, TourStep } from "@/lib/data";
import { QUICK_LINKS } from "@/lib/data";

export const PROFILE = {
  name: "Jancarlo Gallón Cano",
  role: "Full-stack development · .NET/C# and Blazor Server · React/Next.js projects · networking and cybersecurity",
  location: "Pereira, Colombia · open to remote work",
  status: "Open to new roles",
  focus: "Reliable releases · actionable risk visibility · clear communication · CCNA/cyber coursework · English at B2",
} as const;

const PROFILE_ABOUT_EXTENDED = [
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
    { kind: "out" as const, text: PROFILE_ABOUT_EXTENDED[0] },
    { kind: "out" as const, text: PROFILE_ABOUT_EXTENDED[1] },
    { kind: "out" as const, text: PROFILE_ABOUT_EXTENDED[2] },
    { kind: "cmd" as const, text: "availability" },
    { kind: "out" as const, text: `${PROFILE.status} · ${PROFILE.location}` },
    { kind: "comment" as const, text: "# The map below groups each topic—open nodes for detail and outbound links." },
  ],
};

export const EXPERIENCE = {
  company: "Outsourcing S.A.S. BIC",
  role: "Software development intern",
  bullets: [
    "Supporting and sustaining systems already in production",
    "Owning technical and functional support tickets through resolution",
    "Building features with Blazor Server (C#) and SQL Server",
    "Shipping controlled updates on Windows deployments",
    "Documenting fixes and collaborating with end-users",
  ],
  learned:
    "I strengthened how I keep production calm, communicate with non-technical users, and close incidents calmly end-to-end.",
} as const;

export const DEV_PROJECTS: DevProject[] = [
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
  },
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

export const CERTIFICATIONS: string[] = [
  "Meta (Coursera) · Introduction to Front-End Development · Jan 2025 – Mar 2025",
  "Meta (Coursera) · Introduction to Back-End Development · Jan 2025 – Mar 2025",
  "Meta (Coursera) · Programming with JavaScript · Jan 2025 – Mar 2025",
  "Meta (Coursera) · Programming with Python · Jan 2025 – Mar 2025",
  "Meta (Coursera) · Version Control with Git · Jan 2025 – Mar 2025",
  "University of California, Irvine · The Paul Merage School of Business · Problem Solving and Decision Making · Feb 2025",
  "Google (Coursera) · Foundations of Cybersecurity · Jan 2025",
  "Cisco · CCNA: Introduction to Networks · Nov 2024",
  "Cisco · English for IT 1 · May 2025",
  "Cisco · Introduction to Cybersecurity · Nov 2024",
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
