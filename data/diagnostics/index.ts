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

export function getDiagnosticDefinition(problemId: string) {
  return diagnosticDefinitions.find(
    (diagnostic) => diagnostic.problemId === problemId,
  );
}
