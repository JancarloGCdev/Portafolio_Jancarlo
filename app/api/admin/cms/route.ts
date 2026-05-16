import { buildAdminSeeds } from "@/lib/admin-seeds";
import { CMS_SESSION_COOKIE, verifyAdminSession } from "@/lib/cms-session";
import { readCmsFile, writeCmsFile } from "@/lib/cms-store";
import { formatCmsValidationError, parseAndNormalizeCmsPayload } from "@/lib/cms-validate";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function authorize(): Promise<boolean> {
  const c = await cookies();
  const token = c.get(CMS_SESSION_COOKIE)?.value;
  return verifyAdminSession(token);
}

export async function GET() {
  if (!(await authorize())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const [stored, seeds] = await Promise.all([readCmsFile(), Promise.resolve(buildAdminSeeds())]);
  return NextResponse.json({ stored, seeds });
}

export async function POST(req: Request) {
  if (!(await authorize())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  try {
    const normalized = parseAndNormalizeCmsPayload(raw);
    await writeCmsFile(normalized);
  } catch (e) {
    return NextResponse.json({ error: formatCmsValidationError(e) }, { status: 422 });
  }

  return NextResponse.json({ ok: true });
}
