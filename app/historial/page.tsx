"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { diagnosticProblems } from "@/data/diagnostics/problems";
import { diagnosticResults } from "@/data/diagnostics/results";
import { getVehicleById, getVehicleDisplayName } from "@/data/vehicles";
import {
  getDiagnosticHistoryServerSnapshot,
  readDiagnosticHistory,
  subscribeToDiagnosticHistory,
} from "@/lib/diagnostics/history";
import { syncDiagnosticHistory } from "@/lib/diagnostics/cloud-history";

function formatHistoryDate(createdAt: string) {
  const date = new Date(createdAt);
  return Number.isNaN(date.getTime())
    ? "Fecha no disponible"
    : new Intl.DateTimeFormat("es-MX", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
}

export default function HistorialPage() {
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
          ? `${result.count} diagnóstico${result.count === 1 ? "" : "s"} sincronizado${result.count === 1 ? "" : "s"}.`
          : "Inicia sesión para sincronizar tu historial.",
      );
    } catch {
      setSyncMessage("No pudimos sincronizar todavía. Verifica que la base de datos esté preparada.");
    } finally {
      setIsSyncing(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-16">
        <p className="text-sm font-medium text-slate-400">En este dispositivo</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight">Historial de diagnósticos</h1>
        <p className="mt-4 max-w-2xl leading-7 text-slate-400">
          Conservamos los últimos resultados en este dispositivo. Cuando actives una cuenta, podrás sincronizarlos de forma segura.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleSync}
            disabled={isSyncing}
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold transition hover:bg-slate-800 disabled:cursor-wait disabled:opacity-60"
          >
            {isSyncing ? "Sincronizando..." : "Sincronizar con mi cuenta"}
          </button>
          {syncMessage && <p className="text-sm text-slate-400">{syncMessage}</p>}
        </div>

        {history.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center">
            <div className="text-4xl" aria-hidden="true">🧾</div>
            <h2 className="mt-4 text-2xl font-bold">Aún no hay diagnósticos guardados</h2>
            <p className="mt-3 leading-7 text-slate-400">
              Al terminar un diagnóstico, aparecerá aquí para que puedas recordarlo más tarde.
            </p>
            <Link
              href="/seleccionar-vehiculo"
              className="mt-6 inline-flex rounded-xl bg-sky-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-sky-300"
            >
              Diagnosticar mi auto
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
                        {problem?.title ?? "Diagnóstico"}
                      </p>
                      <h2 className="mt-2 text-xl font-bold">
                        {result?.title ?? "Resultado ya no disponible"}
                      </h2>
                      <p className="mt-2 text-sm text-slate-400">
                        {vehicle ? getVehicleDisplayName(vehicle) : "Vehículo ya no disponible"} · {formatHistoryDate(entry.createdAt)}
                      </p>
                    </div>
                    {vehicle && (
                      <Link
                        href={`/vehiculo?id=${vehicle.id}`}
                        className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                      >
                        Ver mi auto
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
