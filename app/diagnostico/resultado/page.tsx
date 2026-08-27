"use client";
import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { diagnosticResults } from "@/data/diagnostics/results";

function ResultadoContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const resultId = searchParams.get("result");
  const answers = JSON.parse(
  typeof window !== "undefined"
    ? sessionStorage.getItem("diagnosticAnswers") || "{}"
    : "{}"
);

  const result = diagnosticResults.find(
    (item) => item.id === resultId
  );

  if (!result) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <section className="mx-auto max-w-3xl px-6 py-16">
          <h1 className="text-3xl font-bold">
            Resultado no encontrado
          </h1>

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

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-3xl px-6 py-16">

        <p className="text-sm font-medium text-slate-400">
          Resultado preliminar
        </p>

        <h1 className="mt-3 text-4xl font-bold">
          {result.title}
        </h1>

        <p className="mt-6 text-lg leading-8 text-slate-400">
          {result.summary}
        </p>
<div className="mt-10">
  <h2 className="text-xl font-semibold">
    Comprobaciones realizadas
  </h2>

  <div className="mt-4 space-y-3">
    {Object.entries(answers).map(
      ([questionId, answer]) => {
        const data = answer as {
          question: string;
          answer: string;
        };

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
      }
    )}
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
      onClick={() => { if (!result.nextAction) return; router.push( `${result.nextAction.href}&vehicle=${searchParams.get("vehicle")}` ); }}
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
          onClick={() => {
  sessionStorage.removeItem("diagnosticAnswers");

  router.push(
    `/diagnostico?vehicle=${searchParams.get("vehicle")}`
  );
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