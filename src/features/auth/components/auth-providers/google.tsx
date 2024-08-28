"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";

export function SignInWithGoogle() {
  const { signIn } = useAuthActions();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    await signIn("google", { redirectTo: "/app" });
  };
  return (
    <Button
      className="flex-1"
      variant="outline"
      type="button"
      onClick={handleSignIn}
    >
      {loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
      <Icons.GoogleLogo className="mr-2 h-4 w-4" /> Google
    </Button>
  );
}
