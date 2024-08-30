import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInWithPasswordUseCase } from "@/core/application/use-cases/auth/signin-with-password";
import { ConvexAuthService } from "@/infrastructure/services/convex-auth-service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginFormSchema, LoginFormValues } from "../types";

export function usePasswordLogin() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const authService = new ConvexAuthService();
  const signInUseCase = new SignInWithPasswordUseCase(authService);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      const success = await signInUseCase.execute(
        values.email,
        values.password,
      );
      if (success) {
        router.push("/app");
      } else {
        toast.error("Could not sign in, please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during sign in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { form, onSubmit, isSubmitting };
}
