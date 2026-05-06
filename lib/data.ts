export type PanelLink = {
  label: string;
  href: string;
  variant?: "github" | "live" | "pdf" | "linkedin" | "email" | "whatsapp" | "default";
};

export type DevProject = {
  id: string;
  name: string;
  type: string;
  /** Imagen en `public/...` (ej. `/projects/mi-proyecto.jpg`) */
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
  learned: string;
  /** Imagen opcional en `public/...` */
  image?: string;
  /** Repos, write-ups, etc. */
  links?: PanelLink[];
};

export type TourStep = {
  nodeId: string;
  anchorId?: string;
  logMessage?: string;
};

/** Perfil mostrado en la terminal inicial y reusable en otros bloques */
export const PROFILE = {
  name: "Jancarlo Gallón Cano",
  role: "Software y ciberseguridad · Operación, confiabilidad y claridad para el negocio",
  location: "Colombia · abierto a trabajo remoto",
  status: "Disponible para nuevas oportunidades",
  focus: "Entregas estables · Visibilidad de riesgos · Comunicación clara con equipos y clientes",
} as const;

/** Bloque de perfil sobre el mapa · retrato en `public/profile.jpg` o ajusta avatarSrc. */
export const PROFILE_CONSOLE = {
  avatarSrc: "/profile.jpg",
  initials: "JG",
  windowTag: "Perfil · Jancarlo Gallón",
  lines: [
    { kind: "comment" as const, text: "# Información orientada a contratación y clientes." },
    { kind: "cmd" as const, text: "resumen --perfil" },
    {
      kind: "out" as const,
      text: `${PROFILE.name} — acompaño a equipos a llevar productos web a producción con criterios de seguridad y mantenimiento.`,
    },
    { kind: "cmd" as const, text: "enfoque" },
    {
      kind: "out" as const,
      text: "Combino construcción de software con práctica defensiva: entender el sistema, priorizar lo importante y explicar hallazgos sin jerga innecesaria.",
    },
    {
      kind: "out" as const,
      text: "Experiencia reciente como pasante de desarrollo en Outsourcing S.A.S. BIC; además, proyectos públicos y laboratorios que documentan cómo trabajo.",
    },
    { kind: "cmd" as const, text: "disponibilidad" },
    { kind: "out" as const, text: `${PROFILE.status} · ${PROFILE.location}` },
    { kind: "comment" as const, text: "# Abajo, el mapa resume cada área: ábrelo para ver detalle y enlaces." },
  ],
};

export const EXPERIENCE = {
  company: "Outsourcing S.A.S. BIC",
  role: "Pasante de desarrollo de software",
  bullets: [
    "Soporte y mantenimiento de sistemas en producción",
    "Atención y cierre de tickets técnicos y funcionales",
    "Desarrollo con Blazor Server (C#) y SQL Server",
    "Publicación de cambios en servidores Windows",
    "Documentación y soporte directo a usuarios finales",
  ],
  learned:
    "Aprendí a priorizar estabilidad en producción, a comunicarme bien con usuarios no técnicos y a resolver incidientes de punta a punta con calma.",
} as const;

export const DEV_PROJECTS: DevProject[] = [
  {
    id: "papertrail-v2",
    name: "PaperTrail v2",
    type: "Tienda web de libros con varios puntos de venta (e‑commerce)",
    image: "/projects/papertrail.jpg",
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
  },
  {
    id: "techos-rentables",
    name: "TechosRentables",
    type: "Panel web para monitorear sistemas solares (proyecto colaborativo intensivo)",
    image: "/projects/techos-rentables.jpg",
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
];

export const SECURITY_LABS: SecurityLab[] = [
  {
    id: "wazuh-siem",
    name: "Laboratorio de monitoreo y detección con Wazuh (SIEM)",
    image: "/labs/wazuh.jpg",
    description: [
      "Implementación de Wazuh como centro de vigilancia",
      "Revisión ordenada de registros (logs) de los equipos",
      "Detección de intentos repetidos de acceso indebido y revisión en contexto",
      "Cuadros de mando simples para ver el estado del laboratorio",
    ],
    status: "En curso",
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

export const CERTIFICATIONS: string[] = [
  "Certificado Profesional de Ciberseguridad de Google",
  "Fortinet Certified Fundamentals in Cybersecurity (Fundamentos Fortinet)",
  "Cisco Cybersecurity (en curso)",
  "Inglés para TI (en curso)",
  "Azure Fundamentals (planificado)",
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

/** Edita estos enlaces una sola vez: modal de nodos y barra rápida los reutilizan. */
export const QUICK_LINKS = {
  cvPath: "/cv.pdf",
  github: "https://github.com/JancarloGCdev",
  linkedin: "https://www.linkedin.com/in/YOURPROFILE",
  email: "mailto:you@yourdomain.com",
  whatsapp: "https://wa.me/57XXXXXXXXXX?text=Hola%20Jancarlo%2C",
};

export const CONTACT = {
  headline: "Construyamos software más seguro y fácil de mantener.",
  sub: "Suelo responder en 24–48 h. Abierto a equipos distribuidos y roles remotos.",
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
    {
      label: "Correo",
      href: QUICK_LINKS.email,
      variant: "email" as const,
    },
    {
      label: "WhatsApp",
      href: QUICK_LINKS.whatsapp,
      variant: "whatsapp" as const,
    },
  ],
};


/** Mismo orden que las pestañas del HUD (mapData `HUD_TAB_ORDER`). Dev Apps solo desde el mapa. */
export const GUIDED_TOUR_STEPS: TourStep[] = [
  {
    nodeId: "core",
    logMessage: "Recorrido · Perfil central, CV y cómo leer el mapa",
  },
  {
    nodeId: "projects",
    logMessage: "Recorrido · Proyectos públicos y resultados entregados",
  },
  {
    nodeId: "security-labs",
    anchorId: "wazuh-siem",
    logMessage: "Recorrido · Laboratorios de seguridad y análisis (incl. Wazuh)",
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
