"use client";

import { useSearchParams } from "next/navigation";

const problems = [
  {
    id: "no-arranca",
    title: "No enciende",
    description: "El motor no arranca o no da marcha.",
    icon: "🔴",
  },
  {
    id: "se-apaga",
    title: "Se apaga",
    description: "El vehículo arranca pero se apaga.",
    icon: "🟠",
  },
  {
    id: "tironea",
    title: "Tironea o da jalones",
    description: "El motor funciona de manera irregular.",
    icon: "🟡",
  },
  {
    id: "pierde-potencia",
    title: "Pierde potencia",
    description: "El vehículo no responde como debería.",
    icon: "🔵",
  },
  {
    id: "se-calienta",
    title: "Se calienta",
    description: "La temperatura del motor aumenta demasiado.",
    icon: "🌡️",
  },
  {
    id: "luz-tablero",
    title: "Luz en el tablero",
    description: "Se encendió EPC, Check Engine u otra luz.",
    icon: "💡",
  },
  {
    id: "ruido",
    title: "Hace un ruido extraño",
    description: "El vehículo presenta un ruido anormal.",
    icon: "🔊",
  },
  {
    id: "fuga",
    title: "Tiene una fuga",
    description: "Hay aceite, refrigerante u otro líquido.",
    icon: "💧",
  },
  {
    id: "electrico",
    title: "Problema eléctrico",
    description: "Hay fallas con luces, accesorios o alimentación.",
    icon: "⚡",
  },
];

export default function ProblemaPage() {
  const searchParams = useSearchParams();
  const vehicleId = searchParams.get("vehicle");

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
          {problems.map((problem) => (
            <button
              key={problem.id}
              type="button"
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-left transition hover:border-slate-500 hover:bg-slate-800"
            >
              <div className="text-3xl">{problem.icon}</div>

              <h2 className="mt-4 text-xl font-semibold">
                {problem.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {problem.description}
              </p>
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