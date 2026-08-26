"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { vehicles } from "@/data/vehicles";

export default function DiagnosticoPage() {
   
  const router = useRouter();
  const [vehicleId, setVehicleId] = useState("");

  const selectedVehicle = vehicles.find(
    (vehicle) => vehicle.id === vehicleId
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-sm font-medium text-slate-400">
          Paso 1
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          Selecciona tu vehículo
        </h1>

        <p className="mt-4 text-slate-400">
          Selecciona el vehículo que quieres diagnosticar.
        </p>

        <div className="mt-10">
          <label
            htmlFor="vehicle"
            className="mb-3 block text-sm font-medium"
          >
            Vehículo
          </label>

          <select
            id="vehicle"
            value={vehicleId}
            onChange={(event) => setVehicleId(event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-4 text-white outline-none focus:border-white"
          >
            <option value="">
              Selecciona un vehículo
            </option>

            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.brand} {vehicle.model}{" "}
                {vehicle.generation} — {vehicle.year} —{" "}
                {vehicle.engine} L
              </option>
            ))}
          </select>
        </div>

        {selectedVehicle && (
          <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">
              Vehículo seleccionado
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              {selectedVehicle.brand} {selectedVehicle.model}
            </h2>

            <p className="mt-2 text-slate-400">
              {selectedVehicle.generation} ·{" "}
              {selectedVehicle.year} ·{" "}
              {selectedVehicle.engine} L
            </p>

            <button
  type="button"
  onClick={() => {
    router.push(`/diagnostico/problema?vehicle=${vehicleId}`);
  }}
  className="mt-6 w-full rounded-xl bg-white px-6 py-4 font-semibold text-slate-950 transition hover:bg-slate-200"
>
  Continuar
</button>
          </div>
        )}
      </section>
    </main>
  );
}