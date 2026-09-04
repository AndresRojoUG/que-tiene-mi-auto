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
              disabled={!isAvailable}
              onClick={() => {
                if (isAvailable) {
                  router.push(
                    `/diagnostico/preguntas?vehicle=${vehicleId}&problem=${problem.id}`,
                  );
                }
              }}
              className={`rounded-2xl border p-5 text-left transition ${
                isAvailable
      ? "border-slate-800 bg-slate-900 hover:border-slate-500 hover:bg-slate-800"
      : "cursor-not-allowed border-slate-900 bg-slate-950 opacity-60"
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
    Próximamente
  </p>
)}
            </button>
          );
        })}
        </div>

        <p className="mt-8 text-xs text-slate-600">
          Vehículo seleccionado: {vehicleId}
        </p>
      </section>
    </main>
  );
}

export default function ProblemaPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-950 text-white">
          <section className="mx-auto max-w-4xl px-6 py-16">
            <p className="text-slate-400">
              Cargando diagnóstico...
            </p>
          </section>
        </main>
      }
    >
      <ProblemaContent />
    </Suspense>
  );
}
