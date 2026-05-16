"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import type { CmsLocaleSlice, CmsStoredV1 } from "@/lib/cms-types";
import type { ExperienceEntry, PanelLink } from "@/lib/data";
import type { PortfolioLocale } from "@/lib/i18n/locale";
import type { AdminLocaleSeed, AdminSeedPayload } from "@/lib/portfolio-bundles-type";

type EditorState = {
  es: AdminLocaleSeed;
  en: AdminLocaleSeed;
};

type DevProjectRow = EditorState["es"]["devProjects"][number];

function mergeEditable(seed: AdminLocaleSeed, slice?: CmsLocaleSlice): AdminLocaleSeed {
  return {
    profile: {
      ...seed.profile,
      ...slice?.profile,
    },
    aboutParagraphs:
      slice?.aboutParagraphs !== undefined ? [...slice.aboutParagraphs] : [...seed.aboutParagraphs],
    profileConsole: { ...seed.profileConsole, ...slice?.profileConsole },
    devProjects: slice?.devProjects !== undefined ? [...slice.devProjects] : [...seed.devProjects],
    experiences: slice?.experiences !== undefined ? [...slice.experiences] : [...seed.experiences],
  };
}

function toPayload(state: EditorState): CmsStoredV1 {
  return {
    version: 1,
    es: {
      profile: state.es.profile,
      aboutParagraphs: state.es.aboutParagraphs,
      profileConsole: state.es.profileConsole,
      devProjects: state.es.devProjects,
      experiences: state.es.experiences,
    },
    en: {
      profile: state.en.profile,
      aboutParagraphs: state.en.aboutParagraphs,
      profileConsole: state.en.profileConsole,
      devProjects: state.en.devProjects,
      experiences: state.en.experiences,
    },
  };
}

function emptyProject(): PanelLink[] {
  return [{ label: "GitHub", href: "https://github.com/", variant: "github" }];
}

