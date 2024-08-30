import { AuthenticationService } from "../../interfaces/auth";

export class SignInWithGoogleUseCase {
  constructor(private authService: AuthenticationService) {}

  async execute(): Promise<void> {
    await this.authService.signInWithGoogle();
  }
}
