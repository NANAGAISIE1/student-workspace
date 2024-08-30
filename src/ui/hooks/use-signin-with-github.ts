import { useState } from "react";
import { SignInWithGitHubUseCase } from "@/core/application/use-cases/auth/signin-with-github";
import { ConvexAuthService } from "@/infrastructure/services/convex-auth-service";

export function useSignInWithGitHub() {
  const [loading, setLoading] = useState(false);
  const authService = new ConvexAuthService();
  const signInUseCase = new SignInWithGitHubUseCase(authService);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signInUseCase.execute();
    } catch (error) {
      console.error("Failed to sign in with GitHub:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setLoading(false);
    }
  };

  return { handleSignIn, loading };
}
