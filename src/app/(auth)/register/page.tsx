import Link from "next/link";
import { buttonVariants } from "@/components/shadcn-ui/button";
import { PasswordRegistrationCard } from "@/features/auth/components/register";

function RegisterPage() {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <PasswordRegistrationCard />
      <div className="flex items-center justify-center">
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
