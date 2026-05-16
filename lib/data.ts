export type PanelLink = {
  label: string;
  href: string;
  variant?: "github" | "live" | "linkedin" | "default";
};

export type DevProject = {
  id: string;
  name: string;
  type: string;
  /** Imagen en `public/...` (preferible AVIF; genera con `npm run optimize-images`) */
  image?: string;
  /** URL del sitio en vivo, si existe */
  liveUrl?: string;
  features: string[];
  stack: string[];
  learned: string;
  links: PanelLink[];
};

export type SecurityLab = {
  id: string;
  name: string;
  description: string[];
  status?: string;
  ongoing?: boolean;
  learned: string;
  /** Imagen opcional en `public/...` (ideal AVIF tras `npm run optimize-images`) */
  image?: string;
  /** Repos, write-ups, etc. */
  links?: PanelLink[];
};

export type TourStep = {
  nodeId: string;
  anchorId?: string;
  logMessage?: string;
};

/** Certificación con logo de emisor · `sortDate` ISO (fin aprox. del curso) para orden · `logoSrc` local o Simple Icons CDN. */
export type CertificationRecord = {
  sortDate: string;
  logoSrc: string;
  logoAlt: string;
  title: string;
  caption: string;
};

const SI = (slug: string, color: string) => `https://cdn.simpleicons.org/${slug}/${color}`;

/** Perfil mostrado en la terminal inicial y reusable en otros bloques */
export const PROFILE = {
  name: "Jancarlo Gallón Cano",
  role: "Desarrollo full stack · .NET/C# y Blazor Server · proyectos React/Next.js · redes y ciberseguridad",
  location: "Pereira, Colombia · abierto a trabajo remoto",
  status: "Disponible para nuevas oportunidades",
  focus: "Entregas estables · visibilidad de riesgos · comunicación clara con equipos y clientes · formación CCNA/ciberseguridad e inglés B2",
} as const;

const PROFILE_ABOUT_EXTENDED = [
  "Soy Desarrollador Full Stack de Pereira, Colombia, con experiencia en el desarrollo y mantenimiento de aplicaciones empresariales en entornos productivos utilizando .NET (C#) y Blazor Server. He trabajado en la optimización de módulos de negocio, resolución de tickets técnicos y funcionales, y mejora del rendimiento mediante consultas y procedimientos almacenados en SQL Server, además de apoyar despliegues en Windows Server.",
  "Complemento mi perfil con proyectos web modernos usando React y Next.js, consumo de APIs REST, control de versiones con Git/GitHub y conocimientos en herramientas como Docker y Postman, lo que me permite adaptarme a diferentes entornos de desarrollo.",
  "Actualmente estoy enfocado en fortalecer mis habilidades en redes y ciberseguridad, apoyado en formación y certificaciones como CCNA y fundamentos de seguridad informática. Cuento con nivel de inglés B2 conversacional y continúo capacitándome de forma autodidacta para seguir creciendo profesionalmente.",
] as const;

/** Bloque de perfil sobre el mapa · retrato en `public/profile.avif` o ajusta avatarSrc. */
export const PROFILE_CONSOLE = {
  avatarSrc: "/profile.avif",
  initials: "JG",
  windowTag: "Perfil · Jancarlo Gallón",
  lines: [
    { kind: "comment" as const, text: "# Información ejecutiva para lectura rápida." },
    { kind: "cmd" as const, text: "resumen --perfil" },
    {
      kind: "out" as const,
      text: `${PROFILE.name} · ${PROFILE.role}`,
    },
    { kind: "cmd" as const, text: "sobre-mí --extendido" },
    { kind: "out" as const, text: PROFILE_ABOUT_EXTENDED[0] },
    { kind: "out" as const, text: PROFILE_ABOUT_EXTENDED[1] },
    { kind: "out" as const, text: PROFILE_ABOUT_EXTENDED[2] },
    { kind: "cmd" as const, text: "disponibilidad" },
    { kind: "out" as const, text: `${PROFILE.status} · ${PROFILE.location}` },
    { kind: "comment" as const, text: "# Abajo, el mapa resume cada área: ábrelo para ver detalle y enlaces." },
  ],
};

export type ExperienceEntry = {
  company: string;
  role: string;
  location: string;
  period: string;
  summary: string;
  bullets: readonly string[];
  modalTakeaways: readonly [string, string];
  stack: readonly string[];
  insightsHeading?: string;
  securityConsiderations: readonly string[];
};

