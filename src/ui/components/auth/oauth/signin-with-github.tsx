"use client";

import { Button } from "@/ui/components/common/ui/button";
import { Icons } from "@/ui/components/common/icons";
import { Loader2Icon } from "lucide-react";
import { useSignInWithGitHub } from "@/ui/hooks/use-signin-with-github";

export function SignInWithGitHub() {
  const { handleSignIn, loading } = useSignInWithGitHub();

  return (
    <Button
      className="flex-1"
      variant="outline"
      type="button"
      onClick={handleSignIn}
    >
      <Icons.GitHubLogo className="mr-2 h-4 w-4" /> GitHub
      {loading && <Loader2Icon className="ml-2 h-4 w-4 animate-spin" />}
    </Button>
  );
}
