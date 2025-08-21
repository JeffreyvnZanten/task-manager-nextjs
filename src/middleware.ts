import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Paths die authenticatie vereisen
const protectedPaths = ["/projects"];

// Paths die alleen voor niet-geauthenticeerde gebruikers zijn
const authPaths = ["/sign-in", "/sign-up"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check of er een auth token in cookies staat
  const token = request.cookies.get("auth_token")?.value;

  // Als gebruiker probeert naar protected route te gaan zonder token
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    if (!token) {
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Als geauthenticeerde gebruiker naar auth pages probeert te gaan
  if (authPaths.some((path) => pathname.startsWith(path))) {
    if (token) {
      return NextResponse.redirect(new URL("/projects", request.url));
    }
  }

  // Als gebruiker naar root gaat, redirect naar dashboard of sign-in
  if (pathname === "/") {
    if (token) {
      return NextResponse.redirect(new URL("/projects", request.url));
    } else {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match alle request paths behalve:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
