import { SignJWT } from "jose/jwt/sign";
import { jwtVerify } from "jose/jwt/verify";

export const CMS_SESSION_COOKIE = "cms_admin_sess";

/** Clave debe ser suficientemente larga (ver `.env.example`). Sin clave válida no hay sesión admin. */
function getAdminSecretKey(): Uint8Array | null {
  const s = process.env.CMS_ADMIN_SECRET;
  if (!s || s.length < 32) return null;
  return new TextEncoder().encode(s);
}

export async function signAdminSession(): Promise<string> {
  const key = getAdminSecretKey();
  if (!key) {
    throw new Error("CMS_ADMIN_SECRET is missing or shorter than 32 characters.");
  }
  return new SignJWT({ sub: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function verifyAdminSession(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const key = getAdminSecretKey();
  if (!key) return false;
  try {
    await jwtVerify(token, key, { algorithms: ["HS256"] });
    return true;
  } catch {
    return false;
  }
}
