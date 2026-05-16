import "server-only";

import { cache } from "react";

import type { ResolvedBundles, ResolvedLocaleContent } from "@/lib/portfolio-bundles-type";
import { buildProfileConsoleBlock } from "@/lib/cms-profile-build";
import { readCmsFile } from "@/lib/cms-store";
import type { CmsLocaleSlice } from "@/lib/cms-types";
import type { DevProject, ExperienceEntry } from "@/lib/data";
import {
  DEV_PROJECTS as DEV_PROJECTS_ES,
  EXPERIENCES as EXPERIENCES_ES,
  PROFILE as PROFILE_ES,
  DEFAULT_ABOUT_PARAGRAPHS_ES,
} from "@/lib/data";
import {
  DEV_PROJECTS as DEV_PROJECTS_EN,
  EXPERIENCES as EXPERIENCES_EN,
  PROFILE as PROFILE_EN,
  DEFAULT_ABOUT_PARAGRAPHS_EN,
} from "@/lib/data-en";
import type { PortfolioLocale } from "@/lib/i18n/locale";
import {
  aggregateGithubFooters,
  aggregateLiveDemo,
  patchTopologyExperience,
  slidesFromExperience,
  slidesFromProjectsForLocale,
  stackUnion,
} from "@/lib/map-case-builder";
import { CASE_FILES, TOPOLOGY_NODES, type CaseFile, type TopologyNodeId } from "@/lib/mapData";
import { CASE_FILES_EN, TOPOLOGY_NODES_EN } from "@/lib/mapData-en";

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

function pickAbout(
  slice: CmsLocaleSlice | undefined,
  fallback: readonly string[],
): readonly string[] {
  if (slice?.aboutParagraphs !== undefined) return slice.aboutParagraphs;
  return [...fallback];
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

type Topo = ResolvedLocaleContent["topologyNodes"];

function patchPortfolioCases(
  locale: PortfolioLocale,
  mergedProfileName: string,
  devProjects: readonly DevProject[],
  experiences: readonly ExperienceEntry[],
  baseCases: Record<TopologyNodeId, CaseFile>,
  baseTopo: Topo,
): Pick<ResolvedLocaleContent, "caseFiles" | "topologyNodes"> {
  const cases = structuredClone(baseCases);

  const gh = aggregateGithubFooters(devProjects);

  cases.core = {
    ...cases.core,
    subtitle: mergedProfileName,
  };

  cases.projects = {
    ...cases.projects,
    detailSlides: slidesFromProjectsForLocale(locale, devProjects),
    stack: stackUnion(...devProjects.map((p) => [...p.stack])),
    actions: {
      github: gh.primary,
      githubSecondary: gh.secondary,
      demo: aggregateLiveDemo(devProjects),
    },
  };

  const techos = devProjects.find((p) => p.id === "techos-rentables");
  const devAppsBase = cases["development-apps"];
  cases["development-apps"] = {
    ...devAppsBase,
    ...(techos?.stack?.length ? { stack: [...techos.stack] } : {}),
    ...(techos?.image?.trim()
      ? {
          evidence: [
            {
              src: techos.image!.trim(),
              alt:
                locale === "en"
                  ? `${techos.name} · screenshot`
                  : `${techos.name} · vista del proyecto`,
            },
          ],
        }
      : {}),
  };

  const expSubtitle =
    experiences.length <= 1
      ? experiences[0]
        ? `${experiences[0].role} · ${experiences[0].location} · ${experiences[0].period}`
        : undefined
      : locale === "en"
        ? `${experiences.length} roles · swipe for each employer`
        : `${experiences.length} roles · desliza para ver cada empresa`;

  const expSummary =
    experiences.length <= 1
      ? (experiences[0]?.summary ?? "")
      : locale === "en"
        ? "Employer-by-employer timeline — swipe for role, timeframe, and highlights."
        : "Trayectoria por empresa — desliza para ver rol, período y destacados.";

  cases.experience = {
    ...cases.experience,
    subtitle: expSubtitle,
    summary: expSummary,
    detailSlides: slidesFromExperience(experiences),
    stack: stackUnion(...experiences.map((e) => [...e.stack])),
  };

  const topologyNodes = patchTopologyExperience(baseTopo, experiences);

  return { caseFiles: cases, topologyNodes };
}

async function resolveOne(
  locale: PortfolioLocale,
  slice: CmsLocaleSlice | undefined,
  bases: {
    profile: ProfileShape;
    aboutFallback: readonly string[];
    devFallback: readonly DevProject[];
    expFallback: readonly ExperienceEntry[];
    caseFiles: Record<TopologyNodeId, CaseFile>;
    topo: Topo;
  },
): Promise<ResolvedLocaleContent> {
  const profileMerged = mergeProfile(bases.profile, slice?.profile);
  const about = pickAbout(slice, bases.aboutFallback);
  const profileConsole = buildProfileConsoleBlock(locale, profileMerged, [...about], slice?.profileConsole);
  const devProjects = pickProjects(slice, bases.devFallback);
  const experiences = pickExperiences(slice, bases.expFallback);
  const { caseFiles, topologyNodes } = patchPortfolioCases(
    locale,
    profileMerged.name,
    devProjects,
    experiences,
    bases.caseFiles,
    bases.topo,
  );
  return {
    profile: profileMerged,
    profileConsole,
    experiences,
    devProjects,
    topologyNodes,
    caseFiles,
  };
}

export const resolvePortfolioBundles = cache(async (): Promise<ResolvedBundles> => {
  const cms = await readCmsFile();

  const [es, en] = await Promise.all([
    resolveOne("es", cms?.es, {
      profile: { ...PROFILE_ES },
      aboutFallback: DEFAULT_ABOUT_PARAGRAPHS_ES,
      devFallback: DEV_PROJECTS_ES,
      expFallback: EXPERIENCES_ES,
      caseFiles: CASE_FILES,
      topo: TOPOLOGY_NODES,
    }),
    resolveOne("en", cms?.en, {
      profile: { ...PROFILE_EN },
      aboutFallback: DEFAULT_ABOUT_PARAGRAPHS_EN,
      devFallback: DEV_PROJECTS_EN,
      expFallback: EXPERIENCES_EN,
      caseFiles: CASE_FILES_EN,
      topo: TOPOLOGY_NODES_EN,
    }),
  ]);

  return { es, en };
});
