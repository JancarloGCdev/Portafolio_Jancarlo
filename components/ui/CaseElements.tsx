import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Github, Linkedin } from "lucide-react";

import { resolveTechLogo, techLogoImgSrc } from "@/lib/tech-logos";
export type CaseActions = {
  github?: string;
  githubSecondary?: string;
  demo?: string;
  linkedin?: string;
};
import type { PageCopy } from "@/lib/page-copy";

export function StackTechBadge({ rawToken }: { rawToken: string }) {
  const resolved = resolveTechLogo(rawToken);
  const label = resolved?.label ?? rawToken;

  return (
    <span title={label} className="inline-flex max-w-[220px] items-center gap-1.5 rounded-md border border-cyan-500/20 bg-accent-cyan/10 px-2 py-1 text-left text-cyan-100/95">
      {resolved ? (
        <Image
          src={techLogoImgSrc(resolved)}
          alt=""
          width={22}
          height={22}
          loading="lazy"
          sizes="22px"
          unoptimized
          draggable={false}
          className="size-[22px] shrink-0 pointer-events-none select-none [filter:drop-shadow(0_0_10px_rgba(34,211,238,0.22))]"
        />
      ) : null}
      <span className="truncate text-[11px]">{resolved ? label : rawToken}</span>
    </span>
  );
}

export function CaseActionButtons({ actions, nm }: { actions: CaseActions; nm: PageCopy["nodeModal"] }) {
  return (
    <>
      {actions.github ? (
        <a
          href={actions.github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-600 bg-zinc-900/85 px-3 py-2 text-[13px] font-medium text-white transition hover:border-accent-cyan/45 hover:text-accent-cyan"
        >
          <Github className="h-4 w-4" aria-hidden /> GitHub
          <ExternalLink className="h-3 w-3 opacity-60" aria-hidden />
        </a>
      ) : null}
      {actions.githubSecondary ? (
        <a
          href={actions.githubSecondary}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-600/85 bg-black/55 px-3 py-2 text-[12px] font-medium text-zinc-200 transition hover:border-accent-cyan/45 hover:text-accent-cyan"
        >
          <Github className="h-4 w-4" aria-hidden /> {nm.repoSecondary}
          <ExternalLink className="h-3 w-3 opacity-55" aria-hidden />
        </a>
      ) : null}
      {actions.demo ? (
        <a
          href={actions.demo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-accent-cyan/38 bg-accent-cyan/14 px-3 py-2 text-[13px] font-medium text-accent-cyan transition hover:bg-accent-cyan/22"
        >
          {nm.liveSite}
          <ExternalLink className="h-3 w-3 opacity-70" aria-hidden />
        </a>
      ) : null}
      {actions.linkedin ? (
        <a
          href={actions.linkedin}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-sky-500/35 bg-sky-500/12 px-3 py-2 text-[13px] font-medium text-sky-100 transition hover:border-sky-400/50 hover:bg-sky-500/18"
        >
          <Linkedin className="h-4 w-4" aria-hidden /> {nm.linkedinActionLabel}
          <ExternalLink className="h-3 w-3 opacity-60" aria-hidden />
        </a>
      ) : null}
    </>
  );
}

export function EvRaster({ src, alt }: { src: string; alt: string }) {
  const [ok, setOk] = useState(true);
  if (!ok) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-surface-border bg-black/35 text-[11px] text-zinc-500">
        Pendiente {alt}
      </div>
    );
  }
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-surface-border bg-black/25">
      <Image
        src={src}
        alt={alt}
        fill
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
        className="object-cover object-center pointer-events-none select-none"
        sizes="320px"
        onError={() => setOk(false)}
        unoptimized
      />
    </div>
  );
}

export function EvSvg({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-surface-border bg-black/25">
      <Image
        src={src}
        alt={alt}
        fill
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
        className="object-cover object-center pointer-events-none select-none"
        sizes="320px"
        unoptimized
      />
    </div>
  );
}
