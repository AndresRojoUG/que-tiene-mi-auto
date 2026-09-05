"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { createClient } from "@/lib/supabase/client";

type AccessState = "checking" | "granted" | "denied";

export default function AdminAccessGate({ children }: { children: ReactNode }) {
  const [access, setAccess] = useState<AccessState>("checking");
  const { locale } = useLanguage();
  const es = locale === "es";

  useEffect(() => {
    const supabase = createClient();

    async function checkAccess() {
      const { data: userResult } = await supabase.auth.getUser();
      if (!userResult.user) {
        setAccess("denied");
        return;
      }

      const { data: isAdmin, error } = await supabase.rpc("is_admin");
      setAccess(!error && isAdmin ? "granted" : "denied");
    }

    void checkAccess();
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      void checkAccess();
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  if (access === "granted") return <>{children}</>;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-xl px-5 py-16 sm:px-8">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-7 text-center">
          <div className="text-3xl" aria-hidden="true">🔐</div>
          <h1 className="mt-4 text-2xl font-black">
            {access === "checking" ? (es ? "Verificando acceso…" : "Checking access…") : (es ? "Acceso restringido" : "Restricted access")}
          </h1>
          <p className="mt-3 leading-7 text-slate-400">
            {access === "checking"
              ? (es ? "Estamos comprobando los permisos de esta cuenta." : "We are checking this account’s permissions.")
              : (es ? "Esta sección solo está disponible para cuentas autorizadas de administración." : "This section is available only to authorized administrator accounts.")}
          </p>
          {access === "denied" && (
            <Link href="/cuenta" className="mt-6 inline-flex rounded-xl bg-sky-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-sky-300">
              {es ? "Ir a mi cuenta" : "Go to my account"}
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
