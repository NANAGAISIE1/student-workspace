import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SignInWithOAuth } from "../_components/oauth";
import { SignInMethodDivider } from "../_components/sign-in-divider";
import { SigninWithPassword } from "./_components/login-with-password";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

function LoginPage() {
  return (
    <main className="flex justify-center items-center h-full flex-col">
      <Card className="max-w-[384px] mx-auto w-full flex flex-col gap-4">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
        </CardHeader>
        <CardContent className="mx-auto w-full flex flex-col gap-4">
          <SignInWithOAuth />
          <SignInMethodDivider />
          <SigninWithPassword />
        </CardContent>
      </Card>
      <div className="flex justify-center items-center">
        <p className="mr-2">Don't have an account?</p>
        <Link
          className={buttonVariants({
            variant: "link",
            className: "!m-0 !p-0",
          })}
          href={"/login"}
        >
          Create account
        </Link>
      </div>
    </main>
  );
}

export default LoginPage;
