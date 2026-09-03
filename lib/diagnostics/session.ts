import type { DiagnosticAnswers } from "@/data/diagnostics/engine";

export const DIAGNOSTIC_ANSWERS_STORAGE_KEY = "diagnosticAnswers";

export type StoredDiagnosticAnswer = {
  question: string;
  answer: string;
  optionId: string;
};

export type StoredDiagnosticAnswers = Record<string, StoredDiagnosticAnswer>;

type DiagnosticSession = {
  version: 1;
  problemId: string;
  answers: StoredDiagnosticAnswers;
};

function isStoredAnswer(value: unknown): value is StoredDiagnosticAnswer {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;

  const answer = value as Record<string, unknown>;
  return (
    typeof answer.question === "string" &&
    typeof answer.answer === "string" &&
    typeof answer.optionId === "string"
  );
}

export function readDiagnosticAnswers(problemId: string): StoredDiagnosticAnswers {
  if (typeof window === "undefined") return {};

  try {
    const raw = sessionStorage.getItem(DIAGNOSTIC_ANSWERS_STORAGE_KEY);
    if (!raw) return {};

    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};

    const session = parsed as Partial<DiagnosticSession>;
    if (
      session.version !== 1 ||
      session.problemId !== problemId ||
      !session.answers ||
      typeof session.answers !== "object" ||
      Array.isArray(session.answers)
    ) {
      return {};
    }

    return Object.fromEntries(
      Object.entries(session.answers).filter(([, answer]) =>
        isStoredAnswer(answer),
      ),
    ) as StoredDiagnosticAnswers;
  } catch {
    return {};
  }
}

export function writeDiagnosticAnswers(
  problemId: string,
  answers: StoredDiagnosticAnswers,
) {
  if (typeof window === "undefined") return;

  const session: DiagnosticSession = { version: 1, problemId, answers };
  sessionStorage.setItem(DIAGNOSTIC_ANSWERS_STORAGE_KEY, JSON.stringify(session));
}

export function clearDiagnosticAnswers() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(DIAGNOSTIC_ANSWERS_STORAGE_KEY);
}

export function toEngineAnswers(
  storedAnswers: StoredDiagnosticAnswers,
): DiagnosticAnswers {
  return Object.fromEntries(
    Object.entries(storedAnswers).map(([questionId, answer]) => [
      questionId,
      answer.optionId,
    ]),
  );
}
