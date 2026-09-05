"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fuses } from "@/data/technical/fuses";
import { getVehicleById, getVehicleSummary } from "@/data/vehicles";
import DiagnosticGuide from "@/components/DiagnosticGuide";
import InteractiveFusePanel from "@/components/InteractiveFusePanel";
import { useLanguage } from "@/components/LanguageProvider";

function FusiblesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const vehicleId = searchParams.get("vehicle");

  const vehicle = getVehicleById(vehicleId);
  const { locale } = useLanguage();
  const isEnglish = locale === "en";
  const copy = isEnglish
    ? { back: "Back", technical: "Technical information", title: "Fuses", notFound: "Vehicle not found", warning: "We only publish technical data verified for the selected configuration. Before replacing a fuse, always confirm the amperage specified in the vehicle documentation.", pendingTitle: "Information is being verified", unavailableTitle: "Information not available yet", pendingDescription: "We have initial references, but they have not yet been verified with an appropriate technical source. We will not show them as definitive data.", unavailableDescription: "We are still adding fuse information for this vehicle. Our technical database is being expanded progressively.", fuse: "Fuse", amperage: "Amperage", location: "Location", fuseBox: "Fuse box", circuit: "Circuit", action: "What would you like to do?", locationAction: "View location", locationPending: "Coming soon with verified information.", check: "How to check it", checkDescription: "Learn how to inspect the fuse.", guideTitle: "Check the fuse", steps: [{ title: "Identify the fuse", description: "Locate the fuse you want to inspect before removing it." }, { title: "Remove the fuse", description: "Remove it carefully using the appropriate extractor if your vehicle includes one." }, { title: "Inspect the fuse", description: "Look at the fuse’s metal element and check whether it is broken or visibly damaged." }, { title: "Compare the result", description: "If you are unsure of its condition, do not replace it with a fuse of a different amperage. You can continue with another check." }] }
    : { back: "Volver", technical: "Información técnica", title: "Fusibles", notFound: "Vehículo no encontrado", warning: "Solo publicamos datos técnicos que hayan sido verificados para la configuración seleccionada. Antes de sustituir un fusible, confirma siempre el amperaje indicado en la documentación del vehículo.", pendingTitle: "Información en proceso de verificación", unavailableTitle: "Información aún no disponible", pendingDescription: "Tenemos referencias iniciales, pero aún no se han verificado con una fuente técnica adecuada. No las mostraremos como datos definitivos.", unavailableDescription: "Todavía estamos incorporando información de fusibles para este vehículo. Estamos ampliando progresivamente nuestra base de datos técnica.", fuse: "Fusible", amperage: "Amperaje", location: "Ubicación", fuseBox: "Caja de fusibles", circuit: "Circuito", action: "¿Qué quieres hacer?", locationAction: "Ver ubicación", locationPending: "Próximamente con información verificada.", check: "Cómo comprobarlo", checkDescription: "Aprende a revisar el fusible.", guideTitle: "Comprobar el fusible", steps: [{ title: "Identifica el fusible", description: "Localiza el fusible que quieres comprobar antes de retirarlo." }, { title: "Retira el fusible", description: "Retíralo cuidadosamente utilizando el extractor correspondiente si tu vehículo lo incluye." }, { title: "Inspecciona el fusible", description: "Observa el elemento metálico del fusible y comprueba si está interrumpido o presenta señales visibles de daño." }, { title: "Compara el resultado", description: "Si tienes dudas sobre su estado, no sustituyas el fusible por uno de diferente amperaje. Podemos continuar con otra comprobación." }] };

  const vehicleFuses = fuses.filter(
    (fuse) =>
      fuse.vehicleId === vehicleId && fuse.verification.status === "verified",
  );
  const hasPendingFuses = fuses.some(
    (fuse) =>
      fuse.vehicleId === vehicleId && fuse.verification.status === "pending",
  );
  const positionedFuses = vehicleFuses.filter(
    (fuse): fuse is typeof fuse & { position: NonNullable<typeof fuse.position> } => Boolean(fuse.position),
  );
  const hasInteractiveDiagram = positionedFuses.length === vehicleFuses.length && positionedFuses.length > 0;

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
          ← {copy.back}
        </button>

        {/* Encabezado */}
        <div className="mt-8">
          <p className="text-sm font-medium text-slate-400">
            {copy.technical}
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            {copy.title}
          </h1>

          <p className="mt-4 text-slate-400">
            {vehicle
              ? `${vehicle.brand} ${vehicle.model} ${getVehicleSummary(vehicle)}`
              : copy.notFound}
          </p>
        </div>

        {/* Aviso */}
        <div className="mt-8 rounded-2xl border border-amber-900/50 bg-amber-950/30 p-5">
          <p className="text-sm leading-6 text-amber-200">
            {copy.warning}
          </p>
        </div>

        {/* Fusibles */}
        <div className="mt-8 space-y-6">
          {vehicleFuses.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
              <div className="text-4xl">🔧</div>

              <h2 className="mt-4 text-2xl font-bold">
                {hasPendingFuses
                  ? copy.pendingTitle
                  : copy.unavailableTitle}
              </h2>

              <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-400">
                {hasPendingFuses
                  ? copy.pendingDescription
                  : copy.unavailableDescription}
              </p>

              <button
                type="button"
                onClick={() => router.back()}
                className="mt-6 rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                {copy.back}
              </button>
            </div>
          ) : hasInteractiveDiagram ? (
            <InteractiveFusePanel fuses={positionedFuses} />
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
                        {copy.fuse}
                      </p>

                      <h2 className="mt-1 text-3xl font-bold">
                        #{fuse.number}
                      </h2>
                    </div>

                    <div className="rounded-2xl bg-slate-800 px-6 py-4 text-center">
                      <p className="text-xs text-slate-400">
                        {copy.amperage}
                      </p>

                      <p className="mt-1 text-2xl font-bold">
                        {fuse.amperage}A
                      </p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <p className="text-sm text-slate-400">
                      {copy.location}
                    </p>

                    <p className="mt-1 text-lg font-medium capitalize">
                      {copy.fuseBox} — {fuse.location}
                    </p>
                  </div>

                  <div className="mt-6">
                    <p className="text-sm text-slate-400">
                      {copy.circuit}
                    </p>

                    <p className="mt-1 leading-7 text-slate-300">
                      {fuse.description}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-800 p-6 sm:p-8">
                  <h3 className="text-xl font-semibold">
                    {copy.action}
                  </h3>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      disabled
                      title={isEnglish ? "The detailed location has not been published yet." : "La ubicación detallada aún no está publicada."}
                      className="cursor-not-allowed rounded-xl border border-slate-800 px-5 py-4 text-left text-slate-500"
                    >
                      <span className="block font-semibold">
                        📍 {copy.locationAction}
                      </span>

                      <span className="mt-1 block text-sm text-slate-400">
                        {copy.locationPending}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowGuide(!showGuide)}
                      className="rounded-xl border border-slate-700 px-5 py-4 text-left transition hover:bg-slate-800"
                    >
                      <span className="block font-semibold">
                        🔎 {copy.check}
                      </span>

                      <span className="mt-1 block text-sm text-slate-400">
                        {copy.checkDescription}
                      </span>
                    </button>
                  </div>

                  {showGuide && (
                    <DiagnosticGuide
                      title={copy.guideTitle}
                      steps={copy.steps}
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
