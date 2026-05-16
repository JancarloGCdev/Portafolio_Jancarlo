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
    bootLines: readonly string[];
    openingMapLine: string;
    windowEyebrow: string;
    windowPreview: string;
    brandLine: string;
    instructBefore: string;
    typedCommandLabel: string;
    instructAfter: string;
    continueButton: string;
    hintCommands: string;
    labelName: string;
    labelRole: string;
    labelLocation: string;
    labelStatus: string;
    labelFocus: string;
    inputAria: string;
    inputPlaceholder: string;
  };
  hud: {
    navAriaLabel: string;
    coreExtraLabelSuffix: string;
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
    cvTitle: string;
    githubTitle: string;
    linkedinTitle: string;
    emailTitle: string;
    whatsappTitle: string;
  };
};

const ES_COPY: Omit<PageCopy, "locale" | "htmlLangAttr"> = {
  seo: {
    title: "Consola JGC · Jancarlo Gallón Cano · Portafolio",
    description:
      "Portafolio en español: desarrollo web, prácticas de ciberseguridad y proyectos públicos pensados para reclutamiento claro.",
    keywords: ["portafolio", "desarrollo web", "ciberseguridad", "Jancarlo Gallón Cano", "Colombia", "Next.js"],
    applicationName: "Portafolio JGC",
    ogLocale: "es_CO",
    siteName: "Portafolio JGC",
    ogTagline: "Portafolio interactivo",
  },
  hackerConsole: {
    integrityBadge: "integridad",
    photoCaption: "Foto con estilo profesional",
    avatarFallback: "Puedes reemplazar este espacio con tu foto profesional.",
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
      "Elige un punto en el mapa o usa la barra superior para abrir cada resumen. La información está pensada para quienes evalúan perfiles o evalúan una colaboración conmigo.",
    tooltipHeading: "Sección",
    tooltipFootnote: "Pulsa para ver el resumen",
  },
  terminalIntro: {
    bootLines: [
      "Preparando la vista…",
      "Cargando tu perfil profesional…",
      "Aplicando estándares de presentación…",
      "Listo para continuar.",
    ],
    openingMapLine: "Sistema en línea. Abriendo el mapa de contenidos…",
    windowEyebrow: "Acceso · bienvenida",
    windowPreview: "Vista previa",
    brandLine: "Portafolio · JGC",
    instructBefore: "Para entrar al portafolio interactivo, escribe ",
    typedCommandLabel: "continuar",
    instructAfter: " o pulsa el botón.",
    continueButton: "Continuar",
    hintCommands:
      'También puedes escribir continuar, inicio o start',
    labelName: "Nombre",
    labelRole: "Rol",
    labelLocation: "Ubicación",
    labelStatus: "Disponibilidad",
    labelFocus: "Enfoque",
    inputAria: "Continuar al portafolio",
    inputPlaceholder: "continuar",
  },
  hud: {
    navAriaLabel: "Navegación rápida del mapa",
    coreExtraLabelSuffix: "visión general, CV y perfiles",
  },
  pageLogs: {
    initialLines: [
      "Mapa listo: toca cualquier punto para ver el detalle de esa área.",
      "Contenido pensado para evaluadores de talento y clientes: sin requisitos previos.",
      "Consejo: puedes usar el recorrido guiado en la esquina inferior derecha para ver el contenido en orden.",
    ],
    rotating: [
      "Cualquier sección del mapa se abre con un toque o clic en el punto correspondiente.",
      "Esta página no recoge datos personales: es una vitrina informativa.",
      "La banda inferior resume la última navegación como referencia rápida.",
      "Si te interesa la formación académica y certificaciones, visita el apartado correspondiente.",
      "Puedes compartir este enlace con quien evalúe mi perfil o una propuesta.",
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
    securityHeading: "Enfoque de seguridad",
    evidenceHeading: "Referencias y capturas",
    learnHeading: "Aprendizajes",
    badgeDelivered: "Entregado",
    badgeInProgress: "En curso",
    imagePending: "Imagen pendiente ·",
    liveSite: "Sitio en vivo",
    repoSecondary: "Repo 2",
  },
  liveLogs: {
    waiting: "Esperando mensajes…",
    fabTitleTemplate: "Abrir historial de actividad. Último:",
    panelTitle: "Actividad reciente",
    subtitle: "Referencia visual",
    minimizeTitle: "Minimizar",
  },
  quickAccess: {
    navAria: "Accesos directos: CV y contacto",
    cvTitle: "Descargar CV (PDF)",
    githubTitle: "Proyectos públicos en GitHub",
    linkedinTitle: "Perfil en LinkedIn",
    emailTitle: "Enviar correo",
    whatsappTitle: "Escribir por WhatsApp",
  },
};

const EN_COPY: Omit<PageCopy, "locale" | "htmlLangAttr"> = {
  seo: {
    title: "Console JGC · Jancarlo Gallón Cano · Portfolio",
    description:
      "Portfolio in English for recruiting teams — full‑stack (.NET · Blazor) delivery, cybersecurity lab work, and public GitHub proofs.",
    keywords: ["portfolio", "software engineer", "cybersecurity", "dotNET", "Jancarlo Gallón Cano", "Next.js"],
    applicationName: "Portfolio JGC",
    ogLocale: "en_US",
    siteName: "Portfolio JGC",
    ogTagline: "Interactive portfolio",
  },
  hackerConsole: {
    integrityBadge: "verified",
    photoCaption: "Professional headshot",
    avatarFallback: "Drop in a sharper photo whenever you refresh this slate.",
    portraitAltSuffix: "Portrait of ",
  },
  threatMap: {
    svgAriaLabel: "Portfolio map: each waypoint opens recruiters to projects, experience, labs, or contact cues.",
    heroKicker: "Interactive portfolio",
    heroTitleLeading: "Browse my story by",
    heroTitleAccent: "topic",
    heroTitleTrailing: ": projects shipped, internships, labs, and how to reach me.",
    heroSubtitle:
      "Tap any waypoint or HUD chip to skim the dossier I leave for recruiters. Everything is explanatory—no gimmicks.",
    tooltipHeading: "Section",
    tooltipFootnote: "Tap or click to inspect the dossier",
  },
  terminalIntro: {
    bootLines: [
      "Warming caches…",
      "Profiling professional signals…",
      "Linting narration…",
      "Ready.",
    ],
    openingMapLine: "System online · loading the waypoint canvas…",
    windowEyebrow: "Ingress · briefing",
    windowPreview: "Preview",
    brandLine: "Portfolio · JGC",
    instructBefore: "To open the workspace, type ",
    typedCommandLabel: "continue",
    instructAfter: " or tap the shortcut.",
    continueButton: "Continue",
    hintCommands: "You may also enter continue, inicio or start.",
    labelName: "Name",
    labelRole: "Role",
    labelLocation: "Location",
    labelStatus: "Availability",
    labelFocus: "Focus",
    inputAria: "Continue into the portfolio workspace",
    inputPlaceholder: "continue",
  },
  hud: {
    navAriaLabel: "Waypoint navigation rail",
    coreExtraLabelSuffix: "central hub, résumés, outbound links",
  },
  pageLogs: {
    initialLines: [
      "Mesh armed: tap a waypoint whenever you’re ready.",
      "This walkthrough is recruiter-friendly—you don’t need prior context.",
      "Tip · use Guided Tour bottom-right (~1 minute) if you crave sequence.",
    ],
    rotating: [
      "Opening a dossier mirrors clicking the matching orbit node.",
      "No analytics here—purely informational showcase.",
      "The ribbon echoes the freshest navigation breadcrumbs.",
      "Certifications badge lists credentialed paths when you crave rigor proofs.",
      "Forward this link to hiring managers—they’ll skim in minutes.",
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
    securityHeading: "Security framing",
    evidenceHeading: "Evidence & thumbnails",
    learnHeading: "Takeaways",
    badgeDelivered: "Shipped",
    badgeInProgress: "In motion",
    imagePending: "Image pending ·",
    liveSite: "Live demo",
    repoSecondary: "Repo 02",
  },
  liveLogs: {
    waiting: "Awaiting events…",
    fabTitleTemplate: "Expand telemetry ribbon · Last signal:",
    panelTitle: "Recent activity",
    subtitle: "Context ribbon",
    minimizeTitle: "Collapse",
  },
  quickAccess: {
    navAria: "Shortcuts · résumés & outbound lines",
    cvTitle: "Download résumé (PDF)",
    githubTitle: "Public GitHub work",
    linkedinTitle: "LinkedIn profile",
    emailTitle: "Send email",
    whatsappTitle: "Open WhatsApp thread",
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
