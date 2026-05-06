import {
  CERTIFICATIONS,
  CONTACT,
  DEV_PROJECTS,
  EXPERIENCE,
  PROFILE,
  QUICK_LINKS,
  SECURITY_LABS,
  SKILL_MODULES,
} from "@/lib/data";

/** Identificadores de topología SOC (mantienen compatibilidad con tour guiado). */
export type TopologyNodeId = "core" | "projects" | "security-labs" | "development-apps" | "experience" | "certifications" | "skills" | "contact";

export type CaseBadge = "completed" | "in-progress";

export type CaseActions = {
  github?: string;
  githubSecondary?: string;
  demo?: string;
  pdf?: string;
};

/** Ficha “case file” mostrada en el modal por nodo. */
export type CaseFile = {
  id: TopologyNodeId;
  title: string;
  subtitle?: string;
  badge: CaseBadge;
  /** Descripción breve recruiter-friendly */
  summary: string;
  features: string[];
  stack: string[];
  securityConsiderations: string[];
  evidence: { src: string; alt: string }[];
  actions: CaseActions;
  /** Exactamente dos líneas sugeridas */
  learned: [string, string];
};

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
    subtitle: EXPERIENCE.company,
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

const paper = DEV_PROJECTS.find((p) => p.id === "papertrail-v2");
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
      "Resumen de mi trayectoria en el cruce entre entrega de software y ciberseguridad con enfoque operativo. Desde aquí puedes navegar por proyectos, experiencia, laboratorios y forma de contacto.",
    features: [
      "Vista única para revisar trayectoria y resultados sin perder el hilo",
      "Prioridad a la claridad: mantenimiento, observación del sistema y acuerdos con equipos y clientes",
      "Disponibilidad para equipos remotos que valoren documentación breve y concreta",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "Seguridad en el diseño", "Git"],
    securityConsiderations: [
      "Esta vitrina no solicita credenciales; los enlaces externos se abren aparte para que verifiques el dominio con calma.",
      "Si te comparto accesos en un proceso real, siempre por canales acordados y con el mínimo privilegio necesario.",
    ],
    evidence: [
      { src: "/maps/evidence-slot.svg", alt: "Esquema del mapa de contenidos" },
      { src: "/maps/evidence-slot.svg", alt: "Resumen de estado y prioridades" },
    ],
    actions: { github: QUICK_LINKS.github, pdf: QUICK_LINKS.cvPath },
    learned: [
      "Un portafolio sólido cuenta qué decidiste y por qué, no solo qué herramientas usaste.",
      "Una vista clara ayuda a explicar perfiles que combinan producto y seguridad sin perder rigor.",
    ],
  },
  projects: {
    id: "projects",
    title: "Proyectos web",
    badge: "completed",
    summary:
      "Proyectos públicos que demuestran diseño de producto, integración con datos y ownership de entrega. Incluye comercio electrónico y panel operativo.",
    features: [
      `${paper?.name ?? "PaperTrail v2"} — e‑commerce multi-rol con flujo de compra`,
      `${techos?.name ?? "TechosRentables"} — panel para monitoreo de sistemas solares`,
      ...(paper?.features?.slice(0, 2) ?? []),
      ...(techos?.features?.slice(0, 1) ?? []),
    ].slice(0, 5),
    stack: stackUnion(paper?.stack ?? [], techos?.stack ?? []),
    securityConsiderations: [
      "Separación de permisos y superficie de administración acotada en aplicaciones con usuarios finales.",
      "Validación de entradas y manejo seguro de sesiones en flujos con carrito y pagos (integración según proveedor).",
    ],
    evidence: [
      { src: paper?.image ?? "/maps/evidence-slot.svg", alt: "Captura PaperTrail v2" },
      { src: techos?.image ?? "/maps/evidence-slot.svg", alt: "Captura TechosRentables" },
    ],
    actions: {
      github: "https://github.com/JancarloGCdev/papertrailv2",
      githubSecondary: "https://github.com/JancarloGCdev/TechosRentables-Proyecto",
      demo: techos?.liveUrl,
    },
    learned: [
      paper?.learned
        ? `${paper.learned.split(".")[0]}.`
        : "Iterar con feedback real ordena prioridades sin perder de vista seguridad.",
      techos?.learned
        ? `${techos.learned.split(".")[0]}.`
        : "Las métricas que importan son las que disparan una acción concreta en minutos.",
    ],
  },
  "security-labs": {
    id: "security-labs",
    title: "Laboratorios de seguridad",
    badge: "in-progress",
    summary:
      "Laboratorios enfocados en visibilidad, análisis de logs y diseño de red. Wazuh SIEM está marcado como trabajo en curso; el resto refuerza automatización y topología.",
    features: [
      `${wazuh?.name ?? "Laboratorio Wazuh (SIEM)"} — ${wazuh?.status === "En curso" ? "monitoreo centralizado (en curso)" : "monitoreo centralizado"}`,
      `${pyLog?.name ?? "Analizador de registros (Python)"} — patrones relevantes y exportación estructurada`,
      `${entNet?.name ?? "Red empresarial segmentada"} — modelo de segmentación y endurecimiento`,
      ...(entNet?.description?.slice(0, 2) ?? []),
    ].slice(0, 5),
    stack: ["Wazuh", "Python", "Linux", "Packet Tracer", "JSON/CSV"],
    securityConsiderations: [
      "Priorizar el contexto y la retención razonable de alertas antes de añadir más fuentes de datos.",
      "Documentar la hipótesis de amenaza en cada laboratorio para retomar el hilo con claridad.",
    ],
    evidence: [
      { src: wazuh?.image ?? "/maps/evidence-slot.svg", alt: "Laboratorio Wazuh" },
      { src: "/maps/evidence-slot.svg", alt: "Flujo de análisis de logs" },
    ],
    actions: {},
    learned: [
      wazuh?.learned ? `${wazuh.learned.split(".")[0]}.` : "Centralizar telemetría ordena prioridades de incidentes sin duplicar esfuerzos.",
      pyLog?.learned
        ? `${pyLog.learned.split(".")[0]}.`
        : "Automatizar parsing de logs reduce fatiga y libera tiempo para amenazas sutiles.",
    ],
  },
  "development-apps": {
    id: "development-apps",
    title: "Aplicaciones y paneles",
    badge: "completed",
    summary:
      "Aplicaciones web orientadas a la operación diaria: paneles, formularios complejos e integración de datos. Complementa la sección de proyectos con énfasis en equipos internos y uso frecuente.",
    features: [
      "Interfaces adaptables con mensajes claros de carga y error para quienes operan el sistema",
      "Capa de datos ordenada y despliegues que se pueden repetir con confianza",
      "Mejoras por entregas sin interrumpir los flujos críticos en producción",
    ],
    stack: techos?.stack ?? ["Next.js", "React", "TypeScript", "PostgreSQL"],
    securityConsiderations: [
      "Principio de menor privilegio en vistas administrativas y APIs internas.",
      "Registros auditables cuando un usuario ejecuta acciones sensibles.",
    ],
    evidence: [
      { src: "/maps/evidence-slot.svg", alt: "Boceto de aplicación interna" },
      { src: techos?.image ?? "/maps/evidence-slot.svg", alt: "Panel operativo" },
    ],
    actions: {
      github: "https://github.com/JancarloGCdev/TechosRentables-Proyecto",
      githubSecondary: "https://github.com/JancarloGCdev/papertrailv2",
    },
    learned: [
      "Los equipos internos valoran respuestas rápidas y mensajes que indiquen qué falló y el siguiente paso.",
      "Reutilizar patrones de interfaz acelera la entrega sin renunciar a una experiencia accesible.",
    ],
  },
  experience: {
    id: "experience",
    title: "Experiencia profesional",
    badge: "completed",
    summary: `Pasante de desarrollo en ${EXPERIENCE.company}: mantenimiento de sistemas en producción, tickets y publicación controlada de cambios.`,
    features: EXPERIENCE.bullets.slice(0, 5),
    stack: ["Blazor Server", "C#", ".NET", "SQL Server", "Windows Server"],
    securityConsiderations: [
      "Cambios versionados y comunicación antes de ventanas de mantenimiento.",
      "Acceso administrativo acotado a entornos productivos.",
    ],
    evidence: [
      { src: "/maps/evidence-slot.svg", alt: "Línea de tiempo experiencia" },
      { src: "/maps/evidence-slot.svg", alt: "Responsabilidades clave" },
    ],
    actions: {},
    learned: [
      EXPERIENCE.learned.split(".")[0] + ".",
      "La claridad en tickets reduce ida y vuelta y aumenta confianza con usuarios finales.",
    ],
  },
  certifications: {
    id: "certifications",
    title: "Certificaciones",
    badge: "in-progress",
    summary:
      "Formación formal y certificaciones en ciberseguridad, redes e idioma técnico. Algunas rutas siguen en curso — coherente con aprendizaje continuo.",
    features: CERTIFICATIONS.slice(0, 5),
    stack: ["Google Cybersecurity", "Fortinet NSE", "Cisco", "Azure (planificado)", "Inglés técnico (en curso)"],
    securityConsiderations: [
      "Las certificaciones avalan bases sólidas; los laboratorios muestran cómo aplico lo aprendido.",
      "Planificar certificaciones en nube (por ejemplo Azure Fundamentals) facilita el lenguaje común con equipos en la nube.",
    ],
    evidence: [
      { src: "/maps/evidence-slot.svg", alt: "Insignias de estudio" },
      { src: "/maps/evidence-slot.svg", alt: "Ruta de aprendizaje" },
    ],
    actions: { pdf: QUICK_LINKS.cvPath },
    learned: [
      "Una base certificada ofrece un mapa compartido con equipos de empresa.",
      "Combinar formación formal con proyectos públicos refuerza conversaciones técnicas en procesos de selección.",
    ],
  },
  skills: {
    id: "skills",
    title: "Competencias",
    badge: "completed",
    summary:
      "Habilidades agrupadas por desarrollo, ciberseguridad y herramientas habituales. Pensado para equipos de contratación y líderes que buscan encaje en roles mixtos.",
    features: SKILL_MODULES.flatMap((m) => [`${m.title}: ${m.items.slice(0, 2).join(", ")}`]).slice(0, 5),
    stack: SKILL_MODULES.flatMap((m) => m.items).slice(0, 10),
    securityConsiderations: [
      "Separación clara entre construir producto y reforzar la postura defensiva.",
      "Revisiones de dependencias y de cambios en código como parte habitual del trabajo en equipo.",
    ],
    evidence: [
      { src: "/maps/evidence-slot.svg", alt: "Matriz de competencias" },
      { src: "/maps/evidence-slot.svg", alt: "Herramientas frecuentes" },
    ],
    actions: { github: QUICK_LINKS.github },
    learned: [
      "Combinar stack de producto moderno con redes y análisis de registros encaja en equipos que cuidan la operación y el riesgo.",
      "Documentar límites honestos evita expectativas desalineadas en el primer sprint.",
    ],
  },
  contact: {
    id: "contact",
    title: "Contacto",
    badge: "completed",
    summary: `${CONTACT.headline} ${CONTACT.sub}`,
    features: CONTACT.links.map((l) => `${l.label}: acceso desde esta ficha`).slice(0, 5),
    stack: ["Correo", "LinkedIn", "GitHub", "WhatsApp"],
    securityConsiderations: [
      "Prefiero coordinar por canales con historial y contexto (correo o LinkedIn).",
      "No compartir contraseñas ni secretos por chat informal.",
    ],
    evidence: [
      { src: "/maps/evidence-slot.svg", alt: "Canales de contacto" },
      { src: "/maps/evidence-slot.svg", alt: "Respuesta estimada" },
    ],
    actions: {
      github: QUICK_LINKS.github,
      pdf: QUICK_LINKS.cvPath,
    },
    learned: [
      "Responder con bullets y siguiente paso concreto ahorra ciclos a ambos lados.",
      "La confianza se construye con consistencia entre lo público (GitHub) y lo narrado.",
    ],
  },
};

/** Tabs del HUD → nodo enlazado (Development Apps solo desde el mapa). Orden = tour guiado. */
export const HUD_TAB_ORDER: { tab: string; nodeId: Exclude<TopologyNodeId, "development-apps"> }[] = [
  { tab: "Núcleo JGC", nodeId: "core" },
  { tab: "Proyectos", nodeId: "projects" },
  { tab: "Seguridad", nodeId: "security-labs" },
  { tab: "Experiencia", nodeId: "experience" },
  { tab: "Certificaciones", nodeId: "certifications" },
  { tab: "Competencias", nodeId: "skills" },
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
