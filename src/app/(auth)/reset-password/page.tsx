import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SignInWithOAuth } from "../_components/oauth";
import { SignInMethodDivider } from "../_components/sign-in-divider";
import { RegisterWithPassword } from "../register/_components/register-with-password";

function ResetPassword() {
  return (
    <main className="flex justify-center items-center h-full flex-col">
      <Card className="max-w-[384px] mx-auto w-full flex flex-col gap-4">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
        </CardHeader>
        <CardContent className="mx-auto w-full flex flex-col gap-4">
          <SignInWithOAuth />
          <SignInMethodDivider />
          <RegisterWithPassword />
        </CardContent>
      </Card>
    </main>
  );
}

export default ResetPassword;
