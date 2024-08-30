import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpUseCase } from "@/core/application/use-cases/auth/signup-with-password";
import { ConvexAuthService } from "@/infrastructure/services/convex-auth-service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@convex/api";
import { useQuery } from "convex/react";
import { registerationFormSchema, RegisterFormValues } from "../types";

export function useRegistration() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const authService = new ConvexAuthService();
  const signUpUseCase = new SignUpUseCase(authService);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerationFormSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
    mode: "onBlur",
  });

  const existingEmail = useQuery(api.user.query.emailExists, {
    email: form.getValues("email"),
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setIsSubmitting(true);
    try {
      if (existingEmail) {
        form.setError("email", {
          type: "manual",
          message: "Email already exists",
        });
        return;
      }
      await signUpUseCase.execute(values.email, values.password, values.name);
      router.push(`/verify?email=${encodeURIComponent(values.email)}`);
    } catch (error) {
      console.error(error);
      toast.error("Could not sign up, please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { form, onSubmit, isSubmitting };
}
