import { electricoDiagnostic } from "./electrico";
import { luzTableroDiagnostic } from "./luz-tablero";
import { fugaDiagnostic } from "./fuga";
import { pierdePotenciaDiagnostic } from "./pierde-potencia";
import { tironeaDiagnostic } from "./tironea";
import { noArrancaDiagnostic } from "./no-arranca";
import { seApagaDiagnostic } from "./se-apaga";
import { seCalientaDiagnostic } from "./se-calienta";
import type { DiagnosticDefinition } from "./types";

export type { DiagnosticDefinition } from "./types";

/**
 * Central registry for all diagnostic flows.
 * New problems should be added here instead of creating special cases in the UI.
 */
export const diagnosticDefinitions: DiagnosticDefinition[] = [
  {
    problemId: "tironea",
    startQuestionId: "cuando-tironea",
    questions: tironeaDiagnostic,
  },
  {
    problemId: "pierde-potencia",
    startQuestionId: "momento-perdida-potencia",
    questions: pierdePotenciaDiagnostic,
  },
  {
    problemId: "fuga",
    startQuestionId: "tipo-de-fuga",
    questions: fugaDiagnostic,
  },
  {
    problemId: "luz-tablero",
    startQuestionId: "color-o-senal-tablero",
    questions: luzTableroDiagnostic,
  },
  {
    problemId: "electrico",
    startQuestionId: "riesgo-electrico",
    questions: electricoDiagnostic,
  },
  {
    problemId: "no-arranca",
    startQuestionId: "motor-gira",
    questions: noArrancaDiagnostic,
  },
  {
    problemId: "se-apaga",
    startQuestionId: "momento-se-apaga",
    questions: seApagaDiagnostic,
  },
  {
    problemId: "se-calienta",
    startQuestionId: "sintoma-temperatura",
    questions: seCalientaDiagnostic,
  },
];

export function resolveDiagnosticDefinition(
  definitions: DiagnosticDefinition[],
  problemId: string,
  vehicleId?: string,
) {
  return (
    definitions.find(
      (diagnostic) =>
        diagnostic.problemId === problemId && diagnostic.vehicleId === vehicleId,
    ) ??
    definitions.find(
      (diagnostic) =>
        diagnostic.problemId === problemId && diagnostic.vehicleId === undefined,
    )
  );
}

export function getDiagnosticDefinition(problemId: string, vehicleId?: string) {
  return resolveDiagnosticDefinition(diagnosticDefinitions, problemId, vehicleId);
}
