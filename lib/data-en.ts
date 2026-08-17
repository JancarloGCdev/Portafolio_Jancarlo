import type { DevProject, ExperienceEntry, EducationRecord, CertificationRecord } from "@/lib/data";
import { QUICK_LINKS } from "@/lib/data";

const SI = (slug: string, color: string) => `https://cdn.simpleicons.org/${slug}/${color}`;

/** Professional Profile of Jancarlo Gallón Cano */
export const PROFILE = {
  name: "Jancarlo Gallón Cano",
  role: "Software Engineer | Full Stack Developer · Next.js, React, .NET (C#) & Python · Scalable Architecture, Cloud & Cybersecurity",
  location: "Pereira, Risaralda, Colombia · Open to remote / hybrid roles",
  status: "Open to new opportunities",
  focus: "Building high-performance web applications, structured backends with REST APIs, SQL database optimization, and maintainable code grounded in security best practices.",
  email: "jancarlogallonc@gmail.com",
  languages: "Spanish (Native) · English (B1-B2 Conversational)",
} as const;

export const DEFAULT_ABOUT_PARAGRAPHS_EN = [
  "I am a Systems and Computer Engineer from Universidad Tecnológica de Pereira and a Software Development Technician from SENA. Experienced in full-stack engineering with a strong focus on Artificial Intelligence, LLM integration, and data solutions that drive real commercial value.",
  "I specialize in architecting and delivering full-stack web products with Next.js, React, TypeScript, Python, and Tailwind CSS—implementing clean modular architectures, resilient REST API integrations, secure authentication, and relational data modeling with SQL Server and PostgreSQL.",
  "I complement my development background with networking and computer security coursework from Cisco (CCNA: Introduction to Networks) and Google, paired with problem-solving and decision-making training from UC Irvine. I communicate fluently in conversational English (B1-B2) and thrive in collaborative, delivery-oriented teams.",
] as const;

export const EXPERIENCES: ExperienceEntry[] = [
  {
    company: "Outsourcing S.A.S. BIC",
    role: "Full Stack .NET Developer (Blazor / ASP.NET)",
    location: "Bogotá D.C., Colombia (Remote)",
    period: "Jun 2025 – Dec 2025",
    summary:
      "Full-stack development and production support for enterprise business systems using .NET (C#), Blazor Server, and SQL Server—ensuring high reliability, swift issue resolution, and predictable release cycles.",
    bullets: [
      "Built, maintained, and tuned business-critical modules in Blazor Server (C#), shipping functional features and refining domain logic.",
      "Diagnosed and resolved production tickets under SLA constraints, ensuring continuous system availability and uptime.",
      "Optimized complex SQL Server queries and stored procedures, enhancing database throughput and response times.",
      "Supported deployments on Windows Server environments and assisted with infrastructure maintenance and operational tasks.",
    ],
    modalTakeaways: [
      "Methodical incident reproduction and rich context tracking drastically speed up root-cause resolution in production.",
      "Early data-layer validation and strict permission controls prevent recurring defects after deployment windows.",
    ],
    stack: [".NET", "C#", "Blazor Server", "ASP.NET Core", "SQL Server", "Stored Procedures", "Windows Server"],
    insightsHeading: "Production Environments",
    securityConsiderations: [
      "Least privilege principles for production database credentials and controlled release schedules.",
    ],
  },
];

export const EDUCATION: EducationRecord[] = [
  {
    institution: "Universidad Tecnológica de Pereira",
    degree: "B.S. in Systems and Computer Engineering",
    location: "Pereira, Risaralda, Colombia",
    period: "Jan 2021 – Jul 2026",
    description:
      "Comprehensive training in data structures, algorithms, software architecture, relational databases, web engineering, networking, and information security.",
  },
  {
    institution: "Servicio Nacional de Aprendizaje (SENA)",
    degree: "Associate Degree in Software Development",
    location: "Cartago, Valle del Cauca, Colombia",
    period: "Jan 2019 – Dec 2020",
    description:
      "Rigorous foundations in object-oriented programming, SQL database design, algorithmic logic, and web interface construction.",
  },
];

