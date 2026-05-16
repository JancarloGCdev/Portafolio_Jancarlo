import { QUICK_LINKS } from "@/lib/data";
import {
  CERTIFICATIONS,
  CONTACT,
  DEV_PROJECTS,
  EXPERIENCE,
  PROFILE,
  SECURITY_LABS,
  SKILL_MODULES,
} from "@/lib/data-en";
import type { CaseFile, TopologyNodeId } from "@/lib/mapData";


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
    subtitle: EXPERIENCE.company,
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

const paper = DEV_PROJECTS.find((p) => p.id === "papertrail-v2");
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
      "Short walkthrough across software delivery with an operational cybersecurity mindset—from here you can open projects, experience, labs, and contact.",
    features: [
      "One place to skim trajectory and shipped outcomes without losing context",
      "Clarity-first: upkeep, observable systems, agreements with teammates and stakeholders",
      "Remote-friendly collaborator who favors brief, pragmatic documentation",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "Security-conscious design", "Git"],
    securityConsiderations: [
      "This site never asks for credentials; external links open separately so you can verify domains calmly.",
      "In any real screening I only share agreed channels and minimum necessary access.",
    ],
    evidence: [
      { src: "/maps/evidence-slot.svg", alt: "Content map outline" },
      { src: "/maps/evidence-slot.svg", alt: "Status priorities snapshot" },
    ],
    actions: { github: QUICK_LINKS.github, pdf: QUICK_LINKS.cvPath },
    learned: [
      "Strong portfolios narrate choices and rationale—not only tool names.",
      "A concise map signals combined product/security roles without fluff.",
    ],
  },
  projects: {
    id: "projects",
    title: "Web projects",
    badge: "completed",
    summary:
      "Public work that stresses product framing, integrations, and ownership—from e‑commerce browsing to ops dashboards.",
    features: [
      `${paper?.name ?? "PaperTrail v2"} — multi-role storefront with checkout flow`,
      `${techos?.name ?? "TechosRentables"} — solar operations monitoring dashboard`,
      ...(paper?.features?.slice(0, 2) ?? []),
      ...(techos?.features?.slice(0, 1) ?? []),
    ].slice(0, 5),
    stack: stackUnion(paper?.stack ?? [], techos?.stack ?? []),
    securityConsiderations: [
      "Role separation with a tightened admin footprint for consumer-facing apps.",
      "Validated inputs plus careful session hygiene for carts and checkout partners.",
    ],
    evidence: [
      { src: paper?.image ?? "/maps/evidence-slot.svg", alt: "PaperTrail v2 screenshot" },
      { src: techos?.image ?? "/maps/evidence-slot.svg", alt: "TechosRentables screenshot" },
    ],
    actions: {
      github: "https://github.com/JancarloGCdev/papertrailv2",
      githubSecondary: "https://github.com/JancarloGCdev/TechosRentables-Proyecto",
      demo: techos?.liveUrl,
    },
    learned: [
      paper?.learned ? `${paper.learned.split(".")[0]}.` : "Real-world feedback trims scope while keeping defenses honest.",
      techos?.learned ? `${techos.learned.split(".")[0]}.` : "Metrics should trigger an action within minutes, not vanity charts.",
    ],
  },
  "security-labs": {
    id: "security-labs",
    title: "Security labs",
    badge: "in-progress",
    summary:
      "Hands-on drills on visibility, log review, and network modeling. The Wazuh SIEM track is flagged in progress while automation/topology drills continue.",
    features: [
      `${wazuh?.name ?? "Wazuh SIEM lab"} — ${
        wazuh?.ongoing || wazuh?.status === "In progress" ? "centralized monitoring (in progress)" : "centralized monitoring"
      }`,
      `${pyLog?.name ?? "Python log analyzer"} — pattern surfacing plus structured exports`,
      `${entNet?.name ?? "Segmented enterprise network"} — segmentation and hardening model`,
      ...(entNet?.description?.slice(0, 2) ?? []),
    ].slice(0, 5),
    stack: ["Wazuh", "Python", "Linux", "Packet Tracer", "JSON/CSV"],
    securityConsiderations: [
      "Anchor alert retention and context before piling new telemetry sources.",
      "Document assumed threats per lab so you can resume calmly later.",
    ],
    evidence: [
      { src: wazuh?.image ?? "/maps/evidence-slot.svg", alt: "Wazuh lab" },
      { src: "/maps/evidence-slot.svg", alt: "Log-analysis flow diagram" },
    ],
    actions: {},
    learned: [
      wazuh?.learned ? `${wazuh.learned.split(".")[0]}.` : "Central telemetry keeps incident triage repeatable without rework.",
      pyLog?.learned ? `${pyLog.learned.split(".")[0]}.` : "Parsing automation cuts fatigue so subtle threats get attention.",
    ],
  },
  "development-apps": {
    id: "development-apps",
    title: "Apps & panels",
    badge: "completed",
    summary:
      "Operational web apps focused on dashboards, dense forms, and trustworthy data—it complements Projects with recurring internal workloads.",
    features: [
      "Responsive UI with actionable loading/error copy for operators",
      "Structured data tiers and repeatable deploy confidence",
      "Incremental releases that avoid breaking prod-critical workflows",
    ],
    stack: techos?.stack ?? ["Next.js", "React", "TypeScript", "PostgreSQL"],
    securityConsiderations: [
      "Least privilege defaults for administrative views/internal APIs.",
      "Auditable traces when privileged actions execute.",
    ],
    evidence: [
      { src: "/maps/evidence-slot.svg", alt: "Internal app wireframe placeholder" },
      { src: techos?.image ?? "/maps/evidence-slot.svg", alt: "Operations panel" },
    ],
    actions: {
      github: "https://github.com/JancarloGCdev/TechosRentables-Proyecto",
      githubSecondary: "https://github.com/JancarloGCdev/papertrailv2",
    },
    learned: [
      "Teams want fast answers and actionable error states—not silent failures.",
      "Reusable UI patterns ship faster yet stay accessible.",
    ],
  },
  experience: {
    id: "experience",
    title: "Professional experience",
    badge: "completed",
    summary: `${EXPERIENCE.role} at ${EXPERIENCE.company}: production maintenance, ticketing, scoped releases.`,
    features: EXPERIENCE.bullets.slice(0, 5),
    stack: ["Blazor Server", "C#", ".NET", "SQL Server", "Windows Server"],
    securityConsiderations: [
      "Versioned releases with stakeholder comms ahead of maintenance windows.",
      "Admin access restricted to hardened production footprints.",
    ],
    evidence: [
      { src: "/maps/evidence-slot.svg", alt: "Experience timeline cue" },
      { src: "/maps/evidence-slot.svg", alt: "Key responsibilities" },
    ],
    actions: {},
    learned: [
      EXPERIENCE.learned.split(".")[0] + ".",
      "Crystal-clear ticketing cuts noise and earns trust from end-users.",
    ],
  },
  certifications: {
    id: "certifications",
    title: "Certifications",
    badge: "in-progress",
    summary:
      "Formal training across cybersecurity fundamentals, routing/switching, and technical English. Some journeys stay in progress—that’s deliberate continuous learning.",
    features: CERTIFICATIONS.slice(0, 5),
    stack: ["Google Cybersecurity", "Fortinet NSE", "Cisco", "Azure Fundamentals (planned)", "Technical English (in progress)"],
    securityConsiderations: [
      "Certifications certify foundations; labs show practical application.",
      "Cloud baseline exams help speak the same vocabulary as infra teams.",
    ],
    evidence: [
      { src: "/maps/evidence-slot.svg", alt: "Learning badges cue" },
      { src: "/maps/evidence-slot.svg", alt: "Learning roadmap" },
    ],
    actions: { pdf: QUICK_LINKS.cvPath },
    learned: [
      "Credentialed basics give recruiters a shared taxonomy.",
      "Pairing certs with shipped code tightens interviewing conversations.",
    ],
  },
  skills: {
    id: "skills",
    title: "Skills",
    badge: "completed",
    summary:
      "Grouped around development stacks, cybersecurity practices, and day-to-day tools—balanced for recruiters hiring hybrid builders.",
    features: SKILL_MODULES.flatMap((m) => [`${m.title}: ${m.items.slice(0, 2).join(", ")}`]).slice(0, 5),
    stack: SKILL_MODULES.flatMap((m) => m.items).slice(0, 10),
    securityConsiderations: [
      "Clear boundary between shipping product and reinforcing defensive posture.",
      "Routine dependency/code review rituals as teamwork defaults.",
    ],
    evidence: [
      { src: "/maps/evidence-slot.svg", alt: "Skill matrix cue" },
      { src: "/maps/evidence-slot.svg", alt: "Frequent tooling" },
    ],
    actions: { github: QUICK_LINKS.github },
    learned: [
      "Pairing modern stacks with telemetry literacy fits teams guarding uptime and risk.",
      "Naming honest gaps early prevents mismatched sprint zero expectations.",
    ],
  },
  contact: {
    id: "contact",
    title: "Contact",
    badge: "completed",
    summary: `${CONTACT.headline} ${CONTACT.sub}`,
    features: CONTACT.links.map((l) => `${l.label}: open from this card`).slice(0, 5),
    stack: ["Email", "LinkedIn", "GitHub", "WhatsApp"],
    securityConsiderations: [
      "Prefer channels with searchable history—email or LinkedIn first.",
      "Never ping secrets/passwords casually over chats.",
    ],
    evidence: [
      { src: "/maps/evidence-slot.svg", alt: "Contact channels" },
      { src: "/maps/evidence-slot.svg", alt: "Response expectations" },
    ],
    actions: {
      github: QUICK_LINKS.github,
      pdf: QUICK_LINKS.cvPath,
    },
    learned: [
      "Bullet replies with concrete next actions save loops for everyone.",
      "Trust compounds when Linked/GitHub aligns with narrative.",
    ],
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
