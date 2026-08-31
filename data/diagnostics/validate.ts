import type { DiagnosticQuestion } from "./types";

export type DiagnosticValidationError = {
  questionId?: string;
  optionId?: string;
  message: string;
};

/**
 * Validates the internal references of a diagnostic tree.
 * It does not execute the diagnostic; it only checks that every
 * question/option reference points to something that exists.
 */
export function validateDiagnostic(
  diagnostic: DiagnosticQuestion[],
): DiagnosticValidationError[] {
  const errors: DiagnosticValidationError[] = [];
  const questionIds = new Set<string>();

  for (const question of diagnostic) {
    if (questionIds.has(question.id)) {
      errors.push({
        questionId: question.id,
        message: `Duplicate question id: ${question.id}`,
      });
      continue;
    }

    questionIds.add(question.id);
  }

  for (const question of diagnostic) {
    if (!question.question.trim()) {
      errors.push({
        questionId: question.id,
        message: "Question text cannot be empty",
      });
    }

    if (question.options.length === 0) {
      errors.push({
        questionId: question.id,
        message: "Question must contain at least one option",
      });
      continue;
    }

    const optionIds = new Set<string>();

    for (const option of question.options) {
      if (optionIds.has(option.id)) {
        errors.push({
          questionId: question.id,
          optionId: option.id,
          message: `Duplicate option id: ${option.id}`,
        });
        continue;
      }

      optionIds.add(option.id);

      if (option.nextQuestion && !questionIds.has(option.nextQuestion)) {
        errors.push({
          questionId: question.id,
          optionId: option.id,
          message: `Unknown next question: ${option.nextQuestion}`,
        });
      }

      if (option.nextQuestion && option.result) {
        errors.push({
          questionId: question.id,
          optionId: option.id,
          message: "An option cannot define both nextQuestion and result",
        });
      }

      if (!option.nextQuestion && !option.result) {
        errors.push({
          questionId: question.id,
          optionId: option.id,
          message: "An option must define nextQuestion or result",
        });
      }
    }
  }

  return errors;
}
