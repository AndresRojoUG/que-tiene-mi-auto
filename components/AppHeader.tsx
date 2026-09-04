"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  readSelectedVehicleId,
  SELECTED_VEHICLE_CHANGED_EVENT,
} from "@/lib/vehicles/session";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/components/LanguageProvider";

export default function AppHeader() {
  const [vehicleId, setVehicleId] = useState<string>();
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
          <span className="text-sm sm:text-base">¿Qué tiene mi auto?</span>
        </Link>

        <nav aria-label="Navegación principal" className="flex items-center gap-1">
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
            className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            {t("nav.account")}
          </Link>
          <Link
            href={myVehicleHref}
            className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            {t("nav.myVehicle")}
          </Link>
          <Link
            href={diagnosticHref}
            className="hidden rounded-lg bg-sky-400 px-3 py-2 text-sm font-bold text-slate-950 transition hover:bg-sky-300 sm:inline-flex"
          >
            {t("nav.diagnose")}
          </Link>
          <LanguageSelector />
        </nav>
      </div>
    </header>
  );
}
