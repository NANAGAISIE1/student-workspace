"use client";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Loader2Icon } from "lucide-react";
import { useSignInWithGoogle } from "@/ui/hooks/useSignInWithGoogle";

export function SignInWithGoogle() {
  const { handleSignIn, loading } = useSignInWithGoogle();

  return (
    <Button
      className="flex-1"
      variant="outline"
      type="button"
      onClick={handleSignIn}
    >
      <Icons.GoogleLogo className="mr-2 h-4 w-4" /> Google
      {loading && <Loader2Icon className="ml-2 h-4 w-4 animate-spin" />}
    </Button>
  );
}
