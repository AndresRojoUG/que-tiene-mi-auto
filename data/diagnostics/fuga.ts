import type { DiagnosticQuestion } from "./types";

export const fugaDiagnostic: DiagnosticQuestion[] = [
  {
    id: "tipo-de-fuga",
    question: "¿Qué observas alrededor de la fuga?",
    explanation: "No coloques las manos cerca de partes calientes, bandas o ventiladores. No pruebes el líquido con la piel ni con la boca.",
    options: [
      { id: "humo-olor-combustible", label: "Hay humo, olor fuerte a combustible o goteo cerca del motor", result: "fuga-riesgo-inmediato" },
      { id: "liquido-rojo-temperatura", label: "Hay advertencia roja, vapor o temperatura alta", result: "fuga-riesgo-inmediato" },
      { id: "mancha-sin-otros-sintomas", label: "Hay una mancha o goteo, sin humo ni advertencias", result: "fuga-requiere-identificacion" },
      { id: "no-estoy-seguro", label: "No estoy seguro", result: "fuga-informacion-insuficiente" },
    ],
  },
];
