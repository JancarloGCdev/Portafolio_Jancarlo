import type { PortfolioLocale } from "@/lib/i18n/locale";
import type { CertificationRecord, DevProject, ExperienceEntry } from "@/lib/data";
import type { CaseDetailSlide, TopologyNodeId } from "@/lib/mapData";

/** Metadatos opcionales del modal por id de proyecto (ES/EN). */
const PROJECT_DETAIL_EXTRA_ES: Record<string, { insightsHeading?: string; securityConsiderations: string[] }> = {
  "papertrail-v2": {
    insightsHeading: "Producto",
    securityConsiderations: [
      "Roles comprador/admin con permisos acotados; validación antes de rutas privilegiadas y del cobro.",
    ],
  },
  "techos-rentables": {
    insightsHeading: "Operación",
    securityConsiderations: [
      "Métricas y exportaciones tratadas con sesión estable y separación por rol ante datos sensibles de operación.",
    ],
  },
};

const PROJECT_DETAIL_EXTRA_EN: Record<string, { insightsHeading?: string; securityConsiderations: string[] }> = {
  "papertrail-v2": {
    insightsHeading: "Product",
    securityConsiderations: [
      "Tight shopper/admin segmentation with payload validation upstream of privileged routes—especially checkout handoffs.",
    ],
  },
  "techos-rentables": {
    insightsHeading: "Operations",
    securityConsiderations: ["KPI exports handled with deliberate session posture and operator-only affordances."],
  },
};

export function githubHrefFromLinks(project: DevProject): string | undefined {
  const hit = project.links.find((l) => l.variant === "github" || l.href.includes("github.com"));
  return hit?.href;
}

/** Enlaces GitHub públicos preservando el orden de la lista `projects`. */
export function aggregateGithubFooters(projects: readonly DevProject[]): { primary?: string; secondary?: string } {
  const seen = new Set<string>();
  const ordered: string[] = [];
  for (const p of projects) {
    const g = githubHrefFromLinks(p);
    if (g && !seen.has(g)) {
      seen.add(g);
      ordered.push(g);
    }
  }
  return { primary: ordered[0], secondary: ordered[1] };
}

export function aggregateLiveDemo(projects: readonly DevProject[]): string | undefined {
  const techos = projects.find((p) => p.id === "techos-rentables");
  if (techos?.liveUrl?.trim()) return techos.liveUrl.trim();
  for (const p of projects) {
    if (p.liveUrl?.trim()) return p.liveUrl.trim();
  }
  return undefined;
}

export function experienceTopologySubtitle(entries: readonly ExperienceEntry[]): string {
  if (entries.length === 0) return "";
  const [first, ...rest] = entries;
  if (rest.length === 0) return first.company;
  return `${first.company} · +${rest.length}`;
}

export function stackUnion(...groups: string[][]): string[] {
  return [...new Set(groups.flat().slice(0, 12))];
}

export function slidesFromExperience(entries: readonly ExperienceEntry[]): CaseDetailSlide[] {
  return entries.map((e) => ({
    title: e.company,
    subtitle: `${e.role} · ${e.location} · ${e.period}`,
    summary: e.summary,
    features: [...e.bullets],
    stack: [...e.stack],
    insightsHeading: e.insightsHeading,
    securityConsiderations: [...e.securityConsiderations],
    evidence: [],
    actions: {},
    learned: [...e.modalTakeaways],
  }));
}

/** Evidencias / alt según idioma. */
export function slidesFromProjectsForLocale(locale: PortfolioLocale, projects: readonly DevProject[]): CaseDetailSlide[] {
  const EXTRA = locale === "en" ? PROJECT_DETAIL_EXTRA_EN : PROJECT_DETAIL_EXTRA_ES;
  const altSuffix = locale === "en" ? "· screenshot" : "· vista del proyecto";
  return projects.map((p) => {
    const extra = EXTRA[p.id];
    return {
      title: p.name,
      subtitle: p.type,
      summary: "",
      features: [...p.features],
      stack: [...p.stack],
      insightsHeading: extra?.insightsHeading,
      securityConsiderations: [...(extra?.securityConsiderations ?? [])],
      evidence: p.image ? [{ src: p.image, alt: `${p.name} ${altSuffix}` }] : [],
      actions: {
        github: githubHrefFromLinks(p),
        demo: p.liveUrl?.trim(),
      },
      reflectionSingle: p.learned,
    };
  });
}

export function certificationsSortedDescending(certs: readonly CertificationRecord[]): CertificationRecord[] {
  return [...certs].sort((a, b) => b.sortDate.localeCompare(a.sortDate));
}

export type TopologyNodeMeta = Record<
  TopologyNodeId,
  { label: string; subtitle: string; x: number; y: number; accent: string }
>;

/** Actualiza sólo la fila Experience del grafo cuando cambian datos dinámicos. */
export function patchTopologyExperience<T extends TopologyNodeMeta>(topology: T, entries: readonly ExperienceEntry[]): T {
  return {
    ...topology,
    experience: {
      ...topology.experience,
      subtitle: experienceTopologySubtitle(entries),
    },
  };
}
