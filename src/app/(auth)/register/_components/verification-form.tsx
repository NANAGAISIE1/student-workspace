"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { useEffect } from "react";

const verifyFormSchema = z.object({
  email: z.string().email(),
  code: z
    .string()
    .min(6, "Code must be 6 characters")
    .max(6, "Code must be 6 characters"),
  flow: z.literal("email-verification"),
});

type VerifyFormValues = z.infer<typeof verifyFormSchema>;

interface VerificationFormProps {
  email: string;
}

export function VerificationForm({ email }: VerificationFormProps) {
  const { signIn } = useAuthActions();
  const router = useRouter();

  const form = useForm<VerifyFormValues>({
    resolver: zodResolver(verifyFormSchema),
    defaultValues: {
      email,
      code: "",
      flow: "email-verification",
    },
    mode: "onBlur",
  });

  const { handleSubmit, control, setValue, formState } = form;
  const { isSubmitting } = formState;

  // Ensure the email field is set correctly
  useEffect(() => {
    setValue("email", email);
  }, [email, setValue]);

  const onSubmit = async (values: VerifyFormValues) => {
    try {
      await signIn("password", values);
      router.push("/onboarding");
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Could not verify code, please try again.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <p>Enter the 6-digit code we sent to your email address.</p>
        <div className="w-full items-center flex justify-center">
          <FormField
            control={control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field} className="w-full flex">
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting && <Loader2Icon className="mr-2 animate-spin" />}
          Continue
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => router.push("/login")}
        >
          Cancel
        </Button>
      </form>
    </Form>
  );
}
