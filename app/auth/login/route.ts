import { NextRequest, NextResponse } from "next/server";
import { auth, signIn } from "@/auth";
import { wiseAuth } from "@/lib/auth/settings";
import { sanitizeLoginDestination } from "@/lib/auth/wise-id";

export const dynamic = "force-dynamic";

// A stable native navigation works even from an old tab after a deployment.
// Auth.js still creates and checks state, nonce and PKCE as before.
export async function GET(request: NextRequest) {
  const destination = sanitizeLoginDestination(request.nextUrl.searchParams.get("callbackUrl") ?? undefined);
  const base = wiseAuth.authUrl || request.nextUrl.origin;
  const failure = new URL("/login", base);
  failure.searchParams.set("callbackUrl", destination);
  failure.searchParams.set("error", "LoginUnavailable");
  const redirect = (url: string | URL) => NextResponse.redirect(url, {
    status: 303, headers: { "Cache-Control": "private, no-store" },
  });
  if (!wiseAuth.configured) return redirect(failure);
  try {
    const session = await auth();
    if (session?.user?.id) return redirect(new URL(destination, base));
    const url = await signIn("wise", { redirect: false, redirectTo: destination });
    return redirect(url);
  } catch (error) {
    console.error("Wise ID login start failed:", error instanceof Error ? error.name : "UnknownError");
    return redirect(failure);
  }
}
