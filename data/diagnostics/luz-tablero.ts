import type { DiagnosticQuestion } from "./types";

export const luzTableroDiagnostic: DiagnosticQuestion[] = [
  {
    id: "color-o-senal-tablero",
    question: "¿Qué tipo de señal aparece en el tablero?",
    explanation:
      "No intentes identificar una luz mientras conduces. Detente en un lugar seguro antes de revisar el tablero o el manual.",
    options: [
      { id: "roja", label: "Una luz roja o mensaje de detenerse", result: "tablero-riesgo-inmediato" },
      { id: "check-parpadeando", label: "Check Engine parpadea", result: "tablero-check-parpadeando" },
      { id: "check-fija", label: "Check Engine permanece encendida", result: "tablero-check-fija" },
      { id: "otra-amarilla", label: "Otra luz amarilla o ámbar", result: "tablero-advertencia-ambar" },
      { id: "no-se", label: "No estoy seguro", result: "tablero-identificar-luz" },
    ],
  },
];
