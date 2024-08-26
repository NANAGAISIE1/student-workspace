import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SignInWithOAuth } from "../_components/oauth";
import { SignInMethodDivider } from "../_components/sign-in-divider";
import { RegisterWithPassword } from "./_components/register-with-password";

function RegisterPage() {
  return (
    <main className="flex justify-center items-center h-full flex-col">
      <Card className="max-w-[384px] mx-auto w-full flex flex-col gap-4">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
        </CardHeader>
        <CardContent className="mx-auto w-full flex flex-col gap-4">
          <SignInWithOAuth />
          <SignInMethodDivider />
          <RegisterWithPassword />
        </CardContent>
      </Card>
      <div className="flex justify-center items-center">
        <p className="mr-2">Have an account?</p>
        <Link
          className={buttonVariants({
            variant: "link",
            className: "!m-0 !p-0",
          })}
          href={"/login"}
        >
          Sign in instead
        </Link>
      </div>
    </main>
  );
}

export default RegisterPage;
