import { isAuthenticatedNextjs } from "@convex-dev/auth/nextjs/server";

export default async function Home() {
  const isAuthenticated = isAuthenticatedNextjs();
  return (
    <main className="h-full flex flex-col justify-center items-center">
      <h1>This is the homepage</h1>
      <p>
        {isAuthenticated ? (
          <>
            <a href="#">Sign out</a>
          </>
        ) : (
          <a href="/login">Sign in</a>
        )}
      </p>
    </main>
  );
}
