"use client";

import { useState } from "react";

type Step = {
  title: string;
  description: string;
};

type DiagnosticGuideProps = {
  title: string;
  steps: Step[];
};

export default function DiagnosticGuide({
  title,
  steps,
}: DiagnosticGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const step = steps[currentStep];

  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8">

      <p className="text-sm font-medium text-slate-400">
        Guía paso a paso
      </p>

      <h2 className="mt-2 text-2xl font-bold">
        {title}
      </h2>

      {/* Progreso */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">
            Paso {currentStep + 1} de {steps.length}
          </span>

          <span className="text-slate-500">
            {Math.round(
              ((currentStep + 1) / steps.length) * 100
            )}
            %
          </span>
        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full bg-white transition-all"
            style={{
              width: `${
                ((currentStep + 1) / steps.length) * 100
              }%`,
            }}
          />
        </div>
      </div>

      {/* Paso actual */}
      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950 p-6">

        <p className="text-sm text-slate-500">
          Paso {currentStep + 1}
        </p>

        <h3 className="mt-2 text-xl font-semibold">
          {step.title}
        </h3>

        <p className="mt-4 leading-7 text-slate-400">
          {step.description}
        </p>

      </div>

      {/* Navegación */}
      <div className="mt-6 flex gap-3">

        <button
          type="button"
          disabled={currentStep === 0}
          onClick={() =>
            setCurrentStep((step) => step - 1)
          }
          className="flex-1 rounded-xl border border-slate-700 px-5 py-4 font-semibold transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-30"
        >
          ← Atrás
        </button>

        <button
          type="button"
          onClick={() => {
            if (!isLastStep) {
              setCurrentStep((step) => step + 1);
            }
          }}
          className="flex-1 rounded-xl bg-white px-5 py-4 font-semibold text-slate-950 transition hover:bg-slate-200"
        >
          {isLastStep ? "Terminar" : "Siguiente →"}
        </button>

      </div>

    </div>
  );
}
