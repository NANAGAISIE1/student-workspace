// import { useSidebarStore } from "@/components/sidebar/use-sidebar";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { SignupForm } from "../_components/register-form";

function SignupPage() {
  // const { isSidebarOpen, toggleSidebar } = useSidebarStore((state) => state);

  // useEffect(() => {
  //   if (isSidebarOpen) {
  //     toggleSidebar();
  //   }
  // });
  return (
    <main className="flex justify-center items-center h-full flex-col">
      <SignupForm />
      <Link
        href={"/onboarding"}
        className={buttonVariants({ variant: "link" })}
      >
        Continue without account
      </Link>
    </main>
  );
}

export default SignupPage;
