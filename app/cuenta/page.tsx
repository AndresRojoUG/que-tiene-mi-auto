"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useLanguage } from "@/components/LanguageProvider";
import BackButton from "@/components/BackButton";

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
  const [isAdmin, setIsAdmin] = useState(false);
  const { locale } = useLanguage();
  const isEnglish = locale === "en";
  const copy = isEnglish
    ? { account: "Account", active: "Active session", email: "Account email", signOut: "Sign out", signIn: "Sign in", create: "Create your account", intro: "Save your history and participate in the community when these features are enabled.", password: "Password", minimum: "Minimum 8 characters.", processing: "Processing…", switchToCreate: "Don’t have an account? Create one", switchToSignIn: "Already have an account? Sign in", admin: "Administration", serviceError: "We could not connect to the account service.", confirmed: "Your email was confirmed. Your account is ready.", expired: "For security, we signed you out after 30 minutes of inactivity.", confirmationError: "We could not confirm your email. Request a new registration and try again.", shortPassword: "Your password must have at least 8 characters.", signInError: "We could not sign you in. Check your email and password.", signInSuccess: "Signed in successfully.", signUpError: "We could not create the account. Check the details and try again.", signUpSuccess: "Account created and signed in.", confirmEmail: "Check your email to confirm your account before signing in.", signedOut: "Signed out.", signOutError: "We could not sign you out. Try again." }
    : { account: "Cuenta", active: "Sesión activa", email: "Correo de la cuenta", signOut: "Cerrar sesión", signIn: "Iniciar sesión", create: "Crea tu cuenta", intro: "Guarda tu historial y participa en la comunidad cuando estas funciones estén activas.", password: "Contraseña", minimum: "Mínimo 8 caracteres.", processing: "Procesando…", switchToCreate: "¿No tienes cuenta? Crear cuenta", switchToSignIn: "¿Ya tienes cuenta? Iniciar sesión", admin: "Administración", serviceError: "No pudimos conectar con el servicio de cuentas.", confirmed: "Tu correo fue confirmado. Tu cuenta ya está lista.", expired: "Por seguridad, cerramos tu sesión después de 30 minutos sin actividad.", confirmationError: "No pudimos confirmar el correo. Solicita un nuevo registro e inténtalo otra vez.", shortPassword: "La contraseña debe tener al menos 8 caracteres.", signInError: "No pudimos iniciar sesión. Revisa tu correo y contraseña.", signInSuccess: "Sesión iniciada correctamente.", signUpError: "No pudimos crear la cuenta. Revisa los datos e inténtalo otra vez.", signUpSuccess: "Cuenta creada y sesión iniciada.", confirmEmail: "Revisa tu correo para confirmar la cuenta antes de iniciar sesión.", signedOut: "Sesión cerrada.", signOutError: "No pudimos cerrar la sesión. Inténtalo de nuevo." };

  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      try {
        const { data } = await createClient().auth.getUser();
        if (mounted) setAccountEmail(data.user?.email);
      } catch {
        if (mounted) setError(copy.serviceError);
      }
    }

    void loadUser();
    return () => {
      mounted = false;
    };
  // The loaded account is independent of the display language.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function loadAdminRole() {
      if (!accountEmail) { setIsAdmin(false); return; }
      const { data } = await createClient().rpc("is_admin");
      setIsAdmin(Boolean(data));
    }
    void loadAdminRole();
  }, [accountEmail]);

  const callbackNotice = searchParams.get("confirmed") === "1"
    ? copy.confirmed
    : searchParams.get("expired") === "1"
      ? copy.expired
      : undefined;
  const callbackError = searchParams.get("error")
    ? copy.confirmationError
    : undefined;
  const displayedNotice = notice ?? callbackNotice;
  const displayedError = error ?? callbackError;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);
    setNotice(undefined);

    if (password.length < 8) {
      setError(copy.shortPassword);
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
          setError(copy.signInError);
          return;
        }
        setAccountEmail(data.user.email);
        setPassword("");
        setNotice(copy.signInSuccess);
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
        setError(copy.signUpError);
        return;
      }

      setPassword("");
      if (data.session) {
        setAccountEmail(data.user?.email);
        setNotice(copy.signUpSuccess);
        router.refresh();
      } else {
        setNotice(copy.confirmEmail);
      }
    } catch {
      setError(copy.serviceError);
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
      setIsAdmin(false);
      setNotice(copy.signedOut);
      router.refresh();
    } catch {
      setError(copy.signOutError);
    }
  }

  if (accountEmail) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <section className="mx-auto max-w-xl px-5 py-10 sm:px-8 sm:py-16">
          <BackButton />
          <p className="text-sm font-medium text-sky-300">{copy.account}</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight">{copy.active}</h1>
          <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">{copy.email}</p>
            <p className="mt-2 break-all text-lg font-semibold">{accountEmail}</p>
            {displayedNotice && <p className="mt-4 text-sm text-emerald-300">{displayedNotice}</p>}
            {displayedError && <p role="alert" className="mt-4 text-sm text-rose-300">{displayedError}</p>}
            <button
              type="button"
              onClick={handleSignOut}
              className="mt-6 rounded-xl border border-slate-700 px-5 py-3 font-semibold transition hover:bg-slate-800"
            >
              {copy.signOut}
            </button>
            {isAdmin && <button type="button" onClick={() => router.push("/admin")} className="mt-3 block rounded-xl bg-sky-400 px-5 py-3 font-bold text-slate-950">{copy.admin}</button>}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-xl px-5 py-10 sm:px-8 sm:py-16">
        <BackButton />
        <p className="text-sm font-medium text-sky-300">{copy.account}</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight">
          {mode === "sign-in" ? copy.signIn : copy.create}
        </h1>
        <p className="mt-4 leading-7 text-slate-400">
          {copy.intro}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
          <label className="block">
            <span className="text-sm font-semibold">Email</span>
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
            <span className="text-sm font-semibold">{copy.password}</span>
            <input
              type="password"
              autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
              minLength={8}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-sky-400"
            />
            <span className="mt-2 block text-xs text-slate-500">{copy.minimum}</span>
          </label>

          {displayedNotice && <p className="rounded-xl bg-emerald-400/10 p-3 text-sm text-emerald-200">{displayedNotice}</p>}
          {displayedError && <p role="alert" className="rounded-xl bg-rose-400/10 p-3 text-sm text-rose-200">{displayedError}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-sky-400 px-5 py-3.5 font-bold text-slate-950 transition hover:bg-sky-300 disabled:cursor-wait disabled:opacity-60"
          >
            {isSubmitting ? copy.processing : mode === "sign-in" ? copy.signIn : copy.create}
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
          {mode === "sign-in" ? copy.switchToCreate : copy.switchToSignIn}
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
