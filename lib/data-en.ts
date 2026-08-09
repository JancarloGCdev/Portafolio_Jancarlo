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
  phone: "+57 3014151748",
  languages: "Spanish (Native) · English (B1-B2 Conversational)",
} as const;

export const DEFAULT_ABOUT_PARAGRAPHS_EN = [
  "I am a Systems and Computer Engineering student at Universidad Tecnológica de Pereira (UTP) and a Software Development Technician from SENA. I have professional full-stack experience maintaining and scaling business-critical production applications using .NET (C#), Blazor Server, and SQL Server at Outsourcing S.A.S. BIC.",
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
    institution: "Universidad Tecnológica de Pereira (UTP)",
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
    id: "smart-school-reports",
    name: "Smart School Reports",
    type: "Intelligent Incident & Report Management Platform",
    tagline: "AI-driven duplicate detection and automated incident clustering for academic institutions.",
    image: "/projects/github-wordmark.avif",
    features: [
      "Automated NLP-based duplicate detection and grouping to prevent redundant operational workload.",
      "Real-time ticket status lifecycle (Open, In Progress, Resolved) with role-based routing.",
      "Administrative dashboard with filtering by severity, category, and institutional stakeholder.",
      "Modular decoupled architecture connecting an intelligent processing engine to modern web views.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Python / FastAPI", "PostgreSQL", "Tailwind CSS", "REST API"],
    learned:
      "Architected a solution tailored to real operational workflows, combining natural language processing with intuitive, user-centric interface design.",
    links: [
      {
        label: "View on GitHub",
        href: "https://github.com/JancarloGCdev",
        variant: "github",
      },
    ],
  },
  {
    id: "papertrail-commerce",
    name: "PaperTrail Commerce (v2)",
    type: "Full Stack Bookstore E-Commerce Platform",
    tagline: "End-to-end digital commerce solution with dynamic catalog, shopping cart, and Strapi CMS management.",
    image: "/projects/github-wordmark.avif",
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
    id: "solarbrain-techos",
    name: "SolarBrain (TechosRentables)",
    type: "Solar Asset Monitoring & Management Platform (Hackathon)",
    tagline: "Operational analytics dashboard for commercial photovoltaic deployments and performance monitoring.",
    image: "/projects/github-wordmark.avif",
    features: [
      "Real-time energy generation telemetry and executive KPI monitoring tiles.",
      "Automated threshold alert system flagging photovoltaic output anomalies.",
      "Exportable summary reports in PDF format for operational and client review.",
      "Relational data modeling powered by PostgreSQL and Prisma ORM.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    learned:
      "Rapid iterative development during a hackathon sprint, transforming field telemetry data into actionable executive insights.",
    links: [
      {
        label: "View on GitHub",
        href: "https://github.com/JancarloGCdev/TechosRentables-Proyecto",
        variant: "github",
      },
    ],
  },
  {
    id: "portfolio-engineering",
    name: "Engineering Portfolio & Interactive CLI",
    type: "High-Performance Portfolio Landing with Interactive Linux Shell",
    tagline: "Commercial personal landing crafted with Next.js 15, React 19, TypeScript, GSAP, and manual i18n.",
    image: "/projects/github-wordmark.avif",
    features: [
      "Interactive Linux terminal with simulated command execution and quick touch triggers.",
      "Cookie-based manual internationalization (ES / EN) with zero hydration flicker.",
      "Smooth entrance and scroll storytelling animations powered by GSAP.",
      "Strict type-safe architecture with comprehensive SEO (JSON-LD, OpenGraph, dynamic metadata).",
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "GSAP", "Server Actions"],
    learned:
      "Engineered an interactive personal product that combines commercial storytelling, top performance, and technical character.",
    links: [
      {
        label: "View on GitHub",
        href: "https://github.com/JancarloGCdev/Portafolio_Jancarlo",
        variant: "github",
      },
    ],
  },
  {
    id: "quine-mccluskey-simplifier",
    name: "Quine-McCluskey Logic Simplifier",
    type: "Algorithmic Circuit & Boolean Function Optimizer",
    tagline: "Python implementation for exact minimization and tabular reduction of digital logic functions.",
    image: "/projects/github-wordmark.avif",
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
        href: "https://github.com/JancarloGCdev",
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
  sub: "I am available for Software Engineer and Full Stack Developer roles (remote or hybrid). Feel free to reach out directly via email, connect on LinkedIn, or review my projects on GitHub.",
  email: "jancarlogallonc@gmail.com",
  phone: "+57 3014151748",
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
