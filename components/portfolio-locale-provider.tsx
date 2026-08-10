"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";

import type { PortfolioLocale } from "@/lib/i18n/locale";
import type {
  CertificationRecord,
  DevProject,
  ExperienceEntry,
  PanelLink,
} from "@/lib/data";
import {
  CERTIFICATIONS as CERTIFICATIONS_ES,
  SKILL_MODULES as SKILL_MODULES_ES,
  CONTACT as CONTACT_ES,
} from "@/lib/data";
import {
  CERTIFICATIONS as CERTIFICATIONS_EN,
  SKILL_MODULES as SKILL_MODULES_EN,
  CONTACT as CONTACT_EN,
} from "@/lib/data-en";
import type { ResolvedBundles } from "@/lib/portfolio-bundles-type";
import { getPageCopy, type PageCopy } from "@/lib/page-copy";

type ProfileSummary = {
  name: string;
  role: string;
  location: string;
  status: string;
  focus: string;
  email?: string;
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
  experiences: readonly ExperienceEntry[];
  devProjects: readonly DevProject[];
  certifications: readonly CertificationRecord[];
  skillModules: readonly SkillModule[];
  contact: ContactBlock;
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
        certifications: CERTIFICATIONS_EN,
        skillModules: SKILL_MODULES_EN,
        contact: CONTACT_EN,
      };
    }

    return {
      locale: "es",
      copy: getPageCopy("es"),
      ...bundles.es,
      certifications: CERTIFICATIONS_ES,
      skillModules: SKILL_MODULES_ES,
      contact: CONTACT_ES,
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
