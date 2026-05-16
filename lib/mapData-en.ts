import type { CertificationRecord, DevProject } from "@/lib/data";
import { QUICK_LINKS } from "@/lib/data";
import {
  CERTIFICATIONS,
  CONTACT,
  DEV_PROJECTS,
  EXPERIENCES,
  PROFILE,
  SECURITY_LABS,
  SKILL_MODULES,
} from "@/lib/data-en";
import type { CaseDetailSlide, CaseFile, TopologyNodeId } from "@/lib/mapData";

function certificationsSortedDescendingEn(): CertificationRecord[] {
  return [...CERTIFICATIONS].sort((a, b) => b.sortDate.localeCompare(a.sortDate));
}

function experienceTopologySubtitle(entries: typeof EXPERIENCES): string {
  if (entries.length === 0) return "";
  const [first, ...rest] = entries;
  if (rest.length === 0) return first.company;
  return `${first.company} · +${rest.length}`;
}

function githubHrefFromLinks(project: DevProject): string | undefined {
  const hit = project.links.find((l) => l.variant === "github" || l.href.includes("github.com"));
  return hit?.href;
}

const PROJECT_DETAIL_EXTRA_EN: Record<DevProject["id"], { insightsHeading?: string; securityConsiderations: string[] }> = {
  "papertrail-v2": {
    insightsHeading: "Product",
    securityConsiderations: [
      "Tight shopper/admin segmentation with payload validation upstream of privileged routes—especially checkout handoffs.",
    ],
  },
  "techos-rentables": {
    insightsHeading: "Operations",
    securityConsiderations: [
      "KPI exports handled with deliberate session posture and operator-only affordances.",
    ],
  },
};

function slidesFromExperience(entries: typeof EXPERIENCES): CaseDetailSlide[] {
  return entries.map((e) => ({
    title: e.company,
    subtitle: `${e.role} · ${e.location} · ${e.period}`,
    summary: e.summary,
    features: [...e.bullets],
    stack: [...e.stack],
    insightsHeading: e.insightsHeading,
    securityConsiderations: [...e.securityConsiderations],
    evidence: [],
    actions: {},
    learned: [...e.modalTakeaways],
  }));
}

function slidesFromProjects(projects: readonly DevProject[]): CaseDetailSlide[] {
  return projects.map((p) => {
    const extra = PROJECT_DETAIL_EXTRA_EN[p.id];
    return {
      title: p.name,
      subtitle: p.type,
      summary: "",
      features: [...p.features],
      stack: [...p.stack],
      insightsHeading: extra?.insightsHeading,
      securityConsiderations: [...(extra?.securityConsiderations ?? [])],
      evidence: p.image ? [{ src: p.image, alt: `${p.name} · screenshot` }] : [],
      actions: {
        github: githubHrefFromLinks(p),
        demo: p.liveUrl,
      },
      reflectionSingle: p.learned,
    };
  });
}


export const TOPOLOGY_NODES_EN: Record<
  TopologyNodeId,
  { label: string; subtitle: string; x: number; y: number; accent: string }
> = {
  core: {
    label: "Core · JGC",
    subtitle: "Portfolio overview by topic",
    x: 500,
    y: 280,
    accent: "#22d3ee",
  },
  projects: {
    label: "Projects",
    subtitle: "Shipped and evolving builds",
    x: 500,
    y: 70,
    accent: "#22d3ee",
  },
  "security-labs": {
    label: "Security labs",
    subtitle: "Detection and good habits",
    x: 664,
    y: 149,
    accent: "#4ade80",
  },
  "development-apps": {
    label: "Apps",
    subtitle: "Day-to-day operations panels",
    x: 705,
    y: 327,
    accent: "#c4b5fd",
  },
  experience: {
    label: "Experience",
    subtitle: experienceTopologySubtitle(EXPERIENCES),
    x: 591,
    y: 469,
    accent: "#60a5fa",
  },
  certifications: {
    label: "Certifications",
    subtitle: "Credentials and coursework",
    x: 409,
    y: 469,
    accent: "#e879f9",
  },
  skills: {
    label: "Skills",
    subtitle: "Stack and disciplines",
    x: 295,
    y: 327,
    accent: "#2dd4bf",
  },
  contact: {
    label: "Contact",
    subtitle: "Channels and turnaround",
    x: 336,
    y: 149,
    accent: "#34d399",
  },
};

