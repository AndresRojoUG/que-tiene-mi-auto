import type { DiagnosticQuestion } from "./types";

/**
 * Generic, safety-first flow for electrical symptoms. Vehicle-specific circuit
 * data belongs in an optional vehicle variant, never in the UI.
 */
export const electricoDiagnostic: DiagnosticQuestion[] = [
  {
    id: "riesgo-electrico",
    question: "¿Hay olor a quemado, humo, chispas o una zona muy caliente?",
    explanation:
      "No toques cables, fusibles ni componentes calientes. Estas señales pueden indicar un riesgo eléctrico.",
    options: [
      {
        id: "si",
        label: "Sí",
        result: "electrico-riesgo-inmediato",
      },
      {
        id: "no",
        label: "No",
        nextQuestion: "alcance-falla-electrica",
      },
      {
        id: "no-estoy-seguro",
        label: "No estoy seguro",
        nextQuestion: "alcance-falla-electrica",
      },
    ],
  },
  {
    id: "alcance-falla-electrica",
    question: "¿Qué es lo que notas principalmente?",
    options: [
      {
        id: "luz-bateria-o-falla-carga",
        label: "Se encendió la luz de batería o de carga",
        result: "electrico-requiere-revision-carga",
      },
      {
        id: "pierde-alimentacion-en-marcha",
        label: "Las luces o accesorios fallan mientras conduzco",
        result: "electrico-falla-en-marcha",
      },
      {
        id: "un-accesorio",
        label: "Falla un accesorio, una luz o una toma de corriente",
        result: "electrico-accesorio-aislado",
      },
      {
        id: "varias-cosas-o-no-se",
        label: "Fallas en varias cosas o no estoy seguro",
        result: "electrico-informacion-insuficiente",
      },
    ],
  },
];
