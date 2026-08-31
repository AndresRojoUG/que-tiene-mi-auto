"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { diagnosticProblems } from "@/data/diagnostics/problems";



function ProblemaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const vehicleId = searchParams.get("vehicle");

  useEffect(() => {
    sessionStorage.removeItem("diagnosticAnswers");
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-sm font-medium text-slate-400">
          Paso 2
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          ¿Qué problema tiene tu auto?
        </h1>

        <p className="mt-4 text-slate-400">
          Selecciona el problema que más se parezca a lo que estás
          experimentando.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {diagnosticProblems.map((problem) => (
           <button
  key={problem.id}
  type="button"
  disabled={problem.id !== "no-arranca"}
  onClick={() => {
    if (problem.id === "no-arranca") {
      router.push(
        `/diagnostico/preguntas?vehicle=${vehicleId}&question=motor-gira`
      );
    }
  }}
  className={`rounded-2xl border p-5 text-left transition ${
    problem.id === "no-arranca"
      ? "border-slate-800 bg-slate-900 hover:border-slate-500 hover:bg-slate-800"
      : "cursor-not-allowed border-slate-900 bg-slate-950 opacity-60"
  }`}
>
              <div className="text-3xl">{problem.icon}</div>

              <h2 className="mt-4 text-xl font-semibold">
                {problem.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {problem.description}
              </p>
              {problem.id !== "no-arranca" && (
  <p className="mt-3 text-xs font-medium text-slate-500">
    Próximamente
  </p>
)}
            </button>
          ))}
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