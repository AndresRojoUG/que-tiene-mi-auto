
"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getVehicleById,
  getVehicleDisplayName,
  getVehicleSummary,
} from "@/data/vehicles";
import { saveSelectedVehicleId } from "@/lib/vehicles/session";
import { useLanguage } from "@/components/LanguageProvider";

function VehiculoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const vehicleId = searchParams.get("id");
  const { t } = useLanguage();

  const vehicle = getVehicleById(vehicleId);

  useEffect(() => {
    if (vehicle) saveSelectedVehicleId(vehicle.id);
  }, [vehicle]);

  if (!vehicle) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <section className="mx-auto max-w-4xl px-6 py-16">
          <h1 className="text-3xl font-bold">
            {t("myVehicle.notFound")}
          </h1>

          <p className="mt-4 text-slate-400">
            {t("myVehicle.notFoundDescription")}
          </p>

          <button
            type="button"
            onClick={() =>
              router.push("/seleccionar-vehiculo")
            }
            className="mt-8 rounded-xl bg-white px-5 py-3 font-semibold text-slate-950"
          >
            {t("diagnostic.selectVehicle")}
          </button>

          <button type="button" onClick={() => router.push(`/vehiculo/comunidad?vehicle=${vehicle.id}`)} className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-left transition hover:-translate-y-1 hover:bg-slate-800">
            <span className="text-3xl">💬</span>
            <h2 className="mt-4 text-xl font-bold">Comunidad</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">Comparte un problema y conoce experiencias de usuarios con este mismo vehículo.</p>
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
          ← {t("common.back")}
        </button>

        {/* Vehículo */}
        <div className="mt-8">
          <p className="text-sm font-medium text-slate-400">
            {t("myVehicle.title")}
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
              {t("myVehicle.diagnosisTitle")}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              {t("myVehicle.diagnosisDescription")}
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
              {t("myVehicle.fusesTitle")}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              {t("myVehicle.fusesDescription")}
            </p>
          </button>

          <div className="relative rounded-3xl border border-slate-800 bg-slate-900 p-6 text-left opacity-75">
            <span className="absolute right-5 top-5 rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-400">
              {t("myVehicle.comingSoon")}
            </span>

            <span className="text-3xl">
              🔌
            </span>

            <h2 className="mt-4 text-xl font-bold">
              {t("myVehicle.relaysTitle")}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              {t("myVehicle.relaysDescription")}
            </p>
          </div>

          <div className="relative rounded-3xl border border-slate-800 bg-slate-900 p-6 text-left opacity-75">
            <span className="absolute right-5 top-5 rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-400">
              {t("myVehicle.comingSoon")}
            </span>

            <span className="text-3xl">
              📟
            </span>

            <h2 className="mt-4 text-xl font-bold">
              OBD
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              {t("myVehicle.obdDescription")}
            </p>
          </div>

          <div className="relative rounded-3xl border border-slate-800 bg-slate-900 p-6 text-left opacity-75">
            <span className="absolute right-5 top-5 rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-400">
              {t("myVehicle.comingSoon")}
            </span>

            <span className="text-3xl">
              🛠️
            </span>

            <h2 className="mt-4 text-xl font-bold">
              {t("myVehicle.maintenanceTitle")}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              {t("myVehicle.maintenanceDescription")}
            </p>
          </div>

          <div className="relative rounded-3xl border border-slate-800 bg-slate-900 p-6 text-left opacity-75">
            <span className="absolute right-5 top-5 rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-400">
              {t("myVehicle.comingSoon")}
            </span>

            <span className="text-3xl">
              📚
            </span>

            <h2 className="mt-4 text-xl font-bold">
              {t("myVehicle.technicalTitle")}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              {t("myVehicle.technicalDescription")}
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
