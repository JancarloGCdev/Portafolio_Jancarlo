import type { CmsLocaleSlice, CmsStoredV1 } from "@/lib/cms-types";
import type { DevProject, ExperienceEntry, PanelLink } from "@/lib/data";
import { sanitizeDevProjectUrls } from "@/lib/cms-url";

const MAX_STR = 8000;
const MAX_SHORT = 400;
const MAX_NAME = 200;
const MAX_PROJECTS = 40;
const MAX_EXPERIENCES = 30;
const MAX_ABOUT = 20;
const ID_RE = /^[a-z0-9][a-z0-9-]{0,62}$/i;

function trimStr(v: unknown, max: number): string | undefined {
  if (v === undefined || v === null) return undefined;
  if (typeof v !== "string") return undefined;
  const t = v.trim().slice(0, max);
  return t.length > 0 ? t : undefined;
}

function requireStr(v: unknown, max: number, field: string): string {
  const t = trimStr(v, max);
  if (!t) throw new Error(`${field} es obligatorio`);
  return t;
}

function parseProfilePatch(v: unknown): CmsLocaleSlice["profile"] {
  if (v === undefined || v === null) return undefined;
  if (typeof v !== "object" || Array.isArray(v)) throw new Error("profile debe ser un objeto");
  const o = v as Record<string, unknown>;
  const out: NonNullable<CmsLocaleSlice["profile"]> = {};
  const name = trimStr(o.name, MAX_NAME);
  const role = trimStr(o.role, MAX_STR);
  const location = trimStr(o.location, MAX_SHORT);
  const status = trimStr(o.status, MAX_SHORT);
  const focus = trimStr(o.focus, MAX_STR);
  if (name) out.name = name;
  if (role) out.role = role;
  if (location) out.location = location;
  if (status) out.status = status;
  if (focus) out.focus = focus;
  return Object.keys(out).length > 0 ? out : undefined;
}

function parseConsolePatch(v: unknown): CmsLocaleSlice["profileConsole"] {
  if (v === undefined || v === null) return undefined;
  if (typeof v !== "object" || Array.isArray(v)) throw new Error("profileConsole debe ser un objeto");
  const o = v as Record<string, unknown>;
  const out: NonNullable<CmsLocaleSlice["profileConsole"]> = {};
  const windowTag = trimStr(o.windowTag, MAX_SHORT);
  const avatarSrc = trimStr(o.avatarSrc, 500);
  const initials = trimStr(o.initials, 8);
  if (windowTag) out.windowTag = windowTag;
  if (avatarSrc) out.avatarSrc = avatarSrc;
  if (initials) out.initials = initials;
  return Object.keys(out).length > 0 ? out : undefined;
}

function parseAbout(v: unknown): string[] | undefined {
  if (v === undefined || v === null) return undefined;
  if (!Array.isArray(v)) throw new Error("aboutParagraphs debe ser un arreglo de strings");
  if (v.length > MAX_ABOUT) throw new Error(`aboutParagraphs: máximo ${MAX_ABOUT} párrafos`);
  return v.map((p, i) => requireStr(p, MAX_STR, `aboutParagraphs[${i}]`));
}

function parseLink(v: unknown, idx: number): PanelLink {
  if (typeof v !== "object" || v === null || Array.isArray(v)) {
    throw new Error(`links[${idx}] inválido`);
  }
  const o = v as Record<string, unknown>;
  const label = requireStr(o.label, MAX_SHORT, `links[${idx}].label`);
  const hrefRaw = requireStr(o.href, 2000, `links[${idx}].href`);

  let variant: NonNullable<PanelLink["variant"]>;
  if (o.variant === undefined || o.variant === null) {
    variant = "default";
  } else if (typeof o.variant === "string") {
    const vv = o.variant;
    if (vv !== "github" && vv !== "linkedin" && vv !== "live" && vv !== "default") {
      throw new Error(`links[${idx}].variant no permitido`);
    }
    variant = vv;
  } else {
    throw new Error(`links[${idx}].variant no permitido`);
  }

  const sanitized = sanitizeDevProjectUrls({ liveUrl: undefined, links: [{ label, href: hrefRaw, variant }] });
  const first = sanitized.links?.[0];
  if (!first?.href) throw new Error(`links[${idx}].href no es una URL http(s) válida`);
  return { label: first.label, href: first.href, variant };
}

function parseDevProject(v: unknown, idx: number): DevProject {
  if (typeof v !== "object" || v === null || Array.isArray(v)) {
    throw new Error(`devProjects[${idx}] inválido`);
  }
  const o = v as Record<string, unknown>;
  const id = requireStr(o.id, 64, `devProjects[${idx}].id`);
  if (!ID_RE.test(id)) {
    throw new Error(`devProjects[${idx}].id: usa solo letras, números o guiones (máx. 64 caracteres)`);
  }
  const name = requireStr(o.name, MAX_NAME, `devProjects[${idx}].name`);
  const type = requireStr(o.type, MAX_STR, `devProjects[${idx}].type`);
  const image = trimStr(o.image, 500);
  const liveUrlRaw = trimStr(o.liveUrl, 2000);
  const learned = requireStr(o.learned, MAX_STR, `devProjects[${idx}].learned`);

  if (!Array.isArray(o.features)) throw new Error(`devProjects[${idx}].features debe ser arreglo`);
  if (!Array.isArray(o.stack)) throw new Error(`devProjects[${idx}].stack debe ser arreglo`);
  if (!Array.isArray(o.links)) throw new Error(`devProjects[${idx}].links debe ser arreglo`);

  const features = o.features.map((f, j) => requireStr(f, MAX_STR, `devProjects[${idx}].features[${j}]`));
  const stack = o.stack.map((s, j) => requireStr(s, MAX_SHORT, `devProjects[${idx}].stack[${j}]`));
  const links = o.links.map((l, j) => parseLink(l, j));

  const base: DevProject = {
    id,
    name,
    type,
    image,
    liveUrl: liveUrlRaw,
    features,
    stack,
    learned,
    links,
  };
  return sanitizeDevProjectUrls(base);
}

