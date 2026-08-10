export type PanelLink = {
  label: string;
  href: string;
  variant?: "github" | "live" | "linkedin" | "default";
};

export type DevProject = {
  id: string;
  name: string;
  type: string;
  tagline?: string;
  image?: string;
  images?: string[];
  liveUrl?: string;
  features: string[];
  stack: string[];
  learned: string;
  links: PanelLink[];
};

export type EducationRecord = {
  institution: string;
  degree: string;
  location: string;
  period: string;
  description?: string;
};

export type CertificationRecord = {
  sortDate: string;
  logoSrc: string;
  logoAlt: string;
  title: string;
  caption: string;
  issuer: string;
  credentialUrl?: string;
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

const SI = (slug: string, color: string) => `https://cdn.simpleicons.org/${slug}/${color}`;

/** Perfil profesional de Jancarlo Gallón Cano */
export const PROFILE = {
  name: "Jancarlo Gallón Cano",
  role: "Software Engineer | Full Stack Developer · Next.js, React, .NET (C#) & Python · Arquitectura escalable, Cloud y Ciberseguridad",
  location: "Pereira, Risaralda, Colombia · Abierto a trabajo remoto / híbrido",
  status: "Disponible para nuevas oportunidades",
  focus: "Construcción de aplicaciones web de alto rendimiento, backend estructurado con APIs REST, optimización de base de datos SQL y código mantenible con buenas prácticas de seguridad.",
  email: "jancarlogallonc@gmail.com",
  languages: "Español (Nativo) · Inglés (B1-B2 Conversacional)",
} as const;

export const DEFAULT_ABOUT_PARAGRAPHS_ES = [
  "Soy Ingeniero de Sistemas y Computación (en formación en la Universidad Tecnológica de Pereira) y Técnico en Desarrollo de Software del SENA. Cuento con experiencia profesional en desarrollo full stack, participando en el mantenimiento y evolución de aplicaciones empresariales críticas en producción con .NET (C#), Blazor Server y SQL Server en Outsourcing S.A.S. BIC.",
  "Me especializo en diseñar y construir productos web completos y escalables con Next.js, React, TypeScript, Python y Tailwind CSS, implementando arquitecturas limpias, consumo eficiente de APIs REST, autenticación y modelado de datos con SQL Server y PostgreSQL.",
  "Complemento mi perfil con formación en redes y seguridad informática respaldada por cursos y certificaciones de Cisco (CCNA: Introduction to Networks) y Google, además de metodologías de resolución de problemas de UC Irvine. Manejo un nivel de inglés B1-B2 conversacional y me adapto con rapidez a entornos ágiles y orientados a resultados.",
] as const;

export const EXPERIENCES: ExperienceEntry[] = [
  {
    company: "Outsourcing S.A.S. BIC",
    role: "Desarrollador Full Stack .NET (Blazor / ASP.NET)",
    location: "Bogotá D.C., Colombia (Remoto)",
    period: "Jun. 2025 – Dic. 2025",
    summary:
      "Desarrollo y soporte full stack de aplicaciones empresariales en producción utilizando .NET (C#), Blazor Server y SQL Server, asegurando alta disponibilidad, resolución ágil de incidencias y despliegues estables.",
    bullets: [
      "Desarrollé y mantuve módulos empresariales críticos en Blazor Server (C#), implementando mejoras funcionales y optimizaciones en la lógica de negocio.",
      "Participé en la resolución de incidencias en ambientes productivos bajo SLA, garantizando la estabilidad y continuidad operativa de los sistemas.",
      "Optimicé consultas complejas y procedimientos almacenados en SQL Server, mejorando los tiempos de respuesta de la base de datos.",
      "Apoyé despliegues en ambientes Windows Server y colaboré en actividades de mantenimiento y configuración de infraestructura.",
    ],
    modalTakeaways: [
      "La reproducibilidad metódica y el registro riguroso de contexto reducen drásticamente los tiempos de resolución en entornos productivos.",
      "La validación temprana en bases de datos y la gestión estricta de permisos previenen incidentes recurrentes tras cada despliegue.",
    ],
    stack: [".NET", "C#", "Blazor Server", "ASP.NET Core", "SQL Server", "Stored Procedures", "Windows Server"],
    insightsHeading: "Entornos Productivos",
    securityConsiderations: [
      "Principio de menor privilegio en credenciales de producción y ventanas controladas para despliegues.",
    ],
  },
];

export const EDUCATION: EducationRecord[] = [
  {
    institution: "Universidad Tecnológica de Pereira (UTP)",
    degree: "Ingeniería de Sistemas y Computación",
    location: "Pereira, Risaralda, Colombia",
    period: "Ene. 2021 – Jul. 2026",
    description:
      "Formación integral en algoritmos, estructuras de datos, arquitectura de software, bases de datos relacionales, ingeniería web, redes y seguridad.",
  },
  {
    institution: "Servicio Nacional de Aprendizaje (SENA)",
    degree: "Técnico en Desarrollo de Software",
    location: "Cartago, Valle del Cauca, Colombia",
    period: "Ene. 2019 – Dic. 2020",
    description:
      "Fundamentos sólidos de programación orientada a objetos, bases de datos SQL, lógica algorítmica y construcción de interfaces web.",
  },
];

export const DEV_PROJECTS: DevProject[] = [
  {
    id: "portfolio-engineering",
    name: "Engineering Portfolio & Interactive CLI",
    type: "Portafolio Web de Alto Rendimiento con Terminal Interactiva",
    tagline: "Landing comercial moderna construida con Next.js 15, React 19, TypeScript, GSAP e i18n manual.",
    image: "/projects/portfolio-engineering/preview.png",
    images: [
      "/projects/portfolio-engineering/1.png",
      "/projects/portfolio-engineering/2.png",
      "/projects/portfolio-engineering/3.png",
    ],
    features: [
      "Terminal Linux interactiva con sesión simulada y comandos dinámicos.",
      "Sistema de internacionalización estricto (ES / EN) basado en cookies sin parpadeos de hidratación.",
      "Animaciones de entrada y scroll-storytelling orquestadas con GSAP.",
      "Arquitectura de componentes optimizada con 100% type-safety y SEO completo (JSON-LD, OpenGraph).",
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "GSAP", "Server Actions"],
    learned:
      "Construí una experiencia web que combina narrativa comercial, rendimiento óptimo, interactividad técnica y accesibilidad.",
    links: [
      {
        label: "Ver en GitHub",
        href: "https://github.com/JancarloGCdev/Portafolio_Jancarlo",
        variant: "github",
      },
    ],
  },
  {
    id: "smart-school-reports",
    name: "Smart School Reports",
    type: "Plataforma Inteligente de Gestión de Incidencias Escolares",
    tagline: "Detección inteligente de reportes duplicados y priorización de casos con IA para instituciones educativas.",
    image: "/projects/smart-school-reports/preview.png",
    images: [
      "/projects/smart-school-reports/1.png",
      "/projects/smart-school-reports/2.png",
      "/projects/smart-school-reports/3.png",
    ],
    features: [
      "Detección y agrupación automática de reportes similares mediante IA para evitar duplicidad de trabajo.",
      "Flujo de estados en tiempo real para seguimiento de incidencias (Abierto, En Proceso, Resuelto).",
      "Panel administrativo con filtrado por criticidad, categoría y rol institucional.",
      "Arquitectura modular orientada a desacoplar el motor de procesamiento inteligente de la interfaz.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Python / FastAPI", "PostgreSQL", "Tailwind CSS", "REST API"],
    learned:
      "Diseñé una solución orientada a problemas reales de gestión operativa, optimizando la categorización de información mediante procesamiento de lenguaje natural y diseño centrado en el usuario.",
    links: [
      {
        label: "Ver en GitHub",
        href: "https://github.com/JancarloGCdev/edufix-ai",
        variant: "github",
      },
    ],
  },
  {
    id: "solarbrain-techos",
    name: "SolarBrain (TechosRentables)",
    type: "Plataforma de Monitoreo y Gestión de Energía Solar (Hackathon)",
    tagline: "Panel analítico para supervisión de despliegues solares fotovoltaicos e indicadores de rendimiento.",
    image: "/projects/solarbrain-techos/preview.png",
    images: [
      "/projects/solarbrain-techos/1.png",
      "/projects/solarbrain-techos/2.png",
      "/projects/solarbrain-techos/3.png",
    ],
    features: [
      "Dashboard con tarjetas de KPIs energéticos en tiempo real y telemetría de instalaciones.",
      "Sistema de alertas operativas ante desviaciones de generación fotovoltaica.",
      "Generación y descarga de resúmenes operativos en formato PDF para clientes y técnicos.",
      "Modelado de datos relacional con PostgreSQL y Prisma ORM.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    learned:
      "Desarrollo colaborativo de alta velocidad durante hackathon, transformando requerimientos operativos en una interfaz de toma de decisiones clara y confiable.",
    links: [
      {
        label: "Ver en GitHub",
        href: "https://github.com/JancarloGCdev/TechosRentables-Proyecto",
        variant: "github",
      },
    ],
  },
  {
    id: "papertrail-commerce",
    name: "PaperTrail Commerce (v2)",
    type: "Plataforma Full Stack de E-Commerce para Librería",
    tagline: "Solución de comercio electrónico completa con catálogo dinámico, carrito y gestión con Strapi CMS.",
    image: "/projects/papertrail-commerce/preview.png",
    images: [
      "/projects/papertrail-commerce/1.png",
      "/projects/papertrail-commerce/2.png",
      "/projects/papertrail-commerce/3.png",
    ],
    features: [
      "Catálogo interactivo de libros con filtrado por categorías, búsqueda en tiempo real y paginación.",
      "Gestión de carrito de compras y flujo estructurado de checkout.",
      "Integración de CMS headless (Strapi) mediante APIs REST para control de inventario y contenidos.",
      "Control de acceso y diferenciación de roles de usuario (Cliente / Administrador).",
    ],
    stack: ["React", "Next.js", "TypeScript", "Strapi CMS", "REST API", "Tailwind CSS", "Git"],
    learned:
      "Consolidé patrones de arquitectura frontend con componentes reutilizables y consumo desacoplado de APIs en un flujo comercial completo.",
    links: [
      {
        label: "Ver en GitHub",
        href: "https://github.com/JancarloGCdev/papertrailv2",
        variant: "github",
      },
    ],
  },
  {
    id: "quine-mccluskey-simplifier",
    name: "Quine-McCluskey Logic Simplifier",
    type: "Software de Simplificación Algorítmica de Circuitos Lógicos",
    tagline: "Implementación en Python para reducción y optimización exacta de funciones booleanas.",
    image: "/projects/quine-mccluskey-simplifier/preview.png",
    images: [
      "/projects/quine-mccluskey-simplifier/1.png",
      "/projects/quine-mccluskey-simplifier/2.png",
      "/projects/quine-mccluskey-simplifier/3.png",
    ],
    features: [
      "Procesamiento algorítmico tabular paso a paso de minitérminos y condiciones no importa (don't care).",
      "Estructura modular orientada a reutilización de código y generación de tablas de implicantes primos.",
      "Validación de entradas con manejo consistente de casos borde y funciones booleanas complejas.",
    ],
    stack: ["Python", "Algoritmos", "Lógica Digital", "Pytest"],
    learned:
      "Profundicé en optimización algorítmica, complejidad computacional y estructuración modular de software en Python.",
    links: [
      {
        label: "Ver en GitHub",
        href: "https://github.com/JancarloGCdev/McCluskeyReductor",
        variant: "github",
      },
    ],
  },
];

export const CERTIFICATIONS: CertificationRecord[] = [
  {
    sortDate: "2025-05-31",
    logoSrc: SI("cisco", "1BA0D7"),
    logoAlt: "Cisco",
    title: "English for IT 1",
    caption: "Cisco Networking Academy · May. 2025",
    issuer: "Cisco Networking Academy",
  },
  {
    sortDate: "2025-05-15",
    logoSrc: SI("cisco", "1BA0D7"),
    logoAlt: "Cisco",
    title: "Introducción a la Ciberseguridad",
    caption: "Cisco Networking Academy · May. 2025",
    issuer: "Cisco Networking Academy",
  },
  {
    sortDate: "2025-03-31",
    logoSrc: SI("meta", "0668E1"),
    logoAlt: "Meta",
    title: "Introducción al Desarrollo Back-End",
    caption: "Meta · Coursera · 2025",
    issuer: "Meta",
  },
  {
    sortDate: "2025-03-31",
    logoSrc: SI("meta", "0668E1"),
    logoAlt: "Meta",
    title: "Introducción al Desarrollo Front-End",
    caption: "Meta · Coursera · 2025",
    issuer: "Meta",
  },
  {
    sortDate: "2025-03-31",
    logoSrc: SI("meta", "0668E1"),
    logoAlt: "Meta",
    title: "Control de Versiones con Git",
    caption: "Meta · Coursera · 2025",
    issuer: "Meta",
  },
  {
    sortDate: "2025-03-31",
    logoSrc: SI("meta", "0668E1"),
    logoAlt: "Meta",
    title: "Programación con JavaScript",
    caption: "Meta · Coursera · 2025",
    issuer: "Meta",
  },
  {
    sortDate: "2025-03-31",
    logoSrc: SI("meta", "0668E1"),
    logoAlt: "Meta",
    title: "Programación en Python",
    caption: "Meta · Coursera · 2025",
    issuer: "Meta",
  },
  {
    sortDate: "2025-02-28",
    logoSrc: "/certifications/uci-merage.svg",
    logoAlt: "UC Irvine · The Paul Merage School of Business",
    title: "Resolución de Problemas y Toma de Decisiones",
    caption: "UC Irvine · Paul Merage School of Business · Feb. 2025",
    issuer: "University of California, Irvine",
  },
  {
    sortDate: "2025-01-31",
    logoSrc: SI("google", "4285F4"),
    logoAlt: "Google",
    title: "Fundamentos de la Ciberseguridad (Foundations of Cybersecurity)",
    caption: "Google · Coursera · Ene. 2025",
    issuer: "Google",
  },
  {
    sortDate: "2024-11-30",
    logoSrc: SI("cisco", "1BA0D7"),
    logoAlt: "Cisco",
    title: "CCNA: Introduction to Networks",
    caption: "Cisco Networking Academy · Nov. 2024",
    issuer: "Cisco Networking Academy",
  },
];

export const SKILL_MODULES = [
  {
    title: "Frontend & Web Moderno",
    items: [
      "React",
      "Next.js (App Router)",
      "TypeScript",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "GSAP Animations",
      "HTML5 / CSS3 Semántico",
    ],
  },
  {
    title: "Backend & Arquitectura",
    items: [
      ".NET / C#",
      "Blazor Server",
      "ASP.NET Core",
      "Python (FastAPI)",
      "Node.js",
      "APIs RESTful",
      "Arquitectura Limpia & Modular",
    ],
  },
  {
    title: "Bases de Datos",
    items: [
      "SQL Server (Consultas & Stored Procedures)",
      "PostgreSQL",
      "Prisma ORM",
      "Entity Framework Core",
      "Modelado Relacional",
    ],
  },
  {
    title: "Herramientas, DevOps & Cloud",
    items: [
      "Git & GitHub (Flujos Colaborativos)",
      "Docker (Contenedores)",
      "Postman (Pruebas de API)",
      "Linux / Bash",
      "Windows Server (Despliegues en Producción)",
      "Fundamentos de Azure",
    ],
  },
  {
    title: "Redes, Seguridad & AI",
    items: [
      "Cisco CCNA (Fundamentos de Redes & TCP/IP)",
      "Fundamentos de Ciberseguridad (Google & Cisco)",
      "Integración de Modelos de IA / Embeddings",
      "Buenas prácticas de seguridad en software",
    ],
  },
] as const;

export const QUICK_LINKS = {
  github: "https://github.com/JancarloGCdev",
  linkedin: "https://www.linkedin.com/in/jancarlo-gc",
  email: "mailto:jancarlogallonc@gmail.com",
};

export const CONTACT = {
  headline: "¿Tienes un reto técnico o una posición abierta? Hablemos.",
  sub: "Estoy disponible para roles como Software Engineer o Full Stack Developer (remoto o híbrido). Mi canal preferido de contacto profesional es LinkedIn, o puedes escribirme directamente por correo electrónico.",
  email: "jancarlogallonc@gmail.com",
  location: "Pereira, Risaralda, Colombia",
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
      label: "Enviar Correo",
      href: QUICK_LINKS.email,
      variant: "live" as const,
    },
  ],
};
