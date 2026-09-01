import { NextResponse, type NextRequest } from "next/server";

/**
 * Request boundary for future authentication/session handling.
 *
 * Authentication is intentionally not wired yet. Keeping this boundary
 * dependency-free allows the public application to build cleanly while the
 * authentication layer is developed as a separate, tested feature.
 */
export function proxy(request: NextRequest) {
  return NextResponse.next({ request });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
