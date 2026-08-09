import "server-only";

import { cache } from "react";

import type { ResolvedBundles, ResolvedLocaleContent } from "@/lib/portfolio-bundles-type";
import { readCmsFile } from "@/lib/cms-store";
import type { CmsLocaleSlice } from "@/lib/cms-types";
import type { DevProject, ExperienceEntry } from "@/lib/data";
import {
  DEV_PROJECTS as DEV_PROJECTS_ES,
  EXPERIENCES as EXPERIENCES_ES,
  PROFILE as PROFILE_ES,
} from "@/lib/data";
import {
  DEV_PROJECTS as DEV_PROJECTS_EN,
  EXPERIENCES as EXPERIENCES_EN,
  PROFILE as PROFILE_EN,
} from "@/lib/data-en";
import type { PortfolioLocale } from "@/lib/i18n/locale";

type ProfileShape = ResolvedLocaleContent["profile"];

function mergeProfile(base: ProfileShape, patch?: CmsLocaleSlice["profile"]): ProfileShape {
  if (!patch) return base;
  const next = { ...base };
  const entries = Object.entries(patch) as [keyof ProfileShape, string | undefined][];
  for (const [k, v] of entries) {
    if (typeof v === "string" && v.trim().length > 0) next[k] = v.trim();
  }
  return next;
}

function pickProjects(slice: CmsLocaleSlice | undefined, fallback: readonly DevProject[]): readonly DevProject[] {
  if (slice?.devProjects !== undefined) return slice.devProjects;
  return [...fallback];
}

function pickExperiences(
  slice: CmsLocaleSlice | undefined,
  fallback: readonly ExperienceEntry[],
): readonly ExperienceEntry[] {
  if (slice?.experiences !== undefined) return slice.experiences;
  return [...fallback];
}

async function resolveOne(
  locale: PortfolioLocale,
  slice: CmsLocaleSlice | undefined,
  bases: {
    profile: ProfileShape;
    devFallback: readonly DevProject[];
    expFallback: readonly ExperienceEntry[];
  },
): Promise<ResolvedLocaleContent> {
  const profileMerged = mergeProfile(bases.profile, slice?.profile);
  const devProjects = pickProjects(slice, bases.devFallback);
  const experiences = pickExperiences(slice, bases.expFallback);

  return {
    profile: profileMerged,
    experiences,
    devProjects,
  };
}

export const resolvePortfolioBundles = cache(async (): Promise<ResolvedBundles> => {
  const cms = await readCmsFile();

  const [es, en] = await Promise.all([
    resolveOne("es", cms?.es, {
      profile: { ...PROFILE_ES },
      devFallback: DEV_PROJECTS_ES,
      expFallback: EXPERIENCES_ES,
    }),
    resolveOne("en", cms?.en, {
      profile: { ...PROFILE_EN },
      devFallback: DEV_PROJECTS_EN,
      expFallback: EXPERIENCES_EN,
    }),
  ]);

  return { es, en };
});
