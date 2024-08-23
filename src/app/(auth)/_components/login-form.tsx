"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { CodeInput } from "./code-input";
import { ResetPasswordWithEmailCode } from "./reset-password";
import { SignInMethodDivider } from "./sign-in-divider";
import { SignInWithPassword } from "./password-form";
import { SignInWithOAuth } from "./oauth";
import { Loader2Icon } from "lucide-react";

/**
 * Users choose between OAuth providers or email and password combo
 * with required email verification and optional password reset via OTP.
 */
export function AuthForm() {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<"signIn" | { email: string } | "forgot">(
    "signIn",
  );
  const [submitting, setSubmitting] = useState(false);
  return (
    <div className="max-w-[384px] mx-auto flex flex-col gap-4">
      {step === "signIn" ? (
        <>
          <h2 className="font-semibold text-2xl tracking-tight">
            Sign in or create an account
          </h2>
          <SignInWithOAuth />
          <SignInMethodDivider />
          <SignInWithPassword
            handleSent={(email) => setStep({ email })}
            handlePasswordReset={() => setStep("forgot")}
            provider="password-code"
          />
        </>
      ) : step === "forgot" ? (
        <ResetPasswordWithEmailCode
          provider="password-code"
          handleCancel={() => setStep("signIn")}
        />
      ) : (
        <>
          <h2 className="font-semibold text-2xl tracking-tight">
            Check your email
          </h2>
          <p className="text-muted-foreground text-sm">
            Enter the 8-digit code we sent to your email address.
          </p>
          <form
            className="flex flex-col"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitting(true);
              const formData = new FormData(event.currentTarget);
              signIn("password-code", formData).catch((error) => {
                console.error(error);
                toast.error("Code could not be verified, try again");
                setSubmitting(false);
              });
            }}
          >
            <label htmlFor="email">Code</label>
            <CodeInput />
            <input name="email" value={step.email} type="hidden" />
            <input name="flow" value="email-verification" type="hidden" />
            <Button type="submit" disabled={submitting}>
              {submitting && <Loader2Icon className="ml-2 animate-spin" />}
              Continue
            </Button>
            <Button
              type="button"
              variant="link"
              onClick={() => setStep("signIn")}
            >
              Cancel
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
