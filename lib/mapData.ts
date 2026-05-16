import {
  CERTIFICATIONS,
  CONTACT,
  DEV_PROJECTS,
  EXPERIENCES,
  PROFILE,
  QUICK_LINKS,
  SECURITY_LABS,
  SKILL_MODULES,
  type CertificationRecord,
  type DevProject,
  type ExperienceEntry,
} from "@/lib/data";

/** Identificadores de topología SOC (mantienen compatibilidad con tour guiado). */
export type TopologyNodeId = "core" | "projects" | "security-labs" | "development-apps" | "experience" | "certifications" | "skills" | "contact";

export type CaseBadge = "completed" | "in-progress";

export type CaseActions = {
  github?: string;
  githubSecondary?: string;
  demo?: string;
  linkedin?: string;
};

/** Tarjeta de certificación en el modal del mapa */
export type CertificationCard = {
  logoSrc: string;
  logoAlt: string;
  title: string;
  caption: string;
};

/** Tarjeta deslizable dentro del modal cuando hay varias experiencias/proyectos. */
export type CaseDetailSlide = {
  title: string;
  subtitle?: string;
  summary: string;
  features: readonly string[];
  stack: readonly string[];
  insightsHeading?: string;
  securityConsiderations: readonly string[];
  evidence: readonly { readonly src: string; readonly alt: string }[];
  actions: CaseActions;
  learned?: readonly [string, string];
  /** Una sola nota cuando no aplican dos “takeaways”. */
  reflectionSingle?: string;
};

/** Ficha “case file” mostrada en el modal por nodo. */
export type CaseFile = {
  id: TopologyNodeId;
  title: string;
  subtitle?: string;
  badge: CaseBadge;
  /** Una o dos líneas: qué ves en este nodo */
  summary: string;
  features: readonly string[];
  /** Si existe, sustituye la lista `features` por tarjetas con logo (nodo certificaciones). */
  certificationCards?: readonly CertificationCard[];
  stack: readonly string[];
  /** Opcional · sustituye el rótulo del bloque de notas (por defecto `nodeModal.securityHeading`). */
  insightsHeading?: string;
  /** Notas puntuales; vacío ⇒ el modal no muestra el bloque */
  securityConsiderations: readonly string[];
  /** Vacío ⇒ se ocultan referencias · capturas */
  evidence: readonly { readonly src: string; readonly alt: string }[];
  actions: CaseActions;
  /** Bloque inferior; omitir cuando no suma información */
  learned?: readonly [string, string];
  /** Experiencias o proyectos en carrusel; si existe, el cuerpo detallado usa las diapositivas en lugar del bloque único. */
  detailSlides?: readonly CaseDetailSlide[];
};

function certificationsSortedDescending(): CertificationRecord[] {
  return [...CERTIFICATIONS].sort((a, b) => b.sortDate.localeCompare(a.sortDate));
}

function experienceTopologySubtitle(entries: readonly ExperienceEntry[]): string {
  if (entries.length === 0) return "";
  const [first, ...rest] = entries;
  if (rest.length === 0) return first.company;
  return `${first.company} · +${rest.length}`;
}

function githubHrefFromLinks(project: DevProject): string | undefined {
  const hit = project.links.find((l) => l.variant === "github" || l.href.includes("github.com"));
  return hit?.href;
}

/** Metadatos de contexto seguridad/notas por id de proyecto (ES). */
const PROJECT_DETAIL_EXTRA_ES: Record<
  DevProject["id"],
  { insightsHeading?: string; securityConsiderations: string[] }
> = {
  "papertrail-v2": {
    insightsHeading: "Producto",
    securityConsiderations: [
      "Roles comprador/admin con permisos acotados; validación antes de rutas privilegiadas y del cobro.",
    ],
  },
  "techos-rentables": {
    insightsHeading: "Operación",
    securityConsiderations: [
      "Métricas y exportaciones tratadas con sesión estable y separación por rol ante datos sensibles de operación.",
    ],
  },
};

