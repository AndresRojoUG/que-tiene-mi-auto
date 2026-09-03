import type { DiagnosticQuestion } from "./types";

export const seCalientaDiagnostic: DiagnosticQuestion[] = [
  {
    id: "sintoma-temperatura",
    question: "¿Qué señal de temperatura observas?",
    explanation:
      "Si notas vapor, olor intenso a refrigerante o una advertencia roja, prioriza detenerte en un lugar seguro. No abras el sistema de refrigeración cuando el motor esté caliente.",
    options: [
      {
        id: "vapor-o-olor-intenso",
        label: "Hay vapor, humo o un olor intenso",
        result: "temperatura-riesgo-inmediato",
      },
      {
        id: "advertencia-roja",
        label: "La temperatura llegó a zona roja o hay una advertencia roja",
        result: "temperatura-riesgo-inmediato",
      },
      {
        id: "temperatura-alta",
        label: "La temperatura está más alta de lo normal, pero no hay vapor",
        nextQuestion: "cuando-sube-temperatura",
      },
      {
        id: "no-estoy-seguro",
        label: "No estoy seguro",
        result: "temperatura-informacion-insuficiente",
      },
    ],
  },
  {
    id: "cuando-sube-temperatura",
    question: "¿Cuándo notas que sube la temperatura?",
    explanation:
      "Responde solo con lo que hayas observado. No intentes comprobar el radiador, mangueras o ventiladores con el motor caliente o en marcha.",
    options: [
      {
        id: "trafico-o-detenerme",
        label: "En tráfico, al detenerme o a baja velocidad",
        result: "temperatura-en-baja-velocidad",
      },
      {
        id: "en-cualquier-momento",
        label: "También ocurre al circular normalmente",
        result: "temperatura-requiere-revision",
      },
      {
        id: "no-estoy-seguro",
        label: "No estoy seguro",
        result: "temperatura-informacion-insuficiente",
      },
    ],
  },
];