const techos = DEV_PROJECTS.find((p) => p.id === "techos-rentables");
const wazuh = SECURITY_LABS.find((l) => l.id === "wazuh-siem");
const pyLog = SECURITY_LABS.find((l) => l.id === "python-log-analyzer");
const entNet = SECURITY_LABS.find((l) => l.id === "enterprise-network-security");

function stackUnion(...groups: string[][]): string[] {
  return [...new Set(groups.flat().slice(0, 12))];
}

export const CASE_FILES_EN: Record<TopologyNodeId, CaseFile> = {
  core: {
    id: "core",
    title: "Core · JGC · Overview",
    subtitle: PROFILE.name,
    badge: "completed",
    summary:
      "Full‑stack upkeep and product builds: .NET/C# · Blazor Server, React/Next, SQL Server—with parallel curiosity for network visibility and log reading · Colombia · remote-friendly.",
    features: [
      "Each waypoint is intentionally different—this modal never copies the dossier templates from other satellites.",
      "Quick hooks: GitHub + LinkedIn; no signup wall · no downloadable résumé on this showcase.",
    ],
    stack: ["Next.js", "TypeScript", ".NET/C#", "SQL Server", "Git/GitHub"],
    insightsHeading: "This site",
    securityConsiderations: [
      "No credential capture baked into this interface; outbound links isolate domain inspection.",
    ],
    evidence: [],
    actions: { github: QUICK_LINKS.github, linkedin: QUICK_LINKS.linkedin },
  },
  projects: {
    id: "projects",
    title: "Web projects",
    badge: "completed",
    summary:
      "Two public repos with different narratives — swipe horizontally on each panel for highlights, tooling, and links.",
    features: [],
    detailSlides: slidesFromProjects(DEV_PROJECTS),
    stack: stackUnion(...DEV_PROJECTS.map((p) => [...p.stack])),
    insightsHeading: "Conventions",
    securityConsiderations: [],
    evidence: [],
    actions: {
      github: "https://github.com/JancarloGCdev/papertrailv2",
      githubSecondary: "https://github.com/JancarloGCdev/TechosRentables-Proyecto",
      demo: techos?.liveUrl,
    },
  },
  "security-labs": {
    id: "security-labs",
    title: "Security labs",
    badge: "in-progress",
    summary:
      "Dedicated drills for centralized telemetry, pattern mining in logs and Packet Tracer topologies—not a repeat of shipped products.",
    features: [
      "Central telemetry and event correlation · SIEM-style lab posture (documented, still evolving).",
      `${pyLog?.name ?? "Python log analyzer"} — repeatable exports for async review.`,
      `${entNet?.name ?? "Segmented enterprise network"} — SSH/VLAN tightening narrative.`,
    ].slice(0, 5),
    stack: ["Python", "Linux", "Packet Tracer", "Structured exports"],
    insightsHeading: "Lab discipline",
    securityConsiderations: [
      "If the assumed threat disappears from notes, alerts become noise nobody trusts two weeks later.",
    ],
    evidence: [{ src: wazuh?.image ?? "/labs/wazuh.avif", alt: "Wazuh workspace frame" }],
    actions: {},
  },
  "development-apps": {
    id: "development-apps",
    title: "Apps & panels",
    badge: "completed",
    summary:
      "Internal-grade flows: dashboards you live inside, blunt error copy, phased deploys rather than brittle big-bang swaps.",
    features: [
      "Errors point to next ops step instead of sending users into chat roulette.",
      "Ship slices without bulldozing the workflow that finances already trusts.",
      "Closest public analog · TechosRentables (signals, alerts, PDF trail).",
    ],
    stack: techos?.stack ?? ["Next.js", "React", "TypeScript", "PostgreSQL"],
    insightsHeading: "Operator reality",
    securityConsiderations: [
      "High-impact actions deserve enough trace metadata to rewind later—even if auditors never show up.",
    ],
    evidence: [{ src: techos?.image ?? "/projects/github-wordmark.avif", alt: "Ops panel cue" }],
    actions: {
      github: "https://github.com/JancarloGCdev/TechosRentables-Proyecto",
      githubSecondary: "https://github.com/JancarloGCdev/papertrailv2",
    },
  },
  experience: {
    id: "experience",
    title: "Work experience",
    subtitle:
      EXPERIENCES.length <= 1
        ? EXPERIENCES[0]
          ? `${EXPERIENCES[0].role} · ${EXPERIENCES[0].location} · ${EXPERIENCES[0].period}`
          : undefined
        : `${EXPERIENCES.length} roles · swipe for each employer`,
    badge: "completed",
    summary:
      EXPERIENCES.length <= 1
        ? (EXPERIENCES[0]?.summary ?? "")
        : "Employer-by-employer timeline — swipe for role, timeframe, and highlights.",
    features: [],
    detailSlides: slidesFromExperience(EXPERIENCES),
    stack: stackUnion(...EXPERIENCES.map((e) => [...e.stack])),
    insightsHeading: undefined,
    securityConsiderations: [],
    evidence: [],
    actions: {},
  },
  certifications: {
    id: "certifications",
    title: "Certifications",
    badge: "completed",
    summary:
      "Verified credentials from Meta on Coursera, Google Cybersecurity, Cisco Networking Academy, and UC Irvine Merage—paired with public repos and hands-on labs.",
    features: [],
    certificationCards: certificationsSortedDescendingEn().map(({ logoSrc, logoAlt, title, caption }) => ({
      logoSrc,
      logoAlt,
      title,
      caption,
    })),
    stack: [
      "Meta · Coursera",
      "JavaScript · Python · Git",
      "Google Foundations of Cybersecurity",
      "Cisco CCNA · Cybersecurity Essentials",
      "English for IT 1",
      "UC Irvine · Merage",
    ],
    insightsHeading: "Reading order",
    securityConsiderations: [
      "Issuer and completion dates live on each learning platform; repos + labs show how knowledge gets applied afterwards.",
    ],
    evidence: [],
    actions: { linkedin: QUICK_LINKS.linkedin },
  },
  skills: {
    id: "skills",
    title: "Skills",
    badge: "completed",
    summary:
      "Development craft, pragmatic security instincts, toolchain velocity—articulated distinctly from the other dossiers.",
    features: SKILL_MODULES.map((m) => `${m.title}: ${m.items.slice(0, 3).join(" · ")}`),
    stack: SKILL_MODULES.flatMap((m) => m.items).slice(0, 10),
    insightsHeading: "Working norms",
    securityConsiderations: [
      "Dependency grooming lives in everyday PR hygiene—not a ceremonial quarterly purge.",
    ],
    evidence: [],
    actions: { github: QUICK_LINKS.github },
  },
  contact: {
    id: "contact",
    title: "Contact",
    badge: "completed",
    summary: `${CONTACT.headline} ${CONTACT.sub}`,
    features: [
      "LinkedIn-first with scope in one thread beats context-free pings.",
      "This mesh fronts public repos · for anything sensitive, propose scope on LinkedIn and we route to the right medium.",
    ],
    stack: [],
    insightsHeading: "Preferences",
    securityConsiderations: [
      "Credentials stay off cold threads until alignment on scope and trusted channel.",
    ],
    evidence: [],
    actions: { github: QUICK_LINKS.github, linkedin: QUICK_LINKS.linkedin },
  },
};

export const HUD_TAB_ORDER_EN: {
  tab: string;
  nodeId: Exclude<TopologyNodeId, "development-apps">;
}[] = [
  { tab: "Core · JGC", nodeId: "core" },
  { tab: "Projects", nodeId: "projects" },
  { tab: "Security", nodeId: "security-labs" },
  { tab: "Experience", nodeId: "experience" },
  { tab: "Certs", nodeId: "certifications" },
  { tab: "Skills", nodeId: "skills" },
  { tab: "Contact", nodeId: "contact" },
];

export function labelForNodeIdEn(id: string | null): string {
  if (!id) return "";
  const n = TOPOLOGY_NODES_EN[id as TopologyNodeId];
  return n?.label ?? id;
}
