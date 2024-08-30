import { AuthenticationService } from "../../interfaces/auth";

export class SignInWithGitHubUseCase {
  constructor(private authService: AuthenticationService) {}

  async execute(): Promise<void> {
    await this.authService.signInWithGitHub();
  }
}
