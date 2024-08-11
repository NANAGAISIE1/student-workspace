import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import authConfig from "./lib/auth.config";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const url = req.nextUrl;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = url.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(url.pathname);
  const isAuthRoute = authRoutes.includes(url.pathname);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();

  // let hostname = req.headers
  //   .get("host")!
  //   .replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  // const searchParams = req.nextUrl.searchParams.toString();
  // // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  // const path = `${url.pathname}${
  //   searchParams.length > 0 ? `?${searchParams}` : ""
  // }`;

  // // rewrite root application to `/home` folder
  // if (
  //   hostname === "localhost:3000" ||
  //   hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
  // ) {
  //   return NextResponse.rewrite(
  //     new URL(`/home${path === "/" ? "" : path}`, req.url),
  //   );
  // }

  // // rewrites for app pages
  // if (hostname == `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
  //   const session = !!req.auth;
  //   if (!session && path !== "/login") {
  //     return NextResponse.redirect(new URL("/login", req.url));
  //   } else if (session && path == "/login") {
  //     return NextResponse.redirect(new URL("/", req.url));
  //   }
  //   return NextResponse.rewrite(
  //     new URL(`/app${path === "/" ? "" : path}`, req.url),
  //   );
  // }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
