import "server-only";

import fs from "node:fs/promises";
import path from "node:path";

import type { CmsStoredV1 } from "@/lib/cms-types";

const CMS_FILENAME = path.join(process.cwd(), "content", "cms-data.json");

export async function readCmsFile(): Promise<CmsStoredV1 | null> {
  try {
    const raw = await fs.readFile(CMS_FILENAME, "utf8");
    const parsed = JSON.parse(raw) as CmsStoredV1;
    if (parsed.version !== 1) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function writeCmsFile(payload: CmsStoredV1): Promise<void> {
  await fs.mkdir(path.dirname(CMS_FILENAME), { recursive: true });
  const data: CmsStoredV1 = { ...payload, version: 1, updatedAt: new Date().toISOString() };
  const tmp = `${CMS_FILENAME}.tmp`;
  await fs.writeFile(tmp, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  await fs.rename(tmp, CMS_FILENAME);
}
