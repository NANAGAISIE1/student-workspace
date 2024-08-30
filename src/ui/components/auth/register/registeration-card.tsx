import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SignInWithGitHub } from "../oauth/signin-with-github";
import { SignInMethodDivider } from "../signin-method-divider";
import { SignInWithGoogle } from "../oauth/signin-with-google";
import { RegistrationForm } from "./registration-form";

export function RegisterCard() {
  return (
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
        <RegistrationForm />
      </CardContent>
    </Card>
  );
}
