import type { DiagnosticQuestion } from "./types";

export type DiagnosticAnswers = Record<string, string>;

export type DiagnosticEngineState =
  | {
      status: "question";
      question: DiagnosticQuestion;
      answers: DiagnosticAnswers;
    }
  | {
      status: "result";
      resultId: string;
      answers: DiagnosticAnswers;
    }
  | {
      status: "error";
      message: string;
      answers: DiagnosticAnswers;
    };

/**
 * Resolves a diagnostic tree from a question and a set of answers.
 * The engine contains no UI or vehicle-specific knowledge.
 */
export function runDiagnostic(
  diagnostic: DiagnosticQuestion[],
  startQuestionId: string,
  answers: DiagnosticAnswers = {},
): DiagnosticEngineState {
  const questions = new Map(diagnostic.map((question) => [question.id, question]));
  const startQuestion = questions.get(startQuestionId);

  if (!startQuestion) {
    return {
      status: "error",
      message: `Unknown start question: ${startQuestionId}`,
      answers,
    };
  }

  let current = startQuestion;
  const visited = new Set<string>();
  const resolvedAnswers: DiagnosticAnswers = {};

  while (true) {
    if (visited.has(current.id)) {
      return {
        status: "error",
        message: `Diagnostic cycle detected at question: ${current.id}`,
        answers: resolvedAnswers,
      };
    }

    visited.add(current.id);
    const selectedOptionId = answers[current.id];

    if (!selectedOptionId) {
      return { status: "question", question: current, answers: resolvedAnswers };
    }

    const option = current.options.find((item) => item.id === selectedOptionId);

    if (!option) {
      return {
        status: "error",
        message: `Unknown option "${selectedOptionId}" for question: ${current.id}`,
        answers: resolvedAnswers,
      };
    }

    resolvedAnswers[current.id] = selectedOptionId;

    if (option.result) {
      return { status: "result", resultId: option.result, answers: resolvedAnswers };
    }

    if (!option.nextQuestion) {
      return {
        status: "error",
        message: `Option "${option.id}" has no destination`,
        answers: resolvedAnswers,
      };
    }

    const nextQuestion = questions.get(option.nextQuestion);

    if (!nextQuestion) {
      return {
        status: "error",
        message: `Unknown next question: ${option.nextQuestion}`,
        answers: resolvedAnswers,
      };
    }

    current = nextQuestion;
  }
}

export function answerDiagnostic(
  diagnostic: DiagnosticQuestion[],
  startQuestionId: string,
  answers: DiagnosticAnswers,
  questionId: string,
  optionId: string,
): DiagnosticEngineState {
  return runDiagnostic(diagnostic, startQuestionId, {
    ...answers,
    [questionId]: optionId,
  });
}
