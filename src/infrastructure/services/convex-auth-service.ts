import { AuthenticationService } from "@/core/application/interfaces/auth";
import { useAuthActions } from "@convex-dev/auth/react";

export class ConvexAuthService implements AuthenticationService {
  private authActions = useAuthActions();

  async signInWithGitHub(): Promise<void> {
    await this.authActions.signIn("github", { redirectTo: "/app" });
  }

  async signInWithGoogle(): Promise<void> {
    await this.authActions.signIn("google", { redirectTo: "/app" });
  }

  async signInWithPassword(email: string, password: string): Promise<boolean> {
    const { signingIn } = await this.authActions.signIn("password", {
      email,
      password,
      flow: "signIn",
    });
    return signingIn;
  }

  async signUp(email: string, password: string, name: string): Promise<void> {
    await this.authActions.signIn("password", {
      email,
      password,
      name,
      flow: "signUp",
    });
  }

  async verifyEmail(email: string, code: string): Promise<boolean> {
    const { signingIn } = await this.authActions.signIn("password", {
      email,
      code,
      flow: "email-verification",
    });
    return signingIn;
  }
}
