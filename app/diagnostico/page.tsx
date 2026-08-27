"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { vehicles } from "@/data/vehicles";
import { diagnosticProblems } from "@/data/diagnostics/problems";

function DiagnosticoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const vehicleId = searchParams.get("vehicle");

  const selectedVehicle = vehicles.find(
    (vehicle) => vehicle.id === vehicleId
  );

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
            ¿Qué problema tiene tu auto?
          </h1>

          <p className="mt-4 text-slate-400">
            Vamos a ayudarte a encontrar las posibles causas
            paso a paso.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-sm text-slate-400">
            Vehículo
          </p>

          <h2 className="mt-2 text-2xl font-semibold">
            {selectedVehicle.brand} {selectedVehicle.model}
          </h2>

          <p className="mt-2 text-slate-400">
            {selectedVehicle.generation} ·{" "}
            {selectedVehicle.year} ·{" "}
            {selectedVehicle.engine} L ·{" "}
            {selectedVehicle.fuel} ·{" "}
            {selectedVehicle.transmission}
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {diagnosticProblems.map((problem) => (
            <button
              key={problem.id}
              type="button"
              onClick={() => {
                if (problem.id === "no-arranca") {
                  sessionStorage.removeItem("diagnosticAnswers");

                  router.push(
                    `/diagnostico/problema?vehicle=${vehicleId}&problem=no-arranca`
                  );
                }
              }}
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-6 text-left transition hover:border-slate-500 hover:bg-slate-800"
            >
              <p className="text-lg font-semibold">
                {problem.icon} {problem.title}
              </p>

              <p className="mt-2 text-sm text-slate-400">
                {problem.description}
              </p>
            </button>
          ))}
        </div>

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