export function AdminDashboard() {
  const router = useRouter();
  const [locale, setLocale] = useState<PortfolioLocale>("es");
  const [seed, setSeed] = useState<AdminSeedPayload | null>(null);
  const [state, setState] = useState<EditorState | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [savedOk, setSavedOk] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/cms");
        const data: { error?: string; seeds?: AdminSeedPayload; stored?: CmsStoredV1 | null } =
          await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(typeof data.error === "string" ? data.error : `HTTP ${res.status}`);
        const seeds = data.seeds;
        const stored = data.stored;
        if (!seeds?.es || !seeds.en) throw new Error("Respuesta incompleta");
        const merged: EditorState = {
          es: mergeEditable(seeds.es, stored?.es),
          en: mergeEditable(seeds.en, stored?.en),
        };
        if (!cancelled) {
          setSeed(seeds);
          setState(merged);
          setLoadError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setLoadError(e instanceof Error ? e.message : "Error al cargar");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  async function onSave() {
    if (!state) return;
    setBusy(true);
    setSavedOk(false);
    setSaveError(null);
    try {
      const res = await fetch("/api/admin/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toPayload(state)),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSaveError(typeof data.error === "string" ? data.error : `Error HTTP ${res.status}`);
        return;
      }
      setSavedOk(true);
    } catch {
      setSaveError("No se pudo guardar (red o servidor).");
    } finally {
      setBusy(false);
    }
  }

  function revertLocale(loc: PortfolioLocale) {
    if (!seed || !state) return;
    const nextSeed = loc === "es" ? seed.es : seed.en;
    setState({
      ...state,
      [loc]: { ...structuredClone(nextSeed) },
    });
    setSavedOk(false);
  }

  function mergeTakeaways(loc: PortfolioLocale, ei: number, idx: number, val: string) {
    setState((prev) => {
      if (!prev) return prev;
      const rows = [...prev[loc].experiences];
      const row = rows[ei];
      if (!row) return prev;
      const tup: [string, string] = [row.modalTakeaways[0], row.modalTakeaways[1]];
      if (idx !== 0 && idx !== 1) return prev;
      tup[idx] = val;
      rows[ei] = { ...row, modalTakeaways: tup };
      return { ...prev, [loc]: { ...prev[loc], experiences: rows } };
    });
    setSavedOk(false);
  }

  function saveXp(loc: PortfolioLocale, ei: number, patch: Partial<ExperienceEntry>) {
    setState((prev) => {
      if (!prev) return prev;
      const rows = prev[loc].experiences.map((row, i) => (i === ei ? ({ ...row, ...patch }) as ExperienceEntry : row));
      return { ...prev, [loc]: { ...prev[loc], experiences: rows } };
    });
    setSavedOk(false);
  }

  function saveProject(loc: PortfolioLocale, pi: number, patch: Partial<DevProjectRow>) {
    setState((prev) => {
      if (!prev) return prev;
      const rows = prev[loc].devProjects.map((row, i) =>
        i === pi ? ({ ...row, ...patch } as typeof row) : row,
      );
      return { ...prev, [loc]: { ...prev[loc], devProjects: rows } };
    });
    setSavedOk(false);
  }

  function patchProjects(loc: PortfolioLocale, rows: EditorState["es"]["devProjects"]) {
    setState((prev) => (prev ? { ...prev, [loc]: { ...prev[loc], devProjects: rows } } : prev));
    setSavedOk(false);
  }

  function patchExperiences(loc: PortfolioLocale, rows: EditorState["es"]["experiences"]) {
    setState((prev) => (prev ? { ...prev, [loc]: { ...prev[loc], experiences: rows } } : prev));
    setSavedOk(false);
  }

  function patchAbout(loc: PortfolioLocale, paras: string[]) {
    setState((prev) => (prev ? { ...prev, [loc]: { ...prev[loc], aboutParagraphs: paras } } : prev));
    setSavedOk(false);
  }

  function patchConsole(loc: PortfolioLocale, patch: Partial<AdminLocaleSeed["profileConsole"]>) {
    setState((prev) =>
      prev ? { ...prev, [loc]: { ...prev[loc], profileConsole: { ...prev[loc].profileConsole, ...patch } } } : prev,
    );
    setSavedOk(false);
  }

  function patchProfile(loc: PortfolioLocale, patch: Partial<AdminLocaleSeed["profile"]>) {
    setState((prev) =>
      prev ? { ...prev, [loc]: { ...prev[loc], profile: { ...prev[loc].profile, ...patch } } } : prev,
    );
    setSavedOk(false);
  }

  if (loadError) {
    return (
      <main className="mx-auto max-w-lg px-6 py-12 text-red-400">
        {loadError}.{" "}
        <button type="button" className="underline" onClick={() => router.refresh()}>
          Reintentar
        </button>
      </main>
    );
  }

  if (!state || !seed) {
    return <main className="mx-auto max-w-lg px-6 py-12 text-zinc-500">Cargando panel…</main>;
  }

  const slice = state[locale];

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-sm text-zinc-200">
      <header className="mb-8 flex flex-wrap items-start justify-between gap-4 border-b border-zinc-700/60 pb-6">
        <div>
          <h1 className="text-xl font-semibold text-cyan-200/95">CMS del portafolio</h1>
          <p className="mt-2 max-w-prose text-zinc-400">
            Edita español / inglés, guarda en <code className="text-cyan-200/70">content/cms-data.json</code>. En hosting
            serverless los archivos no persisten entre despliegues: usa servidor con disco persistente o un almacén (DB,
            KV, Blob).
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/" className="rounded border border-zinc-600 px-3 py-1.5 text-xs hover:bg-zinc-800">
            Ver sitio
          </Link>
          <button type="button" className="rounded bg-zinc-800 px-3 py-1.5 text-xs hover:bg-zinc-700" onClick={logout}>
            Salir
          </button>
        </div>
      </header>

      <div className="mb-6 flex gap-2">
        <Toggle tab={locale} value="es" onChange={setLocale} label="ES" />
        <Toggle tab={locale} value="en" onChange={setLocale} label="EN" />
        <button
          type="button"
          className="ml-auto text-xs text-amber-200/90 underline-offset-4 hover:underline"
          onClick={() => revertLocale(locale)}
        >
          Restaurar {locale.toUpperCase()} al código fuente (local)
        </button>
      </div>

      <section className="space-y-4 rounded-lg border border-zinc-700/70 bg-zinc-900/35 p-4">
        <h2 className="text-xs uppercase tracking-wider text-zinc-500">Perfil corto</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Nombre" value={slice.profile.name} onChange={(v) => patchProfile(locale, { name: v })} />
          <Field label="Estado / disponibilidad" value={slice.profile.status} onChange={(v) => patchProfile(locale, { status: v })} />
        </div>
        <Field label="Rol (línea larga)" multiline value={slice.profile.role} onChange={(v) => patchProfile(locale, { role: v })} />
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Ubicación" value={slice.profile.location} onChange={(v) => patchProfile(locale, { location: v })} />
          <Field label="Enfoque" multiline value={slice.profile.focus} onChange={(v) => patchProfile(locale, { focus: v })} />
        </div>
      </section>

      <section className="mt-6 space-y-4 rounded-lg border border-zinc-700/70 bg-zinc-900/35 p-4">
        <h2 className="text-xs uppercase tracking-wider text-zinc-500">Ventana perfil · consola del mapa</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <Field
            label="windowTag"
            value={slice.profileConsole.windowTag}
            onChange={(v) => patchConsole(locale, { windowTag: v })}
          />
          <Field
            label="avatarSrc (/public)"
            value={slice.profileConsole.avatarSrc}
            onChange={(v) => patchConsole(locale, { avatarSrc: v })}
          />
          <Field
            label="Iniciales"
            value={slice.profileConsole.initials}
            onChange={(v) => patchConsole(locale, { initials: v })}
          />
        </div>
      </section>

      <section className="mt-6 space-y-3 rounded-lg border border-zinc-700/70 bg-zinc-900/35 p-4">
        <h2 className="text-xs uppercase tracking-wider text-zinc-500">About (párrafos en orden)</h2>
        {(slice.aboutParagraphs.length === 0 ? [""] : slice.aboutParagraphs).map((p, idx) => (
          <div key={idx} className="flex gap-2">
            <textarea
              className="min-h-[5rem] flex-1 rounded border border-zinc-600 bg-zinc-950 px-2 py-1 text-[13px] outline-none focus:border-accent-cyan/70"
              value={p}
              onChange={(ev) =>
                patchAbout(
                  locale,
                  slice.aboutParagraphs.map((prev, i) => (i === idx ? ev.target.value : prev)),
                )
              }
            />
            <button
              type="button"
              className="self-start rounded border border-red-900/70 px-2 py-1 text-[11px] text-red-300 hover:bg-red-950/60"
              onClick={() => patchAbout(locale, slice.aboutParagraphs.filter((_, i) => i !== idx))}
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          className="rounded border border-dashed border-zinc-600 px-3 py-1.5 text-xs text-zinc-400 hover:bg-zinc-800"
          onClick={() => patchAbout(locale, [...slice.aboutParagraphs, ""])}
        >
          + Párrafo
        </button>
      </section>

      <section className="mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs uppercase tracking-wider text-zinc-500">Proyectos</h2>
          <button
            type="button"
            className="rounded bg-emerald-800/70 px-2 py-1 text-[11px] hover:bg-emerald-700"
            onClick={() =>
              patchProjects(locale, [
                ...slice.devProjects,
                {
                  id: `proyecto-${Date.now().toString(36)}`,
                  name: "Nuevo proyecto",
                  type: "Descripción corta del tipo",
                  image: "",
                  liveUrl: "",
                  features: ["Destacado 1"],
                  stack: ["Stack"],
                  learned: "Reflexión corta sobre el proyecto.",
                  links: emptyProject(),
                },
              ])
            }
          >
            + Proyecto
          </button>
        </div>
        {slice.devProjects.map((p, pi) => (
          <div key={p.id + pi} className="rounded-lg border border-zinc-700/70 bg-zinc-950/40 p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="text-[11px] text-zinc-500">#{pi + 1}</span>
              <button
                type="button"
                className="ml-auto text-[11px] text-red-400 hover:underline"
                onClick={() => patchProjects(locale, slice.devProjects.filter((_, i) => i !== pi))}
              >
                Eliminar
              </button>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <Field label="id (slug único)" value={p.id} onChange={(v) => saveProject(locale, pi, { id: v })} />
              <Field label="Nombre" value={p.name} onChange={(v) => saveProject(locale, pi, { name: v })} />
            </div>
            <Field label="Tipo / subtítulo" value={p.type} onChange={(v) => saveProject(locale, pi, { type: v })} />
            <div className="grid gap-2 sm:grid-cols-2">
              <Field
                label="Imagen (ruta public/… opcional)"
                value={p.image ?? ""}
                onChange={(v) => saveProject(locale, pi, { image: v || undefined })}
              />
              <Field
                label="Sitio web (https, opcional)"
                value={p.liveUrl ?? ""}
                onChange={(v) => saveProject(locale, pi, { liveUrl: v || undefined })}
              />
            </div>
            <Field
              label="Características (una por línea)"
              multiline
              value={(p.features ?? []).join("\n")}
              onChange={(txt) =>
                saveProject(locale, pi, {
                  features: txt
                    .split("\n")
                    .map((l) => l.trim())
                    .filter(Boolean),
                })
              }
            />
            <Field
              label="Stack (uno por línea)"
              multiline
              value={(p.stack ?? []).join("\n")}
              onChange={(txt) =>
                saveProject(locale, pi, {
                  stack: txt
                    .split("\n")
                    .map((l) => l.trim())
                    .filter(Boolean),
                })
              }
            />
            <Field
              label="learned · reflexión"
              multiline
              value={p.learned}
              onChange={(v) => saveProject(locale, pi, { learned: v })}
            />
            <LinksEditor links={p.links} onChange={(links) => saveProject(locale, pi, { links })} />
          </div>
        ))}
      </section>

      <section className="mt-8 space-y-4 pb-28">
        <div className="flex items-center justify-between">
          <h2 className="text-xs uppercase tracking-wider text-zinc-500">Experiencia laboral</h2>
          <button
            type="button"
            className="rounded bg-emerald-800/70 px-2 py-1 text-[11px] hover:bg-emerald-700"
            onClick={() =>
              patchExperiences(locale, [
                ...slice.experiences,
                {
                  company: "Empresa",
                  role: "Rol",
                  location: "Ciudad · País",
                  period: "2024 – Actualidad",
                  summary: "Resumen del rol.",
                  bullets: ["Bullet 1"],
                  modalTakeaways: ["Aprendizaje 1", "Aprendizaje 2"] as const,
                  stack: ["Stack"],
                  insightsHeading: "Contexto",
                  securityConsiderations: ["Nota de seguridad relacionada"],
                } satisfies ExperienceEntry,
              ])
            }
          >
            + Experiencia
          </button>
        </div>
        {slice.experiences.map((ex, ei) => (
          <div key={ei} className="rounded-lg border border-zinc-700/70 bg-zinc-950/40 p-4">
            <div className="mb-3 flex">
              <button
                type="button"
                className="ml-auto text-[11px] text-red-400 hover:underline"
                onClick={() => patchExperiences(locale, slice.experiences.filter((_, i) => i !== ei))}
              >
                Eliminar
              </button>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <Field label="Empresa" value={ex.company} onChange={(v) => saveXp(locale, ei, { company: v })} />
              <Field label="Rol" value={ex.role} onChange={(v) => saveXp(locale, ei, { role: v })} />
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <Field label="Ubicación" value={ex.location} onChange={(v) => saveXp(locale, ei, { location: v })} />
              <Field label="Período" value={ex.period} onChange={(v) => saveXp(locale, ei, { period: v })} />
            </div>
            <Field label="Summary" multiline value={ex.summary} onChange={(v) => saveXp(locale, ei, { summary: v })} />
            <Field
              label="Bullets (una por línea)"
              multiline
              value={[...ex.bullets].join("\n")}
              onChange={(txt) =>
                saveXp(locale, ei, {
                  bullets: txt
                    .split("\n")
                    .map((l) => l.trim())
                    .filter(Boolean),
                })
              }
            />
            <div className="grid gap-2 sm:grid-cols-2">
              <Field label="Takeaway modal 1" value={ex.modalTakeaways[0]} onChange={(v) => mergeTakeaways(locale, ei, 0, v)} />
              <Field label="Takeaway modal 2" value={ex.modalTakeaways[1]} onChange={(v) => mergeTakeaways(locale, ei, 1, v)} />
            </div>
            <Field
              label="insightsHeading (opc.)"
              value={ex.insightsHeading ?? ""}
              onChange={(v) => saveXp(locale, ei, { insightsHeading: v || undefined })}
            />
            <Field
              label="Stack (uno por línea)"
              multiline
              value={[...ex.stack].join("\n")}
              onChange={(txt) =>
                saveXp(locale, ei, {
                  stack: txt
                    .split("\n")
                    .map((l) => l.trim())
                    .filter(Boolean),
                })
              }
            />
            <Field
              label="Consideraciones seguridad (una por línea)"
              multiline
              value={[...ex.securityConsiderations].join("\n")}
              onChange={(txt) =>
                saveXp(locale, ei, {
                  securityConsiderations: txt
                    .split("\n")
                    .map((l) => l.trim())
                    .filter(Boolean),
                })
              }
            />
          </div>
        ))}
      </section>

      <footer className="fixed bottom-0 left-0 right-0 border-t border-zinc-700/70 bg-zinc-950/90 px-4 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3">
          {saveError ? <p className="text-[13px] text-red-400">{saveError}</p> : null}
          {!saveError && savedOk ? (
            <p className="text-[13px] text-emerald-400">
              Guardado correctamente · recarga la página de inicio para ver cambios.
            </p>
          ) : null}
          <button
            type="button"
            disabled={busy}
            onClick={onSave}
            className="ml-auto rounded bg-accent-cyan px-6 py-2 text-sm font-medium text-zinc-950 hover:bg-accent-cyan/90 disabled:opacity-40"
          >
            {busy ? "Guardando…" : "Guardar JSON"}
          </button>
        </div>
      </footer>
    </main>
  );
}

function Toggle({
  tab,
  value,
  onChange,
  label,
}: {
  tab: PortfolioLocale;
  value: PortfolioLocale;
  onChange: (v: PortfolioLocale) => void;
  label: string;
}) {
  const active = tab === value;
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`rounded px-4 py-1.5 text-xs font-medium uppercase tracking-wide ${
        active ? "bg-accent-cyan/85 text-zinc-950" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
      }`}
    >
      {label}
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[11px] uppercase tracking-wide text-zinc-500">{label}</span>
      {multiline ? (
        <textarea
          className="min-h-[4rem] rounded border border-zinc-600 bg-zinc-950 px-2 py-1 text-[13px] outline-none focus:border-accent-cyan/70"
          value={value}
          onChange={(ev) => onChange(ev.target.value)}
        />
      ) : (
        <input
          className="rounded border border-zinc-600 bg-zinc-950 px-2 py-1 text-[13px] outline-none focus:border-accent-cyan/70"
          value={value}
          onChange={(ev) => onChange(ev.target.value)}
        />
      )}
    </label>
  );
}

function LinksEditor({ links, onChange }: { links: PanelLink[]; onChange: (next: PanelLink[]) => void }) {
  return (
    <div className="mt-3 space-y-2">
      <p className="text-[11px] uppercase tracking-wide text-zinc-500">Enlaces · sólo URLs http/https</p>
      {links.map((l, idx) => (
        <div key={idx} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
          <Field label={`Etiqueta ${idx + 1}`} value={l.label} onChange={(v) => patchLink(onChange, links, idx, { ...l, label: v })} />
          <Field label="URL" value={l.href} onChange={(v) => patchLink(onChange, links, idx, { ...l, href: v })} />
          <div className="flex gap-2 sm:flex-col sm:justify-end">
            <select
              className="rounded border border-zinc-600 bg-zinc-950 px-2 py-1 text-[12px]"
              value={l.variant ?? "default"}
              onChange={(ev) =>
                patchLink(onChange, links, idx, {
                  ...l,
                  variant: ev.target.value as PanelLink["variant"],
                })
              }
            >
              <option value="default">default</option>
              <option value="github">github</option>
              <option value="live">live</option>
              <option value="linkedin">linkedin</option>
            </select>
            <button
              type="button"
              className="text-[11px] text-red-400 hover:underline"
              onClick={() => onChange(links.filter((_, i) => i !== idx))}
            >
              Quitar
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        className="text-[11px] text-accent-cyan hover:underline"
        onClick={() => onChange([...links, { label: "Enlace", href: "https://", variant: "default" }])}
      >
        + Enlace
      </button>
    </div>
  );
}

function patchLink(onChange: (n: PanelLink[]) => void, prev: PanelLink[], idx: number, nextLink: PanelLink) {
  onChange(prev.map((x, i) => (i === idx ? nextLink : x)));
}
