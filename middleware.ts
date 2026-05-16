import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { CMS_SESSION_COOKIE, verifyAdminSession } from "@/lib/cms-session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin") && !pathname.startsWith("/api/admin")) {
    return NextResponse.next();
  }

  const isPublic =
    pathname.startsWith("/admin/login") || pathname === "/api/admin/login";

  if (isPublic) {
    return NextResponse.next();
  }

  const token = request.cookies.get(CMS_SESSION_COOKIE)?.value;
  const ok = await verifyAdminSession(token);
  if (ok) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const url = request.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("redirect", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
