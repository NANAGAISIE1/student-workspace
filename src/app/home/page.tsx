import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();
  return (
    <main className="h-full flex flex-col justify-center items-center">
      <h1>This is the homepage</h1>
      <p>
        {session ? (
          <>
            <a href="/api/auth/signout">Sign out</a>
            <span>{JSON.stringify(session)}</span>
          </>
        ) : (
          <a href="/login">Sign in {session}</a>
        )}
      </p>
    </main>
  );
}
