// import { useSidebarStore } from "@/components/sidebar/use-sidebar";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { LoginForm } from "../_components/login-form";

function LoginPage() {
  // const { isSidebarOpen, toggleSidebar } = useSidebarStore((state) => state);

  // useEffect(() => {
  //   if (isSidebarOpen) {
  //     toggleSidebar();
  //   }
  // });
  return (
    <main className="flex justify-center items-center h-full flex-col">
      <LoginForm />
      <Link
        href={"/onboarding"}
        className={buttonVariants({ variant: "link" })}
      >
        Continue without account
      </Link>
    </main>
  );
}

export default LoginPage;
