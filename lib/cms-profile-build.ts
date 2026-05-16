import type { PortfolioLocale } from "@/lib/i18n/locale";

/** Mismo shape que PROFILE en datos (sin literal `as const`). */
type ResolvedProfile = {
  name: string;
  role: string;
  location: string;
  status: string;
  focus: string;
};

type ProfileMini = Pick<ResolvedProfile, "name" | "role" | "location" | "status">;

type ConsoleOv = Partial<{ windowTag: string; avatarSrc: string; initials: string }>;

export type ProfileConsoleBlock = {
  avatarSrc: string;
  initials: string;
  windowTag: string;
  lines: ReadonlyArray<{ kind: "comment" | "cmd" | "out"; text: string }>;
};

function sanitizeAbout(lines: readonly string[]): string[] {
  return [...lines.map((t) => t.trim()).filter((t) => t.length > 0)];
}

export function buildProfileConsoleBlock(
  locale: PortfolioLocale,
  profile: ProfileMini,
  aboutParagraphs: string[],
  overrides?: ConsoleOv,
): ProfileConsoleBlock {
  const about = sanitizeAbout(aboutParagraphs);
  const avatarSrc = overrides?.avatarSrc?.trim() || "/profile.avif";
  const initials = (overrides?.initials?.trim() || "JG").slice(0, 6);
  if (locale === "en") {
    const windowTag = overrides?.windowTag?.trim() || `Profile · ${profile.name}`;
    return {
      avatarSrc,
      initials,
      windowTag,
      lines: [
        { kind: "comment", text: "# Executive snapshot · quick scan." },
        { kind: "cmd", text: "profile --summary" },
        { kind: "out", text: `${profile.name} · ${profile.role}` },
        { kind: "cmd", text: "about --extended" },
        ...about.map((text) => ({ kind: "out" as const, text })),
        { kind: "cmd", text: "availability" },
        { kind: "out", text: `${profile.status} · ${profile.location}` },
        {
          kind: "comment",
          text: "# The map below groups each topic—open nodes for detail and outbound links.",
        },
      ],
    };
  }

  const windowTag = overrides?.windowTag?.trim() || `Perfil · ${profile.name}`;
  return {
    avatarSrc,
    initials,
    windowTag,
    lines: [
      { kind: "comment", text: "# Información ejecutiva para lectura rápida." },
      { kind: "cmd", text: "resumen --perfil" },
      { kind: "out", text: `${profile.name} · ${profile.role}` },
      { kind: "cmd", text: "sobre-mí --extendido" },
      ...about.map((text) => ({ kind: "out" as const, text })),
      { kind: "cmd", text: "disponibilidad" },
      { kind: "out", text: `${profile.status} · ${profile.location}` },
      {
        kind: "comment",
        text: "# Abajo, el mapa resume cada área: ábrelo para ver detalle y enlaces.",
      },
    ],
  };
}
