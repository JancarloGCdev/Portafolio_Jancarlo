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
  "Soy Ingeniero de Sistemas y Computación de la Universidad Tecnológica de Pereira y Técnico en Desarrollo de Software del SENA. Cuento con experiencia profesional en desarrollo full stack y un fuerte enfoque en Inteligencia Artificial, integración de LLMs y análisis de datos para construir productos de tecnología escalables que generan valor comercial directo.",
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
    institution: "Universidad Tecnológica de Pereira",
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
    tagline: "Experiencia web interactiva con Next.js 15, React 19, TypeScript, animaciones complejas en GSAP, física Matrix interactiva en Canvas y Three.js.",
    image: "/projects/portfolio-engineering/preview.avif",
    images: [
      "/projects/portfolio-engineering/1.avif",
      "/projects/portfolio-engineering/2.avif",
      "/projects/portfolio-engineering/3.avif",
      "/projects/portfolio-engineering/4.avif",
      "/projects/portfolio-engineering/5.avif",
    ],
    features: [
      "Background interactivo tipo Matrix con simulación de ondas de choque, pozos de gravedad con click secundario y renderizado optimizado a 60 FPS.",
      "Orquestación de micro-interacciones, animaciones de entrada y scroll-storytelling impulsadas por GSAP y ScrollTrigger.",
      "Terminal Linux interactiva con emulación de comandos en vivo, modo guiado y feedback táctil.",
      "Arquitectura modular full stack con Next.js 15, internacionalización (ES / EN) basada en cookies sin parpadeo y SEO integral.",
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "GSAP", "Three.js", "Canvas / WebGL", "Tailwind CSS", "Server Actions"],
    learned:
      "Diseñé e implementé gráficos interactivos en Canvas/WebGL y Three.js, optimizando el ciclo de renderizado para mantener 60 FPS estables sin sobrecargar la GPU/CPU. Además, dominé la sincronización de animaciones complejas con GSAP y la creación de una arquitectura full-stack rápida, accesible y de alta calidad visual.",
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
    type: "Plataforma Web de Gestión de Incidencias Escolares",
    tagline: "Gestión y canalización de reportes escolares con acceso exclusivo para estudiantes de la institución vía Google OAuth y base de datos en Supabase.",
    image: "/projects/smart-school-reports/preview.avif",
    images: [
      "/projects/smart-school-reports/1.avif",
      "/projects/smart-school-reports/2.avif",
      "/projects/smart-school-reports/3.avif",
      "/projects/smart-school-reports/4.avif",
    ],
    features: [
      "Autenticación segura con Google OAuth con restricción estricta de dominio para permitir el ingreso exclusivo a estudiantes de la institución educativa (I.E.).",
      "Gestión y canalización de incidencias escolares en tiempo real con ciclo de estados (Abierto, En Revisión, Resuelto).",
      "Modelado relacional y políticas de seguridad a nivel de fila (RLS) en Supabase (PostgreSQL).",
      "Panel ágil y responsivo para el seguimiento y resolución de problemas dentro de la institución.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Supabase", "Google OAuth", "Tailwind CSS", "PostgreSQL"],
    learned:
      "Aprendí e implementé autenticación con Google OAuth para restringir el acceso exclusivo a los estudiantes de la institución educativa, además del modelado y persistencia de datos en Supabase con Next.js y TypeScript.",
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
    name: "SolarBrain",
    type: "Plataforma de Monitoreo y Telemetría de Energía Solar (Hackathon)",
    tagline: "Supervisión en tiempo real de paneles solares mediante middleware con detección de fallas y alertas automáticas por WhatsApp.",
    image: "/projects/solarbrain-techos/preview.avif",
    images: [
      "/projects/solarbrain-techos/1.avif",
      "/projects/solarbrain-techos/2.avif",
      "/projects/solarbrain-techos/3.avif",
    ],
    features: [
      "Consumo e ingesta de telemetría de paneles solares en tiempo real a través de un middleware especializado provisto en la hackathon.",
      "Sistema de detección y geolocalización de fallas, identificando con exactitud cuál panel falló y su ubicación.",
      "Mecanismo de alertas automáticas multicanal ante caídas de rendimiento, incluyendo notificaciones instantáneas vía WhatsApp.",
      "Dashboard analítico interactivo con KPIs de generación fotovoltaica y exportación de reportes operativos en PDF.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Middleware API", "WhatsApp API", "Tailwind CSS"],
    learned:
      "Aprendí a consumir e interpretar telemetría de paneles solares en tiempo real mediante el middleware provisto en la hackathon, y a diseñar un sistema de alertas críticas capaz de identificar la ubicación del panel averiado y notificar de inmediato por WhatsApp.",
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
