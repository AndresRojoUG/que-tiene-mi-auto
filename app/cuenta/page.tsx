"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Mode = "sign-in" | "sign-up";

function CuentaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<Mode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountEmail, setAccountEmail] = useState<string>();
  const [notice, setNotice] = useState<string>();
  const [error, setError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      try {
        const { data } = await createClient().auth.getUser();
        if (mounted) setAccountEmail(data.user?.email);
      } catch {
        if (mounted) setError("No pudimos conectar con el servicio de cuentas.");
      }
    }

    void loadUser();
    return () => {
      mounted = false;
    };
  }, []);

  const callbackNotice =
    searchParams.get("confirmed") === "1"
      ? "Tu correo fue confirmado. Tu cuenta ya está lista."
      : undefined;
  const callbackError = searchParams.get("error")
    ? "No pudimos confirmar el correo. Solicita un nuevo registro e inténtalo otra vez."
    : undefined;
  const displayedNotice = notice ?? callbackNotice;
  const displayedError = error ?? callbackError;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);
    setNotice(undefined);

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    setIsSubmitting(true);
    try {
      const supabase = createClient();

      if (mode === "sign-in") {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError || !data.user) {
          setError("No pudimos iniciar sesión. Revisa tu correo y contraseña.");
          return;
        }
        setAccountEmail(data.user.email);
        setPassword("");
        setNotice("Sesión iniciada correctamente.");
        router.refresh();
        return;
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (signUpError) {
        setError("No pudimos crear la cuenta. Revisa los datos e inténtalo otra vez.");
        return;
      }

      setPassword("");
      if (data.session) {
        setAccountEmail(data.user?.email);
        setNotice("Cuenta creada y sesión iniciada.");
        router.refresh();
      } else {
        setNotice("Revisa tu correo para confirmar la cuenta antes de iniciar sesión.");
      }
    } catch {
      setError("No pudimos conectar con el servicio de cuentas. Inténtalo más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSignOut() {
    setError(undefined);
    try {
      const { error: signOutError } = await createClient().auth.signOut();
      if (signOutError) throw signOutError;
      setAccountEmail(undefined);
      setNotice("Sesión cerrada.");
      router.refresh();
    } catch {
      setError("No pudimos cerrar la sesión. Inténtalo de nuevo.");
    }
  }

  if (accountEmail) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <section className="mx-auto max-w-xl px-5 py-10 sm:px-8 sm:py-16">
          <p className="text-sm font-medium text-sky-300">Tu cuenta</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight">Sesión activa</h1>
          <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Correo de la cuenta</p>
            <p className="mt-2 break-all text-lg font-semibold">{accountEmail}</p>
            {displayedNotice && <p className="mt-4 text-sm text-emerald-300">{displayedNotice}</p>}
            {displayedError && <p role="alert" className="mt-4 text-sm text-rose-300">{displayedError}</p>}
            <button
              type="button"
              onClick={handleSignOut}
              className="mt-6 rounded-xl border border-slate-700 px-5 py-3 font-semibold transition hover:bg-slate-800"
            >
              Cerrar sesión
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-xl px-5 py-10 sm:px-8 sm:py-16">
        <p className="text-sm font-medium text-sky-300">Cuenta</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight">
          {mode === "sign-in" ? "Inicia sesión" : "Crea tu cuenta"}
        </h1>
        <p className="mt-4 leading-7 text-slate-400">
          Guarda tu historial y participa en la comunidad cuando estas funciones estén activas.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
          <label className="block">
            <span className="text-sm font-semibold">Correo electrónico</span>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-sky-400"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Contraseña</span>
            <input
              type="password"
              autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
              minLength={8}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-sky-400"
            />
            <span className="mt-2 block text-xs text-slate-500">Mínimo 8 caracteres.</span>
          </label>

          {displayedNotice && <p className="rounded-xl bg-emerald-400/10 p-3 text-sm text-emerald-200">{displayedNotice}</p>}
          {displayedError && <p role="alert" className="rounded-xl bg-rose-400/10 p-3 text-sm text-rose-200">{displayedError}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-sky-400 px-5 py-3.5 font-bold text-slate-950 transition hover:bg-sky-300 disabled:cursor-wait disabled:opacity-60"
          >
            {isSubmitting ? "Procesando..." : mode === "sign-in" ? "Iniciar sesión" : "Crear cuenta"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "sign-in" ? "sign-up" : "sign-in");
            setError(undefined);
            setNotice(undefined);
          }}
          className="mt-6 text-sm font-semibold text-sky-300 hover:text-sky-200"
        >
          {mode === "sign-in" ? "¿No tienes cuenta? Crear cuenta" : "¿Ya tienes cuenta? Iniciar sesión"}
        </button>
      </section>
    </main>
  );
}

export default function CuentaPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-950 text-white">
          <section className="mx-auto max-w-xl px-5 py-10 sm:px-8 sm:py-16">
            <p className="text-slate-400">Cargando cuenta...</p>
          </section>
        </main>
      }
    >
      <CuentaContent />
    </Suspense>
  );
}
