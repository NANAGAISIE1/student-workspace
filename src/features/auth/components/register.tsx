"use client";

import { useState } from "react";
import { RegistrationForm } from "./forms/password-registration-form";
import { VerificationForm } from "./forms/password-verification-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SignInMethodDivider } from "./ui/sign-in-divider";
import { SignInWithGitHub } from "./auth-providers/github";
import { SignInWithGoogle } from "./auth-providers/google";

type Step = "signUp" | { email: string };

function RegisterWithPassword() {
  const [step, setStep] = useState<Step>("signUp");

  const handleRegistrationSuccess = (email: string) => {
    setStep({ email });
  };

  return step === "signUp" ? (
    <RegistrationForm onSuccess={handleRegistrationSuccess} />
  ) : (
    <VerificationForm email={step.email} />
  );
}

export const PasswordRegistrationCard = () => (
  <Card className="mx-auto flex w-full max-w-[384px] flex-col gap-4">
    <CardHeader>
      <CardTitle>Create an account</CardTitle>
    </CardHeader>
    <CardContent className="mx-auto flex w-full flex-col gap-4">
      <div className="flex w-full flex-col items-stretch gap-2 min-[460px]:flex-row">
        <SignInWithGitHub />
        <SignInWithGoogle />
      </div>
      <SignInMethodDivider />
      <RegisterWithPassword />
    </CardContent>
  </Card>
);