export const EXPERIENCES: ExperienceEntry[] = [
  {
    company: "Outsourcing S.A.S. BIC",
    role: "Desarrollador Full Stack .NET (Blazor / ASP.NET)",
    location: "Bogotá D.C., Colombia",
    period: "jun. 2025 – dic. 2025",
    summary:
      "Desarrollo full stack en .NET y Blazor Server sobre aplicaciones empresariales en producción: tickets, evolución funcional, SQL Server y apoyo a despliegues en Windows Server.",
    bullets: [
      "Gestioné y resolví tickets de soporte técnico y funcional en aplicaciones empresariales en producción, priorizando estabilidad y tiempo de respuesta.",
      "Desarrollé, mantuve y optimicé módulos en Blazor Server (C#): lógica de negocio, mejoras y corrección de defectos con foco en impacto en usuarios.",
      "Diseñé e implementé nuevos módulos funcionales según requerimientos del cliente y la hoja de ruta del aplicativo.",
      "Optimicé consultas y procedimientos almacenados en SQL Server y colaboré en despliegues a producción y operación básica sobre Windows Server.",
    ],
    modalTakeaways: [
      "En producción, reproducibilidad del incidente y contexto claro reducen idas y vueltas entre soporte y desarrollo.",
      "Dos líneas de registro tras un cambio suelen evitar una segunda ola del mismo ticket.",
    ],
    stack: ["Blazor Server", "C#", ".NET", "SQL Server", "Windows Server"],
    insightsHeading: "Producción",
    securityConsiderations: [
      "Ventanas de cambio anunciadas antes de tocar usuarios; acceso a producción lo más acotado posible.",
    ],
  },
];

export const DEV_PROJECTS: DevProject[] = [
  {
    id: "techos-rentables",
    name: "TechosRentables",
    type: "Panel web para monitorear sistemas solares (proyecto colaborativo intensivo)",
    image: "/projects/github-wordmark.avif",
    features: ["Indicadores clave en pantalla, alertas, reportes y exportación a PDF"],
    stack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Tailwind"],
    learned:
      "Practiqué cómo llevar métricas de operación día a día a una interfaz clara y cómo ordenar información confiable detrás para que los equipos tomen decisiones.",
    links: [
      {
        label: "Ver en GitHub",
        href: "https://github.com/JancarloGCdev/TechosRentables-Proyecto",
        variant: "github",
      },
    ],
  },
  {
    id: "papertrail-v2",
    name: "PaperTrail v2",
    type: "Tienda web de libros con varios puntos de venta (e‑commerce)",
    image: "/projects/github-wordmark.avif",
    features: [
      "Catálogo, buscador, carrito de compras y proceso de pago",
      "Perfiles comprador / administrador (quién puede hacer qué dentro del sitio)",
    ],
    stack: ["TypeScript", "JavaScript", "REST API", "Git"],
    learned:
      "Entendí cómo se arma una tienda online de principio a fin: datos en servidor, vistas claras para el cliente y límites de permisos bien definidos.",
    links: [
      {
        label: "Ver en GitHub",
        href: "https://github.com/JancarloGCdev/papertrailv2",
        variant: "github",
      },
    ],
  }
];

export const SECURITY_LABS: SecurityLab[] = [
  {
    id: "wazuh-siem",
    name: "Laboratorio de monitoreo y detección con Wazuh (SIEM)",
    image: "/labs/wazuh.avif",
    description: [
      "Implementación de Wazuh como centro de vigilancia",
      "Revisión ordenada de registros (logs) de los equipos",
      "Detección de intentos repetidos de acceso indebido y revisión en contexto",
      "Cuadros de mando simples para ver el estado del laboratorio",
    ],
    status: "En curso",
    ongoing: true,
    learned:
      "Experimenté cómo reunir avisos de muchas fuentes, priorizarlos y mantener evidencia que explique por qué algo parece sospechoso.",
  },
  {
    id: "python-log-analyzer",
    name: "Analizador de registros en Python",
    description: [
      "Script que lee archivos de registro y señala patrones llamativos",
      "Exportación de hallazgos a CSV o JSON para revisarlos con calma",
    ],
    learned:
      "Reforcé cómo automatizar la lectura repetitiva de logs y comunicar hallazgos en formatos que otras personas pueden abrir sin herramientas raras.",
  },
  {
    id: "enterprise-network-security",
    name: "Red empresarial con segmentación (modelo en laboratorio)",
    description: [
      "Segmentación básica de red y acceso administrado por SSH",
      "Opciones contra suplantación de direcciones y tráfego no autorizado",
      "Protección física‑lógica de puertos de conmutación",
      "Topología modelada en Packet Tracer como guía de estudio",
    ],
    learned:
      "Organicé cómo pensar una red como capas de confianza: si una pieza falla, el diseño debe limitar el alcance del problema.",
  },
];

