import { NextResponse } from "next/server";
import { apiAuthPrefix, DEFAULT_LOGIN_REDIRECT } from "./routes";

import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  isAuthenticatedNextjs,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isLoginPage = createRouteMatcher(["/login", "/register"]);
const isProtectedRoute = createRouteMatcher(["/app(.*)", "/onboarding(.*)"]);

export default convexAuthNextjsMiddleware(async (request) => {
  const url = request.nextUrl;
  const isLoggedIn = isAuthenticatedNextjs();
  const isApiAuthRoute = url.pathname.startsWith(apiAuthPrefix);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isLoginPage(request)) {
    if (isLoggedIn) {
      return nextjsMiddlewareRedirect(request, DEFAULT_LOGIN_REDIRECT);
    }
    return NextResponse.next();
  }

  if (isProtectedRoute(request) && !isLoggedIn) {
    return nextjsMiddlewareRedirect(request, "/login");
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
