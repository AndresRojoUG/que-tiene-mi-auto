import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

/** Completes the PKCE email-confirmation flow and stores its session in cookies. */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const destination = new URL("/cuenta", requestUrl.origin);

  if (!code) {
    destination.searchParams.set("error", "confirmacion-invalida");
    return NextResponse.redirect(destination);
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      destination.searchParams.set("error", "confirmacion-invalida");
    } else {
      destination.searchParams.set("confirmed", "1");
    }
  } catch {
    destination.searchParams.set("error", "confirmacion-invalida");
  }

  return NextResponse.redirect(destination);
}