export const DEV_PROJECTS: DevProject[] = [
  {
    id: "portfolio-engineering",
    name: "Engineering Portfolio & Interactive CLI",
    type: "High-Performance Portfolio Landing with Interactive Linux Shell",
    tagline: "Interactive web experience built with Next.js 15, React 19, TypeScript, GSAP choreography, and Canvas Matrix physics with Three.js.",
    image: "/projects/portfolio-engineering/preview.avif",
    images: [
      "/projects/portfolio-engineering/1.avif",
      "/projects/portfolio-engineering/2.avif",
      "/projects/portfolio-engineering/3.avif",
      "/projects/portfolio-engineering/4.avif",
      "/projects/portfolio-engineering/5.avif",
    ],
    features: [
      "Interactive Matrix-style rain background featuring shockwave physics, right-click gravity wells, and continuous 60 FPS canvas rendering.",
      "Sophisticated micro-interactions, entrance choreography, and scroll-storytelling orchestrated via GSAP and ScrollTrigger.",
      "Interactive simulated Linux terminal with real-time command execution, interactive guided tours, and rich feedback.",
      "Zero-flicker cookie-based internationalization (ES / EN), Next.js 15 architecture, strict type-safety, and complete SEO.",
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "GSAP", "Three.js", "Canvas / WebGL", "Tailwind CSS", "Server Actions"],
    learned:
      "Mastered high-performance Canvas/WebGL rendering and Three.js techniques, tuning frame loops to sustain smooth 60 FPS without GPU/CPU bottlenecks, while orchestrating advanced GSAP animations and architecting a clean, accessible Next.js web application.",
    links: [
      {
        label: "View on GitHub",
        href: "https://github.com/JancarloGCdev/Portafolio_Jancarlo",
        variant: "github",
      },
    ],
  },
  {
    id: "smart-school-reports",
    name: "Smart School Reports",
    type: "School Incident Management & Reporting Platform",
    tagline: "School incident management portal with access restricted exclusively to institutional students via Google OAuth and Supabase.",
    image: "/projects/smart-school-reports/preview.avif",
    images: [
      "/projects/smart-school-reports/1.avif",
      "/projects/smart-school-reports/2.avif",
      "/projects/smart-school-reports/3.avif",
      "/projects/smart-school-reports/4.avif",
    ],
    features: [
      "Secure Google OAuth authentication with strict domain filtering to allow exclusive access only to students of the institution.",
      "Real-time ticket lifecycle tracking for campus issues and maintenance reports (Open, In Review, Resolved).",
      "Relational data modeling and Row Level Security (RLS) policies configured in Supabase (PostgreSQL).",
      "Responsive administrative dashboard for tracking and resolving student reports.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Supabase", "Google OAuth", "Tailwind CSS", "PostgreSQL"],
    learned:
      "Mastered Google OAuth integration to enforce exclusive student-only domain access, along with relational database management and cloud architecture using Supabase and Next.js.",
    links: [
      {
        label: "View on GitHub",
        href: "https://github.com/JancarloGCdev/edufix-ai",
        variant: "github",
      },
    ],
  },
  {
    id: "solarbrain-techos",
    name: "SolarBrain",
    type: "Solar Telemetry & Energy Monitoring Platform (Hackathon)",
    tagline: "Real-time solar panel monitoring via telemetry middleware with pinpoint fault detection and WhatsApp alerts.",
    image: "/projects/solarbrain-techos/preview.avif",
    images: [
      "/projects/solarbrain-techos/1.avif",
      "/projects/solarbrain-techos/2.avif",
      "/projects/solarbrain-techos/3.avif",
    ],
    features: [
      "Real-time solar panel telemetry consumption and ingestion via a specialized hackathon middleware.",
      "Granular fault detection system identifying the exact malfunctioning panel and its physical array location.",
      "Automated critical incident alerting with instant multi-channel notifications sent via WhatsApp.",
      "Executive KPI dashboard for energy output monitoring with downloadable PDF operational reports.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Middleware API", "WhatsApp API", "Tailwind CSS"],
    learned:
      "Learned to consume and process live solar panel telemetry via the hackathon middleware, architecting an alert system that pinpoints faulty panel locations and delivers instant WhatsApp notifications.",
    links: [
      {
        label: "View on GitHub",
        href: "https://github.com/JancarloGCdev/TechosRentables-Proyecto",
        variant: "github",
      },
    ],
  },
  {
    id: "papertrail-commerce",
    name: "PaperTrail Commerce (v2)",
    type: "Full Stack Bookstore E-Commerce Platform",
    tagline: "End-to-end digital commerce solution with dynamic catalog, shopping cart, and Strapi CMS management.",
    features: [
      "Interactive book storefront with multi-attribute filtering, live search, and optimized pagination.",
      "Client-side cart state management and structured multi-step checkout workflow.",
      "Headless CMS integration (Strapi) via REST APIs for dynamic inventory and editorial control.",
      "Role-based access control separating customer accounts from administrative store operations.",
    ],
    stack: ["React", "Next.js", "TypeScript", "Strapi CMS", "REST API", "Tailwind CSS", "Git"],
    learned:
      "Reinforced modular frontend design patterns, decoupled API consumption, and full e-commerce transactional flows.",
    links: [
      {
        label: "View on GitHub",
        href: "https://github.com/JancarloGCdev/papertrailv2",
        variant: "github",
      },
    ],
  },
  {
    id: "quine-mccluskey-simplifier",
    name: "Quine-McCluskey Logic Simplifier",
    type: "Algorithmic Circuit & Boolean Function Optimizer",
    tagline: "Python implementation for exact minimization and tabular reduction of digital logic functions.",
    features: [
      "Step-by-step tabular algorithmic computation of minterms and don't-care conditions.",
      "Modular architecture enabling clean prime implicant table generation and code reusability.",
      "Input sanitization with robust handling of complex boolean functions and edge cases.",
    ],
    stack: ["Python", "Algorithms", "Digital Logic", "Pytest"],
    learned:
      "Deepened expertise in computational complexity, algorithmic optimization, and modular Python software design.",
    links: [
      {
        label: "View on GitHub",
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
    caption: "Cisco Networking Academy · May 2025",
    issuer: "Cisco Networking Academy",
  },
  {
    sortDate: "2025-05-15",
    logoSrc: SI("cisco", "1BA0D7"),
    logoAlt: "Cisco",
    title: "Introduction to Cybersecurity",
    caption: "Cisco Networking Academy · May 2025",
    issuer: "Cisco Networking Academy",
  },
  {
    sortDate: "2025-03-31",
    logoSrc: SI("meta", "0668E1"),
    logoAlt: "Meta",
    title: "Introduction to Back-End Development",
    caption: "Meta · Coursera · 2025",
    issuer: "Meta",
  },
  {
    sortDate: "2025-03-31",
    logoSrc: SI("meta", "0668E1"),
    logoAlt: "Meta",
    title: "Introduction to Front-End Development",
    caption: "Meta · Coursera · 2025",
    issuer: "Meta",
  },
  {
    sortDate: "2025-03-31",
    logoSrc: SI("meta", "0668E1"),
    logoAlt: "Meta",
    title: "Version Control with Git",
    caption: "Meta · Coursera · 2025",
    issuer: "Meta",
  },
  {
    sortDate: "2025-03-31",
    logoSrc: SI("meta", "0668E1"),
    logoAlt: "Meta",
    title: "Programming with JavaScript",
    caption: "Meta · Coursera · 2025",
    issuer: "Meta",
  },
  {
    sortDate: "2025-03-31",
    logoSrc: SI("meta", "0668E1"),
    logoAlt: "Meta",
    title: "Programming in Python",
    caption: "Meta · Coursera · 2025",
    issuer: "Meta",
  },
  {
    sortDate: "2025-02-28",
    logoSrc: "/certifications/uci-merage.svg",
    logoAlt: "UC Irvine · The Paul Merage School of Business",
    title: "Problem Solving and Decision Making",
    caption: "UC Irvine · Paul Merage School of Business · Feb 2025",
    issuer: "University of California, Irvine",
  },
  {
    sortDate: "2025-01-31",
    logoSrc: SI("google", "4285F4"),
    logoAlt: "Google",
    title: "Foundations of Cybersecurity",
    caption: "Google · Coursera · Jan 2025",
    issuer: "Google",
  },
  {
    sortDate: "2024-11-30",
    logoSrc: SI("cisco", "1BA0D7"),
    logoAlt: "Cisco",
    title: "CCNA: Introduction to Networks",
    caption: "Cisco Networking Academy · Nov 2024",
    issuer: "Cisco Networking Academy",
  },
];

export const SKILL_MODULES = [
  {
    title: "Modern Web & Frontend",
    items: [
      "React",
      "Next.js (App Router)",
      "TypeScript",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "GSAP Animations",
      "Semantic HTML5 & CSS3",
    ],
  },
  {
    title: "Backend & Architecture",
    items: [
      ".NET / C#",
      "Blazor Server",
      "ASP.NET Core",
      "Python (FastAPI)",
      "Node.js",
      "RESTful APIs",
      "Clean & Modular Architecture",
    ],
  },
  {
    title: "Databases & Storage",
    items: [
      "SQL Server (Queries & Stored Procedures)",
      "PostgreSQL",
      "Prisma ORM",
      "Entity Framework Core",
      "Relational Data Modeling",
    ],
  },
  {
    title: "Tooling, DevOps & Cloud",
    items: [
      "Git & GitHub (Collaborative Workflows)",
      "Docker (Containers)",
      "Postman (API Testing)",
      "Linux / Bash",
      "Windows Server (Production Releases)",
      "Azure Fundamentals",
    ],
  },
  {
    title: "Networking, Security & AI",
    items: [
      "Cisco CCNA (Networking & TCP/IP Fundamentals)",
      "Cybersecurity Fundamentals (Google & Cisco)",
      "AI Model Integration & Embeddings",
      "Secure Software Practices",
    ],
  },
] as const;

export const CONTACT = {
  headline: "Have a technical challenge or an open position? Let's connect.",
  sub: "I am available for Software Engineer and Full Stack Developer roles (remote or hybrid). My preferred channel for professional contact is LinkedIn, or you can email me directly.",
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
      label: "Send Email",
      href: QUICK_LINKS.email,
      variant: "live" as const,
    },
  ],
};
