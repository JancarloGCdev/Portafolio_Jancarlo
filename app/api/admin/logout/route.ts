import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { CMS_SESSION_COOKIE } from "@/lib/cms-session";

export async function POST() {
  const store = await cookies();
  store.set(CMS_SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return NextResponse.json({ ok: true });
}
