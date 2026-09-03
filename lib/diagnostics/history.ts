const DIAGNOSTIC_HISTORY_STORAGE_KEY = "diagnosticHistory";
const DIAGNOSTIC_HISTORY_CHANGED_EVENT = "diagnostic-history-changed";
const MAX_HISTORY_ENTRIES = 12;
const EMPTY_HISTORY: DiagnosticHistoryEntry[] = [];

let lastStoredValue: string | null | undefined;
let lastHistory: DiagnosticHistoryEntry[] = EMPTY_HISTORY;

export type DiagnosticHistoryEntry = {
  id: string;
  vehicleId: string;
  problemId: string;
  resultId: string;
  createdAt: string;
};

function isHistoryEntry(value: unknown): value is DiagnosticHistoryEntry {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;

  const entry = value as Record<string, unknown>;
  return (
    typeof entry.id === "string" &&
    typeof entry.vehicleId === "string" &&
    typeof entry.problemId === "string" &&
    typeof entry.resultId === "string" &&
    typeof entry.createdAt === "string"
  );
}

export function readDiagnosticHistory(): DiagnosticHistoryEntry[] {
  if (typeof window === "undefined") return EMPTY_HISTORY;

  try {
    const raw = localStorage.getItem(DIAGNOSTIC_HISTORY_STORAGE_KEY);
    if (raw === lastStoredValue) return lastHistory;

    lastStoredValue = raw;
    if (!raw) {
      lastHistory = EMPTY_HISTORY;
      return lastHistory;
    }

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      lastHistory = EMPTY_HISTORY;
      return lastHistory;
    }

    lastHistory = parsed.filter(isHistoryEntry).slice(0, MAX_HISTORY_ENTRIES);
    return lastHistory;
  } catch {
    return EMPTY_HISTORY;
  }
}

export function subscribeToDiagnosticHistory(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => undefined;

  window.addEventListener(DIAGNOSTIC_HISTORY_CHANGED_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener(DIAGNOSTIC_HISTORY_CHANGED_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function getDiagnosticHistoryServerSnapshot() {
  return EMPTY_HISTORY;
}

export function saveDiagnosticHistory(
  entry: Omit<DiagnosticHistoryEntry, "id" | "createdAt">,
) {
  if (typeof window === "undefined") return;

  try {
    const nextEntry: DiagnosticHistoryEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(
      DIAGNOSTIC_HISTORY_STORAGE_KEY,
      JSON.stringify([nextEntry, ...readDiagnosticHistory()].slice(0, MAX_HISTORY_ENTRIES)),
    );
    lastStoredValue = undefined;
    window.dispatchEvent(new Event(DIAGNOSTIC_HISTORY_CHANGED_EVENT));
  } catch {
    // Local history is optional and must never prevent completing a diagnosis.
  }
}
