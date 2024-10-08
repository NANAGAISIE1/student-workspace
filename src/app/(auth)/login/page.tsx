import { buttonVariants } from "@/components/shadcn-ui/button";
import Link from "next/link";
import { SignInCard } from "@/features/auth/components/login";

function LoginPage() {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <SignInCard />
      <div className="flex items-center justify-center">
        <p className="mr-2">Don&apos;t have an account?</p>
        <Link
          className={buttonVariants({
            variant: "link",
            className: "!m-0 !p-0",
          })}
          href={"/register"}
        >
          Create account
        </Link>
      </div>
    </main>
  );
}

export default LoginPage;
