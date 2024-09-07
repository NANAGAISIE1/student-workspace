"use client";

import { Button } from "@/components/shadcn-ui/button";
import { useState } from "react";
import { SendOtpForm } from "./forms/send-otp-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import ResetPassWordForm from "./forms/password-reset-form";

export function ResetPasswordWithEmailCode({
  handleCancel,
  provider,
}: {
  handleCancel: () => void;
  provider: string;
}) {
  const [step, setStep] = useState<"forgot" | { email: string }>("forgot");

  return step === "forgot" ? (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>Send password reset code</CardDescription>
      </CardHeader>
      <CardContent>
        <SendOtpForm
          handleCodeSent={(email) => setStep({ email })}
          provider={provider}
        >
          <input name="flow" type="hidden" value="reset" />
        </SendOtpForm>
      </CardContent>
      <Button type="button" variant="link" onClick={handleCancel}>
        Cancel
      </Button>
    </Card>
  ) : (
    <Card className="p-4">
      <CardHeader>Check your email</CardHeader>
      <CardContent>
        <CardDescription>
          Enter the 8-digit code we sent to your email address and choose a new
          password.
        </CardDescription>
      </CardContent>
      <CardContent>
        <ResetPassWordForm provider={provider} step={step} />
      </CardContent>
    </Card>
  );
}
