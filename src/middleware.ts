import { NextResponse } from "next/server";
import { apiAuthPrefix, DEFAULT_LOGIN_REDIRECT } from "./routes";
import { fetchQuery } from "convex/nextjs";

import {
  convexAuthNextjsMiddleware,
  convexAuthNextjsToken,
  createRouteMatcher,
  isAuthenticatedNextjs,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";
import { api } from "@convex/api";

const isLoginPage = createRouteMatcher(["/login", "/register"]);
const isProtectedRoute = createRouteMatcher(["/app(.*)", "/onboarding(.*)"]);
const workspaceRoute = createRouteMatcher(["/app(.*)"]);

export default convexAuthNextjsMiddleware(async (request) => {
  const url = request.nextUrl;
  const isApiAuthRoute = url.pathname.startsWith(apiAuthPrefix);
  const isLoggedIn = isAuthenticatedNextjs();

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isLoginPage(request)) {
    return isLoggedIn
      ? nextjsMiddlewareRedirect(request, DEFAULT_LOGIN_REDIRECT)
      : NextResponse.next();
  }

  if (isProtectedRoute(request)) {
    if (!isLoggedIn) {
      return nextjsMiddlewareRedirect(request, "/login");
    }

    const workspace = await fetchQuery(
      api.workspaces.query.getMostCurrentWorkspace,
      {},
      { token: convexAuthNextjsToken() },
    );

    console.log("workspace", workspace);

    if (workspaceRoute(request) && workspace === null) {
      return nextjsMiddlewareRedirect(request, "/onboarding");
    }
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
