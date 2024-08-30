import { useState } from "react";
import { ConvexAuthService } from "@/infrastructure/services/ConvexAuthService";
import { SignInWithGoogleUseCase } from "@/core/application/use-cases/SignInWithGoogleUseCase";

export function useSignInWithGoogle() {
  const [loading, setLoading] = useState(false);
  const authService = new ConvexAuthService();
  const signInUseCase = new SignInWithGoogleUseCase(authService);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signInUseCase.execute();
    } catch (error) {
      console.error("Failed to sign in with Google:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setLoading(false);
    }
  };

  return { handleSignIn, loading };
}
