"use client";

import { useState } from "react";
import { VerificationForm } from "./verification-form";
import { RegistrationForm } from "./registeration-form";

type Step = "signUp" | { email: string };

export function RegisterWithPassword() {
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
