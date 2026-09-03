"use client";
import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getDiagnosticDefinition } from "@/data/diagnostics";
import { runDiagnostic } from "@/data/diagnostics/engine";
import { diagnosticResults } from "@/data/diagnostics/results";
import {
  clearDiagnosticAnswers,
  readDiagnosticAnswers,
  toEngineAnswers,
} from "@/lib/diagnostics/session";

function ResultadoContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const resultId = searchParams.get("result");
  const vehicleId = searchParams.get("vehicle");
  const problemId = searchParams.get("problem") || "no-arranca";
  const answers = readDiagnosticAnswers(problemId, vehicleId);
  const diagnostic = getDiagnosticDefinition(problemId, vehicleId ?? undefined);
  const state = diagnostic
    ? runDiagnostic(
        diagnostic.questions,
        diagnostic.startQuestionId,
        toEngineAnswers(answers),
      )
    : null;

  const result =
    state?.status === "result" && state.resultId === resultId
      ? diagnosticResults.find((item) => item.id === resultId)
      : undefined;

  if (!result) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <section className="mx-auto max-w-3xl px-6 py-16">
          <h1 className="text-3xl font-bold">
            No pudimos confirmar este resultado
          </h1>

          <p className="mt-4 leading-7 text-slate-400">
            Inicia el diagnóstico de nuevo para reunir las respuestas necesarias.
          </p>

          <button
            onClick={() => router.push("/diagnostico")}
            className="mt-8 rounded-xl bg-white px-6 py-3 font-semibold text-slate-950"
          >
            Volver al diagnóstico
          </button>
        </section>
      </main>
    );
  }

  const resolvedAnswers = state?.status === "result" ? state.answers : {};

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-16">

        <p className="inline-flex rounded-full bg-sky-400/10 px-3 py-1 text-sm font-bold text-sky-300">
          Resultado preliminar
        </p>

        <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
          {result.title}
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-400">
          {result.summary}
        </p>
        {result.safetyNotice && (
          <aside
            role="alert"
            className="mt-8 rounded-2xl border border-amber-300/30 bg-amber-300/10 p-5 text-amber-50"
          >
            <p className="font-bold">⚠ Atención de seguridad</p>
            <p className="mt-2 leading-7 text-amber-100/80">
              {result.safetyNotice}
            </p>
          </aside>
        )}
<div className="mt-10">
  <h2 className="text-xl font-semibold">
    Comprobaciones realizadas
  </h2>

  <div className="mt-4 space-y-3">
    {Object.keys(resolvedAnswers).map((questionId) => {
        const data = answers[questionId];
        if (!data) return null;

        return (
          <div
            key={questionId}
            className="rounded-xl border border-slate-800 bg-slate-900 p-4"
          >
            <p className="text-sm text-slate-400">
              {data.question}
            </p>

            <p className="mt-2 font-semibold">
              ✓ {data.answer}
            </p>
          </div>
        );
      })}
  </div>
</div>



{result.nextAction && (
  <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
    <p className="text-sm font-medium text-slate-400">
      Siguiente comprobación
    </p>

    <h2 className="mt-2 text-2xl font-bold">
      {result.nextAction.title}
    </h2>

    <p className="mt-3 leading-7 text-slate-400">
      {result.nextAction.description}
    </p>

    <button
      type="button"
      onClick={() => {
        if (!result.nextAction) return;
        router.push(`${result.nextAction.href}&vehicle=${vehicleId}`);
      }}
      className="mt-6 w-full rounded-xl bg-white px-5 py-4 font-semibold text-slate-950 transition hover:bg-slate-200"
    >
      Ver información
    </button>
  </div>
)}

        <div className="mt-10">
          <h2 className="text-xl font-semibold">
            Posibles causas
          </h2>

          <ul className="mt-4 space-y-3">
            {result.possibleCauses.map((cause) => (
              <li
                key={cause}
                className="rounded-xl border border-slate-800 bg-slate-900 p-4"
              >
                {cause}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold">
            Qué revisar
          </h2>

          <ul className="mt-4 space-y-3">
            {result.recommendedChecks.map((check) => (
              <li
                key={check}
                className="rounded-xl border border-slate-800 bg-slate-900 p-4"
              >
                {check}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">
            Dificultad
          </p>

          <p className="mt-1 font-semibold">
            {result.difficulty}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            clearDiagnosticAnswers();
            router.push(`/diagnostico?vehicle=${vehicleId}`);
          }}
          className="mt-10 w-full rounded-xl bg-white px-6 py-4 font-semibold text-slate-950"
        >
          Nuevo diagnóstico
        </button>

      </section>
    </main>
  );
}
export default function ResultadoPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-950 text-white">
          <section className="mx-auto max-w-3xl px-6 py-16">
            <p className="text-slate-400">
              Generando resultado...
            </p>
          </section>
        </main>
      }
    >
      <ResultadoContent />
    </Suspense>
  );
}