function parseProjects(v: unknown): DevProject[] | undefined {
  if (v === undefined || v === null) return undefined;
  if (!Array.isArray(v)) throw new Error("devProjects debe ser un arreglo");
  if (v.length > MAX_PROJECTS) throw new Error(`devProjects: máximo ${MAX_PROJECTS}`);
  return v.map((p, i) => parseDevProject(p, i));
}

function parseTakeaways(v: unknown, field: string): [string, string] {
  if (!Array.isArray(v) || v.length !== 2) throw new Error(`${field} debe ser [string, string]`);
  return [requireStr(v[0], MAX_STR, `${field}[0]`), requireStr(v[1], MAX_STR, `${field}[1]`)];
}

function parseExperience(v: unknown, idx: number): ExperienceEntry {
  if (typeof v !== "object" || v === null || Array.isArray(v)) {
    throw new Error(`experiences[${idx}] inválido`);
  }
  const o = v as Record<string, unknown>;
  const company = requireStr(o.company, MAX_NAME, `experiences[${idx}].company`);
  const role = requireStr(o.role, MAX_STR, `experiences[${idx}].role`);
  const location = requireStr(o.location, MAX_SHORT, `experiences[${idx}].location`);
  const period = requireStr(o.period, MAX_SHORT, `experiences[${idx}].period`);
  const summary = requireStr(o.summary, MAX_STR, `experiences[${idx}].summary`);
  const modalTakeaways = parseTakeaways(o.modalTakeaways, `experiences[${idx}].modalTakeaways`);

  if (!Array.isArray(o.bullets)) throw new Error(`experiences[${idx}].bullets debe ser arreglo`);
  if (!Array.isArray(o.stack)) throw new Error(`experiences[${idx}].stack debe ser arreglo`);
  if (!Array.isArray(o.securityConsiderations)) {
    throw new Error(`experiences[${idx}].securityConsiderations debe ser arreglo`);
  }

  const bullets = o.bullets.map((b, j) => requireStr(b, MAX_STR, `experiences[${idx}].bullets[${j}]`));
  const stack = o.stack.map((s, j) => requireStr(s, MAX_SHORT, `experiences[${idx}].stack[${j}]`));
  const securityConsiderations = o.securityConsiderations.map((s, j) =>
    requireStr(s, MAX_STR, `experiences[${idx}].securityConsiderations[${j}]`),
  );

  const insightsHeading = trimStr(o.insightsHeading, MAX_SHORT);

  return {
    company,
    role,
    location,
    period,
    summary,
    bullets,
    modalTakeaways,
    stack,
    insightsHeading,
    securityConsiderations,
  };
}

function parseExperiences(v: unknown): ExperienceEntry[] | undefined {
  if (v === undefined || v === null) return undefined;
  if (!Array.isArray(v)) throw new Error("experiences debe ser un arreglo");
  if (v.length > MAX_EXPERIENCES) throw new Error(`experiences: máximo ${MAX_EXPERIENCES}`);
  return v.map((e, i) => parseExperience(e, i));
}

function parseLocaleSlice(v: unknown): CmsLocaleSlice | undefined {
  if (v === undefined || v === null) return undefined;
  if (typeof v !== "object" || Array.isArray(v)) throw new Error("Sección de idioma inválida");
  const o = v as Record<string, unknown>;
  const slice: CmsLocaleSlice = {
    profile: parseProfilePatch(o.profile),
    aboutParagraphs: parseAbout(o.aboutParagraphs),
    profileConsole: parseConsolePatch(o.profileConsole),
    devProjects: parseProjects(o.devProjects),
    experiences: parseExperiences(o.experiences),
  };
  const has =
    slice.profile ||
    slice.aboutParagraphs ||
    slice.profileConsole ||
    slice.devProjects ||
    slice.experiences;
  return has ? slice : undefined;
}

export function parseAndNormalizeCmsPayload(body: unknown): CmsStoredV1 {
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    throw new Error("Cuerpo JSON inválido");
  }
  const o = body as Record<string, unknown>;
  if (o.version !== 1) throw new Error("version debe ser 1");

  const es = parseLocaleSlice(o.es);
  const en = parseLocaleSlice(o.en);

  const out: CmsStoredV1 = { version: 1 };
  if (es) out.es = es;
  if (en) out.en = en;
  return out;
}

export function formatCmsValidationError(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err);
}
