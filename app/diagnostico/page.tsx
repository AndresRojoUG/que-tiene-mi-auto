"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getVehicleById,
  getVehicleDisplayName,
  getVehicleSummary,
} from "@/data/vehicles";
import { clearDiagnosticAnswers } from "@/lib/diagnostics/session";

function DiagnosticoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const vehicleId = searchParams.get("vehicle");

  const selectedVehicle = getVehicleById(vehicleId);

  if (!selectedVehicle) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <section className="mx-auto max-w-3xl px-6 py-16">
          <p className="text-sm text-slate-400">
            Diagnóstico
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            Selecciona un vehículo
          </h1>

          <p className="mt-4 text-slate-400">
            Necesitamos saber qué vehículo quieres diagnosticar.
          </p>

          <button
            type="button"
            onClick={() => router.push("/seleccionar-vehiculo")}
            className="mt-8 w-full rounded-xl bg-white px-6 py-4 font-semibold text-slate-950"
          >
            Seleccionar vehículo
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-3xl px-6 py-10 sm:py-16">

        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-slate-400 transition hover:text-white"
        >
          ← Volver
        </button>

        <div className="mt-8">
          <p className="text-sm font-medium text-slate-400">
            Diagnóstico
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            Vamos a revisar tu auto
          </h1>

          <p className="mt-4 text-lg leading-7 text-slate-400">
            Te haremos algunas preguntas sobre el problema que
            presenta tu vehículo para ayudarte a encontrar las
            posibles causas.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">
            Vehículo seleccionado
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            {getVehicleDisplayName(selectedVehicle)}
          </h2>

          <p className="mt-2 text-slate-400">
            {getVehicleSummary(selectedVehicle)}
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm font-medium text-slate-400">
            ¿Cómo funciona?
          </p>

          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-400">
            <p>
              <span className="font-semibold text-white">
                1.
              </span>{" "}
              Seleccionarás el problema que presenta tu vehículo.
            </p>

            <p>
              <span className="font-semibold text-white">
                2.
              </span>{" "}
              Te haremos preguntas sencillas sobre los síntomas.
            </p>

            <p>
              <span className="font-semibold text-white">
                3.
              </span>{" "}
              Analizaremos tus respuestas para mostrarte posibles
              causas y qué puedes comprobar.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            clearDiagnosticAnswers();

            router.push(
              `/diagnostico/problema?vehicle=${vehicleId}`
            );
          }}
          className="mt-8 w-full rounded-2xl bg-white px-6 py-4 text-lg font-semibold text-slate-950 transition hover:bg-slate-200"
        >
          Comenzar diagnóstico
        </button>

      </section>
    </main>
  );
}

export default function DiagnosticoPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-950 text-white">
          <section className="mx-auto max-w-3xl px-6 py-16">
            <p className="text-slate-400">
              Cargando diagnóstico...
            </p>
          </section>
        </main>
      }
    >
      <DiagnosticoContent />
    </Suspense>
  );
}
