"use client";
import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getDiagnosticDefinition } from "@/data/diagnostics";
import { runDiagnostic } from "@/data/diagnostics/engine";
import { diagnosticResults } from "@/data/diagnostics/results";
import { localizeDiagnosticResult } from "@/data/diagnostics/localization";
import { useLanguage } from "@/components/LanguageProvider";
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
  const { locale } = useLanguage();
  const isEnglish = locale === "en";
  const copy = isEnglish
    ? { unavailableTitle: "We could not confirm this result", unavailableDescription: "Start the diagnosis again to collect the answers needed.", backToDiagnosis: "Back to diagnosis", preliminary: "Preliminary result", safety: "Safety notice", completed: "Completed checks", next: "Next check", view: "View guidance", causes: "Possible causes", review: "What to review", difficulty: "Difficulty", newDiagnosis: "New diagnosis", loading: "Generating result…" }
    : { unavailableTitle: "No pudimos confirmar este resultado", unavailableDescription: "Inicia el diagnóstico de nuevo para reunir las respuestas necesarias.", backToDiagnosis: "Volver al diagnóstico", preliminary: "Resultado preliminar", safety: "Atención de seguridad", completed: "Comprobaciones realizadas", next: "Siguiente comprobación", view: "Ver información", causes: "Posibles causas", review: "Qué revisar", difficulty: "Dificultad", newDiagnosis: "Nuevo diagnóstico", loading: "Generando resultado…" };
  const answers = readDiagnosticAnswers(problemId, vehicleId);
  const diagnostic = getDiagnosticDefinition(problemId, vehicleId ?? undefined);
  const state = diagnostic
    ? runDiagnostic(
        diagnostic.questions,
        diagnostic.startQuestionId,
        toEngineAnswers(answers),
      )
    : null;

  const rawResult =
    state?.status === "result" && state.resultId === resultId
      ? diagnosticResults.find((item) => item.id === resultId)
      : undefined;
  const result = rawResult ? localizeDiagnosticResult(rawResult, locale) : undefined;

  if (!result) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <section className="mx-auto max-w-3xl px-6 py-16">
          <h1 className="text-3xl font-bold">
            {copy.unavailableTitle}
          </h1>

          <p className="mt-4 leading-7 text-slate-400">
            {copy.unavailableDescription}
          </p>

          <button
            onClick={() => router.push("/diagnostico")}
            className="mt-8 rounded-xl bg-white px-6 py-3 font-semibold text-slate-950"
          >
            {copy.backToDiagnosis}
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
          {copy.preliminary}
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
            <p className="font-bold">⚠ {copy.safety}</p>
            <p className="mt-2 leading-7 text-amber-100/80">
              {result.safetyNotice}
            </p>
          </aside>
        )}
<div className="mt-10">
  <h2 className="text-xl font-semibold">
    {copy.completed}
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
      {copy.next}
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
      {copy.view}
    </button>
  </div>
)}

        <div className="mt-10">
          <h2 className="text-xl font-semibold">
            {copy.causes}
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
            {copy.review}
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
            {copy.difficulty}
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
          {copy.newDiagnosis}
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
              {"Generando resultado..."}
            </p>
          </section>
        </main>
      }
    >
      <ResultadoContent />
    </Suspense>
  );
}
