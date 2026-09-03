import { noArrancaDiagnostic } from "./no-arranca";

export type DiagnosticDefinition = {
  problemId: string;
  startQuestionId: string;
  questions: typeof noArrancaDiagnostic;
};

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
];

export function getDiagnosticDefinition(problemId: string) {
  return diagnosticDefinitions.find(
    (diagnostic) => diagnostic.problemId === problemId,
  );
}
