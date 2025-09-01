// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if user has session cookie
  const sessionCookie = request.cookies.get("better-auth.session_token");
  const hasSession = !!sessionCookie?.value;

  // Protect /projects and redirect / to sign-in if no session
  if ((pathname.startsWith("/projects") || pathname === "/") && !hasSession) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (pathname === "/" && hasSession) {
    return NextResponse.redirect(new URL("/projects", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/projects/:path*"],
};
