import type { DevProject, ExperienceEntry } from "@/lib/data";
import type { TopologyNodeId, CaseFile } from "@/lib/mapData";

/** Parte dinámica del portafolio resuelta (CMS + defaults) por idioma — sin copys de página ni HUD estático. */
export type ResolvedLocaleContent = {
  profile: {
    name: string;
    role: string;
    location: string;
    status: string;
    focus: string;
  };
  profileConsole: {
    avatarSrc: string;
    initials: string;
    windowTag: string;
    lines: ReadonlyArray<{ kind: "comment" | "cmd" | "out"; text: string }>;
  };
  experiences: readonly ExperienceEntry[];
  devProjects: readonly DevProject[];
  topologyNodes: Record<
    TopologyNodeId,
    { label: string; subtitle: string; x: number; y: number; accent: string }
  >;
  caseFiles: Record<TopologyNodeId, CaseFile>;
};

export type ResolvedBundles = {
  es: ResolvedLocaleContent;
  en: ResolvedLocaleContent;
};

export type AdminLocaleSeed = {
  profile: ResolvedLocaleContent["profile"];
  aboutParagraphs: string[];
  profileConsole: Pick<
    ResolvedLocaleContent["profileConsole"],
    "windowTag" | "avatarSrc" | "initials"
  >;
  devProjects: DevProject[];
  experiences: ExperienceEntry[];
};

export type AdminSeedPayload = {
  es: AdminLocaleSeed;
  en: AdminLocaleSeed;
};
