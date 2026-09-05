"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  readSelectedVehicleId,
  SELECTED_VEHICLE_CHANGED_EVENT,
} from "@/lib/vehicles/session";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/components/LanguageProvider";
import { createClient } from "@/lib/supabase/client";

export default function AppHeader() {
  const [vehicleId, setVehicleId] = useState<string>();
  const [isAdmin, setIsAdmin] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const syncSelectedVehicle = () => setVehicleId(readSelectedVehicleId());

    syncSelectedVehicle();
    window.addEventListener(SELECTED_VEHICLE_CHANGED_EVENT, syncSelectedVehicle);
    window.addEventListener("storage", syncSelectedVehicle);

    return () => {
      window.removeEventListener(
        SELECTED_VEHICLE_CHANGED_EVENT,
        syncSelectedVehicle,
      );
      window.removeEventListener("storage", syncSelectedVehicle);
    };
  }, []);

  useEffect(() => {
    async function loadAdminRole() {
      try {
        const { data } = await createClient().auth.getUser();
        if (!data.user) return;
        const { data: admin } = await createClient().rpc("is_admin");
        setIsAdmin(Boolean(admin));
      } catch {
        setIsAdmin(false);
      }
    }
    void loadAdminRole();
  }, []);

  const myVehicleHref = vehicleId
    ? `/vehiculo?id=${vehicleId}`
    : "/seleccionar-vehiculo";
  const diagnosticHref = vehicleId
    ? `/diagnostico?vehicle=${vehicleId}`
    : "/seleccionar-vehiculo";

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl font-black tracking-tight text-white"
          aria-label={t("nav.home")}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-400 text-sm text-slate-950">
            ⌁
          </span>
          <span className="hidden text-sm sm:inline sm:text-base">¿Qué tiene mi auto?</span>
        </Link>

        <nav aria-label="Navegación principal" className="flex shrink-0 items-center gap-1">
          <LanguageSelector />
          <details className="relative sm:hidden">
            <summary
              aria-label={t("nav.menu")}
              className="flex min-h-10 min-w-10 cursor-pointer list-none items-center justify-center rounded-lg border border-white/10 bg-slate-900 text-slate-200 transition hover:bg-white/5"
            >
              <span className="text-lg leading-none" aria-hidden="true">☰</span>
            </summary>
            <div className="absolute right-0 top-[calc(100%+0.5rem)] z-40 w-52 rounded-xl border border-white/10 bg-slate-900 p-2 shadow-2xl shadow-black/40">
              <Link href="/historial" className="block rounded-lg px-3 py-3 text-sm font-semibold text-slate-200 hover:bg-white/5">
                {t("nav.history")}
              </Link>
              <Link href="/sugerencias" className="block rounded-lg px-3 py-3 text-sm font-semibold text-slate-200 hover:bg-white/5">
                {t("nav.feedback")}
              </Link>
              <Link href="/cuenta" className="block rounded-lg px-3 py-3 text-sm font-semibold text-slate-200 hover:bg-white/5">
                {t("nav.account")}
              </Link>
              <Link href={myVehicleHref} className="block rounded-lg px-3 py-3 text-sm font-semibold text-slate-200 hover:bg-white/5">
                {t("nav.myVehicle")}
              </Link>
              {isAdmin && <Link href="/admin" className="block rounded-lg px-3 py-3 text-sm font-semibold text-slate-200 hover:bg-white/5">Administración</Link>}
              <Link href={diagnosticHref} className="mt-1 block rounded-lg bg-sky-400 px-3 py-3 text-sm font-bold text-slate-950 hover:bg-sky-300">
                {t("nav.diagnose")}
              </Link>
            </div>
          </details>
          <Link
            href="/historial"
            className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white sm:inline-flex"
          >
            {t("nav.history")}
          </Link>
          <Link
            href="/sugerencias"
            className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white lg:inline-flex"
          >
            {t("nav.feedback")}
          </Link>
          <Link
            href="/cuenta"
            className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white sm:inline-flex"
          >
            {t("nav.account")}
          </Link>
          <Link
            href={myVehicleHref}
            className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white sm:inline-flex"
          >
            {t("nav.myVehicle")}
          </Link>
          {isAdmin && <Link href="/admin" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white">Administración</Link>}
          <Link
            href={diagnosticHref}
            className="hidden rounded-lg bg-sky-400 px-3 py-2 text-sm font-bold text-slate-950 transition hover:bg-sky-300 sm:inline-flex"
          >
            {t("nav.diagnose")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
