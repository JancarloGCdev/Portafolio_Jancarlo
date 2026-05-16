import "server-only";

import type { AdminSeedPayload } from "@/lib/portfolio-bundles-type";
import {
  DEFAULT_ABOUT_PARAGRAPHS_ES,
  DEV_PROJECTS as DEV_PROJECTS_ES,
  EXPERIENCES as EXPERIENCES_ES,
  PROFILE as PROFILE_ES,
  PROFILE_CONSOLE as PROFILE_CONSOLE_ES,
} from "@/lib/data";
import {
  DEFAULT_ABOUT_PARAGRAPHS_EN,
  DEV_PROJECTS as DEV_PROJECTS_EN,
  EXPERIENCES as EXPERIENCES_EN,
  PROFILE as PROFILE_EN,
  PROFILE_CONSOLE as PROFILE_CONSOLE_EN,
} from "@/lib/data-en";

export function buildAdminSeeds(): AdminSeedPayload {
  return {
    es: {
      profile: { ...PROFILE_ES },
      aboutParagraphs: [...DEFAULT_ABOUT_PARAGRAPHS_ES],
      profileConsole: {
        windowTag: PROFILE_CONSOLE_ES.windowTag,
        avatarSrc: PROFILE_CONSOLE_ES.avatarSrc,
        initials: PROFILE_CONSOLE_ES.initials,
      },
      devProjects: [...DEV_PROJECTS_ES],
      experiences: [...EXPERIENCES_ES],
    },
    en: {
      profile: { ...PROFILE_EN },
      aboutParagraphs: [...DEFAULT_ABOUT_PARAGRAPHS_EN],
      profileConsole: {
        windowTag: PROFILE_CONSOLE_EN.windowTag,
        avatarSrc: PROFILE_CONSOLE_EN.avatarSrc,
        initials: PROFILE_CONSOLE_EN.initials,
      },
      devProjects: [...DEV_PROJECTS_EN],
      experiences: [...EXPERIENCES_EN],
    },
  };
}
