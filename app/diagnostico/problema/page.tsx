"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getDiagnosticDefinition } from "@/data/diagnostics";
import { diagnosticProblems } from "@/data/diagnostics/problems";
import { clearDiagnosticAnswers } from "@/lib/diagnostics/session";
import { useLanguage } from "@/components/LanguageProvider";
import { diagnosticProblemTranslations } from "@/lib/i18n/translations";



function ProblemaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const vehicleId = searchParams.get("vehicle");
  const { locale, t } = useLanguage();
  const copy = locale === "en"
    ? {
        unavailable: "Guided flow not available yet",
        reference: "View technical references",
        selectedVehicle: "Selected vehicle",
      }
    : {
        unavailable: "El flujo guiado aún no está disponible",
        reference: "Ver referencias técnicas",
        selectedVehicle: "Vehículo seleccionado",
      };

  useEffect(() => {
    clearDiagnosticAnswers();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-sm font-medium text-slate-400">
          {t("diagnostic.problemStep")}
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          {t("diagnostic.problemQuestion")}
        </h1>

        <p className="mt-4 text-slate-400">
          {t("diagnostic.problemDescription")}
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {diagnosticProblems.map((problem) => {
          const isAvailable = Boolean(
            getDiagnosticDefinition(problem.id, vehicleId ?? undefined),
          );

          const localizedProblem = diagnosticProblemTranslations[locale][problem.id];
          const title = localizedProblem?.title ?? problem.title;
          const description = localizedProblem?.description ?? problem.description;

          return (
           <button
              key={problem.id}
              type="button"
              onClick={() => {
                if (isAvailable) {
                  router.push(
                    `/diagnostico/preguntas?vehicle=${vehicleId}&problem=${problem.id}`,
                  );
                } else {
                  router.push(`/vehiculo/informacion-tecnica?vehicle=${vehicleId}`);
                }
              }}
              className={`rounded-2xl border p-5 text-left transition ${
                isAvailable
      ? "border-slate-800 bg-slate-900 hover:border-slate-500 hover:bg-slate-800"
      : "border-amber-400/20 bg-amber-400/5 hover:border-amber-300/50 hover:bg-amber-400/10"
  }`}
>
              <div className="text-3xl">{problem.icon}</div>

              <h2 className="mt-4 text-xl font-semibold">
                {title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {description}
              </p>
              {!isAvailable && (
  <p className="mt-3 text-xs font-medium text-slate-500">
    {copy.unavailable} · {copy.reference} →
  </p>
)}
            </button>
          );
        })}
        </div>

        <p className="mt-8 text-xs text-slate-600">
          {copy.selectedVehicle}: {vehicleId}
        </p>
      </section>
    </main>
  );
}

function ProblemLoading() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-slate-400">{t("diagnostic.loading")}</p>
      </section>
    </main>
  );
}

export default function ProblemaPage() {
  return (
    <Suspense
      fallback={<ProblemLoading />}
    >
      <ProblemaContent />
    </Suspense>
  );
}
