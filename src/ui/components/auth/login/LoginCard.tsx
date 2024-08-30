import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SignInWithGitHub } from "../oauth/SignInWithGitHub";
import { SignInMethodDivider } from "../SignInMethodDivider";
import { SignInWithGoogle } from "../oauth/SignInWithGoogle";
import { PasswordLoginForm } from "./PasswordLoginForm";

export function SignInCard() {
  return (
    <Card className="mx-auto flex w-full max-w-[384px] flex-col gap-4">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
      </CardHeader>
      <CardContent className="mx-auto flex w-full flex-col gap-4">
        <div className="flex w-full flex-col items-stretch gap-2 min-[460px]:flex-row">
          <SignInWithGitHub />
          <SignInWithGoogle />
        </div>
        <SignInMethodDivider />
        <PasswordLoginForm />
      </CardContent>
    </Card>
  );
}
