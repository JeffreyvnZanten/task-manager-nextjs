// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const protectedPaths = ["/projects"];
const authPaths = ["/sign-in"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionCookie = getSessionCookie(request);
  console.log("Session cookie:", sessionCookie);

  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    if (!sessionCookie) {
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  if (authPaths.some((path) => pathname.startsWith(path))) {
    if (sessionCookie) {
      return NextResponse.redirect(new URL("/projects", request.url));
    }
  }

  if (pathname === "/") {
    if (sessionCookie) {
      return NextResponse.redirect(new URL("/projects", request.url));
    } else {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
