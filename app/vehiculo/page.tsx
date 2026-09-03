
"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getVehicleById,
  getVehicleDisplayName,
  getVehicleSummary,
} from "@/data/vehicles";
import { saveSelectedVehicleId } from "@/lib/vehicles/session";

function VehiculoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const vehicleId = searchParams.get("id");

  const vehicle = getVehicleById(vehicleId);

  useEffect(() => {
    if (vehicle) saveSelectedVehicleId(vehicle.id);
  }, [vehicle]);

  if (!vehicle) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <section className="mx-auto max-w-4xl px-6 py-16">
          <h1 className="text-3xl font-bold">
            Vehículo no encontrado
          </h1>

          <p className="mt-4 text-slate-400">
            No pudimos encontrar el vehículo seleccionado.
          </p>

          <button
            type="button"
            onClick={() =>
              router.push("/seleccionar-vehiculo")
            }
            className="mt-8 rounded-xl bg-white px-5 py-3 font-semibold text-slate-950"
          >
            Seleccionar vehículo
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-5xl px-6 py-10 sm:py-16">

        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-slate-400 transition hover:text-white"
        >
          ← Volver
        </button>

        {/* Vehículo */}
        <div className="mt-8">
          <p className="text-sm font-medium text-slate-400">
            Mi vehículo
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            {getVehicleDisplayName(vehicle)}
          </h1>

          <p className="mt-3 text-slate-400">
            {getVehicleSummary(vehicle)}
          </p>
        </div>

        {/* Opciones */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">

          <button
            type="button"
            onClick={() =>
              router.push(
                `/diagnostico?vehicle=${vehicle.id}`
              )
            }
            className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-left transition hover:-translate-y-1 hover:bg-slate-800"
          >
            <span className="text-3xl">
              🔍
            </span>

            <h2 className="mt-4 text-xl font-bold">
              Diagnóstico
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Descubre qué puede estar causando el problema
              de tu vehículo.
            </p>
          </button>

          <button
            type="button"
            onClick={() =>
              router.push(
                `/informacion/fusibles?vehicle=${vehicle.id}`
              )
            }
            className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-left transition hover:-translate-y-1 hover:bg-slate-800"
          >
            <span className="text-3xl">
              ⚡
            </span>

            <h2 className="mt-4 text-xl font-bold">
              Fusibles
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Consulta fusibles, ubicaciones y procedimientos
              de comprobación.
            </p>
          </button>

          <div className="relative rounded-3xl border border-slate-800 bg-slate-900 p-6 text-left opacity-75">
            <span className="absolute right-5 top-5 rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-400">
              Próximamente
            </span>

            <span className="text-3xl">
              🔌
            </span>

            <h2 className="mt-4 text-xl font-bold">
              Relevadores
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Consulta información de relevadores y circuitos.
            </p>
          </div>

          <div className="relative rounded-3xl border border-slate-800 bg-slate-900 p-6 text-left opacity-75">
            <span className="absolute right-5 top-5 rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-400">
              Próximamente
            </span>

            <span className="text-3xl">
              📟
            </span>

            <h2 className="mt-4 text-xl font-bold">
              OBD
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Consulta códigos y aprende a interpretar problemas de diagnóstico.
            </p>
          </div>

          <div className="relative rounded-3xl border border-slate-800 bg-slate-900 p-6 text-left opacity-75">
            <span className="absolute right-5 top-5 rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-400">
              Próximamente
            </span>

            <span className="text-3xl">
              🛠️
            </span>

            <h2 className="mt-4 text-xl font-bold">
              Mantenimiento
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Servicios, revisiones y mantenimiento recomendado.
            </p>
          </div>

          <div className="relative rounded-3xl border border-slate-800 bg-slate-900 p-6 text-left opacity-75">
            <span className="absolute right-5 top-5 rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-400">
              Próximamente
            </span>

            <span className="text-3xl">
              📚
            </span>

            <h2 className="mt-4 text-xl font-bold">
              Información técnica
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Consulta información técnica relacionada con este vehículo.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}

export default function VehiculoPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-950 text-white">
          <section className="mx-auto max-w-5xl px-6 py-10 sm:py-16">
            <p className="text-sm text-slate-400">
              Cargando vehículo...
            </p>
          </section>
        </main>
      }
    >
      <VehiculoContent />
    </Suspense>
  );
}
