"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VerificationForm } from "./email-verification-form";
import { useSearchParams } from "next/navigation";
import { AlertTriangle } from "lucide-react";

export function VerificationCard() {
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  if (!email) {
    return (
      <Card className="mx-auto flex w-full max-w-[384px] flex-col gap-4">
        <CardHeader>
          <CardTitle>Invalid verification link</CardTitle>
        </CardHeader>
        <CardContent className="mx-auto flex w-full flex-col gap-4">
          <AlertTriangle className="mx-auto h-12 w-12 text-danger-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto flex w-full max-w-[384px] flex-col gap-4">
      <CardHeader>
        <CardTitle>Verify your email</CardTitle>
      </CardHeader>
      <CardContent className="mx-auto flex w-full flex-col gap-4">
        <VerificationForm email={email} />
      </CardContent>
    </Card>
  );
}
