import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { CMS_SESSION_COOKIE, signAdminSession } from "@/lib/cms-session";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }
  const password =
    typeof body === "object" && body !== null && "password" in body
      ? (body as { password: unknown }).password
      : undefined;
  if (typeof password !== "string" || password.length === 0) {
    return NextResponse.json({ error: "Contraseña requerida" }, { status: 400 });
  }

  const hash = process.env.CMS_ADMIN_PASSWORD_HASH;
  if (!hash?.trim()) {
    return NextResponse.json(
      { error: "Falta CMS_ADMIN_PASSWORD_HASH en el servidor (ver .env.example)" },
      { status: 503 },
    );
  }

  let match = false;
  try {
    match = await bcrypt.compare(password, hash.trim());
  } catch {
    return NextResponse.json({ error: "CMS_ADMIN_PASSWORD_HASH no es un bcrypt válido" }, { status: 503 });
  }

  if (!match) {
    return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
  }

  let token: string;
  try {
    token = await signAdminSession();
  } catch {
    return NextResponse.json(
      { error: "Falta CMS_ADMIN_SECRET válido en el servidor (≥ 32 caracteres)" },
      { status: 503 },
    );
  }

  const store = await cookies();
  store.set(CMS_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({ ok: true });
}
