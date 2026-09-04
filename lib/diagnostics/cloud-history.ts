import { createClient } from "@/lib/supabase/client";
import {
  mergeDiagnosticHistory,
  type DiagnosticHistoryEntry,
} from "./history";

type CloudHistoryRow = {
  client_entry_id: string;
  vehicle_key: string;
  problem_key: string;
  result_key: string;
  completed_at: string;
};

function toHistoryEntry(row: CloudHistoryRow): DiagnosticHistoryEntry {
  return {
    id: row.client_entry_id,
    vehicleId: row.vehicle_key,
    problemId: row.problem_key,
    resultId: row.result_key,
    createdAt: row.completed_at,
  };
}

export async function syncDiagnosticHistory(
  localEntries: DiagnosticHistoryEntry[],
) {
  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { status: "not-signed-in" as const, count: 0 };
  }

  if (localEntries.length > 0) {
    const { error: upsertError } = await supabase
      .from("user_diagnostic_history")
      .upsert(
        localEntries.map((entry) => ({
          user_id: user.id,
          client_entry_id: entry.id,
          vehicle_key: entry.vehicleId,
          problem_key: entry.problemId,
          result_key: entry.resultId,
          completed_at: entry.createdAt,
        })),
        { onConflict: "user_id,client_entry_id", ignoreDuplicates: true },
      );

    if (upsertError) throw upsertError;
  }

  const { data, error: selectError } = await supabase
    .from("user_diagnostic_history")
    .select("client_entry_id, vehicle_key, problem_key, result_key, completed_at")
    .order("completed_at", { ascending: false })
    .limit(12);

  if (selectError) throw selectError;

  const cloudEntries = (data as CloudHistoryRow[]).map(toHistoryEntry);
  mergeDiagnosticHistory(cloudEntries);
  return { status: "synced" as const, count: cloudEntries.length };
}
