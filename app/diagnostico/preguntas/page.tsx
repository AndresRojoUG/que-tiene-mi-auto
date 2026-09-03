"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getDiagnosticDefinition } from "@/data/diagnostics";
import { runDiagnostic } from "@/data/diagnostics/engine";
import {
  clearDiagnosticAnswers,
  readDiagnosticAnswers,
  toEngineAnswers,
  writeDiagnosticAnswers,
  type StoredDiagnosticAnswers,
} from "@/lib/diagnostics/session";

function PreguntasContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const vehicleId = searchParams.get("vehicle");
  const problemId = searchParams.get("problem") || "no-arranca";
  const requestedQuestionId = searchParams.get("question");
  const diagnostic = getDiagnosticDefinition(problemId);
  const storedAnswers = readDiagnosticAnswers(problemId);
  const answers = toEngineAnswers(storedAnswers);
  const state = diagnostic
    ? runDiagnostic(diagnostic.questions, diagnostic.startQuestionId, answers)
    : null;

  const currentQuestionMatchesUrl =
    state?.status !== "question" ||
    !requestedQuestionId ||
    requestedQuestionId === state.question.id;

  useEffect(() => {
    if (state?.status === "result") {
      router.replace(
        `/diagnostico/resultado?vehicle=${vehicleId}&problem=${problemId}&result=${state.resultId}`,
      );
    }

    if (state?.status === "question" && !currentQuestionMatchesUrl) {
      router.replace(
        `/diagnostico/preguntas?vehicle=${vehicleId}&problem=${problemId}&question=${state.question.id}`,
      );
    }
  }, [currentQuestionMatchesUrl, problemId, router, state, vehicleId]);

  if (!diagnostic) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <section className="mx-auto max-w-3xl px-6 py-16">
          <h1 className="text-3xl font-bold">Diagnóstico no disponible</h1>
          <p className="mt-4 leading-7 text-slate-400">
            Todavía no tenemos un diagnóstico guiado para este problema.
          </p>
          <button
            type="button"
            onClick={() => router.push(`/diagnostico?vehicle=${vehicleId}`)}
            className="mt-8 rounded-xl bg-white px-6 py-3 font-semibold text-slate-950"
          >
            Volver
          </button>
        </section>
      </main>
    );
  }

  if (!state) return null;

  if (state.status === "result") {
    return null;
  }

  if (state.status === "error") {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <section className="mx-auto max-w-3xl px-6 py-16">
          <p className="text-sm font-medium text-slate-400">Diagnóstico</p>
          <h1 className="mt-3 text-3xl font-bold">No pudimos continuar</h1>
          <p className="mt-4 leading-7 text-slate-400">{state.message}</p>
          <button
            type="button"
            onClick={() => {
              clearDiagnosticAnswers();
              router.push(`/diagnostico?vehicle=${vehicleId}`);
            }}
            className="mt-8 rounded-xl bg-white px-6 py-3 font-semibold text-slate-950"
          >
            Reiniciar diagnóstico
          </button>
        </section>
      </main>
    );
  }

  const question = state.question;
  const handleOption = (optionId: string) => {
    const selectedOption = question.options.find(
      (option) => option.id === optionId,
    );

    if (!selectedOption) return;

    const nextStoredAnswers: StoredDiagnosticAnswers = {
      ...storedAnswers,
      [question.id]: {
        question: question.question,
        answer: selectedOption.label,
        optionId,
      },
    };

    writeDiagnosticAnswers(problemId, nextStoredAnswers);

    const nextState = runDiagnostic(
      diagnostic.questions,
      diagnostic.startQuestionId,
      toEngineAnswers(nextStoredAnswers),
    );

    if (nextState.status === "result") {
      router.push(
        `/diagnostico/resultado?vehicle=${vehicleId}&problem=${problemId}&result=${nextState.resultId}`,
      );
      return;
    }

    if (nextState.status === "question") {
      router.push(
        `/diagnostico/preguntas?vehicle=${vehicleId}&problem=${problemId}&question=${nextState.question.id}`,
      );
    }
  };

  if (!currentQuestionMatchesUrl) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-10">
          <p className="text-sm font-medium text-slate-400">Diagnóstico guiado</p>
          <p className="mt-2 text-xs uppercase tracking-wide text-slate-500">
            {problemId}
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            {question.question}
          </h1>

          {question.explanation && (
            <p className="mt-4 leading-7 text-slate-400">
              {question.explanation}
            </p>
          )}
        </div>

        <div className="space-y-4">
          {question.options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleOption(option.id)}
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:border-slate-500 hover:bg-slate-800"
            >
              <span className="text-lg font-semibold">{option.label}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => router.back()}
          className="mt-10 text-sm text-slate-500 hover:text-white"
        >
          ← Volver
        </button>
      </section>
    </main>
  );
}

export default function PreguntasPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-950 text-white">
          <section className="mx-auto max-w-3xl px-6 py-16">
            <p className="text-slate-400">Cargando diagnóstico...</p>
          </section>
        </main>
      }
    >
      <PreguntasContent />
    </Suspense>
  );
}