function slidesFromExperience(entries: readonly ExperienceEntry[]): CaseDetailSlide[] {
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

function slidesFromProjects_es(projects: readonly DevProject[]): CaseDetailSlide[] {
  return projects.map((p) => {
    const extra = PROJECT_DETAIL_EXTRA_ES[p.id];
    return {
      title: p.name,
      subtitle: p.type,
      summary: "",
      features: [...p.features],
      stack: [...p.stack],
      insightsHeading: extra?.insightsHeading,
      securityConsiderations: [...(extra?.securityConsiderations ?? [])],
      evidence: p.image ? [{ src: p.image, alt: `${p.name} · vista del proyecto` }] : [],
      actions: {
        github: githubHrefFromLinks(p),
        demo: p.liveUrl,
      },
      reflectionSingle: p.learned,
    };
  });
}

/**
 * Nodos del grafo SVG (viewBox 1000×560).
 * Satélites en **heptágono regular** alrededor del centro para composición simétrica
 * (radio ~210, centro 500×280). Orden horario desde arriba: projects → … → contact.
 */
export const TOPOLOGY_NODES: Record<
  TopologyNodeId,
  { label: string; subtitle: string; x: number; y: number; accent: string }
> = {
  core: {
    label: "Núcleo JGC",
    subtitle: "Portafolio · visión por áreas",
    x: 500,
    y: 280,
    accent: "#22d3ee",
  },
  projects: {
    label: "Proyectos",
    subtitle: "Productos entregados y en evolución",
    x: 500,
    y: 70,
    accent: "#22d3ee",
  },
  "security-labs": {
    label: "Laboratorios de seguridad",
    subtitle: "Detección y buenas prácticas",
    x: 664,
    y: 149,
    accent: "#4ade80",
  },
  "development-apps": {
    label: "Aplicaciones",
    subtitle: "Paneles para operación diaria",
    x: 705,
    y: 327,
    accent: "#c4b5fd",
  },
  experience: {
    label: "Experiencia",
    subtitle: experienceTopologySubtitle(EXPERIENCES),
    x: 591,
    y: 469,
    accent: "#60a5fa",
  },
  certifications: {
    label: "Certificaciones",
    subtitle: "Formación y credenciales",
    x: 409,
    y: 469,
    accent: "#e879f9",
  },
  skills: {
    label: "Competencias",
    subtitle: "Tecnologías y ámbitos",
    x: 295,
    y: 327,
    accent: "#2dd4bf",
  },
  contact: {
    label: "Contacto",
    subtitle: "Canales y respuesta",
    x: 336,
    y: 149,
    accent: "#34d399",
  },
};

/** Aristas solo hub ↔ cada satélite (JGC Core como centro de la topología). */
export const TOPOLOGY_EDGES: [TopologyNodeId, TopologyNodeId][] = [
  ["core", "projects"],
  ["core", "security-labs"],
  ["core", "development-apps"],
  ["core", "experience"],
  ["core", "certifications"],
  ["core", "skills"],
  ["core", "contact"],
];

export type SatelliteId = Exclude<TopologyNodeId, "core">;

export const SATELLITE_IDS: SatelliteId[] = [
  "projects",
  "security-labs",
  "development-apps",
  "experience",
  "certifications",
  "skills",
  "contact",
];

const techos = DEV_PROJECTS.find((p) => p.id === "techos-rentables");
const wazuh = SECURITY_LABS.find((l) => l.id === "wazuh-siem");
const pyLog = SECURITY_LABS.find((l) => l.id === "python-log-analyzer");
const entNet = SECURITY_LABS.find((l) => l.id === "enterprise-network-security");

function stackUnion(...groups: string[][]): string[] {
  return [...new Set(groups.flat().slice(0, 12))];
}

export const CASE_FILES: Record<TopologyNodeId, CaseFile> = {
  core: {
    id: "core",
    title: "Núcleo JGC · Perfil central",
    subtitle: PROFILE.name,
    badge: "completed",
    summary:
      "Full-stack mantenimiento y producto: .NET/C# · Blazor Server, React/Next, SQL Server. Interés paralelo en redes, visibilidad y análisis de registros · Colombia · remoto.",
    features: [
      "Cada waypoint del mapa cubre una pieza diferente para evitar párrafos duplicados entre secciones.",
      "Enlaces rápidos: repos públicos y LinkedIn. No hay CV descargable en abierto.",
    ],
    stack: ["Next.js", "TypeScript", ".NET/C#", "SQL Server", "Git/GitHub"],
    insightsHeading: "Sitio",
    securityConsiderations: [
      "Sin captura de credenciales aquí; los enlaces externos abren aparte para comprobar el dominio con calma.",
    ],
    evidence: [],
    actions: { github: QUICK_LINKS.github, linkedin: QUICK_LINKS.linkedin },
  },
  projects: {
    id: "projects",
    title: "Proyectos web",
    badge: "completed",
    summary:
      "Dos repositorios públicos con narrativas distintas — desliza horizontalmente cada tarjeta para ver destacados, stack y enlaces.",
    features: [],
    detailSlides: slidesFromProjects_es(DEV_PROJECTS),
    stack: stackUnion(...DEV_PROJECTS.map((p) => [...p.stack])),
    insightsHeading: "Convenciones",
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
    title: "Laboratorios de seguridad",
    badge: "in-progress",
    summary:
      "Espacio aparte para telemetría, parsing de registros y topología modelo — no replica la ficha de proyectos.",
    features: [
      "Correlación y telemetría centralizada · enfoque tipo SIEM (laboratorio documentado y en evolución).",
      `${pyLog?.name ?? "Analizador Python"} — patrones resaltados y CSV/JSON legible.`,
      `${entNet?.name ?? "Red segmentada"} — VLAN/SSH/endurecimiento modelado.`,
    ].slice(0, 5),
    stack: ["Python", "Linux", "Packet Tracer", "SIEM mindset"],
    insightsHeading: "Laboratorio",
    securityConsiderations: [
      "Cada ejercicio deja hipótesis anotadas; sin eso los hallazgos se vuelven difíciles de explicar días después.",
    ],
    evidence: [{ src: wazuh?.image ?? "/labs/wazuh.avif", alt: "Wazuh · captura laboratorio" }],
    actions: {},
  },
  "development-apps": {
    id: "development-apps",
    title: "Aplicaciones y paneles",
    badge: "completed",
    summary:
      "Casos donde el código vive dentro de rutinas internas: pantallas de uso diario, errores que deben pedir siguiente paso, despliegues por etapa.",
    features: [
      "Errores con mensaje útil ante fallas en vivo — evita soporte improvisado repetido.",
      "Entregas incrementales sin tirar procesos delicados cuando el servidor ya está ocupado.",
      "Referencia pública cercana · TechosRentables (métricas, PDF, vistas por rol).",
    ],
    stack: techos?.stack ?? ["Next.js", "React", "TypeScript", "PostgreSQL"],
    insightsHeading: "Operación",
    securityConsiderations: [
      "Cambios sensibles (roles, datos críticos) dejan evidencia suficiente para reconstruir después.",
    ],
    evidence: [{ src: techos?.image ?? "/projects/github-wordmark.avif", alt: "Panel operativo referencia" }],
    actions: {
      github: "https://github.com/JancarloGCdev/TechosRentables-Proyecto",
      githubSecondary: "https://github.com/JancarloGCdev/papertrailv2",
    },
  },
  experience: {
    id: "experience",
    title: "Experiencia laboral",
    subtitle:
      EXPERIENCES.length <= 1
        ? EXPERIENCES[0]
          ? `${EXPERIENCES[0].role} · ${EXPERIENCES[0].location} · ${EXPERIENCES[0].period}`
          : undefined
        : `${EXPERIENCES.length} roles · desliza para ver cada empresa`,
    badge: "completed",
    summary:
      EXPERIENCES.length <= 1
        ? (EXPERIENCES[0]?.summary ?? "")
        : "Trayectoria por empresa — desliza para ver rol, período y destacados.",
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
    title: "Certificaciones",
    badge: "completed",
    summary:
      "Credenciales verificadas en Meta (Coursera), Google Cybersecurity, Cisco Networking Academy y UC Irvine Merage complementadas con trabajo en repos y laboratorios.",
    features: [],
    certificationCards: certificationsSortedDescending().map(({ logoSrc, logoAlt, title, caption }) => ({
      logoSrc,
      logoAlt,
      title,
      caption,
    })),
    stack: [
      "Meta · Coursera",
      "JavaScript · Python · Git",
      "Google Foundations of Cybersecurity",
      "Cisco CCNA · Intro Cybersecurity",
      "English for IT 1",
      "UC Irvine · Merage",
    ],
    insightsHeading: "Cómo leer esta lista",
    securityConsiderations: [
      "Las fechas y emisores en las plataformas de formación avalan cada ítem; repos y labs muestran cómo aplico el conocimiento después.",
    ],
    evidence: [],
    actions: { linkedin: QUICK_LINKS.linkedin },
  },
  skills: {
    id: "skills",
    title: "Competencias",
    badge: "completed",
    summary:
      "Tres líneas paralelas sin pisar otras fichas: software de producto · bases seguridad/redes · cadena de herramientas cotidiana.",
    features: SKILL_MODULES.map((m) => `${m.title}: ${m.items.slice(0, 3).join(" · ")}`),
    stack: SKILL_MODULES.flatMap((m) => m.items).slice(0, 10),
    insightsHeading: "Convenciones",
    securityConsiderations: [
      "Dependencias tratadas igual que historia de código — no etiqueta especial que se revise una vez al año.",
    ],
    evidence: [],
    actions: { github: QUICK_LINKS.github },
  },
  contact: {
    id: "contact",
    title: "Contacto",
    badge: "completed",
    summary: `${CONTACT.headline} ${CONTACT.sub}`,
    features: [
      "Para colaboraciones serias usa LinkedIn con tema breve · rol · objetivo.",
      "El mapa reúne repos y contexto; el CV completo solo se comparte por un canal privado cuando encaje el alcance.",
    ],
    stack: [],
    insightsHeading: "Preferencias",
    securityConsiderations: [
      "Credenciales y secretos solo después de alinear alcance por escrito.",
    ],
    evidence: [],
    actions: { github: QUICK_LINKS.github, linkedin: QUICK_LINKS.linkedin },
  },
};

/** Tabs del HUD → nodo enlazado (Development Apps solo desde el mapa). Orden = tour guiado. */
export const HUD_TAB_ORDER: { tab: string; nodeId: Exclude<TopologyNodeId, "development-apps"> }[] = [
  { tab: "JGC", nodeId: "core" },
  { tab: "Proyectos", nodeId: "projects" },
  { tab: "Seguridad", nodeId: "security-labs" },
  { tab: "Experiencia", nodeId: "experience" },
  { tab: "Certs", nodeId: "certifications" },
  { tab: "Stack", nodeId: "skills" },
  { tab: "Contacto", nodeId: "contact" },
];

/** Referencia de etiquetas (incl. core). Mantener alineado con GUIDED_TOUR_STEPS. */
export const TOUR_NODE_LABELS = {
  core: TOPOLOGY_NODES.core.label,
  projects: TOPOLOGY_NODES.projects.label,
  "security-labs": TOPOLOGY_NODES["security-labs"].label,
  "development-apps": TOPOLOGY_NODES["development-apps"].label,
  experience: TOPOLOGY_NODES.experience.label,
  certifications: TOPOLOGY_NODES.certifications.label,
  skills: TOPOLOGY_NODES.skills.label,
  contact: TOPOLOGY_NODES.contact.label,
} as const;

export function labelForNodeId(id: string | null): string {
  if (!id) return "";
  const n = TOPOLOGY_NODES[id as TopologyNodeId];
  return n?.label ?? id;
}

/** Determina aristas destacadas cuando `selected` tiene foco (incluye conexiones al core). */
export function edgesIncidentTo(selected: TopologyNodeId): Set<string> {
  const key = (a: TopologyNodeId, b: TopologyNodeId) => [a, b].sort().join("--");
  const out = new Set<string>();
  for (const [a, b] of TOPOLOGY_EDGES) {
    if (a === selected || b === selected) out.add(key(a, b));
  }
  return out;
}
