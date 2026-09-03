import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

/**
 * Request boundary for future authentication/session handling.
 *
 * Authentication is intentionally not wired yet. Keeping this boundary
 * dependency-free allows the public application to build cleanly while the
 * authentication layer is developed as a separate, tested feature.
 */
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
