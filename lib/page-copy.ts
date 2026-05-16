import type { PortfolioLocale } from "@/lib/i18n/locale";

export type PageCopy = {
  locale: PortfolioLocale;
  htmlLangAttr: string;
  seo: {
    title: string;
    description: string;
    keywords: readonly string[];
    applicationName: string;
    ogLocale: string;
    siteName: string;
    ogTagline: string;
  };
  hackerConsole: {
    integrityBadge: string;
    photoCaption: string;
    avatarFallback: string;
    portraitAltSuffix: string;
  };
  threatMap: {
    svgAriaLabel: string;
    heroKicker: string;
    heroTitleLeading: string;
    heroTitleAccent: string;
    heroTitleTrailing: string;
    heroSubtitle: string;
    tooltipHeading: string;
    tooltipFootnote: string;
  };
  terminalIntro: {
    windowTitle: string;
    windowSubtitle: string;
    shellPrompt: string;
    idleHashComment: string;
    shellTourScript: readonly string[];
    profileCatCommand: string;
    mapOpenCommand: string;
    mapOpenOutput: string;
    startButton: string;
    hintCommands: string;
    pauseButton: string;
    resumeButton: string;
    pauseAria: string;
    resumeAria: string;
    inputAria: string;
    inputPlaceholder: string;
  };
  hud: {
    navAriaLabel: string;
    coreExtraLabelSuffix: string;
    menuExpandAria: string;
    menuCollapseAria: string;
    menuListLabel: string;
  };
  pageLogs: {
    initialLines: readonly string[];
    rotating: readonly string[];
    opening: string;
    tourNowPrefix: string;
    tourCanceled: string;
    tourStepPrefix?: string;
  };
  guidedTour: {
    startLabel: string;
    startTooltip: string;
    runningBadge: string;
    runningSubtitle: string;
    cancelLabel: string;
    cancelTooltip: string;
  };
  nodeModal: {
    closeBackdropAria: string;
    closeAria: string;
    summaryBadge: string;
    highlightsHeading: string;
    stackHeading: string;
    securityHeading: string;
    evidenceHeading: string;
    learnHeading: string;
    badgeDelivered: string;
    badgeInProgress: string;
    imagePending: string;
    liveSite: string;
    repoSecondary: string;
    linkedinActionLabel: string;
    carouselPrevAria: string;
    carouselNextAria: string;
    /** Placeholders `{current}` y `{total}` (ej. Slide 2 de 3). */
    carouselSlideStatus: string;
  };
  liveLogs: {
    waiting: string;
    fabTitleTemplate: string;
    panelTitle: string;
    subtitle: string;
    minimizeTitle: string;
  };
  quickAccess: {
    navAria: string;
    githubTitle: string;
    linkedinTitle: string;
  };
};

