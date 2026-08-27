"use client";


import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { noArrancaDiagnostic } from "@/data/diagnostics/no-arranca";

function PreguntasContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const vehicleId = searchParams.get("vehicle");
  const questionId = searchParams.get("question") || "motor-gira";

  const question = noArrancaDiagnostic.find(
    (item) => item.id === questionId
  );

  if (!question) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <section className="mx-auto max-w-3xl px-6 py-16">
          <h1 className="text-3xl font-bold">
            No encontramos esta pregunta
          </h1>

          <button
            type="button"
            onClick={() =>
              router.push(
                `/diagnostico?vehicle=${vehicleId}`
              )
            }
            className="mt-8 rounded-xl bg-white px-6 py-3 font-semibold text-slate-950"
          >
            Volver
          </button>
        </section>
      </main>
    );
  }

const handleOption = (
  optionId: string,
  nextQuestion?: string,
  result?: string
) => {
  const currentAnswers = JSON.parse(
    sessionStorage.getItem("diagnosticAnswers") || "{}"
  );

 const selectedOption = question.options.find(
  (option) => option.id === optionId
);

currentAnswers[question.id] = {
  question: question.question,
  answer: selectedOption?.label || optionId,
};  

  sessionStorage.setItem(
    "diagnosticAnswers",
    JSON.stringify(currentAnswers)
  );

  if (result) {
    router.push(
      `/diagnostico/resultado?vehicle=${vehicleId}&result=${result}`
    );
    return;
  }

  if (nextQuestion) {
    router.push(
      `/diagnostico/preguntas?vehicle=${vehicleId}&question=${nextQuestion}`
    );
  }
};

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-3xl px-6 py-16">

        <div className="mb-10">
          <p className="text-sm font-medium text-slate-400">
            Diagnóstico
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
              onClick={() =>
  handleOption(
    option.id,
    option.nextQuestion,
    option.result
  )
}
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:border-slate-500 hover:bg-slate-800"
            >
              <span className="text-lg font-semibold">
                {option.label}
              </span>
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
            <p className="text-slate-400">
              Cargando diagnóstico...
            </p>
          </section>
        </main>
      }
    >
      <PreguntasContent />
    </Suspense>
  );
}