export const CERTIFICATIONS: CertificationRecord[] = [
  {
    sortDate: "2025-05-31",
    logoSrc: SI("cisco", "1BA0D7"),
    logoAlt: "Cisco",
    title: "English for IT 1",
    caption: "Cisco Networking Academy · may 2025",
  },
  {
    sortDate: "2025-03-31",
    logoSrc: SI("meta", "0668E1"),
    logoAlt: "Meta",
    title: "Introducción al desarrollo back-end",
    caption: "Meta · Coursera · ene 2025 – mar 2025",
  },
  {
    sortDate: "2025-03-31",
    logoSrc: SI("meta", "0668E1"),
    logoAlt: "Meta",
    title: "Introducción al desarrollo front-end",
    caption: "Meta · Coursera · ene 2025 – mar 2025",
  },
  {
    sortDate: "2025-03-31",
    logoSrc: SI("meta", "0668E1"),
    logoAlt: "Meta",
    title: "Control de versiones con Git",
    caption: "Meta · Coursera · ene 2025 – mar 2025",
  },
  {
    sortDate: "2025-03-31",
    logoSrc: SI("meta", "0668E1"),
    logoAlt: "Meta",
    title: "Programación con JavaScript",
    caption: "Meta · Coursera · ene 2025 – mar 2025",
  },
  {
    sortDate: "2025-03-31",
    logoSrc: SI("meta", "0668E1"),
    logoAlt: "Meta",
    title: "Programación en Python",
    caption: "Meta · Coursera · ene 2025 – mar 2025",
  },
  {
    sortDate: "2025-02-28",
    logoSrc: "/certifications/uci-merage.svg",
    logoAlt: "UC Irvine · The Paul Merage School of Business",
    title: "Resolución de problemas y toma de decisiones",
    caption: "UC Irvine · Merage · feb 2025",
  },
  {
    sortDate: "2025-01-31",
    logoSrc: SI("google", "4285F4"),
    logoAlt: "Google",
    title: "Foundations of Cybersecurity",
    caption: "Google · Coursera · ene 2025",
  },
  {
    sortDate: "2024-11-30",
    logoSrc: SI("cisco", "1BA0D7"),
    logoAlt: "Cisco",
    title: "CCNA: Introduction to Networks",
    caption: "Cisco Networking Academy · nov 2024",
  },
  {
    sortDate: "2024-11-15",
    logoSrc: SI("cisco", "1BA0D7"),
    logoAlt: "Cisco",
    title: "Introducción a la ciberseguridad",
    caption: "Cisco Networking Academy · nov 2024",
  },
];

export const SKILL_MODULES = [
  {
    title: "Desarrollo",
    items: ["C#, Blazor Server, .NET", "Next.js, React", "TypeScript, JavaScript", "SQL Server, PostgreSQL"],
  },
  {
    title: "Ciberseguridad",
    items: [
      "Bases de redes y protocolos habituales",
      "Ideas prácticas de endurecimiento en Linux",
      "Introducción a SIEM y visibilidad centralizada",
      "Lectura y priorización de logs",
    ],
  },
  {
    title: "Herramientas",
    items: ["Git/GitHub", "Postman", "Docker (nivel básico)"],
  },
] as const;

/** Enlaces compartidos entre modales y la barra rápida. */
export const QUICK_LINKS = {
  github: "https://github.com/JancarloGCdev",
  linkedin: "https://www.linkedin.com/in/jancarlo-gc",
};

export const CONTACT = {
  headline: "Software en producción, con riesgo tratado desde el diseño cuando aplica.",
  sub: "No publico un CV descargable en abierto: exponer datos personales en un PDF accesible para cualquiera aumenta el riesgo de fraudes o usos indebidos de la información. Si quieres trabajar conmigo, escríbeme por LinkedIn con contexto claro (rol, empresa, stack) y desde ahí sí podemos coordinar un intercambio seguro y profesional.",
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


/** Mismo orden que las pestañas del HUD (mapData `HUD_TAB_ORDER`). Dev Apps solo desde el mapa. */
export const GUIDED_TOUR_STEPS: TourStep[] = [
  {
    nodeId: "core",
    logMessage: "Recorrido · Perfil central y lectura del mapa",
  },
  {
    nodeId: "projects",
    logMessage: "Recorrido · Proyectos públicos y resultados entregados",
  },
  {
    nodeId: "security-labs",
    anchorId: "python-log-analyzer",
    logMessage: "Recorrido · Laboratorios de seguridad y análisis prácticos",
  },
  {
    nodeId: "experience",
    logMessage: "Recorrido · Experiencia y contexto de equipo",
  },
  {
    nodeId: "certifications",
    logMessage: "Recorrido · Certificaciones y formación",
  },
  {
    nodeId: "skills",
    logMessage: "Recorrido · Competencias y tecnologías frecuentes",
  },
  {
    nodeId: "contact",
    logMessage: "Recorrido · Canales de contacto y próximos pasos",
  },
];
