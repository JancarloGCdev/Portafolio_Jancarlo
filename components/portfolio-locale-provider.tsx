"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";

import type { PortfolioLocale } from "@/lib/i18n/locale";
import type {
  CertificationRecord,
  DevProject,
  ExperienceEntry,
  PanelLink,
  SecurityLab,
  TourStep,
} from "@/lib/data";
import type { TopologyNodeId, CaseFile } from "@/lib/mapData";
import {
  SECURITY_LABS as SECURITY_LABS_ES,
  CERTIFICATIONS as CERTIFICATIONS_ES,
  SKILL_MODULES as SKILL_MODULES_ES,
  CONTACT as CONTACT_ES,
  GUIDED_TOUR_STEPS as GUIDED_TOUR_STEPS_ES,
} from "@/lib/data";
import {
  SECURITY_LABS as SECURITY_LABS_EN,
  CERTIFICATIONS as CERTIFICATIONS_EN,
  SKILL_MODULES as SKILL_MODULES_EN,
  CONTACT as CONTACT_EN,
  GUIDED_TOUR_STEPS as GUIDED_TOUR_STEPS_EN,
} from "@/lib/data-en";
import {
  HUD_TAB_ORDER as HUD_TAB_ORDER_ES,
  labelForNodeId as labelForNodeIdEs,
} from "@/lib/mapData";
import { HUD_TAB_ORDER_EN, labelForNodeIdEn } from "@/lib/mapData-en";
import type { ResolvedBundles } from "@/lib/portfolio-bundles-type";
import { getPageCopy, type PageCopy } from "@/lib/page-copy";

export type TopologyNodeMeta = {
  label: string;
  subtitle: string;
  x: number;
  y: number;
  accent: string;
};

export type HudTabEntry = (typeof HUD_TAB_ORDER_ES)[number];

type ProfileSummary = {
  name: string;
  role: string;
  location: string;
  status: string;
  focus: string;
};

type ProfileConsoleBlock = {
  avatarSrc: string;
  initials: string;
  windowTag: string;
  lines: ReadonlyArray<{ kind: "comment" | "cmd" | "out"; text: string }>;
};

type SkillModule = { readonly title: string; readonly items: readonly string[] };

type ContactBlock = {
  headline: string;
  sub: string;
  links: readonly { label: string; href: string; variant?: PanelLink["variant"] }[];
};

export type PortfolioRuntime = {
  locale: PortfolioLocale;
  copy: PageCopy;
  profile: ProfileSummary;
  profileConsole: ProfileConsoleBlock;
  experiences: readonly ExperienceEntry[];
  devProjects: readonly DevProject[];
  securityLabs: readonly SecurityLab[];
  certifications: readonly CertificationRecord[];
  skillModules: readonly SkillModule[];
  contact: ContactBlock;
  guidedTourSteps: readonly TourStep[];
  topologyNodes: Record<TopologyNodeId, TopologyNodeMeta>;
  caseFiles: Record<TopologyNodeId, CaseFile>;
  hudTabOrder: readonly HudTabEntry[];
  labelForNodeId: (id: string | null) => string;
};

const PortfolioRuntimeContext = createContext<PortfolioRuntime | null>(null);

export function PortfolioLocaleProvider({
  locale,
  children,
  bundles,
}: {
  locale: PortfolioLocale;
  children: ReactNode;
  bundles: ResolvedBundles;
}) {
  const value = useMemo<PortfolioRuntime>(() => {
    if (locale === "en") {
      return {
        locale: "en",
        copy: getPageCopy("en"),
        ...bundles.en,
        securityLabs: SECURITY_LABS_EN,
        certifications: CERTIFICATIONS_EN,
        skillModules: SKILL_MODULES_EN,
        contact: CONTACT_EN,
        guidedTourSteps: GUIDED_TOUR_STEPS_EN,
        hudTabOrder: HUD_TAB_ORDER_EN,
        labelForNodeId: labelForNodeIdEn,
      };
    }

    return {
      locale: "es",
      copy: getPageCopy("es"),
      ...bundles.es,
      securityLabs: SECURITY_LABS_ES,
      certifications: CERTIFICATIONS_ES,
      skillModules: SKILL_MODULES_ES,
      contact: CONTACT_ES,
      guidedTourSteps: GUIDED_TOUR_STEPS_ES,
      hudTabOrder: HUD_TAB_ORDER_ES,
      labelForNodeId: labelForNodeIdEs,
    };
  }, [locale, bundles]);

  return <PortfolioRuntimeContext.Provider value={value}>{children}</PortfolioRuntimeContext.Provider>;
}

export function usePortfolio(): PortfolioRuntime {
  const ctx = useContext(PortfolioRuntimeContext);
  if (!ctx) {
    throw new Error("usePortfolio must be rendered inside PortfolioLocaleProvider");
  }
  return ctx;
}
