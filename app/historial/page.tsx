"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { diagnosticProblems } from "@/data/diagnostics/problems";
import { diagnosticResults } from "@/data/diagnostics/results";
import { localizeDiagnosticResult } from "@/data/diagnostics/localization";
import { getVehicleById, getVehicleDisplayName } from "@/data/vehicles";
import { diagnosticProblemTranslations } from "@/lib/i18n/translations";
import {
  getDiagnosticHistoryServerSnapshot,
  readDiagnosticHistory,
  subscribeToDiagnosticHistory,
} from "@/lib/diagnostics/history";
import { syncDiagnosticHistory } from "@/lib/diagnostics/cloud-history";
import BackButton from "@/components/BackButton";
import { useLanguage } from "@/components/LanguageProvider";

function formatHistoryDate(createdAt: string, locale: "es" | "en") {
  const date = new Date(createdAt);
  return Number.isNaN(date.getTime())
    ? (locale === "en" ? "Date unavailable" : "Fecha no disponible")
    : new Intl.DateTimeFormat(locale === "en" ? "en-US" : "es-MX", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
}

export default function HistorialPage() {
  const { locale } = useLanguage();
  const isEnglish = locale === "en";
  const copy = isEnglish
    ? { device: "On this device", title: "Diagnostic history", intro: "We keep recent results on this device. When you activate an account, you can sync them securely.", syncing: "Syncing…", sync: "Sync with my account", signIn: "Sign in to sync your history.", syncError: "We could not sync yet. Check that the database is ready.", emptyTitle: "No saved diagnostics yet", emptyIntro: "Once you finish a diagnosis, it will appear here so you can review it later.", diagnose: "Diagnose my car", diagnosis: "Diagnosis", unavailableResult: "Result no longer available", unavailableVehicle: "Vehicle no longer available", viewVehicle: "View my vehicle" }
    : { device: "En este dispositivo", title: "Historial de diagnósticos", intro: "Conservamos los últimos resultados en este dispositivo. Cuando actives una cuenta, podrás sincronizarlos de forma segura.", syncing: "Sincronizando…", sync: "Sincronizar con mi cuenta", signIn: "Inicia sesión para sincronizar tu historial.", syncError: "No pudimos sincronizar todavía. Verifica que la base de datos esté preparada.", emptyTitle: "Aún no hay diagnósticos guardados", emptyIntro: "Al terminar un diagnóstico, aparecerá aquí para que puedas recordarlo más tarde.", diagnose: "Diagnosticar mi auto", diagnosis: "Diagnóstico", unavailableResult: "Resultado ya no disponible", unavailableVehicle: "Vehículo ya no disponible", viewVehicle: "Ver mi auto" };
  const history = useSyncExternalStore(
    subscribeToDiagnosticHistory,
    readDiagnosticHistory,
    getDiagnosticHistoryServerSnapshot,
  );
  const [syncMessage, setSyncMessage] = useState<string>();
  const [isSyncing, setIsSyncing] = useState(false);

  async function handleSync() {
    setIsSyncing(true);
    setSyncMessage(undefined);

    try {
      const result = await syncDiagnosticHistory(history);
      setSyncMessage(
        result.status === "synced"
          ? isEnglish
            ? `${result.count} ${result.count === 1 ? "diagnostic synchronized." : "diagnostics synchronized."}`
            : `${result.count} diagnóstico${result.count === 1 ? "" : "s"} sincronizado${result.count === 1 ? "" : "s"}.`
          : copy.signIn,
      );
    } catch {
      setSyncMessage(copy.syncError);
    } finally {
      setIsSyncing(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-16">
        <BackButton />
        <p className="text-sm font-medium text-slate-400">{copy.device}</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight">{copy.title}</h1>
        <p className="mt-4 max-w-2xl leading-7 text-slate-400">
          {copy.intro}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleSync}
            disabled={isSyncing}
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold transition hover:bg-slate-800 disabled:cursor-wait disabled:opacity-60"
          >
            {isSyncing ? copy.syncing : copy.sync}
          </button>
          {syncMessage && <p className="text-sm text-slate-400">{syncMessage}</p>}
        </div>

        {history.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center">
            <div className="text-4xl" aria-hidden="true">🧾</div>
            <h2 className="mt-4 text-2xl font-bold">{copy.emptyTitle}</h2>
            <p className="mt-3 leading-7 text-slate-400">
              {copy.emptyIntro}
            </p>
            <Link
              href="/seleccionar-vehiculo"
              className="mt-6 inline-flex rounded-xl bg-sky-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-sky-300"
            >
              {copy.diagnose}
            </Link>
          </div>
        ) : (
          <div className="mt-10 space-y-4">
            {history.map((entry) => {
              const vehicle = getVehicleById(entry.vehicleId);
              const problem = diagnosticProblems.find((item) => item.id === entry.problemId);
              const result = diagnosticResults.find((item) => item.id === entry.resultId);

              return (
                <article key={entry.id} className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-medium text-sky-300">
                        {diagnosticProblemTranslations[locale][entry.problemId]?.title ?? problem?.title ?? copy.diagnosis}
                      </p>
                      <h2 className="mt-2 text-xl font-bold">
                        {result ? localizeDiagnosticResult(result, locale).title : copy.unavailableResult}
                      </h2>
                      <p className="mt-2 text-sm text-slate-400">
                        {vehicle ? getVehicleDisplayName(vehicle) : copy.unavailableVehicle} · {formatHistoryDate(entry.createdAt, locale)}
                      </p>
                    </div>
                    {vehicle && (
                      <Link
                        href={`/vehiculo?id=${vehicle.id}`}
                        className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                      >
                        {copy.viewVehicle}
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
