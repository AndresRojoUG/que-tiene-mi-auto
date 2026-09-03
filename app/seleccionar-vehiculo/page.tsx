"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  findVehicle,
  getVehicleBrands,
  getVehicleEngines,
  getVehicleGenerations,
  getVehicleModels,
  getVehicleYears,
} from "@/data/vehicles";
import { saveSelectedVehicleId } from "@/lib/vehicles/session";

export default function SeleccionarVehiculoPage() {
  const router = useRouter();

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [generation, setGeneration] = useState("");
  const [year, setYear] = useState("");
  const [engine, setEngine] = useState("");

  const brands = useMemo(() => {
    return getVehicleBrands();
  }, []);

  const models = useMemo(() => {
    return getVehicleModels(brand);
  }, [brand]);

  const generations = useMemo(() => {
    return getVehicleGenerations(brand, model);
  }, [brand, model]);

  const years = useMemo(() => {
    return getVehicleYears(brand, model, generation);
  }, [brand, model, generation]);

  const engines = useMemo(() => {
    return getVehicleEngines(brand, model, generation, Number(year));
  }, [brand, model, generation, year]);

  const selectedVehicle = findVehicle({
    brand,
    model,
    generation,
    year: Number(year),
    engine,
  });

  const handleBrandChange = (value: string) => {
    setBrand(value);
    setModel("");
    setGeneration("");
    setYear("");
    setEngine("");
  };

  const handleModelChange = (value: string) => {
    setModel(value);
    setGeneration("");
    setYear("");
    setEngine("");
  };

  const handleGenerationChange = (value: string) => {
    setGeneration(value);
    setYear("");
    setEngine("");
  };

  const handleYearChange = (value: string) => {
    setYear(value);
    setEngine("");
  };

  const handleContinue = () => {
    if (!selectedVehicle) return;

    saveSelectedVehicleId(selectedVehicle.id);
    router.push(`/vehiculo?id=${selectedVehicle.id}`);
  };

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
            Configura tu vehículo
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            ¿Qué vehículo tienes?
          </h1>

          <p className="mt-4 leading-7 text-slate-400">
            Selecciona los datos de tu vehículo para mostrar
            información y diagnósticos específicos.
          </p>
        </div>

        <div className="mt-10 space-y-6">

          {/* Marca */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              1. Marca
            </label>

            <select
              value={brand}
              onChange={(event) =>
                handleBrandChange(event.target.value)
              }
              className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-4 text-white outline-none focus:border-white"
            >
              <option value="">
                Selecciona una marca
              </option>

              {brands.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Modelo */}
          {brand && (
            <div>
              <label className="mb-2 block text-sm font-medium">
                2. Modelo
              </label>

              <select
                value={model}
                onChange={(event) =>
                  handleModelChange(event.target.value)
                }
                className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-4 text-white outline-none focus:border-white"
              >
                <option value="">
                  Selecciona un modelo
                </option>

                {models.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Generación */}
          {model && (
            <div>
              <label className="mb-2 block text-sm font-medium">
                3. Generación
              </label>

              <select
                value={generation}
                onChange={(event) =>
                  handleGenerationChange(event.target.value)
                }
                className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-4 text-white outline-none focus:border-white"
              >
                <option value="">
                  Selecciona una generación
                </option>

                {generations.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Año */}
          {generation && (
            <div>
              <label className="mb-2 block text-sm font-medium">
                4. Año
              </label>

              <select
                value={year}
                onChange={(event) =>
                  handleYearChange(event.target.value)
                }
                className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-4 text-white outline-none focus:border-white"
              >
                <option value="">
                  Selecciona un año
                </option>

                {years.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Motor */}
          {year && (
            <div>
              <label className="mb-2 block text-sm font-medium">
                5. Motor
              </label>

              <select
                value={engine}
                onChange={(event) =>
                  setEngine(event.target.value)
                }
                className="w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-4 text-white outline-none focus:border-white"
              >
                <option value="">
                  Selecciona un motor
                </option>

                {engines.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          )}

        </div>

        {/* Confirmación */}
        {selectedVehicle && (
          <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-6">

            <p className="text-sm text-slate-400">
              Vehículo seleccionado
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              {selectedVehicle.brand} {selectedVehicle.model}
            </h2>

            <p className="mt-2 text-slate-400">
              {selectedVehicle.generation} ·{" "}
              {selectedVehicle.year} ·{" "}
              {selectedVehicle.engine}
            </p>

            <button
              type="button"
              onClick={handleContinue}
              className="mt-6 w-full rounded-xl bg-white px-5 py-4 font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Continuar con este vehículo →
            </button>

          </div>
        )}

      </section>
    </main>
  );
}
