"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fuses } from "@/data/technical/fuses";
import { vehicles } from "@/data/vehicles";
import DiagnosticGuide from "@/components/DiagnosticGuide";

function FusiblesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const vehicleId = searchParams.get("vehicle");

  const vehicle = vehicles.find(
    (item) => item.id === vehicleId
  );

  const vehicleFuses = fuses.filter(
    (fuse) => fuse.vehicleId === vehicleId
  );

  const fromDiagnostic =
    searchParams.get("from") === "diagnostico";

  const [showGuide, setShowGuide] = useState(false);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-4xl px-6 py-10 sm:py-16">

        {/* Navegación */}
        <button
          type="button"
          onClick={() => {
            if (fromDiagnostic) {
              router.back();
            } else {
              router.push("/diagnostico");
            }
          }}
          className="text-sm text-slate-400 transition hover:text-white"
        >
          ← Volver
        </button>

        {/* Encabezado */}
        <div className="mt-8">
          <p className="text-sm font-medium text-slate-400">
            Información técnica
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Fusibles
          </h1>

          <p className="mt-4 text-slate-400">
            {vehicle
              ? `${vehicle.brand} ${vehicle.model} ${vehicle.generation} · ${vehicle.year} · ${vehicle.engine} L · ${vehicle.fuel} · ${vehicle.transmission}`
              : "Vehículo no encontrado"}
          </p>
        </div>

        {/* Aviso */}
        <div className="mt-8 rounded-2xl border border-amber-900/50 bg-amber-950/30 p-5">
          <p className="text-sm leading-6 text-amber-200">
            La información mostrada corresponde a la
            configuración seleccionada. Antes de sustituir un
            fusible, verifica siempre que el amperaje coincida
            con el especificado para tu vehículo.
          </p>
        </div>

        {/* Fusibles */}
        <div className="mt-8 space-y-6">
          {vehicleFuses.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
              <div className="text-4xl">🔧</div>

              <h2 className="mt-4 text-2xl font-bold">
                Información aún no disponible
              </h2>

              <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-400">
                Todavía estamos incorporando la información de fusibles
                para este vehículo. Estamos ampliando progresivamente
                nuestra base de datos técnica.
              </p>

              <button
                type="button"
                onClick={() => router.back()}
                className="mt-6 rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Volver
              </button>
            </div>
          ) : (
            vehicleFuses.map((fuse) => (
              <article
                key={`${fuse.location}-${fuse.number}`}
                className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-slate-400">
                        Fusible
                      </p>

                      <h2 className="mt-1 text-3xl font-bold">
                        #{fuse.number}
                      </h2>
                    </div>

                    <div className="rounded-2xl bg-slate-800 px-6 py-4 text-center">
                      <p className="text-xs text-slate-400">
                        Amperaje
                      </p>

                      <p className="mt-1 text-2xl font-bold">
                        {fuse.amperage}A
                      </p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <p className="text-sm text-slate-400">
                      Ubicación
                    </p>

                    <p className="mt-1 text-lg font-medium capitalize">
                      Caja de fusibles — {fuse.location}
                    </p>
                  </div>

                  <div className="mt-6">
                    <p className="text-sm text-slate-400">
                      Circuito
                    </p>

                    <p className="mt-1 leading-7 text-slate-300">
                      {fuse.description}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-800 p-6 sm:p-8">
                  <h3 className="text-xl font-semibold">
                    ¿Qué quieres hacer?
                  </h3>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      className="rounded-xl border border-slate-700 px-5 py-4 text-left transition hover:bg-slate-800"
                    >
                      <span className="block font-semibold">
                        📍 Ver ubicación
                      </span>

                      <span className="mt-1 block text-sm text-slate-400">
                        Identifica dónde se encuentra.
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowGuide(!showGuide)}
                      className="rounded-xl border border-slate-700 px-5 py-4 text-left transition hover:bg-slate-800"
                    >
                      <span className="block font-semibold">
                        🔎 Cómo comprobarlo
                      </span>

                      <span className="mt-1 block text-sm text-slate-400">
                        Aprende a revisar el fusible.
                      </span>
                    </button>
                  </div>

                  {showGuide && (
                    <DiagnosticGuide
                      title="Comprobar el fusible"
                      steps={[
                        {
                          title: "Identifica el fusible",
                          description:
                            "Localiza el fusible que quieres comprobar antes de retirarlo.",
                        },
                        {
                          title: "Retira el fusible",
                          description:
                            "Retíralo cuidadosamente utilizando el extractor correspondiente si tu vehículo lo incluye.",
                        },
                        {
                          title: "Inspecciona el fusible",
                          description:
                            "Observa el elemento metálico del fusible y comprueba si está interrumpido o presenta señales visibles de daño.",
                        },
                        {
                          title: "Compara el resultado",
                          description:
                            "Si tienes dudas sobre su estado, no sustituyas el fusible por uno de diferente amperaje. Podemos continuar con otra comprobación.",
                        },
                      ]}
                    />
                  )}
                </div>
              </article>
            ))
          )}
        </div>

      </section>
    </main>
  );
}

export default function FusiblesPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-950 text-white">
          <section className="mx-auto max-w-4xl px-6 py-16">
            <p className="text-slate-400">
              Cargando información de fusibles...
            </p>
          </section>
        </main>
      }
    >
      <FusiblesContent />
    </Suspense>
  );
}