const ES_COPY: Omit<PageCopy, "locale" | "htmlLangAttr"> = {
  seo: {
    title: "Consola JGC · Jancarlo Gallón Cano · Portafolio",
    description:
      "Portafolio personal: desarrollo web, prácticas de seguridad y trabajo público con foco profesional.",
    keywords: ["portafolio", "desarrollo web", "ciberseguridad", "Jancarlo Gallón Cano", "Colombia", "Next.js"],
    applicationName: "Portafolio JGC",
    ogLocale: "es_CO",
    siteName: "Portafolio JGC",
    ogTagline: "Portafolio interactivo",
  },
  hackerConsole: {
    integrityBadge: "integridad",
    photoCaption: "Foto de perfil",
    avatarFallback: "Foto no disponible en este momento.",
    portraitAltSuffix: "Retrato de ",
  },
  threatMap: {
    svgAriaLabel:
      "Mapa del portafolio: cada punto abre un resumen con proyectos, trayectoria y formas de contacto.",
    heroKicker: "Portafolio interactivo",
    heroTitleLeading: "Explora mi trabajo por",
    heroTitleAccent: "áreas",
    heroTitleTrailing: ": proyectos, experiencia, laboratorios y cómo contactarme.",
    heroSubtitle:
      "Abre cualquier waypoint o usa el menú superior desplegable. Cada ficha cuenta solo lo que necesita ese bloque.",
    tooltipHeading: "Sección",
    tooltipFootnote: "Pulsa para ver el resumen",
  },
  terminalIntro: {
    windowTitle: "CLI",
    windowSubtitle: "bash · fakeroot",
    shellPrompt: "root@cli:/portfolio-Jancarlo#",
    idleHashComment: "# escribe «start» o «inicio» (+ Intro) · o ejecuta clic en botón start",
    shellTourScript: [
      "root@cli:/portfolio-Jancarlo# whoami",
      "root",
      "root@cli:/portfolio-Jancarlo# id",
      "uid=0(root) gid=0(root) grupos:root · demo · sólo‑lectura",
      "root@cli:/portfolio-Jancarlo# pwd",
      "/portfolio-Jancarlo",
      "root@cli:/portfolio-Jancarlo# ls",
      "mapa/  readme  bin/",
      "root@cli:/portfolio-Jancarlo# cd mapa && ls",
      "nucleo proyectos labs xp certs skills contacto",
      'root@cli:/portfolio-Jancarlo/mapa# cd .. && cat readme',
      "# HUD:~bar superior · svg:~nodos → dossiers",
      "# enlaces:~SupDer · tour:~InfDer · logs:~InfIzq · Pause|espacio",
    ],
    profileCatCommand: "root@cli:/portfolio-Jancarlo# cat ./etc/perfil.public.env",
    mapOpenCommand: "root@cli:/portfolio-Jancarlo# exec ./bin/map.open --tty",
    mapOpenOutput: "[ok] montando lienzo waypoint…",
    startButton: "start",
    hintCommands: "inicio=start · Pause|espacio ·",
    pauseButton: "Pausar",
    resumeButton: "Seguir",
    pauseAria: "Pausar el volcado tipo shell",
    resumeAria: "Reanudar el volcado",
    inputAria: "Escribir start o inicio para emitir ayuda POSIX y abrir mapa",
    inputPlaceholder: "inicio",
  },
  hud: {
    navAriaLabel: "Navegación rápida del mapa",
    coreExtraLabelSuffix: "visión general · repos públicos · contacto vía LinkedIn",
    menuExpandAria: "Abrir menú de secciones del mapa",
    menuCollapseAria: "Cerrar menú de secciones del mapa",
    menuListLabel: "Lista de secciones",
  },
  pageLogs: {
    initialLines: [
      "Mapa listo: toca cualquier punto para ver el detalle de esa área.",
      "Cada dossier muestra contenido diferente para evitar textos repetidos.",
      "Puedes seguir el recorrido guiado en la esquina inferior derecha.",
    ],
    rotating: [
      "Cualquier sección del mapa se abre con un toque o clic en el punto correspondiente.",
      "Esta página no recoge datos personales: es una vitrina informativa.",
      "La banda inferior resume la última navegación como referencia rápida.",
      "Si te interesa la formación académica y certificaciones, visita el apartado correspondiente.",
      "Este enlace funciona bien como punto de entrada con contexto mínimo en el mensaje inicial.",
      "Los laboratorios de seguridad documentan cómo abordo análisis y visibilidad.",
      "Trabajo con lenguaje claro para equipos de negocio y para perfiles técnicos.",
    ],
    opening: "Abriendo:",
    tourNowPrefix: "Recorrido · ahora:",
    tourCanceled: "Recorrido detenido: continúas explorando el mapa.",
  },
  guidedTour: {
    startLabel: "Recorrido guiado (~1 min)",
    startTooltip: "Recorrido guiado del portafolio (aprox. 1 min)",
    runningBadge: "Recorrido ·",
    runningSubtitle: "en curso…",
    cancelLabel: "Salir",
    cancelTooltip: "Salir del recorrido y volver al mapa",
  },
  nodeModal: {
    closeBackdropAria: "Cerrar",
    closeAria: "Cerrar",
    summaryBadge: "Resumen",
    highlightsHeading: "Destacados",
    stackHeading: "Stack y herramientas",
    securityHeading: "Notas en contexto",
    evidenceHeading: "Referencias y capturas",
    learnHeading: "Aprendizajes",
    badgeDelivered: "Entregado",
    badgeInProgress: "En curso",
    imagePending: "Imagen pendiente ·",
    liveSite: "Sitio en vivo",
    repoSecondary: "Repo 2",
    linkedinActionLabel: "LinkedIn",
    carouselPrevAria: "Diapositiva anterior",
    carouselNextAria: "Diapositiva siguiente",
    carouselSlideStatus: "Diapositiva {current} de {total}",
  },
  liveLogs: {
    waiting: "Esperando mensajes…",
    fabTitleTemplate: "Abrir historial de actividad. Último:",
    panelTitle: "Actividad reciente",
    subtitle: "Referencia visual",
    minimizeTitle: "Minimizar",
  },
  quickAccess: {
    navAria: "Accesos rápidos · GitHub y LinkedIn",
    githubTitle: "Código público en GitHub",
    linkedinTitle: "Conectar por LinkedIn",
  },
};

