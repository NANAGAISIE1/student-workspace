import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VerifyEmailUseCase } from "@/core/application/use-cases/VerifyEmailUseCase";
import { ConvexAuthService } from "@/infrastructure/services/ConvexAuthService";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  passwordVerificationFormSchema,
  VerifyPasswordFormValues,
} from "../types";

export function useVerification(email: string) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const authService = new ConvexAuthService();
  const verifyEmailUseCase = new VerifyEmailUseCase(authService);

  const form = useForm<VerifyPasswordFormValues>({
    resolver: zodResolver(passwordVerificationFormSchema),
    defaultValues: {
      email,
      code: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: VerifyPasswordFormValues) => {
    setIsSubmitting(true);
    try {
      const success = await verifyEmailUseCase.execute(
        values.email,
        values.code,
      );
      if (success) {
        router.push("/onboarding");
      } else {
        toast.error("Invalid verification code. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Could not verify email, please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { form, onSubmit, isSubmitting };
}
