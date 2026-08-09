import type { DevProject, ExperienceEntry } from "@/lib/data";

export type ResolvedLocaleContent = {
  profile: {
    name: string;
    role: string;
    location: string;
    status: string;
    focus: string;
  };
  experiences: readonly ExperienceEntry[];
  devProjects: readonly DevProject[];
};

export type ResolvedBundles = {
  es: ResolvedLocaleContent;
  en: ResolvedLocaleContent;
};

export type AdminLocaleSeed = {
  profile: ResolvedLocaleContent["profile"];
  aboutParagraphs: string[];
  devProjects: DevProject[];
  experiences: ExperienceEntry[];
};

export type AdminSeedPayload = {
  es: AdminLocaleSeed;
  en: AdminLocaleSeed;
};
