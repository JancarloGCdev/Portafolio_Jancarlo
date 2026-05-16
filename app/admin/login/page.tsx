"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params.get("redirect") || "/admin";

  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : `Error HTTP ${res.status}`);
        return;
      }
      const target = redirectTo.startsWith("/admin") ? redirectTo : "/admin";
      router.replace(target);
      router.refresh();
    } catch {
      setError("No se pudo conectar. Comprueba la red.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-6 py-16">
      <h1 className="mb-6 text-xl font-semibold tracking-tight text-cyan-200/95">Administración CMS</h1>
      <p className="mb-6 text-sm text-zinc-400">
        Sesión protegida con contraseña (bcrypt) y cookie JWT firmada (HttpOnly, SameSite=Lax).
      </p>
      <form onSubmit={onSubmit} className="flex flex-col gap-4 rounded-lg border border-zinc-700/70 bg-zinc-900/40 p-6">
        <label className="flex flex-col gap-1 text-xs uppercase tracking-wide text-zinc-500">
          Contraseña
          <input
            type="password"
            autoComplete="current-password"
            className="rounded border border-zinc-600 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-accent-cyan/80"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </label>
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        <button
          type="submit"
          disabled={busy || !password}
          className="rounded bg-accent-cyan/90 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-accent-cyan disabled:opacity-40"
        >
          {busy ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-dvh items-center justify-center text-sm text-zinc-500">
          Cargando inicio de sesión…
        </main>
      }
    >
      <LoginInner />
    </Suspense>
  );
}
