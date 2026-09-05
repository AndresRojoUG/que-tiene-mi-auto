"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getDiagnosticDefinition } from "@/data/diagnostics";
import { runDiagnostic } from "@/data/diagnostics/engine";
import { diagnosticProblems } from "@/data/diagnostics/problems";
import { diagnosticResults } from "@/data/diagnostics/results";
import { localizeQuestions } from "@/data/diagnostics/localization";
import { useLanguage } from "@/components/LanguageProvider";
import { diagnosticProblemTranslations } from "@/lib/i18n/translations";
import { saveDiagnosticHistory } from "@/lib/diagnostics/history";
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
  const { locale } = useLanguage();
  const copy = locale === "en"
    ? {
        unavailableTitle: "Diagnosis unavailable",
        unavailableDescription: "A guided flow is not available for this symptom. You can review the vehicle's technical references or send us the symptom so we can prioritize it.",
        references: "View technical references",
        feedback: "Request this diagnostic",
        back: "Back",
        tag: "Guided diagnosis",
        begin: "Let's identify the symptom.",
        answerSingular: "answer recorded.",
        answerPlural: "answers recorded.",
        errorTitle: "We couldn't continue",
        restart: "Restart diagnosis",
        selectedProblem: "Selected problem",
        options: "Answer options",
      }
    : {
        unavailableTitle: "Diagnóstico no disponible",
        unavailableDescription: "Aún no hay un flujo guiado para este síntoma. Puedes revisar las referencias técnicas del vehículo o enviarnos el síntoma para priorizarlo.",
        references: "Ver referencias técnicas",
        feedback: "Solicitar este diagnóstico",
        back: "Volver",
        tag: "Diagnóstico guiado",
        begin: "Empecemos por identificar el síntoma.",
        answerSingular: "respuesta registrada.",
        answerPlural: "respuestas registradas.",
        errorTitle: "No pudimos continuar",
        restart: "Reiniciar diagnóstico",
        selectedProblem: "Problema seleccionado",
        options: "Opciones de respuesta",
      };
  const requestedQuestionId = searchParams.get("question");
  const diagnostic = getDiagnosticDefinition(problemId, vehicleId ?? undefined);
  const storedAnswers = readDiagnosticAnswers(problemId, vehicleId);
  const answers = toEngineAnswers(storedAnswers);
  const questions = diagnostic ? localizeQuestions(diagnostic.questions, locale) : undefined;
  const state = diagnostic && questions
    ? runDiagnostic(questions, diagnostic.startQuestionId, answers)
    : null;
  const problem = diagnosticProblems.find((item) => item.id === problemId);
  const answeredCount = Object.keys(storedAnswers).length;

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
          <h1 className="text-3xl font-bold">{copy.unavailableTitle}</h1>
          <p className="mt-4 leading-7 text-slate-400">
            {copy.unavailableDescription}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={() => router.push(`/vehiculo/informacion-tecnica?vehicle=${vehicleId}`)} className="rounded-xl bg-white px-6 py-3 font-semibold text-slate-950">{copy.references}</button>
            <button type="button" onClick={() => router.push("/sugerencias")} className="rounded-xl border border-slate-700 px-6 py-3 font-semibold">{copy.feedback}</button>
          </div>
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
          <p className="text-sm font-medium text-slate-400">{copy.tag}</p>
          <h1 className="mt-3 text-3xl font-bold">{copy.errorTitle}</h1>
          <p className="mt-4 leading-7 text-slate-400">{state.message}</p>
          <button
            type="button"
            onClick={() => {
              clearDiagnosticAnswers();
              router.push(`/diagnostico?vehicle=${vehicleId}`);
            }}
            className="mt-8 rounded-xl bg-white px-6 py-3 font-semibold text-slate-950"
          >
            {copy.restart}
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

    const nextState = runDiagnostic(
      questions!,
      diagnostic.startQuestionId,
      toEngineAnswers(nextStoredAnswers),
    );

    const relevantAnswers: StoredDiagnosticAnswers = {};
    for (const questionId of Object.keys(nextState.answers)) {
      const answer = nextStoredAnswers[questionId];
      if (answer) relevantAnswers[questionId] = answer;
    }
    writeDiagnosticAnswers(problemId, vehicleId, relevantAnswers);

    if (nextState.status === "result") {
      if (vehicleId && diagnosticResults.some((item) => item.id === nextState.resultId)) {
        saveDiagnosticHistory({
          vehicleId,
          problemId,
          resultId: nextState.resultId,
        });
      }
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
      <section className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-16">
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-full bg-sky-400/10 px-3 py-1 font-semibold text-sky-300">
              {copy.tag}
            </span>
            <span className="text-slate-500">
            {diagnosticProblemTranslations[locale][problemId]?.title ?? problem?.title ?? copy.selectedProblem}
            </span>
          </div>
          <p className="mt-5 text-sm text-slate-400">
            {answeredCount === 0
              ? copy.begin
              : `${answeredCount} ${answeredCount === 1 ? copy.answerSingular : copy.answerPlural}`}
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            {question.question}
          </h1>

          {question.explanation && (
            <p className="mt-4 leading-7 text-slate-400">
              {question.explanation}
            </p>
          )}
        </div>

        <div className="space-y-3" aria-label={copy.options}>
          {question.options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleOption(option.id)}
              className="group w-full rounded-2xl border border-white/10 bg-slate-900/80 p-5 text-left shadow-sm transition hover:border-sky-400/50 hover:bg-slate-800 active:scale-[0.99]"
            >
              <span className="flex items-center justify-between gap-4 text-lg font-bold">
                {option.label}
                <span className="text-sky-300 transition group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => router.back()}
          className="mt-10 text-sm text-slate-500 hover:text-white"
        >
          ← {copy.back}
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
