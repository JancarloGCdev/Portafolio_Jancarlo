import "server-only";

import type { AdminSeedPayload } from "@/lib/portfolio-bundles-type";
import {
  DEFAULT_ABOUT_PARAGRAPHS_ES,
  DEV_PROJECTS as DEV_PROJECTS_ES,
  EXPERIENCES as EXPERIENCES_ES,
  PROFILE as PROFILE_ES,
} from "@/lib/data";
import {
  DEFAULT_ABOUT_PARAGRAPHS_EN,
  DEV_PROJECTS as DEV_PROJECTS_EN,
  EXPERIENCES as EXPERIENCES_EN,
  PROFILE as PROFILE_EN,
} from "@/lib/data-en";

export function buildAdminSeeds(): AdminSeedPayload {
  return {
    es: {
      profile: { ...PROFILE_ES },
      aboutParagraphs: [...DEFAULT_ABOUT_PARAGRAPHS_ES],
      devProjects: [...DEV_PROJECTS_ES],
      experiences: [...EXPERIENCES_ES],
    },
    en: {
      profile: { ...PROFILE_EN },
      aboutParagraphs: [...DEFAULT_ABOUT_PARAGRAPHS_EN],
      devProjects: [...DEV_PROJECTS_EN],
      experiences: [...EXPERIENCES_EN],
    },
  };
}