const EN_COPY: Omit<PageCopy, "locale" | "htmlLangAttr"> = {
  seo: {
    title: "Console JGC · Jancarlo Gallón Cano · Portfolio",
    description:
      "English portfolio highlighting full‑stack (.NET · Blazor) delivery, cybersecurity lab work and public repositories.",
    keywords: ["portfolio", "software engineer", "cybersecurity", "dotNET", "Jancarlo Gallón Cano", "Next.js"],
    applicationName: "Portfolio JGC",
    ogLocale: "en_US",
    siteName: "Portfolio JGC",
    ogTagline: "Interactive portfolio",
  },
  hackerConsole: {
    integrityBadge: "verified",
    photoCaption: "Profile photo",
    avatarFallback: "Photo unavailable at the moment.",
    portraitAltSuffix: "Portrait of ",
  },
  threatMap: {
    svgAriaLabel: "Portfolio map: each waypoint opens a focused dossier for projects, experience, labs, or contact cues.",
    heroKicker: "Interactive portfolio",
    heroTitleLeading: "Browse my story by",
    heroTitleAccent: "topic",
    heroTitleTrailing: ": projects shipped, internships, labs, and how to reach me.",
    heroSubtitle:
      "Tap any waypoint or open the section menu up top—each dossier keeps only what that topic needs.",
    tooltipHeading: "Section",
    tooltipFootnote: "Tap or click to inspect the dossier",
  },
  terminalIntro: {
    windowTitle: "CLI",
    windowSubtitle: "bash · fakeroot",
    shellPrompt: "root@cli:/portfolio-Jancarlo#",
    idleHashComment: "# type «start» or «inicio» (+ Enter) · or click button start",
    shellTourScript: [
      "root@cli:/portfolio-Jancarlo# whoami",
      "root",
      "root@cli:/portfolio-Jancarlo# id",
      "uid=0(root) gid=0(root) groups:root · ro demo shell",
      "root@cli:/portfolio-Jancarlo# pwd",
      "/portfolio-Jancarlo",
      "root@cli:/portfolio-Jancarlo# ls",
      "mapa/  readme  bin/",
      "root@cli:/portfolio-Jancarlo# cd mapa && ls",
      "core projects labs xp certs skills contact",
      'root@cli:/portfolio-Jancarlo/mapa# cd .. && cat readme',
      "# hud:~orbit top · svg nodes:~drawers",
      "# shortcuts:~top-right · tour:~bottom-right · logs:~bottom-left · Pause|Space",
    ],
    profileCatCommand: "root@cli:/portfolio-Jancarlo# cat ./etc/perfil.public.env",
    mapOpenCommand: "root@cli:/portfolio-Jancarlo# exec ./bin/map.open --tty",
    mapOpenOutput: "[ok] attaching waypoint canvas…",
    startButton: "start",
    hintCommands: "inicio=start · Pause|Space ·",
    pauseButton: "Pause",
    resumeButton: "Resume",
    pauseAria: "Pause POSIX-style stream",
    resumeAria: "Resume POSIX-style stream",
    inputAria: "Type start or inicio to print helper lines and reveal map",
    inputPlaceholder: "start",
  },
  hud: {
    navAriaLabel: "Waypoint navigation rail",
    coreExtraLabelSuffix: "overview · public repos · reach out on LinkedIn",
    menuExpandAria: "Open portfolio section menu",
    menuCollapseAria: "Close portfolio section menu",
    menuListLabel: "Section list",
  },
  pageLogs: {
    initialLines: [
      "Mesh armed: tap a waypoint whenever you’re ready.",
      "Every dossier uses different framing—nothing copy-pastes across nodes.",
      "Tip · Guided Tour bottom-right (~1 minute) keeps scripted order.",
    ],
    rotating: [
      "Opening a dossier mirrors clicking the matching orbit node.",
      "No analytics here—purely informational showcase.",
      "The ribbon echoes the freshest navigation breadcrumbs.",
      "Certifications badge lists credentialed paths when you crave rigor proofs.",
      "Forward this link whenever someone needs depth without onboarding noise.",
      "Security labs articulate how I think about instrumentation.",
      "I translate complex signals plainly for biz + infosec partners.",
    ],
    opening: "Opening:",
    tourNowPrefix: "Guided Tour · waypoint:",
    tourCanceled: "Guided Tour paused—you’re roaming freely.",
  },
  guidedTour: {
    startLabel: "Guided tour (~1 min)",
    startTooltip: "Automatically hop through dossiers (~1 minute)",
    runningBadge: "Guided Tour",
    runningSubtitle: "running…",
    cancelLabel: "Stop",
    cancelTooltip: "Exit tour and reclaim manual navigation",
  },
  nodeModal: {
    closeBackdropAria: "Close dossier backdrop",
    closeAria: "Close dossier panel",
    summaryBadge: "Snapshot",
    highlightsHeading: "Highlights",
    stackHeading: "Stack & tooling",
    securityHeading: "Field notes",
    evidenceHeading: "Evidence & thumbnails",
    learnHeading: "Takeaways",
    badgeDelivered: "Shipped",
    badgeInProgress: "In motion",
    imagePending: "Image pending ·",
    liveSite: "Live demo",
    repoSecondary: "Repo 02",
    linkedinActionLabel: "LinkedIn",
    carouselPrevAria: "Previous slide",
    carouselNextAria: "Next slide",
    carouselSlideStatus: "Slide {current} of {total}",
  },
  liveLogs: {
    waiting: "Awaiting events…",
    fabTitleTemplate: "Expand telemetry ribbon · Last signal:",
    panelTitle: "Recent activity",
    subtitle: "Context ribbon",
    minimizeTitle: "Collapse",
  },
  quickAccess: {
    navAria: "Quick links · GitHub and LinkedIn",
    githubTitle: "Public GitHub repositories",
    linkedinTitle: "Connect on LinkedIn",
  },
};

export function getPageCopy(locale: PortfolioLocale): PageCopy {
  if (locale === "en") {
    return {
      locale: "en",
      htmlLangAttr: "en",
      ...EN_COPY,
    };
  }
  return {
    locale: "es",
    htmlLangAttr: "es",
    ...ES_COPY,
  };
}
