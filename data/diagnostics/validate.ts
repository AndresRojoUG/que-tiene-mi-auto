import type { DiagnosticDefinition } from "./types";

export type DiagnosticValidationIssue = {
  diagnosticId: string;
  message: string;
};

export function validateDiagnosticDefinition(
  diagnostic: DiagnosticDefinition,
  resultIds: ReadonlySet<string>,
): DiagnosticValidationIssue[] {
  const issues: DiagnosticValidationIssue[] = [];
  const addIssue = (message: string) =>
    issues.push({ diagnosticId: diagnostic.problemId || "<missing>", message });

  if (!diagnostic.problemId.trim()) addIssue("Missing problem ID.");
  if (!diagnostic.startQuestionId.trim()) addIssue("Missing start question ID.");
  if (diagnostic.questions.length === 0) addIssue("Diagnostic has no questions.");

  const questionIds = new Set<string>();

  for (const question of diagnostic.questions) {
    if (!question.id.trim()) {
      addIssue("Question has a blank ID.");
    } else if (questionIds.has(question.id)) {
      addIssue(`Duplicate question ID: ${question.id}.`);
    } else {
      questionIds.add(question.id);
    }

    if (!question.question.trim()) addIssue(`Question ${question.id || "<missing>"} has no text.`);
    if (question.options.length === 0) addIssue(`Question ${question.id || "<missing>"} has no options.`);
    const optionIds = new Set<string>();

    for (const option of question.options) {
      if (!option.id.trim()) {
        addIssue(`Question ${question.id || "<missing>"} has an option with a blank ID.`);
      } else if (optionIds.has(option.id)) {
        addIssue(`Duplicate option ID: ${option.id}.`);
      } else {
        optionIds.add(option.id);
      }

      if (!option.label.trim()) addIssue(`Option ${option.id || "<missing>"} has no label.`);
      if (option.nextQuestion && option.result) {
        addIssue(`Option ${option.id || "<missing>"} has both a next question and a result.`);
      }
      if (!option.nextQuestion && !option.result) {
        addIssue(`Option ${option.id || "<missing>"} has no destination.`);
      }
    }
  }

  if (diagnostic.startQuestionId && !questionIds.has(diagnostic.startQuestionId)) {
    addIssue(`Unknown start question: ${diagnostic.startQuestionId}.`);
  }

  const questionsById = new Map(
    diagnostic.questions.map((question) => [question.id, question]),
  );

  for (const question of diagnostic.questions) {
    for (const option of question.options) {
      if (option.nextQuestion && !questionsById.has(option.nextQuestion)) {
        addIssue(`Option ${option.id || "<missing>"} points to an unknown question: ${option.nextQuestion}.`);
      }
      if (option.result && !resultIds.has(option.result)) {
        addIssue(`Option ${option.id || "<missing>"} points to an unknown result: ${option.result}.`);
      }
    }
  }

  if (questionsById.has(diagnostic.startQuestionId)) {
    const reachable = new Set<string>();
    const visiting = new Set<string>();

    const visit = (questionId: string) => {
      if (visiting.has(questionId)) {
        addIssue(`Cycle detected at question: ${questionId}.`);
        return;
      }
      if (reachable.has(questionId)) return;

      reachable.add(questionId);
      visiting.add(questionId);
      const question = questionsById.get(questionId);
      question?.options.forEach((option) => {
        if (option.nextQuestion && questionsById.has(option.nextQuestion)) {
          visit(option.nextQuestion);
        }
      });
      visiting.delete(questionId);
    };

    visit(diagnostic.startQuestionId);
    for (const question of diagnostic.questions) {
      if (question.id && !reachable.has(question.id)) {
        addIssue(`Unreachable question: ${question.id}.`);
      }
    }
  }

  return issues;
}

export function validateDiagnosticDefinitions(
  diagnostics: DiagnosticDefinition[],
  resultIds: string[],
): DiagnosticValidationIssue[] {
  const issues: DiagnosticValidationIssue[] = [];
  const problemIds = new Set<string>();
  const knownResults = new Set(resultIds);

  for (const diagnostic of diagnostics) {
    if (problemIds.has(diagnostic.problemId)) {
      issues.push({
        diagnosticId: diagnostic.problemId || "<missing>",
        message: `Duplicate diagnostic problem ID: ${diagnostic.problemId}.`,
      });
    }
    problemIds.add(diagnostic.problemId);
    issues.push(...validateDiagnosticDefinition(diagnostic, knownResults));
  }

  return issues;
}
