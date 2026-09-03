import { createBrowserClient } from "@supabase/ssr";
import { requireSupabaseConfig } from "./config";

/** Browser client. Create it only from Client Components after configuration. */
export function createClient() {
  const { url, publishableKey } = requireSupabaseConfig();
  return createBrowserClient(url, publishableKey);
}
